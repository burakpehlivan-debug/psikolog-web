import RevealOnScroll from '@/components/ui/RevealOnScroll'

const cards = [
  {
    title: 'Çocuklar (4–12 Yaş)',
    desc: 'Oyun terapisi ve yaratıcı yöntemlerle çocukların duygusal gelişimini destekliyorum; davranışsal güçlüklere birlikte çözüm üretiyoruz.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Ergenler (13–18 Yaş)',
    desc: 'Kimlik gelişimi, akran ilişkileri, anksiyete ve depresyon gibi ergenliğe özgü zorluklarda rehberlik ediyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    title: 'Ebeveyn Danışmanlığı',
    desc: 'Anne ve babaları çocuklarıyla kurdukları ilişkiyi güçlendirmeleri ve sağlıklı bir aile ortamı oluşturmaları için destekliyorum.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" width="52" height="52">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
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
            <h2 className="text-[clamp(1.8rem,3.2vw,2.8rem)] text-coffee-dark">Kimlerle Çalışıyorum?</h2>
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
