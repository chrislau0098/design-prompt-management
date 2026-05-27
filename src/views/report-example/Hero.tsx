import * as PaperShaders from '@paper-design/shaders-react'
import { REPORT_MOCK } from './data'
import { AnimNum } from '@/components/anim-number'

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

// R-113.5 · Hero image background mode. When slot.molecular.hero_image_url is set,
// the shader layer is replaced with an <img> filling the section, plus a tinted
// overlay (driven by --mode) to keep title text legible. Falls back to shader
// when no image is provided.
function HeroBackground({ slot }: { slot: Record<string, any> }) {
  const heroImageUrl = slot.molecular?.hero_image_url as string | undefined
  if (heroImageUrl) {
    return (
      <>
        <div className="rep-hero-bg-image" aria-hidden="true">
          <img src={heroImageUrl} alt="" loading="lazy" />
        </div>
        <div className="rep-hero-bg-image-overlay" aria-hidden="true" />
      </>
    )
  }
  return (
    <div className="rep-hero-shader" aria-hidden="true">
      <HeroShader slot={slot} />
    </div>
  )
}

export function Hero({ pack, slot }: HeroProps) {
  const isSystematic = pack === 'systematic'
  const isDefault = pack === 'default'
  const hasHeroImage = Boolean(slot.molecular?.hero_image_url)

  // Default style: two-column grid layout (left: copy / right: peak number).
  // Fixed styles: keep the original vertical-stack composition.
  if (isDefault) {
    return (
      <section
        className={`rep-hero default ${hasHeroImage ? 'has-hero-image' : ''}`}
      >
        <HeroBackground slot={slot} />
        <div className={`rep-hero-shader-wash ${pack}`} aria-hidden="true" />

        <div className="rep-hero-grid">
          <div className="rep-hero-col-copy">
            <div className="rep-hero-eyebrow">{REPORT_MOCK.eyebrow}</div>
            <h1 className="rep-hero-title">{REPORT_MOCK.title}</h1>
            <p className="rep-hero-lead">{REPORT_MOCK.lead}</p>
          </div>

          <div className="rep-hero-col-figure">
            <div className="rep-hero-num">
              <span className="pfx">{REPORT_MOCK.gmv.prefix}</span>
              <AnimNum text={REPORT_MOCK.gmv.num} durationS={1.8} />
              <span className="unit">{REPORT_MOCK.gmv.unit}</span>
            </div>
            <div className="rep-hero-delta">
              <span>{REPORT_MOCK.delta.dir === 'up' ? '▲' : '▼'}</span>
              <span>{REPORT_MOCK.delta.value}</span>
              <span className="label">{REPORT_MOCK.delta.label}</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Fixed styles — vertical stack (unchanged)
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
          <AnimNum text={REPORT_MOCK.gmv.num} durationS={1.8} />
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
