# CC-Prompt · doubao Generation Test · default v0.4 · Round-1

You are the **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (you): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates your evidence into Design Prompt v0.5 patches

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

---

## Prerequisites (verify before starting)

Both A 线 and B 线 must be in place. Do not start Round-1 if either is missing.

### A 线 · Design Prompt v0.4
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.4.md` exists, 649 lines.

### B 线 · Sandbox env
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py` exists, points to model `doubao-seed-2-0-code-preview-260215`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md` exists, lists paper-shaders / motion-plus / shadcn / recharts / lucide-react
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env_legacy/` is the legacy folder — ignore
- `ARK_API_KEY` env var is set (`echo "${ARK_API_KEY:0:8}..."` to confirm; empty → stop & ask user)

If any fails, stop and hand back to Cowork.

---

## Round-1 specifics

- **Design Prompt under test**: default v0.4 (frozen, 649 lines)
- **N attempts**: 1 per Query × 8 Queries = 8 generations (Round-1 prioritizes coverage breadth; reruns deferred to Round-2)
- **doubao config**: temperature 0.7, max_tokens 32000 (per `generate.py`)
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — extracted from current `generate-prompt.txt` line 498-908, identical across all 8 Queries
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v0.4-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md`

---

## Pre-test red-line verify (mandatory before generating)

Run on v0.4 body:
```bash
V04="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.4.md"
for p in 'AnimateNumber' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'Hero image' 'Style Routing'; do
  printf "%-30s : %s hits\n" "$p" "$(grep -c "$p" "$V04" || echo 0)"
done
```

Expect ≥ 1 hits for each pattern. If any pattern hits 0, stop and flag — v0.4 should have all these concepts. Do not start generation until this passes.

---

## 8 User Queries

All 8 share the same Bitable mock data (华东大区 Q1销售业绩 KPI). Only the brand identity + style language + brand color + mode varies. Q1-Q6 cover the 6 STYLE_PRESETS once each; Q7 stress-tests Hero image background; Q8 stress-tests AnimateNumber pervasive use.

| Q# | Style 预期 | Brand color | Mode | 特殊验证 |
|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | Nunito + grain shader |
| Q2 | technical | #0EA5E9 | dark | JetBrains Mono + dithering shader |
| Q3 | editorial | #7C2D12 | light | Spectral + sparse rhythm |
| Q4 | geometric | #3B82F6 | dark | Geist + mesh shader |
| Q5 | impact | #DC2626 | dark | Bebas Neue + 得意黑 + impact mesh |
| Q6 | ceremonial | #854D0E | light | Playfair + 马善政毛笔楷书 |
| Q7 | warmth (+Hero img) | #D97706 | light | Hero `<img>` background + 标题可读性 |
| Q8 | technical (+Animate) | #10B981 | dark | AnimateNumber ≥3 处使用 |

### Q1 · warmth + 茶饮
```
我们是【茶语轩】茶饮连锁品牌，这份数据是华东大区 2025 Q1 销售业绩。
请生成一份温暖、亲和、有手作感的销售业绩报告页面，能传达茶文化的传统底蕴和现代生活方式。
主色用茶绿 #6B8E23，light 模式。
```

### Q2 · technical + 数据中心
```
为【星云算力】数据中心生成一份月度运营报告页面。
本月数据：华东大区 Q1销售业绩底层数据。
需要工程感、数据密集、强调数字精度和系统稳定性的视觉表达。
主色 #0EA5E9，dark 模式。
```

### Q3 · editorial + 杂志季刊
```
我们是【纸鸢】生活美学杂志，需要一份 2025 春季季刊的业绩回顾页面，
底层数据用华东大区 Q1销售业绩。
风格要像高端时尚杂志，留白讲究、字体精致、节奏舒缓。
主色 #7C2D12 酒红，light 模式。
```

### Q4 · geometric + SaaS
```
【拓扑云】SaaS 产品 2025 Q1 增长数据看板。
底层数据用华东大区 Q1销售业绩。
需要现代科技感、清晰理性、紧致节奏的视觉表达。
主色 #3B82F6 蓝，dark 模式。
```

### Q5 · impact + 电竞战队
```
【烈焰电竞】战队 2025 Q1 赛季战绩公告页面。
底层数据用华东大区 Q1销售业绩。
需要强烈视觉冲击力、海报感、热血氛围。
主色 #DC2626 鲜红，dark 模式。
```

### Q6 · ceremonial + 奢侈品腕表
```
【鎏金】高端腕表 2025 Q1 新品销售年度报告。
底层数据用华东大区 Q1销售业绩。
需要传统、仪式感、奢华内敛的视觉表达。
主色 #854D0E 古铜金，light 模式。
```

### Q7 · warmth + Hero 图片背景
```
【豆韵】精品咖啡店 2025 Q1 销售年度回顾。
底层数据用华东大区 Q1销售业绩。
请使用我提供的咖啡门店图片作为 Hero 背景：
https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600
注意标题文字必须在图片上保持可读（通过 overlay 或字号控制）。
主色 #D97706 橙棕，light 模式。
```

### Q8 · technical + AnimateNumber 强烈
```
【碳源 Carbon One】2025 Q1 全国减排数据可视化报告。
底层数据用华东大区 Q1销售业绩。
希望页面里每一个核心数字（业绩总额、增长率、参与门店数等）都有 AnimateNumber 从 0 跃升的入场动画。
风格要工程感、数据密集。
主色 #10B981 翠绿，dark 模式。
```

---

## Step-by-step procedure

### Step 1 · 构造 generate-prompt.txt（per Query）

For each Query Q<N>, write the following structure to `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt` (overwrite):

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Use only the libraries listed in AGENT.md (paper-shaders, motion-plus/react, motion/react, recharts, lucide-react, shadcn/ui under @/components/ui/*)
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v0.4) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v0.4.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{从当前 generate-prompt.txt line 498-908 抽取的 mock JSON 段，整段不动}

=== USER QUERY ===
{Q<N> 的 User Query 文本，from "## 8 User Queries" 上方}

Output the code block now.
```

