// font-family-context.tsx · R-113.4
// Lightweight context to broadcast the default style's `font_family` dial
// down to leaf components (ChapterOpener) without prop-drilling through
// every chapter component. Fixed styles (warm/theatre/etc.) leave the
// context as null and ChapterOpener falls back to its original pack-based
// rendering.

import { createContext, useContext } from 'react'
import type { DialFontFamily } from '@/lib/default-dials'

export const FontFamilyContext = createContext<DialFontFamily | null>(null)

export function useFontFamily(): DialFontFamily | null {
  return useContext(FontFamilyContext)
}
