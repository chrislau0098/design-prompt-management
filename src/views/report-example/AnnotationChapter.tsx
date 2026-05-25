// Chapter 7: Annotation Rail — signature metric + marginalia

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface AnnotationChapterProps {
  pack: string
}

export function AnnotationChapter({ pack }: AnnotationChapterProps) {
  const isSystematic = pack === 'systematic'
  const ann = REPORT_MOCK.annotation
  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="07"
        title={isSystematic ? 'SIGNATURE METRIC' : '签名指标 · Signature Metric'}
      />
      <div className="rep-annotation">
        <div className="rep-ann-primary">
          <div className="rep-ann-eyebrow">{ann.eyebrow}</div>
          <div className="rep-ann-stat">
            <span>{ann.stat}</span>
            {ann.unit && <span className="unit">{ann.unit}</span>}
          </div>
          <p className="rep-ann-claim">{ann.claim}</p>
        </div>
        <aside className="rep-ann-side">
          <div className="label">{ann.sideLabel}</div>
          <p className="text">{ann.sideText}</p>
          <div className="citation">{ann.citation}</div>
        </aside>
      </div>
    </section>
  )
}
