// FontInventory.tsx · R-117.3
// Per-font_family inventory table for the Design System view. Shows the actual
// stack order (4 roles: title / number / body / mono) with each face's source
// (Google Fonts / jsdelivr / ZSFT / system) and whether a <link> inject is
// required. Lets Chris and downstream consumers see exactly which webfonts a
// font_family route activates — and which ones rely on a system fallback.
//
// Source metadata is hand-authored here (not derived from default-fonts.ts
// FONT_LINK_URLS) because role mapping + system-vs-CDN classification is
// editorial, not algorithmic.

import { useEffect } from 'react'
import type { DialFontFamily } from '@/lib/default-dials'
import { loadFontFamily } from '@/lib/default-fonts'

// R-122 · Support both default-style font_family and 6 fixed style keys
// (warm/cool/theatre/swiss/festive-royal/festive-editorial). family arg
// can be any of these — inventory data is per-key authored below.
export type FontInventoryKey =
  | DialFontFamily
  | 'warm' | 'cool' | 'theatre' | 'swiss'
  | 'festive-royal' | 'festive-editorial'

const DEFAULT_FAMILIES: DialFontFamily[] = ['geometric', 'editorial', 'technical', 'warmth', 'impact', 'ceremonial']

// R-122 fix · Fixed-style CDN link URLs. Fixed styles never had CDN injection
// before (relied on system fonts) — but FontInventory needs the actual face
// loaded to render its sample text. Inject lazily on mount.
const FIXED_FONT_LINK_URLS: Record<string, string[]> = {
  warm: [
    // Geist Variable + Noto Sans SC (both already loaded if default editorial/warmth
    // active, but inject explicitly so fixed-warm visit is self-sufficient).
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap',
  ],
  cool: [
    // Satoshi via jsDelivr cn-fontsource; MiSans via jsDelivr; Noto Sans SC fallback
    'https://cdn.jsdelivr.net/npm/cn-fontsource-satoshi-regular/font.css',
    'https://cdn.jsdelivr.net/npm/cn-fontsource-misans-regular/font.css',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap',
  ],
  theatre: [
    'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap',
  ],
  swiss: [
    // IBM Plex Sans / Mono via Google Fonts; Helvetica Neue is system
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
  ],
  'festive-royal': [
    // Cormorant Garamond + Playfair Display + Noto Serif SC
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&display=swap',
  ],
  'festive-editorial': [
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@400&display=swap',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
  ],
}

const _fixedLoaded = new Set<string>()

function loadFixedStyleFonts(key: string): void {
  if (_fixedLoaded.has(key)) return
  _fixedLoaded.add(key)
  const urls = FIXED_FONT_LINK_URLS[key]
  if (!urls) return
  for (const href of urls) {
    if (document.querySelector(`link[href="${href}"]`)) continue
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }
}

type FontSource = 'google-fonts' | 'jsdelivr' | 'zsft' | 'system'

interface FontEntry {
  family: string
  source: FontSource
  inject: boolean
  notes?: string
}

const SOURCE_LABEL: Record<FontSource, string> = {
  'google-fonts': 'Google Fonts',
  'jsdelivr':     'jsDelivr · cn-fontsource',
  'zsft':         'ZSFT · fontsapi.zeoseven.com',
  'system':       '系统 fallback',
}

const SOURCE_NOTE: Record<FontSource, string> = {
  'google-fonts': 'fonts.googleapis.com/css2 — CDN inject 必需,否则字体走 stack 下一项',
  'jsdelivr':     'cdn.jsdelivr.net/npm/cn-fontsource-* — CDN inject 必需',
  'zsft':         'fontsapi.zeoseven.com/<id>/main/result.css — 国内可达,需 inject',
  'system':       '本地系统字体,无需 CDN inject',
}

type RoleSet = {
  title?:   FontEntry[]
  number?:  FontEntry[]
  body?:    FontEntry[]
  mono?:    FontEntry[]
  display?: FontEntry[]
  sans?:    FontEntry[]
}

