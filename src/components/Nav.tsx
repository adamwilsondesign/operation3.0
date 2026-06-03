import { useEffect, useState } from 'react'
import { navItems } from '../data/proposal'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map(item => document.querySelector(item.href))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-[2px] left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-border' : ''
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <span className="text-primary font-semibold tracking-tight text-sm">Lazer <span className="text-secondary font-normal">/ Proposal</span></span>
        <ul className="hidden md:flex items-center gap-6" role="list">
          {navItems.map(item => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
                  active === item.href.slice(1)
                    ? 'text-accent'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#ask"
          className="text-xs font-semibold tracking-wide uppercase bg-accent text-white px-4 py-2 rounded-sm hover:bg-accent-light transition-colors duration-200"
        >
          Executive Ask
        </a>
      </div>
    </nav>
  )
}
