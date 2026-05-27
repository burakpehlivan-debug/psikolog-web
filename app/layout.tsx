import type { Metadata } from 'next'
import { Playfair_Display, Jost, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Hande Pehlivan | Klinik Psikolog',
  description: 'Çocuk ve ergen psikolojisi alanında uzmanlaşmış klinik psikolog. Bilişsel Davranışçı Terapi ve Deneyimsel Oyun Terapisi.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${jost.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
