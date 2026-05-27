import { useMemo, useState } from 'react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SegmentToggle } from '@/components/segment-toggle'
import { ResizableIframe } from '@/components/resizable-iframe'
import { ScenarioPlaceholder } from '@/components/scenario-placeholder'
import { Embed } from '@/Embed'
import { cn } from '@/lib/utils'
import { DesignSystemView } from '@/views/design-system/DesignSystemView'
import { DesignPromptView, getLatestVersionForStyle } from '@/views/design-prompt/DesignPromptView'
import { DefaultExampleView } from '@/views/default-example/DefaultExampleView'
import {
  SCENARIOS_REGISTRY,
  getScenario,
  type ScenarioKey,
} from '@/lib/scenarios'

// Slot JSON imports (Stage 1 — data verification)
import warmData from '@/data/warm.slot.json'
import theatreData from '@/data/theatre.slot.json'
import coolData from '@/data/cool.slot.json'
import swissData from '@/data/swiss.slot.json'
import festiveRoyalData from '@/data/festive-royal.slot.json'
import festiveEditorialData from '@/data/festive-editorial.slot.json'

type StyleKey = 'default' | 'warm' | 'theatre' | 'cool' | 'swiss' | 'festive-royal' | 'festive-editorial'
// R-101 · view 顺序改:Example → System → Prompt(对齐新工作流:先看效果再派生)
type ViewKey = 'design-example' | 'design-system' | 'design-prompt'
type DeviceKey = 'web' | 'mobile'

const VIEW_OPTIONS = [
  { value: 'design-example' as const, label: 'Design Example' },
  { value: 'design-system'  as const, label: 'Design System'  },
  { value: 'design-prompt'  as const, label: 'Design Prompt'  },
]

const DEVICE_OPTIONS = [
  { value: 'web'    as const, label: 'Web'    },
  { value: 'mobile' as const, label: 'Mobile' },
]

interface StyleItem {
  key: StyleKey
  label: string
  sublabel: string
  version: string
}

interface StyleGroup {
  label: string
  items: StyleItem[]
}

const SLOT_MAP: Record<StyleKey, unknown> = {
  default: null,  // default uses dial-derived tokens, no slot.json
  warm: warmData,
  theatre: theatreData,
  cool: coolData,
  swiss: swissData,
  'festive-royal': festiveRoyalData,
  'festive-editorial': festiveEditorialData,
}

// R-99 · label/sublabel 改 dynamic 从 slot.style_meta.style_name_zh 读(中文)
// 拆分规则:用 "·" 分隔主标 / 副标;无分隔则全用主标
function deriveLabel(key: StyleKey): { label: string; sublabel: string } {
  const meta = (SLOT_MAP[key] as { style_meta?: { style_name_zh?: string; style_name?: string } } | undefined)?.style_meta
  const zh = meta?.style_name_zh ?? meta?.style_name ?? key
  const parts = zh.split(/\s*·\s*/).map((s) => s.trim())
  return { label: parts[0] ?? key, sublabel: parts[1] ?? '' }
}

// R-112 · style groups are scenario-scoped now. Builder returns the groups
// for the given scenario's available styleKeys. Stub scenarios get no groups
// (the main area shows ScenarioPlaceholder instead).
function buildStyleGroupsForScenario(scenarioKey: ScenarioKey): StyleGroup[] {
  const scenario = getScenario(scenarioKey)
  if (scenario.status !== 'shipped' || !scenario.styleKeys) return []

  // For now only campaign-report ships; once new scenarios land they can pick
  // their own groupings here (or move to a per-scenario groupings file).
  if (scenarioKey === 'campaign-report') {
    const has = (k: StyleKey) => scenario.styleKeys!.includes(k)
    const groups: StyleGroup[] = []
    if (has('default')) {
      groups.push({
        label: '基座',
        items: [{ key: 'default', label: '默认基座', sublabel: '参数化风格', version: 'v0.1' }],
      })
    }
    const bright = (['warm', 'swiss', 'festive-editorial'] as StyleKey[]).filter(has)
    if (bright.length) {
      groups.push({
        label: '明亮',
        items: bright.map((k) => ({ key: k, ...deriveLabel(k), version: getLatestVersionForStyle(k) })),
      })
    }
    const dark = (['theatre', 'cool'] as StyleKey[]).filter(has)
    if (dark.length) {
      groups.push({
        label: '暗黑',
        items: dark.map((k) => ({ key: k, ...deriveLabel(k), version: getLatestVersionForStyle(k) })),
      })
    }
    const colored = (['festive-royal'] as StyleKey[]).filter(has)
    if (colored.length) {
      groups.push({
        label: '彩色',
        items: colored.map((k) => ({ key: k, ...deriveLabel(k), version: getLatestVersionForStyle(k) })),
      })
    }
    return groups
  }

  // Fallback: flat list with auto-derived labels
  return [{
    label: 'styles',
    items: scenario.styleKeys.map((k) => ({
      key: k as StyleKey,
      ...deriveLabel(k as StyleKey),
      version: getLatestVersionForStyle(k),
    })),
  }]
}

