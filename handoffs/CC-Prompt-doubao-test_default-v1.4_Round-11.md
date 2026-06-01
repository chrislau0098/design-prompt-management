# CC-Prompt · doubao Generation Test · default v1.4 · Round-11 · 4 维度 stress + V11 source 一致性 verify

你是 **Robustness Test Runner** in the Generator-Evaluator-Decision triangle.
- Generator: doubao Code (`doubao-seed-2-0-code-preview-260215`)
- Evaluator (你): run, observe, diagnose
- Decision-maker: Cowork (上游) — translates evidence into v1.5 patches (if any)

You do not propose Design Prompt patch wording. You produce a Robustness Report with evidence; Cowork translates evidence into patches.

## Round-11 主目标:**V14-P0-A V11 source 一致性 verify + Chris 4 维度 stress test**

R-10 实测发现:
- v1.3 V13-P0-B (R-130 去工程化) 失效: 9/9 source 中 `min-h-full` count = 0 (vs v1.2 R-125 baseline 3/8)
- Q2/Q3/Q7 Hero 内容贴顶 1/3 真实视觉 bug
- 9/9 Query 全 light 是测试题集 bug (dark shell 跑版误判)

R-11 关键变化:
- **Design Prompt**: v1.3 → v1.4 (R-133 V14-P0-A `inline parenthetical (via Tailwind \`min-h-full\` or CSS \`min-height: 100%\`)`)
- **测试题集**: 9 全新 Query (QA sub-Agent 重出, Chris 4 维度: 暗黑 + 纯色彩背景 + 喜庆 + 复杂数据)
- **Mode 分布**: **4 light + 5 dark** (不再 9/9 全 light · 修测试 bug)

### Chris 明确的 4 个测试维度

1. **复杂数据是否能正常展示** — 多 archetype 拼接 / 多维 cross-tab / 时序数据
2. **关键词风格匹配** — query 含强风格关键词 (春节 / 暗夜 / impact / editorial), default 兜底 ceiling
3. **用户定制特殊主题** — Hero shader / font_family / brand color hex / lightness_shift / heroimg URL
4. **重点维度**: 暗黑 + 纯色彩背景 + 喜庆 (Chris 反复强调)

⚠️ **Chris 红线 carry**: Design Prompt patch suggestion 不能含 `import` / 包名 / 构建工具 / 框架名 / Tailwind 工具类完整串 / HTML 元素硬约束 (carry R-130 边界判定原则).

⚠️ **R-120 + R-123 + R-124 AnimateNumber 不动 三重 carry**: §4 line ~187-194 / §7 line ~271-293 / §17 line ~568-591 整段不动.

⚠️ **§15 既有 `hero_image_url` dial leak** — flag for v1.5, R-11 仅 observation.

---

## Prerequisites

### A · Design Prompt v1.4
Verify: `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md` exists, **641 lines** (v1.3 baseline 641 · R-133 V14-P0-A inline parenthetical · 净增 0 行 · 严格 = 641).

### B · Sandbox env (unchanged)
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/generate.py`
- `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/running-env/AGENT.md`
- `ARK_API_KEY` env var set

### C · Round-10 baseline (cumulative regression carry)
Read once: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.3_Round-10.md`

If any prerequisite fails, stop & hand back to Cowork.

---

## What changed v1.3 → v1.4 (R-133 patch summary)

| # | Line | Type | v1.3 → v1.4 essence |
|---|------|------|---------------------|
| **V14-P0-A** | §14.1 line 462 既有 V13-P0-B 句中 | **inline parenthetical Tailwind hint** | "propagate the section's height floor" 之后行内追加 `(via Tailwind \`min-h-full\` or CSS \`min-height: 100%\`)` — 多路径 disjunction hint, 不绑定 element / framework / className 串 |

矫正 R-130 V13-P0-B 过度去工程化 (R-10 实测 9/9 source min-h-full = 0).

§14.1 R-125 / R-128 / R-130 V13-P0-A + §15 sealed overlay + R-128 archetypes + AnimateNumber 三段全 carry.

---

## Pre-test red-line verify

```bash
V14="/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md"

echo "--- 行数(期望严格 = 641)---"
wc -l "$V14"

echo "--- R-133 V14-P0-A SHOULD-APPEAR (各 ≥ 1) ---"
for p in 'via Tailwind' 'min-h-full' 'min-height: 100%' 'or CSS'; do
  printf "  %-30s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "--- inline parenthetical exact match ---"
grep -nE "propagate the section's height floor \(via Tailwind .min-h-full. or CSS .min-height: 100%.\)" "$V14"

echo "--- R-130 V13-P0-A line 462 cross-ref carry (各 ≥ 1) ---"
for p in 'For image-background Hero' 'overlay fill discipline per §15' 'sealed overlay rule' 'never white veil'; do
  printf "  %-45s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "--- R-130 V13-P0-B design language carry (各 ≥ 1) ---"
for p in 'EVERY intermediate layout container' "section's height floor" 'every link in the chain' "content stacks at section's upper 1/3"; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "--- frontmatter 4 字段 carry ---"
head -6 "$V14"

echo "--- v1.2 R-128 patches carry (各 ≥ 1) ---"
for p in 'Default skeleton stays data-led' 'narrow gate, not default' 'Brand Narrative Spine' 'Testimonial-Threaded' 'Default composition skeleton assumes data-led' 'explicitly matches'; do
  printf "  %-50s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "--- §15 既有 sealed overlay rule carry (各 ≥ 1) ---"
for p in 'Overlay numbers are sealed' '25% top → 50% bottom MAX' '45% top → 70% bottom MAX' 'Adaptive dim overlay'; do
  printf "  %-55s : %s\n" "$p" "$(grep -c "$p" "$V14")"
done

echo "--- AnimateNumber zone sentinel (R-120/R-123/R-124, 各 ≥ 1) ---"
for sentinel in 'Apply length-based conditional className on Display Number' 'parseDisplayValue.*split Bitable formatted strings' 'inline-flex items-baseline gap-1 whitespace-nowrap' '"tnum" 1, "lnum" 1' 'AnimateNumber renders each digit position into a fixed-width'; do
  printf "  %-60s : %s\n" "${sentinel:0:55}" "$(grep -cE "$sentinel" "$V14" || echo 0)"
done

echo "--- forbidden (各 = 0) ---"
for p in '✅' '❌' '🔥' '💡' 'Inspired by' 'Last updated' 'Source provenance' 'EXAMPLE'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V14")"
done

echo "--- Chris engineering red-line (各 = 0) ---"
for p in '@/components/ui' 'pnpm ' 'package\.json' 'npm install' 'src/views' 'createElement.*link'; do
  printf "  %-22s : %s\n" "$p" "$(grep -cE "$p" "$V14")"
done
```

