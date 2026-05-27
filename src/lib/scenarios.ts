// scenarios.ts · R-112
// Scenario registry — single source of truth for which page types this renderer
// supports. Each scenario maps to a prompts/<dir>/ folder. "shipped" scenarios
// render a real Design Example + System + Prompt; "stub" scenarios render a
// placeholder pointing Chris to the design-prompt-creator skill.

export type ScenarioKey =
  | 'campaign-report'
  | 'waitlist'
  | 'product-promotion'
  | 'product-catalog'

export type ScenarioStatus = 'shipped' | 'stub'

export interface ScenarioConfig {
  key: ScenarioKey
  /** Sidebar primary label (中文) */
  label: string
  /** Sidebar sub-label (English handle / sub-name) */
  sublabel: string
  /** prompts/<promptsDir>/ — must match the folder name on disk */
  promptsDir: string
  status: ScenarioStatus
  /** Short StyleKey list available in this scenario. Order = sidebar render order. */
  styleKeys?: string[]
}

// SoT registry. Add a new scenario here AFTER its 3-piece set
// (Design Example component + Design System view + Design Prompt md) lands.
// Until then: keep it as 'stub' so the sidebar still surfaces it as a discovery
// affordance, with the placeholder pointing at the design-prompt-creator skill.
export const SCENARIOS_REGISTRY: ScenarioConfig[] = [
  {
    key: 'campaign-report',
    label: '营销战报',
    sublabel: 'Campaign Report',
    promptsDir: 'vibe-view-campaign-report',
    status: 'shipped',
    styleKeys: [
      'default',
      'warm',
      'swiss',
      'festive-editorial',
      'theatre',
      'cool',
      'festive-royal',
    ],
  },
  {
    key: 'waitlist',
    label: '招募候补',
    sublabel: 'Waitlist',
    promptsDir: 'vibe-view-waitlist',
    status: 'stub',
  },
  {
    key: 'product-promotion',
    label: '产品推广',
    sublabel: 'Product Promotion',
    promptsDir: 'vibe-view-product-promotion',
    status: 'stub',
  },
  {
    key: 'product-catalog',
    label: '产品目录',
    sublabel: 'Product Catalog',
    promptsDir: 'vibe-view-product-catalog',
    status: 'stub',
  },
]

export function getScenario(key: ScenarioKey): ScenarioConfig {
  const found = SCENARIOS_REGISTRY.find((s) => s.key === key)
  if (!found) throw new Error(`[scenarios] unknown scenario: ${key}`)
  return found
}
