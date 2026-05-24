# Architecture

整个 toolkit 围绕**两个核心约束**设计:**弱模型友好**(doubao-seed-code 2.0 / GPT-OSS-20B 等小开源模型)+ **Three-Way Sync**(Prompt ↔ Design System ↔ Report Example 三方一致)。

---

## 三层架构

```
┌─────────────────────────────────────────────────────────────┐
│  PATTERN(场景层 · per-scenario)                              │
│  页面框架 / 段落顺序 / 元素颗粒度                              │
│  scenarios/<scenario>/PATTERN.md                              │
│  不含颜色 / 字重 / shader 选择                                  │
└─────────────────────────────────────────────────────────────┘
                       ⊗
┌─────────────────────────────────────────────────────────────┐
│  STYLE(风格层 · per-style)                                   │
│  Slot JSON · OKLCH tokens / typography / motion / ornament   │
│  <project>/scenarios/<scenario>/slot-examples/<style>.json    │
│  完全数据驱动,无 prose                                          │
└─────────────────────────────────────────────────────────────┘
                       ⊗
┌─────────────────────────────────────────────────────────────┐
│  TEMPLATE(模板层 · 通用)                                      │
│  scenario-agnostic md with `{{slot.path}}` placeholders       │
│  templates/prompt-template.md                                  │
│  inject.py 注入 → 输出最终 Design Prompt md                    │
└─────────────────────────────────────────────────────────────┘
```

每层职责清晰、不交叉。具体规则见 [`reference/99-principles.md`](../skill/vibe-page-design-prompt-management/reference/99-principles.md) **原则 1 + 原则 12**。

---

## Three-Way Sync(Skill 原则 12 · 神圣不可侵犯)

```
Design Prompt(弱模型看到的)
     ⇅                              ┌── Anti-Slop check
Design System(Slot 声明的)         │── 行数 ≤620 verify
     ⇅                              │── Vite renderer DOM verify
Report Example(实际渲染的)         └── (七 + 七 + 八 + 九 + 十一 + 十二 都汇聚)
```

**任何 1 处改动 = 3 处都要 sync**(R-86 #14 + R-94 Stage 6 教训)。验证脚本:`scripts/verify-three-way-sync.py`。

---

## Repo 双轨结构

```
design-prompt-management/
│
├── skill/                                      ← 给 Claude Code Agent 装
│   └── vibe-page-design-prompt-management/
│       ├── SKILL.md                            ← Skill 主入口
│       ├── reference/                          ← Progressive Disclosure 模块
│       ├── templates/                          ← 复用模板
│       ├── scripts/                            ← scaffold + inject + verify
│       ├── scenarios/                          ← 开箱即用场景(campaign-report + 3 stub)
│       └── examples/vibe-view-campaign-report/ ← 完整工作示例(Vibe view 战报)
│
└── renderer/                                   ← 独立 Vite 项目
    └── design-system-renderer-vite/
```

**为什么拆**:Skill 给 Agent 装(cp 到 `~/.claude/skills/`),Renderer 是 Web 应用(`bun dev`)。两者职责不同,独立部署。Skill `scaffold-project.sh` 内部知道 renderer 路径,新项目时可指引 designer 用 renderer。

---

## 工作流(Skill 8 步)

详见 [`SKILL.md`](../skill/vibe-page-design-prompt-management/SKILL.md) `## Workflow Overview`。每步对应一个 `reference/0X-*.md` 模块。

```
Init → Roles → Scenario → Style → Generate → Render → Review → Iterate
 01     02        03        04       05         06        07       08
```

每步是**幂等**的(可重跑 / 可回滚)。

---

## 设计哲学

1. **弱模型上下文宝贵** → Prompt ≤620 行,每字必约束(原则 11)
2. **三方一致是 truth source** → Slot 是 SoT,Prompt 和 Renderer 都是产物
3. **Patch 后必看实际渲染** → 不信文件 grep,要 DOM verify(原则 9)
4. **根因解决不补救** → 修源头 props,不叠遮罩(原则 1)
5. **场景化但模板可复用** → PATTERN 场景特定,TEMPLATE 场景无关,STYLE 风格隔离

---

## 扩展点

- **新场景**:`scaffold-scenario.sh` + 填 PATTERN + components
- **新风格**:`scaffold-style.sh` + 填 Slot JSON(可让 Opus vision sub-agent 从配图自动抽)
- **新原则**:append `reference/99-principles.md`(项目积累的红线)
- **新组件**:加到 `scenarios/<X>/components.md` + Vite renderer `src/components/`
- **替换 renderer**:Vite 是 reference 实现,可 fork 成 Next.js / Astro 等(只要支持 OKLCH + paper-shaders + recharts)

---

## 历史背景

本 toolkit 抽取自 **Vibe view 战报项目**(R-76~R-96,~3 周迭代,6 风格出货,见 `skill/.../examples/vibe-view-campaign-report/Round-Log.md` 完整流水账)。campaign-report scenario 是 MVP 实证,其他 3 场景(promotion / catalog / waitlist)是基于 PATTERN 抽象的 stub,等设计师填。
