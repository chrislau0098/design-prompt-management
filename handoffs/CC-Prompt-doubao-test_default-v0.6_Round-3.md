# CC-Prompt · doubao Generation Test · default v0.6 · Round-3

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v0.7 patches (if any new Stable Failures surface)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-3 has two extra duties:
1. **Verify the 7 v0.6 patches consume Round-2 failure modes** (Chris's 5 manual feedback + R-115 R2-SF-1 + R-115 S-4 partial — see "Round-3 expected outcomes" below)
2. **Confirm Round-1 patches did NOT regress** (the 9 Round-1 fixes that Round-2 confirmed PASS must still PASS in Round-3)

⚠️ **Chris's red-line carry from R-115**: Cowork applies a hard constraint that v0.6 (and future v*) must NOT contain `import` statements as engineering instructions, directory wildcard paths, build tool commands. If Round-3 generation surfaces issues that suggest a prompt-side patch involving such terms, route those to AGENT.md (sandbox spec) instead — do NOT propose them as v0.7 patch suggestions.

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-3 if either is missing.

### A 线 · Design Prompt v0.6
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.6.md` exists, **620 lines** (v0.5 was 620 — same length, dense Do/Don't compression).

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py` exists, points to model `doubao-seed-2-0-code-preview-260215`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md` exists
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env_legacy/` is the legacy folder — ignore
- `ARK_API_KEY` env var is set

### C 线 · Round-2 baseline available
`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.5_Round-2.md`

Round-1 baseline also readable for regression detection:
`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md`

Read both once before starting. You will cite Round-2 numbers (and Round-1 where relevant) in the Round-3 report.

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-3 specifics

- **Design Prompt under test**: default v0.6 (frozen, 620 lines)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (identical shape to Round-1 / Round-2 — 1:1 comparison)
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical to prior rounds
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.6-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.6_Round-3.md`

Round-3 holds user prompt assembly + Bitable mock + sandbox env constant vs Round-2. ONLY variable: Design Prompt v0.5 → v0.6. Any delta is attributable to the prompt change.

---

## Pre-test red-line verify (mandatory before generating)

```bash
V06="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.6.md"

echo "--- must-exist (each ≥1 hit) — v0.5 baseline patterns ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'ReportMode' 'lightness_shift' 'foreground-2'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V06" || echo 0)"
done

echo "--- v0.6 new patch keywords (each ≥1 hit) — 7 patch evidence in prompt ---"
for p in 'L ≥ 0.95' 'ornament mark' 'NEVER fall back to a neutral' 'Body / paragraph' 'cursor.*chart-hover' 'display: grid' 'STYLE_PRESETS shader assignment'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -cE "$p" "$V06" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V06" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V06" || echo 0)"
done

