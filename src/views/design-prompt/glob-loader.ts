/**
 * glob-loader.ts · R-98 Phase 5
 * Parses import.meta.glob results for /prompts/**\/*.md into typed metadata,
 * handles version sorting and diff helpers.
 */

export type PromptMeta = {
  scenario: string     // "vibe-view-campaign-report"
  styleHandle: string  // "warm-restraint-tech"
  version: string      // "v0.1" / "v1.0.2" / "v0.16-zh" etc. (from filename)
  filePath: string     // full glob key e.g. "/prompts/vibe-view-campaign-report/warm-restraint-tech/v1.0.2.md"
  load: () => Promise<string>
}

// ── Regex: only match versioned files like v0.1.md, v6.7.2.md, v0.3-lean.md
// Excludes legacy files like "Design-Prompt-v6.5.8_Theatre-Dark_Data-Campaign-Report.md.md"
const VERSION_RE = /^v\d+\.\d+(\.\d+)?(-[a-z0-9]+)?\.md$/

/**
 * Parse all glob keys into PromptMeta[].
 * Skips any file whose basename doesn't match the versioned pattern.
 */
export function parsePromptMeta(
  glob: Record<string, () => Promise<{ default: string }>>
): PromptMeta[] {
  const metas: PromptMeta[] = []

  for (const [filePath, loader] of Object.entries(glob)) {
    // filePath: "/prompts/vibe-view-campaign-report/warm-restraint-tech/v1.0.2.md"
    const parts = filePath.split('/')
    // Expected: ["", "prompts", "<scenario>", "<styleHandle>", "<version>.md"]
    if (parts.length !== 5) continue

    const [, , scenario, styleHandle, filename] = parts
    if (!VERSION_RE.test(filename)) continue

    const version = filename.replace(/\.md$/, '') // "v1.0.2"

    metas.push({
      scenario,
      styleHandle,
      version,
      filePath,
      load: () => loader().then((m) => m.default),
    })
  }

  return metas
}

// ── Semver-ish comparison: split "v0.16-zh" → numeric parts [0,16] + suffix "zh"
type ParsedVersion = {
  nums: number[]
  suffix: string
}

function parseVersion(v: string): ParsedVersion {
  // Strip leading "v"
  const core = v.replace(/^v/, '')
  // Split on first "-" to get suffix
  const dashIdx = core.indexOf('-')
  const numPart = dashIdx === -1 ? core : core.slice(0, dashIdx)
  const suffix = dashIdx === -1 ? '' : core.slice(dashIdx + 1)
  const nums = numPart.split('.').map(Number)
  return { nums, suffix }
}

function compareVersions(a: PromptMeta, b: PromptMeta): number {
  const pa = parseVersion(a.version)
  const pb = parseVersion(b.version)
  const len = Math.max(pa.nums.length, pb.nums.length)
  for (let i = 0; i < len; i++) {
    const na = pa.nums[i] ?? 0
    const nb = pb.nums[i] ?? 0
    if (na !== nb) return na - nb
  }
  // Same numeric parts: no-suffix comes after suffixed (e.g. v0.3 > v0.3-lean)
  if (pa.suffix && !pb.suffix) return -1
  if (!pa.suffix && pb.suffix) return 1
  return pa.suffix.localeCompare(pb.suffix)
}

/**
 * Group PromptMeta[] by styleHandle, each group sorted ascending by version.
 */
export function groupByStyle(metas: PromptMeta[]): Record<string, PromptMeta[]> {
  const groups: Record<string, PromptMeta[]> = {}
  for (const m of metas) {
    if (!groups[m.styleHandle]) groups[m.styleHandle] = []
    groups[m.styleHandle].push(m)
  }
  for (const key of Object.keys(groups)) {
    groups[key].sort(compareVersions)
  }
  return groups
}

/**
 * Latest version = last entry after sort, preferring no suffix.
 * e.g. if only v0.3-lean exists (no plain v0.3), returns v0.3-lean.
 */
export function latestVersion(versions: PromptMeta[]): PromptMeta {
  if (versions.length === 0) throw new Error('No versions provided')
  // Prefer no suffix; fallback to last sorted
  const noSuffix = [...versions]
    .reverse()
    .find((m) => !parseVersion(m.version).suffix)
  return noSuffix ?? versions[versions.length - 1]
}

/**
 * Previous version = the one immediately before `current` in ascending sort.
 * If current not found or is first, returns null.
 */
export function previousVersion(
  versions: PromptMeta[],
  current: PromptMeta
): PromptMeta | null {
  const idx = versions.findIndex((m) => m.filePath === current.filePath)
  if (idx <= 0) return null
  return versions[idx - 1]
}

/**
 * Convenience: get all versions for a styleHandle from grouped map.
 */
export function getStyleVersions(
  grouped: Record<string, PromptMeta[]>,
  styleHandle: string
): PromptMeta[] {
  return grouped[styleHandle] ?? []
}
