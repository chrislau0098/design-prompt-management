# CC-Prompt · default v0.8 → v0.9 patch · 9 处 surgical edits · Opus 4.6

你是 **Vibe view 项目 default Design Prompt 维护者**(scope: design-prompt-management 项目,vibe-view-campaign-report 场景 default 主题)。

## 任务 — 执行 v0.8 → v0.9 surgical patch · 9 处 fix Round-5 doubao 测试暴露的暗黑模式 / Hero shader / F-2 caption / chart ramp / Hero image / Outro CTA 问题:

- **P0-A**: §3 OKLCH 逗号语法全替换为 space-separated + 新增 HARD syntax 规则(Q2/Q6 文字 fallback 黑色根因)
- **P0-B**: §17 line 529 消除"use brand_color hex directly" 与 §17 colors[] L 区间约束的内部冲突
- **P0-1**: §17 mesh/grain/dithering sampling 表强制 colors[] EVERY slot L 落入区间(依赖 P0-B 先 land)
- **P0-3**: §3 line 104 F-2 FORBIDDEN BODY COLOR 加 class-CSS-cascade scope + meta-label 必须 `<span>` 不 `<p>` 架构指令
- **P0-2**: §14.1 line 442-452 加 Hero focal number readability invariant(局部背板 OR 该区强制极端 L);严禁 wash overlay 与 AnimateNumber zone
- **P0-4**: §3 line 72-74 chart ramp 公式 chart-3 step 加大到 -0.12 + floor `max(computed, 0.22)`,chart-2/4/5 同步加 floor
- **P1-5**: §3 line 90-92 dark mode tokens 段加 `--primary-soft` L 0.14-0.20 + "background-only, never text color" 约束
- **P1-6**: §15 line 487-489 Hero image 规则:"raw image asset only" 升 HARD GATE + forbidden CSS properties enum(filter/saturate/brightness/blur/contrast/hue-rotate)+ dim overlay 数值 sealed
- **P1-7**: §10 line 323 + §12 Outro 段加双约束:enumerated CTA-pill negative example + "Outro section MUST be Typographic Field, no surface bg / no rounded panel"

## 第一步必读

读 v0.8 完整源(620 行,改起点):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.8.md`

我已经 cp v0.8 → v0.9 作为起点(同 620 行)。**你的所有 Edit tool 操作目标是**:

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md`

不要碰 v0.8.md。

## 详细 9 处 patch spec

### P0-A · OKLCH 逗号语法全替换 + 新增 HARD syntax 规则

**根因**:CSS Color Module Level 4 规范 `oklch()` MUST use space-separated `oklch(L C H)` 或 `oklch(L C H / α)`。逗号写法 `oklch(L, C, H)` 被现代 browser parser **拒绝 → custom property 退到 initial value = 黑色**(在 :root 解析,fallback 链断开)。Round-5 §7 N-1 报 Q2 dark body 字色 rgb(0,0,0) 就是这个 bug 的直接证据。

**v0.8 §3 line 64-81 自身用逗号写法**(`oklch(primaryL, pC, pH)` 等),doubao 照抄注水时也写逗号 → Q2/Q6 token 整批失效。

**改动**:
1. v0.9 §3 整段 line 63-82 算法块,把所有 `oklch(L, C, H)` / `oklch(L, C, H, alpha)` 改成 space-separated `oklch(L C H)` / `oklch(L C H / alpha)`
2. 在 §3 line 53(Colors 章起点)或 line 86(Background lightness invariant)附近,新增 1-2 行 HARD 规则,如:`OKLCH function MUST use space-separated CSS Color Module Level 4 syntax — \`oklch(L C H)\` / \`oklch(L C H / alpha)\`, never comma-separated \`oklch(L, C, H)\` (legacy syntax invalid, falls back to initial value).` 用词从严,但**不写完整 React snippet / 完整 CSS 块,只规则文字**。

### P0-B · §17 line 529 brand hex direct conflict 消除

