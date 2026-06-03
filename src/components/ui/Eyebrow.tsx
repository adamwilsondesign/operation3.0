import { type ReactNode } from 'react'

interface EyebrowProps {
  children: ReactNode
  className?: string
}

/**
 * Overline / eyebrow label. Sits above section headings.
 * Accent-colored, all-caps, wide tracking.
 */
export default function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p className={`eyebrow mb-5 ${className}`}>
      {children}
    </p>
  )
}
