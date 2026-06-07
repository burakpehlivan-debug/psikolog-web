'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm({ email }: { email: string | null }) {
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)
  const [kvkkConsent, setKvkkConsent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !userEmail || !msg) return
    const to = email ?? 'iletisim@example.com'
    const sub = encodeURIComponent(`Web Sitesi İletişim: ${name}`)
    const body = encodeURIComponent(`Ad Soyad: ${name}\nE-posta: ${userEmail}\n\nMesaj:\n${msg}`)
    window.location.href = `mailto:${to}?subject=${sub}&body=${body}`
    setSent(true)
  }

  return (
    <div className="bg-white p-10">
      <h3 className="font-serif text-[1.25rem] text-coffee-dark mb-8">Mesaj Gönderin</h3>
      {sent ? (
        <p className="text-[0.95rem] text-green-700 bg-green-50 p-4">Mesajınız için teşekkürler, en kısa sürede dönüş yapılacaktır.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[0.75rem] tracking-[0.18em] uppercase text-coffee mb-1.5">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Adınız ve soyadınız"
              required
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.95rem] text-text-main outline-none focus:border-coffee transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.75rem] tracking-[0.18em] uppercase text-coffee mb-1.5">E-posta</label>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              placeholder="mail@ornek.com"
              required
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.95rem] text-text-main outline-none focus:border-coffee transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.75rem] tracking-[0.18em] uppercase text-coffee mb-1.5">Mesajınız</label>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              required
              rows={6}
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.95rem] text-text-main outline-none focus:border-coffee transition-colors resize-y"
            />
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={kvkkConsent}
              onChange={e => setKvkkConsent(e.target.checked)}
              className="mt-[3px] w-4 h-4 accent-coffee-dark flex-shrink-0 cursor-pointer"
            />
            <span className="text-[0.83rem] text-text-soft leading-[1.7]">
              Kişisel verilerimin işlenmesine ilişkin{' '}
              <Link href="/kvkk" target="_blank" className="text-coffee underline underline-offset-2 hover:text-coffee-dark transition-colors">
                Aydınlatma Metni'ni
              </Link>{' '}
              okudum, anladım.
            </span>
          </label>
          <button
            type="submit"
            disabled={!kvkkConsent}
            className="w-full bg-coffee-dark text-cream py-3 text-[0.85rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee transition-colors duration-300 cursor-pointer border-0 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Gönder
          </button>
        </form>
      )}
    </div>
  )
}
