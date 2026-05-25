---
type: style-framework-schema
project: Vibe view
phase: 2 · P4 · STYLE 框架 v2
version: v2.0(2026-05-17)
owner: Cowork
status: schema(承载未来各风格 STYLE spec v2 的容器)
based_on: |
  - 上份调研 `_Framework/Research-6-Styles-Anchor-Differentiation.md` §4.4 STYLE 三层模板(初版)
  - 新调研 `_Framework/Research-3-Libs-Deep-Use-and-Ornament-Inventory.md` §6 schema 字段清单 + §5 点缀 inventory
  - 3 风格 ground-truth 图(`_resources/style-mood-references/{Gold|Warm|Swiss}/`)校准
  - Round-58/59/60 Chris 校准链
purpose: |
  统一所有风格 STYLE spec v2 的结构 + 字段名 + 字段语义。
  起 STYLE spec v2 时复制本 schema 的"模板段" → 按风格填充每字段 → 落 `{风格}/{风格}-STYLE-spec-v2.md`
---

# STYLE 框架 v2 · Schema

## §0 设计原则(为什么这套 schema 长这样)

### 原则 1 · 三层独立扩展
- **原子层**(色 / 字体 / 圆角 / spacing / 材质 / 图标)— 沿用 v1 已有
- **分子层**(Hero 锚 / 卡片 / Chart / 组件 sketch / 动效语言 / 点缀)— **归还 STYLE**(v1 锁在 PATTERN / §17 默认)
- **模式层**(Treatment 偏好 / Dominant move 偏好 / layout 倾向 / 章节顺序 / 点缀位置 / 密度倾向)— **归还 STYLE**(v1 完全锁 PATTERN)

PATTERN 只保留:信息层级骨架 / archetype 命名 / 数据 → archetype 映射 / AnimateNumber 机制 / 工程红线 / Slop 通用 Part A/B / Voice & Copy / Composition rhythm 结构(密度三态 / 邻接 / bold-move / break 节拍 — **但允许 STYLE 声明本风格的密度倾向**)。

### 原则 2 · ground-truth 图驱动
每风格 STYLE spec v2 必含 `ground_truth_images` frontmatter 字段,指向 `_resources/style-mood-references/{风格}/` 文件夹。Cowork 在起 spec 时,**所有视觉决策必须能在 ground-truth 图里找到 evidence**,不能凭空发挥。

### 原则 3 · mode 字段
STYLE spec v2 frontmatter 必含:
- `mode`: `dark` / `light` / `chromatic`(Festive 红底用)
- `chromatic_background`: 若 mode=chromatic 必填,e.g. `oklch(0.55 0.22 28)` 中国红
- `long_scroll`: `true` / `false`(Festive 必 true,其他风格 false)

PATTERN 中的 "禁白色蒙层 / skeleton" 这类 mode-dependent 规则,在 STYLE spec v2 用 mode-触发条件覆盖。

### 原则 4 · 工程红线 vs 风格层分离
shadcn 写法红线(20+ 条,from CC §2.6 报告)**归 System Prompt**,不进 STYLE spec(避免每风格重复)。STYLE spec 只声明"用哪些 shadcn 组件 / 怎么 theming"。

### 原则 5 · "差异化"声明制
每风格 STYLE spec v2 末尾必含 `__不会撞清单__` 段:与其他 ≥ 2 个已落地风格各对照一次,声明本风格的"不可混淆"维度(至少 3 维独有)。Cowork 二次审查时按此验证差异化。

---

## §1 STYLE spec v2 完整模板

> 每风格 STYLE spec v2 复制此段 → 按风格填充。所有方括号 `[...]` 是占位符。

