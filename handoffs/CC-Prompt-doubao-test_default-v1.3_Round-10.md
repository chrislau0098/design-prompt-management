# CC-Prompt · doubao Generation Test · default v1.3 · Round-10 · 美观度 + 复杂场景 stress (9 全新 Query)

你是 **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (你): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates evidence into v1.4 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

## Round-10 主目标:**v1.3 综合美观度 + 复杂场景生成 stress test**

R-9 测的是 R-128 D3/D4 fix · 1:1 R-8 baseline 对比。**R-10 换方向**:由 QA sub-Agent 出全新 9 个 Query,覆盖 R-7/R-8/R-9 没测的高价值维度,stress test v1.3 在新场景下的:
1. **整体美观度效果** — 视觉品质 / 信息架构 / 留白节奏 / typography hierarchy
2. **复杂场景生成稳定性** — 复杂 query 下 doubao 是否仍稳定产出
3. **R-9 baseline 全 carry**(V11 wrapper / Hero overlay / B1/B2 / AN / R-124 / v0.9 等 cumulative regression)

**测试维度框架**(QA sub-Agent 出题轴):
- **广度 (Breadth)** — 全换新行业:NGO 公益 / 医疗 / 政府路演 / 制造业 / K12 教育 / 跨国集团 / 学术 / 跨文化美式
- **深度 (Depth)** — 极简零信号 / 反范式硬约束 / 隐性约束 + 数据缺失 / 高信息密度紧致字号
- **厚度 (Thickness)** — 4 线并行(数据 + 故事 + 证言 + 时间线)/ 三维 cross-tab + 中英双币种 / 跨 3 时间维度 + 跨 audience / 大引言 Hero 反范式

⚠️ **Chris 红线 carry**:Design Prompt patch suggestion 不能含 `import` / 包名 / 构建工具 / 框架名 / Tailwind 工具类细节 / HTML 元素硬约束.

⚠️ **R-120 + R-123 + R-124 AnimateNumber 不动 三重 carry**:§4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段一字不动.

⚠️ **§15 既有 `hero_image_url` dial reference 历史 leak** flag for v1.4 单独 patch · 本 round 仅 observation.

---

## Prerequisites

### A · Design Prompt v1.3
Verify:`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md` exists, **641 lines** (v1.2 baseline 639 · R-130 净增 +2 · V13-P0-A line 462 + V13-P0-B line 460 + frontmatter id/name/description rewrite).

### B · Sandbox env (unchanged)
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C · Round-9 baseline (cumulative regression carry)
Read once:`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.2_Round-9.md`

If any prerequisite fails, stop & hand back to Cowork.

---

## Round-10 specifics

- **Design Prompt under test**:default v1.3 (frozen, 641 lines · R-130 fix · §14.1 line 460 V11 + line 462 Hero overlay + frontmatter id/name/description routing)
- **N attempts**:1 per Query × **9 Queries** = 9 generations
- **doubao config**:temperature 0.7, max_tokens 32000
- **Bitable mock**:华东大区 Q1销售业绩 KPI (28 records) — **same as R-7/8/9** · Query 可要求 doubao 合理虚拟扩展其他维度
- **Working directory**:`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/`
- **Attempt folders**:`default-v1.3-Q{1..9}-attempt-1/`
- **Report destination**:`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.3_Round-10.md`

---

## Pre-test red-line verify

```bash
V13="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md"

echo "--- 行数(期望 641)---"
wc -l "$V13"

echo "--- R-130 V13-P0-A + V13-P0-B SHOULD-APPEAR (各 ≥1) ---"
for p in 'For image-background Hero' 'overlay fill discipline per §15' 'sealed overlay rule' 'never white veil' 'EVERY intermediate layout container' "section's height floor" 'every link in the chain' "section's true bottom"; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "--- R-130 SHOULD-DISAPPEAR (工程化引用应消失, 各 = 0) ---"
for p in 'When `hero_image_url` active' 'EVERY DOM ancestor' 'root wrapper, padding wrapper' 'min-h-full.*min-height: 100%'; do
  printf "  %-50s : %s\n" "$p" "$(grep -cE "$p" "$V13")"
done

echo "--- frontmatter id + name + description rewrite ---"
head -6 "$V13"

echo "--- v1.2 R-128 patches carry (各 ≥1) ---"
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Testimonial-Threaded' 'Default composition skeleton assumes data-led' 'explicitly matches'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "--- §15 既有 sealed overlay rule carry as-is (各 ≥1) ---"
for p in 'Overlay numbers are sealed' '25% top → 50% bottom MAX' '45% top → 70% bottom MAX' 'Adaptive dim overlay'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V13")"
done

echo "--- AnimateNumber zone sentinel (R-120/R-123/R-124, 各 ≥1) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-60s : %s\n" "${sentinel:0:55}" "$(grep -cE "$sentinel" "$V13" || echo 0)"
done

echo "--- forbidden (各 = 0) ---"
for p in '✅' '❌' '🔥' '💡' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V13")"
done

echo "--- Chris engineering red-line (各 = 0) ---"
for p in '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V13")"
done
```

