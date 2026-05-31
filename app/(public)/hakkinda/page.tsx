import Link from 'next/link'
import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Hakkında | Hande Pehlivan',
  description: 'Klinik Psikolog ve Deneyimsel Oyun Terapisti Hande Pehlivan hakkında — uzmanlık alanları, eğitim ve terapi yaklaşımı.',
}

const infoCards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="26" height="26">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    title: 'Lisans',
    desc: 'Beykent Üniversitesi, Fen-Edebiyat Fakültesi, Psikoloji Bölümü — Onur Öğrencisi',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="26" height="26">
        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
    title: 'Uzmanlık',
    desc: 'Hasan Kalyoncu Üniversitesi, Sosyal Bilimler Enstitüsü, Klinik Psikoloji Yüksek Lisans',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="26" height="26">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
      </svg>
    ),
    title: 'Terapi Yaklaşımları',
    desc: 'Bilişsel Davranışçı Terapi (BDT) · Deneyimsel Oyun Terapisi (2. Düzey DOT)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="26" height="26">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'İlgilendiği Yaş Aralığı',
    desc: 'Çocuk · Ergen · Genç Yetişkin',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" width="26" height="26">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    title: 'Çalışma Biçimi',
    desc: 'Online terapi (BDT seansları) · Yüz yüze (Deneyimsel Oyun Terapisi seansları)',
  },
]

const certifications = [
  '2. Düzey Deneyimsel Oyun Terapisi (DOT) — Madalyon Psikiyatri Merkezi, 2020–2024',
  'WISC-IV Uygulayıcısı — Türk Psikologlar Derneği, 2020',
  'Çocuk Objektif Testler Uygulamacısı — Mind Engineers Psikoloji, 2020',
  'Mindfulness Uzman Eğitimi — Doç. Dr. Bilge Uzun / Bahçeşehir Üniversitesi, 2020',
  'Rorschach Testi & TAT (Tematik Algı Testi) Eğitimi — Madalyon Psikiyatri Merkezi',
  'Yeme Bozukluklarında Bilişsel Davranışçı Terapi — Prof. Dr. Levent Sütçigil, 2019',
  'Çocuklarda Yeme Bozuklukları ve Aile Tabanlı Terapi — Uzm. Dr. Hakan Öğütlü, 2019',
  'Kabul ve Kararlılık Terapisi — Vaka Değerlendirme, 2019',
  'Narrative Terapi — Vaka Değerlendirme, 2019',
  'Çocuk ve Ergenlerde Travma Sonrası Stres Bozukluğu ve BDT — Prof. Dr. Emine Gül Kapçı Seyitoğlu, 2017',
  'Sosyal Fobide Bilişsel Davranışçı Terapi — Prof. Dr. M. Hakan Türkçapar, 2017',
  'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi — Prof. Dr. M. Hakan Türkçapar, 2017–2019',
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
            Uzman Klinik Psikolog · Deneyimsel Oyun Terapisti
            <span className="block w-8 h-px bg-coffee-light/60" />
          </p>
          <h1 className="text-[clamp(2.6rem,5vw,3.8rem)] text-cream mb-6 leading-[1.1]">
            Hande <em className="italic text-coffee-light font-normal">Pehlivan</em>
          </h1>
          <p className="text-[0.95rem] text-cream/70 max-w-md mx-auto leading-[1.95]">
            DEHB, anksiyete, depresyon ve çocuk-ergen psikolojisi alanlarında BDT ve Deneyimsel Oyun Terapisi ile çalışıyorum.
          </p>
        </div>
      </section>

      {/* Özgeçmiş — Prose Bio */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <RevealOnScroll>
            <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-6">Özgeçmiş</span>
            <p className="text-text-soft text-[0.93rem] leading-[2] mb-5">
              Klinik Psikolog olarak lisans eğitimini Beykent Üniversitesi Psikoloji Bölümü&apos;nde onur derecesiyle tamamladı. Ardından Hasan Kalyoncu Üniversitesi Klinik Psikoloji Yüksek Lisans programına başladı; tez çalışması olarak DEHB tanılı çocuk ve ergenlerin dikkat alt tiplerine göre nöropsikolojik test bataryası sonuçlarını inceledi. Yüksek lisans sürecinde Prof. Dr. M. Hakan Türkçapar eğitiminde Bilişsel Davranışçı Terapi uzmanlık eğitimini tamamladı.
            </p>
            <p className="text-text-soft text-[0.93rem] leading-[2] mb-5">
              Mezuniyetinin ardından Bahçeşehir Koleji bünyesinde okul psikoloğu olarak çalıştı; çocuklar ve ergenlerle bireysel görüşmeler yürüttü, ebeveyn destek programları düzenledi. Bu dönemde DEHB, dikkat güçlükleri ve sınav kaygısı alanlarında klinik deneyimini derinleştirdi.
            </p>
            <p className="text-text-soft text-[0.93rem] leading-[2]">
              2020–2024 yılları arasında Madalyon Psikiyatri Merkezi&apos;nde Klinik Psikolog olarak görev yaptı. Bu dönemde 2. Düzey Deneyimsel Oyun Terapisi eğitimini, Rorschach ve TAT gibi projektif testlerin uygulamasını tamamladı. 2024&apos;ten bu yana bireysel online terapi pratiğini sürdürmektedir.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Info Kartlar */}
      <section className="bg-cream py-20 px-8">
        <div className="max-w-[900px] mx-auto">
          <RevealOnScroll>
            <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-10">Genel Bilgiler</span>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {infoCards.map(({ icon, title, desc }, i) => (
              <RevealOnScroll key={title} direction="up" delay={i * 80}>
                <div className="bg-white px-7 py-6 flex items-start gap-5">
                  <div className="w-[48px] h-[48px] bg-beige rounded-full flex items-center justify-center flex-shrink-0 text-coffee">
                    {icon}
                  </div>
                  <div>
                    <p className="font-serif text-[1rem] text-coffee-dark mb-1">{title}</p>
                    <p className="text-[0.82rem] text-text-soft leading-[1.7]">{desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Sertifikalar & Eğitimler */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[800px] mx-auto">
          <RevealOnScroll>
            <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Nitelikler</span>
            <h2 className="text-[1.9rem] text-coffee-dark mb-3">Sertifikalar ve Diğer Eğitimler</h2>
            <div className="w-10 h-px bg-coffee-light mb-10" />
          </RevealOnScroll>
          <RevealOnScroll direction="up">
            <ul className="flex flex-col gap-4">
              {certifications.map((c, i) => (
                <li key={i} className="flex items-start gap-4 text-[0.88rem] text-text-soft leading-[1.7]">
                  <span className="w-[5px] h-[5px] rounded-full bg-coffee flex-shrink-0 mt-[9px]" />
                  {c}
                </li>
              ))}
            </ul>
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
