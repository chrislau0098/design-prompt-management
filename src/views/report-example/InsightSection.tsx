// InsightSection — editorial typographic field for core insights
// Phase 4.10 G6.1 redesign: no card grid, no side-stripe border.
// Layout: one hero insight (large statement + figure inline) + three
// supporting insights laid out as eyebrow → statement → detail rows
// separated by hairlines. Numbers carry weight; cards stay absent.

import { ChapterOpener } from './ChapterOpener'
import { INSIGHTS_MOCK } from './data'

interface InsightSectionProps {
  pack?: string
  num?: string
}

export function InsightSection({ pack = 'default', num = '04' }: InsightSectionProps) {
  const isSystematic = pack === 'systematic'
  const items = INSIGHTS_MOCK.items
  const [hero, ...rest] = items

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num={num}
        title={isSystematic ? 'KEY INSIGHTS' : '核心洞察 · Key Insights'}
      />

      {/* Hero insight: large statement + figure inline, no card */}
      <div className="rep-insight-hero">
        <div className="rep-insight-hero-eyebrow">{isSystematic ? 'INSIGHT 01' : '主洞察 · 01'}</div>
        <h3 className="rep-insight-hero-statement">{hero.statement}</h3>
        <div className="rep-insight-hero-figure">{hero.metric}</div>
        <p className="rep-insight-hero-detail">{hero.detail}</p>
      </div>

      {/* Supporting insights: numbered rows, hairline-separated */}
      <ol className="rep-insight-rows">
        {rest.map((item, i) => {
          const idx = String(i + 2).padStart(2, '0')
          return (
            <li className="rep-insight-row" key={`ins-${idx}`}>
              <div className="rep-insight-row-index">{idx}</div>
              <div className="rep-insight-row-body">
                <div className="rep-insight-row-statement">{item.statement}</div>
                <p className="rep-insight-row-detail">{item.detail}</p>
              </div>
              <div className="rep-insight-row-figure">{item.metric}</div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
