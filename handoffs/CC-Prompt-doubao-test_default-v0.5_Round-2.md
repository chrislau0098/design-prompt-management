# CC-Prompt · doubao Generation Test · default v0.5 · Round-2

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v0.6 patches

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-2 has two extra duties beyond Round-1:
1. **Verify the 9 Round-1 patches landed** in doubao output (Stable Failure consumption — see "Round-2 expected outcomes" below)
2. **Run Q7 properly** (Round-1 SKIPPED because v0.4 lacked the `Hero image` archetype — v0.5 §15 now ships it)

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-2 if either is missing.

### A 线 · Design Prompt v0.5
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.5.md` exists, **620 lines** (v0.4 was 649). The file is the SoT for this Round — every patch verification below cites a v0.5 §section.

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py` exists, points to model `doubao-seed-2-0-code-preview-260215`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md` exists, lists paper-shaders / motion-plus / shadcn / recharts / lucide-react
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env_legacy/` is the legacy folder — ignore
- `ARK_API_KEY` env var is set (`echo "${ARK_API_KEY:0:8}..."` to confirm; empty → stop & ask user)

### C 线 · Round-1 baseline available
The Round-1 Robustness Report exists at
`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md`
Read it once before starting. You will cite Round-1 numbers in the Round-2 report.

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-2 specifics

