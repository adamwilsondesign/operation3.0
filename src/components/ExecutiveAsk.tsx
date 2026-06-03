import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const asks = [
  { number: '01', ask: 'Approve the $150,000 investment', detail: 'Structured across 5 phases with milestone billing. No large upfront requirement.' },
  { number: '02', ask: 'Assign an executive sponsor', detail: 'Single decision-maker with authority to unblock. 2–3 hours per month of their time.' },
  { number: '03', ask: 'Authorize a Q3 kickoff', detail: 'Discovery begins within 2 weeks of approval. Full launch in 22 weeks.' },
]

export default function ExecutiveAsk() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="ask"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border bg-surface"
      aria-label="Executive ask"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          The Ask
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-4 max-w-3xl"
        >
          Three decisions. That&apos;s it.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed mb-16"
        >
          We&apos;re not asking for a leap of faith. We&apos;re asking for a structured business decision with a clear payback.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {asks.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="p-8 border border-accent/30 rounded-sm bg-accent/5"
              style={{ boxShadow: '0 0 40px rgba(37, 99, 235, 0.08)' }}
            >
              <span className="text-4xl font-black text-accent/30 font-mono mb-4 block">{item.number}</span>
              <h3 className="text-lg font-bold text-primary mb-3">{item.ask}</h3>
              <p className="text-secondary text-sm leading-relaxed">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
