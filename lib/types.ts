export interface Post {
  id: string
  title: string
  slug: string
  category: string | null
  content: string
  excerpt: string | null
  cover_image_url: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  name: string
  phone: string
  email: string | null
  note: string | null
  start_datetime: string
  end_datetime: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export interface BlockedSlot {
  id: string
  start_datetime: string
  end_datetime: string
  reason: string | null
  created_at: string
}

export interface Settings {
  id: number
  appointment_system_enabled: boolean
  working_hours_start: string
  working_hours_end: string
  working_days: number[]
  contact_email: string | null
  contact_phone: string | null
  contact_address: string | null
  instagram_url: string | null
  linkedin_url: string | null
}
