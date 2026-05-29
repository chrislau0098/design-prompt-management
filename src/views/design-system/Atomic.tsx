import { fmtOKLCH, type OklchObj } from './oklch'
import { FontInventory, type FontInventoryKey } from './FontInventory'

interface AtomicProps {
  slot: Record<string, any>
  /** R-119 / R-122 · 透传 font_family (default) or styleKey (fixed) — Atomic
      在 Typography section 之上渲染 FontInventory. 不传则不渲染. */
  fontFamily?: FontInventoryKey
}

/* ─── Swatch group ─── */
function SwatchGroup({ items }: { items: Array<{ name: string; value: any; h: number; css: string }> }) {
  return (
    <div className="swatch-grid">
      {items.map(({ name, value, h, css }) => {
        const isAlpha = Array.isArray(value) && value.length === 4 && value[3] < 0.5
        return (
          <div className="swatch" key={name}>
            <div
              className={`swatch-color${isAlpha ? ' checkered' : ''}`}
              style={{ background: css }}
            />
            <div className="swatch-meta">
              <div className="swatch-name">{name}</div>
              <div className="swatch-value">{fmtOKLCH(value, h)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function Atomic({ slot, fontFamily }: AtomicProps) {
  const c = slot.atomic?.color
  const t = slot.atomic?.typography
  const r = slot.atomic?.radius
  const m = slot.atomic?.material
  const sp = slot.atomic?.spacing

  if (!c || !t || !r) return null

  const nh: number = c.neutral_hue
  const fh: number = c.foreground_hue ?? nh
  const bh: number = slot.style_meta?.brand_hue ?? nh
  const d = slot

  // Color swatch groups
  const surfaces = [
    { name: 'background', value: c.background, h: nh, css: 'var(--bg)' },
    { name: 'surface_l1', value: c.surface_l1, h: nh, css: 'var(--surface-l1)' },
    { name: 'surface_l2', value: c.surface_l2, h: nh, css: 'var(--surface-l2)' },
    { name: 'surface_l3', value: c.surface_l3, h: nh, css: 'var(--surface-l3)' },
    { name: 'foreground', value: c.foreground, h: fh, css: 'var(--fg)' },
    { name: 'foreground_2', value: c.foreground_2, h: fh, css: 'var(--fg-2)' },
    { name: 'foreground_3', value: c.foreground_3, h: fh, css: 'var(--fg-3)' },
  ]

  const primary = [
    { name: 'primary', value: c.primary, h: bh, css: 'var(--primary)' },
    { name: 'primary_hl', value: c.primary_hl, h: bh, css: 'var(--primary-hl)' },
    ...(c.primary_soft ? [{ name: 'primary_soft', value: c.primary_soft, h: bh, css: 'var(--primary-soft)' }] : []),
  ]

  const chart = [
    { name: 'chart-1 (=primary)', value: c.primary, h: bh, css: 'var(--chart-1)' },
    ...c.chart_ramp.map((v: OklchObj & { H?: number }, i: number) => ({
      name: `chart-${i + 2}`,
      value: v,
      h: v.H ?? bh,
      css: `var(--chart-${i + 2})`,
    })),
    { name: 'chart_hover', value: c.chart_hover, h: c.chart_hover[2], css: 'var(--chart-hover)' },
  ]

  const overlay = [
    { name: 'border', value: c.border, h: c.border[2], css: 'var(--border)' },
    { name: 'border_strong', value: c.border_strong, h: c.border_strong[2], css: 'var(--border-strong)' },
    ...(c.primary_wash ? [{ name: 'primary_wash', value: c.primary_wash, h: c.primary_wash[2], css: 'var(--primary-wash)' }] : []),
    ...(c.ambient_ink ? [{ name: 'ambient_ink', value: c.ambient_ink, h: c.ambient_ink[2], css: 'var(--ambient-ink)' }] : []),
  ]

  // Typography samples
  const isEditorial = d.style_meta?.decorative_pack === 'editorial'
  // R-102 G7.2 · CJK sample copy per family — display vs body
  const cjkDisplaySample = '二〇二六年度战报'
  const cjkBodySample = '本年度营收创历史新高,同比增长 18.2%,核心产品矩阵突破 4.54 亿月活用户。'

  const typeSamples = [
    {
      label: 'Display Number · Latin',
      meta: `${t.display_number_lg}px · lh ${t.display_lh} · ls ${t.display_ls_em}em · ${t.display_stack[0]}`,
      el: (
        <div className="type-display type-display-number" style={{
          fontSize: Math.min(t.display_number_lg, 160),
          lineHeight: t.display_lh,
          letterSpacing: `${t.display_ls_em}em`,
          fontFamily: 'var(--number-stack, var(--display-stack))',
          color: 'var(--primary)',
          fontWeight: 500,
          fontFeatureSettings: '"tnum","lnum"',
        }}>
          ¥36.5<span style={{ fontSize: Math.min(t.unit_suffix_lg || 40, 56), color: 'var(--primary-hl)', letterSpacing: '-0.02em' }}>亿</span>
        </div>
      ),
    },
    // R-105 · Title 中英混排 (merged, uses --title-stack)
    {
      label: 'Title · 中英',
      meta: `${Math.min(t.page_title_lg || t.section_primary_lg, 88)}px · title-stack (中英合并)`,
      el: (
        <div style={{
          fontSize: Math.min(t.page_title_lg || t.section_primary_lg, 88),
          fontFamily: 'var(--title-stack, var(--display-stack))',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--fg)',
        }}>
          {cjkDisplaySample} · Annual Report 2026
        </div>
      ),
    },
    t.hero_title_lg ? {
      label: 'Hero Title · 中英',
      meta: `${t.hero_title_lg}px · title-stack`,
      el: (
        <div style={{
          fontSize: Math.min(t.hero_title_lg, 80),
          fontFamily: 'var(--title-stack, var(--display-stack))',
          fontWeight: 500,
          letterSpacing: '-0.035em',
          color: 'var(--fg)',
        }}>
          Annual Report 2026 · {cjkDisplaySample}
        </div>
      ),
    } : null,
    t.page_title_lg ? {
      label: 'Page Title · Latin',
      meta: `${t.page_title_lg}px · title-stack`,
      el: <div style={{ fontSize: Math.min(t.page_title_lg, 56), fontFamily: 'var(--title-stack, var(--display-stack))', fontWeight: 500, color: 'var(--fg)' }}>Annual Report 2026</div>,
    } : null,
    {
      label: 'Section Primary',
      meta: `${t.section_primary_lg}px · title-stack`,
      el: <div style={{ fontSize: Math.min(t.section_primary_lg, 96), fontFamily: 'var(--title-stack, var(--display-stack))', fontWeight: 500, color: 'var(--fg)' }}>Section Primary</div>,
    },
    {
      label: 'Section Secondary · 中英',
      meta: `${t.section_secondary_lg}px · sans-stack`,
      el: (
        <div style={{ fontSize: Math.min(t.section_secondary_lg, 64), fontFamily: 'var(--sans-stack)', fontWeight: 500, color: 'var(--fg)' }}>
          Section Secondary · 子标题层级
        </div>
      ),
    },
    {
      label: 'Section Tertiary',
      meta: `${t.section_tertiary_lg}px`,
      el: <div style={{ fontSize: t.section_tertiary_lg, fontFamily: 'var(--title-stack, var(--display-stack))', color: 'var(--fg)' }}>Section Tertiary · 内容标题</div>,
    },
    {
      label: 'Quote',
      meta: `${t.quote_lg}px · ${isEditorial ? 'italic' : 'normal'}`,
      el: <div style={{ fontSize: t.quote_lg, fontFamily: 'var(--body-stack, var(--sans-stack))', fontStyle: isEditorial ? 'italic' : 'normal', color: 'var(--fg)' }}>
        "Drama comes from the warm light field, the chapter hairline cadence, and confident sans typography held at medium weight."
      </div>,
    },
    {
      label: 'Body · 中文',
      meta: `${t.body}px · cjk_body_max_ch ${t.cjk_body_max_ch} · body-stack`,
      el: (
        <p style={{
          fontSize: t.body,
          maxWidth: `${t.cjk_body_max_ch}ch`,
          fontFamily: 'var(--body-stack, var(--sans-stack))',
          fontWeight: 400,
          lineHeight: 1.65,
          color: 'var(--fg-2)',
          margin: 0,
        }}>
          {cjkBodySample}
        </p>
      ),
    },
    {
      label: 'Body · Latin',
      meta: `${t.body}px · ${t.sans_stack[0]} · feat: ${t.font_feature_settings.replace(/"/g, '')}`,
      el: (
        <p style={{
          fontSize: t.body,
          maxWidth: `${t.cjk_body_max_ch * 1.4}ch`,
          fontFamily: 'var(--body-stack, var(--sans-stack))',
          fontWeight: 400,
          lineHeight: 1.55,
          color: 'var(--fg-2)',
          margin: 0,
        }}>
          Body copy at {t.body}px sets the rhythm for long-form reading inside reports — paired with the CJK stack above, mixed Latin / Han runs fall back per-glyph in modern browsers.
        </p>
      ),
    },
    {
      label: 'Caption / Mono',
      meta: `${t.caption}px · ${t.mono_stack[0]} · tracking ${t.meta_tracking_em}em`,
      el: <div style={{ fontSize: t.caption, letterSpacing: `${t.meta_tracking_em}em`, textTransform: 'uppercase', fontFamily: 'var(--mono-stack)', color: 'var(--fg-2)' }}>
        META · CAPTION · 12.34% · {new Date().toISOString().slice(0, 10)}
      </div>,
    },
    {
      label: 'Eyebrow',
      meta: `${t.eyebrow_px}px · tracking ${t.eyebrow_tracking_em}em`,
      el: <div style={{ fontSize: t.eyebrow_px, letterSpacing: `${t.eyebrow_tracking_em}em`, textTransform: 'uppercase', fontFamily: 'var(--mono-stack)', color: 'var(--primary)' }}>
        CHAPTER 03 · NUMBERS PERFORM
      </div>,
    },
  ].filter(Boolean) as Array<{ label: string; meta: string; el: React.ReactNode }>

  const baseRem = 4

  return (
    <>
      {/* M-01 Color */}
      <section className="section" id="m-color">
        <div className="section-header">
          <span className="section-num">M-01</span>
          <h2 className="section-title">Color · OKLCH Swatch</h2>
          <span className="section-desc">brand H {bh} · neutral H {nh} · fg H {fh}</span>
        </div>
        <div className="subsection-title">Surfaces &amp; Foreground</div>
        <SwatchGroup items={surfaces} />
        <div className="subsection-title">Primary Ramp</div>
        <SwatchGroup items={primary} />
        <div className="subsection-title">Chart Ramp</div>
        <SwatchGroup items={chart} />
        <div className="subsection-title">Overlays &amp; Borders</div>
        <SwatchGroup items={overlay} />
      </section>

      {/* R-119 · Font Inventory(default style 时显示,放在 Typography 字号节奏上方) */}
      {fontFamily && <FontInventory family={fontFamily} />}

      {/* M-02 Typography */}
      <section className="section" id="m-type">
        <div className="section-header">
          <span className="section-num">M-02</span>
          <h2 className="section-title">Typography · 字号节奏</h2>
          <span className="section-desc">weight ≤ {t.weight_ceiling} · {t.emphasis_tier} · {t.font_loading}</span>
        </div>
        <div>
          {typeSamples.map((s) => (
            <div className="type-sample" key={s.label}>
              <div className="type-label">
                <span>{s.label}</span>
                {s.meta}
              </div>
              {s.el}
            </div>
          ))}
        </div>
      </section>

      {/* M-05 Radius / Shadow / Spacing */}
      <section className="section" id="m-rss">
        <div className="section-header">
          <span className="section-num">M-05</span>
          <h2 className="section-title">Radius · Shadow · Spacing</h2>
          <span className="section-desc">圆角 / 阴影 / 间距 / 容器</span>
        </div>
        <div className="rss-grid">
          <div className="rss-card">
            <div className="subsection-title" style={{ margin: 0 }}>Radius</div>
            <div className="rss-sample-row">
              <div className="rss-sample pill">Pill</div>
              <div className="rss-sample sharp">Sharp Panel</div>
              <div className="rss-sample card">Card Chrome</div>
            </div>
            <div className="spacing-label">
              pill: {r.pill} · sharp: {r.sharp_panel_max_px}px · card: {r.card_chrome === 'double-bezel' ? 'double-bezel (outer ring + inner card)' : `${r.card_chrome}px`}
            </div>
          </div>

          <div className="rss-card">
            <div className="subsection-title" style={{ margin: 0 }}>Shadow / Depth</div>
            <div className="rss-sample-row">
              <div className="rss-sample shadow-none">none</div>
              <div className="rss-sample shadow-inset-glow">inset-glow</div>
              <div className="rss-sample shadow-inset-light">inset-light</div>
            </div>
            <div className="spacing-label">
              {m?.depth_mechanism} · shadow: {m?.shadow} · noise: {m?.noise_overlay}
            </div>
          </div>

          <div className="rss-card">
            <div className="subsection-title" style={{ margin: 0 }}>Spacing &amp; Container</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="spacing-label">section_py_mobile</div>
              <div
                className="spacing-bar"
                style={{ height: Math.min(sp?.section_py_mobile * 2, 80) }}
              >
                py-{sp?.section_py_mobile} · {sp?.section_py_mobile * baseRem}px
              </div>
              <div className="spacing-label">section_py_lg</div>
              <div
                className="spacing-bar"
                style={{ height: Math.min(sp?.section_py_lg * 2, 120) }}
              >
                py-{sp?.section_py_lg} · {sp?.section_py_lg * baseRem}px
              </div>
              <div className="spacing-label">container_max_w</div>
              <div className="spacing-bar">
                {sp?.container_max_w} · base {sp?.base_px}px · extra [{sp?.scale_extra?.join(',')}]
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
