import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// R-96 fix #6 · agentation 真 mount(dev-only;装在根之外,不阻塞 App 渲染)
import { Agentation } from 'agentation'

// 默认全局暗黑主题 — Tailwind darkMode: 'class' + index.css 覆盖
document.documentElement.classList.add('dark')

// R-99.2 教训 · 不要把 <App /> 包在 <StrictMode> 里:StrictMode dev 双 mount,
// agentation 第一次 mount 的 annotation 会在第二次 mount 时被清掉,导致 Copy 没数据。
// 默认 copyToClipboard=true 走 navigator.clipboard.writeText 已可用。
createRoot(document.getElementById('root')!).render(
  <>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </>,
)
