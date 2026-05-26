// Chapter 5: Peer Set / Ranking

import { ChapterOpener } from './ChapterOpener'
import { REPORT_MOCK } from './data'

interface RankingChapterProps {
  pack: string
  num?: string
}

export function RankingChapter({ pack, num = '05' }: RankingChapterProps) {
  const isSystematic = pack === 'systematic'
  return (
    <section className={`rep-chapter ${pack}`}>
      <ChapterOpener
        pack={pack}
        num={num}
        title={isSystematic ? 'PEER SET' : '同业坐标 · Peer Set'}
      />
      <div className="rep-ranking">
        {REPORT_MOCK.ranking.map((r, i) => (
          <div
            className={`rep-rank-row${r.lead ? ' lead' : ''}${i > 0 ? ' secondary' : ''}`}
            key={`rk-${i}`}
          >
            <div className="rep-rank-no">{r.rank}</div>
            <div className="rep-rank-name">
              <span>{r.name}</span>
              {r.sub && <span className="sub">{r.sub}</span>}
            </div>
            <div className="rep-rank-value">
              <span style={{ fontSize: '0.55em', color: 'var(--fg-3)', marginRight: 2 }}>¥</span>
              <span>{r.value}</span>
              <span className="unit">{r.unit}</span>
            </div>
            {r.share && (
              <div className="rep-rank-share">{r.share}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
