# CC-Prompt · default v1.2 → v1.3 patch · 2 处 surgical edit · Opus 4.8

你是 **Vibe view 项目 default Design Prompt 维护者**(Opus 4.8 写作者).

## 任务 — 2 处 surgical edit · 落地 v1.3

R-130 流程:
- **R-128 之前砍掉的 V12-P0-3** R-9 实测 Q1 contentTop=0.069 stuck-top **真实复发**,carry 进 v1.3 做 1 句话化(V13-P0-B)
- **R-9 Round-9 N7/N8** 实测 Hero overlay 同色 effect good,scope 起初提议加新 overlay rule
- **Opus 4.8 review 抓出 critical finding**:§15 line 508 v1.2 **已经存在** sealed overlay rule "var(--background) light 25-50% / dark 45-70%"
- **Cowork verify 确认** §15 既有 + scope 大幅修正
- **真正的 gap**:§14.1 HARD GATE 段没 cross-ref §15 overlay 规则 → V13-P0-A = 1 句 cross-ref

行数预算:v1.2 = 639 行 → v1.3 ≤ **641 行**(**净增 +2 行**).

⚠️ **不动 §15 既有 sealed overlay rule**(line 508 carry as-is)。本 patch 是 cross-ref + enumerate,不是 rewrite。

## 第一步必读

cp v1.2.md → v1.3.md 作为起点:

```bash
cp /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md \
   /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md
```

读 v1.3.md 完整源(改起点 = v1.3.md):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md` (639 行,已 cp 自 v1.2)

重点看:
- **§14.1 line 446-462** Hero Monolith(2 处 patch 落点)
- **§15 line 504-508** Hero image archetype(line 508 既有 sealed overlay rule —— **不动**,只是 V13-P0-A cross-ref 它)

**不要碰**:
- v1.2.md / v1.1.md / v1.0.md(都不动)
- AnimateNumber 三段:§4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591(R-120/R-123/R-124 三重锁定)
- §15 line 508 既有 sealed overlay rule(本轮只 cross-ref,不 rewrite opacity range)
- 其他 §§(只动 §14.1 line 460 + line 462)

---

## 2 处 patch spec

### V13-P0-A · §14.1 cross-ref → §15 sealed overlay

**位置**:§14.1 line 462 末尾(Hero brand marks 句之后 / Anti-refs 句之前)

**新增 1 句**(原文 verbatim,不展开):

```
When `hero_image_url` active, overlay fill discipline per §15 sealed overlay rule (`var(--background)` same-tone, never white veil).
```

**严守**:
- 1 句话,不展开成段落 / 不重写 opacity range / 不重复 filter ban
- 必须明确 "When `hero_image_url` active" — 防止 doubao 在非 image Hero 也加 overlay(违 single-layer rule)
- backtick reference 风格保持(`var(--background)`,`hero_image_url`)
- 不展开成 bullet list / 不加 "HARD GATE" 后缀(§15 既有规则已是 HARD)

**预计行数变化**:+1 行

---

### V13-P0-B · §14.1 V11-P0-1 wrapper rule 行内强化

**位置**:§14.1 line 460 末尾(R-125 patch 句改写)

**v1.2 现状**(line 460 末尾原句):

```
the grid root element AND any intermediate wrapper between section and grid MUST satisfy `min-height: 100%` (Tailwind: `min-h-full`). Without this, the grid container only spans natural content height, and `align-items: end` aligns content to that natural bottom — typically section's upper 1/3 — leaving the lower 2/3 as empty shader. The section's `min-h` is the layout floor; everything between section and grid items must propagate that floor for `align-items: end` to reach section's true bottom.
```

**改成**(强化版,1 句话化,不加 code snippet):

```
EVERY DOM ancestor in the chain from `<section>` to grid items (root wrapper, padding wrapper, max-width wrapper, container wrapper, ANY intermediate `<div>`) MUST carry `min-h-full` / `min-height: 100%` — not the grid wrapper alone, every link in the chain. Missing one ancestor breaks floor propagation; content stacks at section's upper 1/3, leaving lower 2/3 as empty shader. The section's `min-h` is the layout floor; every intermediate element must propagate that floor for `align-items: end` to reach section's true bottom.
```

**严守**:
- 行内改写(替换 line 460 既有句),**不另起段落**
- 不加 anti-pattern JSX example / code snippet / `<section className="..">...</section>` 反例
- "EVERY DOM ancestor" + 5 个示例 (root / padding / max-width / container / intermediate `<div>`) — 列举式枚举
- 1 句强化,延展 explanation 句 carry(content stacks at section's upper 1/3 / lower 2/3 empty shader / layout floor)
- 比 v1.2 原句净增约 +1-2 行(rewrite,不是 append)

**预计行数变化**:+1-2 行

---

### V13-P0-C · §14.1 既有规则 + §15 既有规则 carry as-is

**不动**:
- §14.1 line 446-459 既有 Hero composition HARD GATE / Hero focal number readability HARD GATE / Two paths / Primary path / Fallback only when / Hero Display Number size / Wrapper className delegation 全部 carry
- §14.1 line 463-465 Anti-refs 段 carry
- §15 line 504-508 既有 Hero image archetype + sealed overlay rule + filter ban HARD GATE 全部 carry

---

## 严格纪律(HARD GATE)

1. **AnimateNumber zone 0 改** — §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段一字不动(R-120 + R-123 + R-124 三重锁 carry)
2. **§15 sealed overlay rule 0 改** — line 508 既有 `var(--background)` 25-50% / 45-70% range carry as-is,V13-P0-A 只是 cross-ref 不 rewrite
3. **Chris 工程红线** — 不引入 `import` / 包名 / `pnpm` / `npm install` / `package.json` / `@/components/ui` / `src/views` / `createElement.*link` / `from 'framer-motion'`
4. **OKLCH syntax** — 全文保持 space-separated `oklch(L C H)`,不出现逗号 form
5. **不诱导 wash overlay / backdrop-filter / opacity overlay** — Hero single-layer 既有禁令不动
6. **不诱导 flexbox 替代 grid** — §14.1 grid HARD GATE 保留
7. **行数 ≤ 641**(v1.2 = 639, 净增 ≤ 2 行)
8. **不写**:React snippet / JSX example / code block / emoji ✅❌🔥💡 / metadata(Source / Last updated / Inspired by)/ 历史叙事 / 三段式法则 / EXAMPLE 段
9. **不动其他 §§** — 只动 §14.1 line 460(V13-P0-B rewrite)+ line 462 末尾(V13-P0-A append);§3 / §4 / §5 / §6 / §7 / §8 / §9 / §10 / §11 / §12 / §13 / §15 / §16 / §17 / §18 全部不碰

## 落地 + 回报

完成 2 处 patch 后跑 self-verify:

```bash
V13="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md"

