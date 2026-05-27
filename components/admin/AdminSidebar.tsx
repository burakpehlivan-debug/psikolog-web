'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/(protected)/actions'

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  const links = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/blog', label: 'Blog Yazıları', exact: false },
    { href: '/admin/randevu', label: 'Randevular', exact: false },
    { href: '/admin/ayarlar', label: 'Ayarlar', exact: false },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-coffee-dark flex flex-col z-40">
      <div className="px-6 py-7 border-b" style={{ borderColor: 'rgba(139,111,94,0.3)' }}>
        <p className="font-serif text-white text-lg leading-tight">Hande Pehlivan</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-coffee-light)' }}>
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 py-3">
        {links.map(({ href, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center px-6 py-3 text-sm transition-colors"
              style={{
                color: isActive ? '#fff' : 'var(--color-coffee-light)',
                backgroundColor: isActive ? 'rgba(139,111,94,0.35)' : 'transparent',
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-6 py-5 border-t" style={{ borderColor: 'rgba(139,111,94,0.3)' }}>
        <p className="text-xs truncate mb-3" style={{ color: 'var(--color-coffee-light)' }}>
          {email}
        </p>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm transition-colors"
            style={{ color: 'var(--color-coffee-light)' }}
            onMouseOver={e => (e.currentTarget.style.color = '#fff')}
            onMouseOut={e => (e.currentTarget.style.color = 'var(--color-coffee-light)')}
          >
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  )
}
