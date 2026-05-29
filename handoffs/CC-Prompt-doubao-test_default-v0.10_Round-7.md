# CC-Prompt · doubao Generation Test · default v0.10 · Round-7

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v1.0 / v0.11 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-7 duties:
1. **Verify the 4 v0.10 patches consume Round-6 failure modes** (P0-1A backplate 降级 + P0-1B dark threshold + layout / P0-2A Hero size HARD inline / P0-2B wrapper className delegation)
2. **Confirm v0.9 14 处 patches (9 first-pass + 5 second-pass) 全保留 + 不 regress**
3. **Confirm Round-1/2/3/4/5/6 cumulative wins did NOT regress**
4. **Confirm AnimateNumber 区域 0 改 invariant** maintained (R-120 + R-123 + R-124 三重锁定)
5. **Detect any new Stable Failures** surfaced once Round-6 backplate 过度治理 + Q1 字号断链 blockers were closed

⚠️ **Chris 红线 carry**: v1.0 (and future v*) must NOT contain `import` statements as engineering instructions, directory wildcard paths, build tool commands. Route engineering-side issues to AGENT.md.

⚠️ **R-120 + R-123 + R-124 AnimateNumber 不动 三重 carry**: §4 line ~189 / §7 line ~271-293 / §17 line ~568-591 整段 Chris 三轮明确锁死。若 Round-7 出现 AnimateNumber 相关 regression,**不要 propose 改 AN 段**,flag 为 doubao 自身波动。

---

## Prerequisites (verify before starting)

### A 线 · Design Prompt v0.10
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.10.md` exists, **631 lines** (v0.9 baseline 627, 4 处 patches 净 +4).

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-6 baseline + cumulative regression
Read once:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.9_Round-6.md` (primary baseline — Q1/Q4/Q5/Q8 backplate 过度 + Q1 字号断链 都标记)
- Optionally `Robustness-Report_default-v0.8_Round-5.md` for cross-round regression

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-7 specifics

- **Design Prompt under test**: default v0.10 (frozen, 631 lines; R-124 4 处 surgical patches over v0.9)
- **N attempts**: 1 per Query × 8 Queries = 8 generations
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.10-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.10_Round-7.md`

Round-7 holds user prompt + Bitable mock + sandbox env constant vs Round-6. ONLY variable: Design Prompt v0.9 → v0.10.

---

## What changed v0.9 → v0.10 (R-124 patch summary)

**4 处 changes (Opus 4.6 first-pass, 0 second-pass needed — Codex review READY for Round-7), 净 +4 行, AnimateNumber 区域 0 触及**:

| # | Line | Type | v0.9 → v0.10 essence |
|---|------|------|---------------------|
| **P0-1A** | §14.1 L458-461 | **backplate 降级 + 末句改写** | "Two legal paths to guarantee" 并列 → "Two paths, prioritized";(1) **Primary path** = shader/image colors[] 该区 authored L extreme;(2) **Fallback only when (1) cannot be guaranteed** = surface-l2 backplate;新增 "Adding a backplate when shader L already extreme = unnecessary panel chrome = HARD violation";末句 "two options above are the only legal paths" → "Option 1 is the default path; option 2 is fallback only when option 1 cannot be guaranteed" |
| **P0-1B** | §14.1 L459 | **dark threshold + layout 约束** | dark L < 0.16 → **L < 0.20** (跟 §17 dark mesh/grain `colorBack 0.125-0.155` 一致);加 "the number's bounding box MUST be framed within the colors[] darkest entries (e.g. `colorBack` for dithering/grain, or the darkest swatch in mesh's 5-color array) — not in the brand-peak or neighbor-accent region" |
| **P0-2A** | §4 L187 (新增) | **Hero Display Number size HARD inline** | "Hero Display Number size — HARD GATE. Size MUST be inlined at the call site or wrapper root element as Tailwind mobile-first exact classes (e.g. `className='text-[96px] md:text-[200px]'`). Do NOT use `clamp()` (§4 carry-over). Do NOT rely on parent inheritance — a wrapper without an explicit size prop falls back to silent default (16px). Mobile-first order: `text-[96px] md:text-[200px]`, never reverse." |
| **P0-2B** | §4 L189 (新增) | **wrapper className delegation HARD** | "Wrapper className delegation — HARD. If a custom abstraction wraps Display Number (e.g. for AnimateNumber integration), the wrapper MUST (1) accept a `className` prop and apply it to its root element, OR (2) set the size directly on the root element. Size cannot be the responsibility of the wrapper's parent container — parent inherit = silent default = invalid." |

---

## Pre-test red-line verify (mandatory before generating)

```bash
V10="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.10.md"

