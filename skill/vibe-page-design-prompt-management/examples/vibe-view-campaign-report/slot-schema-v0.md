---
type: slot-schema
project: Vibe view
phase: 2 · P4+ · 风格快速拓展自动化 · Stage 1
version: v0.5.1(2026-05-24,Round-91 Phase C)
owner: Cowork
status: 草案 v0.5.1 — R-91 Style B festive-editorial pack §4.6 补全
based_on:
  - _Framework/STYLE-Framework-v2-Schema.md(v2.0 三层架构 — 原子 / 分子 / 模式)
  - Phase-2-多风格扩充-规划.md(1 PATTERN ⊗ N STYLE / OKLCH brand-hue / 3 库限定)
  - T1 三版 Slot diff 对照表(`/tmp/slot-diff-table.md` 12 张表)
purpose: |
  v2 Schema 的机器可读精简版。把 markdown 模板的字段抽出来做成数据结构,
  作为 Slot JSON 注入 Warm.template.md → 生成 Design Prompt 的数据源。
phase_scope:
  phase_a: 数值 + 枚举字段(色彩 / 字号 / shader props / ease / ms / mode / decorative_pack)— 本期
  phase_b: prose 决策字段(treatment_prefs / layout_lean / section_order)— 后续
---

# Slot Schema v0 · 风格参数化数据结构

## §0 用法

```
Slot JSON(本 Schema 实例)
    + Warm.template.md(占位符模板)
    → Slot 注入器(简单 Python / Node 替换 + 条件块)
    → 最终 Design Prompt(可直接喂 doubao)
```

Slot JSON 同时驱动 Design System HTML 渲染页(色彩 swatch / 排版 sample / chart 示例 / shader 预览),供 Chris 校对。

## §1 与 v2 Schema 的对应关系

v2 Schema 是 markdown 模板(人读,Cowork 起 STYLE-spec-v2 时复制填充)。本 Schema 是**机器可读精简版**,字段一一映射:

| v2 Schema 段 | 本 Schema 字段 | 数据化处理 |
|---|---|---|
| frontmatter(mode / brand_hue / ground_truth 等) | `style_meta` | 直接对应 |
| §1-§7 原子层 | `atomic.{color / typography / spacing / radius / material / motion_timing / iconography}` | OKLCH 三分量数组 / px / em / enum |
| §8-§14 分子层 | `molecular.{hero_shader / hero_geometry / chart / dividers}` | shader 用 `{component, props}` block |
| §15-§21 模式层 | `patterned.*` | **Phase A 仅占位**(treatment_prefs 等保留 prose);Phase B 结构化 |
| §22 工具收敛 | `tooling.{shadcn / motion / paper_shaders}` | enum 列表 |
| §23 不会撞清单 | `differentiation[]` | 三维度对照对象 |

## §2 设计原则(5 个关键拍板)

| ID | 决策 | 理由 |
|---|---|---|
| **D1** | **三层架构对齐 v2** | 不另起,与 v2 Schema markdown 模板一一对应 |
| **D2** | **Phase A 数值优先**,prose 决策延后 | 80% 视觉差异在 token 层,先跑通端到端 |
| **D3** | **shader 用 `{component, props}` block,不强行扁平** | 三套 shader (GrainGradient/MeshGradient/GodRays) API 各异,强参数化会破坏 |
| **D4** | **decorative_pack 作顶层 enum 切组件套件** | Warm editorial 装饰(ChapterBanner/Divider/OutroSignature/QuoteBracket)是杂志风核心,不强行 strip;允许 `editorial / theatrical / instrumental` 切换 |
| **D5** | **混合流取色**(Phase 2 规划已定论 — VLM 数值 token 不可靠) | Vision 不单独负责数值;色值用确定性取色脚本 / Chris 校对兜底 |

### 5 个 T1 边界判定

| L# | 问题 | 拍板 |
|---|---|---|
| L1 | `--primary-soft`(Warm 独有) | **optional slot,默认 null** — 不强制三风格补齐 |
| L2 | 4 个 archetype Theatre 是否补齐 | **§11/§12 形式化骨架必须三风格完整**(以 Warm/Cool 同构骨架为基线);Theatre 旧版后续单独 patch |
| L3 | Warm editorial 装饰套件 | **enum decorative_pack 切组件套件**(见 D4)|
| L4 | Shader props block | **`{component: enum, props: object}`**(见 D3)|
| L5 | AnimateNumber wrap scope 表达不同 | **统一为 `≤ 3 rolling numbers per section`** — 三版实质约束一致 |

