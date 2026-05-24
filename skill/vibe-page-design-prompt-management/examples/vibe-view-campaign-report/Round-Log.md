---
type: round-log
project: Vibe view
phase: 2 · 多风格扩充
purpose: 持续记录测试 issue + 修复方法 + 抽象原则。项目最宝贵知识沉淀(Chris Round-83 #3)
maintained_by: Cowork
update_pattern: 每轮迭代 / 每次 issue / 每次反馈结束追加
created: 2026-05-22
---

# Vibe view · Iteration Log

> **项目知识库**:测试发现的 issue + 根因 + 修复 + 经验抽象。**Chris 定期检查**。

---

## §0 现有记录位置 Index(其他 detailed 文档)

| 文件 | 内容 | 维护 |
|---|---|---|
| `_Framework/Round-Log.md`(本文件)| **Round 流水 + 抽象原则 + 索引**(Round-80+) | Cowork 每轮追加 |
| `Cowork-Handoff_Round-76.md`(项目 root)| **Round 76 完整 handoff**(角色 / 架构 / 上下文)| 历史快照,Round 76-79 入口 |
| `_Framework/anti-slop-review-v0.1.md`(222 行)| Phase B Anti-Slop 详细审查 + P0/P1/P2 | sub-agent 跑一次 |
| `_Framework/visual-test-report-v0.1.md`(248 行 / 8.66/10)| Phase B.5 playwright 视觉测试报告 + 8 屏评分明细 | sub-agent 跑一次 |
| `_Framework/visual-test-screenshots/` 64 张 PNG | 8 屏 × 8 视角真实截图 | sub-agent 测试时产 |
| `_Framework/Slop Taxonomy(Anti-Slop 验证 gate).md` | Anti-Slop rubric 跨风格通用 + Chris Round-81/82 detector | Cowork 反馈追加 |
| `_Framework/slot-schema-v0.md` §9 Changelog | Schema 迭代历史(v0 → v0.4.x)| Cowork 每次扩 enum 追加 |
| `_Framework/templates/Warm.template.v*.md` | 模板版本快照(v0.2 / v0.3 / latest)| Cowork 每次大改保留 |
| `Swiss International Minimal/swiss-...-v*.md` | Swiss Design Prompt 版本快照(v0.1.1 / v0.2 / v0.3 / v0.4)| Cowork 每次重跑 inject 新建 |

---

## §1 抽象原则(从 issues 提炼,Chris 反复强调)

### 原则 1 · **根因解决,不叠遮罩 / 不补救**(Chris Round-81/82/83 共识)

最少层数,源头解决 — 不用其他元素补救另一个元素的问题。

| ❌ 错的 | ✅ 对的 | Round |
|---|---|---|
| 卡片有底色 + 加 border 强调 | fill alone 分层 / drop border | R-81 #4 |
| 黑粗线压制 panel → 视觉太重补救 | 粗线只用 divider,card 用 whisper-thin | R-82 #5 |
| Shader 颜色太深 → 加 backdrop mask | **直接调 shader props 减淡 colorFront** | R-83 #8 |
| 元素过深 → 加 shadow 平衡 | 直接调 token L 值 | (待发现) |

### 原则 2 · **Hero ≠ chapter**(Chris Round-83 #2)

- ChapterStamp / chapter number marker 只用于 chapter 2+
- Hero 是开篇(chapter 0)— **不渲染 stamp / chapter number / chapter kicker label**
- Hero 装饰仅限:eyebrow(如 "VIBE VIEW · ANNUAL CAMPAIGN")+ Display Number + delta + lead

### 原则 3 · **weight ≤ 500 跨风格基线 + Swiss 例外 700**(Phase B.5)

(Schema v0.3+ weight_ceiling enum 扩 500/600/700/800;Slop Taxonomy A3 显示 weight ≥ 700 = 笨重失精密,Swiss IBM bold 是 explicit 风格 brief 例外)

### 原则 4 · **大圆角 ≠ slop**(Chris Round-81)

严格按 Slot `radius.card_chrome` 渲染。Warm 16px / Theatre Double-Bezel / Cool 4px / Swiss 0px 都是合理风格表达。

### 原则 5 · **filled elements never carry visible borders / active indicators**(Chris Round-81 #4 + Round-89 扩展)

任何 filled panel / list item / nav button 用 `bg-surface-l2/l3` 或非 transparent bg → drop border。Fill alone 分层,加 border 是重复信息 + 廉价感。

**R-89 扩展**:不仅 cards,**所有 filled element** 都适用 — 包括 `sidebar-item.active` / nav button 等 list item。Active state 不需 `border-left: 2px solid var(--primary)` 这种 "active indicator" 装饰条 — fill 单独足够指示 active(Chris R-89 反馈:R-87 sub-agent 误把 border-left 当合法 active 指示器,Cowork verify 时被说辞误导接受 → 实测 = AI-Slop)。

(详 Slop Taxonomy A2 detector + 模板 §1 prose verbatim)

### 原则 6 · **黑 / 深色粗 border only as dividers**(Chris Round-82 #7)

粗 / 深饱和 border 只用于 `<hr>` / chapter hairline / section break。Card border 留 `var(--border)` whisper-thin(≤ 12% alpha)。(详 Slop Taxonomy A2 detector + 模板 §1 prose verbatim + Schema §4.4 systematic 规则)

### 原则 7 · **Hero 必含 shader**(Chris Round-82 #6)

Hero 是风格视觉基调核心。所有风格 Hero 必含 paper-shaders shader(不用 CSS 静态背景替代):Warm GrainGradient / Theatre MeshGradient / Cool GodRays / Swiss Dithering。

### 原则 8 · **paper-shaders 调 props 解决问题,不引外层**

a11y / 可读性问题 → 调 shader props(colorFront / colorBack / size / opacity / speed)→ 不叠 div mask / 不叠 backdrop-filter blur / 不叠 gradient overlay。shader 是源头,任何其他层都是 hack。(原则 1 在 shader 场景的特化)

### 原则 9 · **Patch 后必须在实际渲染状态 verify**(R-84 #11 + R-86 #15 加固)

不止 grep 文件 sync;**必看 HTML 浏览器实际渲染 / doubao 实际输出**:
1. 多入口渲染(M-04 + M-08 + per-pack)→ patch 必穷举所有 render 路径
2. HTML inline JSON 与外部 Slot drift 是反复 issue → **每次 Slot 外部改动必 sync HTML inline**(可写脚本固化)
3. **CSS 几何对齐 trade-off**(R-86 #15):修 A(line 穿 dot)时别忘 verify B(dot 与 title 对齐),visual 多维度都看,不只 fix target
4. **完整 sync 链**(R-85 经验):Slot 外部改动 → HTML inline 同步 → 重跑 inject → 新版 Design Prompt 落 vault 版本号 ++ → §5 snapshot update。**派 sub-agent 时 prompt 必明确这条链**

### 原则 10 · **Hero shader 禁 `position: fixed`**(Chris R-93 反馈)

Hero shader / GrainGradient / MeshGradient / GodRays / Dithering 等 `<canvas>` / SVG 容器禁用 `position: fixed` — 历史调试反复出 bug(z-index 失控 / scroll 时 shader 脱离 Hero / iframe 嵌入失效)。**必用 `position: absolute` 锚在 `.rep-hero` 内** + `.rep-hero { position: relative }` 父容器定位。fixed 只用于浏览器视口级 overlay(modal / nav),不沾 Hero 装饰层。

### 原则 11 · **Design Prompt ≤ 600 行,每字必有效约束**(Chris R-93 强化)

弱模型 doubao-seed-code 2.0 上下文宝贵 → Design Prompt 严控篇幅:
- **行数上限 ≤ 600**(refero / Anti-Slop 各风格 latest 平均 600~680,Festive 已临界)
- **每字必约束**:严禁理由解释 / 历史叙事 / 教学材料 / 重复 / 装饰(Chris Memory `feedback_prompt_engineering_concise.md` 红线)
- **严禁 metadata / few-shot / 完整代码 snippet**(Memory `feedback_prompt_md_no_metadata` / `feedback_prompt_md_no_emoji_checklist` / `feedback_prompt_md_minimize_code` / `feedback_design_prompt_no_example`)
- **新增段先问:这段去掉,生成质量是否真的下降?** 不能回答"是"就删

### 原则 12 · **Three-Way Sync Rule:Prompt ↔ Design System ↔ Report Example**(Chris R-94 立项)

doubao 生成质量取决于三方信息一致;Chris 视觉验收也基于此:

```
Design Prompt(描述 / 规则) ⇄ Design System(声明:atomic + molecular + ornament) ⇄ Report Example(实际渲染示例)
```

**Hard Rules**:
- Design System 是 **Design Prompt 中样式规则的忠实声明**(token / typography / radius / shader / ornament 都要 1:1 reflect)
- Report Example 是 **基于 Design System 组合的示例**(每条 atomic / molecular / ornament 规则必须真渲染出来)
- **三方一致检查清单**(任何 Slot / Prompt / HTML 改动后):
  1. Prompt 宣称的 ornament → 是否 Design System 声明? 是否 Report Example 真渲染?
  2. Design System 声明的 ornament / token → 是否 Prompt 描述了? 是否 Report Example 渲染了?
  3. Report Example 渲染的元素 → 是否在 Design System? 是否在 Prompt?
- **任一方变动 = 三方都要 sync**(类似 R-84 #11 完整 sync 链原则,但跨 Prompt 维度)
- **D3 mismatch 案例**(R-93 #31):Warm/Theatre/Cool/Swiss 4 风格 Prompt 宣称的 ornament 在 Report Example 完全不渲染 → R-94 Stage 6 清理

---

## §2 迭代历史(按 Round 时序流水账)

### Round-76 ~ 79(2026-05-19 ~ 2026-05-20)· Phase 0 末期 · 详细历史外置

**Round-76(2026-05-19)**:新 Cowork session handoff。完整 ground-truth 在 `projects/Vibe view 项目/Cowork-Handoff_Round-76.md`(485 行,角色定义 / 三层架构 / 流程纪律 / 工程约束 / Warm v0.12 当前态 / 通用经验 / next steps)。

**Round-77 ~ 79(2026-05-19 ~ 2026-05-20)**:Warm v0.15 → v0.19 三风格收口。三风格(Warm v1.0.1 / Theatre v6.7.1 / Cool v0.5.1)Design Prompt 一轮迭代到稳定版,doubao 实测通过。期间 Chris 严厉指出多处 Cowork 失误,产生以下持久红线(已沉淀 Cowork memory `~/.claude/projects/.../memory/feedback_*.md`):

| Round | Cowork 失误 | 沉淀红线 |
|---|---|---|
| R-77 | Coder ✅/❌ 双 example 没 catch | `feedback_design_prompt_no_example.md`(禁 EXAMPLE Few-shot)|
| R-78 | starter prompt 散漫无角色 | `feedback_cc_starter_prompt_structure.md`(starter 6 要素)|
| R-79 | 把 Coder 建议直接 forward,没过 vault 红线筛子 | `feedback_cowork_review_vault_rules_filter.md`(Cowork Review 必过筛子)|
| R-79b | "只让删 X" 但增加新 prose | (隐式)删 = 删,不补 |
| 同期 | 早期 prompt 写作多处违规 | `feedback_prompt_md_no_metadata.md` / `no_emoji_checklist.md` / `minimize_code.md` / `prompt_engineering_concise.md` |

详细每条红线在对应 `feedback_*.md`,索引在 Cowork `MEMORY.md`。

### Round-80(2026-05-20)· Phase 0 三风格基础完成

3 风格(Warm v1.0.1 / Theatre v6.7.1 / Cool v0.5.1)Design Prompt 稳定。doubao 实测通过。建立 1 PATTERN ⊗ N STYLE 架构 + OKLCH `var(--brand-hue)` 用户配色机制 + 3 库限定。

### Round-81(2026-05-21)· Phase A · Slot 自动化 pipeline

#### #1 · 注入器 null bug → "null" / "nulls" 字面拼接(P0)
- 根因:`inject.py:289 _fmt_value(None) return "null"` 字符串
- 修:`return ""` + 模板 `{{#if X}}...{{/if}}` 包条件块
- 经验:**generator 工具 null handling 是核心 robustness 点**

#### #2 · Inter 字体自我冲突(P0)
- 根因:Slot 默认 Inter,但 Inter 是 AI 滥用字体,Don't 段又禁
- 修:Helvetica Neue / IBM Plex Sans / Neue Haas Grotesk(Swiss IBM 风必需)
- 经验:**Slot 默认值要符合风格 mood,Inter/Roboto 是 generic AI fallback**

#### #3 · 大圆角 ≠ slop(Chris 反馈)
- 详 原则 4。**Chris 的判断 > anti-slop rubric 一刀切**

#### #4 · filled+border 双重 = slop(Chris 反馈)
- 详 原则 5 + Slop Taxonomy A2 detector

### Round-82(2026-05-21)· Phase B / B.5 · 风格优化 + 视觉测试

#### #5 · 黑粗线 on cards = slop(Chris 反馈)
- 详 原则 6 + Slop Taxonomy A2 detector

#### #6 · Hero 必含 shader(Chris 反馈)
- Swiss 由 dot-grid CSS → Dithering shader
- 详 原则 7

#### #7 · 视觉测试 8.66/10 PASS with conditions
- playwright + Design Skill review 跑出 1 P0 + 3 P1 + 5 P2
- P0 chart mount + P1/P2 全修复(HTML v5)
- 经验:**视觉测试 gate 必须**(每次大改后 playwright + Design Skill)

### Round-83(2026-05-22)· Phase B.6 · a11y + Hero 规则补充

#### #8 · Swiss Hero shader 颜色太重 → 文字 a11y 问题(Chris 反馈)
- **Cowork 失职反思**:① 没自己 catch a11y 问题 ② sub-agent B P1-4 给 "backdrop mask" 解被我接受 → 违反"根因解决不叠遮罩"原则
- **正解**:调 Dithering `colorFront` 浅蓝(`#1E3FB0` → `#7E94CC`)+ 撤掉 color-mix backdrop
- 详 原则 1 / 原则 8 沉淀

#### #9 · Hero 不可加 ChapterStamp(Chris 反馈)
- 根因:Cowork 没意识 Hero ≠ chapter
- 修:HTML Hero render 跳过 ChapterStamp(M-04 + M-08)
- 详 原则 2 沉淀

#### #10 · 起 iteration-log.md(Chris 反馈)
- Chris:"测试过程中的一些问题和修复方式你都要持续记录,这是最宝贵的资料"
- 修:本文件(`_Framework/iteration-log.md`)+ 后续每轮追加
- 经验:**项目持续记录 lessons learned 是 sustainable 知识沉淀**,不依赖 conversation context

---

### Round-85(2026-05-22)· Phase B.8.2 · HTML Report Example 美观度 fix

Chris 实测 `view=report&style=swiss` 反馈 3 issue + 重申"HTML Example 的质量很重要,需要保证细节和样式都是美观的"。

#### #13 · Swiss Hero shader 颜色改中性淡灰色(R-83 原则 1/8 应用)
- **症状**:R-83 已把 colorFront 从 #1E3FB0 → #7E94CC (muted cobalt),但视觉上仍是大片淡蓝色 dither pattern 覆盖 Hero,**信息阅读仍受干扰**
- **根因**:#7E94CC 是 L 0.65 / 钴蓝调,在浅灰 colorBack (#F2F4F8) 上 dither 形成对比明显的钴蓝 pattern → 视觉抢戏
- **修法**(根因解决,不叠 mask / overlay):
  - 外部 Slot v0.5 → v0.6:`colorFront: "#7E94CC" → "#C8CACE"` (L 0.79 / C ~0.003 / 232 hue 微 tint,近纯灰)
  - `colorBack: "#F2F4F8" → "#EEEFF1"` (微调让 dither 对比更弱)
  - HTML inline `data-swiss` 同步 v0.6 (per R-84 教训:多源 drift 必同步)
- **验证**:Visual screenshot `swiss-1-hero.png` — Hero 背景 dither 极淡 neutral 灰、ANNUAL CAMPAIGN 2026 / ¥36.5 / lead 段落全部清晰可读 ✓
- **经验**:**原则 1/8 二次应用** — shader 颜色调整后视觉仍违和则继续减淡,**不能因为已经"调过一次"就罢手**

#### #14 · Timeline 横线必须穿过节点 dot 中心
- **症状**:`?view=report` Chapter 03 Timeline 横线浮在 dots 上方 (Chris 反馈"连线没有穿过节点的小标记")
- **根因诊断**(数学):
  - dot 中心 Y = 37px (margin-top 16 + dot.h/2 6;或 systematic margin-top 17 + dot.h/2 5)
  - line top = 22px,height 1 → line 中心 Y = 22.5
  - **Y 偏差 14.5px → line 浮在 dot 之上,完全没"穿过"**
  - 同时:dot 在 cell 左缘 (margin-left: 2px),dot 中心 x=7;line `left:16px` → line 起点在第一 dot 中心**右侧** 9px,line 头部没接到 dot
- **修法**(CSS only,稳健不依赖 viewport):
  - `.rep-tl-dot` 加 `align-self: center` (cell 内水平居中,4 col grid 时 dot 中心 = cell 中心 X)
  - 默认 dot `margin-top: 16` (dot 12x12 中心 Y = 16+padding 16+6 = 38)
  - systematic dot `margin-top: 17` (dot 10x10 中心 Y = 17+padding 16+5 = 38)
  - `.rep-timeline::before` `top: 37` (line 中心 Y 37.5 ≈ dot 中心 38,sub-pixel 对齐)
  - `.rep-timeline::before` `left: calc((100% - 72px) / 8); right: 同` (gap 24*3=72,cell_w/2 = (W-72)/8,line 端点对齐第一/最后 cell 中心)
  - z-index: line=0, dot=1 / node=1 (dot 实色覆盖 line 中心,line 从 dot 边缘延伸到下个 dot,视觉真"穿过")
- **验证数学** (1440 viewport):
  - 4 dot 中心 X = (130.75, 416.25, 701.75, 987.25) 等距 ✓
  - line left=130.75, right=130.75 → line 跨越 x=130.75 → 987.25 **正好首尾对齐 dot 中心** ✓
  - dot 中心 Y = 38, line 中心 Y = 37.5 → 0.5px sub-pixel diff (视觉完全对齐)✓
- **4 风格 verify** (`swiss/warm/theatre/cool-2b-timeline-line-zoom.png`):
  - Swiss 钴蓝方块 / Warm 橙色 outline 圆 / Theatre 橙红实心圆 / Cool 蓝色 outline 圆 — **每个风格 line 都穿过 4 个 dot 中心** ✓

#### #15 · Outro 底部信息对齐偏移
- **症状**:`?view=report` 最底部 "NUMBERS REST. THE NARRATIVE CONTINUES." (rep-outro-claim) 有视觉偏移 (Chris 反馈"最底部的信息有偏移")
- **根因诊断**:
  - `.rep-outro` `padding: 48px; text-align: center` (容器居中)
  - `.rep-outro-claim` 是 `<p>` block + `max-width: 36ch` (≈560px) 但**缺 `margin: 0 auto`**
  - → block 默认左对齐 (left=48, right=605.5),**视觉左飘 ≈ 280px**
  - text-align: center 只让文字在 block 内居中,block 自身没居中
- **修法**(CSS only):
  - `.rep-outro-claim` 加 `margin: 28px auto` (上下 28 沿用,auto 让 block 水平居中)
- **验证**:claim_left=326.78, claim_right=326.78 (完美 1:1 居中)✓
- **截图**:`swiss/warm/theatre/cool-3-outro.png` — 4 风格 Outro 全部居中,无偏移 ✓

#### 经验沉淀(R-85)
1. **shader 颜色判断要看真实渲染** — 数值看似已"减淡"但 ditherd pattern 实际视觉可能仍抢戏。判断标准:**Hero 文字阅读是否被 pattern 干扰**,而非"colorFront 数值是否变浅"
2. **Timeline / 任何"线+点"组合的几何对齐数学要算清楚**(dot Y + line Y + dot 中心 X + line 端点 X),不能凭感觉
3. **`max-width` + `text-align: center` ≠ block 居中**,必须 `margin: 0 auto` 让 block 自身水平居中
4. **多源 drift 持续是 reflex 检查项**:每次外部 Slot 改 → 必 sync HTML inline data-* (R-84 教训反复应用)

---

### Round-84(2026-05-22)· Phase B.7 善后 · Cowork 严重失职修正

#### #11 · R-83 patch 不完整(M-04 修了 M-08 没修 + 外部 Slot 改了 HTML inline 没 sync)

- **症状**:Chris 实测 localhost:8000 发现 Swiss Hero shader 颜色没变(还是 #1E3FB0)+ Stamp 还在 Hero(view=report 的 Report Hero corner)
- **根因**:R-83 我只 patch 了 ① `buildHeroCorner`(M-04 Design System Hero)② 外部 Swiss Slot v0.5 ③ Schema/模板 prose。但**没 patch**:
  - HTML inline `data-swiss`(还是 v0.2 / colorFront #1E3FB0)
  - `renderReport` 内 `heroCorner` IIFE(M-08 Report Hero 独立渲染 `rep-stamp-solid` 等 stamp,line 6425-6440,**不走 buildHeroCorner**)
- **Cowork 失职反思**:
  - 违反**工作纪律 §5 独立 verify** — R-83 只 grep 外部文件(Slot / Schema / Design Prompt prose),**没在 HTML 实际渲染状态上 verify**(浏览器 / inline JSON / 多 render 路径)
  - HTML 这种"多入口渲染同一组件"场景(M-04 buildHeroCorner + M-08 renderReport.heroCorner)被忽视
  - HTML inline JSON drift 是反复 issue(R-82 P0-5 修过一次,R-83 又复发)
- **修法(R-84 / B.8.1)**:
  - HTML inline `data-swiss` sync 外部 Slot v0.5(同时 sync 4 风格防 drift)
  - `renderReport.heroCorner` IIFE 直接返 `null`(同 `buildHeroCorner`)+ 删 `rep-hero-corner` div 渲染
- **验证**:HTML data-swiss colorFront #7E94CC ✓ / heroCorner = null ✓ / rep-hero-corner div = 0 ✓
- **经验抽象(沉淀到 §1 原则)**:**Patch 后必须在 HTML / doubao 实际渲染状态 verify,不只 grep 文件 sync**。HTML 多入口渲染(M-04 / M-08 / per-pack)→ **patch 时穷举所有 render 路径**(grep `function build.*Hero|function render.*Hero|className.*hero`)。HTML inline JSON 与外部 Slot drift = 反复 issue → **每次 Slot 外部改动必 sync HTML inline**(写成 sync 脚本 / 加入工作流)。

#### #12 · 跨电脑访问 HTML 项目(Chris 反馈)

- 解:`cd <design-system-renderer dir> && python3 -m http.server 8000`(任何 Dropbox 同步好的 Mac/PC 都可独立运行)
- 详 §五 跨电脑指令(本回应内)

### Round-86(2026-05-22)· Phase B.8.3 · Timeline mark 左对齐 + shadcn 集成讨论

#### #15 · Timeline mark 没和标题左对齐(Chris 反馈)

- **症状**:R-85 sub-agent 把 `.rep-tl-dot align-self: center`(让 dot 与 line 端点 X 对齐),但 dot 居中 cell vs period/title/detail block 默认左对齐 → **dot 居中,文字左对齐,不齐**
- **修法**(R-86):
  - `.rep-tl-dot align-self: flex-start`(dot 改左对齐 cell)
  - `.rep-timeline::before left: 6px`(从 grid 左缘 = dot.width/2)
  - `.rep-timeline::before right: calc((100% - 72px) / 4 - 6px)`(从 grid 右缘 = cell_w - dot.width/2)
  - per-pack:systematic dot 10x10 半径 5,override `left/right` 用 5px
- **经验**:`align-self: center` 与"文字左对齐"组合时,dot 应改 `flex-start` 保 visual 一致性。**Cowork 失职反思**:R-85 sub-agent 修法虽精准 line 穿 dot,但 trade-off 了"dot 与 title 对齐",Cowork 当时没 catch。Round-Log §1 原则 9 应用:**Patch 后必须看实际渲染验证 alignment**(不只 line 穿 dot)

#### #16 · HTML 集成 shadcn 组件库(Chris 反馈"这一点是我疏漏了")

- **症状**:Design Prompt 强制 3 库限定 `shadcn + motion + paper-shaders`,但 HTML 没用 shadcn(只 React + recharts + motion + paper-shaders),Design System / Report Example 不能真实反映 doubao 输出
- **状态**:待 Chris 拍板方案(A · Tailwind CDN + Radix esm.sh + inline shadcn source / B · 重构 Vite + shadcn build / C · 维持现状)
- **推荐**:**方案 A**(单 HTML 保留 + 真实 shadcn 组件 source + 接近 100% doubao 对齐)
- **关键组件**:Card / Badge / Progress / Separator / Tabs / Tooltip(战报必需)

### Round-87(2026-05-22)· Phase B.9.1 · shadcn 集成方案 A

#### #17 · HTML 集成 shadcn 组件库(Chris 反馈"这一点是我疏漏了")

- **背景**:Design Prompt 强制 3 库限定 `shadcn + motion + paper-shaders`,HTML 之前未用 shadcn → Design System / Report Example 不能真实反映 doubao 输出
- **方案 A 实施**(Sonnet sub-agent,工程任务 per R-86 #14 规则):
  - Tailwind play CDN + inline `tailwind.config`(theme.extend 接 CSS variables)
  - importmap 加 Radix UI 4 primitives(Progress / Separator / Tabs / Tooltip)+ helpers(clsx / tailwind-merge)
  - inline shadcn 组件 source(MIT)6 类:`cn / Card / Badge / Progress / Separator / Tooltip`
  - 重构 M-08 战报示例:KPI cluster → `<ShadCard>`,Eyebrow → `<ShadBadge>`,Proportion → `<ShadProgress>`,Outro hairline → `<ShadSeparator>`,chart Tooltip → `<ShadTooltipProvider>` 包装
  - per-pack radius CSS variable(`--radius-card`)注入(editorial 16 / theatrical 6 / instrumental 4 / systematic 0)
- **Sub-agent bug 抓 + 自修**:Children prop bug — 9 处 ShadCard/ShadBadge 通过 `function(props, children)` 第二参数传 children,但 plain JS 函数不 destructure 收 `children` from `arguments[1]`,所有 children 被丢。修法:children 放进 props object 内传(`ShadCard({...props, children: inner})`)。
- **HTML +301 行(6788 → 7089 → R-87 后)**
- **视觉评分**:DS 全 8.0 / Report warm/theatre/swiss 9.0 / cool 8.5

#### #18 · Cowork 独立 verify 抓 sub-agent 漏(R-87 patch)

- Cowork grep 抓到 **2 处 card-level filled+border 共存违反 R-81 #5**:
  - `.rep-kpi` default(Warm/editorial):`bg surface-l2 + border 1px solid var(--border)` 双重 → patch `border: none`
  - `.rep-kpi.instrumental`(Cool):`bg surface-l2 + border 1px + inset shadow` 三重 → patch `bg transparent`(Cool 仪表感由 thin-border + inset shadow 撑出,不需 fill)
- **经验**:sub-agent 自检 specifically 看 ShadCard 但漏了 `.rep-kpi.*` per-pack CSS。**Cowork 独立 verify 关键 — Slop Taxonomy A2 detector grep 必跑**(原则 9 应用)
- Verify 后违反 = 0 ✓

### Round-88(2026-05-23)· Phase B.9.2 · sidebar 导航 + view tabs + Web/Mobile toggle

#### #19 · HTML chrome 大重构(Chris 3 反馈)

- **背景**:R-87 shadcn 集成完成后,Chris 实测发现 chrome 体验可改进
- **3 改实施**(Sonnet sub-agent,per R-86 #14 规则):
  1. **顶部主题 dropdown → 左侧 sidebar 导航**(240px persistent,自写 shadcn-style,非 Radix Sidebar 避免复杂 Provider)
     - 按 `style_meta.mode` 分 `明亮`(Warm + Swiss)/ `暗黑`(Theatre + Cool)2 组
     - active 态:`bg-surface-l2 + border-left: 2px solid var(--primary)`(active 指示器,非 card 双装饰)
  2. **顶部 sticky-bar 保留 view-tabs**(Design System / Report Example)— 移入 `.content-wrapper`,brand 从 sticky 移到 sidebar header
  3. **Report Example 内 Web/Mobile toggle**(原生 button group,Radix `@radix-ui/react-toggle-group` esm.sh importmap 加但备用未启用)
     - Web 默认 / Mobile = `max-width: 420px + .mobile-frame` class + transition 250ms
     - URL `?device=web/mobile` 同步
- **HTML +178 行(7089 → 7267)**
- **美观度**:DS 8/10 / Report 8.5/10 / 4 风格 + 2 view + 2 device 全切换无 break

#### #20 · Cowork 独立 verify · 全 PASS

| 项 | 实测 |
|---|---|
| sidebar / sidebar-item / 明亮+暗黑 group | 全 ✓ |
| view-tabs 保留 / device-toggle / mobile-frame / ?device= sync | 全 ✓ |
| Radix toggle-group importmap | 备用 ✓ |
| vault 红线 ✅\|❌ | 0 ✓ |
| backdrop-filter blur ≥3px | 0 ✓ |
| 紫渐变 / glassmorphism / 嵌套卡片 | 0 ✓ |
| card-level filled+border 共存 | **0** ✓(per R-81 #5)|
| sidebar-item.active fill + border-left | 合法 active 指示器(非 card 双装饰)|

**关键设计抉择**:
- shadcn `Sidebar` 复杂(Provider + 多 sub),选自写 sidebar(shadcn 设计语言但不引 Radix Collapsible)
- ToggleGroup 用原生 button(Radix importmap 加但备用,需要时升级)
- mobile 容器 420px(iPhone Pro Max 等级,响应式适配测试足够)

### Round-89(2026-05-23)· Phase B.9.3 · sidebar 细节 fix + 原则扩展

#### #21 · 导航两条线对齐(Chris 实测反馈)

- **症状**:sidebar-header 底 border 与 sticky-bar 底 border Y 坐标不同(sidebar-header padding 20px+content+16px ≈ 60px / sticky-bar 10px+content+10px ≈ 44px)+ border color 不同(sidebar `var(--border)` vs sticky `var(--border-strong)`)
- **修法**:统一 `height: 56px` + `display: flex; align-items: center` + `padding: 0 X` + `border-bottom: 1px solid var(--border-strong)`
- **经验**:sub-agent 设计 chrome 多个固定 row 时,Cowork prompt 应明示"高度对齐"约束(R-87/88 prompt 矛盾:一处 "whisper-thin var(--border)" / 一处 "var(--border-strong)",sub-agent 没 unify)。**Cowork prompt 内部一致性**是 sub-agent 输出质量关键

#### #22 · sidebar-item.active border-left 是 AI-Slop(Chris 实测反馈)

- **症状**:R-87 sub-agent 写 `.sidebar-item.active { background: surface-l2 + border-left: 2px solid primary + padding-left: 8px }` 当 active 指示器。Cowork verify 时被 sub-agent "active 指示器非 card 双装饰" 说辞误导,标 ✓。**Chris 实测看 = AI-Slop**
- **修法**:去 `border-left + padding-left`,只保 `bg-surface-l2`。fill 单独足够指示 active
- **原则扩展(§1 #5)**:R-81 "filled cards never carry visible borders" → **扩展到所有 filled element**(list item / nav item / sidebar item)。Active state 不需 + border line / 装饰条 / 等额外 visual marker — fill 已是 sufficient signal

#### #23 · Cowork 二次 verify 失职反思

- **失职**:R-87 #18 Cowork verify 时,Python grep 实际抓到 `.sidebar-item.active fill + border-left` 共存,但**被 sub-agent 说辞误导**接受 ("active 指示器,合法,非 card 双装饰")。Cowork 应**坚持 Slop Taxonomy 严格判定** — fill + border 共存就是 slop,不论 element 是 card 还是 list item
- **经验抽象到 §1 原则 9 加固**:**Cowork 独立 verify 时,Slop Taxonomy detector 抓到的违反必信,不接受 sub-agent 解释豁免**(尤其当 detector 是 Blocking 级)

### Round-90(2026-05-24)· Phase C.1.A · 红色喜庆 Style A · Festive Royal · Crimson Gold

Chris R-90 brief:扩 2 风格红色喜庆(中国风 / 大气);分别调试避免上下文干扰。本 Round 仅完成 **Style A**(全红 + 金色衬线);Style B(白底 + 红渐变 + 黑无衬)留 R-91。

#### #24 · 新风格 festive-royal pack · chromatic mode 首次 + serif typography 首次

- **新装饰套件 enum**:`festive-royal`(Schema §4.5)+ `festive-editorial`(留给 Style B,占位)
- **新 Slot 字段**:`style_meta.display_typeface_class` enum `sans` / `serif`(festive-royal 必须 `serif`,模板 §3 / §9 prose 按此 condition)
- **架构突破**(项目首次):
  - **chromatic mode** 首次落地(此前 4 风格全 light / dark)— `chromatic_background = [0.42, 0.18, 25]` 深朱红 OKLCH 作 surface 系
  - **serif typeface** 首次(此前 4 风格全 sans)— Cormorant Garamond + Noto Serif SC + Source Han Serif SC + Songti SC stack
- **关键 Slot 决策**(Cowork 起,Phase A pipeline 数据驱动):
  - `brand_hue = 80`(金黄)+ `neutral_hue = 25`(朱红)+ `foreground_hue = 80`(金色)— 三轴分轴 chromatic mode 必须
  - `primary` LC `{0.82, 0.14}`(亮金 focal numeral)+ `primary_hl {0.88, 0.10}`(浅金 unit/delta)
  - chart_ramp 金色阶梯 L 0.78→0.66→0.54→0.44(暗金递减)+ chart_hover whisper-thin 8% alpha
  - GrainGradient shader colors `["#7A1818", "#A23030", "#C04848", "#D9A55C"]` + colorBack `#5E1414` + shape `wave` + softness 0.85(深红 grain breath,角落金色 highlight,**朝代尊贵感**)
  - decorative_pack `festive-royal` + focal_numeral_strategy `primary_on_neutral`
  - sharp_panel_max_px 2 + card_chrome 2(微 sharp,非 systematic 0 也非 editorial 16)
  - 全衬线 stack(`sans_stack` 字段命名 mismatch 但 work — 实际填衬线;`display_typeface_class: "serif"` 显式标记)
- **新装饰组件**(per HTML 实现 + 模板 prose):
  - `SealStamp`(印章替代 ChapterStamp)— 36×36 SVG square rx=2 fill primary + 中央衬线 numeral 700 reverse color
  - `GoldenHairline` — 1px primary 0.4 alpha 全宽分割,替代 hairline 用于 chapter opener / outro
  - `TasselDivider` — 垂直竖线 + 末端小圆点(模板定义,HTML 暂未实例化,Hero 装饰用)
  - Quote `「 」` CJK bracket lead-in + lead-out(primary 金色,fontWeight 500)替代 SVG bracket / lucide icon
  - Outro SealStamp `終` square + GoldenHairline 居中结尾 + outro-claim 中文宋体 700 weight
- **Schema v0.4.2 → v0.5**:§3.2 `display_typeface_class` 字段 + `decorative_pack` enum 扩 2;§4.5 完整 festive-royal pack 定义;§9 changelog
- **模板 v0.4.2 → v0.5**:940 → 1025 行;15 处 festive-royal 分支(§1 chromatic mode 段 / §3 serif typeface condition + weight 700 Royal signature / §5 SealStamp chapter opener / §9 don'ts serif condition / §11.3 Quote/Outro / §12 Composition / §13.2 mapping table / §17 inline component block)
- **inject.py 不动**(per Schema 描述,新 enum 自动 work);**限制**:inject.py `COND_CMP_RE` 不支持 `&&` 复合条件,template 用嵌套 `{{#if}}` 替代
- **Design Prompt v0.1**:`Festive Royal Crimson/festive-royal-crimson-Design-Prompt-v0.1.md` 677 行 / 43,114 chars / 0 未渲染 path token
- **HTML v5.7 → v5.9**(7267 → 7625 → 7634 行):
  - sub-agent A patch(v5.8):inline `data-festive-royal` Slot JSON / Google Fonts CDN(Cormorant Garamond + Noto Serif SC)/ sidebar 新分组 `彩色`(第 3 组,放 chromatic 风格)+ Festive Royal item / per-pack CSS(seal-stamp / golden-hairline / .rep-kpi.festive-royal transparent + hairline / .rep-chapter-num.festive-royal)/ JS `isFestiveRoyal` flag + `FestiveRoyalChapterOpener` 函数(SealStamp + GoldenHairline)/ Quote `「 」` 分支 / Outro `終` SealStamp + GoldenHairline 分支
  - Cowork patch(v5.9):**抓 sub-agent A 漏 patch 6 处** chapter opener(chapter 02-07)— 只 chapter 01 有 isFestiveRoyal ternary,其他 6 处仍 ShadBadge raw + Cowork 自修加 6 处 festive-royal 分支 / FestiveRoyalChapterOpener 内部 div 加 key 'op';**抓 sub-agent A 拼写 bug** Outro SealStamp fontFamily 用全角智能引号 `'”Cormorant Garamond”'` U+201D → `'"Cormorant Garamond"'` ASCII
- **Cowork verify**(浏览器 preview 实测 5 风格切换 + 美观度判断):
  - 5 风格 sidebar + 3 group(明亮/暗黑/彩色)切换无 break;data-festive-royal active 时 `report-frame festive-royal` className 正确
  - Festive Royal Hero **"二○二六年度战报 · ANNUAL REPORT"** Cormorant Garamond 衬线 + 中文宋体大气 / GrainGradient 深红 wave grain + 金色 highlight / `¥36.5亿 ▲ 18.2% YoY` 金色 Cormorant Display Number / Hero 无 SealStamp(R-83 通用规则适用)
  - 7 chapter opener 全 SealStamp(hasSeal:true,hasBadge:false)/ KPI transparent + hairline / Chart 金色阶梯 chart-1~5 / Timeline 金色 outline dots + golden hairline / Quote `「 」` CJK brackets 金色 + 中文宋体 / Outro `終` SealStamp + GoldenHairline + 中文宋体 700 weight 大气结语
  - 4 现有风格(warm/theatre/cool/swiss)切换:badge count 1 + seal count 0 + reportFrameClass 正确(editorial/theatrical/instrumental/systematic)✓ 不 break
  - Slop Taxonomy A2 detector:filled+border 0 ✓ / sidebar-item.active border-left 0 ✓ / glassmorphism / backdrop-blur 0 ✓
- **经验沉淀**(同步进 §1 / Cowork memory):
  - **R-84/86 原则 9 反复犯**(R-87 #18 / R-90 #24):sub-agent 自检报告"全 PASS"但实际**穷举所有 render 路径**没做 — 6 处 chapter opener 漏 patch。Cowork **不接受 sub-agent grep 报告作 verify 凭证**,必须**在浏览器 DOM 实际渲染状态 grep**(本 round 用 mcp__Claude_Preview__preview_eval querySelectorAll 抓 hasSeal/hasBadge 才发现漏)
  - **多渲染入口枚举**:HTML React render 7 个 chapter,sub-agent 只 patch 第一个(认知偏差:"修一个就以为模式 work");Cowork verify prompt 要明示"穷举所有 chapter render block(grep `rep-chapter-opener`)逐个 patch"
  - **Smart quote bug**:macOS / Anthropic 文档生成中**全角智能引号 U+201D `”` 与 ASCII `"` 视觉混淆**,sub-agent 拷贝代码偶尔出错。grep `["'][”""]` Unicode 字符可抓
  - **R-90 工作纪律 #5 应用**(Round 完成后必同步 §5 版本快照):Schema v0.5 / Template v0.5 / HTML v5.9 / 新 Slot example + Design Prompt v0.1 全条目

### Round-91(2026-05-24)· Phase C.1.B · 红色喜庆 Style B · Festive Editorial · Crimson Wash

Chris R-90 通过 Style A 后(2026-05-24 "暂时看起来还可以"),启动 Style B。**风格定位**:走西式当代编辑红色情绪 — 与 Style A 宫廷尊贵传统中国对应。

#### #25 · 新风格 festive-editorial pack · 西式 brutalist editorial + 红色 grain blur

- **设计判断**(Cowork 起 Slot v0.1):
  - `mode = light` + `display_typeface_class = sans`(对应 Style A chromatic + serif)
  - `brand_hue = 28`(鲜红,refero Valiente Crimson `#ff1a00` OKLCH L 0.60 C 0.25 hue 28 邻近)
  - `weight_ceiling = 800` + `emphasis_tier = bold`(refero brutalist editorial 极粗大字)
  - `hero_geometry.default_treatment = typographic-field`(refero brutalist 排版主导)
  - `hero_shader: GrainGradient` shape `corners` + colors `["#FFFAF7", "#FFC4B0", "#FF5E40", "#E81F00"]` colorBack ivory `#FFFAF7`(对应 0d6695 PMC 红色 blur 大色块 / 02195825 元旦灯笼)
  - sans stack: Helvetica Neue / IBM Plex Sans / Inter / Noto Sans SC / PingFang SC
  - 字号: Hero Display 220px + Hero Title 140px + Section Primary 88px(都比 Style A 大)
  - radius 全 0(对齐 systematic)
  - `display_ls_em -0.05em` 紧凑负字距(refero Valiente Crimson signature)
  - decorative_pack `festive-editorial`(Schema v0.5 占位 enum,本 round 补全 §4.6 定义)
- **新装饰组件**(per HTML 实现 + 模板 prose §4.6):
  - `ChapterNumeralLarge` — 超大 sans chapter 数字 (clamp 64-96px) `font-extrabold` 800 `var(--primary)` 鲜红,无 SVG 无 ring,与 chapter title sans 800 黑色 baseline-aligned 同行排列
  - `HairlineRule` — 全宽 1px `var(--border-strong)` 横线(黑色 24% alpha),chapter opener 上方独立 row
  - `SharpTag` / `NumericKicker` / inline `DeltaIndicator` 800 — 全 0 圆角
  - Quote em-dash `—` `var(--primary)` `font-extrabold` lead-in / lead-out(无 SVG 无 bracket,brutalist)
  - Outro 大字 "END" `var(--primary)` 800 + HairlineRule + outro-claim sans 800 ALL CAPS
- **Schema v0.5 → v0.5.1**:§4.6 完整 `festive-editorial` pack 定义 + §9 changelog v0.5.1 entry(对齐 §4.5 festive-royal 风格);**与 festive-royal 关键区别**:festive-royal = chromatic 深红底 + 全 serif 700 + SealStamp + GoldenHairline / festive-editorial = light 白底 + 全 sans 800 + ChapterNumeralLarge + HairlineRule
- **Template v0.5 → v0.5.1**:14 处 per-pack festive-editorial 分支(§3 weight + §5 chapter opener + §9 don'ts 800 weight 嵌套 + §11.3 Quote/Outro + §12 Chapter opener + §13.2 mapping table Quote/Outro/Tag + §17 inline component block);grep `decorative_pack ==` 全覆盖,无遗漏
- **inject.py 不动**(仍 limit 不支持 `&&` 复合 condition,模板用嵌套 `{{#if}}` 替代)
- **Design Prompt v0.1**:`Festive Editorial Crimson/festive-editorial-crimson-Design-Prompt-v0.1.md` 677 行 / 0 slot path token / 0 #if directive / 0 Unicode 智能引号(R-90 教训 self-check)
- **HTML v5.9 → v5.10 → v5.11**(7634 → 7917 → 7917+ 行):
  - sub-agent B patch(v5.10):inline `data-festive-editorial` 完整 Slot JSON / IBM Plex Sans Google Fonts CDN(400-800)/ sidebar **归入"明亮"组**(per mode = light 一致,与 Warm + Swiss 同组,**不入"彩色"组** — 那是 chromatic 专属)/ per-pack CSS(festive-editorial-hairline / rep-chapter-num.festive-editorial clamp 64-96px / rep-chapter-title 800 / rep-kpi.festive-editorial transparent + top-hairline / rep-hero-num 800 negative ls / rep-outro-claim 800 ALL CAPS)/ JS `isFestiveEditorial` flag + `FestiveEditorialChapterOpener` 函数(HairlineRule + baseline row(大数字 + title))/ **穷举 7 chapter ternary 全 patch**(对齐 R-90 教训:`isFestiveRoyal ? FR(...) : isFestiveEditorial ? FE(...) : default`)/ KPI/Quote/Outro 分支
  - **Cowork 自检发现 1 issue + 修**(v5.11):sub-agent B 给 festive-editorial 加了 `.report-frame.festive-editorial .rep-chapter-opener { padding-bottom: 12px }` 但**没加 `flex-direction: column`** → 与 default `.rep-chapter-opener { display: flex; align-items: baseline }` 冲突 → chapter opener `<hr>` HairlineRule 和 row(numLarge + title)被 flex row 横排挤压,chapter title 被压窄换行 "核心指 / 标 · Core / Metrics"。**对比**:R-90 sub-agent A 给 festive-royal 加了完整 `.rep-chapter-opener { flex-direction: column; align-items: flex-start; gap }` override → SealStamp + title stacked OK。**Cowork patch**:加 `flex-direction: column; align-items: stretch; gap: 12px; border-bottom: none; margin-bottom: 16px; padding-bottom: 0` to festive-editorial chapter opener override
- **Cowork verify**(mcp__Claude_Preview querySelectorAll DOM 实测 — R-87/R-90 教训):
  - 6 风格 sidebar 切换:warm → ShadBadge editorial / theatre → ShadBadge theatrical / cool → ShadBadge instrumental / swiss → ShadBadge systematic / festive-royal → SealStamp festive-royal / festive-editorial → ChapterNumeralLarge festive-editorial — 全 PASS ✓
  - **美观度全 PASS**:Hero shader red GrainGradient corners blur on ivory(类似 0d6695 PMC 风格)/ Hero Title "二○二六年度战报 · ANNUAL REPORT" Helvetica + PingFang 800 黑字 brutalist / Display Number ¥36.5亿 Helvetica 220px 800 鲜红 / 7 chapter opener HairlineRule + 大数字+title stacked layout 完美 / KPI cells transparent + top-hairline + 鲜红 sans 800 大数字 / Chart 红色阶梯 chart-1~5 in white ground / Timeline 鲜红 outline dots + 红色 hairline / Quote em-dash `—` 鲜红 lead-in/out + 中文 sans 800 / Outro `END` 鲜红 + HairlineRule + ALL CAPS 黑字 800 结语
  - Slop Taxonomy A2 detector:filled+border 0 ✓ / sidebar-item.active border-left 0 ✓(R-89 保留)/ Unicode smart quote in HTML JS strings 0 ✓(R-90 教训 self-check 应用)/ glassmorphism / backdrop-blur 0 ✓
- **经验沉淀**(同步进 §1 / Cowork memory):
  - **R-90 #24 教训应用成功**:sub-agent B 这次报"穷举 7 chapter ternary 全 patch"前确实做对了 — verify 时 7 chapter render 路径(L7218/7260/7274/7296/7334/7364/7398)都有 `: h('div', { className: 'rep-chapter-opener', key: 'op' }, ...` 兜底分支 + 上方有 `? FestiveEditorialChapterOpener(...)` 分支。R-90 教训 starter prompt 明示 + sub-agent execute 成功
  - **R-90 教训应用失败 1 例**(新):sub-agent B 没注意到 default `.rep-chapter-opener { display: flex }` + festive-editorial 自带 `<hr>` HairlineRule 的 layout 冲突 — **R-90 sub-agent A 给 festive-royal 加了 `flex-direction: column` 但 R-91 sub-agent B 没 mirror 这个 CSS override**。**经验抽象**:sub-agent 跨 round 工作时,**类似新 pack 应 mirror 已有 pack 的同结构 CSS pattern**(festive-editorial layout 与 festive-royal 类比 → CSS override 应同步)。**Cowork prompt 改进**:派 sub-agent 时,如有"类比 R-XX 已实现的某 pack 模式",**明示要 mirror 的 CSS rules 列表**,不让 sub-agent 自己推断
  - **R-90 fontFamily smart quote bug**:本 round sub-agent B 没重蹈(grep `[‘’“”]` in fontFamily 0 ✓);教训 starter prompt 明示后 sub-agent 自检通过
  - **R-90 工作纪律 #5 应用**:Schema v0.5.1 / Template v0.5.1 / HTML v5.11 / 新 Slot example + Design Prompt v0.1 全条目同步 §5

### Round-92(2026-05-24)· Phase C.2 · festive 双风格 signature ornament

Chris R-91 拍板后 "整体风格不错的,这两版控制得比较好" + 1 个优化点:**每个风格的装饰性元素可以有变化,制作精致美观的"风格锚点"元素**。Chris 选**选项 B partial**:**只做 festive 双风格**(festive-royal + festive-editorial)的 signature ornament,其他 4 风格先不加。

#### #26 · festive-royal Cinnabar Imprint 红印泥 + festive-editorial Crimson Bar ▌

**实施方式**:Cowork 自己实施(不派 sub-agent — 2 ornament 规模适中,且 R-90/R-91 教训 sub-agent 跨 pack 推断时易漏 mirror;Cowork 直接 patch 更精准)。

**1. festive-royal `Cinnabar Imprint` 朱砂红押印**
- **视觉**:56×56 SVG 方印,微旋转 -3°,带 drop-shadow + ink-bleed `feTurbulence`+`feDisplacementMap` filter
- **fill**:hard-code `#9D2933` (朱砂红 cinnabar pigment) / 内嵌米色 "印" 字 fill `#FAEED5`(米色印纸)
- **位置**:Hero 右下押脚 `position: absolute; right: 40px; bottom: 40px;`(`@media max-width: 720px → 20px/20px`)
- **为何 hard-code 颜色不用 token**:festive-royal pack 的 `--primary` 是**金色**(L 0.82 C 0.14 H 80 gold,Style A 主色),不是红色;cinnabar 是 historical pigment 独立于 brand token,需 hard-code 朱砂红 + 米色印纸效果。Chapter SealStamp(金色 in chapter opener)与 Cinnabar Imprint(朱砂红 in Hero 押脚)各自专属位置不冲突,共同丰富 Style A 印章语言
- **Cowork verify issue 1**:initial patch 后 Cinnabar `position: relative`,不是 `absolute`。原因:line 2306 `.rep-hero > *:not(.rep-hero-shader):not(.rep-hero-shader-wash):not(.rep-hero-corner) { position: relative; z-index: 2; }` 覆盖 Cinnabar(它不在 :not 排除列表)。Fix:把 `.festive-royal-cinnabar` 加入 :not 排除链
- **Cowork verify issue 2**:initial patch 用 `fill: var(--primary)` 印章方块 → 渲染为**金色**方块(因为 festive-royal `--primary` 是 gold)+ `fill: var(--bg)` "印" 字 → 深红 on 深红 invisible。Fix:hard-code 朱砂红 #9D2933 + 米色 #FAEED5(per 上述)
- **视觉 verify**:Preview screenshot 显示朱砂红方印 + 米色"印"字 + 微旋转 + ink-bleed 微粒感 + drop-shadow,完美 chinoiserie 押印 mood ✓

**2. festive-editorial `Crimson Bar` ▌ 红色 vertical accent**
- **视觉**:`4px × 0.85em` 鲜红 vertical bar(`background: var(--primary)`,festive-editorial pack 的 primary 是 crimson red)
- **实现方式**:CSS `::before` pseudo-element(不污染 React tree)+ parent `display: flex; align-items: center; gap: 8px`
- **出现规则**(只在 mono caps eyebrow):
  - `.rep-hero-eyebrow::before`(Hero "VIBE VIEW · 2026 ANNUAL CAMPAIGN" 前)
  - `.rep-kpi-label::before`(KPI cluster 月活用户 / 付费率 / ARPU / NPS 前)
  - `.rep-tl-period::before`(Timeline 节点 "01 · 2026" 前)
- **视觉 verify**:DOM eval confirm `barBg = oklch(0.58 0.22 28)` 鲜红 / `barW = 4px` / `barH = 8.5-9.3px`(scales to text x-height)/ Hero eyebrow screenshot 显示 `▌ VIBE VIEW · 2026 ANNUAL CAMPAIGN` 红色 bar 在 eyebrow 文字前 ✓
- **brutalist editorial signature**:对齐 refero Valiente Crimson / 编辑设计 markup 视觉语言(类似 manuscript copy markup vertical bar / margin proof mark)

#### #27 · R-92 经验 / 工作纪律加固

- **Cowork 自己实施的优势**:R-90 #24 / R-91 #25 教训 sub-agent 跨 pack 工作时易漏 mirror CSS(festive-royal 已有的 `.rep-chapter-opener flex-direction: column` 没 mirror 到 festive-editorial)。R-92 Cowork 自己实施 2 个 ornament,**全程 Cowork 控制 + 自查 + 自修**,效率高 + 精准
- **CSS specificity 教训**(R-92 #26 issue 1):**新增 absolute child to 已有 layout container,需 grep 看是否有 parent rule `.parent > *:not(...)` 通配,自动检查 :not 排除列表是否需要 update**。这是 sub-agent / Cowork 通用教训
- **Token-aware color 教训**(R-92 #26 issue 2):**用 `var(--primary)` 等 brand token 前,必须 verify token 实际值在该 pack 的语义匹配**。Style A festive-royal `--primary` = 金色(gold),不是 cinnabar 红;Cinnabar 是 historical pigment 独立于 brand token,需 hard-code。**经验**:跨 pack 共用组件时,**brand token 不能假设语义(red / gold / blue)— 必查 pack 的 OKLCH 实际值**

## §3 后续追加策略

**每轮新 Round 反馈 / 新 issue / 新 patch → 在 §2 末尾追加**:

```markdown
### Round-XX(YYYY-MM-DD)· [phase / 主题]

#### #N · [issue title]
- 症状
- 根因
- 修法
- 验证
- 经验(若可抽象 → 同步沉淀进 §1 原则 / Slop Taxonomy / Schema)
```

**Cowork 工作纪律**:
1. 每次 sub-agent 回报有 issue / Chris 反馈 / Anti-Slop check 完 → **追加本文件 §2**
2. 抽象出可复用原则 → **沉淀进 §1**(单一入口,跨源 master index)
3. 详细数据(完整 issue 报告 / 截图 / 测试矩阵)→ 单独文件 + **在 §0 加索引**
4. Cowork 每次工作开始前 **先扫 §1 原则**(避免重犯)
5. Round 完成后 **必同步 §5 版本快照**(latest 版本号 + 文件路径,防 drift)
6. **文件命名约定**:本文件名 `Round-Log.md` 不要轻易改;Round 编号严格连续(R-XX)
7. **Sub-agent model 选择规则**(R-86 Chris 反馈):
   - **简单 / 工程任务**(HTML CSS / sync / verify / 注入器 / 重构等)→ **Sonnet 4.6**(快 + 经济)
   - **Design Prompt 文本表达 / PE / 模板设计 / 复杂判断 / prose 质量场景** → **Opus 4.6**(强模型质感)
   - Agent tool 用 `model: "sonnet"` / `model: "opus"` 显式指定;默认 Sonnet

---

### Round-93(2026-05-24)· Phase C.3 · Chris 反馈批量修(festive 视觉 + 项目纪律加固)

#### #28 · Cluster A 立即视觉回退/删除(3 项)

Chris 反馈"R-92 #26 Cinnabar 印章太丑" + "festive-editorial 末尾 END 突兀" + "Composition Typography Field 中间横线全风格去掉"。Cowork 自实施:

| ID | 改点 | 文件 / 行 |
|---|---|---|
| A1 | festive-royal Hero Cinnabar 印 删除 | HTML CSS 块 1894-1906(整段)+ JSX 7174-7194(整段)+ `:not()` 排除 2306 还原 |
| A2 | festive-editorial 末尾 `END` 删除 | HTML 7553-7563(保留 hairline + claim + colophon) |
| A3 | Typographic Field `border-top` 删除 | HTML 860 `.hero-type-footer { border-top: ... }` 删,padding 保留 |

**验证**:Preview MCP eval `cinnabar=false / endTextCount=0 / typoFooterStyle borderTopWidth=0px`

#### #29 · Cluster B 样式微调(festive 两风格)

| ID | 改点 | 数值 |
|---|---|---|
| B1 | festive-royal chart_ramp 去绿偏橙 | 4 阶 H per-step override:75 / 55 / 40 / 25(gold→amber→orange→red-orange,**OKLCH 单一 hue 80 + L 下降会进绿区是 OKLCH gamut 性质,per-step hue shift 是唯一干净解法**) |
| B2 | festive-editorial 大字字重降(Chris 原则"越大字越细越优雅") | chapter num 800→300 / hero title/num 800→300 / chapter title 800→400 / outro claim 800→500;Slot weight_ceiling 800→500 / emphasis_tier bold→regular |

**Schema 渐进扩展**:`chart_ramp` item 新增 optional `H` 字段(per-step hue override);未指定时 fallback `brand_hue`,**6 风格其余 5 个不受影响**。`lc(v, v.H ?? bh)` 单点改造 + swatch render 同步。**渐进扩展原则**:Schema 演进只在用得到的风格落地,其他风格保持不动。

**验证**:Preview MCP eval `chapterNumWeight=300 / heroTitleWeight=300 / heroNumWeight=300 / outroClaimWeight=500 / chart-2~5 colors 全 hue=75/55/40/25`

#### #30 · Cluster C 项目纪律追加(写入 §1 原则)

| ID | 原则 | 来源 |
|---|---|---|
| C1 → §1 原则 10 | **Hero shader 禁 `position: fixed`**(z-index 失控 / scroll 脱离 / iframe bug 历史反复) | Chris R-93 反馈 |
| C2 → §1 原则 11 | **Design Prompt ≤ 600 行 + 每字必有效约束**(refero / Festive 已临界 680)| Chris R-93 强化 + Memory 现有 4 条 feedback 红线汇总 |

#### #31 · Cluster D 调研报告(Explore agent 派,出报告等 Chris 决策)

Chris 反馈"Hero Composition 3 套布局是不是每风格 Design Prompt 都有""Ornaments 是不是每风格都有这些""Ornaments / Decorative Pack vs Report Example 对不上""Mobile tab 不如直接缩窗"。Explore agent 调研结论:

| 调研 | 结论 |
|---|---|
| **D1** Hero variants | 6 风格 Design Prompt 都记录 Hero treatments,但完整度不齐:Warm/Theatre/Cool 明确列 3 套(Asymmetric Split + Full-bleed Monolith + Typographic Field),Swiss/Festive-Royal/Festive-Editorial 只 1 default + 文内简短提及。HTML `buildHeroComposition` 实际支持 3 个 treatment 分支,**Prompt vs 实现 align 不齐** |
| **D2** Ornaments 差异化 | Ornaments **大同小异**。Ornament Clinic 渲染(line 6354-6459)对所有风格统一渲染 divider / chapter marker / delta / pill / quote。**仅 festive 双风格有 signature ornaments**(SealStamp / GoldenHairline / ChapterNumeralLarge),其他 4 风格 Design Prompt 写一堆但都是通用模板套话 |
| **D3** Ornament vs Report Example 映射 | **严重 mismatch**。Report Example 仅 festive 双渲染 signature(`isFestiveRoyal` / `isFestiveEditorial` 分支),其他 4 风格 Design Prompt 宣称的 ornament(GoldenHairline / TasselDivider 等)在 Report 里**完全不渲染**。Chris 的"对不上"感受来源于此 |
| **D4** Web/Mobile tab | toggle 实现完整(`mobile-frame { max-width: 420px }`),但**仅限制 max-width / 不触发 mobile media queries** — Outer viewport 仍 desktop → CSS `@media (max-width: 800px)` 不触发 → mobile-specific 字号 / spacing 不启用。**与浏览器缩窗等效仅在 max-width 维度** |

**Chris 决策待定项**:
- D1/D2/D3 联动 → 选项:(a) 补齐 4 风格 Report Example signature ornament(HTML 大改 200-500 行)/(b) 删 Design Prompt 里没用到的 ornament(精简 prompt,呼应 §1 原则 11)/(c) 双管齐下
- D4 → 选项:(a) `.report-frame.mobile-frame` 内部用 container queries 触发 mobile typography /(b) 切 Mobile tab 时 set inline CSS vars 强用 *_mobile 值

#### #32 · Cluster E · 工具调研(已完成)

agentation 是 **React npm 包(非浏览器扩展)**,需 React 18+ 项目集成 + `<Agentation />` 组件挂载根 + 可选 MCP 服务器(`npx -y agentation-mcp server`)。**与现 HTML(esm.sh importmap)不兼容**,需 bundler。Chris 决策:R-94 重构为 Vite 项目时一并集成。

---

### Round-94(2026-05-24)· Phase D 启动 · Vite 重构 + Design Prompt Tab + 三方 Sync

Chris R-93 反馈决策汇总(3 条):
1. **D1/D2/D3 联动**:删 Design Prompt 没渲染 ornament + **Design System ↔ Report Example 必须同步**(Design System 忠实反映 Prompt,Report Example 基于 Design System 组合)→ 新原则 12 已沉淀 §1
2. **D4 Mobile**:container queries 方案(`.report-frame { container-type: inline-size }`)
3. **HTML 重构为 Vite 项目** + 顶部新增 Design Prompt tab + `@pierre/diffs` 展示 + version / updated_at / changelog metadata

#### #33 · R-94 立项 · 7 stage 实施方案

| Stage | 范围 | 估时 | 实施者 |
|---|---|---|---|
| 1 | Vite 项目骨架(React 18 + TS + Tailwind + shadcn-cli + 6 风格 DATA 提取)| 2-3h | sub-agent A(Sonnet)|
| 2 | 移植 Design System view(component 拆解) | 2-3h | sub-agent C(Sonnet) |
| 3 | 移植 Report Example view(ReportFrame 拆解) | 2-3h | sub-agent D(Sonnet) |
| 4 | D4 Mobile container queries 替换 @media → @container | 1h | Cowork |
| 5 | Design Prompt tab + `@pierre/diffs` + version metadata | 1-2h | Cowork |
| 6 | D1/D2/D3 三方 Sync:Prompt audit + 删未渲染 ornament + 重 inject | 2-3h | sub-agent B(audit) + 6 风格 实施 sub-agent |
| 7 | 端到端 verify + Round-Log + memory 沉淀 | 1h | Cowork |

**总估时**:11-16h(multi-session)

#### #34 · 关键约束沉淀

- **R-94 不动现 HTML**(它仍是 Chris 验收 baseline,直到 Vite 项目等效 verify 通过)
- **Slot JSON 在 Stage 1 提取为基线后不动**(R-93 已 sync 完;Stage 6 重 inject 才改 Prompt + Slot)
- **三方 Sync Rule(原则 12)**= Stage 6 实施前置 + 此后所有 Slot / Prompt / HTML 改动后必检
- **agentation 集成** 在 Stage 1(npm 安装 + `<Agentation>` 挂载)

#### #36 · R-94 收口 · Stage 1-7 全部 ✓(本 Round 完成)

| Stage | 实施者 | 完成 | 产物 |
|---|---|---|---|
| 1 · Vite 骨架 | sub-agent A(Sonnet, worktree)| ✓ | React 18 + Vite + TS + Tailwind 3 + shadcn 9 + motion 12 + paper-shaders + recharts + agentation + @pierre/diffs(Cowork 补装)+ 6 风格 src/data/*.slot.json |
| 2 · Design System view 移植 | sub-agent C(Sonnet, worktree)| ✓ | src/views/design-system/ × 7(Atomic / Molecular / HeroComposition / Ornaments / DesignSystemView / oklch.ts / styles.css)|
| 3 · Report Example view 移植 | sub-agent E(Sonnet, worktree)| ✓ | src/views/report-example/ × 14(ReportExampleView + Hero / KPI / Trend / Timeline / Compare / Ranking / Proportion / Annotation / Quote / OutroChapter / ChapterOpener / data.ts / styles.css)|
| 4 · D4 Mobile container queries | Cowork | ✓ | `.report-frame { container-type: inline-size; container-name: report }` + 8 `@media` → `@container report` |
| 5 · Design Prompt tab + @pierre/diffs | Cowork | ✓ | src/views/design-prompt/{DesignPromptView,styles.css}+ src/data/prompts/ × 6 md(latest version)+ inline metadata(version / updated_at / changelog × 2 entries per style)+ `<File>` 组件 Shiki markdown render |
| 6 audit + 实施 | sub-agent B + D(Opus)| ✓ | template v0.5.2 + festive-royal slot v0.3 + 6 风格新 Prompt md(版本号 ++)+ HTML inline DATA sync |
| 7 verify + 沉淀 | Cowork | ✓ | src/data/festive-royal.slot.json 加 golden_hairline 字段(R-94 Stage 6 → Stage 1 提取快照 sync 链补齐)+ Round-Log §1/§2/§5 全更 + project memory R-94 完成 row |

#### #37 · R-94 build 状态

- `bun run dev`(vite)→ HTTP 200 / port 5173 ✓
- `bun run build`(production)→ 0 TS errors,1.6MB bundle(@pierre/diffs 默认含全 Shiki language packs;R-95 可考虑 dynamic import 减包)
- 3 views(Design System / Report Example / Design Prompt)+ 6 风格 sidebar + Web/Mobile toggle 全部可用
- **R-93 / R-94 改动全部保留**:festive-royal chart_ramp per-step H / golden_hairline / festive-editorial 字重降 / Crimson Bar / chapter 无 Cinnabar / 无 END / Typographic Field 无 border

#### #38 · 现 HTML(老版)保留 vs Vite 项目 关系

- **现 HTML**(`_Framework/design-system-renderer/index.html` v5.14)= **Chris 验收 baseline**(原则 9 + R-94 立项约束 #34)
- **Vite 项目**(`_Framework/design-system-renderer-vite/`)= R-94 重构产物
- **同时跑**:HTML on `localhost:8085`(`vibe-view-renderer` launch.json config)/ Vite on `localhost:5173`
- **何时切换**:Chris 决定。Cowork 不主动废老 HTML,直到 Chris 在 Vite 上做 1-2 轮迭代且 vault 验收无 regression

#### #39 · R-94 未尽事项(留 R-95+)

1. **6 风格 Prompt 行数 trim 到 ≤600**(原则 11)— Stage 6 实施已 flag,候选 trim:hero shader 三 treatment 重复 prose / §13.1 hero 代码 snippet 缩短 / §11/§12 表格合并
2. **D1 Hero variants 补齐**(Stage 6 audit 发现 Swiss/Festive 双 Prompt 只 1 default,未列 3 套备选)— 补 prompt 段
3. **bundle 减重**(1.6MB → 优化目标 < 800KB)— @pierre/diffs dynamic import / Shiki language pack 按需加载
4. **agentation 集成生效**(Stage 1 已装 + dev-only mount 设)— Chris 试用 + 反馈
5. **doubao 实测重跑**:6 风格新 Prompt md(v1.0.2 / v6.7.2 / v0.5.2 / v0.7 / v0.2 / v0.2)需上 doubao verify 生成质量未 regress

---

---

### Round-95(2026-05-24)· Phase D.2 · Prompt trim + Vite UI 重做

Chris R-95 反馈 + 决策:
1. **Prompt trim**:只修新增 3 风格(Swiss / Festive Royal / Festive Editorial)到 **≤620 行**(原则 11 放宽),Warm/Theatre/Cool 不动;约束力 0 弱化
2. **Vite UI 重做**:shadcn Sidebar 真集成 + 左侧主导 + 全暗黑主题(designprompts.dev / Linear / Vercel 风格)+ Design Prompt:Copy + Diff vs 上版 + line-wrap

#### #40 · R-95 Cluster A · Prompt trim ✓(Opus sub-agent A,**直接改产物 md + frontmatter manual_override flag**)

| 风格 | 起 | 终 | trim |
|---|---|---|---|
| Swiss | v0.7 626 | **v0.8 604**(-22) | §2 color rule 4 长 bullet → 4 紧;§6 whileInView 3 重复 → 1 bold + code;§17 Recharts Tooltip 3 段 → 1 + 3 紧;装饰空行 |
| Festive Royal | v0.2 666 | **v0.3 611**(-55) | + §2 chromatic mode 浓缩;§10 Scenario Mindset / Voice 教学浓缩;§11.3 Timeline 教学缩;§13.1 Hero brand marks/Alts/Anti-refs 3 段合;§6 motion 4 段 → 2;§4 Spacing 4 段 → 3;GoldenHairline 5 行 snippet → 1 行 inline;装饰空行 |
| Festive Editorial | v0.2 677 | **v0.3 620**(-57) | + 同模式 trim;HairlineRule 5 行 snippet → 1 行 inline;§3/§5/§17 装饰空行(多处 11-12 blank) |

**约束力 verify(grep)**:Hero ≠ chapter / Filled+border / Shader contrast fix at source / once: true × 4 / Recharts #000 warning / cubic-bezier arrays / isAnimationActive=false × 3 / pack signatures(Swiss ChapterBanner+ShadSeparator+700 / Royal SealStamp+GoldenHairline+700 serif / Editorial ChapterNumeralLarge+HairlineRule+800 sans)全部保留 ✓

**未受影响 verify**:Warm/Theatre/Cool md 行数 byte-identical(668/616/640)未变;旧版 v0.7/v0.2/v0.2 文件保留;0 unrendered template tokens

#### #41 · Editorial v0.3 预发现 template contradiction(R-95 trim 不修,留 R-96)

Sub-agent A 报告 Festive Editorial v0.3 line 72/309 仍写 **"font-extrabold (800)"** for Hero Display Number / Hero Title / Section Primary / ChapterNumeralLarge / Outro Closing claim,但 line 220 写 **"Don't apply weight above 500"**(R-93 #29 weight_ceiling 800→500 后改的)— **template branch 矛盾 in v0.2 已有**,trim "约束力 0 弱化"原则没动。

**+ 额外发现**:line 309 还说 `optional closing ChapterNumeralLarge "END"`,但 **R-93 A2 已删 Outro END**(Cowork verify HTML endTextCount=0)— **第二处 P/R mismatch**。

**R-96 处理建议**:
- 决策 Editorial weight ceiling:**500**(R-93 已定)→ template line 67 + line 229 改 800→500(或对应 weight token);ChapterNumeralLarge 描述对齐 R-93 #29 实际值(`.rep-chapter-num.festive-editorial { font-weight: 300 }`)
- Outro 描述删 "optional closing ChapterNumeralLarge END"(R-93 A2 已删 R 端)
- 改完重跑 inject + verify Festive Editorial v0.4 + sync HTML inline + Round-Log §5 snapshot

#### #42 · R-95 Cluster B · Vite UI 重做 ✓(Opus sub-agent B)

**shadcn Sidebar 真集成**(`bunx shadcn@latest add sidebar` 装 8 文件:sidebar / sheet / input / skeleton + 覆盖 button/tooltip/separator base-ui):
- `SidebarProvider` + `Sidebar variant=sidebar` 264px 主导
- Brand 顶(V logo gradient violet→cyan + "Vibe view" + 副标 "Design System Renderer")
- **6 风格 3 组**(明亮 4 / 暗黑 1 / 彩色 1)对齐老 HTML R-88 分组
- 每 item:2px 左侧 active indicator + 风格名 + sublabel(Ivory Ember / Hermès Orange 等)+ data-active hover/active state
- Footer:current style version + Web/Mobile segment(替代 header 右上 toggle)
- 主区:48px thin nav bar 只 view tabs,无 logo

**全暗黑 OKLCH 主题**:
- `--background: oklch(0.18 0.005 240)`(深灰偏冷 ≈ #0E0F11)
- surface 3 阶(0.21 / 0.24 / 0.28)无 shadow,hairline border `rgba(255,255,255,0.08)`
- `--accent: oklch(0.65 0.18 280)` violet + `--accent-cyan: oklch(0.72 0.14 200)`
- foreground L 0.92 / muted L 0.62 / subtle L 0.45
- Geist Variable sans + Geist Mono / line-height 1.55 / letter-spacing -0.011em
- `.dark` 默认 on `<html>`(main.tsx)
- **tailwind.config.js 修**:`hsl(var(--...))` → `var(--...)` 直引(修复 OKLCH 在 Tailwind 中 broken 根因)

**Design Prompt 3 件套**:
- Copy 按钮(lucide `<Copy>` / `<Check>` icon + 1.8s feedback)
- Full / Diff vs Previous tabs(shadcn Tabs + lucide `<FileText>` / `<GitCompare>` icon + `parseDiffFromFile(prev, current)` → `<FileDiff>`)
- wrap 不左右滚(`options={{ overflow: 'wrap', theme: 'github-dark' }}` + CSS `white-space: pre-wrap !important` 双保险)
- 60px header(version badge gradient + filename + Updated/Lines/Chars stat group + Tabs + Copy 单行)
- Changelog accordion(首项 accent 左侧线 + "Latest" badge)
- 6 上一版 prompt md cp 到 `src/data/prompts-previous/`(warm v1.0.1 / theatre v6.7.1 / cool v0.5.1 / swiss v0.5 / festive-royal v0.1 / festive-editorial v0.1)

**verify**:bun build 0 error / bundle 2.16MB(gzip 649KB,主要 shiki 全 lang + base-ui 全量;R-96 dynamic import 减重候选)/ curl HTTP 200 / 3 views + 6 风格 + Web/Mobile 全保留 / R-93/R-94 改动全 in sub-views 不动

#### #43 · R-95 收口 + R-96 候选

| R-96 候选 | 优先 |
|---|---|
| Festive Editorial template contradiction fix(weight 800↔500 矛盾 + END 提及删,R-95 #41 留)| **P0** — 三方 Sync 原则 12 违反 |
| bundle 减重(2.16MB → <800KB,@pierre/diffs / shiki / base-ui dynamic import 或 code-split)| P1 |
| D1 Hero variants 补齐(Swiss/Festive 双 只 1 default,未列 3 套备选)| P1 |
| **doubao 实测**:6 风格 latest md(warm v1.0.2 / theatre v6.7.2 / cool v0.5.2 / swiss v0.8 / festive-royal v0.3 / festive-editorial v0.3)| P0 — 验生成质量 |
| agentation 集成 Chris 试用反馈 | P2 |
| 现 HTML 老版废 vs Vite 项目正式切换 | P2 — 等 Chris 几轮 Vite 验收 |

---

#### #35 · Cowork 误判 sub-agent A hallucination(Cowork 教训)

**事件 + Cowork 误判**:派 Sonnet sub-agent 跑 Stage 1 Vite 骨架(worktree isolation 模式),sub-agent 返回详细报告。Cowork verify 时 `ls` sub-agent worktree 路径(`.claude/worktrees/agent-xxx/`)**只看到 bun.lock + node_modules + 1-dep package.json**,误以为 sub-agent hallucination,记 R-94 #35 严重指控。

**真相**:sub-agent A 用绝对路径 Edit/Write,**产物直接落在 canonical vault 路径**(`projects/Vibe view 项目/Design Prompt 调优/_Framework/design-system-renderer-vite/`),不在 sub-agent worktree 根。Cowork verify canonical path 时,发现 sub-agent A 实际完成度 **95%**:
- src/App.tsx ✓(3 tab / 6 style sidebar / device toggle / shadcn import 齐)
- src/data/*.slot.json × 6 ✓
- src/components/ui/ × 9 ✓(badge / button / card / progress / separator / tabs / toggle / toggle-group / tooltip)
- src/lib/utils.ts / src/index.css / src/main.tsx ✓
- tailwind.config.js / postcss.config.js / components.json / tsconfig*.json ✓
- 6 dev / 12 build deps 全装 ✓
- **唯一漏**:`@pierre/diffs` 没装(R-94 Stage 5 需要)— Cowork 已补装

**新教训(沉淀 Cowork 经验 + Memory)**:
1. **Verify sub-agent 工作前**必须先确认它写入位置 — 用绝对路径还是 worktree relative?**Bash 命令 `cd && ls` 看到的工作目录 ≠ Edit/Write 用的绝对路径 destination**
2. **Worktree isolation 主要影响 Bash CWD / Git branch / 临时 file**,但 **Edit/Write 用绝对 canonical path 时,worktree 边界透明**(直接写 canonical)— 这是 Cowork 此前没充分理解的 git worktree + Edit 工具语义
3. **Memory `feedback_worktree_vs_canonical_vault.md` 升级**:不光"路径推断必须 ls canonical vault 根",**verify sub-agent 产物也必须 ls canonical 完整路径,不是 sub-agent worktree 根**
4. **下次 sub-agent 工程任务 prompt 加要求**:"完成后报产物完整 canonical 路径 + `ls -la` 该路径输出 + 关键文件 line 1-20 cat"作为 verify proof,降低 Cowork 误判风险

**没有更换 sub-agent 实施模式**:sub-agent A 实际很可靠,**继续用 sub-agent 跑 Stage 2 / 3 工程任务**(sub-agent 跑稳了,Cowork 自做反而慢)。

---

## §4 Chris 定期检查指南

定期(每周 / 每 Phase 结束)看本文件:
- **§1 抽象原则**:Cowork 是否真在 apply,有无新经验值得加
- **§2 迭代历史**:近期 Round 是否有递归 issue / 反复犯错
- **§0 知识沉淀索引**:是否需要更新 / 文件是否丢失

如发现 Cowork 反复犯同样 issue / 没 apply 已沉淀原则 → 直接指出,Cowork 加严工作纪律。

---

## §5 当前 Schema / 模板 / 文件版本快照(latest)

- Schema:`slot-schema-v0.md` **v0.5.1**(R-91 §4.6 festive-editorial pack 定义补全;待 R-93/R-94 隐式扩展:chart_ramp item 加 optional H + dividers 加 optional golden_hairline 字段)
- 模板:`templates/Warm.template.md` **v0.5.2**(R-94 Stage 6 three-way sync · 删 TasselDivider / OutlinedPill / Theatre SpotlightGradient / Swiss ChapterStamp→ChapterBanner+ShadSeparator / drawn-horizon Hero-only 标注 / Warm editorial banner 措辞 clarify)
- Swiss Slot:`slot-examples/swiss-systematic-blue.slot.json` **v0.6**(R-85 Dithering colorFront 中性灰 #C8CACE)
- Festive Royal Slot:`slot-examples/festive-royal-crimson.slot.json` **v0.3**(R-94 Stage 6:dividers 加 golden_hairline 字段;_comment TasselDivider 引用删;R-93 B1 chart_ramp per-step H 保留)
- Festive Editorial Slot:`slot-examples/festive-editorial-crimson.slot.json` **v0.2**(R-93 B2:weight_ceiling 800→500 + emphasis_tier bold→regular)
- **6 Design Prompt latest**(R-94 Stage 6 三方 Sync + R-95 Cluster A trim 后):
  - Warm:`Warm Restraint Tech/warm-restraint-tech-Design-Prompt-v1.0.2.md` **668 行**(超 48 但 R-95 不修)
  - Theatre:`Theatre Dark/Design-Prompt_Theatre-Dark-v6.7.2_Data-Campaign-Report.md` **616 行**(超 16 但 R-95 不修)
  - Cool:`Cool Precision Tech/Design-Prompt_Cool-Precision-Tech-v0.5.2_Data-Campaign-Report.md` **640 行**(超 40 但 R-95 不修)
  - Swiss:`Swiss International Minimal/swiss-systematic-blue-Design-Prompt-v0.8.md` **604 行**(R-95 trim,manual_override 直接改产物)
  - Festive Royal:`Festive Royal Crimson/festive-royal-crimson-Design-Prompt-v0.3.md` **611 行**(R-95 trim,manual_override 直接改产物)
  - Festive Editorial:`Festive Editorial Crimson/festive-editorial-crimson-Design-Prompt-v0.3.md` **620 行**(R-95 trim,manual_override 直接改产物;⚠️ R-95 #41 预存 template weight 800↔500 + END 提及 mismatch,R-96 待修)
- HTML:`_Framework/design-system-renderer/index.html` **v5.14**(R-94 Stage 6:festive-royal inline DATA golden_hairline 字段同步 + _comment 更新;R-93 A/B 改动累计 v5.13 保留)
- **Vite 项目**:`_Framework/design-system-renderer-vite/` **Stage 1-7 全部 ✓**(R-94 完成):
  - 3 views:src/views/design-system/ × 7 + src/views/report-example/ × 14 + src/views/design-prompt/ × 2
  - 6 风格 src/data/*.slot.json(festive-royal **已 sync golden_hairline 字段** Stage 7 Cowork 补)
  - 6 风格 src/data/prompts/*.md(latest version,Stage 5 cp)
  - Stage 4 D4 container queries:`.report-frame { container-type: inline-size; container-name: report }` + 8 `@container report (max-width: 700-800px)`
  - dev server localhost:5173 HTTP 200 ✓ / production build 0 TS error / 1.6MB bundle(@pierre/diffs 全 Shiki packs;R-95 可减重)
- Slop Taxonomy:`Slop Taxonomy(...).md` v0.2(R-81 + R-82 detectors)
- R-85 visual verify 截图:`_Framework/visual-test-screenshots/r-85/` (12 + 4 zoom = 16 张 PNG 覆盖 4 风格 × hero/timeline/outro)

(此段在每次 Round 完成时由 Cowork 同步更新)
