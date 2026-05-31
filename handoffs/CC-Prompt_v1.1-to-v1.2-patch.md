# CC-Prompt · default v1.1 → v1.2 patch · A+B+C 3 处 surgical edit · Opus 4.6

你是 **Vibe view 项目 default Design Prompt 维护者**(Opus 4.6 写作者).

## 任务 — 3 处 surgical edit · 落地 v1.2

R-128 双路 review(Opus 4.6 design + Codex 工程)已收敛 scope:
- D3 brand-narrative (Q3 茶语轩 38 年品牌史) Round-8 FAIL · critic F → 估 R9 B-/B
- D4 testimonial-threaded (Q4 5 个客户证言) Round-8 FAIL · critic D- → 估 R9 B-/B
- V11-P0-1 wrapper reinforce 砍掉(runtime PASS 已达成, source 3/8 是 metric 误导, full draft 含 code snippet 违反 Chris prompt 红线)

行数预算:v1.1 = 631 行 → v1.2 ≤ 646 行(**净增 ≤ 15 行**).

## 第一步必读

cp v1.1.md → v1.2.md 作为起点:

```bash
cp /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md \
   /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md
```

读 v1.2.md 完整源(改起点 = v1.2.md):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md` (631 行, 已 cp 自 v1.1)

重点看:
- **§11 line 343-358** Pattern Overview (现有 "numbers are protagonist")
- **§12 line 359-412** Section Archetype Library (现有 10 个 archetypes, Quote Interstitial 在 line 408)
- **§13 line 414-444** Composition (现有 default skeleton line 416)
- **§3 line 104-107** Foreground role discipline (Meta-label element discipline 用 `<span>`)
- **§14.1 line 446-462** Hero Monolith (V11-P0-1 R-125 patch 已在 line 452 末尾)

**不要碰**:
- v1.1.md / v1.0.md / v0.10.md(都不动)
- AnimateNumber 三段:§4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591(三重锁定 R-120/R-123/R-124)
- §14.1 R-125 patch(已 verify runtime PASS, 本轮不动)

---

## 3 处 patch spec

### V12-P0-A · §12 Archetypes 顶部新增 intro 1 句

**位置**:§12 Archetypes line 392 "### Archetypes" header 后,line 394 Hero Monolith 前插入 1 句

**插入文字**(1 行):

```
> Default skeleton stays data-led (Pattern Overview "numbers are protagonist"). Narrative-shape archetypes (Brand Narrative Spine, Testimonial-Threaded) engage ONLY when query explicitly signals brand history / heritage / craftsmanship / founder story OR customer voice / testimonial / case interview — narrow gate, not default.
```

**严守**:这 1 句必须明确指出 "narrow gate, not default" — 防止 doubao over-trigger 新 archetype.

**预计行数变化**:+1-2 行.

---

### V12-P0-B · §12 Archetypes 新增 2 个 archetype 条目

**位置**:§12 Archetypes line 412 Outro Reverent 之后插入 2 个新条目(同段 archetype 兄弟)

**插入文字方向**(注:文字精炼,**严守压缩版**,不要展开成 R-128 scope review file 里的草案完整版):

#### B1 · Brand Narrative Spine(目标 5-6 行)

```
**Brand Narrative Spine** — Narrative-led, data as supporting evidence. Engages on brand-history / heritage / craftsmanship / founder-story triggers. Structure: opening anecdote → period of origin → craftsmanship detail → present-moment data inlay → future intent. Treatments: Typographic Field heavy + Asymmetric Split (craft visual / long-form prose). Density: `<p>` ≥ 60% page volume, each `<p>` ≥ 80 chars desktop (mobile container query relaxes), multiple `<p>` per section. Number frequency: ≤ 5 distinct figures whole-page, inline-flex baseline-aligned in prose sentence, 0-2 may wrap AnimateNumber for focal claim only. Anti-refs: NEVER render as KPI Cluster grid / chart-as-hero / grid-of-cards. Brand story is the spine, not the side-bar.
```

#### B2 · Testimonial-Threaded(目标 6-7 行)

```
**Testimonial-Threaded** — Customer voice interleaved with data points (NOT split-card). Engages on customer-voice / testimonial / case-interview triggers. Structure: alternating Stacked Band where each band = 1 `<blockquote>` (customer quote, en-dash lead-in, attribution via `<span>` per §3 Meta-label discipline — NEVER `<p>`) + 1 inline data sentence that the quote substantiates. HARD GATE: NEVER render quotes and data as two parallel columns / two consecutive sections (quote block + data block split) / card-of-quote with shadow / border / rounded-card chrome. Quote and supporting data MUST sit within the same section / band, visually adjacent, voice-then-evidence rhythm. Quote constraint: ≤ 60 words per quote (this archetype extends Quote Interstitial's ≤ 28 cap; Quote Interstitial archetype itself remains unchanged for non-threaded use). Attribution typography: 12px uppercase `tracking-[0.12em]` `--foreground-2`. Anti-refs: NEVER use shadcn Card or panel chrome — bare typography only.
```

**严守**:
- B2 attribution **必须** 明确用 `<span>` per §3(Codex 抓出我原 scope 草案的错 — 不是 `<p>`,会触发 F-2 body color 红线)
- B2 末尾 "Quote Interstitial archetype itself remains unchanged" — 防止 doubao 把所有 Quote Interstitial 都 thread 化
- B1 "0-2 may wrap AnimateNumber" — 保留 AN-1/2/3/4 在 brand-narrative 模式下有限度生效
- B1 "each `<p>` ≥ 80 chars desktop (mobile container query relaxes)" — 防止 mobile 出文字墙
- 不展开 EN 翻译关键词(brand history / heritage 已经够), 不展开 archetype 引用名(Typographic Field / Asymmetric Split 已知)
- 不写 React snippet / JSX example / code block
- 不用 emoji checklist / ✅ / ❌ / 三段式法则
- 行数严守:B1 ~5-6 行, B2 ~6-7 行,共 ~11-13 行

**预计行数变化**:+11-13 行(2 个 archetype 条目 + 1 行空行 separator)

---

### V12-P0-C · §13 line 416 前新增 trigger gate 2 行

**位置**:§13 "## 13. Composition" line 414 后,默认 "Default: Hero → KPI Cluster → ..." line 416 **前** 插入 2 行

**插入文字**(2 行):

```
> Default composition skeleton assumes data-led narrative (Pattern Overview "numbers are protagonist"). When Brand Narrative Spine OR Testimonial-Threaded archetype trigger explicitly matches the user query, that archetype's own structure recipe overrides the default skeleton below; otherwise the default skeleton applies and the new archetypes do NOT activate.
```

**严守**:
- 必须明确写 "explicitly matches" — 防止泛化触发
- 必须明确写 "do NOT activate" — 防止 default 也被污染
- 2 行段落,不展开成 bullet list

**预计行数变化**:+2-3 行(段落 + 空行 separator)

---

### V12-P0-D · §14.1 R-125 wrapper rule **完全不动**

**严守**:本轮 v1.2 **不改 §14.1**.
- v1.1 line 452 末尾 R-125 patch carry as-is
- 不加 anti-pattern code snippet
- 不替换 "any intermediate wrapper" 为 "EVERY ancestor"
- runtime PASS 已达成, source 3/8 是 metric 误导(5/8 漏的里面 3 个是 build-fail 根本没 render)

---

## 严格纪律(HARD GATE)

1. **AnimateNumber zone 0 改** — §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段一字不动(R-120 + R-123 + R-124 三重锁 carry)
2. **Chris 工程红线** — 不引入 `import` / 包名(`@/components/ui` / `motion-plus/react` etc.) / 构建工具(`pnpm` / `npm install` / `package.json`)/ 框架名(`src/views` / `createElement` link)
3. **OKLCH syntax** — 全文保持 space-separated `oklch(L C H)`,不出现逗号 form
4. **F-2 body color** — Testimonial attribution 必须 `<span>` per §3,不是 `<p>`(Codex 抓出的关键 fix)
5. **不诱导 wash overlay / backdrop-filter / opacity overlay** — Hero single-layer 既有禁令不动
6. **不诱导 flexbox 替代 grid** — §14.1 grid HARD GATE 保留
7. **行数 ≤ 646 行**(v1.1 = 631, 预计 +13-15)
8. **不写 React snippet / JSX example / code block / emoji / metadata / 历史叙事 / 三段式法则 / ✅❌ checklist**
9. **不动其他 §§** — §3 / §4 / §5 / §6 / §7 / §8 / §9 / §10 / §11 / §14.1 / §15 / §16 / §17 / §18 全部不碰; 只动 §12 (A intro + B 2 archetypes) + §13 line 416 前(C trigger gate)

## 落地 + 回报

完成 3 处 patch 后跑 self-verify:

```bash
V12="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md"

echo "=== 行数(期望 644-646, ≤ 646)==="
wc -l "$V12"

echo "=== V12-P0-A SHOULD-APPEAR(§12 intro, 期望 ≥1) ==="
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Narrative-shape archetypes'; do
  printf "  %-40s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "=== V12-P0-B1 SHOULD-APPEAR(Brand Narrative Spine, 期望 ≥1) ==="
for p in 'Brand Narrative Spine' 'Narrative-led, data as supporting evidence' 'brand-history' 'craftsmanship' 'opening anecdote' '<p> ≥ 60% page volume' '<p> ≥ 80 chars' '≤ 5 distinct figures' '0-2 may wrap AnimateNumber' 'Brand story is the spine'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "=== V12-P0-B2 SHOULD-APPEAR(Testimonial-Threaded, 期望 ≥1) ==="
for p in 'Testimonial-Threaded' 'Customer voice interleaved' 'NOT split-card' 'alternating Stacked Band' '<blockquote>' 'attribution via `<span>`' 'NEVER `<p>`' 'voice-then-evidence rhythm' '≤ 60 words per quote' 'Quote Interstitial archetype itself remains unchanged' 'bare typography only'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "=== V12-P0-C SHOULD-APPEAR(§13 trigger gate, 期望 ≥1) ==="
for p in 'Default composition skeleton assumes data-led' 'explicitly matches' 'do NOT activate' 'override the default skeleton'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "=== 既有规则保留(R-120 + R-123 + R-124 + R-125 carry, 期望 ≥1 各项) ==="
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue' 'space-separated' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'Primary path' 'Fallback only when' 'Hero Display Number size' 'Wrapper className delegation' 'min-h-full' 'intermediate wrapper'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "=== AnimateNumber zone content sentinel(每个 MUST exist, R-120/R-123/R-124 三重锁)==="
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'Hero shader speed.*read at each' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-65s : %s\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V12" || echo 0)"
done

echo "=== forbidden(每项 = 0)==="
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE' 'Example:' '```jsx' '```tsx'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V12")"
done

echo "=== Chris engineering red-line(每项 = 0)==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link' 'from .framer-motion'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V12")"
done

