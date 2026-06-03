import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { timelinePhases } from '../data/proposal'

export default function Timeline() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="timeline"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border"
      aria-label="Project timeline"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Timeline
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-16"
        >
          22 weeks. Launch-ready.
        </motion.h2>

        {/* Desktop: horizontal */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[28px] left-0 right-0 h-[1px] bg-border" aria-hidden="true" />
          <div className="grid grid-cols-5 gap-4">
            {timelinePhases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="relative"
              >
                <div className="w-3 h-3 rounded-full bg-accent mb-6 relative z-10" aria-hidden="true" />
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-1">{phase.phase}</p>
                <p className="text-base font-bold text-primary mb-1">{phase.label}</p>
                <p className="text-xs text-secondary mb-4">{phase.duration}</p>
                <ul className="space-y-1.5" role="list">
                  {phase.deliverables.map((d, j) => (
                    <li key={j} className="text-xs text-secondary leading-relaxed flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-border-light mt-1.5 flex-shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden space-y-0">
          {timelinePhases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="flex gap-6 pb-8"
            >
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-accent flex-shrink-0 mt-1" aria-hidden="true" />
                {i < timelinePhases.length - 1 && (
                  <div className="w-[1px] flex-1 bg-border mt-2" aria-hidden="true" />
                )}
              </div>
              <div className="pb-2">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-0.5">{phase.phase} · {phase.duration}</p>
                <p className="text-base font-bold text-primary mb-3">{phase.label}</p>
                <ul className="space-y-1" role="list">
                  {phase.deliverables.map((d, j) => (
                    <li key={j} className="text-sm text-secondary">{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