// R-122.3 · CSS spec disallows `inherit` inside a font-family stack — must be a
// generic family keyword instead. Pick generic family by role + family hint.
function genericFallbackFor(role: string, family: string): string {
  if (role === 'mono') return 'ui-monospace, monospace'
  // Serif heuristic: family name contains serif markers
  const isSerif = /Garamond|Serif|Songti|Spectral|Cormorant|Playfair|Cinzel|EB Garamond|Zhuque|宋|STSong/i.test(family)
  if (isSerif) return 'ui-serif, serif'
  return 'system-ui, sans-serif'
}

const FONT_INVENTORY: Record<FontInventoryKey, RoleSet> = {
  geometric: {
    title: [
      { family: 'Geist',         source: 'google-fonts', inject: true,  notes: 'Variable 几何无衬线 · Vercel-style' },
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true,  notes: 'CJK 承接' },
      { family: 'PingFang SC',   source: 'system',       inject: false, notes: 'macOS / iOS 系统中文 fallback' },
    ],
    number: [
      { family: 'Geist',         source: 'google-fonts', inject: true,  notes: 'tabular-nums 支持' },
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true },
    ],
    body: [
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true,  notes: 'CJK 正文主体' },
      { family: 'PingFang SC',   source: 'system',       inject: false },
    ],
    mono: [
      { family: 'Geist Mono',    source: 'google-fonts', inject: true,  notes: 'Vercel Mono · 等宽' },
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true,  notes: 'fallback' },
    ],
  },
  editorial: {
    title: [
      { family: 'Spectral',      source: 'google-fonts', inject: true,  notes: '经典印刷衬线 · Google original' },
      { family: 'EB Garamond',   source: 'google-fonts', inject: true,  notes: 'Garamond 复活 · 古典印刷' },
      { family: 'Noto Serif SC', source: 'google-fonts', inject: true,  notes: 'CJK 承接' },
      { family: 'Songti SC',     source: 'system',       inject: false, notes: 'macOS 宋体 fallback' },
    ],
    number: [
      { family: 'Spectral',      source: 'google-fonts', inject: true },
      { family: 'EB Garamond',   source: 'google-fonts', inject: true },
    ],
    body: [
      { family: 'Noto Serif SC', source: 'google-fonts', inject: true,  notes: 'CJK 正文主体 · serif' },
      { family: 'Source Han Serif SC', source: 'system', inject: false },
    ],
    mono: [
      { family: 'IBM Plex Mono', source: 'system',       inject: false, notes: 'IBM 衬线等宽,系统多含此族' },
    ],
  },
  technical: {
    title: [
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true,  notes: 'JetBrains 工程等宽' },
      { family: 'IBM Plex Mono', source: 'google-fonts', inject: true,  notes: 'fallback 等宽' },
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true,  notes: 'CJK 承接(等宽 mood + 黑体)' },
    ],
    number: [
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true,  notes: 'tabular 等宽数字' },
      { family: 'IBM Plex Mono', source: 'google-fonts', inject: true },
    ],
    body: [
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true },
      { family: 'PingFang SC',   source: 'system',       inject: false },
    ],
    mono: [
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true },
    ],
  },
  warmth: {
    title: [
      { family: 'Nunito',        source: 'google-fonts', inject: true,  notes: '圆润无衬线 · 手作感' },
      { family: 'LXGW WenKai TC',source: 'google-fonts', inject: true,  notes: '霞鹜文楷 · 圆润手写体 · 在线' },
      { family: 'Comfortaa',     source: 'google-fonts', inject: true,  notes: '极圆字形 · 装饰用 fallback' },
      { family: '霞鹜文楷',       source: 'system',       inject: false, notes: '若本地装了 LXGW 优先于 CDN' },
    ],
    number: [
      { family: 'Nunito',        source: 'google-fonts', inject: true },
      { family: 'Comfortaa',     source: 'google-fonts', inject: true },
    ],
    body: [
      { family: 'Nunito',        source: 'google-fonts', inject: true,  notes: '英文正文主体' },
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true,  notes: 'CJK 正文 readability' },
      { family: 'PingFang SC',   source: 'system',       inject: false },
    ],
    mono: [
      { family: 'DM Mono',       source: 'google-fonts', inject: true,  notes: '柔和等宽' },
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true,  notes: 'fallback' },
    ],
  },
  impact: {
    title: [
      { family: 'Bebas Neue',    source: 'google-fonts', inject: true,  notes: '大号无衬线 · 海报感' },
      { family: 'Anton',         source: 'google-fonts', inject: true,  notes: 'Bebas 同族浓重 fallback' },
      { family: 'Smiley Sans Oblique', source: 'jsdelivr', inject: true, notes: '得意黑 · 中文倾斜浓重 · cn-fontsource' },
      { family: '得意黑',         source: 'system',       inject: false, notes: '若本地装则优先' },
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true,  notes: 'CJK fallback' },
    ],
    number: [
      { family: 'Bebas Neue',    source: 'google-fonts', inject: true },
      { family: 'Anton',         source: 'google-fonts', inject: true },
    ],
    body: [
      { family: 'Noto Sans SC',  source: 'google-fonts', inject: true },
      { family: 'PingFang SC',   source: 'system',       inject: false },
    ],
    mono: [
      { family: 'JetBrains Mono',source: 'google-fonts', inject: true },
    ],
  },
  ceremonial: {
    title: [
      { family: 'EB Garamond',   source: 'google-fonts', inject: true,  notes: '古典印刷衬线 · 主英文(R-114.3)' },
      { family: 'Ma Shan Zheng', source: 'google-fonts', inject: true,  notes: '马善政毛笔楷书 · 中文主' },
      { family: 'Zhuque Fangsong', source: 'zsft',      inject: true,  notes: '朱雀仿宋 · ZSFT id 229 · 印刷宋' },
      { family: '马善政毛笔楷书',  source: 'system',       inject: false, notes: '本地装则优先于 CDN Ma Shan Zheng' },
      { family: '朱雀仿宋',       source: 'system',       inject: false },
      { family: 'Noto Serif SC', source: 'google-fonts', inject: true,  notes: 'CJK fallback' },
    ],
    number: [
      { family: 'EB Garamond',   source: 'google-fonts', inject: true },
      { family: 'Playfair Display', source: 'google-fonts', inject: true, notes: 'didone 备选 · 大字号用' },
      { family: 'Cinzel',        source: 'google-fonts', inject: true,  notes: 'Roman inscription 古典' },
    ],
    body: [
      { family: 'EB Garamond',   source: 'google-fonts', inject: true },
      { family: 'Zhuque Fangsong', source: 'zsft',       inject: true,  notes: 'CJK 正文 · 仿宋传统印刷' },
      { family: 'Noto Serif SC', source: 'google-fonts', inject: true },
    ],
    mono: [
      { family: 'IBM Plex Mono', source: 'system',       inject: false },
    ],
  },

  // ─── 6 Fixed styles (R-122) ────────────────────────────────────────────────
  // Each fixed style has display + sans + mono roles per slot.json atomic.typography
  warm: {
    display: [
      { family: 'Geist Variable', source: 'google-fonts', inject: true,  notes: '可变粗细 · 几何无衬线' },
      { family: 'Geist',          source: 'google-fonts', inject: true,  notes: 'fallback (静态)' },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true,  notes: 'CJK 承接' },
    ],
    sans: [
      { family: 'Noto Sans SC Variable', source: 'google-fonts', inject: true,  notes: 'CJK 正文可变' },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true },
      { family: 'PingFang SC',    source: 'system',       inject: false, notes: 'macOS / iOS 系统 fallback' },
      { family: 'Helvetica Neue', source: 'system',       inject: false },
    ],
    mono: [
      { family: 'Geist Mono',     source: 'google-fonts', inject: true,  notes: 'Vercel Mono · 等宽' },
    ],
  },
  cool: {
    display: [
      { family: 'Satoshi',        source: 'jsdelivr',     inject: true,  notes: '现代几何无衬线 · cn-fontsource' },
      { family: 'Geist Mono',     source: 'google-fonts', inject: true,  notes: '冷色调 mono fallback' },
    ],
    sans: [
      { family: 'MiSans',         source: 'jsdelivr',     inject: true,  notes: '小米兰亭 · cn-fontsource' },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true },
      { family: 'PingFang SC',    source: 'system',       inject: false },
      { family: 'Source Han Sans SC', source: 'system',   inject: false },
    ],
    mono: [
      { family: 'IBM Plex Mono',  source: 'system',       inject: false, notes: 'IBM 等宽' },
    ],
  },
  theatre: {
    display: [
      { family: 'Geist Variable', source: 'google-fonts', inject: true,  notes: '可变粗细 · 大字号 dramatic' },
      { family: '-apple-system',  source: 'system',       inject: false, notes: 'Apple 系统 fallback' },
      { family: 'system-ui',      source: 'system',       inject: false },
    ],
    sans: [
      { family: 'Noto Sans SC Variable', source: 'google-fonts', inject: true,  notes: 'CJK 正文可变' },
      { family: 'PingFang SC',    source: 'system',       inject: false },
      { family: 'Source Han Sans SC', source: 'system',   inject: false },
    ],
    mono: [
      { family: 'Geist Mono',     source: 'google-fonts', inject: true },
    ],
  },
  swiss: {
    display: [
      { family: 'Helvetica Neue', source: 'system',       inject: false, notes: 'Swiss 国际主义经典 · 本地优先' },
      { family: 'IBM Plex Sans',  source: 'google-fonts', inject: true,  notes: 'CDN 等价 fallback' },
      { family: 'Neue Haas Grotesk', source: 'system',    inject: false, notes: 'Helvetica 原型 · 较少本地' },
    ],
    sans: [
      { family: 'Helvetica Neue', source: 'system',       inject: false },
      { family: 'IBM Plex Sans',  source: 'google-fonts', inject: true },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true,  notes: 'CJK 正文' },
      { family: 'PingFang SC',    source: 'system',       inject: false },
    ],
    mono: [
      { family: 'IBM Plex Mono',  source: 'system',       inject: false },
    ],
  },
  'festive-royal': {
    display: [
      { family: 'Cormorant Garamond', source: 'google-fonts', inject: true,  notes: '古典宋衬线 · 金色焦点字' },
      { family: 'Playfair Display',   source: 'google-fonts', inject: true,  notes: 'didone 备选大字' },
      { family: 'Noto Serif SC',  source: 'google-fonts', inject: true,  notes: 'CJK 衬线主' },
      { family: 'Source Han Serif SC', source: 'system',  inject: false },
    ],
    sans: [
      { family: 'Cormorant Garamond', source: 'google-fonts', inject: true,  notes: '正文也走 serif (中国风衬线主导)' },
      { family: 'Noto Serif SC',  source: 'google-fonts', inject: true },
      { family: 'Songti SC',      source: 'system',       inject: false, notes: 'macOS 宋体' },
      { family: 'STSong',         source: 'system',       inject: false, notes: 'Windows 宋体' },
    ],
    mono: [
      { family: 'IBM Plex Mono',  source: 'system',       inject: false },
    ],
  },
  'festive-editorial': {
    display: [
      { family: 'Helvetica Neue', source: 'system',       inject: false, notes: 'Swiss-inspired sans 大字' },
      { family: 'IBM Plex Sans',  source: 'google-fonts', inject: true,  notes: 'CDN fallback' },
      { family: 'Inter',          source: 'google-fonts', inject: true,  notes: '默认 sans · 可读性强' },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true,  notes: 'CJK 大字' },
    ],
    sans: [
      { family: 'Helvetica Neue', source: 'system',       inject: false },
      { family: 'IBM Plex Sans',  source: 'google-fonts', inject: true },
      { family: 'Inter',          source: 'google-fonts', inject: true },
      { family: 'Noto Sans SC',   source: 'google-fonts', inject: true },
      { family: 'PingFang SC',    source: 'system',       inject: false },
    ],
    mono: [
      { family: 'IBM Plex Mono',  source: 'system',       inject: false },
    ],
  },
}

