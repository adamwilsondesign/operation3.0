// Registration marks — 4-corner technical drawing flourish
export function CornerMarks({ label }: { label?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      {/* Top-left */}
      <div className="absolute top-3 left-3 flex items-start gap-1.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="5" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <line x1="7" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-border-mid"/>
        </svg>
        {label && <span className="font-mono text-[8px] text-border-mid tracking-[0.15em] uppercase leading-none mt-0.5">{label}</span>}
      </div>
      {/* Top-right */}
      <div className="absolute top-3 right-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="0" x2="6" y2="5" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <line x1="0" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-border-mid"/>
        </svg>
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-3 left-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="7" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <line x1="7" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-border-mid"/>
        </svg>
      </div>
      {/* Bottom-right */}
      <div className="absolute bottom-3 right-3 flex items-end gap-1.5 flex-row-reverse">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <line x1="6" y1="7" x2="6" y2="12" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <line x1="0" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="0.75" className="text-border-mid"/>
          <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeWidth="0.75" fill="none" className="text-border-mid"/>
        </svg>
        <span className="font-mono text-[8px] text-border-mid tracking-[0.1em] leading-none mb-0.5">© {new Date().getFullYear()} LAZER</span>
      </div>
    </div>
  )
}