Expect: 行数 = 641 · V14-P0-A 4 项 ≥ 1 · 既有 carry · AN 5 sentinels ≥ 1 · forbidden + Chris 红线 全 0. 任何 fail 立即 stop.

---

## 9 User Queries (R-11 QA sub-Agent 重出 · Chris 4 维度)

底层数据全部用相同的华东大区 Q1销售业绩 KPI mock data (28 records). Query 可要求 doubao 合理虚拟扩展.

### 测试维度矩阵 (QA sub-Agent 设计)

| Q | 主维度 | 次维度 | mode | 难度 | 重点 |
|---|--------|--------|------|------|------|
| Q1 | 暗黑 + 纯色彩背景 | 关键词匹配 (春节 ceremonial) | dark | 高 | dark + 高饱和 brand color + ceremonial routing |
| Q2 | 喜庆 + 纯色彩背景 | 用户定制 (font + lightness_shift) | light | 高 | 整页金红 + ceremonial routing + lightness_shift dial |
| Q3 | 复杂数据 + 暗黑 | 多 archetype 拼接 | dark | 高 | 6 KPI + 趋势 + 分布 + 排行 + quote 拼接 |
| Q4 | 用户定制 (dithering) + 暗黑 | technical routing | dark | 高 | 显式指定 dithering shader + fintech 时序 |
| Q5 | 喜庆 (西式编辑朱砂) | 关键词匹配 | light | 高 | default 兜底 festive-editorial-crimson |
| Q6 | 纯色彩背景 + 暗黑 | 用户定制 brand hex | dark | 高 | 整页深紫 + 高饱和 brand + dark L 不破 |
| Q7 | 复杂数据 + 关键词匹配 | impact routing | light | 中高 | 电竞 + impact 兜底 + 大字号 hierarchy |
| Q8 | 用户定制 (Hero image URL) | warmth routing | light | 中 | heroimg URL + warmth routing + sealed overlay |
| Q9 | 暗黑 + 关键词匹配 | editorial routing | dark | 中高 | dark + editorial 衬线 fidelity |

**Light/Dark 分布**: 4 light (Q2/Q5/Q7/Q8) + 5 dark (Q1/Q3/Q4/Q6/Q9) = 9

**覆盖统计**: 暗黑 5 Q · 纯色彩背景 3 Q · 喜庆 3 Q · 复杂数据 4 Q · 关键词匹配 5 Q · 用户定制 5 Q.

---

### Q1 · 暗黑 + 纯色彩背景 + ceremonial routing · dark · 高

```
我们公司 (杭州的一家国货茶饮品牌「朱砂茶馆」) 要做 2026 春节战报, 春节假期 7 天的旗舰店业绩.

整体氛围我希望是中国风庆典感, 暗黑模式 (不是 light mode), 整页背景就用深朱红 #8B1A1A, 字色用金色或浅米色, 字体用东方礼仪感的衬线 (Songti / 仿宋类), 不要现代 SaaS 那种几何无衬线.

数据 (春节 7 天合计): 总销售额 ¥1,847 万 (vs 2025 春节 ¥1,234 万, ▲ 49.7%), 客单价 ¥87.5, 进店人数 21.1 万人次, 现制茶饮订单占比 72%, 节庆礼盒订单占比 28%, 新会员注册 3.4 万人.

按日拆: 除夕 ¥162 / 初一 ¥298 / 初二 ¥315 / 初三 ¥302 / 初四 ¥287 / 初五 ¥251 / 初六 ¥232 万 (单位都是万元).

文案风格希望庄重一点, 不要互联网促销腔, 用"恭贺新春 · 朱砂茶馆 2026 年新春战报"做标题.
```

**期望**: dark mode + ceremonial font_family routing + brand #8B1A1A → primaryL 0.42-0.52 OKLCH · Hero shader mesh dark band L 0.115-0.480 · 整页 background 必须 L ≤ 0.16 (HARD invariant, 不论用户字面要求整页朱红底) · ChapterStamp ceremonial `◆ NN ◆` variant · 字体 EB Garamond + Zhuque Fangsong + Ma Shan Zheng.

### Q2 · 喜庆 + 纯色彩背景 + 用户定制 (font + lightness_shift) · light · 高

```
帮我做一个国潮品牌「金鹿百货」的 2026 春节大促战报, light mode 浅底版本.

我希望整页有非常强的中式喜庆 / 朝代庄重感: 主色用朱红 #C92A2A, 字体走衬线 + 毛笔字 (ceremonial 风格), 文字风格"端庄、富丽". 同时 lightness_shift = +20, 我想要朱红更亮一点.

数据 (春节大促 14 天):
- GMV ¥8,420 万 (▲ 32.1% vs 2025)
- 订单 23.1 万单, 客单价 ¥365
- TOP 5 品类: 黄金首饰 / 春节礼盒 / 红酒 / 中式服饰 / 茶具
- 黄金首饰单品类销售 ¥2,180 万, 占比 25.9%
- 新客占比 38%, 老客复购率 41%

加一句开篇 lead: "鹿鸣春至, 万象更新", 引用一段品牌话术.
```

**期望**: light mode (background L ≥ 0.95 invariant) · ceremonial routing · brand #C92A2A → primaryL clamp(pL + 0.20×0.15, 0.30, 0.70) · lightness_shift 仅作用 --primary 和 chart, 不影响 background · 字体 EB Garamond + Ma Shan Zheng · ChapterStamp `◆ NN ◆`.

### Q3 · 复杂数据 + 暗黑 + 多 archetype 拼接 · dark · 高

```
我是 SaaS B2B 增长平台「Pulse Cloud」的数据 PM, 要 dark mode 季度战报 (2026 Q1). 颜色用钴蓝 #1E40AF.

数据非常多, 想一页讲清楚整个季度:
- 6 个核心 KPI: ARR ¥2.34 亿 (▲ 28%) / MRR ¥1,950 万 (▲ 31%) / Net New ARR ¥4,200 万 / GRR 91.2% / NRR 117.5% / 付费客户数 1,247
- 2 个时间趋势: ARR 月度增长 (Jan/Feb/Mar 三个月数据) + 客户数月度新增 (1, 2, 3 月各自的新签 / 流失 / 净增)
- 1 个客户分布: 按 ARR 段位划分 — <¥10万 占 23% / ¥10-50万 占 41% / ¥50-200万 占 28% / >¥200万 占 8%
- 1 个 TOP 5 行业排行: 金融 ¥6,800 万 / 零售 ¥4,500 万 / 制造 ¥3,200 万 / 教育 ¥2,800 万 / 物流 ¥1,950 万
- 1 段 CSM 团队负责人原话: "Q1 NRR 跨过 115% 是个里程碑, 但流失集中在 SMB 段需要警惕"

文案 tone 数据 PM 视角, 客观克制, 不要"伟大胜利"那种营销话术.
```

