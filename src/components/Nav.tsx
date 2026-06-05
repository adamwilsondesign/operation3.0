import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { navItems } from '../data/proposal'

const SIDEBAR_W = 240 // px — must match lg:ml-60 in App.tsx

export default function Nav() {
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll-position based active detection (works with snap scroll)
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
        className="hidden lg:flex fixed top-0 left-0 bottom-0 flex-col z-40 bg-primary border-r border-white/[0.07]"
        style={{ width: SIDEBAR_W }}
        aria-label="Site navigation"
      >
        {/* Grid overlay on sidebar */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(to bottom, rgba(255,0,197,0.04) 1px, transparent 1px)',
            backgroundSize: '100% 80px',
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div className="relative z-10 px-6 pt-7 pb-6 border-b border-white/[0.07] flex-shrink-0">
          <a href="#hero" className="flex items-center gap-2.5" aria-label="Back to top">
            <svg viewBox="0 0 56 62" className="h-7 w-auto flex-shrink-0" fill="none" aria-hidden="true">
              <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-white font-black text-[16px] tracking-[-0.03em] lowercase leading-none">lazer</span>
              <span className="text-accent/70 text-[9px] font-mono tracking-[0.18em] uppercase mt-0.5">Proposal</span>
            </div>
          </a>
        </div>

        {/* Nav items */}
        <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5" role="list">
            {navItems.map((item, i) => {
              const isActive = active === item.href.slice(1)
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'location' : undefined}
                    className={[
                      'group flex items-center gap-3 px-3 py-2 rounded-[3px] transition-all duration-200',
                      isActive
                        ? 'bg-white/[0.07] text-white'
                        : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]',
                    ].join(' ')}
                  >
                    {/* Section number */}
                    <span className={[
                      'font-mono text-[10px] tabular flex-shrink-0 w-6 transition-colors duration-200',
                      isActive ? 'text-accent' : 'text-white/20 group-hover:text-white/35',
                    ].join(' ')}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Active indicator bar */}
                    <span
                      className={[
                        'flex-shrink-0 w-[2px] rounded-full transition-all duration-200',
                        isActive ? 'bg-accent h-[14px]' : 'bg-transparent h-[14px]',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    {/* Label */}
                    <span className="text-[11px] font-medium tracking-[0.06em] uppercase">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div className="relative z-10 px-4 pb-6 pt-4 border-t border-white/[0.07] flex-shrink-0">
          <a
            href="#ask"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-black text-[11px] font-semibold tracking-[0.1em] uppercase rounded-[3px] hover:bg-[#FF33D0] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Executive Ask
            <span aria-hidden="true">→</span>
          </a>
          {/* Schematic note */}
          <p className="text-center font-mono text-[8px] text-white/20 tracking-[0.1em] uppercase mt-3">
            CONFIDENTIAL · {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* ── Mobile: top bar with hamburger ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-primary border-b border-white/[0.07] flex items-center justify-between px-5">
        <a href="#hero" className="flex items-center gap-2.5" aria-label="Back to top">
          <svg viewBox="0 0 56 62" className="h-6 w-auto" fill="none" aria-hidden="true">
            <polygon points="14,1 42,1 56,61 0,61" fill="#FF00C5"/>
          </svg>
          <span className="text-white font-black text-[16px] tracking-[-0.03em] lowercase">lazer</span>
        </a>
        <button
          type="button"
          className="flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-[3px] hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={['block w-5 h-[1.5px] bg-white origin-center transition-all duration-200', mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''].join(' ')}/>
          <span className={['block w-5 h-[1.5px] bg-white transition-all duration-200', mobileOpen ? 'opacity-0' : ''].join(' ')}/>
          <span className={['block w-5 h-[1.5px] bg-white origin-center transition-all duration-200', mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''].join(' ')}/>
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-primary border-b border-white/10 py-3">
            <ul className="px-4 flex flex-col gap-0.5">
              {navItems.map((item, i) => {
                const isActive = active === item.href.slice(1)
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={['flex items-center gap-3 px-3 py-2.5 rounded-[3px] text-[11px] font-medium tracking-[0.06em] uppercase transition-colors', isActive ? 'text-accent bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'].join(' ')}
                    >
                      <span className="font-mono text-[10px] text-white/25 w-5">{String(i+1).padStart(2,'0')}</span>
                      {item.label}
                    </a>
                  </li>
                )
              })}
              <li className="mt-2 px-3">
                <a href="#ask" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-black text-[11px] font-semibold tracking-[0.1em] uppercase rounded-[3px]">
                  Executive Ask →
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  )
}
