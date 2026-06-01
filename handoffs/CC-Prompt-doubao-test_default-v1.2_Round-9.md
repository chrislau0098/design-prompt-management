# CC-Prompt · doubao Generation Test · default v1.2 · Round-9 · 复杂 / 喜庆 / 大数据 / 图片 overlay

你是 **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (你): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates evidence into v1.3 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

## Round-9 主目标:**default v1.2 在 4 类压力场景的兜底能力 + Hero 图片 overlay 新 design 探索**

Round-8 关注 default v1.2 的 D3 (brand-narrative) / D4 (testimonial-threaded) fix。Round-9 测的是 **default v1.2 在它原本不擅长的场景里能不能兜住,以及 Hero 图片 overlay 的新 design 是否可行**:

| 场景 | Round-9 Query |
|------|---------------|
| **复杂多要求 + 一堆约束** | Q1 / Q2 |
| **国内喜庆 (深红 + 金 / 朱砂洗)** | Q3 / Q4 |
| **大量 Mock 数据 + 组件选型** | Q5 / Q6 |
| **Hero 图片 + 同色 overlay (新 design 探索)** | Q7 / Q8 |

⚠️ **设计探索**:Q7 / Q8 的 Hero 图片 overlay 设计**还没进 Design Prompt**,只在 user query 里引导。看 doubao 能不能跟,出来效果如果好,**v1.3 才会把这条 design 收进 Design Prompt §14.1 / §15**。

⚠️ **8 Queries 全部用 default v1.2**(不切 festive-royal-crimson / festive-editorial-crimson / theatre-dark)— 这一轮是 **default 兜底能力测**, 不是 prompt routing 测。fixed style 兜底测留下一轮。

⚠️ **R-120 + R-123 + R-124 AnimateNumber 不动 三重 carry**:§4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段不动。若 Round-9 出现 AnimateNumber regression, flag 为 doubao 自身波动, 不 propose AN 段改动。

⚠️ **Chris 红线 carry**: Design Prompt patch suggestion 必须遵守 — 不引入 `import` / 包名 / 构建工具 / 框架名。

---

## Prerequisites (verify before starting)

### A 线 · Design Prompt v1.2
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md` exists, **639 lines** (v1.1 baseline 631, R-128 净增 8 行).

### B 线 · Sandbox env (unchanged)
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C 线 · Round-8 baseline + cumulative regression
Read once:
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.1_Round-8.md`(primary baseline — v1.1 R-128 fix 前的状态)

If any prerequisite fails, stop & hand back to Cowork.

---

## Round-9 specifics

- **Design Prompt under test**: default v1.2 (frozen, 639 lines · R-128 = §12 narrative-shape intro + Brand Narrative Spine + Testimonial-Threaded + §13 trigger gate + 泛用性精修 over v1.1)
- **N attempts**: 1 per Query × 8 Queries = 8 generations
- **doubao config**: temperature 0.7, max_tokens 32000
- **Bitable mock**: 华东大区 Q1销售业绩 KPI (28 records) — **same as Round-7/8**; Q5/Q6 user query 明确说 "合理虚拟扩展", doubao 自己 hallucinate 多维 data
- **Working directory**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**: `default-v1.2-Q{1..8}-attempt-1/`
- **Report destination**: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.2_Round-9.md`

Round-9 holds Bitable mock + sandbox env constant vs Round-8. ONLY variables: (a) Design Prompt v1.1 → v1.2, (b) **8 Queries 全换 4 类压力场景**.

---

## What changed v1.1 → v1.2 (R-128 patch summary)

| # | Line | Type | v1.1 → v1.2 essence |
|---|------|------|---------------------|
| **V12-P0-A** | §12 line 393-394 | **Narrative-shape archetypes intro 1 句** | "Default skeleton stays data-led ... Narrative-shape archetypes engage ONLY when query explicitly signals brand history / heritage / craftsmanship / founder story OR customer voice / testimonial / case interview — narrow gate, not default." |
| **V12-P0-B1** | §12 line 416 | **Brand Narrative Spine archetype** | Narrative-led, data as supporting evidence · trigger 关键词 brand-history / heritage / craftsmanship · long-form prose dominates · handful of figures whole-page · AnimateNumber reserved for focal claim only · 泛用性精修后纯 design intent 无工程硬约束 |
| **V12-P0-B2** | §12 line 418 | **Testimonial-Threaded archetype** | Customer voice interleaved with data · trigger 关键词 customer-voice / testimonial / case-interview · alternating Stacked Band · attribution per §3 Meta-label discipline (reference 不重复) · Quote Interstitial unchanged for non-threaded use |
| **V12-P0-C** | §13 line 422-423 | **§13 trigger gate** | "Default composition skeleton assumes data-led narrative ... When Brand Narrative Spine OR Testimonial-Threaded archetype trigger explicitly matches the user query, that archetype's own structure recipe overrides the default skeleton below; otherwise the default skeleton applies and the new archetypes do NOT activate." |

R-128 净增 8 物理行(B1/B2 单长物理行)· §14.1 R-125 wrapper rule carry as-is · AnimateNumber 三段 0 改 · 工程约束泛用性精修 ~210 chars 削减.

---

## Pre-test red-line verify (mandatory before generating)

```bash
V12="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md"