echo "--- must-exist (each ≥1 hit) — baseline carryover ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V10" || echo 0)"
done

echo "--- v0.10 SHOULD-APPEAR (R-124 changes) ---"
for p in 'Two paths, prioritized' 'Primary path' 'Fallback only when' 'unnecessary panel chrome' 'default path' 'L < 0.20' 'darkest entries' 'Hero Display Number size' 'call site or wrapper root' 'Mobile-first order' 'parent inheritance' 'Wrapper className delegation' 'accept a `className` prop'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -c "$p" "$V10" || echo 0)"
done

echo "--- v0.10 SHOULD-DISAPPEAR (R-124 deleted/changed,each = 0) ---"
for p in 'Two legal paths to guarantee' 'two options above are the only legal paths' 'L < 0.16'; do
  printf "%-50s : %s hits\n" "$p" "$(grep -c "$p" "$V10" || echo 0)"
done

echo "--- v0.9 9 处 patch 标记 still present (each ≥1) ---"
for p in 'space-separated' 'hue/chroma anchor' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'enumerated negative examples' 'rounded surface panel'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -c "$p" "$V10" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V10" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V10" || echo 0)"
done

echo "--- framer-motion 上下文 verify (2 hits, FORBIDDEN/Don't context) ---"
grep -n 'framer-motion' "$V10"

echo "--- AnimateNumber zone content sentinel (each MUST exist) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'Hero shader speed.*read at each' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "%-65s : %s hits\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V10" || echo 0)"
done

