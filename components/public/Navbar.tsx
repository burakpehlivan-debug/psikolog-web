'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Settings } from '@/lib/types'

const links = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkinda', label: 'Hakkında' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar({ settings }: { settings: Settings | null }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-beige transition-shadow duration-300"
        style={{
          background: 'rgba(250,247,242,0.94)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: scrolled ? '0 2px 24px rgba(74,55,40,0.10)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-[72px]">
          <Link href="/" className="cursor-pointer flex items-center gap-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 113 237.7"
              width="24"
              height="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coffee-dark flex-shrink-0"
            >
              <circle cx="56.5" cy="6.5" r="5" fill="currentColor" stroke="none"/>
              <path d="M56.5 16.5C53.5 30.5 60.5 44.5 56.5 54.5M56.5 70.5C74.0 48.0 104.0 58.0 106.5 70.5C104.0 83.0 74.0 93.0 56.5 70.5C39.0 48.0 9.0 58.0 6.5 70.5C9.0 83.0 39.0 93.0 56.5 70.5M56.5 100.5C74.0 78.0 104.0 88.0 106.5 100.5C104.0 113.0 74.0 123.0 56.5 100.5C39.0 78.0 9.0 88.0 6.5 100.5C9.0 113.0 39.0 123.0 56.5 100.5M56.5 100.5C56.5 126.5 100.5 162.5 100.5 192.5L99.0 200.9L96.0 208.7L91.6 215.7L86.0 221.5L79.4 226.1L72.2 229.3L64.7 231.0L57.1 231.2L49.7 230.0L42.8 227.3L36.7 223.5L31.6 218.6L27.5 212.9L24.7 206.6L23.2 200.1L23.1 193.5L24.1 187.1L26.4 181.2L29.7 175.9L33.9 171.5L38.8 168.1L44.1 165.7L49.7 164.5L55.2 164.3L60.6 165.3L65.6 167.2L69.9 170.0L73.6 173.5L76.4 177.6L78.3 182.0L79.3 186.6L79.4 191.1L78.6 195.5L76.9 199.5L74.6 203.0L71.8 205.8L68.5 208.0L65.0 209.5L61.4 210.1L57.8 210.1L54.5 209.4L51.5 208.0L48.9 206.2L46.8 204.0L45.3 201.5L44.3 198.8L44.0 196.2L44.2 193.6L44.8 191.3L45.9 189.2L47.3 187.6L49.0 186.3L50.7 185.5L52.5 185.1L54.2 185.1L55.8 185.4L57.1 186.1L58.1 186.9L58.9 187.9L59.3 189.0L59.4 190.0L59.3 191.0L58.9 191.7" />
            </svg>
            <div>
              <span className="block font-serif text-[1.43rem] leading-none text-coffee-dark">Hande Pehlivan</span>
              <span className="block font-sans font-light text-[0.94rem] text-coffee tracking-[0.22em] uppercase mt-0">Klinik Psikolog</span>
            </div>
          </Link>

          <ul className="hidden md:flex gap-9 list-none items-center">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-sans font-normal text-[0.88rem] tracking-[0.12em] uppercase no-underline transition-colors duration-200 ${
                    pathname === href ? 'text-coffee-dark' : 'text-text-soft hover:text-coffee-dark'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            {settings?.instagram_url && (
              <li>
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-soft hover:text-coffee-dark transition-colors duration-200 flex items-center">
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
              </li>
            )}
            {settings?.linkedin_url && (
              <li>
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-soft hover:text-coffee-dark transition-colors duration-200 flex items-center">
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </li>
            )}
            <li>
              <Link
                href="/randevu"
                className="font-sans text-[0.88rem] tracking-[0.12em] uppercase no-underline bg-coffee-dark text-cream px-5 py-2 hover:bg-coffee transition-colors duration-300"
              >
                Randevu Talep Et
              </Link>
            </li>
          </ul>

          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1.5 bg-transparent border-0"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={mobileOpen}
          >
            <span className={`block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-[72px] left-0 right-0 bg-cream border-b border-beige z-40 px-8 overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-96 pt-4 pb-6' : 'max-h-0'
        }`}
        aria-hidden={!mobileOpen}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="block text-[0.93rem] text-text-soft tracking-[0.12em] uppercase no-underline py-3 border-b border-beige"
          >
            {label}
          </Link>
        ))}
        <Link
          href="/randevu"
          className="mt-5 block text-center font-sans text-[0.88rem] tracking-[0.12em] uppercase no-underline bg-coffee-dark text-cream px-5 py-3 hover:bg-coffee transition-colors duration-300"
        >
          Randevu Talep Et
        </Link>
        {(settings?.instagram_url || settings?.linkedin_url) && (
          <div className="flex justify-center gap-6 mt-6 pt-5 border-t border-beige">
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-text-soft hover:text-coffee-dark transition-colors">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                </svg>
              </a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-soft hover:text-coffee-dark transition-colors">
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </>
  )
}
