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
              viewBox="0 0 55 138"
              width="19"
              height="49"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coffee-dark flex-shrink-0"
            >
              <circle cx="25" cy="5" r="3" fill="currentColor" stroke="none"/>
              <path d="M 25 9 L 25 38 C 25 42 39 44 39 51 C 39 58 25 58 25 58 C 25 58 11 58 11 66 C 11 74 25 74 25 74 C 25 74 41 74 41 83 C 41 92 25 92 25 92 C 35 92 48 102 48 114 C 48 126 34 133 21 130 C 8 127 6 113 13 104 C 20 95 33 94 37 104 C 41 114 33 120 26 118" />
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
