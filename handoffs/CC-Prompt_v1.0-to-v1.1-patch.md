# CC-Prompt · default v1.0 → v1.1 micro patch · 1 处 surgical edit · Opus 4.6

你是 **Vibe view 项目 default Design Prompt 维护者**。

## 任务 — **1 处 micro patch**:§14.1 Hero section min-h + wrapper height 漏洞修复(Round-7 Chris 发现)

**问题**(Q1 Round-7 doubao 输出验证):
- Q1 Hero `<section className="relative min-h-[90vh] overflow-hidden">` 撑 90vh
- 内部 wrapper `<div className="relative z-10 px-6 md:px-16 py-24 max-w-7xl mx-auto">` **没设 height**
- 内部 grid `alignItems: 'end'` 只在 grid container 内生效,而 grid container 由内容自然 height 决定 → 只占 section 上 1/3
- 视觉:Hero 上 1/3 内容(标题/数字/lead),下 2/3 空白 shader,**内容贴顶不贴底**

**v1.0 §14.1 漏洞**:Default style Hero composition HARD GATE(line 446)规定 grid + `align-items: end`,但**没规定 Hero section 用 `min-h-[Xvh]` 时,grid root container 必须撑满 section height**。`align-items: end` 在 grid 内 OK,但 grid 容器本身只占内容 height,result is content 贴 wrapper natural bottom = section 上 1/3 处,不是 section 真实 bottom。

## 第一步必读

读 v1.0 完整源(631 行,改起点 = v1.1.md):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md`(已 cp 自 v1.0,631 行)

重点看 §14.1 line 446 附近(Default style Hero composition HARD GATE 段)。

不要碰 v1.0.md 或 v0.10.md。

## 1 处 patch spec

### V11-P0-1 · §14.1 Hero section min-h + grid container height invariant

**位置**:§14.1 line 446 末尾(Default style Hero composition HARD GATE 段)追加 1 句

**v1.0 当前 line 446 段尾**:
```
... Missing `display: grid` on Hero root is a design violation, not an artistic choice. Fixed styles keep vertical Typographic Field — grid HARD GATE applies to default style only.
```

**改动方向**:在该段末尾追加 1 句 layout 约束(保留原 4 句不动):

> "When the Hero `<section>` carries `min-h-[Xvh]` / `min-h-screen` (occupying viewport height), the **grid root element AND any intermediate wrapper between section and grid MUST satisfy `min-height: 100%`** (Tailwind: `min-h-full`). Without this, the grid container only spans natural content height, and `align-items: end` aligns content to that natural bottom — typically section's upper 1/3 — leaving the lower 2/3 as empty shader. The section's `min-h` is the layout floor; everything between section and grid items must propagate that floor for `align-items: end` to reach section's true bottom."

**严守**:
- 只追加 1 句(单段插入),不重写既有内容
- 不诱导 wash overlay / clamp / flexbox 替代(grid HARD GATE 保留)
- 不破坏 R-120/R-123/R-124 既有 patches

**预计行数变化**:+1-2 行(单句长 ≈ 1 行,可能 wrap 1 行)

## 严格纪律(HARD GATE)

1. **AnimateNumber zone 0 改** — §4 line ~189 / §7 line ~271-293 / §17 line ~568-591 整段一字不动
2. **Chris 工程红线** — 不引入 import / 包名 / 构建工具 / 框架名
3. **OKLCH syntax** — 全文保持 space-separated
4. **不诱导 wash overlay / backdrop-filter / opacity overlay** — Hero single-layer 既有禁令不动
5. **不诱导 flexbox 替代 grid** — §14.1 grid HARD GATE 保留
6. **行数 ≤ 640** — v1.0 631,v1.1 预计 632-633
7. **不写 React snippet / emoji / 历史叙事**

## 落地 + 回报

完成 1 处 patch 后跑 self-verify:

```bash
V11="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md"

echo "=== 行数(期望 632-633, ≤ 640)==="
wc -l "$V11"

echo "=== V11-P0-1 SHOULD-APPEAR ==="
for p in 'min-height: 100%' 'min-h-full' 'intermediate wrapper' "section's upper 1/3" 'propagate that floor'; do
  printf "  %-30s : %s\n" "$p" "$(grep -c "$p" "$V11")"
done

echo "=== §14.1 既有规则保留(期望 ≥1)==="
for p in 'Default style Hero composition' 'CSS grid' 'align-items: end' 'grid HARD GATE applies to default style'; do
  printf "  %-40s : %s\n" "$p" "$(grep -c "$p" "$V11")"
done

echo "=== R-120 + R-123 + R-124 既有 patches 保留 ==="
for p in 'space-separated' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'Primary path' 'Fallback only when' 'Hero Display Number size' 'Wrapper className delegation'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V11")"
done

echo "=== AnimateNumber zone content sentinel ==="
for sentinel in 'Apply length-based conditional className' 'AnimateNumber wrapper.*read at wrapper top' 'parseDisplayValue.*split Bitable' 'inline-flex items-baseline gap-1 whitespace-nowrap'; do
  printf "  %-50s : %s\n" "${sentinel:0:45}" "$(grep -cE "$sentinel" "$V11")"
done

echo "=== 工程红线 + emoji ==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'src/views'; do printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V11")"; done
for p in '✅' '❌' '🔥' '💡'; do printf "  %s : %s\n" "$p" "$(grep -c "$p" "$V11")"; done

echo "=== diff v1.0 → v1.1 hunks ==="
diff /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.0.md "$V11" | head -10
```

回报模板(完整粘贴):

```
default v1.0 → v1.1 patch complete.

Edits 落地:
  V11-P0-1 §14.1 Hero min-h + wrapper height: <DONE/PARTIAL/FAIL>

Self-check 结果:
  v1.1 行数: <N> (期望 632-633)
  V11-P0-1 SHOULD-APPEAR(5 项): <list>
  §14.1 既有规则保留(4 项): <list>
  R-120/R-123/R-124 既有 patches 保留(10 项): <list 全 1+ = PASS>
  AnimateNumber zone sentinels: <list 全 1+ = PASS>
  工程红线 0 hit: <PASS/FAIL>
  emoji 0 hit: <PASS/FAIL>
  diff hunks: <1 处 single insertion @ §14.1 line 446 段尾>

ambiguity / 风险 flag:
  <list, or NONE>
```

不 commit / 不 push — Cowork 接手 review。

## 触发词

开始。
