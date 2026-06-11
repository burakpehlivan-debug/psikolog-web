import HeroSection from '@/components/public/HeroSection'
import AboutSection from '@/components/public/AboutSection'
import ExpertiseSection from '@/components/public/ExpertiseSection'
import BlogPreviewSection from '@/components/public/BlogPreviewSection'
import CtaBand from '@/components/public/CtaBand'
import { createClient } from '@/lib/supabase/server'
import type { Post } from '@/lib/types'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

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

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'tr-TR',
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <BlogPreviewSection posts={posts} />
      <CtaBand />
    </>
  )
}
