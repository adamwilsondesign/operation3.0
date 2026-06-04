import { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { references } from '../data/proposal'

interface Props {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  highlightId?: number
}

function domainOf(url: string): string {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

// ─── Side drawer ──────────────────────────────────────────────────────────────

function RefDrawer({
  isOpen,
  onClose,
  highlightId,
  reduced,
}: {
  isOpen: boolean
  onClose: () => void
  highlightId?: number
  reduced: boolean | null
}) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const listRef = useRef<HTMLOListElement>(null)
  useEffect(() => {
    if (!isOpen || !highlightId) return
    const timer = setTimeout(() => {
      const el = listRef.current?.querySelector(`#drawer-ref-${highlightId}`)
      el?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' })
    }, 350)
    return () => clearTimeout(timer)
  }, [isOpen, highlightId, reduced])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="drawer"
            initial={reduced ? false : { x: '100%' }}
            animate={{ x: 0 }}
            exit={reduced ? undefined : { x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="
              fixed right-0 top-0 bottom-0
              w-full max-w-[480px]
              bg-white border-l border-border-mid
              z-50 flex flex-col
            "
            role="dialog"
            aria-modal="true"
            aria-label="Sources and references"
            id="references-drawer"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-7 py-5 border-b border-border flex-shrink-0">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-0.5">
                  Sources
                </p>
                <h2 className="text-[14px] font-bold text-primary leading-none">
                  {references.length} cited references
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="
                  w-8 h-8 rounded-full
                  border border-border flex items-center justify-center
                  text-tertiary hover:text-primary hover:border-border-light
                  transition-colors duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
                "
                aria-label="Close references drawer"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* List */}
            <ol
              ref={listRef}
              className="flex-1 overflow-y-auto px-7 py-6 space-y-3"
              role="list"
            >
              {references.map(ref => {
                const highlighted = highlightId === ref.id
                return (
                  <li
                    key={ref.id}
                    id={`drawer-ref-${ref.id}`}
                    className={`
                      p-4 rounded-[3px] border transition-all duration-300
                      ${highlighted
                        ? 'border-accent/35 bg-accent-dim'
                        : 'border-border bg-surface-2'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[10px] font-mono font-semibold text-accent/70 flex-shrink-0 mt-0.5 tabular w-6 text-right">
                        [{ref.id}]
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold text-secondary mb-1.5">
                          {ref.source}
                        </p>
                        <p className="text-[11px] text-tertiary leading-[1.6] mb-2.5">
                          {ref.citation}
                        </p>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex items-center gap-1
                            text-[10px] font-mono text-tertiary/60
                            hover:text-accent transition-colors duration-200
                          "
                          aria-label={`Open source: ${ref.source}`}
                        >
                          {domainOf(ref.url)}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>

            {/* Footer */}
            <div className="flex-shrink-0 px-7 py-4 border-t border-border">
              <p className="text-[10px] font-mono text-tertiary/50">
                All sources publicly available. Data accurate as of publication date.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── In-page section ──────────────────────────────────────────────────────────

function RefSection({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="references"
      className="border-t border-border bg-bg"
      aria-labelledby="references-heading"
    >
      <div className="section-container py-16">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div>
            <h2
              id="references-heading"
              className="text-[11px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-1"
            >
              Sources & References
            </h2>
            <p className="text-[13px] text-secondary">
              {references.length} sources cited. All data from publicly available industry research.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="
              flex-shrink-0 inline-flex items-center gap-2
              border border-border-mid text-secondary
              text-[11px] font-semibold tracking-[0.12em] uppercase
              px-4 py-2 rounded-[3px]
              hover:border-border-light hover:text-primary
              transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60
            "
            aria-haspopup="dialog"
            aria-controls="references-drawer"
          >
            Open source drawer
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        {/* Compact reference list */}
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12" role="list">
          {references.map((ref, i) => (
            <li
              key={ref.id}
              className={`
                flex items-start gap-3 py-3.5
                border-t border-border
                ${i === 0 ? 'border-t-0' : ''}
                ${i === 1 ? 'md:border-t-0' : ''}
              `}
            >
              <span className="text-[10px] font-mono text-accent/40 flex-shrink-0 mt-[2px] tabular w-5 text-right leading-none">
                {ref.id}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline flex-wrap gap-x-2 gap-y-0.5">
                  <span className="text-[11.5px] font-semibold text-secondary leading-snug">
                    {ref.source}
                  </span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex items-center gap-0.5
                      text-[10px] font-mono text-tertiary/50
                      hover:text-accent transition-colors duration-200
                    "
                    aria-label={`Open ${ref.source}`}
                  >
                    {domainOf(ref.url)}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* Footer */}
        <p className="text-[10px] font-mono text-tertiary/30 mt-10 pt-6 border-t border-border">
          Lazer Technologies — Confidential — {new Date().getFullYear()} — All sources publicly available.
        </p>
      </div>
    </section>
  )
}

// ─── Combined export ──────────────────────────────────────────────────────────

export default function References({ isOpen, onOpen, onClose, highlightId }: Props) {
  const reduced = useReducedMotion()

  return (
    <>
      <RefDrawer
        isOpen={isOpen}
        onClose={onClose}
        highlightId={highlightId}
        reduced={reduced}
      />
      <RefSection onOpen={onOpen} />
    </>
  )
}
