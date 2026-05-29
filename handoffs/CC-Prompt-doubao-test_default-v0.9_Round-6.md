# CC-Prompt · doubao Generation Test · default v0.9 · Round-6

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v1.0 / v0.10 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

Round-6 duties:
1. **Verify the 9 v0.9 first-pass patches consume Round-5 failure modes** (P0-A OKLCH syntax / P0-B brand hex 投影 / P0-1 colors[] L invariant / P0-3 F-2 含 class cascade + meta-label `<span>` / P0-2 Hero focal number readability / P0-4 chart ramp floor / P1-5 dark primary-soft bg-only / P1-6 Hero image filter HARD / P1-7 Outro CTA + material)
2. **Verify the 5 v0.9 second-pass conflict fixes 没破坏 first-pass** (B1 §17 row L range / B2 chroma 0.04 / B3 colophon line / B4 chart chroma 非负 floor / N3 outer section element 限定)
3. **Confirm Round-1/2/3/4/5 cumulative wins did NOT regress**
4. **Confirm AnimateNumber 区域 0 改 invariant 仍然 maintained**(R-120 + R-123 双重锁定)
5. **Detect any new Stable Failures** surfaced once Round-5 blockers were closed

⚠️ **Chris 红线 carry from R-115 to R-123**: Cowork applies a hard constraint that v1.0 (and future v*) must NOT contain `import` statements as engineering instructions, directory wildcard paths, build tool commands. If Round-6 generation surfaces issues that suggest a prompt-side patch involving such terms, route those to AGENT.md (sandbox spec) instead — do NOT propose them as v1.0 patch suggestions.

⚠️ **R-120 + R-123 AnimateNumber 不动 carry**: §4 line ~187 / §7 line ~269-291 / §17 line ~566-589 整段 Chris 明确锁死。若 Round-6 出现 AnimateNumber 相关 regression,**不要 propose 改 AN 段**,flag 为 doubao 自身波动,Cowork 决策。

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-6 if either is missing.

### A 线 · Design Prompt v0.9
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md` exists, **627 lines** (v0.8 baseline 620, 9 first-pass patches + 5 second-pass conflict fixes 净 +7 行).

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-5 baseline + cumulative regression
Read once before starting:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.8_Round-5.md` (primary baseline,R5-SF-1 F-2 caption + Q2 N-1 黑色 fallback 都标记)
- Optionally `Robustness-Report_default-v0.7_Round-4.md` for cross-round regression citation

If any prerequisite fails, stop and hand back to Cowork.

---

## Round-6 specifics

