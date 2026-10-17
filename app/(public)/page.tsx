import HeroSection from '@/components/public/HeroSection'
import AboutSection from '@/components/public/AboutSection'
import ExpertiseSection from '@/components/public/ExpertiseSection'
import BlogPreviewSection from '@/components/public/BlogPreviewSection'
import CtaBand from '@/components/public/CtaBand'
import { createClient } from '@/lib/supabase/server'
import type { Post, Settings } from '@/lib/types'
import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, PROFILE_IMAGE } from '@/lib/site'

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

async function getSettings(): Promise<Settings | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    return data
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [posts, settings] = await Promise.all([getRecentPosts(), getSettings()])

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'tr-TR',
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    image: PROFILE_IMAGE,
    url: SITE_URL,
    serviceType: 'Psikoterapi',
    areaServed: [
      { '@type': 'City', name: 'Tuzla' },
      { '@type': 'City', name: 'Gebze' },
      { '@type': 'Country', name: 'Türkiye' },
    ],
    ...(settings?.contact_email ? { email: settings.contact_email } : {}),
    ...(settings?.contact_phone ? { telephone: settings.contact_phone } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tuzla',
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    sameAs: [settings?.instagram_url, settings?.linkedin_url].filter(Boolean),
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <BlogPreviewSection posts={posts} />
      <CtaBand />
    </>
  )
}
