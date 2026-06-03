import { useEffect, useState } from 'react'

/**
 * Animates a number from 0 → target when isInView becomes true.
 * Returns a formatted string with the given decimal places.
 * If reduced motion is preferred, returns the final value immediately.
 */
export function useCountUp(
  target: number,
  decimals: number,
  isInView: boolean,
  reduced: boolean | null,
  duration = 1500,
): string {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (reduced) { setVal(target); return }
    if (!isInView) return

    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // cubic ease-out
      setVal(eased * target)
      if (t < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, target, decimals, reduced, duration])

  return decimals > 0 ? val.toFixed(decimals) : String(Math.round(val))
}
