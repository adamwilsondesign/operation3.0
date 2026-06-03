import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { totalBudget } from '../data/proposal'
import { SectionReveal } from './ui'

// ─── Constants ────────────────────────────────────────────────────────────────

const INVESTMENT = totalBudget // 60 000

const PRESETS = [
  {
    id: 'conservative',
    label: 'Conservative',
    revenue: 100000,
    margin: 60,
    note: '$100K at 60% margin',
  },
  {
    id: 'base',
    label: 'Base',
    revenue: 150000,
    margin: 40,
    note: '$150K at 40% margin',
  },
  {
    id: 'upside',
    label: 'Upside',
    revenue: 300000,
    margin: 40,
    note: '$300K enterprise AI engagement at 40% margin',
  },
] as const

const PAYBACK_TABLE = [
  { margin: 40, threshold: 150000 },
  { margin: 50, threshold: 120000 },
  { margin: 60, threshold: 100000 },
]

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)

const fmtMultiple = (n: number) => `${n.toFixed(1)}×`

// ─── Animated number ──────────────────────────────────────────────────────────

function AnimatedValue({
  value,
  format,
  className,
  reduced,
}: {
  value: number
  format: (n: number) => string
  className?: string
  reduced: boolean | null
}) {
  const [displayed, setDisplayed] = useState(value)
  const [prev, setPrev] = useState(value)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) { setDisplayed(value); setPrev(value); return }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    const from = displayed
    const to = value
    const start = performance.now()
    const duration = 380

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(from + (to - from) * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
      else setPrev(to)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced])

  const changed = value !== prev

  return (
    <motion.span
      key={String(Math.round(value))}
      animate={changed && !reduced ? { opacity: [0.6, 1] } : {}}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {format(displayed)}
    </motion.span>
  )
}

// ─── Slider input ─────────────────────────────────────────────────────────────

function SliderInput({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (n: number) => string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-tertiary leading-none">
          {label}
        </p>
        <span className="text-[13px] font-mono font-semibold text-primary tabular">
          {format(value)}
        </span>
      </div>
      <div className="relative h-[3px] rounded-full bg-border-mid">
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent/60 transition-none"
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  )
}

// ─── Output stat ──────────────────────────────────────────────────────────────

