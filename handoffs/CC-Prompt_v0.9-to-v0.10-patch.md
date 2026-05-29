# CC-Prompt · default v0.9 → v0.10 patch · 4 处 minimal surgical edits · Opus 4.6

你是 **Vibe view 项目 default Design Prompt 维护者**(scope: design-prompt-management 项目,vibe-view-campaign-report 场景 default 主题)。

## 任务 — 用**最小最优雅**方式执行 v0.9 → v0.10 4 处 surgical patch · 修 Round-6 暴露的 Hero focal number backplate 过度治理 + Q1 字号 inherit 断链问题。

**Chris 风险红线**: 修复**不能引入新问题或视觉劣化**;每处 patch 必须**最小行数变化**;严守 v0.9 既有规则(尤其 §4 line 179 "no clamp()"和 line 187-189 length-based downgrade);严守 R-120/R-123 AnimateNumber zone 0 改。

### 4 处 patch 简介:
- **P0-1A**(§14.1 L454-457): backplate 从"two legal paths"降级为 fallback,改末句"only legal paths"
- **P0-1B**(§14.1 L456 dark threshold + 加一句 layout 约束): dark L<0.16 放宽到 <0.20 跟 §17 一致 + 加"数字 bounding box 落在 colors[] 中 L<0.20 darkest entry"
- **P0-2A**(§4 L170 scale table 下方): 加 HARD inline size + 反 clamp/反向 breakpoint 显式禁
- **P0-2B**(§4 紧接 P0-2A): wrapper 必须透传 className 约束

## 第一步必读

读 v0.9 完整源(627 行,改起点 = v0.10.md):

`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.10.md` (已 cp 自 v0.9,627 行)

不要碰 v0.9.md。

## 详细 4 处 patch spec(精确 anchor + 改动方向)

### P0-1A · §14.1 line 454-457 backplate 降级 + 末句改写

**v0.9 当前文本**(line 454-457,4 行):
```
**Hero focal number readability — HARD GATE.** The focal number must satisfy ≥ 4.5:1 contrast against the underlying shader / image color at the number's bounding box. Two legal paths to guarantee, at design time, before render:
(1) Place a `--surface-l2` solid-color local backplate beneath the number — a tight `inline-flex` container with `backgroundColor: var(--surface-l2)`, `padding: 12–24px`, `borderRadius: var(--radius-card)`. The number sits over the solid surface, the shader/image surrounds the backplate. OR
(2) Constrain the shader / image so the region under the number is extreme L — light mode: that region's authored L > 0.92 (near-white); dark mode: that region's authored L < 0.16 (near-black). This is a design-time constraint on the colors[] / image composition, not a runtime sample.
NEVER use `.rep-hero-shader-wash` linear-gradient mask, `backdrop-filter blur`, or full-Hero opacity overlay to fix this — these violate the §14.1 single-layer rule (above carry-over). The two options above are the only legal paths. This rule shapes the visual context around the number, not the number itself — AnimateNumber JSX implementation (§17) remains unchanged.
```

**问题**(Round-6 doubao 输出验证):
- Q1/Q4/Q5/Q8 都加了 backplate(`backgroundColor: 'var(--surface-l2)'`),即使 shader/image 该区已满足 contrast。原因:(1)(2) 并列描述 + backplate 描述更具体可操作 → doubao 一律选 (1)。
- 末句"two options above are the only legal paths" 强化并列。
- 加 backplate 在 light 模式呈白色矩形 panel + dark 模式呈黑色矩形 panel,Hero number 区域出现 visual noise。

**改动**(最小行数,保留 4 行结构):
- 把 (1) (2) 并列改成 primary/fallback 优先级:**(1) primary path** = "shader / image colors[] under the number is authored at extreme L",**(2) fallback** = "ONLY when (1) cannot be satisfied (e.g. mesh genuinely produces mid-tone region under the number), add `--surface-l2` local backplate as last resort"
- 加反例句:"Adding a backplate when shader L already extreme = unnecessary panel chrome = HARD violation"
- 改末句:"The two options above are the only legal paths" → "Option 1 is the default path; option 2 is fallback only when option 1 cannot be guaranteed"
- 保留:NEVER wash overlay / backdrop-filter / full-Hero opacity 既有禁令;保留 "AnimateNumber JSX implementation (§17) remains unchanged"

**dark threshold**(B 项问题 — P0-1B 一并修):L<0.16 应改 L<0.20 跟 §17 dark mesh/grain `colorBack L 0.125-0.155` 一致。具体见 P0-1B。

**预计行数变化**:0 行(改字符,保 4 行结构)

### P0-1B · §14.1 line 456 + 加 layout 约束

**v0.9 当前文本**(line 456 + P0-1A 改完的新内容):
- 现 P0-1A 改完后,option (1)/primary path 应描述 "shader/image colors[] under the number L extreme"
- 但 §17 dark mesh/grain L 上限 0.480(line 528 grain dark + line 529 dithering dark colorFront 0.420),如果 doubao 把 Hero number 放在 shader L=0.40 区,文字 L=0.92 vs L=0.40 ΔL=0.52 OK 但低于 P0-1A primary path 要求"dark L<0.16"
- 需要二选一:(a) §17 dark 收窄上限(破坏 mesh dark 视觉)或 (b) §14.1 dark threshold 放宽到 L<0.20 + 要求 layout frame number 在 colors[] darkest entries(colorBack 等)上

