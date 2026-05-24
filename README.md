# design-prompt-management

> AI-powered Design Prompt management toolkit for designers — Claude Code Skill + Vite-based Design System Renderer.

把 "参考配图 → Design System → Report Example → 多轮迭代输出 Design Prompt" 完整流程打包成可复用工具,适合设计师 / 设计工程师团队接入自己 Claude Code 环境。

## 仓库结构

```
design-prompt-management/
├── skill/                                    # Claude Code Skill
│   └── vibe-page-design-prompt-management/
│       ├── SKILL.md                          # Skill 主入口
│       ├── reference/                        # Progressive Disclosure 模块
│       ├── templates/                        # 复用 templates
│       ├── scripts/                          # 执行脚本
│       ├── scenarios/                        # 开箱即用场景(战报 / 商品 / Waitlist 等)
│       └── examples/                         # 完整工作示例(Vibe view 战报项目)
├── renderer/                                 # 独立 Vite Design System Renderer
│   └── design-system-renderer-vite/
└── docs/                                     # 文档
```

## 安装

### Skill(Claude Code Agent 环境)

```bash
git clone https://github.com/chrislau0098/design-prompt-management.git
cp -r design-prompt-management/skill/vibe-page-design-prompt-management ~/.claude/skills/
```

启动 Claude Code 即可用 `/vibe-page-design-prompt-management` 调起,或自然语言 prompt(Claude 会自动 match)。

### Renderer(独立 Vite 项目)

```bash
cd design-prompt-management/renderer/design-system-renderer-vite
bun install
bun run dev
# 访问 http://localhost:5173
```

## 快速上手

详见 [`skill/.../docs/quickstart.md`](skill/vibe-page-design-prompt-management/docs/quickstart.md)。

## License

MIT
