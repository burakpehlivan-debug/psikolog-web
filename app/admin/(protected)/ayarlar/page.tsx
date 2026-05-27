import { createAdminClient } from '@/lib/supabase/admin'
import type { Settings } from '@/lib/types'
import SettingsForm from '@/components/admin/SettingsForm'
import { notFound } from 'next/navigation'

export default async function AyarlarPage() {
  const admin = createAdminClient()
  const { data } = await admin.from('settings').select('*').eq('id', 1).single()
  if (!data) notFound()

  return (
    <div>
      <h1 className="font-serif text-2xl text-coffee-dark mb-8">Ayarlar</h1>
      <div className="max-w-2xl">
        <SettingsForm settings={data as Settings} />
      </div>
    </div>
  )
}
