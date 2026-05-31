# CC-Prompt · doubao Generation Test · default v1.1 · Round-8 · 复杂 Query

你是 **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (你): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates evidence into Design Prompt v1.2 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

**Round-8 主目标:复杂用户 Query 下 default v1.1 稳定性测试**

Round-1 ~ Round-7 测的是 8 个常规风格 routing Query (主色 + 模式 + 风格关键词)。Round-8 全面更换为 **8 个复杂业务场景 Query**,覆盖以下复杂维度,逼出 default v1.1 在 nuance routing / 信息层级 / 负面叙事 / 反 Hero / long-form 节奏下的鲁棒性:

| Q | 复杂维度 |
|---|---|
| Q1 | 多 audience 双视角 + 信息层级(CEO + 一线销售同页) |
| Q2 | 负面归因 + 诚恳复盘(未达标,不文过饰非) |
| Q3 | 品牌故事优先 + 数据降级(品牌叙事主导,数据让位) |
| Q4 | 用户证言串数据(质化骨架,数据嵌入) |
| Q5 | 行业对比 + 虚拟竞品(对比矩阵 / 雷达 / 排名) |
| Q6 | 趋势线 Hero + 反大数字 Hero(24 个月曲线主导) |
| Q7 | 国际化 + 美式 tone + USD + 英文化(纯英文 query) |
| Q8 | Long-form letter 节奏 + 反 Dashboard(Stripe Annual Letter 风格) |

Round-8 duties:
1. **Verify default v1.1 + R-125 V11-P0-1 (Hero wrapper min-h-full) 在复杂 layout 下生效** — Hero section 撑 min-h-[Xvh] 时,内容**不再贴顶 1/3**, 应 vertically aligned per align-items rule
2. **Verify v1.0 R-124 4 处 patches 在复杂 Query 下全 carry**(V10-P0-1A/1B/2A/2B)
3. **Verify v0.9 14 处 patches 全 carry**(V09-P0-A/B/1/2/3/4 + V09-P1-5/6/7)
4. **Confirm AnimateNumber zone 0 改 invariant**(R-120 + R-123 + R-124 三重锁定)
5. **Detect 复杂 Query 暴露的新 Stable Failures**(≥ 2/8 attempts 同症状)
6. **Stress-test default routing** — 复杂 Query 没有明显单一风格信号时,default 内部 STYLE_PRESETS 是否合理切换

⚠️ **Chris 红线 carry**: v1.1 (and future v*) must NOT contain `import` statements, package paths, build tool commands, framework names. Route engineering-side issues to AGENT.md.

⚠️ **R-120 + R-123 + R-124 AnimateNumber 不动 三重 carry**: §4 line ~189 / §7 line ~271-293 / §17 line ~568-591 整段三轮明确锁死. 若 Round-8 出现 AnimateNumber regression, **不要 propose 改 AN 段**, flag 为 doubao 自身波动.

⚠️ **R-126 description 字段不参与 doubao 生成** — frontmatter line 3 是 routing 元数据, 测试时 doubao 看的是主体 prompt 内容. Round-8 仅测主体.

---

## Prerequisites (verify before starting)

### A 线 · Design Prompt v1.1
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md` exists, **631 lines** (v1.0 baseline 631; R-125 patch 行内追加,R-126 仅 frontmatter line 3 改写,行数净 0).

### B 线 · Sandbox env (unchanged)
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-7 baseline + cumulative regression
Read once:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.10_Round-7.md` (primary baseline — v1.0 production verdict)

If any prerequisite fails, stop & hand back to Cowork.

---

## Round-8 specifics

- **Design Prompt under test**: default v1.1 (frozen, 631 lines; R-125 1 处 行内追加 over v1.0 + R-126 frontmatter line 3 description 重写)
- **N attempts**: 1 per Query × 8 Queries = 8 generations
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — **identical to Round-7**, 8 Queries 的复杂业务叙事在此 mock 数据上叠加
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v1.1-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.1_Round-8.md`

Round-8 holds Bitable mock + sandbox env constant vs Round-7. ONLY variables: (a) Design Prompt v0.10 → v1.1, (b) **8 Queries 全换新复杂场景**.

---

## What changed v1.0 → v1.1 (R-125 patch summary)

**1 处 change (Opus 4.6, micro patch, 行内追加, 行数净 0)**:

| # | Line | Type | v1.0 → v1.1 essence |
|---|------|------|---------------------|
| **V11-P0-1** | §14.1 line 452 末尾 | **Hero section min-h + wrapper height invariant** | 追加 1 句: 当 Hero `<section>` 用 `min-h-[Xvh]` / `min-h-screen` 时, grid root + intermediate wrappers MUST 满足 `min-height: 100%` (Tailwind `min-h-full`). 否则 grid 容器只占 natural content height, `align-items: end` 把内容贴在 wrapper natural bottom = section 上 1/3, 下 2/3 空白 shader. Section 的 `min-h` 是 layout floor, intermediate wrappers 必须 propagate 这个 floor. |

---

## Pre-test red-line verify (mandatory before generating)

```bash
V11="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md"