- **Design Prompt under test**: default v0.5 (frozen, 620 lines)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (Round-1 used the same shape — comparisons are 1:1)
- **doubao config**: temperature 0.7, max_tokens 32000 (per `generate.py`)
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical to Round-1
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.5-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.5_Round-2.md`

Round-2 holds the user prompt assembly + Bitable mock + sandbox env constant vs Round-1. The ONLY variable is Design Prompt v0.4 → v0.5. Any behavior delta between Round-1 and Round-2 attempts is attributable to the prompt change.

---

## Pre-test red-line verify (mandatory before generating)

Run on v0.5 body. Patterns split into "must-exist" (≥1 hit) and "forbidden" (= 0 hit, i.e. v0.5 should not regress to old anti-patterns).

```bash
V05="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.5.md"
echo "--- must-exist (each ≥1 hit) ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'ReportMode'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V05" || echo 0)"
done
echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V05" || echo 0)"
done
```

Expect all must-exist ≥1 and all forbidden = 0. If any fails, stop and flag — v0.5 should already pass (Cowork ran this when extracting). Do not start generation until this passes.

Note: `framer-motion` MUST appear (it's in the forbidden-import callout — verify it's only in that context, not as an actual import recommendation). Do: `grep -n -A1 'framer-motion' "$V05"` and confirm both hits live under a "FORBIDDEN" or "Don't" heading.

---

## Round-2 expected outcomes (the 9 v0.5 patches must land)

Round-1 produced 5 Stable Failures / patch suggestions (S-1 through S-5) plus 4 Cowork-side visual fixes (C-2, C-3, C-4, C-6) — Opus folded all 9 into v0.5. Round-2's headline question is: **did each patch consume the failure mode in doubao output?**

| # | Round-1 fail (baseline) | v0.5 fix mechanism (§ in prompt) | Round-2 expected |
|---|---|---|---|
| **S-1** | framer-motion forbidden import 2/7 (Q3, Q5) | §7 line 222 "FORBIDDEN IMPORT — HARD GATE" + §10 Don't | **0/7** attempts import from `framer-motion`. ALL motion imports come from `motion/react`. |
| **S-2** | useReducedMotion correct-path 0/7 (5 skipped, 2 wrong package) | §7 line 250 per-primitive rule + §17 snippet inline `reduced = useReducedMotion()` in 3 sites | **≥ 5/7** attempts call `useReducedMotion` from `motion/react` AND act on the value (instant AnimateNumber / static motion.div / shader speed=0) |
| **S-3** | Hero image archetype missing (Q7 SKIPPED) | §15 line 472 `hero_image_url` archetype + §17 snippet + §18 mutex with shader | **Q7 builds + renders** with `<img>` Hero background. heroImg DOM check non-empty. Title text legible over image (overlay applied). |
| **S-4** | Q4 (SaaS+科技) mis-routed → mixed geometric/technical signals | §2 Style Routing conflict priority (SaaS → geometric; 数据中心 → technical) | **Q4 routes geometric**: title font Geist; Hero shader = mesh; chapter opener variant = geometric (vertical bar + uppercase mono num). |
| **S-5** | Q5 销售数据 recontextualized to 电竞战绩 (semantic theft) | §2 line 51 "Data semantic preservation (HARD)" + §10 Don't "Recontextualize data semantic" | **Q5 keeps the 销售业绩 semantic** (Q1 sales KPI 28 records, fields like 月活/付费率/ARPU). Brand language stays 电竞 but data labels/units don't morph into kills/scores. |

### Cowork-side visual patches (C-row) — verify they're operative in output

| # | Round-1 fail | v0.5 fix mechanism | Round-2 expected |
|---|---|---|---|
| **C-2** | Default Hero centered single-column (was sole layout) | §14.1 line 433 default 2-col grid 1.15fr 1fr | **Hero default DOM** shows left-column copy block + right-column peak number block. NOT a single centered stack. |
| **C-3** | Default ChapterStamp single visual (legacy Badge `CH · NN`) | §15 line 478 6-variant table per font_family | **ChapterStamp per attempt matches its font_family variant** (geometric → vertical bar / editorial → large outline italic serif / technical → `[CH-NN]` bracket / warmth → circle filled / impact → huge bold / ceremonial → ◆ ornament). |
| **C-4** | AnimateNumber digits overlapped in proportional fonts (geometric / ceremonial F-1 / F-3) | §17 line 550 "Tabular numerics (HARD)" — `tnum` + `lining-nums` + `letterSpacing 0` on wrapper + AnimateNumber both | **Every AnimateNumber call site** in generated JSX carries `fontFeatureSettings '"tnum" 1, "lnum" 1'` AND `fontVariantNumeric 'tabular-nums lining-nums'` on the wrapper. No digit overlap in screenshots. |
| **C-6** | dark Tooltip text rendered black (var(--fg) escaped scope) | §13 line 414 mode-explicit hex + §17 Tooltip snippet | **Q2, Q4, Q5, Q8 (dark modes) Tooltip text legibility**: hover any chart point at 2.5s — Tooltip body text contrast against bg ≥ 4.5:1. |

### Q7 dedicated verification (Round-1 SKIPPED — Round-2 must complete)

Q7 user query supplies a Hero image URL. v0.5 §15 now defines `hero_image_url` archetype. Q7 attempt MUST:
- Render `<img>` element inside Hero section (DOM query: `[class*=hero] img` non-empty)
- Render an overlay element above the `<img>` (semitransparent, mode-adaptive — light = lower opacity, dark = higher)
- Suppress the WebGL shader inside Hero (mutex per §18)
- Keep title legible — character contrast over image+overlay ≥ 4.5:1 measured at top-of-Hero

If Q7 builds but Hero `<img>` is absent → Hero image archetype not consumed → mark S-3 FAIL.
If Q7 builds with `<img>` but title is unreadable → overlay rule not consumed → mark S-3 PARTIAL.

---

## 8 User Queries (unchanged from Round-1 — identical to enable 1:1 comparison)

All 8 share the same Bitable mock data (华东大区 Q1销售业绩 KPI). Only the brand identity + style language + brand color + mode varies.

| Q# | Style 预期 | Brand color | Mode | Round-2 special focus |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | C-3 ChapterStamp = warmth circle variant |
| Q2 | technical | #0EA5E9 | dark | C-3 = technical bracket / C-6 dark Tooltip |
| Q3 | editorial | #7C2D12 | light | S-1 verify (Round-1: framer-motion regression here) / C-3 = editorial outline italic |
| Q4 | geometric | #3B82F6 | dark | **S-4 verify** routes geometric (Round-1: mis-routed to technical) / C-3 = geometric vertical bar / C-6 dark Tooltip |
| Q5 | impact | #DC2626 | dark | **S-5 verify** data semantic preserved / S-1 verify (Round-1: framer-motion regression here) / C-6 dark Tooltip |
| Q6 | ceremonial | #854D0E | light | C-3 = ceremonial ◆ ornament / C-4 AnimateNumber tabular-nums (Round-1: digit overlap risk) |
| Q7 | warmth + Hero img | #D97706 | light | **S-3 verify** Hero image archetype lands |
| Q8 | technical + Animate | #10B981 | dark | S-2 useReducedMotion verify / C-6 dark Tooltip |

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

## Step-by-step procedure (identical to Round-1 except path swaps to v0.5)

### Step 1 · 构造 generate-prompt.txt (per Query)

For each Query Q<N>, write the following structure to `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt` (overwrite):

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Use only the libraries listed in AGENT.md (paper-shaders, motion-plus/react, motion/react, recharts, lucide-react, shadcn/ui under @/components/ui/*)
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.5) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.5.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{从当前 generate-prompt.txt line 498-908 抽取的 mock JSON 段,整段不动}

=== USER QUERY ===
{Q<N> 的 User Query 文本}

Output the code block now.
```

