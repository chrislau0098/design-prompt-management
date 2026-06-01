# CC-Prompt · default v1.3 fix · 工程约束 leak 精修 · Opus 4.8

你是 **Vibe view 项目 default Design Prompt 维护者**(Opus 4.8 写作者).

## 任务 — fix 2 处工程约束 leak (V13-P0-A + V13-P0-B)

R-130 流程当前状态:
- v1.3.md 已经由 Opus 4.6 写完(2 处 patch 落地)
- **Chris review 抓出 V13-P0-A `hero_image_url` 工程约束跨界**
- **Codex review verdict: NEEDS PATCH**(2 处 patch 都需要去工程化)

Codex review 关键 finding:
- **V13-P0-A**:`hero_image_url` 是工程 dial 名(代表 URL 传入方式)。但图片可能 file upload / base64 / 拖拽 / 等其他途径,锁死 dial 名会削弱泛用性
- **V13-P0-B**:`<section>` / `<div>` HTML element 硬约束 + `min-h-full` Tailwind 工具类 + 5 wrapper 类型枚举(root / padding / max-width / container / intermediate)= 过度工程化
- **§15 既有 `hero_image_url` 引用也是 leak**,但是历史遗留,**本轮不动**(scope creep 风险),flag for v1.4 单独 patch
- v1.3 verdict: **NEEDS PATCH**

行数预算:v1.3 现 639 行(in-place rewrite 2 处,**净增 ≤ 0** 行,可能更精简).

## 第一步必读

