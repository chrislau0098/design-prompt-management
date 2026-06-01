# v1.4 Patch Scope Review · 3 P0 候选 · Cowork 交叉 Review

你是 **independent reviewer** · review Cowork 起的 v1.4 patch scope.

## Chris 的明确关切(围绕这 3 条 review)

1. **修真实失效** · R-10 实测 v1.3 V13-P0-B 在 9/9 Query 中 source 一致性 0% (vs v1.2 R-125 baseline 3/8)
2. **不堆砌** · v1.3 = 641 行,v1.4 净增 ≤ 8 行
3. **泛用性 vs 工程 hint 张力** · R-130 时 Chris 强调"不要工程化",但 R-10 实测证明 LLM 实际需要 implementation hint 才能落地 design intent — 需要找到平衡点

---

## R-10 实测 evidence

**根因 1 · V13-P0-B 工程化弱化导致 V11 wrapper 完全失效**:

| Round | source 中 `min-h-full` 出现次数 | spec 表述 |
|-------|------------------------------|----------|
| R-9 (v1.2 R-125) | 3/8 | "Tailwind: `min-h-full`" 显式 |
| **R-10 (v1.3 V13-P0-B)** | **0/9** | "propagate the section's height floor" design 语言 |

实际生成代码 (9 Query 中):
- **Q1**: `<section className="... flex items-end">` — 用 **flex** 替代 grid + 没 wrapper height floor → 内容贴顶
- **Q2**: `<section className="... min-h-[80vh]">` 内部 block stacking 无 grid/flex align → 内容贴顶
- **Q3**: `<section className="... min-h-[90vh]">` + inline `alignItems: 'end'` 用了 grid + align,但 wrapper 0 `min-h-full` → 内容贴上 1/3
- **Q7**: 同 Q2 block stacking → 内容贴顶

**根因 2 · Page mode-reactive 能力缺失**:

Q1 实际生成代码:
- `MODE = 'light'` 常量 (user query 要求 light)
- GlobalStyles 只有 `:root { --background: oklch(0.985 ...) ... }` —— **完全没有 `[data-theme="dark"]` override / `@media (prefers-color-scheme: dark)`**
- 整页无 `dark:` Tailwind / `useColorScheme` / `matchMedia`

当 review server (9000) 切到 dark mode shell:Q1 不响应 mode 切换 → 浅青 shader/surface 在 dark shell 上 floating 成 "明亮色块" → 跑版 + 文字看不清.

Design Prompt §3 line 92-96 有 "Dark mode tokens" 但没有 HARD GATE 要求 doubao 同时 author light + dark mode overrides. doubao 严格按 user query 单一 mode = light-only 输出.

**根因 3 · §14.1 grid HARD GATE 弱化连带**:

Q1 用了 `flex items-end` 替代 grid (违反 §14.1 grid HARD GATE).其他 Q2/Q7 block stacking 也违反.可能是 R-130 整体弱化连带,或 §14.1 grid HARD GATE 没有强制 anti-pattern.

---

## 3 个 Patch 候选 + 草案方向

### V14-P0-A · 矫正 R-130 V13-P0-B 工程化(加回 inline parenthetical hint)

**位置**:§14.1 line 460 末尾既有 V13-P0-B "EVERY intermediate layout container propagate height floor" 句

**v1.3 现状**:
> "EVERY intermediate layout container between the Hero section and the grid items MUST propagate the section's height floor — not the grid wrapper alone, every link in the chain. Missing one container breaks floor propagation; content stacks at section's upper 1/3, leaving lower 2/3 as empty shader. The section's height floor is the layout floor; every intermediate container must carry that floor for `align-items: end` to reach section's true bottom."

**修订方向**:在"propagate the section's height floor"之后追加 inline parenthetical implementation hint(不破坏 design intent 措辞):

> "...MUST propagate the section's height floor **(applied via Tailwind `min-h-full` or CSS `min-height: 100%`)** — not the grid wrapper alone..."

**严守**:
- 只追加 inline parenthetical(11-14 字符),不破坏 design 语言
- 不写 code block / JSX example
- 不绑定 HTML element / 不绑定 wrapper 类型枚举(carry R-130 fix)
- 行内追加,行数 +0

**预计行数变化**:+0(行内 parenthetical 追加)

---

