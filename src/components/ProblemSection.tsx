import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { problemComparison } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

const EASE = [0.25, 1, 0.5, 1] as const

export default function ProblemSection() {
  const reduced = useReducedMotion()
  const gridRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-8%' })

  return (
    <section
      id="problem"
      className="snap-section flex flex-col justify-center border-t border-border bg-white"
      aria-labelledby="problem-headline"
    >
      <CornerMarks />
      <div className="section-container relative py-8">

        {/* Header */}
        <SectionReveal>
          <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">// GAP.ANALYSIS · STATE_COMPARISON</p>
          <p className="eyebrow mb-5">The Gap</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="problem-headline"
            className="text-display-lg font-black text-primary tracking-editorial leading-editorial max-w-[28ch] mb-8"
          >
            {problemComparison.headline}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-8">
            {problemComparison.framing}
          </p>
        </SectionReveal>

        {/* Before / After comparison */}
        <SectionReveal delay={0.2}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr]"
          >

            {/* LEFT: Current friction */}
            <div className="
              p-8 lg:p-10
              border border-border-mid
              rounded-[4px] lg:rounded-r-none lg:border-r-0
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]
              hover:shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)]
              hover:border-border-light
              transition-all duration-300
            ">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-accent-2/40 mb-1">[STATE_A]</p>
              <p className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-secondary mb-8">
                Current State
              </p>
              <ul className="space-y-2.5" role="list">
                {problemComparison.friction.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.055, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[3px] flex-shrink-0 font-mono text-[11px] text-tertiary select-none" aria-hidden="true">—</span>
                    <span className="text-[13.5px] text-secondary leading-[1.4]">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* CENTER: Arrow divider */}
            <div className="hidden lg:flex flex-col items-center justify-center relative z-10" aria-hidden="true">
              <div className="w-[1px] flex-1 bg-border" />
              <div className="w-9 h-9 rounded-full border border-border bg-white flex items-center justify-center my-4 flex-shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                <span className="text-[13px] font-mono text-tertiary leading-none">→</span>
              </div>
              <div className="w-[1px] flex-1 bg-border" />
            </div>

            {/* Mobile divider */}
            <div className="lg:hidden flex items-center gap-4 py-5" aria-hidden="true">
              <div className="flex-1 h-[1px] bg-border" />
              <span className="text-[12px] font-mono text-tertiary">→</span>
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            {/* RIGHT: Target outcomes */}
            <div className="
              p-8 lg:p-10
              border border-accent/30
              rounded-[4px] lg:rounded-l-none
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)]
              hover:shadow-[0_8px_32px_rgba(255,0,197,0.12),0_2px_8px_rgba(0,0,0,0.06)]
              hover:border-accent/50
              transition-all duration-300
            ">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-accent/40 mb-1">[STATE_B]</p>
              <p className="text-[10px] font-mono font-semibold tracking-[0.18em] uppercase text-accent mb-8">
                Target State
              </p>
              <ul className="space-y-2.5" role="list">
                {problemComparison.desired.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.055, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-[3px] flex-shrink-0 font-mono text-[11px] text-accent/60 font-semibold select-none" aria-hidden="true">→</span>
                    <span className="text-[13.5px] text-primary leading-[1.4]">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
