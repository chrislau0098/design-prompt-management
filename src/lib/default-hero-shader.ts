// default-hero-shader.ts · R-103 Phase 2 rebuild
// Parameters anchored to proven fixed-style slot.json references:
//   mesh      → theatre-dark v6.7.1 (distortion 0.8 / swirl 0.3 / speed 0.5 +
//               5-color ramp culminating in a brand peak around L 0.65)
//   grain     → warm-restraint-tech v1.0.1 (wave / softness 0.9 / intensity 0.5
//               / scale 1.8 / speed 1.72 with a 4-color L 0.74–0.95 ramp)
//   dithering → swiss-systematic-blue v0.6 (8x8 simplex size 3 / speed 0.4)
// Dark mode boosted (Chris feedback: "太暗"): mesh L ramp now reaches 0.40 +
// a brand peak around L 0.55 for life. Speeds boosted (Chris feedback:
// "0.5 还是慢") to track the originals more closely.

import type { DefaultDialSet, DialHeroShader } from './default-dials'
import { hexToOKLCH, oklchToHex } from './color-utils'

interface ShaderFragment {
  component: string
  props: Record<string, unknown>
}

// ── Mesh palette ──────────────────────────────────────────────────────────────
// Theatre-dark structure: dark base → brand mid → brand peak → neighbor → return.
// Light mirror: high-L base → brand breath → brand peak (mid-L) → neighbor.

function buildMeshColorsLight(pH: number): string[] {
  // light: 5-step ramp L 0.97 → 0.85, with a brand-peak step at C 0.060
  return [
    oklchToHex(0.970, 0.010, pH),                  // near-white tint
    oklchToHex(0.940, 0.028, pH),                  // pale brand wash
    oklchToHex(0.890, 0.060, pH),                  // brand peak
    oklchToHex(0.910, 0.050, (pH + 22) % 360),     // neighboring hue accent
    oklchToHex(0.955, 0.018, pH),                  // soft return
  ]
}

function buildMeshColorsDark(pH: number): string[] {
  // dark: 5-step ramp L 0.10 → 0.55. Chris's "太暗" feedback fixed: peak L 0.55,
  // C 0.10 → real chromatic life, not muddy near-black.
  return [
    oklchToHex(0.105, 0.020, pH),                  // near-black tint (base)
    oklchToHex(0.205, 0.050, pH),                  // brand wash mid
    oklchToHex(0.550, 0.100, pH),                  // brand peak — bright life
    oklchToHex(0.320, 0.080, (pH + 22) % 360),     // neighboring hue mid
    oklchToHex(0.150, 0.030, pH),                  // soft return
  ]
}

// ── Grain palette ─────────────────────────────────────────────────────────────
// Warm v1.0.1 structure: pale-L base → mid-L brand step → low-L brand peak →
// neighbor accent. Dark inverted with similar contrast amplitude.

function buildGrainColorsLight(pH: number): string[] {
  // light: L 0.97 → 0.78 spread (warm reference ran 0.95 → 0.74 — close).
  return [
    oklchToHex(0.970, 0.010, pH),
    oklchToHex(0.910, 0.038, pH),
    oklchToHex(0.840, 0.058, pH),
    oklchToHex(0.870, 0.050, (pH + 22) % 360),
  ]
}

function buildGrainColorsDark(pH: number): string[] {
  // dark: L 0.10 → 0.42 spread. Brand peak L 0.42, C 0.090 — much warmer than
  // the previous max-L 0.25 which felt nearly black.
  return [
    oklchToHex(0.105, 0.020, pH),
    oklchToHex(0.220, 0.060, pH),
    oklchToHex(0.420, 0.090, pH),
    oklchToHex(0.290, 0.075, (pH + 22) % 360),
  ]
}

function grainBackLight(pH: number): string {
  return oklchToHex(0.975, 0.008, pH)
}

function grainBackDark(pH: number): string {
  // Sits one step above dark base, gives the wave a ground that's not pure black.
  return oklchToHex(0.120, 0.014, pH)
}

// ── Dithering palette ─────────────────────────────────────────────────────────
// R-105: brand_color hue anchored — no longer writes dead neutral gray.
// Light: colorFront L 0.78 C 0.04 (brand-tinted pale), colorBack L 0.94 C 0.012 (near-white tint).
// Dark:  colorFront L 0.32 C 0.08 (mid-tone brand), colorBack L 0.18 C 0.012 (deep brand tint).

function buildDitheringColors(pH: number, isLight: boolean): { colorFront: string; colorBack: string } {
  if (isLight) {
    return {
      colorFront: oklchToHex(0.780, 0.040, pH),
      colorBack:  oklchToHex(0.940, 0.012, pH),
    }
  }
  return {
    colorFront: oklchToHex(0.320, 0.080, pH),
    colorBack:  oklchToHex(0.180, 0.012, pH),
  }
}

// ── Speed ─────────────────────────────────────────────────────────────────────
// Anchored to references: theatre mesh 0.5, warm grain 1.72, swiss dithering 0.4.
// Chris (round-6): "0.5 还是慢" → push mesh / dithering up to ~0.85 / 0.70,
// keep grain in the warm 1.30 zone (1.72 felt right at warm but a touch
// frantic in dark on the bright peak).

const MESH_SPEED      = 0.85
const GRAIN_SPEED     = 1.72   // warm SoT: slot.json speed=1.72
const DITHERING_SPEED = 0.70

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
        // Theatre reference: distortion 0.8, swirl 0.3. We adopt those — they
        // are the parameters that work in real dark fixed-style use.
        distortion: 0.80,
        swirl:      0.30,
        grainMixer: isLight ? 0.06 : 0.10,
        speed:      MESH_SPEED,
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
        // Warm v1.0.1 SoT: shape wave, softness 0.9, intensity 0.5, noise 0.04,
        // scale 1.8, rotation 0, offsetX 0, offsetY 0.24, fit 'cover', speed 1.72.
        shape:     'wave',
        colors,
        colorBack,
        softness:  0.9,
        intensity: isLight ? 0.50 : 0.45,
        noise:     0.04,
        scale:     1.8,
        rotation:  0,
        offsetX:   0,
        offsetY:   0.24,
        fit:       'cover',
        speed:     GRAIN_SPEED,
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
