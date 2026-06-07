import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendNewAppointmentEmail } from '@/lib/email'

const RATE_WINDOW_MS = 10 * 60 * 1000 // 10 dakika
const MAX_ATTEMPTS = 3

// Turkey her zaman UTC+3 (2016'dan beri DST yok)
function getTurkeyHourAndDay(isoStr: string): { hour: number; dayOfWeek: number } {
  const d = new Date(isoStr)
  const tr = new Date(d.getTime() + 3 * 60 * 60 * 1000)
  return { hour: tr.getUTCHours(), dayOfWeek: tr.getUTCDay() }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, phone, email, note, start_datetime, end_datetime, _hp, _t } = body

  // Honeypot: botlar doldurur, gerçek kullanıcılar doldurmaz
  if (_hp) {
    return Response.json({ success: true }) // Bota başarılı gibi göster
  }

  // Timing: 2 saniyeden hızlı gönderim → bot
  if (typeof _t === 'number' && Date.now() - _t < 2000) {
    return Response.json({ error: 'Lütfen formu doldurarak gönderin.' }, { status: 400 })
  }

  if (!name?.trim() || !phone?.trim() || !start_datetime || !end_datetime) {
    return Response.json({ error: 'Eksik alan' }, { status: 400 })
  }

  if (new Date(start_datetime) <= new Date()) {
    return Response.json({ error: 'Geçmiş bir saat seçildi' }, { status: 400 })
  }

  const supabase = createAdminClient()

  // IP bazlı rate limiting
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  const { data: rateLimit } = await supabase
    .from('rate_limits')
    .select('last_attempt, attempt_count')
    .eq('ip', ip)
    .single()

  if (rateLimit) {
    const elapsed = Date.now() - new Date(rateLimit.last_attempt).getTime()
    if (elapsed < RATE_WINDOW_MS && rateLimit.attempt_count >= MAX_ATTEMPTS) {
      return Response.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen 10 dakika sonra tekrar deneyin.' },
        { status: 429 }
      )
    }
  }

  // Settings: sistem durumu + çalışma saatleri
  const { data: settings } = await supabase
    .from('settings')
    .select('appointment_system_enabled, working_hours_start, working_hours_end, working_days')
    .eq('id', 1)
    .single()

  if (!settings?.appointment_system_enabled) {
    return Response.json({ error: 'Randevu sistemi şu an kapalı' }, { status: 400 })
  }

  // Çalışma saati ve günü validasyonu (Turkey UTC+3)
  const { hour, dayOfWeek } = getTurkeyHourAndDay(start_datetime)
  const workStart = parseInt(settings.working_hours_start.split(':')[0])
  const workEnd = parseInt(settings.working_hours_end.split(':')[0])

  if (hour < workStart || hour >= workEnd) {
    return Response.json({ error: 'Seçilen saat çalışma saatleri dışında.' }, { status: 400 })
  }

  if (!settings.working_days.includes(dayOfWeek)) {
    return Response.json({ error: 'Seçilen gün çalışma günleri dışında.' }, { status: 400 })
  }

  // Çakışma kontrolü
  const [{ data: blockedConflicts }, { data: aptConflicts }] = await Promise.all([
    supabase
      .from('blocked_slots')
      .select('id')
      .lt('start_datetime', end_datetime)
      .gt('end_datetime', start_datetime),
    supabase
      .from('appointments')
      .select('id')
      .eq('status', 'approved')
      .lt('start_datetime', end_datetime)
      .gt('end_datetime', start_datetime),
  ])

  if ((blockedConflicts?.length ?? 0) > 0 || (aptConflicts?.length ?? 0) > 0) {
    return Response.json(
      { error: 'Bu saat artık müsait değil. Lütfen başka bir saat seçin.' },
      { status: 409 }
    )
  }

  const { error } = await supabase.from('appointments').insert({
    name: name.trim(),
    phone: phone.trim(),
    email: email?.trim() || null,
    note: note?.trim() || null,
    start_datetime,
    end_datetime,
    status: 'pending',
  })

  if (error) {
    console.error('Randevu insert error:', error)
    return Response.json({ error: 'Sunucu hatası. Lütfen tekrar deneyin.' }, { status: 500 })
  }

  // Rate limit sayacını güncelle (fire-and-forget)
  const elapsed = rateLimit
    ? Date.now() - new Date(rateLimit.last_attempt).getTime()
    : RATE_WINDOW_MS + 1
  supabase.from('rate_limits').upsert(
    {
      ip,
      last_attempt: new Date().toISOString(),
      attempt_count: elapsed < RATE_WINDOW_MS ? (rateLimit?.attempt_count ?? 0) + 1 : 1,
    },
    { onConflict: 'ip' }
  ).then(() => {}).catch(() => {})

  sendNewAppointmentEmail({ name, phone, email, note, start_datetime, end_datetime }).catch(
    (err) => console.error('Email gönderilemedi:', err)
  )

  return Response.json({ success: true })
}