**根因**:v0.8 §17 line 519-523 mesh light sampling 说 "Light: 5 hex L 0.925-0.975 C 0.008-0.040 + 1 neighbor hue (pH+22). Brand peak Light L 0.925 C 0.040",同时 §17 line 528-529 R-120 P0-2 改写后说 "use the brand_color hex directly for the primary swatch, and stepped hex values from the design system for the rest"。两条规则矛盾:**brand_color hex 原值 L 通常 0.30-0.65(depends on user input),不在 light mesh 的 0.925-0.975 区间**。doubao 照 line 529 后半句执行 → Q3 把 #7C2D12 (L≈0.41) 塞 colors[],Q6 把 #854D0E (L≈0.48) 塞 colors[]。

**改动**:重写 v0.9 §17 line 529 那句,把"use brand_color hex directly" 改成 "brand_color provides only the **hue/chroma anchor**; the L value MUST be projected to the engine's required L band (light: 0.925-0.975 / dark: 0.115-0.480) via the sampling formula, never passed through raw"。明确 brand hex 不直接塞 colors[]。

### P0-1 · §17 mesh/grain/dithering sampling 表强制 colors[] L 区间

**依赖**:P0-B 先 land。

**根因**:即便 P0-B 修复了 brand hex 不直接塞,§17 line 519-523 sampling 表仍只用"建议性" L range 表述(`Light: 5 hex L 0.925-0.975`),没有显式 HARD GATE 说"EVERY slot of colors[] must satisfy L ≥ 0.925"。

**改动**:重写 v0.9 §17 line 519-523 表格 sampling 列,加 HARD GATE 句:"colors[] array EVERY entry's L MUST be in [0.925, 0.975] for light / [0.115, 0.480] for dark. No exceptions — even the brand-anchored swatch projects its L onto this range. Violating L = shader has mid-tone region where Hero focal text fails 4.5:1 contrast."

### P0-3 · §3 line 104 F-2 含 class CSS cascade scope + meta-label `<span>` 架构指令

**根因**:Round-5 R5-SF-1 报 22 处 F-2 违规 7/8 attempts。general-purpose grep 只抓 `inline style=`,漏 class CSS cascade 路径(Q3 L127/L235/L305/L319 `<p className="rep-eyebrow|ranking-role|rep-quote-attribution|rep-outro-colophon">` 通过 CSS class 赋 fg-2,Round-5 Q3 误判为 0 violations)。doubao 心智里 inline 与 class 是两套规则,逃避 F-2。

**改动**:重写 v0.9 §3 line 104 整段 F-2 FORBIDDEN BODY COLOR HARD GATE:
1. 保留 "EVERY `<p>` element MUST use color: var(--foreground)" 主句
2. 新增 "regardless of HOW the color is set — inline `style={{color:'var(--foreground-2)'}}`, className utility (`text-[var(--foreground-2)]`), or CSS class rule (`.rep-eyebrow { color: var(--foreground-2) }`) — ALL are violations if applied to a `<p>` element"
3. 新增架构指令:"Meta-label text (role / region / 职位 / 省区 / score caption / timestamp / colophon / eyebrow,通常 11-14px)MUST use `<span>` element, NOT `<p>`. If you reach for `<p className='text-xs'>` carrying a meta-label, rewrite as `<span>` first. The `<p>` element is reserved for narrative body — Hero lead, Outro description, section intro paragraph, Chapter body, Quote body, Insight statement, ranking-row description, KPI label (above/below number)."
4. 保留现有 "Don't `<p style={...foreground-2}>` even at 13px" 例句

### P0-2 · §14.1 line 442-452 加 Hero focal number readability invariant

**根因**:Q3/Q6/Q7 Hero focal number (200px / 120px) 在 mesh shader mid-tone 区域 (L 0.6-0.85) 或 HeroImg 露图区 (L 0.5-0.6) 上 ΔL ≤ 0.15,严重不可辨。v0.8 §14.1 / §3 没规定 hero number 落点的 contrast。

