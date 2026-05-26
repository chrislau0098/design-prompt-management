// Chapter 4 · YoY Comparison — A 方案 (R-103 Phase 2 rebuild)
//
// Composition: Asymmetric Split (per default v0.1.md §11). Three columns —
// previous (muted, right-aligned), inline delta arrow + percentage,
// current (--primary, left-aligned). Single-axis baseline alignment.
//
// Removed Phase 4.10 paired-bar breakdown (Chris feedback round-2: too busy).
// Removed boxed delta col. Numbers carry the entire contrast.

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
        {/* Previous — text-align right, muted */}
        <div className="rep-comp-side prev">
          <div className="rep-comp-side-year">{compare.previous.year}</div>
          <div className="rep-comp-side-num">
            <span className="prefix">¥</span>
            <span>{compare.previous.num}</span>
            <span className="unit">{compare.previous.unit}</span>
          </div>
          <div className="rep-comp-side-detail">{compare.previous.detail}</div>
        </div>

        {/* Delta — inline arrow + percentage. No box. */}
        <div className="rep-comp-delta" aria-label={`Year-over-year ▲ ${deltaPct}%`}>
          <span className="rep-comp-delta-arrow" aria-hidden="true">▲</span>
          <span className="rep-comp-delta-val">{deltaPct}</span>
          <span className="rep-comp-delta-pct">%</span>
        </div>

        {/* Current — text-align left, primary */}
        <div className="rep-comp-side curr">
          <div className="rep-comp-side-year">{compare.current.year}</div>
          <div className="rep-comp-side-num">
            <span className="prefix">¥</span>
            <span>{compare.current.num}</span>
            <span className="unit">{compare.current.unit}</span>
          </div>
          <div className="rep-comp-side-detail">{compare.current.detail}</div>
        </div>
      </div>
    </section>
  )
}
