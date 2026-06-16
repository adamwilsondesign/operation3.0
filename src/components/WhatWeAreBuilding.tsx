import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { systemNodes } from '../data/proposal'
import { CornerMarks } from './CornerMarks'
import { SectionReveal } from './ui'

const CYCLE_MS = 8000
const TICK_MS  = 80

// Simple geometric SVG patterns — unique per node index
function NodeVisual({ index, title }: { index: number; title: string }) {
  const patterns = [
    // 01 Brand — concentric rings
    <g key="brand">
      <circle cx="100" cy="100" r="70" stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="50" stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity="0.5"/>
      <circle cx="100" cy="100" r="30" stroke="#FF00C5" strokeWidth="1" fill="none" opacity="0.7"/>
      <circle cx="100" cy="100" r="8" fill="#FF00C5" opacity="0.9"/>
      <line x1="30" y1="100" x2="170" y2="100" stroke="#FF00C5" strokeWidth="0.5" opacity="0.2"/>
      <line x1="100" y1="30" x2="100" y2="170" stroke="#FF00C5" strokeWidth="0.5" opacity="0.2"/>
    </g>,
    // 02 Website — grid + cursor
    <g key="website">
      {[0,1,2,3].map(r => [0,1,2,3].map(c => (
        <rect key={`${r}-${c}`} x={25+c*40} y={25+r*40} width="32" height="28" rx="2"
          stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity={0.15 + (r+c)*0.05}/>
      )))}
      <rect x="25" y="25" width="72" height="28" rx="2" stroke="#FF00C5" strokeWidth="1" fill="#FF00C5" fillOpacity="0.08"/>
      <line x1="145" y1="25" x2="157" y2="25" stroke="#FF00C5" strokeWidth="1.5" opacity="0.8"/>
      <line x1="151" y1="19" x2="151" y2="31" stroke="#FF00C5" strokeWidth="1.5" opacity="0.8"/>
    </g>,
    // 03 Case studies — stacked cards
    <g key="cases">
      {[4,2,0].map((offset, i) => (
        <rect key={i} x={30+offset} y={40+offset} width="140" height="90" rx="3"
          stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity={0.2 + i * 0.25}/>
      ))}
      <line x1="48" y1="70" x2="152" y2="70" stroke="#FF00C5" strokeWidth="0.75" opacity="0.6"/>
      <line x1="48" y1="85" x2="120" y2="85" stroke="#FF00C5" strokeWidth="0.5" opacity="0.4"/>
      <line x1="48" y1="98" x2="105" y2="98" stroke="#FF00C5" strokeWidth="0.5" opacity="0.3"/>
      <circle cx="48" cy="58" r="6" stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity="0.7"/>
    </g>,
    // 04 Enablement — arrow/flow
    <g key="enablement">
      {[0,1,2].map(i => (
        <rect key={i} x={25+i*52} y={70} width="42" height="28" rx="2"
          stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity={0.3 + i * 0.2}/>
      ))}
      <path d="M67 84 L77 84 M67 84 L63 80 M67 84 L63 88" stroke="#FF00C5" strokeWidth="1" fill="none" opacity="0.7"/>
      <path d="M119 84 L129 84 M119 84 L115 80 M119 84 L115 88" stroke="#FF00C5" strokeWidth="1" fill="none" opacity="0.7"/>
      <circle cx="100" cy="45" r="20" stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity="0.4"/>
      <text x="100" y="49" textAnchor="middle" fontSize="10" fill="#FF00C5" opacity="0.7" fontFamily="monospace">DECK</text>
    </g>,
    // 05 Social — broadcast waves
    <g key="social">
      {[1,2,3].map(i => (
        <path key={i} d={`M100 100 m-${i*28} 0 a${i*28} ${i*28} 0 0 1 ${i*56} 0`}
          stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity={0.7 - i * 0.15}/>
      ))}
      <circle cx="100" cy="100" r="6" fill="#FF00C5" opacity="0.9"/>
      <circle cx="100" cy="100" r="14" stroke="#FF00C5" strokeWidth="0.5" fill="none" opacity="0.5"/>
      <line x1="100" y1="30" x2="100" y2="94" stroke="#FF00C5" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3"/>
    </g>,
    // 06 Measurement — bar chart
    <g key="measurement">
      {[40, 70, 55, 85, 65, 90].map((h, i) => (
        <rect key={i} x={25+i*22} y={120-h} width="14" height={h} rx="1"
          stroke="#FF00C5" strokeWidth="0.5"
          fill="#FF00C5" fillOpacity={0.1 + i * 0.05}
          opacity={0.5 + i * 0.08}/>
      ))}
      <line x1="25" y1="120" x2="175" y2="120" stroke="#FF00C5" strokeWidth="0.75" opacity="0.4"/>
      <line x1="25" y1="50" x2="25" y2="120" stroke="#FF00C5" strokeWidth="0.75" opacity="0.4"/>
      <path d="M30 100 L52 80 L74 90 L96 60 L118 70 L140 45" stroke="#FF00C5" strokeWidth="1" fill="none" opacity="0.7"/>
    </g>,
    // 07 AI Production — circuit/nodes
    <g key="ai">
      {[[55,55],[100,40],[145,55],[145,100],[100,145],[55,145],[100,100]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r={i===6?10:5} stroke="#FF00C5" strokeWidth="0.75" fill="none" opacity={i===6?1:0.6}/>
      ))}
      {[[55,55],[100,40],[145,55],[145,100],[100,145],[55,145]].map(([x,y], i) => (
        <line key={i} x1={x} y1={y} x2="100" y2="100" stroke="#FF00C5" strokeWidth="0.5" opacity="0.3"/>
      ))}
      <circle cx="100" cy="100" r="10" fill="#FF00C5" fillOpacity="0.15" stroke="#FF00C5" strokeWidth="1"/>
    </g>,
  ]

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 gap-6">
      <svg width="200" height="160" viewBox="0 0 200 160" aria-hidden="true">
        {patterns[index % patterns.length]}
      </svg>
      <p className="font-mono text-[8px] tracking-[0.2em] text-white/30 uppercase text-center">
        {title}
      </p>
    </div>
  )
}

