import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { systemNodes } from '../data/proposal'
import { CornerMarks } from './CornerMarks'
import { SectionReveal } from './ui'

function NodeCard({
  node,
  isActive,
  onClick,
  reduced,
}: {
  node: typeof systemNodes[number]
  isActive: boolean
  onClick: () => void
  reduced: boolean | null
}) {
  return (
    <motion.article
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      whileHover={reduced ? undefined : { y: -1 }}
      transition={{ duration: 0.15 }}
      className={[
        'relative cursor-pointer select-none flex flex-col h-full',
        'rounded-[3px] border transition-all duration-250',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1',
        isActive
          ? 'border-accent/50 bg-accent-dim shadow-[0_0_0_1px_rgba(255,0,197,0.12),0_6px_28px_rgba(255,0,197,0.12)]'
          : 'border-border-mid bg-white hover:border-accent/30 hover:shadow-card-hover hover:bg-surface',
      ].join(' ')}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Number + chevron row */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/60">
            {node.number}
          </span>
          <motion.svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: reduced ? 0 : 0.18 }}
            aria-hidden="true"
          >
            <path d="M2 4.5l4 3 4-3" stroke={isActive ? '#FF00C5' : '#AAAAAA'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </div>

        {/* Title */}
        <h3 className={[
          'text-[13px] font-bold leading-snug tracking-tight mb-2 transition-colors duration-200',
          isActive ? 'text-accent' : 'text-primary',
        ].join(' ')}>
          {node.title}
        </h3>

        {/* Description — always visible */}
        <p className="text-[11px] text-secondary leading-[1.5] mb-3">
          {node.description}
        </p>

        {/* Expanded detail — inline, no height animation */}
        {isActive && (
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex-1 pt-3 border-t border-accent/15"
          >
            <p className="font-mono text-[8px] font-semibold tracking-[0.2em] uppercase text-accent/60 mb-1.5">
              Key deliverables
            </p>
            <ul className="space-y-1">
              {node.includes.slice(0, 3).map(item => (
                <li key={item} className="flex items-start gap-1.5">
                  <span className="text-accent/50 text-[9px] mt-[2px] flex-shrink-0">—</span>
                  <span className="text-[10px] text-secondary leading-[1.4]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.article>
  )
}

export default function WhatWeAreBuilding() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const toggle = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <section
      id="scope"
      className="snap-section flex flex-col justify-center border-t border-border bg-surface"
      aria-labelledby="scope-headline"
    >
      <CornerMarks />
      <div className="section-container py-8 flex flex-col" style={{ maxHeight: '100dvh' }}>

        {/* Header */}
        <div className="mb-5">
          <SectionReveal>
            <p className="font-mono text-[9px] text-tertiary tracking-[0.2em] uppercase mb-2">// SYSTEM.OVERVIEW — 07 WORKSTREAMS</p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <p className="eyebrow mb-2">The System</p>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 id="scope-headline" className="text-display-md font-black text-primary tracking-editorial leading-editorial max-w-[36ch]">
              One system. Every buyer touchpoint.
            </h2>
          </SectionReveal>
        </div>

        {/* 4-column grid */}
        <SectionReveal delay={0.15} className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 h-full">
            {systemNodes.map(node => (
              <NodeCard
                key={node.id}
                node={node}
                isActive={activeId === node.id}
                onClick={() => toggle(node.id)}
                reduced={reduced}
              />
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <p className="font-mono text-[9px] text-tertiary tracking-[0.15em] mt-4">
            SELECT WORKSTREAM → EXPAND DELIVERABLES
          </p>
        </SectionReveal>
      </div>
    </section>
  )
}