读 v1.3.md 完整源(改起点 = v1.3.md,**in-place rewrite 不另存版本**):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md` (639 行)

重点看:
- **§14.1 line 446-465** Hero Monolith(2 处 patch 都在这里)
- **§15 line 504-508** Hero image archetype(carry as-is,不动)

**不要碰**:
- v1.2.md / v1.1.md / v1.0.md(都不动,历史 baseline)
- AnimateNumber 三段:§4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591(R-120/R-123/R-124 三重锁)
- §15 既有 sealed overlay rule + `hero_image_url` 引用(carry as-is,flag for v1.4 单独 patch — 不要 scope creep)
- 其他 §§(只动 §14.1 line 460 + line 462)

---

## 2 处 fix spec

### V13-P0-A · §14.1 line 462 cross-ref 句 · 去工程化(`hero_image_url` dial 引用)

**v1.3 现状**(line 462,Hero brand marks 句之后):

```
When `hero_image_url` active, overlay fill discipline per §15 sealed overlay rule (`var(--background)` same-tone, never white veil).
```

**问题**:
- `hero_image_url` 是工程 dial 名,锁死 URL 传输方式
- 实际图片可能 file upload / base64 / 拖拽 / 等其他途径
- "active" 是 dial 状态描述

**修订方向**(自行 phrase,不引用 dial 名):
- **去掉** `hero_image_url` dial 引用
- 用**视觉状态描述**作为 trigger(e.g. "When Hero is rendered over an image" / "For image-background Hero" / "When Hero uses an image archetype" — 自行选最自然的)
- cross-ref §15 改用**视觉概念**("image archetype" / "sealed overlay rule")而非 dial 名
- **保留** "`var(--background)` same-tone, never white veil" design intent(这是 visual rule,不是工程约束)
- **保留** 1 句话长度,不展开成段落

**预计行数变化**:in-place rewrite line 462,行数 +0

---

### V13-P0-B · §14.1 line 460 wrapper rule · 弱化 DOM/Tailwind 枚举(carry 严厉度)

**v1.3 现状**(line 460 末尾):

```
EVERY DOM ancestor in the chain from `<section>` to grid items (root wrapper, padding wrapper, max-width wrapper, container wrapper, ANY intermediate `<div>`) MUST carry `min-h-full` / `min-height: 100%` — not the grid wrapper alone, every link in the chain. Missing one ancestor breaks floor propagation; content stacks at section's upper 1/3, leaving lower 2/3 as empty shader. The section's `min-h` is the layout floor; every intermediate element must propagate that floor for `align-items: end` to reach section's true bottom.
```

**问题**(Codex 抓出):
- "DOM ancestor" + `<section>` + `<div>` HTML element 硬约束
- `min-h-full` + `min-height: 100%` 双重 Tailwind/CSS 工程表达
- 5 wrapper 类型枚举(root / padding / max-width / container / intermediate)= 过度工程化绑定

**修订方向**(carry 严厉度但去工程化):

- **保留**:
  - "every intermediate container propagates the section's height floor" 严厉度(systemic 复发,R-128 时 Codex 自己建议的强化,**不能退回软规则**)
  - "content stacks at section's upper 1/3, leaving lower 2/3 as empty shader"(design 后果描述)
  - "section's min-h is the layout floor; ... align-items: end to reach section's true bottom"(design 语言)
- **弱化**:
  - `<section>` / `<div>` HTML element 硬约束 → 改 design intent("every layout container between Hero section and grid items")
  - `min-h-full` / `min-height: 100%` 双重表达 → 简化 1 个表达(design 语言:"carry the section's height floor" / "propagate height to section's bottom")
  - 5 wrapper 类型枚举 → 改成提示语气(e.g. "padding, max-width, or other intermediate containers")或全删

**严守**:
- 不退回 v1.2 R-125 既有句的 "any intermediate wrapper" 软表述(R-9 实测 systemic 复发,不够强)
- 必须明确"EVERY intermediate container"语气强度(对 LLM 显著约束)
- 但**不**绑定具体 HTML element name / CSS class name / Tailwind utility class

**预计行数变化**:in-place rewrite line 460,行数 +0 或 ≤ 原句

---

### V13-P0-C · §15 既有 sealed overlay rule + `hero_image_url` carry as-is

**不动 §15**(本轮 scope):
- §15 line 504-508 既有 Hero image archetype 全部 carry
- 既有 `hero_image_url` dial 引用 carry as-is(**flag for v1.4 单独 patch**)
- 既有 `?heroimg=` slot 引用 carry as-is
- 既有 sealed overlay rule(opacity range / filter ban)carry as-is

**理由**:§15 既有 dial transport leak 是历史遗留,本轮 R-130 仅 fix 新引入的 V13-P0-A / V13-P0-B 工程化。v1.4 单独 patch 重写 §15 transport-agnostic(scope 更大,需独立 review)。

---

## 严格纪律(HARD GATE)

1. **AnimateNumber 三段 0 改** — §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591(R-120 + R-123 + R-124 三重锁 carry)
2. **§15 既有规则 0 改** — line 504-508 全部 carry as-is(本轮不动,flag for v1.4)
3. **Chris 工程红线** — 0 引入 `import` / 包名 / `pnpm` / `npm install` / `@/components/ui` / `src/views` / `createElement.*link` / `from 'framer-motion'`
4. **OKLCH syntax** — 全文保持 space-separated
5. **不写**:React snippet / JSX example / code block / emoji ✅❌🔥💡 / metadata / EXAMPLE 段 / `<section className="...">...` JSX 反例(R-128 时 Codex 已 ban)
6. **行数 ≤ 641**(v1.3 现 639;in-place rewrite 期望 +0)
7. **frontmatter 不动** — id / name / style_name / description 四个字段全 carry as-is
8. **不动其他 §§** — 只动 §14.1 line 460(V13-P0-B rewrite)+ line 462(V13-P0-A rewrite);§3/§4/§5/§6/§7/§8/§9/§10/§11/§12/§13/§15/§16/§17/§18 全部不碰

## 落地 + 回报

完成 2 处 fix 后跑 self-verify:

```bash
V13="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md"

echo "=== 行数(期望 638-641, ≤ 641)==="
wc -l "$V13"

echo "=== V13-P0-A fix SHOULD-DISAPPEAR(各 = 0)==="
for p in 'When `hero_image_url` active'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== V13-P0-A fix SHOULD-APPEAR(去工程化后,各 ≥1)==="
echo "  期望: 引用 image-background visual state, 不引用 hero_image_url dial 名"
echo "  期望: cross-ref §15 sealed overlay rule"
echo "  期望: carry var(--background) same-tone, never white veil"
grep -n "sealed overlay rule" "$V13"
grep -n "var(--background)" "$V13" | head -3
grep -n "white veil" "$V13"

