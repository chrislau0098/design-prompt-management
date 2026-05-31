# CC-Prompt · R-126 · 7 个 Design Prompt description 重写 · Opus 4.6

你是 **Vibe view 项目 default Design Prompt 维护者**(scope: design-prompt-management 项目,vibe-view-campaign-report 场景)。

## 任务 — 重写 7 个 prompt frontmatter `description` 字段

Chris 系统按 prompt frontmatter `description` 路由用户需求到对应风格 prompt(default 或 6 个专用 fixed styles)。**description 是 AI 路由判断的核心字段,必须各有差异、清晰、绑定专属语境**。

**Codex review 已确认 scope NEEDS REVISION,我已修订**。下面是 Opus 实施的 7 个 description 起草方向(已含 Codex 6 处修正)。

## R-118 description 规范 (HARD)

每个 description **必须**:
- 单行 YAML scalar(无 `>` 或 `|` block syntax)
- **无 eyebrow prefix** — 去除当前 6 fixed style 的 `【仅限数据战报场景】` 前缀
- **无技术术语** — dial / OKLCH / shader / STYLE_PRESETS / font_family / lightness_shift / SRE / Bloomberg(替换为中文语境:fintech → 金融科技,dark-mode → 暗黑)
- 无 version metadata / 改动注释
- **≤200 中文字**(含标点),你必须 count 后确认
- **三部分结构**(句号分隔):
  1. **视觉语言 thesis** — 一句开场点核心姿态(克制 / 精密 / 朝代 / 系统 等) + 3-5 grounded constraints + 3 adjectives 收尾(例:"干净、现代、专业")
  2. **Use-case catalog** — "适用于 [4-6 个典型场景]"
  3. **Fallback / activation rule** — default 用 fallback 语义("在无 X / Y / Z 时,默认使用本主题");fixed 用 directive("当用户需求强调 X / Y / Z 时优先选用本风格")
- **句号只在三部分之间**;**activation rule 末尾不带句号**(directive 风格)
- 不写 "prompt"、"命中"、"路由器" 等内部术语

## 第一步必读

R-118 完整规范 + reference example:
`/Users/nova-macmini/Code/design-prompt-creator/reference/05-prompt-generate.md`(搜 "Frontmatter `description` format" 段)

