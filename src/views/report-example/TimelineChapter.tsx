// Chapter 3: Year in Milestones — timeline nodes

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface TimelineChapterProps {
  pack: string
}

export function TimelineChapter({ pack }: TimelineChapterProps) {
  const isSystematic = pack === 'systematic'
  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num="03"
        title={isSystematic ? 'YEAR IN MILESTONES' : '一年节点 · Year in Milestones'}
      />
      <div className="rep-timeline">
        {REPORT_MOCK.timeline.map((m, i) => (
          <div className="rep-tl-node" key={`tl-${i}`}>
            <div className="rep-tl-dot" />
            <div className="rep-tl-period">{m.period}</div>
            <div className="rep-tl-title">{m.title}</div>
            {m.figure && <div className="rep-tl-figure">{m.figure}</div>}
            <p className="rep-tl-detail">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
