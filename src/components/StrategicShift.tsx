import { marketShift } from '../data/proposal'
import { SectionReveal } from './ui'

export default function StrategicShift() {

  return (
    <section
      id="market"
      className="snap-section flex flex-col justify-center border-t border-border bg-white"
      aria-labelledby="market-headline"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(66,0,255,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="section-container relative py-8">
        <SectionReveal>
          <p className="eyebrow mb-5">The Opportunity</p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2 id="market-headline" className="text-display-lg font-black text-primary tracking-editorial leading-editorial max-w-[22ch] mb-6">
            {marketShift.headline}
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.14}>
          <p className="text-[15px] text-secondary leading-[1.6] max-w-[50ch] mb-10">
            {marketShift.narrative}
          </p>
        </SectionReveal>

        {/* Positioning statement */}
        <SectionReveal delay={0.2}>
          <div className="border-l-[3px] border-accent pl-6 py-1 mb-10 max-w-[44ch]">
            <p className="text-[18px] lg:text-[20px] font-light text-primary leading-[1.5] tracking-tight">
              {marketShift.positioning}
            </p>
          </div>
        </SectionReveal>

        {/* Focus pills */}
        <SectionReveal delay={0.26}>
          <div>
            <p className="text-[9px] font-semibold tracking-[0.22em] uppercase text-tertiary mb-3">Strategic Focus</p>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {marketShift.focus.map(f => (
                <span key={f} className="px-3 py-1.5 text-[11px] font-semibold tracking-cap uppercase border border-accent/40 text-accent rounded-[3px] bg-accent-dim">
                  {f}
                </span>
              ))}
              <span className="px-3 py-1.5 text-[11px] font-semibold tracking-cap uppercase border border-accent-2/30 text-accent-2 rounded-[3px] bg-accent-2-dim">
                Fintech (supporting)
              </span>
            </div>
            <p className="text-[11px] text-tertiary leading-relaxed max-w-[44ch]">
              Fintech supports the AI sales story. Crypto/Web3 is deprioritized.
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
