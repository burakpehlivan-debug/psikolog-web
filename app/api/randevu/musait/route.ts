import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function generateSlots(startTime: string, endTime: string): string[] {
  const slots: string[] = []
  const startHour = parseInt(startTime.split(':')[0])
  const endHour = parseInt(endTime.split(':')[0])
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
  }
  return slots
}

export async function GET(request: NextRequest) {
  const year = parseInt(request.nextUrl.searchParams.get('year') ?? '')
  const month = parseInt(request.nextUrl.searchParams.get('month') ?? '')

  if (!year || !month || month < 1 || month > 12) {
    return Response.json({ error: 'Geçersiz tarih' }, { status: 400 })
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('SUPABASE_SERVICE_ROLE_KEY is not set')
    return Response.json({ error: 'Sunucu yapılandırma hatası' }, { status: 500 })
  }

  try {
  const supabase = createAdminClient()

  const { data: settings } = await supabase
    .from('settings')
    .select('working_hours_start, working_hours_end, working_days, appointment_system_enabled')
    .eq('id', 1)
    .single()

  if (!settings?.appointment_system_enabled) {
    return Response.json({ disabled: true })
  }

  const allSlots = generateSlots(settings.working_hours_start, settings.working_hours_end)
  const workingDays: number[] = settings.working_days

  const monthPadded = String(month).padStart(2, '0')
  const nextMonth = month === 12 ? 1 : month + 1
  const nextYear = month === 12 ? year + 1 : year
  const monthStart = `${year}-${monthPadded}-01T00:00:00+03:00`
  const monthEnd = `${nextYear}-${String(nextMonth).padStart(2, '0')}-01T00:00:00+03:00`

  const [{ data: blocked }, { data: approved }] = await Promise.all([
    supabase
      .from('blocked_slots')
      .select('start_datetime, end_datetime')
      .gte('start_datetime', monthStart)
      .lt('start_datetime', monthEnd),
    supabase
      .from('appointments')
      .select('start_datetime, end_datetime')
      .eq('status', 'approved')
      .gte('start_datetime', monthStart)
      .lt('start_datetime', monthEnd),
  ])

  const busyRanges = [...(blocked ?? []), ...(approved ?? [])].map(r => ({
    start: new Date(r.start_datetime).getTime(),
    end: new Date(r.end_datetime).getTime(),
  }))

  const daysInMonth = new Date(year, month, 0).getDate()
  const now = Date.now()
  // Approximate Turkey time (UTC+3) for "today" comparison
  const todayStr = new Date(now + 3 * 60 * 60 * 1000).toISOString().slice(0, 10)

  const result: Record<string, string[]> = {}

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${monthPadded}-${String(d).padStart(2, '0')}`
    if (dateStr < todayStr) continue

    const dayOfWeek = new Date(year, month - 1, d).getDay()
    if (!workingDays.includes(dayOfWeek)) continue

    const available: string[] = []
    for (const time of allSlots) {
      const slotStart = new Date(`${dateStr}T${time}:00+03:00`).getTime()
      const slotEnd = slotStart + 60 * 60 * 1000
      if (slotStart <= now) continue
      if (!busyRanges.some(r => slotStart < r.end && slotEnd > r.start)) {
        available.push(time)
      }
    }

    if (available.length > 0) result[dateStr] = available
  }

  return Response.json(result)
  } catch (err) {
    console.error('Musait API error:', err)
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
