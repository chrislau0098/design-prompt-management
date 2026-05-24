// Chapter 8: Quote interstitial — no chapter opener (it's a pause)

import { REPORT_MOCK } from './data'

interface QuoteChapterProps {
  pack: string
}

export function QuoteChapter({ pack }: QuoteChapterProps) {
  const isSystematic = pack === 'systematic'
  const isEditorial = pack === 'editorial'
  const isFestiveRoyal = pack === 'festive-royal'
  const isFestiveEditorial = pack === 'festive-editorial'

  // Quote mark SVG per pack
  const quoteMark = isEditorial ? (
    <svg width={36} height={36} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M 2 38 L 2 2 L 38 2" stroke="var(--primary)" strokeWidth={1} strokeOpacity={0.6} strokeLinecap="square" />
    </svg>
  ) : isSystematic ? null // Swiss: no quote mark, bold caps text
    : isFestiveRoyal ? null // Festive Royal: CJK bracket lead-in (inline text)
    : isFestiveEditorial ? null // Festive Editorial: em-dash lead-in (inline text)
    : (
      <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
      </svg>
    )

  // Quote text per pack
  const quoteText = isSystematic
    ? REPORT_MOCK.quote.textSwiss
    : isFestiveRoyal
    ? (
      <span>
        <span style={{ color: 'var(--primary)', fontWeight: 500 }}>「</span>
        {REPORT_MOCK.quote.text}
        <span style={{ color: 'var(--primary)', fontWeight: 500 }}>」</span>
      </span>
    )
    : isFestiveEditorial
    ? (
      <span>
        <span style={{ color: 'var(--primary)', fontWeight: 800 }}>— </span>
        {REPORT_MOCK.quote.text}
        <span style={{ color: 'var(--primary)', fontWeight: 800 }}> —</span>
      </span>
    )
    : `"${REPORT_MOCK.quote.text}"`

  return (
    <section className={`rep-chapter ${pack}`}>
      <div className="rep-quote">
        {quoteMark && (
          <span className="rep-quote-mark">{quoteMark}</span>
        )}
        <p className={`rep-quote-text${isEditorial ? ' editorial' : ''}`}>
          {quoteText}
        </p>
        <span className="rep-quote-cite">{REPORT_MOCK.quote.cite}</span>
      </div>
    </section>
  )
}