echo "--- framer-motion context check (both hits must be in FORBIDDEN/Don't sections) ---"
grep -n -B0 -A0 'framer-motion' "$V06"
```

Expect:
- must-exist all ≥1
- 7 patch keywords all ≥1
- forbidden all = 0
- engineering red-line all = 0
- framer-motion 2 hits both in FORBIDDEN/Don't context

If any fails, stop & flag.

---

## Round-3 expected outcomes (the 7 v0.6 patches must close Round-2 failures)

Round-2 produced 5 Chris-manual feedback (Q1 / Q3 / Q6 / Q7 / Q8) + 2 R-115 automated SFs (R2-SF-1 Hero grid + S-4 partial Q4 shader). v0.6 folded all 7 into HARD-tagged §sections. Round-3 headline question: **did each patch consume the failure mode in doubao output?**

| # | Round-2 fail (baseline) | v0.6 fix mechanism | Round-3 expected |
|---|---|---|---|
| **P-1** | Q3 editorial+brand=#7C2D12+lightness=-100+light → bg 全绿高饱和 | §3 "Background lightness invariant (HARD)" — light bg L≥0.95 unconditional, lightness_shift only on primary + chart ramp | **Q3 light mode bg L ≥ 0.95** (sample 5 px from top of body, parse to OKLCH, L value ≥ 0.95). bg color hue ≈ pH (brand_color hue), chroma ≤ 0.020 |
| **P-2** | Q6 ceremonial ◆01◆ ornament 太大不精致 | §15 ChapterStamp ceremonial — ornament mark ≈30% numeral font-size | **Q6 ornament `◆` font-size ≤ 50% of numeral font-size** (DOM measurement on `.rco-cere-mark` vs `.rco-cere-num`) |
| **P-3** | Q1 warmth+brand=#6B8E23+light → 品牌色丢失变灰 + Nunito 没加载 | §3 Brand color fidelity HARD + §4 Font fidelity HARD | **Q1 `--primary` chroma ≥ 0.06** (not neutral gray; parse OKLCH from `getComputedStyle`) AND `title fontFamily` includes "Nunito" |
| **P-4** | Q8 dark mode body 文字用了 --foreground-2 → 对比度不够 | §3 Foreground role discipline HARD — body/paragraph MUST use --foreground | **Q8 body `<p>` color contrast ratio ≥ 7:1** against bg (WCAG AAA). DOM check: body `<p>` `getComputedStyle(p).color` parse + bg color → contrast ratio |
| **P-5** | Q7 hover BarChart cursor 是黑色 rgba(0,0,0,0.1) | §13 BarChart Tooltip cursor HARD — must be `var(--chart-hover)` | **BarChart cursor fill matches `--chart-hover` token** (any attempt with BarChart). Playwright hover then DOM extract `.recharts-tooltip-cursor` rect fill |
| **P-6** | R2-SF-1 Hero 2-col grid 0/7 (all flex/block) | §14.1 Hero Monolith HARD GATE — display: grid; grid-template-columns: 1.15fr 1fr | **N/8 Hero use CSS grid** with `gridTemplateColumns` ≈ "1.15fr 1fr" or similar 2-col ratio at desktop (1280×). Target N = 7-8. |
| **P-7** | S-4 partial Q4 geometric 用了 Dithering 而非 mesh | §1 STYLE_PRESETS shader assignment HARD | **Q4 Hero shader component = MeshGradient** (NOT Dithering). DOM check `<canvas>` parent / source grep `MeshGradient` use in Q4 App.tsx |

### Round-1 regression check (the 9 v0.5 patches must STAY PASS in v0.6)

This isn't a new headline but a hygiene check — confirm v0.6 didn't break Round-2 wins:

| # | v0.5 patch | Round-2 status | Round-3 must keep |
|---|---|---|---|
| S-1 framer-motion forbidden | 0/8 violate | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 wired | ≥ 5/8 |
| S-3 Hero image archetype (Q7) | Q7 PASS | Q7 still PASS |
| S-4 keyword routing (font) | Q4 font PASS | Q4 font PASS |
| S-5 data semantic preserved | KEEP=57 / STOLEN=2 | KEEP ≥ 50 / STOLEN ≤ 5 |
| C-2 Hero 2-col grid | FAIL 0/7 — see P-6 above | (subsumed by P-6) |
| C-3 ChapterStamp variant | PARTIAL (DOM not differentiable) | (de-prioritized — verifiability issue, not output issue) |
| C-4 AnimateNumber tabular-nums | 7/7 attempts had tnum | ≥ 7/8 |
| C-6 dark Tooltip mode-explicit | Q8 PASS contrast 12:1 | dark Tooltip text contrast ≥ 4.5:1 across Q2/Q4/Q5/Q8 |

---

## 8 User Queries (unchanged from Round-1 / Round-2 — identical for 1:1 comparison)

All 8 share the same Bitable mock data. Only brand identity + style language + brand color + mode varies.

| Q# | Style 预期 | Brand color | Mode | Round-3 special focus |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | **P-3 verify** brand 色保留 + Nunito 加载 |
| Q2 | technical | #0EA5E9 | dark | P-4 body color + C-6 Tooltip |
| Q3 | editorial | #7C2D12 | light | **P-1 verify** bg L≥0.95(关键: brand 酒红 + lightness=-100 极端) |
| Q4 | geometric | #3B82F6 | dark | **P-7 verify** shader=MeshGradient + P-4 body color |
| Q5 | impact | #DC2626 | dark | S-5 regression check + Round-2 build FAIL 是否消失 |
| Q6 | ceremonial | #854D0E | light | **P-2 verify** ornament ≤50% numeral size |
| Q7 | warmth + Hero img | #D97706 | light | S-3 regression + **P-5 verify** BarChart cursor token (如生成里有 BarChart) |
| Q8 | technical + Animate | #10B981 | dark | **P-4 verify** body --foreground 全对比 + P-5 BarChart cursor |

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

## Step-by-step procedure (identical shape to Round-2 — only v0.5 → v0.6 path swap)

Steps 1-5 follow Round-2 procedure verbatim. Steps 6 / 6.5 / 7 / 8 below are updated.

### Step 1 · 构造 generate-prompt.txt (Round-2 procedure, with v0.6 path)

Per Query Q<N>, overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.6) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.6.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{从原 generate-prompt.txt line 498-908 mock JSON 段}

=== USER QUERY ===
{Q<N> 的 User Query 文本}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v0.6-Q${N}-attempt-1"
  mkdir -p "default-v0.6-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.6-Q${N}-attempt-1/"
  # write generate-prompt.txt per Step 1
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.6-Q${N}-attempt-1" 2>&1 | tee "default-v0.6-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.6-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Per Round-2 procedure. Plus mandatory hover Tooltip screenshot for dark Queries (Q2/Q4/Q5/Q8) AND any attempt that includes a BarChart (for P-5).

### Step 6 · Playwright DOM extraction (Round-3 ENRICHED)

Use Round-2 DOM script with these additions (save to `reports/dom/Q${N}.json`):

```javascript
() => {
  // ...Round-2 fields (fonts/colors/hero/animateCount/etc.)...

  // R-3 NEW · P-1 light bg L value (parse oklch from computed bg)
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  // optional parse to OKLCH if available — keep raw rgb string anyway

  // R-3 NEW · P-2 ornament mark size ratio
  const cereMark = document.querySelector('.rco-cere-mark, [class*=cere-mark]');
  const cereNum = document.querySelector('.rco-cere-num, [class*=cere-num]');
  const markFs = cereMark ? parseFloat(getComputedStyle(cereMark).fontSize) : null;
  const numFs  = cereNum  ? parseFloat(getComputedStyle(cereNum).fontSize) : null;
  const markRatio = (markFs && numFs) ? (markFs / numFs) : null;

  // R-3 NEW · P-3 brand color fidelity (primary chroma)
  // pull --primary value from any element computed style that uses it
  const sample = document.querySelector('[class*=hero] [class*=number], [class*=hero] [class*=num]') || document.body;
  const primaryColor = getComputedStyle(sample).color;
  // raw color string — parse offline; the absence of "grey/gray" oklch is the signal

  // R-3 NEW · P-4 body text contrast ratio
  const bodyP = document.querySelector('main p, article p, [class*=body] p, .rep-hero-lead');
  const bodyColor = bodyP ? getComputedStyle(bodyP).color : null;
  // contrast computed offline (libcolor or eyeball at report time)

  // R-3 NEW · P-5 BarChart cursor probing (no hover yet)
  const barChart = document.querySelector('svg.recharts-surface .recharts-bar-rectangle, .recharts-bar');
  // marker that BarChart exists; cursor fill measured during hover step

  // R-3 NEW · P-6 Hero gridCols (R2-SF-1 verify)
  const heroEl = document.querySelector('[class*=hero], [class*=Hero]');
  const heroDisplay = heroEl ? getComputedStyle(heroEl).display : null;
  const heroGridCols = heroEl ? getComputedStyle(heroEl).gridTemplateColumns : null;

  // R-3 NEW · P-7 Hero shader component sniff (find <canvas> + nearest data attr)
  const heroCanvas = heroEl?.querySelector('canvas');

  return {
    /* ...all Round-2 fields... */
    bgRaw: bodyBg,
    markRatio,
    markFs,
    numFs,
    primaryColor,
    bodyColor,
    hasBarChart: !!barChart,
    heroDisplay,
    heroGridCols,
    heroCanvasPresent: !!heroCanvas,
  };
}
```

### Step 6.5 · Round-3 source grep (CRITICAL)

Per attempt, run source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v0.6-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v0.6 patch verification ==="

# P-1 light bg invariant — for light-mode Queries (Q1/Q3/Q6/Q7) check no lightness_shift on bg
if [ "$N" = "1" ] || [ "$N" = "3" ] || [ "$N" = "6" ] || [ "$N" = "7" ]; then
  BG_LSHIFT=$(grep -cE 'lightness.*background|background.*lightness_shift' "$APP" || echo 0)
  echo "P-1 lightness on bg refs : $BG_LSHIFT (expect 0)"
fi

# P-3 brand color (Q1 茶绿 should not collapse to gray) — check primary computed
PRIMARY_HINT=$(grep -cE 'oklch.*#6B8E23|#6B8E23|6B8E23' "$APP" || echo 0)
GRAY_FALLBACK=$(grep -cE "oklch\(.*0\s*\)|hsl\(0,\s*0%|color:\s*#888|color:\s*#999|color:\s*gray" "$APP" || echo 0)
echo "P-3 brand hex preserved   : $PRIMARY_HINT"
echo "P-3 gray fallback hints   : $GRAY_FALLBACK (lower is better)"

# P-4 body text role (no foreground-2/3 on <p>)
PARA_BAD=$(grep -cE '<p[^>]*foreground-[23]|<p[^>]*--fg-[23]|className=.*body.*foreground-[23]' "$APP" || echo 0)
echo "P-4 body w/ foreground-2/3: $PARA_BAD (expect 0)"

# P-5 BarChart Tooltip cursor token
HAS_BAR=$(grep -c "BarChart" "$APP" || echo 0)
if [ "$HAS_BAR" -ge 1 ]; then
  CURSOR_TOK=$(grep -cE "cursor=.*chart-hover" "$APP" || echo 0)
  echo "P-5 BarChart cursor token : $CURSOR_TOK / $HAS_BAR BarChart usage (expect 1:1)"
fi

# P-6 Hero grid layout
GRID_HERO=$(grep -cE "grid-template-columns:\s*1\.15fr|gridTemplateColumns.*1\.15fr|grid-template-columns:\s*1fr 1fr|gridTemplateColumns.*1fr.*1fr" "$APP" || echo 0)
FLEX_HERO=$(grep -cE "rep-hero.*display:\s*flex|<section[^>]*hero[^>]*flex" "$APP" || echo 0)
echo "P-6 Hero grid layout      : $GRID_HERO (expect ≥1 for default style)"
echo "P-6 Hero flex layout      : $FLEX_HERO (lower is better)"

# P-7 Q4 shader = MeshGradient (NOT Dithering)
if [ "$N" = "4" ]; then
  MESH=$(grep -c "MeshGradient" "$APP" || echo 0)
  DITHER=$(grep -c "Dithering" "$APP" || echo 0)
  echo "P-7 Q4 MeshGradient      : $MESH (expect ≥1)"
  echo "P-7 Q4 Dithering         : $DITHER (expect 0)"
fi

# Round-2 regression hygiene (sanity)
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
URM=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "Regression framer-motion : $FM (expect 0)"
echo "Regression useReducedMotion ref : $URM"
```