echo "--- clamp 残留 verify (only rule context allowed) ---"
grep -nE "clamp\(" "$V10"
```

Expect: must-exist all ≥1; SHOULD-APPEAR all ≥1 (13 项); SHOULD-DISAPPEAR all = 0 (3 项); v0.9 9 处 patch 全 ≥1; forbidden all = 0; Chris red-line all = 0; framer-motion 2 hits in FORBIDDEN/Don't; AnimateNumber sentinels = 1; clamp 5 hits 全在 rule context (line 67 OKLCH math / line 179 既有 / line 187 v0.10 反 clamp / line 193 既有 downgrade / line 512 §A.x impact preset). If any fails, stop & flag.

---

## Round-7 expected outcomes (the 4 v0.10 patches must consume Round-6 failure modes)

Round-6 produced:
- **R6-N1 backplate 过度治理**: Q1/Q4/Q5/Q8 都加了 `<div backgroundColor: var(--surface-l2)>` 包 Hero focal number — Q1 light surface-l2 = oklch(0.965) 白色矩形 panel,Q4/Q5/Q8 dark surface-l2 = oklch(0.14) 黑色矩形 panel,都是不必要的 visual noise
- **R6-N2 Q1 字号断链**: Q1 `<FocalNumber>` 组件无 inline font-size,size 责任传递给父级 inherit → 渲染为默认 16px,数字看起来太小
- **Round-6 Q5 还违反 §4 line 179 "no clamp()"**: Q5 用了 `text-[clamp(64px,12vw,200px)]`
- **Round-6 Q8 hero number 最大 `md:text-[96px]` 没到 desktop 200px**

### 头条 4 处 v0.10 patch verdict

| # | Round-6 baseline | v0.10 fix mechanism | Round-7 expected |
|---|---|---|---|
| **V10-P0-1A** | 4/4 build-PASS attempts (Q1/Q4/Q5/Q8) add backplate panel under Hero focal number | §14.1 L458-461 backplate 降级为 fallback only when primary path 不可保证 + 反例 "unnecessary panel chrome = HARD violation" + 末句改 "Option 1 default; option 2 fallback only" | **0/8 attempts add backplate under Hero focal number when shader/image already extreme L**; source grep `<div[^>]*Hero[^>]*backgroundColor.*surface-l|inline-flex[^>]*backgroundColor.*surface-l[12].*<.*[Ff]ocal\|<Hero` = 0 across all 8 attempts |
| **V10-P0-1B** | dark threshold L<0.16 vs §17 L 0.480 矛盾 + 没要求 layout frame number 在 darkest entries | §14.1 L459 dark L<0.20 + "framed within colors[] darkest entries" 约束 | **8/8 dark attempts have Hero focal number bounded by colors[] entries with L < 0.20** (e.g. `colorBack` for grain/dithering, or darkest swatch in mesh 5-color array); 0/8 Hero number 落在 brand-peak (L ≈ 0.42-0.55) or neighbor-accent region |
| **V10-P0-2A** | Q1 `<FocalNumber>` 无 inline font-size (Q1 line 105-124); Q5 用 `clamp(64px,12vw,200px)` 违反 §4 既有规则; Q8 `md:text-[96px]` 没到 200px | §4 L187 Hero Display Number size HARD inline + mobile-first exact classes + "no clamp" 强调 + "no parent inheritance" | **8/8 Hero focal number element has inline font-size**: (a) `className='text-[96px] md:text-[200px]'` (Tailwind mobile-first exact) OR (b) `style={{fontSize: '...'}}` inline; **0/8 use clamp()**; **0/8 size by parent inheritance** (i.e. 至少 root element 上有 explicit size) |
| **V10-P0-2B** | Q1 `<FocalNumber>` wrapper 无 className prop 接受 | §4 L189 Wrapper className delegation HARD | **Any wrapper component wrapping Display Number** (`<HeroNumber>`, `<FocalNumber>`, `<DisplayNumber>` etc.) MUST either (a) accept + apply `className` prop OR (b) set size in root element. **0/8 attempts have size silently default-ing to parent inherit chain** |

**Headline 4 处 v0.10 patches**: `<X>/4 PASS · <Y> PARTIAL · <Z> FAIL`

### v0.9 14 处 patches maintenance check

| # | v0.9 patch | Round-6 status | Round-7 must keep |
|---|---|---|---|
| V09-P0-A OKLCH syntax | PASS (0/8 rgb(0,0,0)) | Same |
| V09-P0-B+P0-1+B1 shader L invariant | PARTIAL (Q4 N-1) | Same or improved |
| V09-P0-3+B3 F-2 + meta-`<span>` | PASS EXCEEDED (22→0) | Same (≤5) |
| V09-P0-2 Hero focal number readability | PASS (option b extreme L) | Same (now primary path per V10-P0-1A) |
| V09-P0-4+B4 chart ramp floor + 非负 chroma | PASS | Same |
| V09-P1-5+B2 dark primary-soft bg-only | PASS | Same (0/8) |
| V09-P1-6 Hero image filter HARD | PASS | Same (0/8) |
| V09-P1-7 Outro CTA + material | PASS | Same |

### AnimateNumber 区域 0 改 invariant (R-120 + R-123 + R-124 三重锁定)

| # | Invariant | Round-7 expected |
|---|---|---|
| AN-1 | `tabular-nums` / `tnum 1` 在 AnimateNumber wrapper 与 child | 8/8 build-PASS maintained |
| AN-2 | `useReducedMotion()` 在 AnimateNumber wrapper 顶 | 8/8 maintained |
| AN-3 | `parseDisplayValue` 或等价 inline parsing | ≥ 5/8 maintained |
| AN-4 | `inline-flex items-baseline gap-1 whitespace-nowrap` wrapper class | 8/8 maintained |

### Cumulative regression (Round-1/2/3/4/5/6 wins)

| # | Win | Round-6 actual | Round-7 must keep |
|---|---|---|---|
| F-2 body color (subsumed V09-P0-3) | 22 → 0 | ≤ 5 |
| F-3 chart-hover OKLCH alpha | 0/8 hallucinate | 0/8 |
| S-1 framer-motion forbidden | 0/8 | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 | 8/8 |
| S-3 Q7 build+runtime | REGRESSED (linearToSrgb engineering) | AGENT.md route; observe only |
| S-5 Q5 data semantic | KEEP=147 / STOLEN=4 | KEEP ≥ 100 / STOLEN ≤ 5 |
| C-4 AnimateNumber tnum DOM | 7/7 build-PASS | ≥ 7/8 |
| C-6 dark Tooltip mode-explicit | UNVERIFIED | Re-attempt |

---

## 8 User Queries (unchanged from Round-1/2/3/4/5/6 — identical for 1:1 comparison)

(Q1-Q8 verbatim 同 Round-6 — Bitable mock data + brand color + style 不变。)

### Q1 · warmth + 茶饮
```
我们是【茶语轩】茶饮连锁品牌,这份数据是华东大区 2025 Q1 销售业绩.
请生成一份温暖、亲和、有手作感的销售业绩报告页面,能传达茶文化的传统底蕴和现代生活方式.
主色用茶绿 #6B8E23,light 模式.
```

### Q2 · technical + 数据中心
```
为【星云算力】数据中心生成一份月度运营报告页面.
本月数据:华东大区 Q1销售业绩底层数据.
需要工程感、数据密集、强调数字精度和系统稳定性的视觉表达.
主色 #0EA5E9,dark 模式.
```

### Q3 · editorial + 杂志季刊
```
我们是【纸鸢】生活美学杂志,需要一份 2025 春季季刊的业绩回顾页面,
底层数据用华东大区 Q1销售业绩.
风格要像高端时尚杂志,留白讲究、字体精致、节奏舒缓.
主色 #7C2D12 酒红,light 模式.
```

### Q4 · geometric + SaaS
```
【拓扑云】SaaS 产品 2025 Q1 增长数据看板.
底层数据用华东大区 Q1销售业绩.
需要现代科技感、清晰理性、紧致节奏的视觉表达.
主色 #3B82F6 蓝,dark 模式.
```

### Q5 · impact + 电竞战队
```
【烈焰电竞】战队 2025 Q1 赛季战绩公告页面.
底层数据用华东大区 Q1销售业绩.
需要强烈视觉冲击力、海报感、热血氛围.
主色 #DC2626 鲜红,dark 模式.
```

### Q6 · ceremonial + 奢侈品腕表
```
【鎏金】高端腕表 2025 Q1 新品销售年度报告.
底层数据用华东大区 Q1销售业绩.
需要传统、仪式感、奢华内敛的视觉表达.
主色 #854D0E 古铜金,light 模式.
```

### Q7 · warmth + Hero 图片背景
```
【豆韵】精品咖啡店 2025 Q1 销售年度回顾.
底层数据用华东大区 Q1销售业绩.
请使用我提供的咖啡门店图片作为 Hero 背景:
https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600
注意标题文字必须在图片上保持可读(通过 overlay 或字号控制).
主色 #D97706 橙棕,light 模式.
```

### Q8 · technical + AnimateNumber 强烈
```
【碳源 Carbon One】2025 Q1 全国减排数据可视化报告.
底层数据用华东大区 Q1销售业绩.
希望页面里每一个核心数字(业绩总额、增长率、参与门店数等)都有 AnimateNumber 从 0 跃升的入场动画.
风格要工程感、数据密集.
主色 #10B981 翠绿,dark 模式.
```

---

## Step-by-step procedure (path swap v0.9 → v0.10; rest identical to Round-6)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.10) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.10.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from legacy generate-prompt.txt line 498-908}

=== USER QUERY ===
{Q<N> 的 User Query 文本}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v0.10-Q${N}-attempt-1"
  mkdir -p "default-v0.10-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.10-Q${N}-attempt-1/"
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.10-Q${N}-attempt-1" 2>&1 | tee "default-v0.10-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.10-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-6 procedure unchanged. **Mandatory Hero region screenshot for ALL 8 Queries** (V10-P0-1A backplate verify focus); dark-mode + BarChart Queries hover Tooltip 截图。

### Step 6 · Playwright DOM extraction

`page.evaluate` script from Round-6 + Round-7 NEW addition. Save JSON to `reports/dom/Q${N}.json`.

**Round-7 NEW addition** — Hero focal number 区域 backplate + size detection:

```javascript
// inside DOM script
const heroNum = document.querySelector('.rep-hero-num, [class*=hero-num], [class*=focal-number], [class*=display-number]')
const heroNumParent = heroNum?.parentElement
const heroNumBg = heroNum ? getComputedStyle(heroNum).backgroundColor : null
const heroNumParentBg = heroNumParent ? getComputedStyle(heroNumParent).backgroundColor : null
const heroNumParentPadding = heroNumParent ? getComputedStyle(heroNumParent).padding : null
const heroNumFontSize = heroNum ? getComputedStyle(heroNum).fontSize : null
const heroNumComputedSize = heroNum ? parseInt(getComputedStyle(heroNum).fontSize) : 0
// Add: heroNumBg, heroNumParentBg, heroNumParentPadding, heroNumFontSize, heroNumComputedSize

