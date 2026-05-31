import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import RandevuClient from './RandevuClient'

export const metadata: Metadata = {
  title: 'Randevu | Hande Pehlivan',
  description: 'Online randevu talebi oluşturun. Uygun bir gün ve saat seçerek randevu talebinizi iletebilirsiniz.',
}

async function getSettings(): Promise<Settings | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    return data
  } catch {
    return null
  }
}

export default async function RandevuPage() {
  const settings = await getSettings()

  return (
    <>
      {/* Banner */}
      <section className="bg-coffee-dark px-8 py-36 md:py-44 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 80% at 50% 120%, rgba(184,152,128,0.22) 0%, transparent 70%),
                         radial-gradient(ellipse 50% 60% at 10% 30%, rgba(139,111,94,0.18) 0%, transparent 60%)`,
          }}
        />
        <div
          className="hidden md:block absolute -right-32 -top-32 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.18)' }}
        />
        <div
          className="hidden md:block absolute -right-16 -top-16 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.12)' }}
        />
        <div
          className="hidden md:block absolute -left-24 -bottom-24 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.10)' }}
        />

        <div className="relative z-10 max-w-[640px] mx-auto">
          <p className="flex items-center justify-center gap-4 font-sans font-light text-[0.7rem] tracking-[0.3em] uppercase text-coffee-light mb-7">
            <span className="block w-8 h-px bg-coffee-light/60" />
            Hande Pehlivan
            <span className="block w-8 h-px bg-coffee-light/60" />
          </p>
          <h1 className="text-[clamp(2.6rem,5vw,3.8rem)] text-cream mb-6 leading-[1.1]">
            Randevu Talep <em className="italic text-coffee-light font-normal">Et</em>
          </h1>
          <p className="text-[0.95rem] text-cream/70 max-w-md mx-auto leading-[1.95]">
            Takvimden uygun bir gün ve saati seçin, bilgilerinizi girin. En kısa sürede size dönüş yapılacaktır.
          </p>
        </div>
      </section>

      {!settings?.appointment_system_enabled ? (
        <section className="max-w-[600px] mx-auto px-8 py-28 text-center">
          <div className="w-12 h-px bg-coffee-light mx-auto mb-8" />
          <h2 className="font-serif text-[1.4rem] text-coffee-dark mb-4">
            Randevu sistemi şu an kapalı
          </h2>
          <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-8">
            Randevu almak için lütfen iletişim sayfasından ulaşın veya doğrudan arayın.
          </p>
          <Link
            href="/iletisim"
            className="inline-block font-sans text-[0.78rem] tracking-[0.14em] uppercase bg-coffee-dark text-cream px-8 py-3 hover:bg-coffee transition-colors duration-300 no-underline"
          >
            İletişim
          </Link>
        </section>
      ) : (
        <RandevuClient settings={settings} />
      )}
    </>
  )
}
