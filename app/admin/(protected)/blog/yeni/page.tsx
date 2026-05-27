import PostForm from '@/components/admin/PostForm'
import { createPost } from '../actions'
import Link from 'next/link'

export default function NewPostPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/blog" className="text-text-soft hover:text-coffee-dark transition-colors text-sm">
          ← Blog Yazıları
        </Link>
        <span className="text-beige-mid">›</span>
        <h1 className="font-serif text-2xl text-coffee-dark">Yeni Yazı</h1>
      </div>

      <PostForm action={createPost} />
    </div>
  )
}