---

## §3 Schema 完整字段

### §3.1 顶层结构

```
{
  style_meta: { ... },        // §3.2
  atomic: {                   // §3.3 - §3.9
    color, typography, spacing, radius, material,
    motion_timing, iconography
  },
  molecular: {                // §3.10 - §3.13.5
    hero_shader, hero_geometry, overlay_stack, chart, dividers
  },
  patterned: { ... },         // §3.14(Phase A 仅占位)
  tooling: { ... }            // §3.15
}
```

### §3.2 style_meta

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `style_name` | string | ✓ | "Confident Warmth · Ivory Ember" |
| `style_handle` | string | ✓ | kebab-case,"warm-restraint-tech" |
| `version` | string | ✓ | "v1.0.1" |
| `mode` | enum `light` / `dark` / `chromatic` | ✓ | |
| `brand_hue` | number 0-360 | ✓ | OKLCH H |
| `chromatic_background` | OKLCH3 \| null | mode=chromatic 必填 | Phase A 三风格 mode ∈ {light, dark} 无样本,Phase B chromatic 风格落地时压测 |
| `long_scroll` | bool | ✓ | 默认 false |
| `ground_truth_images` | string[] \| null | ✓(允许 null) | 图谱可放 Brief 文件不冗余进 Slot;null 表示"参考图在 Brief 文件" |
| `ground_truth_signature` | string ≤ 30字 | ✓ | 一句核心气质 |
| `evidence_chain` | string | ✓ | ground-truth → spec 推导路径 |
| `mood_adjectives` | string[3..5] | ✓ | ["Warm","Confident","Brand-Forward","Bright"];3-5 词放宽 |
| `proposition` | string | ✓ | 一段风格定位 prose |
| `decorative_pack` | enum `editorial` / `theatrical` / `instrumental` / `systematic` / `festive-royal` / `festive-editorial` | ✓ | 见 §4(systematic 加于 v0.3;festive-royal / festive-editorial 加于 v0.5 Phase C R-90)|
| `display_typeface_class` | enum `sans` / `serif` | ✓ | 必填,默认 `sans`;`festive-royal` 必须 `serif`(festive-editorial 仍 `sans`)|
| `focal_numeral_strategy` | enum (3 选 1) | ✓ | 见 §3.3 |

### §3.3 atomic.color

**类型约定**:
- `OKLCH3` = `[L, C, H]` 三元组,L ∈ [0, 1],C ∈ [0, 0.4],H ∈ [0, 360]
- `OKLCH3+alpha` = `[L, C, H, alpha]`,alpha ∈ [0, 1]
- `LC` = `{L, C}` 两元组(H 取 brand_hue)

| 字段 | 类型 | 说明 |
|---|---|---|
| `neutral_hue` | number 0-360 | 中性轴(surface 系)H,通常 ≈ brand_hue |
| `foreground_hue` | number 0-360 \| null | 前景文字独立 H;null 表示 = neutral_hue;**Theatre/Cool 都分轴**(Theatre bg 248 / fg 138-139 错位 ~96-99°;Cool bg 262 / fg 255 错位 ~7°;Warm 全统一 hue 80) |
| `background` | OKLCH3 | |
| `surface_l1` | OKLCH3 | 通常 = background |
| `surface_l2` | OKLCH3 | 比 l1 提亮 / 压暗一步 |
| `surface_l3` | OKLCH3 | 再一步 |
| `foreground` | OKLCH3 | 主前景文字 |
| `foreground_2` | OKLCH3 | 弱化文字(small text 合规) |
| `foreground_3` | OKLCH3 | 装饰文字 |
| `border` | OKLCH3+alpha | hairline |
| `border_strong` | OKLCH3+alpha | 强边 |
| `primary` | LC | 强调色(H 取 brand_hue) |
| `primary_hl` | LC | 高亮变体 |
| `primary_soft` | LC \| null | optional(Warm 独有) |
| `primary_glow_alpha` | number 0-1 | 通常 0.18 |
| `chart_ramp` | LC[4] | chart-2~5 的 L/C(chart-1 = primary 固定) |
| `chart_hover` | OKLCH3+alpha | |
| `primary_wash` | OKLCH3+alpha \| null | primary tinted overlay(Warm `--ember-wash`);H 取 brand_hue;Theatre/Cool 通常 null |
| `ambient_ink` | OKLCH3+alpha \| null | dark inked tint overlay(Theatre/Cool `--glow-ink`);H 取 neutral_hue;Warm 通常 null |