export default function App() {
  // R-101 Phase 2 · /?embed=1 → render Embed (pure ReportExampleView for iframe load)
  if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('embed')) {
    return <Embed />
  }

  // R-101 · default view = Design Example(新工作流:Chris 先看效果再确认)
  // R-112 · activeScenario added; styles list and main area both react to it.
  const [activeView, setActiveView] = useState<ViewKey>('design-example')
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>('campaign-report')
  const [activeStyle, setActiveStyle] = useState<StyleKey>('warm')
  const [activeDevice, setActiveDevice] = useState<DeviceKey>('web')

  const scenarioConfig = getScenario(activeScenario)
  const isScenarioShipped = scenarioConfig.status === 'shipped'

  const styleGroups = useMemo(
    () => buildStyleGroupsForScenario(activeScenario),
    [activeScenario]
  )

  function switchScenario(next: ScenarioKey) {
    if (next === activeScenario) return
    setActiveScenario(next)
    const nextScenario = getScenario(next)
    // Snap activeStyle to the first available style in the new scenario (if any)
    if (nextScenario.status === 'shipped' && nextScenario.styleKeys?.length) {
      const first = nextScenario.styleKeys[0] as StyleKey
      setActiveStyle(first)
    }
  }

  const slot = SLOT_MAP[activeStyle]
  const activeStyleItem = styleGroups.flatMap((g) => g.items).find((i) => i.key === activeStyle)

  // R-96 反馈 v2 · main bg per view(design-system / report-example 用 slot bg / design-prompt 全局暗黑)
  const mainBg = activeView === 'design-prompt' ? 'var(--background)' : 'var(--bg)'

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen className="!min-h-screen !h-screen">
        <Sidebar
          variant="sidebar"
          collapsible="none"
          className="!w-[264px] !h-screen border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)]"
        >
          {/* Brand */}
          <SidebarHeader className="px-5 pt-5 pb-3 border-b border-[var(--sidebar-border)]">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, var(--accent) 0%, var(--accent-cyan) 100%)',
                }}
              >
                <span className="text-[11px] font-bold text-white">V</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold tracking-tight">Vibe view</span>
                <span className="text-[10px] text-[var(--muted-foreground)] tracking-wider uppercase">
                  Design System Renderer
                </span>
              </div>
            </div>
          </SidebarHeader>

          {/* R-112 · Scenario picker (top) + Style groups (below) */}
          <SidebarContent className="px-2 py-3 gap-1">
            <SidebarGroup className="py-1">
              <SidebarGroupLabel className="px-3 pb-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] font-medium">
                场景 · Scenario
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {SCENARIOS_REGISTRY.map((sc) => {
                    const isActive = activeScenario === sc.key
                    const isStub = sc.status === 'stub'
                    return (
                      <SidebarMenuItem key={sc.key}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => switchScenario(sc.key)}
                          className={cn(
                            'group relative h-auto py-2 px-3 rounded-md transition-colors',
                            'hover:bg-[var(--surface-2)] data-[active=true]:bg-[var(--sidebar-accent)] data-[active=true]:text-[var(--sidebar-accent-foreground)]',
                            isStub && 'opacity-60'
                          )}
                          title={isStub ? `${sc.label} 暂未实装` : sc.label}
                        >
                          <span
                            className={cn(
                              'absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-sm transition-opacity',
                              isActive ? 'bg-[var(--accent)] opacity-100' : 'opacity-0'
                            )}
                            aria-hidden
                          />
                          <div className="flex items-center justify-between w-full ml-1">
                            <div className="flex flex-col items-start gap-0.5 leading-tight">
                              <span className="text-[13px] font-medium">{sc.label}</span>
                              <span className="text-[10.5px] text-[var(--muted-foreground)]">
                                {sc.sublabel}
                              </span>
                            </div>
                            {isStub && (
                              <span className="text-[9.5px] font-mono uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-sm border border-[var(--border)] text-[var(--muted-foreground)]">
                                stub
                              </span>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {styleGroups.map((group) => (
              <SidebarGroup key={group.label} className="py-1">
                <SidebarGroupLabel className="px-3 pb-1 text-[10px] uppercase tracking-[0.14em] text-[var(--muted-foreground)] font-medium">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive = activeStyle === item.key
                      return (
                        <SidebarMenuItem key={item.key}>
                          <SidebarMenuButton
                            isActive={isActive}
                            onClick={() => setActiveStyle(item.key)}
                            className={cn(
                              'group relative h-auto py-2 px-3 rounded-md transition-colors',
                              'hover:bg-[var(--surface-2)] data-[active=true]:bg-[var(--sidebar-accent)] data-[active=true]:text-[var(--sidebar-accent-foreground)]'
                            )}
                          >
                            {/* Active indicator line */}
                            <span
                              className={cn(
                                'absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 rounded-r-sm transition-opacity',
                                isActive
                                  ? 'bg-[var(--accent)] opacity-100'
                                  : 'opacity-0'
                              )}
                              aria-hidden
                            />
                            <div className="flex flex-col items-start gap-0.5 leading-tight ml-1">
                              <span className="text-[13px] font-medium">{item.label}</span>
                              <span className="text-[10.5px] text-[var(--muted-foreground)]">
                                {item.sublabel}
                              </span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          {/* R-96 fix #5 · footer 撤回 version + device(移到主区 header 右上) */}
        </Sidebar>

        {/* Main column · R-96 反馈 v2 · bg 跟 mainBg(per view)*/}
        <div
          className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden"
          style={{ background: mainBg }}
        >
          {/* R-96 反馈 v2 · Top nav · 左:view tabs + (Report Example 才显)Web/Mobile · 右:Version chip */}
          <header
            className="flex items-center justify-between px-4 h-12 shrink-0 border-b shrink-0"
            style={{
              borderColor: 'var(--border)',
              background: 'var(--background)', /* 顶部 nav 始终暗黑 chrome */
            }}
          >
            <div className="flex items-center gap-3">
              {/* R-101 · view tabs 改用 SegmentToggle(与 Web/Mobile 同组件,active 态可靠) */}
              <SegmentToggle
                value={activeView}
                onChange={setActiveView}
                options={VIEW_OPTIONS}
                ariaLabel="View"
              />

              {/* Web/Mobile — 紧贴 view tabs 右侧,只在 Design Example active 时 show */}
              {activeView === 'design-example' && (
                <SegmentToggle
                  value={activeDevice}
                  onChange={setActiveDevice}
                  options={DEVICE_OPTIONS}
                  size="sm"
                  ariaLabel="Device frame"
                />
              )}
            </div>

            {/* 右:Version chip */}
            {activeStyleItem && (
              <div className="flex items-center gap-1.5 px-2 h-7 rounded-md border border-[var(--border)] bg-[var(--surface-2)]">
                <span className="text-[9.5px] uppercase tracking-[0.12em] text-[var(--muted-foreground)] font-medium">
                  Version
                </span>
                <code className="text-[11.5px] font-mono text-[var(--foreground)] tabular-nums">
                  {activeStyleItem.version}
                </code>
              </div>
            )}
          </header>

          {/* Content area · R-101 顺序:Example → System → Prompt(对齐新工作流) ·
              R-112: stub scenario 整体走 ScenarioPlaceholder. */}
          <main className="flex-1 overflow-y-auto">
            {!isScenarioShipped && (
              <ScenarioPlaceholder scenario={scenarioConfig} view={activeView} />
            )}

            {isScenarioShipped && activeView === 'design-example' && activeStyle === 'default' && (
              <DefaultExampleView device={activeDevice} />
            )}
            {isScenarioShipped && activeView === 'design-example' && activeStyle !== 'default' && (
              <ResizableIframe
                src={`?embed=1&style=${activeStyle}&device=${activeDevice}&t=${activeStyle}`}
                preset={activeDevice}
              />
            )}
            {isScenarioShipped && activeView === 'design-system' && (
              <DesignSystemView
                styleKey={activeStyle}
                slot={slot as Record<string, any>}
              />
            )}
            {isScenarioShipped && activeView === 'design-prompt' && (
              <DesignPromptView styleKey={activeStyle} />
            )}
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
