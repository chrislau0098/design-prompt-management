// R-101 fix · Shared segment toggle (Tabs + Web/Mobile use same component)
// Replaces shadcn Tabs whose active state wasn't reliably visible after R-95 Cluster B's
// base-ui Tabs swap. Hand-rolled button row identical to the Web/Mobile pattern so the
// two controls now sit on the same visual rail.

import { cn } from '@/lib/utils'

export interface SegmentOption<T extends string> {
  value: T
  label: string
}

interface SegmentToggleProps<T extends string> {
  value: T
  onChange: (value: T) => void
  options: SegmentOption<T>[]
  className?: string
  size?: 'sm' | 'md'
  ariaLabel?: string
}

export function SegmentToggle<T extends string>({
  value,
  onChange,
  options,
  className,
  size = 'md',
  ariaLabel,
}: SegmentToggleProps<T>) {
  const heightCls = size === 'sm' ? 'h-7' : 'h-8'
  const innerHeightCls = size === 'sm' ? 'h-6' : 'h-7'
  const padCls = size === 'sm' ? 'px-3 text-[11px]' : 'px-3 text-[12px]'

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'flex items-center rounded-md bg-[var(--surface-2)] p-0.5 gap-0.5 border border-[var(--border)]',
        heightCls,
        className
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-sm transition-colors font-medium whitespace-nowrap',
              innerHeightCls,
              padCls,
              active
                ? 'bg-[var(--surface-3)] text-[var(--foreground)] shadow-[0_1px_0_rgba(255,255,255,0.04)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]'
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
