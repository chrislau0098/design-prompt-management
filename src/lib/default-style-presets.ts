// default-style-presets.ts · R-105
// STYLE_PRESETS: per-font-family default radius / density / hero_shader.
// When font_family changes, the dial panel auto-sets these 3 advanced dials.

import type { DialRadius, DialDensity, DialHeroShader, DialFontFamily } from './default-dials'

export interface StylePreset {
  radius: DialRadius
  density: DialDensity
  hero_shader: DialHeroShader
}

export const STYLE_PRESETS: Record<DialFontFamily, StylePreset> = {
  geometric:  { radius: 'sharp',    density: 'balanced', hero_shader: 'mesh' },
  editorial:  { radius: 'sharp',    density: 'sparse',   hero_shader: 'mesh' },
  technical:  { radius: 'crisp',    density: 'dense',    hero_shader: 'dithering' },
  warmth:     { radius: 'friendly', density: 'balanced', hero_shader: 'grain' },
  impact:     { radius: 'crisp',    density: 'balanced', hero_shader: 'mesh' },
  ceremonial: { radius: 'sharp',    density: 'sparse',   hero_shader: 'mesh' },
}
