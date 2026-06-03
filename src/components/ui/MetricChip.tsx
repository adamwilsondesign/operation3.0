interface MetricChipProps {
  value: string | number
  suffix?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: { value: 'text-2xl', suffix: 'text-base', label: 'text-xs' },
  md: { value: 'text-4xl', suffix: 'text-xl',  label: 'text-sm' },
  lg: { value: 'text-6xl', suffix: 'text-2xl', label: 'text-base' },
}

/**
 * Inline metric display chip.
 * Used for calling out a single KPI inside body copy or cards.
 *
 * Usage:
 *   <MetricChip value={67} suffix="%" label="first-impression opinion" />
 */
export default function MetricChip({ value, suffix, label, size = 'md' }: MetricChipProps) {
  const s = sizeMap[size]

  return (
    <span className="inline-flex flex-col gap-1">
      <span className="flex items-baseline gap-0.5 font-mono tabular">
        <span className={`${s.value} font-black text-accent leading-none`}>{value}</span>
        {suffix && (
          <span className={`${s.suffix} font-bold text-accent/70 leading-none`}>{suffix}</span>
        )}
      </span>
      {label && (
        <span className={`${s.label} text-secondary leading-snug`}>{label}</span>
      )}
    </span>
  )
}
