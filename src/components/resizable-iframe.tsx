// R-112.6 · Iframe wrapper for Design Example (drag-to-resize 暂去除)
// - iframe loads /?embed=1&style=...&device=... (Embed.tsx renders pure ReportExampleView)
// - Web/Mobile preset 切换决定宽度: Web = stage-bound (max 1280); Mobile = 420 居中
// - R-112.6 Chris feedback: 拖拽调整宽度有 bug,先去除 drag handle + width readout
// - scroll-triggered animations inside iframe fire naturally (IntersectionObserver per-frame)

import { useEffect, useRef, useState } from 'react'

interface ResizableIframeProps {
  src: string
  preset: 'web' | 'mobile'
  /** R-112 · optional ref to the inner iframe element (for postMessage from parent) */
  iframeRef?: React.RefObject<HTMLIFrameElement | null>
}

const PRESET_WIDTHS: Record<'web' | 'mobile', number> = {
  web: 1280,
  mobile: 420,
}

export function ResizableIframe({ src, preset, iframeRef }: ResizableIframeProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageWidth, setStageWidth] = useState<number>(0)
  const [width, setWidth] = useState<number>(PRESET_WIDTHS[preset])

  // Track stage size so Web preset can fit the available column
  useEffect(() => {
    if (!stageRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      setStageWidth(w)
    })
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  // Re-apply preset whenever the Web/Mobile toggle (or stage size) changes
  useEffect(() => {
    if (preset === 'web') {
      // Web = stage-bound (use measured stage width up to PRESET_WIDTHS.web)
      setWidth(stageWidth ? Math.min(stageWidth, PRESET_WIDTHS.web) : PRESET_WIDTHS.web)
    } else {
      setWidth(PRESET_WIDTHS.mobile)
    }
  }, [preset, stageWidth])

  return (
    <div ref={stageRef} className="resizable-iframe-stage">
      <div className="resizable-iframe-frame" style={{ width }}>
        <iframe
          ref={iframeRef}
          src={src}
          title="Design Example preview"
          loading="lazy"
          allowFullScreen
          className="resizable-iframe-iframe"
        />
      </div>
    </div>
  )
}
