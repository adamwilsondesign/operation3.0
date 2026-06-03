import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'
import { metrics } from '../data/proposal'
import MetricCounter from './MetricCounter'

interface Props {
  onRefClick: (id: number) => void
}

export default function RoiEvidence({ onRefClick }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="roi"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border"
      aria-label="ROI evidence"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          The Evidence
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-4 max-w-3xl"
        >
          The data is not ambiguous.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed mb-16"
        >
          Industry research across thousands of B2B companies confirms what we already know intuitively.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <MetricCounter
                value={m.value}
                suffix={m.suffix}
                label={m.label}
                refId={m.refId}
                onRefClick={onRefClick}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 p-8 border border-accent/20 rounded-sm bg-accent/5"
        >
          <p className="text-primary text-xl sm:text-2xl font-semibold leading-relaxed max-w-4xl">
            "Companies that invest in digital experience infrastructure grow revenue{' '}
            <span className="text-accent">5x faster</span> than peers who treat their website as a cost center."
          </p>
          <p className="text-secondary text-sm mt-4">
            McKinsey & Company, 2024{' '}
            <button
              onClick={() => onRefClick(5)}
              className="text-secondary hover:text-accent transition-colors"
              aria-label="View source 5"
            >
              [5]
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
