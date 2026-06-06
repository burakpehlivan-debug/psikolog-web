import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getPost(slug: string): Promise<Post | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()
    return data
  } catch {
    return null
  }
}

async function getAdjacentPosts(currentId: string): Promise<{ prev: Post | null; next: Post | null }> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('id, slug, title, category, created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .order('id', { ascending: false })
    const list = (data ?? []) as Post[]
    const idx = list.findIndex(p => p.id === currentId)
    if (idx === -1) return { prev: null, next: null }
    return {
      prev: list[idx + 1] ?? null,
      next: list[idx - 1] ?? null,
    }
  } catch {
    return { prev: null, next: null }
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Yazı Bulunamadı' }
  return {
    title: `${post.title} | Hande Pehlivan`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const months = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function readingTime(html: string) {
  const text = html.replace(/<[^>]+>/g, '')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const { prev, next } = await getAdjacentPosts(post.id)

  return (
    <>
      {/* Üst header — coffee-dark bant */}
      <section className="bg-coffee-dark px-8 pt-20 pb-24 md:pt-24 md:pb-32 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 80% at 50% 130%, rgba(184,152,128,0.22) 0%, transparent 65%),
                         radial-gradient(ellipse 40% 50% at 90% 20%, rgba(139,111,94,0.15) 0%, transparent 60%)`,
          }}
        />
        <div
          className="hidden md:block absolute -right-40 -top-40 w-[460px] h-[460px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.14)' }}
        />

        <div className="relative z-10 max-w-[760px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.8rem] tracking-[0.18em] uppercase text-cream/85 no-underline mb-12 hover:text-cream transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Tüm Yazılar
          </Link>

          {post.category && (
            <span className="inline-block text-[0.8rem] tracking-[0.26em] uppercase text-coffee-light border border-coffee-light/40 px-3 py-1.5 mb-6">
              {post.category}
            </span>
          )}
          <h1 className="font-serif text-[clamp(2rem,4vw,2.85rem)] text-cream mb-6 leading-[1.18]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-[1rem] text-cream/70 max-w-[640px] leading-[1.85] font-display italic mb-8">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-[0.8rem] tracking-[0.12em] uppercase text-cream/60">
            <span>{formatDate(post.created_at)}</span>
            <span className="block w-1 h-1 rounded-full bg-cream/40" />
            <span>{readingTime(post.content)} dk okuma</span>
          </div>
        </div>
      </section>

      {/* Kapak görseli */}
      {post.cover_image_url && (
        <div className="max-w-[900px] mx-auto px-8 -mt-16 relative z-20">
          <div className="w-full h-[380px] overflow-hidden" style={{ boxShadow: '0 18px 48px rgba(74,55,40,0.22)' }}>
            <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* İçerik kartı — daraltılmış, justified */}
      <article className={`max-w-[760px] mx-auto px-6 ${post.cover_image_url ? 'pt-16' : '-mt-12 relative z-20'} pb-16`}>
        <div
          className="bg-white px-6 md:px-14 py-14 md:py-16"
          style={{ boxShadow: '0 6px 28px rgba(74,55,40,0.08)' }}
        >
          <div className="w-12 h-px bg-coffee-light mb-10" />
          <div
            className="post-content text-[1.04rem] text-text-main leading-[2.05]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Prev / Next yazı navigasyonu */}
      {(prev || next) && (
        <nav className="max-w-[1080px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group bg-white p-7 md:p-8 no-underline block transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 18px rgba(74,55,40,0.06)' }}
              >
                <div className="flex items-center gap-2 text-[0.68rem] tracking-[0.24em] uppercase text-coffee-light mb-3">
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M19 12H5M12 5l-7 7 7 7"/>
                  </svg>
                  Önceki Yazı
                </div>
                <h3 className="font-serif text-[1.05rem] text-coffee-dark leading-[1.35] group-hover:text-coffee transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group bg-white p-7 md:p-8 no-underline block md:text-right transition-all duration-300 hover:-translate-y-0.5"
                style={{ boxShadow: '0 4px 18px rgba(74,55,40,0.06)' }}
              >
                <div className="flex items-center md:justify-end gap-2 text-[0.68rem] tracking-[0.24em] uppercase text-coffee-light mb-3">
                  Sonraki Yazı
                  <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                <h3 className="font-serif text-[1.05rem] text-coffee-dark leading-[1.35] group-hover:text-coffee transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : <div />}
          </div>
        </nav>
      )}
    </>
  )
}
