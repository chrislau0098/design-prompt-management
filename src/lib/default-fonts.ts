// default-fonts.ts · R-105
// Dynamic font loading for default dial's font_family. Memo'd — each family loaded once.
// Font stack architecture: 4 roles (title / number / body / mono).
// --display-stack and --sans-stack retained as backward-compat aliases for fixed styles.

import type { DialFontFamily } from './default-dials'

const FONT_LINK_URLS: Record<DialFontFamily, string[]> = {
  geometric: [
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap',
  ],
  editorial: [
    // R-106 Fix 3 · Spectral + EB Garamond replace Fraunces (Chris feedback: too rounded + too thick).
    'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,500;0,700;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap',
  ],
  technical: [
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
  ],
  warmth: [
    // R-107 · all rounded — Nunito (rounded sans) + Comfortaa (very rounded display).
    'https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,400;0,500;0,700;1,400&family=Comfortaa:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap',
  ],
  impact: [
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&display=swap',
    // 得意黑 (Smiley Sans) via cn-fontsource jsdelivr
    'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular/font.css',
  ],
  ceremonial: [
    // R-114.3 · 英文换 EB Garamond 主导 (古典印刷衬线,与中文仿宋/毛笔楷书 mood 协调).
    // Playfair Display / Cinzel 保留作为 fallback / number stack 备选.
    'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,700;1,400&family=Cinzel:wght@700&display=swap',
    // 马善政毛笔楷书 via Google Fonts
    'https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&display=swap',
    // 朱雀仿宋 via ZSFT
    'https://fontsapi.zeoseven.com/229/main/result.css',
  ],
}

// CSS font-family stacks per family — 4 roles: title / number / body / mono
export const FONT_STACKS: Record<DialFontFamily, { title: string; number: string; body: string; mono: string }> = {
  geometric: {
    title:  '"Geist", "Noto Sans SC", "PingFang SC", sans-serif',
    number: '"Geist", "Noto Sans SC", sans-serif',
    body:   '"Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"Geist Mono", "JetBrains Mono", monospace',
  },
  editorial: {
    // R-106 Fix 3 · Spectral-led classic serif (replaces chunky Fraunces 700).
    title:  '"Spectral", "EB Garamond", "Noto Serif SC", "Songti SC", serif',
    number: '"Spectral", "EB Garamond", serif',
    body:   '"Noto Serif SC", "Source Han Serif SC", serif',
    mono:   '"IBM Plex Mono", monospace',
  },
  technical: {
    title:  '"JetBrains Mono", "Noto Sans SC", "IBM Plex Mono", monospace',
    number: '"JetBrains Mono", "IBM Plex Mono", monospace',
    body:   '"Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"JetBrains Mono", monospace',
  },
  warmth: {
    // R-107 · all rounded — title/number/body all use Nunito (rounded sans).
    // Chinese: LXGW WenKai 圆润手写体 for title; Noto Sans SC for body readability.
    title:  '"Nunito", "LXGW WenKai TC", "Comfortaa", "霞鹜文楷", sans-serif',
    number: '"Nunito", "Comfortaa", sans-serif',
    body:   '"Nunito", "Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"DM Mono", "JetBrains Mono", monospace',
  },
  impact: {
    title:  '"Bebas Neue", "Anton", "Smiley Sans Oblique", "得意黑", "Noto Sans SC", sans-serif',
    number: '"Bebas Neue", "Anton", sans-serif',
    body:   '"Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"JetBrains Mono", monospace',
  },
  ceremonial: {
    // R-114.3 · EB Garamond 主导英文(古典印刷衬线),与 Ma Shan Zheng / 朱雀仿宋
    // 协调成统一的"传统印刷"mood — 不再混 Playfair Display didone 衍生与
    // 毛笔楷书行书造成的视觉跳脱.
    title:  '"EB Garamond", "Ma Shan Zheng", "Zhuque Fangsong", "马善政毛笔楷书", "朱雀仿宋", "Noto Serif SC", serif',
    number: '"EB Garamond", "Playfair Display", "Cinzel", serif',
    body:   '"EB Garamond", "Zhuque Fangsong", "朱雀仿宋", "Noto Serif SC", "FZShuSong-Z01", serif',
    mono:   '"IBM Plex Mono", monospace',
  },
}

const _loaded = new Set<DialFontFamily>()

export function loadFontFamily(family: DialFontFamily): void {
  if (_loaded.has(family)) return
  _loaded.add(family)

  const urls = FONT_LINK_URLS[family]
  for (const href of urls) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }
}

export function applyFontStack(family: DialFontFamily, scopeEl: HTMLElement): void {
  const stacks = FONT_STACKS[family]
  // New 4-role vars
  scopeEl.style.setProperty('--title-stack', stacks.title)
  scopeEl.style.setProperty('--number-stack', stacks.number)
  scopeEl.style.setProperty('--body-stack', stacks.body)
  scopeEl.style.setProperty('--mono-stack', stacks.mono)
  // Backward compat aliases for fixed-style CSS (they read --display-stack / --sans-stack)
  scopeEl.style.setProperty('--display-stack', stacks.title)
  scopeEl.style.setProperty('--sans-stack', stacks.body)
}