### V14-P0-B · Page mode-reactive HARD GATE(新增)

**位置**:§3 既有 "Light mode tokens (algorithm)" / "Dark mode tokens" 段之后,或 §17 既有 Components 段附近(由 reviewer 判断最合适位置)

**草案方向**(自由 phrase):

> "**Page mode-reactive HARD GATE** — Generated page MUST author BOTH light AND dark mode CSS variable overrides on a single `:root` selector (light defaults) AND `[data-theme="dark"]` selector (or `@media (prefers-color-scheme: dark)`),even when user query specifies a single mode. The page must remain mode-reactive at runtime — switching `data-theme` attribute on `<html>` should immediately re-color the page. Forbidden:hard-coded light-only or dark-only CSS without the other-mode override block."

**严守**:
- 1-2 句 HARD GATE,不展开成代码 block
- 不写完整 `:root`/`[data-theme="dark"]` JSX example
- 不强制 mode switch UI 实现(Chris 工程红线 carry)
- 措辞抽象,只要求 author 双 mode overrides

**预计行数变化**:+2-3 行

---

### V14-P0-C · §14.1 grid HARD GATE 强化(Hero 禁 flex / block 替代)

**位置**:§14.1 line 460 既有 "Default style Hero composition — HARD GATE" 段中,既有 "NO flex column / NO block stacking / NO single centered column at desktop" 句之后

**v1.3 现状**(line 460 既有):
> "Default style Hero root MUST use CSS grid: `display: grid; grid-template-columns: 1.15fr 1fr; gap: 48px 56px; align-items: end`. NO flex column / NO block stacking / NO single centered column at desktop."

**问题**:既有 "NO flex column / NO block stacking" 在 R-10 中被 doubao 违反(Q1 用 `flex items-end`,Q2/Q7 block stacking).强化方向:

**修订方向**(自由 phrase):

> "...NO flex column / NO block stacking / NO single centered column at desktop. **Hero root tagname MUST use the grid-displaying element with `display: grid` on root or first child; `display: flex` with `items-end` is NOT an acceptable substitute for `display: grid` with `align-items: end` (flex `items-end` aligns flex-items to cross-axis end, not vertical-axis end in column flow — visually similar but semantically different and breaks the grid HARD GATE).**"

**严守**:
- 1-2 句加强,不重写既有 HARD GATE 句
- 解释 flex `items-end` vs grid `align-items: end` 语义区别 — 帮助 LLM 理解为什么不能替代
- 行内追加

**预计行数变化**:+1-2 行

---

### 不动(carry as-is)

- **R-130 V13-P0-A**(§14.1 line 462 cross-ref §15)— R-10 实测无问题, carry
- **§15 既有 `hero_image_url` dial reference** — 历史 leak, flag for v1.5
- **AnimateNumber 三段(§4/§7/§17)** — R-120/R-123/R-124 三重锁
- **R-128 R-124 v0.9 既有 patches** — 全 carry

---

## Review questions(请独立回答 5 个)

### Q1 · 必要性

- **V14-P0-A 矫正 V13-P0-B**:R-10 实测 9/9 失效 (vs R-9 baseline 3/8 source carry),是否必修?加 inline parenthetical hint 是否破坏 R-130 "不工程化"原则?
- **V14-P0-B mode-reactive HARD GATE**:Q1 dark shell 跑版根因是 doubao 没 author 双 mode overrides.但 user query 明确 single mode,doubao 严格遵守是不是合理行为?Design Prompt 应该强制双 mode 还是只在 review server 层面处理 mode switch?
- **V14-P0-C grid HARD GATE 强化**:既有 "NO flex column / NO block stacking" 被违反,加强解释 flex vs grid 语义区别是否真的让 LLM catch?

### Q2 · 美观度收益

- 每个 patch 修后 R-11 PASS rate 估算?
- V14-P0-A: 估 R-11 V11 wrapper source 一致性 0/9 → 几/9?
- V14-P0-B: 估 R-11 dark shell review 时 mode-reactive 通过的 Query 比例?
- V14-P0-C: 估 R-11 Hero grid HARD GATE 命中率 (vs R-10 Q1/Q2/Q7 违反)?
- Highest / lowest ROI patch?

### Q3 · 行数控制