**改动**:在 v0.9 §14.1 Hero Monolith 章节末段(line 442-452 范围内)新增 invariant 段:
- "Hero focal number readability HARD GATE — the focal number must satisfy ≥ 4.5:1 contrast against the underlying shader / image color at the number's bounding box. Two ways to guarantee:
  (1) Place a `--surface-l2` solid-color local backplate beneath the number (a tight inline-flex container with `backgroundColor: var(--surface-l2)`, padding 12-24px), OR
  (2) Constrain the shader / image so the region under the number is extreme L — light mode: that region's sampled L > 0.92 (near-white);dark mode: that region's sampled L < 0.16 (near-black)."
- 严禁:"NEVER use `.rep-hero-shader-wash` linear-gradient mask, `backdrop-filter blur`, or full-Hero opacity overlay to fix this — these violate the §14.1 single-layer rule (line 444 / 450 carry-over). The two options above are the only legal paths."
- **明确 AnimateNumber zone 不受影响**:"This rule shapes the visual context around the number, not the number itself — AnimateNumber JSX implementation (§17 lines 559-582) remains unchanged."

### P0-4 · §3 line 72-74 chart ramp L collapse + floor

**根因**:v0.8 line 72-74 chart-3 = `oklch(primaryL-0.03, pC-0.06, pH)`,L step 仅 0.03 → 相邻 slice 视觉同色 (Q6 donut chart-1 L=0.48 / chart-3 L=0.45 几乎无差);chart-5 = `primaryL-0.23` 在低 primaryL (=0.30 dark) 下退为 0.07 < surface-l1 L=0.12 → 不可见。

**改动**:重写 v0.9 §3 line 71-74 chart ramp 算法块:
```
--chart-1       = var(--primary)
--chart-2       = oklch(max(primaryL+0.07, 0.40) min(pC, 0.18) pH)
--chart-3       = oklch(max(primaryL-0.12, 0.22) min(pC-0.06, 0.14) pH)
--chart-4       = oklch(max(primaryL-0.22, 0.18) min(pC-0.10, 0.10) pH)
--chart-5       = oklch(max(primaryL-0.32, 0.15) min(pC-0.14, 0.06) pH)
```
chart-3 step 加大到 -0.12,floor `max(..., 0.22)` 防 dark mode 过暗;chart-2/4/5 同步加 floor。这是公式替换,行数不变(同 4 行)。**OKLCH syntax 必须 space-separated**(承袭 P0-A)。

### P1-5 · §3 line 90-92 dark mode `--primary-soft` 用途约束

**根因**:v0.8 §3 line 90-92 Dark mode tokens 段没明确 `--primary-soft` 的 L,doubao 推断 dark mode primary-soft 应是深色(对称 light 0.92 → dark 0.14 区),Q2 写成 `oklch(0.14, 0.04, 230)` 然后 L215 误用为 eyebrow tag text color → invisible。

**改动**:在 v0.9 §3 line 90-92 dark mode 段补 1-2 句:"`--primary-soft` in dark mode = `oklch(0.22 min(pC, 0.06) pH)` (a soft surface, still distinct from `--surface-l1` at L=0.12). HARD: `--primary-soft` is a **background-only token** — NEVER appears as text `color`. Use it on tag bg / chip bg / pill bg / soft accent surface only. Text color comes from { `--foreground`, `--foreground-2`, `--foreground-3`, `--primary`, `--primary-hl` }."

### P1-6 · §15 line 487-489 Hero image filter HARD GATE + overlay 数值 sealed

**根因**:Q7 L253 `filter: 'saturate(0.9) brightness(0.85)'` 违反 §15 line 489 "raw image asset only (no filter / blur / saturate)" 但 v0.8 表述偏软,doubao 仍违反;dim overlay 数值 25%→85% 比规范 25%→50% 激进。