Mock data section identical across all 8 Queries. Only USER QUERY block changes.

### Step 2 · 创建 attempt 目录

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v0.5-Q${N}-attempt-1"
  mkdir -p "default-v0.5-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.5-Q${N}-attempt-1/"
done
```

### Step 3 · 调用 doubao (sequential)

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  # write generate-prompt.txt for Q<N> per Step 1 (you compose programmatically)
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.5-Q${N}-attempt-1" 2>&1 | tee "default-v0.5-Q${N}-attempt-1/gen.log"
done
```

Rules:
- Sequential, no concurrency
- Timeout >180s or no ```tsx fence → mark FAIL, continue
- Record App.tsx line count + import statements per attempt

### Step 4 · build 验证

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.5-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
  echo "Q${N} build exit: $?"
done
```

Record build status (PASS / FAIL + first error line).

### Step 5 · dev server + playwright (per build-PASS)

```bash
cd "default-v0.5-Q${N}-attempt-1"
pnpm run dev > dev.log 2>&1 &
DEV_PID=$!
sleep 5
PORT=$(grep -oE 'http://localhost:[0-9]+' dev.log | head -1 | grep -oE '[0-9]+$')
```

Playwright:
1. `navigate http://localhost:${PORT}`
2. `waitForLoadState networkidle` (10s timeout)
3. `screenshot full page` → `reports/screenshots/Q${N}-t0.png`
4. wait 2500ms (AnimateNumber ramp)
5. `screenshot full page` → `reports/screenshots/Q${N}-stable.png`
6. For dark-mode Queries (Q2/Q4/Q5/Q8): hover a chart data point, wait 600ms, screenshot Tooltip → `reports/screenshots/Q${N}-tooltip.png` (then move mouse away)
7. Run Step 6 DOM extraction
8. `kill $DEV_PID`

### Step 6 · Playwright DOM extraction

`page.evaluate` with this exact script. Save output as JSON to `reports/dom/Q${N}.json`:

