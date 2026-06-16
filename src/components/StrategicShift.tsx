import { marketShift } from '../data/proposal'
import { SectionReveal } from './ui'
import { CornerMarks } from './CornerMarks'

export default function StrategicShift() {

  return (
    <section
      id="market"
      className="snap-section flex flex-col justify-center border-t border-border bg-surface"
      aria-labelledby="market-headline"
    >
      <CornerMarks />

      <div className="section-container relative py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: headline + narrative */}
          <div>
            <SectionReveal>
              <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/50 uppercase mb-2">// MKT.001 · MARKET_ANALYSIS</p>
              <p className="eyebrow mb-4">The Opportunity</p>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <h2 id="market-headline" className="text-display-lg font-black text-primary tracking-editorial leading-editorial max-w-[22ch] mb-5">
                {marketShift.headline}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.14}>
              <p className="text-[15px] text-secondary leading-[1.5] max-w-[42ch]">
                {marketShift.narrative}
              </p>
            </SectionReveal>
          </div>

          {/* RIGHT: positioning quote + pills */}
          <div className="flex flex-col gap-8">
            <SectionReveal delay={0.2}>
              <div className="border-l-[3px] border-accent pl-6 py-1">
                <p className="text-[17px] lg:text-[19px] font-light text-primary leading-[1.45] tracking-tight">
                  {marketShift.positioning}
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.26}>
              <div>
                <p className="font-mono text-[8px] tracking-[0.2em] text-accent-2/60 uppercase mb-3">// STRATEGIC_FOCUS · PRIMARY_VERTICALS</p>
                <div className="flex flex-wrap items-center gap-2">
                  {marketShift.focus.map((f, i) => (
                    <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold tracking-[0.08em] uppercase border border-accent/40 text-accent rounded-[3px] bg-accent-dim">
                      <span className="font-mono text-[8px] opacity-50">{String(i+1).padStart(2,'0')}</span>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
