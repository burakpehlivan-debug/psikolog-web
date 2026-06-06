import type { Metadata } from 'next'
import { Cormorant_Garamond, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
})

const sourceSans = Source_Sans_3({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  title: 'Hande Pehlivan | Klinik Psikolog',
  description: 'Çocuk ve ergen psikolojisi alanında uzmanlaşmış klinik psikolog. Bilişsel Davranışçı Terapi ve Deneyimsel Oyun Terapisi.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
