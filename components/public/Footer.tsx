import Link from 'next/link'
import type { Settings } from '@/lib/types'

const pages = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkinda', label: 'Hakkında' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
]

const expertise = ['DEHB', 'Sınav Kaygısı', 'Yeme Bozuklukları', 'Deneyimsel Oyun Terapisi']

export default function Footer({ settings }: { settings: Settings | null }) {
  return (
    <footer className="bg-coffee-dark pt-14 pb-8 px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 mb-12">
        <div>
          <div className="flex items-center gap-3.5 mb-3">
            <svg
              aria-hidden="true"
              viewBox="0 0 421 583"
              width="34"
              height="47"
              fill="currentColor"
              className="text-cream/70 flex-shrink-0"
            >
              <g transform="translate(0,583) scale(0.1,-0.1)">
                <path d="M2051 5413 c-44 -22 -71 -67 -71 -122 0 -127 153 -186 234 -90 98 116 -27 279 -163 212z M2090 4940 c-13 -8 -16 -59 -21 -317 -5 -283 -7 -313 -27 -367 -21 -57 -78 -156 -90 -156 -3 0 -53 15 -111 34 -335 108 -585 84 -661 -63 -36 -71 -21 -142 43 -198 138 -121 506 -78 704 83 52 42 34 44 203 -22 136 -54 141 -57 123 -74 -51 -47 -298 -254 -368 -308 -81 -61 -81 -61 -205 -22 -434 138 -783 128 -932 -27 -113 -117 -61 -279 110 -342 230 -85 555 -17 890 186 84 51 47 59 412 -85 91 -35 175 -68 188 -73 23 -9 21 -12 -40 -61 -35 -29 -83 -70 -108 -93 -25 -22 -114 -97 -197 -167 -151 -128 -151 -128 -224 -94 -278 127 -580 197 -782 181 -358 -30 -588 -191 -589 -414 -2 -292 375 -428 802 -289 160 51 342 152 540 298 112 83 112 83 158 61 108 -52 322 -175 315 -181 -4 -3 -69 -44 -143 -90 -576 -357 -830 -692 -830 -1095 0 -618 625 -1032 1178 -779 348 159 532 538 434 889 -82 291 -337 495 -617 495 -379 0 -662 -355 -561 -705 94 -323 485 -442 707 -214 180 185 117 499 -111 548 -157 34 -308 -107 -245 -229 73 -140 278 -52 207 90 -19 40 -19 40 0 40 63 0 129 -68 148 -153 38 -175 -131 -338 -324 -312 -299 39 -405 436 -183 681 259 287 713 172 868 -219 42 -103 49 -298 15 -397 -102 -299 -365 -490 -676 -490 -536 0 -890 557 -678 1068 101 243 376 506 787 751 123 74 123 74 314 -22 483 -240 816 -290 1084 -163 315 150 290 535 -41 644 -260 85 -627 17 -1063 -198 -89 -44 -164 -80 -167 -80 -12 0 -376 203 -376 209 0 4 35 36 77 71 43 36 129 109 193 163 268 229 235 213 357 173 507 -167 872 -137 999 81 59 99 36 247 -48 318 -200 168 -561 102 -956 -175 -63 -44 -117 -80 -122 -80 -4 0 -90 32 -191 72 -101 39 -221 85 -267 103 -82 31 -82 31 -15 85 38 30 142 117 231 193 164 140 164 140 240 113 314 -108 601 -93 706 37 46 58 50 153 8 218 -108 167 -407 142 -713 -61 -101 -67 -101 -67 -247 -9 -80 32 -147 60 -149 63 -2 2 12 33 32 70 63 114 67 139 72 469 4 263 3 300 -11 322 -18 27 -32 30 -56 15z m-460 -841 c72 -13 220 -56 234 -69 22 -22 -148 -101 -272 -127 -218 -45 -405 41 -317 146 53 62 179 80 355 50z m1374 -20 c59 -16 96 -58 96 -109 0 -141 -253 -180 -566 -88 -40 12 -74 25 -74 28 0 8 122 82 198 119 110 55 253 76 346 50z m-1584 -573 c63 -13 155 -36 203 -51 105 -32 108 -27 -66 -110 -188 -90 -323 -127 -473 -127 -177 -1 -305 60 -304 146 2 150 290 214 640 142z m1923 -10 c233 -55 237 -290 5 -375 -156 -57 -403 -36 -716 62 -84 26 -84 26 35 106 255 170 505 247 676 207z m-2174 -636 c156 -16 354 -74 543 -157 58 -26 58 -26 -5 -72 -324 -245 -580 -348 -840 -339 -524 18 -476 489 58 567 85 12 129 12 244 1z m2230 -150 c231 -29 365 -165 322 -326 -61 -226 -418 -299 -819 -168 -97 31 -472 205 -472 218 0 9 174 94 289 141 189 77 414 133 571 143 14 1 63 -3 109 -8z" />
              </g>
            </svg>
            <div className="flex flex-col justify-center gap-[5px]">
              <span className="block font-serif italic text-[1.38rem] text-cream leading-none">Hande Pehlivan</span>
              <span className="block font-sans font-light text-[0.94rem] text-cream/50 tracking-[0.15em] uppercase leading-none">Klinik Psikolog</span>
            </div>
          </div>
          <p className="text-[0.9rem] text-cream/45 leading-[1.8] mt-5">
            DEHB, anksiyete, depresyon ve Deneyimsel Oyun Terapisi alanlarında bireysel terapi.
          </p>
          {(settings?.instagram_url || settings?.linkedin_url) && (
            <div className="flex gap-3 mt-4">
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                </a>
              )}
              {settings.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-cream/50 mb-4">Sayfalar</p>
          <ul className="list-none">
            {pages.map(({ href, label }) => (
              <li key={href} className="mb-2">
                <Link href={href} className="text-cream/65 hover:text-cream text-[0.93rem] no-underline transition-opacity duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-cream/50 mb-4">Uzmanlık</p>
          <ul className="list-none">
            {expertise.map(item => (
              <li key={item} className="mb-2 text-cream/65 text-[0.93rem]">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex justify-between items-center text-[0.72rem] text-cream/40">
        <span>© {new Date().getFullYear()} Hande Pehlivan. Tüm hakları saklıdır.</span>
        <div className="flex items-center gap-5">
          <Link href="/kvkk" className="text-cream/40 hover:text-cream/70 no-underline transition-colors">
            KVKK
          </Link>
          <Link href="/admin" className="text-cream/30 hover:text-cream/60 no-underline transition-colors text-[0.65rem]">
            Yönetim
          </Link>
        </div>
      </div>
    </footer>
  )
}
