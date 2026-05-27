import RevealOnScroll from '@/components/ui/RevealOnScroll'

const credentials = [
  'Klinik Psikoloji Yüksek Lisans',
  'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi',
  'Deneyimsel Oyun Terapisi Sertifikası',
  'Çocuk & Ergen Uzmanlık Alanı',
]

export default function AboutSection() {
  return (
    <section className="bg-white py-26 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll direction="left">
        {/* Fotoğraf */}
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
            &ldquo;Her çocuk, doğru ortamda büyüyüp gelişebilir.&rdquo;
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right">
        {/* İçerik */}
        <div className="md:pt-0 pt-16">
          <span className="block font-sans font-light text-[0.65rem] tracking-[0.28em] uppercase text-coffee mb-4">Terapistini Tanı</span>
          <h2 className="text-[2.1rem] text-coffee-dark mb-6">Hande Pehlivan</h2>
          <p className="text-text-soft text-[0.92rem] mb-5">
            Merhaba, ben Hande. Çocuk ve ergen psikolojisi alanında uzmanlaşmış bir klinik psikologum. Bireylerin kendilerini güvende ve değerli hissedebilecekleri bir terapi ortamı yaratmayı önceliğim olarak görüyorum.
          </p>
          <p className="text-text-soft text-[0.92rem] mb-8">
            Bilişsel Davranışçı Terapi (BDT) ve deneyimsel oyun terapisi yaklaşımlarını bütüncül bir çerçevede kullanarak çalışıyor; her çocuğun benzersiz ihtiyaçlarına uyarlanmış bir yol izliyorum.
          </p>
          <div className="flex flex-col gap-3">
            {credentials.map(c => (
              <div key={c} className="flex items-center gap-4 text-[0.82rem] text-text-soft">
                <span className="w-[5px] h-[5px] rounded-full bg-coffee flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
