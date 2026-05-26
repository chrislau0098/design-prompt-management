// DefaultExampleView · R-104
// Design Example for `style=default`.
// Architecture: DialPanel lives in parent; report renders inside ResizableIframe.
// Dial change → dialsToQueryString → iframe src updated → Embed reads fresh URL query.
// DefaultDesignSystemView still renders directly (no iframe needed there).

import { useEffect, useState, useCallback } from 'react'

import { parseDialsFromQuery, dialsToQueryString, DEFAULT_DIALS } from '@/lib/default-dials'
import type { DefaultDialSet } from '@/lib/default-dials'
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

  // Push URL whenever dials change (so share / refresh works)
  const pushUrl = useCallback((next: DefaultDialSet) => {
    const url = dialsToQueryString(next)
    history.pushState(null, '', url)
  }, [])

  function updateDial<K extends keyof DefaultDialSet>(key: K, value: DefaultDialSet[K]) {
    setDials((prev) => {
      const next = { ...prev, [key]: value }
      pushUrl(next)
      return next
    })
  }

  // Listen for back/forward navigation
  useEffect(() => {
    function onPop() {
      setDials(parseDialsFromQuery(new URLSearchParams(window.location.search)))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Build iframe src from current dials — embed=1 signals Embed.tsx to render without chrome
  const iframeSrc = `?embed=1${dialsToQueryString(dials).replace('?', '&')}`

  return (
    <div className="default-example-root" style={{ display: 'flex', alignItems: 'stretch', minHeight: '100%' }}>
      {/* Iframe fills the canvas area — scroll-triggered animations fire naturally */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <ResizableIframe
          src={iframeSrc}
          preset={device}
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
