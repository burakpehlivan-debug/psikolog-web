import RevealOnScroll from '@/components/ui/RevealOnScroll'

const cards = [
  {
    title: 'Anksiyete, Depresyon & Travma',
    desc: 'Sınav kaygısı, sosyal fobi, panik atak, depresyon, OKB, yeme bozuklukları ve travma gibi alanlarda BDT temelli çalışıyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15s1.5-2 4-2 4 2 4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: 'Çocuk & Ergen Psikolojisi',
    desc: 'Dikkat güçlükleri, davranış sorunları, kimlik gelişimi, akran ilişkileri ve ergenliğe özgü zorluklarda çocuk ve gençlerle çalışıyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Oyun Terapisi',
    desc: 'Çocukların duygularını keşfetmeleri ve ifade etmeleri için oyun terapisi yöntemlerini yüz yüze seanslarla uyguluyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
]

export default function ExpertiseSection() {
  return (
    <section className="bg-cream py-26 px-8">
      <div className="max-w-[1200px] mx-auto">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Uzmanlık Alanlarım</span>
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] text-coffee-dark">Ne Konularda Çalışıyorum?</h2>
            <div className="w-11 h-px bg-coffee-light mx-auto mt-6" />
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {cards.map(({ title, desc, icon }, i) => (
            <RevealOnScroll key={title} direction="up" delay={i * 120}>
              <div className="bg-white px-8 py-10 text-center border-b-2 border-transparent hover:border-coffee hover:-translate-y-1 transition-all duration-300">
                <div className="text-coffee w-[52px] h-[52px] mx-auto mb-6">{icon}</div>
                <h3 className="text-[1.05rem] text-coffee-dark mb-3">{title}</h3>
                <p className="text-[0.83rem] text-text-soft leading-[1.85]">{desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
