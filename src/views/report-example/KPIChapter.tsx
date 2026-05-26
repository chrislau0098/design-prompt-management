// Chapter 1 · KPI Cluster — Matrix Grid (R-103 Phase 2 rebuild)
//
// Layout: equal-rank 4-column grid (lg) / 2-col (md) / 1-col (sm) per
// default v0.1.md §11 "Matrix Grid". No primary/secondary asymmetric split —
// every KPI carries equal weight. Card chrome stays minimal per fixed-style
// overrides; default uses surface-l2 fill, no border (DESIGN.md filled-card rule).
//
// Long-number safety: focal numeric font-size scales by character length
// per default v0.1.md §17. Container query handles viewport adaptation
// (Tailwind container queries aren't in this stack — use raw @container).

import { Card } from '@/components/ui/card'
import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'
import { cn } from '@/lib/utils'

interface KPIChapterProps {
  pack: string
}

// length-based scale step — anchor to default v0.1.md §17 "Focal numeric font-size scaling".
// Drop one tier at 8-11 char, two tiers at >= 12 char. Range applies on the
// rendered numeric string (excluding unit).
function numScaleClass(s: string): string {
  const n = s.length
  if (n <= 6) return 'rep-kpi-num-scale-base'
  if (n <= 9) return 'rep-kpi-num-scale-down1'
  return 'rep-kpi-num-scale-down2'
}

function KPICell({ k, pack }: { k: typeof REPORT_MOCK.kpis[0]; pack: string }) {
  const isSystematic = pack === 'systematic'
  const isTheatrical = pack === 'theatrical'
  const isInstrumental = pack === 'instrumental'
  const isFestiveRoyal = pack === 'festive-royal'
  const isFestiveEditorial = pack === 'festive-editorial'

  const inner = (
    <>
      <div className="rep-kpi-label">{k.label}</div>
      <div className={cn('rep-kpi-num', numScaleClass(k.num))}>
        <span>{k.num}</span>
        {k.unit ? <span className="unit">{k.unit}</span> : null}
      </div>
      <div className="rep-kpi-delta">
        {(isInstrumental || isTheatrical) ? `↑ ${k.delta}` : `▲ ${k.delta}`}
      </div>
    </>
  )

  // Theatre uses Double-Bezel outer ring + inner ShadCard
  if (isTheatrical) {
    return (
      <div className={`rep-kpi ${pack}`}>
        <Card className="rep-kpi-inner rounded-[4px] ring-0 shadow-none" style={{ background: 'var(--surface-l2)', border: 'none' }}>
          {inner}
        </Card>
      </div>
    )
  }

  if (isSystematic) return <div className={`rep-kpi ${pack}`}>{inner}</div>
  if (isFestiveRoyal) return <div className={`rep-kpi ${pack}`}>{inner}</div>
  if (isFestiveEditorial) return <div className={`rep-kpi ${pack}`}>{inner}</div>

  // Editorial + Instrumental + default: ShadCard with no border (CSS handles fill)
  return (
    <Card className={cn(`rep-kpi ${pack}`, 'ring-0 shadow-none')} style={{ border: 'none' }}>
      {inner}
    </Card>
  )
}

export function KPIChapter({ pack }: KPIChapterProps) {
  const isSystematic = pack === 'systematic'

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="01"
        title={isSystematic ? 'CORE METRICS' : '核心指标 · Core Metrics'}
      />
      {/* Matrix Grid — equal-rank N×M, narratively bound. No split, no primary. */}
      <div className="rep-kpi-matrix">
        {REPORT_MOCK.kpis.map((k, i) => (
          <KPICell key={i} k={k} pack={pack} />
        ))}
      </div>
    </section>
  )
}