```javascript
() => {
  const safeFont = el => el ? getComputedStyle(el).fontFamily : null;
  const safeBg   = el => el ? getComputedStyle(el).backgroundColor : null;
  const safeCol  = el => el ? getComputedStyle(el).color : null;

  const titleEl  = document.querySelector('h1, [class*=hero] [class*=title], [class*=Hero] [class*=Title]');
  const numberEl = document.querySelector('[class*=bignum], [class*=BigNum], [class*=metric] [class*=value], [class*=hero] [class*=number]');
  const bodyEl   = document.querySelector('main p, article p, [class*=body], [class*=Body]');
  const heroEl   = document.querySelector('[class*=hero], [class*=Hero]');

  const heroCanvas = heroEl?.querySelector('canvas') ?? null;
  const heroImg    = heroEl?.querySelector('img') ?? null;
  const heroBgImage = heroEl ? getComputedStyle(heroEl).backgroundImage : null;

  const animatedNumbers = document.querySelectorAll('[data-motion-id], [class*=animate-number], [class*=AnimateNumber]');

  // R-2 extra · tabular-nums verification on animated wrappers
  const animatedNumsWithTnum = Array.from(animatedNumbers).filter(el => {
    const s = getComputedStyle(el);
    return s.fontVariantNumeric.includes('tabular') || s.fontFeatureSettings.includes('tnum');
  });

  const bigNumEls = document.querySelectorAll('[class*=bignum], [class*=BigNum], [class*=metric] [class*=value], [class*=hero] [class*=number]');
  const overflows = Array.from(bigNumEls)
    .filter(el => {
      const parent = el.parentElement;
      if (!parent) return false;
      return el.scrollWidth > parent.clientWidth + 1 || el.scrollHeight > parent.clientHeight + 1;
    })
    .map(el => ({ text: el.textContent.trim().slice(0, 40), elW: el.scrollWidth, parentW: el.parentElement.clientWidth }));

  const charts = document.querySelectorAll('svg.recharts-surface, .recharts-wrapper, canvas[class*=chart], [class*=Chart] canvas, [class*=Chart] svg');
  const cards = document.querySelectorAll('[class*=card], [class*=Card], section');

  // R-2 extra · Hero layout grid check (C-2)
  const heroGridCols = heroEl ? getComputedStyle(heroEl).gridTemplateColumns : null;

  return {
    fonts: { title: safeFont(titleEl), number: safeFont(numberEl), body: safeFont(bodyEl) },
    colors: { bodyBg: safeBg(document.body), heroBg: safeBg(heroEl), heroColor: safeCol(heroEl) },
    hero: {
      canvas: heroCanvas ? { w: heroCanvas.width, h: heroCanvas.height } : null,
      img: heroImg ? { src: heroImg.src, naturalW: heroImg.naturalWidth, naturalH: heroImg.naturalHeight } : null,
      bgImage: heroBgImage && heroBgImage !== 'none' ? heroBgImage : null,
      gridCols: heroGridCols,
    },
    animateCount: animatedNumbers.length,
    animateWithTnum: animatedNumsWithTnum.length,
    overflows,
    chartCount: charts.length,
    cardCount: cards.length,
    bodyTextLength: document.body.innerText.length,
  };
}
```

### Step 6.5 · Round-2 specific source grep (CRITICAL — does NOT exist in Round-1)

After Step 6 DOM extraction, also run a source-code grep on the generated `src/App.tsx` to verify Round-1 fail modes don't recur in code:

```bash
cd "default-v0.5-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code patch verification ==="

# S-1: framer-motion forbidden
FM_HITS=$(grep -c "from ['\"]framer-motion['\"]" "$APP" 2>/dev/null || echo 0)
echo "S-1 framer-motion imports : $FM_HITS (expect 0)"

# S-2: useReducedMotion from motion/react + actual use
URM_IMPORT=$(grep -c "useReducedMotion.*from ['\"]motion/react['\"]" "$APP" || echo 0)
URM_USE=$(grep -c "useReducedMotion()" "$APP" || echo 0)
echo "S-2 useReducedMotion import: $URM_IMPORT (expect ≥1 if any motion used)"
echo "S-2 useReducedMotion call  : $URM_USE   (expect ≥1)"

# S-5 (Q5 only): data label preservation
if [ "$N" = "5" ]; then
  KEEP=$(grep -cE "月活用户|付费率|ARPU|NPS|累计交易额|广告 ROAS" "$APP" || echo 0)
  STOLEN=$(grep -cE "击杀|KDA|战绩|胜率|积分|比分" "$APP" || echo 0)
  echo "S-5 data label kept  : $KEEP  (expect ≥3)"
  echo "S-5 data label stolen: $STOLEN (expect 0)"
fi

# C-4: tabular-nums on AnimateNumber wrappers (source-side)
TNUM=$(grep -cE "tnum|tabular-nums" "$APP" || echo 0)
ANUM=$(grep -c "AnimateNumber" "$APP" || echo 0)
echo "C-4 tabular-nums refs    : $TNUM (expect ≥ AnimateNumber count $ANUM if any)"

# C-2 (default 2-col grid) — look for grid-template-columns hint
G2C=$(grep -cE "grid-template-columns|gridTemplateColumns" "$APP" || echo 0)
echo "C-2 grid layout refs     : $G2C"
```

Save output to `reports/source-grep/Q${N}.txt`. This is the single most important Round-2 differentiator from Round-1 — patch verification needs source evidence, not just DOM.

### Step 7 · Design Skill 评分 (unchanged from Round-1)

For each build-PASS attempt, invoke:
1. **impeccable** — a11y / craft
2. **design-taste-frontend** — visual taste
3. **emil-design-eng** — motion review
4. **design-principles** (vault-internal — skip silently if not in session)

Save per-skill output to `default-v0.5-Q${N}-attempt-1/critic/{skill}.md`.

Plus **motion-audit** once across attempts (single output `reports/motion-audit-finding.md`).

### Step 8 · 写 Robustness Report + cp-to-vault

See sections below.

---

## 7 验证点 + 评分维度 (unchanged from Round-1)

