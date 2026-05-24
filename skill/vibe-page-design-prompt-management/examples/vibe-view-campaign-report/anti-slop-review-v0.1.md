---
type: anti-slop-review
project: Vibe view
phase: 2 · Phase A 收口审查
target_html: _Framework/design-system-renderer/index.html
target_prompt: Swiss International Minimal/swiss-systematic-blue-Design-Prompt-v0.1.md
target_slot: _Framework/slot-examples/swiss-systematic-blue.slot.json
rubric: _Framework/Slop Taxonomy（Anti-Slop 验证 gate）.md
skills_loaded: [design-principles, baseline-ui, critique]
review_date: 2026-05-21
---

# Anti-Slop Review v0.1

## §1 总评分（0-10）

- **HTML（design-system-renderer/index.html）**：**6.5/10** — 工程化骨架可用，3 套已有风格（Warm/Theatre/Cool）token 注入完整；扣分点：Swiss 风格虽接入 selector 但 decor pack 走 instrumental 兜底，渲染会冒出违反 Swiss spec 的元素（drawn-horizon primary line / feTurbulence noise overlay），且 Swiss data 与外部 Slot JSON 在 radius/pill 字段不一致（HTML 内 pill=rounded-full，Slot JSON pill="none"）。
- **Swiss Design Prompt v0.1**：**5/10** — 头部 §1-§6 钴蓝瑞士骨架描述基本到位，但模板渗漏严重：§17 Components Inventory 里残留 Theatre/Warm 的 SpotlightGradient / OutroSignature / ChapterBanner 组件名（带 `null/nulls` 字面量 bug 的 SpotlightGradient 代码块直接照搬未删），同时 §3 prose 自我冲突（禁 Inter 但 stack 第一位就是 Inter Variable），weight ceiling=600 与 mood "Bold-Typographic" 不一致（Slot `_comment` 已自承"实际需 bold"）。
- **整体 gate**：**FAIL with conditions** — Part A 通用 slop 基本 OK（HTML/Prompt 都没 AI 配色、紫渐变、glow 等明显 tell），但 **Part C STYLE 保真度** 拉胯严重，会直接误导 doubao；必须先修 §1 P0 才能进 doubao 测试。

---

## §2 P0 Blocker（必修，阻塞 doubao 测试）

### P0-1 · [Part C / Swiss Prompt §17] SpotlightGradient 函数体含 `null`/`nulls` 字面量 + 是 Theatre 残留组件

- **位置**：`Swiss International Minimal/swiss-systematic-blue-Design-Prompt-v0.1.md` line 565-578
- **问题**：
  1. `SpotlightGradient` 本身就是 Theatre/Warm decorative_pack 的组件；Swiss `decorative_pack: instrumental` + Slot `radial_wash_css: null` + Slot `overlay_stack: ["shader"]`（无 spotlight 层）明确不该有这个组件。
  2. 函数体出现 `background: "null"` 和 `animation: "spotlight-drift nulls ease-in-out infinite alternate"` —— 这是模板生成时 JSON 字段（`spotlight_drift_s: null`、`radial_wash_css: null`）被 string-interpolation 字面拼进了模板的 bug，弱模型 follow 时会直接渲染出字符串 "null"/"nulls"。
- **建议**：整段 `**SpotlightGradient**` 描述 + 代码块从 §17 删除。Swiss 不需要任何 spotlight 层。
- **类别**：Part C-1（STYLE 保真）+ Part B5（结构单调风险，spotlight 会把每章漂回戏剧化模板）

### P0-2 · [Part C / Swiss Prompt §17] OutroSignature 与 ChapterBanner 残留 editorial 组件名

- **位置**：
  - line 117：`Chapter opener: \`ChapterBanner\` — --border-strong hairline + mono accent kicker + chapter title`
  - line 320：`**Outro Reverent** ... \`OutroSignature\` component (§17). Optional`
  - line 387：`Outro · Typographic Field | closing title Section Primary | \`OutroSignature\` + caveats`
  - line 606：组件映射 `Outro | motion.div + \`OutroSignature\``
