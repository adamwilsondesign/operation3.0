import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Thin cobalt progress line pinned to the very top of the viewport.
 * Uses requestAnimationFrame for smooth 60fps updates.
 * Respects prefers-reduced-motion by hiding when motion is reduced.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    let rafId: number

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct   = total > 0 ? (window.scrollY / total) * 100 : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct / 100})`
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-border"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full bg-accent origin-left"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />
    </div>
  )
}
