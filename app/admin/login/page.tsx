'use client'
import { useActionState } from 'react'
import { login } from './actions'

export default function LoginPage() {
  const [error, action, isPending] = useActionState(login, null)

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="font-serif text-2xl text-coffee-dark text-center mb-8">
          Hande Pehlivan
        </p>
        <div className="bg-white rounded-2xl p-8" style={{ boxShadow: 'var(--shadow-card-lg)' }}>
          <h1 className="font-serif text-xl text-coffee-dark mb-6">Admin Girişi</h1>
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-sm text-text-soft mb-1.5">E-posta</label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-cream"
              />
            </div>
            <div>
              <label className="block text-sm text-text-soft mb-1.5">Şifre</label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-cream"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-coffee-dark text-white rounded-lg py-2.5 text-sm font-sans hover:bg-coffee transition-colors disabled:opacity-60 mt-2"
            >
              {isPending ? 'Giriş yapılıyor…' : 'Giriş Yap'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