// Round-7 NEW · backplate detection (V10-P0-1A)
const hasBackplate = heroNumParentBg && heroNumParentBg !== 'rgba(0, 0, 0, 0)' && heroNumParentBg !== 'transparent' && heroNumParentPadding && heroNumParentPadding !== '0px'
// Add: hasBackplate (boolean)

// Round-7 NEW · size inheritance check (V10-P0-2A/B)
const sizeIsInherited = heroNumComputedSize < 60  // expected ≥ 96px mobile / 200px desktop, anything < 60 = likely inherit
// Add: sizeIsInherited (boolean)
```

### Step 6.5 · Round-7 source grep (CRITICAL)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v0.10-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v0.10 patch verification ==="

# V10-P0-1A · Hero focal number backplate verify
HERO_BACKPLATE=$(grep -cE "<div[^>]*Hero[^>]*backgroundColor.*var\(--surface-l[12]\)|<div[^>]*backgroundColor.*var\(--surface-l[12]\)[^>]*>[^<]*<.*[Ff]ocal[Nn]umber|<div[^>]*inline-flex[^>]*backgroundColor.*var\(--surface-l[12]\).*<.*[HhFf]ero" "$APP" || echo 0)
HERO_PANEL=$(grep -cE "<div[^>]*items-center[^>]*backgroundColor.*surface-l[12].*borderRadius.*radius-card.*<.*Number" "$APP" || echo 0)
echo "V10-P0-1A · Hero backplate (regex 1): $HERO_BACKPLATE (期望 0)"
echo "V10-P0-1A · Hero panel-style div: $HERO_PANEL (期望 0)"

# V10-P0-1B · Hero number 落点检查 — 检查 dark shader colors[] 最深 entry 是否 < L 0.20
# (这维度难精确 grep,改用 visual screenshot 验证)

# V10-P0-2A · Hero focal number inline font-size
HERO_INLINE_SIZE=$(grep -cE "className=['\"][^'\"]*text-\[[0-9]+px\][^'\"]*['\"]|style.*fontSize.*['\"]?[0-9]+px" "$APP" || echo 0)
HERO_CLAMP=$(grep -cE "className=['\"][^'\"]*clamp\(|style.*fontSize.*clamp\(" "$APP" || echo 0)
HERO_MOBILE_FIRST=$(grep -cE "text-\[[0-9]+px\] md:text-\[[0-9]+px\]" "$APP" || echo 0)
HERO_MOBILE_REVERSE=$(grep -cE "text-\[200px\] md:text-\[96px\]|text-\[120px\] md:text-\[56px\]" "$APP" || echo 0)
echo "V10-P0-2A · Hero inline font-size occurrences: $HERO_INLINE_SIZE"
echo "V10-P0-2A · clamp() in Hero size: $HERO_CLAMP (期望 0)"
echo "V10-P0-2A · Mobile-first text-[Xpx] md:text-[Ypx]: $HERO_MOBILE_FIRST"
echo "V10-P0-2A · Mobile-first reverse (BAD): $HERO_MOBILE_REVERSE (期望 0)"

# V10-P0-2B · wrapper className 透传 verify
WRAPPER_CLASSNAME_PROP=$(grep -cE "({[^}]*className[^}]*}.*=>|function.*({.*className)" "$APP" || echo 0)
WRAPPER_NO_CLASSNAME=$(grep -cE "function (HeroNumber|FocalNumber|DisplayNumber).*\({[^}]*(?!className)|const (HeroNumber|FocalNumber|DisplayNumber) = \({[^}]*(?!className)" "$APP" || echo 0)
echo "V10-P0-2B · wrapper accepts className prop: $WRAPPER_CLASSNAME_PROP"
echo "V10-P0-2B · wrapper missing className: $WRAPPER_NO_CLASSNAME (期望 0)"

# v0.9 14 处 patches maintenance verify (sampled)
OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
PRIMARY_SOFT_AS_TEXT=$(grep -cE "color:\\s*['\"]?var\\(--primary-soft\\)" "$APP" || echo 0)
NEGATIVE_CHROMA=$(grep -cE "oklch\([^)]*-[0-9]+\.[0-9]+" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
OUTRO_CTA=$(grep -cE "(查看完整|Learn more|View demo|Read full|Sign up|Get started).*<(a|button|div)" "$APP" || echo 0)
echo "V09-P0-A OKLCH comma residual: $OKLCH_COMMA (期望 0)"
echo "V09-P0-3 F-2 <p> fg-2/3 inline: $BODY_FG2_INLINE (期望 ≤ 1)"
echo "V09-P1-5 primary-soft as text: $PRIMARY_SOFT_AS_TEXT (期望 0)"
echo "V09-P0-4 negative chroma OKLCH: $NEGATIVE_CHROMA (期望 0)"
echo "V09-P1-6 img filter fn calls: $IMG_FILTER_FN (期望 0)"
echo "V09-P1-7 Outro CTA text: $OUTRO_CTA (期望 0)"

# AnimateNumber zone invariant (carry R-120 + R-123 + R-124)
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
USE_REDUCED=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "AN-1 tabular-nums: $TNUM"
echo "AN-2 AnimateNumber instances: $ANIM_NUM"
echo "AN-3 useReducedMotion: $USE_REDUCED"

# Cumulative regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
GRID_HERO=$(grep -cE "grid-template-columns:\s*1\.15fr|gridTemplateColumns.*1\.15fr|grid-template-columns:\s*1fr 1fr" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "Regression framer-motion: $FM (期望 0)"
echo "Regression Hero grid: $GRID_HERO (期望 ≥ 1)"
echo "Regression wildcard ui: $WILDCARD (期望 0)"
```