**期望**: dark mode · geometric routing (SaaS / 增长) · brand #1E40AF · 6 KPI Cluster Matrix Grid + Time Series Stacked Band + Proportion Field + Ranking Stacked Band + Quote Interstitial 拼接 · 严格 ChapterStamp `01 · ` geometric variant · hairline cadence + density rotation · AnimateNumber 不超过 3 per section.

### Q4 · 用户定制 (dithering) + 暗黑 + technical routing · dark · 高

```
帮我做一份「LedgerX」(去中心化金融衍生品交易所) 的 2026 Q1 链上交易数据战报.

我想要非常工程师 / 数据中心仪表盘的视觉: 暗夜 dark mode, Hero shader 走 dithering (8x8 simplex 那种, 不要 mesh / grain), 字体用 JetBrains Mono / 等宽字体感, 主色用电光蓝 #3B82F6, 数字感 + tnum 表格数字非常重要.

数据 (Q1 链上, 量级很大):
- 季度交易量 $42.3B (▲ 87% YoY) — 这是 Hero 主数字
- 季度活跃地址数 1.27M
- 平均日 TPS 3,452
- 总交易笔数 8.4M 笔
- 季度协议费收入 $89.5M
- 按链分布: Ethereum $24.5B (58%) / Arbitrum $9.1B (21%) / Base $4.8B (11%) / Optimism $3.9B (9%) / Polygon $0.7B (1.6%)
- 月度 TPS 趋势: Jan 3,120 / Feb 3,450 / Mar 3,785, 平均 3,452
- 24h Top 10 大额清算列表 (each: 地址前 8 位 + 清算金额 + 清算时间), 数据较多, 想以列表方式呈现

文案 tone 工程师 / 数据基础设施视角.
```

**期望**: dark mode · technical routing (数据中心 / 链上 / TPS) · Hero shader = dithering (用户显式) · colorFront L 0.420 C 0.040 + colorBack L 0.155 C 0.010 · 字体 JetBrains Mono + IBM Plex Mono · ALL-CAPS h2 允许 · `tnum` 每个 AnimateNumber inline · 清算列表 Ranking Matrix Grid.

### Q5 · 喜庆 + 关键词匹配 (festive-editorial-crimson 兜底) · light · 高

```
我们是一家文化出版品牌「朱砂书房」, 做 2026 春季季刊回顾.

视觉感觉我希望是: **西式编辑 brutalist 海报感** + **朱砂渗染** + **象牙底**. 字体走衬线 (EB Garamond / Source Han Serif), 大黑字主导版面, 朱砂红 #B83A3A 作为节庆点缀和情绪洗染, 整体氛围像艺术杂志季刊 / 文化季报. light mode.

数据 (2026 Q1):
- 季度图书发行 23 万册 (▲ 18.4% vs 2025 Q1)
- 数字订阅会员 4.7 万人
- 季度专栏发表 142 篇
- 文化讲座举办 28 场, 累计参与 1.2 万人次
- 最受欢迎专栏 Top 3: 「朱砂笔记」(阅读 187 万 PV) / 「书房随笔」(132 万 PV) / 「编辑手记」(98 万 PV)
- 一段主编寄语: "在算法时代, 我们守住手工编辑的尊严, 朱砂渗染的不是页眉, 是态度"

文案 tone 文艺 + 文化季刊编辑感, 不要数据 PM 报表腔.
```

**期望**: light mode · editorial routing (文艺 / 出版 / 杂志 / 编辑) · brand #B83A3A · Hero shader mesh + editorial preset · 字体 Spectral + EB Garamond + Noto Serif SC · ChapterStamp editorial 大斜体衬线 outline 数字 variant · default 兜底是否能接近 festive-editorial-crimson 朱砂洗 fidelity 70%.

### Q6 · 纯色彩背景 + 暗黑 + 用户定制 brand hex · dark · 高

```
做一份「Aurora Cosmetics」(高端美妆品牌) 的 2026 双 11 战报.

暗黑模式 dark mode, 主色用深紫罗兰 #4C1D95 (这是品牌色, 必须精确 honor, 别 fallback 到中性紫或偏蓝紫), Hero 用 mesh shader 那种渐变云雾感 (不要 dithering / grain). font_family 走 editorial (我想要文艺杂志感而非 SaaS).

数据 (双 11 期间 14 天):
- GMV ¥3,420 万 (▲ 42.1% YoY) — Hero 主数字
- 订单 8.2 万单, 客单价 ¥417
- 头部 SKU: Aurora 紫罗兰精华 (¥1,250 万, 占比 36.5%) / 玫瑰金口红 (¥620 万) / 香槟雾面腮红 (¥480 万) / 暮光眼影盘 (¥360 万) / 极光卸妆水 (¥210 万)
- 新客占比 47.3%, 老客复购率 39.8%
- 直播间累计观看 1.2 亿次, 平均停留时长 4.2 分钟
- 24h GMV 峰值: 11/11 00:00-01:00 ¥385 万

文案 tone 高端美妆品牌叙事, 略文艺.
```

**期望**: dark mode (background L ≤ 0.16 HARD, 不论 brand hex 多高饱和) · editorial routing · brand #4C1D95 OKLCH 解析 → primaryL dark +0.10 偏移 · mesh shader L 0.115-0.48 dark band · 字体 Spectral + EB Garamond · ChapterStamp editorial 大斜体衬线 outline · 验证 default 不会因为"用户说要紫色"break dark background L invariant.

### Q7 · 复杂数据 + 关键词匹配 (impact routing 兜底) · light · 中高