echo "--- 行数 (期望 639) ---"
wc -l "$V12"

echo "--- R-128 V12-P0-A/B/C SHOULD-APPEAR (各 ≥1) ---"
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Narrative-led, data as supporting evidence' 'AnimateNumber reserved for focal claim only' 'Testimonial-Threaded' 'pairs a brief quote' 'attribution per §3 Meta-label discipline' 'Quote brevity extends Quote Interstitial' 'Quote Interstitial archetype itself remains unchanged' 'Default composition skeleton assumes data-led' 'explicitly matches' 'do NOT activate' 'override the default skeleton'; do
  printf "  %-55s : %s hits\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "--- R-128 泛用性精修 SHOULD-DISAPPEAR (工程约束应消失, 各 = 0) ---"
for p in '<p>. ≥ 60% page volume' '<p>. ≥ 80 chars' 'mobile container query relaxes' 'inline-flex baseline-aligned' '0-2 may wrap AnimateNumber' '1 .<blockquote>' 'attribution via .<span>. per §3' 'NEVER .<p>.' '≤ 60 words per quote' 'Attribution typography: 12px uppercase' 'tracking-\[0.12em\]'; do
  printf "  %-50s : %s hits\n" "$p" "$(grep -cE "$p" "$V12")"
done

echo "--- v1.1 既有 22 must-exist (各 ≥1) ---"
for p in 'AnimateNumber' 'motion/react' 'motion-plus' 'paper-shaders' 'STYLE_PRESETS' 'hero_shader' 'font_family' 'brand_color' 'OKLCH' 'recharts' 'shadcn' 'hero_image_url' 'tabular-nums' 'framer-motion' 'useReducedMotion' 'Style Routing' 'lightness_shift' 'foreground-2' 'FORBIDDEN BODY COLOR' 'chart-hover' 'WCAG' 'parseDisplayValue'; do
  printf "  %-22s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "--- v1.1 R-125 + R-124 + v0.9 patches carry (各 ≥1) ---"
for p in 'min-h-full' 'intermediate wrapper' 'space-separated' 'EVERY entry of mesh' 'Hero focal number readability' 'Meta-label element discipline' 'forbidden CSS properties' 'background-only token' 'Primary path' 'Fallback only when' 'Hero Display Number size' 'Wrapper className delegation'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V12")"
done

echo "--- AnimateNumber zone sentinel (R-120/R-123/R-124 三重锁, 各 ≥1) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'AnimateNumber wrapper.*read at wrapper top' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-65s : %s hits\n" "${sentinel:0:60}" "$(grep -cE "$sentinel" "$V12" || echo 0)"
done

echo "--- forbidden (各 = 0, 注意 jsx 2 hits = v1.1 既有 §17 carry) ---"
for p in '✅' '❌' '🔥' '💡' '✓' '✗' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE' 'Example:'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V12")"
done

