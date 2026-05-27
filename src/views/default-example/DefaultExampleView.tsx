// DefaultExampleView · R-112
// Design Example for `style=default`.
// Architecture: DialPanel lives in parent; report renders inside ResizableIframe.
// R-112 fix #1: dial change → postMessage to iframe (no src reload). iframe src is
// frozen to the mount-time dials so React never re-sets src and triggers a reload.
// URL is still pushState'd so share / refresh keeps the configuration.
// Iframe-side (DefaultEmbedView) sends 'embed-ready' once it mounts; parent
// only starts posting 'dials-update' after that signal arrives.

import { useEffect, useState, useCallback, useRef } from 'react'

import { parseDialsFromQuery, dialsToQueryString, DEFAULT_DIALS } from '@/lib/default-dials'
import type { DefaultDialSet } from '@/lib/default-dials'
import { STYLE_PRESETS } from '@/lib/default-style-presets'
import { DialPanel } from './DialPanel'
import { ResizableIframe } from '@/components/resizable-iframe'
import './styles.css'

interface DefaultExampleViewProps {
  device: 'web' | 'mobile'
}

export function DefaultExampleView({ device }: DefaultExampleViewProps) {
  const [dials, setDials] = useState<DefaultDialSet>(() =>
    parseDialsFromQuery(new URLSearchParams(window.location.search))
  )
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const [iframeReady, setIframeReady] = useState(false)

  // R-112 · iframe src is built ONCE at mount and never re-set.
  // After mount, dial updates go through postMessage instead of changing src.
  const [iframeSrc] = useState(() => {
    const initial = parseDialsFromQuery(new URLSearchParams(window.location.search))
    return `?embed=1${dialsToQueryString(initial).replace('?', '&')}`
  })

  // Push URL whenever dials change (so share / refresh works)
  const pushUrl = useCallback((next: DefaultDialSet) => {
    const url = dialsToQueryString(next)
    history.pushState(null, '', url)
  }, [])

  function updateDial<K extends keyof DefaultDialSet>(key: K, value: DefaultDialSet[K]) {
    setDials((prev) => {
      // When font_family changes, auto-apply STYLE_PRESETS for advanced dials
      if (key === 'font_family') {
        const family = value as DefaultDialSet['font_family']
        const preset = STYLE_PRESETS[family]
        const next = { ...prev, font_family: family, ...preset }
        pushUrl(next)
        return next
      }
      const next = { ...prev, [key]: value }
      pushUrl(next)
      return next
    })
  }

  // Listen for back/forward navigation (URL → state)
  useEffect(() => {
    function onPop() {
      setDials(parseDialsFromQuery(new URLSearchParams(window.location.search)))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // R-112 · listen for iframe's 'embed-ready' handshake
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.type === 'embed-ready') setIframeReady(true)
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // R-112 · push dial updates to the iframe AFTER it signaled ready
  useEffect(() => {
    if (!iframeReady) return
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage({ type: 'dials-update', dials }, window.location.origin)
  }, [dials, iframeReady])

  return (
    <div className="default-example-root" style={{ display: 'flex', alignItems: 'stretch', minHeight: '100%' }}>
      {/* Iframe fills the canvas area — scroll-triggered animations fire naturally */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <ResizableIframe
          src={iframeSrc}
          preset={device}
          iframeRef={iframeRef}
        />
      </div>

      {/* Fixed right-side DialPanel — lives outside the iframe */}
      <DialPanel dials={dials} onChange={updateDial} onReset={() => {
        const reset = DEFAULT_DIALS
        setDials(reset)
        history.pushState(null, '', dialsToQueryString(reset))
      }} />
    </div>
  )
}
