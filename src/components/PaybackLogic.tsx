import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { totalBudget } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

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
      <div className="relative flex items-center h-[18px]">
        {/* Track background */}
        <div className="absolute left-0 right-0 h-[3px] rounded-full bg-border-mid" aria-hidden="true">
          {/* Fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent/70 transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          aria-label={label}
          className="relative w-full"
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
      className="snap-section snap-section-scroll border-t border-border bg-surface"
      aria-labelledby="payback-headline"
    >
      <CornerMarks />
      <div className="section-container snap-section-inner">

        {/* Header */}
        <SectionReveal>
          <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">// ROI.CALC · INTERACTIVE_MODEL · INVESTMENT={new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(INVESTMENT)}</p>
          <p className="eyebrow mb-3">Payback Logic</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="payback-headline"
            className="
              text-display-md font-black text-primary
              tracking-editorial leading-editorial
              max-w-[26ch] mb-4
            "
          >
            The payback bar is low. The upside compounds.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-6">
            At $60K, this project pays back from a single meaningful engagement. The math is simple — adjust the sliders.
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

                {/* Payback reference */}
                <div className="flex items-center gap-4 flex-wrap border border-border rounded-[3px] p-3 bg-surface mb-4">
                  <p className="font-mono text-[8px] text-tertiary tracking-[0.2em] uppercase mr-2">// PAYBACK_REF</p>
                  {PAYBACK_TABLE.map(row => (
                    <div key={row.margin} className={`flex items-center gap-1.5 px-2 py-1 rounded-[2px] transition-colors duration-200 ${margin === row.margin ? 'bg-accent-dim' : ''}`}>
                      <span className={`font-mono text-[11px] font-semibold tabular ${margin === row.margin ? 'text-accent' : 'text-tertiary'}`}>{row.margin}%</span>
                      <span className="text-tertiary text-[9px]">→</span>
                      <span className={`font-mono text-[11px] tabular ${margin === row.margin ? 'text-primary font-semibold' : 'text-secondary'}`}>{fmt(row.threshold)}</span>
                    </div>
                  ))}
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


      </div>
    </section>
  )
}
