import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../data/proposal'

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [active,      setActive]      = useState('')
  const [mobileOpen,  setMobileOpen]  = useState(false)

  // Track scroll state for nav opacity/blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = navItems
      .map(item => document.querySelector<HTMLElement>(item.href))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on ESC
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    // Small delay so the menu closes before scrolling
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [])

  return (
    <>
      {/* ── Main nav bar ── */}
      <nav
        className={[
          'fixed top-[2px] left-0 right-0 z-40',
          'transition-all duration-400',
          scrolled
            ? 'bg-bg/85 backdrop-blur-xl border-b border-border'
            : 'bg-transparent',
        ].join(' ')}
        aria-label="Main navigation"
      >
        <div className="section-container flex items-center justify-between h-[60px]">

          {/* Left: Wordmark */}
          <a
            href="#hero"
            className="flex items-baseline gap-[6px] group"
            aria-label="Back to top"
          >
            <span className="text-primary text-sm font-semibold tracking-tight group-hover:text-primary/80 transition-colors duration-250">
              LAZER
            </span>
            <span className="text-border-light text-sm leading-none">/</span>
            <span className="text-tertiary text-xs font-normal tracking-cap uppercase">
              Proposal
            </span>
          </a>

          {/* Center: Desktop nav links */}
          <ul
            className="hidden lg:flex items-center gap-1"
            role="list"
          >
            {navItems.map(item => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={[
                      'relative flex flex-col items-center',
                      'px-3 py-1.5 rounded-[2px]',
                      'text-[10.5px] font-medium tracking-cap uppercase',
                      'transition-colors duration-250',
                      isActive
                        ? 'text-accent'
                        : 'text-tertiary hover:text-secondary',
                    ].join(' ')}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                    {/* Active dot indicator */}
                    <span
                      className={[
                        'absolute -bottom-[3px] left-1/2 -translate-x-1/2',
                        'w-[3px] h-[3px] rounded-full bg-accent',
                        'transition-opacity duration-250',
                        isActive ? 'opacity-100' : 'opacity-0',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#ask"
              className={[
                'hidden sm:inline-flex items-center gap-1.5',
                'text-[10.5px] font-semibold tracking-cap uppercase',
                'text-white bg-accent',
                'px-4 py-2 rounded-[2px]',
                'hover:bg-accent-light transition-colors duration-250',
              ].join(' ')}
            >
              Executive Ask
              <span aria-hidden="true" className="text-white/60">→</span>
            </a>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-[2px] hover:bg-surface transition-colors duration-250"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={[
                  'block w-5 h-[1.5px] bg-secondary origin-center transition-all duration-250',
                  mobileOpen ? 'translate-y-[3.5px] rotate-45' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-[1.5px] bg-secondary transition-all duration-250',
                  mobileOpen ? 'opacity-0 scale-x-50' : '',
                ].join(' ')}
              />
              <span
                className={[
                  'block w-5 h-[1.5px] bg-secondary origin-center transition-all duration-250',
                  mobileOpen ? '-translate-y-[3.5px] -rotate-45' : '',
                ].join(' ')}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-bg/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              id="mobile-menu"
              key="panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className={[
                'fixed top-[62px] left-0 right-0 z-40 lg:hidden',
                'bg-surface border-b border-border',
                'pt-4 pb-6',
              ].join(' ')}
            >
              <ul
                className="section-container flex flex-col gap-0.5"
                role="list"
              >
                {navItems.map(item => {
                  const isActive = active === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.href)}
                        className={[
                          'w-full flex items-center justify-between',
                          'px-4 py-3 rounded-[2px] text-left',
                          'text-xs font-medium tracking-cap uppercase',
                          'transition-colors duration-250',
                          isActive
                            ? 'text-accent bg-accent-dim'
                            : 'text-secondary hover:text-primary hover:bg-surface-2',
                        ].join(' ')}
                        aria-current={isActive ? 'location' : undefined}
                      >
                        {item.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  )
                })}

                <li className="mt-4 px-0">
                  <a
                    href="#ask"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white text-xs font-semibold tracking-cap uppercase rounded-[2px] hover:bg-accent-light transition-colors duration-250"
                  >
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
