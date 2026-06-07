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
              viewBox="0 0 60 140"
              width="17"
              height="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coffee-dark flex-shrink-0"
            >
              <path d="M 30 114 L 30.02 114.12 L 30.06 114.24 L 30.14 114.35 L 30.25 114.43 L 30.38 114.5 L 30.53 114.53 L 30.69 114.53 L 30.87 114.5 L 31.04 114.43 L 31.21 114.32 L 31.36 114.18 L 31.5 114 L 31.61 113.79 L 31.69 113.55 L 31.73 113.28 L 31.73 113 L 31.69 112.71 L 31.59 112.41 L 31.45 112.12 L 31.25 111.83 L 31 111.57 L 30.71 111.34 L 30.38 111.15 L 30 111 L 29.59 110.9 L 29.16 110.86 L 28.71 110.88 L 28.25 110.97 L 27.79 111.12 L 27.35 111.35 L 26.93 111.64 L 26.54 112 L 26.19 112.42 L 25.89 112.9 L 25.66 113.43 L 25.5 114 L 25.41 114.6 L 25.41 115.23 L 25.5 115.87 L 25.67 116.5 L 25.93 117.12 L 26.29 117.71 L 26.73 118.26 L 27.25 118.76 L 27.85 119.2 L 28.51 119.55 L 29.23 119.82 L 30 120 L 30.8 120.07 L 31.62 120.04 L 32.44 119.89 L 33.25 119.63 L 34.03 119.26 L 34.77 118.77 L 35.45 118.19 L 36.06 117.5 L 36.58 116.73 L 37 115.88 L 37.31 114.96 L 37.5 114 L 37.56 113 L 37.49 111.99 L 37.28 110.99 L 36.93 110 L 36.45 109.05 L 35.83 108.17 L 35.1 107.36 L 34.25 106.64 L 33.3 106.03 L 32.26 105.55 L 31.16 105.2 L 30 105 L 28.81 104.95 L 27.61 105.07 L 26.41 105.34 L 25.25 105.77 L 24.14 106.36 L 23.11 107.11 L 22.17 107.99 L 21.34 109 L 20.65 110.13 L 20.1 111.35 L 19.71 112.65 L 19.5 114 L 19.47 115.39 L 19.62 116.78 L 19.95 118.16 L 20.47 119.5 L 21.17 120.77 L 22.05 121.95 L 23.08 123.02 L 24.25 123.96 L 25.55 124.74 L 26.96 125.35 L 28.45 125.77 L 30 126 L 31.58 126.02 L 33.17 125.83 L 34.74 125.43 L 36.25 124.83 L 37.69 124.02 L 39.02 123.02 L 40.21 121.84 L 41.26 120.5 L 42.13 119.02 L 42.8 117.43 L 43.26 115.75 L 43.5 114 L 43.51 112.22 L 43.28 110.44 L 42.82 108.69 L 42.12 107 L 41.21 105.4 L 40.08 103.92 L 38.75 102.6 L 37.25 101.44 L 35.6 100.49 L 33.82 99.75 L 31.94 99.25 L 30 99 C 42 96, 42 86, 30 84 C 18 82, 18 72, 30 70 C 38 68, 38 61, 30 59 L 30 28" />
              <circle cx="30" cy="20" r="2" fill="currentColor" stroke="none" />
            </svg>
            <div>
              <span className="block font-serif text-[1.1rem] text-coffee-dark">Hande Pehlivan</span>
              <span className="block font-sans font-light text-[0.72rem] text-coffee tracking-[0.22em] uppercase mt-0.5">Klinik Psikolog</span>
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
