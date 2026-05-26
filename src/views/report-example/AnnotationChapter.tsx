// Chapter 7: Annotation / Distribution — recharts PieChart donut (native, no custom SVG)

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface AnnotationChapterProps {
  pack: string
}

// Derive 5 donut segments from proportion mock data
const DONUT_DATA = REPORT_MOCK.proportion.rows.map(r => ({
  name: r.name,
  value: r.value,
}))

const CHART_VARS = ['--chart-1', '--chart-2', '--chart-3', '--chart-4', '--chart-5']

export function AnnotationChapter({ pack }: AnnotationChapterProps) {
  const isSystematic = pack === 'systematic'
  const ann = REPORT_MOCK.annotation

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="07"
        title={isSystematic ? 'DISTRIBUTION OVERVIEW' : '占比分布 · Distribution'}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Left: signature stat + claim (preserved from before) */}
        <div className="rep-ann-primary">
          <div className="rep-ann-eyebrow">{ann.eyebrow}</div>
          <div className="rep-ann-stat">
            <span>{ann.stat}</span>
            {ann.unit && <span className="unit">{ann.unit}</span>}
          </div>
          <p className="rep-ann-claim">{ann.claim}</p>
        </div>

        {/* Right: recharts donut + legend list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
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
                  background: 'var(--surface-l2)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius-card, 4px)',
                  color: 'var(--foreground)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend list */}
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {DONUT_DATA.map((item, idx) => (
              <li
                key={item.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--sans-stack)',
                  fontSize: '13px',
                  color: 'var(--foreground-2)',
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    background: `var(${CHART_VARS[idx] ?? CHART_VARS[4]})`,
                    flexShrink: 0,
                  }}
                />
                <span style={{ flex: 1 }}>{item.name}</span>
                <span
                  style={{
                    fontFamily: 'var(--mono-stack)',
                    fontSize: '12px',
                    color: 'var(--foreground)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {item.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
