import { motion, useReducedMotion } from 'framer-motion'
import { projectMeta, heroChips, type HeroChip } from '../data/proposal'

// ─── Shared easing ────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Stat chip: large mono value / vertical rule / small label */
function StatChip({
  value,
  label,
  delay,
  reduced,
}: {
  value: string
  label: string
  delay: number
  reduced: boolean | null
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="
        flex items-stretch
        border border-border rounded-[2px]
        bg-surface/60 backdrop-blur-sm
        overflow-hidden
        hover:border-border-light hover:bg-surface
        transition-colors duration-250
        group
      "
    >
      {/* Value */}
      <span className="
        px-3 py-2.5
        font-mono text-sm font-semibold tabular
        text-primary
        group-hover:text-accent transition-colors duration-250
        whitespace-nowrap
      ">
        {value}
      </span>
      {/* Divider */}
      <span className="w-[1px] self-stretch bg-border group-hover:bg-border-light transition-colors duration-250" aria-hidden="true" />
      {/* Label */}
      <span className="
        px-3 py-2.5
        text-[11px] text-secondary leading-tight
        max-w-[110px]
        flex items-center
      ">
        {label}
      </span>
    </motion.div>
  )
}

/** Tag chip: bullet + plain descriptor text */
function TagChip({
  text,
  delay,
  reduced,
}: {
  text: string
  delay: number
  reduced: boolean | null
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="
        flex items-center gap-2
        border border-border rounded-[2px]
        bg-surface/60 backdrop-blur-sm
        px-3 py-2.5
        hover:border-border-light hover:bg-surface
        transition-colors duration-250
      "
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" aria-hidden="true" />
      <span className="text-[11px] text-secondary whitespace-nowrap">{text}</span>
    </motion.div>
  )
}

/** Animated scroll cue — traveling dot on a vertical line */
function ScrollCue({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="text-[9px] text-tertiary tracking-[0.25em] uppercase">Scroll</span>
      {/* Line with traveling dot */}
      <div className="relative w-[1px] h-10 bg-border overflow-hidden rounded-full">
        {reduced ? (
          <div className="absolute inset-x-0 top-0 h-1/3 bg-accent" />
        ) : (
          <motion.div
            className="absolute inset-x-0 top-0 bg-accent rounded-full"
            style={{ height: '35%' }}
            animate={{ y: ['0%', '200%', '200%'] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.7, 1],
              repeatDelay: 0.4,
            }}
          />
        )}
      </div>
    </motion.div>
  )
}

/** Slow-breathing accent radial glow behind the headline */
function BackgroundGlow({ reduced }: { reduced: boolean | null }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Primary large orb — top right quadrant */}
      <motion.div
        className="absolute -top-[20%] right-[-10%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%)',
        }}
        animate={reduced ? {} : {
          scale:   [1, 1.12, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Secondary smaller orb — lower left, offset */}
      <motion.div
        className="absolute top-[55%] -left-[5%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 60%)',
        }}
        animate={reduced ? {} : {
          scale:   [1, 1.08, 1],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
      {/* Precision horizontal accent line — enters once */}
      <motion.div
        className="absolute left-0 right-0 h-[1px]"
        style={{
          top: '62%',
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.18) 40%, rgba(37,99,235,0.18) 60%, transparent)',
        }}
        initial={reduced ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: EASE }}
      />
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Hero() {
  const reduced = useReducedMotion()

  /** Shorthand for standard entry animation props */
  const enter = (delay: number) =>
    reduced
      ? {}
      : {
          initial:    { opacity: 0, y: 18 } as const,
          animate:    { opacity: 1, y: 0  } as const,
          transition: { duration: 0.65, delay, ease: EASE },
        }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      aria-labelledby="hero-headline"
    >
      <BackgroundGlow reduced={reduced} />

      {/* ── Content ── */}
      <div className="section-container relative z-10 flex-1 flex flex-col justify-center pt-32 pb-28">

        {/* Meta row */}
        <motion.div
          {...enter(0)}
          className="flex items-center gap-3 mb-10"
        >
          <span className="eyebrow">Confidential</span>
          <span className="w-[1px] h-3 bg-border-mid" aria-hidden="true" />
          <span className="text-[11px] text-tertiary tracking-wide">
            Internal Executive Proposal · {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* Project title — small, secondary */}
        <motion.p
          {...enter(0.1)}
          className="text-[11px] text-tertiary tracking-wide uppercase mb-8 max-w-lg leading-relaxed"
        >
          {projectMeta.title}
        </motion.p>

        {/* ── Headline ── */}
        <motion.h1
          id="hero-headline"
          {...enter(0.2)}
          className="
            font-black text-primary
            text-display-2xl
            leading-display tracking-editorial
            max-w-[18ch]
            mb-7
          "
        >
          {projectMeta.heroHeadline}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...enter(0.34)}
          className="text-[17px] text-secondary leading-[1.6] max-w-[52ch] mb-6"
        >
          {projectMeta.primaryMessage}
        </motion.p>

        {/* Narrative */}
        <motion.p
          {...enter(0.46)}
          className="text-[14px] text-tertiary leading-[1.7] max-w-[56ch] mb-12"
        >
          {projectMeta.heroNarrative}
        </motion.p>

        {/* ── Precision divider ── */}
        <motion.div
          className="precision-line mb-10 max-w-2xl"
          initial={reduced ? false : { scaleX: 0, opacity: 0, originX: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.56, ease: EASE }}
          aria-hidden="true"
        />

        {/* ── Metric chips ── */}
        <div
          className="flex flex-wrap gap-2 mb-12"
          role="list"
          aria-label="Project scope at a glance"
        >
          {heroChips.map((chip: HeroChip, i) => {
            const delay = 0.64 + i * 0.065
            return (
              <div key={i} role="listitem">
                {chip.kind === 'stat' ? (
                  <StatChip
                    value={chip.value}
                    label={chip.label}
                    delay={delay}
                    reduced={reduced}
                  />
                ) : (
                  <TagChip
                    text={chip.text}
                    delay={delay}
                    reduced={reduced}
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* ── CTAs ── */}
        <motion.div
          {...enter(1.1)}
          className="flex flex-wrap gap-3"
        >
          <a
            href="#market"
            className="
              inline-flex items-center gap-2
              text-[11px] font-semibold tracking-cap uppercase
              text-white bg-accent
              px-5 py-3 rounded-[2px]
              hover:bg-accent-light
              transition-colors duration-250
            "
          >
            Read the brief
            <span aria-hidden="true" className="text-white/60">→</span>
          </a>
          <a
            href="#budget"
            className="
              inline-flex items-center gap-2
              text-[11px] font-medium tracking-cap uppercase
              text-secondary
              border border-border
              px-5 py-3 rounded-[2px]
              hover:border-border-light hover:text-primary
              transition-colors duration-250
            "
          >
            View investment
          </a>
          <a
            href="#ask"
            className="
              inline-flex items-center gap-2
              text-[11px] font-medium tracking-cap uppercase
              text-tertiary
              px-5 py-3 rounded-[2px]
              hover:text-secondary
              transition-colors duration-250
            "
          >
            Executive ask
          </a>
        </motion.div>

      </div>

      {/* ── Scroll cue ── */}
      <ScrollCue reduced={reduced} />
    </section>
  )
}
