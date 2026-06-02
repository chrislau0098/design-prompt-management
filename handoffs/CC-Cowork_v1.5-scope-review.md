# CC-Cowork_v1.5-scope-review

R-134 / 双路 review 综合 / v1.5 patch plan

## 背景

R-11 doubao 测试跑完后 Chris 提 8 个问题：prompt review 3 + 实测 4 + 总诉求 1。派 Codex Reviewer + Opus 4.7 Reviewer 并行 review v1.4 (641 行) + Warm 主题 + DESIGN.md + impeccable 项目，各自 ≤ 600 字 report 综合如下。

## 两路 review 共识

- 字号字重大降：Display ≤ 140 / 64，Hero Title ≤ 88 / 44，Section ≤ 56 / 40 / 24，字重 ≤ 500
- Mesh → Grain：editorial / ceremonial 改 Grain shader（Mesh 频率 STYLE_PRESETS 4 次 + 路由表 5 次 + 注释，过频）
- §3 Foreground role discipline 工程级 CSS 约束（span / p 标签）整段删
- §14.1 Hero 改 vertical stack（所有断点不分列），不再 left-right grid
- §17 AnimateNumber 照搬 Warm 主题，删 useReducedMotion / useInView / TABULAR 全局对象
- §2 "READ FIRST" meta-instruction 删
- §10 Hero CSS grid 强制删
- §14.1 grid HARD GATE 280 字段删
- §17 React snippet 六段 → 设计意图描述
- 18 节 → 13 节（§16+§18 合 States & Constraints，§14+§15+§10 合 Anatomy & Mapping）
- 黑边诱导表达全删（L12 / L82 / L115 / L233-239 / L611）
- Bitable / URL query / 数据来源等功能层描述全删
- impeccable 借鉴：Ceiling-as-sentence（一句封顶+一句违约后果）/ Match-and-refuse（禁令孤立成行）/ 表格替段落

## V1.5 Patch List（逐节）

### §1 Style Presets & Routing（L8-50）
- L12 `card_border fixed bordered` 改"卡片靠面层+间距分隔，边线极少"
- L18-23 STYLE_PRESETS：editorial Mesh → Grain，ceremonial Mesh → Grain
- L25 "mandatory, not advisory" 软化"shader 随 mood 默认，明确视觉方向可覆盖"
- L29 §2 "READ FIRST" 整段删
- L36-41 路由表同步降 Mesh 频率
- 净减 ~15 行

### §3 Foreground Role Discipline（L100-130）→ 整段删
- L106-130（450 字 span vs p 监督）REMOVE
- 替 2 行禁令："正文走最高对比度 foreground；元信息可用次级。卡片无可见边；分割用低 alpha 细线"
- 净减 ~25 行

### §4 Typography Scale & Weight（L160-200）
- 字重表全部 ≤ 500，删 extrabold / black / 700。**DP1 决策**
- 字号表替换：Hero Title 88/44，Display 140/64，Section P 56/40，Section S 40/24，Mobile ≈ desktop × 45-50%
- L189-195 Hero Display Number / Wrapper className HARD GATE REMOVE
- L195 length-based className 改 design 语言："长字符降级：>7 字降一级，>11 字降两级，父容器 no horizontal scroll"
- 删 `tracking-[-0.04em]` 紧字距 hint
- 系统不出现 "bold" / "extrabold" 词
- 净减 ~30 行

### §5-6 Color System（L60-100）
- L82 `--border-strong` 0.22α + L=0.14 近黑 → 重命名 `--divider`，alpha ≤ 0.12
- L115 "Heavy / dark borders" 形容词删
- L239 `oklch(0 0 0 / 0.12)` 明示黑替 token
- 净减 ~10 行

### §7 Motion Constraints（L260-310）
- L269-283 useReducedMotion per primitive 删
- 保留时长 / 缓动 / scope 表，加一句 "reduced-motion 直接渲染最终静态文本"
- L304 `ring-2 size-6 size-11` 改语义
- 净减 ~15 行

### §10 Hero Section Guard（L340-360）→ merge into §14
- L343 Don't "Hero MUST be CSS grid" REMOVE
- 净减 ~3 行