**改动**:**选 (b)** — 最小变更:
- §14.1 primary path 描述中 dark threshold L < 0.16 → **L < 0.20**(跟 §17 dark grain `colorBack L 0.125`、dithering dark `colorBack L 0.155` 一致)
- 在 primary path 末尾加一句 **"the number's bounding box MUST be framed within the colors[] darkest entries (e.g. `colorBack` for dithering/grain, or the darkest swatch in mesh's 5-color array) — not in the brand-peak or neighbor-accent region"**

**避免诱导**:不要写 "runtime sampled L",这是 design-time 约束;不要描述 "JavaScript 计算 L"。

**预计行数变化**:+1-2 行(加一句 layout 约束)

### P0-2A · §4 Display Number font-size HARD inline

**v0.9 当前文本**(line 170-179,scale table + 一段说明):
```
| Level | lg | mobile | Weight |
|---|---|---|---|
| Page Title | `text-[120px]` | `text-[56px]` | Display |
| Display Number | `text-[200px]` | `text-[96px]` | Display |
| Section Primary / Secondary / Tertiary | 80 / 48 / 28px | — | Display / Display / Body |
| Quote | 36px | — | Body |
| Body / Caption | 15 / 13px | — | Body |
| Meta-Label / Eyebrow | 11px | — | Display, `tracking-[0.08em]` / `[0.16em]` |

Display Number: `leading-[0.86]` `tracking-[-0.04em]`. Exact breakpoint classes — no `clamp()` (sub-pixel jitter degrades AnimateNumber spring). ...
```

**问题**(Round-6 doubao Q1 验证):
- Q1 `<FocalNumber>` 组件 (line 105-124) 没 inline font-size,size 责任传递断链
- Q5 用了 `text-[clamp(64px,12vw,200px)]` 违反 §4 line 179 "no clamp()"
- Q8 hero number 最大 `md:text-[96px]` 没到 desktop 200px

**改动**:在 line 179 之后(Display Number 段),**插入一行 HARD 句**(在 length-based downgrade 段之前,line 187 之前):

> "**Hero Display Number size — HARD GATE.** Size MUST be inlined at the **call site or wrapper root element** as Tailwind mobile-first exact classes (e.g. `<HeroNumber className='text-[96px] md:text-[200px]'>` or `style={{fontSize: '96px'}} md-equivalent`). Do NOT use `clamp()` (§4 carry-over). Do NOT rely on parent inheritance (`<FocalNumber>` without size prop falls back to default 16px). Mobile-first order: `text-[96px] md:text-[200px]`, never reverse."

**严守**:
- 既有 line 179 "no clamp()" 不动
- length-based downgrade(line 187-189) 不动
- 不诱导 wrapper 抽象组件命名(只列举 `<HeroNumber>` `<FocalNumber>` 作为反例展示 size 责任问题,不强制命名)

**预计行数变化**:+2 行(插入 1 段 1 行 + 空行)

### P0-2B · §4 wrapper className 透传约束

**P0-2A 后,接着插入第二个 HARD**(同段或下一段):

> "**Wrapper className delegation — HARD.** If a custom abstraction wraps Display Number(e.g. for `AnimateNumber` integration), the wrapper MUST(1) accept a `className` prop and apply it to its root element, OR (2) set the size directly on the root element. Size cannot be the responsibility of the wrapper's parent container — `parent inherit` = silent default = invalid."

**避免**:不诱导命名约定(不强制叫 `<HeroNumber>`)、不写完整 React snippet(参 R-120 红线 3)、不增加 import 路径(Chris 工程红线)。

**预计行数变化**:+2 行

**P0-2A + P0-2B 总**:+4 行(2 段 HARD,每段 1 行 + 空行)。位置在 line 179 之后、line 187 之前。

---

## 严格纪律(HARD GATE,违反任何一条 = patch 失败)

1. **AnimateNumber zone 0 改** — §4 line ~187 / §7 line ~269-291 / §17 line ~566-589 整段 一字不动。length-based downgrade(line 187-189)不动。
2. **Chris 工程红线** — v0.10 不允许出现 `import ... from` / `pnpm` / `package.json` / `npm install` / `AGENT.md` / `src/views` / `@/components/ui` / `createElement.*link` 等工程化文本。
3. **OKLCH syntax** — 全文 space-separated(承袭 v0.9 P0-A)。
4. **不诱导 wash overlay / backdrop-filter / opacity overlay** — P0-1A 保留 NEVER 句既有禁令。
5. **不诱导 `clamp()`** — P0-2A 显式禁,跟 §4 line 179 既有规则一致。
6. **不诱导运行时采样** — P0-1B 用 design-time 语言 "authored L" / "framed within darkest entries",不写 "sampled at runtime"。
7. **不增 React snippet** — 既有 §17 R-120 保留 snippet 是唯一例外,v0.10 不新增。
8. **不加 emoji / Inspired by / Last updated / Source provenance** — Chris 红线 1+2。
9. **不写理由解释 / "Why" 长段** — Chris 红线 6;rules 直接陈述。
10. **行数 ≤ 640** — v0.9 627,v0.10 预计 +5-6 行 → 632-633。
11. **patch 完成后跑 self-check grep verify**(下面命令)。

