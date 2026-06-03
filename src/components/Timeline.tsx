import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { timelinePhases, approvalModel } from '../data/proposal'
import { SectionReveal } from './ui'

const TOTAL_WEEKS = 10

// Subtle per-phase accent tints — all cobalt family, different opacities
const BAR_STYLES = [
  'bg-accent',
  'bg-accent/80',
  'bg-accent/65',
  'bg-accent/50',
  'bg-accent/38',
  'bg-accent/28',
]

// ─── Gantt bar ────────────────────────────────────────────────────────────────

function GanttBar({
  phase,
  index,
  inView,
  isActive,
  onEnter,
  onLeave,
  reduced,
}: {
  phase: (typeof timelinePhases)[number]
  index: number
  inView: boolean
  isActive: boolean
  onEnter: () => void
  onLeave: () => void
  reduced: boolean | null
}) {
  const startPct = ((phase.weekStart - 1) / TOTAL_WEEKS) * 100
  const widthPct  = ((phase.weekEnd - phase.weekStart) / TOTAL_WEEKS) * 100

  return (
    <div
      className="relative h-9 flex items-center"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      role="listitem"
    >
      {/* Track */}
      <div className="absolute inset-y-0 left-0 right-0 rounded-[2px] bg-border/40" />

      {/* Filled bar */}
      <motion.div
        className={`absolute inset-y-0 rounded-[2px] ${BAR_STYLES[index]} transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-60'}`}
        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
        initial={reduced ? false : { scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={reduced ? undefined : {
          duration: 0.7,
          delay: 0.35 + index * 0.09,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Milestone dots */}
      {phase.milestones.map((m, mi) => {
        // Parse week number from milestone string (e.g. "Week 10")
        const match = m.match(/Week\s+(\d+)/)
        if (!match) return null
        const week = parseInt(match[1], 10)
        const dotPct = ((week - 0.5) / TOTAL_WEEKS) * 100
        return (
          <motion.div
            key={mi}
            className="absolute top-1/2 -translate-y-1/2 z-10"
            style={{ left: `${dotPct}%` }}
            initial={reduced ? false : { scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={reduced ? undefined : {
              duration: 0.3,
              delay: 0.75 + index * 0.09,
            }}
          >
            <div
              className="w-2 h-2 rounded-full bg-white/90 border border-accent/60 shadow-[0_0_6px_rgba(37,99,235,0.5)]"
              title={m}
              aria-label={`Milestone: ${m}`}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function Timeline() {
  const reduced = useReducedMotion()
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInView = useInView(chartRef, { once: true, margin: '-8%' })
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const weeks = Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1)

  const activePhase = activeIdx !== null ? timelinePhases[activeIdx] : null

  return (
    <section
      id="timeline"
      className="py-28 lg:py-36 border-t border-border bg-surface"
      aria-labelledby="timeline-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">Timeline</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="timeline-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[28ch] mb-6
            "
          >
            2.5 months. Parallel workstreams. Milestone approvals.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-14">
            Workstreams run in parallel from week two onward. No phase waits for another to finish — the system builds while earlier tracks are being approved.
          </p>
        </SectionReveal>

        {/* Gantt chart */}
        <SectionReveal delay={0.2}>
          <div ref={chartRef} className="mb-8">

            {/* Week header */}
            <div className="flex mb-3 pl-[140px] lg:pl-[200px]">
              {weeks.map(w => (
                <div
                  key={w}
                  className="flex-1 text-center text-[9px] font-mono text-tertiary"
                  aria-label={`Week ${w}`}
                >
                  {w}
                </div>
              ))}
            </div>

            {/* Phase rows */}
            <div className="space-y-2" role="list" aria-label="Project timeline phases">
              {timelinePhases.map((phase, i) => (
                <div
                  key={phase.phase}
                  className="flex items-center gap-3 lg:gap-5"
                >
                  {/* Phase label */}
                  <div
                    className="w-[140px] lg:w-[200px] flex-shrink-0 cursor-default"
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    <p className={`text-[9px] font-mono font-semibold tracking-[0.15em] uppercase transition-colors duration-200 ${activeIdx === i ? 'text-accent' : 'text-tertiary'}`}>
                      {phase.phase}
                    </p>
                    <p className={`text-[12px] font-semibold leading-snug transition-colors duration-200 ${activeIdx === i ? 'text-primary' : 'text-secondary'}`}>
                      {phase.label}
                    </p>
                  </div>

                  {/* Bar */}
                  <div className="flex-1">
                    <GanttBar
                      phase={phase}
                      index={i}
                      inView={chartInView}
                      isActive={activeIdx === i}
                      onEnter={() => setActiveIdx(i)}
                      onLeave={() => setActiveIdx(null)}
                      reduced={reduced}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Week grid lines — decorative */}
            <div className="relative mt-2 pl-[140px] lg:pl-[200px] h-3 pointer-events-none" aria-hidden="true">
              <div className="absolute inset-x-[140px] lg:inset-x-[200px] inset-y-0 flex">
                {weeks.map(w => (
                  <div key={w} className="flex-1 border-l border-border/40 first:border-l-0" />
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Hover detail panel */}
        <SectionReveal delay={0.1}>
          <div className="min-h-[112px] mb-10">
            {activePhase ? (
              <motion.div
                key={activePhase.phase}
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18 }}
                className="card-elevated p-5 flex items-start gap-8"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-accent mb-1">
                    {activePhase.phase} · {activePhase.duration}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
                    {activePhase.deliverables.map(d => (
                      <span key={d} className="text-[12px] text-secondary flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-border-light flex-shrink-0" aria-hidden="true" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                {activePhase.milestones.length > 0 && (
                  <div className="flex-shrink-0">
                    <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-1.5">
                      Milestones
                    </p>
                    {activePhase.milestones.map(m => (
                      <div key={m} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" aria-hidden="true" />
                        <span className="text-[11px] font-mono text-secondary">{m}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="border border-border rounded-[3px] p-5 flex items-center gap-3 opacity-30">
                <span className="text-[11px] font-mono text-tertiary">
                  Hover a phase to see deliverables and milestone markers.
                </span>
              </div>
            )}
          </div>
        </SectionReveal>

        {/* Legend + approval model */}
        <SectionReveal delay={0.12}>
          <div className="flex flex-wrap items-start gap-10">
            {/* Legend */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
                Legend
              </p>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-2.5 rounded-[2px] bg-accent/70" aria-hidden="true" />
                  <span className="text-[11px] text-tertiary">Workstream</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80 border border-accent/60 shadow-[0_0_5px_rgba(37,99,235,0.4)]" aria-hidden="true" />
                  <span className="text-[11px] text-tertiary">Milestone / approval</span>
                </div>
              </div>
            </div>

            {/* Approval model */}
            <div>
              <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
                Approval Model
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                <div>
                  <p className="text-[9px] text-tertiary uppercase tracking-wide mb-0.5">Day-to-day</p>
                  <p className="text-[12px] text-secondary">{approvalModel.dayToDay.join(' · ')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-tertiary uppercase tracking-wide mb-0.5">Final approval</p>
                  <p className="text-[12px] text-secondary">{approvalModel.founders.join(', ')}</p>
                </div>
                <div>
                  <p className="text-[9px] text-tertiary uppercase tracking-wide mb-0.5">Steering</p>
                  <p className="text-[12px] text-secondary">Milestone-based reviews</p>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
