import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { systemNodes, type SystemNode } from '../data/proposal'
import { SectionReveal, StaggerReveal, RevealItem } from './ui'

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
          ? 'border-accent/40 bg-accent-dim shadow-[0_0_0_1px_rgba(37,99,235,0.15),0_4px_32px_rgba(37,99,235,0.10)]'
          : 'border-border-mid bg-surface-2 hover:border-border-light hover:bg-surface-3'
        }
      `}
    >
      {/* Header row — always visible */}
      <div className="p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          {/* Number + workstream */}
          <div className="flex items-center gap-3">
            <span className="
              text-[9px] font-mono font-semibold tracking-[0.22em] uppercase
              text-accent/70
            ">
              {node.number}
            </span>
            <span className="
              text-[9px] font-semibold tracking-[0.18em] uppercase
              border border-border-mid text-tertiary
              px-2 py-0.5 rounded-[2px] leading-none
            ">
              {node.workstream}
            </span>
          </div>

          {/* Expand indicator */}
          <motion.span
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="text-tertiary text-lg leading-none flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            +
          </motion.span>
        </div>

        <h3 className="
          text-[15px] font-bold text-primary leading-snug tracking-tight mb-2
        ">
          {node.title}
        </h3>
        <p className="text-[12.5px] text-secondary leading-[1.6]">
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
            <div className="px-6 lg:px-7 pb-6 lg:pb-7">
              <div className="h-[1px] bg-accent/15 mb-5" aria-hidden="true" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Includes */}
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-accent/70 mb-3">
                    Includes
                  </p>
                  <ul className="space-y-2" aria-label={`${node.title} includes`}>
                    {node.includes.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent/50 leading-none mt-[3px] flex-shrink-0" aria-hidden="true">—</span>
                        <span className="text-[12px] text-secondary leading-[1.55]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Returns */}
                <div>
                  <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">
                    Returns
                  </p>
                  <ul className="space-y-2" aria-label={`${node.title} returns`}>
                    {node.returns.map(item => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent leading-none mt-[3px] flex-shrink-0 text-[10px]" aria-hidden="true">↑</span>
                        <span className="text-[12px] text-secondary leading-[1.55]">{item}</span>
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

// ─── SVG connector lines (desktop only) ──────────────────────────────────────

function ConnectorLines({ inView, reduced }: { inView: boolean; reduced: boolean | null }) {
  // Lines connect: 01→02, 02→03, 04→05, 05→06, 01→04, 02→05, 03→06
  // Each line is defined as a pair of node positions in the 3×2 grid
  // We use viewBox 0 0 300 200, nodes at (50,50) (150,50) (250,50) (50,150) (150,150) (250,150)
  const nodes = [
    { x: 50,  y: 50  }, // 01
    { x: 150, y: 50  }, // 02
    { x: 250, y: 50  }, // 03
    { x: 50,  y: 150 }, // 04
    { x: 150, y: 150 }, // 05
    { x: 250, y: 150 }, // 06
  ]
  const edges: [number, number][] = [
    [0, 1], [1, 2],       // top row
    [3, 4], [4, 5],       // bottom row
    [0, 3], [1, 4], [2, 5], // verticals
    [0, 4], [1, 5],       // diagonals
  ]

  return (
    <svg
      viewBox="0 0 300 200"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(37,99,235,0.0)" />
          <stop offset="50%" stopColor="rgba(37,99,235,0.25)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0.0)" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="url(#line-grad)"
          strokeWidth="0.5"
          strokeDasharray="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={reduced ? { duration: 0 } : {
            duration: 1.2,
            delay: 0.4 + i * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
      {/* Node dots */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r="2"
          fill="rgba(37,99,235,0.5)"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={reduced ? { duration: 0 } : {
            duration: 0.4,
            delay: 0.3 + i * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </svg>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function WhatWeAreBuilding() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)
  const svgRef = useRef<HTMLDivElement>(null)
  const svgInView = useInView(svgRef, { once: true, margin: '-10%' })

  const toggle = (id: string) => setActiveId(prev => prev === id ? null : id)

  return (
    <section
      id="scope"
      className="py-28 lg:py-36 border-t border-border bg-surface"
      aria-labelledby="scope-headline"
    >
      <div className="section-container">

        {/* Header */}
        <SectionReveal>
          <p className="eyebrow mb-5">The System</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2
            id="scope-headline"
            className="
              text-display-lg font-black text-primary
              tracking-editorial leading-editorial
              max-w-[24ch] mb-6
            "
          >
            One system. Every buyer touchpoint.
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="text-[15px] text-secondary leading-[1.65] max-w-[52ch] mb-16">
            Six interconnected workstreams. Each solves a distinct problem. Together they close the gap between what Lazer delivers and what buyers see.
          </p>
        </SectionReveal>

        {/* Constellation diagram — desktop only decoration */}
        <SectionReveal delay={0.18}>
          <div
            ref={svgRef}
            className="hidden lg:block relative h-[200px] mb-8 opacity-40 pointer-events-none"
            aria-hidden="true"
          >
            <ConnectorLines inView={svgInView} reduced={reduced} />
          </div>
        </SectionReveal>

        {/* Node grid */}
        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemNodes.map(node => (
            <RevealItem key={node.id}>
              <NodeCard
                node={node}
                isActive={activeId === node.id}
                onClick={() => toggle(node.id)}
                reduced={reduced}
              />
            </RevealItem>
          ))}
        </StaggerReveal>

        {/* Footer note */}
        <SectionReveal delay={0.1}>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-[1px] bg-border flex-1 max-w-[80px]" aria-hidden="true" />
            <p className="text-[11px] font-mono text-tertiary leading-relaxed">
              Select any workstream to expand deliverables and expected returns.
            </p>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
