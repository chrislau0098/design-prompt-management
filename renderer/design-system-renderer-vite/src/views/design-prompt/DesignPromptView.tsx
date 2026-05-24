/**
 * Design Prompt View · R-95 Cluster B
 * 设计美化:
 *  - shadcn Button + lucide-react Copy icon
 *  - Full / Diff vs Previous toggle(@pierre/diffs File + FileDiff)
 *  - overflow: 'wrap' 不左右滚
 *  - shadcn Accordion-style changelog(用 details 但样式重做)
 */
import { useState, useCallback, useMemo } from 'react'
import { File, FileDiff } from '@pierre/diffs/react'
import { parseDiffFromFile } from '@pierre/diffs'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Copy, Check, FileText, GitCompare, ChevronDown } from 'lucide-react'

// Current versions
import warmMd from '@/data/prompts/warm.md?raw'
import theatreMd from '@/data/prompts/theatre.md?raw'
import coolMd from '@/data/prompts/cool.md?raw'
import swissMd from '@/data/prompts/swiss.md?raw'
import festiveRoyalMd from '@/data/prompts/festive-royal.md?raw'
import festiveEditorialMd from '@/data/prompts/festive-editorial.md?raw'

// Previous versions (R-95 Stage 3 — for Diff view)
import warmPrevMd from '@/data/prompts-previous/warm.md?raw'
import theatrePrevMd from '@/data/prompts-previous/theatre.md?raw'
import coolPrevMd from '@/data/prompts-previous/cool.md?raw'
import swissPrevMd from '@/data/prompts-previous/swiss.md?raw'
import festiveRoyalPrevMd from '@/data/prompts-previous/festive-royal.md?raw'
import festiveEditorialPrevMd from '@/data/prompts-previous/festive-editorial.md?raw'

import './styles.css'

type StyleKey =
  | 'warm'
  | 'theatre'
  | 'cool'
  | 'swiss'
  | 'festive-royal'
  | 'festive-editorial'

type PromptTab = 'full' | 'diff'

interface PromptMeta {
  contents: string
  previousContents: string
  previousVersion: string
  version: string
  updated: string
  changelog: { version: string; date: string; note: string }[]
  filename: string
}