7 个文件当前 description (read for anchor + verify 旧版的 eyebrow / 错误措辞):
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/cool-precision-tech/v0.5.2.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/festive-editorial-crimson/v0.3.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/festive-royal-crimson/v0.3.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/swiss-systematic-blue/v0.8.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/theatre-dark/v6.7.2.md`
- `/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/warm-restraint-tech/v1.0.2.md`

每个文件 frontmatter line 1-4:
```
---
style_name: <chinese>
description: <要重写这一行>
---
```

**只动 line 3 `description: ...` 一行**。不动 style_name,不动 prompt body。

## 7 个 description 起草方向(Codex 修订后)

### 1. default v1.1.md (默认基座 · 可配置 — 战报场景默认)

**Chris R-126 新要求**:写明是**战报场景默认 prompt**(不是通用网页基座),activation 用 fallback 语义。

- **视觉语言**: 克制 / 可配置 / 通用基座 — 信息层级、留白、节奏、可读性、单色调 — 干净、克制、专业
- **Use-case**: 季度销售战报 / 业绩月报 / 增长汇报 / 项目年度复盘 / 营销总结
- **Activation (fallback 语义)**: "在无更具体专用风格信号(暗夜仪表 / 红金庆典 / 瑞士网格 / 剧场暗夜 / 暖调品牌)时,默认使用本主题"
- **避免**: 不能写"数据驱动 / 仪表盘 / 工程数据 / SaaS 增长"(会吞 cool / Swiss / 内部 routing);不写"prompt / 命中 / 路由"内部术语

### 2. cool-precision-tech v0.5.2.md (精密暗夜 · 电光蓝)

- **视觉语言**: 精密 / 工程 / 信号 — 暗夜仪表盘、白色大数字、电光蓝单焦点、大量负空间、工程刻线 — 精密、工程、信号
- **Use-case**: 数据中心运营报告 / 算力性能监控 / 风控分析 / 金融科技战报 / 后端监控仪表
- **Activation**: 当用户需求强调暗夜仪表 / 电光蓝 / 工程底层 / 金融科技 / 监控数据 / 后端基础设施时优先选用本风格
- **避免**: 不用泛词"数据驱动"(default 也用);必须绑定暗夜仪表 + 电光蓝 + 工程底层

### 3. festive-editorial-crimson v0.3.md (庆典编辑 · 朱砂洗)

- **视觉语言**: 编辑 / brutalist / 红色情绪 — 象牙底、黑色大字无衬线、朱砂渗染、西式排版节奏 — 编辑、张力、红色
- **Use-case**: 媒体专题战报 / 品牌发布回顾 / 文化季刊业绩 / 影展年度汇报 / 出版业季报
- **Activation**: 当用户需求强调浅底黑色大字 / 朱砂渗染 / 西式编辑 brutalist / 红色情绪 / 海报感时优先选用本风格
- **跟 festive-royal 差异**: 浅底 + 黑色大字 + 西式 register(对 royal: 整页朱红 + 金色衬线 + 东方礼仪)

### 4. festive-royal-crimson v0.3.md (庆典皇室 · 朱砂金)

- **视觉语言**: 朝代 / 尊贵 / 庆典 — 整页深朱红底、金色衬线大字、朱砂印章节奏、东方礼仪 — 庄重、尊贵、喜庆
- **Use-case**: 春节年度战报 / 重大节庆汇报 / 品牌庆典 / 国货品牌业绩 / 传统行业报告
- **Activation**: 当用户需求强调中国风 / 整页朱红 / 金色衬线 / 春节 / 朝代 / 节日 / 东方庆典时优先选用本风格

### 5. swiss-systematic-blue v0.8.md (瑞士系统 · 编辑蓝)

- **视觉语言**: 系统 / 严谨 / 克制 — 浅灰底、黑色粗线分隔、钴蓝单焦点、全大写排版主导、圆形序号 — 系统、严谨、minimal
- **Use-case**: 系统化产品战报 / 编辑式季度复盘 / 国际化品牌报告 / 工程文档化战报 / 排版主导汇总
- **Activation**: 当用户需求强调瑞士系统 / 网格 / 全大写排版 / 黑色粗线 / 钴蓝单焦点 / 排版主导时优先选用本风格
- **避免**: 不写普通 "SaaS / B2B 增长" 通用语义(会冲突 default §2 geometric 默认路线)

### 6. theatre-dark v6.7.2.md (剧场暗夜 · 爱马仕橙)

- **视觉语言**: 深邃 / 戏剧 / 镜头感 — 银幕黑底、spotlight 光斑、单一爱马仕橙、安静奢华、linework — 戏剧、深邃、影院
- **Use-case**: 高端品牌旗舰战报 / 影视娱乐汇报 / 奢侈品业绩 / 戏剧业季度报告 / 高端暗黑发布
- **Activation**: 当用户需求强调暗黑剧场 / spotlight 镜头感 / 安静奢华 / 高端品牌发布 / 影院感时优先选用本风格
- **不是**: 工程暗夜(那是 cool)/ 金融科技 dashboard(那是 cool)

### 7. warm-restraint-tech v1.0.2.md (克制暖意 · 象牙余烬)

- **视觉语言**: 温暖 / 自信 / 品牌 — 象牙底、琥珀橙强调、橙色大数字、人文无衬线、章节细线 — 温暖、克制、品牌
- **Use-case**: 品牌年度报告 / 消费品季度战报 / DTC 品牌汇报 / 生活方式品牌年度复盘 / 暖调品牌发布
- **Activation**: 当用户需求强调明亮 / 暖调品牌 / 象牙琥珀橙 / 人文无衬线 / 对外发布场景时优先选用本风格
- **避免**: 不写"杂志风 / editorial"(这是 festive-editorial 领地)

---

## 严格纪律 (HARD)

1. **每条 description ≤200 中文字** — 严格 count,超字必删
2. **只动 line 3 `description: ...` 一行** — 不动 style_name,不动 frontmatter `---` 边界,不动 prompt body
3. **无 eyebrow prefix** — 严禁 `【XX】` 开头(包括 `【仅限数据战报场景】`)
4. **无技术术语** — dial / OKLCH / shader / STYLE_PRESETS / font_family / lightness_shift / SRE / Bloomberg
5. **三部分句号分隔,activation 末尾无句号**
6. **default fallback 语义,不写"命中其他风格优先"** — 用 R-118 fallback 句式
7. **各风格 description 必须差异化** — 关键词不能跨风格借用("数据" 不能同时在 default / Swiss / cool 用作触发词)
8. 不引入 import / 包名 / 工程化文本 / emoji / "Inspired by" / "Last updated"
9. 不动其他 frontmatter 字段(style_name 保留中文 + 中圆点 · 格式)

## 落地 + 回报

完成 7 处 Edit 后跑 self-verify:

```bash
echo "=== 7 个文件各 description 字数(每个 ≤ 200 中文字) ==="
for f in default/v1.1.md cool-precision-tech/v0.5.2.md festive-editorial-crimson/v0.3.md festive-royal-crimson/v0.3.md swiss-systematic-blue/v0.8.md theatre-dark/v6.7.2.md warm-restraint-tech/v1.0.2.md; do
  desc=$(grep '^description:' "/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/$f" | head -1)
  # count Chinese chars + ASCII punct
  count=$(echo "$desc" | sed 's/^description:[[:space:]]*//' | wc -m | tr -d ' ')
  printf "  %-45s : %s chars · %s\n" "$f" "$count" "$(echo "$desc" | head -c 80)..."
