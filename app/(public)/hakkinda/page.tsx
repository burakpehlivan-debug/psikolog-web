import Link from 'next/link'
import type { Metadata } from 'next'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export const metadata: Metadata = {
  title: 'Hakkında | Hande Pehlivan',
  description: 'Klinik Psikolog ve Deneyimsel Oyun Terapisti Hande Pehlivan hakkında — uzmanlık alanları, eğitim ve terapi yaklaşımı.',
}

const education = [
  {
    year: '2020–2024',
    title: '2. Düzey Deneyimsel Oyun Terapisi (DOT)',
    place: 'Madalyon Psikiyatri Merkezi',
    note: null,
  },
  {
    year: '2017–2019',
    title: 'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi',
    place: 'Prof. Dr. M. Hakan Türkçapar',
    note: null,
  },
  {
    year: '2017–2019',
    title: 'Klinik Psikoloji Yüksek Lisans',
    place: 'Hasan Kalyoncu Üniversitesi',
    note: 'Tez: DEHB tanılı çocuklarda CNS Vital Signs nöropsikolojik test bataryası',
  },
  {
    year: '2013–2017',
    title: 'Psikoloji Lisans — Onur Öğrencisi',
    place: 'Beykent Üniversitesi',
    note: 'Tam burslu · 3.73 GPA',
  },
]

const certifications = [
  'WISC-IV Uygulayıcısı — Türk Psikologlar Derneği (2020)',
  'Rorschach & TAT Eğitimi — Madalyon Psikiyatri Merkezi',
  'Mindfulness Uzmanlık Eğitimi — Bahçeşehir Üniversitesi (2020)',
  'Çocuk Objektif Testler Uygulamacısı — Mind Engineers Psikoloji (2020)',
  'Türk Psikologlar Derneği Üyesi',
]

