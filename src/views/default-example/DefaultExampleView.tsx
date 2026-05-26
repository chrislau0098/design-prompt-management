// DefaultExampleView · R-102 Phase 4.9
// Design Example for `style=default`. Reads dial values from URL query, applies tokens live,
// renders a report using existing chapter components. Fixed right-side DialPanel sidebar.
// URL syncs with history.pushState.

import { useEffect, useState, useCallback, useRef } from 'react'

import { parseDialsFromQuery, dialsToQueryString, DEFAULT_DIALS } from '@/lib/default-dials'
import type { DefaultDialSet } from '@/lib/default-dials'
import { applyDefaultDials } from '@/lib/default-tokens'
import { loadFontFamily, applyFontStack } from '@/lib/default-fonts'
import { dialsToHeroShaderSlot } from '@/lib/default-hero-shader'
import { DialPanel } from './DialPanel'
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

// buildSlot: derive slot from current dials (hero_shader is live)
function buildSlot(dials: DefaultDialSet): Record<string, unknown> {
  const heroShader = dialsToHeroShaderSlot(dials)
  return {
    style_meta: { decorative_pack: 'default', mode: dials.mode, brand_color: dials.brand_color },
    atomic: {},
    molecular: heroShader ? { hero_shader: heroShader } : {},
    patterned: {},
  }
}

interface DefaultExampleViewProps {
  device: 'web' | 'mobile'
}

export function DefaultExampleView({ device }: DefaultExampleViewProps) {
  const [dials, setDials] = useState<DefaultDialSet>(() =>
    parseDialsFromQuery(new URLSearchParams(window.location.search))
  )
  // Ref for the scoped report canvas — tokens + dark class go here, never on <html>
  const canvasRef = useRef<HTMLDivElement>(null)

  // Apply tokens whenever dials change — scoped to canvasRef only
  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    loadFontFamily(dials.font_family)
    applyFontStack(dials.font_family, el)
    applyDefaultDials(dials, el)
  }, [dials])

  // Push URL whenever dials change (so share / refresh works)
  const pushUrl = useCallback((next: DefaultDialSet) => {
    const url = dialsToQueryString(next)
    history.pushState(null, '', url)
  }, [])

  function updateDial<K extends keyof DefaultDialSet>(key: K, value: DefaultDialSet[K]) {
    setDials((prev) => {
      const next = { ...prev, [key]: value }
      pushUrl(next)
      return next
    })
  }

  const frameClass = [
    'report-frame',
    'default',
    device === 'mobile' ? 'mobile-frame' : '',
  ].filter(Boolean).join(' ')

  const slot = buildSlot(dials)

  // Canvas classes — carry density + accent_strategy for CSS consumption
  const canvasClass = [
    'report-canvas-scope',
    dials.mode === 'dark' ? 'dark' : '',
    `density-${dials.density}`,
    `accent-${dials.accent_strategy}`,
  ].filter(Boolean).join(' ')

  return (
    <div className="default-example-root" style={{ display: 'flex', alignItems: 'stretch', minHeight: '100%' }}>
      {/* Report canvas — scoped token injection target, fills remaining space */}
      <div
        ref={canvasRef}
        className={canvasClass}
        style={{ flex: 1, minWidth: 0, padding: '24px' }}
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

      {/* Fixed right-side sidebar DialPanel */}
      <DialPanel dials={dials} onChange={updateDial} onReset={() => {
        setDials(DEFAULT_DIALS)
        history.pushState(null, '', dialsToQueryString(DEFAULT_DIALS))
      }} />
    </div>
  )
}
