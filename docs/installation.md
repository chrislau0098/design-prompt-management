# Installation

两个独立组件,按需安装。

---

## A · Claude Code Skill(给设计师 Agent 环境)

把 Skill 拷到 Claude Code 全局 skills 目录(对所有项目可用):

```bash
git clone https://github.com/chrislau0098/design-prompt-management.git
cp -r design-prompt-management/skill/vibe-page-design-prompt-management ~/.claude/skills/
```

或者项目级安装(仅当前项目可用):

```bash
cp -r design-prompt-management/skill/vibe-page-design-prompt-management .claude/skills/
```

启动 Claude Code 后,通过两种方式触发:

- **Slash command**:`/vibe-page-design-prompt-management`
- **自然语言**(基于 description 自动 invoke):"帮我新建一个商品推广页设计风格" / "给这套配图提取 Slot" / "三方 sync 检查 Prompt"

### 验证 Skill 装好

启动 Claude Code,问:

> "我安装了 vibe-page-design-prompt-management Skill 吗?"

Claude 会列出当前可用 skills,确认 `vibe-page-design-prompt-management` 在列。

### 依赖

| 依赖 | 版本 | 何处用 |
|---|---|---|
| Python | 3.10+(stdlib only) | `scripts/inject.py` / `scripts/verify-three-way-sync.py` |
| Bash | macOS / Linux 默认 | `scripts/scaffold-*.sh` |
| `gh` CLI(可选) | latest | 推送项目到 GitHub |

---

## B · Vite Design System Renderer(独立预览)

```bash
cd design-prompt-management/renderer/design-system-renderer-vite
bun install
bun run dev
# 访问 http://localhost:5173
```

3 views(Design System / Report Example / Design Prompt)+ 6 内置示例风格(Warm / Theatre / Cool / Swiss / Festive Royal / Festive Editorial)。

### 依赖

| 依赖 | 版本 |
|---|---|
| Bun | 1.0+ |
| Node | 18+(用 npm 替代 bun 也可) |

---

## 升级 Skill

```bash
cd design-prompt-management
git pull
cp -r skill/vibe-page-design-prompt-management ~/.claude/skills/  # 覆盖
```

Skill 改动**实时生效**(Claude Code 检测到 `~/.claude/skills/` 变化自动 reload,无需重启)。

---

## 卸载

```bash
rm -rf ~/.claude/skills/vibe-page-design-prompt-management
```