```
帮我做「闪电杯 2026 春季赛」(国内电竞联赛) S1 半决赛阶段战报, light mode.

视觉风格我想要硬核 / 电竞 / 速度感 / 工业 / 力量, 大字号粗体, 略带 brutalist 工业感, 主色用赛事色 #DC2626 (亮红).

数据 (S1 半决赛阶段 — 5 天 4 场比赛):
- 4 场半决赛总观众数 1.84 亿人次 (▲ 67% YoY)
- 单场最高峰值同时在线 870 万 (Match 3, BLG vs JDG)
- 4 场比赛总击杀数 1,247 (平均每场 311.75)
- MVP 选手: Knight (BLG), 个人 KDA 18.7, 输出占比 31.2%
- 4 场赛果:
  - Match 1: BLG 3-1 LNG (用时 2h 41min, 总击杀 287)
  - Match 2: JDG 3-2 EDG (用时 3h 15min, 总击杀 342)
  - Match 3: BLG 3-2 JDG (用时 3h 02min, 总击杀 318)
  - Match 4: BLG vs JDG 决赛 待定
- 累计直播弹幕量 8,420 万条
- 周边商品销售额 ¥4,200 万

文案 tone 电竞主播解说感, 偏激情但有数据支撑, 不要 PM 报表腔.
```

**期望**: light mode · impact routing (电竞 / 硬核 / 力量) · brand #DC2626 · Hero shader mesh + impact preset · 字体 Bebas Neue + Anton + Smiley Sans · weight ceiling 800 · ALL-CAPS h2 允许 · ChapterStamp impact 巨型粗体数字 · 数据语义保真 (KDA 不改名).

### Q8 · 用户定制 (Hero image URL) + warmth routing · light · 中

```
做一份「小石溪咖啡」(精品咖啡连锁) 2026 年中报. Light mode, 暖意品牌氛围.

视觉走温暖 / 治愈 / 生活方式 / 圆润 (warmth 风格), 主色琥珀橙 #F59E0B, 字体走 Nunito + 霞鹜文楷 那种圆润 / 人文感.

Hero 用图片背景 (不要 shader), 图片 URL: https://cdn.xiaoshixi.com/2026-annual-report/hero-cafe.jpg

数据 (2026 上半年):
- 全国门店数 287 家 (▲ 42 vs 2025 末)
- 新开门店 47 家, 关停 5 家
- 上半年咖啡杯数 1,247 万杯 (▲ 23.1%)
- 客单价 ¥38.5
- 会员数 184 万 (▲ 31%)
- TOP 5 城市: 上海 (62 家) / 北京 (48 家) / 杭州 (39 家) / 成都 (28 家) / 广州 (25 家)
- 单店日均杯数: 一线城市 412 杯 / 新一线 285 杯 / 二线 198 杯
- 单店月均营收: 一线 ¥48 万 / 新一线 ¥31 万 / 二线 ¥22 万
- 创始人寄语 (一段, ~80 字)

文案 tone 暖意品牌 + 创始人讲故事感, 像生活方式品牌报告.
```

**期望**: light mode · warmth routing (温暖 / 治愈 / 生活方式 / 咖啡) · brand #F59E0B · Hero 走 image archetype (heroimg URL → shader 自动忽略) · `<img>` 严禁 filter · sealed overlay rule light mode 25% top → 50% bottom MAX · Hero 焦点 number ≥ 4.5:1 落在 overlay 加深下半部 · 字体 Nunito + LXGW WenKai TC.

### Q9 · 暗黑 + 关键词匹配 (editorial routing) · dark · 中高

```
做一份「黑曜石季刊」(独立文化出版品牌) 2026 春刊回顾, 我特别想要 dark mode 版本 — 想测试一下黑底配衬线字体的文艺杂志感.

视觉走 editorial / 杂志 / 印刷 / 古典 / 出版 风格, 字体必须是大量衬线 (EB Garamond / Spectral / Source Han Serif), 主色用编辑橙 #EA580C (作为节点强调而非全页底色).

数据 (2026 春刊 — 单期):
- 春刊累计印量 8.4 万册 (▲ 23.5% vs 2025 春刊)
- 数字阅读 PV 327 万 (▲ 41.2%)
- 平均阅读时长 8.7 分钟 (单篇)
- 编辑团队 14 人, 季刊收稿 1,287 篇, 入选 47 篇 (录用率 3.65%)
- TOP 3 专栏阅读量: 「夜读」187 万 / 「书札」98 万 / 「黑曜石访谈」62 万
- 季刊广告营收 ¥187 万 (vs 2025 春刊 ¥142 万, ▲ 31.7%)
- 主编寄语一段, 大约 100 字, 我希望以引言 (Quote Interstitial archetype) 出现, 不是普通段落

文案 tone 文化季刊主编笔触, 慢节奏, 散文化, 不要数据 PM 腔.
```

**期望**: dark mode (background L ≤ 0.16) · editorial routing · brand #EA580C · Hero shader mesh dark band + editorial preset · 字体衬线 Spectral + EB Garamond + Noto Serif SC · ChapterStamp editorial 大斜体衬线 outline · 主编寄语必须走 Quote Interstitial archetype · density sparse · 验证 default 在 editorial + dark 复合下保持衬线 fidelity.

---

## Round-11 expected outcomes

### M0 · V14-P0-A V11 source 一致性 verify (CRITICAL)

| 维度 | R-10 baseline (v1.3) | R-11 expected (v1.4) |
|------|--------------------|---------------------|
| source 中 `min-h-full` count | 0/9 | **6/9** (Codex + Opus 4.8 双路一致估算) |
| Q1-Q9 中 Hero 实际 vertically aligned 命中率 | 1/9 (Q1 歪打正着 flex)| **6-7/9** |
| Q3 alignItems: 'end' inline (R-10 没生效) | no-op | 生效 (wrapper carry min-h-full) |
| Q7 block stacking → 居顶 (R-10) | failed | 修复 |

**Headline**: "V14-P0-A R-11: V11 source 一致性 0/9 → <X>/9"

### M1-M9 · 9 Query × 4 维度 verdict