Expect:行数 = 641 · R-130 SHOULD-APPEAR 8 项 ≥1 · SHOULD-DISAPPEAR 4 项 = 0 · 既有 patches carry · AN 5 sentinels ≥1 · forbidden + 红线全 0. 任何 fail 立即 stop.

---

## 9 User Queries (QA sub-Agent 出题 · 覆盖广度/深度/厚度 · 全新)

### 测试维度矩阵

| Q | 主轴 | 次轴 | 难度 | 重点测什么 |
|---|------|------|------|----------|
| Q1 | 广度(NGO 公益)| 深度(反销售语境 + 隐性 tone)| 中 | 公益场景克制商业感 + sales→捐赠 semantic mapping |
| Q2 | 广度(医疗医院)| 深度(严谨监管 + 字号紧致)| 高 | 医疗严肃 vs default 克制基调张力 + 数字精度 |
| Q3 | 广度(政府路演)| 厚度(跨 3 时间 + 跨 audience)| 高 | 历史+当下+未来长跨度 + 路演 tone 校准 |
| Q4 | 深度(极简零信号)| 广度(无任何信号)| 中 | default 在零信号 query 下 fallback 美观度 |
| Q5 | 深度(反范式硬约束)| 广度(制造业)| 高 | 用户硬说"不要 KPI grid + 不要大数字 Hero" |
| Q6 | 厚度(4 线并行)| 深度(信息密度极高)| 极高 | 数据+故事+证言+时间线 同页交织 |
| Q7 | 厚度(三维 cross-tab)| 广度(跨国集团)| 极高 | SKU×渠道×区域 + 双币种 + 中英混排 |
| Q8 | 深度(隐性约束 + 数据缺失)| 厚度(学术 tone)| 极高 | "正式"implies no emoji + Q2 数据未出占位处理 |
| Q9 | 厚度(反常规 Hero + 跨文化)| 广度(周报短期)| 极高 | Hero 用大引言 + 中英混排 + 美式短促 tone |

难度梯度:1 中(Q4)+ 1 中(Q1)+ 3 高(Q2/Q3/Q5)+ 4 极高(Q6/Q7/Q8/Q9)

### Q1 · 广度(NGO 公益)+ 深度(反销售语境)· 中

```
我们是【清水未来基金会】一家专注农村饮用水改造的公益 NGO,需要做一份 2025 Q1 项目成效汇报页面给我们的捐赠方.

底层数据用华东大区 Q1销售业绩,但请把语义改写:把"销售额"对应映射到"捐赠总额"、"门店数"映射到"受益村庄数"、"客户数"映射到"受益人数",其他指标语义自然延伸.

文案要克制 + 有温度,但不要 corporate spin,不要"感谢您的支持"这种套话.报告对象是高净值捐赠方,他们要看的是钱怎么花了 + 落地了什么.

主色 #0F766E 深青(代表水),light 模式.信息密度不要太高,留白要够,公益气质.
```

**期望**:保留 sales→捐赠 semantic mapping(§2 data semantic preservation HARD 测试点),不堆 KPI grid,文案克制不油,深青色低饱和兜底美观度 ≥ B.

### Q2 · 广度(医疗)+ 深度(严谨监管)· 高

```
【仁泽医院】三甲综合医院 2025 Q1 运营报告页面,提交医院董事会 + 卫健委备案双用途.

数据维度:
- 门诊量 + 住院量 + 手术量 + 平均住院天数 + 床位利用率(合理虚拟到华东大区 Q1销售业绩 数据骨架)
- 重点科室(心血管 / 神经外科 / 肿瘤)Q1 业务量对比
- 患者满意度(NPS 替代物)
- 同期医生人均接诊量 / 教学科研产出

风格要求:严谨、专业、监管可接受,不要任何 marketing 腔,不要 emoji.数字精度要高(小数点后 2 位).文案保持医疗行业的严肃克制 tone,避免"突破""引领""领先"等营销动词.

主色 #1E3A8A 医疗深蓝,light 模式.信息密度可以高一点(医院董事会能消化).字号要紧致(要塞下足够细节,留白可以适度压缩).
```

**期望**:医疗严谨场景下保持 default 克制(不渲染 marketing 词),数字精度处理 + dense density 倾向但仍守 §5 间距规则,美观度 ≥ B.

### Q3 · 广度(政府路演)+ 厚度(跨 3 时间 + 跨 audience)· 高

```
【长三角先进制造产业园】2025 Q1 招商引资业绩 + 2020-2025 五年回顾 + 2026-2030 五年展望.

这份页面三个用途叠加:
- 给省发改委的年度备案
- 给地方人大代表年度履职检查
- 给国际投资人的路演说明

数据:
- 历史:2020-2025 累计入驻企业数 / 累计 GDP 贡献 / 累计税收
- 当下:2025 Q1 新增企业 / Q1 投资额 / Q1 就业岗位(用华东大区 Q1销售业绩 mock)
- 未来:2026-2030 规划目标(合理虚拟)

文案要 sober、正式、有公信力,既能给政府看(中文政府公文 tone),也能转译给海外投资人(但本版本是中文).

主色 #7F1D1D 中国红,light 模式.要有"长跨度时间线"的视觉感.
```