**改动**:重写 v0.9 §15 line 487-489 Hero image archetype 段:
1. 保留 hero_image_url mutually exclusive 等现有规则
2. 把 "raw image asset only (no filter / blur / saturate)" 升级为 HARD GATE 句:"`<img>` element forbidden CSS properties (HARD GATE): `filter`, `-webkit-filter`, `backdrop-filter`. This includes `saturate()`, `brightness()`, `blur()`, `contrast()`, `hue-rotate()`, `grayscale()`, `sepia()`, `drop-shadow()` and all `filter` function values. The image's perceived L is shaped via the **adaptive dim overlay**, not via filter manipulation."
3. dim overlay 数值 sealed:"Overlay numbers are sealed: light mode `var(--background)` 25% top → 50% bottom MAX (the 50% is upper bound, not a starting point); dark mode 45% top → 70% bottom MAX. Exceeding these = harsh wash that defeats image presence; staying below = title contrast may fail."
4. 保留现有 "Hero title / number / delta stack stays z 2; image + overlay sit z 0 / z 1" 等 layering rules

### P1-7 · §10 line 323 + Outro 段加 CTA 禁令 + material 约束

**根因**:Q7 L443 把 Outro 做成 rounded surface panel(违反 §10 line 323 / §14.2 Outro 应为 Typographic Field),L452-453 加 "查看完整报告" pill CTA(违反 §10 read-only narrative)。v0.8 现有 "no CTA-shaped affordance" 表述不够枚举具体。

**改动**:
1. 在 v0.9 §10 line 323 现有 "Don't render any CTA-shaped affordance" 后补充 enumerated negative example:"— specifically: no `<a>` / `<button>` / `<div>` with rounded-full or pill border-radius + bg-primary + text-white + text content like '查看完整报告' / 'Learn more' / 'View demo' / 'Read full report' / 'Sign up' / 'Get started'. Outro caps the report with a colophon `<p>` + radial glow, full stop. Any pill/button/CTA visual = hard violation regardless of HTML element used."
2. 在 v0.9 §14.2 或 §12 Outro Reverent archetype 描述段补 material 约束:"Outro section material discipline — Typographic Field treatment ONLY. NO `backgroundColor`, NO `borderRadius`, NO rounded surface panel chrome on the outer section. The radial `--primary-glow` `::before` pseudo-element (§12 / §17) is the only decorative layer. Body content is plain `<p>` paragraphs over `var(--background)` ground."

## 关键纪律 (HARD GATE,违反任何一条 = patch 失败)

1. **AnimateNumber zone 0 改** — §4 line 189 / §7 line 267-289 / §17 line 559-582 整段,**一字不动**。Chris R-120 明确锁定。
2. **Chris 工程红线** — v0.9 不允许出现 `import ... from` / `pnpm` / `package.json` / `npm install` / `AGENT.md` / `src/views` / `@/components/ui` / `createElement.*link` 等工程化文本。
3. **OKLCH syntax** — P0-A 后,v0.9 全文 OKLCH 必须 space-separated,不能再出现 `oklch(L, C, H)` 逗号形式(grep verify)。
4. **不诱导 wash overlay** — P0-2 措辞排除 wash overlay / backdrop-filter / opacity overlay 作为 Hero number 可读性解决方案。
5. **不诱导运行时采样** — P0-2 不要写 "mesh sampled L at runtime" 这种运行时计算暗示,改用 design-time 约束语言("the region under the number is extreme L")。
6. **行数上限** — v0.9 净 ≤ 650 行(从 620 + ~22-28 新增到 642-648),不能爆 650。
7. **不写完整 React snippet 或完整 CSS 块作为 few-shot** — Chris 红线 3,除 §17 现有 shader snippet (line 532-557 R-120 保留)外不新增 snippet。
8. **不加 emoji checklist / Inspired by / Source provenance / Last updated** — Chris 红线 1+2。
9. **不写理由解释 / "Why" 长段 / 历史叙事** — Chris 红线 6;rules 直接陈述。
10. **patch 完所有 edit 后,跑 self-check grep verify**(下面列具体 grep 命令)。

## 落地 + 回报

完成所有 9 处 patch 后:

1. 跑以下 grep 命令 self-verify(每行结果直接报):
```bash
V09="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md"

echo "=== 行数检查 (期望 642-648, ≤650) ==="
wc -l "$V09"

echo "=== OKLCH 逗号语法残留 (期望 0) ==="
grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$V09"

echo "=== OKLCH space-separated 使用 (期望 ≥ 6) ==="
grep -cE "oklch\([0-9.]+ [0-9.]+ " "$V09"

echo "=== P0-A SHOULD-APPEAR (期望 ≥1) ==="
for p in 'space-separated' 'CSS Color Module Level 4'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P0-B SHOULD-APPEAR (期望 ≥1) ==="
for p in 'hue/chroma anchor' 'projected to the engine'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P0-1 SHOULD-APPEAR ==="
for p in 'EVERY entry' 'No exceptions' '4.5:1 contrast'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P0-2 SHOULD-APPEAR ==="
for p in 'Hero focal number readability' 'local backplate' 'single-layer'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P0-3 SHOULD-APPEAR ==="
for p in 'class CSS' 'Meta-label' 'inline `style=' '<span>'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P0-4 SHOULD-APPEAR (chart ramp floor) ==="
for p in 'max(primaryL' 'min(pC'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P1-5 SHOULD-APPEAR ==="
for p in 'background-only token' 'NEVER appears as text'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P1-6 SHOULD-APPEAR ==="
for p in 'Hero image' 'forbidden CSS properties' 'sealed'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== P1-7 SHOULD-APPEAR ==="
for p in 'enumerated' 'no `<a>`' 'Typographic Field' 'rounded surface panel'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== AnimateNumber zone 0 改 verify (期望 diff 为空) ==="
diff <(sed -n '189p;267,289p;559,582p' "$V09") <(sed -n '189p;267,289p;559,582p' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.8.md)

echo "=== Chris 工程红线 (每条 = 0 hit) ==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link' 'import.*from'; do
  printf "  %-30s : %s hits\n" "$p" "$(grep -cE "$p" "$V09")"
done

echo "=== Chris 红线 emoji (每条 = 0 hit) ==="
for p in '✅' '❌' '🔥' '💡' '✓' '✗'; do
  printf "  %-10s : %s hits\n" "$p" "$(grep -c "$p" "$V09")"
done

echo "=== framer-motion 上下文 verify (2 hits, 都在 FORBIDDEN/Don't context) ==="
grep -n 'framer-motion' "$V09"
```

2. 按以下模板回报结果(完整粘贴):
```
default v0.8 → v0.9 patch complete.

Edits 落地:
  P0-A OKLCH syntax: <DONE/PARTIAL/FAIL> · 替换逗号语法 N 处 · 新增 HARD rule 1 处
  P0-B §17 conflict: <DONE/PARTIAL/FAIL> · 重写 line 529
  P0-1 colors[] L floor: <DONE/PARTIAL/FAIL> · §17 sampling 表
  P0-3 F-2 含 class cascade: <DONE/PARTIAL/FAIL> · §3 L104 整段重写
  P0-2 Hero focal number readability: <DONE/PARTIAL/FAIL> · §14.1 新增段
  P0-4 chart ramp 公式 + floor: <DONE/PARTIAL/FAIL> · §3 L72-74
  P1-5 dark primary-soft 约束: <DONE/PARTIAL/FAIL> · §3 L90-92
  P1-6 Hero image filter HARD: <DONE/PARTIAL/FAIL> · §15 L487-489
  P1-7 Outro CTA + material: <DONE/PARTIAL/FAIL> · §10 L323 + §12 / §14.2

Self-check 结果:
  v0.9 行数: <N> (期望 642-648)
  OKLCH 逗号残留: <N> (期望 0)
  AnimateNumber zone diff: <empty / diff content>
  工程红线 0 hit: <PASS/FAIL>
  emoji 0 hit: <PASS/FAIL>
  framer-motion context: <PASS/FAIL>

ambiguity / 风险 flag:
  <列出 patch 时遇到的 ambiguity 或不确定决策,或 NONE>
```

3. **不 commit / 不 push** — Cowork(我)会接手 review。

## 触发词

开始。
