import { createAdminClient } from '@/lib/supabase/admin'
import type { Post } from '@/lib/types'
import PostForm from '@/components/admin/PostForm'
import { updatePost } from '../../actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const admin = createAdminClient()
  const { data } = await admin.from('posts').select('*').eq('id', id).single()
  if (!data) notFound()

  const post = data as Post
  const boundAction = updatePost.bind(null, id)

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-text-soft hover:text-coffee-dark transition-colors text-sm">
          ← Blog Yazıları
        </Link>
        <span className="text-beige-mid">›</span>
        <h1 className="font-serif text-2xl text-coffee-dark line-clamp-1">{post.title}</h1>
      </div>

      <PostForm post={post} action={boundAction} />
    </div>
  )
}