**focal_numeral_strategy** enum:
- `primary_on_neutral` — Warm(focal = primary ember, unit = primary-hl)
- `primary_on_primary` — Theatre(focal = primary, unit 混合)
- `foreground_with_primary_signal` — Cool(focal = white, primary 仅 signal accent)

### §3.4 atomic.typography

| 字段 | 类型 | 说明 |
|---|---|---|
| `sans_stack` | string[] | font-family fallback 链 |
| `display_stack` | string[] | Display Number 字体链 |
| `mono_stack` | string[] | Mono 字体链 |
| `font_loading` | enum `npm` / `import-cdn` / `system-fallback` | Warm 用 npm,Cool 用 cdn,system-fallback 表示通过 stack 引用不下载(Theatre) |
| `weight_ceiling` | enum `500` / `600` / `700` / `800` | (700+ 用于 Swiss / IBM bold typographic — v0.3 扩)|
| `emphasis_tier` | enum `none` / `semibold` / `bold` | 是否允许 600+/700+ 在 delta/marker;bold 用于 Swiss Hero ALL CAPS |
| `display_number_lg` | px | Hero 大数字 (140 / 192 / 200) |
| `display_number_mobile` | px | |
| `display_lh` | float | line-height unitless |
| `display_ls_em` | float | letter-spacing em(负值) |
| `hero_title_lg` | px \| null | optional(Warm 独有) |
| `hero_title_mobile` | px \| null | |
| `page_title_lg` | px \| null | optional |
| `page_title_mobile` | px \| null | |
| `section_primary_lg` | px | |
| `section_secondary_lg` | px | |
| `section_tertiary_lg` | px | |
| `quote_lg` | px | |
| `body` | px | |
| `caption` | px | 13 (基本一致) |
| `lead_paragraph_lg` | px \| null | optional(Warm 独有) |
| `unit_suffix_lg` | px \| null | optional |
| `meta_tracking_em` | float | |
| `eyebrow_tracking_em` | float | |
| `eyebrow_px` | px | |
| `font_feature_settings` | string | CSS `font-feature-settings` 值 |
| `cjk_body_max_ch` | int | |
| `cjk_hero_max_ch` | int | |

### §3.5 atomic.spacing

| 字段 | 类型 | 说明 |
|---|---|---|
| `base_px` | int | 8(固定) |
| `scale_extra` | int[] | Warm 加 [32],其余 [] |
| `section_py_mobile` | int | Tailwind py-N |
| `section_py_lg` | int | |
| `section_px_lg` | int | |
| `container_max_w` | enum (Tailwind) | "max-w-3xl" / "max-w-5xl" |

### §3.6 atomic.radius

| 字段 | 类型 | 说明 |
|---|---|---|
| `pill` | enum `rounded-full` / `none` | Tags / Badge |
| `sharp_panel_max_px` | int | chart / table 圆角上限 |
| `card_chrome` | int \| `double-bezel` | cluster 卡片圆角 |

### §3.7 atomic.material

| 字段 | 类型 | 说明 |
|---|---|---|
| `depth_mechanism` | enum `hairline-only` / `double-bezel` / `thin-border-inset` | |
| `shadow` | enum `none` / `inset-glow` / `inset-light` | |
| `double_bezel_spec` | object \| null | outer ring + inner card 规格 |
| `noise_overlay` | enum `none` / `svg-feturbulence` | |

### §3.8 atomic.motion_timing

| 字段 | 类型 | 说明 |
|---|---|---|
| `ease_out` | cubic-bezier(float[4]) | |
| `ease_inout` | cubic-bezier | |
| `ease_snap` | cubic-bezier | |
| `ease_spring` | cubic-bezier | |
| `hover_ms` | int | |
| `button_press_ms` | int | |
| `entrance_ms_range` | [int, int] | |
| `number_rolling_s_range` | [float, float] | |
| `curve_path_s_range` | [float, float] | |
| `spotlight_drift_s` | float \| null | |
| `signature_stroke_s` | float \| null | Warm 独有 1.8 |
| `stagger_children_s` | float | |
| `inview_margin` | string | "0px 0px -10% 0px" / "-20%" |

### §3.9 atomic.iconography

| 字段 | 类型 | 说明 |
|---|---|---|
| `stroke_width_px` | float | 1 / 1.5 |
| `allowed_unicode` | string[] | ["▲","▼","·","—","•"] |
| `custom_svg_scope` | enum | `structural-only` / `+motion-paths` / `+chart-internals` |

