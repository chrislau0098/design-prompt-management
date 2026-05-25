// Chapter 4: YoY Comparison

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface CompareChapterProps {
  pack: string
}

export function CompareChapter({ pack }: CompareChapterProps) {
  const isSystematic = pack === 'systematic'
  const compare = REPORT_MOCK.compare
  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="04"
        title={isSystematic ? 'YEAR OVER YEAR' : '同比对照 · YoY Comparison'}
      />
      <div className="rep-comparison">
        <div className="rep-comp-col previous">
          <div className="rep-comp-year">{compare.previous.year}</div>
          <div className="rep-comp-num">
            ¥{compare.previous.num}
            <span style={{ fontSize: '0.4em', marginLeft: 4 }}>{compare.previous.unit}</span>
          </div>
          <div className="rep-comp-detail">{compare.previous.detail}</div>
        </div>
        <div className="rep-comp-col current">
          <div className="rep-comp-year">{compare.current.year}</div>
          <div className="rep-comp-num">
            ¥{compare.current.num}
            <span style={{ fontSize: '0.4em', marginLeft: 4 }}>{compare.current.unit}</span>
          </div>
          <div className="rep-comp-detail">{compare.current.detail}</div>
        </div>
      </div>
      <div className="rep-compare-bar">
        {compare.breakdown.map((b, i) => (
          <div className="row" key={`r${i}`}>
            <span className="label">{b.label}</span>
            <div className="rep-bar-track">
              <div
                className="rep-bar-fill"
                style={{ width: `${(b.value2026 / b.max) * 100}%` }}
              />
            </div>
            <span className="value">¥{b.value2026}亿</span>
          </div>
        ))}
      </div>
    </section>
  )
}
