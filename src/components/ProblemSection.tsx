import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { problems } from '../data/proposal'

export default function ProblemSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="problem"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border bg-surface"
      aria-label="Problem statement"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          The Problem
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-4 max-w-3xl"
        >
          We are leaving revenue on the table.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed mb-16"
        >
          Four structural issues are compounding against us every quarter.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="p-8 border border-border rounded-sm hover:border-border-light transition-colors duration-300"
            >
              <span className="text-xs font-mono text-secondary/40 mb-4 block">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-lg font-bold text-primary mb-3">{p.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
