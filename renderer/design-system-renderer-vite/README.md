# design-system-renderer-vite

Vibe view R-94 Stage 1 骨架 — Vite + React 18 + shadcn/ui + Tailwind 3。

## 快速启动

```bash
bun run dev      # 开发服务器，默认 http://localhost:5173
bun run build    # 生产构建（输出 dist/）
```

## 依赖版本

| 包 | 版本 | 对齐现 HTML importmap |
|----|------|----------------------|
| react / react-dom | 18.3.1 | yes |
| recharts | 2.13.3 | yes |
| motion | 12.0.0 | yes |
| @paper-design/shaders-react | latest | yes |
| @radix-ui/react-* | latest | yes |
| shadcn/ui | latest (base-ui style) | — |
| tailwindcss | 3.x | shadcn 兼容 |
| @pierre/diffs | 1.2.2 | R-94 新增 |

## 当前状态

Stage 1 OK

- Vite + React 18.3.1 + TS 骨架
- shadcn/ui 初始化（base-ui 版本，OKLCH 颜色系统）
- 6 个 slot JSON 提取到 src/data/（基线：R-93 sync，未改动任何字段）
- App 骨架：3-tab nav / 6 风格 sidebar / Web-Mobile toggle / 主区状态显示
- dev 启动正常（HTTP 200）+ production build 通过

Stage 2+ 待续

- 接入真实 slot 数据渲染各风格组件
- Design Prompt tab：@pierre/diffs 展示 Prompt diff
- Report Example tab：接入现 HTML 渲染逻辑迁移
- Mobile 视图响应式处理

## 注意：base-ui CSS function

shadcn 最新版用 base-ui，其中 CSS 用了 --spacing() 函数（TW v4 语法）。vite.config.ts 中已设 cssMinify: false 绕过 lightningcss 兼容问题，不影响功能。

## 旧版 HTML（仍可用）

```
../design-system-renderer/index.html
```

Chris 验收 baseline，不动。
