import Link from 'next/link'
import type { Settings } from '@/lib/types'

const pages = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/blog', label: 'Blog' },
  { href: '/randevu', label: 'Randevu' },
  { href: '/iletisim', label: 'İletişim' },
]

const expertise = ['Çocuk Terapisi', 'Ergen Terapisi', 'Ebeveyn Danışmanlığı', 'Oyun Terapisi']

export default function Footer({ settings }: { settings: Settings | null }) {
  return (
    <footer className="bg-coffee-dark pt-14 pb-8 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-12">
        <div>
          <span className="block font-serif text-[1.15rem] text-cream mb-0.5">Hande Pehlivan</span>
          <span className="block text-[0.7rem] text-cream/50 tracking-[0.15em] uppercase">Klinik Psikolog</span>
          <p className="text-[0.82rem] text-cream/45 leading-[1.8] mt-5">
            Çocuk ve ergen psikolojisi alanında uzmanlaşmış, bilimsel temelli terapi hizmetleri.
          </p>
          {(settings?.instagram_url || settings?.linkedin_url) && (
            <div className="flex gap-3 mt-4">
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                </a>
              )}
              {settings.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-[0.62rem] tracking-[0.22em] uppercase text-cream/50 mb-4">Sayfalar</p>
          <ul className="list-none">
            {pages.map(({ href, label }) => (
              <li key={href} className="mb-2">
                <Link href={href} className="text-cream/65 hover:text-cream text-[0.85rem] no-underline transition-opacity duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.62rem] tracking-[0.22em] uppercase text-cream/50 mb-4">Uzmanlık</p>
          <ul className="list-none">
            {expertise.map(item => (
              <li key={item} className="mb-2 text-cream/65 text-[0.85rem]">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex justify-between items-center text-[0.72rem] text-cream/40">
        <span>© {new Date().getFullYear()} Hande Pehlivan. Tüm hakları saklıdır.</span>
        <Link href="/admin" className="text-cream/30 hover:text-cream/60 no-underline transition-colors text-[0.65rem]">
          Yönetim
        </Link>
      </div>
    </footer>
  )
}
