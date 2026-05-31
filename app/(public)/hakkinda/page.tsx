import Link from 'next/link'
import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Hakkında | Hande Pehlivan',
  description: 'Klinik Psikolog Hande Pehlivan hakkında — eğitim geçmişi, uzmanlık alanları ve terapi yaklaşımı.',
}

const education = [
  {
    year: '2017–2019',
    title: 'Klinik Psikoloji Yüksek Lisans',
    place: 'Hasan Kalyoncu Üniversitesi',
    note: 'Tez: DEHB tanılı çocuklarda CNS Vital Signs nöropsikolojik test bataryası',
  },
  {
    year: '2017–2019',
    title: 'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi',
    place: 'Prof. Dr. M. Hakan Türkçapar',
    note: null,
  },
  {
    year: '2013–2017',
    title: 'Psikoloji Lisans — Onur Öğrencisi',
    place: 'Beykent Üniversitesi',
    note: 'Tam burslu, 3.73 GPA',
  },
]

const certifications = [
  'WISC-IV Uygulayıcısı — Türk Psikologlar Derneği (2020)',
  'Mindfulness Uzmanlık Eğitimi — Bahçeşehir Üniversitesi (2020)',
  'Çocuk Objektif Testler Uygulamacısı — Mind Engineers Psikoloji (2020)',
  'Rorschach Testi Eğitimi (2020–2024)',
  'Türk Psikologlar Derneği Üyesi',
]

export default function HakkindaPage() {
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
        <div className="hidden md:block absolute -right-32 -top-32 w-[440px] h-[440px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.18)' }} />
        <div className="hidden md:block absolute -left-24 -bottom-24 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{ border: '1px solid rgba(184,150,126,0.10)' }} />

        <div className="relative z-10 max-w-[640px] mx-auto">
          <p className="flex items-center justify-center gap-4 font-sans font-light text-[0.7rem] tracking-[0.3em] uppercase text-coffee-light mb-7">
            <span className="block w-8 h-px bg-coffee-light/60" />
            Uzman Klinik Psikolog
            <span className="block w-8 h-px bg-coffee-light/60" />
          </p>
          <h1 className="text-[clamp(2.6rem,5vw,3.8rem)] text-cream mb-6 leading-[1.1]">
            Hande <em className="italic text-coffee-light font-normal">Pehlivan</em>
          </h1>
          <p className="text-[0.95rem] text-cream/70 max-w-md mx-auto leading-[1.95]">
            Anksiyete, depresyon, sınav kaygısı ve çocuk-ergen psikolojisi alanlarında BDT temelli çalışıyorum.
          </p>
        </div>
      </section>

      {/* Bio + Fotoğraf */}
      <section className="bg-white py-24 px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <RevealOnScroll direction="left">
            <div className="relative">
              <div className="relative w-full max-w-[380px] aspect-[4/5] bg-beige flex items-center justify-center mx-auto">
                <div
                  className="absolute bottom-[-22px] right-[-22px] w-[72%] h-[72%] -z-10"
                  style={{ border: '1px solid var(--color-beige-mid)' }}
                />
                <div className="text-center text-coffee font-display italic">
                  <svg className="w-10 h-10 opacity-30 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p className="text-[0.85rem] opacity-45">Fotoğraf eklenecek</p>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div className="md:pt-4">
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-5">Terapistini Tanı</span>
              <p className="text-text-soft text-[0.93rem] leading-[1.95] mb-5">
                Klinik Psikolog olarak anksiyete, depresyon, sınav kaygısı, yeme bozuklukları ve travma gibi alanlarda yetişkinler, çocuklar ve ergenlerle çalışıyorum. Danışanlarımın kendilerini güvende ve anlaşılmış hissedebilecekleri bir terapi ortamı yaratmak önceliğim.
              </p>
              <p className="text-text-soft text-[0.93rem] leading-[1.95] mb-5">
                Bilişsel Davranışçı Terapi (BDT) temel yaklaşımım olmakla birlikte, her bireyin ihtiyacına ve problemin doğasına göre esneklikle çalışıyorum. Çocuklarla yürüttüğüm seanslarında oyun terapisi yöntemlerine de yer veriyorum.
              </p>
              <p className="text-text-soft text-[0.93rem] leading-[1.95]">
                Terapide inanıyorum ki anlamlı değişim, doğru ortamda ve güvenilir bir ilişki içinde mümkündür. Benim rolüm bu yolda yanınızda olmak; çözümleri birlikte keşfetmek.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Eğitim */}
      <section className="bg-cream py-20 px-8">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <div className="mb-12">
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Akademik Geçmiş</span>
              <h2 className="text-[1.9rem] text-coffee-dark">Eğitim</h2>
              <div className="w-10 h-px bg-coffee-light mt-5" />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-0">
            {education.map(({ year, title, place, note }, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 100}>
                <div className="grid grid-cols-[120px_1fr] gap-8 py-7 border-b border-beige last:border-0">
                  <span className="font-sans text-[0.72rem] tracking-[0.12em] text-coffee uppercase pt-1">{year}</span>
                  <div>
                    <p className="text-[0.93rem] text-coffee-dark font-normal mb-1">{title}</p>
                    <p className="text-[0.82rem] text-text-soft">{place}</p>
                    {note && <p className="text-[0.78rem] text-text-soft/70 mt-1 italic">{note}</p>}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Sertifikalar */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <RevealOnScroll direction="left">
            <div>
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Nitelikler</span>
              <h2 className="text-[1.9rem] text-coffee-dark mb-8">Sertifikalar & Üyelik</h2>
              <div className="flex flex-col gap-4">
                {certifications.map((c, i) => (
                  <div key={i} className="flex items-start gap-4 text-[0.83rem] text-text-soft">
                    <span className="w-[5px] h-[5px] rounded-full bg-coffee flex-shrink-0 mt-[6px]" />
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div>
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Terapi Yaklaşımı</span>
              <h2 className="text-[1.9rem] text-coffee-dark mb-6">Nasıl Çalışıyorum?</h2>
              <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-4">
                Seanslarımda önce sizi ve hikayenizi anlamaya çalışırım. Hedeflerimizi birlikte netleştirip, somut ve uygulanabilir adımlarla ilerliyoruz. BDT çerçevesinde düşünce, duygu ve davranış arasındaki bağlantıyı fark etmek ve dönüştürmek temel çalışma biçimimizdir.
              </p>
              <p className="text-[0.88rem] text-text-soft leading-[1.95]">
                Seansların büyük çoğunluğu online yürütülmektedir. Çocuklarla yürütülen oyun terapisi seansları ise yüz yüze yapılmaktadır.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-coffee-dark py-22 px-8 text-center">
        <RevealOnScroll direction="scale">
          <h2 className="text-[2.2rem] text-cream mb-4">Bir adım atmak yeter.</h2>
          <p className="text-[0.92rem] text-cream/70 max-w-[460px] mx-auto mb-10">
            Kendiniz veya çocuğunuz için profesyonel destek almak istiyorsanız benimle iletişime geçmekten çekinmeyin.
          </p>
          <Link
            href="/iletisim"
            className="bg-cream text-coffee-dark px-8 py-3 text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-beige transition-colors duration-300 no-underline inline-block"
          >
            İletişime Geç
          </Link>
        </RevealOnScroll>
      </section>
    </>
  )
}