| # | Query 主题 | 核心 verify metric | 期望 |
|---|----------|-----------|------|
| M1 | Q1 暗黑 + 整页 + 春节朱红 | dark background L ≤ 0.16 + ceremonial font + 整页朱红是 brand accent 8-15% 而非 background | critic ≥ B + dark L invariant 不破 |
| M2 | Q2 喜庆 + 整页 + lightness_shift | light background L ≥ 0.95 + ceremonial routing + lightness_shift 仅作 --primary | critic ≥ B + lightness_shift 不影响 background |
| M3 | Q3 复杂数据多 archetype 拼接 | section 数 ≥ 6 + 多 archetype (KPI Cluster + Time Series + Proportion + Ranking + Quote) | critic ≥ B + AnimateNumber 数 ≤ 3 per section |
| M4 | Q4 dithering + dark + technical | Hero shader = dithering (源码 grep `<Dithering`) + JetBrains Mono + tnum + ALL-CAPS h2 | critic ≥ B + 用户定制精确 honor |
| M5 | Q5 默认兜底 editorial 朱砂 | 字体衬线 + ChapterStamp editorial outline italic + 朱砂渗染气质 | critic ≥ C+ (default 兜底 ceiling) |
| M6 | Q6 dark + 紫色 + editorial | dark L ≤ 0.16 + brand #4C1D95 精确 + mesh shader (用户显式) + editorial 衬线 | critic ≥ B + dark L invariant 不破 |
| M7 | Q7 impact 兜底 + 大字号 | weight ≥ 800 + ALL-CAPS + 大字号 hierarchy + 数据语义保真 (KDA / 击杀数) | critic ≥ C+ (default 兜底) |
| M8 | Q8 hero image URL + warmth + sealed overlay | `<img>` 无 filter + sealed overlay (var(--background) opacity 25-50% light) + 圆润字体 | critic ≥ B + sealed overlay 正确 |
| M9 | Q9 dark + editorial + 衬线 | dark L ≤ 0.16 + 衬线字体 + Quote Interstitial archetype 主编寄语 | critic ≥ B + 衬线 fidelity |

**Headline**: "R-11 M1-M9: `<X>/9 PASS · <Y> PARTIAL · <Z> FAIL`"

### Cumulative regression (R-10 baseline carry)

| # | R-10 baseline | R-11 expected |
|---|------------|---------------|
| V11 wrapper source 一致性 | 0/9 (R-130 弱化失效) | **6/9 (V14-P0-A 矫正)** |
| Hero 内容 vertically aligned | Q1 歪打正着 / Q2/Q3/Q7 贴顶 | 6-7/9 居中或居下 |
| dark mode 适配 (Q1/Q3/Q4/Q6/Q9 5 个 dark query) | N/A (R-10 全 light) | **5/5 dark query 各自正确 dark output** |
| AN 三重锁 carry | 8/9 maintained | maintain ≥ 8/9 (Q5/Q9 反范式 reduced 例外) |
| V10 R-124 / v0.9 / R-128 / R-125 / R-130 V13-P0-A 全 carry | 全 carry | 全 carry |

### dark mode 实际生成质量 verify (R-11 NEW dimension)

R-10 9/9 全 light · R-11 5 个 dark query (Q1/Q3/Q4/Q6/Q9). 重点 verify:
- **background L ≤ 0.16** 不论用户字面要求(Q1 用户说"整页深朱红"但 doubao 应 honor dark L 而非 break)
- **Mode-explicit Tooltip hex** carry (v0.9 既有 inline hex)
- **dark colors[] L invariant** carry (mesh dark band 0.115-0.480)
- **--primary OKLCH dark lightness shift** carry (lightness +0.10 dark mode)

### §15 既有 dial leak observation (carry for v1.5)

Q8 用 hero image URL 直接命中 §15 既有 `hero_image_url` dial 引用. observation only.

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

=== DESIGN PROMPT (default v1.4) ===
{cat /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.4.md}

=== INPUT DATA (Q1销售业绩 KPI, 28 records) ===
{mock JSON 段 from legacy generate-prompt.txt 同 R-10}

=== USER QUERY ===
{Q<N> 的 user query 文本 - 9 全新 Query 见上}

Output the code block now.
```

### Step 2-3 · attempt 目录 + doubao 调用

```bash
cd /Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test
for N in 1 2 3 4 5 6 7 8 9; do
  rm -rf "default-v1.4-Q${N}-attempt-1"
  mkdir -p "default-v1.4-Q${N}-attempt-1"
  cp -R running-env/. "default-v1.4-Q${N}-attempt-1/"
  ARK_API_KEY="$ARK_API_KEY" python3 generate.py "default-v1.4-Q${N}-attempt-1" 2>&1 | tee "default-v1.4-Q${N}-attempt-1/gen.log"
done
```

### Step 4 · build verify

```bash
for N in 1 2 3 4 5 6 7 8 9; do
  cd "/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.4-Q${N}-attempt-1"
  pnpm install 2>&1 | tail -5 > install.log
  pnpm run build 2>&1 | tee build.log
done
```

### Step 5 · dev + playwright (per build-PASS)

**Mandatory Hero region screenshot for ALL 9 Queries** + **Q1/Q3/Q4/Q6/Q9 dark mode 整页截图重点 (M0 + dark mode adapt verify)**.

特殊 Query 重点截图:
- Q1: 整页 + Hero (verify dark background L 不是用户字面深朱红 + 春节庆典质感)
- Q3: 多 archetype 拼接 (verify section 数 ≥ 6)
- Q4: Hero (verify dithering shader + JetBrains Mono)
- Q5: Hero + ChapterStamp (verify editorial outline italic serif)
- Q6: 整页 + Hero (verify dark L 不破 + brand #4C1D95)
- Q8: Hero 图片区 (verify sealed overlay)
- Q9: ChapterStamp + Quote (verify editorial 衬线 + Quote Interstitial)

### Step 6 · Playwright DOM extraction

**Round-11 NEW · V11 wrapper height floor verify (M0, CRITICAL)**:

```javascript
const heroSection = document.querySelector('section[class*=min-h], section[class*=h-screen]')
const heroSectionH = heroSection ? heroSection.getBoundingClientRect().height : 0
const heroContent = heroSection?.querySelector('h1, [class*=focal-number], [class*=display-number]')
const heroContentTop = heroContent ? heroContent.getBoundingClientRect().top - heroSection.getBoundingClientRect().top : 0
const heroContentRelTop = heroSectionH > 0 ? heroContentTop / heroSectionH : 0
// 期望 v1.4: heroContentRelTop ≥ 0.30 (vertically aligned per align rule, 不再贴顶 0.069)

const heroGrid = heroSection?.querySelector('[class*=grid], [style*=grid]')
const heroGridH = heroGrid ? heroGrid.getBoundingClientRect().height : 0
const heroFillRatio = heroSectionH > 0 ? heroGridH / heroSectionH : 0
// 期望 v1.4: heroFillRatio ≥ 0.92 (grid spans full section height)
```

**Round-11 NEW · dark mode 适配 verify (M0 + 4 dark query)**:

```javascript
// 在 5 个 dark query 跑 (Q1/Q3/Q4/Q6/Q9)
const bg = getComputedStyle(document.body).backgroundColor
// 期望: rgb(14, 17, 21) 或类似 L ≤ 0.16 (不论 query brand color 多高饱和)
```

### Step 6.5 · Round-11 source grep (CRITICAL)

Per attempt source grep on `src/App.tsx`. Save to `reports/source-grep/Q${N}.txt`:

```bash
cd "default-v1.4-Q${N}-attempt-1"
APP="src/App.tsx"
echo "=== Q${N} R-11 v1.4 V11 + 4 维度 verify ==="