### Step 7 · Design Skill 评分

Round-6 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.10_Round-7.md`

### 9 headline sections

#### 1. Round-6 → Round-7 patch verdicts (HEADLINE)

| # | Patch | Round-6 baseline | Round-7 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| V10-P0-1A | backplate 降级 fallback only | 4/4 (Q1/Q4/Q5/Q8) add backplate | <N>/8 add backplate | PASS/FAIL/PARTIAL | source grep + DOM hasBackplate + Hero region screenshot |
| V10-P0-1B | dark threshold L<0.20 + layout | dark L<0.16 vs §17 L 0.480 矛盾 | <N>/8 dark Hero number bounded by colors[] darkest entries | PASS/FAIL/PARTIAL | layout + shader colors[] grep + Hero screenshot |
| V10-P0-2A | Hero size HARD inline mobile-first | Q1 size 16px inherit; Q5 clamp; Q8 96px max | <N>/8 Hero number have inline mobile-first exact class size | PASS/FAIL/PARTIAL | source grep + DOM heroNumComputedSize |
| V10-P0-2B | wrapper className delegation | Q1 wrapper 无 className prop | <N>/8 wrapper component (if any) accepts className | PASS/FAIL/PARTIAL | source grep |

Headline: "<X>/4 v0.10 patches PASS · <Y> PARTIAL · <Z> FAIL"

#### 2. v0.9 14 处 patches maintenance verify (must stay PASS / EXCEEDED)

| # | v0.9 patch | Round-6 status | Round-7 status |
|---|---|---|---|
| V09-P0-A OKLCH syntax | PASS | <PASS/FAIL> |
| ... |

#### 3. AnimateNumber 区域 0 改 invariant (R-120 + R-123 + R-124 三重 carry)

#### 4. Cumulative regression check (Round-1/2/3/4/5/6 wins)

#### 5. Per-Query summary (Build | 综合 R6 → R7)

#### 6. New Stable Failures (≥ 2/8 in Round-7)

#### 7. Single Failures (1/8 only — Noise)

#### 8. Top patch suggestions for Cowork v1.0 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored)

⚠️ R-124 carry: do NOT propose changes to AnimateNumber 区段 (§4 line ~189 / §7 line ~271-293 / §17 line ~568-591). Chris triple-locked.

⚠️ Codex nice-to-have flag (carry from R-124 review): "framed within" in §14.1 line 459 may have minor semantic ambiguity. If Round-7 doubao misreads "framed" as "add visual frame/backplate" (re-introducing backplate via different syntax), Cowork can micro-fix "framed within" → "bounded by" / "placed over". Watch for this in Round-7 outputs.

#### 9. Convergence assessment

This is the headline value of Round-7. State explicitly:
- **If ≥ 3/4 v0.10 PASS + 14/14 v0.9 maintained + 0 new SF + AN invariant kept**: **v0.10 reaches production / stable baseline. R-124 closes. STRONG candidate for v1.0 tag.**
- **If 2/4 PASS, or 1 PARTIAL with clear next step**: small follow-up needed (R-125 / v0.11).
- **If ≤ 1/4 PASS or major regression**: substantive patch round needed.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-7-app-tsx" "$DST/Round-7-screenshots" "$DST/Round-7-critic" "$DST/Round-7-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.10-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-7-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip hero-region; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-7-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.10-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-7-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-7-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v0.10_Round-7.md"

echo "--- Round-7 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-7-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-7-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-7-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-7-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.10_Round-7.md" ] && echo present || echo MISSING)"
```

