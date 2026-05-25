import { motion } from 'motion/react'
import { useRef } from 'react'

interface OrnamentsProps {
  slot: Record<string, any>
}

/* ─── Motion fade-up helper ─── */
function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  margin = '-20%',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  margin?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration, delay, ease: [0.18, 0.85, 0.22, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── OrnCard ─── */
function OrnCard({ name, slot: slotPath, delay, children }: {
  name: string
  slot: string
  delay?: number
  children: React.ReactNode
}) {
  return (
    <FadeUp delay={delay} className="orn-card">
      <div className="orn-card-stage">{children}</div>
      <div className="orn-card-meta">
        <div className="orn-card-name">{name}</div>
        <div className="orn-card-slot">{slotPath}</div>
      </div>
    </FadeUp>
  )
}

/* ─── DecSplit ─── */
function DecSplit({ isolated, embedded }: { isolated: React.ReactNode; embedded: React.ReactNode }) {
  return (
    <div className="dec-split">
      <div className="dec-split-pane isolated">
        <div className="dec-split-label">Component</div>
        <div className="dec-split-content">{isolated}</div>
      </div>
      <div className="dec-split-pane embedded">
        <div className="dec-split-label">In Context</div>
        <div className="dec-split-content embedded">{embedded}</div>
      </div>
    </div>
  )
}

/* ─── Decor Pack Builders ─── */

function EditorialPack({ baseDuration, stagger, inviewMargin }: {
  slot?: any; baseDuration: number; stagger: number; inviewMargin: string
}) {
  const reducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const buildOutroRules = (key: string) =>
    reducedMotion ? (
      <>
        <span className="ember-rule" key={`r1-${key}`} />
        <span className="diamond" key={`dia-${key}`} style={{ transform: 'rotate(45deg)' }} />
        <span className="ember-rule right" key={`r2-${key}`} />
      </>
    ) : (
      <>
        <motion.span
          key={`r1-${key}`} className="ember-rule"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: inviewMargin }}
          transition={{ duration: 1.0, ease: [0.18, 0.85, 0.22, 1], delay: 0.4 }}
        />
        <motion.span
          key={`dia-${key}`} className="diamond"
          initial={{ rotate: 0, opacity: 0 }} whileInView={{ rotate: 45, opacity: 1 }}
          viewport={{ once: true, margin: inviewMargin }}
          transition={{ duration: 0.8, ease: [0.18, 0.85, 0.22, 1], delay: 0.6 }}
        />
        <motion.span
          key={`r2-${key}`} className="ember-rule right"
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: inviewMargin }}
          transition={{ duration: 1.0, ease: [0.18, 0.85, 0.22, 1], delay: 0.4 }}
        />
      </>
    )

  const bracketTL = (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden className="bracket-tl">
      <path d="M 2 38 L 2 2 L 38 2" stroke="var(--primary)" strokeWidth={1} strokeOpacity={0.6} strokeLinecap="square" />
    </svg>
  )
  const bracketBR = (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden className="bracket-br">
      <path d="M 38 2 L 38 38 L 2 38" stroke="var(--primary)" strokeWidth={1} strokeOpacity={0.6} strokeLinecap="square" />
    </svg>
  )

  return (
    <div className="dec-pack-grid">
      {/* ChapterBanner */}
      <FadeUp delay={0} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">ChapterBanner</div>
        <DecSplit
          isolated={
            <div className="editorial-chapter-banner" style={{ width: '100%' }}>
              <div className="kicker">CHAPTER · 03</div>
              <div className="label-zh">章节 · 数字承载</div>
              <div className="title" style={{ fontSize: 36 }}>Numbers carry every claim.</div>
            </div>
          }
          embedded={
            <div className="mini-ctx-hero" style={{ padding: '20px 24px' }}>
              <div className="editorial-chapter-banner" style={{ paddingBottom: 14, marginBottom: 18 }}>
                <div className="kicker">CHAPTER · 03</div>
                <div className="label-zh">数字承载</div>
                <div className="title" style={{ fontSize: 28 }}>Numbers carry every claim.</div>
              </div>
              <div className="mini-ctx-prose">一份杂志感的章节封页:大字标题承接 kicker,hairline 收尾。</div>
            </div>
          }
        />
      </FadeUp>

      {/* ChapterDivider */}
      <FadeUp delay={stagger} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">ChapterDivider</div>
        <DecSplit
          isolated={<div className="editorial-chapter-divider" style={{ width: '100%' }}>·  ·  ·</div>}
          embedded={
            <div className="mini-ctx">
              <p className="mini-ctx-prose">上一段:暖光从 Hero 辐射开来,每一处指标都由 humanist sans 中性号字承载。</p>
              <div className="editorial-chapter-divider" style={{ padding: '6px 0', borderTop: 'none' }}>·  ·  ·</div>
              <p className="mini-ctx-prose">下一段:章节之间用三个间隔点收束节奏,无 banner,留白处暗示新的小节。</p>
            </div>
          }
        />
      </FadeUp>

      {/* QuoteBracket */}
      <FadeUp delay={stagger * 2} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">QuoteBracket</div>
        <DecSplit
          isolated={
            <div className="editorial-quote-block" style={{ width: '100%' }}>
              {bracketTL}
              <div className="quote-text" style={{ fontSize: 16 }}>Drama comes from the warm light field.</div>
              {bracketBR}
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">CHAPTER · QUOTE INTERSTITIAL</div>
              <div className="editorial-quote-block" style={{ padding: '8px 0' }}>
                {bracketTL}
                <div className="quote-text" style={{ fontSize: 18 }}>
                  Drama comes from the warm light field, the chapter hairline cadence, and confident sans typography held at medium weight.
                </div>
                {bracketBR}
              </div>
            </div>
          }
        />
      </FadeUp>

      {/* OutroSignature */}
      <FadeUp delay={stagger * 3} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">OutroSignature</div>
        <DecSplit
          isolated={
            <div style={{ width: '100%' }}>
              <div className="editorial-outro">{buildOutroRules('iso')}</div>
              <div className="editorial-outro-colophon">COLOPHON</div>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">CHAPTER · OUTRO REVERENT</div>
              <p className="mini-ctx-bigprose">— 是的,数字会发光。</p>
              <div className="editorial-outro" style={{ padding: '20px 0 4px' }}>{buildOutroRules('emb')}</div>
              <div className="editorial-outro-colophon">END OF CHAPTER · 2026·05·21</div>
            </div>
          }
        />
      </FadeUp>

      {/* inline DeltaIndicator */}
      <FadeUp delay={stagger * 4} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">inline DeltaIndicator</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', gap: 20, alignItems: 'baseline', flexWrap: 'wrap' }}>
              <span className="editorial-delta-inline">▲ 18.2% <span style={{ opacity: 0.8, fontWeight: 400 }}>YoY</span></span>
              <span className="editorial-delta-inline" style={{ color: 'var(--fg-2)' }}>▼ 4.7% <span style={{ opacity: 0.8, fontWeight: 400 }}>QoQ</span></span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">CHAPTER · 营收同比</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <span className="mini-ctx-num">¥36.5<span className="mini-ctx-unit">亿</span></span>
                <span className="editorial-delta-inline">▲ 18.2% <span style={{ opacity: 0.8, fontWeight: 400 }}>YoY</span></span>
              </div>
              <p className="mini-ctx-prose">行内呼吸:数字、单位、delta arrow 同基线;无 pill,无 border,只用 weight 与色彩区隔。</p>
            </div>
          }
        />
      </FadeUp>
    </div>
  )
}