**期望**:Sequence/Timeline archetype + 三段时间分区,sober 中国红低饱和兜底,跨 audience 不混乱,美观度 ≥ B-.

### Q4 · 深度(极简零信号)+ 广度 · 中

```
帮我做个 Q1 销售战报,数据用华东大区 Q1销售业绩.
```

**期望**:零信号 fallback 测试,doubao 走 default geometric → mesh shader + blue 默认色 + light 模式 + balanced density,凭 default skeleton 出干净作品,美观度 ≥ B(default 看家本领).

### Q5 · 深度(反范式硬约束)+ 广度(制造)· 高

```
【晟达精工】高端精密机械制造商 Q1 销售战报.

非常规要求(这些是硬约束,请严格遵守):
- 不要 KPI grid(任何 2×2 / 2×3 / 3×3 大数字网格都不要)
- 不要大数字 Hero(Hero 区不要 200px 焦点数字 + AnimateNumber)
- 数据穿插在叙事里,不堆栈
- 用工厂车间的视觉语言:精密、严谨、机械、克制
- 不要 emoji 不要任何"热血"措辞

数据用华东大区 Q1销售业绩(合理映射到机械零件销售).

主色 #44403C 工业灰棕,light 模式.
```

**期望**:doubao 跳出默认 Hero / KPI Grid skeleton — 理想出 Insights (Sequence Track) Hero + 长 prose + 数据 inline 句中.若死守默认 skeleton 则 PARTIAL.美观度 ≥ B-.

### Q6 · 厚度(4 线并行)+ 深度 · 极高

```
【向阳教育】K12 教培机构 Q1 复盘 + 2024 创业 5 周年回顾页面.

四条线同页交织,不能割裂分板块:
1. 数据线:Q1 营收 / 学员数 / 续费率 / 客单价(用华东大区 Q1销售业绩)
2. 故事线:创始人 5 年前从一间教室起步的过程(请合理虚构 3-4 个关键节点)
3. 证言线:挑 3 个家长 + 2 个老师的话穿插
4. 时间线:5 年关键事件 timeline,Q1 落在时间线终点

这四条线要交织铺陈,不能是"数据板块→故事板块→证言板块→时间线板块"四个 section.要有节奏地切换 voice — 数据 → 故事一段 → 数据 → 证言 → 时间线节点 → 数据 → 证言.

主色 #CA8A04 暖琥珀,light 模式.信息密度高但不要让人窒息,留白节奏要稳.
```

**期望**:极端厚度测试 — §12/§13 archetype 组合能力 — 理想是 Brand Narrative Spine + Testimonial-Threaded + Sequence Track 同页融合.极考验 doubao composition 能力.美观度 ≥ B-.

### Q7 · 厚度(cross-tab)+ 广度(跨国集团)· 极高

```
【环球电子 Global Electron】跨国电子消费品集团 2025 Q1 全球业绩报告页面.

数据要求三维 cross-tab 同页呈现(合理虚拟扩展华东大区 Q1销售业绩):
- 维度 1:SKU - 8 个核心产品线(笔记本 / 手机 / 平板 / 耳机 / 显示器 / 智能手表 / 路由器 / 充电桩)
- 维度 2:渠道 - 4 个(旗舰店 / 经销商 / 电商 / B2B)
- 维度 3:区域 - 6 个(北美 / 欧洲 / 中国 / 东南亚 / 中东 / 拉美)

需要让 viewer 一眼看到:
- 哪个 SKU 在哪个区域哪个渠道最强
- 跨区域的同 SKU 表现差异
- 跨渠道的同 SKU 表现差异

币种:主要用 USD ($),关键中国数据保留 CNY (¥) 平行显示.
语言:中英混排 — SKU 名称英文,叙事中文,产品线 label 中英都有.

主色 #075985 深海蓝,light 模式.信息密度极高(这是给集团 CFO 看的),字号紧致.
```

**期望**:多维 cross-tab + 多种 recharts 组件混用(heatmap/grouped bar/table)+ 中英排版兼容 + 双币种处理.美观度 ≥ B-,组件类型 ≥ 3.

### Q8 · 深度(隐性约束 + 数据缺失)+ 厚度(学术 tone)· 极高

```
【南粤大学经管学院】2025 春季学期市场营销系教学科研期中工作汇报页面,用于系务会议 + 院学术委员会双议程.

汇报内容:
- 上学期(2025 Q1)教学工作量分布(用华东大区 Q1销售业绩 数据骨架,合理映射到教师课时 / 学生数 / 助教时数)
- 教师科研产出(合理虚拟:论文数 / 期刊级别分布 / 经费到账)
- 学生培养:本研生人数 + 论文产出
- 本学期(2025 Q2)数据还在统计中,请适当占位说明(不能编造未出的数据)

文案要求:学术 sober tone,符合大学系务报告的克制语气,严禁 marketing 措辞,严禁口语化.数字呈现要严谨(统计来源标注 / 数据时点标注).

主色 #1F2937 学术深灰,light 模式.留白要够(学术汇报不堆砌).
```

