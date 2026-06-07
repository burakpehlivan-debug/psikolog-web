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
              viewBox="0 0 64 165"
              width="19"
              height="49"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-coffee-dark flex-shrink-0"
            >
              <path d="M 32.00 132.00 L 32.02 132.11 L 32.07 132.22 L 32.14 132.31 L 32.25 132.38 L 32.38 132.42 L 32.52 132.43 L 32.68 132.41 L 32.84 132.35 L 32.99 132.25 L 33.13 132.12 L 33.25 131.95 L 33.34 131.75 L 33.39 131.52 L 33.41 131.26 L 33.38 131.00 L 33.30 130.73 L 33.16 130.47 L 32.98 130.21 L 32.75 129.98 L 32.47 129.78 L 32.15 129.62 L 31.79 129.52 L 31.40 129.46 L 31.00 129.47 L 30.58 129.55 L 30.17 129.69 L 29.77 129.91 L 29.39 130.19 L 29.06 130.54 L 28.77 130.95 L 28.54 131.41 L 28.37 131.92 L 28.29 132.47 L 28.29 133.04 L 28.38 133.61 L 28.56 134.19 L 28.83 134.74 L 29.19 135.26 L 29.63 135.73 L 30.16 136.14 L 30.75 136.48 L 31.40 136.72 L 32.10 136.87 L 32.83 136.92 L 33.58 136.85 L 34.32 136.67 L 35.04 136.37 L 35.72 135.97 L 36.35 135.45 L 36.91 134.83 L 37.37 134.13 L 37.74 133.35 L 37.99 132.50 L 38.11 131.62 L 38.10 130.70 L 37.95 129.79 L 37.66 128.89 L 37.24 128.03 L 36.68 127.22 L 36.00 126.50 L 35.20 125.87 L 34.31 125.36 L 33.34 124.99 L 32.30 124.75 L 31.23 124.67 L 30.14 124.75 L 29.06 125.00 L 28.01 125.41 L 27.02 125.97 L 26.10 126.69 L 25.30 127.55 L 24.62 128.53 L 24.08 129.61 L 23.70 130.77 L 23.50 132.00 L 23.48 133.26 L 23.65 134.52 L 24.00 135.76 L 24.54 136.95 L 25.26 138.07 L 26.15 139.07 L 27.19 139.95 L 28.35 140.67 L 29.63 141.22 L 30.99 141.58 L 32.41 141.74 L 33.85 141.69 L 35.28 141.42 L 36.67 140.94 L 38.00 140.25 L 39.22 139.37 L 40.31 138.30 L 41.24 137.08 L 41.99 135.71 L 42.53 134.24 L 42.86 132.68 L 42.95 131.08 L 42.81 129.46 L 42.43 127.87 L 41.81 126.33 L 40.97 124.89 L 39.91 123.57 L 38.66 122.41 L 37.24 121.44 L 35.68 120.68 L 34.00 120.15 L 32.25 119.88 L 30.47 119.86 L 28.68 120.10 L 26.93 120.61 L 25.26 121.38 L 23.71 122.39 L 22.31 123.63 L 21.09 125.08 L 20.09 126.70 L 19.34 128.46 L 18.84 130.34 L 18.63 132.28 L 18.70 134.25 L 19.07 136.20 L 19.72 138.10 L 20.65 139.89 L 21.84 141.54 L 23.27 143.01 L 24.92 144.27 L 26.74 145.28 L 28.71 146.01 L 30.79 146.46 L 32.92 146.59 L 35.06 146.41 L 37.18 145.92 L 39.21 145.11 L 41.11 144.01 L 42.85 142.63 L 44.38 140.99 L 45.66 139.14 L 46.66 137.11 L 47.36 134.93 L 47.74 132.66 L 47.78 130.34 L 47.48 128.03 L 46.84 125.76 L 45.86 123.60 L 44.57 121.60 L 43.00 119.79 L 41.16 118.22 L 39.09 116.93 L 36.85 115.94 L 34.47 115.29 L 32.00 115.00 L 32 30 M 42.50 107.00 L 42.47 107.75 L 42.40 108.49 L 42.27 109.20 L 42.09 109.86 L 41.87 110.47 L 41.59 111.01 L 41.27 111.48 L 40.90 111.85 L 40.49 112.14 L 40.04 112.32 L 39.55 112.40 L 39.03 112.37 L 38.46 112.24 L 37.87 112.01 L 37.25 111.68 L 36.60 111.26 L 35.93 110.75 L 35.24 110.17 L 34.54 109.54 L 33.82 108.85 L 33.10 108.12 L 32.37 107.38 L 31.63 106.62 L 30.90 105.88 L 30.18 105.15 L 29.46 104.46 L 28.76 103.83 L 28.07 103.25 L 27.40 102.74 L 26.75 102.32 L 26.13 101.99 L 25.54 101.76 L 24.97 101.63 L 24.45 101.60 L 23.96 101.68 L 23.51 101.86 L 23.10 102.15 L 22.73 102.52 L 22.41 102.99 L 22.13 103.53 L 21.91 104.14 L 21.73 104.80 L 21.60 105.51 L 21.53 106.25 L 21.50 107.00 L 21.53 107.75 L 21.60 108.49 L 21.73 109.20 L 21.91 109.86 L 22.13 110.47 L 22.41 111.01 L 22.73 111.48 L 23.10 111.85 L 23.51 112.14 L 23.96 112.32 L 24.45 112.40 L 24.97 112.37 L 25.54 112.24 L 26.13 112.01 L 26.75 111.68 L 27.40 111.26 L 28.07 110.75 L 28.76 110.17 L 29.46 109.54 L 30.18 108.85 L 30.90 108.12 L 31.63 107.38 L 32.37 106.62 L 33.10 105.88 L 33.82 105.15 L 34.54 104.46 L 35.24 103.83 L 35.93 103.25 L 36.60 102.74 L 37.25 102.32 L 37.87 101.99 L 38.46 101.76 L 39.03 101.63 L 39.55 101.60 L 40.04 101.68 L 40.49 101.86 L 40.90 102.15 L 41.27 102.52 L 41.59 102.99 L 41.87 103.53 L 42.09 104.14 L 42.27 104.80 L 42.40 105.51 L 42.47 106.25 L 42.50 107.00 Z M 40.00 92.00 L 39.98 92.58 L 39.92 93.16 L 39.83 93.71 L 39.69 94.23 L 39.52 94.70 L 39.31 95.12 L 39.06 95.48 L 38.78 95.77 L 38.47 95.99 L 38.13 96.14 L 37.75 96.20 L 37.35 96.18 L 36.93 96.08 L 36.47 95.89 L 36.00 95.64 L 35.51 95.31 L 35.00 94.92 L 34.47 94.47 L 33.94 93.97 L 33.39 93.44 L 32.84 92.87 L 32.28 92.29 L 31.72 91.71 L 31.16 91.13 L 30.61 90.56 L 30.06 90.03 L 29.53 89.53 L 29.00 89.08 L 28.49 88.69 L 28.00 88.36 L 27.53 88.11 L 27.07 87.92 L 26.65 87.82 L 26.25 87.80 L 25.87 87.86 L 25.53 88.01 L 25.22 88.23 L 24.94 88.52 L 24.69 88.88 L 24.48 89.30 L 24.31 89.77 L 24.17 90.29 L 24.08 90.84 L 24.02 91.42 L 24.00 92.00 L 24.02 92.58 L 24.08 93.16 L 24.17 93.71 L 24.31 94.23 L 24.48 94.70 L 24.69 95.12 L 24.94 95.48 L 25.22 95.77 L 25.53 95.99 L 25.87 96.14 L 26.25 96.20 L 26.65 96.18 L 27.07 96.08 L 27.53 95.89 L 28.00 95.64 L 28.49 95.31 L 29.00 94.92 L 29.53 94.47 L 30.06 93.97 L 30.61 93.44 L 31.16 92.87 L 31.72 92.29 L 32.28 91.71 L 32.84 91.13 L 33.39 90.56 L 33.94 90.03 L 34.47 89.53 L 35.00 89.08 L 35.51 88.69 L 36.00 88.36 L 36.47 88.11 L 36.93 87.92 L 37.35 87.82 L 37.75 87.80 L 38.13 87.86 L 38.47 88.01 L 38.78 88.23 L 39.06 88.52 L 39.31 88.88 L 39.52 89.30 L 39.69 89.77 L 39.83 90.29 L 39.92 90.84 L 39.98 91.42 L 40.00 92.00 Z M 37.60 78.00 L 37.59 78.45 L 37.55 78.88 L 37.48 79.30 L 37.38 79.70 L 37.26 80.06 L 37.12 80.38 L 36.94 80.65 L 36.75 80.88 L 36.53 81.04 L 36.29 81.15 L 36.03 81.20 L 35.75 81.18 L 35.45 81.10 L 35.13 80.97 L 34.80 80.77 L 34.45 80.52 L 34.10 80.22 L 33.73 79.88 L 33.35 79.50 L 32.97 79.09 L 32.59 78.67 L 32.20 78.22 L 31.80 77.78 L 31.41 77.33 L 31.03 76.91 L 30.65 76.50 L 30.27 76.12 L 29.90 75.78 L 29.55 75.48 L 29.20 75.23 L 28.87 75.03 L 28.55 74.90 L 28.25 74.82 L 27.97 74.80 L 27.71 74.85 L 27.47 74.96 L 27.25 75.12 L 27.06 75.35 L 26.88 75.62 L 26.74 75.94 L 26.62 76.30 L 26.52 76.70 L 26.45 77.12 L 26.41 77.55 L 26.40 78.00 L 26.41 78.45 L 26.45 78.88 L 26.52 79.30 L 26.62 79.70 L 26.74 80.06 L 26.88 80.38 L 27.06 80.65 L 27.25 80.88 L 27.47 81.04 L 27.71 81.15 L 27.97 81.20 L 28.25 81.18 L 28.55 81.10 L 28.87 80.97 L 29.20 80.77 L 29.55 80.52 L 29.90 80.22 L 30.27 79.88 L 30.65 79.50 L 31.03 79.09 L 31.41 78.67 L 31.80 78.22 L 32.20 77.78 L 32.59 77.33 L 32.97 76.91 L 33.35 76.50 L 33.73 76.12 L 34.10 75.78 L 34.45 75.48 L 34.80 75.23 L 35.13 75.03 L 35.45 74.90 L 35.75 74.82 L 36.03 74.80 L 36.29 74.85 L 36.53 74.96 L 36.75 75.12 L 36.94 75.35 L 37.12 75.62 L 37.26 75.94 L 37.38 76.30 L 37.48 76.70 L 37.55 77.12 L 37.59 77.55 L 37.60 78.00 Z" />
              <circle cx="32" cy="22" r="2" fill="currentColor" stroke="none" />
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
