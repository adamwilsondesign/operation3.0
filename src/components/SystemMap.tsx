import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { systemPillars } from '../data/proposal'

export default function SystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className="mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {systemPillars.map((pillar, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="relative p-8 border border-border rounded-sm bg-surface-2 hover:border-accent/40 transition-colors duration-300 group"
          >
            <div className="flex items-start justify-between mb-6">
              <span className="text-3xl font-black text-accent/30 font-mono group-hover:text-accent/60 transition-colors duration-300">
                {pillar.number}
              </span>
              <div className="w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-300" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-6">{pillar.title}</h3>
            <ul className="space-y-3" role="list">
              {pillar.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-secondary">
                  <span className="w-1 h-1 rounded-full bg-accent/60 flex-shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
