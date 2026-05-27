// ChapterOpener — handles opener variants per pack AND per font_family (default).
// R-113.4: when used inside FontFamilyContext (default style), pick a
// scenario-distinct variant per font_family. Fixed styles (festive-royal /
// festive-editorial / theatrical / instrumental / systematic / editorial) keep
// their original pack-based rendering.

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useFontFamily } from '@/components/font-family-context'

interface ChapterOpenerProps {
  pack: string
  num: string   // e.g. '01'
  title: string
}

// ── Fixed style openers (unchanged) ───────────────────────────────────────

// Festive Royal: GoldenHairline + SealStamp SVG + h2
export function FestiveRoyalChapterOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener festive-royal" key="op">
      <hr className="festive-royal-golden-hairline" style={{ marginBottom: 16 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <svg width={36} height={36} viewBox="0 0 36 36" aria-hidden="true">
          <rect width={36} height={36} rx={2} fill="var(--primary)" />
          <text
            x={18} y={25} textAnchor="middle"
            fontFamily='"Cormorant Garamond", serif'
            fontWeight={700} fontSize={18} fill="var(--bg)"
          >
            {num}
          </text>
        </svg>
        <h2 className="rep-chapter-title">{title}</h2>
      </div>
    </div>
  )
}

// Festive Editorial: HairlineRule + ChapterNumeralLarge + h2
export function FestiveEditorialChapterOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener festive-editorial" key="op">
      <hr className="festive-editorial-hairline" style={{ marginBottom: 12 }} />
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span className="rep-chapter-num festive-editorial">{num}</span>
        <h2 className="rep-chapter-title festive-editorial">{title}</h2>
      </div>
    </div>
  )
}

// Default opener for fixed packs other than festive-* (editorial, theatrical,
// instrumental, systematic): vertical stack — eyebrow Badge + h2 title + hairline
const badgeStyle = (isSystematic: boolean): React.CSSProperties => ({
  fontFamily: 'var(--mono-stack)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontSize: 10,
  fontWeight: isSystematic ? 700 : 500,
  borderColor: 'var(--border-strong)',
  alignSelf: 'flex-start',
})

export function FixedStyleChapterOpener({ pack, num, title }: ChapterOpenerProps) {
  const isSystematic = pack === 'systematic'
  return (
    <div className="rep-chapter-opener default" key="op">
      <Badge variant="outline" className="rep-chapter-num" style={badgeStyle(isSystematic)}>
        {isSystematic ? num : `CH · ${num}`}
      </Badge>
      <h2 className="rep-chapter-title">{title}</h2>
      <Separator className="rep-chapter-hairline" />
    </div>
  )
}

// ── Default style variants (one per font_family dial) ─────────────────────
// Each variant ships its own visual rhythm so the chapter rhythm shifts
// meaningfully when Chris switches font_family — not just type.

function GeometricOpener({ num, title }: { num: string; title: string }) {
  // R-114.2 · Chapter stamp 移到标题左上角(stamp 独占一行 → title 一行 → hairline)
  return (
    <div className="rep-chapter-opener default variant-geometric" key="op">
      <div className="rco-geo-stamp">
        <span className="rco-geo-bar" aria-hidden />
        <span className="rco-geo-num">CH · {num}</span>
      </div>
      <h2 className="rep-chapter-title">{title}</h2>
      <Separator className="rep-chapter-hairline" />
    </div>
  )
}

function EditorialOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener default variant-editorial" key="op">
      <span className="rco-edit-num" aria-hidden>{num}</span>
      <h2 className="rep-chapter-title">{title}</h2>
      <hr className="rco-edit-hairline" />
    </div>
  )
}

function TechnicalOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener default variant-technical" key="op">
      <div className="rco-tech-row">
        <span className="rco-tech-bracket">[CH-{num}]</span>
        <h2 className="rep-chapter-title">{title}</h2>
      </div>
      <hr className="rco-tech-hairline" />
    </div>
  )
}

function WarmthOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener default variant-warmth" key="op">
      <div className="rco-warm-row">
        <span className="rco-warm-circle" aria-hidden>{num}</span>
        <h2 className="rep-chapter-title">{title}</h2>
      </div>
      <hr className="rco-warm-hairline" />
    </div>
  )
}

function ImpactOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener default variant-impact" key="op">
      <div className="rco-impact-row">
        <span className="rco-impact-num" aria-hidden>{num}</span>
        <h2 className="rep-chapter-title">{title}</h2>
      </div>
      <hr className="rco-impact-hairline" />
    </div>
  )
}

function CeremonialOpener({ num, title }: { num: string; title: string }) {
  return (
    <div className="rep-chapter-opener default variant-ceremonial" key="op">
      <div className="rco-cere-row">
        <span className="rco-cere-frame" aria-hidden>
          <span className="rco-cere-mark">◆</span>
          <span className="rco-cere-num">{num}</span>
          <span className="rco-cere-mark">◆</span>
        </span>
        <h2 className="rep-chapter-title">{title}</h2>
      </div>
      <hr className="rco-cere-hairline" />
    </div>
  )
}

export function ChapterOpener({ pack, num, title }: ChapterOpenerProps) {
  const fontFamily = useFontFamily()

  // Fixed styles short-circuit first
  if (pack === 'festive-royal') return <FestiveRoyalChapterOpener num={num} title={title} />
  if (pack === 'festive-editorial') return <FestiveEditorialChapterOpener num={num} title={title} />
  if (pack !== 'default') return <FixedStyleChapterOpener pack={pack} num={num} title={title} />

  // Default style: pick a variant by font_family dial
  if (fontFamily === 'geometric')  return <GeometricOpener  num={num} title={title} />
  if (fontFamily === 'editorial')  return <EditorialOpener  num={num} title={title} />
  if (fontFamily === 'technical')  return <TechnicalOpener  num={num} title={title} />
  if (fontFamily === 'warmth')     return <WarmthOpener     num={num} title={title} />
  if (fontFamily === 'impact')     return <ImpactOpener     num={num} title={title} />
  if (fontFamily === 'ceremonial') return <CeremonialOpener num={num} title={title} />

  // Default style w/o context (unlikely): fall back to legacy
  return <FixedStyleChapterOpener pack="default" num={num} title={title} />
}

// Backward-compat export: some files may still import DefaultChapterOpener
export const DefaultChapterOpener = FixedStyleChapterOpener
