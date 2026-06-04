import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'framer-motion'
import { approvalModel, totalBudget, projectMeta } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

// ─── Decision cards data ──────────────────────────────────────────────────────

const DECISIONS = [
  {
    id: 'budget',
    category: 'Investment',
    decision: `${fmt(totalBudget)} USD external budget`,
    detail: 'Four fully-scoped buckets. Milestone-billed — no large upfront payment.',
  },
  {
    id: 'timeline',
    category: 'Duration',
    decision: `${projectMeta.timelineMonths}-month delivery timeline`,
    detail: 'Parallel workstreams from week two. Founder reviews at each milestone.',
  },
  {
    id: 'cd',
    category: 'Resource',
    decision: 'Full-time creative director protection',
    detail: 'The creative director is the primary driver of quality and velocity. This requires protected time.',
  },
  {
    id: 'sponsor',
    category: 'Governance',
    decision: 'Part-time executive sponsor involvement',
    detail: `${approvalModel.executiveSponsor} leads day-to-day decisions alongside the creative director.`,
  },
  {
    id: 'workshops',
    category: 'Collaboration',
    decision: 'Founder workshops and milestone approvals',
    detail: `${approvalModel.founders.join(', ')} hold final approval. Three milestone checkpoints across the engagement.`,
  },
  {
    id: 'scope',
    category: 'Scope',
    decision: 'V1 scope: brand, website, sales enablement, proof, launch, measurement',
    detail: 'No scope beyond what is specified. This is a focused V1 — not a full rebrand or agency retainer.',
  },
  {
    id: 'focus',
    category: 'Strategy',
    decision: 'Strategic focus: AI, Commerce, and Design',
    detail: 'Three market positions — aligned to where Lazer wins and where buyers are spending.',
  },
  {
    id: 'fintech',
    category: 'Positioning',
    decision: 'Fintech supports the AI sales story',
    detail: 'Fintech remains part of the portfolio — positioned as evidence of technical credibility, not a primary vertical.',
  },
  {
    id: 'crypto',
    category: 'Deprioritized',
    decision: 'Crypto/Web3 is deprioritized',
    detail: 'Not removed — deprioritized. The primary buyer is enterprise teams shipping AI into production.',
  },
] as const

// ─── Decision card ────────────────────────────────────────────────────────────

function DecisionCard({
  item,
  index,
  inView,
  isLocked,
  reduced,
}: {
  item: (typeof DECISIONS)[number]
  index: number
  inView: boolean
  isLocked: boolean
  reduced: boolean | null
}) {
  const isDeprioritized = item.id === 'crypto'

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={reduced ? undefined : {
        duration: 0.5,
        delay: 0.1 + index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`
        relative p-5 lg:p-6 rounded-[3px] border transition-all duration-400
        ${isLocked
          ? isDeprioritized
            ? 'border-border bg-surface-2 opacity-60'
            : 'border-accent/30 bg-accent-dim shadow-[0_0_0_1px_rgba(255,0,197,0.08),0_4px_24px_rgba(255,0,197,0.07)]'
          : 'border-border-mid bg-surface-2'
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`
              text-[9px] font-semibold tracking-[0.2em] uppercase leading-none
              px-1.5 py-0.5 rounded-[2px] border
              ${isDeprioritized
                ? 'border-border text-tertiary'
                : 'border-accent/25 text-accent/70'
              }
            `}>
              {item.category}
            </span>
          </div>
          <p className={`text-[13px] font-semibold leading-snug mb-1.5 ${isDeprioritized ? 'text-secondary' : 'text-primary'}`}>
            {item.decision}
          </p>
          <p className="text-[11.5px] text-tertiary leading-[1.55]">
            {item.detail}
          </p>
        </div>

        {/* Lock indicator */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              key="lock"
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduced ? undefined : { duration: 0.25, delay: 0.1 }}
              className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${isDeprioritized ? 'bg-border-mid' : 'bg-accent/15'}`}
              aria-label="Approved"
            >
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none" aria-hidden="true">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke={isDeprioritized ? '#555' : '#FF00C5'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function ExecutiveAsk() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const [locked, setLocked] = useState(false)

  const handleLock = () => setLocked(true)

  return (
    <section
      id="ask"
      className="snap-section overflow-y-auto border-t border-border bg-surface"
      aria-labelledby="ask-headline"
    >
      <CornerMarks />
      <div className="section-container py-8">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">The Ask</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="ask-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[22ch] mb-6
            "
          >
            What we need to approve.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-6">
            Nine decisions. Each one scoped, bounded, and reversible at the next milestone. Together they authorize a complete system — not an open-ended engagement.
          </p>
        </SectionReveal>

        {/* Decision grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {DECISIONS.map((item, i) => (
            <DecisionCard
              key={item.id}
              item={item}
              index={i}
              inView={inView}
              isLocked={locked}
              reduced={reduced}
            />
          ))}
        </div>

        {/* Approve CTA */}
        <SectionReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-border">
            <div className="flex-1">
              {locked ? (
                <motion.div
                  key="locked-state"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                  <p className="text-[15px] font-semibold text-primary">
                    Nine decisions approved. Ready to kick off.
                  </p>
                </motion.div>
              ) : (
                <div>
                  <p className="text-[13px] text-secondary leading-relaxed max-w-[44ch]">
                    Review all nine decisions above, then mark this proposal approved to proceed.
                  </p>
                </div>
              )}
            </div>

            {!locked && (
              <motion.button
                type="button"
                onClick={handleLock}
                whileHover={reduced ? undefined : { scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: 0.98 }}
                className="
                  flex-shrink-0
                  px-6 py-3
                  bg-accent text-white
                  text-[12px] font-semibold tracking-[0.1em] uppercase
                  rounded-[3px]
                  hover:bg-accent-light
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface
                "
                aria-label="Approve all nine decisions"
              >
                Approve proposal →
              </motion.button>
            )}
          </div>
        </SectionReveal>

        {/* Investment summary — shown after approval */}
        <AnimatePresence>
          {locked && (
            <motion.div
              key="summary"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduced ? undefined : { duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 card-accent p-7 lg:p-8"
            >
              <div className="flex flex-wrap items-start gap-x-14 gap-y-6">
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/60 mb-1.5">
                    Total Investment
                  </p>
                  <p className="text-[28px] font-mono font-black text-primary tabular leading-none">
                    {fmt(totalBudget)}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/60 mb-1.5">
                    Timeline
                  </p>
                  <p className="text-[28px] font-mono font-black text-primary tabular leading-none">
                    {projectMeta.timelineMonths}mo
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/60 mb-1.5">
                    Final Approval
                  </p>
                  <p className="text-[16px] font-semibold text-primary leading-none mt-1.5">
                    {approvalModel.founders.join(' · ')}
                  </p>
                </div>
                <div className="flex-1 flex items-end">
                  <p className="text-[12px] text-accent/70 leading-relaxed max-w-[38ch]">
                    Lazer Brand Evolution, Website Rebuild, and Sales Enablement System. System-first V1 investment.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