echo "--- must-exist (each ≥1 hit) — baseline carryover ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V11" || echo 0)"
done

echo "--- R-125 V11-P0-1 SHOULD-APPEAR (each ≥1) ---"
for p in 'min-height: 100%' 'min-h-full' 'intermediate wrapper' "section's upper 1/3" 'propagate that floor'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -c "$p" "$V11" || echo 0)"
done

echo "--- §14.1 既有 R-124 + R-125 规则保留(each ≥1)---"
for p in 'Default style Hero composition' 'CSS grid' 'align-items: end' 'grid HARD GATE applies to default style' 'Two paths, prioritized' 'Primary path' 'Fallback only when' 'unnecessary panel chrome' 'L < 0.20' 'darkest entries' 'Hero Display Number size' 'Wrapper className delegation'; do
  printf "%-45s : %s hits\n" "$p" "$(grep -c "$p" "$V11" || echo 0)"
done

echo "--- v0.9 9 处 patch 标记 still present (each ≥1) ---"
for p in 'space-separated' 'hue/chroma anchor' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'enumerated negative examples' 'rounded surface panel'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -c "$p" "$V11" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V11" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V11" || echo 0)"
done

echo "--- framer-motion 上下文 verify (2 hits, FORBIDDEN/Don't context) ---"
grep -n 'framer-motion' "$V11"

echo "--- AnimateNumber zone content sentinel (each MUST exist) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'Hero shader speed.*read at each' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "%-65s : %s hits\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V11" || echo 0)"
done