# === M0 · V14-P0-A V11 height floor verify ===
SECTION_MIN_H=$(grep -cE "<section[^>]*min-h-\[" "$APP" || echo 0)
WRAPPER_MIN_H_FULL=$(grep -cE "min-h-full|min-height:\s*100%" "$APP" || echo 0)
echo "M0 · section min-h-[Xvh]: $SECTION_MIN_H · wrapper min-h-full carry: $WRAPPER_MIN_H_FULL"
echo "    期望: wrapper count ≥ section count (every Hero section wrapper carry height floor)"

# === Mode verify (5 dark + 4 light) ===
MODE_DARK=$(grep -cE "MODE\s*=\s*['\"]dark['\"]|const MODE\s*=\s*['\"]dark['\"]" "$APP" || echo 0)
MODE_LIGHT=$(grep -cE "MODE\s*=\s*['\"]light['\"]|const MODE\s*=\s*['\"]light['\"]" "$APP" || echo 0)
echo "Mode: dark=$MODE_DARK · light=$MODE_LIGHT"
echo "    期望 (Q1/3/4/6/9): dark=1 · 期望 (Q2/5/7/8): light=1"

# === dark mode background L invariant verify (5 dark query) ===
BG_DARK_INVARIANT=$(grep -cE "background\":\s*['\"]?oklch\(0\.[01][0-9]" "$APP" || echo 0)
echo "dark background L ≤ 0.16 OKLCH: $BG_DARK_INVARIANT (Q1/3/4/6/9 期望 ≥ 1, Q2/5/7/8 期望 0)"

# === Hero shader type verify (用户定制) ===
DITHERING=$(grep -cE "<Dithering|DitheringShader" "$APP" || echo 0)
MESH=$(grep -cE "<MeshGradient|MeshShader" "$APP" || echo 0)
GRAIN=$(grep -cE "<GrainGradient|GrainShader" "$APP" || echo 0)
echo "Shader: dithering=$DITHERING · mesh=$MESH · grain=$GRAIN"
echo "    期望 Q4 dithering=1 · Q6 mesh=1 · Q8 N/A (image archetype)"

# === Hero image URL verify (Q8) ===
HERO_IMG_URL=$(grep -cE "https://cdn\.xiaoshixi\.com|hero-cafe\.jpg" "$APP" || echo 0)
echo "Q8 Hero image URL: $HERO_IMG_URL (期望 ≥ 1)"

# === Tone-specific verify ===
MARKETING_SPIN=$(grep -cE "突破|引领|领先|伟大胜利|卓越" "$APP" || echo 0)
echo "M3/M5/M9 marketing 词残留 (期望 0 - 数据 PM / 文化季刊 tone): $MARKETING_SPIN"

# === Cumulative R-130 + R-128 + R-124 + v0.9 + AN carry ===
HERO_IMAGE_URL_LEAK_IN_SPEC=$(grep -cE "When .hero_image_url. active|hero_image_url.*dial" "$APP" || echo 0)
DOM_ANCESTOR_LEAK=$(grep -cE "EVERY DOM ancestor|root wrapper, padding wrapper" "$APP" || echo 0)
echo "R-130 hero_image_url leak in source (期望 0): $HERO_IMAGE_URL_LEAK_IN_SPEC"
echo "R-130 DOM ancestor enumerate leak (期望 0): $DOM_ANCESTOR_LEAK"

B1_LEAK=$(grep -cE "Brand Narrative Spine|brand-history.*archetype" "$APP" || echo 0)
B2_LEAK=$(grep -cE "Testimonial-Threaded|alternating Stacked Band.*pairs a brief quote" "$APP" || echo 0)
echo "R-128 B1 leak (期望 0): $B1_LEAK · B2 leak (期望 0 - Q9 主编寄语用 Quote Interstitial 不是 Testimonial-Threaded): $B2_LEAK"

OKLCH_COMMA=$(grep -cE "oklch\([0-9.]+,\s*[0-9.]+" "$APP" || echo 0)
BODY_FG2_INLINE=$(grep -cE "<p[^>]*color:\s*['\"]?var\(--foreground-[23]\)" "$APP" || echo 0)
NEGATIVE_CHROMA=$(grep -cE "oklch\([^)]*-[0-9]+\.[0-9]+" "$APP" || echo 0)
IMG_FILTER_FN=$(grep -cE "saturate\(|brightness\(|blur\(|hue-rotate\(|grayscale\(|sepia\(|drop-shadow\(" "$APP" || echo 0)
HERO_BACKPLATE=$(grep -cE "<div[^>]*backgroundColor.*var\(--surface-l[12]\)[^>]*>[^<]*<.*[Ff]ocal[Nn]umber" "$APP" || echo 0)
HERO_INLINE_SIZE=$(grep -cE "className=['\"][^'\"]*text-\[[0-9]+px\][^'\"]*['\"]|style.*fontSize.*['\"]?[0-9]+px" "$APP" || echo 0)
HERO_CLAMP=$(grep -cE "className=['\"][^'\"]*clamp\(|style.*fontSize.*clamp\(" "$APP" || echo 0)
echo "V09-P0-A OKLCH comma (期望 0): $OKLCH_COMMA"
echo "V09-P0-3 F-2 <p> fg-2/3 (期望 ≤ 1): $BODY_FG2_INLINE"
echo "V09-P0-4 negative chroma (期望 0): $NEGATIVE_CHROMA"
echo "V09-P1-6 img filter (期望 0): $IMG_FILTER_FN"
echo "V10-P0-1A Hero backplate (期望 0): $HERO_BACKPLATE"
echo "V10-P0-2A Hero inline size: $HERO_INLINE_SIZE · clamp (期望 0): $HERO_CLAMP"

# AnimateNumber invariant
TNUM=$(grep -cE "tabular-nums|tnum\"? 1" "$APP" || echo 0)
ANIM_NUM=$(grep -cE "<AnimateNumber" "$APP" || echo 0)
echo "AN-1 tabular-nums: $TNUM · AN-2 AnimateNumber instances: $ANIM_NUM"