**期望**:数据缺失占位处理(§16 Empty State + Loading skeleton 实际应用)+ 学术 sober tone(隐性约束 implies no emoji / no spin / 数据时点标注).美观度 ≥ B.

### Q9 · 厚度(反常规 Hero + 跨文化)+ 广度(周报)· 极高

```
[ONE-LINER WEEKLY] 【StarShip Coffee 星舰咖啡】is a US-based specialty coffee chain. This is the Week-12 (Q1 final week) US ops short-form report.

Hero is NOT a number, NOT a chart, NOT an image. Hero is a single large quote: "We sold 47,000 cups this week, but the real story is the one barista in Seattle who broke our personal best 3 days in a row." — that quote IS the Hero.

Below the Hero quote, weekly numbers in supporting role:
- Total cups / total revenue / new stores / barista retention rate (虚拟扩展华东大区 Q1销售业绩 数据骨架到 weekly granularity)
- One trend line: 12-week cup count
- Three barista shoutouts (with names)

Tone: direct American business English, no fluff, like a Stripe Annual Letter weekly cousin. Mix Chinese in: top metric labels can be 中英 mixed (e.g. "Cups Sold 杯数").

Primary color #92400E warm coffee brown, light mode. Compact density — this is a weekly, not annual.
```

**期望**:Hero 用大引言取代数字 / 图表(极端反范式),跨文化中英混排排版,周报短周期 + dense density.美观度 ≥ B-,关键看 doubao 能否把"quote as Hero"理解到位.

---

## Round-10 expected outcomes (M1-M9 per-Query + Cumulative R-9 carry)

### M1-M9 · 9 Query 美观度 + 复杂场景生成 verdict

| # | Query 主题 | 核心 verify metric | 期望 |
|---|----------|-----------|------|
| M1 | Q1 NGO 公益 + sales→捐赠 semantic | source grep "捐赠 / 受益村庄 / 受益人数" ≥ 3 词替换 + critic ≥ B | semantic mapping PASS · 克制公益气质 |
| M2 | Q2 医疗严谨 + 数字精度 | source grep `.toFixed(2)` 或类似精度处理 + critic ≥ B · 0 marketing 词(突破 / 引领 / 领先)| 严谨 tone PASS |
| M3 | Q3 政府跨 3 时间 + 跨 audience | source grep `<section>` 或 `<div>` 数 ≥ 5(三段时间 + audience 切换)+ Timeline archetype + critic ≥ B- | 长跨度时间线 + sober 中国红 PASS |
| M4 | Q4 极简零信号 baseline | critic ≥ B · 行数 / KPI 数 / Hero shape 跟其他 Query 对照看 default skeleton 自洽程度 | default 看家本领 ≥ B |
| M5 | Q5 反范式硬约束 | source grep `grid grid-cols-[34]` count = 0(no KPI grid)+ Hero Display Number font-size ≤ 96px(no big focal number)+ critic ≥ B- | doubao 跳出 default skeleton PASS |
| M6 | Q6 4 线并行 | `<blockquote>` ≥ 3(证言)+ `<p>` ≥ 80 chars desktop ≥ 5(故事 prose)+ `<table>` 或 timeline-related markup(时间线)+ critic ≥ B- | 4 线交织(非割裂)PASS |
| M7 | Q7 三维 cross-tab + 中英 + 双币种 | source grep `\$[0-9]` + `¥[0-9]` ≥ 2(双币种)+ 中英混排 (Chinese char + English word in same `<p>`) + recharts type ≥ 3 + critic ≥ B- | 多维数据 + 双币种 + 中英 PASS |
| M8 | Q8 数据缺失 + 学术 tone | source grep 占位标识(待统计 / 数据未出 / TBD / N/A / 估计 / 暂未)≥ 1 + critic 学术 tone ≥ B + 0 emoji + 数字时点标注(2025 Q1 截至 / 截至 YYYY-MM) | 占位处理 + 学术 sober PASS |
| M9 | Q9 大引言 Hero + 跨文化 | source grep Hero 区 `<blockquote>` 或大字号 `<h1>`/`<h2>` 句子(quote 句式)出现且 Hero 不含 200px Display Number + 中英混排 in metric labels + critic ≥ B- | quote-as-Hero PASS + 跨文化 PASS |

Headline:"R-10 M1-M9: `<X>/9 PASS · <Y> PARTIAL · <Z> FAIL`"

### Cumulative Regression (R-9 baseline 全 carry)

| # | R-9 baseline | R-10 期望 |
|---|------------|-----------|
| V11-P0-1 wrapper height floor PASS | 6/8 R-9(Q1 contentTop=0.069 FAIL) | ≥ 8/9 R-10(v1.3 V13-P0-B 强化后)|
| Hero overlay 同色(Q7-light 等同 image Hero query R-9 baseline maintain)| N7/N8 PASS | maintain in any image Hero scene(Round-10 不一定有 image Hero)|
| B1/B2 trigger 不误触 | 0/8 R-9 | **特别注意**:Q1 NGO 公益 + Q6 4 线并行(含证言)可能触发 B1/B2 — 看 Q6 是否合理路由到 Testimonial-Threaded archetype |
| AnimateNumber 三重锁 carry | 8/8 maintained | maintain ≥ 8/9(Q5 反 Hero 数字 + Q9 反 Hero 数字 例外允许 AN 不出现)|
| V10 R-124 patches carry | 全 carry | 全 carry |
| v0.9 14 处 patches carry | 全 carry | 全 carry |

