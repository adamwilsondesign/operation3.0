import { type ReactNode } from 'react'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  /** Suppress the default top border divider */
  noBorder?: boolean
  /** Override the default surface background */
  surface?: 'default' | 'raised'
}

/**
 * Consistent section wrapper. Provides:
 * - Semantic <section> with id for anchor navigation
 * - Standard vertical padding and container centering
 * - Optional top border divider
 * - Consistent max-width content column
 */
export default function Section({ id, children, className = '', noBorder = false, surface }: SectionProps) {
  const bg =
    surface === 'raised' ? 'bg-surface' :
    surface === 'default' ? 'bg-bg' :
    ''

  return (
    <section
      id={id}
      className={[
        'py-28 lg:py-36',
        noBorder ? '' : 'border-t border-border',
        bg,
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
}
