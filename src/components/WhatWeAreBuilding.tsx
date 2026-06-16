import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { systemNodes } from '../data/proposal'
import { CornerMarks } from './CornerMarks'
import { SectionReveal } from './ui'

const CYCLE_MS = 8000
const TICK_MS  = 80
const M = '#FF00C5' // accent magenta

// ─── Animated SVG illustrations ───────────────────────────────────────────────
// viewBox: 300 × 240, fills the container via width="100%" height="100%"

function NodeVisual({ index, reduced }: { index: number; reduced: boolean | null }) {
  const d = reduced ? 0 : 1 // duration multiplier

  const patterns: JSX.Element[] = [

    // ── 01 Brand System ──────────────────────────────────────────────────────
    // Precision compass / identity circle system
    <g key="brand">
      {/* Outer degree ring */}
      {Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * 2 * Math.PI - Math.PI / 2
        const r1 = 108, r2 = i % 9 === 0 ? 96 : i % 3 === 0 ? 99 : 102
        return (
          <motion.line key={i}
            x1={150 + r1 * Math.cos(angle)} y1={120 + r1 * Math.sin(angle)}
            x2={150 + r2 * Math.cos(angle)} y2={120 + r2 * Math.sin(angle)}
            stroke={M} strokeWidth={i % 9 === 0 ? 1.5 : 0.75}
            animate={{ opacity: [0.2, i % 9 === 0 ? 0.7 : 0.35, 0.2] }}
            transition={{ duration: d * 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
          />
        )
      })}
      {/* Concentric circles */}
      {[88, 66, 44, 22].map((r, i) => (
        <motion.circle key={r} cx="150" cy="120" r={r} stroke={M} fill="none"
          strokeWidth={i === 0 ? 0.75 : i === 1 ? 1 : 1.25}
          animate={{ opacity: [0.12 + i * 0.08, 0.35 + i * 0.15, 0.12 + i * 0.08] }}
          transition={{ duration: d * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
        />
      ))}
      {/* Rotating sweep arc */}
      <motion.circle cx="150" cy="120" r="88" stroke={M} fill="none"
        strokeWidth="1.5" strokeDasharray="55 500"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: d * 6, repeat: Infinity, ease: 'linear' }}
        style={{ originX: '150px', originY: '120px' }}
      />
      {/* Crosshair */}
      <motion.line x1="30" y1="120" x2="270" y2="120" stroke={M} strokeWidth="0.5"
        animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: d * 4, repeat: Infinity }} />
      <motion.line x1="150" y1="10" x2="150" y2="230" stroke={M} strokeWidth="0.5"
        animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: d * 4, repeat: Infinity, delay: 0.5 }} />
      {/* Center dot */}
      <motion.circle cx="150" cy="120" r="5" fill={M}
        animate={{ opacity: [0.7, 1, 0.7], r: [4, 6, 4] }}
        transition={{ duration: d * 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Cardinal annotation ticks */}
      {[[150, 15], [272, 120], [150, 225], [28, 120]].map(([x, y], i) => (
        <motion.circle key={i} cx={x} cy={y} r="2.5" fill="none" stroke={M} strokeWidth="1"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: d * 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
    </g>,

    // ── 02 Website Rebuild ───────────────────────────────────────────────────
    // Browser wireframe with content blocks appearing
    <g key="website">
      {/* Browser chrome */}
      <motion.rect x="28" y="18" width="244" height="204" rx="4" stroke={M} strokeWidth="1"
        fill="none" animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: d * 4, repeat: Infinity }} />
      {/* Title bar */}
      <motion.rect x="28" y="18" width="244" height="28" rx="4" stroke={M} strokeWidth="0.75"
        fill={M} fillOpacity="0.04" animate={{ fillOpacity: [0.03, 0.09, 0.03] }}
        transition={{ duration: d * 3, repeat: Infinity }} />
      {/* Browser dots */}
      {[46, 58, 70].map((x, i) => (
        <motion.circle key={i} cx={x} cy="32" r="4" fill="none" stroke={M} strokeWidth="0.75"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: d * 2, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      {/* URL bar */}
      <motion.rect x="100" y="24" width="120" height="16" rx="2" stroke={M} strokeWidth="0.5"
        fill="none" animate={{ opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: d * 3, repeat: Infinity, delay: 0.5 }} />
      {/* Hero block */}
      <motion.rect x="40" y="58" width="220" height="56" rx="2" stroke={M} strokeWidth="0.75"
        fill={M} animate={{ fillOpacity: [0.02, 0.08, 0.02], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: d * 3, repeat: Infinity, delay: 0.3 }} />
      {/* Headline text lines in hero */}
      {[72, 84, 94].map((y, i) => (
        <motion.rect key={y} x={52} y={y} width={[160, 120, 80][i]} height="5" rx="1"
          fill={M} animate={{ opacity: [0.15, 0.5, 0.15], width: [[80, 160][i % 2], [160, 120, 80][i], [80, 160][i % 2]] }}
          transition={{ duration: d * 3.5, repeat: Infinity, delay: i * 0.2 }} />
      ))}
      {/* Content card grid */}
      {[0, 1, 2].map(col => (
        <motion.rect key={col} x={40 + col * 78} y="128" width="68" height="72" rx="3"
          stroke={M} strokeWidth="0.75" fill="none"
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: d * 3, repeat: Infinity, delay: 0.6 + col * 0.25 }} />
      ))}
      {/* Card content lines */}
      {[0, 1, 2].map(col => [142, 153, 162].map((y, li) => (
        <motion.rect key={`${col}-${li}`} x={47 + col * 78} y={y} width={[48, 36, 28][li]} height="3.5" rx="1"
          fill={M} animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.8 + col * 0.2 + li * 0.1 }} />
      )))}
    </g>,

    // ── 03 Case Study Engine ─────────────────────────────────────────────────
    // Stacked evidence cards with proof structure drawing in
    <g key="cases">
      {/* Three stacked cards */}
      {[8, 4, 0].map((offset, i) => (
        <motion.rect key={i}
          x={28 + offset} y={30 + offset} width="204" height="156" rx="4"
          stroke={M} strokeWidth={i === 2 ? 1.25 : 0.75} fill="none"
          animate={{ opacity: [0.1 + i * 0.18, 0.3 + i * 0.25, 0.1 + i * 0.18] }}
          transition={{ duration: d * 3.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.35 }} />
      ))}
      {/* Top card interior — avatar + meta */}
      <motion.circle cx="68" cy="68" r="14" stroke={M} strokeWidth="1" fill="none"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: d * 2.5, repeat: Infinity }} />
      <motion.circle cx="68" cy="68" r="5" fill={M}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: d * 2.5, repeat: Infinity }} />
      {[78, 88].map((y, i) => (
        <motion.rect key={y} x="90" y={y} width={[80, 56][i]} height="5" rx="1" fill={M}
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.2 + i * 0.15 }} />
      ))}
      {/* Divider */}
      <motion.line x1="40" y1="98" x2="224" y2="98" stroke={M} strokeWidth="0.75"
        animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ duration: d * 3, repeat: Infinity }} />
      {/* Challenge / Approach / Result row */}
      {['C', 'A', 'R'].map((label, i) => (
        <g key={label}>
          <motion.rect x={40 + i * 62} y="108" width="52" height="20" rx="2"
            stroke={M} strokeWidth="0.75" fill="none"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.4 + i * 0.2 }} />
          <motion.text x={66 + i * 62} y="122" textAnchor="middle"
            fontSize="8" fill={M} fontFamily="monospace"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.5 + i * 0.2 }}>
            {label}
          </motion.text>
          {i < 2 && (
            <motion.path d={`M${92 + i * 62} 118 L${102 + i * 62} 118 M${99 + i * 62} 115 L${102 + i * 62} 118 L${99 + i * 62} 121`}
              stroke={M} strokeWidth="1" fill="none"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: d * 2, repeat: Infinity, delay: 0.6 + i * 0.2 }} />
          )}
        </g>
      ))}
      {/* Body text lines */}
      {[142, 152, 162, 172].map((y, i) => (
        <motion.rect key={y} x="40" y={y} width={[184, 140, 160, 100][i]} height="4" rx="1" fill={M}
          animate={{ opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: d * 3, repeat: Infinity, delay: 0.3 + i * 0.12 }} />
      ))}
    </g>,

    // ── 04 Sales Enablement ──────────────────────────────────────────────────
    // Master deck branching into four deliverable types
    <g key="enablement">
      {/* Master doc at top */}
      <motion.rect x="108" y="16" width="84" height="58" rx="3"
        stroke={M} strokeWidth="1.25" fill={M} fillOpacity="0.04"
        animate={{ fillOpacity: [0.03, 0.1, 0.03], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: d * 3, repeat: Infinity }} />
      {[28, 38, 46, 54].map((y, i) => (
        <motion.rect key={y} x="118" y={y} width={[64, 50, 56, 40][i]} height="4" rx="1" fill={M}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.1 + i * 0.15 }} />
      ))}
      {/* Trunk line */}
      <motion.line x1="150" y1="74" x2="150" y2="98" stroke={M} strokeWidth="1"
        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: d * 2, repeat: Infinity }} />
      {/* Horizontal branch */}
      <motion.line x1="46" y1="98" x2="254" y2="98" stroke={M} strokeWidth="0.75"
        animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.2 }} />
      {/* Four branches going down */}
      {[46, 108, 192, 254].map((x, i) => (
        <motion.line key={i} x1={x} y1="98" x2={x} y2="118" stroke={M} strokeWidth="0.75"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.3 + i * 0.12 }} />
      ))}
      {/* Four deliverable cards */}
      {[
        { x: 20,  label: 'PROPOSAL' },
        { x: 82,  label: 'PITCH' },
        { x: 166, label: '1-PAGER' },
        { x: 228, label: 'PRICING' },
      ].map(({ x, label }, i) => (
        <g key={label}>
          <motion.rect x={x} y="118" width="52" height="68" rx="3"
            stroke={M} strokeWidth="0.75" fill="none"
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{ duration: d * 3, repeat: Infinity, delay: 0.4 + i * 0.18 }} />
          {[128, 138, 148, 158, 168, 178].map((y, li) => (
            <motion.rect key={y} x={x + 6} y={y} width={[40, 32, 36, 28, 34, 20][li]} height="3.5" rx="1" fill={M}
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: d * 2.5, repeat: Infinity, delay: 0.5 + i * 0.18 + li * 0.06 }} />
          ))}
          <motion.text x={x + 26} y="198" textAnchor="middle" fontSize="5.5" fill={M} fontFamily="monospace"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: d * 3, repeat: Infinity, delay: 0.6 + i * 0.18 }}>
            {label}
          </motion.text>
        </g>
      ))}
    </g>,

    // ── 05 Social & Launch Kit ───────────────────────────────────────────────
    // Full broadcast with multiple channel targets
    <g key="social">
      {/* Broadcast rings expanding */}
      {[32, 56, 80, 104].map((r, i) => (
        <motion.circle key={r} cx="150" cy="120" r={r} stroke={M} strokeWidth="0.75" fill="none"
          animate={{ opacity: [0, 0.6 - i * 0.1, 0], scale: [0.85, 1.05, 0.85] }}
          transition={{ duration: d * 3, repeat: Infinity, ease: 'easeOut', delay: i * 0.55 }}
          style={{ originX: '150px', originY: '120px' }}
        />
      ))}
      {/* Center emitter */}
      <motion.circle cx="150" cy="120" r="12" stroke={M} strokeWidth="1.5" fill={M} fillOpacity="0.12"
        animate={{ fillOpacity: [0.08, 0.22, 0.08] }}
        transition={{ duration: d * 2, repeat: Infinity }} />
      <motion.circle cx="150" cy="120" r="5" fill={M}
        animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: d * 1.5, repeat: Infinity }} />
      {/* Channel nodes at compass points */}
      {[
        { x: 150, y: 18, a: 0 },
        { x: 258, y: 120, a: 1 },
        { x: 42, y: 120, a: 2 },
        { x: 150, y: 222, a: 3 },
        { x: 232, y: 38, a: 4 },
        { x: 68, y: 38, a: 5 },
      ].map(({ x, y, a }) => (
        <g key={a}>
          <motion.rect x={x - 14} y={y - 10} width="28" height="20" rx="3"
            stroke={M} strokeWidth="0.75" fill={M}
            animate={{ fillOpacity: [0.04, 0.14, 0.04], opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: d * 2.5, repeat: Infinity, ease: 'easeInOut', delay: a * 0.3 }} />
          {/* Mini lines inside */}
          <motion.line x1={x - 8} y1={y - 2} x2={x + 8} y2={y - 2} stroke={M} strokeWidth="1.5"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: d * 2.5, repeat: Infinity, delay: a * 0.3 + 0.1 }} />
          <motion.line x1={x - 8} y1={y + 3} x2={x + 4} y2={y + 3} stroke={M} strokeWidth="1"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: d * 2.5, repeat: Infinity, delay: a * 0.3 + 0.2 }} />
          {/* Radial connector */}
          <motion.line
            x1={x > 150 ? x - 14 : x < 150 ? x + 14 : x}
            y1={y > 120 ? y - 10 : y < 120 ? y + 10 : y}
            x2={150 + (x - 150) * 0.15} y2={120 + (y - 120) * 0.15}
            stroke={M} strokeWidth="0.5"
            animate={{ opacity: [0.08, 0.25, 0.08] }}
            transition={{ duration: d * 3, repeat: Infinity, delay: a * 0.3 }} />
        </g>
      ))}
    </g>,

    // ── 06 Measurement ───────────────────────────────────────────────────────
    // Analytics dashboard with animated bars + drawing trend line
    <g key="measurement">
      {/* Axes */}
      <line x1="42" y1="30" x2="42" y2="188" stroke={M} strokeWidth="1" opacity="0.4" />
      <line x1="42" y1="188" x2="264" y2="188" stroke={M} strokeWidth="1" opacity="0.4" />
      {/* Y-axis grid lines */}
      {[60, 100, 140].map(y => (
        <motion.line key={y} x1="42" y1={y} x2="264" y2={y} stroke={M} strokeWidth="0.5"
          strokeDasharray="4 6"
          animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: d * 4, repeat: Infinity }} />
      ))}
      {/* 7 bars */}
      {[78, 118, 92, 148, 108, 158, 130].map((h, i) => {
        const bx = 54 + i * 32
        return (
          <g key={i}>
            <motion.rect x={bx} y={188 - h} width="20" height={h} rx="2"
              fill={M} stroke={M} strokeWidth="0.5"
              animate={{
                fillOpacity: [0.06, 0.14 + i * 0.02, 0.06],
                opacity: [0.45, 0.75 + i * 0.03, 0.45],
                height: [h * 0.4, h, h * 0.85, h],
                y: [188 - h * 0.4, 188 - h, 188 - h * 0.85, 188 - h],
              }}
              transition={{ duration: d * 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.18 }} />
            {/* Bar top dot */}
            <motion.circle cx={bx + 10} cy={188 - h} r="2.5" fill={M}
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: d * 2, repeat: Infinity, delay: 0.5 + i * 0.18 }} />
          </g>
        )
      })}
      {/* Drawing trend line */}
      <motion.path
        d="M64 148 L96 118 L128 130 L160 88 L192 100 L224 70 L256 55"
        stroke={M} strokeWidth="2" fill="none"
        strokeDasharray="1" pathLength={1}
        animate={{ strokeDashoffset: [1, 0] }}
        transition={{ duration: d * 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }} />
    </g>,

    // ── 07 AI Production System ──────────────────────────────────────────────
    // Neural network with sequentially sparking connections
    <g key="ai">
      {/* Define node positions */}
      {(() => {
        const nodes: [number, number][] = [
          [150, 120], // 0 center
          [150, 38],  // 1 top
          [224, 70],  // 2 top-right
          [224, 170], // 3 bottom-right
          [150, 202], // 4 bottom
          [76, 170],  // 5 bottom-left
          [76, 70],   // 6 top-left
          [100, 96],  // 7 inner tl
          [200, 96],  // 8 inner tr
          [200, 144], // 9 inner br
          [100, 144], // 10 inner bl
        ]
        const edges: [number, number][] = [
          [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
          [0, 7], [0, 8], [0, 9], [0, 10],
          [7, 8], [8, 9], [9, 10], [10, 7],
          [1, 7], [2, 8], [3, 9], [4, 10], [5, 10], [6, 7],
        ]
        return (
          <g>
            {edges.map(([a, b], i) => (
              <motion.line key={i}
                x1={nodes[a][0]} y1={nodes[a][1]}
                x2={nodes[b][0]} y2={nodes[b][1]}
                stroke={M} strokeWidth="0.75"
                animate={{ opacity: [0.05, 0.5, 0.05] }}
                transition={{ duration: d * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }} />
            ))}
            {nodes.map(([x, y], i) => (
              <g key={i}>
                {/* Outer glow ring */}
                <motion.circle cx={x} cy={y} r={i === 0 ? 20 : i <= 6 ? 10 : 7}
                  stroke={M} strokeWidth="0.5" fill="none"
                  animate={{ opacity: [0.05, 0.2, 0.05] }}
                  transition={{ duration: d * 3, repeat: Infinity, delay: i * 0.2 }} />
                {/* Node circle */}
                <motion.circle cx={x} cy={y} r={i === 0 ? 12 : i <= 6 ? 6 : 4.5}
                  stroke={M} strokeWidth={i === 0 ? 1.5 : 1} fill={M}
                  animate={{
                    fillOpacity: i === 0 ? [0.15, 0.35, 0.15] : [0.05, 0.2, 0.05],
                    opacity: i === 0 ? [0.8, 1, 0.8] : [0.35, 0.8, 0.35],
                  }}
                  transition={{ duration: d * 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }} />
              </g>
            ))}
          </g>
        )
      })()}
    </g>,
  ]

  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 300 240"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="w-full h-full"
    >
      {patterns[index % patterns.length]}
    </svg>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function WhatWeAreBuilding() {
  const reduced = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [progress, setProgress]   = useState(0)
  const [paused, setPaused]        = useState(false)

  const selectNode = useCallback((i: number) => {
    setActiveIdx(i)
    setProgress(0)
  }, [])

  useEffect(() => {
    if (reduced || paused) return
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
  }, [reduced, paused])

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
          <div
            className="grid grid-cols-1 lg:grid-cols-2 border border-border rounded-[4px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

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
            <div className="relative bg-primary min-h-[360px] lg:min-h-0 flex flex-col overflow-hidden">

              {/* SVG fills the flex-1 area */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center p-6"
                  >
                    <NodeVisual index={activeIdx} reduced={reduced} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Title strip at bottom */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 flex-shrink-0">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.id}
                    initial={reduced ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="font-mono text-[11px] font-semibold tracking-[0.12em] uppercase text-white/70"
                  >
                    <span className="text-accent mr-2">{active.number}</span>
                    {active.title}
                  </motion.p>
                </AnimatePresence>
                <span className="font-mono text-[9px] text-white/20 tabular flex-shrink-0">
                  {String(activeIdx + 1).padStart(2,'0')}/{String(systemNodes.length).padStart(2,'0')}
                </span>
              </div>

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
            </div>

          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
