import { useState, useCallback } from 'react'
import Nav          from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero          from './components/Hero'
import StrategicShift from './components/StrategicShift'
import ProblemSection from './components/ProblemSection'
import RoiEvidence   from './components/RoiEvidence'
import WhatWeAreBuilding from './components/WhatWeAreBuilding'
import BudgetBreakdown from './components/BudgetBreakdown'
import PaybackLogic  from './components/PaybackLogic'
import Timeline      from './components/Timeline'
import ExecutiveAsk  from './components/ExecutiveAsk'
import Closing       from './components/Closing'
import References    from './components/References'

export default function App() {
  const [refsOpen,     setRefsOpen]     = useState(false)
  const [highlightRef, setHighlightRef] = useState<number | undefined>()

  const openRef = useCallback((id: number) => {
    setHighlightRef(id)
    setRefsOpen(true)
  }, [])

  const openRefs = useCallback(() => {
    setHighlightRef(undefined)
    setRefsOpen(true)
  }, [])

  const closeRefs = useCallback(() => {
    setRefsOpen(false)
    setHighlightRef(undefined)
  }, [])

  return (
    <div className="relative min-h-screen">

      {/* ── Fixed background layers (below all content) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Subtle coordinate grid */}
        <div className="absolute inset-0 bg-grid opacity-100" />
        {/* Film-grain noise */}
        <div className="absolute inset-0 bg-noise opacity-[0.028]" />
        {/* Radial vignette — pulls edges back to true black */}
        <div className="absolute inset-0 bg-vignette" />
      </div>

      {/* ── Global UI chrome ── */}
      <ScrollProgress />
      <Nav />

      {/* ── Page content ── */}
      <main className="relative z-10">
        <Hero />
        <StrategicShift />
        <ProblemSection />
        <RoiEvidence onRefClick={openRef} />
        <WhatWeAreBuilding />
        <BudgetBreakdown />
        <PaybackLogic />
        <Timeline />
        <ExecutiveAsk />
        <Closing />
      </main>

      <footer className="relative z-10">
        <References
          isOpen={refsOpen}
          onOpen={openRefs}
          onClose={closeRefs}
          highlightId={highlightRef}
        />
      </footer>

    </div>
  )
}
