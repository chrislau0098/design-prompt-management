import { useState } from 'react'
import { motion } from 'motion/react'
import * as PaperShaders from '@paper-design/shaders-react'
import { Hero as DefaultHero } from '@/views/report-example/Hero'

interface HeroCompositionProps {
  slot: Record<string, any>
}

type Treatment = 'asymmetric-split' | 'full-bleed-monolith' | 'typographic-field'

const HERO_MOCK: Record<string, any> = {
  warm: {
    eyebrow: 'VIBE VIEW · 2026 ANNUAL CAMPAIGN',
    title: '暖光承载 · 数字说话',
    prefix: '¥', number: '36.5', unit: '亿',
    lead: '一份象牙暖光的年度战报。暖橙余烬从 Hero 辐射开来,每一处指标都由 humanist sans 的中性号字承载——克制而自信。',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: 'ISSUE', value: 'No. 03' }, { label: 'PAGES', value: '12 chapters' },
      { label: 'AUDIT', value: '2026·05·21' }, { label: 'AUTHOR', value: 'Vibe view DS' },
    ],
  },
  theatre: {
    eyebrow: 'Q1 SALES PERFORMANCE · 2026',
    title: 'Single accent disciplined',
    prefix: '¥', number: '36.5', unit: '亿',
    lead: '一座暗调剧场,数字在 Hermès orange 单橙强调下表演。Double-Bezel cards 提供 depth,Spotlight 自顶倾泻——克制即奢华。',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: 'ACT', value: '01' }, { label: 'CUE', value: 'spotlight·top-center' },
      { label: 'AUDIT', value: '2026·05·21' },
    ],
  },
  cool: {
    eyebrow: 'INSTRUMENT PANEL · Q1 2026',
    title: 'Signal blue, structural light',
    prefix: '', number: '36.5', unit: '亿',
    lead: '一面深色仪表盘。白色 display number 主导,electric blue 仅作 signal accent。GodRays 自上方倾射,drawn-horizon 在数字与背景之间画下结构线。',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: 'CHANNEL', value: 'A1' }, { label: 'LOCK', value: 'tnum · ss03' },
      { label: 'TS', value: '2026·05·21 14:02 UTC+8' },
    ],
  },
  swiss: {
    eyebrow: 'ANNUAL CAMPAIGN · 2026',
    title: 'ANNUAL CAMPAIGN',
    prefix: '¥', number: '36.5', unit: '亿',
    lead: '',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: 'GRID', value: '12 col · 8px base' }, { label: 'TYPE', value: 'Inter · 600' },
      { label: 'ACCENT', value: 'cobalt #1E3FB0' },
    ],
  },
  'festive-royal': {
    eyebrow: '年度战报 · 2026 ANNUAL CAMPAIGN',
    title: '金红庆典 · 数字领衔',
    prefix: '¥', number: '36.5', unit: '亿',
    lead: '一份深红庆典战报。金色衬线数字从深红地基浮现，GrainGradient 呼吸于 Hero，印章与金线为章节赋予仪式感。大气、考究、朝代尊贵。',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: '期号', value: 'No. 01' }, { label: '章节', value: '8 chapters' },
      { label: '日期', value: '2026·05·24' }, { label: '出品', value: 'Vibe view DS' },
    ],
  },
  'festive-editorial': {
    eyebrow: '年度战报 · 2026 ANNUAL CAMPAIGN',
    title: '暖光承载 · 数字说话',
    prefix: '¥', number: '36.5', unit: '亿',
    lead: '一份杂志风庆典战报。精致轻盈，暖橙与金线交织，章节节奏清晰。',
    delta: { dir: 'up', value: '18.2%', label: 'YoY' },
    meta: [
      { label: '期号', value: 'No. 01' }, { label: '章节', value: '8 chapters' },
      { label: '日期', value: '2026·05·24' },
    ],
  },
}

function clampPx(value: number | null | undefined, maxVal: number): number {
  return Math.min(value || maxVal, maxVal)
}

