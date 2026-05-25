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

/* ─── ChartTooltipCard (per-pack styles) ─── */
function ChartTooltipCard({ active, payload, label, pack }: {
  active?: boolean
  payload?: any[]
  label?: string
  pack: string
}) {
  if (!active || !payload || !payload.length) return null

  const stylesByPack: Record<string, React.CSSProperties> = {
    editorial: {
      background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 12,
      boxShadow: '0 4px 16px color-mix(in oklch, var(--fg) 6%, transparent)',
      padding: '12px 16px', minWidth: 140, fontFamily: 'var(--sans-stack)',
    },
    theatrical: {
      background: 'var(--surface-l2)', border: '1px solid color-mix(in oklch, var(--fg) 10%, transparent)',
      borderRadius: 6,
      boxShadow: '0 0 0 1px color-mix(in oklch, var(--primary) 14%, transparent), 0 8px 24px color-mix(in oklch, var(--primary) 12%, transparent)',
      padding: '10px 14px', minWidth: 140, fontFamily: 'var(--sans-stack)',
    },
    instrumental: {
      background: 'var(--surface-l2)', border: '1px solid var(--border-strong)',
      borderRadius: 4,
      boxShadow: 'inset 0 1px 0 0 oklch(1 0 0 / 0.06), 0 2px 8px oklch(0 0 0 / 0.20)',
      padding: '10px 12px', minWidth: 130, fontFamily: 'var(--mono-stack)',
    },
    systematic: {
      background: 'var(--bg)', border: '1px solid var(--border-strong)',
      borderRadius: 0, boxShadow: 'none', padding: '10px 14px', minWidth: 130,
      fontFamily: 'var(--sans-stack)',
    },
  }

  const labelStyles: Record<string, React.CSSProperties> = {
    editorial: { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
    theatrical: { color: 'var(--fg-3)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'var(--mono-stack)' },
    instrumental: { color: 'var(--fg-3)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 },
    systematic: { color: 'var(--fg)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6, fontWeight: 700 },
  }

  const valueStyles: Record<string, React.CSSProperties> = {
    editorial: { color: 'var(--fg)', fontSize: 15, fontWeight: 500, fontFamily: 'var(--display-stack)', letterSpacing: '-0.01em' },
    theatrical: { color: 'var(--primary)', fontSize: 16, fontWeight: 600, fontFamily: 'var(--display-stack)' },
    instrumental: { color: 'var(--fg)', fontSize: 13, fontWeight: 500, fontFeatureSettings: '"tnum","lnum"' },
    systematic: { color: 'var(--fg)', fontSize: 16, fontWeight: 700, fontFamily: 'var(--sans-stack)', letterSpacing: '-0.005em' },
  }

  const s = stylesByPack[pack] ?? stylesByPack.editorial
  const ls = labelStyles[pack] ?? labelStyles.editorial
  const vs = valueStyles[pack] ?? valueStyles.editorial

  return (
    <div style={s}>
      {label != null && <div style={ls}>{String(label)}</div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {payload.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ color: 'var(--fg-3)', fontSize: 11, fontFamily: 'var(--mono-stack)', letterSpacing: '0.04em' }}>
              {p.name ?? p.dataKey}
            </span>
            <span style={vs}>
              {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function commonAxisProps() {
  return {
    stroke: 'var(--fg-3)',
    tick: { fill: 'var(--fg-3)', fontSize: 10, fontFamily: 'var(--mono-stack)' } as any,
    tickLine: false,
    axisLine: { stroke: 'var(--border-strong)' },
  }
}

function buildTooltipProps(pack: string) {
  return {
    cursor: pack === 'systematic'
      ? { stroke: 'var(--border-strong)', strokeDasharray: '2 2', fill: 'transparent' }
      : { fill: 'var(--chart-hover)' },
    content: (props: any) => <ChartTooltipCard {...props} pack={pack} />,
    wrapperStyle: { outline: 'none' },
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
