// ChapterOpener — handles all three opener variants per pack
// Used by every chapter component to render the chapter head

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ChapterOpenerProps {
  pack: string
  num: string   // e.g. '01'
  title: string
}

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

// Default (editorial, theatrical, instrumental, systematic): vertical stack — eyebrow Badge + h2 title + hairline
const badgeStyle = (isSystematic: boolean): React.CSSProperties => ({
  fontFamily: 'var(--mono-stack)',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontSize: 10,
  fontWeight: isSystematic ? 700 : 500,
  borderColor: 'var(--border-strong)',
  alignSelf: 'flex-start',
})

export function DefaultChapterOpener({ pack, num, title }: ChapterOpenerProps) {
  const isSystematic = pack === 'systematic'
  return (
    <div className="rep-chapter-opener default" key="op">
      <Badge variant="outline" className="rep-chapter-num" style={badgeStyle(isSystematic)}>
        {isSystematic ? num : `CH · ${num}`}
      </Badge>
      <h2 className="rep-chapter-title">
        {isSystematic ? title : title}
      </h2>
      <Separator className="rep-chapter-hairline" />
    </div>
  )
}

export function ChapterOpener({ pack, num, title }: ChapterOpenerProps) {
  if (pack === 'festive-royal') return <FestiveRoyalChapterOpener num={num} title={title} />
  if (pack === 'festive-editorial') return <FestiveEditorialChapterOpener num={num} title={title} />
  return <DefaultChapterOpener pack={pack} num={num} title={title} />
}
