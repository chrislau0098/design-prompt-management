---
type: anti-slop-taxonomy
project: Vibe view
phase: 2 · 多风格扩充 · P1 第三步
created: 2026-05-15
purpose: 结构化 anti-slop 测试分类法。每套新 STYLE 用强模型(后续 doubao)生成页面后的验证 gate。跨风格通用,放 _Framework/。
evidence: impeccable.style/slop（37 条目录）+ 3 个 Design Skill + v6.5.8 §9/§16 + 项目 30+ 轮迭代沉淀
---

# Slop Taxonomy —— Anti-Slop 验证 gate

> 每套新 STYLE 的 Design Prompt 产出页面后(先 codex 强模型隔离"Prompt 好不好",再切 doubao 隔离"弱模型能否 follow"),用本分类法做验证 gate。0 Blocking = pass。

---

## 1. 定位与三个正交失败模式

本分类法是一个**可应用到任意 STYLE 产物的结构化测试工具** —— 不是某套风格的 don't 清单。一个页面会从三个**正交**的角度失败:

| Part | 问题 | 性质 |
|---|---|---|
| **A · 通用 Slop** | "它是不是一眼可辨的 AI 生成货?" | 固定目录,风格/场景无关 |
| **B · 战报 PATTERN Slop** | "它执行的是不是战报这个 pattern?(还是漂成了 dashboard / 营销落地页)" | 固定目录,战报所有风格通用 |
| **C · STYLE 保真度** | "它有没有忠实执行它自己声明的那套 STYLE?(还是漂回了通用默认值)" | 风格条件性,per-style 派生 |

三者互补:一个页面可以"不是通用 AI slop"(过 A)但"执行错了 pattern"(挂 B);也可以 A、B 都过却"不忠实于自己的 STYLE"(挂 C)。

**与现有材料的关系**:v6.5.8 §9/§16 是 Theatre-Dark **单风格内建**的 don't(预防);本分类法是**跨风格外部测试工具**(事后验证)。互补不重复。Part A 直接复用 impeccable.style/slop 的目录与 detector;3 个 Design Skill 是执行 LLM critique 的"手",本分类法是它们 critique 时的 rubric。

> **结构说明(Cowork 标注)**:骨架对齐时 Part A 提的是 5 类(配色/装饰/排版/文案/层级)。用 impeccable 完整 37 条目录做 evidence 落地时发现装不下 —— 7 条布局/空间 + 2 条动效无处归,「层级」又与「排版」深度耦合。据证据微调为 **6 类**:`层级` 并入 `排版与层级`,新增 `布局与空间` 和 `动效`。Part B / Part C 维持骨架不变。

---

## 2. 怎么用(gate 流程)

1. **Part A 自动层**:impeccable 的 deterministic detector(`npx impeccable detect` 或浏览器扩展)覆盖约 25 条 —— 直接跑,零成本。
2. **Part A LLM 层 + Part B + Part C**:走 LLM critique pass —— 3 个 Design Skill + impeccable critique,拿本分类法当 rubric。
3. **判定**:**0 Blocking = pass**。Warning 记录不阻断;Warning 累积过多(经验阈值 > 5)触发复审。
4. **ground truth**:Part C 的"STYLE 声明"来自该风格的 Design Prompt + `Design Prompt 三层归属标注` 文档(标出哪些 §是 STYLE 层);Part A/B 是固定目录。

每个条目四栏:**slop tell(怎么认)/ why(为什么是 slop)/ how to check(怎么查)/ severity(Blocking 必修 · Warning 提示)**。

---

## 3. Part A · 通用 Slop 目录

固定,风格/场景无关,命中即问题。源:impeccable.style/slop 37 条。

### A1 · 配色与对比

| slop tell | why | how to check | severity |
|---|---|---|---|
| AI 调色板:紫/violet 渐变、cyan-on-dark | AI 生成 UI 最易识别的 tell | detect 自动 | Blocking |
| 深色底 + 彩色 box-shadow 辉光 | cyberpunk-by-default 的偷懒"酷" | detect 自动 | Blocking |
| 渐变文字 | 装饰性、杀可读性,heading / 数字尤甚 | detect 自动 | Blocking |
| 灰字压彩色底 | washed out、难读 | detect 自动 | Warning |
| 纯黑 `#000000` 底 | 自然界不存在,生硬;应朝品牌 hue 微调 | detect 自动 | Warning |
| 低对比文字(< WCAG AA 4.5:1) | 可读性失败 | detect 自动 | Warning |

### A2 · 材质与视觉细节

