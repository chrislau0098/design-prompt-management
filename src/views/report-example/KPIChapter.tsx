// Chapter 1: KPI grid — R-87: ShadCard wrapping per pack

import { Card } from '@/components/ui/card'
import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'
import { cn } from '@/lib/utils'

interface KPIChapterProps {
  pack: string
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
      <div className="rep-kpi-num">
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
        {/* R-100 fix #3 · ring-0 撤掉 shadcn Card 默认 ring-1 ring-foreground/10(在 light slot 上漏出蓝/紫色 — 违反 principle 5 filled cards never carry visible borders)*/}
        <Card className="rep-kpi-inner rounded-[4px] ring-0 shadow-none" style={{ background: 'var(--surface-l2)', border: 'none' }}>
          {inner}
        </Card>
      </div>
    )
  }

  // Systematic: borderless top-hairline — no Card
  if (isSystematic) {
    return <div className={`rep-kpi ${pack}`}>{inner}</div>
  }

  // Festive Royal: hairline-only thin border, no Card
  if (isFestiveRoyal) {
    return <div className={`rep-kpi ${pack}`}>{inner}</div>
  }

  // Festive Editorial: top-hairline only, no Card
  if (isFestiveEditorial) {
    return <div className={`rep-kpi ${pack}`}>{inner}</div>
  }

  // Editorial + Instrumental: ShadCard with no border (CSS handles it)
  // R-100 fix #3 · ring-0 撤 shadcn Card 默认 ring(同上)
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
      <div className="rep-kpi-grid">
        {REPORT_MOCK.kpis.map((k, i) => (
          <KPICell key={i} k={k} pack={pack} />
        ))}
      </div>
    </section>
  )
}
