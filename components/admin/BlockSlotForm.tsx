'use client'
import { useActionState } from 'react'
import { addBlockedSlot } from '@/app/admin/(protected)/randevu/actions'

export default function BlockSlotForm() {
  const [error, action, isPending] = useActionState(addBlockedSlot, null)

  const inputClass =
    'w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-white'
  const labelClass = 'block text-sm text-text-soft mb-1.5'

  return (
    <form action={action} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Başlangıç *</label>
          <input
            name="start_datetime"
            type="datetime-local"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Bitiş *</label>
          <input
            name="end_datetime"
            type="datetime-local"
            required
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className={labelClass}>Açıklama (isteğe bağlı)</label>
        <input
          name="reason"
          type="text"
          placeholder="ör. Tatil, Toplantı"
          className={inputClass}
        />
      </div>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="bg-coffee-dark text-white text-sm px-6 py-2.5 rounded-lg hover:bg-coffee transition-colors disabled:opacity-60"
      >
        {isPending ? 'Ekleniyor…' : 'Slotu Blokla'}
      </button>
    </form>
  )
}
