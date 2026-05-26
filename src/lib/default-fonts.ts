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
    'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,400&family=Spectral:ital,wght@0,400;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap',
  ],
  technical: [
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
  ],
  warmth: [
    'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&family=Outfit:wght@400;500&display=swap',
    'https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap',
  ],
  impact: [
    'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&display=swap',
    // 得意黑 (Smiley Sans) via cn-fontsource jsdelivr
    'https://cdn.jsdelivr.net/npm/cn-fontsource-smiley-sans-oblique-regular/font.css',
  ],
  ceremonial: [
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Cinzel:wght@700&display=swap',
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
    title:  '"Fraunces", "Noto Serif SC", "Spectral", "Songti SC", serif',
    number: '"Fraunces", "Spectral", serif',
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
    title:  '"DM Sans", "LXGW WenKai TC", "Outfit", "霞鹜文楷", sans-serif',
    number: '"DM Sans", "Outfit", sans-serif',
    body:   '"Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"DM Mono", "JetBrains Mono", monospace',
  },
  impact: {
    title:  '"Bebas Neue", "Anton", "Smiley Sans Oblique", "得意黑", "Noto Sans SC", sans-serif',
    number: '"Bebas Neue", "Anton", sans-serif',
    body:   '"Noto Sans SC", "PingFang SC", sans-serif',
    mono:   '"JetBrains Mono", monospace',
  },
  ceremonial: {
    title:  '"Playfair Display", "Ma Shan Zheng", "Cinzel", "马善政毛笔楷书", serif',
    number: '"Playfair Display", "Cinzel", serif',
    body:   '"Zhuque Fangsong", "朱雀仿宋", "Noto Serif SC", "FZShuSong-Z01", serif',
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
