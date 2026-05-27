import { createAdminClient } from '@/lib/supabase/admin'
import type { Appointment, BlockedSlot } from '@/lib/types'
import AppointmentActions from '@/components/admin/AppointmentActions'
import BlockSlotForm from '@/components/admin/BlockSlotForm'
import { deleteBlockedSlot } from './actions'

function formatDT(str: string) {
  const d = new Date(str)
  const months = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara']
  const days = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt']
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
}

const statusLabel: Record<string, { label: string; style: React.CSSProperties }> = {
  pending:  { label: 'Bekliyor',  style: { background: 'rgba(234,179,8,0.12)',   color: '#a16207' } },
  approved: { label: 'Onaylandı', style: { background: 'rgba(34,197,94,0.12)',   color: '#15803d' } },
  rejected: { label: 'Reddedildi', style: { background: 'rgba(239,68,68,0.10)',  color: '#b91c1c' } },
}

export default async function AdminRandevuPage() {
  const admin = createAdminClient()

  const [
    { data: pending },
    { data: all },
    { data: blocked },
  ] = await Promise.all([
    admin.from('appointments').select('*').eq('status', 'pending').order('start_datetime'),
    admin.from('appointments').select('*').order('start_datetime', { ascending: false }),
    admin.from('blocked_slots').select('*').order('start_datetime'),
  ])

  const pendingList = (pending ?? []) as Appointment[]
  const allList    = (all ?? []) as Appointment[]
  const blockedList = (blocked ?? []) as BlockedSlot[]

  return (
    <div className="space-y-10">
      <h1 className="font-serif text-2xl text-coffee-dark">Randevu Yönetimi</h1>

      {/* Bekleyen Talepler */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-serif text-lg text-coffee-dark">Bekleyen Talepler</h2>
          {pendingList.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
              {pendingList.length}
            </span>
          )}
        </div>

        {pendingList.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-text-soft text-sm" style={{ boxShadow: 'var(--shadow-card)' }}>
            Bekleyen talep yok.
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige bg-cream/60">
                  <th className="text-left px-6 py-4 font-normal text-text-soft">Ad Soyad</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft hidden md:table-cell">Telefon</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft hidden lg:table-cell">Not</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft">Tarih / Saat</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {pendingList.map((a) => (
                  <tr key={a.id} className="border-b border-beige/50 last:border-0">
                    <td className="px-6 py-4 font-medium text-text-main">{a.name}</td>
                    <td className="px-4 py-4 hidden md:table-cell text-text-soft">{a.phone}</td>
                    <td className="px-4 py-4 hidden lg:table-cell text-text-soft max-w-[200px]">
                      <span className="line-clamp-1">{a.note ?? '—'}</span>
                    </td>
                    <td className="px-4 py-4 text-text-soft text-xs whitespace-nowrap">
                      {formatDT(a.start_datetime)}
                    </td>
                    <td className="px-6 py-4">
                      <AppointmentActions id={a.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Slot Blokla */}
      <section>
        <h2 className="font-serif text-lg text-coffee-dark mb-4">Manuel Slot Blokla</h2>
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <BlockSlotForm />
        </div>

        {/* Mevcut bloklu slotlar */}
        {blockedList.length > 0 && (
          <div className="mt-4 bg-white rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige bg-cream/60">
                  <th className="text-left px-6 py-3 font-normal text-text-soft">Başlangıç</th>
                  <th className="text-left px-4 py-3 font-normal text-text-soft">Bitiş</th>
                  <th className="text-left px-4 py-3 font-normal text-text-soft hidden md:table-cell">Açıklama</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody>
                {blockedList.map((slot) => (
                  <tr key={slot.id} className="border-b border-beige/50 last:border-0">
                    <td className="px-6 py-3 text-text-soft text-xs">{formatDT(slot.start_datetime)}</td>
                    <td className="px-4 py-3 text-text-soft text-xs">{formatDT(slot.end_datetime)}</td>
                    <td className="px-4 py-3 text-text-soft text-xs hidden md:table-cell">{slot.reason ?? '—'}</td>
                    <td className="px-6 py-3">
                      <form action={deleteBlockedSlot}>
                        <input type="hidden" name="id" value={slot.id} />
                        <button type="submit" className="text-xs text-red-500 hover:text-red-700 transition-colors">
                          Kaldır
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tüm Talepler */}
      <section>
        <h2 className="font-serif text-lg text-coffee-dark mb-4">Tüm Talepler</h2>
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
          {allList.length === 0 ? (
            <p className="text-center text-text-soft text-sm p-8">Henüz talep yok.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-beige bg-cream/60">
                  <th className="text-left px-6 py-4 font-normal text-text-soft">Ad Soyad</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft hidden md:table-cell">Telefon</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft">Tarih / Saat</th>
                  <th className="text-left px-4 py-4 font-normal text-text-soft">Durum</th>
                </tr>
              </thead>
              <tbody>
                {allList.map((a) => {
                  const s = statusLabel[a.status]
                  return (
                    <tr key={a.id} className="border-b border-beige/50 last:border-0">
                      <td className="px-6 py-3 font-medium text-text-main">{a.name}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-text-soft">{a.phone}</td>
                      <td className="px-4 py-3 text-text-soft text-xs whitespace-nowrap">{formatDT(a.start_datetime)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs" style={s.style}>
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}
