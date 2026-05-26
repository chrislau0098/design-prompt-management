// default-dials.ts · R-105
// URL query → DefaultDialSet parser. SoT: 09-default-prompt-spec.md rules translated to code.
// neutral_temperature removed — internal tokens always use branded (C 0.008 / 0.012).
// R-105: radius/density/hero_shader now derive from STYLE_PRESETS[font_family] when not in URL.

import { NAMED_COLOR_PRESETS, isValidHex } from './color-utils'
import { STYLE_PRESETS } from './default-style-presets'

export type DialMode = 'light' | 'dark'
export type DialFontFamily = 'geometric' | 'editorial' | 'technical' | 'warmth' | 'impact' | 'ceremonial'
export type DialHeroShader = 'mesh' | 'grain' | 'dithering' | 'none'
export type DialRadius = 'sharp' | 'crisp' | 'soft' | 'friendly' | 'playful'
export type DialDensity = 'sparse' | 'balanced' | 'dense'

export interface DefaultDialSet {
  mode: DialMode
  brand_color: string          // hex, e.g. '#1E40AF'
  lightness_shift: number      // -100 to +100, default 0
  font_family: DialFontFamily
  hero_shader: DialHeroShader
  radius: DialRadius
  density: DialDensity
}

export const DEFAULT_DIALS: DefaultDialSet = {
  mode: 'light',
  brand_color: '#1E40AF',
  lightness_shift: 0,
  font_family: 'geometric',
  hero_shader: 'mesh',
  radius: 'sharp',
  density: 'balanced',
}

const VALID_MODES: DialMode[] = ['light', 'dark']
const VALID_FONTS: DialFontFamily[] = ['geometric', 'editorial', 'technical', 'warmth', 'impact', 'ceremonial']
const VALID_SHADERS: DialHeroShader[] = ['mesh', 'grain', 'dithering', 'none']
const VALID_RADII: DialRadius[] = ['sharp', 'crisp', 'soft', 'friendly', 'playful']
const VALID_DENSITIES: DialDensity[] = ['sparse', 'balanced', 'dense']

function pickEnum<T extends string>(value: string | null, valid: T[], fallback: T): T {
  if (!value) return fallback
  return valid.includes(value as T) ? (value as T) : fallback
}

function resolveBrandColor(
  colorParam: string | null,
  namedParam: string | null,
): string {
  // Priority: ?color= > ?named= > default
  if (colorParam) {
    const hex = colorParam.startsWith('#') ? colorParam : `#${colorParam}`
    if (isValidHex(hex)) return hex
    console.warn(`[default-dials] invalid ?color=${colorParam}, falling back to default`)
  }
  if (namedParam) {
    const hex = NAMED_COLOR_PRESETS[namedParam.toLowerCase()]
    if (hex) return hex
    console.warn(`[default-dials] unknown named color: ${namedParam}, falling back to default`)
  }
  return DEFAULT_DIALS.brand_color
}

function resolveLightnessShift(raw: string | null): number {
  if (!raw) return DEFAULT_DIALS.lightness_shift
  const n = parseFloat(raw)
  if (isNaN(n)) return DEFAULT_DIALS.lightness_shift
  return Math.min(100, Math.max(-100, n))
}

// Forbidden combinations per spec. Returns nearest legal adjusted dials.
function enforceForbidden(dials: DefaultDialSet): DefaultDialSet {
  let { font_family, hero_shader, density, radius } = dials
  // neutral_temperature removed — no longer a dial
  // accent_strategy removed — default is always bordered (mono accent)

  // impact + playful → demote radius to crisp
  if (font_family === 'impact' && radius === 'playful') {
    console.warn('[default-dials] forbidden: impact + playful radius → fallback radius=crisp')
    radius = 'crisp'
  }

  // editorial + dense → demote density to balanced
  if (font_family === 'editorial' && density === 'dense') {
    console.warn('[default-dials] forbidden: editorial + dense → fallback density=balanced')
    density = 'balanced'
  }

  // technical + mesh shader → demote hero to dithering
  if (font_family === 'technical' && hero_shader === 'mesh') {
    console.warn('[default-dials] forbidden: technical + mesh shader → fallback hero=dithering')
    hero_shader = 'dithering'
  }

  return { ...dials, font_family, hero_shader, density, radius }
}

export function parseDialsFromQuery(searchParams: URLSearchParams): DefaultDialSet {
  const font_family = pickEnum(searchParams.get('font'), VALID_FONTS, DEFAULT_DIALS.font_family)
  // Advanced dials: use STYLE_PRESETS as defaults when not explicitly set in URL
  const preset = STYLE_PRESETS[font_family]
  const raw: DefaultDialSet = {
    mode: pickEnum(searchParams.get('mode'), VALID_MODES, DEFAULT_DIALS.mode),
    brand_color: resolveBrandColor(
      searchParams.get('color'),
      searchParams.get('named'),
    ),
    lightness_shift: resolveLightnessShift(searchParams.get('lightness')),
    font_family,
    hero_shader: pickEnum(searchParams.get('hero'), VALID_SHADERS, preset.hero_shader),
    radius: pickEnum(searchParams.get('radius'), VALID_RADII, preset.radius),
    density: pickEnum(searchParams.get('density'), VALID_DENSITIES, preset.density),
  }
  return enforceForbidden(raw)
}

export function dialsToQueryString(dials: DefaultDialSet): string {
  const p = new URLSearchParams({
    style: 'default',
    mode: dials.mode,
    color: dials.brand_color,   // URLSearchParams auto-encodes
    lightness: String(dials.lightness_shift),
    font: dials.font_family,
    hero: dials.hero_shader,
    radius: dials.radius,
    density: dials.density,
  })
  return '?' + p.toString()
}