- 总 propose +3-5 行 (P0-A +0 / P0-B +2-3 / P0-C +1-2).能否再压?
- V14-P0-A inline parenthetical 是否真的不破坏 R-130 design 语言?字数比例?
- V14-P0-B 能否 1 句话化?(目前 1-2 句)
- V14-P0-C 能否融合到既有 "NO flex column / NO block stacking" 句中,不另起新句?

### Q4 · 规则边界 + Chris "去工程化" 原则张力

- **核心张力**:R-130 时 Chris + Opus + Codex 都同意"去工程化"避免削弱 LLM 自由度.但 R-10 实测证明 LLM 实际需要 implementation hint 才能落地 design intent. V14-P0-A 是 partial revert R-130 — 这是 Chris 哲学的 contradiction 还是合理 calibration?
- V14-P0-A inline parenthetical `(applied via Tailwind \`min-h-full\` or CSS \`min-height: 100%\`)` 是 "工程化" 还是 "implementation hint"?边界在哪?
- V14-P0-B Page mode-reactive 是否引入新工程化?(CSS variable overrides + data-theme attribute 是工程概念)
- V14-P0-C 是否引入新 anti-pattern 风险?(e.g. doubao 在 fixed style Hero 也禁 flex,但 fixed style 不归 grid HARD GATE 管)

### Q5 · 整体推荐

- 做几个 of 3 (0/1/2/3)?
- 推荐顺序(最关键的先)?
- 是否可以合并 P0-A + P0-C 同 §14.1 一处改动?
- v1.4 总行数上限推荐(具体数字)?
- 一句话总结

---

## 必读

- **v1.3 完整源** (641 行,重点 §3 line 88-102 / §14.1 line 446-465 / §17 line 522+):
  `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md`

- **R-10 实测 9 个 Query 源码**(verify V11 失效 + mode-reactive 缺失):
  `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Round-10-app-tsx/Q{1-9}-App.tsx`

- **R-130 scope review**(上下文 — V13-P0-B 当时去工程化判断):
  `/Users/nova-macmini/Code/design-prompt-management/handoffs/CC-Cowork_v1.3-scope-review.md`

- **R-130 v1.3 fix engineering leak handoff**(上下文 — V13-P0-B 实施细节):
  `/Users/nova-macmini/Code/design-prompt-management/handoffs/CC-Prompt_v1.3-fix-engineering-leak.md`

---

## 回报模板

```
=== v1.4 Scope Review · <reviewer name> ===

Q1 必要性:
  V14-P0-A 矫正 V13-P0-B: <NECESSARY / OPTIONAL / SKIP> · reason: ...
  V14-P0-B mode-reactive HARD GATE: <NECESSARY / OPTIONAL / SKIP> · reason: ...
  V14-P0-C grid HARD GATE 强化: <NECESSARY / OPTIONAL / SKIP> · reason: ...

Q2 美观度收益:
  V14-P0-A R-11 V11 source 一致性: 估 <X>/9 (vs R-10 0/9)
  V14-P0-B R-11 mode-reactive 通过率: 估 <Y>/9
  V14-P0-C R-11 grid HARD GATE 命中率: 估 <Z>/9 (vs R-10 Q1/Q2/Q7 违反)
  Highest ROI: <patch #> · Lowest ROI: <patch #>

Q3 行数控制:
  压缩空间: 实际 +<N> 行 vs 原 +3-5 行
  V14-P0-A parenthetical 字数: <yes/no acceptable>
  V14-P0-B 1 句话化: <yes/no>
  V14-P0-C 融合既有 NO flex 句: <yes/no>

Q4 规则边界 + 去工程化张力:
  V14-P0-A 是 hint 还是工程化: <hint / engineering / borderline>
  V14-P0-B 引入新工程化风险: <YES/NO>
  V14-P0-C 引入新 anti-pattern: <NONE / list>
  Chris "去工程化" 哲学修正判断: <consistent / contradiction / calibration>

Q5 整体推荐:
  做几个: <0 / 1 / 2 / 3 of 3>
  顺序: <patch # > # > # >
  合并 P0-A + P0-C: <yes / no>
  v1.4 总行数上限: <N>

我的一句话总结:
  <one-line synthesis>
```

---

## 触发词

独立 review · 不要看其他 reviewer 意见 · 不要 propose 最终 patch 文字(由 Cowork 综合后派 Opus 4.8 写).

开始。
