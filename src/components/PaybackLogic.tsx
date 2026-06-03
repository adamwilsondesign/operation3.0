import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import RoiCalculator from './RoiCalculator'

export default function PaybackLogic() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="payback"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border bg-surface"
      aria-label="Payback logic and ROI calculator"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Payback Logic
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-4 max-w-3xl"
        >
          This pays for itself. Model it yourself.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed"
        >
          A conservative 20% lift in conversion rate — well below the industry benchmark — recovers the full investment within the first year.
        </motion.p>
        <RoiCalculator />
      </div>
    </section>
  )
}