### §13 Charts / Tooltip（L430-460）
- L439-454 tooltip hex map / Recharts implementation 删
- 替 "mode-aware token-derived tooltip，深浅模式对应 ground / surface，alpha ≤ 0.12"
- L445-446 rgba(20,28,40,0.22) 黑色诱导删
- L607 "Recharts defaults render solid #000" 整句删
- 净减 ~15 行

### §14.1 Hero Composition（L455-480）— 重写
- 单列垂直堆叠：eyebrow → title → lead → focal number block
- 所有断点不分列（**DP4 决策**）
- Focal number + 单位 inline-flex baseline 同列
- 长字符规则：>7 字降一级，>11 字降两级
- 父容器 no horizontal scroll
- 可选 metadata 在 focal block 下方但不承载焦点
- 删 grid-template-columns: 1.15fr 1fr / container query / min-h-full 传递链
- 净减 ~15 行

### §15 → 合 §14（Anatomy & Mapping）
- L489-504 Data → Section Mapping：删数据起源（Bitable），改"按内容形态选择版式"
- L508 `?heroimg=` URL mechanics 改"当用户提供 hero 图片时"
- L510 `<img>` forbidden CSS filter HARD GATE 改"避免重滤镜"
- L53 / L287 / L582 / L317 Bitable schema 语义全删
- 净减 ~15 行

### §16+§18 合并（States & Constraints）
- L527-531 Loading/Empty/Error 状态描述删
- L639-641 Forbidden dial combinations + auto-fallback 删
- 留 forbidden imports 一行禁令（framer-motion 仍 HARD，缩成单行）
- 净减 ~12 行

### §17 Hero Shader + AnimateNumber（L545-625）
- L548-578 六段 Hero shader JSX 压缩成设计意图（每 archetype 一句 shader 选择）
- L580-603 AnimateNumber 照搬 Warm（**DP3 决策**）
- L609-633 component mapping className 压成 5 行 anatomy 表
- L637 top-level hooks / typed props 删
- 净减 ~50 行

## 行数预算（保守版）
v1.4: 641 → v1.5 target: 460-490（净减 ~150-180 行）

## 节数（Chris DP2 决策：保留 18 节，避免 LLM anchor regression）
18 节结构不动，节标题保留，内部缩内容。

## 关键决策点（Chris confirm — LOCKED）

**DP1 · impact 风格字重例外** → **B) impact 例外 600，其他 ≤ 500**
- 删 extrabold / black / 700
- impact 风格允许 600（保留 brutalist 高对比表达）
- 其他风格（editorial / ceremonial / technical / warmth / festive / cool）字重 ≤ 500
- 系统不出现 "bold" / "extrabold" 词
- CJK 字重 ≤ 500

**DP2 · 节数合并** → **C) 保留 18 节，只内部缩**
- 节标题不动（避免 LLM anchor regression）
- 各节内部内容大缩（§3 / §17 削减幅度最大）
- 无小节合并 / 无段落顺序变动

**DP3 · AnimateNumber 照搬** → **A) 完全照搬 Warm React skeleton**
- 保留 parseDisplayValue + inline-flex items-baseline + tabular-figure
- 删 useReducedMotion / useInView / TABULAR 全局对象
- 减少功能层依赖，保 design / typography 控制

**DP4 · Hero vertical stack** → **B) Mobile 单列，桌面灵活**
- Mobile 强制单列垂直堆叠（eyebrow → title → lead → focal number）
- 桌面：title + lead 左侧堆叠，focal number block 右侧或下方均可
- 长字符规则：>7 字降一级，>11 字降两级
- 父容器 no horizontal scroll（绝对防御 overflow）
- focal number + 单位 inline-flex baseline 同列

## Carry-forward backlog
- §15 `hero_image_url` dial reference transport-agnostic 重写（R-9/R-130/R-133 累积）
- R-132 routing test：模拟 Main Agent + 注入 7 description blob + 测路由准确率
- AGENT-R10-1 工程 utility bundle：OKLab/OKLCH convert / lucide icon dictionary / no-module-scope-hooks lint

## 下一步
Chris confirm DP1-DP4 → Cowork 写 CC-Prompt_v1.4-to-v1.5-patch.md → 派 Opus 4.8 写 v1.5 → Codex final review → commit