### §15 既有 dial leak observation (carry for v1.4)

R-10 期间观察 doubao 输出中是否引入不同 image transport 路径的兼容性问题. 仅 observation, 不在 R-10 patch suggestion 范围.

---

## Step-by-step procedure

### Step 1 · 构造 generate-prompt.txt (per Query)

Overwrite `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate-prompt.txt`:

```
You are a senior React engineer. Strictly follow EVERY rule in the Design Prompt below.

Output requirements:
- One single React file at src/App.tsx
- TypeScript
- Wrap final code in a SINGLE ```tsx fence

=== DESIGN PROMPT (default v1.3) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.3.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from legacy generate-prompt.txt 同 R-9}

=== USER QUERY ===
{Q<N> 的 user query 文本 - 9 全新 Query 见上}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8 9; do
  rm -rf "default-v1.3-Q${N}-attempt-1"
  mkdir -p "default-v1.3-Q${N}-attempt-1"
  cp -R running-env/. "default-v1.3-Q${N}-attempt-1/"
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v1.3-Q${N}-attempt-1" 2>&1 | tee "default-v1.3-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8 9; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.3-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

**Mandatory Hero region screenshot for ALL 9 Queries**. 特殊场景重点截图:
- Q5 反范式硬约束:Hero 区 + KPI 区 (verify no big number + no KPI grid)
- Q6 4 线并行:整页 scroll (verify 4 线交织非割裂)
- Q7 三维 cross-tab:数据 chart 区域 (verify 多种 recharts 类型)
- Q8 数据缺失:占位区域 (verify Empty State / TBD 标识)
- Q9 大引言 Hero:Hero 区 (verify quote-as-Hero 大字号 vs Display Number)
- dark mode Queries(无 — 9 个 Query 都 light mode)
- BarChart Queries hover Tooltip 截图

### Step 6 · Playwright DOM extraction + Step 6.5 source grep

Per attempt source grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`.

**核心 metrics per Query** (M1-M9 verify):

```bash
cd "default-v1.3-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} R-10 v1.3 verify ==="

# === Cumulative R-9 carry ===
SECTION_MIN_H=$(grep -cE "<section[^>]*min-h-\[" "$APP" || echo 0)
WRAPPER_MIN_H_FULL=$(grep -cE "min-h-full|min-height:\s*100%" "$APP" || echo 0)
echo "V11 · section min-h + wrapper carry: $SECTION_MIN_H / $WRAPPER_MIN_H_FULL"

HERO_BACKPLATE=$(grep -cE "<div[^>]*backgroundColor.*var\(--surface-l[12]\)[^>]*>[^<]*<.*[Ff]ocal[Nn]umber" "$APP" || echo 0)
HERO_INLINE_SIZE=$(grep -cE "className=['\"][^'\"]*text-\[[0-9]+px\][^'\"]*['\"]|style.*fontSize.*['\"]?[0-9]+px" "$APP" || echo 0)
HERO_CLAMP=$(grep -cE "className=['\"][^'\"]*clamp\(|style.*fontSize.*clamp\(" "$APP" || echo 0)
OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
echo "V10-P0-1A backplate (期望 0): $HERO_BACKPLATE"
echo "V10-P0-2A Hero inline font-size: $HERO_INLINE_SIZE · clamp (期望 0): $HERO_CLAMP"
echo "V09-P0-A OKLCH comma (期望 0): $OKLCH_COMMA"
echo "V09-P0-3 F-2 <p> fg-2/3 inline (期望 ≤ 1): $BODY_FG2_INLINE"
echo "V09-P1-6 img filter fn (期望 0): $IMG_FILTER_FN"

B1_LEAK=$(grep -cE "Brand Narrative Spine|brand-history.*archetype" "$APP" || echo 0)
B2_LEAK=$(grep -cE "Testimonial-Threaded|alternating Stacked Band.*pairs a brief quote" "$APP" || echo 0)
echo "R-128 B1 leak (Q1-Q5 / Q7-Q9 期望 0;Q6 4 线并行可能 ≥ 1 合理): $B1_LEAK"
echo "R-128 B2 leak (Q1-Q5 / Q7-Q8 期望 0;Q6 / Q9 含证言 quote 可能 ≥ 1 合理): $B2_LEAK"

HERO_IMAGE_URL_LEAK=$(grep -cE "When .hero_image_url. active|hero_image_url.*dial" "$APP" || echo 0)
DOM_ANCESTOR_LEAK=$(grep -cE "EVERY DOM ancestor|root wrapper, padding wrapper" "$APP" || echo 0)
echo "R-130 hero_image_url leak in source (期望 0): $HERO_IMAGE_URL_LEAK"
echo "R-130 DOM ancestor enumerate leak (期望 0): $DOM_ANCESTOR_LEAK"