echo "--- Chris engineering red-line (各 = 0) ---"
for p in '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V12")"
done
```

Expect: 行数 = 639, R-128 SHOULD-APPEAR 14 项 ≥1, SHOULD-DISAPPEAR 11 项 = 0, v1.1 22 must-exist ≥1, R-125/R-124/v0.9 12 项 carry ≥1, AnimateNumber 6 sentinels ≥1, forbidden 11 项 = 0, Chris red-line 6 项 = 0. 任何 fail 立即 stop.

---

## 8 User Queries (Round-9 全部新场景)

底层数据全部用相同的华东大区 Q1销售业绩 KPI mock data (28 records). 复杂场景是 user query 的叠加, Q5/Q6 doubao 自己 hallucinate 多维数据.

### Q1 · 复杂多要求 + 数据战报 (default routing 主流)

```
帮我做一个 2025 年 Q1 销售数据复盘页面,我有很多要求:
- 我们是【晨光电器】,一家家电零售连锁,30 家门店分布在 8 个城市
- Q1 总销售 ¥2.8 亿,同比 +18%,环比 -5%(春节后回落)
- 需要展示:总销售 + 城市排名 + Top 5 SKU + 渠道占比 + 同期人员效率
- 文案要专业克制,不要太营销腔
- 颜色想用蓝色系,主色 #2563EB
- light 模式
- 风格要现代、清晰、信息密度适中,留白要够
- 底层数据用华东大区 Q1销售业绩
```

### Q2 · 自相矛盾要求 + 品牌弱触发 (default 鲁棒)

```
做一份 Q1 销售战报页面,我的要求是:
- 既要专业又要有温度
- 既要数据密集又要留白舒适
- 既要可读性强又要视觉有冲击力
- 我们品牌【松云】是茶饮,但 Q1 拓展了咖啡线,数据混合销售
- Hero 区要显示 Q1 总销售 + 同比 + 一句品牌 statement
- 主色 #1E3A2F 墨绿,light 模式
- 文案不要 corporate 但也不要太网感
- 底层数据用华东大区 Q1销售业绩
```

### Q3 · 国内喜庆 整页深红 + 金色 (default 不擅长, 看兜底)

```
为【金桂坊】中式礼品品牌做一份 2025 春节档销售战报页面.
我们是百年老字号,Q1 重点是春节销售,主打喜庆礼盒.
要中国风,深红底配金色字,有传统纹样,印章感强.
数据用华东大区 Q1销售业绩.
颜色 #B22222 深红 + 金色, light 模式 (整页深红底,不是 dark).
```

### Q4 · 国内喜庆 朱砂洗 + 杂志感 (default 不擅长, 看兜底)

```
【沪上人家】高端生活方式品牌 Q1 销售年报.
风格要参考国内文艺类年报,象牙白底,朱砂红装饰,黑色无衬大字,
有西式编辑设计的克制和东方喜庆的色彩点缀.
主色 #DC143C 朱砂红 + 象牙白底, light 模式.
数据用华东大区 Q1销售业绩.
```

### Q5 · 大量 Mock 数据 + 多维分析 + 组件选型

```
我有 50 个城市的 Q1 销售排名数据(请合理虚拟),需要在一个页面里展示:
- 全国 TOP 20 城市的具体销售额排名
- 6 大区域销售对比(华东/华北/华南/西南/西北/东北)
- 50 个 SKU 的销售贡献(请只展示 TOP 15)
- 12 个月的趋势(请虚拟 12 个月数据)
- 每个城市还有同比 / 环比 / 客单价 三个指标
数据量大,要选合适的图表组件(不要硬塞到一张图里).
主色 #2563EB,light 模式.
底层数据骨架用华东大区 Q1销售业绩,具体数字请合理扩展.
```

### Q6 · 大量 Mock + dark + 多 chart 类型组件选型

```
2025 Q1 全国销售业绩多维分析报告.
需要展示:
- 时间维度: 13 周每周销售 + 各周达成率
- 渠道维度: 线上 / 线下 / B2B / 直营 4 个渠道占比
- 产品维度: 8 大品类销售 + 每品类的同比变化
- 区域维度: 6 大区域 + 区域内 Top 3 城市
- 客户维度: 10 个核心客户的贡献排名
每个维度要选合适的图表(柱图 / 折线 / 饼图 / 雷达 / 排名表),不要全用一种.
主色 #0EA5E9,dark 模式.
底层数据用华东大区 Q1销售业绩, 多维度数据请合理虚拟扩展.
```

### Q7 · Hero 图片 + 新 overlay 同色 light (新 design 探索)

```
为【豆韵】精品咖啡店 Q1 销售年度回顾做页面.
Hero 区用我提供的咖啡门店实景图片做背景:
https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1600

重要:Hero 图片上 NOT 加白色蒙层(会显得糊).
请在图片上叠加一层 与页面背景同色 (var(--background)) 但低不透明度 (0.40-0.50)
的色块, 让 Hero 图片更自然融入页面,而不是漂浮在上面.
overlay 应该感觉像图片"沉入"页面背景, 而不是"被白色雾化".

底层数据用华东大区 Q1销售业绩.
主色 #D97706 橙棕, light 模式.
```

### Q8 · Hero 图片 + 新 overlay 同色 dark (新 design 探索)

```
【夜航】高端威士忌品牌 Q1 销售回顾页面.
Hero 用威士忌酒馆夜景图作为背景:
https://images.unsplash.com/photo-1572448862527-d3c904757de6?w=1600

Hero 图片上的 overlay 要求:
- 不要白色雾化, 不要 dim() / brightness 调整
- 用与 dark mode 页面背景同色 (var(--background)) 的深色低不透明度 (0.50-0.60) 叠加
- 让图片"融入"页面而不是"被覆盖"
- 文字要在图片上清晰可读 (通过 overlay + 文字本身字号对比)