## 落地 + 回报

完成 4 处 patch 后,跑以下 grep self-verify:

```bash
V10="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.10.md"

echo "=== 行数(期望 632-633, ≤ 640) ==="
wc -l "$V10"

echo "=== P0-1A · backplate 降级措辞(SHOULD-APPEAR) ==="
for p in 'primary path' 'fallback' 'fallback only when' 'unnecessary panel chrome' 'default path'; do
  printf "  %-35s : %s hits\n" "$p" "$(grep -c "$p" "$V10")"
done

echo "=== P0-1A · 老措辞残留(SHOULD-DISAPPEAR,期望 0) ==="
for p in 'Two legal paths to guarantee' 'two options above are the only legal paths'; do
  printf "  %-50s : %s hits\n" "$p" "$(grep -c "$p" "$V10")"
done

echo "=== P0-1B · dark threshold + layout ==="
for p in 'L < 0.20' 'darkest entries' 'colorBack' 'bounding box'; do
  printf "  %-35s : %s hits\n" "$p" "$(grep -c "$p" "$V10")"
done

echo "=== P0-1B · 老 L < 0.16 残留(期望 0 在 §14.1) ==="
grep -nE "L < 0\.16|L<0\.16" "$V10"

echo "=== P0-2A · Hero Display Number size HARD ==="
for p in 'Hero Display Number size' 'call site or wrapper root' 'parent inheritance' 'Mobile-first'; do
  printf "  %-35s : %s hits\n" "$p" "$(grep -c "$p" "$V10")"
done

echo "=== P0-2B · wrapper className delegation ==="
for p in 'Wrapper className delegation' 'accept a `className` prop' 'parent inherit.*invalid'; do
  printf "  %-40s : %s hits\n" "$p" "$(grep -cE "$p" "$V10")"
done

echo "=== AnimateNumber zone byte-level diff verify (期望空) ==="
diff <(sed -n '187p,189p;269p,291p;566p,589p' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.9.md) <(grep -E "Apply length-based|useReducedMotion\(\) mandatory|AnimateNumber wrapper.*read at wrapper top|Hero shader speed.*read at each|parseDisplayValue.*split Bitable|inline-flex items-baseline gap-1 whitespace-nowrap|\"tnum\" 1, \"lnum\" 1|AnimateNumber renders each digit position" "$V10" | head -10)
echo "(end)"

echo "=== 工程红线 0 hit verify ==="
for p in 'AGENT\.md' '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "  %-25s : %s\n" "$p" "$(grep -cE "$p" "$V10")"
done

echo "=== emoji 0 hit ==="
for p in '✅' '❌' '🔥' '💡' '✓' '✗'; do
  printf "  %s : %s\n" "$p" "$(grep -c "$p" "$V10")"
done

echo "=== clamp 残留(规则禁止之外不应新增)==="
grep -nE "clamp\(" "$V10"

echo "=== v0.9 9 处 patch 标记还在(期望全 ≥1)==="
for p in 'space-separated' 'hue/chroma anchor' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'enumerated negative examples' 'rounded surface panel'; do
  printf "  %-40s : %s\n" "$p" "$(grep -c "$p" "$V10")"
done
```

回报模板(完整粘贴):

```
default v0.9 → v0.10 patch complete.

Edits 落地:
  P0-1A §14.1 backplate 降级 + 末句 : <DONE/PARTIAL/FAIL>
  P0-1B §14.1 dark threshold + layout: <DONE/PARTIAL/FAIL>
  P0-2A §4 Hero Display Number HARD : <DONE/PARTIAL/FAIL>
  P0-2B §4 wrapper className delegation: <DONE/PARTIAL/FAIL>

Self-check 结果:
  v0.10 行数: <N> (期望 632-633)
  P0-1A SHOULD-APPEAR(5 项): <list>
  P0-1A SHOULD-DISAPPEAR(2 项): <list, 期望全 0>
  P0-1B SHOULD-APPEAR(4 项): <list>
  P0-1B L<0.16 残留: <list>
  P0-2A SHOULD-APPEAR(4 项): <list>
  P0-2B SHOULD-APPEAR(3 项): <list>
  AnimateNumber zone diff: <empty 或 内容>
  工程红线 0 hit: <PASS/FAIL>
  emoji 0 hit: <PASS/FAIL>
  clamp 残留: <list, 期望仅 §4 既有 no clamp 规则上下文>
  v0.9 9 处 patch 标记: <PASS 全保留 / FAIL>

ambiguity / 风险 flag:
  <列出 patch 时遇到的 ambiguity 或不确定决策,或 NONE>
```

不 commit / 不 push — Cowork(我)接手 review。

## 触发词

开始。