- **Design Prompt under test**: default v0.9 (frozen, 627 lines; R-123 9 first-pass + 5 second-pass conflict fixes 共 14 处 surgical changes over v0.8)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (identical shape to all prior rounds — 1:1 comparison)
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — identical to prior rounds
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.9-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.9_Round-6.md`

Round-6 holds user prompt assembly + Bitable mock + sandbox env constant vs Round-5. ONLY variable: Design Prompt v0.8 → v0.9.

---

## What changed v0.8 → v0.9 (R-123 patch summary)

**14 处 changes (9 first-pass + 5 second-pass), 净 +7 行, AnimateNumber 区域 0 触及**:

### First-pass (9 处,Opus 4.6 起草)

| # | Line | Type | v0.8 → v0.9 essence |
|---|------|------|---------------------|
| **P0-A** | §3 L63 | **OKLCH syntax HARD** | 新增 HARD rule "OKLCH function MUST use space-separated CSS Color Module Level 4 syntax — `oklch(L C H)` / `oklch(L C H / alpha)`, never comma-separated `oklch(L, C, H)` (legacy syntax invalid, falls back to initial value = black)" + 全文算法块 OKLCH 写法全替换为 space-separated |
| **P0-B** | §17 L536 | **§17 conflict 消除** | line 529 重写: "user's `brand_color` provides only the hue/chroma anchor; the L value MUST be projected to the engine's required L band (light: 0.925–0.975 / dark: 0.115–0.480) via the sampling formula, never passed through raw" |
| **P0-1** | §17 L532 | **colors[] L invariant HARD** | sampling 表尾追加 "**colors[] L invariant — HARD GATE.** EVERY entry of mesh `colors[5]` / grain `colors[4]` (and dithering `colorFront` / `colorBack`) MUST satisfy `L ∈ [0.925, 0.975]` in light / `L ∈ [0.115, 0.480]` in dark. No exceptions" |
| **P0-3** | §3 L106 | **F-2 含 class cascade + meta-label `<span>`** | 整段重写,新增 "regardless of HOW the color is set — inline `style=`, className utility, or class CSS cascade rule" + "Meta-label element discipline (HARD): role / region / 职位 / 省区 / score caption / timestamp / colophon / eyebrow / ranking-role / quote-attribution / outro-colophon MUST use `<span>`, NOT `<p>`" |
| **P0-2** | §14.1 L454 | **Hero focal number readability HARD** | Hero Monolith 段新增 "Hero focal number readability — HARD GATE. The focal number must satisfy ≥ 4.5:1 contrast... Two legal paths to guarantee, at design time, before render: (1) `--surface-l2` local backplate beneath the number, OR (2) shader/image constrained so region under number has L > 0.92 light / L < 0.16 dark" + 严禁 wash overlay |
| **P0-4** | §3 L73-76 | **chart ramp + floor + chroma 上限** | chart-2/3/4/5 公式重写:`oklch(max(primaryL+offset, floor_L) max(min(pC+offset, cap_C), 0.02) pH)` (B4 加非负 floor 防 OKLCH invalid) |
| **P1-5** | §3 L94 | **dark primary-soft bg-only** | Dark mode tokens 段加 "`--primary-soft` in dark mode = `oklch(0.22 min(pC, 0.04) pH)` — a soft surface that stays distinct from `--surface-l1` at L = 0.12. **HARD: `--primary-soft` is a background-only token — NEVER appears as text `color`**" |
| **P1-6** | §15 L496 | **Hero image filter HARD GATE** | 重写 "`<img>` forbidden CSS properties — HARD GATE: `filter`, `-webkit-filter`, `backdrop-filter`. This includes `saturate()`, `brightness()`, `blur()`, `contrast()`, `hue-rotate()`, `grayscale()`, `sepia()`, `drop-shadow()`" + "Overlay numbers are sealed: light 25%→50% MAX / dark 45%→70% MAX" |
| **P1-7** | §10 L325 + §12 L408 | **Outro CTA + material discipline** | §10 加 enumerated negative examples (`<a>`/`<button>`/`<div>` rounded-full + bg-primary + text-white + "查看完整报告"/Learn more/...);§12 Outro Reverent 加 "Outro material discipline — HARD GATE. NO `backgroundColor` (on the outer section element), NO `borderRadius`, NO rounded surface panel chrome" |

### Second-pass conflict fixes (5 处,Opus 4.6 二轮)

| # | Line | Type | Conflict 消除 |
|---|------|------|--------------|
| **B1** | §17 L528-529 | row L range 同步 | grain light row `0.890→0.925`,`colorBack 0.980→0.975`;dithering light colorFront `0.900→0.925`;grain dark row `0.340→0.480`,跟 P0-1 HARD GATE 区间一致 |
| **B2** | §3 L94 | primary-soft chroma 0.06→0.04 | 跟 §3 line 126 Chroma constraints HARD table 一致(消除 token table 内部冲突) |
| **B3** | §10 L325 | colophon `<p>` → "colophon line" | 跟 P0-3 line 106 meta-label `<span>` 一致(消除 F-2 vs Outro 元素冲突) |
| **B4** | §3 L74-76 | chart-3/4/5 chroma 加 `max(..., 0.02)` 非负 floor | 防止低 chroma brand(如 slate / black)在 chart-3/4/5 公式下产生负 chroma → OKLCH invalid → CSS fallback 黑色(讽刺:正是 P0-A 修的同类 bug) |
| **N3** | §12 L408 | "NO `backgroundColor`" 加 "(on the outer section element)" 限定 | 防 doubao 误读为禁用 Outro 内任何元素 bg |

---

## Pre-test red-line verify (mandatory before generating)

```bash
V09="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md"

echo "--- must-exist (each ≥1 hit) — baseline carryover ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -c "$p" "$V09" || echo 0)"
done

echo "--- v0.9 SHOULD-APPEAR (R-123 first-pass + second-pass) ---"
for p in 'space-separated' 'CSS Color Module Level 4' 'hue/chroma anchor' 'projected to the engine' 'EVERY entry of mesh' 'No exceptions' '4.5:1 contrast' 'Hero focal number readability' 'local backplate' 'Meta-label element discipline' 'class CSS cascade' 'forbidden CSS properties' 'background-only token' 'enumerated negative examples' 'Outro material discipline' 'rounded surface panel' 'outer section element'; do
  printf "%-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09" || echo 0)"
done

echo "--- v0.9 SHOULD-DISAPPEAR (R-120 + R-123 deleted/changed,each = 0) ---"
for p in 'oklch(0\.[0-9]+, [0-9]' 'L 0\.890\b' 'colorFront L 0\.900\b' 'colorBack L 0\.980' 'oklch\(0\.22 min\(pC, 0\.06\) pH\)' 'colophon `<p>`' 'min\(pC-0\.06, 0\.14\) pH\)' 'min\(pC-0\.10, 0\.10\) pH\)'; do
  printf "%-45s : %s hits\n" "$p" "$(grep -cE "$p" "$V09" || echo 0)"
done

echo "--- forbidden (each = 0 hit) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V09" || echo 0)"
done

echo "--- Chris engineering red-line (each = 0 hit) ---"
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "%-22s : %s hits\n" "$p" "$(grep -cE "$p" "$V09" || echo 0)"
done

echo "--- framer-motion 上下文 verify (2 hits, 都在 FORBIDDEN/Don't context) ---"
grep -n 'framer-motion' "$V09"