const PROMPT_MAP: Record<StyleKey, PromptMeta> = {
  warm: {
    contents: warmMd,
    previousContents: warmPrevMd,
    previousVersion: 'v1.0.1',
    version: 'v1.0.2',
    updated: '2026-05-24',
    filename: 'warm-restraint-tech-Design-Prompt-v1.0.2.md',
    changelog: [
      { version: 'v1.0.2', date: '2026-05-24', note: 'R-94 Stage 6 · ChapterStamp → ChapterBanner 措辞对齐(editorial pack uses ChapterBanner not SVG)' },
      { version: 'v1.0.1', date: '2026-05-20', note: 'R-80 · Phase 0 baseline stable + doubao 实测通过' },
    ],
  },
  theatre: {
    contents: theatreMd,
    previousContents: theatrePrevMd,
    previousVersion: 'v6.7.1',
    version: 'v6.7.2',
    updated: '2026-05-24',
    filename: 'Design-Prompt_Theatre-Dark-v6.7.2_Data-Campaign-Report.md',
    changelog: [
      { version: 'v6.7.2', date: '2026-05-24', note: 'R-94 Stage 6 · 删 SpotlightGradient 段(Report Example 不渲染)' },
      { version: 'v6.7.1', date: '2026-05-20', note: 'R-80 · Phase 0 baseline stable' },
    ],
  },
  cool: {
    contents: coolMd,
    previousContents: coolPrevMd,
    previousVersion: 'v0.5.1',
    version: 'v0.5.2',
    updated: '2026-05-24',
    filename: 'Design-Prompt_Cool-Precision-Tech-v0.5.2_Data-Campaign-Report.md',
    changelog: [
      { version: 'v0.5.2', date: '2026-05-24', note: 'R-94 Stage 6 · 删 OutlinedPill + drawn-horizon Hero-only 标注' },
      { version: 'v0.5.1', date: '2026-05-20', note: 'R-80 · Phase 0 baseline stable' },
    ],
  },
  swiss: {
    contents: swissMd,
    previousContents: swissPrevMd,
    previousVersion: 'v0.7',
    version: 'v0.8',
    updated: '2026-05-24',
    filename: 'swiss-systematic-blue-Design-Prompt-v0.8.md',
    changelog: [
      { version: 'v0.8', date: '2026-05-24', note: 'R-95 Cluster A trim · 626→604(-22):§2 color rule 紧化 + §6 whileInView 浓缩 + §17 Tooltip 缩 + 装饰空行;约束力 0 弱化 + manual_override flag' },
      { version: 'v0.7', date: '2026-05-24', note: 'R-94 Stage 6 · ChapterStamp solid-fill → ChapterBanner(ShadBadge outline)+ HairlineRule → ShadSeparator' },
      { version: 'v0.5', date: '2026-05-22', note: 'R-83 · a11y fix(Dithering colorFront 减淡)+ Hero ≠ chapter 规则' },
    ],
  },
  'festive-royal': {
    contents: festiveRoyalMd,
    previousContents: festiveRoyalPrevMd,
    previousVersion: 'v0.2',
    version: 'v0.3',
    updated: '2026-05-24',
    filename: 'festive-royal-crimson-Design-Prompt-v0.3.md',
    changelog: [
      { version: 'v0.3', date: '2026-05-24', note: 'R-95 Cluster A trim · 666→611(-55):§2 chromatic 浓缩 + §10/§11.3/§13.1/§4/§17 trim + GoldenHairline snippet inline 化 + 装饰空行;manual_override flag' },
      { version: 'v0.2', date: '2026-05-24', note: 'R-94 Stage 6 · 删 TasselDivider(三方 P/D/R sync,Report Example 不渲染)' },
      { version: 'v0.1', date: '2026-05-24', note: 'R-90 · Phase C.1.A · Festive Royal 首发(chromatic + serif + GrainGradient 深红 wave grain + SealStamp + GoldenHairline)' },
    ],
  },
  'festive-editorial': {
    contents: festiveEditorialMd,
    previousContents: festiveEditorialPrevMd,
    previousVersion: 'v0.2',
    version: 'v0.3',
    updated: '2026-05-24',
    filename: 'festive-editorial-crimson-Design-Prompt-v0.3.md',
    changelog: [
      { version: 'v0.3', date: '2026-05-24', note: 'R-95 Cluster A trim · 677→620(-57):§10/§11.3/§13.1/§4/§17 trim 同模式 + HairlineRule snippet inline 化 + 多处装饰空行;⚠️ R-95 #41 预存 template weight 800↔500 + END 提及 mismatch 留 R-96 修;manual_override flag' },
      { version: 'v0.2', date: '2026-05-24', note: 'R-94 Stage 6 · 无内容改动(三方 sync 已 clean),inject 重跑保版本一致;R-93 B2 字重 800→300/400 + R-92 Crimson Bar 累计' },
      { version: 'v0.1', date: '2026-05-24', note: 'R-91 · Phase C.1.B · Festive Editorial 首发(light + sans 800 brutalist editorial + GrainGradient 鲜红 corners blur on ivory + ChapterNumeralLarge + HairlineRule)' },
    ],
  },
}

interface Props {
  styleKey: StyleKey
}