### §3.10 molecular.hero_shader

允许整个 block 为 `null`(无 shader,如 Swiss systematic 极简风格;Hero 背景靠 `extra_svg_layer` 如 `dot-grid` + `radial_wash_css` 等其他层填充)。否则按 `{ component, props }` block:

```json
{
  "component": "GrainGradient" | "MeshGradient" | "GodRays" | "Dithering",
  "props": { /* 按 component 校验,见 §3.11 */ }
} | null
```

### §3.11 hero_shader.props(三套独立)

**GrainGradient**:`shape` / `softness` / `intensity` / `noise` / `scale` / `rotation` / `offsetX` / `offsetY` / `fit` / `colors[hex]` / `colorBack` / `speed`

**MeshGradient**:`distortion` / `swirl` / `grainOverlay` / `opacity` / `colors[hex]` / `speed`

**GodRays**:`density` / `spotty` / `midIntensity` / `midSize` / `intensity` / `bloom` / `offsetX` / `fit` / `colors[hex]` / `colorBack` / `colorBloom` / `speed`

**Dithering**(v0.4.1 — Swiss / IBM systematic 8-bit dither 效果,真 API 来自 paper-shaders GitHub source):`type`(enum `random` / `2x2` / `4x4` / `8x8`)/ `shape`(enum `simplex` / `warp` / `dots` / `wave` / `ripple` / `swirl` / `sphere`)/ `size`(number 1-20,像素粗细 — `pxSize` deprecated alias)/ `colorFront` / `colorBack` / `speed` / `scale`(0.01-4)/ 可选通用 `rotation` / `offsetX/Y` / `fit`

**通用约束**:`speed_active` ≥ 0,`speed_off_viewport` = 0(reduced-motion + off-viewport pause,固定骨架)

### §3.12 molecular.hero_geometry

| 字段 | 类型 | 说明 |
|---|---|---|
| `default_treatment` | enum `asymmetric-split` / `full-bleed-monolith` / `typographic-field` | |
| `radial_wash_css` | string \| null | CSS gradient 字符串 |
| `extra_svg_layer` | enum `none` / `feturbulence` / `drawn-horizon` / `noise+wash` / `dot-grid` / `line-grid` | dot-grid 用于 Swiss systematic(CSS `background-image: radial-gradient(circle, var(--border-strong) 1px, transparent 1px); background-size: 32px 32px;`);line-grid 用 CSS grid pattern |
| `stamp_constraint` | enum `bounded-3x` / `optional` | |

### §3.12.5 molecular.overlay_stack

| 字段 | 类型 | 说明 |
|---|---|---|
| `overlay_stack` | string[] | Hero 视觉层叠优先级数组(从下到上);可能值 `shader` / `radial_wash` / `drawn-horizon` / `feturbulence-noise` / `stamp` / `spotlight-gradient`;Cool 可能 4 层叠加,Warm 仅 shader+stamp,Theatre shader+spotlight-gradient |

### §3.13 molecular.chart

| 字段 | 类型 | 说明 |
|---|---|---|
| `area_fill_opacity` | float \| `gradient` | 0.2 / "0.35→0" |
| `area_type` | enum `natural` / `monotone` | |
| `grid_dasharray` | string \| null | "2 4" / null |
| `grid_vertical` | bool | |
| `grid_density_descriptor` | string | 一句话氛围词 |
| `last_point_treatment` | enum `halo+dot` / `activeDot` / `none` | |
| `cursor_style` | enum `dashed-stroke` / `fill-hover` | |
| `tooltip_card` | enum `custom-component` / `content-style` | Warm 用 custom,Theatre/Cool 用 content-style |

### §3.13.5 molecular.dividers

| 字段 | 类型 | 说明 |
|---|---|---|
| `accent_divider` | string \| enum | gradient CSS / `hairline-dotdotdot` / `gradient-hairline` / `alpha-hairline` |
| `content_divider` | string \| enum | 内容间分割线表达 |
| `chapter_opener` | enum `hairline-banner` / `chapter-stamp-circular` / `chapter-stamp-text` / `optional-marker` | 章节开场模式 |

### §3.14 patterned(Phase A 仅占位)

```
{
  treatment_prefs: { /* per-archetype map,Phase B 结构化 */ } | null,
  dominant_move_prefs: { primary[], avoid[] } | null,
  layout_lean: {
    symmetry: "asymmetric" | "symmetric",
    columns: "single" | "multi",
    whitespace_ratio: float | null
  } | null,
  density_lead: "dense" | "medium" | "spacious"
}
```

