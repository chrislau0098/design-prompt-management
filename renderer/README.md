# Renderer

独立 Vite Design System Renderer · 通用版,可挂接任何项目的 `slot-examples/*.slot.json`。

## 当前状态

`design-system-renderer-vite/` 是 Vibe view 项目 R-94+ 移植的实现,默认带 6 个示例风格(Warm / Theatre / Cool / Swiss / Festive Royal / Festive Editorial)。

## 启动

```bash
cd design-system-renderer-vite
bun install
bun run dev
# 访问 http://localhost:5173
```

## 自定义

替换 `src/data/*.slot.json` 为自己的风格 Slot,自动展示对应 Design System 和 Report Example。详见 [`docs/customize-renderer.md`](../docs/customize-renderer.md)(R-97 Phase 8 完善)。
