// OKLCH helpers — migrated from reference index.html (line 4948-4958)

export type OklchArr = [number, number, number] | [number, number, number, number]
export type OklchObj = { L: number; C: number; H?: number }
export type ColorVal = OklchArr | OklchObj | null

export const oklch3 = (arr: OklchArr): string =>
  `oklch(${arr[0]} ${arr[1]} ${arr[2]}${arr[3] !== undefined ? ` / ${arr[3]}` : ''})`

export const lc = (obj: OklchObj | null, h: number): string | null =>
  obj === null ? null : `oklch(${obj.L} ${obj.C} ${h})`

export function fmtOKLCH(arr: ColorVal, h: number): string {
  if (Array.isArray(arr)) {
    if (arr.length === 4) return `${arr[0]} ${arr[1]} ${arr[2]} / ${arr[3]}`
    return `${arr[0]} ${arr[1]} ${arr[2]}`
  }
  if (arr && typeof arr === 'object') return `${arr.L} ${arr.C} ${h}`
  return '—'
}

/** Inject OKLCH CSS custom properties into an element's style (defaults to :root) */
export function injectCSSVars(slot: Record<string, unknown>, element?: HTMLElement): void {
  const root = element ?? document.documentElement
  const c = (slot as any).atomic?.color
  const t = (slot as any).atomic?.typography
  const r = (slot as any).atomic?.radius
  if (!c || !t || !r) return

  const nh: number = c.neutral_hue
  const fh: number = c.foreground_hue ?? nh
  const bh: number = (slot as any).style_meta?.brand_hue ?? nh

  root.style.setProperty('--bg', oklch3([...c.background.slice(0, 2), nh] as OklchArr))
  root.style.setProperty('--surface-l1', oklch3([...c.surface_l1.slice(0, 2), nh] as OklchArr))
  root.style.setProperty('--surface-l2', oklch3([...c.surface_l2.slice(0, 2), nh] as OklchArr))
  root.style.setProperty('--surface-l3', oklch3([...c.surface_l3.slice(0, 2), nh] as OklchArr))
  root.style.setProperty('--fg', oklch3([...c.foreground.slice(0, 2), fh] as OklchArr))
  root.style.setProperty('--fg-2', oklch3([...c.foreground_2.slice(0, 2), fh] as OklchArr))
  root.style.setProperty('--fg-3', oklch3([...c.foreground_3.slice(0, 2), fh] as OklchArr))
  root.style.setProperty('--border', oklch3([c.border[0], c.border[1], c.border[2], c.border[3]]))
  root.style.setProperty('--border-strong', oklch3([c.border_strong[0], c.border_strong[1], c.border_strong[2], c.border_strong[3]]))
  root.style.setProperty('--primary', lc(c.primary, bh) ?? '')
  root.style.setProperty('--primary-hl', lc(c.primary_hl, bh) ?? '')
  root.style.setProperty('--primary-soft', c.primary_soft ? (lc(c.primary_soft, bh) ?? '') : 'transparent')
  root.style.setProperty('--primary-wash', c.primary_wash ? oklch3([c.primary_wash[0], c.primary_wash[1], c.primary_wash[2], c.primary_wash[3]]) : 'transparent')
  root.style.setProperty('--ambient-ink', c.ambient_ink ? oklch3([c.ambient_ink[0], c.ambient_ink[1], c.ambient_ink[2], c.ambient_ink[3]]) : 'transparent')

  // chart ramp: chart-1 = primary, chart-2~5 = chart_ramp
  root.style.setProperty('--chart-1', lc(c.primary, bh) ?? '')
  ;(c.chart_ramp as OklchObj[]).forEach((v, i) => {
    root.style.setProperty(`--chart-${i + 2}`, lc(v, (v as any).H ?? bh) ?? '')
  })
  root.style.setProperty('--chart-hover', oklch3([c.chart_hover[0], c.chart_hover[1], c.chart_hover[2], c.chart_hover[3]]))

  // typography stacks
  root.style.setProperty('--sans-stack', t.sans_stack.map((f: string) => f.includes(' ') ? `"${f}"` : f).join(', '))
  root.style.setProperty('--display-stack', t.display_stack.map((f: string) => f.includes(' ') ? `"${f}"` : f).join(', '))
  root.style.setProperty('--mono-stack', t.mono_stack.map((f: string) => f.includes(' ') ? `"${f}"` : f).join(', '))

  // radius
  root.style.setProperty('--radius-pill', r.pill === 'rounded-full' ? '9999px' : '0')
  root.style.setProperty('--radius-panel', `${r.sharp_panel_max_px}px`)
  root.style.setProperty('--radius-card', r.card_chrome === 'double-bezel' ? '6px' : `${r.card_chrome}px`)
}