echo "=== 行数(期望 640-641, ≤ 641)==="
wc -l "$V13"

echo "=== V13-P0-A SHOULD-APPEAR(§14.1 cross-ref §15, 期望 ≥1) ==="
for p in 'When `hero_image_url` active' 'overlay fill discipline per §15' 'sealed overlay rule' 'never white veil'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== V13-P0-B SHOULD-APPEAR(§14.1 V11 enumerate 强化, 期望 ≥1) ==="
for p in 'EVERY DOM ancestor in the chain' 'root wrapper, padding wrapper' 'max-width wrapper, container wrapper' 'ANY intermediate' 'not the grid wrapper alone' 'every link in the chain' 'Missing one ancestor breaks floor propagation'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== V13-P0-B SHOULD-DISAPPEAR(v1.2 原句, 期望 = 0) ==="
for p in 'the grid root element AND any intermediate wrapper'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== §15 既有 sealed overlay rule carry (各 ≥1) ==="
for p in 'Overlay numbers are sealed' '25% top → 50% bottom MAX' '45% top → 70% bottom MAX' 'harsh wash that defeats image presence' 'Adaptive dim overlay' 'forbidden CSS properties'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== §14.1 既有 R-124 + R-125 carry (各 ≥1) ==="
for p in 'Default style Hero composition' 'CSS grid' 'align-items: end' 'grid HARD GATE applies to default style' 'Two paths, prioritized' 'Primary path' 'Fallback only when' 'unnecessary panel chrome' 'L < 0.20' 'darkest entries' 'Hero Display Number size' 'Wrapper className delegation' 'min-h-full'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== v1.2 R-128 patches carry(各 ≥1)==="
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Testimonial-Threaded' 'Default composition skeleton assumes data-led' 'explicitly matches'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== v0.9 14 处 patches carry (各 ≥1) ==="
for p in 'space-separated' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'background-only token' 'FORBIDDEN BODY COLOR' 'chart-hover'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== AnimateNumber zone sentinel(每个 MUST exist, R-120/R-123/R-124 三重锁)==="
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-65s : %s\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V13" || echo 0)"
done

echo "=== forbidden(各 = 0;注意 jsx 2 hits = v1.2 既有 §17 carry)==="
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE' 'Example:'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V13")"
done

echo "=== Chris engineering red-line(各 = 0)==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link' 'from .framer-motion'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V13")"
done

echo "=== framer-motion context verify (2 hits, FORBIDDEN/Don't context only) ==="
grep -n 'framer-motion' "$V13"

echo "=== clamp 残留 verify(只允许 rule context)==="
grep -nE "clamp\(" "$V13"

echo "=== diff v1.2 → v1.3 hunks ==="
diff /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md "$V13" | head -30
```

回报模板(完整粘贴):

```
default v1.2 → v1.3 patch complete.

Edits 落地:
  V13-P0-A §14.1 cross-ref → §15 sealed overlay: <DONE/PARTIAL/FAIL>
  V13-P0-B §14.1 V11 wrapper enumerate 强化: <DONE/PARTIAL/FAIL>

Self-check 结果:
  v1.3 行数: <N> (期望 640-641, 上限 ≤ 641)
  V13-P0-A SHOULD-APPEAR(4 项): <list>
  V13-P0-B SHOULD-APPEAR(7 项): <list>
  V13-P0-B SHOULD-DISAPPEAR(v1.2 原句 = 0): <PASS/FAIL>
  §15 既有 sealed overlay rule carry(6 项): <list 全 1+ = PASS>
  §14.1 既有 R-124 + R-125 carry(13 项): <list 全 1+ = PASS>
  v1.2 R-128 patches carry(6 项): <list 全 1+ = PASS>
  v0.9 14 处 patches carry(7 项): <list 全 1+ = PASS>
  AnimateNumber zone sentinels(6 项): <list 全 1+ = PASS>
  forbidden(11 项 = 0): <list>
  Chris engineering red-line(8 项 = 0): <list>
  framer-motion 2 hits(FORBIDDEN/Don't context only): <PASS/FAIL>
  clamp 全 rule context: <PASS/FAIL>
  diff v1.2 → v1.3 hunks: <2 处 edit · V13-P0-B 是 rewrite line 460 / V13-P0-A 是 append line 462 末尾>

ambiguity / 风险 flag:
  <list, or NONE>
```

不 commit / 不 push — Cowork 接手 verify + 决定下一步(commit 或等 Codex 4:27 AM review).

## 触发词

开始。