/* ─── normalizeShaderProps (paper-shaders API normalization) ─── */
function normalizeShaderProps(componentName: string, rawProps: Record<string, any>): Record<string, any> {
  const props = { ...rawProps }
  if (componentName === 'Dithering') {
    if (typeof props.type === 'string') {
      const t = props.type.toLowerCase()
      if (t.includes('8x8') || t.includes('8×8')) props.type = '8x8'
      else if (t.includes('4x4') || t.includes('4×4')) props.type = '4x4'
      else if (t.includes('2x2') || t.includes('2×2')) props.type = '2x2'
      else if (t.includes('random')) props.type = 'random'
    }
    if (typeof props.shape === 'string') {
      const s = props.shape.toLowerCase()
      const valid = ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere']
      if (!valid.includes(s)) {
        props.shape = s === 'noise' ? 'simplex' : 'sphere'
      } else {
        props.shape = s
      }
    }
    if (props.pxSize !== undefined && props.size === undefined) props.size = props.pxSize
    delete props.pxSize
  }
  delete props.speed_off_viewport
  return props
}

/* ─── ShaderBackground ─── */
function ShaderBackground({ shader }: { shader: any }) {
  if (!shader?.component) {
    return (
      <div className="shader-fallback-inner">
        <div style={{ textAlign: 'center', fontFamily: 'var(--mono-stack)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          Shader Fallback — CSS Gradient<br />
          <span style={{ color: 'var(--fg-3)', fontSize: 9 }}>no shader spec</span>
        </div>
      </div>
    )
  }

  const normalizedProps = normalizeShaderProps(shader.component, shader.props ?? {})
  const Comp = (PaperShaders as any)[shader.component]

  if (!Comp) {
    return (
      <div className="shader-fallback-inner">
        <div style={{ textAlign: 'center', fontFamily: 'var(--mono-stack)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          {shader.component} not found
        </div>
      </div>
    )
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cleanProps = { ...normalizedProps }
  if (reducedMotion) cleanProps.speed = 0

  return (
    <div className="hero-shader-mount" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Comp {...cleanProps} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

/* ─── HeroContent (three treatments) ─── */
function HeroContent({ slot, treatment, styleKey }: {
  slot: Record<string, any>
  treatment: Treatment
  styleKey: string
}) {
  const t = slot.atomic?.typography
  const mt = slot.atomic?.motion_timing
  const mock = HERO_MOCK[styleKey] ?? HERO_MOCK.warm

  if (!t || !mt) return null

  const baseDuration = ((mt.entrance_ms_range?.[1] || 900)) / 1000
  const stagger = mt.stagger_children_s || 0.1
  const ease = mt.ease_out || [0.18, 0.85, 0.22, 1]
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const Wrap = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
    if (reducedMotion) return <div>{children}</div>
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: baseDuration, delay, ease }}
      >
        {children}
      </motion.div>
    )
  }

  const displayPx = clampPx(t.display_number_lg, 156)
  const titlePx = t.hero_title_lg
    ? clampPx(t.hero_title_lg, 80)
    : clampPx(t.page_title_lg || 48, 64)

  const eyebrow = (
    <div key="eb" className="hero-eyebrow" style={{ letterSpacing: `${t.eyebrow_tracking_em}em`, fontSize: t.eyebrow_px }}>
      {mock.eyebrow}
    </div>
  )

  const title = mock.title ? (
    <h1 key="t" className="hero-title" style={{ fontSize: titlePx, fontFamily: t.hero_title_lg ? 'var(--sans-stack)' : 'var(--display-stack)' }}>
      {mock.title}
    </h1>
  ) : null

  const displayNumber = (
    <div key="dn" className="hero-display-number" style={{ fontSize: displayPx, lineHeight: t.display_lh, letterSpacing: `${t.display_ls_em}em` }}>
      {mock.prefix && <span className="prefix" style={{ fontSize: displayPx * 0.55 }}>{mock.prefix}</span>}
      <span className="num">{mock.number}</span>
      {mock.unit && <span className="unit" style={{ fontSize: displayPx * 0.32 }}>{mock.unit}</span>}
    </div>
  )

  const delta = (
    <div key="d" className="hero-delta">
      <span>{mock.delta.dir === 'up' ? '▲' : '▼'}</span>
      <span>{mock.delta.value}</span>
      {mock.delta.label && <span style={{ opacity: 0.7, fontWeight: 400, marginLeft: 4 }}>{mock.delta.label}</span>}
    </div>
  )

  const lead = mock.lead ? (
    <p key="l" className="hero-lead" style={{ fontSize: t.lead_paragraph_lg || 18 }}>{mock.lead}</p>
  ) : null

  const metaList = (mock.meta ?? []).map((m: any, i: number) => (
    <div key={`m${i}`} className="hero-meta-row">
      <div className="hero-meta-label">{m.label}</div>
      <div className="hero-meta-value">{m.value}</div>
    </div>
  ))

  if (treatment === 'asymmetric-split') {
    return (
      <>
        <div className="hero-asym-main">
          <Wrap delay={0}>{eyebrow}</Wrap>
          {title && <Wrap delay={stagger}>{title}</Wrap>}
          {lead && <Wrap delay={stagger * 2}>{lead}</Wrap>}
          <Wrap delay={stagger * 3}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              {displayNumber}
              {delta}
            </div>
          </Wrap>
        </div>
        {metaList.length > 0 && (
          <aside className="hero-asym-aside">
            {metaList.map((node: React.ReactNode, i: number) => (
              <Wrap key={i} delay={stagger * (4 + i * 0.5)}>{node}</Wrap>
            ))}
          </aside>
        )}
      </>
    )
  }

  if (treatment === 'full-bleed-monolith') {
    return (
      <div className="hero-mono-stack">
        <Wrap delay={0}>{eyebrow}</Wrap>
        <Wrap delay={stagger}>{displayNumber}</Wrap>
        {delta && <Wrap delay={stagger * 1.5}>{delta}</Wrap>}
        {title && <Wrap delay={stagger * 2}>{title}</Wrap>}
        {lead && <Wrap delay={stagger * 3}>{lead}</Wrap>}
      </div>
    )
  }

  if (treatment === 'typographic-field') {
    const pageTitlePx = clampPx(t.page_title_lg || t.hero_title_lg || 96, 120)
    const swissHeadline = (
      <div className="hero-type-headline" style={{ fontSize: pageTitlePx }}>
        {(mock.title || 'ANNUAL CAMPAIGN').toUpperCase()}
      </div>
    )
    return (
      <>
        <Wrap delay={0}>{eyebrow}</Wrap>
        <Wrap delay={stagger}>{swissHeadline}</Wrap>
        <div className="hero-type-footer">
          <Wrap delay={stagger * 2}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {displayNumber}
              {delta}
            </div>
          </Wrap>
          {metaList.length > 0 && (
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginLeft: 'auto' }}>
              {metaList.map((node: React.ReactNode, i: number) => (
                <Wrap key={i} delay={stagger * (2.5 + i * 0.5)}>{node}</Wrap>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  return <div>{displayNumber}</div>
}

// R-106 Fix 1 (CRITICAL) · default style routes through the same Example <Hero>
// component to guarantee visual parity between Example and DS view.
function DefaultStyleHeroBlock({ slot }: { slot: Record<string, any> }) {
  return (
    <section className="section" id="m-shader">
      <div className="section-header">
        <span className="section-num">M-04</span>
        <h2 className="section-title">Hero Section · Composition</h2>
        <span className="section-desc">shader + typography + decoration + motion · synced with Example</span>
      </div>
      <div className="hero-stage" id="hero-stage" style={{ padding: 0, overflow: 'hidden' }}>
        <DefaultHero pack="default" slot={slot} />
      </div>
    </section>
  )
}

export function HeroComposition({ slot }: HeroCompositionProps) {
  // Default style: route to single-source-of-truth <Hero> from the Example.
  // Fixed styles (6) keep the legacy multi-treatment HeroComposition below.
  if (slot.style_meta?.decorative_pack === 'default') {
    return <DefaultStyleHeroBlock slot={slot} />
  }

  const styleKey = slot.style_meta?.style_handle?.replace('-restraint-tech', '') || 'warm'
  const defaultTreatment = slot.molecular?.hero_geometry?.default_treatment as Treatment ?? 'asymmetric-split'
  const [treatment, setTreatment] = useState<Treatment>(defaultTreatment)

  const pack = slot.style_meta?.decorative_pack ?? 'editorial'
  const shader = slot.molecular?.hero_shader
  const material = slot.atomic?.material

  const washClass = `hero-wash${pack === 'theatrical' ? ' theatrical' : pack === 'instrumental' ? ' instrumental' : ''}`
  const showNoise = pack === 'instrumental' && material?.noise_overlay === 'svg-feturbulence'

  const showHorizon =
    pack === 'instrumental' &&
    slot.molecular?.hero_geometry?.extra_svg_layer === 'drawn-horizon' &&
    treatment !== 'asymmetric-split'

  const treatments: Treatment[] = ['asymmetric-split', 'full-bleed-monolith', 'typographic-field']
  const shaderName = shader?.component
    ? `${shader.component} · ${slot.molecular?.hero_geometry?.default_treatment}`
    : 'no shader'

  return (
    <section className="section" id="m-shader">
      <div className="section-header">
        <span className="section-num">M-04</span>
        <h2 className="section-title">Hero Section · Composition</h2>
        <span className="section-desc">shader + typography + decoration + motion · live composition</span>
      </div>

      <div className="shader-status ok">
        <span className="dot" />
        <span>{shaderName}</span>
      </div>

      <div className="hero-controls">
        <span className="hero-controls-label">Composition</span>
        <div className="hero-toggle-group" role="tablist">
          {treatments.map((t) => (
            <button
              key={t}
              type="button"
              className={treatment === t ? 'active' : ''}
              onClick={() => setTreatment(t)}
            >
              {t.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>
        <span className="hero-controls-label">default: {defaultTreatment}</span>
      </div>

      <div className="hero-stage" id="hero-stage">
        <ShaderBackground shader={shader} />

        <div
          className={pack === 'systematic' ? 'hero-wash' : washClass}
          style={pack === 'systematic' ? { background: 'transparent' } : undefined}
        />

        {showNoise && <div className="hero-noise" />}

        {showHorizon && (
          <div className="hero-horizon">
            <svg viewBox="0 0 1440 14" preserveAspectRatio="none" aria-hidden="true" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="hero-horizon-grad" x1="0" x2="1">
                  <stop offset="0" stopColor="var(--primary)" stopOpacity={0} />
                  <stop offset="0.18" stopColor="var(--primary)" stopOpacity={0.55} />
                  <stop offset="0.82" stopColor="var(--primary)" stopOpacity={0.55} />
                  <stop offset="1" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <line x1="0" y1="7" x2="1440" y2="7" stroke="url(#hero-horizon-grad)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="115" y1="3" x2="115" y2="11" stroke="var(--primary)" strokeOpacity={0.6} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="1325" y1="3" x2="1325" y2="11" stroke="var(--primary)" strokeOpacity={0.6} strokeWidth="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        )}

        <div className={`hero-content t-${treatment}`}>
          <HeroContent slot={slot} treatment={treatment} styleKey={styleKey} />
        </div>

        <div className="shader-overlay">{shaderName}</div>
      </div>

      {shader && (
        <div className="shader-props">
          {`<${shader.component}\n${Object.entries(normalizeShaderProps(shader.component, shader.props ?? {}))
            .map(([k, v]) => `  ${k}={${typeof v === 'string' ? `"${v}"` : JSON.stringify(v)}}`)
            .join('\n')}\n/>`}
        </div>
      )}
    </section>
  )
}
