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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(66,0,255,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* LEFT: headline + narrative */}
          <div>
            <SectionReveal><p className="eyebrow mb-4">The Opportunity</p></SectionReveal>
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
                <p className="font-mono text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">// STRATEGIC_FOCUS</p>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {marketShift.focus.map(f => (
                    <span key={f} className="px-3 py-1.5 text-[11px] font-semibold tracking-cap uppercase border border-accent/40 text-accent rounded-[3px] bg-accent-dim">
                      {f}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 text-[11px] font-semibold tracking-cap uppercase border border-accent-2/30 text-accent-2 rounded-[3px] bg-accent-2-dim">
                    Fintech (supporting)
                  </span>
                </div>
                <p className="text-[11px] text-tertiary leading-relaxed max-w-[38ch]">
                  Fintech supports the AI sales story. Crypto/Web3 is deprioritized.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
