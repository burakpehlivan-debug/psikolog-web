'use client'

import { useEffect, useRef } from 'react'

/**
 * Doktortakvimi (Docplanner) widget'ı.
 *
 * Neden özel bileşen?
 * - platform.docplanner.com/js/widget.js yalnızca yüklendiği anda DOM'daki
 *   `.zl-url` linklerini iframe'e çevirir. Next.js client-side navigasyonda
 *   script zaten yüklü olduğundan yeni sayfadaki widget işlenmez. Bu yüzden
 *   her mount'ta script benzersiz id ile yeniden eklenir.
 * - Script `<a>` elementini DOM'dan silip yerine iframe koyar. React'in
 *   yönettiği bir düğümü dışarıdan silmek hataya yol açacağı için link,
 *   React'in boş bıraktığı kapsayıcıya imperatif olarak yazılır.
 * - Orijinal embed kodundaki `id="zl-url"` iki widget'ta tekrar ettiği için
 *   kaldırıldı; script `.zl-url` class'ı ile de çalışıyor.
 */

const DOCTOR = 'hande-pehlivan2'
const PROFILE_URL = `https://www.doktortakvimi.com/profil/${DOCTOR}`
const SCRIPT_SRC = 'https://platform.docplanner.com/js/widget.js'

type Props = {
  type: 'big_with_calendar' | 'big'
  opinion: boolean
  title?: string
  className?: string
}

export default function DoktortakvimiWidget({ type, opinion, title = 'Doktor randevu widgeti', className }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = ref.current
    if (!host) return

    const a = document.createElement('a')
    a.className = 'zl-url'
    a.href = PROFILE_URL
    a.rel = 'nofollow'
    a.textContent = 'Doktortakvimi üzerinden randevu al'
    a.setAttribute('data-zlw-doctor', DOCTOR)
    a.setAttribute('data-zlw-type', type)
    a.setAttribute('data-zlw-opinion', String(opinion))
    a.setAttribute('data-zlw-hide-branding', 'true')
    a.setAttribute('data-zlw-saas-only', 'true')
    a.setAttribute('data-zlw-a11y-title', title)
    host.replaceChildren(a)

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.id = `zl-widget-s-${Math.random().toString(36).slice(2, 10)}`
    document.body.appendChild(script)

    return () => {
      script.remove()
      host.replaceChildren()
    }
  }, [type, opinion, title])

  return <div ref={ref} className={className} />
}
