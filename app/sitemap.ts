import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`,         lastModified: new Date(), changeFrequency: 'monthly',  priority: 1 },
    { url: `${base}/blog`,     lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${base}/randevu`,  lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${base}/iletisim`, lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.5 },
  ]

  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('posts')
      .select('slug, updated_at')
      .eq('status', 'published')
      .order('updated_at', { ascending: false })

    const postPages: MetadataRoute.Sitemap = (data ?? []).map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    return [...staticPages, ...postPages]
  } catch {
    return staticPages
  }
}
