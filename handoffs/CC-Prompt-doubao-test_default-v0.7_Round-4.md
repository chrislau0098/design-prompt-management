# CC-Prompt · doubao Generation Test · default v0.7 · Round-4

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v0.8 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-4 duties:
1. **Verify the 2 v0.7 patches consume Round-3 failure modes** (F-2 body color FORBIDDEN HARD GATE + F-3 chart-hover OKLCH alpha derivation — see "Round-4 expected outcomes" below)
2. **Confirm Round-1/2/3 patches did NOT regress** (cumulative regression check — every prior win must stay PASS)
3. **Detect any new Stable Failures** surfaced once Round-3 blockers were closed

⚠️ **Chris's red-line carry from R-115/R-116/R-117**: Cowork applies a hard constraint that v0.8 (and future v*) must NOT contain `import` statements as engineering instructions, directory wildcard paths, build tool commands. If Round-4 generation surfaces issues that suggest a prompt-side patch involving such terms, route those to AGENT.md (sandbox spec) instead — do NOT propose them as v0.8 patch suggestions.

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-4 if either is missing.

### A 线 · Design Prompt v0.7
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.7.md` exists, **620 lines** (v0.6 was 620, v0.7 +8 -8 net 0).

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-3 baseline + cumulative regression
Read once before starting:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.6_Round-3.md` (primary baseline)
- Optionally `Robustness-Report_default-v0.5_Round-2.md` + `Robustness-Report_default-v0.4_Round-1.md` for cumulative regression citation

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-4 specifics

- **Design Prompt under test**: default v0.7 (frozen, 620 lines)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (identical shape to all prior rounds — 1:1 comparison)
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical to prior rounds
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.7-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.7_Round-4.md`

Round-4 holds user prompt assembly + Bitable mock + sandbox env constant vs Round-3. ONLY variable: Design Prompt v0.6 → v0.7.

---

## Pre-test red-line verify (mandatory before generating)

```bash
V07="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.7.md"

echo "--- must-exist (each ≥1 hit) — v0.5/v0.6 baseline + v0.7 patches ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V07" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V07" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V07" || echo 0)"
done

