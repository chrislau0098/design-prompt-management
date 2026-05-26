// Chapter 6: Market Share / Proportion Field
// Phase 4.10 G6.3 redesign: equal-height columns via grid stretch + a more
// refined legend (rule-separated rows, label/value/abs alignment).

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface ProportionChapterProps {
  pack: string
}

export function ProportionChapter({ pack }: ProportionChapterProps) {
  const isSystematic = pack === 'systematic'
  const rows = REPORT_MOCK.proportion.rows
  const total = rows.reduce((s, r) => s + r.value, 0)
  const totalAmount = 36.5

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="06"
        title={isSystematic ? 'MARKET SHARE' : '市场份额 · Proportion Field'}
      />

      <div className="rep-proportion-split">
        {/* Left rail — headline + bars */}
        <div className="rep-proportion-rail">
          <header className="rep-prop-summary">
            <span className="rep-prop-headline">{REPORT_MOCK.proportion.headline}</span>
            <span className="rep-prop-caption">{REPORT_MOCK.proportion.caption}</span>
          </header>
          <div className="rep-prop-rows">
            {rows.map((r, i) => (
              <div className={`rep-prop-row${r.lead ? ' lead' : ''}`} key={`pr-${i}`}>
                <span className="name">{r.name}</span>
                <span className="value">
                  {r.value.toFixed(1)}
                  <span className="pct">%</span>
                </span>
                <div className="rep-prop-rail-bar">
                  <div className="fill" style={{ width: `${Math.min(r.value * 2.4, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right legend — refined rows */}
        <aside className="rep-prop-legend">
          <header className="rep-prop-legend-header">
            <span className="rep-prop-legend-label">{isSystematic ? 'SHARE DETAIL' : '份额详情'}</span>
            <span className="rep-prop-legend-sublabel">{isSystematic ? 'COMPANY · % · ¥亿' : '公司 · 占比 · 金额'}</span>
          </header>
          <ul className="rep-prop-legend-list">
            {rows.map((r, i) => (
              <li className={`rep-prop-legend-row${r.lead ? ' lead' : ''}`} key={`pl-${i}`}>
                <span className="rep-prop-legend-rank">{String(i + 1).padStart(2, '0')}</span>
                <span className="rep-prop-legend-name">{r.name}</span>
                <span className="rep-prop-legend-val">{r.value.toFixed(1)}%</span>
                <span className="rep-prop-legend-abs">¥{((r.value / 100) * totalAmount).toFixed(1)}亿</span>
              </li>
            ))}
          </ul>
          <footer className="rep-prop-legend-total">
            <span className="label">{isSystematic ? 'TOTAL' : '合计'}</span>
            <span className="pct">{total.toFixed(1)}%</span>
            <span className="abs">¥{totalAmount.toFixed(1)}亿</span>
          </footer>
        </aside>
      </div>
    </section>
  )
}