function TheatricalPack({ baseDuration, stagger, inviewMargin }: {
  slot?: any; baseDuration: number; stagger: number; inviewMargin: string
}) {
  const ChapterStamp = (n: string, size = 56) => (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden className="theatrical-chapter-stamp">
      <circle cx={28} cy={28} r={26} fill="none" stroke="color-mix(in oklch, var(--primary) 40%, transparent)" strokeWidth={1} />
      <text x={28} y={33} textAnchor="middle" fontSize={14} fontFamily="var(--mono-stack)" fill="var(--primary)">{n}</text>
    </svg>
  )

  return (
    <div className="dec-pack-grid">
      {/* ChapterStamp */}
      <FadeUp delay={0} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">ChapterStamp · SVG circular</div>
        <DecSplit
          isolated={ChapterStamp('03', 64)}
          embedded={
            <div className="mini-ctx-hero" style={{ padding: '20px 24px' }}>
              <div style={{ position: 'absolute', top: 14, right: 14 }}>{ChapterStamp('03', 44)}</div>
              <div className="mini-ctx-hero-eyebrow">ACT · 03</div>
              <div className="mini-ctx-hero-title">Single accent disciplined</div>
              <p className="mini-ctx-prose" style={{ marginTop: 4 }}>右上角 ChapterStamp 圆形徽章,Hermès orange 单橙;徽章作为 chapter 锚点而非主视觉。</p>
            </div>
          }
        />
      </FadeUp>

      {/* SpotlightGradient */}
      <FadeUp delay={stagger} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">SpotlightGradient · top-center</div>
        <DecSplit
          isolated={
            <div className="theatrical-spotlight-stage" style={{ width: '100%' }}>
              <div className="spotlight" />
              <div className="content">
                <div className="theatrical-display" style={{ fontSize: 56 }}>¥ 36.5<span className="unit" style={{ fontSize: 22 }}>亿</span></div>
                <div className="theatrical-caption">spotlight gradient</div>
              </div>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">CHAPTER · 02 · 高亮指标</div>
              <div className="theatrical-spotlight-stage" style={{ padding: '48px 24px 28px' }}>
                <div className="spotlight" />
                <div className="content">
                  <div className="theatrical-caption" style={{ marginBottom: 8 }}>Q1 GMV</div>
                  <div className="theatrical-display" style={{ fontSize: 64 }}>¥ 36.5<span className="unit" style={{ fontSize: 24 }}>亿</span></div>
                  <div className="theatrical-caption" style={{ marginTop: 10 }}>同比 +18.2% · spotlight 自顶倾泻</div>
                </div>
              </div>
            </div>
          }
        />
      </FadeUp>

      {/* DeltaIndicator pill */}
      <FadeUp delay={stagger * 2} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">DeltaIndicator · pill rounded-[4px]</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="delta-pill"><span className="arrow">▲</span><span>18.2%</span><span style={{ opacity: 0.7, fontWeight: 400 }}>YoY</span></span>
              <span className="delta-pill down"><span className="arrow">▼</span><span>4.7%</span><span style={{ opacity: 0.7, fontWeight: 400 }}>QoQ</span></span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">KPI ROW · 营收 / 月活</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ borderTop: '1px solid var(--border-strong)', paddingTop: 12 }}>
                  <div className="mini-ctx-label" style={{ marginBottom: 6 }}>GMV</div>
                  <div className="mini-ctx-num" style={{ fontSize: 36 }}>¥36.5<span className="mini-ctx-unit">亿</span></div>
                  <div style={{ marginTop: 10 }}><span className="delta-pill"><span className="arrow">▲</span><span>18.2%</span></span></div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-strong)', paddingTop: 12 }}>
                  <div className="mini-ctx-label" style={{ marginBottom: 6 }}>MAU</div>
                  <div className="mini-ctx-num" style={{ fontSize: 36 }}>4.54<span className="mini-ctx-unit">亿</span></div>
                  <div style={{ marginTop: 10 }}><span className="delta-pill"><span className="arrow">▲</span><span>12.0%</span></span></div>
                </div>
              </div>
            </div>
          }
        />
      </FadeUp>
    </div>
  )
}