echo "--- framer-motion context check (both hits must be in FORBIDDEN/Don't sections) ---"
grep -n 'framer-motion' "$V07"
```

Expect: must-exist all ≥1; forbidden all = 0; red-line all = 0; framer-motion 2 hits both in FORBIDDEN/Don't. If any fails, stop & flag.

---

## Round-4 expected outcomes (the 2 v0.7 patches must close Round-3 failures)

Round-3 produced:
- **P-4 FAIL** (4/7 attempts violate body color discipline — Q2/Q3/Q5/Q7 body `<p>` used `var(--foreground-2)`)
- **P-5 PARTIAL** (1/3 BarChart cursor token applied; Q4=0/3; Q7 had `--chart-hover: oklch(14% ...)` hallucinated dark value)

v0.7 folded both into HARD-tagged §3 sections. Round-4 headline question: **did each patch consume the failure mode in doubao output?**

| # | Round-3 fail (baseline) | v0.7 fix mechanism | Round-4 expected |
|---|---|---|---|
| **F-2** | 4/7 attempts violate body color (`<p style={{color:'var(--foreground-2)'}}>`) | §3 line 104 "FORBIDDEN BODY COLOR — HARD GATE" + §9 cross-ref + §10 Don't | **0/8 attempts violate**. Body `<p>` color contrast ratio ≥ 7:1 against bg (WCAG AAA) across Q2/Q3/Q5/Q7/Q8 (dark modes especially). Source grep: `<p[^>]*foreground-[23]` = 0 across all attempts. |
| **F-3** | Q7 `--chart-hover: oklch(14% 0.008 ${pH} / 0.05)` hallucinated dark; cursor renders black | §3 lines 79-80 token table (`oklch(primaryL, pC, pH, 0.08)` light / `0.12` dark) + line 84 callout warning against `oklch(14% ...)` | **`--chart-hover` lightness = primaryL** (not 14% or any low-L value) across all attempts. Source grep `--chart-hover.*oklch\(1[0-9]%\|0\.1[0-9]\|14%` = 0. BarChart hover cursor visually = brand-tinted translucent overlay (not black). |

### Round-3 patch regression hygiene (the 7 v0.6 patches must STAY PASS in v0.7)

| # | v0.6 patch | Round-3 status | Round-4 must keep |
|---|---|---|---|
| P-1 light bg L≥0.95 | PASS source | Same |
| P-2 ceremonial ornament ≤30% | N/A (verifier selector miss) | Skip — verifier hasn't improved; observe-only |
| P-3 brand color + font fidelity | PASS Q1 | Same |
| P-4 body uses --foreground | FAIL — now addressed by v0.7 F-2 | (Subsumed; see F-2 verdict) |
| P-5 BarChart cursor token | PARTIAL — now addressed by v0.7 F-3 | (Subsumed; see F-3 verdict) |
| P-6 Hero 2-col grid HARD | PASS source / PARTIAL DOM (grid on inner div not section) | PASS source; DOM PARTIAL acceptable |
| P-7 Q4 shader = mesh | PASS | Same |

### Cumulative regression check (Round-1/2 wins must STAY PASS)

| # | Win | Round-3 status | Round-4 must keep |
|---|---|---|---|
| S-1 framer-motion forbidden | 0/8 violate | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 wired | ≥ 5/8 |
| S-3 Hero image archetype Q7 | build PASS / **runtime FAIL** (`max is not defined` boilerplate bug) | Q7 BUILD PASS + RUNTIME PASS (i.e. no `max is not defined` regression) |
| S-4 Q4 routes geometric | Geist font PASS | Same |
| S-5 Q5 data semantic preserved | KEEP 46 / STOLEN 5 | KEEP ≥ 40 / STOLEN ≤ 8 |
| C-4 AnimateNumber tabular-nums | 7/7 build-PASS attempts | ≥ 7/8 |
| C-6 dark Tooltip mode-explicit | UNVERIFIED (Q8 build fail) | Re-attempt verification (hover Q8 BarChart + Q2/Q4/Q5 if buildable) |

---

## 8 User Queries (unchanged from Round-1/2/3 — identical for 1:1 comparison)

All 8 share the same Bitable mock data. Only brand identity + style language + brand color + mode varies.

| Q# | Style 预期 | Brand color | Mode | Round-4 special focus |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | Brand color + Nunito sanity |
| Q2 | technical | #0EA5E9 | dark | **F-2 verify** body uses --foreground (was foreground-2 violator) |
| Q3 | editorial | #7C2D12 | light | **F-2 verify** body color (was 3 violator instances) |
| Q4 | geometric | #3B82F6 | dark | P-7 shader=mesh sanity + F-2 dark body color |
| Q5 | impact | #DC2626 | dark | **F-2 verify** body color (was 4 violator instances) |
| Q6 | ceremonial | #854D0E | light | P-2 ornament (skip verifier); P-3 EB Garamond first |
| Q7 | warmth + Hero img | #D97706 | light | **S-3 regression** Q7 must build + render (was runtime FAIL); **F-3 verify** chart-hover (was hallucinated 14% L) |
| Q8 | technical + Animate | #10B981 | dark | **S-? regression** Q8 must build (was wildcard import fail); **F-2** body color; **F-3** BarChart cursor |

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

## Step-by-step procedure (path swap v0.6 → v0.7; rest identical to Round-3)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.7) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.7.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from line 498-908 of legacy generate-prompt.txt}

=== USER QUERY ===
{Q<N> 的 User Query 文本}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v0.7-Q${N}-attempt-1"
  mkdir -p "default-v0.7-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.7-Q${N}-attempt-1/"
  # write generate-prompt.txt per Step 1
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.7-Q${N}-attempt-1" 2>&1 | tee "default-v0.7-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.7-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-3 procedure unchanged. **Mandatory hover Tooltip screenshot for dark-mode Queries (Q2/Q4/Q5/Q8) AND any attempt with BarChart** (for F-3 verify).

### Step 6 · Playwright DOM extraction (Round-4 reuses Round-3 enriched script)

`page.evaluate` script from Round-3 (markRatio / heroDisplay / heroGridCols / hasBarChart / primaryColor / bodyColor / etc.). Save JSON to `reports/dom/Q${N}.json`.

Round-4 NEW addition — also extract `bodyTextColor` from a sampled `<p>` element AND compute RGB→OKLCH offline to confirm L value matches `--foreground` not `--foreground-2`:

```javascript
// inside DOM script
const bodyP = document.querySelector('main p, article p, [class*=hero] [class*=lead], .rep-hero-lead, [class*=body] p');
const bodyTextColor = bodyP ? getComputedStyle(bodyP).color : null;
const bodySample = bodyP ? bodyP.textContent.slice(0, 60) : null;
// Add to return: bodyTextColor, bodySample
```

### Step 6.5 · Round-4 source grep (CRITICAL)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v0.7-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v0.7 patch verification ==="

# F-2 body color discipline (extended check)
BODY_FG2=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)|<p[^>]*color:\s*['\"]?var\(--fg-[23]\)" "$APP" || echo 0)
SPAN_BODY_FG2=$(grep -cE "<span[^>]*<p[^>]*foreground-[23]" "$APP" || echo 0)
LEAD_FG2=$(grep -cE "(lead|paragraph|description|body)[^>]*foreground-[23]" "$APP" || echo 0)
echo "F-2 <p> foreground-2/3       : $BODY_FG2 (expect 0)"
echo "F-2 lead/body foreground-2/3 : $LEAD_FG2 (expect 0, may have FPs)"

# F-3 chart-hover OKLCH derivation
CH_LOW_L=$(grep -cE "--chart-hover.*oklch\(0?\.1[0-9]|--chart-hover.*oklch\(1[0-9]%|--chart-hover.*oklch\(0\.[0-2]" "$APP" || echo 0)
CH_HIGH_L=$(grep -cE "--chart-hover.*oklch\(.*primaryL|--chart-hover.*oklch\(0?\.[3-7]" "$APP" || echo 0)
echo "F-3 chart-hover low-L (BAD)  : $CH_LOW_L (expect 0)"
echo "F-3 chart-hover primaryL-ish : $CH_HIGH_L (expect ≥1 if --chart-hover defined)"

# Q5 data semantic regression
if [ "$N" = "5" ]; then
  KEEP=$(grep -cE "月活用户|付费率|ARPU|NPS|累计交易额|广告 ROAS" "$APP" || echo 0)
  STOLEN=$(grep -cE "击杀|KDA|战绩|胜率|积分|比分" "$APP" || echo 0)
  echo "S-5 data label kept  : $KEEP  (expect ≥3)"
  echo "S-5 data label stolen: $STOLEN (expect ≤2)"
fi

# Q7 runtime regression — hexToOKLCH `max` undef bug
if [ "$N" = "7" ]; then
  HEX_OKLCH=$(grep -c "hexToOKLCH\|hexToOklch" "$APP" || echo 0)
  MAX_UNDEF=$(grep -cE "Math\.max\(|\bmax\(" "$APP" || echo 0)
  echo "S-3 Q7 hexToOKLCH custom impl: $HEX_OKLCH (if ≥1, check max/Math.max bound)"
  echo "S-3 Q7 max(...) calls         : $MAX_UNDEF (expect Math.max not bare max)"
fi

# Q8 wildcard import regression — should be sandbox AGENT.md problem not Design Prompt; report as engineering route
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "ENG-1 wildcard import regress: $WILDCARD (Round-3 Q8 saw this; should route AGENT.md)"

# Round-3 regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
URM=$(grep -c "useReducedMotion" "$APP" || echo 0)
GRID_HERO=$(grep -cE "grid-template-columns:\s*1\.15fr|gridTemplateColumns.*1\.15fr|grid-template-columns:\s*1fr 1fr" "$APP" || echo 0)
echo "Regression framer-motion     : $FM (expect 0)"
echo "Regression useReducedMotion  : $URM (expect ≥1)"
echo "Regression Hero grid         : $GRID_HERO (expect ≥1)"

# F-2 / F-3 / Q5 / Q7 / Q8 / Round-3 regression — collected here per attempt
```

### Step 7 · Design Skill 评分

Round-3 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.7_Round-4.md`

### 9 headline sections

#### 1. Round-3 → Round-4 patch verdicts (HEADLINE)

| # | Patch | Round-3 baseline | Round-4 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| F-2 | FORBIDDEN BODY COLOR HARD GATE | 4/7 violate | <N>/8 violate | PASS/FAIL/PARTIAL | source grep BODY_FG2 + DOM bodyTextColor contrast |
| F-3 | --chart-hover OKLCH alpha derivation | Q7 hallucinated 14% L | <N>/8 attempts use primaryL-ish | PASS/FAIL/PARTIAL | source grep CH_LOW_L + Tooltip screenshot |

Headline: "X/2 v0.7 patches PASS, Y PARTIAL, Z FAIL."

#### 2. Round-3 patch regression hygiene (P-1 ~ P-7 must stay where they were)

Table: same as "Round-3 patch regression hygiene" in expected outcomes. P-4 / P-5 subsumed by F-2 / F-3. Highlight any of P-1, P-3, P-6, P-7 that regressed.

#### 3. Cumulative regression (Round-1/2 wins must stay)

S-1 / S-2 / S-3 / S-4 / S-5 / C-4 / C-6 — same shape as Round-3.

#### 4. Per-Query 验证表 (V1-V7)

Same as Round-3 with extra column "Round-3 → Round-4 综合 delta".

#### 5. New Stable Failures (≥ 2/8 in Round-4, NOT seen in Round-3)

What surfaced once v0.7 closed Round-3 SFs.

#### 6. Single Failures (1/8 only) — Noise

#### 7. Cross-skill diagnostic convergence

#### 8. Patch suggestions to Cowork (for v0.8, if needed)

Concrete observations only. No patched wording. Maximum 5 suggestions, P0 > P1 > P2.

⚠️ Chris's red-line: do NOT propose suggestions that require Design Prompt to describe `import` statements / directory paths / build tool commands / package paths. Route engineering issues to AGENT.md. Note explicitly which patches go AGENT.md vs Design Prompt.

#### 9. Convergence assessment

This is the headline value of Round-4. State explicitly:
- If F-2 + F-3 both PASS AND no new SF ≥ 2/8: **v0.7 reaches stable / production**. Cowork can close R-118 without v0.8.
- If 1 PARTIAL or new SF surfaces: **small follow-up patch round needed** (R-119 / v0.8).
- If 2 FAIL or major regression: **substantive patch round needed**.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-4-app-tsx" "$DST/Round-4-screenshots" "$DST/Round-4-critic" "$DST/Round-4-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.7-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-4-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-4-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.7-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-4-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-4-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v0.7_Round-4.md"

echo "--- Round-4 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-4-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-4-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-4-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-4-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.7_Round-4.md" ] && echo present || echo MISSING)"
```

Expected: ~60-70 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v0.7 + B sandbox + C Round-3 report)
- [ ] Pre-test red-line: 21 must-exist ≥1 + 9 forbidden = 0 + 7 engineering red-line = 0
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] 8 Queries generate-prompt.txt 各独立
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM + Step 6.5 source-grep
- [ ] dark-mode + BarChart-containing Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1
- [ ] Robustness Report 9 sections 都填实质
- [ ] §1 头条 2 patch 都有 Round-3 baseline + Round-4 actual + evidence
- [ ] §2 Round-3 regression 7 项都填
- [ ] §3 Cumulative regression 7 项都填
- [ ] §9 Convergence assessment 给出明确判断(PASS production / 小 follow-up / 大 patch)
- [ ] § 8 patch suggestions 严守 Chris 工程红线
- [ ] cp-to-vault tally ~60-70