底层数据用华东大区 Q1销售业绩.
主色 #C0392B 深红, dark 模式.
```

---

## Round-9 expected outcomes (8 NEW dimensions)

### N1 · Q1 复杂多要求 default routing + 美观度

| 维度 | Round-9 expected |
|---|---|
| AI prompt 路由 | doubao 出 default v1.2 风格 — clean / data-led skeleton / blue color / light mode |
| 美观度 | critic ≥ B (impeccable / design-taste-frontend / emil-design-eng) |
| 信息密度 | 5 个 KPI 全展示 + 城市排名 + SKU TOP 5 + 渠道占比 + 人员效率, 留白舒适, layout 不挤 |

### N2 · Q2 自相矛盾要求 default 鲁棒

| 维度 | Round-9 expected |
|---|---|
| Tone 一致性 | doubao 不"既要专业 + 又要温度" 出视觉混乱; 选一边 lean (推荐 default v1.2 偏专业克制) |
| Brand statement | Hero 区有 1 句 brand statement; **trigger check**: 是否误激活 Brand Narrative Spine (Q2 不是 brand-history query, 只是混合销售场景, 不应触发) |
| 美观度 | critic ≥ B |

### N3 · Q3 整页深红 + 金色 default 兜底能力

| 维度 | Round-9 expected |
|---|---|
| 兜底程度 | default v1.2 是 data-led skeleton, 不是 fixed style; **预期 doubao 出深红色作为 brand accent + light 模式数据 dashboard, 不会出整页朱红底 + 金色衬线** (那是 festive-royal-crimson 才能出) |
| Flag | Robustness Report §6 flag: "Q3 query 期待 festive 喜庆但 default 兜底为数据感蓝色 / 红色 dashboard, 推荐 user 实际场景切 festive-royal-crimson" |
| 美观度 | critic ≥ C+ (default 在不擅长场景的合理 ceiling) |

### N4 · Q4 朱砂洗 + 杂志感 default 兜底能力

| 维度 | Round-9 expected |
|---|---|
| 兜底程度 | default v1.2 不会出杂志 editorial 排版; **预期 doubao 出象牙底 + 朱砂红 accent + 数据 dashboard, 不会出 brutalist 黑色大字 + 西式编辑感** |
| Flag | Robustness Report §6 flag: "Q4 期待杂志感 + 朱砂 但 default 兜底为 light 数据 dashboard, 推荐切 festive-editorial-crimson" |
| 美观度 | critic ≥ C+ |

### N5 · Q5 大量 Mock + 多维组件选型

| 维度 | Round-9 expected |
|---|---|
| recharts 组件类型 count | 源码至少 2-3 个不同 recharts component (BarChart / LineChart / PieChart / RadarChart) + 1 table 形式 ranking, 不应只用 1 种 |
| 数据展示完整度 | TOP 20 城市排名 + 6 区域对比 + SKU TOP 15 + 12 月趋势 + 同比/环比/客单价, 至少 4/5 维度展示 |
| 美观度 | critic ≥ B-, layout 不挤 |

### N6 · Q6 大数据 + dark + 多 chart 鲁棒

| 维度 | Round-9 expected |
|---|---|
| recharts 组件类型 count | 至少 3 个不同 recharts component, 不只 1 种 |
| dark mode tooltip | **既有 v0.9 P-B2 + R-125 carry**: all Tooltip 用 inline mode-explicit hex, 不用 CSS var; dark mode Tooltip 文字可读 |
| 多 chart layout | 13 周 / 4 渠道 / 8 品类 / 6 区域 / 10 客户 至少 4/5 维度展示, 不堆栈 |
| 美观度 | critic ≥ B- |

### N7 · Q7 Hero 图片 light overlay 同色 (新 design 探索)

| 维度 | Round-9 expected |
|---|---|
| Overlay code | 源码 Hero 图片 overlay 用 `var(--background)` + opacity 0.40-0.50, NOT 白色 `#ffffff` / `rgba(255,255,255,...)` / `bg-white opacity-50` / 任何 dim() / brightness 滤镜 |
| Hero 视觉感 | 图片"融入"页面感觉, 非"白雾覆盖"; 文字在 overlay 上可读 |
| HARD GATE carry | v0.9 P-1-6 Hero image filter HARD GATE (forbidden CSS properties saturate/brightness/blur/hue-rotate/grayscale/sepia/drop-shadow) 不破坏 |
| 美观度 | critic ≥ B |

### N8 · Q8 Hero 图片 dark overlay 同色 (新 design 探索)

| 维度 | Round-9 expected |
|---|---|
| Overlay code | 源码 Hero 图片 overlay 用 `var(--background)` (dark resolved) + opacity 0.50-0.60, NOT 白色; dark mode 下 overlay 是深色低不透明度 |
| Hero 视觉感 | 夜景图与 dark mode 页面浑然一体, 不是"被白雾压平" |
| HARD GATE carry | 同上 v0.9 P-1-6 filter 禁令不破坏 |
| 美观度 | critic ≥ B |

### Cumulative Regression (Round-1/2/3/4/5/6/7/8 wins must carry)

| # | Win | Round-8 actual | Round-9 must keep |
|---|---|---|---|
| F-2 body color (subsumed V09-P0-3) | 6 (drift) | ≤ 8 |
| F-3 chart-hover OKLCH alpha | 0/8 hallucinate | 0/8 |
| S-1 framer-motion forbidden | 0/8 | 0/8 |
| S-2 useReducedMotion correct-path | 8/8 source-level | ≥ 6/8 |
| S-3 Q7 build+runtime | PASS | PASS |
| V10-P0-1A backplate fallback only | 0/8 | 0/8 |
| V10-P0-2A Hero size HARD inline | 5/5 build-PASS | ≥ 5/8 |
| V11-P0-1 wrapper height runtime | 3/3 render-PASS | ≥ 5/8 |
| AN invariant | 5/5 build-PASS | ≥ 6/8 |

### v1.2 R-128 patches carry (D3 + D4 expected hit rate)

| # | Round-9 NOT directly tested but cumulative | Expected |
|---|---|---|
| D3 brand-narrative trigger | Q1-Q8 都不带强 brand-history query, **不应误触发** | 0/8 误触 (B1 archetype 不出现于 source 中) |
| D4 testimonial trigger | Q1-Q8 都不带 customer-voice query, **不应误触发** | 0/8 误触 (B2 archetype 不出现于 source 中) |
| §13 trigger gate | default skeleton carry | 8/8 default Hero → KPI Cluster → Time Series → ... 骨架 |

