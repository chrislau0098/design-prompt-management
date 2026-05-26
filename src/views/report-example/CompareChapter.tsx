// Chapter 4 · YoY Comparison — Editorial inline headline (R-104 Phase 2 rebuild)
//
// Composition: a single declarative headline that reads as one phrase.
//   From ¥30.9亿 (2025)   →   ¥36.5亿 (2026)   ▲ 18.2%
//
// Removed R-103 three-column asymmetric split (Chris feedback round-3:
// left/center/right alignment created visual fragmentation). Now everything
// rides one baseline; the numbers carry the contrast through weight + color,
// the delta is inline at the tail.

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface CompareChapterProps {
  pack: string
  num?: string
}

export function CompareChapter({ pack, num = '04' }: CompareChapterProps) {
  const isSystematic = pack === 'systematic'
  const compare = REPORT_MOCK.compare
  const deltaPct = '18.2'

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num={num}
        title={isSystematic ? 'YEAR OVER YEAR' : '同比对照 · YoY Comparison'}
      />

      <div className="rep-comp-split">
        <span className="rep-comp-lead">从</span>
        <span className="rep-comp-num prev">
          <span className="prefix">¥</span>
          <span>{compare.previous.num}</span>
          <span className="unit">{compare.previous.unit}</span>
          <span className="year">{compare.previous.year}</span>
        </span>
        <span className="rep-comp-lead">至</span>
        <span className="rep-comp-num curr">
          <span className="prefix">¥</span>
          <span>{compare.current.num}</span>
          <span className="unit">{compare.current.unit}</span>
          <span className="year">{compare.current.year}</span>
        </span>
        <span className="rep-comp-delta" aria-label={`Year-over-year ▲ ${deltaPct}%`}>
          <span className="arrow" aria-hidden="true">▲</span>
          <span className="val">{deltaPct}</span>
          <span className="pct">%</span>
        </span>
      </div>

      <p className="rep-comp-caption">{compare.current.detail}</p>
    </section>
  )
}
