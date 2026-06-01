# CC-Prompt · default v1.3 → v1.4 patch · 1 处 surgical edit · Opus 4.8

你是 **Vibe view 项目 default Design Prompt 维护者**(Opus 4.8 写作者).

## 任务 — 1 处 surgical edit · 落地 v1.4

R-133 双路 review (Codex + Opus 4.8) 收敛 + Chris 明确决定:

- **V14-P0-A** §14.1 line 462 既有 V13-P0-B 句行内追加 parenthetical Tailwind hint(矫正 R-130 V13-P0-B 工程化弱化)
- ~~V14-P0-B mode-reactive HARD GATE~~ — Chris 砍掉(不加功能 · dark mode 跑版是测试题集 bug, 不是 prompt 缺口)
- ~~V14-P0-C grid HARD GATE 强化~~ — Chris 砍掉(doubao 违反既有 grid HARD GATE 是行为问题, 等 R-11 mixed mode 测试题集跑完再观察)

R-10 实测 evidence:
- v1.3 (R-130 V13-P0-B) source 中 `min-h-full` 出现 0/9 (vs v1.2 R-125 baseline 3/8 source carry)
- Q2 / Q3 / Q7 Hero 内容贴顶 1/3, 下面 2/3 空白 shader
- R-130 V13-P0-B 把 v1.2 既有 `Tailwind: min-h-full` 显式提示改成 design 语言 "propagate the section's height floor" 后, doubao 失锚

行数预算: v1.3 = 641 行 → v1.4 = **641 行**(净增 **+0 行**, inline parenthetical 行内追加, 不另起行).

## 第一步必读

cp v1.3.md → v1.4.md 作为起点:

```bash
cp /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md \
   /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md
```

读 v1.4.md 完整源 (改起点 = v1.4.md):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md` (641 行, 已 cp 自 v1.3)

重点看:
- **§14.1 line 462** 既有 V13-P0-B 句"EVERY intermediate layout container ... propagate the section's height floor ..."

**不要碰**:
- v1.3.md / v1.2.md 等(都不动, 历史 baseline)
- AnimateNumber 三段: §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591(R-120/R-123/R-124 三重锁)
- §15 既有 sealed overlay rule + `hero_image_url` 引用(carry as-is, flag for v1.5)
- 其他 §§(只动 §14.1 line 462)
- 既有 R-128 / R-124 / v0.9 / R-125 / R-130 V13-P0-A 全 carry

---

## 1 处 patch spec

### V14-P0-A · §14.1 line 462 既有 V13-P0-B 句 inline parenthetical Tailwind hint

**位置**: §14.1 line 462 末尾 既有 V13-P0-B "propagate the section's height floor" 短句中

**v1.4 cp 后现状** (line 462):

> "EVERY intermediate layout container between the Hero section and the grid items MUST propagate the section's height floor — not the grid wrapper alone, every link in the chain. Missing one container breaks floor propagation; content stacks at section's upper 1/3, leaving lower 2/3 as empty shader. The section's height floor is the layout floor; every intermediate container must carry that floor for `align-items: end` to reach section's true bottom."

**改成** (行内追加 parenthetical):

> "EVERY intermediate layout container between the Hero section and the grid items MUST propagate the section's height floor **(via Tailwind `min-h-full` or CSS `min-height: 100%`)** — not the grid wrapper alone, every link in the chain. Missing one container breaks floor propagation; content stacks at section's upper 1/3, leaving lower 2/3 as empty shader. The section's height floor is the layout floor; every intermediate container must carry that floor for `align-items: end` to reach section's true bottom."

**严守**:

1. **只追加 inline parenthetical**(11-14 字符 `(via Tailwind \`min-h-full\` or CSS \`min-height: 100%\`)`)
2. **不破坏 R-130 V13-P0-B design 语言主体**(carry "propagate the section's height floor" 等抽象表达)
3. **不写完整 code block / JSX example / class string snippet**
4. **不绑定 HTML element 类型**(不写 `<section>` / `<div>` 枚举)
5. **不绑定 wrapper 类型枚举**(carry R-130 砍掉的 5 wrapper 命名)
6. **多路径 disjunction**: 必须保持 "Tailwind X **or** CSS Y" — 不 framework lock-in (既给 Tailwind 路径也给 vanilla CSS 路径)
7. **inline parenthetical 行内追加** — 不另起新行 / 不另起段落 / 不加 anti-pattern 反例
8. **AnimateNumber 三段 0 改**
9. **§15 既有规则 0 改**(carry as-is, flag for v1.5)
10. **frontmatter 4 字段 carry** — id / name / style_name / description 不动

**预计行数变化**: **+0 行**(inline parenthetical 行内追加, 不另起行)

---

## Chris 边界判定原则 carry(Cowork 给的工艺心得, 长期适用)

| 类型 | 判定 | 示例 |
|------|------|------|
| **工程化(禁)** | 绑定 HTML element 枚举 / 完整 className 串 / JSX snippet / import 包名 / framework lock-in | R-130 砍的 5 wrapper 类型枚举 |
| **hint(允)** | 单个 CSS property name / 单个 named class(**多路径** Tailwind OR CSS)/ 数值范围 / token name | V14-P0-A `(via Tailwind X or CSS Y)` 多路径 disjunction |
| **判定规则** | hint 是否绑定具体 element 或 framework? 绑定 = 禁 / 不绑定 = 允 | — |