---

## Step-by-step procedure (path swap v1.1 → v1.2; 8 Queries 全换; rest identical to Round-8)

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v1.2) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from legacy generate-prompt.txt 同 Round-8}

=== USER QUERY ===
{Q<N> 的 user query 文本}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8; do
  rm -rf "default-v1.2-Q${N}-attempt-1"
  mkdir -p "default-v1.2-Q${N}-attempt-1"
  cp -R running-env/. "default-v1.2-Q${N}-attempt-1/"
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v1.2-Q${N}-attempt-1" 2>&1 | tee "default-v1.2-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.2-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

Round-8 procedure unchanged. **Mandatory Hero region screenshot for ALL 8 Queries**:
- Q1-Q6: Hero focal number + KPI grid + 主 chart 区域
- **Q7/Q8: Hero 图片 + overlay 区域 (重点截图, N7/N8 verify focus)**

dark mode (Q6 + Q8) + BarChart Queries hover Tooltip 截图.

### Step 6 · Playwright DOM extraction

Round-8 procedure unchanged. + Round-9 NEW additions:

**Round-9 NEW · Hero 图片 overlay 检测 (N7/N8)**:

```javascript
// Hero image overlay detection
const heroSection = document.querySelector('section[class*=hero], section:first-of-type')
const heroImg = heroSection?.querySelector('img, [style*=background-image]')
const heroOverlay = heroSection?.querySelector('[class*=overlay], [style*=position:absolute]:not(img)')
const heroOverlayBg = heroOverlay ? getComputedStyle(heroOverlay).backgroundColor : null
const heroOverlayOpacity = heroOverlay ? getComputedStyle(heroOverlay).opacity : null
// 期望 (Q7 light): heroOverlayBg ≈ 'rgb(250, 251, 252)' (light --background) + opacity 0.4-0.5
// 期望 (Q8 dark): heroOverlayBg ≈ 'rgb(14, 17, 21)' (dark --background) + opacity 0.5-0.6
// FAIL: heroOverlayBg 含 'rgb(255, 255, 255)' (white) 或 opacity > 0.7

// Round-9 NEW · recharts 组件类型 count (N5/N6)
const allRechartsTypes = new Set()
document.querySelectorAll('[class*=recharts]').forEach(el => {
  const cls = el.className.baseVal || el.className
  if (typeof cls === 'string') {
    const match = cls.match(/recharts-(\w+)-/)
    if (match) allRechartsTypes.add(match[1])
  }
})
// 期望 (Q5/Q6): allRechartsTypes.size ≥ 2 (e.g. bar + line + pie)
```

### Step 6.5 · Round-9 source grep (CRITICAL)

Per attempt, source-side grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v1.2-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} source-code v1.2 carry + Round-9 NEW dimensions ==="

# v1.2 既有 patches carry (B1/B2 trigger 不应出现于 Q1-Q8, 因为没有 brand-history/customer-voice query)
B1_LEAK=$(grep -cE "Brand Narrative Spine|brand-history.*archetype|long-form prose paragraphs dominate" "$APP" || echo 0)
B2_LEAK=$(grep -cE "Testimonial-Threaded|alternating Stacked Band.*pairs a brief quote" "$APP" || echo 0)
echo "V12-B1 leak (期望 0): $B1_LEAK"
echo "V12-B2 leak (期望 0): $B2_LEAK"

# N5/N6 · recharts 组件类型 count (Q5/Q6 期望 ≥ 2)
RECHARTS_BAR=$(grep -cE "<BarChart|<Bar " "$APP" || echo 0)
RECHARTS_LINE=$(grep -cE "<LineChart|<Line " "$APP" || echo 0)
RECHARTS_AREA=$(grep -cE "<AreaChart|<Area " "$APP" || echo 0)
RECHARTS_PIE=$(grep -cE "<PieChart|<Pie " "$APP" || echo 0)
RECHARTS_RADAR=$(grep -cE "<RadarChart|<Radar " "$APP" || echo 0)
RECHARTS_TABLE=$(grep -cE "<table|<thead|<tbody" "$APP" || echo 0)
RECHARTS_TYPE_COUNT=$(( (RECHARTS_BAR>0) + (RECHARTS_LINE>0) + (RECHARTS_AREA>0) + (RECHARTS_PIE>0) + (RECHARTS_RADAR>0) + (RECHARTS_TABLE>0) ))
echo "N5/N6 · recharts/table 组件类型 count: $RECHARTS_TYPE_COUNT (Q5/Q6 期望 ≥ 2; bar=$RECHARTS_BAR line=$RECHARTS_LINE area=$RECHARTS_AREA pie=$RECHARTS_PIE radar=$RECHARTS_RADAR table=$RECHARTS_TABLE)"

