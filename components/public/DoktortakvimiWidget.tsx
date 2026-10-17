'use client'

import { useEffect, useRef, useState } from 'react'

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
 *
 * Yıldız ve görüş sayısını gizleme:
 * - Widget farklı bir alan adından iframe olarak geldiği için içine stil
 *   verilemiyor; Doktortakvimi'nin bunu kapatan bir ayarı da yok.
 * - iframe her ekranda sabit WIDGET_WIDTH genişliğinde çizilip kapsayıcıya
 *   sığacak şekilde ölçekleniyor. Böylece isim satırı hiç kırılmıyor ve
 *   yıldız satırı her zaman aynı konumda kalıyor; üstüne kartla aynı renkte
 *   bir maske yerleştiriliyor. Doktortakvimi kart tasarımını değiştirirse
 *   RATING_MASK değerleri yeniden ölçülmeli.
 */

const DOCTOR = 'hande-pehlivan2'
const PROFILE_URL = `https://www.doktortakvimi.com/profil/${DOCTOR}`
const SCRIPT_SRC = 'https://platform.docplanner.com/js/widget.js'

const WIDGET_WIDTH = 380
const RATING_MASK = { top: 77, left: 94, width: 270, height: 24 }

type Props = {
  type: 'big_with_calendar' | 'big'
  opinion: boolean
  hideRating?: boolean
  title?: string
  className?: string
}

export default function DoktortakvimiWidget({
  type,
  opinion,
  hideRating = false,
  title = 'Doktor randevu widgeti',
  className,
}: Props) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [innerHeight, setInnerHeight] = useState(0)

  useEffect(() => {
    const host = hostRef.current
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

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    const observer = new ResizeObserver(() => {
      setScale(Math.min(1, outer.clientWidth / WIDGET_WIDTH))
      setInnerHeight(inner.offsetHeight)
    })
    observer.observe(outer)
    observer.observe(inner)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ height: innerHeight ? innerHeight * scale : undefined, overflow: 'hidden' }}
    >
      <div
        ref={innerRef}
        style={{
          position: 'relative',
          width: WIDGET_WIDTH,
          margin: scale < 1 ? undefined : '0 auto',
          transform: scale < 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top left',
        }}
      >
        <div ref={hostRef} />
        {hideRating && innerHeight > 200 && (
          <div
            aria-hidden="true"
            style={{ position: 'absolute', background: '#fff', ...RATING_MASK }}
          />
        )}
      </div>
    </div>
  )
}
