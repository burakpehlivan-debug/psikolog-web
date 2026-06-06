'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Post } from '@/lib/types'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function readingTime(html: string | null | undefined) {
  if (!html) return 1
  const text = html.replace(/<[^>]+>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>()
    posts.forEach(p => {
      if (p.category) map.set(p.category, (map.get(p.category) ?? 0) + 1)
    })
    return map
  }, [posts])

  const categories = ['Tümü', ...Array.from(categoryCounts.keys())]
  const [active, setActive] = useState('Tümü')

  const filtered = active === 'Tümü' ? posts : posts.filter(p => p.category === active)

  if (!posts.length) {
    return (
      <div className="max-w-[860px] mx-auto px-8 py-24 text-center">
        <p className="text-text-soft text-[0.95rem] italic font-display">Henüz yazı yayınlanmamış.</p>
      </div>
    )
  }

  const [featured, ...rest] = filtered

  return (
    <div className="max-w-[940px] mx-auto px-8 py-20">
      {/* Kategori filtresi */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-3 mb-14 justify-center">
          <span className="hidden sm:block text-[0.76rem] tracking-[0.28em] uppercase text-coffee-light mr-3">Kategoriler</span>
          {categories.map(cat => {
            const count = cat === 'Tümü' ? posts.length : categoryCounts.get(cat) ?? 0
            const isActive = active === cat
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`group inline-flex items-center gap-2 px-5 py-2.5 text-[0.78rem] tracking-[0.18em] uppercase font-sans transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-cream'
                    : 'bg-transparent text-text-soft border border-beige-mid hover:border-coffee hover:text-coffee-dark'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, #4A3728 0%, #8B6F5E 100%)',
                  border: '1px solid transparent',
                  boxShadow: '0 6px 18px rgba(74,55,40,0.18)',
                } : {}}
              >
                <span>{cat}</span>
                <span className={`text-[0.76rem] tracking-normal px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-cream/20 text-cream' : 'bg-beige text-coffee'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Featured yazı (ilk yazı, sadece "Tümü" görünümde ve yazı varsa) */}
      {active === 'Tümü' && featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group relative block bg-white no-underline overflow-hidden mb-14 transition-all duration-500 hover:shadow-[0_22px_55px_rgba(74,55,40,0.18)]"
          style={{ boxShadow: '0 6px 28px rgba(74,55,40,0.08)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] min-h-[320px]">
            {/* Sol — görsel veya placeholder */}
            <div className="relative bg-beige overflow-hidden order-1 md:order-none">
              {featured.cover_image_url ? (
                <img
                  src={featured.cover_image_url}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #EDE5D8 0%, #D4C5B0 100%)',
                }}>
                  <div className="text-center text-coffee/40 font-display italic">
                    <svg className="w-14 h-14 mx-auto mb-3 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p className="text-[0.78rem]">Kapak görseli</p>
                  </div>
                </div>
              )}
              {/* Sol üstte küçük badge */}
              <div className="absolute top-5 left-5 bg-cream px-3 py-1.5 text-[0.65rem] tracking-[0.22em] uppercase text-coffee-dark">
                Öne Çıkan
              </div>
            </div>

            {/* Sağ — içerik */}
            <div className="p-10 md:p-12 flex flex-col justify-center">
              <span className="block text-[0.72rem] tracking-[0.24em] uppercase text-coffee mb-4">{featured.category}</span>
              <h2 className="font-serif text-[clamp(1.5rem,2.4vw,1.95rem)] text-coffee-dark mb-4 leading-[1.25] group-hover:text-coffee transition-colors">
                {featured.title}
              </h2>
              <p className="text-[0.95rem] text-text-soft leading-[1.95] mb-6 line-clamp-3">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-[0.78rem] text-coffee-light">
                <span>{formatDate(featured.created_at)}</span>
                <span className="block w-1 h-1 rounded-full bg-beige-mid" />
                <span>{readingTime(featured.content)} dk okuma</span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Geri kalan yazılar — grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {(active === 'Tümü' ? rest : filtered).map(post => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white block no-underline relative overflow-hidden transition-all duration-400 hover:-translate-y-1"
            style={{ boxShadow: '0 4px 22px rgba(74,55,40,0.07)' }}
          >
            {/* Kart üstündeki ince çizgi accent */}
            <div className="h-1 w-full bg-gradient-to-r from-coffee-dark via-coffee to-coffee-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Kart görseli/placeholder */}
            <div className="relative h-[180px] bg-beige overflow-hidden">
              {post.cover_image_url ? (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, #EDE5D8 0%, #D4C5B0 100%)',
                }}>
                  <svg className="w-10 h-10 text-coffee/25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-cream px-2.5 py-1 text-[0.63rem] tracking-[0.22em] uppercase text-coffee-dark">
                {post.category}
              </div>
            </div>

            <div className="p-8">
              <h2 className="font-serif text-[1.25rem] text-coffee-dark mb-3 leading-[1.3] group-hover:text-coffee transition-colors">
                {post.title}
              </h2>
              <p className="text-[0.9rem] text-text-soft leading-[1.9] mb-5 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-[0.76rem] text-coffee-light pt-4 border-t border-beige">
                <span>{formatDate(post.created_at)}</span>
                <span className="block w-1 h-1 rounded-full bg-beige-mid" />
                <span>{readingTime(post.content)} dk okuma</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
