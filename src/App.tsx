import { useState } from 'react'
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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { DesignSystemView } from '@/views/design-system/DesignSystemView'
import { ReportExampleView } from '@/views/report-example/ReportExampleView'
import { DesignPromptView, getLatestVersionForStyle } from '@/views/design-prompt/DesignPromptView'

// Slot JSON imports (Stage 1 — data verification)
import warmData from '@/data/warm.slot.json'
import theatreData from '@/data/theatre.slot.json'
import coolData from '@/data/cool.slot.json'
import swissData from '@/data/swiss.slot.json'
import festiveRoyalData from '@/data/festive-royal.slot.json'
import festiveEditorialData from '@/data/festive-editorial.slot.json'

type StyleKey = 'warm' | 'theatre' | 'cool' | 'swiss' | 'festive-royal' | 'festive-editorial'
type ViewKey = 'design-system' | 'report-example' | 'design-prompt'
type DeviceKey = 'web' | 'mobile'

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

// R-98 Phase 5 · version fields derived from glob latestVersion (no more hard-code)
const STYLE_GROUPS: StyleGroup[] = [
  {
    label: '明亮',
    items: [
      { key: 'warm', label: 'Confident Warmth', sublabel: 'Ivory Ember', version: getLatestVersionForStyle('warm') },
      { key: 'swiss', label: 'Swiss Systematic', sublabel: 'Editorial Blue', version: getLatestVersionForStyle('swiss') },
      { key: 'festive-editorial', label: 'Festive Editorial', sublabel: 'Crimson Wash', version: getLatestVersionForStyle('festive-editorial') },
    ],
  },
  {
    label: '暗黑',
    items: [
      { key: 'theatre', label: 'Theatre Dark', sublabel: 'Hermès Orange', version: getLatestVersionForStyle('theatre') },
      { key: 'cool', label: 'Instrument Dark', sublabel: 'Electric Blue', version: getLatestVersionForStyle('cool') },
    ],
  },
  {
    label: '彩色',
    items: [
      { key: 'festive-royal', label: 'Festive Royal', sublabel: 'Crimson Gold', version: getLatestVersionForStyle('festive-royal') },
    ],
  },
]

const SLOT_MAP: Record<StyleKey, unknown> = {
  warm: warmData,
  theatre: theatreData,
  cool: coolData,
  swiss: swissData,
  'festive-royal': festiveRoyalData,
  'festive-editorial': festiveEditorialData,
}

export default function App() {
  const [activeView, setActiveView] = useState<ViewKey>('design-system')
  const [activeStyle, setActiveStyle] = useState<StyleKey>('warm')
  const [activeDevice, setActiveDevice] = useState<DeviceKey>('web')

  const slot = SLOT_MAP[activeStyle]
  const activeStyleItem = STYLE_GROUPS.flatMap((g) => g.items).find((i) => i.key === activeStyle)

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

          {/* Style groups */}
          <SidebarContent className="px-2 py-3 gap-1">
            {STYLE_GROUPS.map((group) => (
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
              <Tabs
                value={activeView}
                onValueChange={(v) => setActiveView((v ?? 'design-system') as ViewKey)}
              >
                <TabsList className="h-8 bg-[var(--surface-2)] border border-[var(--border)] gap-0.5 p-0.5">
                  <TabsTrigger
                    value="design-system"
                    className="text-[12px] px-3 h-7 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)]"
                  >
                    Design System
                  </TabsTrigger>
                  <TabsTrigger
                    value="report-example"
                    className="text-[12px] px-3 h-7 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)]"
                  >
                    Report Example
                  </TabsTrigger>
                  <TabsTrigger
                    value="design-prompt"
                    className="text-[12px] px-3 h-7 data-[state=active]:bg-[var(--surface-3)] data-[state=active]:text-[var(--foreground)] text-[var(--muted-foreground)]"
                  >
                    Design Prompt
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Web/Mobile — 紧贴 view tabs 右侧,只在 Report Example active 时 show */}
              {activeView === 'report-example' && (
                <div
                  className="flex h-7 items-center rounded-md bg-[var(--surface-2)] p-0.5 gap-0.5 border border-[var(--border)]"
                  role="group"
                  aria-label="Device frame"
                >
                  {(['web', 'mobile'] as DeviceKey[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setActiveDevice(d)}
                      className={cn(
                        'h-6 px-3 text-[11px] rounded-sm capitalize transition-all font-medium',
                        activeDevice === d
                          ? 'bg-[var(--surface-3)] text-[var(--foreground)] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
                          : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>
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

          {/* Content area */}
          <main className="flex-1 overflow-y-auto">
            {activeView === 'design-system' && (
              <DesignSystemView
                styleKey={activeStyle}
                slot={slot as Record<string, any>}
              />
            )}
            {activeView === 'report-example' && (
              <ReportExampleView
                styleKey={activeStyle}
                slot={slot as Record<string, any>}
                device={activeDevice}
              />
            )}
            {activeView === 'design-prompt' && (
              <DesignPromptView styleKey={activeStyle} />
            )}
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
