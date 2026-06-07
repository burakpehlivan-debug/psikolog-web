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
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coffee-dark flex-shrink-0"
            >
              <path d="M 30 116 L 30.06 116.06 L 30.14 116.1 L 30.24 116.12 L 30.34 116.1 L 30.44 116.05 L 30.53 115.98 L 30.61 115.87 L 30.66 115.74 L 30.68 115.59 L 30.68 115.43 L 30.63 115.26 L 30.55 115.09 L 30.42 114.93 L 30.26 114.79 L 30.06 114.67 L 29.84 114.59 L 29.58 114.55 L 29.32 114.56 L 29.04 114.62 L 28.76 114.73 L 28.5 114.9 L 28.26 115.12 L 28.06 115.39 L 27.9 115.7 L 27.79 116.05 L 27.74 116.43 L 27.76 116.83 L 27.85 117.22 L 28.01 117.62 L 28.24 117.99 L 28.54 118.32 L 28.91 118.61 L 29.33 118.84 L 29.8 119 L 30.3 119.08 L 30.82 119.08 L 31.35 118.98 L 31.87 118.79 L 32.36 118.51 L 32.81 118.15 L 33.2 117.7 L 33.52 117.18 L 33.76 116.6 L 33.89 115.98 L 33.92 115.33 L 33.85 114.67 L 33.65 114.01 L 33.35 113.39 L 32.94 112.81 L 32.42 112.3 L 31.82 111.87 L 31.14 111.54 L 30.41 111.33 L 29.63 111.24 L 28.84 111.28 L 28.04 111.45 L 27.28 111.76 L 26.56 112.19 L 25.91 112.75 L 25.36 113.42 L 24.92 114.18 L 24.6 115.02 L 24.43 115.92 L 24.4 116.85 L 24.53 117.78 L 24.82 118.69 L 25.26 119.55 L 25.84 120.35 L 26.56 121.04 L 27.39 121.62 L 28.32 122.05 L 29.32 122.33 L 30.37 122.45 L 31.44 122.39 L 32.5 122.14 L 33.52 121.73 L 34.47 121.14 L 35.32 120.4 L 36.04 119.51 L 36.62 118.51 L 37.03 117.41 L 37.25 116.25 L 37.28 115.04 L 37.11 113.84 L 36.74 112.67 L 36.18 111.56 L 35.43 110.54 L 34.51 109.66 L 33.46 108.93 L 32.28 108.37 L 31.01 108.01 L 29.69 107.87 L 28.34 107.94 L 27.01 108.24 L 25.74 108.76 L 24.56 109.48 L 23.5 110.4 L 22.59 111.5 L 21.87 112.74 L 21.36 114.09 L 21.08 115.53 L 21.03 117 L 21.23 118.48 L 21.68 119.92 L 22.36 121.28 L 23.26 122.52 L 24.36 123.6 L 25.64 124.5 L 27.06 125.18 L 28.59 125.63 L 30.19 125.82 L 31.81 125.74 L 33.41 125.4 L 34.94 124.79 L 36.37 123.93 L 37.65 122.84 L 38.74 121.55 L 39.61 120.08 L 40.23 118.47 L 40.59 116.77 L 40.66 115.02 L 40.44 113.27 L 39.93 111.56 L 39.15 109.94 L 38.1 108.47 L 36.81 107.18 L 35.32 106.1 L 33.65 105.28 L 31.87 104.74 L 30 104.5 C 41 102, 41 91, 30 89 C 19 87, 19 77.5, 30 75.5 C 38 73.5, 38 66, 30 64 L 30 30" />
              <circle cx="30" cy="22" r="2" fill="currentColor" stroke="none" />
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
