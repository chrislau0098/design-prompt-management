// Chapter 4: YoY Comparison
// Phase 4.10 G6.2 redesign: inline delta typography replaces the 3-col card.
// Layout: previous (muted, small) → arrow + delta value (mid) → current
// (primary, large) on one horizontal axis, baseline-aligned. Below, a
// breakdown rail uses paired bars (2025 ghost / 2026 solid) for richer
// year-over-year reading.

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface CompareChapterProps {
  pack: string
}

export function CompareChapter({ pack }: CompareChapterProps) {
  const isSystematic = pack === 'systematic'
  const compare = REPORT_MOCK.compare
  const deltaAbs = (parseFloat(compare.current.num) - parseFloat(compare.previous.num)).toFixed(1)
  const deltaPct = '18.2'

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="04"
        title={isSystematic ? 'YEAR OVER YEAR' : '同比对照 · YoY Comparison'}
      />

      {/* Inline comparison composition */}
      <div className="rep-comp-inline">
        <div className="rep-comp-inline-row">
          <div className="rep-comp-inline-prev">
            <div className="rep-comp-inline-year">{compare.previous.year}</div>
            <div className="rep-comp-inline-prev-num">
              ¥{compare.previous.num}
              <span className="rep-comp-inline-prev-unit">{compare.previous.unit}</span>
            </div>
          </div>

          <div className="rep-comp-inline-delta" aria-label={`Year-over-year delta +${deltaAbs}`}>
            <span className="rep-comp-inline-arrow">→</span>
            <span className="rep-comp-inline-delta-val">+{deltaAbs}</span>
            <span className="rep-comp-inline-delta-unit">{compare.current.unit}</span>
            <span className="rep-comp-inline-delta-pct">▲ {deltaPct}%</span>
          </div>

          <div className="rep-comp-inline-curr">
            <div className="rep-comp-inline-year curr">{compare.current.year}</div>
            <div className="rep-comp-inline-curr-num">
              ¥{compare.current.num}
              <span className="rep-comp-inline-curr-unit">{compare.current.unit}</span>
            </div>
          </div>
        </div>

        <p className="rep-comp-inline-detail">
          {compare.current.detail} · {compare.previous.detail}
        </p>
      </div>

      {/* Paired breakdown rail — 2025 ghost / 2026 solid */}
      <div className="rep-compare-breakdown">
        <div className="rep-compare-breakdown-header">
          <span>{isSystematic ? 'BREAKDOWN BY SEGMENT' : '业务线分项 · 2025 → 2026'}</span>
          <span className="rep-compare-breakdown-legend">
            <span className="leg ghost" aria-hidden /> 2025
            <span className="leg solid" aria-hidden /> 2026
          </span>
        </div>
        {compare.breakdown.map((b, i) => {
          const prev = b.value2025 ?? 0
          const curr = b.value2026
          const max = b.max
          return (
            <div className="rep-compare-breakdown-row" key={`cb${i}`}>
              <span className="label">{b.label}</span>
              <div className="rep-compare-breakdown-tracks">
                <div className="track ghost">
                  <div className="fill" style={{ width: `${(prev / max) * 100}%` }} />
                </div>
                <div className="track solid">
                  <div className="fill" style={{ width: `${(curr / max) * 100}%` }} />
                </div>
              </div>
              <span className="values">
                <span className="muted">¥{prev.toFixed(1)}</span>
                <span className="arrow">→</span>
                <span className="bright">¥{curr.toFixed(1)}亿</span>
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
