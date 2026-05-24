// Chapter 6: Market Share / Proportion Field
// R-87: proportion rail → Progress-style fill bar (CSS-only, mirrors ShadProgress behavior)

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface ProportionChapterProps {
  pack: string
}

export function ProportionChapter({ pack }: ProportionChapterProps) {
  const isSystematic = pack === 'systematic'
  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="06"
        title={isSystematic ? 'MARKET SHARE' : '市场份额 · Proportion Field'}
      />
      <div className="rep-proportion">
        <div className="rep-prop-summary">
          <span className="rep-prop-headline">{REPORT_MOCK.proportion.headline}</span>
          <span className="rep-prop-caption">{REPORT_MOCK.proportion.caption}</span>
        </div>
        <div className="rep-prop-rows">
          {REPORT_MOCK.proportion.rows.map((r, i) => (
            <div
              className={`rep-prop-row${r.lead ? ' lead' : ''}`}
              key={`pr-${i}`}
            >
              <span className="name">{r.name}</span>
              <span className="value">
                {r.value.toFixed(1)}
                <span className="pct">%</span>
              </span>
              {/* Rail: CSS-only progress bar to avoid Radix dependency in report view */}
              <div className="rep-prop-rail">
                <div className="fill" style={{ width: `${Math.min(r.value * 2.4, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
