import Link from 'next/link'
import RevealOnScroll from '@/components/ui/RevealOnScroll'

export default function CtaBand() {
  return (
    <section className="bg-coffee-dark py-22 px-8 text-center">
      <RevealOnScroll direction="scale">
      <h2 className="text-[2.2rem] text-cream mb-4">Bir adım atmak yeter.</h2>
      <p className="text-[0.92rem] text-cream/70 max-w-[460px] mx-auto mb-10">
        Çocuğunuz için profesyonel destek almak istiyorsanız benimle iletişime geçmekten çekinmeyin.
      </p>
      <Link
        href="/iletisim"
        className="bg-cream text-coffee-dark px-8 py-3 text-[0.78rem] tracking-[0.14em] uppercase font-sans hover:bg-beige transition-colors duration-300 no-underline inline-block"
      >
        İletişime Geç
      </Link>
      </RevealOnScroll>
    </section>
  )
}