function InstrumentalPack({ baseDuration, stagger, inviewMargin }: {
  slot?: any; baseDuration: number; stagger: number; inviewMargin: string
}) {
  const ChapterStamp = (n: string, size = 56) => (
    <svg width={size} height={size} viewBox="0 0 56 56" aria-hidden className="instrumental-chapter-stamp">
      <circle cx={28} cy={28} r={26} fill="none" stroke="color-mix(in oklch, var(--primary) 40%, transparent)" strokeWidth={1} />
      <text x={28} y={33} textAnchor="middle" fontSize={14} fontFamily="var(--mono-stack)" fill="var(--primary)">{n}</text>
    </svg>
  )

  const horizonSvg = (
    <svg viewBox="0 0 400 14" preserveAspectRatio="none" aria-hidden style={{ width: '100%', height: 14, overflow: 'visible' }}>
      <defs>
        <linearGradient id="horizon-grad" x1="0" x2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity={0} />
          <stop offset="0.18" stopColor="var(--primary)" stopOpacity={0.55} />
          <stop offset="0.82" stopColor="var(--primary)" stopOpacity={0.55} />
          <stop offset="1" stopColor="var(--primary)" stopOpacity={0} />
        </linearGradient>
      </defs>
      <line x1="0" y1="7" x2="400" y2="7" stroke="url(#horizon-grad)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="32" y1="3" x2="32" y2="11" stroke="var(--primary)" strokeOpacity={0.6} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <line x1="368" y1="3" x2="368" y2="11" stroke="var(--primary)" strokeOpacity={0.6} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  )

  return (
    <div className="dec-pack-grid">
      {/* ChapterStamp */}
      <FadeUp delay={0} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">ChapterStamp · circular</div>
        <DecSplit
          isolated={ChapterStamp('03', 64)}
          embedded={
            <div className="mini-ctx-hero" style={{ padding: '20px 24px' }}>
              <div style={{ position: 'absolute', top: 14, right: 14 }}>{ChapterStamp('03', 44)}</div>
              <div className="mini-ctx-hero-eyebrow">CHANNEL · A1</div>
              <div className="mini-ctx-hero-title">Structural light · signal blue</div>
              <p className="mini-ctx-prose" style={{ marginTop: 4 }}>右上角圆形 chapter marker + IBM Plex Mono 数字;仪表盘信号锚点。</p>
            </div>
          }
        />
      </FadeUp>

      {/* OutlinedPill */}
      <FadeUp delay={stagger} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">OutlinedPill · thin border</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="pill-outlined">Live</span>
              <span className="pill-outlined">↑ 18.2%</span>
              <span className="pill-outlined">TNUM</span>
              <span className="pill-outlined">Signal</span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">FILTER · DASHBOARD CHIPS</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '8px 0' }}>
                <span className="pill-outlined">Live</span>
                <span className="pill-outlined">Q1 2026</span>
                <span className="pill-outlined">All channels</span>
                <span className="pill-outlined">TNUM enabled</span>
              </div>
              <p className="mini-ctx-prose">OutlinedPill 作为仪表盘 filter chip:thin-border + primary 35% mix,选中态 100%;无填充。</p>
            </div>
          }
        />
      </FadeUp>

      {/* drawn-horizon */}
      <FadeUp delay={stagger * 2} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">drawn-horizon · refined (no center dot, ticks)</div>
        <DecSplit
          isolated={
            <div style={{ width: '100%', padding: '8px 0', position: 'relative' }}>
              {horizonSvg}
              <div className="instrumental-feturbulence-overlay" />
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">CHAPTER · 03 · 营收年度走势</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <span className="mini-ctx-num">¥36.5<span className="mini-ctx-unit">亿</span></span>
                <span className="pill-outlined">↑ 18.2% YoY</span>
              </div>
              <div style={{ padding: '4px 0', position: 'relative' }}>
                {horizonSvg}
                <div className="instrumental-feturbulence-overlay" />
              </div>
              <p className="mini-ctx-prose" style={{ marginTop: 8 }}>drawn-horizon 作为指标下方的结构线 — 信息图风。两端 tick 暗示刻度,中线无圆点装饰,纯结构。</p>
            </div>
          }
        />
      </FadeUp>

      {/* DeltaIndicator pill */}
      <FadeUp delay={stagger * 3} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">DeltaIndicator · pill rounded-[4px]</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="delta-pill"><span className="arrow">↑</span><span>18.2%</span></span>
              <span className="delta-pill down"><span className="arrow">↓</span><span>4.7%</span></span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">DASHBOARD · INSTRUMENT CELL</div>
              <div style={{ border: '1px solid var(--border-strong)', padding: 16, borderRadius: 4 }}>
                <div className="mini-ctx-label" style={{ marginBottom: 8 }}>NPS · Q1 2026</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                  <span className="mini-ctx-num" style={{ fontSize: 36 }}>67</span>
                  <span className="delta-pill"><span className="arrow">↑</span><span>+9</span></span>
                </div>
                <p className="mini-ctx-prose" style={{ fontSize: 12 }}>指标单元格:数字主导,delta 作为右侧信号锚点;无 highlight 装饰。</p>
              </div>
            </div>
          }
        />
      </FadeUp>
    </div>
  )
}

