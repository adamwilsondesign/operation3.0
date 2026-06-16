import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../data/proposal'

const SIDEBAR_W = 240

export default function Nav() {
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sectionEls = navItems
      .map(item => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[]
    if (!sectionEls.length) return
    const update = () => {
      const mid = window.scrollY + window.innerHeight * 0.5
      let best = sectionEls[0]
      for (const el of sectionEls) {
        if (el.offsetTop <= mid) best = el
      }
      setActive(best.id)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 bottom-0 flex-col z-40 bg-primary border-r border-white/[0.08]"
        style={{ width: SIDEBAR_W }}
        aria-label="Site navigation"
      >
        {/* Blueprint micro-grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, rgba(66,0,255,0.05) 1px, transparent 1px),
              linear-gradient(to right,  rgba(66,0,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100% 80px, 40px 100%',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative z-10 px-6 pt-7 pb-5 border-b border-white/[0.08] flex-shrink-0">
          <a href="#hero" className="flex items-center gap-3 group" aria-label="Back to top">
            <svg viewBox="0 0 56 62" className="h-7 w-auto flex-shrink-0 transition-transform duration-200 group-hover:scale-105" fill="none" aria-hidden="true">
              <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
            </svg>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-black text-[15px] tracking-[-0.04em] lowercase leading-none">lazer</span>
              <span className="text-accent/60 text-[8px] font-mono tracking-[0.22em] uppercase">Proposal</span>
            </div>
          </a>
        </div>

        {/* Nav items */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-px" role="list">
            {navItems.map((item, i) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={[
                      'group relative flex items-center gap-3 px-3 py-2.5 rounded-[2px]',
                      'transition-colors duration-150',
                      isActive ? 'text-white' : 'text-white/35 hover:text-white/75',
                    ].join(' ')}
                  >
                    {/* Sliding background */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-bg-pill"
                        className="absolute inset-0 rounded-[2px] bg-white/[0.07]"
                        transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                      />
                    )}
                    {/* Hover background */}
                    <span className="absolute inset-0 rounded-[2px] bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-150" aria-hidden="true" />

                    {/* Number */}
                    <span className={[
                      'relative z-10 font-mono text-[9px] tabular flex-shrink-0 w-6 transition-colors duration-150',
                      isActive ? 'text-accent' : 'text-white/20 group-hover:text-white/40',
                    ].join(' ')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Sliding accent bar */}
                    <span className="relative z-10 flex-shrink-0 w-[2px] h-[14px] overflow-hidden rounded-full">
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-accent rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                        />
                      )}
                    </span>

                    {/* Label */}
                    <span className="relative z-10 text-[10.5px] font-medium tracking-[0.08em] uppercase leading-none">
                      {item.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="relative z-10 px-4 pb-6 pt-4 border-t border-white/[0.08] flex-shrink-0">
          <a
            href="#ask"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-black text-[10.5px] font-bold tracking-[0.12em] uppercase rounded-[2px] hover:bg-[#FF33D0] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Executive Ask
            <span aria-hidden="true">→</span>
          </a>
          <p className="text-center font-mono text-[7.5px] text-white/20 tracking-[0.14em] uppercase mt-3">
            CONFIDENTIAL · {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* ── Mobile: top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-primary border-b border-white/[0.08] flex items-center justify-between px-5">
        <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Back to top">
          <svg viewBox="0 0 56 62" className="h-6 w-auto transition-transform duration-200 group-hover:scale-105" fill="none" aria-hidden="true">
            <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
          </svg>
          <span className="text-white font-black text-[15px] tracking-[-0.04em] lowercase">lazer</span>
        </a>
        <button
          type="button"
          className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-[2px] hover:bg-white/10 active:bg-white/15 transition-colors duration-150"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <motion.span
            className="block w-5 bg-white rounded-full"
            style={{ height: '1.5px' }}
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 3.5 : 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 bg-white rounded-full"
            style={{ height: '1.5px' }}
            animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 bg-white rounded-full"
            style={{ height: '1.5px' }}
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -3.5 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden fixed inset-0 z-30 bg-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-primary border-b border-white/10 py-3"
            >
              <ul className="px-4 flex flex-col gap-0.5">
                {navItems.map((item, i) => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          'flex items-center gap-3 px-3 py-2.5 rounded-[2px] transition-colors duration-150',
                          isActive ? 'text-accent bg-white/[0.06]' : 'text-white/55 hover:text-white hover:bg-white/[0.04]',
                        ].join(' ')}
                      >
                        <span className="font-mono text-[9px] text-white/25 w-5 tabular">{String(i+1).padStart(2,'0')}</span>
                        <span className="text-[10.5px] font-medium tracking-[0.08em] uppercase">{item.label}</span>
                      </a>
                    </li>
                  )
                })}
                <li className="mt-2 px-3">
                  <a href="#ask" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-black text-[10.5px] font-bold tracking-[0.12em] uppercase rounded-[2px] active:scale-[0.98] transition-transform duration-150">
                    Executive Ask →
                  </a>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
