import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Closing() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="closing"
      ref={ref}
      className="relative py-32 lg:py-48 px-6 lg:px-8 border-t border-border overflow-hidden"
      aria-label="Closing statement"
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #2563eb 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8"
        >
          The bottom line
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-primary leading-[0.95] tracking-tight max-w-5xl mx-auto"
        >
          The companies that win the next decade are building{' '}
          <span className="text-accent">infrastructure</span> today.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-secondary text-lg max-w-2xl mx-auto leading-relaxed"
        >
          The opportunity cost of waiting is not zero. Every quarter without this system is a quarter of pipeline that went somewhere else.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#ask"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-8 py-4 rounded-sm hover:bg-accent-light transition-colors duration-200"
          >
            Review the ask
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-secondary/40 text-xs"
        >
          Prepared by Lazer Technologies — Confidential — {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  )
}