# Regression hygiene
FM=$(grep -cE "from ['\"]framer-motion['\"]" "$APP" || echo 0)
WILDCARD=$(grep -cE "@/components/ui'$|@/components/ui[\"']" "$APP" || echo 0)
echo "framer-motion (期望 0): $FM · wildcard ui (期望 0): $WILDCARD"
```

### Step 7 · Design Skill 评分

每个 build-PASS attempt 派 ≥ 3 design skills (impeccable / design-taste-frontend / emil-design-eng) + design-principles + motion-audit ×1.

R-11 per-Query evaluation focus:
- Q1: dark + ceremonial + 春节庄重 vs default 兜底 ceiling
- Q2: light + 喜庆 + lightness_shift 正确作用
- Q3: 多 archetype 拼接清晰度 + 信息架构
- Q4: dithering shader + technical 严谨
- Q5: 西式编辑朱砂 default 模仿 fidelity
- Q6: dark + 高饱和紫 brand + dark L invariant
- Q7: impact 大字号 + 数据语义保真
- Q8: hero image + sealed overlay + warmth 圆润
- Q9: dark + editorial 衬线 + Quote Interstitial

### Step 8 · 写 Robustness Report + cp-to-vault

---

## Robustness Report content

Save to: `/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.4_Round-11.md`

### 10 headline sections

#### 1. M0 · V14-P0-A V11 source 一致性 verify (HEADLINE, CRITICAL)

| 维度 | R-10 baseline | R-11 actual | Verdict |
|------|------------|-----------|---------|
| source 中 `min-h-full` count | 0/9 | <X>/9 | PASS if ≥ 6/9 |
| Hero contentTop ratio ≥ 0.30 | 1/9 (Q1 歪打正着)| <X>/9 | PASS if ≥ 6/9 |
| heroFillRatio ≥ 0.92 | <V> | <X>/9 | PASS if ≥ 6/9 |

Headline: "V14-P0-A: V11 source 一致性 0/9 → `<X>/9`"

#### 2. M1-M9 9 Query × 4 维度 verdict

| # | Query 主题 | Expected | Actual | Verdict |
|---|----------|----------|--------|---------|
| M1 | Q1 暗黑+整页+春节朱红 | dark L ≤ 0.16 + ceremonial | … | PASS/PARTIAL/FAIL |
| M2 | Q2 喜庆+lightness_shift | light + lightness_shift 仅 --primary | … | PASS/PARTIAL/FAIL |
| M3 | Q3 多 archetype 拼接 | section ≥ 6 + 5 archetypes | … | PASS/PARTIAL/FAIL |
| M4 | Q4 dithering + technical | shader=dithering + JetBrains Mono | … | PASS/PARTIAL/FAIL |
| M5 | Q5 default 兜底 editorial 朱砂 | 衬线 + outline italic + 朱砂气质 | … | PASS/PARTIAL/FAIL |
| M6 | Q6 dark + 紫色 + editorial | dark L ≤ 0.16 + brand #4C1D95 + 衬线 | … | PASS/PARTIAL/FAIL |
| M7 | Q7 impact 兜底 | weight ≥ 800 + ALL-CAPS + KDA 保真 | … | PASS/PARTIAL/FAIL |
| M8 | Q8 hero image + sealed overlay | <img> 无 filter + overlay 25-50% | … | PASS/PARTIAL/FAIL |
| M9 | Q9 dark + editorial 衬线 | dark L ≤ 0.16 + 衬线 + Quote Interstitial | … | PASS/PARTIAL/FAIL |

Headline: "R-11 M1-M9: `<X>/9 PASS · <Y> PARTIAL · <Z> FAIL`"

#### 3. dark mode 适配实际生成 verify (R-11 NEW · 5 dark query)

| Q | brand color | 期望 dark background L | actual | Verdict |
|---|-----------|---------------------|--------|---------|
| Q1 (春节朱红 #8B1A1A) | dark L ≤ 0.16 | <X> | PASS/FAIL |
| Q3 (钴蓝 #1E40AF) | dark L ≤ 0.16 | <X> | PASS/FAIL |
| Q4 (电光蓝 #3B82F6) | dark L ≤ 0.16 | <X> | PASS/FAIL |
| Q6 (深紫 #4C1D95) | dark L ≤ 0.16 | <X> | PASS/FAIL |
| Q9 (编辑橙 #EA580C) | dark L ≤ 0.16 | <X> | PASS/FAIL |

#### 4. Cumulative regression (R-10 baseline carry)

#### 5. Per-Query summary (Build · Runtime · 综合)

#### 6. New Stable Failures (≥ 2/9 in R-11)

#### 7. §15 既有 dial leak observation (carry for v1.5)

Q8 hero image URL 直接命中 §15 `hero_image_url` dial 引用 · observation only.

#### 8. Top patch suggestions for Cowork v1.5 (Chris 红线 + AN 不动 honored)

⚠️ R-124 carry: do NOT propose changes to AnimateNumber 区段.
⚠️ R-130 + R-133 fix carry: 不动 §14.1 line 460/462 v1.3 + v1.4 patches.
⚠️ v1.5 候选范围: §15 既有 dial transport leak 统一重写 transport-agnostic (highest priority).

#### 9. 4 维度生成表现观察

| 维度 | Light query 平均 critic | Dark query 平均 critic | 维度强弱判断 |
|------|-----------------------|----------------------|------------|
| 复杂数据 | … | … | … |
| 关键词风格匹配 | … | … | … |
| 用户定制特殊主题 | … | … | … |
| 暗黑 / 纯色彩背景 / 喜庆 | … | … | … |

#### 10. Convergence assessment

- **若 M0 V14-P0-A ≥ 6/9 + M1-M9 ≥ 7/9 PASS + cumulative 全 carry + 0 new SF**: **v1.4 STRESS-VERIFIED, R-133 closes. Recommend R-134 / v1.5 (§15 transport-agnostic).**
- **若 M0 V14-P0-A < 5/9**: V11 fix partial, R-133 follow-up patch
- **若 多 new SF**: 大 patch round

---

## cp-to-vault checklist

```bash
DST="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports"
mkdir -p "$DST/Round-11-app-tsx" "$DST/Round-11-screenshots" "$DST/Round-11-critic" "$DST/Round-11-source-grep"

for N in 1 2 3 4 5 6 7 8 9; do
  SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.4-Q${N}-attempt-1/src/App.tsx"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-11-app-tsx/Q${N}-App.tsx"
done

for N in 1 2 3 4 5 6 7 8 9; do
  for stage in t0 stable tooltip hero-region full-page dark-bg; do
    SRC="$DST/screenshots/Q${N}-${stage}.png"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-11-screenshots/Q${N}-${stage}.png" || true
  done
done