| # | Verification | 通过标准 |
|---|---|---|
| V1 | Hero shader 动效 | `hero.canvas` 不为空 + shader 类型与 style 预期匹配; OR `hero.img` 存在(Q7) |
| V2 | 字体搭配 | `fonts.title` 与 STYLE_PRESETS 预期 stack 首项匹配 |
| V3 | 配色约束 | `colors.bodyBg` OKLCH L 在 light≥0.95 / dark≤0.16 |
| V4 | 图表组件 | `chartCount` ≥ 1 |
| V5 | 大数字跑版 | `overflows` 数组长度 = 0 |
| V6 | AnimateNumber | `animateCount` ≥ 1 + `animateWithTnum == animateCount` (C-4 verify) |
| V7 | Hero 图片背景 | Q7: `hero.img` 或 `hero.bgImage` 非空 + title 可读 |

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.5_Round-2.md`

### 8 headline sections (in order)

#### 1. Round-1 → Round-2 patch verdicts (HEADLINE)

This is the single most important section. For each of the 9 v0.5 patches (5 R-111 SF + 4 C-row), report PASS / FAIL / PARTIAL with concrete evidence.

| # | Patch | Round-1 baseline | Round-2 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| S-1 | framer-motion forbidden | 2/7 attempts violate (Q3, Q5) | <N>/8 violate | PASS / FAIL | `grep -n framer-motion default-v0.5-Q*/src/App.tsx` output |
| S-2 | useReducedMotion ≥5/7 correct-path | 0/7 spec-correct | <N>/8 | PASS / FAIL / PARTIAL | grep useReducedMotion() count + actual use sites |
| S-3 | Hero image archetype (Q7) | SKIPPED | Q7 build <PASS/FAIL>; hero.img non-empty <Y/N>; title legible <Y/N> | PASS / FAIL / PARTIAL | Q7 screenshot + DOM JSON |
| S-4 | Q4 routes geometric | Q4 mis-routed (mixed signals) | Q4 title font + chapter variant + shader type | PASS / FAIL | DOM extraction for Q4 |
| S-5 | Q5 data semantic preserved | Stolen → 电竞 kills/scores | Q5 KEEP-vs-STOLEN grep counts | PASS / FAIL | Step 6.5 grep output |
| C-2 | Hero 2-col grid (default) | Single centered stack | <N>/8 attempts use 2-col grid | PASS / FAIL / PARTIAL | DOM `heroGridCols` values |
| C-3 | ChapterStamp 6 variant | Single Badge "CH · NN" | <N>/8 attempts match font_family variant | PASS / FAIL / PARTIAL | Screenshot diff per Q |
| C-4 | AnimateNumber tabular-nums | Digits overlap (geometric, ceremonial) | <N>/8 wrappers carry tnum | PASS / FAIL | DOM `animateWithTnum == animateCount` |
| C-6 | dark Tooltip mode-explicit | Tooltip body black on dark bg | Q2/Q4/Q5/Q8 Tooltip text contrast | PASS / FAIL / PARTIAL | Tooltip screenshots + computed color contrast |

Headline summary line: "X/9 patches PASS, Y PARTIAL, Z FAIL."

#### 2. Per-Query 验证表 (V1-V7)

| Q# | Style | Brand | Mode | Build | V1 Shader | V2 Font | V3 Color | V4 Chart | V5 NoOvf | V6 Anim | V7 HeroImg | 综合 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | … | … |
| ... |

Compare 综合 grade vs Round-1 if applicable (e.g. "Q1 A- → A").

#### 3. New Stable Failures (≥ 2/8 occurrences) — surfaced once Round-1 blockers closed

What broke once Round-1 SFs were consumed? Format identical to Round-1 § Stable Failures.

#### 4. Single Failures (1/8) — Noise

Listed and de-emphasized.

#### 5. Cross-Query 共性问题

Qualitative themes — what doubao still mis-handles even with v0.5.

#### 6. Cross-skill diagnostic convergence

Themes raised by 2+ design skills.

#### 7. Build / 生成统计

| Q# | App.tsx lines | imports used | imports unused | violations |

Compare to Round-1 stats if available (delta column).

#### 8. Patch suggestions to Cowork (for v0.6)

Concrete observations only. No patched wording. Format identical to Round-1.

Maximum 5 suggestions, P0 > P1 > P2.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-2-app-tsx" "$DST/Round-2-screenshots" "$DST/Round-2-critic" "$DST/Round-2-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.5-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-2-app-tsx/Q${N}-App.tsx" || echo "skip Q${N} (no App.tsx)"
done

# Screenshots: t0 + stable + (dark Queries) tooltip
for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-2-screenshots/Q${N}-${stage}.png" || true
  done
done

# Critic outputs
for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.5-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-2-critic/Q${N}-${skill}.md" || true
  done
done

# Round-2 specific: source-grep outputs
for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-2-source-grep/Q${N}.txt" || true
done

[ -f "$DST/motion-audit-finding.md" ] && echo "motion-audit present" || echo "WARN motion-audit missing"
ls -la "$DST/Robustness-Report_default-v0.5_Round-2.md"

echo "--- Round-2 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-2-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-2-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-2-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-2-source-grep/" 2>/dev/null | wc -l)"
echo "Motion audit      : $([ -f "$DST/motion-audit-finding.md" ] && echo present || echo MISSING)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.5_Round-2.md" ] && echo present || echo MISSING)"
```

Expected tally (8 build PASS best case):
- App.tsx: 8
- Screenshots: ~20 (8×t0 + 8×stable + 4×tooltip for dark Queries)
- Critic files: 24-32
- Source grep: 8
- Motion audit: 1
- Report: 1
**Total target: ~64 files**

---

## Self-check (before reporting back to Chris)

