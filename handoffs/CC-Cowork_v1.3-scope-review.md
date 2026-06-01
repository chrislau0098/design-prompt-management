# v1.3 Patch Scope Review · 2 P0 候选 · Cowork 交叉 Review

你是 **independent reviewer** · review 我(Cowork)起的 v1.3 patch scope.

## Chris 的明确关切(围绕这 3 条 review)

1. **行数控制** · v1.2 = 639 行 · 我目前 propose +4-6 行 → v1.3 ≤ 645 行
2. **必要性** · 每个 patch 必须是 R-9 实测 fail / drift 的真实必要修复
3. **美观度收益** · 可证明的正向变化 · 不是规则完整性强迫症

---

## Round-9 实测 evidence(支撑 scope)

R-9 结果(2026-05-31 跑完 8 Queries × default v1.2):

- **N1-N8: 7/8 PASS · 1 PARTIAL · 0 FAIL**(production-verified 阈值已过)
- **Build 8/8 · Render 8/8**(最佳记录)
- **B1/B2 误触 0/8**(R-128 trigger gate 工作完美)
- **F-2 drift 改善**(R8 6 → R9 3)
- **AN invariant 8/8 maintained**(R-120/R-123/R-124 三重锁 carry)

R-9 暴露 2 个真实 fail / drift:

### Issue 1 · V11-P0-1 wrapper rule 复发(R-128 时我和 Opus 4.6 都判错了的地方)

- R-9 Q1 实测 `contentTop=0.069`,Hero 内容贴顶 1/3 stuck-top bug **真实复发**
- R-9 Q3 borderline 同症状
- R-128 时我和 Opus 4.6 判断 "runtime 3/3 PASS → V11 reinforce 是 nice-to-have, SKIP" — **样本太少 (R-7 仅 3 个 render-PASS) 导致误判**
- R-9 8/8 render 样本扩大 → source adherence 3/8 真实预警变现 fail
- Cumulative: V11-P0-1 wrapper runtime intent 6/8 PASS · 2/8 fail or borderline

### Issue 2 · Hero 图片 overlay 同色 N7/N8 验证 effect good

- Q7 light: source L213-214 用 `var(--background) opacity 0.45` · critic visual B- / code A-
- Q8 dark: source L289 用 `var(--background) opacity 0.55` · critic technique clean
- 现状:**仅在 user query 里引导**,Design Prompt 没规定
- CC Round-9 report §7 推荐 v1.3 收纳为 1st-class design
- 一个微调:Q7 opacity 0.45 在 busy coffee scene 偏低 → v1.3 推荐 light 0.50-0.65 / dark 0.55-0.70 range

---

## 2 个 Patch 候选 + 草案文字

### V13-P0-A · Hero 图片 overlay 同色 1st-class

**位置**:§14.1 Hero readability HARD GATE 段 + §15 Hero image archetype 段

**改动方向**(scope draft):

§14.1 现有 R-125 Hero composition HARD GATE 后追加 1-2 行:

> "When `hero_image_url` dial active (image background mode), the overlay layer on top of the image MUST use `var(--background)` (page ground) as fill color, NEVER `#ffffff` / `rgba(255,...,...)` / `bg-white`. Opacity range: light mode 0.50-0.65; dark mode 0.55-0.70. This makes the image visually sink into the page ground (融入) rather than being veiled by white fog (糊). Filter-based dimming (`filter: brightness(...)`, `dim()`, `grayscale()`) is forbidden per §15 既有规则."

§15 Hero image archetype 段(line ~496)末尾或同段追加 1 句确认:

> "Overlay technique per §14.1 HARD GATE: `var(--background)` same-tone fill, NOT white veil."

**严守**:
- 不写完整 React snippet / JSX example / code block
- HTML 元素硬约束零增加(不规定 `<div>` 还是 `<aside>` 容器)
- opacity range 是软建议(0.50-0.65 / 0.55-0.70),不是 strict number
- 引用既有 §15 filter ban,不重复写 saturate/brightness/blur 等具体函数列表
- 不引入 `import` / 包名 / Tailwind 工具类细节

**预计行数变化**:+3-4 行

---

### V13-P0-B · §14.1 V11-P0-1 wrapper reinforce(carry R-128 时我砍掉的 V12-P0-3)

**位置**:§14.1 line 452 末尾(R-125 patch 句改写)

**v1.2 现状**(line 452 末尾):

> "the grid root element AND any intermediate wrapper between section and grid MUST satisfy `min-height: 100%` (Tailwind: `min-h-full`)"

**改成**(强化版,1 句话化,不加 code snippet):

> "EVERY DOM ancestor in the chain from `<section>` to the grid items (root wrapper, padding wrapper, max-width wrapper, container wrapper, ANY intermediate `<div>`) MUST carry `min-h-full` / `min-height: 100%`. This is not 'the grid wrapper alone' — every link in the height chain. Missing one ancestor breaks the floor propagation; content stacks at section's upper 1/3."

**严守**:
- 不加 anti-pattern code snippet(R-128 时 Codex 砍过的)
- 不写 `<section>→<div>→<div>→<div>→grid` JSX example
- 单句强化,不展开成 bullet list
- AnimateNumber 三段(§4 / §7 / §17)0 改

