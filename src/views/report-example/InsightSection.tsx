// Section · Key Insights — Editorial Typographic Field (R-103 Phase 2 rebuild)
//
// Composition: hero insight on top (Typographic Field — type alone),
// supporting insights below as Sequence Track (index → statement → detail →
// figure right). Hairline separation, no cards, no side stripes.
//
// Phase 4.10 G6.1 redesign kept as the structural baseline; this round
// refines spacing rhythm and removes the asymmetric figure-rail column
// that competed with the statement for attention.

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

      {/* Hero insight — Typographic Field, eyebrow + statement + figure underline */}
      <div className="rep-insight-hero">
        <div className="rep-insight-hero-eyebrow">{isSystematic ? 'INSIGHT 01' : '主洞察 · 01'}</div>
        <h3 className="rep-insight-hero-statement">{hero.statement}</h3>
        <div className="rep-insight-hero-figure">{hero.metric}</div>
        <p className="rep-insight-hero-detail">{hero.detail}</p>
      </div>

      {/* Supporting insights — Sequence Track */}
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