echo "--- clamp 残留 verify (only rule context allowed) ---"
grep -nE "clamp\(" "$V11"
```

Expect: must-exist 22 ≥1; R-125 V11-P0-1 SHOULD-APPEAR 5 ≥1; §14.1 既有规则 12 ≥1; v0.9 9 处 patch markers 全 ≥1; forbidden all = 0; Chris red-line all = 0; framer-motion 2 hits in FORBIDDEN/Don't; AnimateNumber sentinels = 1; clamp hits 全在 rule context. If any fails, stop & flag.

---

## 8 复杂 User Queries (Round-8 重新设计 — 全部更换)

底层数据全部使用相同的华东大区 Q1销售业绩 KPI mock data (28 records)。复杂场景是 user query 的叙事叠加, 不改 mock 数据。

### Q1 · 多 audience 双视角 + 信息层级

```
我是华东大区销售总监,需要一份 Q1 销售业绩页面,但有两个 audience:
- 集团 CEO:关注总览数字、同比环比、3 大战略洞察
- 一线销售团队:关注城市级 KPI 排名、个人激励、TOP 销售故事
请在同一页面里清晰呈现两个视角的内容,中间过渡明确,
不要简单堆叠,要有信息层级和节奏切换.
底层数据用华东大区 Q1销售业绩.
主色 #6B8E23 茶绿,light 模式.
```

### Q2 · 负面归因 + 诚恳复盘 + 不文过饰非

```
华东大区 Q1 实际销售业绩未达年初定的目标(假设差距 -12%),
请生成一份诚恳的复盘页面,不要文过饰非,不要 corporate spin.
需要包含:
- 目标 vs 实际 gap 的明确呈现(不回避负数)
- 3 个核心阻力点的真实分析
- Q2 的 4 个改进动作 + Owner + 截止时间
底层数据用华东大区 Q1销售业绩.
主色 #7C2D12 酒红,light 模式.
```

### Q3 · 品牌故事优先 + 数据降级为支撑

```
我们是【茶语轩】一个有 38 年历史的茶饮品牌,Q1 销售数据需要呈现,
但比销售数字更重要的,是品牌故事和茶文化传承.
请把 Q1 数据作为品牌叙事的佐证,放在历史 / 工艺 / 茶人故事的语境里.
不要让数据 dashboard 主导整个页面.
底层数据用华东大区 Q1销售业绩.
主色 #854D0E 古铜金,light 模式.
```

### Q4 · 用户证言串数据 + 质化主导

```
华东大区 Q1 销售数据,加上我们做了 30 个客户访谈,
挑出 5 个有代表性的客户证言 + 数据点.
请用一个页面把数据(骨架)和证言(血肉)串起来,
不要数据归数据 / 证言归证言两个板块割裂,
要让每一个数据点都有客户的真实话语支撑.
底层数据用华东大区 Q1销售业绩.
主色 #DC2626 红,light 模式.
```

### Q5 · 行业对比 + 虚拟竞品数据

```
华东大区 Q1 销售业绩 vs 行业平均 vs Top 3 竞品(请合理虚拟竞品数据).
核心要回答:
- 我们在行业里处于什么位置
- 离 Top 1 还差什么
- 我们的差异化优势在哪
请用对比矩阵 / 雷达图 / 排名表呈现,让 viewer 一眼看到位置.
底层数据用华东大区 Q1销售业绩.
主色 #3B82F6 蓝,dark 模式.
```

### Q6 · 趋势线 Hero + 反大数字 Hero

```
华东大区 Q1 销售业绩,但 Hero 区域我不想用大数字 + AnimateNumber,
我希望 Hero 是一条 24 个月的销售趋势线(请合理虚拟过去 24 个月数据),
把 Q1 放在长期增长曲线的语境里看.
大数字可以放在第二屏,但 Hero 必须是趋势线.
底层数据用华东大区 Q1销售业绩.
主色 #0EA5E9 蓝,dark 模式.
```

### Q7 · 国际化 + 美式 tone + USD + 英文化

```
This Q1 sales data of East China region needs to be presented to our HQ in Silicon Valley.
They care about Margin / Retention / NPS / TAM, not GMV (China market habit).
Please adapt both the data perspective and the writing tone for an American audience:
- Use USD instead of CNY (assume 7.2 conversion rate)
- Use direct, no-fluff American business writing tone
- Skip the Chinese-style ceremonial intro
- Highlight Q1 milestones vs goals concisely
Source data: 华东大区 Q1销售业绩 (28 records).
Primary color #1F2937 charcoal, light mode.
```

### Q8 · Long-form letter 节奏 + 反 Dashboard

```
我不要传统的销售业绩 dashboard,我要一份像 Stripe Annual Letter 那样的长文档:
- 从一个具体的客户故事开始(请合理虚构一个)
- 数据穿插在叙事中,不是 KPI grid
- 有节奏地铺陈(背景 → 转折 → 数据 → 洞察 → 收尾)
- 结尾收在一个 founder voice 的洞察上
不堆数字 dashboard,要 long-form reading experience.
底层数据用华东大区 Q1销售业绩.
主色 #1E40AF 深蓝,light 模式.
```

---

## Round-8 expected outcomes (复杂 Query 维度)

### 头条:R-125 V11-P0-1 verdict

| # | Round-7 baseline | Round-8 expected |
|---|---|---|
| **V11-P0-1** Hero wrapper min-h-full | Round-7 没专门测;Chris 手动验证 v1.0 发现 Hero 100vh 内容贴顶 1/3 | **0/8 attempts 出现 Hero 内容贴顶 1/3**;Hero `<section>` 撑 min-h-[Xvh] 时,grid container 撑满 section height,内容 vertically aligned per align-items rule (≥ 95% Hero 视觉高度填充);源码 grep `<section[^>]*min-h-\[`>0 时,内部 wrapper `min-h-full` ≥1 |

### v1.0 R-124 4 处 patches 在复杂 Query 下 maintenance(must stay PASS)

| # | Round-7 PASS | Round-8 must keep |
|---|---|---|
| V10-P0-1A backplate 降级 fallback only | PASS (0/8 add backplate) | 0/8 |
| V10-P0-1B dark threshold L<0.20 + layout | PASS (8/8 dark Hero number bounded by darkest entries) | 8/8 |
| V10-P0-2A Hero size HARD inline mobile-first | PASS (8/8 inline mobile-first exact class) | 8/8(Q6 例外,Hero 用 trendline 不是 number) |
| V10-P0-2B wrapper className delegation | PASS (0/8 size silently default) | 0/8 |

### v0.9 14 处 patches maintenance(must stay PASS / EXCEEDED)

| # | Round-7 PASS | Round-8 must keep |
|---|---|---|
| V09-P0-A OKLCH syntax | PASS (0/8 oklch 逗号 fallback) | 0/8 |
| V09-P0-B+P0-1+B1 shader L invariant | PASS / PARTIAL | Same or improved |
| V09-P0-3+B3 F-2 + meta-`<span>` | PASS (≤ 5 hit) | ≤ 5 |
| V09-P0-2 Hero focal number readability | PASS (option b extreme L) | PASS(Q6 例外) |
| V09-P0-4+B4 chart ramp floor + 非负 chroma | PASS | Same |
| V09-P1-5+B2 dark primary-soft bg-only | PASS (0/8) | 0/8 |
| V09-P1-6 Hero image filter HARD | PASS (0/8) | 0/8 |
| V09-P1-7 Outro CTA + material | PASS (0/8 CTA text) | 0/8 |

### AnimateNumber 区域 0 改 invariant (R-120 + R-123 + R-124 三重 carry)

| # | Round-7 PASS | Round-8 must keep |
|---|---|---|
| AN-1 `tabular-nums` / `tnum 1` | 8/8 build-PASS maintained | ≥ 7/8(Q6 例外可降) |
| AN-2 `useReducedMotion()` AnimateNumber wrapper 顶 | 8/8 | ≥ 7/8 |
| AN-3 `parseDisplayValue` 或等价 | ≥ 5/8 | ≥ 4/8 |
| AN-4 `inline-flex items-baseline gap-1 whitespace-nowrap` | 8/8 | ≥ 7/8 |

### Round-8 NEW dimensions(复杂 Query 暴露的能力维度)

| # | Dimension | Round-8 期望 | Detection method |
|---|---|---|---|
| **D1** | Q1 多 audience 信息层级 | 双视角 section 在同页清晰分区, 中间有过渡 element (separator / chapter mark / section header), 不简单堆叠 | source grep `<section` count ≥ 3 + visual review |
| **D2** | Q2 负面叙事不文过饰非 | gap 数字明确呈现负号 / `text-red-*` / `<sup>` 等 negative 视觉信号; 不出现 "we did great" 等 spin 文案 | source grep `-[0-9]+%` / `落后` / `差距` + critic review |
| **D3** | Q3 品牌故事主导 | 品牌叙事段落 ≥ 2 段长文本 (`<p>` ≥ 60 chars), Hero 大数字弱化或品牌图章 / 文化符号占主; data dashboard 在第二屏 | source grep + visual screenshot |
| **D4** | Q4 数据 + 证言交织 | `<blockquote>` 或 `quote-style` `<p>` ≥ 3 处, 每处旁有具体数字; 不出现"数据归数据 / 证言归证言"两个独立板块 | source grep `<blockquote\|"-style\|className.*quote` ≥ 3 |
| **D5** | Q5 行业对比矩阵 | 出现 `<table>` 或 grid 形式的对比, columns 包含 "我们" / "行业" / "竞品" / "Top 1" 等; 有排名信号 (`#1`/`#2`/`Top` 等) | source grep `<table\|<tr\|ranking\|rank` + visual |
| **D6** | Q6 trendline Hero | Hero 区域出现 `<svg>` / `<LineChart>` / `<path>`(curve), 不是大数字 + AnimateNumber; 24 个月时间轴可见 | source grep Hero 内 `<LineChart\|<AreaChart\|<svg.*path` ≥ 1 + 大数字 AnimateNumber 在 Hero 区 = 0 |
| **D7** | Q7 国际化适配 | 所有文案 English; 数字单位 USD ($); 出现 NPS / Retention / Margin / TAM 等 英文术语; 无中文 corporate intro 句式 | source grep `\$[0-9]\|USD\|NPS\|Retention\|Margin\|TAM` ≥ 3 + 中文 char count ≤ 10 |
| **D8** | Q8 long-form letter | `<p>` 段数 ≥ 8; 单段 `<p>` 字数 ≥ 80 chars 的段数 ≥ 4; founder voice 第一人称 ("I" / "we") ≥ 3 处; 不出现 KPI grid 形式的数字堆叠 | source grep `<p>` count + `<dl>\|<dt>\|<dd>\|grid-cols-[34]` count = 0 |

### Cumulative regression (Round-1/2/3/4/5/6/7 wins)

| # | Win | Round-7 actual | Round-8 must keep |
|---|---|---|---|
| F-2 body color (subsumed V09-P0-3) | 0 | ≤ 5 |
| F-3 chart-hover OKLCH alpha | 0/8 hallucinate | 0/8 |
| S-1 framer-motion forbidden | 0/8 | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 | ≥ 7/8 |
| S-3 Q7 build+runtime | AGENT.md route; observe only | Same |
| C-4 AnimateNumber tnum DOM | 8/8 build-PASS | ≥ 7/8(Q6 例外) |
| C-6 dark Tooltip mode-explicit | PASS | Same |

---

## Step-by-step procedure (path swap v0.10 → v1.1; 8 Queries 全换; rest identical to Round-7)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v1.1) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from legacy generate-prompt.txt 同 Round-7}

=== USER QUERY ===
{Q<N> 的复杂 Query 文本}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v1.1-Q${N}-attempt-1"
  mkdir -p "default-v1.1-Q${N}-attempt-1"
  cp -R running-env/. "default-v1.1-Q${N}-attempt-1/"
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v1.1-Q${N}-attempt-1" 2>&1 | tee "default-v1.1-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.1-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-7 procedure unchanged. **Mandatory Hero region screenshot for ALL 8 Queries**:
- Q1-Q5, Q7, Q8: Hero 焦点数字 + section 整体高度 (V11-P0-1 verify)
- Q6: Hero trendline 区域(D6 verify)

dark-mode Queries (Q5, Q6) + BarChart-containing Queries hover Tooltip 截图。

### Step 6 · Playwright DOM extraction

`page.evaluate` script from Round-7 + Round-8 NEW additions. Save JSON to `reports/dom/Q${N}.json`.

**Round-8 NEW addition** — V11-P0-1 Hero wrapper height detection:

```javascript
// inside DOM script
const heroSection = document.querySelector('section[class*=min-h], section[class*=h-screen]')
const heroSectionH = heroSection ? heroSection.getBoundingClientRect().height : 0
const heroGrid = heroSection?.querySelector('[class*=grid], [style*=grid]')
const heroGridH = heroGrid ? heroGrid.getBoundingClientRect().height : 0
const heroFillRatio = heroSectionH > 0 ? heroGridH / heroSectionH : 0
const heroVerticalFillPass = heroFillRatio >= 0.92  // V11-P0-1 期望 ≥ 0.92

// Round-8 NEW · Hero content centering verify
const heroContent = heroSection?.querySelector('h1, [class*=focal-number], [class*=display-number]')
const heroContentTop = heroContent ? heroContent.getBoundingClientRect().top - heroSection.getBoundingClientRect().top : 0
const heroContentRelTop = heroSectionH > 0 ? heroContentTop / heroSectionH : 0
// 期望:align-items: end 时 heroContentRelTop > 0.4 (内容在 section 下半部); align-items: center 时 ~0.3-0.5; align-items: start 时 < 0.2
// Round-6/v1.0 bug: content top ratio ~0.1 (section 上 1/3) ← R-125 patch 修这个

// Add: heroSectionH, heroGridH, heroFillRatio, heroVerticalFillPass, heroContentRelTop

// Q6 special — Hero must contain trendline SVG, not large number
const q6HeroSvg = heroSection?.querySelector('svg, [class*=recharts]')
const q6HeroLargeNumber = heroSection?.querySelector('[class*=focal-number], [class*=display-number]')
const q6HeroNumberSize = q6HeroLargeNumber ? parseInt(getComputedStyle(q6HeroLargeNumber).fontSize) : 0
// Q6 期望:q6HeroSvg !== null (trendline 存在) && q6HeroNumberSize < 80 (or absent — 不是 200px Hero number)
```

### Step 6.5 · Round-8 source grep (CRITICAL — 复杂 Query 维度)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v1.1-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v1.1 patch + 复杂 Query 维度 verification ==="

# V11-P0-1 · Hero wrapper height verify
HERO_MIN_H_SECTION=$(grep -cE "<section[^>]*min-h-\[" "$APP" || echo 0)
HERO_MIN_H_FULL_WRAPPER=$(grep -cE "min-h-full|min-height:\s*100%" "$APP" || echo 0)
echo "V11-P0-1 · Hero section min-h-[Xvh]: $HERO_MIN_H_SECTION"
echo "V11-P0-1 · Inner wrapper min-h-full: $HERO_MIN_H_FULL_WRAPPER (期望 ≥ 1 当 section 有 min-h)"

# V10 R-124 patches carry verify (4 项)
HERO_BACKPLATE=$(grep -cE "<div[^>]*backgroundColor.*var\(--surface-l[12]\)[^>]*>[^<]*<.*[Ff]ocal[Nn]umber|<div[^>]*inline-flex[^>]*backgroundColor.*var\(--surface-l[12]\).*<.*[HhFf]ero" "$APP" || echo 0)
HERO_INLINE_SIZE=$(grep -cE "className=['\"][^'\"]*text-\[[0-9]+px\][^'\"]*['\"]|style.*fontSize.*['\"]?[0-9]+px" "$APP" || echo 0)
HERO_CLAMP=$(grep -cE "className=['\"][^'\"]*clamp\(|style.*fontSize.*clamp\(" "$APP" || echo 0)
HERO_MOBILE_FIRST=$(grep -cE "text-\[[0-9]+px\] md:text-\[[0-9]+px\]" "$APP" || echo 0)
echo "V10-P0-1A · Hero backplate (regex): $HERO_BACKPLATE (期望 0)"
echo "V10-P0-2A · Hero inline font-size: $HERO_INLINE_SIZE"
echo "V10-P0-2A · clamp() in Hero size: $HERO_CLAMP (期望 0)"
echo "V10-P0-2A · Mobile-first size: $HERO_MOBILE_FIRST"

# v0.9 14 处 patches maintenance verify (sampled)
OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
PRIMARY_SOFT_AS_TEXT=$(grep -cE "color:\s*['\"]?var\(--primary-soft\)" "$APP" || echo 0)
NEGATIVE_CHROMA=$(grep -cE "oklch\([^)]*-[0-9]+\.[0-9]+" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
echo "V09-P0-A OKLCH comma residual: $OKLCH_COMMA (期望 0)"
echo "V09-P0-3 F-2 <p> fg-2/3 inline: $BODY_FG2_INLINE (期望 ≤ 1)"
echo "V09-P1-5 primary-soft as text: $PRIMARY_SOFT_AS_TEXT (期望 0)"
echo "V09-P0-4 negative chroma OKLCH: $NEGATIVE_CHROMA (期望 0)"
echo "V09-P1-6 img filter fn calls: $IMG_FILTER_FN (期望 0)"

# AnimateNumber zone invariant (R-120 + R-123 + R-124 三重 carry)
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
USE_REDUCED=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "AN-1 tabular-nums: $TNUM"
echo "AN-2 AnimateNumber instances: $ANIM_NUM"
echo "AN-3 useReducedMotion: $USE_REDUCED"

# === Round-8 NEW · 复杂 Query 维度 ===

# D1 (Q1) · 多 audience 信息层级 → section count + section header
SECTION_COUNT=$(grep -cE "<section" "$APP" || echo 0)
SECTION_HEADER=$(grep -cE "<h2|<h3" "$APP" || echo 0)
echo "D1 · section count: $SECTION_COUNT (Q1 期望 ≥ 3)"
echo "D1 · h2/h3 count: $SECTION_HEADER (Q1 期望 ≥ 3)"

# D2 (Q2) · 负面叙事 → negative signal
NEG_NUM=$(grep -cE "-1[0-9]%|-2[0-9]%|落后|差距|未达|gap" "$APP" || echo 0)
SPIN=$(grep -cE "outstanding|exceeded|great success|表现亮眼|稳健增长" "$APP" || echo 0)
echo "D2 · negative signal: $NEG_NUM (Q2 期望 ≥ 2)"
echo "D2 · corporate spin: $SPIN (Q2 期望 0)"

# D3 (Q3) · 品牌故事主导 → long paragraph
LONG_P=$(grep -cE "<p[^>]*>.{60,}</p>" "$APP" || echo 0)
echo "D3 · <p> with text ≥ 60 chars: $LONG_P (Q3 期望 ≥ 2)"

# D4 (Q4) · 数据 + 证言交织 → blockquote
BLOCKQUOTE=$(grep -cE "<blockquote|className=['\"][^'\"]*quote|className=['\"][^'\"]*testimonial" "$APP" || echo 0)
echo "D4 · blockquote/quote: $BLOCKQUOTE (Q4 期望 ≥ 3)"

# D5 (Q5) · 行业对比 → table / ranking
TABLE_OR_RANK=$(grep -cE "<table|<tr|ranking|rank|#1|#2|Top.?1|Top.?3" "$APP" || echo 0)
echo "D5 · table/ranking signal: $TABLE_OR_RANK (Q5 期望 ≥ 2)"

# D6 (Q6) · trendline Hero, 反大数字 → SVG/LineChart in Hero + Hero number size
HERO_TRENDLINE=$(grep -cE "<LineChart|<AreaChart|<svg[^>]*path|<path d=" "$APP" || echo 0)
echo "D6 · trendline SVG: $HERO_TRENDLINE (Q6 期望 ≥ 1)"

# D7 (Q7) · 国际化 → USD / English terms
USD_SIGN=$(grep -cE "\\\$[0-9]|USD|NPS|Retention|Margin|TAM|ARR|MRR" "$APP" || echo 0)
CHINESE_CHAR=$(grep -oE "[\xe4-\xe9][\x80-\xbf][\x80-\xbf]" "$APP" 2>/dev/null | wc -l | tr -d ' ' || echo 0)
echo "D7 · USD/English terms: $USD_SIGN (Q7 期望 ≥ 3)"
echo "D7 · Chinese char count: $CHINESE_CHAR (Q7 期望 ≤ 10)"

# D8 (Q8) · long-form letter → p count + word density
P_COUNT=$(grep -cE "<p" "$APP" || echo 0)
KPI_GRID=$(grep -cE "grid-cols-[34]|grid grid-cols-3|grid grid-cols-4" "$APP" || echo 0)
echo "D8 · <p> count: $P_COUNT (Q8 期望 ≥ 8)"
echo "D8 · KPI grid usage: $KPI_GRID (Q8 期望 ≤ 1)"

# Regression carry
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "Regression framer-motion: $FM (期望 0)"
echo "Regression wildcard ui: $WILDCARD (期望 0)"
```

### Step 7 · Design Skill 评分

Round-7 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

Round-8 NEW evaluation prompt addendum (per Q):
- Q1: 评分 信息层级 + section 过渡 + 双 audience 切换
- Q2: 评分 诚恳度 + 不文过饰非 + 改进动作具体性
- Q3: 评分 品牌叙事主导 + 数据让位
- Q4: 评分 数据 + 证言 交织节奏
- Q5: 评分 对比清晰度 + 排名易读性
- Q6: 评分 trendline Hero 视觉强度 + 反 Hero 数字纪律
- Q7: 评分 美式 tone 纯度 + USD 转换准确
- Q8: 评分 long-form 阅读节奏 + 反 dashboard 纪律

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.1_Round-8.md`

### 10 headline sections

#### 1. Round-7 → Round-8 patch verdict (HEADLINE)

| # | Patch | Round-7 baseline | Round-8 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| V11-P0-1 | Hero wrapper min-h-full | 没专门测,Chris 手动验证 v1.0 发现内容贴顶 1/3 | <N>/8 Hero 内容 vertically aligned per align-rule | PASS/FAIL/PARTIAL | source grep + DOM heroFillRatio + Hero screenshot |

Headline: "V11-P0-1 R-125 patch <PASS/PARTIAL/FAIL>"

#### 2. v1.0 R-124 4 处 patches maintenance verify(must stay PASS)

(table 8 项, 每项 Round-7 PASS → Round-8 status)

#### 3. v0.9 14 处 patches maintenance verify(must stay PASS / EXCEEDED)

(table 8 项)

#### 4. AnimateNumber 区域 0 改 invariant (R-120 + R-123 + R-124 三重 carry)

#### 5. Round-8 NEW · 复杂 Query 维度 verdict(D1-D8)

| # | Dimension | Q | Expected | Actual | Verdict |
|---|---|---|---|---|---|
| D1 | 多 audience 信息层级 | Q1 | section ≥ 3, header ≥ 3 | <N>, <M> | PASS/PARTIAL/FAIL |
| D2 | 负面叙事不文过饰非 | Q2 | neg signal ≥ 2, spin = 0 | <N>, <M> | PASS/PARTIAL/FAIL |
| D3 | 品牌故事主导 | Q3 | long-p ≥ 2 | <N> | PASS/PARTIAL/FAIL |
| D4 | 数据 + 证言交织 | Q4 | blockquote ≥ 3 | <N> | PASS/PARTIAL/FAIL |
| D5 | 行业对比矩阵 | Q5 | table/rank ≥ 2 | <N> | PASS/PARTIAL/FAIL |
| D6 | trendline Hero | Q6 | trendline SVG ≥ 1 + 大数字弱化 | <N> | PASS/PARTIAL/FAIL |
| D7 | 国际化美式 tone | Q7 | USD ≥ 3, 中文 ≤ 10 | <N>, <M> | PASS/PARTIAL/FAIL |
| D8 | long-form letter | Q8 | <p> ≥ 8, KPI grid ≤ 1 | <N>, <M> | PASS/PARTIAL/FAIL |

Headline: "Round-8 NEW D1-D8: <X>/8 PASS · <Y> PARTIAL · <Z> FAIL"

#### 6. Cumulative regression check (Round-1/2/3/4/5/6/7 wins)

#### 7. Per-Query summary (Build | 综合 R7 → R8)

#### 8. New Stable Failures (≥ 2/8 in Round-8)

#### 9. Top patch suggestions for Cowork v1.2 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored)

⚠️ R-124 carry: do NOT propose changes to AnimateNumber 区段(§4 line ~189 / §7 line ~271-293 / §17 line ~568-591). Chris triple-locked.

#### 10. Convergence assessment

- **若 V11-P0-1 PASS + 8/8 v1.0/v0.9 patches carry + 0 new SF + AN invariant kept + ≥ 6/8 NEW D1-D8 PASS**: **v1.1 锁定 production-ready, R-125 closes, v1.1 仍 STRONG v1.0 stable baseline 替代候选**
- **若 V11-P0-1 PASS + ≤ 2 new SF + ≥ 4/8 NEW D1-D8 PASS**: 小 follow-up R-128 / v1.2
- **若 V11-P0-1 FAIL 或 多 new SF**: substantive patch round

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-8-app-tsx" "$DST/Round-8-screenshots" "$DST/Round-8-critic" "$DST/Round-8-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.1-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-8-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip hero-region; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-8-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.1-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-8-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-8-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v1.1_Round-8.md"

echo "--- Round-8 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-8-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-8-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-8-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-8-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v1.1_Round-8.md" ] && echo present || echo MISSING)"
```

Expected: ~70-80 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v1.1 631 行 + B sandbox + C Round-7 report)
- [ ] Pre-test red-line: 22 must-exist ≥1 + 5 R-125 V11-P0-1 markers ≥1 + 12 §14.1 既有规则 ≥1 + 9 v0.9 patch markers ≥1 + 9 forbidden = 0 + 7 engineering red-line = 0 + AnimateNumber 7 sentinels = 1 + clamp 全 rule context
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] 8 复杂 Queries generate-prompt.txt 各独立 (Q1-Q8 全部新场景)
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM (含 Round-8 NEW heroFillRatio + heroContentRelTop + Q6 trendline) + Step 6.5 source-grep (含 Round-8 NEW D1-D8)
- [ ] Mandatory Hero region screenshot for ALL 8 Queries(V11-P0-1 verify focus)
- [ ] dark-mode Q5/Q6 + BarChart Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1, 含 Round-8 NEW per-Q evaluation prompt addendum
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 V11-P0-1 verdict 给 baseline + actual + evidence
- [ ] §5 Round-8 NEW D1-D8 八项都填
- [ ] §6 cumulative regression 7 项都填
- [ ] §10 Convergence assessment 给明确判断 (production-ready / 小 follow-up / 大 patch)
- [ ] §9 patch suggestions 严守 Chris 工程红线 + R-120/R-123/R-124 AN 不动
- [ ] cp-to-vault tally ~70-80

---

## Output to Chris on completion

```
doubao default v1.1 生成测试 Round-8 (复杂 Query) complete.

