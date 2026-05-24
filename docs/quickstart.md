# Quickstart

5 分钟从 0 到第 1 份 Design Prompt。

---

## 前提

- 已装 Skill(见 [installation.md](installation.md))
- Claude Code 已启动
- 有 3-5 张 ground-truth 参考图 + 一段 Chris-style brief("红色喜庆 / 朝代尊贵 / 金色衬线 / 大气" 之类)

---

## Step 1 · 创建新项目

```bash
bash ~/.claude/skills/vibe-page-design-prompt-management/scripts/scaffold-project.sh \
  --name "my-campaign-report" \
  --scenario "campaign-report" \
  --dest ~/Code/my-campaign-report
```

项目结构:

```
my-campaign-report/
├── AGENTS.md                     ← 项目宪法(已填,自行 customize)
├── Round-Log.md                  ← 迭代历史(空 §2,准备填)
├── scripts/                      ← inject.py 已 cp
└── scenarios/
    └── campaign-report/
        ├── PATTERN.md            ← 页面框架
        ├── component-spec.md     ← 组件清单
        ├── prompt-template.md    ← 注入器输入
        └── slot-examples/        ← 风格 Slot JSON(待填)
```

---

## Step 2 · 加新风格(配图 → Slot)

```bash
bash ~/.claude/skills/vibe-page-design-prompt-management/scripts/scaffold-style.sh \
  --style "festive-royal-crimson" \
  --scenario "campaign-report" \
  --project ~/Code/my-campaign-report
```

打开 `scenarios/campaign-report/slot-examples/festive-royal-crimson.slot.json`,按 prompt 提示填:

1. `style_meta.*`(name / handle / version / mode / brand_hue / proposition)
2. `atomic.color.*`(background / surfaces / foreground / primary / chart_ramp,**OKLCH 三元组**)
3. `atomic.typography.*`(stacks / weight_ceiling / display_number_lg / hero_title_lg / 等)
4. `molecular.hero_shader.*`(component / props)
5. `tooling.paper_shaders.primary`

**或者让 Claude 帮你从参考图提取**:

> "我用 vibe-page-design-prompt-management Skill。这是参考图 [3-5 张图]。Brief:[一段 Chris-style 描述]。请用 reference/04-style-from-references.md 流程提取 Slot JSON 到 ~/Code/my-campaign-report/scenarios/campaign-report/slot-examples/<handle>.slot.json"

Claude 会派 Opus vision sub-agent 抽 atomic + molecular tokens。

---

## Step 3 · 生成 Design Prompt

```bash
cd ~/Code/my-campaign-report
python3 scripts/inject.py \
  --slot scenarios/campaign-report/slot-examples/festive-royal-crimson.slot.json \
  --template scenarios/campaign-report/prompt-template.md \
  --out scenarios/campaign-report/festive-royal-crimson-Design-Prompt-v0.1.md
```

输出一份**完整 Design Prompt md**(≤620 行,弱模型友好)。

---

## Step 4 · 在 Vite Renderer 看效果

```bash
cd design-prompt-management/renderer/design-system-renderer-vite
# 把你的 Slot 拷到 renderer src/data/(可选)
cp ~/Code/my-campaign-report/scenarios/campaign-report/slot-examples/festive-royal-crimson.slot.json \
   src/data/

bun run dev
# 浏览器 http://localhost:5173 切到 festive-royal-crimson 看 Design System + Report Example
```

---

## Step 5 · 三方 Sync 检查 + 迭代

```bash
python3 ~/.claude/skills/vibe-page-design-prompt-management/scripts/verify-three-way-sync.py \
  ~/Code/my-campaign-report campaign-report festive-royal-crimson
```

输出:
- Prompt vs Slot ornament mismatch 表
- 行数 verify(≤620)
- Vite renderer link(若启动)

**有反馈?**:

> "我看到 Hero 章节红色印章不合适,删掉。reference 08-iterate.md 流程,改一下。"

Claude 按 R-93 案例分类(纯删 / 措辞对齐 / token 改 / Schema 扩 / template 改)+ 决定改哪层 + 重 inject + Three-Way Sync verify。

---

## 下一步

- **加新场景**(商品 / Waitlist / 你自己想的):见 [reference/03-scenario-define.md](../skill/vibe-page-design-prompt-management/reference/03-scenario-define.md)
- **理解 Skill 架构**:见 [architecture.md](architecture.md)
- **看 Vibe view 战报完整案例**:见 [skill/.../examples/vibe-view-campaign-report/](../skill/vibe-page-design-prompt-management/examples/vibe-view-campaign-report/)(R-76~96 完整迭代历史 + 6 风格 latest Prompt md)
