// color-utils.ts · R-102 Phase 4.6
// culori-based OKLCH conversion + named color presets

import { parse, oklch as toOklch, formatHex } from 'culori'
import type { Oklch } from 'culori'

export interface OKLCHColor {
  L: number
  C: number
  H: number
}

export function hexToOKLCH(hex: string): OKLCHColor {
  const parsed = parse(hex)
  if (!parsed) {
    console.warn(`[color-utils] invalid hex: ${hex}, falling back to default blue`)
    return { L: 0.424, C: 0.181, H: 265.6 }
  }
  const result = toOklch(parsed) as Oklch
  return {
    L: result.l ?? 0,
    C: result.c ?? 0,
    H: result.h ?? 0,
  }
}

export function oklchToHex(L: number, C: number, H: number): string {
  const color: Oklch = { mode: 'oklch', l: L, c: C, h: H }
  return formatHex(color) ?? '#808080'
}

export const NAMED_COLOR_PRESETS: Record<string, string> = {
  red:     '#E03131',
  crimson: '#B83A3A',
  orange:  '#F76707',
  amber:   '#F59F00',
  green:   '#00AC97',
  teal:    '#0EA5E9',
  blue:    '#1E40AF',
  indigo:  '#4F46E5',
  purple:  '#7C3AED',
  pink:    '#DB2777',
  slate:   '#64748B',
  black:   '#0F172A',
}

// Validate that a string is a valid 6-digit hex color
export function isValidHex(value: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(value)
}
