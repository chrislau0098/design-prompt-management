// Outro — per-pack endings
// R-93 改动保留:
//   festive-editorial: HairlineRule + claim + colophon (no END)
//   festive-royal: 終 SealStamp + claim + GoldenHairline + colophon
//   editorial: ember-row ornament + claim + colophon
//   default: ShadSeparator-style hairline + claim + colophon

import { Separator } from '@/components/ui/separator'
import { REPORT_MOCK } from './data'

interface OutroChapterProps {
  pack: string
}

export function OutroChapter({ pack }: OutroChapterProps) {
  const isSystematic = pack === 'systematic'
  const isEditorial = pack === 'editorial'
  const isFestiveRoyal = pack === 'festive-royal'
  const isFestiveEditorial = pack === 'festive-editorial'

  let content: React.ReactNode

  if (isEditorial) {
    content = (
      <>
        <div className="ember-row">
          <span className="ember-rule" />
          <span className="ember-diamond" />
          <span className="ember-rule" />
        </div>
        <p className="rep-outro-claim">{REPORT_MOCK.outro.claim}</p>
        <div className="rep-outro-colophon">{REPORT_MOCK.outro.colophon}</div>
      </>
    )
  } else if (isFestiveRoyal) {
    // festive-royal: 終 SealStamp + claim + GoldenHairline + colophon
    content = (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <svg width={36} height={36} viewBox="0 0 36 36" aria-hidden="true">
            <rect width={36} height={36} rx={2} fill="var(--primary)" />
            <text
              x={18} y={25} textAnchor="middle"
              fontFamily='"Cormorant Garamond", serif'
              fontWeight={700} fontSize={14} fill="var(--bg)"
            >
              終
            </text>
          </svg>
        </div>
        <p className="rep-outro-claim" style={{ fontWeight: 700 }}>{REPORT_MOCK.outro.claim}</p>
        <hr className="festive-royal-golden-hairline" style={{ marginTop: 24 }} />
        <div className="rep-outro-colophon">{REPORT_MOCK.outro.colophon}</div>
      </>
    )
  } else if (isFestiveEditorial) {
    // R-93 A2 · END removed — hairline + claim + colophon only
    content = (
      <>
        <hr className="festive-editorial-hairline" style={{ marginBottom: 24 }} />
        <p className="rep-outro-claim">{REPORT_MOCK.outro.claimSwiss || REPORT_MOCK.outro.claim}</p>
        <div className="rep-outro-colophon">{REPORT_MOCK.outro.colophon}</div>
      </>
    )
  } else {
    // default (systematic, theatrical, instrumental, warm)
    content = (
      <>
        <Separator className="rep-outro-hairline" style={{ marginBottom: 16 }} />
        <p className="rep-outro-claim">
          {isSystematic ? REPORT_MOCK.outro.claimSwiss : REPORT_MOCK.outro.claim}
        </p>
        <div className="rep-outro-colophon">{REPORT_MOCK.outro.colophon}</div>
      </>
    )
  }

  return (
    <section className={`rep-outro rep-chapter ${pack}${isEditorial ? ' editorial' : ''}`}>
      {content}
    </section>
  )
}
