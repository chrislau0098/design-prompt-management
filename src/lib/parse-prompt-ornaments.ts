// R-101 Phase 3 · Parser · grep ornament names from a Design Prompt md
//
// Used by DesignSystemView to filter Ornaments rendering down to only the
// ornaments the current prompt actually describes (System ⊆ Prompt — Chris
// rule: "Design Prompt 中没有的不应该出现在 Design System 里").
//
// The list below is closed: it enumerates every ornament name that has ever
// shipped in any of the six Vibe view styles (R-76 through R-101). When a new
// scenario adds a new ornament name to its prompt, add it here too.

const ORNAMENT_NAMES = [
  // Editorial pack (Warm)
  'ChapterBanner',
  'ChapterDivider',
  'QuoteBracket',
  'OutroSignature',

  // Theatrical pack (Theatre)
  'ChapterStamp',
  'SpotlightGradient',
  'DoubleBezel',
  'Double-Bezel',
  'spotlight-gradient',

  // Instrumental pack (Cool)
  'OutlinedPill',
  'drawn-horizon',
  'feTurbulence',

  // Systematic pack (Swiss)
  'HairlineRule',
  'ShadSeparator',

  // Festive Royal
  'SealStamp',
  'GoldenHairline',
  'TasselDivider',

  // Festive Editorial
  'ChapterNumeralLarge',
  'Crimson Bar',
  'CrimsonBar',

  // Generic dividers / fragments often referenced by Prompt prose
  'DeltaIndicator',
  'Pill',
]

export function parsePromptOrnaments(md: string | null | undefined): Set<string> {
  const set = new Set<string>()
  if (!md) return set
  for (const name of ORNAMENT_NAMES) {
    // Match exact name preceded/followed by a non-word boundary (allow `-` inside)
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(`(?:^|[^\\w])${escaped}(?:$|[^\\w])`, 'i')
    if (re.test(md)) set.add(name)
  }
  return set
}

/** Convenience: ornament group ID → predicate.
 *  Used by Ornaments.tsx to decide which sections to render per pack. */
export function ornamentVisible(visible: Set<string>, ...candidates: string[]): boolean {
  return candidates.some((c) => visible.has(c))
}
