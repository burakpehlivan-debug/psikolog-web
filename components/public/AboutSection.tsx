import Image from 'next/image'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

const credentials = [
  'Klinik Psikoloji Yüksek Lisans — Hasan Kalyoncu Üniversitesi',
  'Bilişsel Davranışçı Terapi Uzmanlık Eğitimi',
  'WISC-IV Uygulayıcısı — Türk Psikologlar Derneği',
  'Türk Psikologlar Derneği Üyesi',
]

export default function AboutSection() {
  return (
    <section className="bg-white py-26 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        <RevealOnScroll direction="left">
        {/* Fotoğraf */}
        <div className="relative">
          <div className="relative w-full max-w-[380px] aspect-[4/5] bg-beige mx-auto overflow-hidden">
            <Image
              src="https://rhknksjslrvlrpewazhe.supabase.co/storage/v1/object/public/blog-images/IMG_1843.jpeg"
              alt="Klinik Psikolog Hande Pehlivan"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <div
              className="absolute bottom-[-22px] right-[-22px] w-[72%] h-[72%] -z-10 pointer-events-none"
              style={{ border: '1px solid var(--color-beige-mid)' }}
            />
          </div>
          <div className="absolute bottom-[-2.5rem] left-[-2rem] bg-coffee-dark text-cream px-7 py-6 max-w-[250px] z-10 font-display italic text-[1rem] leading-[1.65]">
            &ldquo;Her davranışın ardında anlaşılmayı bekleyen bir hikaye vardır.&rdquo;
          </div>
        </div>
        </RevealOnScroll>

        <RevealOnScroll direction="right">
        {/* İçerik */}
        <div className="md:pt-0 pt-16">
          <span className="block font-sans font-light text-[0.75rem] tracking-[0.28em] uppercase text-coffee mb-4">Terapistini Tanı</span>
          <h2 className="text-[2.4rem] text-coffee-dark mb-6">Hande Pehlivan</h2>
          <p className="text-text-soft text-[1rem] mb-5">
            Klinik Psikolog olarak DEHB, anksiyete, depresyon, sınav kaygısı, yeme bozuklukları ve travma alanlarında genç yetişkinler, çocuklar ve ergenlerle çalışıyorum. Danışanlarımın kendilerini güvende ve anlaşılmış hissedebilecekleri bir terapi ortamı yaratmak önceliğim.
          </p>
          <p className="text-text-soft text-[1rem] mb-8">
            Genç yetişkin ve ergenlerle Bilişsel Davranışçı Terapi (BDT), çocuklarla ise Deneyimsel Oyun Terapisi (DOT) çerçevesinde çalışıyorum.
          </p>
          <div className="flex flex-col gap-3">
            {credentials.map(c => (
              <div key={c} className="flex items-center gap-4 text-[0.9rem] text-text-soft">
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
