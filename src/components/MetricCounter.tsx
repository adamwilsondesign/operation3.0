import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  suffix: string
  label: string
  refId?: number
  onRefClick?: (id: number) => void
}

export default function MetricCounter({ value, suffix, label, refId, onRefClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1200
    const start = performance.now()
    const isDecimal = value % 1 !== 0

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value
      setDisplay(isDecimal ? Math.round(current * 10) / 10 : Math.round(current))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return (
    <div ref={containerRef} className="flex flex-col gap-3 p-6 border border-border-light rounded-sm glass">
      <div className="flex items-end gap-1">
        <span className="text-5xl font-black text-primary tabular-nums leading-none">
          {display % 1 !== 0 ? display.toFixed(1) : display}
        </span>
        <span className="text-2xl font-bold text-accent mb-1">{suffix}</span>
        {refId !== undefined && onRefClick && (
          <button
            onClick={() => onRefClick(refId)}
            className="text-xs text-secondary hover:text-accent ml-1 mb-2 transition-colors"
            aria-label={`View source ${refId}`}
          >
            [{refId}]
          </button>
        )}
      </div>
      <p className="text-sm text-secondary leading-relaxed">{label}</p>
    </div>
  )
}
