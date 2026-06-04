import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { roiCards, type RoiCard } from '../data/proposal'
import { SectionReveal } from './ui'
import { useCountUp } from '../lib/useCountUp'
import { CornerMarks } from './CornerMarks'

const CARD_GAP = 16 // px — matches gap-4

const SOURCE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'McKinsey & Company': { bg: '#003366', text: '#FFFFFF', border: '#003366' },
  'Gartner':            { bg: '#007932', text: '#FFFFFF', border: '#007932' },
  '6sense':             { bg: '#6941C6', text: '#FFFFFF', border: '#6941C6' },
  'Google / Vodafone':  { bg: '#EA4335', text: '#FFFFFF', border: '#EA4335' },
  'Marq':               { bg: '#FF6B35', text: '#FFFFFF', border: '#FF6B35' },
  'Edelman × LinkedIn': { bg: '#0A66C2', text: '#FFFFFF', border: '#0A66C2' },
}

function SourceBadge({ source }: { source: string }) {
  const style = SOURCE_COLORS[source]
  if (!style) return null
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-[2px] text-[9px] font-semibold tracking-wide"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {source}
    </span>
  )
}

interface Props {
  onRefClick: (id: number) => void
}

// ─── Evidence Card ────────────────────────────────────────────────────────────

function EvidenceCard({
  card,
  onRefClick,
  reduced,
}: {
  card: RoiCard
  onRefClick: (id: number) => void
  reduced: boolean | null
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  const animated = card.countTo !== undefined
  const displayVal = useCountUp(
    card.countTo ?? 0,
    card.decimals ?? 0,
    isInView,
    reduced,
  )

  // Derive clean domain labels
  const domainLabels = card.urls.map(url => {
    try { return new URL(url).hostname.replace('www.', '') } catch { return url }
  })

  return (
    <article
      ref={ref}
      className="flex-none flex flex-col p-5 snap-start rounded-[4px] border border-border/60 h-auto"
      style={{
        width: 'min(380px, 82vw)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f9f9f9 100%)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
      }}
      aria-label={`Evidence: ${card.source}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <SourceBadge source={card.source} />
        <span className="text-[9px] font-semibold tracking-[0.18em] uppercase border border-border-mid text-tertiary px-2 py-0.5 rounded-[2px] leading-none">
          {card.workstream}
        </span>
      </div>

      {/* Stat + metric — 2 col */}
      <div className="grid grid-cols-[auto_1fr] gap-4 items-start mb-4">
        <div className="flex items-baseline gap-0 font-mono font-black leading-none text-primary" aria-label={`Key metric: ${card.stat}`}>
          {card.prefix && <span className="text-accent/70" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>{card.prefix}</span>}
          <motion.span
            className="tabular"
            style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)' }}
            initial={reduced ? false : { opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {animated ? displayVal : card.stat}
          </motion.span>
          {card.suffix && animated && (
            <span className="text-accent/70" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)' }}>{card.suffix}</span>
          )}
        </div>
        <p className="text-[12px] text-secondary leading-[1.5] pt-0.5">{card.metric}</p>
      </div>

      {/* Divider + Why */}
      <div className="h-[1px] bg-border mb-3" aria-hidden="true" />
      <div className="mb-4 flex-1">
        <p className="font-mono text-[8px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-1.5">// WHY_IT_MATTERS</p>
        <p className="text-[12px] text-secondary leading-[1.5]">{card.why}</p>
      </div>

      {/* Source row */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-border">
        <div className="flex items-center gap-2 flex-wrap">
          {card.urls.map((url, i) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-tertiary hover:text-accent transition-colors duration-250"
              aria-label={`Source: ${domainLabels[i]}`}>
              {domainLabels[i]}<span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {card.refIds.map(id => (
            <button key={id} type="button" onClick={() => onRefClick(id)}
              className="text-[10px] font-mono text-tertiary hover:text-accent transition-colors duration-250"
              aria-label={`View reference ${id}`}>
              [{id}]
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function RoiEvidence({ onRefClick }: Props) {
  const reduced = useReducedMotion()
  const scrollRef   = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // Track active card via scroll position
  const getCardWidth = useCallback(() => {
    const el = scrollRef.current
    if (!el?.firstElementChild) return 400
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
    el.scrollTo({
      left: clamped * (getCardWidth() + CARD_GAP),
      behavior: reduced ? 'instant' : 'smooth',
    })
    setActiveIdx(clamped)
  }, [getCardWidth, reduced])

  const prev = useCallback(() => scrollToIndex(activeIdx - 1), [activeIdx, scrollToIndex])
  const next = useCallback(() => scrollToIndex(activeIdx + 1), [activeIdx, scrollToIndex])

  return (
    <section
      id="roi"
      className="snap-section flex flex-col justify-center bg-surface border-t border-border"
      aria-labelledby="roi-headline"
    >
      <CornerMarks />
      {/* ── Section header ── */}
      <div className="section-container mb-5" style={{ paddingTop: 'calc(var(--nav-h) + 1rem)' }}>

        <SectionReveal>
          <p className="eyebrow mb-5">The Business Case</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="roi-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[22ch] mb-6
            "
          >
            The return is not theoretical.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch]">
            Seven evidence points — each tied directly to a project workstream.
          </p>
        </SectionReveal>
      </div>

      {/* ── Card rail ── */}
      <SectionReveal delay={0.2} className="relative">

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="
            flex gap-4
            overflow-x-auto
            snap-x snap-mandatory
            no-scrollbar
            px-6 lg:px-8
            pb-2
          "
          style={{ scrollPaddingLeft: '1.5rem', overscrollBehaviorX: 'contain' }}
          role="list"
          aria-label="ROI evidence cards"
        >
          {roiCards.map(card => (
            <div key={card.id} role="listitem" className="flex">
              <EvidenceCard
                card={card}
                onRefClick={onRefClick}
                reduced={reduced}
              />
            </div>
          ))}

          {/* Right-edge padding ghost */}
          <div className="flex-none w-4 lg:w-6 h-full" aria-hidden="true" />
        </div>

        {/* ── Navigation row ── */}
        <div className="section-container mt-6 flex items-center justify-between gap-6">

          {/* Dot indicators */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Card position indicators"
          >
            {roiCards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to card ${i + 1}: ${card.source}`}
                onClick={() => scrollToIndex(i)}
                className="transition-all duration-250 rounded-full"
                style={{
                  width:   i === activeIdx ? '20px' : '6px',
                  height:  '6px',
                  background: i === activeIdx
                    ? '#FF00C5'
                    : 'rgba(200,200,200,1)',
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={activeIdx === 0}
              className="
                w-9 h-9 rounded-full
                border border-border flex items-center justify-center
                text-secondary text-sm
                hover:border-border-light hover:text-primary
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-250
              "
              aria-label="Previous card"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              disabled={activeIdx === roiCards.length - 1}
              className="
                w-9 h-9 rounded-full
                border border-border flex items-center justify-center
                text-secondary text-sm
                hover:border-border-light hover:text-primary
                disabled:opacity-30 disabled:cursor-not-allowed
                transition-all duration-250
              "
              aria-label="Next card"
            >
              →
            </button>

            {/* Card counter */}
            <span className="text-[11px] font-mono text-tertiary ml-1 tabular">
              {String(activeIdx + 1).padStart(2, '0')} / {String(roiCards.length).padStart(2, '0')}
            </span>
          </div>

        </div>
      </SectionReveal>

    </section>
  )
}
