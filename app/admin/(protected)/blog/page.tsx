import { createAdminClient } from '@/lib/supabase/admin'
import type { Post } from '@/lib/types'
import Link from 'next/link'
import { togglePostStatus } from './actions'
import DeletePostButton from '@/components/admin/DeletePostButton'

function formatDate(str: string) {
  const d = new Date(str)
  return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default async function AdminBlogPage() {
  const admin = createAdminClient()
  const { data: posts } = await admin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  const allPosts = (posts ?? []) as Post[]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-coffee-dark">Blog Yazıları</h1>
        <Link
          href="/admin/blog/yeni"
          className="bg-coffee-dark text-white text-sm px-5 py-2.5 rounded-lg hover:bg-coffee transition-colors"
        >
          + Yeni Yazı
        </Link>
      </div>

      {allPosts.length === 0 ? (
        <div
          className="bg-white rounded-2xl p-12 text-center"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <p className="text-text-soft mb-4">Henüz yazı yok.</p>
          <Link
            href="/admin/blog/yeni"
            className="text-coffee-dark text-sm underline underline-offset-2"
          >
            İlk yazıyı oluştur
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-beige bg-cream/60">
                <th className="text-left px-6 py-4 text-text-soft font-normal">Başlık</th>
                <th className="text-left px-4 py-4 text-text-soft font-normal hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-4 text-text-soft font-normal">Durum</th>
                <th className="text-left px-4 py-4 text-text-soft font-normal hidden lg:table-cell">Tarih</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {allPosts.map((post) => (
                <tr key={post.id} className="border-b border-beige/50 last:border-0 hover:bg-cream/40 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-text-main line-clamp-1">{post.title}</span>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-text-soft">
                    {post.category ?? '—'}
                  </td>
                  <td className="px-4 py-4">
                    <form action={togglePostStatus}>
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="status" value={post.status} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-colors"
                        style={
                          post.status === 'published'
                            ? { background: 'rgba(34,197,94,0.12)', color: '#15803d' }
                            : { background: 'rgba(107,84,72,0.10)', color: 'var(--color-text-soft)' }
                        }
                        title="Durumu değiştir"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: post.status === 'published' ? '#16a34a' : 'var(--color-beige-mid)' }}
                        />
                        {post.status === 'published' ? 'Yayında' : 'Taslak'}
                      </button>
                    </form>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-text-soft text-xs">
                    {formatDate(post.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <Link
                        href={`/admin/blog/${post.id}/duzenle`}
                        className="text-coffee-dark text-xs hover:underline underline-offset-2"
                      >
                        Düzenle
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