function SystematicPack({ baseDuration, stagger, inviewMargin }: {
  slot?: any; baseDuration: number; stagger: number; inviewMargin: string
}) {
  return (
    <div className="dec-pack-grid">
      {/* ChapterStamp solid */}
      <FadeUp delay={0} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">ChapterStamp · solid filled</div>
        <DecSplit
          isolated={<div className="systematic-chapter-stamp lg">03</div>}
          embedded={
            <div className="mini-ctx-hero" style={{ padding: '20px 24px', borderRadius: 0 }}>
              <div style={{ position: 'absolute', top: 16, right: 16 }}><div className="systematic-chapter-stamp">03</div></div>
              <div className="mini-ctx-hero-eyebrow" style={{ fontFamily: 'var(--sans-stack)', fontWeight: 700 }}>CHAPTER 03</div>
              <div className="mini-ctx-hero-title" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>NUMBERS PERFORM</div>
              <p className="mini-ctx-prose" style={{ marginTop: 4 }}>右上角 solid cobalt 圆形 stamp;无 outline、无 inner ring。IBM-style 单一锚点。</p>
            </div>
          }
        />
      </FadeUp>

      {/* HairlineRule */}
      <FadeUp delay={stagger} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">HairlineRule · 1px / 2px, no gradient</div>
        <DecSplit
          isolated={
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <hr className="systematic-hairline thick" />
                <div style={{ fontFamily: 'var(--mono-stack)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 8 }}>2px solid · primary axis</div>
              </div>
              <div>
                <hr className="systematic-hairline" />
                <div style={{ fontFamily: 'var(--mono-stack)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 8 }}>1px hairline · content</div>
              </div>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <p className="mini-ctx-prose">上一段:钴蓝粗字 ALL CAPS 主导 Hero,系统化 grid 节奏排布信息图。</p>
              <hr className="systematic-hairline thick" />
              <div style={{ fontFamily: 'var(--sans-stack)', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--primary)' }}>CHAPTER 04</div>
              <p className="mini-ctx-prose">下一段:hairline rule 切分章节,无 gradient、无 dot — Swiss minimal cadence。</p>
            </div>
          }
        />
      </FadeUp>

      {/* SharpTag */}
      <FadeUp delay={stagger * 2} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">SharpTag · 0px corner, 700</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="systematic-sharp-tag primary">LIVE</span>
              <span className="systematic-sharp-tag">TNUM</span>
              <span className="systematic-sharp-tag">GRID 12</span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">METRIC HEADER</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span className="mini-ctx-num" style={{ color: 'var(--primary)' }}>¥36.5<span className="mini-ctx-unit">亿</span></span>
                <span className="systematic-sharp-tag primary">↑ 18.2%</span>
                <span className="systematic-sharp-tag">Q1·2026</span>
              </div>
              <p className="mini-ctx-prose" style={{ marginTop: 12 }}>SharpTag 0px corner + 700 weight 边框,放在 KPI 数字旁作 status label。无 pill,无 fill。</p>
            </div>
          }
        />
      </FadeUp>

      {/* inline DeltaIndicator */}
      <FadeUp delay={stagger * 3} duration={baseDuration} margin={inviewMargin} className="dec-section">
        <div className="dec-section-tag">inline DeltaIndicator · bold, no pill</div>
        <DecSplit
          isolated={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
              <span className="systematic-delta-inline"><span>▲</span><span>18.2%</span></span>
              <span className="systematic-delta-inline down"><span>▼</span><span>4.7%</span></span>
            </div>
          }
          embedded={
            <div className="mini-ctx">
              <div className="mini-ctx-label">KPI · 营收同比</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                <span className="mini-ctx-num" style={{ color: 'var(--primary)' }}>¥36.5<span className="mini-ctx-unit">亿</span></span>
                <span className="systematic-delta-inline"><span>▲</span><span>18.2%</span><span style={{ fontWeight: 400, fontSize: 12, opacity: 0.7, letterSpacing: '0.12em' }}>YoY</span></span>
              </div>
              <p className="mini-ctx-prose">inline delta:粗字 (700) + cobalt 同色与 KPI 数字,行内基线对齐;Swiss 不用 pill,所有结构走 weight。</p>
            </div>
          }
        />
      </FadeUp>
    </div>
  )
}

export function Ornaments({ slot }: OrnamentsProps) {
  const mt = slot.atomic?.motion_timing
  const pack = slot.style_meta?.decorative_pack ?? 'editorial'

  const motionRange = mt?.entrance_ms_range || [600, 1000]
  const baseDuration = (motionRange[0] + motionRange[1]) / 2 / 1000
  const stagger = mt?.stagger_children_s || 0.08
  const inviewMargin = mt?.inview_margin || '-20%'

  // Dividers
  const dividers = [
    <OrnCard key="d1" name="Divider · hairline-dotdotdot" slot="molecular.dividers.content_divider" delay={0}>
      <div className="orn-divider-dotdotdot">·  ·  ·</div>
    </OrnCard>,
    <OrnCard key="d2" name="Divider · gradient-hairline" slot="molecular.dividers.accent_divider" delay={stagger}>
      <div className="orn-divider-gradient-hairline" />
    </OrnCard>,
    <OrnCard key="d3" name="Divider · alpha-hairline" slot="molecular.dividers.content_divider (alt)" delay={stagger * 2}>
      <div className="orn-divider-alpha-hairline" />
    </OrnCard>,
  ]

  // Chapter markers
  const chapterMarkers = [
    <OrnCard key="cm1" name="Marker · hairline-banner" slot="editorial chapter_opener" delay={0}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <div className="orn-eyebrow">CHAPTER · 03</div>
        <div style={{ height: 1, background: 'var(--border-strong)', marginTop: 8 }} />
      </div>
    </OrnCard>,
    <OrnCard key="cm2" name="Marker · ChapterStamp (circular)" slot="theatrical / instrumental chapter_opener" delay={stagger}>
      <svg width={56} height={56} viewBox="0 0 56 56" aria-hidden>
        <circle cx={28} cy={28} r={26} fill="none" stroke="color-mix(in oklch, var(--primary) 40%, transparent)" strokeWidth={1} />
        <text x={28} y={33} textAnchor="middle" fontSize={14} fontFamily="var(--mono-stack)" fill="var(--primary)">03</text>
      </svg>
    </OrnCard>,
    <OrnCard key="cm3" name="Marker · ChapterStamp (text)" slot="editorial inline column" delay={stagger * 2}>
      <div style={{ fontFamily: 'var(--mono-stack)', textAlign: 'center' }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', color: 'var(--fg-3)' }}>No.</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: 'var(--primary)' }}>03</div>
      </div>
    </OrnCard>,
  ]

  // Delta indicators
  const deltaIndicators = [
    <OrnCard key="di1" name="DeltaIndicator · inline glyph (no pill)" slot="editorial decorative_pack" delay={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
        <span className="delta-inline">▲ 18.2%</span>
        <span className="delta-inline down">▼ 4.7%</span>
      </div>
    </OrnCard>,
    <OrnCard key="di2" name="DeltaIndicator · pill rounded-[4px]" slot="theatrical / instrumental decorative_pack" delay={stagger}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <span className="delta-pill"><span className="arrow">▲</span><span>18.2%</span></span>
        <span className="delta-pill down"><span className="arrow">▼</span><span>4.7%</span></span>
      </div>
    </OrnCard>,
  ]

  // Pills
  const pills = [
    <OrnCard key="p1" name="Pill · shadcn Badge variant='outline'" slot="editorial Tags" delay={0}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="pill-shadcn-outline">Live</span>
        <span className="pill-shadcn-outline">TNUM</span>
      </div>
    </OrnCard>,
    <OrnCard key="p2" name="Pill · OutlinedPill (thin-border)" slot="instrumental decorative_pack" delay={stagger}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <span className="pill-outlined">Live</span>
        <span className="pill-outlined">Signal</span>
      </div>
    </OrnCard>,
  ]

  // Quotes
  const quotes = [
    <OrnCard key="q1" name="Quote · SVG L-shape 40×40" slot="editorial Quote archetype" delay={0}>
      <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden className="quote-bracket-svg">
        <path d="M 2 38 L 2 2 L 38 2" stroke="currentColor" strokeWidth={1} strokeLinecap="square" />
      </svg>
    </OrnCard>,
    <OrnCard key="q2" name="Quote · lucide <Quote/>" slot="theatrical / instrumental Quote archetype" delay={stagger}>
      <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="quote-lucide" aria-hidden>
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    </OrnCard>,
  ]

  // Eyebrow
  const eyebrow = [
    <OrnCard key="e1" name="Eyebrow / Kicker" slot="meta_tracking_em · primary text" delay={0}>
      <div className="orn-eyebrow">CHAPTER 03 · NUMBERS PERFORM</div>
    </OrnCard>,
  ]

  // Choose Decor pack content
  const packDesc: Record<string, string> = {
    editorial: 'ChapterBanner · ChapterDivider · QuoteBracket · OutroSignature · inline DeltaIndicator — 杂志风装饰套件',
    theatrical: 'ChapterStamp (circular SVG) · SpotlightGradient · DeltaIndicator (pill) — 戏剧风',
    instrumental: 'ChapterStamp · OutlinedPill · drawn-horizon · feTurbulence noise — 仪表风',
    systematic: 'ChapterStamp (solid) · HairlineRule · SharpTag · inline DeltaIndicator — Swiss IBM 系统化',
  }

  const PackContent = () => {
    if (pack === 'theatrical') return <TheatricalPack slot={slot} baseDuration={baseDuration} stagger={stagger} inviewMargin={inviewMargin} />
    if (pack === 'instrumental') return <InstrumentalPack slot={slot} baseDuration={baseDuration} stagger={stagger} inviewMargin={inviewMargin} />
    if (pack === 'systematic') return <SystematicPack slot={slot} baseDuration={baseDuration} stagger={stagger} inviewMargin={inviewMargin} />
    return <EditorialPack slot={slot} baseDuration={baseDuration} stagger={stagger} inviewMargin={inviewMargin} />
  }

  return (
    <>
      {/* M-06 Ornaments */}
      <section className="section" id="m-orn">
        <div className="section-header">
          <span className="section-num">M-06</span>
          <h2 className="section-title">Ornaments · 装饰元素清单</h2>
          <span className="section-desc">divider / chapter marker / delta / pill / quote — Atomic</span>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Divider</div>
            <div className="orn-subsection-desc">hairline / gradient / alpha · 三套</div>
          </div>
          <div className="orn-grid">{dividers}</div>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Chapter Marker</div>
            <div className="orn-subsection-desc">hairline-banner / chapter-stamp-circular / chapter-stamp-text · 三套</div>
          </div>
          <div className="orn-grid">{chapterMarkers}</div>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Delta Indicator</div>
            <div className="orn-subsection-desc">inline glyph (Warm) / pill rounded-[4px] (Theatre/Cool) · 二套</div>
          </div>
          <div className="orn-grid">{deltaIndicators}</div>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Pill / Badge</div>
            <div className="orn-subsection-desc">shadcn Badge outline / OutlinedPill thin-border · 二套</div>
          </div>
          <div className="orn-grid">{pills}</div>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Quote</div>
            <div className="orn-subsection-desc">SVG L-shape (editorial) / lucide &lt;Quote/&gt; (theatre/cool) · 二套</div>
          </div>
          <div className="orn-grid">{quotes}</div>
        </div>

        <div>
          <div className="orn-subsection">
            <div className="orn-subsection-label">Eyebrow / Kicker</div>
            <div className="orn-subsection-desc">tracking-[0.16em] uppercase mono primary · 一套</div>
          </div>
          <div className="orn-grid">{eyebrow}</div>
        </div>
      </section>

      {/* M-07 Decorative Pack */}
      <section className="section" id="m-decor">
        <div className="section-header">
          <span className="section-num">M-07</span>
          <h2 className="section-title">Decorative Pack · <span>{pack}</span></h2>
          <span className="section-desc">{packDesc[pack] ?? '—'}</span>
        </div>
        <PackContent />
      </section>
    </>
  )
}
