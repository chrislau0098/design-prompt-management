// default-hero-shader.ts · R-102 Phase 4.10
// Derives slot.molecular.hero_shader from dial values.
// Light/dark dual-mode aware; parameters derived from brand_hue with
// ranges and structure mirrored from fixed-style slot.json references
// (warm-restraint-tech v1.0.1 grain, cool-precision-tech v0.5.1 godrays,
// swiss-systematic-blue v0.6 dithering, theatre-dark v6.7.1 mesh).

import type { DefaultDialSet, DialHeroShader } from './default-dials'
import { hexToOKLCH, oklchToHex } from './color-utils'

interface ShaderFragment {
  component: string
  props: Record<string, unknown>
}

// ── Mesh palette ──────────────────────────────────────────────────────────────
// Mirrors the structure of warm-restraint-tech (light) and theatre-dark (dark):
// 4–5 hex steps, ΔL ≤ 0.10, max C 0.06 (light) / 0.08 (dark), grouped around
// brand hue with one neighboring-hue point for chromatic life.

function buildMeshColorsLight(pH: number): string[] {
  // light: L ramp 0.97 → 0.86, C 0.018–0.055, hue stays on brand
  return [
    oklchToHex(0.970, 0.012, pH),                  // near-white tint
    oklchToHex(0.940, 0.030, pH),                  // pale wash
    oklchToHex(0.905, 0.050, pH),                  // brand breath
    oklchToHex(0.880, 0.055, (pH + 18) % 360),     // neighboring hue accent
    oklchToHex(0.925, 0.024, pH),                  // soft return
  ]
}

function buildMeshColorsDark(pH: number): string[] {
  // dark: L ramp 0.10 → 0.24, C 0.025–0.075, brand breath on neighboring hue
  return [
    oklchToHex(0.105, 0.020, pH),                  // near-black tint
    oklchToHex(0.165, 0.045, pH),                  // brand wash
    oklchToHex(0.225, 0.075, pH),                  // brand breath
    oklchToHex(0.185, 0.060, (pH + 18) % 360),     // neighboring hue accent
    oklchToHex(0.125, 0.030, pH),                  // soft return
  ]
}

// ── Grain palette ─────────────────────────────────────────────────────────────
// 3 hex steps, light/dark inverted. Inspired by warm-restraint-tech grain wave.

function buildGrainColorsLight(pH: number): string[] {
  return [
    oklchToHex(0.965, 0.012, pH),
    oklchToHex(0.910, 0.040, pH),
    oklchToHex(0.855, 0.060, pH),
    oklchToHex(0.890, 0.045, (pH + 18) % 360),
  ]
}

function buildGrainColorsDark(pH: number): string[] {
  return [
    oklchToHex(0.115, 0.018, pH),
    oklchToHex(0.180, 0.050, pH),
    oklchToHex(0.250, 0.075, pH),
    oklchToHex(0.205, 0.060, (pH + 18) % 360),
  ]
}

function grainBackLight(pH: number): string {
  return oklchToHex(0.975, 0.008, pH)
}

function grainBackDark(pH: number): string {
  return oklchToHex(0.100, 0.014, pH)
}

// ── Dithering palette ─────────────────────────────────────────────────────────
// Mirrors swiss-systematic-blue: colorFront soft mid neutral with whisper tint,
// colorBack near-surface. Inverted for dark mode.

function buildDitheringColors(pH: number, isLight: boolean): { colorFront: string; colorBack: string } {
  if (isLight) {
    return {
      // L 0.62, C 0.012 — mid-neutral with the slightest brand tint
      colorFront: oklchToHex(0.620, 0.012, pH),
      // L 0.945 — sits just below background L 0.985 (one step down)
      colorBack:  oklchToHex(0.945, 0.006, pH),
    }
  }
  return {
    // L 0.36, C 0.024 — softly visible against dark surface
    colorFront: oklchToHex(0.360, 0.024, pH),
    // L 0.135 — sits just above background L 0.10 (one step up)
    colorBack:  oklchToHex(0.135, 0.012, pH),
  }
}

// ── Speed ─────────────────────────────────────────────────────────────────────
// Per fixed-style references: warm grain v1.0.1 speed 1.72 felt right for
// a "warm breath"; cool godrays 0.8; swiss dithering 0.4; theatre mesh 0.5.
// We target 0.45–0.55 — comfortable breath, never anxious, never static.

const MESH_SPEED      = 0.50
const GRAIN_SPEED     = 0.55
const DITHERING_SPEED = 0.45

export function dialsToHeroShaderSlot(dials: DefaultDialSet): ShaderFragment | null {
  const type: DialHeroShader = dials.hero_shader
  if (type === 'none') return null

  const { H: pH } = hexToOKLCH(dials.brand_color)
  const isLight = dials.mode === 'light'

  if (type === 'mesh') {
    const colors = isLight ? buildMeshColorsLight(pH) : buildMeshColorsDark(pH)
    return {
      component: 'MeshGradient',
      props: {
        colors,
        // distortion / swirl: warm v1.0.1 went hard on softness; theatre v6.7.1
        // ran distortion 0.8 / swirl 0.3. We sit in the middle.
        distortion:  0.65,
        swirl:       0.35,
        grainMixer:  isLight ? 0.04 : 0.06,
        speed:       MESH_SPEED,
        speed_off_viewport: 0,
      },
    }
  }

  if (type === 'grain') {
    const colors    = isLight ? buildGrainColorsLight(pH) : buildGrainColorsDark(pH)
    const colorBack = isLight ? grainBackLight(pH)        : grainBackDark(pH)
    return {
      component: 'GrainGradient',
      props: {
        // 'wave' shape mirrors warm v1.0.1 — soft breathing form
        shape:    'wave',
        colors,
        colorBack,
        softness: 0.75,
        intensity: isLight ? 0.10 : 0.14,
        noise:    isLight ? 0.04 : 0.06,
        scale:    1.4,
        speed:    GRAIN_SPEED,
        speed_off_viewport: 0,
      },
    }
  }

  if (type === 'dithering') {
    const { colorFront, colorBack } = buildDitheringColors(pH, isLight)
    return {
      component: 'Dithering',
      props: {
        type:  '8x8',
        shape: 'simplex',
        size:  3,
        scale: 1.0,
        colorFront,
        colorBack,
        speed: DITHERING_SPEED,
        speed_off_viewport: 0,
      },
    }
  }

  return null
}
