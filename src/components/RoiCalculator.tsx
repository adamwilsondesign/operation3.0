import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RoiCalculator() {
  const [avgDeal, setAvgDeal] = useState(50000)
  const [dealsPerMonth, setDealsPerMonth] = useState(3)
  const [conversionLift, setConversionLift] = useState(20)

  const monthlyRevenueLift = avgDeal * dealsPerMonth * (conversionLift / 100)
  const annualLift = monthlyRevenueLift * 12
  const investment = 150000
  const paybackMonths = investment / monthlyRevenueLift

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <div className="mt-16 p-8 lg:p-12 border border-border rounded-sm bg-surface-2">
      <h3 className="text-xl font-bold text-primary mb-2">Payback Calculator</h3>
      <p className="text-secondary text-sm mb-10">Adjust the inputs to model your scenario.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <label className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary">Avg Deal Size</span>
          <input
            type="range"
            min={10000}
            max={500000}
            step={5000}
            value={avgDeal}
            onChange={e => setAvgDeal(Number(e.target.value))}
            className="accent-blue-600 w-full"
            aria-label="Average deal size"
          />
          <span className="font-mono font-bold text-primary text-lg">{fmt(avgDeal)}</span>
        </label>

        <label className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary">Deals / Month</span>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={dealsPerMonth}
            onChange={e => setDealsPerMonth(Number(e.target.value))}
            className="accent-blue-600 w-full"
            aria-label="Deals per month"
          />
          <span className="font-mono font-bold text-primary text-lg">{dealsPerMonth}</span>
        </label>

        <label className="flex flex-col gap-3">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary">Conversion Lift</span>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={conversionLift}
            onChange={e => setConversionLift(Number(e.target.value))}
            className="accent-blue-600 w-full"
            aria-label="Conversion rate improvement percentage"
          />
          <span className="font-mono font-bold text-primary text-lg">{conversionLift}%</span>
        </label>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-20 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary mb-2">Monthly Revenue Lift</p>
          <motion.p
            key={monthlyRevenueLift}
            initial={{ opacity: 0.5, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-black font-mono text-primary"
          >
            {fmt(monthlyRevenueLift)}
          </motion.p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary mb-2">Annual Revenue Lift</p>
          <motion.p
            key={annualLift}
            initial={{ opacity: 0.5, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-black font-mono text-accent"
          >
            {fmt(annualLift)}
          </motion.p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary mb-2">Payback Period</p>
          <motion.p
            key={paybackMonths}
            initial={{ opacity: 0.5, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-2xl font-black font-mono text-primary"
          >
            {isFinite(paybackMonths) ? `${Math.ceil(paybackMonths)} months` : '—'}
          </motion.p>
        </div>
      </div>
    </div>
  )
}
