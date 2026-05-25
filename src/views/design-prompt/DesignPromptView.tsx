/**
 * Design Prompt View · R-98 Phase 5
 * Replaced hard-coded PROMPT_MAP with import.meta.glob dynamic loading.
 * Adds version dropdown for full history; Diff vs Previous preserved.
 * Lazy loads md content (only when tab visible or on mount).
 */
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { File, FileDiff } from '@pierre/diffs/react'
import { parseDiffFromFile } from '@pierre/diffs'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Copy, Check, FileText, GitCompare, ChevronDown } from 'lucide-react'

import {
  parsePromptMeta,
  groupByStyle,
  latestVersion,
  previousVersion,
  getStyleVersions,
  type PromptMeta,
} from './glob-loader'
import './styles.css'

// ── Glob imports (lazy — not bundled, fetched on demand) ──
const _promptModules = import.meta.glob<{ default: string }>(
  '/prompts/**/*.md',
  { query: '?raw' }
)

// ── Pre-parse once at module level ──
const _allMetas = parsePromptMeta(_promptModules)
const _grouped = groupByStyle(_allMetas)

// ── Map App.tsx StyleKey → promptsDir handle ──
// App.tsx still uses short keys (warm/theatre/etc.); prompts/ uses full handles.
const STYLE_KEY_TO_HANDLE: Record<string, string> = {
  'warm': 'warm-restraint-tech',
  'theatre': 'theatre-dark',
  'cool': 'cool-precision-tech',
  'swiss': 'swiss-systematic-blue',
  'festive-royal': 'festive-royal-crimson',
  'festive-editorial': 'festive-editorial-crimson',
}

// Build a lookup of styleKey → latest PromptMeta for App.tsx to read version
export function getLatestVersionForStyle(styleKey: string): string {
  const handle = STYLE_KEY_TO_HANDLE[styleKey]
  if (!handle) return ''
  const versions = getStyleVersions(_grouped, handle)
  if (versions.length === 0) return ''
  return latestVersion(versions).version
}

type PromptTab = 'full' | 'diff'

interface Props {
  styleKey: string
}

function buildFilename(handle: string, version: string): string {
  // Fallback display filename from handle + version
  return `${handle}-Design-Prompt-${version}.md`
}