# N7/N8 · Hero 图片 overlay 检测
OVERLAY_BG_VAR=$(grep -cE "(background|backgroundColor)[^,]*var\(--background\)" "$APP" || echo 0)
OVERLAY_WHITE=$(grep -cE "(background|backgroundColor)[^,]*(white|#fff|#ffffff|rgba\(255)" "$APP" || echo 0)
OVERLAY_DIM_FN=$(grep -cE "filter:.*dim\(|filter:.*brightness\([0-9.]+\)|filter:.*grayscale" "$APP" || echo 0)
echo "N7/N8 · overlay var(--background) carrier (Q7/Q8 期望 ≥ 1): $OVERLAY_BG_VAR"
echo "N7/N8 · overlay 白色雾化 (Q7/Q8 期望 0): $OVERLAY_WHITE"
echo "N7/N8 · dim/brightness filter (Q7/Q8 期望 0, v0.9 P-1-6 carry): $OVERLAY_DIM_FN"

# N3/N4 · 喜庆兜底验证 — 是否出 festive style 特征
NESTED_RED=$(grep -cE "#B22222|#DC143C|crimson|朱砂|金色|印章" "$APP" || echo 0)
NESTED_IVORY=$(grep -cE "ivory|象牙|#FFFDF7|#FAF8F0" "$APP" || echo 0)
echo "N3 · 深红 + 金色字面 (Q3 期望 ≥ 1): $NESTED_RED"
echo "N4 · 象牙底 + 朱砂 (Q4 期望 ≥ 1): $NESTED_IVORY"

# v1.0 R-124 carry
HERO_BACKPLATE=$(grep -cE "<div[^>]*backgroundColor.*var\(--surface-l[12]\)[^>]*>[^<]*<.*[Ff]ocal[Nn]umber" "$APP" || echo 0)
HERO_CLAMP=$(grep -cE "className=['\"][^'\"]*clamp\(|style.*fontSize.*clamp\(" "$APP" || echo 0)
echo "V10-P0-1A backplate (期望 0): $HERO_BACKPLATE"
echo "V10-P0-2A clamp Hero size (期望 0): $HERO_CLAMP"

# V11-P0-1 R-125 carry
HERO_MIN_H_SECTION=$(grep -cE "<section[^>]*min-h-\[" "$APP" || echo 0)
HERO_MIN_H_FULL=$(grep -cE "min-h-full|min-height:\s*100%" "$APP" || echo 0)
echo "V11-P0-1 · section min-h-[Xvh] count: $HERO_MIN_H_SECTION"
echo "V11-P0-1 · inner wrapper min-h-full: $HERO_MIN_H_FULL (期望 ≥1 if section min-h)"

