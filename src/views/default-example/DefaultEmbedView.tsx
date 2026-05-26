// DefaultEmbedView · R-104
// Iframe-side renderer for style=default in embed mode.
// Reads dials from URL query — no DialPanel. Scoped token injection.
// scroll-triggered animations fire naturally (IntersectionObserver per-frame).

import { useEffect, useRef } from 'react'

import { parseDialsFromQuery } from '@/lib/default-dials'
import { applyDefaultDials } from '@/lib/default-tokens'
import { loadFontFamily, applyFontStack } from '@/lib/default-fonts'
import { dialsToHeroShaderSlot } from '@/lib/default-hero-shader'
import type { DefaultDialSet } from '@/lib/default-dials'
import { Hero } from '@/views/report-example/Hero'
import { KPIChapter } from '@/views/report-example/KPIChapter'
import { TrendChapter } from '@/views/report-example/TrendChapter'
import { TimelineChapter } from '@/views/report-example/TimelineChapter'
import { InsightSection } from '@/views/report-example/InsightSection'
import { CompareChapter } from '@/views/report-example/CompareChapter'
import { RankingChapter } from '@/views/report-example/RankingChapter'
import { ProportionChapter } from '@/views/report-example/ProportionChapter'
import { AnnotationChapter } from '@/views/report-example/AnnotationChapter'
import { QuoteChapter } from '@/views/report-example/QuoteChapter'
import { OutroChapter } from '@/views/report-example/OutroChapter'
import '@/views/report-example/styles.css'
import './styles.css'

function buildSlot(dials: DefaultDialSet): Record<string, unknown> {
  const heroShader = dialsToHeroShaderSlot(dials)
  return {
    style_meta: { decorative_pack: 'default', mode: dials.mode, brand_color: dials.brand_color },
    atomic: {},
    molecular: heroShader ? { hero_shader: heroShader } : {},
    patterned: {},
  }
}

interface DefaultEmbedViewProps {
  device: 'web' | 'mobile'
}

export function DefaultEmbedView({ device }: DefaultEmbedViewProps) {
  const dials = parseDialsFromQuery(new URLSearchParams(window.location.search))
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    loadFontFamily(dials.font_family)
    applyFontStack(dials.font_family, el)
    applyDefaultDials(dials, el)
  }, []) // Dials come from URL at mount — URL is static inside iframe lifetime

  const frameClass = [
    'report-frame',
    'default',
    device === 'mobile' ? 'mobile-frame' : '',
  ].filter(Boolean).join(' ')

  const canvasClass = [
    'report-canvas-scope',
    dials.mode === 'dark' ? 'dark' : '',
    `density-${dials.density}`,
  ].filter(Boolean).join(' ')

  const slot = buildSlot(dials)

  return (
    <div
      ref={canvasRef}
      className={canvasClass}
      style={{ minHeight: '100vh', padding: '24px', background: 'var(--bg)' }}
    >
      <div className={frameClass}>
        <div className="report-stage">
          <Hero pack="default" slot={slot} />
          <KPIChapter pack="default" />
          <TrendChapter pack="default" slot={slot} />
          <TimelineChapter pack="default" />
          <InsightSection pack="default" num="04" />
          <CompareChapter pack="default" num="05" />
          <RankingChapter pack="default" num="06" />
          <ProportionChapter pack="default" num="07" />
          <AnnotationChapter pack="default" num="08" />
          <QuoteChapter pack="default" />
          <OutroChapter pack="default" />
        </div>
      </div>
    </div>
  )
}
