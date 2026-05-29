# CC-Prompt · doubao Generation Test · default v0.8 · Round-5

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v0.9 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-5 duties:
1. **Verify the 2 v0.8 P0 patches consume Round-4 failure modes** (V08-P0-1 F-2 body color HARD GATE rewrite + V08-P0-2 函数名诱导 — see "Round-5 expected outcomes" below)
2. **Confirm 4 v0.8 P1 教学剪 didn't cause regressions** (L84/L100/L261/L425/L438 cosmetic deletions must stay neutral)
3. **Confirm AnimateNumber 区域 0 改 invariant** (S-2/C-4 must stay AT THE SAME LEVEL — no improvement expected, no regression tolerable)
4. **Confirm Round-1/2/3/4 cumulative wins did NOT regress**
5. **Detect any new Stable Failures** surfaced once Round-4 blockers were closed

⚠️ **Chris's red-line carry from R-115/R-116/R-117/R-118/R-120**: Cowork applies a hard constraint that v0.9 (and future v*) must NOT contain `import` statements as engineering instructions, directory wildcard paths, build tool commands. If Round-5 generation surfaces issues that suggest a prompt-side patch involving such terms, route those to AGENT.md (sandbox spec) instead — do NOT propose them as v0.9 patch suggestions.

⚠️ **R-120 explicit constraint**: AnimateNumber 整段(§4 L189 / §7 L267-289 / §17 L559-582 含 Reason)在 v0.8 是 0 改动。若 Round-5 出现 AnimateNumber 相关 regression(`tabular-nums` 丢失 / `useReducedMotion` 不在 wrapper 顶 / parseDisplayValue 误改),不属于 v0.8 改动可解释范围,需要单独 flag(可能是 doubao 自身波动)。

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-5 if either is missing.

### A 线 · Design Prompt v0.8
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.8.md` exists, **620 lines** (same as v0.7 — 8 处 edits 净行数 0 改).

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-4 baseline + cumulative regression
Read once before starting:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.7_Round-4.md` (primary baseline)
- Optionally `Robustness-Report_default-v0.6_Round-3.md` for cross-round regression citation

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-5 specifics

- **Design Prompt under test**: default v0.8 (frozen, 620 lines; R-120 8 处精细外科手术 patches over v0.7)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (identical shape to all prior rounds — 1:1 comparison)
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical to prior rounds
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.8-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.8_Round-5.md`

Round-5 holds user prompt assembly + Bitable mock + sandbox env constant vs Round-4. ONLY variable: Design Prompt v0.7 → v0.8.

---

## What changed v0.7 → v0.8 (R-120 patch summary)

8 处 line-level edits, 净行数 0 改动, AnimateNumber 区域 0 触及:

| # | Line | Type | v0.7 → v0.8 essence |
|---|------|------|---------------------|
| 1 | L64 | **P0 函数名诱导** | `hexToOKLCH(brand_color)` 函数调用 → `brand_color → (pL, pC, pH) in OKLCH` 抽象描述 |
| 2 | L84 | P1 教学剪 | 删 chart-hover "produces a black hover bar..." 解释末句 |
| 3 | L100 | P1 教学剪 | 删 Neutrals "OKLCH L is perceptually uniform / look clinical / emotional cohesion" 教学段 |
| 4 | L104 | **P0 F-2 重写** | "ALL `<p>`" + "≤14px caption 例外" → "EVERY `<p>` regardless of fontSize/role" + 显式枚举 (Hero lead / Outro / KPI label / Chapter body) + 例外只留 Recharts axis tick / Recharts legend / inline `<span>` unit suffix (全 NON-`<p>`) |
| 5 | L261 | P1 教学剪 | 删 whileInView "Without `once: true`, elements reset..." 解释句 |
| 6 | L425 | P1 教学剪 | 删 Tooltip "portal-escape ... var(--fg) falls back ..." 解释段 |
| 7 | L438 | P1 教学剪 | 删 BarChart Tooltip "Recharts default cursor `rgba(0,0,0,0.1)` collides ..." 解释 |
| 8 | L529 | **P0 函数名诱导** | 删 `Pre-convert OKLCH → hex via oklchToHex(L, C, pH)` — 改 "paper-shaders does not parse `oklch()` — feed colors as hex strings" 抽象描述 |

---

## Pre-test red-line verify (mandatory before generating)

```bash
V08="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.8.md"