Design Prompt under test: default v1.1 (631 lines, frozen — R-125 1 处 行内追加 + R-126 frontmatter)
Round-7 baseline: Robustness-Report_default-v0.10_Round-7.md (v1.0 production verdict)
Round-8 report  : Robustness-Report_default-v1.1_Round-8.md

Pre-test red-line verify: <PASS/FAIL>
- R-125 V11-P0-1 SHOULD-APPEAR (5 项): <PASS/FAIL>
- §14.1 既有规则 (12 项): <PASS/FAIL>
- v0.9 9 处 patch markers: <PASS/FAIL>
- AnimateNumber 7 sentinels: <PASS/FAIL>
Engineering red-line (Chris HARD): <PASS/FAIL>

R-125 V11-P0-1 verdict:
  V11-P0-1 Hero wrapper min-h-full: <PASS/PARTIAL/FAIL>
       Round-7: 未专门测, Chris 手动验证发现 v1.0 内容贴顶 1/3
       Round-8: <N>/8 Hero 内容 vertically aligned per align-rule; heroFillRatio 平均 <X>

v1.0 R-124 4 处 patches maintenance (Round-7 → Round-8):
  V10-P0-1A backplate fallback only: <PASS/FAIL>
  V10-P0-1B dark threshold L<0.20: <PASS/FAIL>
  V10-P0-2A Hero size HARD inline: <PASS/FAIL>
  V10-P0-2B wrapper className delegation: <PASS/FAIL>

