// Registration / alignment marks — crosshair X at each corner
const STROKE = '#C8C8C8'

function Mark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      {/* Horizontal arms */}
      <line x1="0"  y1="10" x2="7"  y2="10" stroke={STROKE} strokeWidth="0.75"/>
      <line x1="13" y1="10" x2="20" y2="10" stroke={STROKE} strokeWidth="0.75"/>
      {/* Vertical arms */}
      <line x1="10" y1="0"  x2="10" y2="7"  stroke={STROKE} strokeWidth="0.75"/>
      <line x1="10" y1="13" x2="10" y2="20" stroke={STROKE} strokeWidth="0.75"/>
      {/* Center ring */}
      <circle cx="10" cy="10" r="2.5" stroke={STROKE} strokeWidth="0.75" fill="none"/>
    </svg>
  )
}

export function CornerMarks() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} aria-hidden="true">
      <div className="absolute top-3 left-3"><Mark /></div>
      <div className="absolute top-3 right-3"><Mark /></div>
      <div className="absolute bottom-3 left-3"><Mark /></div>
      <div className="absolute bottom-3 right-3">
        <Mark />
      </div>
      <span
        style={{
          position: 'absolute',
          bottom: '6px',
          right: '28px',
          fontFamily: '"Roboto Mono", monospace',
          fontSize: '7px',
          color: STROKE,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        © {new Date().getFullYear()} LAZER · CONFIDENTIAL
      </span>
    </div>
  )
}