Phase A 仅 `density_lead` 必填,其余 Phase B 处理。

**density_lead 派生规则(经验)**:按 `section_py_lg` 节奏推 — `py-40` 以下 → `dense`;`py-40-48` → `medium`;`py-56` 以上 → `spacious`。若同时叠 noise overlay / multi-shader 视觉密度更高,可上跳一档(Cool py-40 + feTurbulence overlay = `dense`)。

### §3.15 tooling

```
{
  shadcn_subset: string[],     // 兜底 ["Card","Badge","Progress","Separator"];T3 模板抽象时按风格补全
  motion_apis: string[],        // 兜底 ["motion","useInView","AnimateNumber"]
  paper_shaders: {
    primary: string,            // "GrainGradient" / "MeshGradient" / "GodRays"
    secondary: string | null,   // Phase A 单 shader / per page,null 即可
    banned: string[]            // 与其他风格不撞声明
  }
}
```

### §3.16 differentiation(已弃,Chris Round-81 反馈)

~~原 v2 Schema §23 "不会撞清单"对应字段~~ — Chris 拍板**本期不需要**,Schema 不保留,example JSON 也清掉。后续如有差异化需求,在 Brief 文件或 review 段处理,不入 Slot 数据层。

---

## §4 decorative_pack 三套定义

每个 pack 是组件 + 装饰规则的集合。注入器按 `decorative_pack` 切对应 markdown 块到模板。

### §4.1 editorial(Warm 杂志风)

**组件**:`ChapterBanner`(hairline + mono kicker + claim-line title)/ `ChapterDivider`(`· · ·` Mono tracking-[0.8em])/ `QuoteBracket`(SVG 40×40 L-shape)/ `OutroSignature`(double hairlines + diamond rotate 0→45°)/ inline `DeltaIndicator`(无 pill)/ `ChapterStamp`(column text)/ `ChartTooltipCard`(custom inline 实现)

**规则**:hairline-driven 章节分隔,装饰元素 ≤ 3 per page,无 pill / 无 shadow

### §4.2 theatrical(Theatre 戏剧风)

**组件**:`ChapterStamp`(SVG circular badge)/ `SpotlightGradient` / `DeltaIndicator`(pill with rounded-[4px] border)/ Tooltip 用 `contentStyle`(inline object)

**规则**:Double-Bezel cards / inset-glow shadow / single accent disciplined / no editorial decoration

### §4.3 instrumental(Cool 仪表风)

**组件**:`ChapterStamp`(SVG circular badge)/ `SpotlightGradient` / `DeltaIndicator`(pill with border)/ `OutlinedPill` Tags / 全页 SVG feTurbulence noise overlay / drawn-horizon SVG line

**规则**:thin-border-inset cards / inset-light shadow / signal-as-accent(focal = white,primary = direction signal)/ SVG structural ornaments + motion paths

### §4.4 systematic(Swiss / IBM 极简风,v0.3 新增)

**组件**:`ChapterStamp`(SVG circular badge,数字 "01"/"02"/"03" 大粗,无 ring 仅圆形 fill primary)/ `HairlineRule`(全宽 1px var(--border-strong),无渐变 / 无 dot)/ `SharpTag`(sharp 0-2px corner outline pill 替代,thin-border)/ `inline DeltaIndicator`(无 pill,grotesk 粗字符 + Δ / ▲ / ▼)

