// DialPanel.tsx · R-102 Phase 4.9
// Fixed right-side sidebar pane with resizable drag handle.
// Replaces dialkit ColorControl with native input[type=color] + text + preset swatches.
// neutral_temperature removed per spec.

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

import type {
  DefaultDialSet,
  DialFontFamily,
  DialHeroShader,
  DialRadius,
  DialDensity,
  DialAccentStrategy,
  DialMode as AppDialMode,
} from '@/lib/default-dials'
import { DEFAULT_DIALS } from '@/lib/default-dials'
import { NAMED_COLOR_PRESETS } from '@/lib/color-utils'
import './styles.css'

const PRESET_KEYS = ['blue', 'green', 'indigo', 'purple', 'red', 'orange', 'pink', 'slate'] as const

const HEX_RE = /^#[0-9A-Fa-f]{6}$/

export interface DialPanelProps {
  dials: DefaultDialSet
  onChange: <K extends keyof DefaultDialSet>(key: K, value: DefaultDialSet[K]) => void
  onReset: () => void
}

export function DialPanel({ dials, onChange, onReset }: DialPanelProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [panelWidth, setPanelWidth] = useState(320)
  const [hexInput, setHexInput] = useState(dials.brand_color)
  const resizing = useRef(false)
  const resizeStartX = useRef(0)
  const resizeStartW = useRef(0)

  // Sync hex input when brand_color changes externally
  useEffect(() => {
    setHexInput(dials.brand_color)
  }, [dials.brand_color])

  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    resizing.current = true
    resizeStartX.current = e.clientX
    resizeStartW.current = panelWidth
    e.preventDefault()
  }, [panelWidth])

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!resizing.current) return
      // dragging left edge: delta is negative when moving left (wider)
      const delta = resizeStartX.current - e.clientX
      const next = Math.min(480, Math.max(240, resizeStartW.current + delta))
      setPanelWidth(next)
    }
    function onUp() { resizing.current = false }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  function handleHexBlur() {
    const v = hexInput.startsWith('#') ? hexInput : `#${hexInput}`
    if (HEX_RE.test(v)) {
      onChange('brand_color', v.toUpperCase())
    } else {
      setHexInput(dials.brand_color)
    }
  }

  function handleHexKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleHexBlur()
  }

  return (
    <div
      className="dk-sidebar-panel"
      style={{ width: panelWidth }}
    >
      {/* Left drag-resize handle */}
      <div
        className="dk-resize-handle"
        onMouseDown={onResizeMouseDown}
        title="拖拽调整面板宽度"
      />

      {/* Header */}
      <div className="dk-panel-header">
        <span className="dk-panel-title">Dial Controls · 控制面板</span>
        <div className="dk-panel-header-actions">
          <button
            className="dk-panel-action-btn"
            onClick={onReset}
            title="恢复默认值"
          >
            Reset
          </button>
          <button
            className="dk-panel-collapse-btn"
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? '展开' : '收起'}
          >
            {collapsed ? '▸' : '▾'}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 0.84, 0.24, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="dk-panel-body">

              {/* 模式 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">模式</span>
                <div className="dk-toggle-group">
                  {(['light', 'dark'] as AppDialMode[]).map(opt => (
                    <button
                      key={opt}
                      className={`dk-toggle-btn ${dials.mode === opt ? 'active' : ''}`}
                      onClick={() => onChange('mode', opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="dk-preview-swatch" style={{
                  background: dials.mode === 'dark' ? '#1a1a1a' : '#f9f9f9',
                  border: '1px solid rgba(255,255,255,0.15)',
                }} />
              </div>

              {/* 主色 — native ColorPicker 三件套 */}
              <div className="dk-dial-section">
                <span className="dk-dial-label">主色</span>
                <div className="dk-color-picker-row">
                  <input
                    type="color"
                    className="dk-native-color"
                    value={dials.brand_color}
                    onChange={(e) => {
                      onChange('brand_color', e.target.value.toUpperCase())
                    }}
                    title="选择颜色"
                  />
                  <input
                    type="text"
                    className="dk-hex-input"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                    onBlur={handleHexBlur}
                    onKeyDown={handleHexKeyDown}
                    placeholder="#1E40AF"
                    maxLength={7}
                    spellCheck={false}
                  />
                </div>
                <div className="dk-preset-row">
                  {PRESET_KEYS.map(name => {
                    const hex = NAMED_COLOR_PRESETS[name]
                    const isActive = dials.brand_color.toLowerCase() === hex.toLowerCase()
                    return (
                      <button
                        key={name}
                        className={`dk-preset-swatch ${isActive ? 'active' : ''}`}
                        style={{ background: hex }}
                        title={`${name}: ${hex}`}
                        onClick={() => onChange('brand_color', hex)}
                        aria-label={name}
                      />
                    )
                  })}
                </div>
              </div>

              {/* 色相微调 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">色相微调</span>
                <input
                  type="range"
                  className="dk-hue-slider"
                  min={-100}
                  max={100}
                  step={1}
                  value={dials.lightness_shift}
                  onChange={(e) => onChange('lightness_shift', Number(e.target.value))}
                />
                <span className="dk-value-badge">
                  {dials.lightness_shift > 0 ? `+${dials.lightness_shift}` : dials.lightness_shift}
                </span>
              </div>

              {/* 字体 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">字体</span>
                <select
                  className="dk-select"
                  value={dials.font_family}
                  onChange={(e) => onChange('font_family', e.target.value as DialFontFamily)}
                >
                  {(['geometric', 'editorial', 'technical', 'warmth', 'impact', 'ceremonial'] as DialFontFamily[]).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* 背景效果 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">背景效果</span>
                <select
                  className="dk-select"
                  value={dials.hero_shader}
                  onChange={(e) => onChange('hero_shader', e.target.value as DialHeroShader)}
                >
                  {(['mesh', 'grain', 'dithering', 'none'] as DialHeroShader[]).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* 圆角 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">圆角</span>
                <select
                  className="dk-select"
                  value={dials.radius}
                  onChange={(e) => onChange('radius', e.target.value as DialRadius)}
                >
                  {(['sharp', 'crisp', 'soft', 'friendly', 'playful'] as DialRadius[]).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
                <div className="dk-radius-demo" style={{
                  borderRadius: { sharp: 0, crisp: 2, soft: 6, friendly: 12, playful: 16 }[dials.radius],
                }} />
              </div>

              {/* 密度 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">密度</span>
                <select
                  className="dk-select"
                  value={dials.density}
                  onChange={(e) => onChange('density', e.target.value as DialDensity)}
                >
                  {(['sparse', 'balanced', 'dense'] as DialDensity[]).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              {/* 重音 */}
              <div className="dk-dial-row">
                <span className="dk-dial-label">重音</span>
                <select
                  className="dk-select"
                  value={dials.accent_strategy}
                  onChange={(e) => onChange('accent_strategy', e.target.value as DialAccentStrategy)}
                >
                  {(['silent', 'mono', 'semantic'] as DialAccentStrategy[]).map(v => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Re-export DEFAULT_DIALS for convenience in consumers
export { DEFAULT_DIALS }
