# v1.2 Patch Scope Review · 3 P0 候选 · Cowork 交叉 Review

你是 **independent reviewer**,接到的任务是 review 我(Cowork)起的 v1.2 patch scope。

## Chris 的明确关切(必须先理解,review 围绕这 3 条)

1. **行数控制**:v1.1 = 631 行;我目前 propose +20-25 行 → v1.2 ~650 行。Chris 觉得**多了**,要砍。
2. **必要性**:必须确认每个 patch 是 D3/D4/V11 fail 的**真实必要修复**,不是 nice-to-have / 不是规则堆砌。
3. **美观度收益**:每个 patch 必须对 doubao 生成页面**美观度有可证明的正向收益**,不是为了规则完整性而加。

---

## 现状(Round-8 测试 evidence)

- v1.1 = 631 lines(R-125 行内追加, R-126 frontmatter only)
- **D3 品牌故事主导(Q3 茶语轩 38 年品牌史)**: **FAIL** — doubao 仍走 dashboard mode, brand story 被数据 dashboard 压制
- **D4 数据+证言交织(Q4 5 个客户证言 + 数据)**: **FAIL** — doubao 出 split-card 不交织
- **V11-P0-1 R-125 wrapper height**: **PARTIAL** — source 3/8 命中(Q2/Q6/Q7), runtime 3/3 render-PASS 无 stuck-top bug
- 其他 5/8 D 维度 PASS(D1/D2/D5/D7/D8)+ AN invariant + R-124/v0.9 全 carry

---

## 3 个 Patch 候选 + 草案文字

### V12-P0-1 · Brand Narrative Spine archetype(D3 fix)

**位置**:§12 Archetypes line 412 后插入新 archetype 条目

**草案文字方向**(~8-10 行,scope draft):

> **Brand Narrative Spine** — Narrative-led, data as supporting evidence(NOT data-led)。Trigger:品牌历史 / 传承 / 工艺 / 创立故事 / 文化底蕴(e.g. "38 年品牌" / "茶文化传承" / "故事 > 数据")。
> Structure:opening anecdote → period of origin → craftsmanship detail → present moment data inlay → future intent。
> Treatments:Typographic Field heavy(Hero + 2-3 mid-page text-only sections)+ Asymmetric Split(craftsmanship visual right / long-form prose left)+ Stacked Band(inline data sentences embedded in prose)。
> Density:long-form `<p>` ≥ 60% page volume,每段 `<p>` ≥ 80 chars,multiple `<p>` per section。
> Number frequency:≤ 5 distinct figures whole-page,inline-flex baseline-aligned in sentence,NOT standalone Display Number / KPI grid cells。
> Anti-refs:NEVER render brand-narrative query as grid-of-cards / KPI Cluster / chart-as-hero。Brand story is the spine,not the side-bar。

### V12-P0-2 · Testimonial-Threaded archetype(D4 fix)

**位置**:§12 Archetypes 同段(V12-P0-1 之后)

**草案文字方向**(~10-12 行):

