// R-100 fix #5 · Shared ChartTooltipCard for DS view + Report Example
// R-113.8 · Mode-aware text colors. Recharts Tooltip wrapper can escape the
// `.report-canvas-scope.dark` subtree (Recharts portals it for positioning),
// causing `var(--fg)` to fall back to :root and render dark text on dark bg.
// We consume ReportModeContext (when provided by DefaultEmbedView) and hard-
// code mode-correct hex colors so legibility is preserved no matter where the
// tooltip wrapper ends up in the DOM. Fixed styles (no provider) keep the
// original CSS-variable behavior unchanged.

import * as React from 'react'
import { useReportMode } from '@/components/report-mode-context'

interface TooltipPayloadEntry {
  name?: string
  value?: number | string
  payload?: { name?: string }
}

interface ChartTooltipCardProps {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string | number
  pack: string
}

// R-113.8 · Mode-explicit color tokens. Used to harden inline styles against
// Recharts wrapper escaping the `.report-canvas-scope.dark` subtree.
const MODE_COLORS = {
  light: {
    bg:      '#fafbfc',
    surface: '#f0f2f5',
    border:  'rgba(20, 28, 40, 0.22)',
    fg:      '#11151c',
    fg2:     '#4a5260',
    fg3:     '#838b95',
  },
  dark: {
    bg:      '#0e1115',
    surface: '#1c2026',
    border:  'rgba(240, 244, 248, 0.28)',
    fg:      '#e5e8ed',
    fg2:     '#a8aeb6',
    fg3:     '#76808c',
  },
} as const

export function ChartTooltipCard({ active, payload, label, pack }: ChartTooltipCardProps) {
  const mode = useReportMode() // null when used in fixed style (no provider)
  if (!active || !payload || !payload.length) return null

  const stylesByPack: Record<string, React.CSSProperties> = {
    editorial: {
      background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12,
      boxShadow: '0 4px 16px color-mix(in oklch, var(--fg) 6%, transparent)',
      padding: '12px 16px', minWidth: 140, fontFamily: 'var(--sans-stack)',
    },
    theatrical: {
      background: 'var(--surface-l2)', border: '1px solid color-mix(in oklch, var(--fg) 10%, transparent)',
      borderRadius: 6,
      boxShadow: '0 0 0 1px color-mix(in oklch, var(--primary) 14%, transparent), 0 8px 24px color-mix(in oklch, var(--primary) 12%, transparent)',
      padding: '10px 14px', minWidth: 140, fontFamily: 'var(--sans-stack)',
    },
    instrumental: {
      background: 'var(--surface-l2)', border: '1px solid var(--border-strong)',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 0 0 oklch(1 0 0 / 0.06), 0 2px 8px oklch(0 0 0 / 0.20)',
      padding: '10px 12px', minWidth: 130, fontFamily: 'var(--mono-stack)',
    },
    systematic: {
      background: 'var(--bg)', border: '1px solid var(--border-strong)',
      borderRadius: 0, boxShadow: 'none', padding: '10px 14px', minWidth: 130,
      fontFamily: 'var(--sans-stack)',
    },
    'festive-royal': {
      background: 'var(--bg)', border: '1px solid color-mix(in oklch, var(--primary) 30%, var(--border))',
      borderRadius: 2, boxShadow: '0 6px 20px color-mix(in oklch, var(--primary) 20%, transparent)',
      padding: '10px 14px', minWidth: 130, fontFamily: 'var(--sans-stack)',
    },
    'festive-editorial': {
      background: 'var(--bg)', border: '1px solid var(--border-strong)',
      borderRadius: 0, boxShadow: 'none', padding: '10px 14px', minWidth: 130,
      fontFamily: 'var(--sans-stack)',
    },
  }

  const labelStyles: Record<string, React.CSSProperties> = {
    editorial:           { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
    theatrical:          { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
    instrumental:        { color: 'var(--fg-3)', fontSize: 9,  letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 },
    systematic:          { color: 'var(--fg)',   fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 },
    'festive-royal':     { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
    'festive-editorial': { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
  }

  const valueStyles: Record<string, React.CSSProperties> = {
    editorial:           { color: 'var(--fg)',      fontSize: 15, fontWeight: 500, fontFamily: 'var(--display-stack)', letterSpacing: '-0.01em' },
    theatrical:          { color: 'var(--primary)', fontSize: 16, fontWeight: 600, fontFamily: 'var(--display-stack)' },
    instrumental:        { color: 'var(--fg)',      fontSize: 13, fontWeight: 500, fontFeatureSettings: '"tnum","lnum"' },
    systematic:          { color: 'var(--fg)',      fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans-stack)', letterSpacing: '-0.005em' },
    'festive-royal':     { color: 'var(--primary)', fontSize: 16, fontWeight: 700, fontFamily: 'var(--display-stack)' },
    'festive-editorial': { color: 'var(--primary)', fontSize: 18, fontWeight: 300, fontFamily: 'var(--display-stack)', letterSpacing: '-0.02em' },
  }

  const s  = stylesByPack[pack]  ?? stylesByPack.editorial
  const ls = labelStyles[pack]   ?? labelStyles.editorial
  const vs = valueStyles[pack]   ?? valueStyles.editorial

  // R-113.8 · If ReportModeContext is set (default style), override the
  // CSS-variable colors with mode-explicit hex so the tooltip remains legible
  // even when Recharts portals the wrapper out of `.report-canvas-scope.dark`.
  const colors = mode ? MODE_COLORS[mode] : null
  const containerOverride: React.CSSProperties = colors
    ? { background: colors.bg, borderColor: colors.border, color: colors.fg }
    : {}
  const labelOverride: React.CSSProperties = colors ? { color: colors.fg3 } : {}
  const valueOverride: React.CSSProperties = colors ? { color: colors.fg } : {}
  const nameOverride: React.CSSProperties = colors ? { color: colors.fg3 } : { color: 'var(--fg-3)' }

  return (
    <div style={{ ...s, ...containerOverride }}>
      {label != null && <div style={{ ...ls, ...labelOverride }}>{String(label)}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {payload.map((p: any, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontSize: 11, fontFamily: 'var(--mono-stack)', letterSpacing: '0.04em', ...nameOverride }}>
              {p.name ?? p.dataKey}
            </span>
            <span style={{ ...vs, ...valueOverride }}>
              {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function buildTooltipProps(pack: string) {
  return {
    cursor:
      pack === 'systematic'
        ? { stroke: 'var(--border-strong)', strokeDasharray: '2 2', fill: 'transparent' }
        : { fill: 'var(--chart-hover)' },
    wrapperStyle: { outline: 'none' },
    // recharts content signature is loose; cast props locally to inject pack
    content: (props: any) => <ChartTooltipCard {...props} pack={pack} />,
  }
}
