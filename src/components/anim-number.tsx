// anim-number.tsx · R-113.1
// AnimateNumber wrapper for Example big numbers. Parses display-formatted strings
// like "4.54" / "1,234" / "12,345.78" / "67" into (value, format) so we can ramp
// from 0 to the parsed number while preserving the original display formatting.
//
// Triggers on viewport enter (once), not on mount — so chapters that are below the
// fold ramp visibly as Chris scrolls down. Respects prefers-reduced-motion: when
// reduced, renders the static text instead of running the animation.

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { AnimateNumber } from 'motion-plus/react'

interface AnimNumProps {
  /** Display-formatted text, e.g. "4.54", "1,234", "12,345.78" */
  text: string
  className?: string
  /** Animation duration in seconds, default 1.4 */
  durationS?: number
}

// motion-plus AnimateNumber narrows Intl.NumberFormatOptions['notation'] to
// 'compact' | 'standard'. Pick only the fields we actually set.
type AnimNumberFormat = Pick<
  Intl.NumberFormatOptions,
  'useGrouping' | 'minimumFractionDigits' | 'maximumFractionDigits'
>

interface Parsed {
  value: number
  format: AnimNumberFormat
}

function parseDisplayValue(text: string): Parsed | null {
  const cleaned = text.replace(/,/g, '')
  const value = parseFloat(cleaned)
  if (Number.isNaN(value)) return null

  const hasGrouping = text.includes(',')
  const dotIdx = text.indexOf('.')
  const fractionDigits = dotIdx === -1 ? 0 : text.length - dotIdx - 1

  return {
    value,
    format: {
      useGrouping: hasGrouping,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    },
  }
}

// R-114.1 · motion-plus AnimateNumber renders each digit position into a
// fixed-width Mask and scrolls a column of 0-9 inside it. With proportional
// fonts (Geist, EB Garamond, Ma Shan Zheng — basically every non-mono face we
// route to) digit char widths differ, so the Mask under-sizes and digits
// overlap. Forcing OpenType `tnum` + `tabular-nums` makes the active variant
// render every digit at the same advance width, which the Mask sizing relies on.
const TABULAR_STYLE: React.CSSProperties = {
  fontFeatureSettings: '"tnum" 1, "lnum" 1',
  fontVariantNumeric: 'tabular-nums lining-nums',
  letterSpacing: 0,
}

export function AnimNum({ text, className, durationS = 1.4 }: AnimNumProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reducedMotion = useReducedMotion()

  const parsed = parseDisplayValue(text)

  // Unparseable strings or reduced-motion users: render static text.
  if (!parsed || reducedMotion) {
    return (
      <span ref={ref} className={className} style={TABULAR_STYLE}>
        {text}
      </span>
    )
  }

  return (
    <span ref={ref} className={className} style={TABULAR_STYLE}>
      <AnimateNumber
        transition={{ duration: durationS, ease: [0.2, 0.7, 0.1, 1] }}
        format={parsed.format}
        style={TABULAR_STYLE}
      >
        {isInView ? parsed.value : 0}
      </AnimateNumber>
    </span>
  )
}
