// R-101 Phase 2 · Embed mode — pure ReportExampleView for iframe loading
// Visited via /?embed=1&style=warm&device=web (App.tsx routes to this when ?embed= present)
// No sidebar / nav — just the report. scroll-triggered animations (motion whileInView,
// AnimateNumber) fire naturally as the user scrolls inside the iframe.

import { useEffect } from 'react'
import { ReportExampleView } from '@/views/report-example/ReportExampleView'

import warmData from '@/data/warm.slot.json'
import theatreData from '@/data/theatre.slot.json'
import coolData from '@/data/cool.slot.json'
import swissData from '@/data/swiss.slot.json'
import festiveRoyalData from '@/data/festive-royal.slot.json'
import festiveEditorialData from '@/data/festive-editorial.slot.json'

type StyleKey = 'warm' | 'theatre' | 'cool' | 'swiss' | 'festive-royal' | 'festive-editorial'
type DeviceKey = 'web' | 'mobile'

const SLOT_MAP: Record<StyleKey, unknown> = {
  warm: warmData,
  theatre: theatreData,
  cool: coolData,
  swiss: swissData,
  'festive-royal': festiveRoyalData,
  'festive-editorial': festiveEditorialData,
}

const STYLE_KEYS: StyleKey[] = ['warm', 'theatre', 'cool', 'swiss', 'festive-royal', 'festive-editorial']

function getParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name)
}

export function Embed() {
  const styleParam = getParam('style') as StyleKey | null
  const deviceParam = getParam('device') as DeviceKey | null
  const styleKey: StyleKey = styleParam && STYLE_KEYS.includes(styleParam) ? styleParam : 'warm'
  const device: DeviceKey = deviceParam === 'mobile' ? 'mobile' : 'web'

  const slot = SLOT_MAP[styleKey]

  // Embed mode does NOT force dark — let the slot's own bg drive the page
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.body.style.background = 'var(--bg)'
    document.body.style.margin = '0'
    document.body.style.minHeight = '100vh'
    // R-101 Chris feedback · 隐藏 iframe 内滚动条(纯净浏览,scroll 仍可用)
    document.body.classList.add('embed-no-scrollbar')
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ReportExampleView
        styleKey={styleKey}
        slot={slot as Record<string, any>}
        device={device}
      />
    </div>
  )
}