Expected: ~70-80 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v0.10 631 行 + B sandbox + C Round-6 report)
- [ ] Pre-test red-line: 22 must-exist ≥1 + 13 SHOULD-APPEAR ≥1 + 3 SHOULD-DISAPPEAR = 0 + 9 v0.9 patch markers ≥1 + 9 forbidden = 0 + 7 engineering red-line = 0 + AnimateNumber 7 sentinels = 1 + clamp 5 hits 全在 rule context
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] 8 Queries generate-prompt.txt 各独立
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM (含 Round-7 NEW hasBackplate + sizeIsInherited) + Step 6.5 source-grep
- [ ] **Mandatory Hero region screenshot for ALL 8 Queries**(V10-P0-1A backplate verify focus)
- [ ] dark-mode + BarChart-containing Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1
- [ ] Robustness Report 9 sections 都填实质
- [ ] §1 头条 4 处 v0.10 patches + v0.9 14 处 maintenance + AN invariant 三组都给 baseline + actual + evidence
- [ ] §4 cumulative regression 8 项都填
- [ ] §9 Convergence assessment 给明确判断 (production-ready / 小 follow-up / 大 patch)
- [ ] § 8 patch suggestions 严守 Chris 工程红线 + R-120/R-123/R-124 AN 不动
- [ ] cp-to-vault tally ~70-80

