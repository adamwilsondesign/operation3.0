import { motion, AnimatePresence } from 'framer-motion'
import { references } from '../data/proposal'

interface Props {
  isOpen: boolean
  onClose: () => void
  highlightId?: number
}

export default function References({ isOpen, onClose, highlightId }: Props) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface-2 border-l border-border z-50 overflow-y-auto"
              role="complementary"
              aria-label="References and sources"
              id="references-drawer"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-bold text-primary">Sources & References</h2>
                  <button
                    onClick={onClose}
                    className="text-secondary hover:text-primary transition-colors p-1"
                    aria-label="Close references"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>

                <ol className="space-y-6" role="list">
                  {references.map(ref => (
                    <li
                      key={ref.id}
                      id={`ref-${ref.id}`}
                      className={`flex gap-4 p-4 rounded-sm transition-colors duration-300 ${
                        highlightId === ref.id ? 'bg-accent/10 border border-accent/30' : 'border border-border'
                      }`}
                    >
                      <span className="text-accent font-mono font-bold text-sm flex-shrink-0 mt-0.5">[{ref.id}]</span>
                      <p className="text-secondary text-sm leading-relaxed">{ref.citation}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <section id="references" aria-label="References">
        <div className="py-16 px-6 lg:px-8 border-t border-border bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-secondary text-sm">
              {references.length} sources cited. All data from publicly available industry research.
            </p>
            <button
              onClick={onClose}
              className="text-xs font-semibold tracking-wide uppercase text-accent hover:text-accent-light transition-colors border border-accent/30 px-4 py-2 rounded-sm"
              aria-expanded={isOpen}
              aria-controls="references-drawer"
            >
              View references
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
