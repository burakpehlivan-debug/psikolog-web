'use client'

import { useState, useEffect } from 'react'
import type { Settings } from '@/lib/types'

const TR_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
]
const TR_DAYS_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
const TR_DAYS_LONG = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar']

function toMonDay(jsDay: number) {
  // Convert JS day (0=Sun) to Mon-indexed (0=Mon, 6=Sun)
  return (jsDay + 6) % 7
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const dayOfWeek = new Date(y, m - 1, d).getDay()
  return `${TR_DAYS_LONG[toMonDay(dayOfWeek)]}, ${d} ${TR_MONTHS[m - 1]} ${y}`
}

interface Props {
  settings: Settings
}

export default function RandevuClient({ settings }: Props) {
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [availability, setAvailability] = useState<Record<string, string[]>>({})
  const [apiError, setApiError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', phone: '', email: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setLoading(true)
    setSelectedDate(null)
    setSelectedSlot(null)
    setSuccess(false)
    setError(null)
    setApiError(false)
    fetch(`/api/randevu/musait?year=${year}&month=${month}`)
      .then(async r => {
        const data = await r.json()
        if (!r.ok || data.error) { setApiError(true); setAvailability({}) }
        else setAvailability(data)
      })
      .catch(() => { setApiError(true); setAvailability({}) })
      .finally(() => setLoading(false))
  }, [year, month])

  // Calendar grid
  const firstDayCol = toMonDay(new Date(year, month - 1, 1).getDay())
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayCol + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })

  const canGoPrev = year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth() + 1)

  function prevMonth() {
    if (!canGoPrev) return
    if (month === 1) { setYear(y => y - 1); setMonth(12) }
    else setMonth(m => m - 1)
  }

  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1) }
    else setMonth(m => m + 1)
  }

  function getDateStr(day: number) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  function isPast(day: number) {
    return getDateStr(day) < todayStr
  }

  function isWorkingDay(day: number) {
    return settings.working_days.includes(new Date(year, month - 1, day).getDay())
  }

  function hasSlots(day: number) {
    return (availability[getDateStr(day)]?.length ?? 0) > 0
  }

  function handleDayClick(day: number) {
    if (isPast(day) || !isWorkingDay(day) || !hasSlots(day)) return
    const dateStr = getDateStr(day)
    setSelectedDate(dateStr)
    setSelectedSlot(null)
    setSuccess(false)
    setError(null)
    setTimeout(() => {
      document.getElementById('slots-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function handleSlotClick(slot: string) {
    setSelectedSlot(slot)
    setError(null)
    setSuccess(false)
    setTimeout(() => {
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDate || !selectedSlot) return

    setSubmitting(true)
    setError(null)

    const startHour = parseInt(selectedSlot.split(':')[0])
    const endHour = String(startHour + 1).padStart(2, '0')
    const start_datetime = `${selectedDate}T${selectedSlot}:00+03:00`
    const end_datetime = `${selectedDate}T${endHour}:00+03:00`

    try {
      const res = await fetch('/api/randevu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email || null,
          note: form.note || null,
          start_datetime,
          end_datetime,
        }),
      })
      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', note: '' })
      } else {
        const data = await res.json()
        setError(data.error ?? 'Bir hata oluştu')
      }
    } catch {
      setError('Bağlantı hatası. Lütfen tekrar deneyin.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-[860px] mx-auto px-8 py-16 md:py-24">

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-10">
        <button
          onClick={prevMonth}
          disabled={!canGoPrev}
          aria-label="Önceki ay"
          className="w-10 h-10 flex items-center justify-center text-[1.1rem] text-coffee hover:text-coffee-dark transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
        >
          ←
        </button>
        <h2 className="font-serif text-[1.6rem] text-coffee-dark tracking-wide">
          {TR_MONTHS[month - 1]} {year}
        </h2>
        <button
          onClick={nextMonth}
          aria-label="Sonraki ay"
          className="w-10 h-10 flex items-center justify-center text-[1.1rem] text-coffee hover:text-coffee-dark transition-colors"
        >
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {TR_DAYS_SHORT.map(d => (
          <div key={d} className="text-center text-[0.62rem] tracking-[0.14em] uppercase text-coffee font-sans py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {loading ? (
        <div className="border border-beige h-64 flex items-center justify-center">
          <span className="text-[0.82rem] text-text-soft tracking-[0.1em]">Yükleniyor…</span>
        </div>
      ) : (
        <div className="grid grid-cols-7 border-t border-l border-beige">
          {cells.map((day, i) => {
            if (!day) {
              return <div key={i} className="border-r border-b border-beige h-12 md:h-14" />
            }

            const dateStr = getDateStr(day)
            const past = isPast(day)
            const working = isWorkingDay(day)
            const slots = hasSlots(day)
            const isToday = dateStr === todayStr
            const isSelected = selectedDate === dateStr
            const clickable = !past && working && slots

            return (
              <div
                key={i}
                onClick={() => handleDayClick(day)}
                className={[
                  'border-r border-b border-beige h-12 md:h-14',
                  'flex items-center justify-center relative',
                  'font-sans text-[0.82rem] transition-colors duration-150 select-none',
                  clickable ? 'cursor-pointer hover:bg-beige' : 'cursor-default',
                  isSelected ? 'bg-coffee-dark text-cream' : '',
                  !isSelected && clickable ? 'text-coffee-dark font-medium' : '',
                  !isSelected && !clickable ? 'text-text-soft/30' : '',
                ].filter(Boolean).join(' ')}
              >
                {isToday && !isSelected && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-coffee-light" />
                )}
                {day}
              </div>
            )
          })}
        </div>
      )}

      {/* API error notice */}
      {apiError && !loading && (
        <p className="mt-4 text-[0.82rem] text-text-soft italic">
          Müsaitlik bilgileri yüklenemedi. Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.
        </p>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 mt-5 text-[0.68rem] text-text-soft/70 font-sans">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 inline-block border border-beige-mid bg-cream" />
          Müsait gün
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 inline-block bg-coffee-dark" />
          Seçili
        </span>
      </div>

      {/* Slots section */}
      {selectedDate && availability[selectedDate] && !loading && (
        <div id="slots-section" className="mt-16 pt-14 border-t border-beige">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-coffee mb-2 font-sans">Müsait Saatler</p>
          <h3 className="font-serif text-[1.25rem] text-coffee-dark mb-7">
            {formatDate(selectedDate)}
          </h3>

          <div className="flex flex-wrap gap-3">
            {availability[selectedDate].map(slot => (
              <button
                key={slot}
                onClick={() => handleSlotClick(slot)}
                className={[
                  'px-7 py-2.5 text-[0.78rem] font-sans tracking-[0.1em] border transition-colors duration-200 cursor-pointer',
                  selectedSlot === slot
                    ? 'bg-coffee-dark text-cream border-coffee-dark'
                    : 'bg-cream text-coffee-dark border-beige-mid hover:border-coffee hover:bg-beige',
                ].join(' ')}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Form section */}
      {selectedDate && selectedSlot && !success && (
        <div id="form-section" className="mt-14 pt-14 border-t border-beige">
          <p className="text-[0.65rem] tracking-[0.2em] uppercase text-coffee mb-2 font-sans">Randevu Talebi</p>
          <h3 className="font-serif text-[1.25rem] text-coffee-dark mb-1">
            Bilgilerinizi Girin
          </h3>
          <p className="text-[0.82rem] text-text-soft mb-8">
            {formatDate(selectedDate)} — saat {selectedSlot}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-[520px]">
            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">
                Ad Soyad *
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Adınız ve soyadınız"
                className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">
                Telefon *
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="05xx xxx xx xx"
                className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">
                E-posta <span className="normal-case tracking-normal opacity-60">(isteğe bağlı)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="mail@ornek.com"
                className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors"
              />
            </div>

            <div>
              <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">
                Notunuz <span className="normal-case tracking-normal opacity-60">(isteğe bağlı)</span>
              </label>
              <textarea
                value={form.note}
                onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
                placeholder="Görüşmek istediğiniz konu veya başka bilgi…"
                rows={4}
                className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors resize-y"
              />
            </div>

            {error && (
              <p className="text-[0.83rem] text-red-700 bg-red-50 px-4 py-3 border border-red-200">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-coffee-dark text-cream py-3.5 text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee transition-colors duration-300 cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Gönderiliyor…' : 'Randevu Talebini Gönder'}
            </button>
          </form>
        </div>
      )}

      {/* Success */}
      {success && (
        <div id="form-section" className="mt-14 pt-14 border-t border-beige">
          <div className="bg-beige px-8 py-10 max-w-[520px]">
            <div className="w-10 h-px bg-coffee-light mb-6" />
            <h3 className="font-serif text-[1.25rem] text-coffee-dark mb-3">
              Talebiniz Alındı
            </h3>
            <p className="text-[0.88rem] text-text-soft leading-[1.9]">
              Randevu talebiniz başarıyla iletildi. Telefon numaranız üzerinden en kısa
              sürede sizinle iletişime geçilecektir.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
