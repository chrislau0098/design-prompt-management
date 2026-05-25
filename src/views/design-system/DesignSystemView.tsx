import { useEffect } from 'react'
import { injectCSSVars } from './oklch'
import { Atomic } from './Atomic'
import { Molecular } from './Molecular'
import { HeroComposition } from './HeroComposition'
import { Ornaments } from './Ornaments'
import './styles.css'

interface DesignSystemViewProps {
  styleKey: string
  slot: Record<string, any>
}

export function DesignSystemView({ slot }: DesignSystemViewProps) {
  // Inject OKLCH CSS vars whenever slot changes
  useEffect(() => {
    injectCSSVars(slot)
  }, [slot])

  const meta = slot.style_meta

  return (
    <div className="ds-container">
      {/* Meta panel */}
      <section className="meta-panel">
        <div className="meta-row">
          <div className="meta-row-label">Ground Truth Signature</div>
          <div className="meta-row-value">{meta?.ground_truth_signature}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Decorative Pack · Focal Strategy</div>
          <div className="meta-row-value">{meta?.decorative_pack} · {meta?.focal_numeral_strategy}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Mode · Brand Hue · Density</div>
          <div className="meta-row-value">{meta?.mode} · H {meta?.brand_hue} · {slot.patterned?.density_lead}</div>
        </div>
        <div className="meta-row">
          <div className="meta-row-label">Hero Shader</div>
          <div className="meta-row-value">
            {slot.molecular?.hero_shader?.component} · {slot.molecular?.hero_geometry?.default_treatment}
          </div>
        </div>
        <div className="meta-proposition">{meta?.description_zh || meta?.proposition}</div>
      </section>

      {/* M-01 Color + M-02 Typography + M-05 RSS */}
      <Atomic slot={slot} />

      {/* M-03 Charts */}
      <Molecular slot={slot} />

      {/* M-04 Hero Composition */}
      <HeroComposition slot={slot} />

      {/* M-06 Ornaments + M-07 Decorative Pack */}
      <Ornaments slot={slot} />
    </div>
  )
}
