// default-ds-slot.ts · R-102 Phase 4.8
// Derives a DS-view-compatible slot object from DefaultDialSet.
// Output matches the slot shape DesignSystemView sub-components expect
// (Atomic / Molecular / HeroComposition / Ornaments).

import type { DefaultDialSet } from './default-dials'
import { FONT_STACKS } from './default-fonts'
import { dialsToHeroShaderSlot } from './default-hero-shader'
import { hexToOKLCH } from './color-utils'

// RADIUS_PX mirrors default-tokens.ts — kept local to avoid coupling
const RADIUS_PX: Record<string, number> = {
  sharp: 0,
  crisp: 2,
  soft: 6,
  friendly: 12,
  playful: 16,
}

const DENSITY_ZH: Record<string, string> = {
  sparse: '宽松',
  balanced: '均衡',
  dense: '紧凑',
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v))
}

// Build OklchArr tuples matching the format Atomic.tsx expects for SwatchGroup
function arr3(L: number, C: number, H: number): [number, number, number] {
  return [L, C, H]
}
function arr4(L: number, C: number, H: number, a: number): [number, number, number, number] {
  return [L, C, H, a]
}
function objLCH(L: number, C: number): { L: number; C: number } {
  return { L, C }
}

export function dialsToDsSlot(dials: DefaultDialSet): Record<string, unknown> {
  const { mode, brand_color, lightness_shift, font_family, radius, density } = dials
  // accent_strategy removed — always bordered/mono
  const isLight = mode === 'light'

  // Extract OKLCH from brand_color
  const { L: pL, C: pC, H: pH } = hexToOKLCH(brand_color)

  // Lightness shift
  const shift = lightness_shift / 100
  const primaryL = clamp(pL + shift * 0.15, 0.30, 0.70)
  const primaryC = pC

  // Neutral chroma: always branded — 0.008 (light) / 0.012 (dark)
  const neutralC = isLight ? 0.008 : 0.012

  // Chart ramp — chart-1 = primary (handled by slot consumers), chart-2..5 derived below
  const chart2L = clamp(primaryL + 0.07, 0.30, 0.78)
  const chart3L = clamp(primaryL - 0.03, 0.25, 0.75)
  const chart4L = clamp(primaryL - 0.13, 0.20, 0.70)
  const chart5L = clamp(primaryL - 0.23, 0.15, 0.65)
  const chart2C = clamp(primaryC - 0.02, 0.02, 0.22)
  const chart3C = clamp(primaryC - 0.06, 0.02, 0.22)
  const chart4C = clamp(primaryC - 0.10, 0.02, 0.22)
  const chart5C = clamp(primaryC - 0.14, 0.02, 0.22)

  // Brand hex for style_meta display
  const brandHex = brand_color

  // Ground truth signature — derived text summary
  const fontLabel = font_family.charAt(0).toUpperCase() + font_family.slice(1)
  const radiusLabel = radius.charAt(0).toUpperCase() + radius.slice(1)
  const groundTruth = `${fontLabel} · ${radiusLabel} radius · ${DENSITY_ZH[density]} · mono accent · H${pH.toFixed(0)} ${brandHex}`

  // Mood adjectives derived from dials
  const moodAdjectives: string[] = [
    fontLabel,
    radiusLabel === 'Sharp' ? 'Structured' : radiusLabel === 'Playful' ? 'Friendly' : 'Balanced',
    density === 'dense' ? 'Information-Dense' : density === 'sparse' ? 'Spacious' : 'Measured',
    'Accent-Guided',
  ]

  // Font stacks — R-105: 4-role architecture (title/number/body/mono)
  const stacks = FONT_STACKS[font_family]
  const splitStack = (s: string) => s.split(',').map((x) => x.trim().replace(/^"|"$/g, ''))
  const titleStackArr = splitStack(stacks.title)
  const numberStackArr = splitStack(stacks.number)
  const bodyStackArr = splitStack(stacks.body)
  const monoStackArr = splitStack(stacks.mono)
  // Backward compat aliases for downstream slot consumers (DS Atomic etc.)
  const displayStackArr = titleStackArr
  const sansStackArr = bodyStackArr

  // R-102 G7.2 · CJK family identification — first stack entry that isn't a
  // Latin-only face. Surfaced via typography.cjk_display_family / cjk_body_family.
  const LATIN_ONLY_HINTS = [
    'geist', 'helvetica', 'inter', 'fraunces', 'spectral', 'georgia',
    'jetbrains', 'ibm plex', 'dm sans', 'outfit', 'plus jakarta', 'druk',
    'bebas', 'anton', 'playfair', 'cinzel', 'cardo', 'arial', 'cormorant',
    'sans-serif', 'serif', 'monospace',
  ]
  function pickCjkFamily(stack: string[]): string {
    for (const name of stack) {
      const lower = name.toLowerCase()
      const isLatinOnly = LATIN_ONLY_HINTS.some((h) => lower.includes(h))
      if (!isLatinOnly) return name
    }
    return stack[stack.length - 1] ?? 'sans-serif'
  }
  const cjkDisplayFamily = pickCjkFamily(sansStackArr)
  const cjkBodyFamily = pickCjkFamily(sansStackArr)

  // Radius values
  const radiusPx = RADIUS_PX[radius] ?? 0

  // Density → spacing values
  const spacingMap: Record<string, { section_py_mobile: number; section_py_lg: number }> = {
    sparse:   { section_py_mobile: 32, section_py_lg: 56 },
    balanced: { section_py_mobile: 24, section_py_lg: 40 },
    dense:    { section_py_mobile: 16, section_py_lg: 28 },
  }
  const spacing = spacingMap[density] ?? spacingMap.balanced

  // Color section — light vs dark
  let colorSection: Record<string, unknown>

  if (isLight) {
    colorSection = {
      neutral_hue: pH,
      foreground_hue: pH,
      background:   arr3(0.985, neutralC, pH),
      surface_l1:   arr3(0.985, neutralC, pH),
      surface_l2:   arr3(0.965, neutralC, pH),
      surface_l3:   arr3(0.935, neutralC, pH),
      foreground:   arr3(0.14,  0.008, pH),
      foreground_2: arr3(0.42,  0.008, pH),
      foreground_3: arr3(0.62,  0.008, pH),
      border:        arr4(0.14, 0.008, pH, 0.10),
      border_strong: arr4(0.14, 0.008, pH, 0.22),
      primary:        objLCH(primaryL, primaryC),
      primary_hl:     objLCH(clamp(primaryL + 0.10, 0.30, 0.78), primaryC),
      primary_soft:   objLCH(0.92, clamp(primaryC, 0, 0.04)),
      primary_glow_alpha: 0.15,
      chart_ramp: [
        objLCH(chart2L, chart2C),
        objLCH(chart3L, chart3C),
        objLCH(chart4L, chart4C),
        objLCH(chart5L, chart5C),
      ],
      chart_hover: arr4(0.14, 0.008, pH, 0.05),
      primary_wash: null,
      ambient_ink: null,
    }
  } else {
    const darkPrimaryL = clamp(primaryL + 0.10, 0.42, 0.72)
    colorSection = {
      neutral_hue: pH,
      foreground_hue: pH,
      background:   arr3(0.10,  neutralC, pH),
      surface_l1:   arr3(0.12,  neutralC, pH),
      surface_l2:   arr3(0.14,  neutralC, pH),
      surface_l3:   arr3(0.17,  neutralC, pH),
      foreground:   arr3(0.92,  0.006, pH),
      foreground_2: arr3(0.70,  0.006, pH),
      foreground_3: arr3(0.50,  0.006, pH),
      border:        arr4(0.92, 0.006, pH, 0.14),
      border_strong: arr4(0.92, 0.006, pH, 0.28),
      primary:        objLCH(darkPrimaryL, primaryC),
      primary_hl:     objLCH(clamp(darkPrimaryL + 0.10, 0.42, 0.82), primaryC),
      primary_soft:   objLCH(0.20, clamp(primaryC, 0, 0.04)),
      primary_glow_alpha: 0.18,
      chart_ramp: [
        objLCH(clamp(chart2L + 0.08, 0.40, 0.78), chart2C),
        objLCH(clamp(chart3L + 0.08, 0.35, 0.75), chart3C),
        objLCH(clamp(chart4L + 0.08, 0.30, 0.70), chart4C),
        objLCH(clamp(chart5L + 0.08, 0.25, 0.65), chart5C),
      ],
      chart_hover: arr4(0.92, 0.006, pH, 0.05),
      primary_wash: null,
      ambient_ink: null,
    }
  }

  // Hero shader
  const heroShader = dialsToHeroShaderSlot(dials)

  // Hero geometry — default treatment based on font_family
  const defaultTreatment = font_family === 'impact' ? 'full-bleed-monolith'
    : font_family === 'technical' || font_family === 'ceremonial' ? 'typographic-field'
    : 'asymmetric-split'

  // Motion timing — conservative defaults
  const motionTiming = {
    ease_out:  [0.16, 0.84, 0.24, 1],
    ease_inout: [0.7, 0, 0.3, 1],
    ease_snap:  [0.18, 0, 0.05, 1],
    ease_spring: [0.4, 0, 0.3, 1],
    hover_ms: 150,
    button_press_ms: 100,
    entrance_ms_range: density === 'dense' ? [400, 700] : [600, 1000],
    number_rolling_s_range: [1.2, 2.0],
    curve_path_s_range: [2.0, 2.8],
    spotlight_drift_s: null,
    signature_stroke_s: null,
    stagger_children_s: density === 'dense' ? 0.06 : 0.10,
    inview_margin: '-20%',
  }

  // Typography — derive from font stacks + dial-spec font size table
  const typography = {
    // R-105 4-role stacks (canonical)
    title_stack: titleStackArr,
    number_stack: numberStackArr,
    body_stack: bodyStackArr,
    mono_stack: monoStackArr,
    // Backward compat aliases
    sans_stack: sansStackArr,
    display_stack: displayStackArr,
    // R-102 G7.2 · CJK family identifiers for sample rendering
    cjk_display_family: cjkDisplayFamily,
    cjk_body_family: cjkBodyFamily,
    font_loading: 'google-fonts',
    weight_ceiling: font_family === 'impact' ? '900' : font_family === 'ceremonial' ? '700' : '700',
    emphasis_tier: font_family === 'impact' ? 'ultra' : 'bold',
    display_number_lg: density === 'dense' ? 160 : density === 'sparse' ? 220 : 188,
    display_number_mobile: 88,
    display_lh: 0.86,
    display_ls_em: font_family === 'impact' ? 0.02 : -0.04,
    hero_title_lg: null,
    hero_title_mobile: null,
    page_title_lg: density === 'dense' ? 80 : 110,
    page_title_mobile: 48,
    section_primary_lg: density === 'dense' ? 60 : 80,
    section_secondary_lg: 44,
    section_tertiary_lg: 26,
    quote_lg: 28,
    body: 15,
    caption: 13,
    lead_paragraph_lg: font_family === 'warmth' || font_family === 'editorial' ? 20 : null,
    unit_suffix_lg: 40,
    meta_tracking_em: 0.08,
    eyebrow_tracking_em: 0.16,
    eyebrow_px: 11,
    font_feature_settings: '"kern", "tnum", "lnum"',
    cjk_body_max_ch: 42,
    cjk_hero_max_ch: 18,
  }

  // R-102 G7.1 · Ornaments referenced by default v0.1.md (stable list — read by
  // DesignSystemView.Ornaments to filter rendering). The actual visibility
  // check happens at runtime via parsePromptOrnaments on the loaded prompt md;
  // this field exists for documentation / debugging.
  const ornamentsUsed = ['ChapterBanner', 'Tag', 'Pill', 'DeltaIndicator', 'Separator']
  if (font_family === 'ceremonial') ornamentsUsed.push('SealStamp')

  // Radius section
  const radiusSection = {
    pill: radiusPx > 8 ? 'rounded-full' : radiusPx === 0 ? 'none' : `${radiusPx}px`,
    sharp_panel_max_px: radiusPx,
    card_chrome: radiusPx,
  }

  // Material section
  const materialSection = {
    depth_mechanism: radius === 'sharp' ? 'hairline-only' : 'shadow',
    shadow: radius === 'sharp' ? 'none' : 'soft-lift',
    double_bezel_spec: null,
    noise_overlay: 'none',
  }

  // Chart section
  const chartSection = {
    area_fill_opacity: 'gradient',
    area_type: 'natural',
    grid_dasharray: density === 'dense' ? '2 4' : density === 'sparse' ? null : '2 6',
    grid_vertical: false,
    grid_density_descriptor: density === 'dense' ? 'dense, prominent grid' : 'recessive grid',
    last_point_treatment: 'activeDot',
    cursor_style: 'fill-hover',
    tooltip_card: 'content-style',
  }

  // Proposition — dynamic from dials
  const moodWord = font_family === 'editorial' ? 'editorial warmth'
    : font_family === 'technical' ? 'technical precision'
    : font_family === 'ceremonial' ? 'ceremonial gravitas'
    : font_family === 'warmth' ? 'human warmth'
    : font_family === 'impact' ? 'bold impact'
    : 'modern clarity'

  const proposition = `A ${isLight ? 'light' : 'dark'}-mode report styled around ${moodWord}. Brand color ${brandHex} (H ${pH.toFixed(0)}) anchors the primary ramp. ${radiusLabel} radius, ${DENSITY_ZH[density]} density, mono accent.`

  return {
    style_meta: {
      style_handle: 'default',
      style_name: 'Default',
      style_name_zh: '默认基座 · 参数化',
      description_zh: proposition,
      proposition,
      mood_adjectives: moodAdjectives,
      decorative_pack: 'default',
      focal_numeral_strategy: 'primary_on_neutral',
      mode,
      brand_hue: pH,
      ground_truth_signature: groundTruth,
      chromatic_background: null,
      long_scroll: false,
      ornaments_used: ornamentsUsed,
    },
    atomic: {
      color: colorSection,
      typography,
      spacing: {
        base_px: 8,
        scale_extra: [],
        section_py_mobile: spacing.section_py_mobile,
        section_py_lg: spacing.section_py_lg,
        section_px_lg: 16,
        container_max_w: 'max-w-7xl',
      },
      radius: radiusSection,
      material: materialSection,
      motion_timing: motionTiming,
      iconography: {
        stroke_width_px: 1.25,
        allowed_unicode: ['▲', '▼', '→', '·', '—', '•'],
        custom_svg_scope: 'structural-plus-motion-paths',
      },
    },
    molecular: {
      hero_shader: heroShader,
      hero_geometry: {
        default_treatment: defaultTreatment,
        radial_wash_css: null,
        extra_svg_layer: 'none',
        stamp_constraint: 'optional',
      },
      chart: chartSection,
      dividers: {
        accent_divider: 'alpha-hairline',
        content_divider: radiusPx === 0 ? 'alpha-hairline' : 'hairline-dotdotdot',
        chapter_opener: 'hairline-banner',
      },
    },
    patterned: {
      density_lead: DENSITY_ZH[density] ?? density,
    },
  }
}