const ROLE_LABEL: Record<'title' | 'number' | 'body' | 'mono' | 'display' | 'sans', string> = {
  title:   'Title · 标题',
  number:  'Number · 数字',
  body:    'Body · 正文',
  mono:    'Mono · 等宽',
  display: 'Display · 大字',
  sans:    'Sans · 正文',
}

const ROLE_ORDER: Record<'default' | 'fixed', readonly ('title' | 'number' | 'body' | 'mono' | 'display' | 'sans')[]> = {
  default: ['title', 'number', 'body', 'mono'] as const,
  fixed:   ['display', 'sans', 'mono'] as const,
}

// R-122.4 · Sample text split into Latin / CJK rows so font character can
// be eyeballed without CJK fallback hiding Latin differences. Each entry
// renders both rows in the entry.family, but if the family is Latin-only
// (e.g. Geist, Spectral), the CJK row will visibly fall back to
// system/Noto, while the Latin row exposes the actual family's letterforms.
const SAMPLE_LATIN = 'ABCDEFG abcdefg · 0123456789 · !@#$%'
const SAMPLE_CJK   = '天地玄黄 · 宇宙洪荒 · 设计系统 · 字体清单'

function SourceBadge({ source }: { source: FontSource }) {
  return (
    <span className={`font-source-badge font-source-${source}`} title={SOURCE_NOTE[source]}>
      {SOURCE_LABEL[source]}
    </span>
  )
}