```markdown
---
type: style-spec-v2
style_name: [Style Name in English, e.g. Gold Executive Luxe]
style_handle: [kebab-case, e.g. gold-executive-luxe]
project: Vibe view
phase: 2 · P4
version: v2.0
created: [YYYY-MM-DD]
owner: Cowork
status: 草案 v2 — 待 Chris review(review gate 在 ground-truth 校准 + 数值 token + 字体 + shader + 点缀清单)

# 关键 frontmatter
mode: [dark / light / chromatic]
chromatic_background: [若 mode=chromatic 必填 oklch 值]
long_scroll: [true / false]
brand_hue: [OKLCH hue 数值]

# ground-truth 锚定
ground_truth_images:
  - _resources/style-mood-references/[风格名]/[图 1].png
  - _resources/style-mood-references/[风格名]/[图 2].png
ground_truth_signature: [一句 ≤ 30 字 抓核心气质,从图里读出来的]

evidence_chain: [简述 ground-truth → spec 的 evidence 推导路径]
---

# [Style Name] · STYLE Spec v2

## §0 这是什么(自我说明)

[Style Name] 的 STYLE 完整 spec(原子 + 分子 + 模式 三层)。**Cowork→CC 组装 Design Prompt v2 时以 v0.4.3 为 baseline 模板,本 spec 替换 STYLE 层**(§1-§9 + §13.1 Hero anatomy + §17 STYLE-specific 组件 + §6 motion STYLE 部分)。**review gate**:ground-truth 校准 + 数值 token + 字体 + shader + 点缀清单。

---

# 原子层

## §1 Brand & Style(基调)

- **Mood**:[4 词,用 ground-truth 词云提炼]
- **Proposition**:[1-2 句,描述本风格的核心 design proposition,英文 Design Prompt 体]
- **核心反向规则**(若适用):[与 Cool Precision Tech 反 / 与 Gold Executive 反 的关键反向规则,声明出来]

## §2 Colors(配色 recipe · OKLCH)

### §2.1 ground-truth 取色
[从 ground-truth 图取色的关键 oklch 值 + 取色位置说明]

### §2.2 OKLCH token(`:root, .[dark|light]` 块)

**中性基底(固定,不跟 brand-hue)**:
| token | 提议值 | 依据 |
|---|---|---|

**强调色 recipe(hue-derived)**:
| token | 提议值 | 依据 |
|---|---|---|

### §2.3 核心色彩规则(场景 + 反向)
[本风格的核心色彩使用规则,如:焦点数字 = primary / 焦点数字 = foreground / 焦点数字 = chromatic-bigtype 等]

## §3 Typography(字体 / 字号 / weight)

### §3.1 字体栈
| 角色 | 选型 | 依据(ground-truth 证据)|
|---|---|---|
| Display Number / Hero |  |  |
| Hero / Section Title |  |  |
| Body / Label / Caption |  |  |
| Mono / Meta |  |  |

### §3.2 weight 纪律(Round-45 守住)
[全风格 weight 上限 500 / 禁 700+;若风格特殊例外标 explicitly]

### §3.3 字号阶梯
[stair-step 表 + key levels]

### §3.4 @import 声明(必须)
[CDN @import 完整声明 + CC 必 web-fetch 验证]

### §3.5 字体栈定义(CSS fontFamily)

## §4 Spacing & Layout(间距与圆角)

[基准 / Section padding / Container / 圆角 / Pill 例外]

## §5 Material(材质)

[surface elevation / grain noise / 结构光 / border / pill 等;明确本风格的材质 inventory]

## §6 Motion(动效 timing / easing 部分 — STYLE 层)

[EASE 倾向 + Timing 表(具体 cubic-bezier + ms 范围)+ spring 物理倾向 + reduced-motion 沿用 v1]

## §7 Iconography(图标)

[stroke + 视觉 + 沿用 Round-49 don't 自绘 SVG 通用规则]

---

# 分子层(归还后新)

## §8 Hero 视觉锚(paper-shaders 主选 + 几何 sketch)

### §8.1 paper-shaders 主选
**Shader**: [名称]
**Props**:
```tsx
<[ShaderName]
  prop1={value1}
  prop2={value2}
  ...
