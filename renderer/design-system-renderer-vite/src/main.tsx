import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// R-96 fix #6 · agentation 真 mount(dev-only;装在根之外,不阻塞 App 渲染)
import { Agentation } from 'agentation'

// 默认全局暗黑主题 — Tailwind darkMode: 'class' + index.css 覆盖
document.documentElement.classList.add('dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation />}
  </StrictMode>,
)
