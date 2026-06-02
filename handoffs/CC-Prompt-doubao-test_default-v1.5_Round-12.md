# CC-Prompt-doubao-test_default-v1.5_Round-12

R-134 Phase 6 / doubao Round-12 测试 / default v1.5

## 任务

使用 doubao Code 模型(`doubao-seed-2-0-code-preview-260215`)对 default v1.5 prompt 跑批量生成测试,验证 R-134 修复 + Tooltip 反馈 + F1-F6 critical fix + P1-P6 PE polish 在弱模型实际生成中是否达成。

## 输入

- 主 prompt: `prompts/vibe-view-campaign-report/default/v1.5.md`(571 行,commit d25b6b7)
- DESIGN.md: 仓库根目录(职能边界 — 仅约束样式)
- 上一轮基线: v1.4(R-11) — R-12 verify v1.5 改动收益

## 9 Query 集(4 维度 + Tooltip 重点)

### Q1 · 复杂数据 · multi-chart · dark mode
某 SaaS 产品 2026 Q1 季度增长战报。GMV 同比 +42%,DAU 8.2M,ARR 新增 ¥1,520 万,客户数 4,765.7 万人。3 个核心 KPI + 时序图(Area)+ 排行(Bar)+ 客户分布(Pie)+ 5 大事件时间线 + 用户引言。
- 色:深蓝 / Mode: dark
- 验证:Tooltip 全部 wire ChartTooltipCard,dark mode 文字 token-derived,AnimateNumber × 3,Hero vertical stack 单列,字号字重符合

### Q2 · 喜庆国潮 · custom · light
某老字号品牌 2026 春节限定礼盒销售战报。销售 12,800 套 ▲ 35%,客单价 ¥588,5 大热销 SKU,3 个文化故事节点。
- 色:朱红 / Mode: light
- 验证:ceremonial routing → Grain shader(**非 Mesh**),EB Garamond + Ma Shan Zheng / Zhuque Fangsong 衬线,字重 ≤ 500,ChapterStamp ornament-framed `◆ NN ◆`

### Q3 · 科技 SaaS · dashboard · dark
某云计算平台 2026 Q1 监控报告。CPU 利用率 / Memory / Network throughput 多 Time Series。3 KPI + 趋势图。
- 色:墨绿 / Mode: dark
- 验证:geometric routing → Mesh shader + Geist 字体;Tooltip dark mode 文字可读;Recharts grid `--divider`

### Q4 · 用户定制紫色 · custom · dark
某教育公司 2026 春季学期 OKR 完成度复盘。3 个核心 KPI + 5 大事件时间线 + 学员排行 + 总结 Quote。
- 色:紫色 #7C3AED / Mode: dark
- 验证:`--primary` 紫色 OKLCH parse 正确,dark mode bg L ≤ 0.16,无黑边,Tooltip card 紫色主调圆点

### Q5 · editorial 杂志 · light · 文字密集
某文化出版社 2026 上半年新书销售报告。10 本新书 ranking + 文化趋势叙述。
- 色:深褐 / Mode: light
- 验证:editorial routing → **Grain shader(非 Mesh!)**,Spectral / EB Garamond 衬线字体,字重 ≤ 500,Stacked Band ranking

### Q6 · 工业硬核运动 · impact · dark
某运动品牌 2026 Q1 销售战报。GMV 突破历史最高 ¥3.56 亿,5 个核心产品 + 增长曲线 + 用户分布。
- 色:橙红 / Mode: dark
- 验证:impact routing → Mesh + Bebas Neue / Anton 字体,**impact 字重例外 600(仅 Hero / Display Number)**,其他 ≤ 500,`font-extrabold` / `font-black` = 0

### Q7 · 通用商务 · long-number · light
某金融机构 2026 上半年理财业务报告。AUM ¥1,234.5 亿元(**超长数字**),3 KPI + 时序。
- 色:深蓝(default) / Mode: light
- 验证:Hero composition Mobile 单列 + 桌面灵活,长字符 >7 字降一级,父容器 **no horizontal scroll**(实测 R-10 desktop 溢出 bug 修复),Display Number 不溢出

### Q8 · 暖色生活方式 · warmth · light
某轻食品牌 2026 Q1 顾客调研。NPS 76,复购率 65%,4 大喜爱 SKU + 3 大改进点。
- 色:暖橙 / Mode: light
- 验证:warmth routing → Grain shader,Nunito + LXGW WenKai TC,friendly radius 12px,字重 ≤ 500

### Q9 · technical 数据中心 · dense · dark
某 fintech 公司 2025-2026 风控年度报告。Alert 数 / 拦截率 / 响应时间 — Area + Bar + Pie 三类 chart。
- 色:工业灰蓝 / Mode: dark
- 验证:technical routing → Dithering shader + JetBrains Mono,dense density,Tooltip 三种 chart 都 wire `<ChartTooltipCard />`

## Verify items(M0-M11)

