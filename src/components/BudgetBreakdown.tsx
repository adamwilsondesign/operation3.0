import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { budgetItems, totalBudget } from '../data/proposal'

export default function BudgetBreakdown() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  return (
    <section
      id="budget"
      ref={ref}
      className="py-24 lg:py-32 px-6 lg:px-8 border-t border-border"
      aria-label="Budget breakdown"
    >
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          Investment
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary tracking-tight mb-16"
        >
          Precise. Accountable. Phased.
        </motion.h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left" aria-label="Budget line items">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-4 text-xs font-semibold tracking-[0.15em] uppercase text-secondary pr-8">Phase</th>
                <th className="pb-4 text-xs font-semibold tracking-[0.15em] uppercase text-secondary pr-8 hidden sm:table-cell">Scope</th>
                <th className="pb-4 text-xs font-semibold tracking-[0.15em] uppercase text-secondary text-right">Investment</th>
              </tr>
            </thead>
            <tbody>
              {budgetItems.map((item, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="border-b border-border hover:bg-surface transition-colors duration-200"
                >
                  <td className="py-5 pr-8 font-medium text-primary text-sm">{item.phase}</td>
                  <td className="py-5 pr-8 text-secondary text-sm hidden sm:table-cell leading-relaxed">{item.description}</td>
                  <td className="py-5 text-right font-mono font-semibold text-primary text-sm">{fmt(item.investment)}</td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot>
              <motion.tr
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <td className="pt-6 font-black text-primary text-lg">Total Investment</td>
                <td className="hidden sm:table-cell" />
                <td className="pt-6 text-right font-mono font-black text-accent text-2xl">{fmt(totalBudget)}</td>
              </motion.tr>
            </tfoot>
          </table>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-secondary text-sm"
        >
          Investment is structured across five phases with milestone-based billing. No large upfront payment required.
        </motion.p>
      </div>
    </section>
  )
}
