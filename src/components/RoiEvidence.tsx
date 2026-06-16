import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { roiCards, type RoiCard } from '../data/proposal'
import { SectionReveal } from './ui'
import { useCountUp } from '../lib/useCountUp'
import { CornerMarks } from './CornerMarks'

const CARD_GAP = 12

const ROI_SCENARIOS = [
  {
    id: 'conservative',
    label: 'Conservative',
    summary: '1 new deal at $500K avg · 40% margin',
    year1: '$400K+',
    multiple: '5×',
    breakeven: '~5 mo',
  },
  {
    id: 'base',
    label: 'Base',
    summary: '2 new deals at $500K avg · 40% margin',
    year1: '$750K+',
    multiple: '9.4×',
    breakeven: '~3 mo',
  },
  {
    id: 'optimistic',
    label: 'Optimistic',
    summary: '3+ new deals including 1 enterprise AI engagement',
    year1: '$1.2M+',
    multiple: '15×',
    breakeven: '~2 mo',
  },
] as const

type RoiScenario = (typeof ROI_SCENARIOS)[number]

const SOURCE_COLORS: Record<string, { bg: string; text: string }> = {
  'McKinsey & Company': { bg: '#003366', text: '#FFFFFF' },
  'Gartner':            { bg: '#007932', text: '#FFFFFF' },
  '6sense':             { bg: '#6941C6', text: '#FFFFFF' },
  'Google / Vodafone':  { bg: '#EA4335', text: '#FFFFFF' },
  'Marq':               { bg: '#FF6B35', text: '#FFFFFF' },
  'Edelman × LinkedIn': { bg: '#0A66C2', text: '#FFFFFF' },
}

function SourceBadge({ source }: { source: string }) {
  const style = SOURCE_COLORS[source]
  if (!style) return null
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[9px] font-semibold tracking-wide leading-none"
      style={{ background: style.bg, color: style.text }}
    >
      {source}
    </span>
  )
}

// ─── Evidence Card — fixed height, no "why it matters" ───────────────────────