echo "=== V13-P0-B fix SHOULD-DISAPPEAR(去工程化后,各 = 0)==="
for p in 'EVERY DOM ancestor' 'root wrapper, padding wrapper' 'max-width wrapper, container wrapper' 'ANY intermediate `<div>`' 'min-h-full` / `min-height: 100%`'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== V13-P0-B fix SHOULD-APPEAR(carry 严厉度,各 ≥1)==="
echo "  期望: 保留 EVERY intermediate container 语气强度"
echo "  期望: 保留 section's height floor / propagate concept"
echo "  期望: 保留 'content stacks at section's upper 1/3' 后果描述"
for p in 'height floor' 'every intermediate' 'propagate' 'upper 1/3' "section's true bottom"; do
  printf "  %-40s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== §15 既有规则 carry as-is(各 ≥1)==="
for p in 'Overlay numbers are sealed' '25% top → 50% bottom MAX' '45% top → 70% bottom MAX' 'harsh wash that defeats image presence' 'Adaptive dim overlay' 'hero_image_url'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== §14.1 既有 R-124 + R-125 carry (各 ≥1) ==="
for p in 'Default style Hero composition' 'CSS grid' 'align-items: end' 'grid HARD GATE applies to default style' 'Two paths, prioritized' 'Primary path' 'Fallback only when' 'unnecessary panel chrome' 'L < 0.20' 'darkest entries' 'Hero Display Number size' 'Wrapper className delegation'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "=== v1.2 R-128 patches carry(各 ≥1)==="
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Testimonial-Threaded' 'Default composition skeleton assumes data-led' 'explicitly matches'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V13")"
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

echo "=== frontmatter 4 字段 carry ==="
head -6 "$V13"

echo "=== diff v1.3 (before fix) → v1.3 (after fix) ==="
echo "  无法直接对比 (in-place rewrite). 通过下面 §14.1 line 446-465 摘录验证 2 处 fix"
sed -n '446,465p' "$V13"
```

回报模板(完整粘贴):

```
default v1.3 工程约束 leak 修复 complete.

Edits 落地:
  V13-P0-A §14.1 line 462 去 hero_image_url 工程引用: <DONE/PARTIAL/FAIL>
  V13-P0-B §14.1 line 460 弱化 DOM/Tailwind 枚举 (carry 严厉度): <DONE/PARTIAL/FAIL>

Self-check 结果:
  v1.3 行数: <N> (期望 638-641, 上限 ≤ 641)
  V13-P0-A SHOULD-DISAPPEAR(`hero_image_url` 引用 = 0): <PASS/FAIL>
  V13-P0-A SHOULD-APPEAR(image visual state + sealed overlay cross-ref + design intent): <list>
  V13-P0-B SHOULD-DISAPPEAR(DOM ancestor / wrapper 枚举 / 双重 min-h 表达 = 0): <PASS/FAIL>
  V13-P0-B SHOULD-APPEAR(every intermediate container + height floor + propagate + upper 1/3 carry): <list>
  §15 既有规则 carry as-is(6 项): <list 全 1+ = PASS>
  §14.1 既有 R-124 + R-125 carry(12 项): <list 全 1+ = PASS>
  v1.2 R-128 patches carry(6 项): <list 全 1+ = PASS>
  AnimateNumber zone sentinels(6 项): <list 全 1+ = PASS>
  forbidden(11 项 = 0): <list>
  Chris engineering red-line(8 项 = 0): <list>
  frontmatter 4 字段 carry: <PASS/FAIL>
  §14.1 line 446-465 摘录(显示 2 处 fix 实际文字): <inline 粘贴>

ambiguity / 风险 flag:
  <list, or NONE>
```

不 commit / 不 push — Cowork 接手 verify + 派 Codex review fix patch 质量.

## 触发词

开始。
