// REPORT_MOCK — migrated from reference index.html line 7038-7116

export const REPORT_MOCK = {
  eyebrow: 'VIBE VIEW · 2026 ANNUAL CAMPAIGN',
  title: '二〇二六年度战报 · ANNUAL REPORT',
  titleSwiss: 'ANNUAL CAMPAIGN 2026',
  gmv: { num: '36.5', unit: '亿', prefix: '¥' },
  delta: { dir: 'up' as const, value: '18.2%', label: 'YoY' },
  lead: '本年度营收创历史新高,同比增长 18.2%,核心产品矩阵突破 4.54 亿月活用户。',
  kpis: [
    { label: '月活用户', num: '4.54', unit: '亿', delta: '+12.0%' },
    { label: '付费率', num: '8.7', unit: '%', delta: '+1.2pp' },
    { label: 'ARPU', num: '320', unit: '¥', delta: '+24.0%' },
    { label: 'NPS', num: '67', unit: '', delta: '+9' },
  ],
  trend: [
    { name: 'Jan', value: 22, last: 16 }, { name: 'Feb', value: 28, last: 22 },
    { name: 'Mar', value: 26, last: 21 }, { name: 'Apr', value: 30, last: 23 },
    { name: 'May', value: 34, last: 25 }, { name: 'Jun', value: 32, last: 27 },
    { name: 'Jul', value: 36, last: 28 }, { name: 'Aug', value: 39, last: 30 },
    { name: 'Sep', value: 38, last: 32 }, { name: 'Oct', value: 41, last: 33 },
    { name: 'Nov', value: 44, last: 35 }, { name: 'Dec', value: 48, last: 36 },
  ],
  // Round-82 改 4: NEW Timeline / Sequence chapter mock (Q1-Q4 milestones)
  timeline: [
    { period: 'Q1 · 2026', title: '产品矩阵重组', detail: '三条核心业务线统一进入新框架,基础日活用户从 3.1 亿跃升至 3.6 亿。' },
    { period: 'Q2 · 2026', title: 'AI 助手公测', detail: '智能对话能力嵌入核心场景,首月留存提升 14 个百分点。' },
    { period: 'Q3 · 2026', title: '海外双地区开服', detail: '新加坡 / 阿姆斯特丹节点上线,海外 GMV 占比首次跨过 18%。' },
    { period: 'Q4 · 2026', title: '系统化复利显现', detail: '四个季度产品复利叠加,Q4 单季营收 ¥11.2 亿,创历史峰值。' },
  ],
  compare: {
    current: { year: '2026', num: '36.5', unit: '亿', detail: '同比增长 18.2%' },
    previous: { year: '2025', num: '30.9', unit: '亿', detail: '基准 baseline' },
    breakdown: [
      { label: '电商业务', value2026: 18.2, value2025: 14.6, max: 20 },
      { label: '广告业务', value2026: 9.4, value2025: 8.8, max: 20 },
      { label: '订阅服务', value2026: 5.6, value2025: 4.1, max: 20 },
      { label: '其他', value2026: 3.3, value2025: 3.4, max: 20 },
    ],
  },
  // Round-82 改 4: NEW Peer Set / Ranking chapter mock (top-5 by GMV)
  ranking: [
    { rank: 'NO.1', name: 'Vibe view', sub: '本公司', value: '36.5', unit: '亿', lead: true },
    { rank: 'NO.2', name: 'Aurora Group', sub: '消费 / 内容', value: '18.2', unit: '亿', lead: false },
    { rank: 'NO.3', name: 'Northstar Labs', sub: '广告 / SaaS', value: '9.7', unit: '亿', lead: false },
    { rank: 'NO.4', name: 'Pulse Studio', sub: '订阅 / Tools', value: '4.8', unit: '亿', lead: false },
    { rank: 'NO.5', name: 'Origin Works', sub: '内容 / 社区', value: '2.1', unit: '亿', lead: false },
  ],
  // Round-82 改 4: NEW Proportion Field chapter mock (market share)
  proportion: {
    headline: '38.4%',
    caption: '本公司在四家头部厂商联合统计中的份额',
    rows: [
      { name: '本公司', value: 38.4, lead: true },
      { name: '玩家二', value: 22.5, lead: false },
      { name: '玩家三', value: 17.8, lead: false },
      { name: '玩家四', value: 12.1, lead: false },
      { name: '其他长尾', value: 9.2, lead: false },
    ],
  },
  // Round-82 改 4: NEW Annotation Rail chapter mock (number + marginalia)
  annotation: {
    eyebrow: 'SIGNATURE METRIC · NEW PRODUCT LINE',
    stat: '4.54',
    unit: '亿',
    claim: '智能助手公测首月即抵 4.54 亿月活,等于第二条业务线在三年前的全部规模。',
    sideLabel: 'METHOD',
    sideText: '统计口径为产品周期内一次以上有效交互的去重账号;不含被动消息推送触达。最初仅覆盖移动端,Q4 起补全 Web 端但保留独立统计字段以确保历史可比。',
    citation: '— 数据治理委员会 · Q4 备忘',
  },
  quote: {
    text: '增长不再来自单一爆款,而来自系统性的产品矩阵复利。',
    textSwiss: 'GROWTH IS THE INTEREST OF A WELL-BUILT SYSTEM.',
    cite: 'CEO · 2026 ANNUAL LETTER',
  },
  outro: {
    claim: '当数字归于平静,叙事仍在延续。',
    claimSwiss: 'NUMBERS REST. THE NARRATIVE CONTINUES.',
    colophon: 'END OF REPORT · 2026·05·21',
  },
}
