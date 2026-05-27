'use client'

import { useState } from 'react'

export default function ContactForm({ email }: { email: string | null }) {
  const [name, setName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

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
        <p className="text-[0.88rem] text-green-700 bg-green-50 p-4">Mesajınız için teşekkürler, en kısa sürede dönüş yapılacaktır.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Adınız ve soyadınız"
              required
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">E-posta</label>
            <input
              type="email"
              value={userEmail}
              onChange={e => setUserEmail(e.target.value)}
              placeholder="mail@ornek.com"
              required
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.65rem] tracking-[0.18em] uppercase text-coffee mb-1.5">Mesajınız</label>
            <textarea
              value={msg}
              onChange={e => setMsg(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              required
              rows={6}
              className="w-full px-3.5 py-2.5 border border-beige-mid bg-cream font-sans text-[0.88rem] text-text-main outline-none focus:border-coffee transition-colors resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-coffee-dark text-cream py-3 text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee transition-colors duration-300 cursor-pointer border-0"
          >
            Gönder
          </button>
        </form>
      )}
    </div>
  )
}
