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

import type { DialFontFamily } from '@/lib/default-dials'

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

const FONT_INVENTORY: Record<DialFontFamily, {
  title:  FontEntry[]
  number: FontEntry[]
  body:   FontEntry[]
  mono:   FontEntry[]
}> = {
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
}

const ROLE_LABEL: Record<'title' | 'number' | 'body' | 'mono', string> = {
  title:  'Title · 标题',
  number: 'Number · 数字',
  body:   'Body · 正文',
  mono:   'Mono · 等宽',
}

function SourceBadge({ source }: { source: FontSource }) {
  return (
    <span className={`font-source-badge font-source-${source}`} title={SOURCE_NOTE[source]}>
      {SOURCE_LABEL[source]}
    </span>
  )
}

export function FontInventory({ family }: { family: DialFontFamily }) {
  const inventory = FONT_INVENTORY[family]
  if (!inventory) return null

  const roleKeys = ['title', 'number', 'body', 'mono'] as const

  return (
    <section className="section font-inventory-section" id="m-font-inventory">
      <div className="section-header">
        <span className="section-num">M-02b</span>
        <h2 className="section-title">Font Inventory · 字体清单</h2>
        <span className="section-desc">font_family = <code>{family}</code> · 4 role · CDN 来源标注</span>
      </div>

      <div className="font-inventory-table">
        {roleKeys.map((role) => {
          const entries = inventory[role]
          return (
            <div className="font-role-block" key={role}>
              <div className="font-role-label">{ROLE_LABEL[role]}</div>
              <ol className="font-stack-list">
                {entries.map((entry, idx) => (
                  <li className="font-stack-item" key={idx}>
                    <span className="font-stack-order">{idx + 1}</span>
                    <span className="font-stack-family" style={{ fontFamily: `"${entry.family}", inherit` }}>
                      {entry.family}
                    </span>
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
