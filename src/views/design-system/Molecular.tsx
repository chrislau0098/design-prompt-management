import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts'

interface MolecularProps {
  slot: Record<string, any>
}

// R-100 fix #5 · Shared ChartTooltipCard + buildTooltipProps (was local, now lives in src/lib/chart-tooltip.tsx)
import { buildTooltipProps } from '@/lib/chart-tooltip'

function commonAxisProps() {
  return {
    stroke: 'var(--fg-3)',
    tick: { fill: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--mono-stack)' } as any,
    tickLine: false,
    axisLine: { stroke: 'var(--border-strong)' },
  }
}

export function Molecular({ slot }: MolecularProps) {
  const chart = slot.molecular?.chart
  const pack = slot.style_meta?.decorative_pack ?? 'editorial'

  if (!chart) return null

  const useNatural = chart.area_type === 'natural'
  const fillIsGradient = chart.area_fill_opacity === 'gradient'

  const areaData = [
    { name: 'Q1', value: 50 }, { name: 'Q2', value: 78 }, { name: 'Q3', value: 62 },
    { name: 'Q4', value: 95 }, { name: 'Q5', value: 130 }, { name: 'Q6', value: 115 },
    { name: 'Q7', value: 160 }, { name: 'Q8', value: 175 },
  ]

  const lineData = areaData.map((d, i) => ({
    name: d.name,
    A: [40, 55, 50, 72, 88, 75, 102, 118][i],
    B: [80, 70, 78, 85, 82, 90, 95, 100][i],
  }))

  const barData = [
    { name: '北京', value: 130 }, { name: '上海', value: 110 }, { name: '广州', value: 95 },
    { name: '深圳', value: 105 }, { name: '成都', value: 82 }, { name: '杭州', value: 72 },
    { name: '南京', value: 64 },
  ]

  const tooltipProps = buildTooltipProps(pack)
  const axisProps = commonAxisProps()

  return (
    <section className="section" id="m-chart">
      <div className="section-header">
        <span className="section-num">M-03</span>
        <h2 className="section-title">Chart · Recharts Live</h2>
        <span className="section-desc">
          {chart.area_type} · grid {chart.grid_dasharray ?? 'none'} · last:{chart.last_point_treatment} · tooltip:{chart.tooltip_card}
        </span>
      </div>

      <div className="shader-status ok">
        <span className="dot" />
        <span>recharts@2 · live · {chart.area_type} · {chart.tooltip_card}</span>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <div className="chart-card-title">Area · 营收曲线</div>
          <div className="chart-react-mount">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                {fillIsGradient && (
                  <defs>
                    <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                )}
                {chart.grid_dasharray && (
                  <CartesianGrid
                    stroke="var(--border-strong)"
                    strokeDasharray={chart.grid_dasharray}
                    vertical={!!chart.grid_vertical}
                  />
                )}
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={28} />
                <Tooltip {...tooltipProps} />
                <Area
                  type={useNatural ? 'natural' : 'monotone'}
                  dataKey="value"
                  stroke="var(--chart-1)"
                  strokeWidth={1.5}
                  fill={fillIsGradient ? 'url(#area-grad)' : 'var(--chart-1)'}
                  fillOpacity={fillIsGradient ? 1 : (typeof chart.area_fill_opacity === 'number' ? chart.area_fill_opacity : 0.22)}
                  isAnimationActive={false}
                  activeDot={
                    chart.last_point_treatment === 'activeDot'
                      ? { r: 5, stroke: 'var(--chart-1)', fill: 'var(--bg)', strokeWidth: 2 }
                      : chart.last_point_treatment === 'halo+dot'
                      ? { r: 4, fill: 'var(--chart-1)' }
                      : false
                  }
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Line · 双轴对比</div>
          <div className="chart-react-mount">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                {chart.grid_dasharray && (
                  <CartesianGrid
                    stroke="var(--border-strong)"
                    strokeDasharray={chart.grid_dasharray}
                    vertical={!!chart.grid_vertical}
                  />
                )}
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={28} />
                <Tooltip {...tooltipProps} />
                <Line
                  type={useNatural ? 'natural' : 'monotone'}
                  dataKey="A"
                  stroke="var(--chart-1)"
                  strokeWidth={1.8}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4, fill: 'var(--chart-1)' }}
                />
                <Line
                  type={useNatural ? 'natural' : 'monotone'}
                  dataKey="B"
                  stroke="var(--chart-3)"
                  strokeWidth={1.2}
                  strokeDasharray="3 3"
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-card-title">Bar · 城市分布</div>
          <div className="chart-react-mount">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                {chart.grid_dasharray && (
                  <CartesianGrid
                    stroke="var(--border-strong)"
                    strokeDasharray={chart.grid_dasharray}
                    vertical={!!chart.grid_vertical}
                  />
                )}
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={28} />
                <Tooltip {...tooltipProps} />
                <Bar dataKey="value" radius={[2, 2, 0, 0] as any} isAnimationActive={false}>
                  {barData.map((_, i) => (
                    <Cell
                      key={`c-${i}`}
                      fill={i === 0 ? 'var(--chart-1)' : `var(--chart-${(i % 4) + 2})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  )
}
