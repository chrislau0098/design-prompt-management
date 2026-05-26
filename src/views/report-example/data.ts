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
  // Round-82 改 4 / Phase 4.7 扩: 7-node timeline with figure numbers
  timeline: [
    { period: 'Q1 · Jan', title: '产品矩阵重组', detail: '三条核心业务线统一进入新框架,基础日活用户从 3.1 亿跃升至 3.6 亿。', figure: '+16% DAU' },
    { period: 'Q1 · Mar', title: '付费率破阈', detail: '付费率首次突破 8%,ARPU 同步抬升至 ¥298,验证高价值用户留存路径。', figure: '8.1% CVR' },
    { period: 'Q2 · 2026', title: 'AI 助手公测', detail: '智能对话能力嵌入核心场景,首月留存提升 14 个百分点。', figure: '+14pp 留存' },
    { period: 'Q3 · Jul', title: '海外双地区开服', detail: '新加坡 / 阿姆斯特丹节点上线,海外 GMV 占比首次跨过 18%。', figure: '18% 海外占比' },
    { period: 'Q3 · Sep', title: 'NPS 历史高点', detail: 'Net Promoter Score 达到 67,较年初提升 9 分,连续三季度正向改善。', figure: 'NPS 67' },
    { period: 'Q4 · Oct', title: '广告系统升级', detail: '新归因模型上线,广告主 ROAS 提升 22%,平台广告营收环比 +18%。', figure: '+22% ROAS' },
    { period: 'Q4 · Dec', title: '系统化复利显现', detail: '四个季度产品复利叠加,Q4 单季营收 ¥11.2 亿,创历史峰值。', figure: '¥11.2亿 / Q' },
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
  // Round-82 改 4 / Phase 4.7 扩: 8-row ranking with share %
  ranking: [
    { rank: 'NO.1', name: 'Vibe view', sub: '本公司', value: '36.5', unit: '亿', share: '38.4%', lead: true },
    { rank: 'NO.2', name: 'Aurora Group', sub: '消费 / 内容', value: '18.2', unit: '亿', share: '19.2%', lead: false },
    { rank: 'NO.3', name: 'Northstar Labs', sub: '广告 / SaaS', value: '9.7', unit: '亿', share: '10.2%', lead: false },
    { rank: 'NO.4', name: 'Pulse Studio', sub: '订阅 / Tools', value: '6.4', unit: '亿', share: '6.7%', lead: false },
    { rank: 'NO.5', name: 'Origin Works', sub: '内容 / 社区', value: '4.8', unit: '亿', share: '5.1%', lead: false },
    { rank: 'NO.6', name: 'Crestline Inc.', sub: '企业 / B2B', value: '3.2', unit: '亿', share: '3.4%', lead: false },
    { rank: 'NO.7', name: 'Refract Media', sub: '短视频', value: '2.1', unit: '亿', share: '2.2%', lead: false },
    { rank: 'NO.8', name: 'Others', sub: '长尾合计', value: '14.1', unit: '亿', share: '14.8%', lead: false },
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
    attribution: '写于 2026 年 12 月 31 日年终致全员信',
  },
  outro: {
    claim: '当数字归于平静,叙事仍在延续。',
    claimSwiss: 'NUMBERS REST. THE NARRATIVE CONTINUES.',
    colophon: 'END OF REPORT · 2026·05·21',
  },
}

export const INSIGHTS_MOCK = {
  eyebrow: 'KEY INSIGHTS · 核心洞察',
  items: [
    {
      statement: '增长飞轮已形成正向闭环',
      metric: 'DAU × ARPU 双升 · 复合增速 21%',
      detail: '月活与付费率同步提升,打破"规模 vs 变现"零和格局。',
    },
    {
      statement: 'AI 助手是本年最大增量',
      metric: '首月 +14pp 留存率',
      detail: '智能对话功能改写高价值用户的产品粘性曲线,留存提升效果明显优于历史版本。',
    },
    {
      statement: '海外市场占比首次破阈',
      metric: '18% 海外 GMV 占比',
      detail: '新加坡 / 阿姆斯特丹节点上线半年即贡献规模,海外路径验证完成。',
    },
    {
      statement: '广告系统升级释放单位价值',
      metric: '+22% ROAS · 广告营收 +18%',
      detail: '新归因模型使广告主实际回报提升,带动平台广告收入连续两季加速增长。',
    },
  ],
}