### Step 7 · Design Skill 评分 (Round-2 procedure)

For each build-PASS attempt: impeccable / design-taste-frontend / emil-design-eng + design-principles. Plus motion-audit once across all attempts.

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.6_Round-3.md`

### 8 headline sections

#### 1. Round-2 → Round-3 patch verdicts (HEADLINE)

For each of the 7 v0.6 patches report PASS / FAIL / PARTIAL with concrete evidence:

| # | Patch | Round-2 baseline | Round-3 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| P-1 | light bg L≥0.95 | Q3 bg 全绿 high-chroma | Q3 bg L = <value>; chroma = <value> | PASS/FAIL | DOM JSON bgRaw + offline OKLCH parse |
| P-2 | ceremonial ornament ≤30% | Q6 ornament 太大 | Q6 markRatio = <ratio> (expect ≤ 0.50) | PASS/FAIL | DOM JSON markRatio |
| P-3 | brand color fidelity | Q1 brand 灰 + Nunito 没加载 | Q1 primaryColor chroma + title fontFamily | PASS/FAIL | DOM JSON primaryColor + fonts.title |
| P-4 | body uses --foreground | Q8 body 对比度低 | Q8 body contrast ratio = <value> | PASS/FAIL | DOM JSON bodyColor + offline contrast calc |
| P-5 | BarChart cursor token | Q7 cursor 黑色 rgba(0,0,0,0.1) | BarChart attempts cursor fill | PASS/FAIL/N/A | Hover Tooltip screenshot + source grep |
| P-6 | Hero 2-col grid HARD | 0/7 attempts use grid | <N>/8 use grid w/ 2-col cols | PASS/FAIL | DOM heroDisplay + heroGridCols + source grep |
| P-7 | Q4 shader = mesh | Q4 used Dithering | Q4 MeshGradient hits | PASS/FAIL | Q4 source grep |

Headline summary: "X/7 patches PASS, Y PARTIAL, Z FAIL."

#### 2. Round-1 regression check

Confirm v0.5 wins didn't regress in v0.6. Single table mirroring "Round-1 regression check" in expected outcomes above. If any regress → P0 patch suggestion for v0.7.

#### 3. Per-Query 验证表 (V1-V7)

Same shape as Round-2, with extra column "Round-2 → Round-3 综合 delta" (A- → A, etc.).

#### 4. New Stable Failures (≥ 2/8 occurrences in Round-3, NOT seen in Round-2)

What broke once v0.6's 7 patches consumed Round-2 SFs?

#### 5. Single Failures (1/8 only) — Noise

#### 6. Cross-Query 共性问题

#### 7. Cross-skill diagnostic convergence

#### 8. Patch suggestions to Cowork (for v0.7, if needed)

Concrete observations only. No patched wording.

⚠️ Remember Chris's red-line: **do NOT propose suggestions that require Design Prompt to describe `import` statements / directory paths / build tool commands / package paths.** Engineering issues route to AGENT.md instead. Note explicitly in the suggestion which patches you route to AGENT.md vs which go to v0.7 Design Prompt.

Maximum 5 suggestions, P0 > P1 > P2.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-3-app-tsx" "$DST/Round-3-screenshots" "$DST/Round-3-critic" "$DST/Round-3-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.6-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-3-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-3-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.6-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-3-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-3-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v0.6_Round-3.md"

echo "--- Round-3 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-3-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-3-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-3-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-3-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.6_Round-3.md" ] && echo present || echo MISSING)"
```