The mock data section is identical across all 8 Queries. Only the USER QUERY block changes.

### Step 2 · 创建 attempt 目录

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v0.4-Q${N}-attempt-1"
  mkdir -p "default-v0.4-Q${N}-attempt-1"
  cp -R running-env/. "default-v0.4-Q${N}-attempt-1/"
done
```

### Step 3 · 调用 doubao (sequential, 串行)

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  # write generate-prompt.txt for Q<N> per Step 1
  # ... (you compose it programmatically per Step 1)
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v0.4-Q${N}-attempt-1" 2>&1 | tee "default-v0.4-Q${N}-attempt-1/gen.log"
done
```

**Rules**:
- Sequential, no concurrency (doubao API single-tenant per key)
- If generation times out (>180s) or no ```tsx fence found, mark FAIL in report and continue
- Record App.tsx line count + token usage per attempt

### Step 4 · build 验证

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.4-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
  echo "Q${N} build exit: $?"
done
```

Record build status (PASS / FAIL + first error line) per attempt.

### Step 5 · 启动 dev server + playwright（per build-PASS attempt）

For each build-PASS attempt:

```bash
cd "default-v0.4-Q${N}-attempt-1"
pnpm run dev > dev.log 2>&1 &
DEV_PID=$!
sleep 5  # wait for vite up; grep "Local:" in dev.log to confirm port
PORT=$(grep -oE 'http://localhost:[0-9]+' dev.log | head -1 | grep -oE '[0-9]+$')
```

Then use playwright / chrome-devtools-mcp:
1. `navigate http://localhost:${PORT}`
2. `waitForLoadState networkidle` (10s timeout)
3. `screenshot full page` → `reports/screenshots/Q${N}-t0.png`
4. wait 2500ms (let AnimateNumber ramp to final)
5. `screenshot full page` → `reports/screenshots/Q${N}-stable.png`
6. Run Step 6 DOM extraction
7. `kill $DEV_PID` to free port

### Step 6 · Playwright DOM extraction

`page.evaluate` with this exact script. Save output as JSON to `reports/dom/Q${N}.json`:

```javascript
() => {
  const safeFont = el => el ? getComputedStyle(el).fontFamily : null;
  const safeBg   = el => el ? getComputedStyle(el).backgroundColor : null;
  const safeCol  = el => el ? getComputedStyle(el).color : null;

  const titleEl  = document.querySelector('h1, [class*=hero] [class*=title], [class*=Hero] [class*=Title]');
  const numberEl = document.querySelector('[class*=bignum], [class*=BigNum], [class*=metric] [class*=value], [class*=hero] [class*=number]');
  const bodyEl   = document.querySelector('main p, article p, [class*=body], [class*=Body]');
  const heroEl   = document.querySelector('[class*=hero], [class*=Hero]');

  // Hero shader canvas (paper-shaders renders to <canvas>)
  const heroCanvas = heroEl?.querySelector('canvas') ?? null;
  const heroImg    = heroEl?.querySelector('img') ?? null;
  const heroBgImage = heroEl ? getComputedStyle(heroEl).backgroundImage : null;

  // AnimateNumber detection (motion-plus puts data attrs)
  const animatedNumbers = document.querySelectorAll('[data-motion-id], [class*=animate-number], [class*=AnimateNumber]');

  // Overflow detection on big-number-like nodes
  const bigNumEls = document.querySelectorAll('[class*=bignum], [class*=BigNum], [class*=metric] [class*=value], [class*=hero] [class*=number]');
  const overflows = Array.from(bigNumEls)
    .filter(el => {
      const parent = el.parentElement;
      if (!parent) return false;
      return el.scrollWidth > parent.clientWidth + 1 || el.scrollHeight > parent.clientHeight + 1;
    })
    .map(el => ({ text: el.textContent.trim().slice(0, 40), elW: el.scrollWidth, parentW: el.parentElement.clientWidth }));

  // Charts
  const charts = document.querySelectorAll('svg.recharts-surface, .recharts-wrapper, canvas[class*=chart], [class*=Chart] canvas, [class*=Chart] svg');

  // Cards / sections (structural integrity)
  const cards = document.querySelectorAll('[class*=card], [class*=Card], section');

  return {
    fonts: { title: safeFont(titleEl), number: safeFont(numberEl), body: safeFont(bodyEl) },
    colors: { bodyBg: safeBg(document.body), heroBg: safeBg(heroEl), heroColor: safeCol(heroEl) },
    hero: {
      canvas: heroCanvas ? { w: heroCanvas.width, h: heroCanvas.height } : null,
      img: heroImg ? { src: heroImg.src, naturalW: heroImg.naturalWidth, naturalH: heroImg.naturalHeight } : null,
      bgImage: heroBgImage && heroBgImage !== 'none' ? heroBgImage : null
    },
    animateCount: animatedNumbers.length,
    overflows,
    chartCount: charts.length,
    cardCount: cards.length,
    bodyTextLength: document.body.innerText.length,
  };
}
```

### Step 7 · Design Skill 评分

For each build-PASS attempt, invoke these design skills (the canonical 3 Round-4 used + vault-internal design-principles if available):

1. **impeccable** (`pbakaus/impeccable`) — design / a11y / craft critique
2. **design-taste-frontend** (`Leonxlnx/design-taste-skill`)
3. **emil-design-eng** (Emil Kowalski motion skill)
4. **design-principles** (vault-internal, only if accessible; skip silently if not in current session scope)

Save per-skill output to: `default-v0.4-Q${N}-attempt-1/critic/{impeccable,design-taste-frontend,emil-design-eng,design-principles}.md`

Each critic should focus on:
- impeccable: a11y violations, craft quality, layout integrity
- design-taste-frontend: typographic taste, color harmony, rhythm
- emil-design-eng: motion choices (AnimateNumber, scroll-driven, shader speed appropriateness)
- design-principles (if available): vault-specific principles compliance

Plus run **motion-audit** once across all attempts (single output file `reports/motion-audit-finding.md`).

### Step 8 · 写 Robustness Report + cp-to-vault

See sections below.

---

## 7 验证点 + 评分维度

Use this table per Query. Each verification: `pass / partial / fail / n/a` + 1-2 sentence concrete observation tied to DOM data or screenshot.

