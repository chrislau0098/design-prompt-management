# CC-Prompt_v1.4-to-v1.5-patch

R-134 / Opus 4.8 写作 spec / 从 v1.4 写 v1.5

## 任务
Read v1.4(641 行),按下方 patch list 写 v1.5,目标 460-490 行(硬顶 500)。输出到 `prompts/vibe-view-campaign-report/default/v1.5.md`。

## 输入文件
- `prompts/vibe-view-campaign-report/default/v1.4.md`(641 行,基础)
- Warm 主题最新版本:用 glob 查 `prompts/vibe-view-campaign-report/warm-restraint-tech/*.md`,取最高版本号(用作 Hero / AnimateNumber 照搬源)
- 根目录 `DESIGN.md`(职能边界:仅约束样式,不约束数据/功能/外链)

## 决策点(LOCKED · Chris confirmed)
- DP1: impact 例外 ≤ 600,其他风格 ≤ 500
- DP2: 保留 18 节结构,节标题不动,只内部缩
- DP3: 完全照搬 Warm AnimateNumber,删 useReducedMotion / useInView / TABULAR 全局对象
- DP4: Mobile 单列,桌面灵活,长字符 >7 降一级 / >11 降两级,父容器 no horizontal scroll

## frontmatter(保持 v1.4 不变)
- id: General Restrained Default
- name: 通用战报主题
- style_name: 默认基座 · 可配置
- description: 完整保留 v1.4

## 逐节 patch list

### §1 Style Presets & Routing
- 删 `card_border fixed bordered` 字段。改:卡片靠面层与间距分隔,边线极少
- STYLE_PRESETS:editorial 的 shader Mesh → Grain;ceremonial 的 shader Mesh → Grain
- 软化"mandatory, not advisory":shader 随 mood 默认;明确视觉方向可覆盖
- 路由表 Mesh 频率同步降(editorial / ceremonial 行改 Grain)
- 净减 ~10 行

### §2 READ FIRST
- 保留小节标题
- 内部缩 50%,只留 LLM 必读 meta 1-2 句
- 净减 ~5 行

### §3 Foreground Role Discipline
- 保留小节标题
- 内容大缩:整段 450 字 → 2 行禁令
- 删 span / p 标签 CSS 工程约束 + selector 绑定描述
- 留:"正文走最高对比度 foreground;元信息可用次级"
- 净减 ~25 行

### §4 Typography Scale & Weight
- 字重:基线 ≤ 500;impact 例外 ≤ 600;其他风格(editorial/ceremonial/technical/warmth/festive/cool/restrained)≤ 500
- 删 extrabold / black / 700 / "bold" / "extrabold" 字面
- 字号上限(替换原表):
  - Hero Title: lg 88px / mobile 44px
  - Display Number: lg 140px / mobile 64px
  - Section Primary: lg 56px / mobile 40px
  - Section Secondary: lg 40px / mobile 24px
  - Body: lg 16-18 / mobile 14-16
  - Mobile ≈ desktop × 45-50%
- 删 Hero Display Number / Wrapper className HARD GATE 整段
- 长字符 className 改 design 语言:"长字符降级:>7 字降一级,>11 字降两级,父容器 no horizontal scroll"
- 删 `tracking-[-0.04em]` 紧字距 hint
- CJK 字重 ≤ 500
- 净减 ~25 行

### §5 Color System
- `--border-strong` 0.22α + L≈0.14 近黑 → 重命名 `--divider`,alpha ≤ 0.12
- 删 "Heavy / dark borders" 形容词
- `oklch(0 0 0 / 0.12)` 明示黑替 token
- 净减 ~8 行

### §6 Surface Tokens
- 微调,保留小节
- 净减 ~2 行

### §7 Motion Constraints
- 删 useReducedMotion per primitive 整段(`useReducedMotion()` 调用 / `prefers-reduced-motion` 工程描述)
- 保留时长 / 缓动 / scope 表
- 加一句:"reduced-motion 模式直接渲染最终静态文本"
- 删 `ring-2 size-6 size-11` 具体 className,改语义
- 净减 ~12 行

### §8 Imagery / §9 Composition Tone
- 微调,保留小节
- 净减 ~4 行

### §10 Hero Section Guard
- 保留小节标题
- 删 Don't "Hero MUST be CSS grid"
- 内部缩到 1-2 行(留意图层级约束 + Hero 段落角色)
- 净减 ~5 行

### §11 Component Vocabulary / §12 Page Anatomy
- 微调,保留小节
- 净减 ~4 行

### §13 Charts & Tooltip
- 删 tooltip hex map / Recharts implementation 整段
- 替:"mode-aware token-derived tooltip;深浅模式对应 ground / surface;alpha ≤ 0.12"
- 删 rgba(20,28,40,0.22) 等黑色明示数值
- 删 "Recharts defaults render solid #000"反诱导整句
- 净减 ~15 行

### §14 Anatomy
- 微调,保留小节
- 净减 ~2 行

