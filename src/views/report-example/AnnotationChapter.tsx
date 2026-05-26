// Chapter 7 · Distribution Overview (R-103 Phase 2 rebuild)
//
// Composition: Annotation Rail (per default v0.1.md §11) — main 3/4 +
// narrow rail 1/4. The big number + claim carries the section; the donut
// becomes a supporting glyph rather than the focus.
//
// Inline styles removed in favor of CSS classes (DESIGN.md typography
// consistency). Tooltip styling preserved from R-103 Phase 1 fix.

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface AnnotationChapterProps {
  pack: string
  num?: string
}

const DONUT_DATA = REPORT_MOCK.proportion.rows.map(r => ({
  name: r.name,
  value: r.value,
}))

const CHART_VARS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5']

export function AnnotationChapter({ pack, num = '07' }: AnnotationChapterProps) {
  const isSystematic = pack === 'systematic'
  const ann = REPORT_MOCK.annotation

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num={num}
        title={isSystematic ? 'DISTRIBUTION OVERVIEW' : '占比分布 · Distribution'}
      />

      <div className="rep-annotation">
        {/* Main rail — signature stat + claim */}
        <div className="rep-ann-primary">
          <div className="rep-ann-eyebrow">{ann.eyebrow}</div>
          <div className="rep-ann-stat">
            <span>{ann.stat}</span>
            {ann.unit && <span className="unit">{ann.unit}</span>}
          </div>
          <p className="rep-ann-claim">{ann.claim}</p>
        </div>

        {/* Supporting rail — small donut + legend list */}
        <aside className="rep-ann-side">
          <div className="rep-ann-side-label">{isSystematic ? 'DISTRIBUTION' : '分布构成'}</div>
          <div className="rep-ann-donut-mount">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={DONUT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={2}
                  isAnimationActive={false}
                >
                  {DONUT_DATA.map((_, idx) => (
                    <Cell
                      key={`cell-${idx}`}
                      fill={`var(${CHART_VARS[idx] ?? CHART_VARS[4]})`}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value}%`, name]}
                  contentStyle={{
                    fontFamily: 'var(--mono-stack, monospace)',
                    fontSize: '11px',
                    background: 'var(--surface-l1)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-card, 4px)',
                    color: 'var(--foreground)',
                  }}
                  labelStyle={{ color: 'var(--foreground)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <ul className="rep-ann-legend">
            {DONUT_DATA.map((item, idx) => (
              <li key={item.name} className="rep-ann-legend-row">
                <span
                  className="rep-ann-legend-swatch"
                  style={{ background: `var(${CHART_VARS[idx] ?? CHART_VARS[4]})` }}
                  aria-hidden="true"
                />
                <span className="rep-ann-legend-name">{item.name}</span>
                <span className="rep-ann-legend-val">{item.value}%</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