echo "=== framer-motion context verify(2 hits, FORBIDDEN/Don't context only)==="
grep -n 'framer-motion' "$V12"

echo "=== F-2 attribution check (Testimonial 必须 <span>, 不是 <p>) ==="
grep -nE "attribution[^<]*<p>|<p[^>]*attribution|Testimonial.*<p>" "$V12" || echo "  PASS: no Testimonial <p> attribution"

echo "=== clamp 残留 verify(只允许 rule context)==="
grep -nE "clamp\(" "$V12"

echo "=== diff v1.1 → v1.2 hunks ==="
diff /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md "$V12" | head -50
```

回报模板(完整粘贴):

```
default v1.1 → v1.2 patch complete.

Edits 落地:
  V12-P0-A §12 Archetypes intro(narrow gate): <DONE/PARTIAL/FAIL>
  V12-P0-B1 §12 Brand Narrative Spine archetype: <DONE/PARTIAL/FAIL>
  V12-P0-B2 §12 Testimonial-Threaded archetype: <DONE/PARTIAL/FAIL>
  V12-P0-C §13 trigger gate(default data-led explicit switch): <DONE/PARTIAL/FAIL>

Self-check 结果:
  v1.2 行数: <N> (期望 644-646, 上限 ≤ 646)
  V12-P0-A SHOULD-APPEAR(3 项): <list>
  V12-P0-B1 SHOULD-APPEAR(10 项): <list>
  V12-P0-B2 SHOULD-APPEAR(11 项): <list>
  V12-P0-C SHOULD-APPEAR(4 项): <list>
  既有规则保留(34 项): <list 全 1+ = PASS>
  AnimateNumber zone sentinels(7 项): <list 全 1+ = PASS>
  forbidden(13 项 = 0): <list>
  Chris engineering red-line(8 项 = 0): <list>
  framer-motion 2 hits(FORBIDDEN/Don't context only): <PASS/FAIL>
  F-2 attribution 用 <span>(not <p>): <PASS/FAIL>
  clamp 全 rule context: <PASS/FAIL>
  diff v1.1 → v1.2 hunks: <3 处 insertion, 行数 +13-15>

ambiguity / 风险 flag:
  <list, or NONE>
```

不 commit / 不 push — Cowork 接手 verify + 派 Codex review patch 质量.

## 触发词

开始。