# v0.9 patches carry
OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
PRIMARY_SOFT_AS_TEXT=$(grep -cE "color:\s*['\"]?var\(--primary-soft\)" "$APP" || echo 0)
NEGATIVE_CHROMA=$(grep -cE "oklch\([^)]*-[0-9]+\.[0-9]+" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
echo "V09-P0-A OKLCH comma residual (期望 0): $OKLCH_COMMA"
echo "V09-P0-3 F-2 <p> fg-2/3 inline (期望 ≤ 1): $BODY_FG2_INLINE"
echo "V09-P1-5 primary-soft as text (期望 0): $PRIMARY_SOFT_AS_TEXT"
echo "V09-P0-4 negative chroma OKLCH (期望 0): $NEGATIVE_CHROMA"
echo "V09-P1-6 img filter fn calls (期望 0): $IMG_FILTER_FN"

# AnimateNumber invariant
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
USE_REDUCED=$(grep -c "useReducedMotion" "$APP" || echo 0)
echo "AN-1 tabular-nums: $TNUM"
echo "AN-2 AnimateNumber instances: $ANIM_NUM"
echo "AN-3 useReducedMotion: $USE_REDUCED"

# Regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "Regression framer-motion (期望 0): $FM"
echo "Regression wildcard ui (期望 0): $WILDCARD"
```

### Step 7 · Design Skill 评分

Round-8 procedure: impeccable / design-taste-frontend / emil-design-eng + design-principles + motion-audit ×1.

Round-9 NEW per-Q evaluation prompt addendum:
- Q1: 评分 信息密度 vs 留白平衡 + 5 维度完整度 + 专业 tone
- Q2: 评分 conflicting 要求处理 + tone 一致性
- Q3: 评分 default 兜底深红场景的可读性 / 美观度(预期 C+ 不会到 A; flag 推荐 festive-royal)
- Q4: 评分 default 兜底朱砂场景(预期 C+; flag 推荐 festive-editorial)
- Q5: 评分 多维数据组件选型 + 信息架构清晰度
- Q6: 评分 多 chart + dark mode + tooltip + 信息密度
- Q7: 评分 Hero 图片 overlay 同色融入感 vs 白雾 (重点维度)
- Q8: 评分 Hero 图片 dark overlay 同色 + 文字可读性 (重点维度)

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.2_Round-9.md`

### 10 headline sections

#### 1. Round-9 NEW · 8 dimensions verdict (HEADLINE)

| # | Dimension | Q | Expected | Actual | Verdict |
|---|---|---|---|---|---|
| N1 | 复杂多要求 routing + 美观度 | Q1 | critic ≥ B, 5 维度展示 | … | PASS/PARTIAL/FAIL |
| N2 | 自相矛盾要求 default 鲁棒 | Q2 | tone 一致 + B1/B2 不误触 | … | PASS/PARTIAL/FAIL |
| N3 | 整页深红 + 金色 default 兜底 | Q3 | critic ≥ C+, flag 推荐 festive-royal | … | PASS/PARTIAL/FAIL |
| N4 | 朱砂洗 + 杂志感 default 兜底 | Q4 | critic ≥ C+, flag 推荐 festive-editorial | … | PASS/PARTIAL/FAIL |
| N5 | 大数据组件选型 | Q5 | recharts type ≥ 2, 4/5 维度展示 | … | PASS/PARTIAL/FAIL |
| N6 | 多 chart dark + tooltip 鲁棒 | Q6 | recharts type ≥ 3, dark tooltip 可读 | … | PASS/PARTIAL/FAIL |
| N7 | Hero 图片 light overlay 同色 | Q7 | var(--background) + 0.40-0.50, 0 白色 | … | PASS/PARTIAL/FAIL |
| N8 | Hero 图片 dark overlay 同色 | Q8 | var(--background) dark + 0.50-0.60, 0 白色 | … | PASS/PARTIAL/FAIL |

Headline: "Round-9 NEW N1-N8: <X>/8 PASS · <Y> PARTIAL · <Z> FAIL"

#### 2. v1.2 R-128 patches NOT trigger 验证 (B1/B2 不应误触发)

| # | Check | Round-9 |
|---|---|---|
| B1 Brand Narrative Spine leak in source | 0/8 期望 | actual |
| B2 Testimonial-Threaded leak in source | 0/8 期望 | actual |
| §13 default skeleton carry | 8/8 期望 | actual |

#### 3. Cumulative regression check (Round-1/2/3/4/5/6/7/8 wins)

#### 4. AnimateNumber 区域 0 改 invariant (R-120/R-123/R-124 三重 carry)

#### 5. Per-Query summary (Build · Runtime · 综合 R7/R8 → R9)

#### 6. **default v1.2 兜底场景 flag**(Q3 / Q4 是否需要 切 fixed style 才好看)

#### 7. **Hero 图片 overlay 新 design 收纳建议**(N7/N8 效果如果好,推荐 v1.3 收进 Design Prompt)

#### 8. New Stable Failures (≥ 2/8 in Round-9)

#### 9. Top patch suggestions for Cowork v1.3 (Chris 红线 + AN 不动 honored)

⚠️ R-124 carry: do NOT propose changes to AnimateNumber 区段(§4 line ~189 / §7 line ~271-293 / §17 line ~568-591).
⚠️ 若 N7/N8 效果好, propose v1.3 在 §14.1 / §15 加 "Hero image overlay HARD GATE: use var(--background) low-opacity, NEVER white". 但仅作 suggestion, 不动手.

#### 10. Convergence assessment

- **若 Round-9 N1-N8 ≥ 6/8 PASS + 0 new SF + AN invariant kept + B1/B2 0 误触 + Cumulative 全 carry**: **v1.2 锁定 production · 复杂 / 喜庆兜底 / 大数据 / 图片 overlay 能力 verified**, R-128 close
- **若 N7/N8 PASS + 其他 ≥ 4/8 PASS**: Hero image overlay 新 design 收纳到 v1.3, 推动 R-130
- **若 N3/N4 兜底 critic 远低于 C+**: default ceiling 真低于喜庆场景, 推荐 user 真实场景路由 fixed style (不动 default)
- **若 多 new SF 或 major regression**: 大 patch round

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-9-app-tsx" "$DST/Round-9-screenshots" "$DST/Round-9-critic" "$DST/Round-9-source-grep"

for N in 1 2 3 4 5 6 7 8; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.2-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-9-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8; do
  for stage in t0 stable tooltip hero-region hero-overlay; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-9-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.2-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-9-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-9-source-grep/Q${N}.txt" || true
done

echo "--- Round-9 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-9-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-9-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-9-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-9-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v1.2_Round-9.md" ] && echo present || echo MISSING)"
```

Expected: ~70-90 files total.

---

## Self-check (before reporting back)

- [ ] Prerequisites verified (A v1.2 639 行 + B sandbox + C Round-8 report)
- [ ] Pre-test red-line: R-128 14 SHOULD-APPEAR ≥1 + 11 SHOULD-DISAPPEAR = 0 + v1.1 22 must-exist ≥1 + R-125/R-124/v0.9 12 carry ≥1 + AnimateNumber 6 sentinels ≥1 + forbidden 11 = 0 + engineering red-line 6 = 0
- [ ] 8 Queries generate-prompt.txt 各独立 (Q1-Q8 全新场景)
- [ ] 8 doubao calls 全跑
- [ ] 每个 build-PASS 跑了 build + playwright + DOM (含 Round-9 NEW heroOverlayBg/opacity + recharts types count) + Step 6.5 source-grep (含 Round-9 NEW N1-N8)
- [ ] Mandatory Hero region screenshot for ALL 8 + **Q7/Q8 Hero overlay 重点截图**
- [ ] dark mode Q6+Q8 + BarChart Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥ 3 design skills + motion-audit ×1, 含 Round-9 NEW per-Q evaluation addendum
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 Round-9 NEW N1-N8 八项都填 verdict + evidence
- [ ] §3 cumulative regression 9 项填
- [ ] §6 default 兜底 flag (Q3 / Q4 是否切 fixed style)
- [ ] §7 Hero overlay 新 design 收纳建议 (N7 / N8 效果好 → propose v1.3)
- [ ] §10 Convergence assessment 给明确判断
- [ ] §9 patch suggestions 严守 Chris 工程红线 + R-120/R-123/R-124 AN 不动
- [ ] cp-to-vault tally ~70-90

---

## Output to Chris on completion

```
doubao default v1.2 生成测试 Round-9 (复杂 / 喜庆 / 大数据 / 图片 overlay) complete.

