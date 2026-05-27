// report-mode-context.tsx · R-113.8
// Broadcast the current canvas mode (light / dark) to leaf components.
// Used by ChartTooltipCard so it can pick mode-correct text colors even when
// Recharts' Tooltip wrapper escapes the `.report-canvas-scope.dark` subtree
// (which makes `var(--fg)` fall back to :root and render the wrong color).
//
// Default style (DefaultEmbedView) wraps the report tree with this provider
// using `dials.mode`. Fixed styles leave it as null — ChartTooltipCard then
// falls back to CSS-variable behavior (unchanged from R-100).

import { createContext, useContext } from 'react'

export type ReportMode = 'light' | 'dark'

export const ReportModeContext = createContext<ReportMode | null>(null)

export function useReportMode(): ReportMode | null {
  return useContext(ReportModeContext)
}
