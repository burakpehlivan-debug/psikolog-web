import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadCormorantItalic(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400&display=block',
      { headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36' } }
    ).then(r => r.text())
    const url = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+\.woff2)\)/)?.[1]
    if (!url) return null
    return fetch(url).then(r => r.arrayBuffer())
  } catch {
    return null
  }
}

const UNALOME_PATH = "M2051 5413 c-44 -22 -71 -67 -71 -122 0 -127 153 -186 234 -90 98 116 -27 279 -163 212z M2090 4940 c-13 -8 -16 -59 -21 -317 -5 -283 -7 -313 -27 -367 -21 -57 -78 -156 -90 -156 -3 0 -53 15 -111 34 -335 108 -585 84 -661 -63 -36 -71 -21 -142 43 -198 138 -121 506 -78 704 83 52 42 34 44 203 -22 136 -54 141 -57 123 -74 -51 -47 -298 -254 -368 -308 -81 -61 -81 -61 -205 -22 -434 138 -783 128 -932 -27 -113 -117 -61 -279 110 -342 230 -85 555 -17 890 186 84 51 47 59 412 -85 91 -35 175 -68 188 -73 23 -9 21 -12 -40 -61 -35 -29 -83 -70 -108 -93 -25 -22 -114 -97 -197 -167 -151 -128 -151 -128 -224 -94 -278 127 -580 197 -782 181 -358 -30 -588 -191 -589 -414 -2 -292 375 -428 802 -289 160 51 342 152 540 298 112 83 112 83 158 61 108 -52 322 -175 315 -181 -4 -3 -69 -44 -143 -90 -576 -357 -830 -692 -830 -1095 0 -618 625 -1032 1178 -779 348 159 532 538 434 889 -82 291 -337 495 -617 495 -379 0 -662 -355 -561 -705 94 -323 485 -442 707 -214 180 185 117 499 -111 548 -157 34 -308 -107 -245 -229 73 -140 278 -52 207 90 -19 40 -19 40 0 40 63 0 129 -68 148 -153 38 -175 -131 -338 -324 -312 -299 39 -405 436 -183 681 259 287 713 172 868 -219 42 -103 49 -298 15 -397 -102 -299 -365 -490 -676 -490 -536 0 -890 557 -678 1068 101 243 376 506 787 751 123 74 123 74 314 -22 483 -240 816 -290 1084 -163 315 150 290 535 -41 644 -260 85 -627 17 -1063 -198 -89 -44 -164 -80 -167 -80 -12 0 -376 203 -376 209 0 4 35 36 77 71 43 36 129 109 193 163 268 229 235 213 357 173 507 -167 872 -137 999 81 59 99 36 247 -48 318 -200 168 -561 102 -956 -175 -63 -44 -117 -80 -122 -80 -4 0 -90 32 -191 72 -101 39 -221 85 -267 103 -82 31 -82 31 -15 85 38 30 142 117 231 193 164 140 164 140 240 113 314 -108 601 -93 706 37 46 58 50 153 8 218 -108 167 -407 142 -713 -61 -101 -67 -101 -67 -247 -9 -80 32 -147 60 -149 63 -2 2 12 33 32 70 63 114 67 139 72 469 4 263 3 300 -11 322 -18 27 -32 30 -56 15z m-460 -841 c72 -13 220 -56 234 -69 22 -22 -148 -101 -272 -127 -218 -45 -405 41 -317 146 53 62 179 80 355 50z m1374 -20 c59 -16 96 -58 96 -109 0 -141 -253 -180 -566 -88 -40 12 -74 25 -74 28 0 8 122 82 198 119 110 55 253 76 346 50z m-1584 -573 c63 -13 155 -36 203 -51 105 -32 108 -27 -66 -110 -188 -90 -323 -127 -473 -127 -177 -1 -305 60 -304 146 2 150 290 214 640 142z m1923 -10 c233 -55 237 -290 5 -375 -156 -57 -403 -36 -716 62 -84 26 -84 26 35 106 255 170 505 247 676 207z m-2174 -636 c156 -16 354 -74 543 -157 58 -26 58 -26 -5 -72 -324 -245 -580 -348 -840 -339 -524 18 -476 489 58 567 85 12 129 12 244 1z m2230 -150 c231 -29 365 -165 322 -326 -61 -226 -418 -299 -819 -168 -97 31 -472 205 -472 218 0 9 174 94 289 141 189 77 414 133 571 143 14 1 63 -3 109 -8z"

export default async function OGImage() {
  const fontData = await loadCormorantItalic()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#4A3728',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Dekoratif halkalar */}
        <div style={{ position: 'absolute', right: -80, top: -80, width: 420, height: 420, borderRadius: '50%', border: '1px solid rgba(184,152,128,0.22)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, width: 270, height: 270, borderRadius: '50%', border: '1px solid rgba(184,152,128,0.12)' }} />

        {/* Ana içerik */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
          {/* Logo + başlıklar — navbar hizalaması */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            <svg viewBox="0 0 421 583" width={120} height={166} fill="rgba(250,247,242,0.9)">
              <g transform="translate(0,583) scale(0.1,-0.1)">
                <path d={UNALOME_PATH} />
              </g>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
              <span
                style={{
                  color: '#B89880',
                  fontSize: 68,
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '2px',
                }}
              >
                KLİNİK PSİKOLOG
              </span>
              <h1
                style={{
                  margin: 0,
                  color: '#FAF7F2',
                  fontSize: 88,
                  fontWeight: 400,
                  lineHeight: 1,
                  fontStyle: 'italic',
                  fontFamily: fontData ? 'Cormorant Garamond' : 'Georgia, serif',
                }}
              >
                Hande Pehlivan
              </h1>
            </div>
          </div>
          <p
            style={{
              margin: 0,
              color: 'rgba(250,247,242,0.68)',
              fontSize: 32,
              lineHeight: 1.5,
            }}
          >
            Çocuk, ergen ve genç yetişkinler için bireysel terapi. Bilişsel Davranışçı Terapi · Deneyimsel Oyun Terapisi.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid rgba(184,152,128,0.25)',
            paddingTop: 28,
          }}
        >
          <span style={{ color: 'rgba(250,247,242,0.55)', fontSize: 22, letterSpacing: '1.5px' }}>
            handepehlivan.org
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? { fonts: [{ name: 'Cormorant Garamond', data: fontData, style: 'italic', weight: 400 }] }
        : {}),
    }
  )
}
