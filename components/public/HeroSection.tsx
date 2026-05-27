import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center relative overflow-hidden">
      {/* Dekoratif arka plan */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 75% 45%, rgba(184,152,128,0.13) 0%, transparent 65%),
                       radial-gradient(ellipse 40% 50% at 15% 75%, rgba(139,111,94,0.07) 0%, transparent 55%)`,
        }}
      />
      <div
        className="hidden md:block absolute right-[-120px] top-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full pointer-events-none"
        style={{
          border: '1px solid rgba(184,150,126,0.25)',
          boxShadow: 'inset 0 0 0 44px transparent, inset 0 0 0 88px transparent',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10 w-full">
        <div>
          <p className="flex items-center gap-4 font-sans font-light text-[0.7rem] tracking-[0.28em] uppercase text-coffee mb-7">
            <span className="block w-8 h-px bg-coffee-light" />
            Klinik Psikoloji · Çocuk &amp; Ergen
          </p>
          <h1 className="text-[clamp(2.6rem,4.8vw,4rem)] text-coffee-dark mb-7 leading-[1.14]">
            Büyümek<br />
            bazen <em className="italic text-coffee">desteğe</em><br />
            ihtiyaç duyar.
          </h1>
          <p className="text-[0.95rem] text-text-soft max-w-[400px] leading-[2] mb-11">
            Çocuğunuzun iç dünyasını anlamak, onun için en güvenli alanı birlikte yaratmak üzere buradayım.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/randevu"
              className="bg-coffee-dark text-cream px-8 py-3 text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee transition-colors duration-300 no-underline"
            >
              Randevu Al
            </Link>
            <Link
              href="/blog"
              className="bg-transparent text-coffee-dark px-8 py-3 border border-coffee-dark text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-coffee-dark hover:text-cream transition-all duration-300 no-underline"
            >
              Blog&apos;u Keşfet
            </Link>
          </div>
        </div>

        <div className="relative max-w-[440px] mx-auto w-full">
          <div
            className="absolute top-[-18px] left-[-18px] right-[18px] bottom-[18px] pointer-events-none"
            style={{ border: '1px solid var(--color-beige-mid)' }}
          />
          <div className="relative z-10 w-full aspect-[3/4] bg-beige flex items-center justify-center overflow-hidden">
            <div className="text-center text-coffee font-display italic">
              <svg className="w-12 h-12 opacity-30 mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-[0.85rem] opacity-45">Fotoğraf eklenecek</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-coffee text-[0.62rem] tracking-[0.2em] uppercase animate-bounce">
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
