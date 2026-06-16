import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { totalBudget } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

const INVESTMENT = totalBudget

const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

const fmtShort = (n: number) => {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000)    return `$${Math.round(n / 1000)}K`
  return fmt(n)
}

const SCENARIOS = [
  {
    id: 'conservative',
    label: 'Conservative',
    assumptions: [
      '1 new deal/year from improved inbound',
      '$500K avg deal × 40% margin = $200K contribution',
      '5% contract value extension on renewals',
      '20 hrs/mo saved on proposal production',
    ],
    breakEvenMonth: 5,
    year1Return: 400000,
    multiple: 5.0,
    milestones: [
      { month: 2,  label: 'Website live',    value: 0,      above: true  },
      { month: 3,  label: 'Deck builder',    value: 0,      above: false },
      { month: 5,  label: 'Break-even',      value: 80000,  above: true  },
      { month: 8,  label: 'First deal',      value: 200000, above: false },
      { month: 12, label: 'Year 1 return',   value: 400000, above: true  },
    ],
  },
  {
    id: 'base',
    label: 'Base',
    assumptions: [
      '2 new deals/year from improved inbound & conversion',
      '$500K avg deal × 40% margin = $400K total contribution',
      '10% contract value extension on existing accounts',
      '40 hrs/mo saved on proposal production',
    ],
    breakEvenMonth: 3,
    year1Return: 750000,
    multiple: 9.4,
    milestones: [
      { month: 2,  label: 'Website live',    value: 0,      above: true  },
      { month: 3,  label: 'Break-even',      value: 80000,  above: false },
      { month: 6,  label: 'First deal',      value: 200000, above: true  },
      { month: 9,  label: 'Second deal',     value: 400000, above: false },
      { month: 12, label: 'Year 1 return',   value: 750000, above: true  },
    ],
  },
  {
    id: 'upside',
    label: 'Upside',
    assumptions: [
      '3+ new deals/year including 1 enterprise AI engagement',
      '$500K avg × 40% margin + $300K enterprise = $600K+ contribution',
      '15% contract value extension on existing accounts',
      '1 enterprise AI engagement catalysed by brand credibility',
    ],
    breakEvenMonth: 2,
    year1Return: 1200000,
    multiple: 15.0,
    milestones: [
      { month: 2,  label: 'Break-even',      value: 80000,  above: true  },
      { month: 4,  label: 'First deal',      value: 200000, above: false },
      { month: 7,  label: 'Second deal',     value: 400000, above: true  },
      { month: 9,  label: 'Enterprise deal', value: 700000, above: false },
      { month: 12, label: 'Year 1 return',   value: 1200000,above: true  },
    ],
  },
] as const

const MONTHS = 12