function EvidenceCard({ card, reduced }: { card: RoiCard; reduced: boolean | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })
  const animated = card.countTo !== undefined
  const displayVal = useCountUp(card.countTo ?? 0, card.decimals ?? 0, isInView, reduced)
  const domainLabels = card.urls.map(url => {
    try { return new URL(url).hostname.replace('www.', '') } catch { return url }
  })

  return (
    <article
      ref={ref}
      className="flex-none flex flex-col p-4 snap-start rounded-[4px] border border-border/60"
      style={{
        width: 'min(340px, 80vw)',
        height: '200px',
        background: '#ffffff',
        boxShadow: '0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)',
      }}
      aria-label={`Evidence: ${card.source}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-shrink-0">
        <SourceBadge source={card.source} />
        <span className="text-[9px] font-semibold tracking-[0.15em] uppercase border border-border-mid text-tertiary px-2 py-0.5 rounded-[2px] leading-none">
          {card.workstream}
        </span>
      </div>

      {/* Stat + metric */}
      <div className="grid grid-cols-[auto_1fr] gap-3 items-start flex-1 min-h-0">
        <div className="flex items-baseline gap-0 font-mono font-black leading-none text-primary flex-shrink-0">
          {card.prefix && <span className="text-accent/70 text-[1.1rem]">{card.prefix}</span>}
          <motion.span
            className="tabular text-[2rem]"
            initial={reduced ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {animated ? displayVal : card.stat}
          </motion.span>
          {card.suffix && animated && (
            <span className="text-accent/70 text-[1.1rem]">{card.suffix}</span>
          )}
        </div>
        <p className="text-[11.5px] text-secondary leading-[1.45] pt-0.5 line-clamp-4">{card.metric}</p>
      </div>

      {/* Source row */}
      <div className="flex items-center gap-2 flex-wrap flex-shrink-0 pt-2 border-t border-border mt-auto">
        {card.urls.map((url, i) => (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[10px] font-mono text-tertiary hover:text-accent transition-colors duration-200"
            aria-label={`Source: ${domainLabels[i]}`}>
            {domainLabels[i]}<span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </article>
  )
}

// ─── ROI projection panel — simplified ───────────────────────────────────────

function RoiProjectionPanel({ reduced }: { reduced: boolean | null }) {
  const [activeId, setActiveId] = useState<string>('base')
  const scenario: RoiScenario = ROI_SCENARIOS.find(s => s.id === activeId) ?? ROI_SCENARIOS[1]

  return (
    <div className="mx-6 lg:mx-8 mb-4 bg-primary rounded-[4px] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-white/10">
        <p className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase flex-1">
          // ROI.PROJECTION · $80K INVESTED · YEAR 1 ESTIMATE
        </p>
        {/* Scenario toggle */}
        <div
          className="inline-flex items-center p-0.5 rounded-[3px] bg-white/[0.06] border border-white/10 self-start"
          role="tablist"
          aria-label="ROI scenario"
        >
          {ROI_SCENARIOS.map(s => {
            const isActive = s.id === activeId
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(s.id)}
                className={[
                  'relative px-3 py-1 font-mono text-[11px] font-semibold tracking-[0.06em] uppercase rounded-[2px] transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="roi-toggle-pill"
                    className="absolute inset-0 rounded-[2px] bg-accent"
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Single row of 4 stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
        {[
          { label: 'Year 1 Return', value: scenario.year1, accent: true },
          { label: 'Return Multiple', value: scenario.multiple, accent: true },
          { label: 'Break-even', value: scenario.breakeven, accent: false },
          { label: 'Avg Deal Value', value: '$500K', accent: false },
        ].map(({ label, value, accent }) => (
          <div key={label} className="bg-primary px-5 py-4">
            <p className="font-mono text-[8px] text-white/35 uppercase tracking-wider mb-1.5">{label}</p>
            <motion.p
              key={value}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`font-mono text-[24px] font-black leading-none tabular ${accent ? 'text-accent' : 'text-white'}`}
            >
              {value}
            </motion.p>
          </div>
        ))}
      </div>

      {/* Assumption line */}
      <div className="px-5 py-2 border-t border-white/10">
        <motion.p
          key={scenario.id}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="font-mono text-[9px] text-white/30"
        >
          {scenario.summary}
        </motion.p>
      </div>
    </div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function RoiEvidence() {
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  const getCardWidth = useCallback(() => {
    const el = scrollRef.current
    if (!el?.firstElementChild) return 352
    return (el.firstElementChild as HTMLElement).offsetWidth
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (getCardWidth() + CARD_GAP))
    setActiveIdx(Math.min(idx, roiCards.length - 1))
  }, [getCardWidth])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToIndex = useCallback((idx: number) => {
    const el = scrollRef.current
    if (!el) return
    const clamped = Math.max(0, Math.min(idx, roiCards.length - 1))
    el.scrollTo({ left: clamped * (getCardWidth() + CARD_GAP), behavior: reduced ? 'instant' : 'smooth' })
    setActiveIdx(clamped)
  }, [getCardWidth, reduced])

  const prev = useCallback(() => scrollToIndex(activeIdx - 1), [activeIdx, scrollToIndex])
  const next = useCallback(() => scrollToIndex(activeIdx + 1), [activeIdx, scrollToIndex])

  return (
    <section
      id="roi"
      className="snap-section snap-section-scroll flex flex-col justify-center bg-surface border-t border-border"
      aria-labelledby="roi-headline"
    >
      <CornerMarks />

      {/* Header — compact */}
      <div className="section-container mb-3">
        <SectionReveal>
          <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">// ROI.EVIDENCE · EXTERNAL_RESEARCH</p>
          <p className="eyebrow mb-2">The Business Case</p>
        </SectionReveal>
        <SectionReveal delay={0.06}>
          <h2
            id="roi-headline"
            className="text-display-md font-black text-primary tracking-editorial leading-editorial max-w-[26ch] mb-2"
          >
            The return is not theoretical.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <p className="text-[14px] text-secondary leading-[1.55] max-w-[52ch]">
            Seven external evidence points, each tied to a project workstream.
          </p>
        </SectionReveal>
      </div>

      {/* ROI projection */}
      <SectionReveal delay={0.14}>
        <RoiProjectionPanel reduced={reduced} />
      </SectionReveal>

      {/* Card rail */}
      <SectionReveal delay={0.18} className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar px-6 lg:px-8 pb-1"
          style={{ gap: `${CARD_GAP}px`, scrollPaddingLeft: '1.5rem', overscrollBehaviorX: 'contain' }}
          role="list"
          aria-label="ROI evidence cards"
        >
          {roiCards.map(card => (
            <div key={card.id} role="listitem" className="flex">
              <EvidenceCard card={card} reduced={reduced} />
            </div>
          ))}
          <div className="flex-none w-4 lg:w-6" aria-hidden="true" />
        </div>

        {/* Nav row */}
        <div className="section-container mt-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Card position">
            {roiCards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                onClick={() => scrollToIndex(i)}
                className="transition-all duration-200 rounded-full flex-shrink-0"
                style={{
                  width: i === activeIdx ? '18px' : '5px',
                  height: '5px',
                  background: i === activeIdx ? '#FF00C5' : '#C8C8C8',
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={prev} disabled={activeIdx === 0}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary text-sm hover:border-border-light hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous card">←</button>
            <button type="button" onClick={next} disabled={activeIdx === roiCards.length - 1}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-secondary text-sm hover:border-border-light hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next card">→</button>
            <span className="text-[10px] font-mono text-tertiary tabular">
              {String(activeIdx + 1).padStart(2, '0')} / {String(roiCards.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </SectionReveal>

    </section>
  )
}
