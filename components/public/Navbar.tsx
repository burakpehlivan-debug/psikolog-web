'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/blog', label: 'Blog' },
  { href: '/randevu', label: 'Randevu' },
  { href: '/iletisim', label: 'İletişim' },
]

export default function Navbar() {
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
          <Link href="/" className="cursor-pointer">
            <span className="block font-serif text-[1.1rem] text-coffee-dark">Hande Pehlivan</span>
            <span className="block font-sans font-light text-[0.62rem] text-coffee tracking-[0.22em] uppercase mt-0.5">Klinik Psikolog</span>
          </Link>

          <ul className="hidden md:flex gap-9 list-none items-center">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-sans font-normal text-[0.8rem] tracking-[0.12em] uppercase no-underline transition-colors duration-200 ${
                    pathname === href ? 'text-coffee-dark' : 'text-text-soft hover:text-coffee-dark'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/randevu"
                className="font-sans text-[0.8rem] tracking-[0.12em] uppercase no-underline bg-coffee-dark text-cream px-5 py-2 hover:bg-coffee transition-colors duration-300"
              >
                Randevu Al
              </Link>
            </li>
          </ul>

          <button
            className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1.5 bg-transparent border-0"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Menü"
          >
            <span className="block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300" />
            <span className="block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300" />
            <span className="block w-[22px] h-[1.5px] bg-coffee-dark transition-all duration-300" />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-cream border-b border-beige z-40 px-8 pt-4 pb-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block text-[0.85rem] text-text-soft tracking-[0.12em] uppercase no-underline py-3 border-b border-beige"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
