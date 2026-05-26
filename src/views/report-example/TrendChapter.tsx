// Chapter 2: Monthly Trend — recharts AreaChart

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'
// R-100 fix #5 · Shared ChartTooltipCard (was local stub, drifted from DS Molecular)
import { buildTooltipProps } from '@/lib/chart-tooltip'

interface TrendChapterProps {
  pack: string
  slot: Record<string, any>
}

export function TrendChapter({ pack, slot }: TrendChapterProps) {
  const isSystematic = pack === 'systematic'
  const isTheatrical = pack === 'theatrical'
  const chart = slot.molecular?.chart ?? {}
  const useNatural = chart.area_type === 'natural'
  const fillIsGradient = chart.area_fill_opacity === 'gradient'
  const fillOpacity =
    fillIsGradient ? 1 : typeof chart.area_fill_opacity === 'number' ? chart.area_fill_opacity : 0.22

  const metaCapStyle: React.CSSProperties = {
    fontFamily: isSystematic ? 'var(--sans-stack)' : 'var(--mono-stack)',
    fontWeight: isSystematic ? 700 : 500,
    fontSize: 11,
    color: 'var(--fg-3)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  }

  const chartStageContent = (
    <>
      <div className="rep-chart-meta">
        <div className="left">
          <span className="num">+45.4%</span>
          <span style={metaCapStyle}>十二月 · 同比</span>
        </div>
        <span style={metaCapStyle}>2026 vs 2025</span>
      </div>
      <div className="rep-chart-mount">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={REPORT_MOCK.trend} margin={{ top: 12, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="rep-area-grad" x1={0} y1={0} x2={0} y2={1}>
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            {chart.grid_dasharray && (
              <CartesianGrid
                stroke="var(--border-strong)"
                strokeDasharray={chart.grid_dasharray}
                vertical={!!chart.grid_vertical}
              />
            )}
            <XAxis
              dataKey="name"
              stroke="var(--fg-3)"
              tick={{ fill: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--mono-stack)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-strong)' }}
            />
            <YAxis
              stroke="var(--fg-3)"
              tick={{ fill: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--mono-stack)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-strong)' }}
              width={32}
            />
            <Tooltip {...buildTooltipProps(pack)} />
            {/* Last year — lighter, dashed */}
            <Area
              type={useNatural ? 'natural' : 'monotone'}
              dataKey="last"
              stroke="var(--chart-3)"
              strokeWidth={1}
              strokeDasharray="4 4"
              fill="transparent"
              isAnimationActive={false}
              dot={false}
            />
            {/* This year — primary, with gradient */}
            <Area
              type={useNatural ? 'natural' : 'monotone'}
              dataKey="value"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill={fillIsGradient ? 'url(#rep-area-grad)' : 'var(--chart-1)'}
              fillOpacity={fillOpacity}
              isAnimationActive={false}
              activeDot={{ r: 5, stroke: 'var(--chart-1)', fill: 'var(--bg)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )

  // Q4 monthly detail mini-table (last 3 months)
  const q4Mini = REPORT_MOCK.trend.slice(-3)

  const trendChartStage = isTheatrical ? (
    <div className="rep-chart-stage">
      <div className="rep-chart-stage-inner">{chartStageContent}</div>
    </div>
  ) : (
    <div className="rep-chart-stage">{chartStageContent}</div>
  )

  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="02"
        title={isSystematic ? 'MONTHLY TREND' : '增长轨迹 · Monthly Trend'}
      />
      {/* Asymmetric split: chart 70% / mini-table 30% */}
      <div className="rep-trend-split">
        <div className="rep-trend-main">{trendChartStage}</div>
        <aside className="rep-trend-aside">
          <div className="rep-trend-aside-label">{isSystematic ? 'Q4 DETAIL' : 'Q4 月度详情'}</div>
          <div className="rep-trend-mini-table">
            <div className="rep-tmt-header">
              <span>月份</span>
              <span>本期</span>
              <span>去年</span>
            </div>
            {q4Mini.map((row, i) => (
              <div className="rep-tmt-row" key={`tmt-${i}`}>
                <span>{row.name}</span>
                <span className="current">{row.value}</span>
                <span className="last">{row.last}</span>
              </div>
            ))}
          </div>
          <div className="rep-trend-legend">
            <span className="rep-trend-leg-item current">{isSystematic ? '2026' : '2026 本期'}</span>
            <span className="rep-trend-leg-item last">{isSystematic ? '2025' : '2025 去年'}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
