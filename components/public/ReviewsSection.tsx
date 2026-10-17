import DoktortakvimiWidget from '@/components/public/DoktortakvimiWidget'

export default function ReviewsSection() {
  return (
    <section className="bg-cream py-22 px-8">
      <div className="max-w-[860px] mx-auto text-center">
        <span className="block font-sans font-light text-[0.75rem] tracking-[0.28em] uppercase text-coffee mb-4">
          Danışan Görüşleri
        </span>
        <h2 className="text-[2.2rem] text-coffee-dark mb-4">Doktortakvimi Yorumları</h2>
        <p className="text-text-soft text-[0.95rem] max-w-[480px] mx-auto mb-10">
          Danışanlarımın Doktortakvimi üzerinden paylaştığı doğrulanmış değerlendirmeler.
        </p>
        <div className="bg-white border border-beige px-4 py-8 md:px-10 shadow-[var(--shadow-card)]">
          <DoktortakvimiWidget
            type="big"
            opinion
            title="Doktortakvimi hasta yorumları"
            className="max-w-[560px] mx-auto min-h-[300px]"
          />
        </div>
      </div>
    </section>
  )
}