v0.9 14 处 patches maintenance verify:
  V09-P0-A OKLCH syntax: <PASS/FAIL>
  V09-P0-B+P0-1+B1 shader L invariant: <PASS/FAIL>
  V09-P0-3+B3 F-2 + meta-`<span>`: <PASS/FAIL>
  V09-P0-2 Hero focal number readability: <PASS/FAIL>
  V09-P0-4+B4 chart ramp floor + 非负 chroma: <PASS/FAIL>
  V09-P1-5+B2 dark primary-soft bg-only: <PASS/FAIL>
  V09-P1-6 Hero image filter HARD: <PASS/FAIL>
  V09-P1-7 Outro CTA + material: <PASS/FAIL>

AnimateNumber 区域 0-改 invariant (R-120 + R-123 + R-124 三重 carry):
  AN-1 ~ AN-4: <MAINTAINED/REGRESSED>

Round-8 NEW · 复杂 Query 维度 verdict (D1-D8):
  D1 Q1 多 audience 信息层级: <PASS/PARTIAL/FAIL>
  D2 Q2 负面叙事不文过饰非: <PASS/PARTIAL/FAIL>
  D3 Q3 品牌故事主导: <PASS/PARTIAL/FAIL>
  D4 Q4 数据 + 证言交织: <PASS/PARTIAL/FAIL>
  D5 Q5 行业对比矩阵: <PASS/PARTIAL/FAIL>
  D6 Q6 trendline Hero: <PASS/PARTIAL/FAIL>
  D7 Q7 国际化美式 tone: <PASS/PARTIAL/FAIL>
  D8 Q8 long-form letter: <PASS/PARTIAL/FAIL>