### §14.1 Hero Composition — 重写
- Mobile(默认):单列垂直堆叠 eyebrow → title → lead → focal number block
- 桌面:title + lead 左侧堆叠;focal number block 右侧或下方;允许 lead 右侧次要 metadata 但不承载焦点
- Focal number + 单位 inline-flex baseline 同列
- 长字符规则:>7 字降一级,>11 字降两级
- 父容器 no horizontal scroll(绝对防御 overflow)
- 删 grid-template-columns: 1.15fr 1fr 强制 + container query + min-h-full 传递整段链
- 保留 R-133 V14-P0-A 的 inline parenthetical hint(via Tailwind min-h-full or CSS min-height: 100%)
- 净减 ~10 行

### §15 Data → Section Mapping
- 删数据起源 / Bitable schema 语义,改"按内容形态选择版式"
- `?heroimg=` URL mechanics 改"当用户提供 hero 图片时"
- `<img>` forbidden CSS filter HARD GATE 改"避免重滤镜"
- 删 Loading/Empty/Error 状态描述
- 全文清除 Bitable / URL query / 数据来源 references(包括 §1 / §11 / §17 等可能 leak 的位置)
- 净减 ~15 行

### §16 States
- 保留小节标题
- 内部缩冗余,留状态意图概述
- 净减 ~5 行

### §17 Hero Shader + AnimateNumber
- 保留小节标题
- 六段 Hero shader JSX 压缩成设计意图(每 archetype 一句 shader 选择,删完整 JSX)
- AnimateNumber 完全照搬 Warm:
  - 用 glob 找 Warm latest .md,grep AnimateNumber 段落
  - 复制其 React skeleton(parseDisplayValue + inline-flex items-baseline + tabular-figure)
  - 删 useReducedMotion / useInView / TABULAR 全局对象
  - 加一句:"reduced-motion 模式直接渲染最终静态文本"
- 删 component mapping className 长串,压成 5 行 anatomy 表(只列 element + 角色,不写 className)
- 删 top-level hooks / typed props 段
- 净减 ~40 行

### §18 Forbidden
- 保留小节标题
- framer-motion HARD GATE 缩成单行禁令
- 删 Forbidden dial combinations + auto-fallback
- 净减 ~8 行

## 行数预算
v1.4 641 → v1.5 target 460-490(净减 ~150-180 行)
硬顶 500 行

## 工程红线(MEMORY · 严格遵守)
- 0 React snippet / JSX example(唯一例外:§17 AnimateNumber 必须照搬 Warm,保留 minimum React skeleton)
- 0 完整 className 串 / hex 颜色 / rgba 数值(token 名 OK,dial 表内允许 OKLCH 数值)
- 0 import / pnpm / 包名(framer-motion 仅 §18 forbidden 一行禁令)
- 0 emoji checklist(✅❌🔥💡)
- 0 metadata(Source / Last updated / Inspired by / Date)
- 0 framework lock-in(Tailwind 是 baseline,可保留 Tailwind class name hint)
- 不引功能 / 数据来源 / 外链 / URL query 机制(替"根据用户要求判断"等引导语)

## 写作约束
- 严格 18 节结构,节标题不动
- 总长硬顶 500 行
- 每字必有效约束;禁理由解释 / 历史叙事 / 教学材料 / 重复 / 装饰
- impeccable 借鉴:Ceiling-as-sentence(一句封顶 + 一句违约后果)、Match-and-refuse(禁令孤立成行)、表格替段落

## 完成验证(写完自检 + 报告)
1. 行数 ≤ 500
2. 18 节结构完整(`grep -c "^## " v1.5.md` ≥ 18 主节,或同等小节计数)
3. frontmatter id / name / description / style_name 保持 v1.4
4. Mesh 频率:editorial / ceremonial 段不出现 Mesh shader 引用
5. 黑边诱导清零:`grep -iE "(Heavy.*border|dark border|card_border fixed bordered)" v1.5.md` = 0
6. Bitable 提及:`grep -c "Bitable" v1.5.md` = 0
7. URL query 机制描述:`grep -E "\?(style|color|named|heroimg|hero)=" v1.5.md` = 0
8. extrabold / font-black / bold 字面:`grep -iE "(extrabold|font-black|\\bbold\\b)" v1.5.md` = 0(weight 角色名"bold"出现在 motion 段如"emphatically bold motion"可允许;字体粗细字面禁)
9. 字号上限:Display ≤ 140 / Hero Title ≤ 88 / Section Primary ≤ 56 / Secondary ≤ 40
10. AnimateNumber:照搬 Warm,删 useReducedMotion / useInView / TABULAR
11. min-h-full 传递链:删除原 §14.1 长段,仅保留 R-133 V14-P0-A inline parenthetical
12. Foreground Role Discipline(§3):整段缩 ≤ 5 行

## Cowork 综合 review 参考
完整 scope review 见:`handoffs/CC-Cowork_v1.5-scope-review.md`

## 写完报告
写完 v1.5.md 后,简短回报 ≤ 300 字:
- 实际行数
- 18 节是否完整(列出每节起止行号)
- 完成验证 1-12 通过情况逐项
- 不通过项的具体行号 + 原因