echo "--- AnimateNumber zone content sentinel match (each MUST exist in v0.9) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'Hero shader speed.*read at each' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "%-65s : %s hits\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V09" || echo 0)"
done
```

Expect: must-exist all ≥1; SHOULD-APPEAR all ≥1(全 17 项); SHOULD-DISAPPEAR all = 0(全 8 项,确认 R-123 改动 land + 老语法 0 残留); forbidden all = 0; red-line all = 0; framer-motion 2 hits 都在 FORBIDDEN/Don't; AnimateNumber zone 7 sentinels 全 = 1. If any fails, stop & flag.

---

## Round-6 expected outcomes (the 9 v0.9 first-pass patches + 5 conflict fixes 应该消除 Round-5 失败模式)

Round-5 produced:
- **V08-P0-1 PARTIAL** (4/7 build-PASS attempts violate F-2 body color discipline,但 doubao 把 caption-style 当例外 → Q3 仅靠 inline-style grep 误判 0 violations,实际 4 处 class CSS 路径仍违规)
- **R5-SF-1** (22 处 F-2 caption-style violations across 7/8 attempts)
- **Round-5 N-1** (Q2 dark body computed color 解析为 rgb(0,0,0) — OKLCH 逗号语法 → CSS parser fallback 初始 black)
- **Q3/Q6 shader colors[] 注入 raw brand hex 越界**(Q3 L114 #7C2D12 L≈0.41,Q6 L247 #854D0E L≈0.48,远低 0.925 brand peak)
- **Q2 eyebrow tag color: var(--primary-soft)** dark mode L=0.14 同 surface-l2 → invisible
- **Q7 HeroImg saturate(0.9) brightness(0.85) filter 违规** + dim overlay 25→85% 过激进
- **Q7 Outro CTA pill "查看完整报告"** + Outro section rounded surface panel material 违规
- **Q6 donut chart-1/chart-3 ΔL=0.03 几乎同色** + Q2 dark chart-5 与 surface-l1 同 L

Round-6 headline question: **did each of the 14 changes consume the corresponding Round-5 failure mode in doubao output?**

### 头条 9 处 first-pass verdict

| # | Round-5 baseline | v0.9 fix mechanism | Round-6 expected |
|---|---|---|---|
| **V09-P0-A** | Round-5 N-1: Q2 DOM body computed color rgb(0,0,0)(OKLCH 逗号 invalid → fallback) | §3 L63 HARD rule + 全文算法块 space-separated 重写 | **0/8 attempts have body computed color rgb(0,0,0)**;source grep `oklch\(.*,` = 0 across all attempts;all `oklch()` calls use space-separated CSS L4 syntax |
| **V09-P0-B + P0-1 + B1** | Q3 L114 + Q6 L247 shader colors[] 含 raw brand hex L 0.41/0.48 ≪ 0.925 brand peak | §17 L536 brand hex 投影 + L532 colors[] L invariant HARD GATE + L528-529 row L range 同步 | **0/8 attempts have shader colors[] entries with L < 0.925 (light) or L > 0.480 (dark)**;Q3/Q6/Q6 mesh shader colors[] 全 entries 在 [0.925, 0.975] light region 或 [0.115, 0.480] dark region;hex L 重算 verify |
| **V09-P0-3 + B3** | Round-5 R5-SF-1: 22 处 F-2 caption-`<p>` violations (Q2=3/Q4=4/Q5=4/Q6=5/Q7=1/Q8=3) + Q3 误算 0 (实际 4 处 class CSS 路径) | §3 L106 整段重写 + L325 colophon line | **≤5 处 total F-2 violations across all 8 attempts** (含 class CSS cascade scan);Q3 真 0 violations;**meta-label `<span>` 比例 ≥ 60%**(role/region/职位/省区/score caption/timestamp/colophon/eyebrow/ranking-role/quote-attribution/outro-colophon 应大多用 `<span>` not `<p>`) |
| **V09-P0-2** | Q3/Q6/Q7 hero number 在 shader/image mid-tone 区 ΔL ≤ 0.15 不可辨 | §14.1 L454 Hero focal number readability HARD GATE | **8/8 hero number satisfies 一种 design-time 路径**:(a) source 含 `--surface-l2` local backplate 包 number (`backgroundColor: 'var(--surface-l2)'` + padding 12-24px),OR (b) shader colors[] 该区 L > 0.92 light / L < 0.16 dark(B1 区间内极端值)|
| **V09-P0-4 + B4** | Q6 donut chart-1/chart-3 ΔL=0.03 几乎同色 + 低 chroma brand 风险 OKLCH invalid | §3 L73-76 chart ramp 公式 + 非负 floor max(...,0.02) | **chart-3 与 chart-1 ΔL ≥ 0.10** (source 含 max() chart-3 公式) + **0/8 attempts have negative-chroma OKLCH** (跑 `oklch\([^)]*-[0-9]+\.[0-9]+` 检测负数) → 0 black fallback from chart |
| **V09-P1-5 + B2** | Q2 L215 eyebrow `color: var(--primary-soft)` dark mode L=0.14 invisible | §3 L94 dark primary-soft = `oklch(0.22 min(pC, 0.04) pH)` + background-only token HARD | **0/8 dark mode attempts use `color: var(--primary-soft)` on text element** (跑 source grep `color: ['"]?var\(--primary-soft\)`)|
| **V09-P1-6** | Q7 L253 `filter: 'saturate(0.9) brightness(0.85)'` + dim overlay 25→85% | §15 L496 `<img>` forbidden CSS properties HARD GATE + overlay sealed | **0/8 HeroImg attempts have `<img>` with filter/saturate/brightness/blur/contrast/hue-rotate/grayscale/sepia/drop-shadow** + dim overlay 不超 light 50% / dark 70% MAX |
| **V09-P1-7** | Q7 L452 "查看完整报告" pill CTA + L443 Outro section rounded surface panel | §10 L325 + §12 L408 双 HARD GATE | **0/8 attempts have Outro CTA-shape** (rounded-full + bg-primary + text-white + "查看完整报告"/Learn more/View demo/Read full report/Sign up/Get started) + **0/8 Outro section outer element 含 `backgroundColor` / `borderRadius` / rounded panel chrome** |

### 5 处 second-pass conflict fixes maintenance check

5 处 conflict fix 不引入新 visibility 失败,只是消除 prompt 内部矛盾。Round-6 verify 它们不破坏 first-pass:

- **B1** §17 row L range 同步 — verify mesh/grain/dithering 数字一致(无 row L 0.890 / colorFront 0.900 残留)
- **B2** dark primary-soft chroma 0.04 vs table 0.04 — verify §3 token table 内部一致
- **B3** colophon line 表述 — verify Outro 末段 colophon 用 `<span>` 不 `<p>`(跟 P0-3 一致)
- **B4** chart chroma 非负 floor — verify low chroma brand(若 测试 Q 含 slate/black 类 brand)无负 chroma OKLCH invalid
- **N3** Outer section element 限定 — verify Outro 内部允许 inline element bg(e.g. tag chip 假设有)

### AnimateNumber 区域 invariant check (R-120 + R-123 declare 双重 zero touch)

| # | Invariant | Round-6 expected |
|---|---|---|
| AN-1 | `tabular-nums` / `tnum 1` 在 AnimateNumber wrapper 与 child | maintained 8/8 build-PASS |
| AN-2 | `useReducedMotion()` 在 AnimateNumber wrapper 顶 | maintained 8/8 |
| AN-3 | `parseDisplayValue` 或等价 inline parsing 出现 ≥ 5/8 | maintained |
| AN-4 | `inline-flex items-baseline gap-1 whitespace-nowrap` wrapper class | maintained |

If AN-* regresses → flag as doubao 波动 (Cowork 不会 patch v0.9 这部分).

### Round-4/3 patch regression hygiene (carry-over)

| # | v0.7/v0.6 patch | Round-5 status | Round-6 must keep |
|---|---|---|---|
| F-2 body color HARD GATE | PARTIAL (R5-SF-1 22 处) → fixed by V09-P0-3+B3 | (subsumed; see V09-P0-3 verdict) |
| F-3 --chart-hover OKLCH alpha | PASS (0/8 hallucinate low-L) | KEEP PASS |
| P-1 light bg L≥0.95 | PASS | Same |
| P-3 brand color + font fidelity | PASS | Same |
| P-6 Hero 2-col grid HARD | PASS source | Same |
| P-7 Q4 shader = mesh | PASS | Same |
| S-1 framer-motion forbidden | 0/8 | 0/8 |
| S-2 useReducedMotion | 8/8 wired | 8/8 |
| S-3 Hero image Q7 build+runtime | PASS | PASS |
| S-5 Q5 semantic preserved | KEEP=155 / STOLEN=3 | KEEP ≥ 100 / STOLEN ≤ 5 |
| C-4 AnimateNumber tnum DOM | 8/8 build-PASS | 8/8 |
| C-6 dark Tooltip mode-explicit | UNVERIFIED | Re-attempt |

---

## 8 User Queries (unchanged from Round-1/2/3/4/5 — identical for 1:1 comparison)

All 8 share the same Bitable mock data. Only brand identity + style language + brand color + mode varies.

| Q# | Style 预期 | Brand color | Mode | Round-6 special focus |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | F-2 含 class CSS verify (warmth class `.rep-eyebrow` 等) |
| Q2 | technical | #0EA5E9 | dark | **V09-P0-A verify** (Round-5 N-1 body rgb(0,0,0) → expect normal color);**V09-P1-5 verify** (eyebrow 不 var(--primary-soft));V09-P0-B+P0-1 verify (Dithering colorFront L ≥ 0.115 dark) |
| Q3 | editorial | #7C2D12 | light | **V09-P0-B+P0-1 verify** (Round-5 mesh #7C2D12 L=0.41 → expect projected to ≥ 0.925);**V09-P0-2 verify** (hero number 局部 backplate OR 极端 L);**V09-P0-3+B3 含 class cascade verify**(Q3 Round-5 误算 0 → 真 0) |
| Q4 | geometric | #3B82F6 | dark | F-2 含 class verify;chart ramp floor verify |
| Q5 | impact | #DC2626 | dark | chart ramp + dark primary-soft verify |
| Q6 | ceremonial | #854D0E | light | **V09-P0-B+P0-1 verify** (Round-5 mesh #854D0E L=0.48);**V09-P0-2 verify**;**V09-P0-4+B4 verify** (donut chart-1/3 ΔL ≥ 0.10) |
| Q7 | warmth + Hero img | #D97706 | light | **V09-P1-6 verify** (HeroImg 0 filter);**V09-P1-7 verify** (Outro 0 CTA pill + 0 rounded panel);V09-P0-2 verify (hero number on image) |
| Q8 | technical + Animate | #10B981 | dark | AnimateNumber 0 改 invariant verify;V09-P0-A OKLCH syntax verify |

(8 User Queries verbatim 同 Round-5 / R-118 / R-121 — Q1-Q8 完整文本不重复粘贴,沿用 PE-test 项目 legacy `generate-prompt.txt` 已有的 Bitable mock + Query 段。)

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

## Step-by-step procedure (path swap v0.8 → v0.9; rest identical to Round-5)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.9) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md}

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
  rm -rf "default-v0.9-Q${N}-attempt-1"
  mkdir -p "default-v0.9-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.9-Q${N}-attempt-1/"
  # write generate-prompt.txt per Step 1
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.9-Q${N}-attempt-1" 2>&1 | tee "default-v0.9-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.9-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-5 procedure unchanged. **Mandatory hover Tooltip screenshot for dark-mode Queries (Q2/Q4/Q5/Q8) AND any attempt with BarChart**(F-3 verify carry).

### Step 6 · Playwright DOM extraction

`page.evaluate` script from Round-5 + Round-6 NEW addition. Save JSON to `reports/dom/Q${N}.json`.

**Round-6 NEW addition** — extract Hero focal number 区域 backplate detection:

```javascript
// inside DOM script
const heroNum = document.querySelector('.rep-hero-num, [class*=hero-num], [class*=focal-number]')
const heroNumParent = heroNum?.parentElement
const heroNumBgColor = heroNum ? getComputedStyle(heroNum).backgroundColor : null
const heroNumParentBgColor = heroNumParent ? getComputedStyle(heroNumParent).backgroundColor : null
const heroNumPadding = heroNum ? getComputedStyle(heroNum).padding : null
// Add to return: heroNumBgColor, heroNumParentBgColor, heroNumPadding

// Round-6 NEW · body computed color (Round-5 N-1 重发检测)
const bodyEl = document.body
const bodyComputedColor = getComputedStyle(bodyEl).color
// Add to return: bodyComputedColor

// Round-6 NEW · primary-soft text use detection
const allText = Array.from(document.querySelectorAll('span, p, h1, h2, h3, h4, div'))
const primarySoftAsText = allText.filter(el => {
  const inlineStyle = el.getAttribute('style') || ''
  return inlineStyle.includes('color: var(--primary-soft)') || inlineStyle.includes("color: 'var(--primary-soft)'")
}).length
// Add to return: primarySoftAsText
```

### Step 6.5 · Round-6 source grep (CRITICAL)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v0.9-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v0.9 patch verification ==="

# V09-P0-A · OKLCH 逗号语法残留 (期望 0)
OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
OKLCH_SPACE=$(grep -cE "oklch\([0-9.]+ [0-9.]+ " "$APP" || echo 0)
echo "V09-P0-A · OKLCH 逗号残留     : $OKLCH_COMMA (expect 0)"
echo "V09-P0-A · OKLCH space-sep    : $OKLCH_SPACE (expect ≥3 if --primary 等 token 注入)"

# V09-P0-B + P0-1 + B1 · shader colors[] L 投影
# Extract colors=[#XXX, #XXX, ...] hex values from MeshGradient / GrainGradient / Dithering
# Check if any hex < L 0.925 (light) or > L 0.480 (dark)
SHADER_BRAND_HEX_DIRECT=$(grep -cE "MeshGradient.*colors.*=.*\[.*#${BRAND_COLOR:1:6}|colors.*=.*['\"]?#${BRAND_COLOR:1:6}['\"]?" "$APP" || echo 0)
echo "V09-P0-B · shader colors[] 含 raw brand_color hex 直接 : $SHADER_BRAND_HEX_DIRECT (expect 0)"

# V09-P0-3 + B3 · F-2 含 class CSS cascade (重要 - 新维度)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
BODY_FG2_CLASS=$(grep -cE "<p[^>]*className=['\"][^'\"]*['\"][^>]*foreground-[23]|\\.[a-zA-Z-]+\\s*\\{[^}]*color:\\s*var\\(--foreground-[23]\\)[^}]*\\}" "$APP" || echo 0)
META_AS_SPAN=$(grep -cE "<span[^>]*\\.(rep-eyebrow|ranking-role|rep-quote-attribution|rep-outro-colophon)|<span[^>]*className=['\"][^'\"]*(eyebrow|colophon|caption|meta)" "$APP" || echo 0)
META_AS_P=$(grep -cE "<p[^>]*className=['\"][^'\"]*(eyebrow|colophon|caption|ranking-role|quote-attribution|outro-colophon|meta)" "$APP" || echo 0)
echo "V09-P0-3 · <p> fg-2/3 inline   : $BODY_FG2_INLINE (期望 ≤1)"
echo "V09-P0-3 · <p> fg-2/3 class    : $BODY_FG2_CLASS (期望 ≤1, NEW dimension)"
echo "V09-P0-3 · meta-label <span>   : $META_AS_SPAN (期望 ≥3)"
echo "V09-P0-3 · meta-label <p> 残留 : $META_AS_P (期望 ≤2)"

# V09-P0-2 · Hero focal number readability
BACKPLATE=$(grep -cE "rep-hero-num.*backgroundColor.*surface-l[23]|hero-num.*background.*surface-l[23]" "$APP" || echo 0)
echo "V09-P0-2 · Hero number backplate: $BACKPLATE (期望 ≥0,backplate 或 shader L 极端二选一)"

# V09-P0-4 + B4 · chart ramp (公式存在 + 无负 chroma)
CHART_MAX_FORMULA=$(grep -cE "max\(primaryL-|max\(min\(pC-" "$APP" || echo 0)
NEGATIVE_CHROMA=$(grep -cE "oklch\([^)]*-[0-9]+\.[0-9]+" "$APP" || echo 0)
echo "V09-P0-4 · chart max() 公式     : $CHART_MAX_FORMULA"
echo "V09-P0-4+B4 · 负 chroma oklch   : $NEGATIVE_CHROMA (期望 0)"

# V09-P1-5 + B2 · dark primary-soft text color 禁
PRIMARY_SOFT_AS_TEXT=$(grep -cE "color:\\s*['\"]?var\\(--primary-soft\\)" "$APP" || echo 0)
echo "V09-P1-5 · primary-soft text   : $PRIMARY_SOFT_AS_TEXT (期望 0)"

# V09-P1-6 · Hero image filter HARD
IMG_FILTER=$(grep -cE "<img[^>]*style[^>]*filter:" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
echo "V09-P1-6 · <img filter:        : $IMG_FILTER (期望 0)"
echo "V09-P1-6 · filter fn calls     : $IMG_FILTER_FN (期望 0)"

# V09-P1-7 · Outro CTA + material
OUTRO_CTA=$(grep -cE "(查看完整|Learn more|View demo|Read full|Sign up|Get started).*<(a|button|div)" "$APP" || echo 0)
OUTRO_PILL=$(grep -cE "rounded-full[^>]*var\\(--primary\\)|borderRadius.*9999.*var\\(--primary\\)" "$APP" || echo 0)
OUTRO_BG=$(grep -cE "<section[^>]*outro|<div[^>]*outro[^>]*backgroundColor" "$APP" || echo 0)
echo "V09-P1-7 · Outro CTA text      : $OUTRO_CTA (期望 0)"
echo "V09-P1-7 · Outro pill shape    : $OUTRO_PILL (期望 0)"
echo "V09-P1-7 · Outro outer bg      : $OUTRO_BG (期望 0)"

# AnimateNumber zone 不动 verify (carry from R-120 + R-123)
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
USE_REDUCED=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "AN-1 tabular-nums              : $TNUM"
echo "AN-2 AnimateNumber instances   : $ANIM_NUM"
echo "AN-3 useReducedMotion calls    : $USE_REDUCED"

# Cumulative regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
GRID_HERO=$(grep -cE "grid-template-columns:\s*1\.15fr|gridTemplateColumns.*1\.15fr|grid-template-columns:\s*1fr 1fr" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "Regression framer-motion       : $FM (期望 0)"
echo "Regression Hero grid           : $GRID_HERO (期望 ≥1)"
echo "Regression wildcard ui import  : $WILDCARD (期望 0)"

# Q5 data semantic regression
if [ "$N" = "5" ]; then
  KEEP=$(grep -cE "月活用户|付费率|ARPU|NPS|累计交易额|广告 ROAS|销售|业绩|经理|大区|省区|门店" "$APP" || echo 0)
  STOLEN=$(grep -cE "击杀|KDA|战绩|胜率|积分|比分" "$APP" || echo 0)
  echo "S-5 data label kept            : $KEEP  (Round-5: 155; expect ≥ 100)"
  echo "S-5 data label stolen          : $STOLEN (Round-5: 3; expect ≤ 5)"
fi

# Q7 runtime regression
if [ "$N" = "7" ]; then
  MAX_BARE=$(grep -cE "\bmax\(" "$APP" || echo 0)
  MATH_MAX=$(grep -c "Math\.max" "$APP" || echo 0)
  echo "S-3 Q7 bare max() calls         : $MAX_BARE"
  echo "S-3 Q7 Math.max() calls         : $MATH_MAX"
fi
```

### Step 7 · Design Skill 评分

Round-5 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.9_Round-6.md`

### 11 headline sections

#### 1. Round-5 → Round-6 patch verdicts (HEADLINE)

按 9 个 first-pass + 5 个 second-pass + AnimateNumber invariant 三组分别表格化:

**Group A · 9 first-pass v0.9 patches**:

| # | Patch | Round-5 baseline | Round-6 actual | Verdict | Evidence |
|---|---|---|---|---|---|
| V09-P0-A | OKLCH syntax | Q2 N-1 body rgb(0,0,0) | <N>/8 body rgb(0,0,0) | PASS/FAIL/PARTIAL | DOM bodyComputedColor + source grep `oklch\(.*,` |
| V09-P0-B + P0-1 + B1 | shader colors[] L 投影 | Q3 L114 #7C2D12 / Q6 L247 #854D0E | <N>/8 attempts have shader colors[] L < 0.925 light / L > 0.480 dark | PASS/FAIL/PARTIAL | hex L 重算 + source grep |
| V09-P0-3 + B3 | F-2 + meta-label `<span>` | R5-SF-1 22 处 (Q3 误算 0) | <N> 处 + Q3 真 0 + meta-label `<span>` 比例 | PASS/FAIL/PARTIAL | inline + class CSS scan |
| V09-P0-2 | Hero focal number readability | Q3/Q6/Q7 不可辨 | <N>/8 attempts have backplate OR extreme shader L | PASS/FAIL/PARTIAL | DOM heroNumParentBgColor |
| V09-P0-4 + B4 | chart ramp floor + 非负 chroma | Q6 donut ΔL=0.03 | chart-3 ΔL + 0 negative chroma | PASS/FAIL/PARTIAL | source grep |
| V09-P1-5 + B2 | dark primary-soft bg-only | Q2 eyebrow invisible | <N>/8 use --primary-soft as text | PASS/FAIL/PARTIAL | source grep + DOM primarySoftAsText |
| V09-P1-6 | Hero image filter HARD | Q7 saturate/brightness | <N>/8 `<img>` have filter | PASS/FAIL/PARTIAL | source grep |
| V09-P1-7 | Outro CTA + material | Q7 CTA pill + rounded panel | <N>/8 Outro has CTA or rounded panel | PASS/FAIL/PARTIAL | source grep |

**Group B · 5 second-pass conflict fixes (verify 不破坏 first-pass)**:

| # | Fix | Round-6 maintenance |
|---|-----|---------------------|
| B1 | §17 row L range 同步 | mesh/grain/dithering 数字一致 PASS/FAIL |
| B2 | dark primary-soft chroma | §3 table 内部一致 PASS/FAIL |
| B3 | colophon line | Outro colophon `<span>` 不 `<p>` PASS/FAIL |
| B4 | chart chroma 非负 floor | low chroma brand 0 invalid PASS/FAIL |
| N3 | Outer section element 限定 | Outro 内 element bg 允许 PASS/FAIL |

**Group C · AnimateNumber 0 改 invariant** (R-120 + R-123 双重锁定):

| # | Invariant | Round-6 status |
|---|---|---|
| AN-1 | tabular-nums | MAINTAINED/REGRESSED |
| AN-2 | useReducedMotion | MAINTAINED/REGRESSED |
| AN-3 | parseDisplayValue cover | MAINTAINED/REGRESSED |
| AN-4 | wrapper class | MAINTAINED/REGRESSED |

Headline: "X/9 v0.9 first-pass patches PASS · Y PARTIAL · Z FAIL · 5/5 second-pass fix maintenance · AN invariant MAINTAINED/REGRESSED"

#### 2. v0.9 first-pass + second-pass cross-Q heat map

Per-Q heat map showing each patch verify status:

| Patch | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 |
|-------|----|----|----|----|----|----|----|----|
| V09-P0-A | ✓/✗ | ... |
| ... |

#### 3. AnimateNumber 区域 0 改 invariant verification (R-120 + R-123 carry)

#### 4. Round-5 / earlier rounds cumulative regression

All prior wins (F-2/F-3/P-1~7/S-1~5/C-4/C-6) verify status.

#### 5. Per-Query 验证表 (V1-V7)

Same as Round-5 with extra column "Round-5 → Round-6 综合 delta".

#### 6. New Stable Failures (≥ 2/8 in Round-6, NOT seen in Round-5)

What surfaced once v0.9 closed Round-5 SFs.

#### 7. Single Failures (1/8 only) — Noise

#### 8. Cross-skill diagnostic convergence

#### 9. Patch suggestions to Cowork (for v1.0 / v0.10, if needed)

Concrete observations only. No patched wording. Maximum 5 suggestions, P0 > P1 > P2.

⚠️ Chris's red-line: do NOT propose suggestions that require Design Prompt to describe `import` statements / directory paths / build tool commands / package paths. Route engineering issues to AGENT.md.

⚠️ R-120 + R-123 carry: do NOT propose changes to AnimateNumber 区段(§4 L ~187 / §7 L ~269-291 / §17 L ~566-589).

#### 10. Convergence assessment

This is the headline value of Round-6. State explicitly:
- **If ≥ 7/9 first-pass PASS + 5/5 second-pass maintained + no new SF + AN invariant kept**: **v0.9 reaches production / stable baseline**. Cowork can close R-123 and consider tagging v1.0.
- **If 5-6/9 PASS, or 1 PARTIAL with clear next step**: small follow-up needed (R-124 / v0.10).
- **If ≤ 4/9 PASS or major regression**: substantive patch round needed.

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-6-app-tsx" "$DST/Round-6-screenshots" "$DST/Round-6-critic" "$DST/Round-6-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.9-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-6-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-6-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.9-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-6-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-6-source-grep/Q${N}.txt" || true
done

ls -la "$DST/Robustness-Report_default-v0.9_Round-6.md"

echo "--- Round-6 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-6-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-6-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-6-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-6-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.9_Round-6.md" ] && echo present || echo MISSING)"
```

Expected: ~70-80 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v0.9 + B sandbox + C Round-5 report)
- [ ] Pre-test red-line: 22 must-exist ≥1 + 17 SHOULD-APPEAR ≥1 + 8 SHOULD-DISAPPEAR = 0 + 9 forbidden = 0 + 7 engineering red-line = 0 + AnimateNumber 7 sentinels = 1
- [ ] `framer-motion` only in FORBIDDEN/Don't context
- [ ] 8 Queries generate-prompt.txt 各独立
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM (含 Round-6 NEW addition) + Step 6.5 source-grep
- [ ] dark-mode + BarChart-containing Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥3 design skills + motion-audit ×1
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 头条 9 first-pass + 5 second-pass + AN invariant 三组都给 Round-5 baseline + Round-6 actual + evidence
- [ ] §2 per-Q heat map 填
- [ ] §4 cumulative regression 11 项都填
- [ ] §10 Convergence assessment 给出明确判断 (production-ready / 小 follow-up / 大 patch)
- [ ] § 9 patch suggestions 严守 Chris 工程红线 + R-120/R-123 AnimateNumber 不动
- [ ] cp-to-vault tally ~70-80

---

## Output to Chris on completion

```
doubao default v0.9 生成测试 Round-6 complete.

Design Prompt under test: default v0.9 (627 lines, frozen — R-123 9 first-pass + 5 second-pass = 14 处 surgical changes)
Round-5 baseline: Robustness-Report_default-v0.8_Round-5.md
Round-6 report  : Robustness-Report_default-v0.9_Round-6.md

Pre-test red-line verify: <PASS/FAIL>
- v0.9 SHOULD-APPEAR (17 项): <PASS/FAIL>
- v0.9 SHOULD-DISAPPEAR (8 项): <PASS/FAIL>
- AnimateNumber 7 sentinels = 1: <PASS/FAIL>
Engineering red-line(Chris HARD): <PASS/FAIL>

9 v0.9 first-pass patch verdicts (Round-5 → Round-6):
  V09-P0-A OKLCH syntax: <PASS/PARTIAL/FAIL>
       Round-5: Q2 N-1 body rgb(0,0,0) · Round-6: <N>/8 body rgb(0,0,0)
  V09-P0-B + P0-1 + B1 shader colors[] L 投影: <PASS/PARTIAL/FAIL>
       Round-5: Q3 #7C2D12 / Q6 #854D0E in colors[] · Round-6: <N>/8 attempts have colors[] L 越界
  V09-P0-3 + B3 F-2 含 class cascade + meta-label `<span>`: <PASS/PARTIAL/FAIL>
       Round-5: R5-SF-1 22 处 · Round-6: <N> 处 + Q3 真 <N> + meta-label `<span>` 比例 <N>%
  V09-P0-2 Hero focal number readability: <PASS/PARTIAL/FAIL>
       Round-5: Q3/Q6/Q7 hero number 不可辨 · Round-6: <N>/8 have backplate OR extreme L
  V09-P0-4 + B4 chart ramp floor + 非负 chroma: <PASS/PARTIAL/FAIL>
       Round-5: Q6 donut ΔL=0.03 + 风险 · Round-6: chart-3 ΔL <N> + <N>/8 have negative chroma
  V09-P1-5 + B2 dark primary-soft bg-only: <PASS/PARTIAL/FAIL>
       Round-5: Q2 eyebrow invisible · Round-6: <N>/8 use --primary-soft as text
  V09-P1-6 Hero image filter HARD: <PASS/PARTIAL/FAIL>
       Round-5: Q7 filter saturate(0.9) brightness(0.85) · Round-6: <N>/8 `<img>` have filter
  V09-P1-7 Outro CTA + material: <PASS/PARTIAL/FAIL>
       Round-5: Q7 CTA pill + rounded panel · Round-6: <N>/8 Outro has CTA or rounded panel

Headline: <X>/9 v0.9 P0 patches PASS, <Y> PARTIAL, <Z> FAIL.

5 second-pass conflict fix maintenance:
  B1 §17 row L range  : <PASS/FAIL>
  B2 primary-soft 0.04: <PASS/FAIL>
  B3 colophon line    : <PASS/FAIL>
  B4 chart 非负 chroma: <PASS/FAIL>
  N3 outer section    : <PASS/FAIL>

AnimateNumber 区域 0-改 invariant (R-120 + R-123 carry):
  AN-1 tabular-nums    : <MAINTAINED/REGRESSED>
  AN-2 useReducedMotion: <MAINTAINED/REGRESSED>
  AN-3 parseDisplayValue cover: <MAINTAINED/REGRESSED>
  AN-4 wrapper class    : <MAINTAINED/REGRESSED>

Cumulative regression (Round-1/2/3/4/5 wins must stay):
  F-2 body color (subsumed V09-P0-3) : <see above>
  F-3 chart-hover            : <PASS/FAIL>
  S-1 framer-motion          : <N>/8 (R5: 0/8)
  S-2 useReducedMotion       : <N>/8 (R5: 8/8)
  S-3 Q7 build+runtime       : <PASS/FAIL>
  S-5 Q5 semantic KEEP/STOLEN: <N>/<M> (R5: 155/3)
  C-4 AnimateNumber tnum DOM : <N>/8 (R5: 8/8)
  C-6 dark Tooltip mode-explicit: <PASS/FAIL>

Per-Query summary (Build | 综合 R5 → R6):
  Q1-Q8 …

Build pass rate          : <N>/8 (R5: 8/8)

New Stable Failures (≥ 2/8) after v0.9:
  <list, or "none — clean run">

Top patch suggestions for Cowork v1.0 / v0.10 (Chris 红线 + R-120/R-123 AN 不动 honored):
  <listed in report §9>

Convergence assessment:
  <PRODUCTION-READY (R-123 closes, candidate tagging v1.0) / small follow-up R-124 / substantive patch>

Artifacts cp'd: <N> files in reports/Round-6-* subdirs.

If ≥ 7/9 first-pass PASS + 5/5 second-pass maintained + 0 new SF + AN invariant kept: R-123 closes, v0.9 production-ready.
Else: Cowork starts R-124 (small) or substantive patch round.
```
