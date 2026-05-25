// R-101 Phase 2 · Resizable iframe wrapper for Design Example
// - iframe loads /?embed=1&style=...&device=... (Embed.tsx renders pure ReportExampleView)
// - Manual width adjust via right-edge drag handle (Q-D Chris requirement)
// - Web/Mobile toggle = quick preset (Q-D Chris: "切换 Web|Mobile 只是快速设置宽度值")
// - scroll-triggered animations inside iframe fire naturally (IntersectionObserver per-frame)

import { useEffect, useRef, useState } from 'react'

interface ResizableIframeProps {
  src: string
  preset: 'web' | 'mobile'
  /** Min draggable width */
  minWidth?: number
  /** Max draggable width (defaults to stage width if container measured) */
  maxWidth?: number
}

const PRESET_WIDTHS: Record<'web' | 'mobile', number> = {
  web: 1280,
  mobile: 420,
}

export function ResizableIframe({ src, preset, minWidth = 320, maxWidth }: ResizableIframeProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [stageWidth, setStageWidth] = useState<number>(0)
  const [width, setWidth] = useState<number>(PRESET_WIDTHS[preset])

  // Track stage size for clamping max width to container
  useEffect(() => {
    if (!stageRef.current) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0
      setStageWidth(w)
    })
    ro.observe(stageRef.current)
    return () => ro.disconnect()
  }, [])

  // Re-apply preset whenever the Web/Mobile toggle changes
  useEffect(() => {
    const target = PRESET_WIDTHS[preset]
    // Web = stage-bound (use measured stage width up to PRESET_WIDTHS.web); Mobile = exact 420
    if (preset === 'web') {
      setWidth(stageWidth ? Math.min(stageWidth - 32, PRESET_WIDTHS.web) : PRESET_WIDTHS.web)
    } else {
      setWidth(target)
    }
  }, [preset, stageWidth])

  const max = maxWidth ?? (stageWidth ? stageWidth - 32 : 1920)

  // Drag-to-resize on right edge
  const dragRef = useRef<{ startX: number; startW: number } | null>(null)
  function onMouseDown(e: React.MouseEvent) {
    dragRef.current = { startX: e.clientX, startW: width }
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }
  function onMouseMove(e: MouseEvent) {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    // Resize is centered: 1 px drag → 2 px width change (both sides grow)
    const next = Math.min(max, Math.max(minWidth, dragRef.current.startW + dx * 2))
    setWidth(next)
  }
  function onMouseUp() {
    dragRef.current = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  }

  return (
    <div ref={stageRef} className="resizable-iframe-stage">
      <div className="resizable-iframe-frame" style={{ width }}>
        <iframe
          src={src}
          title="Design Example preview"
          loading="lazy"
          allowFullScreen
          className="resizable-iframe-iframe"
        />
        {/* width readout */}
        <div className="resizable-iframe-badge">{Math.round(width)}px</div>
        {/* right-edge drag handle */}
        <div
          className="resizable-iframe-handle"
          onMouseDown={onMouseDown}
          role="separator"
          aria-orientation="vertical"
          title="Drag to resize"
        />
      </div>
    </div>
  )
}
