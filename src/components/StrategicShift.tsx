import { useRef } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import {
  marketShift,
  marketEvidence,
  type MarketEvidence,
} from '../data/proposal'
import { SectionReveal, StaggerReveal, RevealItem } from './ui'
import { useCountUp } from '../lib/useCountUp'

// ─── Evidence card ────────────────────────────────────────────────────────────

function EvidenceCard({
  card,
  reduced,
}: {
  card: MarketEvidence
  reduced: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const display = useCountUp(card.countTo, card.decimals, isInView, reduced)

  // Parse domain for a clean URL label
  let domain = card.url
  try { domain = new URL(card.url).hostname.replace('www.', '') } catch {}

  return (
    <article
      ref={ref}
      className="card-elevated p-7 lg:p-8 flex flex-col gap-5 h-full group"
    >
      {/* Source */}
      <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-tertiary">
        {card.source}
      </p>

      {/* Big animated stat */}
      <div className="flex items-baseline gap-0 font-mono font-black text-primary leading-none select-none">
        {card.prefix && (
          <span className="text-[2rem] lg:text-[2.5rem] text-accent/80">{card.prefix}</span>
        )}
        <span
          className="tabular"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)' }}
        >
          {display}
        </span>
        <span className="text-[2rem] lg:text-[2.5rem] text-accent/80">{card.suffix}</span>
      </div>

      {/* Description */}
      <p className="text-[13px] text-secondary leading-[1.65] flex-1">
        {card.description}
      </p>

      {/* Source link */}
      <a
        href={card.url}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-1.5
          text-[10px] font-mono text-tertiary
          hover:text-accent transition-colors duration-250
          mt-auto
        "
        aria-label={`Source: ${card.source}`}
      >
        {domain}
        <span aria-hidden="true">↗</span>
      </a>
    </article>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function StrategicShift() {
  const reduced = useReducedMotion()

  return (
    <section
      id="market"
      className="py-28 lg:py-36 border-t border-border bg-surface"
      aria-labelledby="market-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">The Opportunity</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="market-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[22ch] mb-8
            "
          >
            {marketShift.headline}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="text-[16px] text-secondary leading-[1.65] max-w-[58ch] mb-14">
            {marketShift.narrative}
          </p>
        </SectionReveal>

        {/* Positioning statement — editorial pull-quote */}
        <SectionReveal delay={0.22}>
          <div className="border-l-2 border-accent pl-8 py-1 mb-12">
            <p className="text-[21px] font-light text-primary leading-[1.5] max-w-[44ch] tracking-tight">
              {marketShift.positioning}
            </p>
          </div>
        </SectionReveal>

        {/* Strategic focus pills */}
        <SectionReveal delay={0.28}>
          <div className="mb-16">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
              Strategic Focus
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {marketShift.focus.map(f => (
                <span
                  key={f}
                  className="
                    px-3 py-1.5
                    text-[11px] font-semibold tracking-cap uppercase
                    border border-accent/40 text-accent
                    rounded-[2px]
                  "
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-tertiary leading-relaxed max-w-lg">
              {marketShift.focusNote}
            </p>
          </div>
        </SectionReveal>

        {/* Evidence cards header */}
        <SectionReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-tertiary">
              Market Evidence
            </p>
            <div className="flex-1 h-[1px] bg-border max-w-[120px]" aria-hidden="true" />
          </div>
        </SectionReveal>

        {/* Evidence cards — stagger on scroll */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketEvidence.map(card => (
            <RevealItem key={card.source}>
              <EvidenceCard card={card} reduced={reduced} />
            </RevealItem>
          ))}
        </StaggerReveal>

      </div>
    </section>
  )
}