| # | Verification | 通过标准 |
|---|---|---|
| V1 | Hero shader 动效 | `hero.canvas` 不为空 + shader 类型与 style 预期匹配（warmth→grain / technical→dithering / 其他→mesh）— 通过 v0.4.md §15 + 截图肉眼判断 |
| V2 | 字体搭配 | `fonts.title` 与 STYLE_PRESETS 预期 stack 首项匹配（warmth→Nunito / technical→JetBrains Mono / editorial→Spectral / geometric→Geist / impact→Bebas Neue / ceremonial→Playfair Display） |
| V3 | 配色约束 | `colors.bodyBg` OKLCH L 在 light≥0.95 / dark≤0.16；`heroBg` 或 hero accents 接近 brand_color OKLCH H ±20° |
| V4 | 图表组件 | `chartCount` ≥ 1 + 截图肉眼无明显视觉问题（重叠、轴标签溢出） |
| V5 | 大数字跑版 | `overflows` 数组长度 = 0（无超出）— pass = 不跑版 |
| V6 | AnimateNumber | `animateCount` ≥ 1（Q8 应 ≥ 3）+ 对比 t0/stable 截图，数字应从早期帧到稳态帧有变化 |
| V7 | Hero 图片背景 | 仅 Q7 评估：`hero.img` 或 `hero.bgImage` 非空 + 截图肉眼判断标题可读性（不被吃掉） |

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md`

### 8 headline sections (in order):

#### 1. Per-Query 验证表

| Q# | Style | Brand | Mode | Build | V1 Shader | V2 Font | V3 Color | V4 Chart | V5 NoOverflow | V6 Animate | V7 HeroImg | 综合 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Q1 | warmth | #6B8E23 | light | PASS | pass | pass | pass | pass | pass | partial | n/a | A- |
| ... |

综合 grade: A / A- / B+ / B / B- / C / D / F. Use **words** (pass/partial/fail/n/a) in cells, no emoji.

#### 2. Stable Failures (≥ 2/8 occurrences)

SF-1 `<short-name>`: <one-line evidence summary> (occurs in Q<a>, Q<b>, Q<c> ...)
SF-2 ...

For each SF, include:
- Which Queries hit it
- DOM evidence (cite the JSON field + value)
- Screenshot reference
- Hypothesis on which Design Prompt v0.4 section is too weak / unclear

#### 3. Single Failures (1/8 only) — Noise

Listed but de-emphasized. Not promoted to Stable Failure.

#### 4. Cross-Query 共性问题

Themes that don't fail explicit verifications but show up qualitatively (e.g. doubao consistently underuses §11 Section Archetype Library variety, or always picks the same 3 sections regardless of brand).

#### 5. Cross-skill diagnostic convergence

Themes raised independently by 2+ design skills (impeccable + design-taste-frontend + emil-design-eng + motion-audit). Cite which skill said what.

#### 6. Build / 生成统计

| Q# | App.tsx lines | imports used | imports unused | violations (import not in AGENT.md / hex literal outside MeshGradient / Tailwind color classes) |
|---|---|---|---|---|
| Q1 | NNN | recharts, motion-plus, paper-shaders | lucide-react | 0 |
| ... |

#### 7. Patch suggestions to Cowork

Concrete observations only. **No patched wording.** Format:

> Suggestion S-1: <one-line summary>
> Evidence: <which SF / which Queries / what DOM data>
> Section to revisit: v0.4 §<N> "<section name>"
> Why current text is insufficient: <one-line reasoning>

Maximum 5 suggestions, ordered P0 > P1 > P2.

#### 8. Hand-back block

Standardized stdout (see "Output to Chris on completion" below).

---

## cp-to-vault checklist (Round-20 process improvement, adapted)

After Robustness Report is written, copy these artifacts so Cowork can verify directly:

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-1-app-tsx" "$DST/Round-1-screenshots" "$DST/Round-1-critic"

# 1. Per-Query App.tsx (rename test-output-Q{1..8}.tsx)
for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.4-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-1-app-tsx/Q${N}-App.tsx" || echo "skip Q${N} (no App.tsx)"
done

# 2. Per-Query screenshots (t0 + stable)
for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-1-screenshots/Q${N}-${stage}.png" || true
  done
done

# 3. Per-Query critic outputs
for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v0.4-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-1-critic/Q${N}-${skill}.md" || true
  done
done

# 4. Motion audit single output
[ -f "$DST/motion-audit-finding.md" ] && echo "motion-audit-finding.md present" || echo "WARN motion-audit-finding.md missing"

# 5. Robustness Report
ls -la "$DST/Robustness-Report_default-v0.4_Round-1.md"

# 6. Final tally
echo "--- Round-1 artifacts ---"
echo "App.tsx files     : $(ls "$DST/Round-1-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-1-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-1-critic/" 2>/dev/null | wc -l)"
echo "Motion audit      : $([ -f "$DST/motion-audit-finding.md" ] && echo present || echo MISSING)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v0.4_Round-1.md" ] && echo present || echo MISSING)"
```