> **Testimonial-Threaded** — Customer voice interleaved with data points(NOT split-card)。Trigger:客户证言 / 用户访谈 / 案例 + 数据 / 证言串数据。
> Structure:alternating `<blockquote>`(customer voice + 名字 + role attribution)→ ONE inline data point that the quote substantiates → 下一组 quote+data。
> Treatments:Stacked Band with vertical alternation,each band ≈ 1 quote + 1 inline data sentence。
> HARD GATE:NEVER render quotes 和 data 为 two parallel columns / two consecutive sections(quote block + data block split)。Quote and supporting data MUST sit within the same section / band,visually adjacent,voice-then-evidence rhythm。
> Quote constraint:≤ 60 words per quote(extending Quote Interstitial's ≤ 28 cap for this archetype only)。
> Attribution typography:12px uppercase `tracking-[0.12em]` `--foreground-2`。
> Anti-refs:NEVER card-of-quote with shadow / border / rounded-card chrome — bare typography only。

### V12-P0-3 · §14.1 V11-P0-1 wrapper reinforce

**位置**:§14.1 line 452 末尾(R-125 patch 句)改写强化版

**v1.1 现状**(line 452 末尾 1 句):

> "the grid root element AND any intermediate wrapper between section and grid MUST satisfy `min-height: 100%` (Tailwind: `min-h-full`)"

**改成**(~3-5 行):

> "EVERY ancestor element in the chain from `<section>` to the grid items(root wrapper / padding wrapper / container wrapper / max-w wrapper / ANY intermediate `<div>`)MUST carry `min-h-full`(Tailwind) / `min-height: 100%`(CSS)。This is not 'the grid wrapper alone' — it is every link in the height chain。If structure is `<section>→<div>→<div>→<div>→grid`,all three middle `<div>`s require `min-h-full`。Missing one breaks the floor propagation and content stacks at section's upper 1/3。
> Anti-pattern(HARD)— this is wrong:`<section className="min-h-[90vh]"><div className="max-w-7xl mx-auto py-24">{/* ← max-w wrapper 漏 min-h-full */}<div className="grid ...">...</div></div></section>。每一层 `<div>` 都要 `min-h-full`。"

---

## Review questions(请独立回答 5 个)

### Q1 · 必要性

- **V12-P0-1** brand-narrative archetype:是必要新增,还是可以用现有 archetypes(Quote Interstitial / Annotation Rail / Asymmetric Split + Typographic Field)组合表达?现有 §11 Pattern Overview 写的是 "Story told in data, not a dashboard" + §13 default composition 是 data-led — 是否需要新增 archetype 才能修 D3?
- **V12-P0-2** testimonial-threaded:现有 Quote Interstitial(§12 line 408)是 ≤ 28 字单段 narrative pause。是否扩展 Quote Interstitial 字数 + 加 "alternating with inline data" 一句就够,还是必须独立 archetype?
- **V12-P0-3** V11 reinforce:source adherence 3/8 vs runtime intent 3/3 PASS,这个 reinforce 是必要还是 nice-to-have?Round-8 没有 stuck-top bug(R-125 主目标已达成),是否还要加强?

### Q2 · 美观度收益

- 每个 patch 修后,doubao 生成页面的**视觉品质**会有多大正向变化?
  - 估算 critic 评分提升(R8 baseline: Q3 F · Q4 D-)?
  - 估算 PASS rate 提升(Round-9 跑同 Query 时 D3/D4/V11 PASS 概率)?
- 哪个 patch 对美观度收益**最高**?哪个**最低**?
- 是否存在某个 patch 收益不显著,**该砍**?

### Q3 · 行数控制

- 三个 patch 草案的字数能否**压缩 30-40%**(从 ~25 行 → ~15-17 行)?
- 哪些段可以删 / 合并 / 用更短表达?
- 是否可以让 V12-P0-1 + V12-P0-2 共用一个 "narrative-shape archetypes" 段(brand-narrative + testimonial-threaded 作为兄弟条目,共享 1 句 intro 说明 "narrative-shape archetypes apply when data is NOT the protagonist"),减少重复?
- V12-P0-3 现有改写是否可以**1 句话**搞定(不加 anti-pattern 代码 snippet)?

### Q4 · 规则边界

- V12-P0-1 / V12-P0-2 是否会跟现有 §11 Pattern Overview "Story told in data, not a dashboard" / §13 default composition "Hero → KPI Cluster → ..." **矛盾**?需要在哪里加 "default 走 data-led,brand-narrative 模式 / testimonial 模式仅在 trigger signal 命中时切换" 的开关?
- V12-P0-3 enumerated wrapper rule 是否会跟现有 §14.1 grid HARD GATE 冲突?
- 是否引入**新的 anti-pattern 风险**(e.g. doubao 在所有 query 都误用 brand-narrative mode / 把所有 quote 都 threaded)?

### Q5 · 整体推荐

- 三个 patch 应该:
  - **全做**(3/3)
  - **只做关键 N 个**(列出哪些)
  - **全砍**(都不做,v1.1 ship as-is)
- 推荐顺序(先做哪个)?
- 你认为 v1.2 总行数应该 ≤ N(给具体上限,e.g. 640 / 645 / 650)?

---

## 必读

- **v1.1 完整源**:`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md` (631 行)
- **Round-8 测试报告**(若文件存在):`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.1_Round-8.md`
- **CC Round-8 执行回报**(若 report 不可读,可基于此 chat 回报判断):见对话上文 Chris 转发的 CC Round-8 final report

---

## 回报模板

```
=== v1.2 Scope Review · <reviewer name> ===

Q1 必要性:
  V12-P0-1 brand-narrative: <NECESSARY / OPTIONAL / SKIP> · reason: ...
  V12-P0-2 testimonial: <NECESSARY / OPTIONAL / SKIP> · reason: ...
  V12-P0-3 V11 reinforce: <NECESSARY / OPTIONAL / SKIP> · reason: ...

Q2 美观度收益:
  V12-P0-1: critic R8 F → 估 R9 <X> | PASS prob <Y%>
  V12-P0-2: critic R8 D- → 估 R9 <X> | PASS prob <Y%>
  V12-P0-3: source adherence 3/8 → 估 <Z/8>
  Highest ROI: <patch #> · Lowest ROI: <patch #>
  应砍的 patch: <none / patch #>

Q3 行数控制:
  压缩空间: <实际 +<N> 行 vs 原 +25 行>
  合并建议: <yes / no, 具体怎么合>
  V12-P0-3 1 句话化: <yes / no>

Q4 规则边界:
  矛盾: <none / 具体在哪>
  冲突: <none / 具体在哪>
  新 anti-pattern 风险: <list, or NONE>
  需加 trigger 开关: <yes / no, 加在哪>

Q5 整体推荐:
  做几个: <0 / 1 / 2 / 3 of 3>
  顺序: <patch # > # > # >
  v1.2 总行数上限推荐: <N 行>

我的一句话总结:
  <one-line synthesis: 这个 v1.2 scope 应该按 <X> 做, <Y> 收益 / <Z> 风险>
```

---

## 触发词

独立 review,不要看其他 reviewer 的意见,不要 propose 最终 patch 文字(由 Cowork 综合两路 review 后派 Opus 4.6 写)。

开始。
