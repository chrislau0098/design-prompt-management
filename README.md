# design-prompt-management

> Vite renderer + full library of Design Prompts produced by the [`design-prompt-creator`](https://github.com/chrislau0098/design-prompt-creator) Skill.

This repo serves two purposes:

1. **Preview tool** — a Vite + React app that renders a Design System view, a Report Example, and a Design Prompt viewer (with side-by-side diff between versions) for any Slot JSON in `prompts/`.
2. **Design Prompt library** — every Design Prompt produced by the Skill, organized by scenario × style × version. New prompts are added by PR.

---

## Quick start

```bash
git clone https://github.com/chrislau0098/design-prompt-management.git
cd design-prompt-management
bun install
bun run dev
# Open http://localhost:5173
```

Three views in the top nav:

- **Design System** — atomic tokens (color / typography / spacing) and molecules (Hero / charts / ornaments) for the selected style
- **Report Example** — a fully rendered sample report using the selected style; Web / Mobile toggle in the top-right
- **Design Prompt** — the actual `.md` brief, with Copy and Diff vs Previous Version

Switch styles from the left sidebar.

---

## Repo structure

```
design-prompt-management/
├── package.json, vite.config.ts, src/  # Vite app
├── prompts/                            # Full Design Prompt library
│   └── vibe-view-campaign-report/      # scenario
│       ├── warm-restraint-tech/
│       │   ├── slot.json               # latest style declaration
│       │   ├── v0.1.md, v0.2.md, ...   # every version ever shipped
│       │   └── v1.0.2.md               # latest
│       ├── theatre-dark/
│       ├── cool-precision-tech/
│       ├── swiss-systematic-blue/
│       ├── festive-royal-crimson/
│       └── festive-editorial-crimson/
└── history/                            # Source docs from the bootstrapping project
    ├── Round-Log-vibe-view-campaign-report.md
    ├── slot-schema-v0.md
    ├── PATTERN-block-enriched-v1.md
    └── ...
```

Currently 6 styles × 58 historical Design Prompt md files, plus the full R-76~R-97 iteration log.

---

## Adding a new Design Prompt (PR flow)

You'll typically generate new prompts using the [`design-prompt-creator`](https://github.com/chrislau0098/design-prompt-creator) Skill, then sync them here for the team:

```bash
# In your design project (after generating a new prompt with the Skill)
cd ~/Documents/my-report
./scripts/sync-to-management.sh --scenario campaign-report --style my-new-style
# This copies slot.json + every Design-Prompt-vX.md into ./design-prompt-management/prompts/...

# PR them upstream
cd design-prompt-management
git checkout -b add-my-new-style
git add prompts/
git commit -m "add my-new-style (campaign-report) v0.1"
gh repo fork
git push fork add-my-new-style
gh pr create
```

Once merged, the renderer's sidebar picks up the new style automatically (Vite's `import.meta.glob` reads everything under `prompts/`).

---

## Editing an existing Design Prompt

Edit `prompts/<scenario>/<style>/<vX>.md` directly, or bump the version (`v1.0.2.md` → `v1.0.3.md`). Slot changes go in `slot.json`. The Diff view shows what changed against the previous version.

If a Slot change introduces a Three-Way Sync violation (Prompt ↔ Design System ↔ Report Example disagree), the Skill's `verify-three-way-sync.py` will catch it before the PR lands.

---

## Tech stack

- Vite 6 + React 18 + TypeScript
- Tailwind CSS v3 + shadcn/ui (dark theme by default)
- `@pierre/diffs` for the side-by-side Design Prompt diff
- `@paper-design/shaders-react` for Hero shader previews
- `motion` (formerly Framer Motion) for entry animations
- `recharts` for chart previews

Bundle is intentionally heavy (~2 MB) because Shiki ships every language pack for the diff view. Code-splitting is a future polish.

---

## License

MIT
