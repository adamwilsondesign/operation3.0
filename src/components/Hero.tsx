import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 lg:px-8 pt-24 pb-16 overflow-hidden"
      aria-label="Proposal thesis"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">
            Confidential — Internal Executive Proposal
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black text-primary leading-[0.95] tracking-tight max-w-5xl"
        >
          This is not a redesign.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl lg:text-8xl font-black leading-[0.95] tracking-tight max-w-5xl mt-2"
          style={{ color: '#2563eb' }}
        >
          It is revenue infrastructure.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 text-lg sm:text-xl text-secondary max-w-2xl leading-relaxed"
        >
          A proposal for Lazer's brand evolution, website rebuild, and sales enablement system — built to compound, convert, and close.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a
            href="#problem"
            className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-accent-light transition-colors duration-200"
          >
            Read the brief
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="#budget"
            className="inline-flex items-center gap-2 border border-border-light text-primary text-sm font-medium px-6 py-3 rounded-sm hover:border-accent hover:text-accent transition-colors duration-200"
          >
            Jump to budget
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-xs text-secondary tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-secondary to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
