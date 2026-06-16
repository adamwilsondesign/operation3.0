import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  /** Delay in seconds before this item animates in */
  delay?: number
  /** Animate children in staggered succession */
  stagger?: boolean
  /** Distance to travel on Y axis (px) — default 20 */
  distance?: number
}

const EASE = [0.16, 1, 0.3, 1] as const

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = (distance: number): Variants => ({
  hidden:  { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
})

/**
 * Wraps any block in a viewport-triggered fade+slide reveal.
 * Automatically respects prefers-reduced-motion.
 *
 * Usage (single element):
 *   <SectionReveal delay={0.1}>...</SectionReveal>
 *
 * Usage (staggered children — each child gets its own item animation):
 *   <SectionReveal stagger>
 *     <div>...</div>
 *     <div>...</div>
 *   </SectionReveal>
 */
export function SectionReveal({ children, className = '', delay = 0, distance = 14 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: distance }}
      animate={prefersReducedMotion ? {} : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance })}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggered container — children rendered as <RevealItem> animate in sequence.
 */
export function StaggerReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={prefersReducedMotion ? undefined : containerVariants}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={isInView || prefersReducedMotion ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual child inside a <StaggerReveal>.
 */
export function RevealItem({ children, className = '', distance = 14 }: { children: ReactNode; className?: string; distance?: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? undefined : itemVariants(distance)}
    >
      {children}
    </motion.div>
  )
}
