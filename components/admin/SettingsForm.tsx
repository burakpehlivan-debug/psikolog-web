'use client'
import { useActionState } from 'react'
import type { Settings } from '@/lib/types'
import { saveSettings } from '@/app/admin/(protected)/ayarlar/actions'

const DAY_LABELS = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [result, action, isPending] = useActionState(saveSettings, null)

  const inputClass =
    'w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-white'
  const labelClass = 'block text-sm text-text-soft mb-1.5'

  return (
    <form action={action} className="space-y-8">
      {/* Randevu Sistemi */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="font-serif text-coffee-dark mb-5">Randevu Sistemi</h2>

        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative">
            <input
              name="appointment_system_enabled"
              type="checkbox"
              defaultChecked={settings.appointment_system_enabled}
              className="sr-only peer"
            />
            <div className="w-11 h-6 rounded-full bg-beige peer-checked:bg-coffee-dark transition-colors" />
            <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
          </div>
          <span className="text-sm text-text-main">Randevu sistemi aktif</span>
        </label>
      </div>

      {/* Çalışma Saatleri */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="font-serif text-coffee-dark mb-5">Çalışma Saatleri</h2>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className={labelClass}>Başlangıç</label>
            <input
              name="working_hours_start"
              type="time"
              defaultValue={settings.working_hours_start}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Bitiş</label>
            <input
              name="working_hours_end"
              type="time"
              defaultValue={settings.working_hours_end}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Çalışma Günleri</label>
          <div className="flex flex-wrap gap-2">
            {DAY_LABELS.map((label, i) => (
              <label key={i} className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="working_days"
                  value={i}
                  defaultChecked={settings.working_days.includes(i)}
                  className="accent-coffee-dark w-4 h-4"
                />
                <span className="text-sm text-text-main">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="font-serif text-coffee-dark mb-5">İletişim Bilgileri</h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>E-posta</label>
            <input name="contact_email" type="email" defaultValue={settings.contact_email ?? ''} className={inputClass} placeholder="ornek@mail.com" />
          </div>
          <div>
            <label className={labelClass}>Telefon</label>
            <input name="contact_phone" type="text" defaultValue={settings.contact_phone ?? ''} className={inputClass} placeholder="05xx xxx xx xx" />
          </div>
          <div>
            <label className={labelClass}>Adres</label>
            <textarea name="contact_address" rows={2} defaultValue={settings.contact_address ?? ''} className={`${inputClass} resize-none`} placeholder="Muayenehane adresi" />
          </div>
        </div>
      </div>

      {/* Sosyal Medya */}
      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="font-serif text-coffee-dark mb-5">Sosyal Medya</h2>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Instagram URL</label>
            <input name="instagram_url" type="url" defaultValue={settings.instagram_url ?? ''} className={inputClass} placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className={labelClass}>LinkedIn URL</label>
            <input name="linkedin_url" type="url" defaultValue={settings.linkedin_url ?? ''} className={inputClass} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
      </div>

      {result === 'saved' && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
          Ayarlar kaydedildi.
        </div>
      )}
      {result && result !== 'saved' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {result}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-coffee-dark text-white text-sm px-8 py-2.5 rounded-lg hover:bg-coffee transition-colors disabled:opacity-60"
      >
        {isPending ? 'Kaydediliyor…' : 'Kaydet'}
      </button>
    </form>
  )
}
