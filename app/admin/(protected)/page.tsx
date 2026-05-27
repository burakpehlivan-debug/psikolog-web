import { createAdminClient } from '@/lib/supabase/admin'
import Link from 'next/link'

export default async function AdminDashboard() {
  const admin = createAdminClient()

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: pendingAppts },
  ] = await Promise.all([
    admin.from('posts').select('*', { count: 'exact', head: true }),
    admin.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    admin.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    admin.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ])

  const stats = [
    { label: 'Toplam Yazı', value: totalPosts ?? 0 },
    { label: 'Yayında', value: publishedPosts ?? 0 },
    { label: 'Taslak', value: draftPosts ?? 0 },
    { label: 'Bekleyen Randevu', value: pendingAppts ?? 0 },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-coffee-dark">Dashboard</h1>
        <Link
          href="/admin/blog/yeni"
          className="bg-coffee-dark text-white text-sm px-5 py-2.5 rounded-lg hover:bg-coffee transition-colors"
        >
          + Yeni Yazı
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white rounded-xl p-5"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <p className="text-text-soft text-xs mb-2">{label}</p>
            <p className="font-serif text-3xl text-coffee-dark">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/admin/blog"
          className="border border-beige text-text-soft text-sm px-5 py-2.5 rounded-lg hover:bg-beige transition-colors"
        >
          Yazıları Yönet
        </Link>
      </div>
    </div>
  )
}
