import { motion, useReducedMotion } from 'framer-motion'
import { projectMeta, heroChips, type HeroChip } from '../data/proposal'
import { CornerMarks } from './CornerMarks'

const EASE = [0.16, 1, 0.3, 1] as const

function StatChip({ value, label, delay, reduced }: { value: string; label: string; delay: number; reduced: boolean | null }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex items-stretch border border-border-mid rounded-[3px] bg-white shadow-card overflow-hidden hover:border-accent/40 hover:shadow-accent-sm transition-all duration-250 group min-h-[44px]"
    >
      <span className="px-3 py-2.5 font-mono text-[13px] font-semibold tabular text-primary group-hover:text-accent transition-colors duration-250 whitespace-nowrap flex items-center">{value}</span>
      <span className="w-[1px] self-stretch bg-border" aria-hidden="true" />
      <span className="px-3 py-2.5 text-[11px] text-secondary leading-tight max-w-[100px] flex items-center">{label}</span>
    </motion.div>
  )
}

function TagChip({ text, delay, reduced }: { text: string; delay: number; reduced: boolean | null }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="flex items-center gap-2 border border-border-mid rounded-[3px] bg-white shadow-card px-3 py-2.5 min-h-[44px] hover:border-accent/40 transition-colors duration-250"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
      <span className="text-[11px] text-secondary whitespace-nowrap">{text}</span>
    </motion.div>
  )
}

function ScrollCue({ reduced }: { reduced: boolean | null }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      aria-hidden="true"
    >
      <span className="text-[9px] text-tertiary tracking-[0.25em] uppercase">Scroll</span>
      <div className="relative w-[1px] h-8 bg-border-mid overflow-hidden rounded-full">
        {reduced ? (
          <div className="absolute inset-x-0 top-0 h-1/3 bg-accent" />
        ) : (
          <motion.div
            className="absolute inset-x-0 top-0 bg-accent rounded-full"
            style={{ height: '35%' }}
            animate={{ y: ['0%', '200%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', times: [0, 0.7, 1], repeatDelay: 0.4 }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  const chips = heroChips
  const chipDelay = (i: number) => 0.7 + i * 0.07

  return (
    <section
      id="hero"
      className="snap-section flex flex-col justify-center bg-white border-b border-border"
      aria-labelledby="hero-headline"
    >
      <CornerMarks />

      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 20%, rgba(255,0,197,0.06) 0%, transparent 65%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 80%, rgba(66,0,255,0.05) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative flex-1 flex flex-col justify-center" style={{ paddingTop: 'calc(var(--nav-h) + 2rem)', paddingBottom: '2rem' }}>
        {/* Eyebrow */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="flex items-center gap-3 mb-6"
        >
          <svg viewBox="0 0 56 62" className="h-8 w-auto flex-shrink-0" fill="none" aria-label="Lazer logo mark">
            <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
          </svg>
          <span className="text-eyebrow font-semibold tracking-wide uppercase text-tertiary">
            Executive Proposal — {new Date().getFullYear()}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-headline"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="text-display-2xl font-black text-primary tracking-editorial leading-[0.92] max-w-[18ch] mb-5"
        >
          {projectMeta.heroHeadline}
        </motion.h1>

        {/* Narrative */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: EASE }}
          className="text-[15px] text-secondary leading-[1.6] max-w-[50ch] mb-8"
        >
          Lazer has the capability, credibility, and proof. The opportunity is to package that value into a system that helps buyers understand, trust, and act faster.
        </motion.p>

        {/* Chips */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Project key metrics"
        >
          {chips.map((chip: HeroChip, i) => (
            <div key={i} role="listitem">
              {chip.kind === 'stat'
                ? <StatChip value={chip.value} label={chip.label} delay={chipDelay(i)} reduced={reduced} />
                : <TagChip text={chip.text} delay={chipDelay(i)} reduced={reduced} />
              }
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollCue reduced={reduced} />
    </section>
  )
}
