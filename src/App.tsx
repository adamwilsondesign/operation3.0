import Nav            from './components/Nav'
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

export default function App() {
  return (
    <div className="relative bg-bg">
      <Nav />
      <main className="lg:ml-60 pt-14 lg:pt-0">
        <Hero />
        <StrategicShift />
        <ProblemSection />
        <RoiEvidence />
        <WhatWeAreBuilding />
        <BudgetBreakdown />
        <PaybackLogic />
        <Timeline />
        <ExecutiveAsk />
        <Closing />
      </main>
    </div>
  )
}
