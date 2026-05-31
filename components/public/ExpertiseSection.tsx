import RevealOnScroll from '@/components/ui/RevealOnScroll'

const cards = [
  {
    title: 'Anksiyete & Sınav Kaygısı',
    desc: 'Sınav korkusu, sosyal kaygı, panik atak ve yaygın anksiyete bozukluğu gibi konularda BDT temelli yaklaşımlarla çalışıyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    title: 'Depresyon & Ruh Hali',
    desc: 'Motivasyon kaybı, umutsuzluk, OKB ve sosyal fobi gibi duygusal zorluklarda yanınızda olarak iyileşme sürecini birlikte yürütüyoruz.',
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
    title: 'Yeme Bozuklukları & Travma',
    desc: 'Beden imgesi sorunları, yeme bozuklukları ve travma sonrası stres bozukluğu alanlarında uzmanlaşmış destek sunuyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
