import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/types'

async function getSettings(): Promise<Settings | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    return data
  } catch {
    return null
  }
}

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <>
      <Navbar settings={settings} />
      <main className="pt-[72px]">{children}</main>
      <Footer settings={settings} />
    </>
  )
}