echo "--- must-exist (each ≥1 hit) — v0.5/v0.6/v0.7 baseline carryover ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V08" || echo 0)"
done

echo "--- v0.8 SHOULD-DISAPPEAR (each = 0 hit, deleted in R-120) ---"
for p in 'hexToOKLCH' 'oklchToHex(L, C, pH)' 'Pre-convert OKLCH'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V08" || echo 0)"
done

echo "--- v0.8 SHOULD-APPEAR (each ≥1 hit, added in R-120) ---"
for p in 'EVERY \`<p>\`' 'regardless of \`fontSize\`' 'KPI label' 'no fontSize escape hatch'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V08" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V08" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V08" || echo 0)"
done

echo "--- framer-motion context check (both hits must be in FORBIDDEN/Don't sections) ---"
grep -n 'framer-motion' "$V08"

echo "--- AnimateNumber zone preservation check (must match v0.7 verbatim) ---"
diff <(sed -n '189p;267,289p;559,582p' "$V08") <(sed -n '189p;267,289p;559,582p' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.7.md)
```

Expect: must-exist all ≥1; should-disappear all = 0 (proves V08-P0-2 landed); should-appear all ≥1 (proves V08-P0-1 F-2 rewrite landed); forbidden all = 0; red-line all = 0; framer-motion 2 hits both in FORBIDDEN/Don't; AnimateNumber zone diff = empty. If any fails, stop & flag.

---

## Round-5 expected outcomes (the 2 v0.8 P0 patches must close Round-4 failures)

Round-4 produced:
- **F-2 FAIL** (4/6 build-PASS attempts violate body color — Q1=5, Q4=7, Q6=11, Q7=10 instances of `<p style={{color: 'var(--foreground-2/3)'}}>`)
- **R4-SF-1** (2/8 BUILD FAIL on custom hex/RGB↔OKLCH boilerplate — Q2 `const b` clash in `hexToOKLCH`, Q8 `rgbToOklch` syntax error)

v0.8 R-120 patches:
- L104 §3 rewrite — DOM 元素级 (EVERY `<p>`) + 显式角色枚举 + 删尺寸阈值
- L64 + L529 — 删 `hexToOKLCH` + `oklchToHex` 函数名诱导

Round-5 headline questions: **did each P0 patch consume the corresponding Round-4 failure mode in doubao output?**

| # | Round-4 fail (baseline) | v0.8 fix mechanism | Round-5 expected |
|---|---|---|---|
| **V08-P0-1** | 4/6 build-PASS violate body color (Q1=5/Q4=7/Q6=11/Q7=10 `<p>` use foreground-2/3) | §3 L104 rewrite — "EVERY `<p>` regardless of fontSize/role" + 显式枚举 + 例外限定 NON-`<p>` carriers | **≤1/8 attempts violate**. Source grep `<p[^>]*foreground-[23]` ≤ 1 total across all 8 attempts. Specifically Q1/Q4/Q6/Q7 should drop to 0-1 violations each. |
| **V08-P0-2** | 2/8 BUILD FAIL on custom color conversion (Q2 hexToOKLCH `const b`, Q8 `rgbToOklch` syntax) | §3 L64 + §17 L529 — 删函数名,改抽象描述,删 "Pre-convert" 命令式 | **0/8 BUILD FAIL on color boilerplate**. Source grep `hexToOKLCH\|oklchToHex\|rgbToOklch` ≤ 2/8 attempts (doubao may still write similar but if no function name in prompt should drop sharply); build pass rate ≥ 7/8. |

### v0.8 P1 教学剪 regression hygiene (NEUTRAL — no improvement, no regression)

These 4 P1 edits are 删教学解释, expected impact: NEUTRAL.

| Patch | Mechanism | Round-5 expected |
|---|---|---|
| L84 chart-hover 教学剪 | 仅删"produces a black hover bar"解释末句; rule itself intact | F-3 (chart-hover) verdict 应继续 PASS (Round-4 = PASS); BarChart hover screenshot brand-tinted, not black |
| L100 Neutral 教学剪 | 仅删 OKLCH "perceptually uniform" 等装饰句; pH 共享 + neutralC 阈值 intact | neutralC 0.008/0.012 + pH 共享在 source 中可见 |
| L261 whileInView 教学剪 | 仅删 "Without once:true, elements reset..."; rule intact | `whileInView` + `viewport={{ once: true, margin: ... }}` 配对率 maintain (Round-4 8/8) |
| L425 Tooltip 教学剪 | 仅删 "portal-escape" 解释; MUST inline hex + MODE_COLORS 表 intact | C-6 dark Tooltip mode-explicit hex 落地率 maintain |
| L438 BarChart Tooltip 教学剪 | 仅删 "Recharts default cursor `rgba(0,0,0,0.1)` collides..." 解释; cursor token requirement intact | F-3 BarChart cursor `var(--chart-hover)` 落地率 maintain (Round-4 1/3 ratio per Bar — keep) |

### Round-4 patch regression hygiene (F-2 / F-3 verdicts)

| # | v0.7 patch | Round-4 status | Round-5 must keep |
|---|---|---|---|
| F-2 body color HARD GATE | FAIL (4/6 violate) | Closed by V08-P0-1 — see new verdict |
| F-3 --chart-hover OKLCH alpha | PASS (0/6 hallucinate low-L) | KEEP PASS (no L change in v0.8) |

### Round-3 patch regression hygiene (P-1 ~ P-7 must STAY)

| # | v0.6 patch | Round-4 status | Round-5 must keep |
|---|---|---|---|
| P-1 light bg L≥0.95 | PASS | Same |
| P-2 ceremonial ornament ≤30% | N/A (verifier miss) | Same |
| P-3 brand color + font fidelity | PASS Q1 | Same |
| P-4 body uses --foreground | (subsumed F-2) | (see V08-P0-1 verdict) |
| P-5 BarChart cursor token | (subsumed F-3) | (see F-3 PASS carry) |
| P-6 Hero 2-col grid HARD | PASS source / PARTIAL DOM (Q4 src=0 noise N-1) | PASS source ≥ 5/8 |
| P-7 Q4 shader = mesh | PASS | Same |

### Cumulative regression check (Round-1/2 wins must STAY PASS)

| # | Win | Round-4 actual | Round-5 must keep |
|---|---|---|---|
| S-1 framer-motion forbidden | 0/8 violate | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 wired (counts 2-10) | 8/8 wired |
| S-3 Hero image Q7 build+runtime | PASS (recovered from R3) | PASS — bare `max(` count = 0 |
| S-4 Q4 routes geometric (Geist) | PASS | Same |
| S-5 Q5 data semantic preserved | KEEP=218 / STOLEN=0 (best-ever) | KEEP ≥ 100 / STOLEN ≤ 5 |
| C-4 AnimateNumber tabular-nums | 6/6 build-PASS DOM | ≥ 7/8 build-PASS (assuming V08-P0-2 closes Q2+Q8 builds) |
| C-6 dark Tooltip mode-explicit | UNVERIFIED (Q8 build fail) | Re-attempt verification |

### AnimateNumber 区域 invariant check (R-120 declares zero touch)

| # | Invariant | Round-5 expected |
|---|---|---|
| AN-1 | `tabular-nums` / `tnum 1` 在 AnimateNumber wrapper 与 child | 6+ build-PASS attempts maintain (Round-4 = 6/6) |
| AN-2 | `useReducedMotion()` 在 AnimateNumber wrapper 顶 | 6+ build-PASS maintain |
| AN-3 | `parseDisplayValue` (用户自实现 OR 内联 inline parsing) 出现 ≥ 5/8 | maintain (Round-4 high coverage) |
| AN-4 | inline-flex items-baseline gap-1 whitespace-nowrap wrapper class | maintain |

If AN-* regresses despite R-120 0 改 → flag as doubao 波动 (Cowork 不会 patch v0.8 这部分).

---

## 8 User Queries (unchanged from Round-1/2/3/4 — identical for 1:1 comparison)

All 8 share the same Bitable mock data. Only brand identity + style language + brand color + mode varies.

| Q# | Style 预期 | Brand color | Mode | Round-5 special focus |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | **V08-P0-1 verify** (was 5 violations) |
| Q2 | technical | #0EA5E9 | dark | **V08-P0-2 verify** (was BUILD FAIL `const b` clash); should now build + F-2 verify body color |
| Q3 | editorial | #7C2D12 | light | Round-4 was clean (0 F-2 violations) — maintain |
| Q4 | geometric | #3B82F6 | dark | **V08-P0-1 verify** (was 7 violations); P-7 shader sanity |
| Q5 | impact | #DC2626 | dark | Round-4 was clean (0 F-2 violations) — maintain; S-5 best-ever |
| Q6 | ceremonial | #854D0E | light | **V08-P0-1 verify** (was 11 violations — worst); P-3 EB Garamond first |
| Q7 | warmth + Hero img | #D97706 | light | **V08-P0-1 verify** (was 10 violations); S-3 build+runtime maintain |
| Q8 | technical + Animate | #10B981 | dark | **V08-P0-2 verify** (was BUILD FAIL `rgbToOklch` syntax); F-2 + F-3 verify after build |

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

## Step-by-step procedure (path swap v0.7 → v0.8; rest identical to Round-4)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.8) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.8.md}

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
  rm -rf "default-v0.8-Q${N}-attempt-1"
  mkdir -p "default-v0.8-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.8-Q${N}-attempt-1/"
  # write generate-prompt.txt per Step 1
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.8-Q${N}-attempt-1" 2>&1 | tee "default-v0.8-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.8-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-4 procedure unchanged. **Mandatory hover Tooltip screenshot for dark-mode Queries (Q2/Q4/Q5/Q8) AND any attempt with BarChart** (for F-3 verify carry).

### Step 6 · Playwright DOM extraction

`page.evaluate` script from Round-4. Save JSON to `reports/dom/Q${N}.json`.

Round-5 reuses Round-4 enhanced bodyTextColor extraction for V08-P0-1 verification.

### Step 6.5 · Round-5 source grep (CRITICAL)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v0.8-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v0.8 patch verification ==="

# V08-P0-1 F-2 body color discipline (DOM 元素级)
BODY_FG2=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)|<p[^>]*color:\s*['\"]?var\(--fg-[23]\)" "$APP" || echo 0)
BODY_TEXTSM_FG2=$(grep -cE "<p[^>]*className=['\"][^'\"]*text-sm[^'\"]*['\"][^>]*foreground-[23]" "$APP" || echo 0)
BODY_TEXTXS_FG2=$(grep -cE "<p[^>]*className=['\"][^'\"]*text-xs[^'\"]*['\"][^>]*foreground-[23]" "$APP" || echo 0)
echo "V08-P0-1 <p> foreground-2/3 总计 : $BODY_FG2 (expect 0)"
echo "V08-P0-1 <p text-sm> fg-2/3      : $BODY_TEXTSM_FG2 (expect 0; was Round-4 violation pattern)"
echo "V08-P0-1 <p text-xs> fg-2/3      : $BODY_TEXTXS_FG2 (expect 0)"

# V08-P0-2 colour conversion boilerplate
HEXTOOKLCH=$(grep -c "hexToOKLCH\|hexToOklch" "$APP" || echo 0)
OKLCHTOHEX=$(grep -c "oklchToHex\|oklchToRgb" "$APP" || echo 0)
RGBTOOKLCH=$(grep -c "rgbToOklch\|rgbToOklch" "$APP" || echo 0)
HEXTORGB=$(grep -c "hexToRgb\|hexToRGB" "$APP" || echo 0)
TOTAL_COLOR_FNS=$((HEXTOOKLCH + OKLCHTOHEX + RGBTOOKLCH + HEXTORGB))
echo "V08-P0-2 hexToOKLCH              : $HEXTOOKLCH (Round-4 Q2 was BUILD FAIL here)"
echo "V08-P0-2 oklchToHex              : $OKLCHTOHEX"
echo "V08-P0-2 rgbToOklch              : $RGBTOOKLCH (Round-4 Q8 was BUILD FAIL here)"
echo "V08-P0-2 hexToRgb                : $HEXTORGB"
echo "V08-P0-2 color-fn TOTAL          : $TOTAL_COLOR_FNS (expect ≤2 across all Qs;  v0.8 删函数名后 doubao 应直接用 hex 字符串)"

# F-3 chart-hover (regression hygiene from Round-4)
CH_LOW_L=$(grep -cE "--chart-hover.*oklch\(0?\.1[0-9]|--chart-hover.*oklch\(1[0-9]%|--chart-hover.*oklch\(0\.[0-2]" "$APP" || echo 0)
CH_HIGH_L=$(grep -cE "--chart-hover.*oklch\(.*primaryL|--chart-hover.*oklch\(0?\.[3-7]" "$APP" || echo 0)
echo "F-3 chart-hover low-L (BAD)      : $CH_LOW_L (expect 0)"
echo "F-3 chart-hover primaryL-ish     : $CH_HIGH_L (expect ≥1 if --chart-hover defined)"

# AnimateNumber invariant (R-120 declares 0 改)
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
USE_REDUCED=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "AN-1 tabular-nums / tnum         : $TNUM (Round-4 build-PASS 6/6 maintained)"
echo "AN-2 AnimateNumber instances     : $ANIM_NUM"
echo "AN-3 useReducedMotion calls      : $USE_REDUCED"

# Q5 data semantic regression
if [ "$N" = "5" ]; then
  KEEP=$(grep -cE "月活用户|付费率|ARPU|NPS|累计交易额|广告 ROAS|销售|业绩|经理|大区|省区|门店" "$APP" || echo 0)
  STOLEN=$(grep -cE "击杀|KDA|战绩|胜率|积分|比分" "$APP" || echo 0)
  echo "S-5 data label kept            : $KEEP  (Round-4: 218; expect ≥100)"
  echo "S-5 data label stolen          : $STOLEN (Round-4: 0; expect ≤5)"
fi

# Q7 runtime regression
if [ "$N" = "7" ]; then
  MAX_BARE=$(grep -cE "\bmax\(" "$APP" || echo 0)
  MATH_MAX=$(grep -c "Math\.max" "$APP" || echo 0)
  echo "S-3 Q7 bare max() calls         : $MAX_BARE (expect 0 — Round-4 closed)"
  echo "S-3 Q7 Math.max() calls         : $MATH_MAX (expect ≥1 if used)"
fi

# Engineering red-line (per Chris)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "ENG-1 wildcard ui import        : $WILDCARD (Round-4 0/8; route AGENT.md if ≥1)"

# Round-3 regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
GRID_HERO=$(grep -cE "grid-template-columns:\s*1\.15fr|gridTemplateColumns.*1\.15fr|grid-template-columns:\s*1fr 1fr" "$APP" || echo 0)
echo "Regression framer-motion         : $FM (expect 0)"
echo "Regression Hero grid             : $GRID_HERO (expect ≥1)"
```

### Step 7 · Design Skill 评分

Round-4 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.8_Round-5.md`

### 9 headline sections

#### 1. Round-4 → Round-5 patch verdicts (HEADLINE)

| # | Patch | Round-4 baseline | Round-5 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| V08-P0-1 | F-2 body color HARD GATE rewrite | 4/6 build-PASS violate (Q1=5/Q4=7/Q6=11/Q7=10) | <N>/8 violate | PASS (≤1 total) / PARTIAL / FAIL | source grep BODY_FG2 per-Q + DOM bodyTextColor |
| V08-P0-2 | 删函数名诱导 (hexToOKLCH + oklchToHex) | 2/8 BUILD FAIL (Q2 + Q8) | <N>/8 BUILD FAIL on color boilerplate | PASS (0/8) / PARTIAL (1/8) / FAIL | build.log + color-fn TOTAL grep |

Headline: "X/2 v0.8 P0 patches PASS, Y PARTIAL, Z FAIL."

#### 2. v0.8 P1 教学剪 regression hygiene (L84/L100/L261/L425/L438 must stay NEUTRAL)

Table form. Each P1 patch verified against the rule it preserved.

#### 3. Round-4 / Round-3 / Round-2 / Round-1 cumulative regression

All prior wins (S-1 ~ S-5, C-4, C-6, F-3, P-1, P-3, P-6, P-7) verify status.

#### 4. AnimateNumber 区域 0 改 invariant verification (R-120 carry)

AN-1 ~ AN-4 status table. If any AN regresses despite 0-改, flag as doubao 波动.

#### 5. Per-Query 验证表

Same as Round-4 with extra column "Round-4 → Round-5 综合 delta".

#### 6. New Stable Failures (≥ 2/8 in Round-5, NOT seen in Round-4)

What surfaced once v0.8 closed Round-4 SFs.

#### 7. Single Failures (1/8 only) — Noise

#### 8. Cross-skill diagnostic convergence

#### 9. Patch suggestions to Cowork (for v0.9, if needed)

Concrete observations only. No patched wording. Maximum 5 suggestions, P0 > P1 > P2.

⚠️ Chris's red-line: do NOT propose suggestions that require Design Prompt to describe `import` statements / directory paths / build tool commands / package paths. Route engineering issues to AGENT.md. Note explicitly which patches go AGENT.md vs Design Prompt.

⚠️ R-120 carry: do NOT propose changes to AnimateNumber 区段 (§4 L189 / §7 L267-289 / §17 L559-582). Chris keeps this stable.

#### 10. Convergence assessment

This is the headline value of Round-5. State explicitly:
- If V08-P0-1 + V08-P0-2 both PASS AND no new SF ≥ 2/8 AND AnimateNumber 0-改 invariant maintained: **v0.8 reaches production / stable baseline. R-120 closes.**
- If 1 PARTIAL or new SF surfaces: **small follow-up patch round needed** (R-121 / v0.9).
- If 2 FAIL or major regression: **substantive patch round needed**.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-5-app-tsx" "$DST/Round-5-screenshots" "$DST/Round-5-critic" "$DST/Round-5-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.8-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-5-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-5-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.8-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-5-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-5-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v0.8_Round-5.md"

echo "--- Round-5 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-5-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-5-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-5-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-5-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.8_Round-5.md" ] && echo present || echo MISSING)"
```

Expected: ~60-70 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v0.8 + B sandbox + C Round-4 report)
- [ ] Pre-test red-line: 22 must-exist ≥1 + 3 SHOULD-DISAPPEAR = 0 + 4 SHOULD-APPEAR ≥1 + 9 forbidden = 0 + 7 engineering red-line = 0
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] AnimateNumber zone diff vs v0.7 = empty
- [ ] 8 Queries generate-prompt.txt 各独立
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM + Step 6.5 source-grep
- [ ] dark-mode + BarChart-containing Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 头条 2 patch 都有 Round-4 baseline + Round-5 actual + evidence
- [ ] §2 v0.8 P1 教学剪 5 项 NEUTRAL 验证
- [ ] §3 cumulative regression 7+ 项都填
- [ ] §4 AnimateNumber 0-改 invariant 4 项
- [ ] §10 Convergence assessment 给出明确判断
- [ ] § 9 patch suggestions 严守 Chris 工程红线 + 不动 AnimateNumber
- [ ] cp-to-vault tally ~60-70

