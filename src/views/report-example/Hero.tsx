import * as PaperShaders from '@paper-design/shaders-react'
import { REPORT_MOCK } from './data'

interface HeroProps {
  pack: string
  slot: Record<string, any>
}

// normalizeShaderProps: reuse logic from HeroComposition (same API constraints)
function normalizeShaderProps(componentName: string, rawProps: Record<string, any>): Record<string, any> {
  const props = { ...rawProps }
  if (componentName === 'Dithering') {
    if (typeof props.type === 'string') {
      const t = props.type.toLowerCase()
      if (t.includes('8x8') || t.includes('8×8')) props.type = '8x8'
      else if (t.includes('4x4') || t.includes('4×4')) props.type = '4x4'
      else if (t.includes('2x2') || t.includes('2×2')) props.type = '2x2'
      else if (t.includes('random')) props.type = 'random'
    }
    if (typeof props.shape === 'string') {
      const s = props.shape.toLowerCase()
      const valid = ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere']
      props.shape = valid.includes(s) ? s : (s === 'noise' ? 'simplex' : 'sphere')
    }
    if (props.pxSize !== undefined && props.size === undefined) props.size = props.pxSize
    delete props.pxSize
  }
  delete props.speed_off_viewport
  return props
}

function HeroShader({ slot }: { slot: Record<string, any> }) {
  const shader = slot.molecular?.hero_shader
  if (!shader?.component) return null
  const normalizedProps = normalizeShaderProps(shader.component, shader.props ?? {})
  const Comp = (PaperShaders as any)[shader.component]
  if (!Comp) return null
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const cleanProps = { ...normalizedProps }
  if (reducedMotion) cleanProps.speed = 0
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Comp {...cleanProps} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export function Hero({ pack, slot }: HeroProps) {
  const isSystematic = pack === 'systematic'

  return (
    <section className={`rep-hero ${pack}`}>
      {/* R-93 A1 · Cinnabar Imprint removed (Chris reject R-92 #26) */}
      <div className="rep-hero-shader" aria-hidden="true">
        <HeroShader slot={slot} />
      </div>
      <div className={`rep-hero-shader-wash ${pack}`} aria-hidden="true" />

      <div className="rep-hero-eyebrow">{REPORT_MOCK.eyebrow}</div>

      <h1 className="rep-hero-title">
        {isSystematic ? REPORT_MOCK.titleSwiss : REPORT_MOCK.title}
      </h1>

      <div className="rep-hero-bigrow">
        <div className="rep-hero-num">
          <span className="pfx">{REPORT_MOCK.gmv.prefix}</span>
          <span>{REPORT_MOCK.gmv.num}</span>
          <span className="unit">{REPORT_MOCK.gmv.unit}</span>
        </div>
        <div className="rep-hero-delta">
          <span>{REPORT_MOCK.delta.dir === 'up' ? '▲' : '▼'}</span>
          <span>{REPORT_MOCK.delta.value}</span>
          <span className="label">{REPORT_MOCK.delta.label}</span>
        </div>
      </div>

      <p className="rep-hero-lead">{REPORT_MOCK.lead}</p>
    </section>
  )
}