### M0 · R-134 8 个问题修复 verify
- M0.1: Mesh 频率 — editorial / ceremonial 段不出 Mesh shader 引用(grep + 视觉)
- M0.2: 0 Bitable 字面;0 `?style=` / `?heroimg=` / `?color=` URL query 机制
- M0.3: §3 Foreground role discipline 无 `<p>` / `<span>` 标签级 CSS 约束生成
- M0.4: 卡片无可见黑边(filled card no visible border)
- M0.5: Hero 排版符合 §14.1(Mobile 单列 / 桌面灵活)
- M0.6: AnimateNumber 照搬 Warm — 无 `useReducedMotion` / `useInView` / `TABULAR` 全局对象
- M0.7: 字号 ≤ Hero 88px / Display 140px;字重 ≤ 500(impact Hero/Display 可达 600)
- M0.8: 总长精简(prompt 输入 571 行,生成 React 代码无冗余 import / 包名 leak)

### M1 · Tooltip 间距精致(Chris 反馈关键)
- ChartTooltipCard `px-4 py-3` 内边距实际渲染
- `minWidth: 140` / `borderRadius: 12` / soft shadow `0 4px 16px rgba(0,0,0,0.06)`
- Period label `mb-2` 间距 + entry rows `gap-2`
- 视觉:Tooltip 不显紧凑,文字与边距协调

### M2 · Tooltip dark mode 文字可读(Chris 反馈关键)
- dark mode 下 Tooltip 文字色为亮色(`var(--foreground)` token L=0.92)
- 不出现黑色文字(prose color hardcode 为黑色 = FAIL)
- 灰度 label `var(--foreground-3)` L=0.50 可读

### M3 · ChartTooltipCard wire 完整
- 每 Recharts `<Tooltip>` 都有 `content={(p) => <ChartTooltipCard {...p} />}` 或类似
- AreaChart / LineChart / BarChart / PieChart 全部 wire
- 无 Recharts default Tooltip 渲染(default 在 dark mode 黑字 unreadable)

### M4 · 字号上限
- grep generated code:无 `text-[120px]` / `text-[200px]` / `text-[100px]`
- Hero Title ≤ 88px desktop / 44px mobile
- Display Number ≤ 140px desktop / 64px mobile

### M5 · 字重 ≤ 500 / impact 例外 600
- grep:无 `font-extrabold` / `font-black`
- `font-bold` 不出现(除非 impact Hero / Display)
- 其他风格 `font-medium` (500) top

### M6 · Shader 频率(editorial / ceremonial → Grain)
- Q2 ceremonial 实测出 `GrainGradient`(不是 `MeshGradient`)
- Q5 editorial 实测出 `GrainGradient`(不是 `MeshGradient`)

### M7 · Hero composition
- Q7 长数字(¥1,234.5 亿元)在 1440px / 768px / 375px 三个断点都不出现 horizontal scroll
- Mobile 单列垂直堆叠 eyebrow → title → lead → focal number block

### M8 · AnimateNumber 照搬 Warm
- import 仅 `motion-plus/react` 的 `AnimateNumber`
- 无 `useReducedMotion` / `useInView` import
- 无 `TABULAR` 全局对象(`fontFeatureSettings` 不应为顶层 const)
- transition `{ type: "spring", duration: 2.2, bounce: 0 }`(可接受 2.0-2.4s 范围)
- 包装 `inline-flex items-baseline gap-1 whitespace-nowrap`

### M9 · 卡片无黑边
- filled card(`bg-surface-l2` / `bg-card`)无 `border` 属性
- 透明 card 可有 `var(--divider)` 1px(alpha ≤ 0.12,**非黑色**)

### M10 · 路由准确
- Q2 ceremonial / Q5 editorial / Q6 impact / Q8 warmth / Q9 technical 各自路由正确
- 字体 stack 符合 §4 表

### M11 · ChapterStamp variants
- 6 个 family 各自 variant 视觉清晰(geometric vertical bar / editorial outline italic / technical bracket / warmth circle / impact display numeral / ceremonial ornament-framed)
- 任一 variant 不混入其他 family

## Robustness Report 输出格式

```
# Robustness-Report_default-v1.5_Round-12

## Summary
- 总数: 9 query × 1 attempt = 9 generations
- PASS: X/9
- NEEDS-FIX: X/9
- regression vs R-11 (v1.4): + / - / =

## Per-Query Verdict
Q1 [dark · complex multi-chart]: PASS / FAIL
- M0: [list pass/fail items]
- M1 Tooltip 间距: PASS / FAIL — [observation]
- M2 Tooltip dark mode 文字: PASS / FAIL — [observation]
- M3-M11: ...
- 截图: reports/Round-12-screenshots/Q1.png

[Q2-Q9 同上格式]

## Aggregated Findings
- 共性问题 P0: [list]
- 共性问题 P1: [list]
- 共性问题 P2: [list]

## Recommendations
- v1.6 候选 patches: ...
- backlog: ...

## Files
- Generated code: reports/Round-12-app-tsx/Q[1-9]-App.tsx
- Screenshots: reports/Round-12-screenshots/Q[1-9].png
```

## 测试执行命令(供参考)

```bash
# OpenCode CC Session
cd /Users/nova-macmini/Code/vibe-view-PE-test
node scripts/run-doubao-test.js \
  --prompt /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.5.md \
  --queries handoffs/CC-Prompt-doubao-test_default-v1.5_Round-12.md \
  --round 12 \
  --output reports/Round-12-app-tsx/
```

(实际命令以 vibe-view-PE-test 项目脚本为准)

## 下一步

跑完 R-12 测试 → Robustness Report 回 Cowork → 综合判定 v1.5 是否 production-ready,或起 v1.6 patch scope。