V14-P0-A inline parenthetical 符合 **hint** 标准:
- 单个 named class `min-h-full` + 单个 CSS property `min-height: 100%`
- 多路径 disjunction (Tailwind OR CSS) — 不 framework lock-in
- 不绑定 element 类型 / 不写 className 串 / 不写 JSX

---

## 严格纪律(HARD GATE)

1. **AnimateNumber 三段 0 改** — §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段一字不动(R-120 + R-123 + R-124 三重锁 carry)
2. **§15 既有 sealed overlay rule + dial reference 0 改** — flag for v1.5
3. **R-130 V13-P0-A line 462 visual state cross-ref 0 改** — carry as-is(R-9/R-10 实测无问题)
4. **Chris 工程红线** — 不引入 `import` / 包名 / `pnpm` / `npm install` / `@/components/ui` / `src/views` / `createElement.*link` / `from 'framer-motion'`
5. **OKLCH syntax** — 全文保持 space-separated
6. **行数 = 641** — v1.3 = 641, 净增 = 0(行内追加, 不另起行)
7. **frontmatter 不动** — id (`General Restrained Default`) / name (`通用战报主题`) / style_name / description 4 字段全 carry as-is
8. **不动其他 §§** — 只动 §14.1 line 462 既有 V13-P0-B 句; §1-§13 / §14.1 line 446-461 + line 463-465 / §15-§18 全部不碰
9. **不写**:React snippet / JSX example / code block / emoji ✅❌🔥💡 / metadata / EXAMPLE / 反例 anti-pattern code / wrapper 类型枚举

## 落地 + 回报

完成 1 处 patch 后跑 self-verify:

```bash
V14="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md"

echo "=== 行数(期望 641, 严格 = 641)==="
wc -l "$V14"

echo "=== V14-P0-A SHOULD-APPEAR(各 ≥1)==="
for p in 'via Tailwind' 'min-h-full' 'min-height: 100%' 'or CSS'; do
  printf "  %-30s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== V14-P0-A inline parenthetical exact match ==="
grep -nE "propagate the section's height floor \(via Tailwind .min-h-full. or CSS .min-height: 100%.\)" "$V14"

echo "=== R-130 V13-P0-B design language carry (各 ≥1) ==="
for p in 'EVERY intermediate layout container' "section's height floor" 'every link in the chain' "content stacks at section's upper 1/3" 'leaving lower 2/3 as empty shader' "section's true bottom"; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== R-130 V13-P0-A line 462 cross-ref carry (各 ≥1) ==="
for p in 'For image-background Hero' 'overlay fill discipline per §15' 'sealed overlay rule' 'never white veil'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== frontmatter 4 字段 carry ==="
head -6 "$V14"

echo "=== v1.2 R-128 patches carry (各 ≥1) ==="
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Testimonial-Threaded' 'Default composition skeleton assumes data-led' 'explicitly matches'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== §14.1 既有 R-124 + R-125 carry (各 ≥1) ==="
for p in 'Default style Hero composition' 'CSS grid' 'align-items: end' 'NO flex column' 'NO block stacking' 'grid HARD GATE applies to default style' 'Two paths, prioritized' 'Primary path' 'Fallback only when' 'L < 0.20' 'darkest entries' 'Hero Display Number size' 'Wrapper className delegation'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== §15 既有 sealed overlay rule carry as-is(各 ≥1)==="
for p in 'Overlay numbers are sealed' '25% top → 50% bottom MAX' '45% top → 70% bottom MAX' 'harsh wash that defeats image presence' 'Adaptive dim overlay'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "=== AnimateNumber zone sentinel(R-120/R-123/R-124, 各 ≥1)==="
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-65s : %s\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V14" || echo 0)"
done

echo "=== forbidden(各 = 0;jsx 2 hits = v1.3 既有 §17 carry)==="
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE' 'Example:'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V14")"
done

echo "=== Chris engineering red-line(各 = 0)==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V14")"
done

echo "=== diff v1.3 → v1.4 hunks ==="
diff /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md "$V14" | head -10
```

回报模板(完整粘贴):

```
default v1.3 → v1.4 patch complete.

Edits 落地:
  V14-P0-A §14.1 line 462 inline parenthetical Tailwind hint: <DONE/PARTIAL/FAIL>

Self-check 结果:
  v1.4 行数: <N> (期望 641, 严格 = 641)
  V14-P0-A SHOULD-APPEAR(4 项): via Tailwind=1 / min-h-full=1 / min-height: 100%=1 / or CSS=1 全 PASS
  inline parenthetical exact match: <line 462 完整字面 verify>
  R-130 V13-P0-B design language carry(6 项): 全 1+ = PASS
  R-130 V13-P0-A line 462 cross-ref carry(4 项): 全 1+ = PASS
  frontmatter 4 字段 carry: <PASS/FAIL>
  v1.2 R-128 patches carry(6 项): 全 1+ = PASS
  §14.1 既有 R-124 + R-125 carry(13 项): 全 1+ = PASS
  §15 既有 sealed overlay rule carry(5 项): 全 1+ = PASS
  AnimateNumber zone sentinels(6 项): 全 1+ = PASS
  forbidden(11 项 = 0): <list>
  Chris engineering red-line(7 项 = 0): <list>
  diff v1.3 → v1.4 hunks: <1 处 inline edit @ §14.1 line 462>

ambiguity / 风险 flag:
  <list, or NONE>
```

不 commit / 不 push — Cowork 接手 verify + 派 Codex review patch 质量.

## 触发词

开始。