Design Prompt under test: default v1.2 (639 lines, frozen — R-128 fix · 2 new archetypes + §13 trigger gate + 泛用性精修)
Round-8 baseline: Robustness-Report_default-v1.1_Round-8.md
Round-9 report  : Robustness-Report_default-v1.2_Round-9.md

Pre-test red-line verify: <PASS/FAIL>
- R-128 14 SHOULD-APPEAR + 11 SHOULD-DISAPPEAR: <PASS/FAIL>
- v1.1 22 must-exist + R-125/R-124/v0.9 carry: <PASS/FAIL>
- AnimateNumber 6 sentinels: <PASS/FAIL>
Engineering red-line: <PASS/FAIL>

Round-9 NEW · N1-N8 verdict:
  N1 Q1 复杂多要求 routing + 美观度: <PASS/PARTIAL/FAIL>
  N2 Q2 自相矛盾要求 default 鲁棒 + B1/B2 不误触: <PASS/PARTIAL/FAIL>
  N3 Q3 整页深红 + 金色 default 兜底: <PASS/PARTIAL/FAIL>
  N4 Q4 朱砂洗 + 杂志感 default 兜底: <PASS/PARTIAL/FAIL>
  N5 Q5 大数据组件选型 (recharts type ≥ 2): <PASS/PARTIAL/FAIL>
  N6 Q6 多 chart dark + tooltip 鲁棒 (recharts type ≥ 3): <PASS/PARTIAL/FAIL>
  N7 Q7 Hero 图片 light overlay 同色 (新 design): <PASS/PARTIAL/FAIL>
  N8 Q8 Hero 图片 dark overlay 同色 (新 design): <PASS/PARTIAL/FAIL>

Headline: "Round-9 NEW N1-N8: <X>/8 PASS · <Y> PARTIAL · <Z> FAIL"

v1.2 R-128 patches NOT trigger verify (B1/B2 不应误触):
  B1 Brand Narrative Spine leak in source: <N>/8 (期望 0)
  B2 Testimonial-Threaded leak in source: <N>/8 (期望 0)
  §13 default skeleton carry: <N>/8 (期望 8)

AnimateNumber 区域 0-改 invariant (R-120 + R-123 + R-124 三重 carry):
  AN-1 ~ AN-4: <MAINTAINED/REGRESSED>

Cumulative regression (Round-1 ~ Round-8 wins):
  F-2 / F-3 / S-1 / S-2 / S-3 / V10-P0-1A / V10-P0-2A / V11-P0-1 / AN invariant: <list 各项 status>

Per-Query summary (Build · Runtime · 综合):
  Q1-Q8 …

Build pass rate: <N>/8 (R8: 5/8)
Effective render-pass rate: <N>/8 (R8: 3/8)

New Stable Failures (≥ 2/8) after v1.2 复杂 / 喜庆 / 大数据 / 图片 overlay:
  <list, or "none — clean run">

default 兜底 flag (§6):
  Q3 整页深红 + 金色: <default 兜底 critic 评分 + 是否推荐切 festive-royal-crimson>
  Q4 朱砂洗 + 杂志感: <default 兜底 critic 评分 + 是否推荐切 festive-editorial-crimson>

Hero 图片 overlay 新 design 收纳建议 (§7):
  N7 light overlay 同色 效果: <good/partial/bad>
  N8 dark overlay 同色 效果: <good/partial/bad>
  收纳建议: <YES (v1.3 加进 §14.1/§15) / NO (维持 user query 引导)>

Top patch suggestions for Cowork v1.3 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored):
  <listed in report §9>

Convergence assessment:
  <v1.2 PRODUCTION-VERIFIED (复杂/喜庆兜底/大数据/图片 overlay 4 维度通过) / 推 R-130 v1.3 加 Hero overlay HARD GATE / 大 patch round>

Artifacts cp'd: <N> files in reports/Round-9-* subdirs.

If Round-9 N1-N8 ≥ 6/8 PASS + 0 new SF + AN invariant kept + B1/B2 0 误触 + Cumulative 全 carry: v1.2 production-verified, R-128 close.
If N7/N8 effect good: propose v1.3 add Hero image overlay HARD GATE.
Else: substantive patch round.
```

不 commit / 不 push — Cowork 接手 review.

## 触发词

开始。
