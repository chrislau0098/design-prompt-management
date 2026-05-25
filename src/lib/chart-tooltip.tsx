// R-100 fix #5 · Shared ChartTooltipCard for DS view + Report Example
// Previously TrendChapter only set cursor/wrapperStyle and fell back to recharts
// default Tooltip (unstyled) while Molecular (DS) had a full per-pack styled
// ChartTooltipCard. Three-Way Sync principle 12 violation. This module is now
// the single source of truth — both views import it.

import * as React from 'react'

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

export function ChartTooltipCard({ active, payload, label, pack }: ChartTooltipCardProps) {
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

  return (
    <div style={s}>
      {label != null && <div style={ls}>{String(label)}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {payload.map((p: any, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--mono-stack)', letterSpacing: '0.04em' }}>
              {p.name ?? p.dataKey}
            </span>
            <span style={vs}>
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