# AnimateNumber invariant (Q5/Q9 反 Hero 数字场景允许 ≤ 1)
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
echo "AN-1 tabular-nums: $TNUM · AN-2 AnimateNumber instances: $ANIM_NUM"

# Regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "framer-motion (期望 0): $FM · wildcard ui (期望 0): $WILDCARD"

# === M1-M9 per-Query 特征 metric ===

# M1 (Q1) · NGO sales→捐赠 semantic mapping
M1_DONATION=$(grep -cE "捐赠|受益|公益|村庄" "$APP" || echo 0)
M1_SALES=$(grep -cE "销售额|GMV|销售业绩|营业额" "$APP" || echo 0)
echo "M1 Q1 · 捐赠语义 (期望 ≥ 3): $M1_DONATION · 销售语义残留 (期望 ≤ 1): $M1_SALES"

# M2 (Q2) · 医疗精度 + 0 marketing 词
M2_PRECISION=$(grep -cE "\.toFixed\(2\)|toFixed\(1\)" "$APP" || echo 0)
M2_MARKETING=$(grep -cE "突破|引领|领先|卓越|开创" "$APP" || echo 0)
echo "M2 Q2 · 数字精度处理: $M2_PRECISION · marketing 词残留 (期望 0): $M2_MARKETING"

# M3 (Q3) · 跨 3 时间 + 跨 audience
M3_SECTIONS=$(grep -cE "<section" "$APP" || echo 0)
M3_TIMELINE=$(grep -cE "2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030" "$APP" | head -1 || echo 0)
echo "M3 Q3 · section count (期望 ≥ 5): $M3_SECTIONS · 时间维度年份覆盖: $M3_TIMELINE"

# M5 (Q5) · 反范式硬约束 verify
M5_KPI_GRID=$(grep -cE "grid grid-cols-[34]|grid-cols-\[3-4\]" "$APP" || echo 0)
M5_BIG_NUMBER=$(grep -cE "text-\[1[5-9][0-9]px\]|text-\[2[0-9][0-9]px\]" "$APP" || echo 0)
echo "M5 Q5 · KPI grid usage (期望 0): $M5_KPI_GRID · big Hero number 150px+ (期望 0): $M5_BIG_NUMBER"

# M6 (Q6) · 4 线并行
M6_BLOCKQUOTE=$(grep -cE "<blockquote|className=['\"][^'\"]*quote" "$APP" || echo 0)
M6_LONG_P=$(grep -cE "<p[^>]*>.{60,}</p>" "$APP" || echo 0)
echo "M6 Q6 · blockquote count (期望 ≥ 3): $M6_BLOCKQUOTE · long prose <p> ≥ 60 chars (期望 ≥ 5): $M6_LONG_P"

# M7 (Q7) · 三维 cross-tab + 双币种 + 中英
M7_USD=$(grep -cE "\\\$[0-9]" "$APP" || echo 0)
M7_CNY=$(grep -cE "¥[0-9]|￥[0-9]" "$APP" || echo 0)
M7_CHARTS=$(grep -cE "<BarChart|<LineChart|<AreaChart|<PieChart|<RadarChart" "$APP" || echo 0)
echo "M7 Q7 · USD signal (期望 ≥ 2): $M7_USD · CNY signal (期望 ≥ 2): $M7_CNY · recharts type count: $M7_CHARTS"

# M8 (Q8) · 数据缺失占位 + 学术 tone
M8_PLACEHOLDER=$(grep -cE "待统计|数据未出|TBD|N/A|暂未|估计|尚未" "$APP" || echo 0)
M8_EMOJI=$(grep -cE "[\xF0\x9F]" "$APP" 2>/dev/null || echo 0)
echo "M8 Q8 · 占位标识 (期望 ≥ 1): $M8_PLACEHOLDER · emoji (期望 0 学术 tone): $M8_EMOJI"