done

echo ""
echo "=== eyebrow prefix 残留 verify (期望全 0) ==="
for f in default/v1.1.md cool-precision-tech/v0.5.2.md festive-editorial-crimson/v0.3.md festive-royal-crimson/v0.3.md swiss-systematic-blue/v0.8.md theatre-dark/v6.7.2.md warm-restraint-tech/v1.0.2.md; do
  hit=$(grep -c '^description:.*【' "/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/$f")
  printf "  %-45s : %s (期望 0)\n" "$f" "$hit"
done

echo ""
echo "=== 技术术语残留 verify (期望全 0) ==="
for term in 'dial' 'OKLCH' 'shader' 'STYLE_PRESETS' 'font_family' 'lightness_shift' 'SRE' 'Bloomberg'; do
  hit=0
  for f in default/v1.1.md cool-precision-tech/v0.5.2.md festive-editorial-crimson/v0.3.md festive-royal-crimson/v0.3.md swiss-systematic-blue/v0.8.md theatre-dark/v6.7.2.md warm-restraint-tech/v1.0.2.md; do
    h=$(grep '^description:' "/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/$f" | grep -c "$term")
    hit=$((hit + h))
  done
  printf "  %-15s : %s\n" "$term" "$hit"
done

echo ""
echo "=== 风格特征关键词 verify (each style description 应含其专属关键词) ==="
echo "default 含 战报 + 默认:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.1.md | grep -cE "战报.*默认|默认.*战报"

echo "cool 含 暗夜仪表 OR 电光蓝:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/cool-precision-tech/v0.5.2.md | grep -cE "暗夜仪表|电光蓝"

echo "festive-editorial 含 朱砂渗染 OR 西式编辑:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/festive-editorial-crimson/v0.3.md | grep -cE "朱砂渗染|西式编辑|brutalist"

echo "festive-royal 含 朱红 + 金色:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/festive-royal-crimson/v0.3.md | grep -cE "朱红.*金色|整页朱红"

echo "swiss 含 钴蓝 OR 全大写:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/swiss-systematic-blue/v0.8.md | grep -cE "钴蓝|全大写"

echo "theatre 含 银幕 OR 爱马仕橙 OR 安静奢华:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/theatre-dark/v6.7.2.md | grep -cE "银幕|爱马仕橙|安静奢华"

echo "warm 含 象牙 + 琥珀:"
grep -E '^description:' /Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/warm-restraint-tech/v1.0.2.md | grep -cE "象牙.*琥珀|琥珀.*象牙"
```

回报模板:

```
R-126 7 description 重写 complete.

Edits 落地:
  1. default v1.1: <DONE/PARTIAL/FAIL> · <N>字
  2. cool-precision-tech v0.5.2: <DONE/PARTIAL/FAIL> · <N>字
  3. festive-editorial-crimson v0.3: <DONE/PARTIAL/FAIL> · <N>字
  4. festive-royal-crimson v0.3: <DONE/PARTIAL/FAIL> · <N>字
  5. swiss-systematic-blue v0.8: <DONE/PARTIAL/FAIL> · <N>字
  6. theatre-dark v6.7.2: <DONE/PARTIAL/FAIL> · <N>字
  7. warm-restraint-tech v1.0.2: <DONE/PARTIAL/FAIL> · <N>字

Self-check 结果:
  字数 ≤ 200: <PASS/FAIL>
  eyebrow prefix 0 残留: <PASS/FAIL>
  技术术语 0 hit: <PASS/FAIL>
  风格特征关键词 verify: <PASS/FAIL,each style 1 hit>

ambiguity / 风险 flag:
  <NONE 或 list>
```

不 commit / 不 push — Cowork 接手 review。

## 触发词

开始。