Headline: "Round-8 NEW D1-D8: <X>/8 PASS · <Y> PARTIAL · <Z> FAIL"

Cumulative regression (Round-1/2/3/4/5/6/7 wins):
  F-2 (subsumed V09-P0-3): <N>
  F-3 chart-hover: <PASS/FAIL>
  S-1 framer-motion: <N>/8
  S-2 useReducedMotion: <N>/8
  S-3 Q7 build+runtime: <PASS/FAIL>
  C-4 AnimateNumber tnum DOM: <N>/8

Per-Query summary (Build | 综合):
  Q1-Q8 …

Build pass rate: <N>/8 (R7: <K>/8)

New Stable Failures (≥ 2/8) after v1.1 复杂 Query:
  <list, or "none — clean run">

Top patch suggestions for Cowork v1.2 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored):
  <listed in report §9>

Convergence assessment:
  <PRODUCTION-READY (R-125 closes, v1.1 STRONG v1.0 stable baseline 替代) / small follow-up R-128 / substantive patch>

Artifacts cp'd: <N> files in reports/Round-8-* subdirs.

If V11-P0-1 PASS + 8/8 v1.0/v0.9 patches carry + 0 new SF + AN invariant kept + ≥ 6/8 NEW D1-D8 PASS: R-125 closes, v1.1 production-ready, STRONG v1.0 stable baseline 替代候选.
Else: Cowork starts R-128 (small) or substantive patch round.
```

不 commit / 不 push — Cowork 接手 review.

## 触发词

开始。