| slop tell | why | how to check | severity |
|---|---|---|---|
| 圆角卡片单侧粗色边(side-tab accent border) | AI 生成 UI 最易识别的 tell | detect 自动 | Blocking |
| 圆角元素上的强调粗边 | 边框与圆角互相打架 | detect 自动 | Blocking |
| Glassmorphism(blur / glass card / glow 边)当装饰 | 装饰用途,而非解决真实分层问题 | LLM critique | Blocking |
| 通用圆角矩形 + 通用 drop shadow | 最安全最易忘的形状,任何 AI 都能产 | LLM critique | Blocking |
| 嵌套卡片(card in card in card) | 视觉噪音 + 过度深度 | detect 自动 | Blocking |
| **填色卡片再加描边(filled + bordered 双重)** | **fill 已经撑出 panel,border 是重复信息 + 廉价感(Chris Round-81 反馈)— 选一个,fill OR border,不能都要** | grep `bg-surface-l[23].*border\|border.*bg-surface-l[23]` 共现 | **Blocking** |
| **粗 / 深色 border 用在 card edges** | **`1px solid var(--foreground)` 类粗线 / 深饱和 border 压制 panel,读感"廉价"(Chris Round-82 反馈)— 粗线 / 深色线只用于 `<hr>` / chapter divider / section break,card border 留 `var(--border)` whisper-thin (≤ 12% alpha)** | grep card-level selector 内 `border.*var\(--foreground\)` 或 `border-[2-9]px` 共存 | **Blocking** |
| 万物套卡片 | 不是每块内容都需要 bordered container | LLM critique | Warning |
| Sparkline 当装饰 | 看着精致但无信息量 | LLM critique | Warning |
| Drop shadow 当设计元素 | 阴影 = 笨重默认;深度应靠 linework / 表面对比 / 结构光(Chris Round-45) | LLM critique | Blocking |
| 整页卡片占主导(> 1 节以卡片为容器) | 卡片只是 grouped evidence 的小容器,不是页面骨架(Chris Round-45) | LLM critique | Warning |

### A3 · 排版与层级

| slop tell | why | how to check | severity |
|---|---|---|---|
| 扁平字号层级(相邻级差 < 1.25) | 无清晰视觉层级 | detect 自动 | Blocking |
| 图标 tile 叠在标题上方(rounded-square icon container) | 万能 AI feature-card 模板,每个生成器都吐这形状 | detect 自动 | Blocking |
| 巨型图标(icon container 大于它引导的内容) | 装饰大于信息,优先级倒置 | LLM critique | Blocking |
| 过度使用的字体(Inter / Roboto / Geist / Plus Jakarta / Space Grotesk) | 用得太滥失去辨识度 —— 注:v6.5.8 用 Geist,在此名单内;STYLE 选字需有意识、能说出理由 | detect 自动 | Warning |
| 全页单一字体 | 无层级、无个性 | detect 自动 | Warning |
| Monospace 当"技术感"速记 | 偷懒的刻板印象 | LLM critique | Warning |
| 正文全大写 / justified / 字号 < 12px / 行高 < 1.3 / 字间距 > 0.05em | 一组排版可读性失败 | detect 自动 | Warning |
| 跳级标题(h1→h3) | 破坏文档大纲与屏幕阅读器导航 | detect 自动 | Warning |
| 标题 / Display 过粗(weight ≥ 700 / Black / Heavy) | 笨重感,失精密 —— 显示用 Medium(500) 起,Semibold(600) 仅留给指标值与 marker 数字(Chris Round-45) | detect 自动 | Blocking |
| 任何文字 < 10px | 10px 是绝对地板;阅读必读文字 ≥ 14px(见 §8 a11y)(Chris Round-45) | detect 自动 | Blocking |

### A4 · 布局与空间

| slop tell | why | how to check | severity |
|---|---|---|---|
| 万物居中 | 每个文本都 center;左对齐 + 非对称更有设计感 | detect 自动 | Blocking |
| Hero metric 模板(大数字 + 小标签 + 三个支撑 stat + 渐变强调) | 到处用、无人信(关联 B2) | LLM critique | Blocking |
| 相同卡片网格(icon + heading + text 无限重复) | 默认 AI 首页布局(关联 B1) | LLM critique | Blocking |
| 单调间距(同一间距值用到处) | 无节奏,关联项不收紧、分区不拉开 | detect 自动 | Warning |
| 行长过长(> ~80 字符) | 眼睛回扫丢失位置 | detect(browser) | Warning |
| 局促 padding(容器内边距 < 8px) | 文字贴边 | detect(browser) | Warning |

### A5 · 动效

| slop tell | why | how to check | severity |
|---|---|---|---|
| Bounce / elastic 缓动 | 过时、廉价感;真实物体平滑减速 | detect 自动 | Blocking |
| 动 CSS 布局属性(width / height / padding / margin) | layout thrash + 卡顿 | detect 自动 | Blocking |

### A6 · 文案与交互

| slop tell | why | how to check | severity |
|---|---|---|---|
| 冗余信息(intro 重述 heading / label 重复 page title / card 回声自己的 caption) | 每个词要 earn its place | LLM critique | Warning |
| 冗余 UX 文案(label + sublabel + helper + hint 说同一件事) | 说一次,说好 | LLM critique | Warning |
| 每个按钮都是 primary button | 无主次(战报理想态无按钮 —— 见 B3) | LLM critique | Warning |