Expected tally (best case, all 8 build PASS):
- App.tsx: 8
- Screenshots: 16 (8 × t0 + 8 × stable)
- Critic files: 24-32 (8 × 3 or 4 skills)
- Motion audit: 1
- Report: 1
**Total target: 50-58 files**

---

## Self-check (before reporting back to Chris)

- [ ] Prerequisites verified (A 线 v0.4 文件 + B 线 generate.py + AGENT.md + ARK_API_KEY)
- [ ] Pre-test red-line verify: 12 patterns × ≥1 hit on v0.4
- [ ] 8 个 Query 都构造了独立的 generate-prompt.txt (verified by re-reading after write)
- [ ] 8 次 doubao 调用都跑完（成功/失败都记录在 gen.log + Robustness Report）
- [ ] 每个 build-PASS attempt 都跑了 pnpm build + playwright + DOM 提取 + 截图
- [ ] 每个 build-PASS attempt 至少跑了 3 个 design skill (impeccable + design-taste-frontend + emil-design-eng)
- [ ] motion-audit 在所有 attempt 上跑了 1 次（产出 1 个 finding md）
- [ ] Robustness Report 写完且 8 sections 都填了实质内容（不是占位）
- [ ] cp-to-vault 跑完后 `ls` 确认 50+ files 存在
- [ ] Per-Query 验证表 8 行 × 13 列填齐（含 build status + V1-V7 + 综合）
- [ ] Stable Failures 段每条都挂钩 DOM 数据 / 截图 / Design Prompt 章节号
- [ ] Patch suggestions ≤ 5 条，每条有 evidence + section to revisit + why insufficient
- [ ] 报告中无 patched wording（observations only — Cowork 是 sole decision-maker）

---

## Output to Chris on completion

```
doubao default v0.4 生成测试 Round-1 complete.

Design Prompt under test: default v0.4 (649 lines, frozen)
Test cwd: /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/
Robustness Report: /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v0.4_Round-1.md

Pre-test red-line verify: <PASS/FAIL> (12 patterns × ≥1 hit)

Generation summary (Build status | V1-V7 pass count out of 7):
  Q1 (warmth+茶饮 #6B8E23 light)         : Build <PASS/FAIL> | <N>/7
  Q2 (technical+数据中心 #0EA5E9 dark)    : <...>
  Q3 (editorial+季刊 #7C2D12 light)       : <...>
  Q4 (geometric+SaaS #3B82F6 dark)        : <...>
  Q5 (impact+电竞 #DC2626 dark)            : <...>
  Q6 (ceremonial+腕表 #854D0E light)       : <...>
  Q7 (warmth+Hero图 #D97706 light)         : <...> + HeroImg verification: <pass/fail>
  Q8 (technical+Animate #10B981 dark)      : <...> + AnimateNumber count: <N>

Build pass rate          : <N>/8
Cross-Query V1-V7 总通过率: <X>/56

Stable Failures (≥ 2/8 Queries):
  SF-1 <name>: <one-line evidence>
  SF-2 ...

Cross-skill convergence (themes raised by 2+ design skills):
  T-1 <theme>: <one-line>
  ...

Top patch suggestions for Cowork (no wording, observations only):
  S-1 (P0): <one-line> → v0.4 §<N>
  S-2 (P1): ...
  (full list in report §7)

Artifacts cp'd: <N> files in reports/Round-1-* subdirs.
Ready for Cowork to author Design Prompt v0.5 patch.
```