---

## Output to Chris on completion

```
doubao default v0.10 生成测试 Round-7 complete.

Design Prompt under test: default v0.10 (631 lines, frozen — R-124 4 处 surgical patches)
Round-6 baseline: Robustness-Report_default-v0.9_Round-6.md
Round-7 report  : Robustness-Report_default-v0.10_Round-7.md

Pre-test red-line verify: <PASS/FAIL>
- v0.10 SHOULD-APPEAR (13 项): <PASS/FAIL>
- v0.10 SHOULD-DISAPPEAR (3 项): <PASS/FAIL>
- v0.9 9 处 patch markers (9 项): <PASS/FAIL>
- AnimateNumber 7 sentinels = 1: <PASS/FAIL>
Engineering red-line (Chris HARD): <PASS/FAIL>

4 v0.10 patch verdicts (Round-6 → Round-7):
  V10-P0-1A backplate 降级 fallback only: <PASS/PARTIAL/FAIL>
       Round-6: 4/4 Q1/Q4/Q5/Q8 add backplate · Round-7: <N>/8 add backplate
  V10-P0-1B dark threshold L<0.20 + layout: <PASS/PARTIAL/FAIL>
       Round-6: §17 L 0.480 vs §14.1 L<0.16 矛盾 · Round-7: <N>/8 dark Hero number bounded by darkest entries
  V10-P0-2A Hero size HARD inline mobile-first: <PASS/PARTIAL/FAIL>
       Round-6: Q1 16px inherit + Q5 clamp + Q8 96px max · Round-7: <N>/8 have inline mobile-first size
  V10-P0-2B wrapper className delegation: <PASS/PARTIAL/FAIL>
       Round-6: Q1 wrapper 无 className prop · Round-7: <N>/8 wrapper accepts className

Headline: <X>/4 v0.10 patches PASS · <Y> PARTIAL · <Z> FAIL.

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

Cumulative regression (Round-1/2/3/4/5/6 wins):
  F-2 (subsumed V09-P0-3): <N>
  F-3 chart-hover: <PASS/FAIL>
  S-1 framer-motion: <N>/8
  S-2 useReducedMotion: <N>/8
  S-3 Q7 build+runtime: <PASS/FAIL>
  S-5 Q5 KEEP/STOLEN: <N>/<M>
  C-4 AnimateNumber tnum DOM: <N>/8

Per-Query summary (Build | 综合 R6 → R7):
  Q1-Q8 …

Build pass rate: <N>/8 (R6: 7/8)

New Stable Failures (≥ 2/8) after v0.10:
  <list, or "none — clean run">

Codex nice-to-have flag from R-124 review:
  "framed within" in §14.1 L459 may have minor semantic ambiguity. Round-7 observed:
  - doubao misread as "add visual frame": <YES/NO>
  - if YES, Cowork can micro-fix → "bounded by" / "placed over"

Top patch suggestions for Cowork v1.0 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored):
  <listed in report §8>

Convergence assessment:
  <PRODUCTION-READY (R-124 closes, STRONG candidate for v1.0 tag) / small follow-up R-125 / substantive patch>

Artifacts cp'd: <N> files in reports/Round-7-* subdirs.

If ≥ 3/4 v0.10 PASS + 14/14 v0.9 maintained + 0 new SF + AN invariant kept: R-124 closes, v0.10 production-ready, STRONG candidate for v1.0 tag.
Else: Cowork starts R-125 (small) or substantive patch round.
```
