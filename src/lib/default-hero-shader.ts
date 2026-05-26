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
  // light softened (R-106 v2): brand peak L 0.89→0.925, C 0.060→0.040.
  // Higher L pulls shader closer to bg; lower C reduces saturation.
  // Single-layer (no wash overlay) — intensity controlled here only.
  return [
    oklchToHex(0.975, 0.008, pH),                  // near-white tint
    oklchToHex(0.955, 0.020, pH),                  // pale brand wash
    oklchToHex(0.925, 0.040, pH),                  // brand peak (softened)
    oklchToHex(0.940, 0.032, (pH + 22) % 360),     // neighboring hue accent
    oklchToHex(0.965, 0.012, pH),                  // soft return
  ]
}

function buildMeshColorsDark(pH: number): string[] {
  // dark softened (R-106 v2): brand peak L 0.55→0.48, C 0.10→0.075.
  // Still visibly chromatic but less neon.
  return [
    oklchToHex(0.115, 0.012, pH),                  // near-black tint (base)
    oklchToHex(0.190, 0.038, pH),                  // brand wash mid
    oklchToHex(0.480, 0.075, pH),                  // brand peak (softened)
    oklchToHex(0.290, 0.058, (pH + 22) % 360),     // neighboring hue mid
    oklchToHex(0.155, 0.020, pH),                  // soft return
  ]
}

// ── Grain palette ─────────────────────────────────────────────────────────────
// Warm v1.0.1 structure: pale-L base → mid-L brand step → low-L brand peak →
// neighbor accent. Dark inverted with similar contrast amplitude.

function buildGrainColorsLight(pH: number): string[] {
  // light softened (R-106 v2): brand peak L 0.84→0.89, C 0.058→0.040.
  return [
    oklchToHex(0.975, 0.008, pH),
    oklchToHex(0.945, 0.025, pH),
    oklchToHex(0.890, 0.040, pH),
    oklchToHex(0.910, 0.032, (pH + 22) % 360),
  ]
}

function buildGrainColorsDark(pH: number): string[] {
  // dark softened (R-106 v2): brand peak L 0.42→0.34, C 0.090→0.065.
  return [
    oklchToHex(0.115, 0.012, pH),
    oklchToHex(0.205, 0.045, pH),
    oklchToHex(0.340, 0.065, pH),
    oklchToHex(0.250, 0.052, (pH + 22) % 360),
  ]
}

function grainBackLight(pH: number): string {
  return oklchToHex(0.980, 0.006, pH)
}

function grainBackDark(pH: number): string {
  return oklchToHex(0.125, 0.010, pH)
}

// ── Dithering palette ─────────────────────────────────────────────────────────
// R-105: brand_color hue anchored — no longer writes dead neutral gray.
// Light: colorFront L 0.78 C 0.04 (brand-tinted pale), colorBack L 0.94 C 0.012 (near-white tint).
// Dark:  colorFront L 0.32 C 0.08 (mid-tone brand), colorBack L 0.18 C 0.012 (deep brand tint).

function buildDitheringColors(pH: number, isLight: boolean): { colorFront: string; colorBack: string } {
  if (isLight) {
    // softened (R-106 v2): front L 0.78→0.82, C 0.04→0.025 — closer to back, gentler pattern.
    return {
      colorFront: oklchToHex(0.820, 0.025, pH),
      colorBack:  oklchToHex(0.955, 0.006, pH),
    }
  }
  // softened (R-106 v2): front L 0.32→0.36, C 0.08→0.055 — still readable above dark base.
  return {
    colorFront: oklchToHex(0.360, 0.055, pH),
    colorBack:  oklchToHex(0.145, 0.010, pH),
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
