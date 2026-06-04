import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { budgetBuckets, totalBudget, type BudgetBucket } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const BUCKET_COLORS = ['#FF00C5', '#FF33D0', '#CC009E', '#99007A']

// ─── Donut chart ──────────────────────────────────────────────────────────────
function DonutChart({ buckets, activeId, onSelect, reduced }: {
  buckets: BudgetBucket[]; activeId: string; onSelect: (id: string) => void; reduced: boolean | null
}) {
  const SIZE = 180
  const STROKE = 20
  const R = (SIZE - STROKE) / 2
  const CIRC = 2 * Math.PI * R
  const cx = SIZE / 2, cy = SIZE / 2

  let cumPct = 0
  const segments = buckets.map((b, i) => {
    const pct = b.amount / totalBudget
    const start = cumPct
    cumPct += pct
    return { b, i, pct, start }
  })

  return (
    <div className="relative flex items-center justify-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden="true">
        {segments.map(({ b, i, pct, start }) => {
          const isActive = activeId === b.id
          const dashLength = pct * CIRC - 3
          const offset = -start * CIRC - CIRC / 4
          return (
            <motion.circle
              key={b.id}
              cx={cx} cy={cy} r={R}
              fill="none"
              stroke={BUCKET_COLORS[i]}
              strokeWidth={STROKE}
              strokeDasharray={`${dashLength} ${CIRC - dashLength}`}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              style={{ cursor: 'pointer' }}
              animate={{ opacity: isActive ? 1 : 0.28 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
              onClick={() => onSelect(b.id)}
              aria-label={`${b.label}: ${fmt(b.amount)}`}
            />
          )
        })}
      </svg>
      {/* Center total */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-mono font-black text-[22px] text-primary tabular leading-none">
          {fmt(totalBudget)}
        </span>
        <span className="font-mono text-[9px] text-tertiary tracking-[0.15em] uppercase mt-1">Total</span>
      </div>
    </div>
  )
}

// ─── Bucket row ───────────────────────────────────────────────────────────────
function BucketRow({ bucket, index, isActive, onSelect }: {
  bucket: BudgetBucket; index: number; isActive: boolean; onSelect: () => void
}) {
  const pct = Math.round((bucket.amount / totalBudget) * 100)
  return (
    <div>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={isActive}
        className={`w-full text-left px-4 py-3 rounded-[3px] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
          ${isActive ? 'border-accent/30 bg-accent-dim' : 'border-border bg-surface hover:border-border-mid'}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: BUCKET_COLORS[index] }} aria-hidden="true" />
            <span className={`text-[13px] font-semibold truncate ${isActive ? 'text-primary' : 'text-secondary'}`}>{bucket.label}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="font-mono text-[10px] text-tertiary tabular">{pct}%</span>
            <span className={`font-mono text-[13px] font-semibold tabular ${isActive ? 'text-accent' : 'text-secondary'}`}>{fmt(bucket.amount)}</span>
            <motion.svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}
              aria-hidden="true">
              <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={isActive ? 'text-accent' : 'text-tertiary'}/>
            </motion.svg>
          </div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 py-4 border border-t-0 border-accent/20 bg-accent-dim rounded-b-[3px]">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="font-mono text-[8px] font-semibold tracking-[0.2em] uppercase text-accent/70 mb-2">// INCLUDES</p>
                  <ul className="space-y-1">
                    {bucket.includes.map(item => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="text-accent/50 text-[10px] mt-[1px] flex-shrink-0">—</span>
                        <span className="text-[11px] text-secondary leading-[1.45]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[8px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-2">// RETURNS</p>
                  <p className="text-[11px] text-secondary leading-[1.5]">{bucket.returns}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function BudgetBreakdown() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string>(budgetBuckets[0].id)

  return (
    <section
      id="budget"
      className="snap-section snap-section-scroll border-t border-border bg-white"
      aria-labelledby="budget-headline"
    >
      <CornerMarks />
      <div className="section-container snap-section-inner min-h-full flex flex-col justify-center">
        <SectionReveal>
          <p className="font-mono text-[9px] text-tertiary tracking-[0.2em] uppercase mb-4">// INVESTMENT.BREAKDOWN</p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          {/* LEFT: chart */}
          <div className="flex flex-col items-center gap-4">
            <SectionReveal>
              <h2 id="budget-headline" className="text-display-md font-black text-primary tracking-editorial leading-editorial max-w-[22ch] mb-4">
                $60K focused on highest-leverage delivery.
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <DonutChart
                buckets={budgetBuckets}
                activeId={activeId}
                onSelect={setActiveId}
                reduced={reduced}
              />
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <p className="text-[11px] text-secondary leading-[1.5] text-center max-w-[28ch]">
                Milestone-billed. No large upfront payment required.
              </p>
            </SectionReveal>
          </div>

          {/* RIGHT: bucket rows */}
          <SectionReveal delay={0.2}>
            <div className="flex flex-col gap-2">
              {budgetBuckets.map((b, i) => (
                <BucketRow
                  key={b.id}
                  bucket={b}
                  index={i}
                  isActive={activeId === b.id}
                  onSelect={() => setActiveId(b.id)}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
