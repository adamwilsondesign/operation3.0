import type React from 'react'

const S  = '#AAAAAA'                 // primary stroke
const S2 = '#CCCCCC'                 // secondary stroke
const CB = 'rgba(66,0,255,0.45)'     // cobalt annotation

function Cross() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line x1="0"  y1="12" x2="9"  y2="12" stroke={S} strokeWidth="0.75"/>
      <line x1="15" y1="12" x2="24" y2="12" stroke={S} strokeWidth="0.75"/>
      <line x1="12" y1="0"  x2="12" y2="9"  stroke={S} strokeWidth="0.75"/>
      <line x1="12" y1="15" x2="12" y2="24" stroke={S} strokeWidth="0.75"/>
      <circle cx="12" cy="12" r="3"    stroke={S} strokeWidth="0.75" fill="none"/>
      <circle cx="12" cy="12" r="0.75" fill={S}/>
    </svg>
  )
}

export function CornerMarks({ sectionCode }: { sectionCode?: string }) {
  const mono: React.CSSProperties = {
    fontFamily: '"Roboto Mono", monospace',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    lineHeight: 1,
  }
  const monoSA: React.CSSProperties = { ...mono, color: CB }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">

      {/* ── Corner crosshairs ── */}
      <div className="absolute top-2 left-2"><Cross /></div>
      <div className="absolute top-2 right-2"><Cross /></div>
      <div className="absolute bottom-2 left-2"><Cross /></div>
      <div className="absolute bottom-2 right-2"><Cross /></div>

      {/* ── Frame lines ── */}
      <div style={{ position:'absolute', top:'14px',    left:'14px',  right:'14px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', bottom:'14px', left:'14px',  right:'14px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', left:'14px',   top:'14px', bottom:'14px',  width:'0.75px',  background: S2 }}/>
      <div style={{ position:'absolute', right:'14px',  top:'14px', bottom:'14px',  width:'0.75px',  background: S2 }}/>

      {/* ── Top edge ticks ── */}
      <div style={{ position:'absolute', left:'calc(25% - 0.375px)', top:'14px', width:'0.75px', height:'5px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(50% - 0.375px)', top:'14px', width:'0.75px', height:'8px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(75% - 0.375px)', top:'14px', width:'0.75px', height:'5px', background: S2 }}/>
      {[25, 50, 75].map(n => (
        <span key={n} style={{ ...mono, position:'absolute', top:'23px', left:`calc(${n}% + 2px)`, fontSize:'5.5px', color: S2 }}>
          {n}
        </span>
      ))}

      {/* ── Bottom edge ticks ── */}
      <div style={{ position:'absolute', left:'calc(25% - 0.375px)', bottom:'14px', width:'0.75px', height:'5px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(50% - 0.375px)', bottom:'14px', width:'0.75px', height:'8px', background: S2 }}/>
      <div style={{ position:'absolute', left:'calc(75% - 0.375px)', bottom:'14px', width:'0.75px', height:'5px', background: S2 }}/>

      {/* ── Left edge ticks ── */}
      <div style={{ position:'absolute', top:'calc(25% - 0.375px)', left:'14px', width:'5px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', top:'calc(50% - 0.375px)', left:'14px', width:'8px', height:'0.75px', background: S2 }}/>
      <div style={{ position:'absolute', top:'calc(75% - 0.375px)', left:'14px', width:'5px', height:'0.75px', background: S2 }}/>

      {/* ── Right-side ruler with coordinate labels ── */}
      <div style={{ position:'absolute', right:'5px', top:'26px', bottom:'26px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end' }}>
        {[0,25,50,75,100].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:'2px' }}>
            <span style={{ ...mono, fontSize:'5.5px', color: S2, width:'16px', textAlign:'right' }}>{n}</span>
            <div style={{ width: n % 50 === 0 ? '7px' : '4px', height:'0.75px', background: S2 }}/>
          </div>
        ))}
      </div>

      {/* ── Left-side ruler (ticks only, no labels) ── */}
      <div style={{ position:'absolute', left:'5px', top:'26px', bottom:'26px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-start' }}>
        {[0,25,50,75,100].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center' }}>
            <div style={{ width: n % 50 === 0 ? '7px' : '4px', height:'0.75px', background: S2 }}/>
          </div>
        ))}
      </div>

      {/* ── Top annotations ── */}
      <span style={{ ...mono, position:'absolute', top:'5px', left:'30px', fontSize:'7px', color: S }}>
        LAZER BRAND EVOLUTION v1.0
      </span>
      {sectionCode && (
        <span style={{ ...monoSA, position:'absolute', top:'5px', left:'50%', transform:'translateX(-50%)', fontSize:'7px', whiteSpace:'nowrap' }}>
          [{sectionCode}]
        </span>
      )}
      <span style={{ ...mono, position:'absolute', top:'5px', right:'30px', fontSize:'7px', color: S }}>
        REV.A · 2026
      </span>

      {/* ── Bottom annotations ── */}
      <span style={{ ...mono, position:'absolute', bottom:'5px', left:'30px', fontSize:'7px', color: S }}>
        {sectionCode ? sectionCode : 'EXEC-PROPOSAL'} · CONFIDENTIAL
      </span>
      <span style={{ ...monoSA, position:'absolute', bottom:'5px', left:'50%', transform:'translateX(-50%)', fontSize:'6px', whiteSpace:'nowrap' }}>
        ←— W:100% —→
      </span>
      <span style={{ ...mono, position:'absolute', bottom:'5px', right:'30px', fontSize:'7px', color: S }}>
        © {new Date().getFullYear()} LAZER TECHNOLOGIES
      </span>

    </div>
  )
}
