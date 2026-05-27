import { createClient } from '@/lib/supabase/server'
import type { Settings } from '@/lib/types'
import ContactForm from '@/components/public/ContactForm'

async function getSettings(): Promise<Settings | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('settings').select('*').eq('id', 1).single()
    return data
  } catch {
    return null
  }
}

export default async function IletisimPage() {
  const settings = await getSettings()

  return (
    <div className="max-w-[960px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h1 className="text-[2rem] text-coffee-dark mb-6 leading-[1.25]">
          Merhaba,<br />
          <em className="italic text-coffee">nasıl yardımcı olabilirim?</em>
        </h1>
        <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-8">
          Çocuğunuz veya ergeniniz için profesyonel destek almak istiyorsanız ya da merak ettiğiniz konular varsa formu doldurabilir veya doğrudan mail atabilirsiniz.
        </p>

        <div className="flex flex-col gap-5">
          {settings?.contact_email && (
            <div className="flex items-start gap-4">
              <div className="w-[38px] h-[38px] bg-beige flex items-center justify-center flex-shrink-0 text-coffee">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <strong className="block font-serif font-normal text-coffee-dark text-[0.9rem]">E-posta</strong>
                <span className="text-[0.83rem] text-text-soft">{settings.contact_email}</span>
              </div>
            </div>
          )}

          {settings?.contact_phone && (
            <div className="flex items-start gap-4">
              <div className="w-[38px] h-[38px] bg-beige flex items-center justify-center flex-shrink-0 text-coffee">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L4.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 17z"/>
                </svg>
              </div>
              <div>
                <strong className="block font-serif font-normal text-coffee-dark text-[0.9rem]">Telefon</strong>
                <span className="text-[0.83rem] text-text-soft">{settings.contact_phone}</span>
              </div>
            </div>
          )}

          {settings?.contact_address && (
            <div className="flex items-start gap-4">
              <div className="w-[38px] h-[38px] bg-beige flex items-center justify-center flex-shrink-0 text-coffee">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <strong className="block font-serif font-normal text-coffee-dark text-[0.9rem]">Adres</strong>
                <span className="text-[0.83rem] text-text-soft">{settings.contact_address}</span>
              </div>
            </div>
          )}

          {!settings?.contact_email && !settings?.contact_phone && !settings?.contact_address && (
            <p className="text-[0.83rem] text-text-soft italic">İletişim bilgileri yakında eklenecektir.</p>
          )}
        </div>
      </div>

      <ContactForm email={settings?.contact_email ?? null} />
    </div>
  )
}
