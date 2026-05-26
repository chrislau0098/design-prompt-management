// default-tokens.ts · R-102 Phase 4.9
// Dial set → CSS custom properties. B-direction ramp: brand_color as anchor + lightness_shift offset.
// neutral_temperature removed — neutralC always branded: 0.008 (light) / 0.012 (dark).

import type { DefaultDialSet, DialRadius } from './default-dials'
import { hexToOKLCH, oklchToHex } from './color-utils'

const RADIUS_PX: Record<DialRadius, number> = {
  sharp: 0,
  crisp: 2,
  soft: 6,
  friendly: 12,
  playful: 16,
}

function oklch(L: number, C: number, H: number, alpha?: number): string {
  const lStr = L.toFixed(4)
  const cStr = C.toFixed(4)
  const hStr = H.toFixed(2)
  if (alpha !== undefined) {
    return `oklch(${lStr} ${cStr} ${hStr} / ${alpha})`
  }
  return `oklch(${lStr} ${cStr} ${hStr})`
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, val))
}

export function dialsToTokens(dials: DefaultDialSet): Record<string, string> {
  const { mode, brand_color, lightness_shift } = dials
  const isLight = mode === 'light'

  // B-direction: extract OKLCH from user's brand_color
  const { L: pL, C: pC, H: pH } = hexToOKLCH(brand_color)

  // lightness_shift: -100~+100 → maps to ±0.15 L offset on primary
  const shift = lightness_shift / 100   // -1 ~ +1
  const primaryL = clamp(pL + shift * 0.15, 0.30, 0.70)
  const primaryC = pC

  // neutral C: always branded — 0.008 (light) / 0.012 (dark)
  const neutralC = isLight ? 0.008 : 0.012

  // Chart ramp: anchor at primaryL, descend L and C
  const chart1L = primaryL
  const chart2L = clamp(primaryL + 0.07, 0.30, 0.78)
  const chart3L = clamp(primaryL - 0.03, 0.25, 0.75)
  const chart4L = clamp(primaryL - 0.13, 0.20, 0.70)
  const chart5L = clamp(primaryL - 0.23, 0.15, 0.65)

  const chart1C = primaryC
  const chart2C = clamp(primaryC - 0.02, 0.02, 0.22)
  const chart3C = clamp(primaryC - 0.06, 0.02, 0.22)
  const chart4C = clamp(primaryC - 0.10, 0.02, 0.22)
  const chart5C = clamp(primaryC - 0.14, 0.02, 0.22)

  const tokens: Record<string, string> = {}

  if (isLight) {
    // Light ramp
    tokens['--background']    = oklch(0.985, neutralC, pH)
    tokens['--surface-l1']    = oklch(0.985, neutralC, pH)
    tokens['--surface-l2']    = oklch(0.965, neutralC, pH)
    tokens['--surface-l3']    = oklch(0.935, neutralC, pH)
    tokens['--foreground']    = oklch(0.14,  0.008, pH)
    tokens['--foreground-2']  = oklch(0.42,  0.008, pH)
    tokens['--foreground-3']  = oklch(0.62,  0.008, pH)
    tokens['--border']        = oklch(0.14,  0.008, pH, 0.10)
    tokens['--border-strong'] = oklch(0.14,  0.008, pH, 0.22)
    tokens['--primary']       = oklch(primaryL, primaryC, pH)
    tokens['--primary-hl']    = oklch(clamp(primaryL + 0.10, 0.30, 0.78), primaryC, pH)
    tokens['--primary-soft']  = oklch(0.92, clamp(primaryC, 0, 0.04), pH)
    tokens['--primary-glow']  = oklch(primaryL, primaryC, pH, 0.15)
    tokens['--chart-1']       = oklch(chart1L, chart1C, pH)
    tokens['--chart-2']       = oklch(chart2L, chart2C, pH)
    tokens['--chart-3']       = oklch(chart3L, chart3C, pH)
    tokens['--chart-4']       = oklch(chart4L, chart4C, pH)
    tokens['--chart-5']       = oklch(chart5L, chart5C, pH)
    tokens['--chart-hover']   = oklch(0.14,  0.008, pH, 0.05)
    tokens['--quote-bg']      = oklch(0.965, neutralC, pH)
    tokens['--outro-bg']      = oklch(0.985, neutralC, pH)
  } else {
    // Dark ramp — symmetric L-flip; primary lifted for dark contrast
    const darkPrimaryL = clamp(primaryL + 0.10, 0.42, 0.72)

    tokens['--background']    = oklch(0.10,  neutralC, pH)
    tokens['--surface-l1']    = oklch(0.12,  neutralC, pH)
    tokens['--surface-l2']    = oklch(0.14,  neutralC, pH)
    tokens['--surface-l3']    = oklch(0.17,  neutralC, pH)
    tokens['--foreground']    = oklch(0.92,  0.006, pH)
    tokens['--foreground-2']  = oklch(0.70,  0.006, pH)
    tokens['--foreground-3']  = oklch(0.50,  0.006, pH)
    tokens['--border']        = oklch(0.92,  0.006, pH, 0.14)
    tokens['--border-strong'] = oklch(0.92,  0.006, pH, 0.28)
    tokens['--primary']       = oklch(darkPrimaryL, primaryC, pH)
    tokens['--primary-hl']    = oklch(clamp(darkPrimaryL + 0.10, 0.42, 0.82), primaryC, pH)
    tokens['--primary-soft']  = oklch(0.20, clamp(primaryC, 0, 0.04), pH)
    tokens['--primary-glow']  = oklch(darkPrimaryL, primaryC, pH, 0.18)
    tokens['--chart-1']       = oklch(clamp(chart1L + 0.10, 0.40, 0.78), chart1C, pH)
    tokens['--chart-2']       = oklch(clamp(chart2L + 0.08, 0.40, 0.78), chart2C, pH)
    tokens['--chart-3']       = oklch(clamp(chart3L + 0.08, 0.35, 0.75), chart3C, pH)
    tokens['--chart-4']       = oklch(clamp(chart4L + 0.08, 0.30, 0.70), chart4C, pH)
    tokens['--chart-5']       = oklch(clamp(chart5L + 0.08, 0.25, 0.65), chart5C, pH)
    tokens['--chart-hover']   = oklch(0.92,  0.006, pH, 0.05)
    tokens['--quote-bg']      = oklch(0.14,  neutralC, pH)
    tokens['--outro-bg']      = oklch(0.10,  neutralC, pH)
  }

  // short-name aliases
  tokens['--bg']   = tokens['--background']
  tokens['--fg']   = tokens['--foreground']
  tokens['--fg-2'] = tokens['--foreground-2']
  tokens['--fg-3'] = tokens['--foreground-3']

  // semantic accent extras (accent_strategy=semantic)
  if (dials.accent_strategy === 'semantic') {
    tokens['--success']     = isLight ? 'oklch(0.52 0.15 145)' : 'oklch(0.65 0.15 145)'
    tokens['--warning']     = isLight ? 'oklch(0.58 0.16 78)'  : 'oklch(0.70 0.16 78)'
    tokens['--destructive'] = isLight ? 'oklch(0.50 0.20 27)'  : 'oklch(0.65 0.20 27)'
  }

  return tokens
}

export function applyDefaultDials(dials: DefaultDialSet, scopeEl: HTMLElement): void {
  const tokens = dialsToTokens(dials)

  for (const [prop, val] of Object.entries(tokens)) {
    scopeEl.style.setProperty(prop, val)
  }

  // Radius
  const radiusPx = RADIUS_PX[dials.radius]
  scopeEl.style.setProperty('--radius-panel', `${radiusPx}px`)
  scopeEl.style.setProperty('--radius-card', `${radiusPx}px`)
  scopeEl.style.setProperty('--radius-pill', '9999px')

  // Dark mode class — scoped to the report canvas, not <html>
  if (dials.mode === 'dark') {
    scopeEl.classList.add('dark')
  } else {
    scopeEl.classList.remove('dark')
  }
}

// Expose for testing / reporting
export { hexToOKLCH, oklchToHex }