# M9 (Q9) · 大引言 Hero + 跨文化
M9_HERO_QUOTE=$(grep -cE "Hero[^<]*<blockquote|<blockquote[^>]*Hero" "$APP" || echo 0)
M9_HERO_BIG_NUMBER=$(grep -cE "Hero[^<]*text-\[1[5-9][0-9]px\]|Hero[^<]*<AnimateNumber" "$APP" || echo 0)
M9_MIXED_LANG=$(grep -cE "[一-龥][A-Z]|[A-Z][一-龥]" "$APP" 2>/dev/null || echo 0)
echo "M9 Q9 · Hero quote (期望 ≥ 1): $M9_HERO_QUOTE · Hero 大数字残留 (期望 0): $M9_HERO_BIG_NUMBER · 中英混排: $M9_MIXED_LANG"
```

### Step 7 · Design Skill 评分

每个 build-PASS attempt 派 ≥ 3 design skills (impeccable / design-taste-frontend / emil-design-eng) + design-principles + motion-audit ×1.

**R-10 per-Query evaluation focus**:
- Q1: NGO 公益克制气质 + sales→捐赠 semantic mapping 正确性
- Q2: 医疗严谨 tone + 数字精度 + 0 marketing 词
- Q3: 长跨度时间线视觉 + sober 中国红 + 跨 audience 不混乱
- Q4: default 零信号兜底 baseline 美观度
- Q5: 反范式跳出 default skeleton + 工厂车间气质
- Q6: 4 线交织非割裂 + composition rhythm
- Q7: 多维数据 + 双币种 + 中英排版兼容
- Q8: 占位处理 + 学术 sober tone + 数据时点标注
- Q9: quote-as-Hero + 跨文化 tone + dense weekly density

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to:`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.3_Round-10.md`

### 10 headline sections

#### 1. R-10 M1-M9 9 Query verdict (HEADLINE)

| # | Query 主题 | Expected | Actual | Verdict |
|---|----------|----------|--------|---------|
| M1 | Q1 NGO sales→捐赠 semantic | 捐赠语义 ≥ 3 + critic ≥ B | … | PASS/PARTIAL/FAIL |
| M2 | Q2 医疗严谨 + 数字精度 | 精度处理 + 0 marketing 词 | … | PASS/PARTIAL/FAIL |
| M3 | Q3 跨 3 时间 + 跨 audience | section ≥ 5 + Timeline | … | PASS/PARTIAL/FAIL |
| M4 | Q4 极简零信号 baseline | critic ≥ B | … | PASS/PARTIAL/FAIL |
| M5 | Q5 反范式硬约束 | 0 KPI grid + 0 big Hero number | … | PASS/PARTIAL/FAIL |
| M6 | Q6 4 线并行 | blockquote ≥ 3 + long-p ≥ 5 | … | PASS/PARTIAL/FAIL |
| M7 | Q7 cross-tab + 双币种 + 中英 | USD ≥ 2 + CNY ≥ 2 + recharts ≥ 3 | … | PASS/PARTIAL/FAIL |
| M8 | Q8 数据缺失 + 学术 tone | 占位 ≥ 1 + 0 emoji + 数据时点 | … | PASS/PARTIAL/FAIL |
| M9 | Q9 大引言 Hero + 跨文化 | Hero quote ≥ 1 + 0 Hero 大数字 + 中英 | … | PASS/PARTIAL/FAIL |

Headline:"R-10 M1-M9: `<X>/9 PASS · <Y> PARTIAL · <Z> FAIL`"

#### 2. Cumulative Regression (R-9 baseline carry)

| # | R-9 baseline | R-10 actual | Verdict |
|---|------------|------------|---------|
| V11-P0-1 wrapper height floor | 6/8 (Q1 contentTop=0.069 FAIL) | … | … |
| V10 R-124 patches | 全 carry | … | … |
| v0.9 14 处 | 全 carry | … | … |
| AN 三重锁 | 8/8 maintained | … | … |
| B1/B2 trigger 不误触(Q6 4 线 / Q9 quote 例外允许)| 0/8 (R-9) | … | … |
| R-130 V13-P0-A/B leak in source | N/A (R-130 新) | 期望 0 | … |

#### 3. 美观度 critic 综合评分 (per-Query)

#### 4. Per-Query summary (Build · Runtime · 综合)

#### 5. New Stable Failures (≥ 2/9 in R-10)

#### 6. §15 既有 dial leak observation (carry for v1.4)

#### 7. Top patch suggestions for Cowork v1.4 (Chris 红线 + R-120/R-123/R-124 AN 不动 honored)

⚠️ R-124 carry:do NOT propose changes to AnimateNumber 区段.
⚠️ R-130 fix carry:不动 §14.1 line 460 / line 462 v1.3 patches.
⚠️ v1.4 候选范围:§15 既有 dial transport leak 统一重写 transport-agnostic.

#### 8. Routing test follow-up (R-132 候选)

R-130 frontmatter description rewrite 强化 Main Agent routing 准确性 — 但 generation pipeline 直接 cat design prompt 不走 routing.R-132 候选 single-shot routing test:模拟 Main Agent + 注入 7 description + 测路由准确率.

#### 9. 维度分布观察

记录 9 个 Query 在广度 / 深度 / 厚度三轴的实际生成表现差异 — 哪些轴是 v1.3 强项 / 哪些是弱项.

#### 10. Convergence assessment

- **若 M1-M9 ≥ 7/9 PASS + cumulative 全 carry + 0 new SF**:**v1.3 STRESS-VERIFIED, R-130 closes. Recommend R-132 routing test + R-133 v1.4 transport-agnostic §15.**
- **若 M1-M9 5-6/9 PASS**:小 follow-up R-131 micro patch (聚焦最 fail 维度)
- **若 M1-M9 < 5/9 PASS 或 cumulative 多 regression**:大 patch round

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-10-app-tsx" "$DST/Round-10-screenshots" "$DST/Round-10-critic" "$DST/Round-10-source-grep"

for N in 1 2 3 4 5 6 7 8 9; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.3-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-10-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8 9; do
  for stage in t0 stable tooltip hero-region hero-overlay; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-10-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8 9; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.3-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-10-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8 9; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-10-source-grep/Q${N}.txt" || true
done

echo "--- Round-10 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-10-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-10-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-10-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-10-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v1.3_Round-10.md" ] && echo present || echo MISSING)"
```

