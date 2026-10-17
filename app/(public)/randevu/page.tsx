import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/types'
import type { Metadata } from 'next'
import Link from 'next/link'
import RandevuClient from './RandevuClient'
import DoktortakvimiWidget from '@/components/public/DoktortakvimiWidget'

export const metadata: Metadata = {
  title: 'Randevu',
  description: 'Online randevu talebi oluşturun. Uygun bir gün ve saat seçerek randevu talebinizi iletebilirsiniz.',
  alternates: { canonical: '/randevu' },
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

      {/* Doktortakvimi — birincil online randevu */}
      <section className="bg-white px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-[860px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-coffee mb-2 font-sans">Online Randevu</p>
            <h2 className="font-serif text-[1.8rem] text-coffee-dark mb-3">Doktortakvimi üzerinden anında randevu</h2>
            <p className="text-[0.92rem] text-text-soft leading-[1.9] max-w-[520px] mx-auto">
              Güncel boş saatleri aşağıdan görebilir, yüz yüze veya online seansınızı hemen ayırtabilirsiniz.
            </p>
          </div>
          <div className="bg-cream border border-beige py-6 md:px-10 md:py-8">
            <DoktortakvimiWidget
              type="big_with_calendar"
              opinion={false}
              hideRating
              className="max-w-[560px] mx-auto min-h-[420px]"
            />
          </div>
          <p className="text-center text-[0.82rem] text-text-soft/80 mt-5">
            Takvim görünmüyorsa{' '}
            <a
              href="https://www.doktortakvimi.com/profil/hande-pehlivan2"
              target="_blank"
              rel="nofollow noopener"
              className="text-coffee underline underline-offset-2 hover:text-coffee-dark"
            >
              Doktortakvimi profilinden
            </a>{' '}
            randevu alabilirsiniz.
          </p>
        </div>
      </section>

      {settings?.appointment_system_enabled && (
        <div className="max-w-[860px] mx-auto px-8 pt-16 md:pt-20 text-center">
          <div className="w-12 h-px bg-coffee-light mx-auto mb-6" />
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-coffee mb-2 font-sans">Alternatif</p>
          <h2 className="font-serif text-[1.5rem] text-coffee-dark mb-2">Randevu talep formu</h2>
          <p className="text-[0.9rem] text-text-soft leading-[1.9] max-w-[480px] mx-auto">
            Dilerseniz aşağıdaki takvimden talep bırakabilirsiniz; size telefonla dönüş yapılır.
          </p>
        </div>
      )}

      {!settings?.appointment_system_enabled ? (
        <section className="max-w-[600px] mx-auto px-8 py-20 text-center">
          <div className="w-12 h-px bg-coffee-light mx-auto mb-8" />
          <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-8">
            Sorularınız için iletişim sayfasından da ulaşabilirsiniz.
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