**规则**:整页 0 圆角(`pill: none`,`sharp_panel_max_px: 0`,`card_chrome: 0`)/ hairline-only depth(无 shadow / 无 noise overlay / 无 drawn-horizon)/ **Hero 必含 shader**(systematic 用 `Dithering` 8-bit 颗粒,Chris Round-82)/ **Hero 不渲染 ChapterStamp / chapter marker**(Hero ≠ chapter,Chris Round-83 #9)/ **Shader colorFront 选择必须考虑文字 a11y**(深色 shader 用低饱和 / 浅色 colorFront,如 Swiss 用 `#7E94CC` 而非 `#1E3FB0` cobalt full strength)/ **a11y 通过调 shader props 解决,不叠 mask / backdrop-filter / overlay**(Chris Round-83 #8,根因解决原则)/ ALL CAPS Hero 排版主导 / **黑粗线 / 深色饱和 border 仅用于 divider / hairline,绝不用于卡片 border**(card border 用 `var(--border)` whisper-thin ≤ 12% alpha,Chris Round-82)/ no editorial decoration / no theatrical spotlight / no instrumental noise

### §4.5 festive-royal(中国风红色喜庆 · 全红+金衬线,v0.5 新增)

**组件**:`SealStamp`(印章替代 ChapterStamp,28-40px SVG 圆/方 fill `var(--primary)`,无 ring,中央衬线 numeral 700 weight `var(--background)` 反色)/ `GoldenHairline`(全宽 1px `var(--primary)` 0.4 alpha 替代 hairline)/ `TasselDivider`(垂直竖线 1px 高 32px + 末端小圆点 SVG,Hero 装饰用 1 个不多)/ inline `DeltaIndicator`(无 pill,serif 粗字符 + ▲ / ▼)/ `ChartTooltipCard`(custom inline,gold border on muted crimson bg)

**规则**:整页 `chromatic` ground(深红 OKLCH `[0.42, 0.18, 25]`)/ Display + Hero Title + Section + Eyebrow + Body + Caption 全 serif(Cormorant Garamond / Noto Serif SC)/ 金色 muted gold ivory foreground 主导文字色 / Hero 必含 GrainGradient shader(深红 grain breath,colors crimson 渐 muted gold)/ **Hero 不渲染 SealStamp**(Hero ≠ chapter,Round-83 通用规则同样适用)/ shader colorFront a11y → 调 GrainGradient colors / colorBack props(Round-83 通用规则)/ `radial_wash_css` 金色 16% alpha 给 Hero focal 区域呼吸 / no shadow / hairline-only depth / no editorial decoration / no theatrical SpotlightGradient / no instrumental noise / no systematic 0 圆角(本风格保 2px sharp)/ pill 不用(serif 风格不上 rounded-full pill,所有 tags 都 sharp 2px)/ weight ceiling 700(serif bold 是 Royal 签名,Hero Display Number + Hero Title + Section Primary + SealStamp numerals 用 700;Body / Lead / Caption 400-500)

### §4.6 festive-editorial(中国风红色喜庆 · 白底+黑无衬线大字,v0.5.1 新增)

**组件**:`ChapterNumeralLarge`(chapter index 替代 ChapterStamp,超大 sans 数字 96-120px `font-extrabold` 800 weight `var(--primary)`,无 ring 无 SVG,与 chapter title baseline 对齐)/ `HairlineRule`(全宽 1px `var(--border-strong)` 替代花式 divider)/ `SharpTag`(0px corner outline tag,replacing pill)/ `NumericKicker`(chapter eyebrow Mono Caps,与 ChapterNumeralLarge 一行排列)/ inline `DeltaIndicator`(无 pill,Helvetica 800 + ▲ / ▼)/ `ChartTooltipCard`(content-style,white bg + black text)

**规则**:`mode = light`(白/米白底)/ `display_typeface_class = sans`(全 sans,Helvetica Neue / IBM Plex Sans / Inter / Noto Sans SC)/ `weight_ceiling = 800`(Hero Display + Hero Title + Section Primary + ChapterNumeralLarge 全 800,Body / Lead 400-500)/ 整页 0 圆角(`pill: none`,`sharp_panel_max_px: 0`,`card_chrome: 0`)/ no shadow / hairline-only depth / **Hero 必含 GrainGradient red shader**(red blur 大色块作背景,不上 dark 也不上 chromatic)/ **Hero 不渲染 ChapterNumeralLarge**(Hero ≠ chapter,Round-83 通用规则)/ shader colorFront a11y → 调 GrainGradient `colors` / `colorBack` props(Round-83 原则 8 同样适用,**白底上红色 grain 不要太鲜艳压字**,本风格 colorBack ivory `#FFFAF7` + colors red ramp 已平衡;若 Hero 字读不出来 → 调 colors L 而不是叠 mask)/ 负字距紧密排版 `display_ls_em -0.05em`(refero Valiente Crimson brutalist 风格)/ no editorial flourish / no theatrical SpotlightGradient / no instrumental noise / no systematic Dithering / no festive-royal SealStamp / **黑色 / 深饱和 border 仅用于 hairline / chapter divider,绝不上 card border**(Chris Round-82 通用规则)/ Quote 用 leading em-dash `—` `var(--primary)` lead-in 加 trailing em-dash(brutalist 编辑设计)/ Outro 闭合用大号 red ChapterNumeralLarge "END" + HairlineRule

**与 festive-royal 区别**:festive-royal = chromatic 深红底 + 全 serif 700 + SealStamp + GoldenHairline;festive-editorial = light 白底 + 全 sans 800 + ChapterNumeralLarge 大数字 + HairlineRule — 同为喜庆风,前者宫廷印章,后者当代编辑

---

## §5 example JSON(待生成)

- `_Framework/slot-examples/warm-v1.0.1.slot.json`(Warm 反向实例化,验证 Schema 完整性)
- `_Framework/slot-examples/theatre-v6.7.1.slot.json`
- `_Framework/slot-examples/cool-v0.5.1.slot.json`

填充工作派 sub-agent 跑(数据已在 T1 对照表),反向实例化过程暴露 Schema 漏洞,迭代到 v0.2。

---

## §6 注入器接口

```
inject(
  slot_json: SlotJSON,
  template: "Warm.template.md" | str,
  decorative_pack_blocks: { editorial: md, theatrical: md, instrumental: md }
) → Design Prompt (markdown)
```

实现要点:
- 占位符 `{{slot.path.to.field}}` 替换(支持嵌套)
- decorative_pack 按值切对应 pack 块
- shader props 展开为 tsx code(按 component 选模板)
- chart_ramp 4 元组展开为 chart-2/3/4/5 token 行
- 固定骨架段(verbatim Pattern / 红线 / §8 / §18)直透不处理

---

## §7 下一步

1. 派 sub-agent 起 3 个 example JSON(基于 T1 对照表数据反向实例化)
2. Sub-agent 回报暴露 Schema 漏洞 → 我迭代 v0.2
3. v0.2 拍板后启动 T3(Warm.template.md 抽象)+ T4(Design System HTML 渲染页)并行
4. T5 注入器跟 T3 同步开发
5. T7 端到端冒烟:Chris 给一张配图 → 走完管线 → Design Prompt v1.0 → doubao 测

---

## §8 与 v2 Schema 共存关系

本 Schema **不取代** `STYLE-Framework-v2-Schema.md`(v2.0)。v2 Schema 是人读 markdown 模板(用于 Cowork 起完整 STYLE-spec-v2 时复制填充);本 Schema 是机器可读 Slot 数据(用于注入器)。**两者数据一致,载体不同**。后续若 STYLE-spec-v2 实例化需要,可由 Slot JSON 反向渲染 markdown spec。

---

## §9 Changelog

### v0.5.1(2026-05-24 Phase C · Round-91 · Style B festive-editorial pack 定义补全)

R-91 #25 Style B 工程集成:

1. **§4.6 新增 `festive-editorial` pack 完整定义**:ChapterNumeralLarge(超大 sans 数字 96-120px 800 weight red,无 ring 无 SVG)/ HairlineRule(全宽 1px border-strong)/ SharpTag / NumericKicker / inline DeltaIndicator 800 / ChartTooltipCard content-style white+black
2. **与 festive-royal 区别清晰化**:festive-royal = chromatic 深红底 + serif 700 + SealStamp + GoldenHairline;festive-editorial = light 白底 + sans 800 + ChapterNumeralLarge + HairlineRule
3. **Style B 实例化 brand_hue 28**:festive-editorial-crimson.slot.json 落地

### v0.5(2026-05-24 Phase C · Round-90 · Style A festive-royal pack + display_typeface_class 扩展)

R-90 #24 Phase C Style A 工程集成:

1. **§3.2 `decorative_pack` enum 扩展**:加 `festive-royal` / `festive-editorial`(festive-editorial 为 Style B 占位,§4 暂无定义)
2. **§3.2 `display_typeface_class` 新字段**:enum `sans` / `serif`,必填,默认 `sans`;festive-royal 必须 `serif`
3. **§4.5 新增 `festive-royal` pack 完整定义**:SealStamp / GoldenHairline / TasselDivider 组件 + chromatic ground 深红规则 + 全 serif + Hero 不渲染 SealStamp + weight ceiling 700 serif Royal 签名

### v0.4.2(2026-05-22 Phase B.6 · Round-83 Hero + shader a11y 规则)

Chris Round-83 反馈 + Cowork 失职反思:

1. **§4.4 systematic 规则补充**:Hero 不渲染 ChapterStamp(Hero ≠ chapter)/ Shader a11y 调 props 不叠遮罩(根因解决原则)
2. **(Inline 模板 v0.4.2)§1 prose 加 Round-83 规则**:Hero ≠ chapter / Shader a11y → 调 props
3. **新建 `_Framework/iteration-log.md`**:项目知识沉淀文件(issue 流水账 + 抽象原则 + 现有记录 index)
4. **(Inline Swiss Slot v0.5)**:colorFront `#1E3FB0` → `#7E94CC`(muted cobalt,a11y 友好)
5. **(Inline HTML v5.1)**:撤 sub-agent C 加的 color-mix backdrop mask(违反根因解决原则)+ buildHeroCorner 全返 null(Hero 不渲染 stamp)

### v0.4.1(2026-05-21 Phase B.5 · 真 API 校准)

HTML sub-agent A 查 paper-shaders Dithering 真 API(GitHub `paper-design/shaders/.../dithering.tsx`):
- `type` enum 实际:`random` / `2x2` / `4x4` / `8x8`(不是占位的 `Bayer 8x8`)
- `shape` enum 实际:`simplex` / `warp` / `dots` / `wave` / `ripple` / `swirl` / `sphere`(不是占位的 `noise`)
- `size` 替代 `pxSize`(deprecated alias)
- §3.11 Dithering 描述更新 + Swiss Slot props v0.4 同步更新

### v0.4(2026-05-21 Phase B.5)

Chris Round-82 反馈(共 7 条,Schema 层涉及 #6 #7):

1. **`molecular.hero_shader.component` enum 加 `Dithering`** §3.10/§3.11 — Hero 必含 shader(Chris #6),Swiss systematic 用 Dithering 8-bit 颗粒(替代 v0.3 dot-grid CSS 静态方案)
2. **§4.4 systematic pack 规则补充**:Hero 必含 Dithering shader / **黑粗线 div​​ider only,不上 card border**(Chris #7)
3. (Inline 模板 v0.4)§1 prose 加黑粗线规则 + Slop Taxonomy A2 加 detector — verbatim 跨风格通用

### v0.3(2026-05-21 Phase B)

Anti-Slop review v0.1(`_Framework/anti-slop-review-v0.1.md`)暴露 4 个 Schema 抽象不足,扩 enum:

1. **`style_meta.decorative_pack` 加 `systematic`** §3.2(Swiss / IBM 极简风)— §4.4 新增 pack 定义
2. **`atomic.typography.weight_ceiling` 加 `700` / `800`** §3.4(Swiss bold typographic)
3. **`atomic.typography.emphasis_tier` 加 `bold`** §3.4
4. **`molecular.hero_shader` 整 block 允许 null** §3.10(Swiss 极简无 shader)
5. **`molecular.hero_geometry.extra_svg_layer` 加 `dot-grid` / `line-grid`** §3.12(Swiss CSS 点阵)
6. **同时 patch · inject.py 注入器 `_fmt_value` `None → ""`** (P0-1,避免 "null"/"nulls" 字面拼接)— 模板配合 v0.3 在 null 字段处用 `{{#if X}}...{{/if}}` 包条件块

### v0.2(2026-05-21)

反向实例化校验由 Cowork sub-agent 跑出 3 example JSON(Warm/Theatre/Cool)+ 10 schema issues,修复:

1. **加 `molecular.dividers` §3.13.5**(原 §3.1 列了但未展开 — 结构性缺失)
2. **加 `molecular.overlay_stack` §3.12.5**(三层叠加优先级:shader / radial_wash / drawn-horizon / feturbulence-noise / stamp / spotlight-gradient — 原 Schema 无表达层叠关系)
3. **拆 `accent_wash` → `primary_wash` + `ambient_ink`**(Warm ember-wash 是 primary tinted,Theatre/Cool glow-ink 是 dark inked tint,语义不可压扁)
4. **加 `foreground_hue` optional 字段**(Theatre 独有 fg/bg hue 分轴:bg 248 / fg 138-139)
5. **`font_loading` enum 加 `system-fallback`**(Theatre 通过 stack 引用不下载)
6. **`mood_adjectives` 放宽 string[4] → string[3..5]**
7. **`chromatic_background` / `ground_truth_images` 加 Phase A 注释**(允许 null)
8. **`density_lead` 加派生规则**(按 section_py_lg + noise overlay 推)
9. **`tooling` 加 Phase A 兜底注释**(shadcn_subset / motion_apis 等 T3 模板抽象时补全;paper_shaders.secondary Phase A 留 null)
10. **未修(留作 Schema 设计取舍说明)**:Issue 2(shadcn_subset 完整白名单)归 T3 模板抽象时填,不属 Schema 漏洞

### v0(2026-05-21)

初始草案 — Round-81 Slot diff 反向实例化前。三层架构(原子 / 分子 / 模式)对齐 v2 Schema markdown 模板。
