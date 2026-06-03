import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const before = [
  'A website that describes services',
  'Sales materials rebuilt per deal',
  'Brand applied inconsistently',
  'Expertise invisible to prospects',
  'Growth dependent on relationships alone',
]

const after = [
  'A system that sells while you sleep',
  'Sales infrastructure that compounds',
  'Brand that builds authority at scale',
  'Expertise legible from the first impression',
  'Pipeline from digital, not just referrals',
]

export default function StrategicShift() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section
      id="market"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border"
      aria-label="Strategic shift"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          The Shift
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-16"
        >
          From presence to performance.
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="p-8 border border-border rounded-sm"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-6">Current State</p>
            <ul className="space-y-4" role="list">
              {before.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
                  <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary/40">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="p-8 border border-accent/30 rounded-sm accent-glow bg-accent/5"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">Target State</p>
            <ul className="space-y-4" role="list">
              {after.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-primary text-sm leading-relaxed">
                  <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent font-bold">+</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
