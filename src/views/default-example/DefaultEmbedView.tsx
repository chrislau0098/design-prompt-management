// DefaultEmbedView · R-112
// Iframe-side renderer for style=default in embed mode.
// R-112 fix #1: bootstraps dials from URL on mount, then listens for
// 'dials-update' postMessage from the parent. Sends 'embed-ready' once
// mounted so the parent knows it can start posting. Token / font / shader
// re-apply runs in an effect keyed on `dials`, so dial changes patch the
// scoped element in-place instead of reloading the whole page.

import { useEffect, useMemo, useRef, useState } from 'react'

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
// R-106 Fix 2 · CompareChapter removed from default route (Chris feedback).
// Component file retained for fixed-style usage in ReportExampleView.
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
  const [dials, setDials] = useState<DefaultDialSet>(() =>
    parseDialsFromQuery(new URLSearchParams(window.location.search))
  )
  const canvasRef = useRef<HTMLDivElement>(null)

  // R-112 · re-apply scoped tokens whenever dials change.
  // Re-runs on every dial update from parent postMessage — patches in place,
  // never remounts the report tree.
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    loadFontFamily(dials.font_family)
    applyFontStack(dials.font_family, el)
    applyDefaultDials(dials, el)
  }, [dials])

  // R-112 · listen for parent's dial updates + announce ready
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.type === 'dials-update' && e.data.dials) {
        setDials(e.data.dials as DefaultDialSet)
      }
    }
    window.addEventListener('message', onMessage)
    // Tell parent we're mounted and ready to receive dial updates
    try {
      window.parent?.postMessage({ type: 'embed-ready' }, window.location.origin)
    } catch {
      /* parent may be cross-origin in dev — ignore */
    }
    return () => window.removeEventListener('message', onMessage)
  }, [])

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

  // R-112 · slot rebuilds reactively on dials change → Hero shader props refresh
  const slot = useMemo(() => buildSlot(dials), [dials])

  return (
    <div
      ref={canvasRef}
      className={canvasClass}
      style={{ minHeight: '100vh', background: 'var(--bg)' }}
    >
      <div className={frameClass}>
        <div className="report-stage">
          <Hero pack="default" slot={slot} />
          <KPIChapter pack="default" />
          <TrendChapter pack="default" slot={slot} />
          <TimelineChapter pack="default" />
          <InsightSection pack="default" num="04" />
          <RankingChapter pack="default" num="05" />
          <ProportionChapter pack="default" num="06" />
          <AnnotationChapter pack="default" num="07" />
          <QuoteChapter pack="default" />
          <OutroChapter pack="default" />
        </div>
      </div>
    </div>
  )
}
