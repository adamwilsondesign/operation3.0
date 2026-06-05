import type React from 'react'

const S  = '#B8B8B8'   // primary stroke
const S2 = '#D8D8D8'   // secondary stroke (lighter)
function Cross() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <line x1="0"  y1="11" x2="8"  y2="11" stroke={S} strokeWidth="0.75"/>
      <line x1="14" y1="11" x2="22" y2="11" stroke={S} strokeWidth="0.75"/>
      <line x1="11" y1="0"  x2="11" y2="8"  stroke={S} strokeWidth="0.75"/>
      <line x1="11" y1="14" x2="11" y2="22" stroke={S} strokeWidth="0.75"/>
      <circle cx="11" cy="11" r="2.5" stroke={S} strokeWidth="0.75" fill="none"/>
    </svg>
  )
}

export function CornerMarks({ sectionCode }: { sectionCode?: string }) {
  const mono: React.CSSProperties = {
    fontFamily: '"Roboto Mono", monospace',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    lineHeight: 1,
  }
  const monoSA: React.CSSProperties = { ...mono, color: `rgba(66,0,255,0.5)` }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">

      {/* ── Corner crosshairs ── */}
      <div className="absolute top-2 left-2"><Cross /></div>
      <div className="absolute top-2 right-2"><Cross /></div>
      <div className="absolute bottom-2 left-2"><Cross /></div>
      <div className="absolute bottom-2 right-2"><Cross /></div>

      {/* ── Drawing-sheet frame lines ── */}
      <div style={{ position:'absolute', top:'13px', left:'13px', right:'13px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', bottom:'13px', left:'13px', right:'13px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', left:'13px', top:'13px', bottom:'13px', width:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', right:'13px', top:'13px', bottom:'13px', width:'0.75px', background: S2 }}/>

      {/* ── Edge ticks (decorative only, no exact length calc at static CSS level) ── */}
      {/* Top edge ticks at 25%, 50%, 75% */}
      <div style={{ position:'absolute', left:'calc(25% - 0.375px)', top:'13px', width:'0.75px', height:'6px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(50% - 0.375px)', top:'13px', width:'0.75px', height:'9px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(75% - 0.375px)', top:'13px', width:'0.75px', height:'6px', background: S2 }}/>
      {/* Bottom edge ticks */}
      <div style={{ position:'absolute', left:'calc(25% - 0.375px)', bottom:'13px', width:'0.75px', height:'6px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(50% - 0.375px)', bottom:'13px', width:'0.75px', height:'9px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(75% - 0.375px)', bottom:'13px', width:'0.75px', height:'6px', background: S2 }}/>
      {/* Left edge ticks */}
      <div style={{ position:'absolute', top:'calc(25% - 0.375px)', left:'13px', width:'6px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', top:'calc(50% - 0.375px)', left:'13px', width:'9px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', top:'calc(75% - 0.375px)', left:'13px', width:'6px', height:'0.75px', background: S2 }}/>

      {/* ── Right-side tick ruler with coordinate labels ── */}
      <div style={{ position:'absolute', right:'6px', top:'28px', bottom:'28px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end' }}>
        {[0,25,50,75,100].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:'2px' }}>
            <span style={{ ...mono, fontSize:'6px', color: S2, width:'14px', textAlign:'right' }}>{n}</span>
            <div style={{ width: n%50===0 ? '8px' : '5px', height:'0.75px', background: S2 }}/>
          </div>
        ))}
      </div>

      {/* ── Top bar annotations ── */}
      {/* Top-left: document title */}
      <span style={{ ...mono, position:'absolute', top:'4px', left:'28px', fontSize:'7px', color: S }}>
        LAZER BRAND EVOLUTION v1.0
      </span>
      {/* Top-center: section code in cobalt */}
      {sectionCode && (
        <span style={{ ...monoSA, position:'absolute', top:'4px', left:'50%', transform:'translateX(-50%)', fontSize:'7px', whiteSpace:'nowrap' }}>
          [{sectionCode}]
        </span>
      )}
      {/* Top-right: revision tag */}
      <span style={{ ...mono, position:'absolute', top:'4px', right:'28px', fontSize:'7px', color: S }}>
        REV.A · 2026
      </span>

      {/* ── Bottom annotation bar ── */}
      {/* Bottom-left: confidential + section code fallback */}
      <span style={{ ...mono, position:'absolute', bottom:'4px', left:'28px', fontSize:'7px', color: S }}>
        {sectionCode ? sectionCode : 'EXEC-PROPOSAL'} · CONFIDENTIAL
      </span>
      {/* Bottom-center: dim line annotation */}
      <span style={{ ...monoSA, position:'absolute', bottom:'4px', left:'50%', transform:'translateX(-50%)', fontSize:'6px', whiteSpace:'nowrap' }}>
        ←— W:100% —→
      </span>
      {/* Bottom-right: copyright */}
      <span style={{ ...mono, position:'absolute', bottom:'4px', right:'28px', fontSize:'7px', color: S }}>
        © {new Date().getFullYear()} LAZER TECHNOLOGIES
      </span>

    </div>
  )
}
