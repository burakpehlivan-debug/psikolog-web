'use server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
}

export async function createPost(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  await requireAuth()
  const admin = createAdminClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = (formData.get('category') as string).trim() || null
  const content = formData.get('content') as string
  const excerpt = (formData.get('excerpt') as string).trim() || null
  const _action = formData.get('_action') as string
  const status: 'draft' | 'published' = _action === 'publish' ? 'published' : 'draft'
  const coverFile = formData.get('cover_image') as File | null

  let cover_image_url: string | null = null
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split('.').pop() ?? 'jpg'
    const path = `covers/${Date.now()}.${ext}`
    const { error: uploadError } = await admin.storage
      .from('blog-images')
      .upload(path, coverFile, { upsert: true })
    if (!uploadError) {
      const { data: urlData } = admin.storage.from('blog-images').getPublicUrl(path)
      cover_image_url = urlData.publicUrl
    }
  }

  const { error } = await admin.from('posts').insert({
    title,
    slug,
    category,
    content,
    excerpt,
    cover_image_url,
    status,
  })

  if (error) {
    if (error.code === '23505') return 'Bu slug zaten kullanılıyor. Farklı bir slug deneyin.'
    return error.message
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function updatePost(
  id: string,
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  await requireAuth()
  const admin = createAdminClient()

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const category = (formData.get('category') as string).trim() || null
  const content = formData.get('content') as string
  const excerpt = (formData.get('excerpt') as string).trim() || null
  const _action = formData.get('_action') as string
  const status: 'draft' | 'published' = _action === 'publish' ? 'published' : 'draft'
  const coverFile = formData.get('cover_image') as File | null
  const existingCoverUrl = (formData.get('existing_cover_url') as string) || null

  let cover_image_url = existingCoverUrl
  if (coverFile && coverFile.size > 0) {
    const ext = coverFile.name.split('.').pop() ?? 'jpg'
    const path = `covers/${Date.now()}.${ext}`
    const { error: uploadError } = await admin.storage
      .from('blog-images')
      .upload(path, coverFile, { upsert: true })
    if (!uploadError) {
      const { data: urlData } = admin.storage.from('blog-images').getPublicUrl(path)
      cover_image_url = urlData.publicUrl
    }
  }

  const { error } = await admin
    .from('posts')
    .update({ title, slug, category, content, excerpt, cover_image_url, status })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') return 'Bu slug zaten kullanılıyor. Farklı bir slug deneyin.'
    return error.message
  }

  revalidatePath('/admin/blog')
  revalidatePath(`/blog/${slug}`)
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function deletePost(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const admin = createAdminClient()
  await admin.from('posts').delete().eq('id', id)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  redirect('/admin/blog')
}

export async function togglePostStatus(formData: FormData) {
  await requireAuth()
  const id = formData.get('id') as string
  const currentStatus = formData.get('status') as string
  const newStatus = currentStatus === 'draft' ? 'published' : 'draft'
  const admin = createAdminClient()
  await admin.from('posts').update({ status: newStatus }).eq('id', id)
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
}