export function FontInventory({ family }: { family: FontInventoryKey }) {
  const inventory = FONT_INVENTORY[family]

  // Detect whether this is a default-style 4-role inventory or a fixed-style
  // 3-role inventory (display/sans/mono).
  const isFixedStyle = inventory ? ('display' in inventory || 'sans' in inventory) : false

  // R-122 fix · ensure CDN-injected fonts actually load so sample text 真的渲染
  //   - default 4-role: load all 6 default families (so 切换 dial 时不重复 inject)
  //   - fixed 3-role: load this style's CDN URL list
  useEffect(() => {
    if (!inventory) return
    if (isFixedStyle) {
      loadFixedStyleFonts(family as string)
    } else {
      for (const f of DEFAULT_FAMILIES) loadFontFamily(f)
    }
  }, [family, inventory, isFixedStyle])

  if (!inventory) return null

  const roleKeys = isFixedStyle ? ROLE_ORDER.fixed : ROLE_ORDER.default

  return (
    <section className="section font-inventory-section" id="m-font-inventory">
      <div className="section-header">
        <span className="section-num">M-02b</span>
        <h2 className="section-title">Font Inventory · 字体清单</h2>
        <span className="section-desc">{isFixedStyle ? 'style' : 'font_family'} = <code>{family}</code> · {roleKeys.length} role · CDN 来源标注 · 渲染样例</span>
      </div>

      <div className="font-inventory-table">
        {roleKeys.map((role) => {
          const entries = inventory[role]
          if (!entries) return null
          return (
            <div className="font-role-block" key={role}>
              <div className="font-role-label">{ROLE_LABEL[role]}</div>
              <ol className="font-stack-list">
                {entries.map((entry, idx) => (
                  <li className="font-stack-item" key={idx}>
                    <div className="font-stack-row-meta">
                      <span className="font-stack-order">{idx + 1}</span>
                      <span className="font-stack-family">{entry.family}</span>
                      <SourceBadge source={entry.source} />
                      {entry.inject ? (
                        <span className="font-inject-yes" title="CDN inject 必需 — 通过 <link rel='stylesheet'> 加载">
                          CDN inject
                        </span>
                      ) : (
                        <span className="font-inject-no" title="本地系统字体,无需 inject">
                          local
                        </span>
                      )}
                      {entry.notes && <span className="font-notes">{entry.notes}</span>}
                    </div>
                    <div
                      className="font-stack-sample-block"
                      style={{ fontFamily: `"${entry.family}", ${genericFallbackFor(role, entry.family)}` }}
                      aria-label={`${entry.family} sample`}
                    >
                      <div className="font-stack-sample font-stack-sample-latin">{SAMPLE_LATIN}</div>
                      <div className="font-stack-sample font-stack-sample-cjk">{SAMPLE_CJK}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )
        })}
      </div>

      <div className="font-inventory-legend">
        <strong>来源说明 ·</strong>
        <span><code>Google Fonts</code> — <code>fonts.googleapis.com/css2</code>,国际 CDN,大陆可达但偶有延迟</span>
        <span><code>jsDelivr</code> — <code>cdn.jsdelivr.net/npm/cn-fontsource-*</code>,大陆速度快</span>
        <span><code>ZSFT</code> — <code>fontsapi.zeoseven.com/&lt;id&gt;/main/result.css</code>,作者直接分发</span>
        <span><code>系统</code> — 本地预装(macOS PingFang / 霞鹜文楷 / 得意黑),无需 CDN</span>
      </div>
    </section>
  )
}