export function DesignPromptView({ styleKey }: Props) {
  const meta = PROMPT_MAP[styleKey]
  const [tab, setTab] = useState<PromptTab>('full')
  const [copied, setCopied] = useState(false)
  const [changelogOpen, setChangelogOpen] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(meta.contents)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [meta.contents])

  const lineCount = meta.contents.split('\n').length
  const charCount = meta.contents.length

  // Compute FileDiffMetadata from previous + current (only when tab=diff)
  const fileDiff = useMemo(() => {
    if (tab !== 'diff') return null
    try {
      return parseDiffFromFile(
        { name: meta.filename, contents: meta.previousContents, lang: 'markdown' },
        { name: meta.filename, contents: meta.contents, lang: 'markdown' }
      )
    } catch (err) {
      console.error('parseDiffFromFile failed:', err)
      return null
    }
  }, [tab, meta.filename, meta.previousContents, meta.contents])

  return (
    <div className="design-prompt-view">
      {/* Header: title + meta-chips + copy + tabs(single row, 60px) */}
      <header className="design-prompt-header">
        <div className="design-prompt-header-left">
          <div className="design-prompt-version-badge">
            <span className="dp-version">{meta.version}</span>
          </div>
          <div className="design-prompt-title-block">
            <h2 className="design-prompt-title">{styleKey.replace('-', ' · ')}</h2>
            <code className="design-prompt-filename">{meta.filename}</code>
          </div>
        </div>
        <div className="design-prompt-header-right">
          <div className="design-prompt-stat-group">
            <span className="dp-stat">
              <span className="dp-stat-label">Updated</span>
              <span className="dp-stat-value">{meta.updated}</span>
            </span>
            <span className="dp-stat-divider" aria-hidden />
            <span className="dp-stat">
              <span className="dp-stat-label">Lines</span>
              <span className="dp-stat-value">{lineCount}</span>
            </span>
            <span className="dp-stat-divider" aria-hidden />
            <span className="dp-stat">
              <span className="dp-stat-label">Chars</span>
              <span className="dp-stat-value">{charCount.toLocaleString()}</span>
            </span>
          </div>
          <Tabs
            value={tab}
            onValueChange={(v) => setTab((v ?? 'full') as PromptTab)}
          >
            <TabsList className="h-8 bg-[var(--surface-2)] border border-[var(--border)] p-0.5">
              <TabsTrigger
                value="full"
                className="text-[11.5px] h-7 px-2.5 gap-1.5 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)]"
              >
                <FileText className="w-3.5 h-3.5" />
                Full
              </TabsTrigger>
              <TabsTrigger
                value="diff"
                className="text-[11.5px] h-7 px-2.5 gap-1.5 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)]"
              >
                <GitCompare className="w-3.5 h-3.5" />
                Diff vs {meta.previousVersion}
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-8 gap-1.5 border-[var(--border)] bg-[var(--surface-2)] hover:bg-[var(--surface-3)] text-[var(--foreground)] text-[11.5px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Changelog — accordion-style */}
      <div className="design-prompt-changelog">
        <button
          type="button"
          className="dp-changelog-summary"
          onClick={() => setChangelogOpen((v) => !v)}
          aria-expanded={changelogOpen}
        >
          <span className="dp-changelog-label">
            Changelog
            <span className="dp-changelog-count">{meta.changelog.length}</span>
          </span>
          <ChevronDown
            className={cn(
              'w-3.5 h-3.5 text-[var(--muted-foreground)] transition-transform',
              changelogOpen && 'rotate-180'
            )}
          />
        </button>
        {changelogOpen && (
          <ol className="dp-changelog-list">
            {meta.changelog.map((c, i) => (
              <li key={c.version} className="dp-changelog-item">
                <div className="dp-changelog-row">
                  <code className="dp-changelog-version">{c.version}</code>
                  <span className="dp-changelog-date">{c.date}</span>
                  {i === 0 && (
                    <span className="dp-changelog-latest">Latest</span>
                  )}
                </div>
                <p className="dp-changelog-note">{c.note}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* Body: Full or Diff */}
      <div className="design-prompt-file">
        {tab === 'full' && (
          <File
            key={`full-${styleKey}`}
            file={{
              name: meta.filename,
              contents: meta.contents,
              lang: 'markdown',
            }}
            options={{
              overflow: 'wrap',
              theme: 'github-dark',
              themeType: 'dark',
              disableFileHeader: true,
            }}
          />
        )}
        {tab === 'diff' && fileDiff && (
          <FileDiff
            key={`diff-${styleKey}`}
            fileDiff={fileDiff}
            options={{
              overflow: 'wrap',
              theme: 'github-dark',
              themeType: 'dark',
              disableFileHeader: true,
              diffStyle: 'split',
            }}
          />
        )}
        {tab === 'diff' && !fileDiff && (
          <div className="design-prompt-diff-error">
            <p>Diff 计算失败,降级显示 Full</p>
            <File
              file={{
                name: meta.filename,
                contents: meta.contents,
                lang: 'markdown',
              }}
              options={{ overflow: 'wrap', theme: 'github-dark', themeType: 'dark', disableFileHeader: true }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