function OutputStat({
  label,
  value,
  format,
  accent,
  reduced,
}: {
  label: string
  value: number
  format: (n: number) => string
  accent?: boolean
  reduced: boolean | null
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary">
        {label}
      </p>
      <AnimatedValue
        value={value}
        format={format}
        className={`text-[22px] font-mono font-black tabular leading-none ${accent ? 'text-accent' : 'text-primary'}`}
        reduced={reduced}
      />
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function PaybackLogic() {
  const reduced = useReducedMotion()

  const [revenue,    setRevenue]    = useState(150000)
  const [margin,     setMargin]     = useState(40)
  const [hoursSaved, setHoursSaved] = useState(40)
  const [hourlyCost, setHourlyCost] = useState(100)
  const [activePreset, setActivePreset] = useState<string | null>('base')

  const contribution    = revenue * (margin / 100)
  const multiple        = contribution / INVESTMENT
  const paidBack        = contribution >= INVESTMENT
  const monthlySavings  = hoursSaved * hourlyCost

  const applyPreset = (id: (typeof PRESETS)[number]['id']) => {
    const p = PRESETS.find(x => x.id === id)
    if (!p) return
    setRevenue(p.revenue)
    setMargin(p.margin)
    setActivePreset(id)
  }

  const clearPreset = () => setActivePreset(null)

  return (
    <section
      id="payback"
      className="py-28 lg:py-36 border-t border-border bg-surface"
      aria-labelledby="payback-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">Payback Logic</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="payback-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[26ch] mb-6
            "
          >
            The payback bar is low. The upside compounds.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-4">
            At a $60K external investment, the project pays for itself if it helps Lazer win, protect, or expand one meaningful engagement.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.18}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-14">
            This does not need to transform the whole funnel to pay back. It only needs to improve one meaningful opportunity — then the system keeps compounding.
          </p>
        </SectionReveal>

        {/* Calculator card */}
        <SectionReveal delay={0.22}>
          <div className="card-elevated p-7 lg:p-10 mb-6">

            {/* Preset chips */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mr-1">
                Scenario
              </p>
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  aria-pressed={activePreset === p.id}
                  title={p.note}
                  className={`
                    px-3 py-1.5
                    text-[11px] font-semibold tracking-cap uppercase
                    rounded-[2px] border transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
                    ${activePreset === p.id
                      ? 'border-accent/40 text-accent bg-accent-dim'
                      : 'border-border-mid text-tertiary hover:border-border-light hover:text-secondary'
                    }
                  `}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* Left: inputs */}
              <div className="flex flex-col gap-7">
                <SliderInput
                  label="Incremental closed revenue"
                  value={revenue}
                  min={50000}
                  max={500000}
                  step={5000}
                  format={fmt}
                  onChange={v => { setRevenue(v); clearPreset() }}
                />
                <SliderInput
                  label="Contribution margin %"
                  value={margin}
                  min={20}
                  max={80}
                  step={5}
                  format={n => `${n}%`}
                  onChange={v => { setMargin(v); clearPreset() }}
                />
                <SliderInput
                  label="Hours saved per month"
                  value={hoursSaved}
                  min={4}
                  max={160}
                  step={4}
                  format={n => `${n} hrs`}
                  onChange={v => { setHoursSaved(v); clearPreset() }}
                />
                <SliderInput
                  label="Hourly blended cost"
                  value={hourlyCost}
                  min={50}
                  max={300}
                  step={10}
                  format={n => `$${n}`}
                  onChange={v => { setHourlyCost(v); clearPreset() }}
                />
              </div>

              {/* Right: outputs */}
              <div className="flex flex-col justify-between gap-8">

                {/* Output stats */}
                <div className="grid grid-cols-2 gap-6">
                  <OutputStat
                    label="Contribution generated"
                    value={contribution}
                    format={fmt}
                    reduced={reduced}
                  />
                  <OutputStat
                    label="Payback multiple"
                    value={multiple}
                    format={fmtMultiple}
                    accent
                    reduced={reduced}
                  />
                  <OutputStat
                    label="Monthly operational savings"
                    value={monthlySavings}
                    format={fmt}
                    reduced={reduced}
                  />
                  <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary">
                      Payback status
                    </p>
                    <AnimatePresence mode="wait">
                      {paidBack ? (
                        <motion.div
                          key="paid"
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-center gap-2"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span className="text-[15px] font-mono font-semibold text-accent leading-none">
                            Paid back.
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="not-paid"
                          initial={reduced ? false : { opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduced ? undefined : { opacity: 0, y: -4 }}
                          transition={{ duration: 0.22 }}
                        >
                          <span className="text-[15px] font-mono font-semibold text-tertiary leading-none">
                            Not paid back yet.
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Investment reference line */}
                <div className="border border-border-mid rounded-[3px] p-4 bg-surface">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary">
                      Investment
                    </p>
                    <p className="text-[13px] font-mono font-semibold text-secondary tabular">
                      {fmt(INVESTMENT)}
                    </p>
                  </div>
                  {/* Progress bar */}
                  <div className="h-[3px] rounded-full bg-border-mid overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      animate={{ width: `${Math.min((contribution / INVESTMENT) * 100, 100)}%` }}
                      transition={reduced ? { duration: 0 } : { duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-tertiary mt-2 tabular">
                    {fmt(contribution)} contribution vs {fmt(INVESTMENT)} invested
                  </p>
                </div>

              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Payback table */}
        <SectionReveal delay={0.1}>
          <div className="border border-border rounded-[3px] overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface-2">
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary">
                Payback Threshold Reference
              </p>
            </div>
            <table className="w-full" aria-label="Payback threshold by margin">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.18em] uppercase text-tertiary">
                    Contribution Margin
                  </th>
                  <th className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.18em] uppercase text-tertiary">
                    Revenue Required to Cover $60K
                  </th>
                  <th className="px-6 py-3 text-right text-[10px] font-semibold tracking-[0.18em] uppercase text-tertiary hidden sm:table-cell">
                    Contribution
                  </th>
                </tr>
              </thead>
              <tbody>
                {PAYBACK_TABLE.map((row, i) => {
                  const isCurrentMargin = margin === row.margin
                  return (
                    <tr
                      key={row.margin}
                      className={`
                        border-b border-border last:border-0 transition-colors duration-200
                        ${isCurrentMargin ? 'bg-accent-dim' : i % 2 === 0 ? 'bg-surface' : 'bg-surface-2'}
                      `}
                    >
                      <td className="px-6 py-4">
                        <span className={`text-[13px] font-mono font-semibold tabular ${isCurrentMargin ? 'text-accent' : 'text-secondary'}`}>
                          {row.margin}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[13px] font-mono tabular ${isCurrentMargin ? 'text-primary font-semibold' : 'text-secondary'}`}>
                          {fmt(row.threshold)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right hidden sm:table-cell">
                        <span className={`text-[11px] font-mono tabular text-tertiary`}>
                          {fmt(row.threshold * (row.margin / 100))}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