/>
```
**Evidence**: [从 ground-truth 图哪处看出的]
**与其他风格的不撞**: [对比其他风格的主选 shader,声明独占性]

### §8.2 Hero 几何 sketch(锚形态)
**Anchor 类型**: [大数字 / 单字符 / 短句 / 单字 + 小数字 / 章节 / Marquee / 其他]
**布局描述**: [text-based geometry sketch, ~50-100 字]
**Evidence**: [从 ground-truth 图哪处看出的]

### §8.3 Hero entrance 动效
[简述,详 §6]

## §9 章节背景 / inline 装饰 shader(可选)

[若本风格在非 Hero 章节也用 shader,列出 shader 选型 + 用法 + 触发条件]

## §10 卡片视觉签名(shadcn theming)

### §10.1 Card 形态
- 圆角 / shadow / border / padding / 状态(default / hover / focus / pressed)

### §10.2 cva variants
- `report-section` / `kpi-block` / `chart-frame` 等 variants 描述

### §10.3 Evidence
[从 ground-truth 图哪处看出的]

## §11 shadcn Chart 视觉签名

### §11.1 主推 chart 类型
[area / bar / radar / sparkline / KPI ring / composed / custom cursor 之一或组合]

### §11.2 ChartConfig oklch 映射
```tsx
const chartConfig = {
  [key]: {
    label: "[Label]",
    color: "oklch(L C var(--brand-hue))"
  },
  ...
};
```

### §11.3 Tooltip / Legend / Grid / axis / cursor 风格化
[每项视觉描述]

### §11.4 Evidence
[从 ground-truth 图哪处看出的]

## §12 组件 sketch(8-10+ 个,每个含几何描述)

> 每组件给:① 几何 sketch(text + 简单 SVG-pseudo 描述)② 材质 / 微交互 ③ 与其他风格的形态差异

| # | 组件 | 用法 | 几何 sketch | 微交互 |
|---|---|---|---|---|
| 1 | DeltaIndicator |  |  |  |
| 2 | ChapterStamp |  |  |  |
| 3 | OutlinedPill |  |  |  |
| 4 | SpotlightGradient |  |  |  |
| 5 | Eyebrow / Kicker |  |  |  |
| 6 | SectionNumber |  |  |  |
| 7 | [选填] DropCap |  |  |  |
| 8 | [选填] PullQuote |  |  |  |
| 9 | [选填] RegisterMark |  |  |  |
| 10 | [选填] PeriodMarker |  |  |  |
| 11 | [选填] AnnotationArrow |  |  |  |
| 12 | [选填] DataLabelCallout |  |  |  |
| 13 | [选填] Marginalia |  |  |  |
| 14 | [选填] Divider |  |  |  |
| 15 | [选填] Ornament |  |  |  |

## §13 动效语言

### §13.1 EASE + Timing(STYLE 倾向)
[继承 §6,补加更细的"动效语言"声明]

### §13.2 spring 物理倾向
[damping / stiffness 建议范围;若不用 spring 声明 linear / ease only]

### §13.3 stagger 倾向
[from / strength / staggerChildren 建议值]

### §13.4 入场动效大类
[fade / fade+y / fade+scale / 字符级 reveal / 其他]

### §13.5 微交互密度
- `none`(无 hover / 无 micro-interactions)
- `card-only`(仅卡片 hover)
- `card + decoration`(卡片 hover + 装饰元素反应)
- `dense`(卡片 + 装饰 + 数字 + label 都有微交互)

### §13.6 装饰点缀微动(类型 + 周期)
[蝶舞 / 闪光 / 呼吸 / scan 等 + cycle duration]

### §13.7 motion-plus 组件适配清单(本风格用哪些)
- AnimateNumber ✓ / ScrambleText / Typewriter / Ticker / splitText(对每个明确 yes / no + 用在哪)

## §14 点缀密度倾向

### §14.1 章节内点缀密度
- max [N] 类点缀 / 章节
- 优先点缀清单(从 ~25 个全清单中本风格选):[列 8-12 个]

### §14.2 archetype × 点缀映射(本风格)
[继承 PATTERN §14 通用映射 + 本风格特殊偏好]

---

# 模式层(归还后新)

## §15 Treatment 偏好(per archetype)

| Archetype | 优先 Treatment | 少用 Treatment |
|---|---|---|
| Hero Monolith |  |  |
| Time Series |  |  |
| ... |  |  |

## §16 Dominant move 偏好

- **主用**(1-2):[]
- **避用**:[]

## §17 Layout 风格化倾向

- 对称 / 非对称 (倾向 + ratio)
- 单列 / 多列(主用 + 何时切换)
- margin 节奏(具体数值倾向)
- 留白比例([N]% viewport)
- column rule(用 / 不用)
- 长图 / 单屏(long_scroll: true/false)

## §18 章节顺序倾向

- 偏前 archetype: [...]
- 偏后 archetype: [...]
- 必出 / 必不出 archetype: [...]

## §19 点缀位置规则

- 章节标题区:[哪些点缀放这里 + 几何位置]
- 数据周围:[同上]
- 文段内:[同上]
- 章节边缘:[同上]

## §20 章节内层级关系

- Hero 内部主从:[本风格如何定义 + ground-truth evidence]
- 章节内主从:[同上]

## §21 密度倾向(声明本风格在 PATTERN 密度三态里的主导)

- dense / medium / spacious 之一主导
- 偏好的密度切换 cadence

---

# §22 工具库本风格选型(3 库收敛)

## §22.1 shadcn 组件本风格用清单
[列出本风格用哪些 shadcn 核心 + 辅助组件,排除哪些]

## §22.2 Motion API 本风格用清单
[whileInView + AnimateNumber + 本风格特定 motion-plus 组件清单]

## §22.3 paper-shaders 本风格选型(主 + 辅 + 避用)
- **主**: [shader 名]
- **辅**: [shader 名]
- **避**: [其他风格用的 shader]

---

# §23 不会撞清单(差异化声明)

与已落地的其他 ≥ 2 个风格各对照,本风格独占 / 不可混淆的维度(至少 3 维不同):

| 维度 | 本风格 | vs [其他风格 1] | vs [其他风格 2] |
|---|---|---|---|
| 主 shader |  |  |  |
| Hero 锚形态 |  |  |  |
| 字体方向 |  |  |  |
| 卡片视觉 |  |  |  |
| 动效语言 |  |  |  |
| layout 倾向 |  |  |  |
| 优先点缀 |  |  |  |

---

# §24 给 Chris 的 review gate

1. ground-truth 图认证 — [关键校准点 1-3]
2. 数值 token — [关键 OKLCH 值 / spacing / radius]
3. 字体方向 — [serif vs Grotesk / weight / language]
4. shader 选型 — [paper-shaders 主选 + 参数]
5. 点缀清单 — [本风格选的 8-12 个]
6. mode 字段 — [dark / light / chromatic 确认]
7. 不会撞清单 — [§23 验证]

决策点确认后我起 Cowork→CC 组装 CC-Prompt(以 v0.4.3 为模板,只换 STYLE 段;加 mode 触发器若 light;加 chromatic_background 若 chromatic)。预计 1 turn 产出 Design Prompt v2。
```

