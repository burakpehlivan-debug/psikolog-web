import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const supabase = await createClient()
  const { data: post } = await supabase
    .from('posts')
    .select('title, category, cover_image_url')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  const title = post?.title ?? 'Hande Pehlivan'
  const category = post?.category ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#4A3728',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Dekoratif halka */}
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            border: '1px solid rgba(184,152,128,0.25)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '1px solid rgba(184,152,128,0.15)',
          }}
        />

        {/* Kategori */}
        {category && (
          <div
            style={{
              display: 'flex',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                background: 'rgba(184,152,128,0.20)',
                color: '#B89880',
                fontSize: 14,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '6px 16px',
                borderRadius: 99,
              }}
            >
              {category}
            </span>
          </div>
        )}

        {/* Başlık */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            paddingTop: category ? 0 : 40,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#FAF7F2',
              fontSize: title.length > 60 ? 44 : 56,
              fontWeight: 400,
              lineHeight: 1.2,
              maxWidth: 800,
            }}
          >
            {title}
          </h1>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(184,152,128,0.25)',
            paddingTop: 28,
            marginTop: 28,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#FAF7F2', fontSize: 20, fontWeight: 400 }}>
              Hande Pehlivan
            </span>
            <span style={{ color: '#B89880', fontSize: 14, marginTop: 4, letterSpacing: '1px' }}>
              KLİNİK PSİKOLOG
            </span>
          </div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1px solid rgba(184,152,128,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#B89880', fontSize: 20 }}>H</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
