import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// R-96 fix #6 · agentation 真 mount(dev-only;装在根之外,不阻塞 App 渲染)
import { Agentation } from 'agentation'

// 默认全局暗黑主题 — Tailwind darkMode: 'class' + index.css 覆盖
document.documentElement.classList.add('dark')

// R-99.2 · agentation Copy 救援:Chris 反馈 "评论后无法复制"
// 三层保险:
//   1. 默认 copyToClipboard 仍 true(Chrome navigator.clipboard.writeText 走通即 OK)
//   2. onCopy callback 把 markdown dump 到 console + 显示在 DOM 浮窗,Chris 手动 select copy 兜底
//   3. onSubmit 同样 dump,以防 Copy 走 Submit 通道
// StrictMode 撤去 — agentation 内部状态 mount/unmount 双 render 易混乱,dev 不需 StrictMode 双检
function showCopyFallbackPanel(markdown: string) {
  const id = 'agentation-copy-fallback'
  let el = document.getElementById(id) as HTMLDivElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.style.cssText = `position:fixed;right:16px;bottom:60px;width:480px;max-height:50vh;
      overflow:auto;z-index:99999;background:#0f1115;color:#e5e7eb;
      border:1px solid rgba(255,255,255,0.12);border-radius:8px;
      padding:12px;font:11px/1.5 'Geist Mono',ui-monospace,monospace;
      box-shadow:0 10px 30px rgba(0,0,0,0.4);`
    const close = document.createElement('button')
    close.textContent = '×'
    close.style.cssText = 'position:absolute;top:6px;right:8px;background:transparent;border:0;color:#9ca3af;cursor:pointer;font-size:16px;'
    close.onclick = () => el?.remove()
    el.appendChild(close)
    const hint = document.createElement('div')
    hint.textContent = 'agentation markdown(若 Copy 没写入剪贴板,在此手动选中复制):'
    hint.style.cssText = 'color:#9ca3af;margin-bottom:6px;'
    el.appendChild(hint)
    const pre = document.createElement('pre')
    pre.id = id + '-pre'
    pre.style.cssText = 'margin:0;white-space:pre-wrap;word-break:break-word;user-select:all;'
    el.appendChild(pre)
    document.body.appendChild(el)
  }
  const pre = document.getElementById(id + '-pre') as HTMLPreElement | null
  if (pre) pre.textContent = markdown
  console.log('[agentation] copy markdown:\n' + markdown)
}

createRoot(document.getElementById('root')!).render(
  <>
    <App />
    {import.meta.env.DEV && (
      <Agentation
        copyToClipboard
        onCopy={showCopyFallbackPanel}
        onSubmit={showCopyFallbackPanel}
      />
    )}
  </>,
)
