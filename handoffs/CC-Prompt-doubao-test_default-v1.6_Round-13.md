# CC-Prompt-doubao-test_default-v1.6_Round-13

R-12 patches verify / doubao Round-13 测试 / default v1.6

## 任务

使用 doubao Code 重跑 R-12 同 9 个 Query,verify v1.6(commit 5e13504)的 4 个 patches 是否落地,以及 R-12 NEEDS-FIX 5 项是否 fix。

## 输入

- 主 prompt: `prompts/vibe-view-campaign-report/default/v1.6.md`(571 行,commit 5e13504)
- 上一轮 baseline: `prompts/vibe-view-campaign-report/default/v1.5.md`(commit d25b6b7,R-12 测试基础)
- R-12 测试 handoff: `handoffs/CC-Prompt-doubao-test_default-v1.5_Round-12.md`(**9 Query 全文复用**,Q1-Q9 不变)
- R-12 Robustness Report: `reports/Robustness-Report_default-v1.5_Round-12.md`(对照基线)

## v1.6 验证重点

| Patch | §位置 | Verify | R-12 baseline | R-13 期望 |
|-------|------|--------|---------------|-----------|
| V6-2 ChartTooltipCard inline strict | §17 | 4 props 全 inline:`borderRadius 12` + `boxShadow 0 4px 16px rgba(0,0,0,0.06)` + `minWidth 140` + `background var(--surface-l2)` | 4/8 partial | **8/8 strict** |
| V6-3 Grain visibility | §17 | Hero Grain shader 视觉可见 — Q5 editorial / Q8 warmth | 2/9 不可见 | **0/9 不可见** |
| V6-4 Schema leak fix | §2 | grep generated code:`sales rep` / `Q1 目标` / `姓名` / `职位` / `fldRevenue` verbatim 出现 | Q2/Q9 leak(2/9) | **0/9 leak** |
| V6-5 CJK title keep-all | §4 | 长 CJK 标题不出现 mid-phrase 断行 — Q3/Q8 | Q3/Q8 break(2/9) | **0/9 break** |

## 已 LOCK(不期望改变)

- **V6-1 AnimateNumber 写法不变** — parseDisplayValue 处理 String 输入(含百分号)已线上多次测试稳定;若 Q3 仍出 NaN,可能是 doubao 端 API misuse(`format=number` prop),**不是 v1.6 prompt 责任**
- **AGENT.md 中文标点 sanitizer carry-forward** — Q6 BUILD-FAIL `·` JSX syntax 是 doubao codegen 工程 bug,不在 design prompt 范围

## 9 Query 集

复用 R-12 handoff 9 Query(Q1-Q9 文本不变)。详见 `handoffs/CC-Prompt-doubao-test_default-v1.5_Round-12.md` 同名章节。

不要重新出题。**重跑 = 直接对比 v1.5 → v1.6 增量收益**。

## Verify items(M0-M11 + V6-2/3/4/5)

R-12 同 M0-M11(R-12 handoff 章节)+ 4 个 v1.6 patch verify(上表)。

特别注意:
- M3 Tooltip 视觉真渲染:tooltip card 4 props 全到位(不只是 wire 工作)
- M6 Hero shader 视觉:editorial / ceremonial / warmth 的 Grain 实际有纹理感(不平)
- M0.2 schema 真清零:除了不出 `Bitable` 字面,也要确保 mock scaffold field 名不 leak
- CJK title 视觉:长标题如 "某老字号品牌 2026 春节限定礼盒销售战报" 不出现"销售/战报"中间断行

## Robustness Report 输出格式

`reports/Robustness-Report_default-v1.6_Round-13.md`,按 R-12 同格式。

重点对比表:
- 4 patches landing rate(V6-2/V6-3/V6-4/V6-5 各自 PASS rate)
- R-12 NEEDS-FIX → R-13 RESOLVED rate(逐项标 RESOLVED / STILL-FAIL / REGRESSED)
- 新 regression(若有,列具体 Q 行号)
- 总体 verdict:v1.6 production-ready / 需 v1.7 micro patch

## 下一步

跑完 R-13 → Robustness Report 回 Cowork → 综合判定 v1.6 production-ready(R-134 收官),或起 v1.7 micro patch scope。