> **不纳入 gate 的 impeccable 条目**:`reaching for modals by reflex`、`amputating features on mobile`、`defaulting to dark mode for safety` —— 战报无 modal、无可砍功能、mode 是 STYLE 刻意选择(非"为安全退缩")。这 3 条不适用本场景。

---

## 4. Part B · 战报 PATTERN Slop

固定,战报所有风格通用。命中说明产物执行的不是"战报"这个 pattern。源:v6.5.8 §16 + 项目迭代沉淀。

| 编号 | slop tell | why | how to check | severity |
|---|---|---|---|---|
| **B1 Dashboard 漂移** | KPI 磁贴网格 / 3 列等宽指标卡 / 一屏并列多个竞争焦点数字 | 战报是叙事不是 dashboard —— 一屏一个数据故事,一节一个焦点 | LLM critique | Blocking |
| **B2 Hero 陈词** | 居中 eyebrow + 大数字 + pill badge + 段落(+ CTA)的通用 SaaS hero | 战报 Hero 的数字要与结构元素(crop / 光锥 / 舞台面 / offset frame)交互,不是裸大数字 | LLM critique | Blocking |
| **B3 CTA 入侵** | 任何 action button / "查看更多·查看详情·查看完整" / 链接伪装成按钮 / dashboard 动词(track / monitor / drill down / explore) / 营销动词(unlock / discover / supercharge / transform) | 战报是只读叙事物,不是可操作界面 | detect(button 元素)+ LLM critique(动词) | Blocking |
| **B4 规划标签泄漏** | archetype 名(Hero Monolith / Proportion Field / Ranking / Outro Reverent 等)出现在可见 UI 文案 | 那是内部规划标签;可见 label 应来自 topic / period / data role / 业务含义 | grep 文本 + LLM critique | Blocking |
| **B5 结构单调** | 连续两节同 archetype / 每节同款 `y + opacity` 入场 / 每章同款圆形 stamp | 战报靠 archetype 交替 + 每节一个语义化焦点动效建立节奏 | LLM critique | Blocking |

---

## 5. Part C · STYLE 保真度检查

风格条件性 —— 不是固定清单,是个**流程**:对受测 STYLE,逐 STYLE-层维度查产物是否忠实执行其 Design Prompt 声明。**这是弱模型最大的 slop 来源**(忽略 STYLE spec,漂回通用 Tailwind 默认值)。

判定哪些 §属 STYLE 层 → 见 `_Framework/Design Prompt 三层归属标注` 文档。ground truth = 该风格的真实参考图 + Design Prompt 声明,**不是**生成页自己。

| 编号 | 检查 | how to check | severity |
|---|---|---|---|
| **C1 配色保真** | 产物用的是该 STYLE 的 OKLCH token / `var(--brand-hue)` recipe,还是漂回通用 Tailwind 调色板(`bg-blue-500` / `text-slate-*` 等) | grep className / style 是否出现非 token 颜色 | Blocking |
| **C2 圆角与材质保真** | 圆角值、border、阴影、panel 逻辑是否在该 STYLE §5 声明范围内 | grep `rounded-*` 是否越界;查 material logic 是否 per-archetype 区分 | Blocking |
| **C3 字体保真** | 字体栈、字号阶梯、weight 是否来自该 STYLE §3 | grep `font-family` / `text-[*]` 对照 type scale | Blocking |
| **C4 动效保真** | EASE 数组、timing 是否来自该 STYLE §6;滚动入场用 `whileInView`;一节一个焦点动效 | grep `transition` / `ease` / `whileInView` | Blocking |
| **C5 Shader 保真** | Hero 用该 STYLE 选定的 paper-shader,参数在声明范围;不是占位、不是换了别的 shader | grep shader import + props | Blocking |

---

## 6. Gate 判定

- **pass = 0 Blocking**。
- Warning 记录但不阻断;单次产物 Warning > 5 触发复审(可能 STYLE spec 本身有歧义)。
- Part A 自动层(impeccable detector)与 LLM 层分开记;LLM 层由 3 个 Design Skill + impeccable critique 跑。
- 报告格式建议:`Part A: N blocking / M warning`、`Part B: N blocking`、`Part C: N blocking` + 逐条 evidence(截图标注 / grep 命中行)。
- gate 不过 → 回 Generator-Evaluator-Decision 三角:CC 出 evidence → Cowork 起 patch CC-Prompt → 重生成。

---

## 7. 维护

- 本分类法跨风格通用,随 impeccable 目录更新 + 项目迭代沉淀演进。
- impeccable 当前 37 条(25 deterministic + 12 LLM);版本变化时同步 Part A。
- Part B 随战报 PATTERN 演进(目前 PATTERN 冻结,Part B 稳定)。
- Part C 的维度跟随 STYLE 层定义(三层归属标注文档)。
