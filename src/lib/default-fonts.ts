// default-fonts.ts · R-102 Phase 3
// Dynamic font loading for default dial's font_family. Memo'd — each family loaded once.

import type { DialFontFamily } from './default-dials'

const FONT_LINK_URLS: Record<DialFontFamily, string[]> = {
  geometric: [
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap',
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

// CSS font-family stacks per family (for injecting into --display-stack / --sans-stack / --mono-stack / --body-stack)
export const FONT_STACKS: Record<DialFontFamily, { display: string; sans: string; mono: string; body: string }> = {
  geometric: {
    display: '"Geist", "Helvetica Neue", sans-serif',
    sans: '"Noto Sans SC", "PingFang SC", sans-serif',
    mono: '"Geist Mono", "JetBrains Mono", monospace',
    body: '"Noto Sans SC", "PingFang SC", sans-serif',
  },
  editorial: {
    display: '"Fraunces", "Spectral", Georgia, serif',
    sans: '"Noto Serif SC", "Songti SC", serif',
    mono: '"IBM Plex Mono", monospace',
    body: '"Noto Serif SC", "Source Han Serif SC", serif',
  },
  technical: {
    display: '"JetBrains Mono", "IBM Plex Mono", monospace',
    sans: '"Noto Sans SC", "PingFang SC", sans-serif',
    mono: '"JetBrains Mono", monospace',
    body: '"Noto Sans SC", "PingFang SC", sans-serif',
  },
  warmth: {
    display: '"DM Sans", "Outfit", "Plus Jakarta Sans", sans-serif',
    sans: '"LXGW WenKai TC", "LXGW WenKai", "霞鹜文楷", serif',
    mono: '"DM Mono", monospace',
    body: '"Noto Sans SC", "PingFang SC", sans-serif',
  },
  impact: {
    display: '"Bebas Neue", "Anton", sans-serif',
    sans: '"Smiley Sans Oblique", "得意黑", "Noto Sans SC", sans-serif',
    mono: '"JetBrains Mono", monospace',
    body: '"Noto Sans SC", "PingFang SC", sans-serif',
  },
  ceremonial: {
    // CJK display: Ma Shan Zheng (calligraphic) → Zhuque Fangsong → Noto Serif SC → system serif
    // Latin display: Playfair Display → Cinzel → Cardo → serif
    // Both merged so hero title CJK + Latin are covered by one --display-stack
    display: '"Playfair Display", "Cinzel", "Cardo", "Ma Shan Zheng", "Zhuque Fangsong", "Noto Serif SC", serif',
    sans: '"Ma Shan Zheng", "马善政毛笔楷书", "Zhuque Fangsong", "朱雀仿宋", serif',
    mono: '"IBM Plex Mono", monospace',
    body: '"Zhuque Fangsong", "朱雀仿宋", "FZShuSong-Z01", "方正书宋", "Noto Serif SC", serif',
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
  scopeEl.style.setProperty('--display-stack', stacks.display)
  scopeEl.style.setProperty('--sans-stack', stacks.sans)
  scopeEl.style.setProperty('--mono-stack', stacks.mono)
  scopeEl.style.setProperty('--body-stack', stacks.body)
}
