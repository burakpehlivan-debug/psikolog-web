import Link from 'next/link'
import type { Post } from '@/lib/types'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function BlogPreviewSection({ posts }: { posts: Post[] }) {
  if (!posts.length) return null

  return (
    <section className="bg-beige py-26 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="block font-sans font-light text-[0.75rem] tracking-[0.28em] uppercase text-coffee mb-4">Blog</span>
          <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] text-coffee-dark">Son Yazılar</h2>
          <div className="w-11 h-px bg-coffee-light mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {posts.map((post, i) => (
            <RevealOnScroll key={post.id} direction="up" delay={i * 120}>
            <Link
              href={`/blog/${post.slug}`}
              className="bg-white p-10 cursor-pointer hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(74,55,40,0.16)] transition-all duration-300 no-underline block"
            >
              <span className="block text-[0.75rem] tracking-[0.22em] uppercase text-coffee mb-3">{post.category}</span>
              <h3 className="font-serif text-[1.25rem] text-coffee-dark mb-3 leading-[1.3]">{post.title}</h3>
              <p className="text-[0.91rem] text-text-soft leading-[1.95] line-clamp-3">{post.excerpt}</p>
              <div className="mt-6 text-[0.8rem] text-beige-mid">{formatDate(post.created_at)}</div>
            </Link>
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/blog"
            className="bg-transparent text-coffee-dark px-8 py-3 border border-coffee-dark text-[0.85rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee-dark hover:text-cream transition-all duration-300 no-underline inline-block"
          >
            Tüm Yazıları Gör
          </Link>
        </div>
      </div>
    </section>
  )
}