- [ ] Prerequisites verified (A 线 v0.5 文件 + B 线 generate.py + AGENT.md + ARK_API_KEY + C 线 Round-1 report)
- [ ] Pre-test red-line verify: 17 must-exist patterns ≥1 hit + 9 forbidden patterns = 0 hit
- [ ] `framer-motion` grep on v0.5 shows it only in forbidden / Don't context
- [ ] 8 个 Query 都构造了独立 generate-prompt.txt
- [ ] 8 次 doubao 调用都跑完
- [ ] 每个 build-PASS attempt 都跑了 pnpm build + playwright + DOM 提取 + 截图
- [ ] Step 6.5 source-grep on every attempt (Q5 with extra KEEP-vs-STOLEN check)
- [ ] dark-mode Queries (Q2/Q4/Q5/Q8) hover Tooltip 截图各 1
- [ ] 每个 build-PASS attempt 至少跑了 3 个 design skill
- [ ] motion-audit 跑了 1 次
- [ ] Robustness Report 写完 + 8 sections 都填实质内容
- [ ] cp-to-vault tally ~64 files
- [ ] Headline section 1 (Round-1 → Round-2 patch verdicts) 9 行都填 PASS/FAIL/PARTIAL + 证据
- [ ] Patch suggestions ≤ 5 条,每条有 evidence + section to revisit + why insufficient
- [ ] 报告中无 patched wording

---

## Output to Chris on completion

```
doubao default v0.5 生成测试 Round-2 complete.

Design Prompt under test: default v0.5 (620 lines, frozen)
Round-1 baseline report: /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md
Test cwd: /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/
Robustness Report: /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.5_Round-2.md

Pre-test red-line verify: <PASS/FAIL>

9 patch verdicts (Round-1 baseline → Round-2 actual):
  S-1 framer-motion forbidden    : <PASS/FAIL/PARTIAL> · Round-1 2/7 → Round-2 <N>/8
  S-2 useReducedMotion per-prim  : <PASS/FAIL/PARTIAL> · Round-1 0/7 → Round-2 <N>/8
  S-3 Hero image archetype       : <PASS/FAIL/PARTIAL> · Round-1 SKIPPED → Round-2 Q7 <PASS/FAIL>
  S-4 Q4 SaaS routes geometric   : <PASS/FAIL/PARTIAL> · Round-1 mis-routed → Round-2 <PASS/FAIL>
  S-5 Q5 data semantic preserved : <PASS/FAIL/PARTIAL> · Round-1 stolen → Round-2 <PASS/FAIL>
  C-2 Hero 2-col grid (default)  : <PASS/FAIL/PARTIAL>
  C-3 ChapterStamp 6 variant     : <PASS/FAIL/PARTIAL>
  C-4 AnimateNumber tabular-nums : <PASS/FAIL/PARTIAL>
  C-6 dark Tooltip mode-explicit : <PASS/FAIL/PARTIAL>

Headline: <X>/9 patches PASS, <Y> PARTIAL, <Z> FAIL.

Per-Query summary (Build | V1-V7 pass count):
  Q1 (warmth+茶饮)        : <...>
  Q2 (technical+数据中心)  : <...>
  Q3 (editorial+季刊)      : <...>
  Q4 (geometric+SaaS)      : <...>
  Q5 (impact+电竞)         : <...>
  Q6 (ceremonial+腕表)     : <...>
  Q7 (warmth+Hero图)       : <...> + HeroImg verification: <PASS/FAIL>
  Q8 (technical+Animate)   : <...>

Build pass rate          : <N>/8 (Round-1: 7/7 — note Q7 SKIPPED so denominator was 7)
Cross-Query V1-V7 总通过率: <X>/56

New Stable Failures (≥ 2/8) surfaced after Round-1 blockers closed:
  <list, or "none — clean run">

Cross-skill convergence:
  <themes>

Top patch suggestions for Cowork v0.6 (no wording, observations only):
  <listed in report § 8>

Artifacts cp'd: <N> files in reports/Round-2-* subdirs.
Ready for Cowork to author v0.6 patch (or close R-115 if all 9 patches PASS).
```