for N in 1 2 3 4 5 6 7 8 9; do
  for skill in impeccable design-taste-frontend emil-design-eng design-principles; do
    SRC="/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/default-v1.4-Q${N}-attempt-1/critic/${skill}.md"
    [ -f "$SRC" ] && cp "$SRC" "$DST/Round-11-critic/Q${N}-${skill}.md" || true
  done
done

for N in 1 2 3 4 5 6 7 8 9; do
  SRC="$DST/source-grep/Q${N}.txt"
  [ -f "$SRC" ] && cp "$SRC" "$DST/Round-11-source-grep/Q${N}.txt" || true
done

echo "--- Round-11 artifacts tally ---"
echo "App.tsx           : $(ls "$DST/Round-11-app-tsx/" 2>/dev/null | wc -l)"
echo "Screenshots       : $(ls "$DST/Round-11-screenshots/" 2>/dev/null | wc -l)"
echo "Critic files      : $(ls "$DST/Round-11-critic/" 2>/dev/null | wc -l)"
echo "Source grep files : $(ls "$DST/Round-11-source-grep/" 2>/dev/null | wc -l)"
echo "Robustness Report : $([ -f "$DST/Robustness-Report_default-v1.4_Round-11.md" ] && echo present || echo MISSING)"
```

Expected: ~85-105 files (9 Query × dark + light query 多 stage 截图).

---

## Self-check

- [ ] Prerequisites verified (A v1.4 641 行 + B sandbox + C R-10 report)
- [ ] Pre-test red-line: V14-P0-A 4 项 ≥ 1 · 既有 patches carry · AN 5 sentinels ≥ 1 · forbidden + 红线 全 0
- [ ] 9 Queries 字面 verbatim 复用 handoff (QA 出题)
- [ ] 9 doubao calls 全跑
- [ ] 每个 build-PASS 跑 build + playwright + DOM (含 R-11 NEW M0 V11 + dark mode bg L metrics) + Step 6.5 source-grep (含 M0 + M1-M9 + mode + shader)
- [ ] **Hero 区域 + 整页 dark mode 5 query 重点截图** (M0 V11 + dark adapt verify focus)
- [ ] dark mode Q1/Q3/Q4/Q6/Q9 + BarChart Queries hover Tooltip 截图
- [ ] 每个 build-PASS ≥ 3 design skills + motion-audit ×1, 含 R-11 per-Query evaluation focus
- [ ] Robustness Report 10 sections 都填实质
- [ ] §1 M0 V14-P0-A V11 verdict 完整
- [ ] §2 M1-M9 9 Query verdict 完整
- [ ] §3 dark mode 5 query L invariant verify 完整
- [ ] §4 Cumulative regression 全填
- [ ] §10 Convergence assessment 明确
- [ ] §8 patch suggestions 严守 Chris 红线 + AN 不动 + §15 dial leak 仅 observation
- [ ] §9 4 维度生成表现观察
- [ ] cp-to-vault tally ~85-105

---

## Output to Chris on completion

```
doubao default v1.4 生成测试 Round-11 (V11 source 一致性 + 4 维度 stress · QA 9 全新 Query) complete.

Design Prompt under test: default v1.4 (641 lines, frozen · R-133 V14-P0-A inline parenthetical)
R-10 baseline: Robustness-Report_default-v1.3_Round-10.md
R-11 report: Robustness-Report_default-v1.4_Round-11.md

Pre-test red-line verify: <PASS/FAIL>

M0 · V14-P0-A V11 source 一致性 verdict (HEADLINE):
  source min-h-full count: <X>/9 (R-10 baseline 0/9)
  Hero contentTop ratio ≥ 0.30: <X>/9 (R-10: 1/9 歪打正着)
  heroFillRatio ≥ 0.92: <X>/9
  Verdict: <PASS / PARTIAL / FAIL>

R-11 M1-M9 9 Query × 4 维度 verdict:
  M1 Q1 暗黑+春节朱红+ceremonial: <PASS/PARTIAL/FAIL>
  M2 Q2 喜庆+lightness_shift: <PASS/PARTIAL/FAIL>
  M3 Q3 复杂数据多 archetype 拼接: <PASS/PARTIAL/FAIL>
  M4 Q4 dithering+technical: <PASS/PARTIAL/FAIL>
  M5 Q5 default 兜底 editorial 朱砂: <PASS/PARTIAL/FAIL>
  M6 Q6 dark+紫+editorial: <PASS/PARTIAL/FAIL>
  M7 Q7 impact 兜底: <PASS/PARTIAL/FAIL>
  M8 Q8 hero image+sealed overlay: <PASS/PARTIAL/FAIL>
  M9 Q9 dark+editorial 衬线: <PASS/PARTIAL/FAIL>

Headline: R-11 M1-M9: <X>/9 PASS · <Y> PARTIAL · <Z> FAIL

Dark mode 适配 (5 dark query L ≤ 0.16 invariant):
  Q1 / Q3 / Q4 / Q6 / Q9: <list 各 verdict>

Cumulative regression (R-10 baseline carry):
  V11 wrapper: <X>/9 (R-10: 0/9, 期望 ≥ 6/9)
  V10 R-124 / v0.9 / R-128 / R-125 / R-130 V13-P0-A patches: <verdict>
  AN 三重锁: <maintained/regressed>
  B1/B2 trigger 不误触: <list>

Per-Query critic 综合:
  Q1-Q9 critic 评分 + tone

Build pass rate: <N>/9
Effective render-pass rate: <N>/9

New Stable Failures (≥ 2/9):
  <list, or "none">

4 维度生成表现观察:
  暗黑: <strong / borderline / weak>
  纯色彩背景: <strong / borderline / weak>
  喜庆: <strong / borderline / weak>
  复杂数据: <strong / borderline / weak>

§15 既有 dial leak observation (carry for v1.5):
  Q8 hero image URL 命中 §15 既有 dial 引用 — observation only

Top patch suggestions for Cowork v1.5 (Chris 红线 + AN 不动 honored):
  <listed in report §8>

Convergence assessment:
  <v1.4 STRESS-VERIFIED · R-133 closes / R-134 micro patch / 大 patch round>

Artifacts cp'd: <N> files in reports/Round-11-* subdirs.

If M0 V14-P0-A ≥ 6/9 + M1-M9 ≥ 7/9 PASS + cumulative 全 carry + 0 new SF: v1.4 stress-verified, R-133 closes.
推 R-134 (v1.5 §15 transport-agnostic) + AGENT-R10-1 (工程 utility bundle parallel).
```

不 commit / 不 push — Cowork 接手 review.

## 触发词

开始。