export function DesignPromptView({ styleKey }: Props) {
  const handle = STYLE_KEY_TO_HANDLE[styleKey] ?? styleKey
  const versions = getStyleVersions(_grouped, handle)

  // Selected version — default to latest
  const defaultMeta = versions.length > 0 ? latestVersion(versions) : null
  const [selectedMeta, setSelectedMeta] = useState<PromptMeta | null>(defaultMeta)

  // Reset when styleKey changes
  useEffect(() => {
    const newVersions = getStyleVersions(_grouped, STYLE_KEY_TO_HANDLE[styleKey] ?? styleKey)
    setSelectedMeta(newVersions.length > 0 ? latestVersion(newVersions) : null)
    setTab('full')
    setVersionDropdownOpen(false)
  }, [styleKey])

  const prevMeta = selectedMeta ? previousVersion(versions, selectedMeta) : null

  const [tab, setTab] = useState<PromptTab>('full')
  const [copied, setCopied] = useState(false)
  const [versionDropdownOpen, setVersionDropdownOpen] = useState(false)

  // ── Lazy content loading ──
  const [currentContent, setCurrentContent] = useState<string | null>(null)
  const [prevContent, setPrevContent] = useState<string | null>(null)
  const [loadingCurrent, setLoadingCurrent] = useState(false)
  const [loadingPrev, setLoadingPrev] = useState(false)

  // Track what we last loaded to avoid redundant fetches
  const loadedCurrentPath = useRef<string | null>(null)
  const loadedPrevPath = useRef<string | null>(null)

  useEffect(() => {
    if (!selectedMeta) return
    if (loadedCurrentPath.current === selectedMeta.filePath) return
    setLoadingCurrent(true)
    setCurrentContent(null)
    selectedMeta.load().then((text) => {
      setCurrentContent(text)
      setLoadingCurrent(false)
      loadedCurrentPath.current = selectedMeta.filePath
    })
  }, [selectedMeta])

  useEffect(() => {
    if (tab !== 'diff' || !prevMeta) return
    if (loadedPrevPath.current === prevMeta.filePath) return
    setLoadingPrev(true)
    setPrevContent(null)
    prevMeta.load().then((text) => {
      setPrevContent(text)
      setLoadingPrev(false)
      loadedPrevPath.current = prevMeta.filePath
    })
  }, [tab, prevMeta])

  const handleCopy = useCallback(async () => {
    if (!currentContent) return
    try {
      await navigator.clipboard.writeText(currentContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }, [currentContent])

  const lineCount = currentContent ? currentContent.split('\n').length : 0
  const charCount = currentContent ? currentContent.length : 0

  const filename = selectedMeta
    ? buildFilename(handle, selectedMeta.version)
    : `${handle}.md`

  // Diff — computed from loaded content
  const fileDiff = useMemo(() => {
    if (tab !== 'diff') return null
    if (!currentContent || !prevContent) return null
    try {
      return parseDiffFromFile(
        { name: filename, contents: prevContent, lang: 'markdown' },
        { name: filename, contents: currentContent, lang: 'markdown' }
      )
    } catch (err) {
      console.error('parseDiffFromFile failed:', err)
      return null
    }
  }, [tab, filename, prevContent, currentContent])

  // Sorted descending for dropdown display (latest first)
  const versionsDesc = [...versions].reverse()

  if (versions.length === 0) {
    return (
      <div className="design-prompt-view" style={{ padding: 20 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
          No prompts found for style "{styleKey}" (handle: {handle}).
        </p>
      </div>
    )
  }

  return (
    <div className="design-prompt-view">
      {/* Header */}
      <header className="design-prompt-header">
        <div className="design-prompt-header-left">
          {/* Version dropdown badge */}
          <div className="dp-version-dropdown-wrapper">
            <button
              type="button"
              className="design-prompt-version-badge dp-version-dropdown-btn"
              onClick={() => setVersionDropdownOpen((v) => !v)}
              aria-expanded={versionDropdownOpen}
              aria-label="Select version"
            >
              <span className="dp-version">{selectedMeta?.version ?? '—'}</span>
              <ChevronDown
                className={cn(
                  'w-3 h-3 ml-1 transition-transform',
                  versionDropdownOpen && 'rotate-180'
                )}
                style={{ color: 'var(--accent)', opacity: 0.7 }}
              />
            </button>
            {versionDropdownOpen && (
              <div className="dp-version-dropdown-menu" role="listbox" aria-label="Version history">
                {versionsDesc.map((m) => {
                  const isSelected = m.filePath === selectedMeta?.filePath
                  const isLatest = m.filePath === latestVersion(versions).filePath
                  return (
                    <button
                      key={m.filePath}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={cn('dp-version-dropdown-item', isSelected && 'is-selected')}
                      onClick={() => {
                        setSelectedMeta(m)
                        setVersionDropdownOpen(false)
                        loadedCurrentPath.current = null
                        loadedPrevPath.current = null
                        setPrevContent(null)
                      }}
                    >
                      <code className="dp-vdi-version">{m.version}</code>
                      {isLatest && <span className="dp-vdi-latest">Latest</span>}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="design-prompt-title-block">
            <h2 className="design-prompt-title">{styleKey.replace('-', ' · ')}</h2>
            <code className="design-prompt-filename">{filename}</code>
          </div>
        </div>

        <div className="design-prompt-header-right">
          <div className="design-prompt-stat-group">
            <span className="dp-stat">
              <span className="dp-stat-label">Versions</span>
              <span className="dp-stat-value">{versions.length}</span>
            </span>
            {currentContent && (
              <>
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
              </>
            )}
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
                disabled={!prevMeta}
                className="text-[11.5px] h-7 px-2.5 gap-1.5 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)] disabled:opacity-40"
              >
                <GitCompare className="w-3.5 h-3.5" />
                Diff vs {prevMeta?.version ?? 'prev'}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            disabled={!currentContent}
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

      {/* Body: Full or Diff */}
      <div className="design-prompt-file">
        {tab === 'full' && (
          <>
            {loadingCurrent && (
              <div className="dp-loading-placeholder">Loading…</div>
            )}
            {!loadingCurrent && currentContent && (
              <File
                key={`full-${styleKey}-${selectedMeta?.version}`}
                file={{
                  name: filename,
                  contents: currentContent,
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
          </>
        )}

        {tab === 'diff' && (
          <>
            {(loadingCurrent || loadingPrev) && (
              <div className="dp-loading-placeholder">Loading diff…</div>
            )}
            {!loadingCurrent && !loadingPrev && fileDiff && (
              <FileDiff
                key={`diff-${styleKey}-${selectedMeta?.version}`}
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
            {!loadingCurrent && !loadingPrev && !fileDiff && currentContent && (
              <div className="design-prompt-diff-error">
                <p>Diff 计算失败 — 降级显示 Full</p>
                <File
                  file={{
                    name: filename,
                    contents: currentContent,
                    lang: 'markdown',
                  }}
                  options={{ overflow: 'wrap', theme: 'github-dark', themeType: 'dark', disableFileHeader: true }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
