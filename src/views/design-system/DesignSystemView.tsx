import { useEffect, useState, useMemo } from 'react'
import { injectCSSVars } from './oklch'
import { Atomic } from './Atomic'
import { Molecular } from './Molecular'
import { HeroComposition } from './HeroComposition'
import { Ornaments } from './Ornaments'
import { loadLatestPromptMd } from '../design-prompt/glob-loader'
import { parsePromptOrnaments } from '@/lib/parse-prompt-ornaments'
import './styles.css'

interface DesignSystemViewProps {
  styleKey: string
  slot: Record<string, any>
}

export function DesignSystemView({ styleKey, slot }: DesignSystemViewProps) {
  // Inject OKLCH CSS vars whenever slot changes
  useEffect(() => {
    injectCSSVars(slot)
  }, [slot])

  const meta = slot.style_meta

  // R-101 Phase 3 · 加载当前风格 latest Prompt md → 解析装饰元素清单
  // 用途:Chris 视觉 audit — DS 中显示的装饰元素是否与 Prompt 描述对齐(Prompt-driven filter,
  //      System ⊆ Prompt)。本轮先展示 chip strip(transparency),per-section hard hide 留 R-102。
  const [promptMd, setPromptMd] = useState<string>('')
  useEffect(() => {
    loadLatestPromptMd(styleKey).then(setPromptMd)
  }, [styleKey])
  const visible = useMemo(() => parsePromptOrnaments(promptMd), [promptMd])
  const visibleList = Array.from(visible)

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
        {/* R-101 Phase 3 · Prompt-driven ornament chip strip(System ⊆ Prompt 一致性 audit)*/}
        {visibleList.length > 0 && (
          <div className="meta-row" style={{ marginTop: 12, alignItems: 'flex-start' }}>
            <div className="meta-row-label">Prompt 涉及装饰</div>
            <div className="meta-row-value" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {visibleList.map((name) => (
                <span key={name} className="ornament-chip">{name}</span>
              ))}
            </div>
          </div>
        )}
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
