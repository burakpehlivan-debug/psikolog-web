import { createAdminClient } from '@/lib/supabase/admin'
import { sendNewAppointmentEmail } from '@/lib/email'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, phone, email, note, start_datetime, end_datetime } = body

  if (!name?.trim() || !phone?.trim() || !start_datetime || !end_datetime) {
    return Response.json({ error: 'Eksik alan' }, { status: 400 })
  }

  if (new Date(start_datetime) <= new Date()) {
    return Response.json({ error: 'Geçmiş bir saat seçildi' }, { status: 400 })
  }

  const supabase = createAdminClient()

  const { data: settings } = await supabase
    .from('settings')
    .select('appointment_system_enabled')
    .eq('id', 1)
    .single()

  if (!settings?.appointment_system_enabled) {
    return Response.json({ error: 'Randevu sistemi şu an kapalı' }, { status: 400 })
  }

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

  sendNewAppointmentEmail({ name, phone, email, note, start_datetime, end_datetime }).catch(
    (err) => console.error('Email gönderilemedi:', err)
  )

  return Response.json({ success: true })
}
