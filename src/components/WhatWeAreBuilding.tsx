import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { systemNodes } from '../data/proposal'
import { CornerMarks } from './CornerMarks'
import { SectionReveal } from './ui'

const CYCLE_MS = 8000
const TICK_MS  = 80

// ─── Animated SVG illustrations ───────────────────────────────────────────────

function NodeVisual({ index, reduced }: { index: number; reduced: boolean | null }) {
  const dur = reduced ? 0 : 1
  const patterns = [
    // 01 Brand — concentric rings pulse outward
    <g key="brand">
      <motion.circle cx="100" cy="100" r="70" stroke="#FF00C5" strokeWidth="0.75" fill="none"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: dur * 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.circle cx="100" cy="100" r="50" stroke="#FF00C5" strokeWidth="0.75" fill="none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: dur * 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.circle cx="100" cy="100" r="30" stroke="#FF00C5" strokeWidth="1" fill="none"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: dur * 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="100" cy="100" r="8" fill="#FF00C5"
        animate={{ opacity: [0.7, 1, 0.7], r: [7, 9, 7] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="30" y1="100" x2="170" y2="100" stroke="#FF00C5" strokeWidth="0.5" opacity="0.15"/>
      <line x1="100" y1="30" x2="100" y2="170" stroke="#FF00C5" strokeWidth="0.5" opacity="0.15"/>
    </g>,

    // 02 Website — grid cells light up sequentially
    <g key="website">
      {[0,1,2,3].flatMap(r => [0,1,2,3].map(c => (
        <motion.rect key={`${r}-${c}`} x={25+c*40} y={25+r*40} width="32" height="28" rx="2"
          stroke="#FF00C5" strokeWidth="0.75" fill="none"
          animate={{ opacity: [0.08, 0.3, 0.08] }}
          transition={{ duration: dur * 3, repeat: Infinity, ease: 'easeInOut', delay: (r+c) * 0.18 }}
        />
      )))}
      <motion.rect x="25" y="25" width="72" height="28" rx="2" stroke="#FF00C5" strokeWidth="1"
        fill="#FF00C5"
        animate={{ fillOpacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.line x1="145" y1="25" x2="157" y2="25" stroke="#FF00C5" strokeWidth="1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: dur * 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.line x1="151" y1="19" x2="151" y2="31" stroke="#FF00C5" strokeWidth="1.5"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: dur * 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
    </g>,

    // 03 Case studies — cards float
    <g key="cases">
      {([4,2,0] as number[]).map((offset, i) => (
        <motion.rect key={i} x={30+offset} y={40+offset} width="140" height="90" rx="3"
          stroke="#FF00C5" strokeWidth="0.75" fill="none"
          animate={{ opacity: [0.15 + i * 0.2, 0.4 + i * 0.25, 0.15 + i * 0.2] }}
          transition={{ duration: dur * 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
      <motion.line x1="48" y1="70" x2="152" y2="70" stroke="#FF00C5" strokeWidth="0.75"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.line x1="48" y1="85" x2="120" y2="85" stroke="#FF00C5" strokeWidth="0.5"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
      />
      <motion.line x1="48" y1="98" x2="105" y2="98" stroke="#FF00C5" strokeWidth="0.5"
        animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />
      <motion.circle cx="48" cy="58" r="6" stroke="#FF00C5" strokeWidth="0.75" fill="none"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>,

    // 04 Sales enablement — arrows pulse between document, boxes
    <g key="enablement">
      {([0,1,2] as number[]).map(i => (
        <motion.rect key={i} x={25+i*52} y={70} width="42" height="28" rx="2"
          stroke="#FF00C5" strokeWidth="0.75" fill="none"
          animate={{ opacity: [0.2+i*0.15, 0.55+i*0.15, 0.2+i*0.15] }}
          transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
        />
      ))}
      <motion.path d="M67 84 L77 84 M73 80 L77 84 L73 88" stroke="#FF00C5" strokeWidth="1.2" fill="none"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: dur * 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path d="M119 84 L129 84 M125 80 L129 84 L125 88" stroke="#FF00C5" strokeWidth="1.2" fill="none"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: dur * 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
      />
      <motion.rect x="82" y="28" width="36" height="30" rx="2" stroke="#FF00C5" strokeWidth="0.75" fill="none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: dur * 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="88" y1="37" x2="112" y2="37" stroke="#FF00C5" strokeWidth="0.5" opacity="0.5"/>
      <line x1="88" y1="43" x2="108" y2="43" stroke="#FF00C5" strokeWidth="0.5" opacity="0.4"/>
      <line x1="88" y1="49" x2="104" y2="49" stroke="#FF00C5" strokeWidth="0.5" opacity="0.3"/>
      <motion.line x1="100" y1="58" x2="100" y2="68" stroke="#FF00C5" strokeWidth="0.75"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>,

    // 05 Social — broadcast waves animate outward
    <g key="social">
      {([1,2,3] as number[]).map(i => (
        <motion.path key={i} d={`M100 100 m-${i*28} 0 a${i*28} ${i*28} 0 0 1 ${i*56} 0`}
          stroke="#FF00C5" strokeWidth="0.75" fill="none"
          animate={{ opacity: [0, 0.65-i*0.1, 0] }}
          transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.4 }}
        />
      ))}
      <motion.circle cx="100" cy="100" r="6" fill="#FF00C5"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle cx="100" cy="100" r="14" stroke="#FF00C5" strokeWidth="0.5" fill="none"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: dur * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <line x1="100" y1="30" x2="100" y2="86" stroke="#FF00C5" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 3"/>
    </g>,

    // 06 Measurement — bars grow, trend line pulses
    <g key="measurement">
      {([40, 70, 55, 85, 65, 90] as number[]).map((h, i) => (
        <motion.rect key={i} x={25+i*22} y={120-h} width="14" height={h} rx="1"
          stroke="#FF00C5" strokeWidth="0.5"
          fill="#FF00C5"
          animate={{ fillOpacity: [0.05, 0.12+i*0.04, 0.05], opacity: [0.4, 0.65+i*0.06, 0.4] }}
          transition={{ duration: dur * 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
      <line x1="25" y1="120" x2="175" y2="120" stroke="#FF00C5" strokeWidth="0.75" opacity="0.4"/>
      <line x1="25" y1="50" x2="25" y2="120" stroke="#FF00C5" strokeWidth="0.75" opacity="0.4"/>
      <motion.path d="M30 100 L52 80 L74 90 L96 60 L118 70 L140 45" stroke="#FF00C5" strokeWidth="1.2" fill="none"
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: dur * 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />
    </g>,

    // 07 AI — circuit nodes pulse + connections flash
    <g key="ai">
      {([[55,55],[100,40],[145,55],[145,100],[100,145],[55,145],[100,100]] as [number,number][]).map(([x,y], i) => (
        <motion.circle key={i} cx={x} cy={y} r={i===6?10:5} stroke="#FF00C5" strokeWidth="0.75" fill="none"
          animate={{ opacity: i===6 ? [0.7,1,0.7] : [0.3,0.8,0.3] }}
          transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
      {([[55,55],[100,40],[145,55],[145,100],[100,145],[55,145]] as [number,number][]).map(([x,y], i) => (
        <motion.line key={i} x1={x} y1={y} x2="100" y2="100" stroke="#FF00C5" strokeWidth="0.5"
          animate={{ opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
        />
      ))}
      <motion.circle cx="100" cy="100" r="10" fill="#FF00C5" stroke="#FF00C5" strokeWidth="1"
        animate={{ fillOpacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: dur * 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>,
  ]

  return (
    <svg width="200" height="160" viewBox="0 0 200 160" aria-hidden="true">
      {patterns[index % patterns.length]}
    </svg>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

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

            {/* LEFT: accordion list */}
            <div className="border-b lg:border-b-0 lg:border-r border-border divide-y divide-border">
              {systemNodes.map((node, i) => {
                const isOpen = activeIdx === i
                return (
                  <div key={node.id}>
                    <button
                      type="button"
                      onClick={() => selectNode(i)}
                      className={[
                        'w-full text-left px-4 py-3.5 transition-all duration-200',
                        'focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-accent/40',
                        isOpen ? 'bg-white' : 'bg-surface hover:bg-white/80',
                      ].join(' ')}
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={[
                            'font-mono text-[9px] w-7 flex-shrink-0 transition-colors duration-200',
                            isOpen ? 'text-accent' : 'text-tertiary',
                          ].join(' ')}>
                            {node.number}
                          </span>
                          <p className={[
                            'text-[13px] font-bold leading-snug transition-colors duration-200',
                            isOpen ? 'text-primary' : 'text-secondary',
                          ].join(' ')}>
                            {node.title}
                          </p>
                        </div>
                        <motion.span
                          className={`text-[11px] flex-shrink-0 transition-colors duration-200 ${isOpen ? 'text-accent' : 'text-tertiary'}`}
                          animate={{ rotate: isOpen ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                          aria-hidden="true"
                        >
                          →
                        </motion.span>
                      </div>
                    </button>

                    {/* Accordion body */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-1 border-t border-border/60 bg-white">
                            <p className="text-[12px] text-secondary leading-[1.55] mb-3 pl-10">
                              {node.description}
                            </p>
                            <div className="pl-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                              <div>
                                <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-accent/60 mb-1.5">
                                  // INCLUDES
                                </p>
                                <ul className="space-y-1">
                                  {node.includes.map(item => (
                                    <li key={item} className="flex items-start gap-1.5">
                                      <span className="text-accent/40 text-[10px] flex-shrink-0 mt-[1px]">—</span>
                                      <span className="text-[11px] text-secondary leading-[1.4]">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <p className="font-mono text-[8px] tracking-[0.18em] uppercase text-tertiary mb-1.5">
                                  // RETURNS
                                </p>
                                <ul className="space-y-1">
                                  {node.returns.map(item => (
                                    <li key={item} className="flex items-start gap-1.5">
                                      <span className="text-accent-2/50 text-[10px] flex-shrink-0 mt-[1px]">↑</span>
                                      <span className="text-[11px] text-secondary leading-[1.4]">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>

            {/* RIGHT: visual panel */}
            <div className="relative bg-primary min-h-[320px] lg:min-h-0 flex flex-col overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <NodeVisual index={activeIdx} reduced={reduced} />
                  <div className="mt-4">
                    <p className="font-mono text-[10px] font-semibold tracking-[0.15em] uppercase text-white/30 mb-2">
                      {active.number}
                    </p>
                    <h3 className="text-[20px] font-black text-white leading-tight">
                      {active.title}
                    </h3>
                  </div>
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