---

## Output to Chris on completion

```
doubao default v0.8 生成测试 Round-5 complete.

Design Prompt under test: default v0.8 (620 lines, frozen — R-120 8 处精细 patches)
Round-4 baseline: Robustness-Report_default-v0.7_Round-4.md
Round-5 report  : Robustness-Report_default-v0.8_Round-5.md

Pre-test red-line verify: <PASS/FAIL>
- v0.7 → v0.8 函数名 SHOULD-DISAPPEAR: <PASS/FAIL>
- v0.8 F-2 SHOULD-APPEAR: <PASS/FAIL>
- AnimateNumber zone diff = empty: <PASS/FAIL>
Engineering red-line(Chris HARD): <PASS/FAIL>

2 v0.8 P0 patch verdicts (Round-4 → Round-5):
  V08-P0-1 F-2 body color HARD GATE rewrite: <PASS/PARTIAL/FAIL>
       Round-4: 4/6 violate (Q1=5/Q4=7/Q6=11/Q7=10) · Round-5: <N>/8 violate
       Per-Q breakdown: Q1=<n>, Q4=<n>, Q6=<n>, Q7=<n> (was 5/7/11/10)
  V08-P0-2 删函数名诱导 (hexToOKLCH+oklchToHex): <PASS/PARTIAL/FAIL>
       Round-4: Q2 + Q8 BUILD FAIL on color boilerplate · Round-5: <N>/8 BUILD FAIL on color
       Color-fn total occurrences: <N> (Round-4: ~30+ across Q2 + Q8)

Headline: <X>/2 v0.8 P0 patches PASS, <Y> PARTIAL, <Z> FAIL.

v0.8 P1 教学剪 NEUTRAL hygiene:
  L84 chart-hover : <NEUTRAL/REGRESSED>
  L100 Neutral    : <NEUTRAL/REGRESSED>
  L261 whileInView: <NEUTRAL/REGRESSED>
  L425 Tooltip    : <NEUTRAL/REGRESSED>
  L438 BarChart   : <NEUTRAL/REGRESSED>

AnimateNumber 区域 0-改 invariant (R-120 carry):
  AN-1 tabular-nums    : <MAINTAINED/REGRESSED>
  AN-2 useReducedMotion: <MAINTAINED/REGRESSED>
  AN-3 parseDisplayValue cover: <MAINTAINED/REGRESSED>
  AN-4 wrapper class    : <MAINTAINED/REGRESSED>

Cumulative regression (Round-1/2/3/4 wins must stay):
  S-1 framer-motion: <N>/8 (Round-4: 0/8)
  S-2 useReducedMotion: <N>/8 (Round-4: 8/8)
  S-3 Q7 build+runtime: <PASS/FAIL>
  S-5 Q5 semantic KEEP/STOLEN: <N>/<M> (Round-4: 218/0)
  C-4 AnimateNumber tnum DOM: <N>/8 (Round-4: 6/6 build-PASS)
  C-6 dark Tooltip mode-explicit: <PASS/FAIL>
  F-3 chart-hover (v0.7 carry): <PASS/FAIL>

Per-Query summary (Build | V1-V7 / 综合 Round-4 → Round-5):
  Q1-Q8 …

Build pass rate          : <N>/8 (Round-4: 6/8)

New Stable Failures (≥ 2/8) after v0.8:
  <list, or "none — clean run">

Top patch suggestions for Cowork v0.9 (Chris 红线 + R-120 AnimateNumber 不动 honored):
  <listed in report §9 with explicit AGENT.md vs Design Prompt routing>

Convergence assessment:
  <PRODUCTION-READY (R-120 closes) / small follow-up R-121 needed / substantive patch needed>

Artifacts cp'd: <N> files in reports/Round-5-* subdirs.

If V08-P0-1 + V08-P0-2 both PASS + no new SF + AN invariant maintained: R-120 closes, v0.8 is the stable baseline.
Else: Cowork starts R-121 (small) or substantive patch round.
```