- **问题**：ChapterBanner / OutroSignature 是 editorial（Warm）pack 的组件名；Swiss instrumental 在 `_Framework/anti-slop-review` 中明确该用 hairline rule + chapter number 圆圈（IBM-style "01" "02" "03"），不该挪用 editorial 组件名。这是 PATTERN B4「规划标签泄漏」+ Part C「STYLE 保真」的双重失败。
- **建议**：
  - line 117 改为：`Chapter opener: top hairline rule (1px var(--border-strong)) + left-aligned mono number "0X" + ALL-CAPS chapter title sans medium — no banner component, no kicker label`
  - line 320 删除 `OutroSignature` 引用；改为：`Optional terminal hairline rule + closing claim line + period anchor`
  - line 387、606 同步替换
- **类别**：Part B4（规划标签泄漏）+ Part C-2（material 保真）

### P0-3 · [Part C / Swiss Prompt §3] §3 禁 Inter 自我冲突

- **位置**：
  - line 62：`Font stacks: Primary Sans 'Inter Variable', 'Inter', 'Helvetica Neue', ...`
  - line 217：`**Don't** use Inter, Roboto, Space Grotesk, Plus Jakarta, or overused faces outside the declared font stacks above`
- **问题**：声明 stack 第一位就是 Inter Variable，但 §9 Don't 又禁 Inter。弱模型读到会直接二选一犯错（不用 Inter 就漂回 system sans，用 Inter 又违反 don't）。Swiss IBM 风格 ground-truth 的真实字体应是 **Helvetica Neue / Neue Haas Grotesk / IBM Plex Sans**，Inter 是 AI 滥用首选，按 Slop Taxonomy A3 应避免。
- **建议**：
  - line 62 改为：`'Helvetica Neue', 'IBM Plex Sans', 'Neue Haas Grotesk', 'Noto Sans SC', 'PingFang SC', sans-serif`（去掉 Inter）
  - 同步改 line 217 Don't：`**Don't** use Inter, Roboto, Geist, Space Grotesk, Plus Jakarta — all overused AI defaults. Stick to Helvetica family declared above.`
  - 同步 Slot JSON `sans_stack` / `display_stack`（去掉 "Inter Variable" / "Inter"）
- **类别**：Part A3 排版（过度使用字体 Inter）+ Part C-3（字体保真）

### P0-4 · [HTML / Part C] Swiss decor pack 走 instrumental 兜底，会渲染违反 Swiss spec 的 drawn-horizon + feTurbulence noise

- **位置**：
  - HTML line 3636-3642：`pack === 'instrumental'` → `buildInstrumentalPack`
  - HTML line 3915-3924：drawn-horizon SVG（1px primary line + circle dot + feTurbulence overlay）
- **问题**：Swiss Slot 显式声明 `noise_overlay: "none"`、`extra_svg_layer: "none"`、`accent_divider: "alpha-hairline"`，但 HTML 切到 Swiss 时会走 instrumental pack，渲染出：
  - drawn-horizon 1px primary line + 中心 circle dot —— Swiss 风格不该有这个 ornament
  - feTurbulence noise overlay —— Swiss 是干净 light-gray，noise 是 Cool 风格 tell
- **建议**：HTML 新增 `pack === 'systematic'` 分支或 Swiss 专用 `buildSwissPack`，渲染：
  - ChapterStamp（圆圈 + 大数字 "03"）— 这个可以保留
  - Hairline rule（全宽 1px border-strong，无渐变、无 dot）
  - 不要 drawn-horizon、不要 feTurbulence、不要 OutlinedPill 用 primary edge
  - 同步 Slot `decorative_pack` 改为 `systematic`，更新 Schema enum
- **类别**：Part C（material + decorative 保真）

### P0-5 · [HTML / Part C] Swiss data 与外部 Slot JSON 数据不一致（radius.pill）

- **位置**：
  - 外部 `slot-examples/swiss-systematic-blue.slot.json` line 90：`"pill": "none"`
  - HTML 内联 `data-swiss` JSON line 2644：`"pill": "rounded-full"`
- **问题**：内联 Swiss data 是手抄/手编版本，与外部 Slot 文件出现 drift；HTML 切到 Swiss 后 pill 会渲染 9999px round，违反 Swiss "sharp 0px panel" 全局原则。Swiss IBM 风格的 tag/badge 应该是 sharp 0-2px corner，不是 pill。
- **建议**：HTML 内联 data-swiss 同步外部 Slot JSON（一次性 sync 或改成 fetch external），至少 `radius.pill` 立即改为 `"none"`，并把 CSS `--radius-pill` 处理也走 sharp。
- **类别**：Part C-2（圆角与材质保真）

---

## §3 P1 Fix（建议修，影响质量）

### P1-1 · [Part C / Swiss Prompt] weight_ceiling=600 与 "Bold-Typographic" mood 矛盾

- **位置**：Prompt line 64, 219；Slot line 56-57
- **问题**：Swiss IBM ground-truth 真实是 **bold（700-800）大标题 + ALL CAPS**；Slot `_comment` 自己也承认"Swiss 实际是 bold，需 Phase B 扩 enum"。当前 weight_ceiling=600 + emphasis_tier=semibold 会让弱模型生成 medium/semibold，失去 Swiss 的 typographic 冲击力。
- **建议**：
  - 短期（v0.1 保守版）：保留 600 但 Prompt 明确写："Display Number / Page Title 使用 `font-semibold` (600) 作为视觉上限，通过字号（200px）和 ALL CAPS 弥补 weight 不足"
  - 中期（v0.2）：Schema enum 扩到 700/800；Swiss 改 weight_ceiling=700，emphasis_tier=bold
- **类别**：Part C-3（字体保真）+ Part B5（结构单调，weight 限制导致 Hero 失去 Swiss 标志性冲击力）

### P1-2 · [Part C / Swiss Slot] hero_shader=MeshGradient 与 Swiss 极简理想不符

- **位置**：Slot line 122-132；Prompt line 437-469
- **问题**：Slot `_comment` 自承"Swiss 理想是 dot-grid 静态，Phase B 扩"；MeshGradient 的 swirl/distortion 会带出柔和 organic 形态，与 Swiss systematic grid 矛盾。当前 MeshGradient props 已经把 opacity 拉到 0.18 试图压制，但本质是错误工具。
- **建议**：
  - 短期：Hero shader 改为 null + 用 CSS dot-grid background-image 静态渲染（`background-image: radial-gradient(circle, var(--border-strong) 1px, transparent 1px); background-size: 32px 32px;`）
  - 中期：paper-shaders 加入静态 DotGrid 组件或允许 hero_shader=null + extra_svg_layer=dot-grid
- **类别**：Part C-5（shader 保真）

### P1-3 · [Part A / Swiss Prompt §17] Quote archetype 残留 italic 引用

- **位置**：
  - Prompt line 318：`Quote Interstitial — ... Quote scale font-normal — no italic, no left border`（这里说对了，no italic）
  - 但 HTML line 372、1105 的 `.type-quote` / `.editorial-quote-block .quote-text` 仍带 `font-style: italic`
- **问题**：Swiss 风格 §9 Don't line 218 明禁 italic，但 HTML CSS 全局 quote 样式带 italic。Swiss 切换时会被继承（Quote sample 用 italic 显示）。
- **建议**：HTML 中 Quote 样式按 pack 分别处理：editorial 保留 italic（杂志风），theatrical/instrumental/systematic 去掉 italic。或者整体去掉 quote italic，让 Slot `quote_italic` 字段控制。
- **类别**：Part C-3（字体保真）

### P1-4 · [Part A / HTML] sticky-bar backdrop-filter blur(20px) 是 glassmorphism slop

- **位置**：HTML line 80-82
- **问题**：`backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)` —— Slop Taxonomy A2「Glassmorphism（blur / glass card / glow 边）当装饰 = Blocking」。这是 design system tool UI 自身的样式，不在 Swiss 风格 spec 内，但作为 review tool 它自己就示范了 slop。
- **建议**：sticky-bar 去掉 backdrop-filter，改用 solid `var(--bg)` 或 `color-mix(in oklch, var(--bg) 95%, transparent)` + border-bottom 即可。
- **类别**：Part A2（材质 slop · glassmorphism）

### P1-5 · [Part C / Swiss Prompt] §17 残留 "spotlight" 在 §18 Component Constraints

- **位置**：Prompt line 613：`...reduced-motion fallbacks for AnimateNumber, WebGL, spotlight, and off-screen continuous motion`
- **问题**：删了 SpotlightGradient 后，§18 还提"spotlight"做 reduced-motion fallback，残留引用。
- **建议**：line 613 改为 `...reduced-motion fallbacks for AnimateNumber, WebGL, and off-screen continuous motion`（去掉 spotlight）
- **类别**：Part C-5（shader 保真，残留引用）

---

## §4 P2 Nit（可选 polish）

### P2-1 · [HTML] sticky-bar `.selector button.active` 背景 `var(--primary)` 字色 `var(--bg)`

- **位置**：HTML line 132-135
- **问题**：当 Swiss 切换时 `--primary` = cobalt blue（oklch 0.48 0.22 232），`--bg` 是 light-gray，对比足够，但 button 圆角是 `9999px` pill 形——和 Swiss "sharp" 全局矛盾（虽这是 tool chrome）。
- **建议**：考虑在选中 Swiss style 时 selector button 自身也吃 Swiss radius，或者保持 tool chrome 中性不受 style 影响（建议后者，避免 tool 自己变形）。

### P2-2 · [Prompt / Voice & Copy] line 265 "Resist slogans, questions, ALL-CAPS" 与 §1 Proposition "ALL CAPS dominate the Hero" 矛盾

- **位置**：
  - line 10 Proposition：`ALL CAPS dominate the Hero`
  - line 265：`Resist slogans, questions, ALL-CAPS`
- **问题**：Hero 标题层级允许 ALL CAPS（标志性 Swiss 移动），但 chapter title 和正文不该 ALL CAPS。当前一刀切的 "Resist ALL-CAPS" 太宽。
- **建议**：line 265 改为：`Resist slogans, questions. ALL CAPS reserved for Hero focal title and eyebrows only — never chapter titles, never body copy.`

### P2-3 · [Prompt §4] `Long-scroll cadence` 描述与 `long_scroll: false` Slot 字段冲突

- **位置**：
  - Slot line 13：`"long_scroll": false`
  - Prompt line 97：`Long-scroll cadence: chapters stack vertically, separated by hairline + accent ornament. Content determines height, min-h-[80vh] floor`
- **问题**：Slot 明说 Swiss 不是 long-scroll（IBM 报告通常是分页/screen-based），但 Prompt 仍 prose 描述 long-scroll cadence。
- **建议**：line 97 改为 `Screen-based cadence: each chapter fits within ~100vh; rigorous grid baseline aligns across screens; transitions are hairline-only.`

---

## §5 三 Part 详细 review

### Part A · 通用 Slop（HTML + Prompt）

| 类别 | HTML | Swiss Prompt | 结论 |
|---|---|---|---|
| **A1 配色与对比** | 0 blocking — 无紫渐变、无 cyan-on-dark、无 glow 边、有 OKLCH token 化 | 0 blocking — cobalt blue 是 brand-driven，不是 AI 调色板 | PASS |
| **A2 材质与视觉细节** | 1 blocking (P1-4 backdrop-filter blur) + 1 warning (chart-card border-radius 12px 在 Swiss sharp 上下文偏大但 swatch 元素 8px 算 OK) | 0 blocking — radius 全 0、shadow none、no blur 引用 | HTML 待修 |
| **A3 排版与层级** | 0 blocking — 字号阶梯通过 Slot driven | 1 blocking (P0-3 Inter) + 1 P1 (P1-1 weight ceiling) | Prompt 待修 |
| **A4 布局与空间** | 0 blocking — meta panel + module list 节奏合理，未堆 hero metric / 卡片密度均匀 | 0 blocking — KPI row 4-6 cell 合理 | PASS |
| **A5 动效** | 0 blocking — entrance 用 motion + ease bezier，无 bounce | 0 blocking — easing array、no bounce | PASS |
| **A6 文案与交互** | 0 blocking — section desc 简短，无冗余 | 0 blocking — Voice & Copy curator wall text 调对了 | PASS |

### Part B · 战报 PATTERN（Swiss Prompt）

| 编号 | 检查 | 评价 |
|---|---|---|
| **B1 Dashboard 漂移** | KPI row 4-6 cells，但 §11.3 "Grouped Metric Cluster" 用 Matrix Grid 2×2/2×3 + 一个 claim，符合"叙事不是 dashboard"约束 | PASS |
| **B2 Hero 陈词** | Hero typographic-field + 焦点 Display Number 200px + crop/offset 思路，没漂成 SaaS hero 模板 | PASS |
| **B3 CTA 入侵** | §16 Don't line 424 明确禁 CTA/action buttons/"view more"/dashboard/marketing verbs | PASS |
| **B4 规划标签泄漏** | §10 Scenario Mindset line 243 明确"Archetype names are internal planning labels only" — 规则到位；但 §17 残留 `ChapterBanner` / `OutroSignature` 组件名作为 prose 引用是潜在 leak（如果弱模型把组件名当 UI label 用，会泄漏） | **1 P0 (P0-2)** |
| **B5 结构单调** | §12 Rhythm density rotation + treatment variety + bold-move budget 都到位 | PASS（但 P0-1 SpotlightGradient 残留如果不删，可能每章被弱模型套同一 spotlight）|

### Part C · STYLE 保真度（Prompt vs Slot vs HTML data-swiss）

| 编号 | 检查项 | Slot 声明 | Prompt 执行 | HTML data-swiss | Verdict |
|---|---|---|---|---|---|
| **C1 配色保真** | OKLCH token / brand-hue 232 | ✓ token、hue 232 | ✓ 全程 var(--primary) / var(--chart-N) | ✓ data 一致 | PASS |
| **C2 圆角与材质保真** | pill=none, sharp=0, card_chrome=0, shadow=none, depth=hairline-only | pill=none ✓, sharp=0 ✓, shadow=none ✓ | pill=rounded-full ✗ (与 Slot drift) | **P0-5** |
| **C3 字体保真** | sans=Inter Variable / Helvetica Neue（Inter 被 A3 视为 overused）；weight_ceiling=600 | Inter 在 stack + 自相矛盾 §9 禁 Inter；weight 600 | data 一致但同样 Inter | **P0-3 + P1-1** |
| **C4 动效保真** | EASE array 4 套 + 500-900ms entrance + spring no bounce + viewport once | ✓ 全套 EASE export + 明确 once: true 规则 | data 一致 | PASS |
| **C5 Shader 保真** | hero_shader=MeshGradient（Phase B 待扩 dot-grid）；overlay_stack=["shader"]；radial_wash_css=null；noise_overlay=none；extra_svg_layer=none | ✓ MeshGradient 代码块完整，**但 §17 残留 SpotlightGradient（违反 overlay_stack）** + spotlight 在 §18 reduced-motion list 残留 | data 一致 MeshGradient 但 decor pack=instrumental 会渲染 drawn-horizon (违反 extra_svg_layer=none) + feTurbulence (违反 noise_overlay=none) | **P0-1 + P0-4 + P1-2 + P1-5** |

---

## §6 Slot Schema / 模板暴露的限制

本次 review 暴露 4 个 Schema/模板抽象不足，建议进入 Phase B Schema v0.3 规划：

1. **decorative_pack enum 不够**：当前 3 套（editorial / theatrical / instrumental）覆盖不了 Swiss IBM systematic 风格 —— 兜底走 instrumental 导致 drawn-horizon + feTurbulence noise 等违反 Swiss spec 的元素。建议新增 **`systematic`** 枚举值，对应组件集：ChapterStamp（圆圈 + 数字）+ Hairline rule + Sharp tag + 0 ornament。

2. **weight_ceiling enum 上限不足**：当前 enum 最高 600。Swiss IBM 风格真实需要 700-800。建议扩 enum 到 ["400", "500", "600", "700", "800"]。

3. **hero_shader 选项不足**：paper-shaders 库当前 3 套（MeshGradient / GrainGradient / GodRays）都是动态 organic，缺**静态 DotGrid** / **静态 LineGrid** 选项给 Swiss / IBM 用。建议 Schema 新增 hero_shader=null + extra_svg_layer="dot-grid" 组合支持。

4. **Prompt 模板生成器没有按 STYLE 过滤 §17 组件清单**：当前生成器似乎是把 SoT v6.5.8 / v1.0.1 / v0.5.1 的 §17 整段拼接，没按 `decorative_pack` 过滤掉不属于该 pack 的组件。导致 SpotlightGradient（Theatre/Warm） + ChapterBanner / OutroSignature（editorial）残留在 Swiss prompt 中。建议生成器加入 per-pack 组件白名单过滤，并对 null 字段做模板字面替换防御（`background: "null"` bug）。

---

## §7 Gate 判定

按 Slop Taxonomy §6 标准：**0 Blocking = pass**。当前：
- Part A：1 blocking（HTML backdrop-filter）+ 1 P1 字体 = **HTML 1 blocking**
- Part B：1 blocking（B4 组件名泄漏）= **Prompt 1 blocking**
- Part C：4 blocking（P0-1 / P0-2 / P0-4 / P0-5）= **Prompt 3 + HTML 1**

**总计 P0 = 5**，**P1 = 5**，**P2 = 3**。**FAIL** — 必须修完 P0 才能进 doubao 测试，否则 Part C 失败概率极高（弱模型会照搬 SpotlightGradient + ChapterBanner + Inter + drawn-horizon noise）。

---

## §8 关键 finding 总结（给 Cowork）

1. **Swiss Design Prompt v0.1 是个混合产物**：§1-§16 prose 描述基本对齐 Swiss IBM ground-truth，但 **§17 Components Inventory 是从 SoT 三套（Warm/Theatre/Cool）整段拼接生成，没做 per-pack 过滤**，导致 SpotlightGradient / OutroSignature / ChapterBanner 残留 + null 字段渲染成字面量 "null"/"nulls" bug。
2. **HTML 把 Swiss 当 instrumental 兜底**是错误的：Swiss 需要单独的 `systematic` decor pack，否则切换到 Swiss 会渲染出 Cool 风格的 drawn-horizon + feTurbulence noise，直接违反 Swiss spec。
3. **Slot Schema v0.2 enum 不够**：weight_ceiling 上限 600 阻止了 Swiss bold 风格；decorative_pack 缺 systematic；hero_shader 缺 static dot-grid。Phase B Schema v0.3 必须扩。
4. **Inter 字体陷阱**：Swiss Prompt 同时声明用 Inter 和禁 Inter，这是 AI 生成提示词最容易犯的自我矛盾。修法：换成 Helvetica Neue / IBM Plex Sans。