**预计行数变化**:+1-2 行(行内改写 + EVERY DOM ancestor 强化)

**为什么这次要做(纠正 R-128 误判)**:
- R-128 时我说 "runtime 3/3 PASS, V11 reinforce 是 metric 误导"
- R-9 实测 8/8 render 样本扩大后 Q1 真实复发 + Q3 borderline
- source adherence 3/8 不是误导,是预警信号
- 这次只做 1 句话强化(不加 code snippet, 符合 Chris prompt 红线)

---

## Review questions(请独立回答 5 个)

### Q1 · 必要性

- **V13-P0-A** Hero overlay 同色:N7/N8 在 user query 引导下 effect good,**是否需要收进 Design Prompt 才稳定**?如果 user 不写引导就不出同色 overlay,Design Prompt 收纳才能保证所有 Hero image 场景一致 — 这是必要还是 nice-to-have?
- **V13-P0-B** V11-P0-1 reinforce:R-9 Q1 复发 stuck-top 是 1/8 偶发还是 systemic?如果是 systemic 就必修;如果只是 doubao 随机性偶发,可能不修也 OK。

### Q2 · 美观度收益

- 每个 patch 修后 R-10 PASS rate 估算?
- V13-P0-A: 估 Hero image 场景 overlay 一致性提升幅度(R-9 N7/N8 都 PASS,但 only with user 引导;v1.3 后 with 默认 query 也 PASS 概率?)
- V13-P0-B: V11-P0-1 wrapper runtime intent 6/8 → 估 R-10 几/8 PASS?

### Q3 · 行数控制

- 草案行数 (V13-P0-A +3-4 / V13-P0-B +1-2) 是否可以再压?
- §14.1 V13-P0-A 和 V11-P0-1 reinforce 都改 §14.1, **是否可以合并成 1 段**?
- opacity range "0.50-0.65 / 0.55-0.70" 是否可以简化为 1 个 nominal "~0.55-0.60"?

### Q4 · 规则边界

- V13-P0-A 跟 §15 既有 Hero image archetype 是否冲突?既有 §15 line 496 写 "image background mode" + 可能已有 dim overlay 规则 — 检查是否重复
- V13-P0-A 跟 §14.1 R-125 R-128 既有 wrapper rule 顺序是否合理?
- V13-P0-B 跟 §14.1 既有 R-125 句的整合,是否引入新内部矛盾?
- 是否引入**新的 anti-pattern 风险**(e.g. doubao 在非 image Hero 也强制加 var(--background) overlay)?

### Q5 · 整体推荐

- 做几个 of 2(2/2 / 1/2 / 0/2)?
- 推荐顺序(先做 P0-A 还是 P0-B)?
- 是否可以合并成 1 处 §14.1 改动(P0-A + P0-B 都在 §14.1)?
- v1.3 总行数上限推荐(具体数字)?
- 一句话总结

---

## 必读

- **v1.2 完整源**:`/Users/nova-macmini/Code/design-prompt-management/prompts/vibe-view-campaign-report/default/v1.2.md` (639 行 · 重点 §14.1 line 446-462 / §15 line 479-516 / §17 R-125 / R-128 既有 patches 位置)
- **Round-9 完整报告**(若文件存在):`/Users/nova-macmini/Library/CloudStorage/Dropbox/coding-playground/vibe-view-PE-test/reports/Robustness-Report_default-v1.2_Round-9.md`
- **R-128 scope review**(上下文,V11-P0-3 当时砍掉的判断):`/Users/nova-macmini/Code/design-prompt-management/handoffs/CC-Cowork_v1.2-scope-review.md`

---

## 回报模板

```
=== v1.3 Scope Review · <reviewer name> ===

Q1 必要性:
  V13-P0-A Hero overlay 同色: <NECESSARY / OPTIONAL / SKIP> · reason: ...
  V13-P0-B V11 reinforce: <NECESSARY / OPTIONAL / SKIP> · reason: ...

Q2 美观度收益:
  V13-P0-A: 估 R-10 Hero image 一致性 <X/8> · PASS prob <Y%>
  V13-P0-B: 估 R-10 V11 wrapper PASS <X/8> (R-9 baseline 6/8)
  Highest ROI: <patch #> · Lowest ROI: <patch #>

Q3 行数控制:
  压缩空间: 实际 +<N> 行 vs 原 +6 行
  合并建议: <yes / no, 具体怎么合>
  opacity range 简化: <yes / no>

Q4 规则边界:
  矛盾: <none / 具体>
  冲突: <none / 具体>
  新 anti-pattern 风险: <list, or NONE>

Q5 整体推荐:
  做几个: <0 / 1 / 2 of 2>
  顺序: <patch # > # >
  合并: <yes / no>
  v1.3 总行数上限: <N>

我的一句话总结:
  <one-line synthesis>
```

---

## 触发词

独立 review · 不要看其他 reviewer 意见 · 不要 propose 最终 patch 文字(由 Cowork 综合后派 Opus 4.8 写)。

开始。
