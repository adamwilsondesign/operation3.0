import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { budgetBuckets, totalBudget, type BudgetBucket } from '../data/proposal'
import { SectionReveal } from './ui'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

// Accent shades per bucket — subtle variation on cobalt
const BUCKET_COLORS = [
  { bar: 'bg-accent',             text: 'text-accent',       border: 'border-accent/40'  },
  { bar: 'bg-accent/60',          text: 'text-accent/80',    border: 'border-accent/25'  },
  { bar: 'bg-accent/85',          text: 'text-accent/90',    border: 'border-accent/35'  },
  { bar: 'bg-accent/35',          text: 'text-accent/60',    border: 'border-accent/18'  },
]

// ─── Allocation bar ───────────────────────────────────────────────────────────

function AllocationBar({
  buckets,
  activeId,
  onSelect,
  reduced,
}: {
  buckets: BudgetBucket[]
  activeId: string | null
  onSelect: (id: string) => void
  reduced: boolean | null
}) {
  return (
    <div
      className="flex h-10 rounded-[3px] overflow-hidden gap-[2px] mb-8"
      role="group"
      aria-label="Budget allocation bar"
    >
      {buckets.map((b, i) => {
        const pct = (b.amount / totalBudget) * 100
        const isActive = activeId === b.id
        const color = BUCKET_COLORS[i]
        return (
          <motion.button
            key={b.id}
            type="button"
            onClick={() => onSelect(b.id)}
            aria-pressed={isActive}
            aria-label={`${b.label}: ${fmt(b.amount)}`}
            className={`
              relative h-full flex items-center justify-center
              transition-all duration-300 cursor-pointer
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
              ${color.bar}
              ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-65'}
            `}
            style={{ width: `${pct}%` }}
            initial={reduced ? false : { scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduced ? undefined : {
              duration: 0.7,
              delay: 0.3 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Percentage label — only on wider segments */}
            {pct >= 15 && (
              <span className="text-[10px] font-mono font-semibold text-white/80 tabular select-none">
                {Math.round(pct)}%
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

// ─── Bucket selector row ──────────────────────────────────────────────────────

function BucketRow({
  bucket,
  index,
  isActive,
  onSelect,
}: {
  bucket: BudgetBucket
  index: number
  isActive: boolean
  onSelect: () => void
}) {
  const color = BUCKET_COLORS[index]
  const pct = Math.round((bucket.amount / totalBudget) * 100)

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`
        w-full text-left p-5 lg:p-6
        rounded-[3px] border transition-all duration-250
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
        ${isActive
          ? `border-accent/30 bg-accent-dim`
          : 'border-border bg-surface-2 hover:border-border-light hover:bg-surface-3'
        }
      `}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Color swatch */}
          <span
            className={`flex-shrink-0 w-2 h-2 rounded-full ${color.bar} ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity duration-250`}
            aria-hidden="true"
          />
          <span className={`text-[13px] font-semibold truncate transition-colors duration-250 ${isActive ? 'text-primary' : 'text-secondary'}`}>
            {bucket.label}
          </span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <span className={`text-[10px] font-mono tabular transition-colors duration-250 ${isActive ? color.text : 'text-tertiary'}`}>
            {pct}%
          </span>
          <span className={`text-[13px] font-mono font-semibold tabular transition-colors duration-250 ${isActive ? 'text-primary' : 'text-secondary'}`}>
            {fmt(bucket.amount)}
          </span>
        </div>
      </div>
    </button>
  )
}

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ bucket, reduced }: { bucket: BudgetBucket; reduced: boolean | null }) {
  return (
    <motion.div
      key={bucket.id}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
      className="card-elevated p-7 lg:p-8"
    >
      <div className="flex items-start justify-between gap-6 mb-6">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-1.5">
            Investment
          </p>
          <p className="text-[13px] font-semibold text-primary">{bucket.label}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-1.5">
            Allocation
          </p>
          <p className="text-[22px] font-mono font-black text-accent tabular leading-none">
            {fmt(bucket.amount)}
          </p>
        </div>
      </div>

      <div className="h-[1px] bg-border mb-6" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Includes */}
        <div>
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
            Includes
          </p>
          <ul className="space-y-2" aria-label={`${bucket.label} deliverables`}>
            {bucket.includes.map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-accent/50 leading-none mt-[3px] flex-shrink-0" aria-hidden="true">—</span>
                <span className="text-[12px] text-secondary leading-[1.55]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Return */}
        <div>
          <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
            Return
          </p>
          <p className="text-[13px] text-secondary leading-[1.65]">
            {bucket.returns}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function BudgetBreakdown() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string>(budgetBuckets[0].id)

  const activeBucket = budgetBuckets.find(b => b.id === activeId) ?? budgetBuckets[0]

  const select = (id: string) => {
    setActiveId(id)
  }

  return (
    <section
      id="budget"
      className="py-28 lg:py-36 border-t border-border bg-surface"
      aria-labelledby="budget-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">Investment</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="budget-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[26ch] mb-6
            "
          >
            $60K focused on the highest-leverage parts of the system.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-14">
            This is a system-first V1 investment, not a bespoke campaign. The goal is to build reusable infrastructure once, then use it across every future buyer touchpoint.
          </p>
        </SectionReveal>

        {/* Allocation bar */}
        <SectionReveal delay={0.2}>
          <AllocationBar
            buckets={budgetBuckets}
            activeId={activeId}
            onSelect={select}
            reduced={reduced}
          />
        </SectionReveal>

        {/* Bucket selector rows */}
        <SectionReveal delay={0.26}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {budgetBuckets.map((b, i) => (
              <BucketRow
                key={b.id}
                bucket={b}
                index={i}
                isActive={activeId === b.id}
                onSelect={() => select(b.id)}
              />
            ))}
          </div>
        </SectionReveal>

        {/* Detail panel */}
        <SectionReveal delay={0.1}>
          <AnimatePresence mode="wait">
            <DetailPanel key={activeId} bucket={activeBucket} reduced={reduced} />
          </AnimatePresence>
        </SectionReveal>

        {/* Total row */}
        <SectionReveal delay={0.1}>
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-8">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-1">
                Total Investment
              </p>
              <p className="text-[12px] text-secondary">
                Milestone-billed across the engagement. No large upfront payment required.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[32px] font-mono font-black text-primary tabular leading-none">
                {fmt(totalBudget)}
              </p>
              <p className="text-[10px] font-mono text-tertiary mt-1">USD</p>
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
