'use client'
import { useActionState, useState } from 'react'
import type { Post } from '@/lib/types'
import TipTapEditor from './TipTapEditor'

type PostAction = (
  prevState: string | null,
  formData: FormData
) => Promise<string | null>

interface Props {
  post?: Post
  action: PostAction
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function PostForm({ post, action }: Props) {
  const [error, formAction, isPending] = useActionState(action, null)

  const [slug, setSlug] = useState(post?.slug ?? '')
  const [slugEdited, setSlugEdited] = useState(!!post)
  const [content, setContent] = useState(post?.content ?? '')
  const [coverPreview, setCoverPreview] = useState<string | null>(post?.cover_image_url ?? null)

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugEdited) setSlug(toSlug(e.target.value))
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSlug(toSlug(e.target.value))
    setSlugEdited(true)
  }

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const labelClass = 'block text-sm text-text-soft mb-1.5'
  const inputClass =
    'w-full border border-beige rounded-lg px-4 py-2.5 text-text-main text-sm focus:outline-none focus:border-coffee-light bg-white'

  return (
    <form action={formAction} encType="multipart/form-data">
      {/* Hidden inputs */}
      <input type="hidden" name="content" value={content} />
      {post && <input type="hidden" name="existing_cover_url" value={post.cover_image_url ?? ''} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol: ana içerik */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className={labelClass}>Başlık *</label>
            <input
              name="title"
              type="text"
              required
              defaultValue={post?.title}
              onChange={handleTitleChange}
              className={inputClass}
              placeholder="Yazı başlığı"
            />
          </div>

          <div>
            <label className={labelClass}>Slug *</label>
            <div className="flex items-center">
              <span className="text-xs text-text-soft mr-1">/blog/</span>
              <input
                name="slug"
                type="text"
                required
                value={slug}
                onChange={handleSlugChange}
                className={inputClass}
                placeholder="yazi-slug"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>İçerik *</label>
            <TipTapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sağ: meta */}
        <div className="space-y-5">
          <div
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h3 className="font-serif text-coffee-dark mb-4">Meta</h3>

            <div className="mb-4">
              <label className={labelClass}>Kategori</label>
              <input
                name="category"
                type="text"
                defaultValue={post?.category ?? ''}
                className={inputClass}
                placeholder="ör. BDT, Oyun Terapisi"
              />
            </div>

            <div>
              <label className={labelClass}>Özet</label>
              <textarea
                name="excerpt"
                rows={4}
                defaultValue={post?.excerpt ?? ''}
                className={`${inputClass} resize-none`}
                placeholder="Kısa açıklama (opsiyonel)"
              />
            </div>
          </div>

          <div
            className="bg-white rounded-2xl p-5"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <h3 className="font-serif text-coffee-dark mb-4">Kapak Görseli</h3>
            {coverPreview && (
              <img
                src={coverPreview}
                alt="Kapak önizleme"
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
            )}
            <input
              name="cover_image"
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="w-full text-xs text-text-soft file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-beige file:text-coffee-dark file:cursor-pointer cursor-pointer"
            />
            {coverPreview && (
              <button
                type="button"
                onClick={() => setCoverPreview(null)}
                className="mt-2 text-xs text-text-soft hover:text-red-500 transition-colors"
              >
                Görseli kaldır
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              name="_action"
              value="publish"
              disabled={isPending}
              className="w-full bg-coffee-dark text-white text-sm py-2.5 rounded-lg hover:bg-coffee transition-colors disabled:opacity-60"
            >
              {isPending ? 'Kaydediliyor…' : 'Yayınla'}
            </button>
            <button
              type="submit"
              name="_action"
              value="draft"
              disabled={isPending}
              className="w-full border border-beige text-text-soft text-sm py-2.5 rounded-lg hover:bg-beige transition-colors disabled:opacity-60"
            >
              {isPending ? 'Kaydediliyor…' : 'Taslak Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
