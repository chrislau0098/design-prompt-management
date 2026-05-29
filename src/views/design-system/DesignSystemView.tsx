import { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { injectCSSVars } from './oklch'
import { Atomic } from './Atomic'
import { Molecular } from './Molecular'
import { HeroComposition } from './HeroComposition'
import { Ornaments } from './Ornaments'
import { loadLatestPromptMd } from '../design-prompt/glob-loader'
import { parsePromptOrnaments } from '@/lib/parse-prompt-ornaments'
import { parseDialsFromQuery, dialsToQueryString, DEFAULT_DIALS } from '@/lib/default-dials'
import type { DefaultDialSet } from '@/lib/default-dials'
import { STYLE_PRESETS } from '@/lib/default-style-presets'
import { applyDefaultDials } from '@/lib/default-tokens'
import { loadFontFamily, applyFontStack } from '@/lib/default-fonts'
import { dialsToDsSlot } from '@/lib/default-ds-slot'
import { DialPanel } from '@/views/default-example/DialPanel'
import './styles.css'

interface DesignSystemViewProps {
  styleKey: string
  slot: Record<string, any>
}

// ── Default DS View ────────────────────────────────────────────────────────────
// Renders the full DS view for styleKey='default' with live dial controls.
// Derives slot from URL query params; shares URL state with DefaultExampleView.

function DefaultDesignSystemView() {
  const [dials, setDials] = useState<DefaultDialSet>(() =>
    parseDialsFromQuery(new URLSearchParams(window.location.search))
  )
  const canvasRef = useRef<HTMLDivElement>(null)

  // R-102 G7.1 · Load default v0.1.md once and parse ornament list for filtering
  const [defaultPromptMd, setDefaultPromptMd] = useState<string>('')
  useEffect(() => {
    loadLatestPromptMd('default').then(setDefaultPromptMd)
  }, [])
  const visibleOrnaments = useMemo(
    () => parsePromptOrnaments(defaultPromptMd),
    [defaultPromptMd],
  )

  // Apply tokens + font to scoped canvas element
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    loadFontFamily(dials.font_family)
    applyFontStack(dials.font_family, el)
    applyDefaultDials(dials, el)
  }, [dials])

  // Sync URL (shared SoT with DefaultExampleView tab)
  const pushUrl = useCallback((next: DefaultDialSet) => {
    history.pushState(null, '', dialsToQueryString(next))
  }, [])

  function updateDial<K extends keyof DefaultDialSet>(key: K, value: DefaultDialSet[K]) {
    setDials((prev) => {
      if (key === 'font_family') {
        const family = value as DefaultDialSet['font_family']
        const preset = STYLE_PRESETS[family]
        const next = { ...prev, font_family: family, ...preset }
        pushUrl(next)
        return next
      }
      const next = { ...prev, [key]: value }
      pushUrl(next)
      return next
    })
  }

  // Also listen for popstate so that when user navigates back/forward the dials update
  useEffect(() => {
    function onPop() {
      setDials(parseDialsFromQuery(new URLSearchParams(window.location.search)))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const slot = dialsToDsSlot(dials) as Record<string, any>
  const meta = slot.style_meta as Record<string, any>

  return (
    <div className="default-example-root" style={{ display: 'flex', alignItems: 'stretch', minHeight: '100%' }}>
      <div ref={canvasRef} className="ds-canvas-scope" style={{ flex: 1, minWidth: 0 }}>
        <div className="ds-container">
          {/* Meta panel */}
          <section className="meta-panel">
            <div className="meta-row">
              <div className="meta-row-label">Ground Truth Signature</div>
              <div className="meta-row-value">{meta?.ground_truth_signature}</div>
            </div>
            <div className="meta-row">
              <div className="meta-row-label">Decorative Pack · Focal Strategy</div>
              <div className="meta-row-value">{meta?.decorative_pack} · {meta?.focal_numeral_strategy}</div>
            </div>
            <div className="meta-row">
              <div className="meta-row-label">Mode · Brand Hue · Density</div>
              <div className="meta-row-value">{meta?.mode} · H {meta?.brand_hue?.toFixed?.(1) ?? meta?.brand_hue} · {slot.patterned?.density_lead}</div>
            </div>
            <div className="meta-row">
              <div className="meta-row-label">Hero Shader</div>
              <div className="meta-row-value">
                {slot.molecular?.hero_shader?.component ?? 'none'} · {slot.molecular?.hero_geometry?.default_treatment}
              </div>
            </div>
            <div className="meta-row">
              <div className="meta-row-label">Font Family · Radius</div>
              <div className="meta-row-value">
                {dials.font_family} · {dials.radius}
              </div>
            </div>
            <div className="meta-proposition">{meta?.description_zh || meta?.proposition}</div>
          </section>

          {/* M-01 Color + M-02b Font Inventory + M-02 Typography + M-05 RSS
              R-119 · FontInventory 通过 fontFamily prop 由 Atomic 渲染,
              位置在 Atomic 内部 Typography (字号节奏) 上方. */}
          <Atomic slot={slot} fontFamily={dials.font_family} />

          {/* M-03 Charts */}
          <Molecular slot={slot} />

          {/* M-04 Hero Composition */}
          <HeroComposition slot={slot} />

          {/* M-06 Ornaments + M-07 Decorative Pack — filtered by default Prompt md */}
          <Ornaments slot={slot} styleKey="default" visible={visibleOrnaments} />
        </div>
      </div>
      <DialPanel
        dials={dials}
        onChange={updateDial}
        onReset={() => {
          setDials(DEFAULT_DIALS)
          pushUrl(DEFAULT_DIALS)
        }}
      />
    </div>
  )
}

// ── FixedDesignSystemView (6 fixed styles) ────────────────────────────────────

function FixedDesignSystemView({ styleKey, slot }: DesignSystemViewProps) {
  // Inject OKLCH CSS vars into :root (existing behaviour for fixed styles)
  useEffect(() => {
    injectCSSVars(slot)
  }, [slot])

  const meta = slot.style_meta

  // R-101 Phase 3 · load current style's latest Prompt md → parse ornament list
  const [promptMd, setPromptMd] = useState<string>('')
  useEffect(() => {
    loadLatestPromptMd(styleKey).then(setPromptMd)
  }, [styleKey])
  const visible = useMemo(() => parsePromptOrnaments(promptMd), [promptMd])
  const visibleList = Array.from(visible)

  return (
    <div className="ds-container fixed-style-scope">
      {/* Meta panel */}
      <section className="meta-panel">
        <div className="meta-row">
          <div className="meta-row-label">Ground Truth Signature</div>
          <div className="meta-row-value">{meta?.ground_truth_signature}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Decorative Pack · Focal Strategy</div>
          <div className="meta-row-value">{meta?.decorative_pack} · {meta?.focal_numeral_strategy}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Mode · Brand Hue · Density</div>
          <div className="meta-row-value">{meta?.mode} · H {meta?.brand_hue} · {slot.patterned?.density_lead}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Hero Shader</div>
          <div className="meta-row-value">
            {slot.molecular?.hero_shader?.component} · {slot.molecular?.hero_geometry?.default_treatment}
          </div>
        </div>
        <div className="meta-proposition">{meta?.description_zh || meta?.proposition}</div>
        {/* R-101 Phase 3 · Prompt-driven ornament chip strip */}
        {visibleList.length > 0 && (
          <div className="meta-row" style={{ marginTop: 12, alignItems: 'flex-start' }}>
            <div className="meta-row-label">Prompt 涉及装饰</div>
            <div className="meta-row-value" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {visibleList.map((name) => (
                <span key={name} className="ornament-chip">{name}</span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* M-01 Color + M-02b FontInventory (R-122) + M-02 Typography + M-05 RSS */}
      <Atomic slot={slot} fontFamily={styleKey as any} />

      {/* M-03 Charts */}
      <Molecular slot={slot} />

      {/* M-04 Hero Composition */}
      <HeroComposition slot={slot} />

      {/* M-06 Ornaments + M-07 Decorative Pack — R-122 · 传 visible 让 fixed 也按 prompt md filter */}
      <Ornaments slot={slot} styleKey={styleKey} visible={visible} />
    </div>
  )
}

// ── DesignSystemView (public entry point) ─────────────────────────────────────

export function DesignSystemView({ styleKey, slot }: DesignSystemViewProps) {
  if (styleKey === 'default') {
    return <DefaultDesignSystemView />
  }
  return <FixedDesignSystemView styleKey={styleKey} slot={slot} />
}
