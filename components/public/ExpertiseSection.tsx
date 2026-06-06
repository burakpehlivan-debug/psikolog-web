import RevealOnScroll from '@/components/ui/RevealOnScroll'

const cards = [
  {
    title: 'DEHB',
    subtitle: 'Dikkat Eksikliği & Hiperaktivite Bozukluğu',
    desc: 'Çocuk, ergen ve genç yetişkinlerde DEHB değerlendirmesi ve terapötik müdahale. Uzmanlık tezimin konusu olan bu alan, çalışmalarımın odak noktalarından biridir.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    featured: true,
  },
  {
    title: 'Anksiyete, Depresyon & Travma',
    subtitle: null,
    desc: 'Sınav kaygısı, sosyal fobi, panik bozukluk, OKB, yeme bozuklukları, depresyon ve travma alanlarında BDT temelli bireysel terapi.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    featured: false,
  },
  {
    title: 'Çocuk & Ergen Psikolojisi',
    subtitle: null,
    desc: 'Davranış sorunları, duygusal gelişim güçlükleri, kimlik gelişimi, akran ilişkileri ve ergenliğe özgü zorluklarda çocuk ve gençlerle çalışıyorum.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    featured: false,
  },
  {
    title: 'Deneyimsel Oyun Terapisi',
    subtitle: null,
    desc: 'Çocukların iç dünyalarını oyun aracılığıyla keşfetmelerine ve ifade etmelerine olanak tanıyan bütünleşik bir ekol. Yüz yüze seanslarla uygulanır.',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    featured: false,
  },
]

export default function ExpertiseSection() {
  return (
    <section className="bg-cream py-26 px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="block font-sans font-light text-[0.75rem] tracking-[0.28em] uppercase text-coffee mb-4">Uzmanlık Alanlarım</span>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] text-coffee-dark">Ne Konularda Çalışıyorum?</h2>
            <div className="w-11 h-px bg-coffee-light mx-auto mt-6" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {cards.map(({ title, subtitle, desc, icon, featured }, i) => (
            <RevealOnScroll key={title} direction="up" delay={i * 100}>
              <div className={`px-8 py-10 border-b-2 border-transparent hover:-translate-y-1 transition-all duration-300 ${featured ? 'bg-coffee-dark text-cream hover:border-coffee-light' : 'bg-white hover:border-coffee'}`}>
                <div className={`w-[52px] h-[52px] mb-6 ${featured ? 'text-coffee-light' : 'text-coffee'}`}>{icon}</div>
                <h3 className={`text-[1.05rem] mb-1 ${featured ? 'text-cream' : 'text-coffee-dark'}`}>{title}</h3>
                {subtitle && <p className={`text-[0.8rem] tracking-[0.1em] uppercase mb-3 ${featured ? 'text-coffee-light' : 'text-coffee'}`}>{subtitle}</p>}
                <p className={`text-[0.91rem] leading-[1.85] mt-3 ${featured ? 'text-cream/75' : 'text-text-soft'}`}>{desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
