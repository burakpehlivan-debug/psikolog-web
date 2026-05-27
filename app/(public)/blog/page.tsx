import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types'
import BlogList from '@/components/public/BlogList'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog | Hande Pehlivan',
  description: 'Çocuk ve ergen psikolojisi üzerine yazılar.',
}

async function getPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    return data ?? []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()
  return (
    <>
      <section className="bg-coffee-dark px-8 py-36 md:py-44 text-center relative overflow-hidden">
        {/* Radial gradient zemin */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 50% 120%, rgba(184,152,128,0.22) 0%, transparent 70%),
                         radial-gradient(ellipse 50% 60% at 10% 30%, rgba(139,111,94,0.18) 0%, transparent 60%)`,
          }}
        />
        {/* Sağ üstte dekoratif halka */}
        <div
          className="hidden md:block absolute -right-32 -top-32 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.18)' }}
        />
        <div
          className="hidden md:block absolute -right-16 -top-16 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.12)' }}
        />
        {/* Sol altta küçük dekoratif halka */}
        <div
          className="hidden md:block absolute -left-24 -bottom-24 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.10)' }}
        />

        <div className="relative z-10 max-w-[640px] mx-auto">
          <p className="flex items-center justify-center gap-4 font-sans font-light text-[0.7rem] tracking-[0.3em] uppercase text-coffee-light mb-7">
            <span className="block w-8 h-px bg-coffee-light/60" />
            Hande Pehlivan
            <span className="block w-8 h-px bg-coffee-light/60" />
          </p>
          <h1 className="text-[clamp(2.8rem,5vw,4rem)] text-cream mb-6 leading-[1.1]">
            Düşünceler &amp; <em className="italic text-coffee-light font-normal">Notlar</em>
          </h1>
          <p className="text-[0.95rem] text-cream/70 max-w-md mx-auto leading-[1.95]">
            Çocuk ve ergen psikolojisi, ebeveynlik ve terapi süreçleri üzerine yazılar.
          </p>
          {posts.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-3 text-[0.65rem] tracking-[0.22em] uppercase text-cream/50">
              <span className="block w-6 h-px bg-cream/30" />
              <span>{posts.length} Yazı</span>
              <span className="block w-6 h-px bg-cream/30" />
            </div>
          )}
        </div>
      </section>
      <BlogList posts={posts} />
    </>
  )
}
