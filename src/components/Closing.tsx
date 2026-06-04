import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { projectMeta, totalBudget } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

const EASE = [0.16, 1, 0.3, 1] as const

export default function Closing() {
  const reduced = useReducedMotion()
  const glowRef = useRef<HTMLDivElement>(null)
  const glowInView = useInView(glowRef, { once: true, margin: '-5%' })

  return (
    <section
      id="closing"
      className="snap-section flex flex-col justify-center border-t border-border bg-white overflow-hidden"
      aria-labelledby="closing-headline"
    >
      <CornerMarks />
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          ref={glowRef}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,0,197,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          initial={reduced ? false : { opacity: 0, scale: 0.7 }}
          animate={glowInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.8, ease: EASE }}
        />
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,0,197,0.15) 50%, transparent 100%)' }}
          initial={reduced ? false : { scaleX: 0 }}
          animate={glowInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
        />
      </div>

      <div className="section-container relative py-8 flex flex-col items-center justify-center h-full">

        <SectionReveal>
          <p className="eyebrow mb-8 text-center">The Bottom Line</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="closing-headline"
            className="
              text-display-2xl font-black text-primary
              tracking-editorial leading-[0.92]
              text-center mx-auto
              max-w-[18ch]
              mb-8
            "
          >
            We are not buying<br className="hidden sm:block" /> a new look.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.16}>
          <p className="
            text-[19px] lg:text-[22px] font-light text-primary
            leading-[1.5] tracking-tight
            text-center mx-auto max-w-[40ch]
            mb-6
          ">
            We are building the system that makes Lazer easier to understand, easier to trust, and easier to buy.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.22}>
          <p className="
            text-[15px] text-secondary leading-[1.65]
            text-center mx-auto max-w-[44ch]
            mb-8
          ">
            For the next phase of the business, this is not a marketing expense. It is a growth asset.
          </p>
        </SectionReveal>

        {/* CTAs */}
        <SectionReveal delay={0.28}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <a
              href="#ask"
              className="
                inline-flex items-center gap-2
                bg-accent text-white
                text-[12px] font-semibold tracking-[0.1em] uppercase
                px-6 py-3 rounded-[3px]
                hover:bg-accent-light transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
              "
            >
              Approve V1 scope
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#budget"
              className="
                inline-flex items-center gap-2
                border border-border-mid text-secondary
                text-[12px] font-semibold tracking-[0.1em] uppercase
                px-6 py-3 rounded-[3px]
                hover:border-border-light hover:text-primary transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
              "
            >
              View budget
            </a>
            <a
              href="#references"
              className="
                inline-flex items-center gap-2
                border border-border-mid text-secondary
                text-[12px] font-semibold tracking-[0.1em] uppercase
                px-6 py-3 rounded-[3px]
                hover:border-border-light hover:text-primary transition-colors duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
              "
            >
              View references
            </a>
          </div>
        </SectionReveal>

        {/* Summary card */}
        <SectionReveal delay={0.32}>
          <div className="card-accent p-8 lg:p-10 max-w-2xl mx-auto">
            <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-accent/60 mb-6 text-center">
              {projectMeta.title}
            </p>
            <div className="grid grid-cols-3 divide-x divide-accent/15">
              <div className="pr-6 lg:pr-8 text-center">
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-accent/50 mb-2">Investment</p>
                <p className="text-[22px] lg:text-[26px] font-mono font-black text-primary tabular leading-none">
                  {fmt(totalBudget)}
                </p>
              </div>
              <div className="px-6 lg:px-8 text-center">
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-accent/50 mb-2">Timeline</p>
                <p className="text-[22px] lg:text-[26px] font-mono font-black text-primary tabular leading-none">
                  {projectMeta.timelineMonths}mo
                </p>
              </div>
              <div className="pl-6 lg:pl-8 text-center">
                <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-accent/50 mb-2">Scope</p>
                <p className="text-[13px] font-semibold text-primary leading-snug">
                  System V1
                </p>
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="text-center text-[10px] font-mono text-tertiary/40 mt-16 tracking-wide">
            Lazer Technologies — Confidential — {new Date().getFullYear()}
          </p>
        </SectionReveal>

      </div>
    </section>
  )
}
