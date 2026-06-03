import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { problemComparison } from '../data/proposal'
import { SectionReveal } from './ui'

const EASE = [0.25, 1, 0.5, 1] as const

// ─── Main component ───────────────────────────────────────────────────────────

export default function ProblemSection() {
  const [transformed, setTransformed] = useState(false)
  const reduced = useReducedMotion()

  const gridRef  = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: '-8%' })

  const toggle = () => {
    if (!reduced) setTransformed(t => !t)
  }

  return (
    <section
      id="problem"
      className="py-28 lg:py-36 border-t border-border"
      aria-labelledby="problem-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">The Gap</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="problem-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[28ch] mb-8
            "
          >
            {problemComparison.headline}
          </h2>
        </SectionReveal>

        {/* Framing + toggle */}
        <SectionReveal delay={0.16}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-12">
            <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch]">
              {problemComparison.framing}
            </p>

            <button
              type="button"
              onClick={toggle}
              className={[
                'flex-shrink-0 self-start flex items-center gap-2',
                'text-[10.5px] font-semibold tracking-cap uppercase',
                'px-4 py-2.5 rounded-[2px] border',
                'transition-colors duration-250',
                transformed
                  ? 'border-accent/40 text-accent bg-accent-dim'
                  : 'border-border text-secondary hover:border-border-light hover:text-primary',
              ].join(' ')}
              aria-pressed={transformed}
              aria-label={transformed ? 'Reset comparison view' : 'View transformation'}
            >
              {transformed ? '← Reset' : 'View transformation →'}
            </button>
          </div>
        </SectionReveal>

        {/* ── Before / After comparison ── */}
        <SectionReveal delay={0.24}>
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-[1fr_56px_1fr]"
          >

            {/* ── LEFT: Current friction ── */}
            <motion.div
              animate={reduced ? {} : { opacity: transformed ? 0.18 : 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="
                p-8 lg:p-10
                border border-border
                rounded-[3px] lg:rounded-r-none lg:border-r-0
                bg-bg-raised
              "
            >
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-secondary mb-8">
                Current State
              </p>
              <ul className="space-y-4" role="list">
                {problemComparison.friction.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.05 + i * 0.055, ease: EASE }}
                    className="flex items-start gap-3 group/item"
                  >
                    <span
                      className="
                        mt-[3px] flex-shrink-0
                        font-mono text-[11px] text-tertiary
                        select-none
                      "
                      aria-hidden="true"
                    >
                      —
                    </span>
                    <span className="text-[13.5px] text-secondary leading-[1.6]">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* ── CENTER: Arrow divider ── */}
            <div
              className="
                hidden lg:flex
                flex-col items-center justify-center
                relative z-10
              "
              aria-hidden="true"
            >
              {/* Top line */}
              <div className="w-[1px] flex-1 bg-border" />

              {/* Arrow circle */}
              <motion.div
                animate={reduced ? {} : {
                  borderColor: transformed
                    ? 'rgba(37,99,235,0.50)'
                    : 'rgba(26,26,26,1)',
                  backgroundColor: transformed
                    ? 'rgba(37,99,235,0.10)'
                    : 'rgba(13,13,13,1)',
                  scale: transformed ? 1.15 : 1,
                }}
                transition={{ duration: 0.5, ease: EASE }}
                className="
                  w-9 h-9 rounded-full
                  border border-border
                  bg-bg-raised
                  flex items-center justify-center
                  my-4 flex-shrink-0
                "
              >
                <motion.span
                  animate={reduced ? {} : {
                    color: transformed ? '#3b82f6' : '#555555',
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-[13px] font-mono text-tertiary leading-none"
                >
                  →
                </motion.span>
              </motion.div>

              {/* Bottom line */}
              <div className="w-[1px] flex-1 bg-border" />
            </div>

            {/* Mobile divider */}
            <div
              className="lg:hidden flex items-center gap-4 py-5"
              aria-hidden="true"
            >
              <div className="flex-1 h-[1px] bg-border" />
              <span className="text-[12px] font-mono text-tertiary">→</span>
              <div className="flex-1 h-[1px] bg-border" />
            </div>

            {/* ── RIGHT: Target outcomes ── */}
            <motion.div
              animate={reduced ? {} : {
                borderColor: transformed
                  ? 'rgba(37,99,235,0.30)'
                  : 'rgba(26,26,26,1)',
                boxShadow: transformed
                  ? '0 0 60px rgba(37,99,235,0.09)'
                  : '0 0 0px transparent',
              }}
              transition={{ duration: 0.5, ease: EASE }}
              className="
                p-8 lg:p-10
                border border-border
                rounded-[3px] lg:rounded-l-none
                bg-bg-raised
              "
            >
              <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-accent mb-8">
                Target State
              </p>
              <ul className="space-y-4" role="list">
                {problemComparison.desired.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={reduced ? false : { opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.12 + i * 0.055, ease: EASE }}
                    className="flex items-start gap-3"
                  >
                    <motion.span
                      animate={reduced ? {} : {
                        color: transformed ? '#3b82f6' : '#555555',
                      }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="
                        mt-[3px] flex-shrink-0
                        font-mono text-[11px] text-tertiary font-semibold
                        select-none
                      "
                      aria-hidden="true"
                    >
                      →
                    </motion.span>
                    <span className="text-[13.5px] text-primary leading-[1.6]">
                      {item.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