const specialties = [
  { label: 'DEHB', note: 'Dikkat Eksikliği & Hiperaktivite', featured: true },
  { label: 'Sınav Kaygısı', note: null, featured: false },
  { label: 'Yeme Bozuklukları', note: null, featured: false },
  { label: 'Anksiyete & Panik', note: null, featured: false },
  { label: 'Depresyon', note: null, featured: false },
  { label: 'OKB', note: null, featured: false },
  { label: 'Travma & TSSB', note: null, featured: false },
  { label: 'Sosyal Fobi', note: null, featured: false },
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
              <div className="absolute bottom-[-2.5rem] left-[-2rem] bg-coffee-dark text-cream px-7 py-6 max-w-[210px] z-10 font-display italic text-[1rem] leading-[1.65]">
                &ldquo;Anlamlı değişim, doğru ortamda mümkündür.&rdquo;
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div className="md:pt-4">
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-5">Terapistini Tanı</span>
              <p className="text-text-soft text-[0.93rem] leading-[1.95] mb-5">
                Klinik Psikolog olarak DEHB, anksiyete, depresyon, sınav kaygısı, yeme bozuklukları ve travma alanlarında geç yetişkinler, çocuklar ve ergenlerle çalışıyorum. Danışanlarımın kendilerini güvende ve anlaşılmış hissedebilecekleri bir terapi ortamı yaratmak önceliğim.
              </p>
              <p className="text-text-soft text-[0.93rem] leading-[1.95] mb-5">
                Geç yetişkin ve ergenlerle Bilişsel Davranışçı Terapi (BDT) çerçevesinde çalışırken, çocuklarla bütüncül ve ayrı bir ekol olan Deneyimsel Oyun Terapisi (DOT) ile yüz yüze seanslar yürütüyorum.
              </p>
              <p className="text-text-soft text-[0.93rem] leading-[1.95]">
                Terapide anlamlı değişimin doğru ortamda ve güvenilir bir ilişki içinde mümkün olduğuna inanıyorum. Benim rolüm bu yolda yanınızda olmak; çözümleri birlikte keşfetmek.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Uzmanlık Alanları */}
      <section className="bg-cream py-20 px-8">
        <div className="max-w-[1100px] mx-auto">
          <RevealOnScroll>
            <div className="mb-12">
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Çalışma Alanları</span>
              <h2 className="text-[1.9rem] text-coffee-dark">Uzmanlık Alanları</h2>
              <div className="w-10 h-px bg-coffee-light mt-5" />
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="up">
            <div className="flex flex-wrap gap-3">
              {specialties.map(({ label, note, featured }) => (
                <div
                  key={label}
                  className={`px-5 py-2.5 text-[0.82rem] tracking-[0.06em] ${
                    featured
                      ? 'bg-coffee-dark text-cream font-normal'
                      : 'bg-white text-text-soft border border-beige'
                  }`}
                >
                  {label}
                  {note && <span className="ml-2 text-[0.7rem] opacity-70">— {note}</span>}
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Nasıl Çalışıyorum */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <RevealOnScroll direction="left">
            <div>
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Terapi Yaklaşımı</span>
              <h2 className="text-[1.9rem] text-coffee-dark mb-6">Bilişsel Davranışçı Terapi</h2>
              <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-4">
                Geç yetişkin ve ergenlerle yürüttüğüm bireysel seansların temel çerçevesi BDT&apos;dir. Düşüncelerimiz, duygularımız ve davranışlarımız arasındaki bağlantıları fark etmek ve bu kalıpları dönüştürmek, iyileşme sürecinin merkezinde yer alır.
              </p>
              <p className="text-[0.88rem] text-text-soft leading-[1.95]">
                Seanslarımda önce sizi ve hikayenizi anlamaya çalışırım. Hedeflerimizi birlikte netleştirip somut, uygulanabilir adımlarla ilerleriz. Seanslar online yürütülmektedir.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div>
              <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Terapi Yaklaşımı</span>
              <h2 className="text-[1.9rem] text-coffee-dark mb-6">Deneyimsel Oyun Terapisi</h2>
              <p className="text-[0.88rem] text-text-soft leading-[1.95] mb-4">
                Deneyimsel Oyun Terapisi, çocukların iç dünyalarını, duygularını ve deneyimlerini oyun aracılığıyla ifade etmelerine ve işlemlemelerine olanak tanıyan bütüncül bir terapötik ekoldür. BDT&apos;nin bir uzantısı değil; kendi içinde bağımsız, köklü bir yaklaşımdır.
              </p>
              <p className="text-[0.88rem] text-text-soft leading-[1.95]">
                2. Düzey DOT eğitimini tamamlamış bir Deneyimsel Oyun Terapisti olarak çocuklarla yüz yüze seanslar yürütüyorum.
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
              <h2 className="text-[1.9rem] text-coffee-dark">Eğitim & Sertifikalar</h2>
              <div className="w-10 h-px bg-coffee-light mt-5" />
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {/* Sol: Eğitim */}
            <div>
              {education.map(({ year, title, place, note }, i) => (
                <RevealOnScroll key={i} direction="left" delay={i * 80}>
                  <div className="py-6 border-b border-beige last:border-0">
                    <span className="block font-sans text-[0.7rem] tracking-[0.12em] text-coffee uppercase mb-1">{year}</span>
                    <p className="text-[0.9rem] text-coffee-dark mb-0.5">{title}</p>
                    <p className="text-[0.8rem] text-text-soft">{place}</p>
                    {note && <p className="text-[0.75rem] text-text-soft/65 mt-1 italic">{note}</p>}
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            {/* Sağ: Sertifikalar */}
            <div className="md:border-l md:border-beige md:pl-16">
              <RevealOnScroll direction="right">
                <p className="font-sans text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-6 pt-6 md:pt-0">Sertifikalar & Üyelik</p>
                <div className="flex flex-col gap-5">
                  {certifications.map((c, i) => (
                    <div key={i} className="flex items-start gap-3 text-[0.83rem] text-text-soft">
                      <span className="w-[5px] h-[5px] rounded-full bg-coffee flex-shrink-0 mt-[7px]" />
                      {c}
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
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