Expected:~80-100 files (9 Query × 多 stage 截图).

---

## Self-check

- [ ] Prerequisites verified (A v1.3 641 行 + B sandbox + C R-9 report)
- [ ] Pre-test red-line:R-130 SHOULD-APPEAR 8 项 ≥1 · SHOULD-DISAPPEAR 4 项 = 0 · 既有 patches carry · AN 5 sentinels ≥1 · forbidden + 红线 全 0
- [ ] 9 Queries 字面 verbatim 复用 handoff(QA sub-Agent 出题)
- [ ] 9 doubao calls 全跑
- [ ] 每个 build-PASS 跑 build + playwright + DOM + Step 6.5 source-grep (含 M1-M9 per-Query metrics)
- [ ] Q1 NGO / Q2 医疗 / Q3 政府 / Q4 极简 / Q5 反范式 / Q6 4 线 / Q7 cross-tab / Q8 学术 / Q9 大引言 9 个特征截图全
- [ ] 每个 build-PASS ≥ 3 design skills + motion-audit ×1, 含 Round-10 per-Q evaluation focus
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 M1-M9 9 Query verdict 完整
- [ ] §2 Cumulative regression 全填(尤其 R-130 V13-P0-A/B leak 0 / B1 B2 trigger 合理)
- [ ] §10 Convergence assessment 给明确判断
- [ ] §7 patch suggestions 严守 Chris 工程红线 + AN 不动 + §15 dial leak 仅 observation
- [ ] §8 routing test follow-up flag for R-132
- [ ] §9 维度分布观察(广度 / 深度 / 厚度三轴的生成表现差异)
- [ ] cp-to-vault tally ~80-100

---

## Output to Chris on completion

```
doubao default v1.3 生成测试 Round-10 (美观度 + 复杂场景 stress · QA 9 全新 Query) complete.

Design Prompt under test: default v1.3 (641 lines, frozen · R-130 fix)
R-9 baseline: Robustness-Report_default-v1.2_Round-9.md
R-10 report: Robustness-Report_default-v1.3_Round-10.md

Pre-test red-line verify: <PASS/FAIL>

R-10 M1-M9 9 Query verdict (HEADLINE):
  M1 Q1 NGO sales→捐赠 semantic: <PASS/PARTIAL/FAIL>
  M2 Q2 医疗严谨 + 数字精度: <PASS/PARTIAL/FAIL>
  M3 Q3 跨 3 时间 + 跨 audience: <PASS/PARTIAL/FAIL>
  M4 Q4 极简零信号 baseline: <PASS/PARTIAL/FAIL>
  M5 Q5 反范式硬约束: <PASS/PARTIAL/FAIL>
  M6 Q6 4 线并行: <PASS/PARTIAL/FAIL>
  M7 Q7 cross-tab + 双币种 + 中英: <PASS/PARTIAL/FAIL>
  M8 Q8 数据缺失 + 学术 tone: <PASS/PARTIAL/FAIL>
  M9 Q9 大引言 Hero + 跨文化: <PASS/PARTIAL/FAIL>

Headline: R-10 M1-M9: <X>/9 PASS · <Y> PARTIAL · <Z> FAIL

Cumulative regression (R-9 baseline carry):
  V11-P0-1 wrapper height floor: <N>/9 (R-9: 6/8)
  V10 R-124 patches: <verdict>
  v0.9 14 处 patches: <verdict>
  AN 三重锁: <maintained/regressed>
  B1/B2 trigger 不误触 (Q6/Q9 例外允许): <list>
  R-130 V13-P0-A/B leak in source: <0/9 期望>

Per-Query 美观度 critic 综合:
  Q1-Q9 critic 评分 + tone

Build pass rate: <N>/9
Effective render-pass rate: <N>/9

New Stable Failures (≥ 2/9):
  <list, or "none">

维度分布观察 (广度 / 深度 / 厚度三轴生成表现差异):
  <highlights>

§15 既有 dial leak observation (carry for v1.4):
  <observation, or "no observable issue this round">

Top patch suggestions for Cowork v1.4 (Chris 红线 + AN 不动 honored):
  <listed in report §7>

Routing test follow-up (R-132 候选):
  <description rewrite 强化已 land in v1.3 frontmatter, single-shot routing test 待 R-132 跑>

Convergence assessment:
  <v1.3 STRESS-VERIFIED · R-130 closes / R-131 micro patch / 大 patch round>

Artifacts cp'd: <N> files in reports/Round-10-* subdirs.

If M1-M9 ≥ 7/9 PASS + cumulative 全 carry + 0 new SF: v1.3 stress-verified, R-130 closes.
推 R-132 (routing test) + R-133 (v1.4 §15 transport-agnostic).
```

不 commit / 不 push — Cowork 接手 review.

## 触发词

开始。
