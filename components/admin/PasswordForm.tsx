'use client'
import { useActionState } from 'react'
import { changePassword, signOutEverywhere } from '@/app/admin/(protected)/hesap/actions'

export default function PasswordForm({ email }: { email: string }) {
  const [result, action, isPending] = useActionState(changePassword, null)

  const inputClass =
    'w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-white'
  const labelClass = 'block text-sm text-text-soft mb-1.5'

  return (
    <div className="space-y-8">
      <form action={action} className="space-y-6">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="font-serif text-coffee-dark mb-1">Şifre Değiştir</h2>
          <p className="text-sm text-text-soft mb-5">{email}</p>

          <div className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="current_password">Mevcut şifre</label>
              <input
                id="current_password"
                name="current_password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="new_password">Yeni şifre</label>
              <input
                id="new_password"
                name="new_password"
                type="password"
                required
                minLength={12}
                autoComplete="new-password"
                className={inputClass}
              />
              <p className="text-xs text-text-soft mt-1.5">
                En az 12 karakter, en az bir harf ve bir rakam.
              </p>
            </div>
            <div>
              <label className={labelClass} htmlFor="confirm_password">Yeni şifre (tekrar)</label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={12}
                autoComplete="new-password"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {result === 'saved' && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-3">
            Şifre güncellendi. Diğer cihazlardaki oturumlar kapatıldı.
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
          {isPending ? 'Güncelleniyor…' : 'Şifreyi Güncelle'}
        </button>
      </form>

      <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="font-serif text-coffee-dark mb-1">Oturum Güvenliği</h2>
        <p className="text-sm text-text-soft mb-5">
          Hesabına izinsiz erişildiğinden şüpheleniyorsan tüm cihazlardaki oturumları kapat.
          Bu işlem seni de çıkış yaptırır, yeniden giriş yapman gerekir.
        </p>
        <form action={signOutEverywhere}>
          <button
            type="submit"
            className="border border-beige text-coffee-dark text-sm px-6 py-2.5 rounded-lg hover:bg-cream transition-colors"
          >
            Tüm Oturumları Kapat
          </button>
        </form>
      </div>
    </div>
  )
}
