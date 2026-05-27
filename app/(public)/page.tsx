import HeroSection from '@/components/public/HeroSection'
import AboutSection from '@/components/public/AboutSection'
import ExpertiseSection from '@/components/public/ExpertiseSection'
import BlogPreviewSection from '@/components/public/BlogPreviewSection'
import CtaBand from '@/components/public/CtaBand'
import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types'

export const revalidate = 60

async function getRecentPosts(): Promise<Post[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(2)
    return data ?? []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const posts = await getRecentPosts()

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <BlogPreviewSection posts={posts} />
      <CtaBand />
    </>
  )
}
