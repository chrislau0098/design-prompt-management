// scenario-placeholder.tsx · R-112
// Shown in place of every view when an unimplemented scenario is selected.
// Guides Chris to the design-prompt-creator skill workflow.

import type { ScenarioConfig } from '@/lib/scenarios'

interface Props {
  scenario: ScenarioConfig
  view: 'design-example' | 'design-system' | 'design-prompt'
}

export function ScenarioPlaceholder({ scenario, view }: Props) {
  return (
    <div className="scenario-placeholder">
      <div className="scenario-placeholder-card">
        <span className="scenario-placeholder-eyebrow">Scenario · {scenario.sublabel}</span>
        <h2 className="scenario-placeholder-title">{scenario.label} · 未实装</h2>

        <p className="scenario-placeholder-body">
          这是个占位场景。Design Example / Design System / Design Prompt 三件套尚未生成。
        </p>

        <p className="scenario-placeholder-body">
          按当前工作流，新增一个完整场景需要同步产出 3 件:
        </p>

        <ol className="scenario-placeholder-list">
          <li>
            <strong>Design Example</strong> 组件代码 · 布局排版按场景重新设计,与战报完全不同
          </li>
          <li>
            <strong>Design System</strong> · Slot/Dial 注册与 token 映射
          </li>
          <li>
            <strong>Design Prompt</strong> · 喂给弱模型的 md 指令书
          </li>
        </ol>

        <p className="scenario-placeholder-body">
          推荐工作流: 在 Claude Code 里调用 <code>design-prompt-creator</code> skill,
          按 <code>reference/03-scenario-define.md</code> 走 8 步流程; 同步加载
          <code> design-principles</code> / <code>impeccable</code> / <code>design-taste-frontend</code>
          等 design skill 来为 Design Example 做美观度审查;
          如未安装则按提示装上。
        </p>

        <p className="scenario-placeholder-footnote">
          当前 view: <code>{view}</code> · prompts/{scenario.promptsDir}/ 暂无内容
        </p>
      </div>
    </div>
  )
}
