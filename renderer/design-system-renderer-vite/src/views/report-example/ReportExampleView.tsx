// ReportExampleView — Stage 3 main container
// Receives styleKey / slot / device from App.tsx
// Injects OKLCH CSS vars (same as DesignSystemView)

import { useEffect } from 'react'
import { injectCSSVars } from '@/views/design-system/oklch'
import { Hero } from './Hero'
import { KPIChapter } from './KPIChapter'
import { TrendChapter } from './TrendChapter'
import { TimelineChapter } from './TimelineChapter'
import { CompareChapter } from './CompareChapter'
import { RankingChapter } from './RankingChapter'
import { ProportionChapter } from './ProportionChapter'
import { AnnotationChapter } from './AnnotationChapter'
import { QuoteChapter } from './QuoteChapter'
import { OutroChapter } from './OutroChapter'
import './styles.css'

interface ReportExampleViewProps {
  styleKey: string
  slot: Record<string, any>
  device: 'web' | 'mobile'
}

export function ReportExampleView({ styleKey, slot, device }: ReportExampleViewProps) {
  // Inject OKLCH CSS vars whenever slot changes (same pattern as DesignSystemView)
  useEffect(() => {
    injectCSSVars(slot)
  }, [slot])

  const pack = slot.style_meta?.decorative_pack ?? styleKey

  const frameClass = [
    'report-frame',
    pack,
    device === 'mobile' ? 'mobile-frame' : '',
  ].filter(Boolean).join(' ')

  return (
    <div style={{ padding: '24px', minHeight: '100%' }}>
      <div className={frameClass}>
        <div className="report-stage">
          {/* Hero — Round-83 rule: Hero ≠ chapter, no ChapterStamp/kicker */}
          <Hero pack={pack} slot={slot} />

          {/* Chapter 1: KPI */}
          <KPIChapter pack={pack} />

          {/* Chapter 2: Monthly Trend */}
          <TrendChapter pack={pack} slot={slot} />

          {/* Chapter 3: Timeline */}
          <TimelineChapter pack={pack} />

          {/* Chapter 4: Comparison */}
          <CompareChapter pack={pack} />

          {/* Chapter 5: Ranking */}
          <RankingChapter pack={pack} />

          {/* Chapter 6: Proportion */}
          <ProportionChapter pack={pack} />

          {/* Chapter 7: Annotation */}
          <AnnotationChapter pack={pack} />

          {/* Chapter 8: Quote interstitial */}
          <QuoteChapter pack={pack} />

          {/* Outro */}
          <OutroChapter pack={pack} />
        </div>
      </div>
    </div>
  )
}