export default function PaybackLogic() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string>('base')
  const scenario = SCENARIOS.find(s => s.id === activeId) ?? SCENARIOS[1]

  const beamPct = (scenario.breakEvenMonth / MONTHS) * 100

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
          <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">
            // ROI.CALC · PAYBACK_TIMELINE · INVESTMENT={fmtShort(INVESTMENT)}
          </p>
          <p className="eyebrow mb-3">Payback Logic</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="payback-headline"
            className="text-display-md font-black text-primary tracking-editorial leading-editorial max-w-[26ch] mb-4"
          >
            The payback bar is low. The upside compounds.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-6">
            At {fmtShort(INVESTMENT)}, a single meaningful deal covers the investment. Select a scenario to see the timeline.
          </p>
        </SectionReveal>

        {/* Scenario chips */}
        <SectionReveal delay={0.18}>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-tertiary mr-2">Scenario</p>
            {SCENARIOS.map(s => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                aria-pressed={activeId === s.id}
                className={[
                  'px-3 py-1.5 font-mono text-[11px] font-semibold tracking-[0.08em] uppercase rounded-[2px] border transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
                  activeId === s.id
                    ? 'border-accent/40 text-accent bg-accent-dim'
                    : 'border-border-mid text-tertiary hover:border-border-light hover:text-secondary',
                ].join(' ')}
              >
                {s.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Main card */}
        <SectionReveal delay={0.22}>
          <div className="card-elevated p-6 lg:p-8 mb-6">

            {/* Assumptions */}
            <div className="mb-8">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-accent-2/60 mb-3">// ASSUMPTIONS</p>
              <div className="flex flex-wrap gap-x-8 gap-y-1.5">
                {scenario.assumptions.map(a => (
                  <div key={a} className="flex items-start gap-2">
                    <span className="font-mono text-[10px] text-accent-2/50 mt-[1px]">—</span>
                    <span className="text-[12px] text-secondary">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline visual */}
            <div className="mb-8">
              <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-tertiary mb-6">// MONTH_BY_MONTH · CUMULATIVE_CONTRIBUTION</p>

              {/* Milestone labels above */}
              <div className="relative h-8 mb-1">
                {scenario.milestones.filter(m => m.above).map(m => (
                  <div
                    key={m.label}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${((m.month - 0.5) / MONTHS) * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    <span className="font-mono text-[8px] text-accent whitespace-nowrap">{m.label}</span>
                    {m.value > 0 && (
                      <span className="font-mono text-[8px] text-accent/60">{fmtShort(m.value)}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Track */}
              <div className="relative h-8 rounded-[2px] overflow-hidden bg-border/40">
                {/* Break-even fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent/30 rounded-[2px]"
                  animate={{ width: `${beamPct}%` }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
                {/* Post-break-even fill */}
                <motion.div
                  className="absolute inset-y-0 bg-accent rounded-r-[2px]"
                  animate={{ left: `${beamPct}%`, width: `${100 - beamPct}%` }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
                {/* Break-even marker line */}
                <motion.div
                  className="absolute inset-y-0 w-[2px] bg-white z-10"
                  animate={{ left: `${beamPct}%` }}
                  transition={reduced ? { duration: 0 } : { duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
                {/* Month tick marks */}
                {Array.from({ length: MONTHS }, (_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 bottom-0 w-[1px] bg-white/20"
                    style={{ left: `${((i + 1) / MONTHS) * 100}%` }}
                  />
                ))}
              </div>

              {/* Month labels */}
              <div className="flex mt-1.5">
                {Array.from({ length: MONTHS }, (_, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span className="font-mono text-[8px] text-tertiary">{i + 1}</span>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[8px] text-tertiary/60 mt-0.5 text-center tracking-wider">MONTH</p>

              {/* Milestone labels below */}
              <div className="relative h-8 mt-1">
                {scenario.milestones.filter(m => !m.above).map(m => (
                  <div
                    key={m.label}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${((m.month - 0.5) / MONTHS) * 100}%`, transform: 'translateX(-50%)' }}
                  >
                    {m.value > 0 && (
                      <span className="font-mono text-[8px] text-secondary/70">{fmtShort(m.value)}</span>
                    )}
                    <span className="font-mono text-[8px] text-secondary/70 whitespace-nowrap">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-border">
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-tertiary mb-1.5">Investment</p>
                <p className="font-mono text-[20px] font-black text-primary tabular leading-none">{fmtShort(INVESTMENT)}</p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-tertiary mb-1.5">Break-even</p>
                <p className="font-mono text-[20px] font-black text-primary tabular leading-none">
                  Month {scenario.breakEvenMonth}
                </p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-tertiary mb-1.5">Year 1 Return</p>
                <p className="font-mono text-[20px] font-black text-accent tabular leading-none">
                  {fmtShort(scenario.year1Return)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] uppercase text-tertiary mb-1.5">Multiple</p>
                <p className="font-mono text-[20px] font-black text-accent tabular leading-none">
                  {scenario.multiple.toFixed(1)}×
                </p>
              </div>
            </div>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
