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
    title: 'Yüksek Lisans',
    desc: 'Hasan Kalyoncu Üniversitesi, Sosyal Bilimler Enstitüsü, Klinik Psikoloji',
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
  'Rorschach Testi & TAT (Tematik Algı Testi) Eğitimi — Dr. Bengi Pirim Düşgör / İstanbul Üniversitesi, 2023',
  '2. Düzey Deneyimsel Oyun Terapisi (DOT) — Byron Norton, 2022',
  '1. Düzey Deneyimsel Oyun Terapisi (DOT) — Nilüfer Devecigil, 2021',
  'WISC-IV Uygulayıcısı — Türk Psikologlar Derneği, 2020',
  'Çocuk Objektif Testler Uygulamacısı — Mind Engineers Psikoloji, 2020',
  'Mindfulness Uzman Eğitimi — Doç. Dr. Bilge Uzun / Bahçeşehir Üniversitesi, 2020',
  'Pandemi Sürecinde Ebeveyn Tutumları — Prof. Dr. Özgür Öner / Bahçeşehir Üniversitesi, 2020',
  'Üstün Potansiyelli Öğrencilerin Eğitimi — Prof. Dr. Derin Atay / Bahçeşehir Üniversitesi, 2019',
  'Yeme Bozukluklarında Bilişsel Davranışçı Terapi — Prof. Dr. Levent Sütçigil, 2019',
  'Çocuklarda Yeme Bozuklukları ve Aile Tabanlı Terapi — Uzm. Dr. Hakan Öğütlü, 2019',
  'Kabul ve Kararlılık Terapisi — Vaka Değerlendirme, 2019',
  'Narrative Terapi — Vaka Değerlendirme, 2019',
  'Aile Dinamikleri — Vaka Değerlendirme, 2019',
  'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi — Prof. Dr. M. Hakan Türkçapar, 2017–2019',
  'Çocuk ve Ergenlerde Travma Sonrası Stres Bozukluğu ve BDT — Prof. Dr. Emine Gül Kapçı Seyitoğlu, 2017',
  'Sosyal Fobide Bilişsel Davranışçı Terapi — Prof. Dr. M. Hakan Türkçapar, 2017',
  'Sınav Kaygısı: BDT Bakış Açısı — Doç. Dr. Kadir Özdel, 2017',
  'Terapi Odasına Hazırlık Eğitimi, 2017',
  'Nöropsikoloji Semineri, 2017',
  'Borderline Kişilik Bozukluğu: Görüşme Teknikleri ve Terapötik Müdahaleler — Klinik ve Adli Psikoloji Derneği, 2015',
  'Bipolar Bozuklukta Bilişsel Davranışçı Terapi — Klinik ve Adli Psikoloji Derneği, 2015',
  'Travma ve Travma Sonrası Stres Bozukluğu Tedavisi — Klinik ve Adli Psikoloji Derneği, 2015',
  'Günümüzde Psikoterapi — Prof. Dr. Kemal Sayar, 2015',
  'Türk Psikologlar Derneği Üyesi',
]