export default function WhatWeAreBuilding() {
  const reduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [progress, setProgress]   = useState(0)

  const selectNode = useCallback((i: number) => {
    setActiveIdx(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (reduced) return
    const tick = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          setActiveIdx(i => (i + 1) % systemNodes.length)
          return 0
        }
        return p + (TICK_MS / CYCLE_MS) * 100
      })
    }, TICK_MS)
    return () => clearInterval(tick)
  }, [reduced])

  const active = systemNodes[activeIdx]

  return (
    <section
      id="scope"
      className="snap-section flex flex-col justify-center border-t border-border bg-surface"
      aria-labelledby="scope-headline"
    >
      <CornerMarks />
      <div className="section-container py-8">

        {/* Header */}
        <div className="mb-6">
          <SectionReveal>
            <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">
              // SYSTEM.OVERVIEW — {String(systemNodes.length).padStart(2,'0')} WORKSTREAMS
            </p>
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

        {/* 50/50 layout */}
        <SectionReveal delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-border rounded-[4px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">

            {/* LEFT: item list */}
            <div className="border-b lg:border-b-0 lg:border-r border-border">
              {systemNodes.map((node, i) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => selectNode(i)}
                  className={[
                    'w-full text-left p-4 border-b border-border last:border-b-0',
                    'transition-all duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent/40',
                    activeIdx === i ? 'bg-white' : 'bg-surface hover:bg-white/80',
                  ].join(' ')}
                  aria-pressed={activeIdx === i}
                >
                  <div className="flex items-start gap-3">
                    <span className={[
                      'font-mono text-[9px] mt-0.5 w-7 flex-shrink-0 transition-colors duration-200',
                      activeIdx === i ? 'text-accent' : 'text-tertiary',
                    ].join(' ')}>
                      {node.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={[
                        'text-[13px] font-bold leading-snug mb-0.5 transition-colors duration-200',
                        activeIdx === i ? 'text-primary' : 'text-secondary',
                      ].join(' ')}>
                        {node.title}
                      </p>
                      <p className="text-[11px] text-tertiary leading-[1.4]">{node.description}</p>
                    </div>
                    {activeIdx === i && (
                      <span className="text-accent text-[14px] flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* RIGHT: visual panel */}
            <div className="relative bg-primary min-h-[320px] lg:min-h-0 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <NodeVisual index={activeIdx} title={active.workstream} />
                  <p className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-2">
                    {active.number}
                  </p>
                  <h3 className="text-[20px] font-black text-white leading-tight mb-3">
                    {active.title}
                  </h3>
                  <p className="text-[12px] text-white/60 leading-[1.5] max-w-[28ch]">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              {!reduced && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                  <div
                    className="h-full bg-accent transition-none"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* Node counter */}
              <div className="absolute top-4 right-4 font-mono text-[9px] text-white/20 tabular">
                {String(activeIdx + 1).padStart(2,'0')}/{String(systemNodes.length).padStart(2,'0')}
              </div>
            </div>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