Expected: ~64-66 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v0.6 + B sandbox + C Round-2 + Round-1 reports)
- [ ] Pre-test red-line: 19 must-exist ≥1 + 7 patch keywords ≥1 + 9 forbidden = 0 + 5 engineering red-line = 0
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] 8 Queries generate-prompt.txt 各独立
- [ ] 8 doubao calls 全跑(成功失败都记录)
- [ ] 每个 build-PASS 跑了 build + playwright + DOM + Step 6.5 source-grep
- [ ] dark-mode + BarChart-containing Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1
- [ ] Robustness Report 8 sections 都填实质
- [ ] §1 头条 7 patch 都有 Round-2 baseline + Round-3 actual + evidence
- [ ] §2 Round-1 regression 8 项都填
- [ ] §8 patch suggestions 严守 Chris 工程红线(不写 import/path/build tool)
- [ ] cp-to-vault tally ~64-66

---

## Output to Chris on completion

```
doubao default v0.6 生成测试 Round-3 complete.

Design Prompt under test: default v0.6 (620 lines, frozen)
Round-2 baseline: Robustness-Report_default-v0.5_Round-2.md
Round-3 report  : Robustness-Report_default-v0.6_Round-3.md

Pre-test red-line verify: <PASS/FAIL>
Engineering red-line(Chris HARD): <PASS/FAIL>

7 v0.6 patch verdicts (Round-2 baseline → Round-3 actual):
  P-1 light bg L≥0.95           : <PASS/FAIL/PARTIAL> · Q3 bg L = <val>; chroma <val>
  P-2 ceremonial ornament ≤30%  : <PASS/FAIL/PARTIAL> · Q6 markRatio = <val>
  P-3 brand color fidelity      : <PASS/FAIL/PARTIAL> · Q1 primary chroma + font
  P-4 body uses --foreground    : <PASS/FAIL/PARTIAL> · Q8 contrast ratio = <val>
  P-5 BarChart cursor token     : <PASS/FAIL/PARTIAL/N/A>
  P-6 Hero 2-col grid HARD      : <PASS/FAIL/PARTIAL> · <N>/8 use grid (Round-2: 0/7)
  P-7 Q4 shader = mesh           : <PASS/FAIL/PARTIAL> · Mesh hits / Dithering hits

Headline: <X>/7 patches PASS, <Y> PARTIAL, <Z> FAIL.

Round-1 regression (must keep PASS):
  S-1 framer-motion: <N>/8 violate (Round-2: 0/8)
  S-2 useReducedMotion: <N>/8 wired (Round-2: 8/8)
  S-3 Hero image Q7: <PASS/FAIL> (Round-2 PASS)
  C-4 AnimateNumber tnum: <N>/8 (Round-2: 7/7)
  C-6 dark Tooltip contrast: <PASS/FAIL>
  …

Per-Query summary (Build | V1-V7 / 综合 Round-2 → Round-3):
  Q1 (warmth+茶饮)        : <...>
  Q2 (technical+数据中心)  : <...>
  Q3 (editorial+季刊)      : <...>
  Q4 (geometric+SaaS)      : <...>
  Q5 (impact+电竞)         : <...> (Round-2 build FAIL — Round-3 status)
  Q6 (ceremonial+腕表)     : <...>
  Q7 (warmth+Hero图)       : <...>
  Q8 (technical+Animate)   : <...>

Build pass rate          : <N>/8 (Round-2: 7/8)
Cross-Query V1-V7 总通过率: <X>/56

New Stable Failures (≥ 2/8) after v0.6 patches:
  <list, or "none — clean run">

Top patch suggestions for Cowork v0.7 (observations only, no patched wording):
  <listed in report § 8; explicit AGENT.md vs Design Prompt routing per Chris red-line>

Artifacts cp'd: <N> files in reports/Round-3-* subdirs.

If 7/7 patches PASS and Round-1 regression clean: R-116 can close, no v0.7 needed.
Else: Cowork starts R-117 (or v0.7 patch round).
```