const internships = [
  {
    place: 'Prof. Dr. Eyüp Sabri Ercan Kliniği — İzmir',
    period: 'Haz – Ağu 2018',
    desc: 'Çocuk-Ergen Psikiyatrisi. DEHB ve Karşı Olma Karşı Gelme Bozukluğu tanılı çocuk ve ergen görüşmeleri, aile görüşmeleri. Uzmanlık tezi için CNS Vital Signs dikkat testi verileri toplandı.',
  },
  {
    place: 'Kanuni Sultan Süleyman Eğitim ve Araştırma Hastanesi',
    period: 'Eki 2016 – Şub 2017',
    desc: 'MMPI uygulama ve yorumlama, WISC-R gözlemi, SCL-90, Porteus Labirentleri, Mini-Mental Durum Değerlendirmesi ve Nöropsikolojik Değerlendirme Testi (NPT) uygulamaları.',
  },
  {
    place: 'Marmara Üniversitesi Pendik Eğitim ve Araştırma Hastanesi',
    period: 'Ağu 2016',
    desc: 'Servis ve poliklinik gözlemi. Depresyon, anksiyete, panik bozukluk ve bipolar bozukluk vakalarında grup terapisi gözlem ve katılımı.',
  },
  {
    place: 'Bakırköy Mazhar Osman Ruh Sağlığı ve Sinir Hastalıkları Hastanesi',
    period: 'Haz 2016',
    desc: '9. Psikiyatri Servisi. Psikoz, bipolar bozukluk, şizofreni, adli vakalar ve ağır depresyon olgularında tanı görüşmeleri ve aile görüşmeleri gözlemi.',
  },
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
              Lisans eğitimini Beykent Üniversitesi Psikoloji Bölümü&apos;nde onur derecesiyle tamamladı. Ardından Hasan Kalyoncu Üniversitesi Klinik Psikoloji Yüksek Lisans programına başladı; DEHB tanılı çocuk ve ergenlerin alt tiplerine göre CNS Vital Signs nöropsikolojik test bataryası sonuçlarını karşılaştıran tez çalışmasını yürüttü. Aynı dönemde Prof. Dr. M. Hakan Türkçapar eğitiminde Bilişsel Davranışçı Terapi uzmanlık eğitimini tamamladı.
            </p>
            <p className="text-text-soft text-[0.93rem] leading-[2] mb-5">
              Yüksek lisans sürecinde eğitimiyle eş zamanlı olarak klinik pratiğe başladı. Şanlıurfa&apos;da Fizyo Hayat Sağlıklı Yaşam Merkezi&apos;nde psikolog olarak depresyon, anksiyete ve travma vakalarında BDT uygulaması yaptı; Hasan Kalyoncu Üniversitesi PDR Merkezi&apos;nde süpervizyon altında 60 oturumluk bireysel terapi gerçekleştirdi. İzmir&apos;de Prof. Dr. Eyüp Sabri Ercan Kliniği&apos;nde DEHB tanılı çocuk ve ergenlerle yürüttüğü staj ise tez çalışmasının veri toplama süreciyle iç içe geçti.
            </p>
            <p className="text-text-soft text-[0.93rem] leading-[2] mb-5">
              Yüksek lisansın son döneminde Bahçeşehir Koleji bünyesinde okul psikoloğu olarak çalışmaya başladı; bireysel görüşmeler, ebeveyn destek programları ve mindfulness uygulamaları yürüttü. Yüksek lisansını tamamlayarak Klinik Psikolog unvanını kazandıktan sonra 2020&apos;de Madalyon Psikiyatri Merkezi&apos;nde göreve başladı. Burada sınav kaygısı, yeme bozukluğu, anksiyete, depresyon ve OKB başta olmak üzere nevrotik bozukluklarda BDT ile çalıştı; 1. ve 2. Düzey Deneyimsel Oyun Terapisi eğitimlerini ve Rorschach ile TAT gibi projektif test eğitimlerini tamamladı.
            </p>
            <p className="text-text-soft text-[0.93rem] leading-[2]">
              2024&apos;ten bu yana bireysel online terapi pratiğini sürdürmektedir.
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

          {/* Klinik Stajlar */}
          <RevealOnScroll>
            <div className="w-full h-px bg-beige-mid mt-14 mb-10" />
            <h3 className="font-serif text-[1.35rem] text-coffee-dark mb-8">Klinik Stajlar</h3>
          </RevealOnScroll>
          <div className="flex flex-col gap-8">
            {internships.map(({ place, period, desc }, i) => (
              <RevealOnScroll key={i} direction="up" delay={i * 60}>
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 pt-[3px]">
                    <span className="w-[5px] h-[5px] rounded-full bg-coffee block" />
                  </div>
                  <div>
                    <p className="text-[0.88rem] font-medium text-coffee-dark leading-[1.5]">{place}</p>
                    <p className="text-[0.75rem] text-coffee/70 tracking-[0.06em] uppercase mb-1">{period}</p>
                    <p className="text-[0.85rem] text-text-soft leading-[1.75]">{desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
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