---

## §2 PATTERN 应保留(瘦身后清单)

跨所有 STYLE 共享、绝不替换的核心:

1. **信息层级骨架**:Hero 主指标 + N 章节(数据决定数量)+ **可选 Outro**(Round-58 改"数据驱动 optional")
2. **archetype 命名 + 数据 → archetype 映射规则**(§11/§14)
3. **AnimateNumber `{displayValue || 0}` 机制 + reduced-motion + 离屏暂停**(§6 通用)
4. **shadcn 导入 + 红线 + sandbox 禁令**(§17 通用 API + 红线 #1)
5. **Slop Taxonomy Part A/B 通用规则**(`_Framework/Slop Taxonomy...md`)
6. **Composition rhythm 通用结构**(§12):
   - 密度三态(dense / medium / spacious)
   - 相邻不可同 archetype / 同 treatment
   - bold-move budget(disruptive ≤ ceil(section × 0.25))
   - break cadence(至少 1 个 break section)
   - **但允许 STYLE 在 spec 中声明"本风格的密度倾向"**
7. **Voice & Copy** 通用规则(§10):curator's wall text · 第三人称 · no CTA · no marketing verbs

---

## §3 关键机制(本 schema 新引入)

### §3.1 `mode: light/dark/chromatic` 触发器
PATTERN v1 中的"禁白色蒙层 / skeleton"等假设默认 dark 的规则,在 STYLE spec v2 用 mode-触发条件覆盖:
- `mode: dark` — 沿用 v1 PATTERN 规则全部
- `mode: light` — 白色蒙层 / skeleton 允许;反转 vignette / 结构光强度;chart-1~5 OKLCH 值需 L 倒推(L 倒到 0.55-0.75 range)
- `mode: chromatic` — 全幅 chromatic background;前景仍用 foreground token(白 / 金);禁纯 black / white token 用饱和度过低

### §3.2 `chromatic_background` 字段(Festive 用)
e.g. `oklch(0.55 0.22 28)` 中国红。STYLE spec frontmatter 必填若 mode=chromatic。

### §3.3 `long_scroll: true/false` 字段(Festive 用)
- `true` — 允许长图 scroll 2-3× viewport;章节叠卡片堆而非平铺
- `false` — 单屏 / 分章节平铺(其他 6 风格默认)

### §3.4 Slop Taxonomy per-style exception
Festive 等结构性反向风格需在 Slop Taxonomy 加 per-style exception 章节(允许重描边 / 重阴影 / 高饱和 / 口号重复)。**本 v2.0 暂不实现**,等 Festive 实做时再设计。

---

## §4 起 STYLE spec v2 的工作流

1. 复制 §1 模板段 → 落 `{风格}/{风格}-STYLE-spec-v2.md`
2. 按 frontmatter 填充 `mode` / `ground_truth_images` / `ground_truth_signature` / `brand_hue`
3. 原子层(§1-§7)— 基本沿用 v1,只调本风格特殊值
4. 分子层(§8-§14)— **重点填充**,所有视觉决策必须能在 ground-truth 图里找 evidence
5. 模式层(§15-§21)— 按 ground-truth + CC §3.3 矩阵填
6. §22 工具库收敛清单
7. §23 不会撞清单 — 与 ≥ 2 个已落地风格对照
8. §24 review gate — 给 Chris 拍板

---

## §5 已废 / 调整说明

- **本 v2.0 不再实现 light-mode 高级特性**:Tailwind `dark:` 前缀策略 / 自适应深浅模式切换 — defer 到框架 v3
- **本 v2.0 暂不实现 Festive Crimson Bigtype**:Round-60 Chris 收敛,等 3 风格 baseline 验证后再扩
- **本 v2.0 不引入 GSAP / R3F / drei / Lenis / tsparticles 等其他库**:Round-58 Chris 收敛,3 库限定 shadcn / Motion / paper-shaders

---

**Schema 起完**。Cowork 立即起:
- PATTERN v2 patch CC-Prompt(独立,可并发)
- Gold Executive Luxe STYLE spec v2(用本 schema 模板)
- Warm Restraint Tech STYLE spec v2(同上 + light mode)
- Swiss International Minimal STYLE spec v2(同上 + light mode)
