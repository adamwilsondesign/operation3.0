import { useState, useCallback } from 'react'
import Nav            from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Hero           from './components/Hero'
import StrategicShift from './components/StrategicShift'
import ProblemSection from './components/ProblemSection'
import RoiEvidence    from './components/RoiEvidence'
import WhatWeAreBuilding from './components/WhatWeAreBuilding'
import BudgetBreakdown   from './components/BudgetBreakdown'
import PaybackLogic   from './components/PaybackLogic'
import Timeline       from './components/Timeline'
import ExecutiveAsk   from './components/ExecutiveAsk'
import Closing        from './components/Closing'
import References     from './components/References'

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
    <div className="relative bg-bg">
      <ScrollProgress />
      <Nav />

      <main>
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

      <References
        isOpen={refsOpen}
        onOpen={openRefs}
        onClose={closeRefs}
        highlightId={highlightRef}
      />
    </div>
  )
}
