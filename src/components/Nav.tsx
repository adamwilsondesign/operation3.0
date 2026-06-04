import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/proposal'

export default function Nav() {
  const [active,     setActive]     = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const sections = navItems
      .map(item => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
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

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 bg-primary border-b border-white/10"
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between h-[56px]">

          {/* Wordmark */}
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Back to top">
            <svg viewBox="0 0 56 62" className="h-6 w-auto flex-shrink-0" fill="none" aria-hidden="true">
              <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
            </svg>
            <span className="text-white font-black text-[17px] tracking-[-0.03em] lowercase">lazer</span>
            <span className="text-white/30 text-xs font-normal tracking-[0.12em] uppercase ml-1">Proposal</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5" role="list">
            {navItems.map(item => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={[
                      'relative flex flex-col items-center px-2.5 py-1.5 rounded-[3px]',
                      'text-[10px] font-medium tracking-[0.1em] uppercase transition-colors duration-200',
                      isActive ? 'text-accent' : 'text-white/50 hover:text-white/80',
                    ].join(' ')}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                    <span
                      className={['absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent transition-opacity duration-200', isActive ? 'opacity-100' : 'opacity-0'].join(' ')}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right CTA */}
          <div className="flex items-center gap-2">
            <a
              href="#ask"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] uppercase text-primary bg-accent px-3.5 py-2 rounded-[3px] hover:bg-accent-light transition-colors duration-200"
            >
              Executive Ask <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-[3px] hover:bg-white/10 transition-colors duration-200"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span className={['block w-5 h-[1.5px] bg-white origin-center transition-all duration-200', mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''].join(' ')} />
              <span className={['block w-5 h-[1.5px] bg-white transition-all duration-200', mobileOpen ? 'opacity-0' : ''].join(' ')} />
              <span className={['block w-5 h-[1.5px] bg-white origin-center transition-all duration-200', mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''].join(' ')} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
            <motion.div id="mobile-menu" key="panel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="fixed top-[56px] left-0 right-0 z-40 lg:hidden bg-primary border-b border-white/10 py-3">
              <ul className="section-container flex flex-col gap-0.5" role="list">
                {navItems.map(item => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <button type="button" onClick={() => handleNavClick(item.href)} className={['w-full flex items-center justify-between px-3 py-2.5 rounded-[3px] text-left text-[11px] font-medium tracking-[0.1em] uppercase transition-colors duration-200', isActive ? 'text-accent bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'].join(' ')} aria-current={isActive ? 'location' : undefined}>
                        {item.label}
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />}
                      </button>
                    </li>
                  )
                })}
                <li className="mt-2">
                  <a href="#ask" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-primary text-[11px] font-semibold tracking-[0.1em] uppercase rounded-[3px] hover:bg-accent-light transition-colors duration-200">
                    Executive Ask <span aria-hidden="true">→</span>
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
