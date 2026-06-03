import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SystemMap from './SystemMap'

export default function WhatWeAreBuilding() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="scope"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border bg-surface"
      aria-label="What we are building"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          The System
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-4 max-w-3xl"
        >
          Three pillars. One integrated system.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-secondary text-lg max-w-2xl leading-relaxed"
        >
          Each pillar solves a distinct problem. Together they create a compounding infrastructure that earns back its investment in the first year.
        </motion.p>
        <SystemMap />
      </div>
    </section>
  )
}
