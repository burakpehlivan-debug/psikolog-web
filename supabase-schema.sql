-- Blog yazıları
create table posts (
  id              uuid          primary key default gen_random_uuid(),
  title           text          not null,
  slug            text          unique not null,
  category        text,
  content         text,
  excerpt         text,
  cover_image_url text,
  status          text          not null default 'draft' check (status in ('draft', 'published')),
  created_at      timestamptz   not null default now(),
  updated_at      timestamptz   not null default now()
);

-- Randevu talepleri (ziyaretçilerden gelen)
create table appointments (
  id              uuid          primary key default gen_random_uuid(),
  name            text          not null,
  phone           text          not null,
  email           text,
  note            text,
  start_datetime  timestamptz   not null,
  end_datetime    timestamptz   not null,
  status          text          not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at      timestamptz   not null default now()
);

-- Manuel kapalı slotlar (Hande'nin bloklaması)
create table blocked_slots (
  id              uuid          primary key default gen_random_uuid(),
  start_datetime  timestamptz   not null,
  end_datetime    timestamptz   not null,
  reason          text,
  created_at      timestamptz   not null default now()
);

-- Site ayarları (tek satır, id=1)
create table settings (
  id                          int  primary key default 1,
  appointment_system_enabled  bool not null default true,
  working_hours_start         time not null default '09:00',
  working_hours_end           time not null default '18:00',
  working_days                int[] not null default '{1,2,3,4,5}',
  contact_email               text,
  contact_phone               text,
  contact_address             text,
  instagram_url               text,
  linkedin_url                text,
  constraint one_row check (id = 1)
);

-- Varsayılan ayarlar satırını ekle
insert into settings (id) values (1);

-- updated_at otomatik güncelleme
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- RLS aktif et
alter table posts         enable row level security;
alter table appointments  enable row level security;
alter table blocked_slots enable row level security;
alter table settings      enable row level security;

-- posts: herkes published olanları okuyabilir, sadece auth user yazabilir
create policy "posts_public_read"
  on posts for select
  using (status = 'published');

create policy "posts_admin_all"
  on posts for all
  using (auth.role() = 'authenticated');

-- appointments: herkes ekleyebilir (randevu talebi), sadece auth user okuyup yönetebilir
create policy "appointments_public_insert"
  on appointments for insert
  with check (true);

create policy "appointments_admin_all"
  on appointments for all
  using (auth.role() = 'authenticated');

-- blocked_slots: sadece auth user
create policy "blocked_slots_admin_all"
  on blocked_slots for all
  using (auth.role() = 'authenticated');

-- settings: herkes okuyabilir, sadece auth user yazabilir
create policy "settings_public_read"
  on settings for select
  using (true);

create policy "settings_admin_write"
  on settings for all
  using (auth.role() = 'authenticated');
