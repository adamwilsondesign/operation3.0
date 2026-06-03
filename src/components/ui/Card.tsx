import { type ReactNode, type ElementType, type ComponentPropsWithoutRef } from 'react'

type CardVariant = 'base' | 'elevated' | 'accent' | 'glass'

const variantClass: Record<CardVariant, string> = {
  base:     'card',
  elevated: 'card-elevated',
  accent:   'card-accent',
  glass:    'card-glass',
}

type CardProps<T extends ElementType = 'div'> = {
  variant?: CardVariant
  as?: T
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className' | 'as'>

/**
 * Polymorphic premium card primitive.
 *
 * Variants:
 *   base     — matte dark surface, subtle border
 *   elevated — slightly lighter surface, inset top highlight
 *   accent   — cobalt tint + glow, for highlighted calls-to-action
 *   glass    — frosted glass effect over the grid background
 *
 * Usage:
 *   <Card variant="accent" className="p-8">…</Card>
 *   <Card as="article" variant="elevated" className="p-6">…</Card>
 */
export default function Card<T extends ElementType = 'div'>({
  variant = 'base',
  as,
  children,
  className = '',
  ...rest
}: CardProps<T>) {
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag className={[variantClass[variant], className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