---

## Output to Chris on completion

```
doubao default v0.7 生成测试 Round-4 complete.

Design Prompt under test: default v0.7 (620 lines, frozen)
Round-3 baseline: Robustness-Report_default-v0.6_Round-3.md
Round-4 report  : Robustness-Report_default-v0.7_Round-4.md

Pre-test red-line verify: <PASS/FAIL>
Engineering red-line(Chris HARD): <PASS/FAIL>

2 v0.7 patch verdicts (Round-3 baseline → Round-4 actual):
  F-2 FORBIDDEN BODY COLOR HARD GATE : <PASS/FAIL/PARTIAL>
       Round-3: 4/7 violate · Round-4: <N>/8 violate
       Q2/Q3/Q5/Q7 body color status: <details>
  F-3 --chart-hover OKLCH alpha       : <PASS/FAIL/PARTIAL>
       Round-3: Q7 hallucinated 14% L · Round-4: <N>/8 attempts at primaryL-ish
       BarChart hover screenshots: <brand-tinted / black / N/A>

Headline: <X>/2 v0.7 patches PASS, <Y> PARTIAL, <Z> FAIL.

Round-3 patch regression hygiene (P-1~P-7 must stay):
  P-1 light bg L≥0.95         : <PASS/FAIL>
  P-3 brand color + font      : <PASS/FAIL>
  P-6 Hero 2-col grid (source): <PASS/FAIL>
  P-7 Q4 mesh shader          : <PASS/FAIL>

Cumulative regression (Round-1/2 wins must stay):
  S-1 framer-motion: <N>/8 (Round-3: 0/8)
  S-2 useReducedMotion: <N>/8 (Round-3: 8/8)
  S-3 Hero image Q7 (build+runtime): <PASS/FAIL> (Round-3 runtime FAIL)
  S-5 Q5 semantic KEEP/STOLEN: <N>/<M> (Round-3: 46/5)
  C-4 AnimateNumber tnum: <N>/8 (Round-3: 7/8)
  C-6 dark Tooltip contrast: <PASS/FAIL>

Per-Query summary (Build | V1-V7 / 综合 Round-3 → Round-4):
  Q1-Q8 …

Build pass rate          : <N>/8 (Round-3: 7/8)

New Stable Failures (≥ 2/8) after v0.7:
  <list, or "none — clean run">

Top patch suggestions for Cowork v0.8 (Chris 红线 honored):
  <listed in report § 8 with explicit AGENT.md vs Design Prompt routing>

Convergence assessment:
  <PRODUCTION-READY / small follow-up needed / substantive patch needed>

Artifacts cp'd: <N> files in reports/Round-4-* subdirs.

If F-2 + F-3 both PASS + no new SF: R-118 closes, v0.7 is the stable baseline.
Else: Cowork starts R-119 (small) or substantive patch round.
```
