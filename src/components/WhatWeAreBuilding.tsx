import { useState, useId } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { systemNodes, type SystemNode } from '../data/proposal'
import { CornerMarks } from './CornerMarks'

// ─── Node card (desktop grid + mobile stack) ──────────────────────────────────

function NodeCard({
  node,
  isActive,
  onClick,
  reduced,
}: {
  node: SystemNode
  isActive: boolean
  onClick: () => void
  reduced: boolean | null
}) {
  const detailId = useId()

  return (
    <motion.article
      layout={!reduced}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-controls={detailId}
      className={`
        relative cursor-pointer select-none
        rounded-[3px] border transition-all duration-300
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-1 focus-visible:ring-offset-bg
        ${isActive
          ? 'border-accent/40 bg-accent-dim shadow-[0_0_0_1px_rgba(255,0,197,0.15),0_4px_32px_rgba(255,0,197,0.10)]'
          : 'border-border-mid bg-surface-2 hover:border-border-light hover:bg-surface-3 hover:shadow-card-hover'
        }
      `}
    >
      {/* Header row — always visible */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          {/* Number */}
          <div className="flex items-center gap-3">
            <span className="
              text-[9px] font-mono font-semibold tracking-[0.22em] uppercase
              text-accent/70
            ">
              {node.number}
            </span>
          </div>

          {/* Expand indicator */}
          <motion.svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path d="M3 5l4 4 4-4" stroke={isActive ? '#FF00C5' : '#999'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </motion.svg>
        </div>

        <h3 className="
          text-[13px] font-bold text-primary leading-snug tracking-tight mb-2
        ">
          {node.title}
        </h3>
        <p className="text-[11.5px] text-secondary leading-[1.6]">
          {node.description}
        </p>
      </div>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            id={detailId}
            key="detail"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="h-[1px] bg-accent/15 mb-4" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Includes */}
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/70 mb-2">
                    Includes
                  </p>
                  <ul className="space-y-1.5" aria-label={`${node.title} includes`}>
                    {node.includes.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent/50 leading-none mt-[3px] flex-shrink-0" aria-hidden="true">—</span>
                        <span className="text-[11px] text-secondary leading-[1.55]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Returns */}
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-2">
                    Returns
                  </p>
                  <ul className="space-y-1.5" aria-label={`${node.title} returns`}>
                    {node.returns.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent leading-none mt-[3px] flex-shrink-0 text-[10px]" aria-hidden="true">↑</span>
                        <span className="text-[11px] text-secondary leading-[1.55]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function WhatWeAreBuilding() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const toggle = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <section
      id="scope"
      className="snap-section snap-section-scroll border-t border-border bg-surface"
      aria-labelledby="scope-headline"
    >
      <CornerMarks />
      <div className="section-container py-8 min-h-full flex flex-col">
        {/* compact header */}
        <div className="mb-6">
          <p className="font-mono text-[9px] text-tertiary tracking-[0.2em] uppercase mb-3">// SYSTEM.OVERVIEW — 07 WORKSTREAMS</p>
          <p className="eyebrow mb-3">The System</p>
          <h2 id="scope-headline" className="text-display-lg font-black text-primary tracking-editorial leading-editorial max-w-[24ch] mb-3">
            One system. Every buyer touchpoint.
          </h2>
          <p className="text-[14px] text-secondary leading-[1.6] max-w-[50ch]">
            Seven workstreams. Each solves a distinct problem. Together they close the gap between what Lazer delivers and what buyers see.
          </p>
        </div>

        {/* Node grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 flex-1">
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

        <p className="text-[10px] font-mono text-tertiary mt-4">
          Select any workstream to expand deliverables and expected returns.
        </p>
      </div>
    </section>
  )
}
