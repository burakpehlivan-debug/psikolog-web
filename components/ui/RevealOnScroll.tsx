'use client'

import { useEffect, useRef } from 'react'

type Direction = 'up' | 'left' | 'right' | 'scale'

interface Props {
  children: React.ReactNode
  direction?: Direction
  delay?: number
  className?: string
}

const initialTransform: Record<Direction, string> = {
  up:    'translateY(28px)',
  left:  'translateX(-28px)',
  right: 'translateX(28px)',
  scale: 'scale(0.97)',
}

export default function RevealOnScroll({ children, direction = 'up', delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = initialTransform[direction]
    el.style.transition = `opacity 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, transform 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          obs.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [direction, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
