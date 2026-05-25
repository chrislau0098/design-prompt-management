---
style_name: "Swiss Systematic · Editorial Blue"
description: "A light-gray campaign report where bold sans-serif headlines in ALL CAPS dominate the Hero, cobalt blue numerals carry every metric, and a systematic grid of dense info-graphics packs the page. Drama comes from typographic scale, the rigorous grid rhythm, and the cobalt accent flashing across chart series and chapter numerals. No decoration except hairlines and circle number markers — Swiss minimalism with bold typographic confidence."
template_version: v0.5.2
version: v0.8
updated: 2026-05-24
manual_override: true
changelog_note: "R-95 trim · ≤620 行 / 删 §2 重复 color rule prose + §6 重复 whileInView prose + §17 Tooltip 三段合并;约束力 0 弱化"
---

## 1. Brand & Style

Mood: **Systematic · Grid-Driven · Bold-Typographic · Editorial-Blue**

Proposition: A light-gray campaign report where bold sans-serif headlines in ALL CAPS dominate the Hero, cobalt blue numerals carry every metric, and a systematic grid of dense info-graphics packs the page. Drama comes from typographic scale, the rigorous grid rhythm, and the cobalt accent flashing across chart series and chapter numerals. No decoration except hairlines and circle number markers — Swiss minimalism with bold typographic confidence.

## 2. Colors

Mode: light. Color space: OKLCH.

```css
:root {
  --brand-hue: 232;
  --background:    oklch(0.985 0.002 232);
  --surface-l1:    oklch(0.985 0.002 232);
  --surface-l2:    oklch(0.965 0.003 232);
  --surface-l3:    oklch(0.935 0.004 232);
  --foreground:    oklch(0.14 0.008 232);
  --foreground-2:  oklch(0.42 0.008 232);
  --foreground-3:  oklch(0.62 0.008 232);
  --border:        oklch(0.14 0.008 232 / 0.1);
  --border-strong: oklch(0.14 0.008 232 / 0.22);
  --primary:       oklch(0.48 0.22 var(--brand-hue));
  --primary-hl:    oklch(0.58 0.22 var(--brand-hue));
  
  --primary-glow:  oklch(0.48 0.22 var(--brand-hue) / 0.15);
  --chart-1:       var(--primary);
  --chart-2:       oklch(0.55 0.2 var(--brand-hue));
  --chart-3:       oklch(0.45 0.16 var(--brand-hue));
  --chart-4:       oklch(0.35 0.12 var(--brand-hue));
  --chart-5:       oklch(0.25 0.08 var(--brand-hue));
  --chart-hover:   oklch(0.14 0.008 232 / 0.05);
  --quote-bg:      oklch(0.965 0.003 232);
  --outro-bg:      oklch(0.985 0.002 232);
  
  
}
```

Color rules:
- Focal numbers use `--primary` (L 0.48 C 0.22). Units, unit suffixes, percent signs, delta arrows, and delta values use `--primary-hl` (same hue, lighter L 0.58 C 0.22).
- Charts: ordered single-hue ramp chart-1 through chart-5. Latest period carries chart-1 brand accent; prior periods step to chart-3 through chart-5. No green, blue, library-default, or Tailwind palette unless brand hue itself sits in that range. Hover/active-bar/tooltip use `--chart-hover`.
- Depth from Hero shader, chapter rhythm, typographic scale, brand accent — never shadow stacks. Borders whisper-thin; surfaces stack by ≤ one L step.
- **Filled cards never carry visible borders** — fill OR border, never both. Non-filled card borders stay `var(--border)` ≤ 12% alpha. Heavy / dark borders are dividers only (`<hr>` / chapter hairline / section break) — never card edges.
- **Hero ≠ chapter** — no ChapterStamp / chapter numeral / kicker inside Hero. Hero ornament: eyebrow + Display Number + delta + lead only.
- **Shader contrast issues fix at the shader source** — lower `colorFront` lightness / chroma directly (Swiss Dithering: `#C8CACE` neutral, not `#1E3FB0` cobalt). Never `backdrop-filter` / mask / opacity overlay over shader.
- Brand accent 8–15% of every viewport. Reserved for: focal numerals, chart-1 latest period, Hero shader breath, chapter index numeral, one structural accent per section.
- No `#000000`. No `#FFFFFF`. Tokens only.

Brand hue: `--brand-hue` is the only accent knob. Accent tokens take hue from it; neutral tokens (backgrounds, surfaces, foregrounds, borders) fixed at hue 232.



## 3. Typography

### Font loading

```css
/* import-cdn loading — primary Helvetica Neue · display Helvetica Neue · mono IBM Plex Mono */
```

Font stacks: Primary Sans `'Helvetica Neue', 'IBM Plex Sans', 'Neue Haas Grotesk', 'Noto Sans SC', 'PingFang SC', sans-serif`; Display Number `'Helvetica Neue', 'IBM Plex Sans', 'Neue Haas Grotesk', sans-serif`; Mono Meta `'IBM Plex Mono', ui-monospace, monospace`. 

Weight: `font-normal` (400) prose · `font-medium` (500) titles, Display Number, delta value, chapter marker, unit suffix. `font-bold` (700) is the **Swiss / IBM signature** — Hero Display Number, Page Title, Chapter Stamp numerals all use 700. Display stack ALL-CAPS at 700 is the typographic statement. Body / Lead remains 400-500.

| Level | lg | mobile | Weight |
|-------|----|--------|--------|
| Page Title | `text-[120px]` | `text-[56px]` | `font-medium` |
| Display Number | `text-[200px]` | `text-[96px]` | `font-medium` |
| Section Primary | `text-[80px]` | — | `font-medium` |
| Section Secondary | `text-[48px]` | — | `font-medium` |
| Section Tertiary | `text-[28px]` | — | `font-normal` |
| Quote | `text-[36px]` | — | `font-normal` |
| Body | `text-[15px]` | — | `font-normal` |
| Caption | `text-[13px]` | — | `font-normal` |
| Meta/Label | `text-[11px]` | — | `font-medium` `tracking-[0.08em]` |
| Eyebrow | `text-[11px]` | — | `font-medium` `tracking-[0.16em]` |

Display Number `leading-[0.86]` `tracking-[-0.04em]`. Focal numbers use exact breakpoint classes (no `clamp()` — sub-pixel jitter degrades spring count-up). Floor `text-[10px]`; required reading `text-[14px]+` per §8.

Display Number anatomy: focal figure Display Number scale `--primary`;  `--primary-hl`, baseline-aligned `gap-2`. Unit ~28–30% figure height; never same scale, never above baseline, never wrapped.

OpenType: `font-feature-settings: "kern", "tnum", "lnum"` on all data numbers.

CJK: primary sans for Hero Title, Chapter Title, Body, Caption when Chinese; display stack for Display Number (Latin only); `textWrap: "balance"`; `max-w-[42ch]` body / `max-w-[18ch]` hero; 0.1em space flanking digits in mixed lines.

 Body: `text-[15px]`/`text-[13px]` caption, `font-normal`, `--foreground-2` prose, `--foreground-3` only decorative.

Chapter title: claim-line (5–14 CJK / 4–9 EN words), Section Primary, `font-medium`, `--foreground`. Names the outcome; never slogan, never ALL-CAPS, never question.

Hierarchy: one Primary number per section (largest, `--primary`, `--primary-hl` on unit/delta). Tiers differ ≥ 2 steps. Emphasis from scale and color — never italic, never bold above 700.

## 4. Spacing & Layout

Base unit: 8px. Scale: `1` `2` `3` `4` `6` `8` `12` `16` `24`. Section: `py-24 px-6` mobile → `py-40 px-16` desktop. Container: `max-w-7xl` paragraph-driven; `max-w-5xl` KPI/chart. Grid: `gap-2`, `items-baseline`, `min-w-0`.

Long-scroll cadence: chapters stack vertically, separated by hairline + accent ornament. Content determines height, `min-h-[80vh]` floor. Overflow: truncate, wrap, or scale to longest plausible value.

Density: one observation per viewport. Gaps: `gap-1` tight · `gap-3` label+number · `gap-8` paragraph→KPI · `gap-12` KPI→chart.

Radius: pill/tag: none. Sharp panel (table/chart): `rounded-[0px]`–`rounded-[0px]`. Card chrome (cluster/commitments): `rounded-[0px]`.

KPI row: 4–6 cells, vertical hairline column rule, Display Number + unit + caption each. `px-6 py-4`; first `pl-0`. Stack below `md:` with horizontal hairline.

## 5. Material

Surface: flat ground from `var(--background)` token (no page-level shader). Hero shader is the page's only WebGL layer, scoped to Hero section. Panels lift through hairline + one-step L difference, never shadow stacks or backdrop-blur.

Borders: Whisper `1px solid var(--border)` · Strong `var(--border-strong)`. Shadow: none on cards.

Shader policy: 1 WebGL instance per page (Hero only). Pauses to `speed: 0` off-viewport, returns `speed: 0.4` on re-enter.





Chapter opener: `ChapterBanner` — ShadBadge `variant="outline"` mono ALL-CAPS chapter index (`01`) + ALL-CAPS chapter title sans 700 + `ShadSeparator` (Radix-based, per-pack styled) full-width below. No SVG, no solid-fill stamp, no dot, no gradient.

Chapter divider: `oklch(1 0 0 / 0.08) h-px`. In-chapter rest only.

Panel discipline: `rounded-[2px]`–`rounded-[0px]` chart frames, `rounded-[0px]` card chrome. Each archetype one material logic.

## 6. Motion

Engines: `motion/react` · `motion-plus/react` (AnimateNumber) · `@paper-design/shaders-react` (Dithering).

```ts
const EASE = {
  out: [0.16, 0.84, 0.24, 1],
  inOut: [0.7, 0, 0.3, 1],
  snap: [0.18, 0, 0.05, 1],
  spring: [0.4, 0, 0.3, 1],
};
```

| Category | Duration | Easing |
|----------|----------|--------|
| Hover | 150ms | out |
| Button press | 100ms | snap |
| Element entrance | 500-900ms, y: 32-36px | out |
| Number rolling | 1.2-2.0s | spring, no bounce |
| Curve pathLength | 2.0-2.8s | out |
| WebGL Hero | animated, viewport-paused | speed: 0.4 |


Entrance: Hero uses `animate=` with delays. Section shells, body paragraphs, chart wrappers, and prose render visible on first paint without animation wrappers.

**Every `whileInView` must pair `viewport={{ once: true, margin: "0px 0px -15% 0px" }}` — no exceptions.** Without `once: true`, elements reset to initial (opacity 0 / scaleX 0) on scroll-out and disappear.

```tsx
<motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -15% 0px" }} transition={{ duration: 0.8, ease: EASE.out }} />
```

Stagger: `staggerChildren: 0.1` from `"first"`. Reduce by 0.02 on mobile.

Motion per viewport: one focal motion only. Hero staged reveal → Time Series area draw → Proportion rail fill → Ranking cascade → Quote crossfade → Outro signature. Vary by archetype.

### Chapter-reveal trigger

```tsx
function useChapterReveal(margin = "-20%") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { if (inView) setRevealed(true); }, [inView]);
  return { ref, revealed };
}
```

Pass `revealed ? data : zeros` into AnimateNumber. Hero uses `margin: "0%"`.

### AnimateNumber scope

Wrap **every key number**: Hero primary, section focal claim, Comparison left/right, Ranking top-1, Cluster cell headlines. Do **not** wrap labels, ordinals, dates, axis values. Cap ≤ 3 per section. `AnimateNumber` accepts pure numeric strings only — always use `parseDisplayValue()` (§17) to extract the number from Bitable formatted values.

SVG: `pathLength: 0→1` draw-in. No `d` morph.

`prefers-reduced-motion`: `animation-duration: 0.01ms !important`; opacity crossfade only; WebGL `speed: 0`; AnimateNumber plain text.

Data-driven invariant: null/undefined → render empty state (§15), not broken animation.

Continuous motion: Hero `Dithering` speed 0.4 in viewport, 0 out. SVG strokes one-shot. No infinite breathing, no scroll-linked transforms.

## 7. Iconography

`lucide-react`, 1.25px stroke, outline-only, `currentColor`, rem sizing, `gap-2` to text. Icons ≤ cap-height. Decorative: `aria-hidden`. Semantic: `role="img"` + `aria-label`. Custom SVG only for structural-plus-motion-paths use cases. Unicode ▲ ▼ → · — • allowed inline.

## 8. Accessibility & Mobile

WCAG 2.2 AA: ≥4.5:1 text contrast · ≥3:1 UI contrast · `size-6` (24×24px) targets, `size-11` (44×44px) mobile · `ring-2` focus ring · `prefers-reduced-motion` dual-layer · content reflows at 320px · logical heading hierarchy.

Small text contrast: required labels, captions, axes, and metadata below `text-[14px]` use `--foreground-2` or an equivalent 4.5:1 token. `--foreground-3` is for decorative marks, disabled states, and non-essential metadata only.

Breakpoints (mobile-first):

| Name | Width | Behavior |
|------|-------|----------|
| Base | < 768px | Single-column; full-width CTAs |
| md | ≥ 768px | Two-column layouts; padding increase |
| lg | ≥ 1024px | Full grids; sidebar visible |
| xl | ≥ 1440px | Content caps max-w-5xl; gutters absorb |

`min-h-dvh` for full-height. `env(safe-area-inset-bottom)` for sticky elements. Stair-step type scaling (Section 3 table).

## 9. Do's and Don'ts

Do:
- Neutral ground 60% of viewport; brand accent 8–15%; prose the rest. Open every chapter with the chosen chapter opener.
- Focal numerals in `--primary`; units/percent/delta in `--primary-hl` inline at baseline. Hero leads with confident sans medium title + paragraph subtitle.
- Single-hue chart ramp chart-1–5. Latest period brand accent; older step to chart-3–5.
- One structural visual decision per viewport beyond color.

- **Don't** render focal numerals in `--foreground` — digits use `--primary`; prose holds the foreground.
- **Don't** use unauthorized accent palettes outside the brand hue. No heavy shadows, frosted glass, `backdrop-blur`, rim lighting, card-edge glow, or text glow.
- **Don't** use `rounded-xl`/`rounded-2xl`/`rounded-3xl`/blob cards. Sharp panels `rounded-[0px]`–`rounded-[0px]`; card chrome `rounded-[0px]`.
- **Don't** nest panels beyond one level or wrap sections in page-level containers.
- **Don't** use Inter, Roboto, Space Grotesk, Plus Jakarta, or overused faces outside the declared font stacks above.
- 
- **Don't** apply weight above 700. `font-bold` (700) reserved for Hero Display Number, Page Title, Chapter Stamp numerals. No `font-extrabold`, `font-black`. Body / Lead remains 400-500.
- **Don't** repeat same panel material every chapter. Vary by archetype.
- **Don't** fade whole sections opacity-only, repeat identical `y + opacity` reveals, or animate CSS layout properties. Animate `transform` and `opacity`.
- **Don't** tween numbers as single value or duplicate unit/percent; per-digit spring only.
- **Don't** use ease strings; cubic-bezier arrays only. Use `min-h-dvh` not `h-screen`.
- **Don't** render text below `text-[10px]`; required reading `text-[14px]+`.
- **Don't** wrap every number in AnimateNumber — reserve for key claim numbers. Labels, ordinals, dates, axis values render plain.
- **Don't** use `whileInView` without `viewport={{ once: true, margin: "0px 0px -15% 0px" }}`.
- **Don't** use `useInView` + conditional `animate` for entrance; use `whileInView` + `viewport`. `useInView` reserved for Hero shader pause and chapter-reveal trigger (§6).
- **Don't** use `useScroll`/`useTransform`/`scrollYProgress` for Hero exit or scroll-linked parallax.
- **Don't** use ScrambleText, Typewriter, Ticker, or character-level reveal.
- **Don't** introduce a second hot accent for delta-down or error. Neutral foreground carries those.
- **Don't** animate bar chart bars rising from zero — bars render static; highlighted bar uses `clip-path` reveal once.
- **Don't** animate paragraph reveal as reader scrolls. Prose visible on first paint.
- **Don't** wrap chapter `<section>` containers, chart wrappers, KPI grids, body paragraphs, or whole-page content blocks in `motion.div` with `initial={{ opacity: 0 }}` + `whileInView`. These containers must render visible on first paint.

## 10. Pattern Overview

### Scenario Mindset

This page is a story told in data, not a dashboard — every section is a chapter, every chart is evidence for a claim.
The narrative arc runs across the whole page: opening hook → supporting evidence → closing impact. Each section advances exactly one beat of the arc.
Each section carries one focal claim and exactly one supporting visual (chart, ranking, or quote). Parallel KPI tiles, side-by-side metric grids, and three competing focal numbers belong to a dashboard, not a campaign report.
A successful page lets the reader leave with three things: the headline number, the why behind it, the so-what of it.
Archetype names are internal planning labels only. Visible eyebrows, captions, and labels come from the topic, period, data role, or business meaning, not from section archetype names.

### Scope

Scope: scrollable single-page data narrative where numbers are the protagonist.

Atmosphere: Information density Low → High (rhythm-controlled) · Visual rhythm Strong alternation (different archetype per section) · Narrative arc Beginning → Middle → End.

Supported data shapes: time-series · proportions · paired metrics · ranking · grouped metrics · event sequence · peer catalog · comparison.

### Voice & Copy

The page's copy reads like a curator's wall text — terse, third-person, observational.

- Voice: third-person observational. Use `we` only in attribution; never address the reader as `you`.
- Statements, not calls to action: `Bookings closed at 142,300`, not `We booked 142,300!` — a campaign report is a read-only artifact.
- Eyebrows: uppercase, mono, `tracking-[0.16em]`. Titles: sentence case, no terminal period. Body: sentence case, full sentences, terminal punctuation.
- Numbers in copy: tabular figures, thousands separators, no decimal padding.
- Period strings use a `·` middle dot (U+00B7) with single spaces around it.

### Voice — Style Annotations

Copy register: 极简系统化网格,钴蓝粗字大写,信息图密集. Chapter titles 5–14 CJK / 4–9 EN words, `font-medium` sans. Eyebrow tracking `0.16em`. Resist slogans, questions, ALL-CAPS.

## 11. Section Archetype Library

A section = **archetype** (what) + **composition treatment** (layout) + **dominant move** (eye-lead).

### 11.1 Composition Treatments

| Treatment | Logic | Density |
|-----------|-------|---------|
| **Full-bleed Monolith** | One element fills frame, centered | spacious |
| **Asymmetric Split** | Two unequal columns (3:2 / 2:1) | medium |
| **Stacked Band** | Full-width bands stacked | medium–dense |
| **Matrix Grid** | Equal cells N×M, narratively bound | dense |
| **Proportion Rail** | Continuous parts-of-whole rail | medium |
| **Offset Frame** | Disrupts grid: crop/off-center/overflow | medium |
| **Sequence Track** | Stepped: index → title → note | medium–dense |
| **Typographic Field** | Type alone, no panels or chrome | spacious–medium |
| **Annotation Rail** | Main (3/4) + narrow rail (1/4) | medium |

Favored: typographic-field (Hero), Matrix Grid (KPI Cluster), Stacked Band, Asymmetric Split.

### 11.2 Dominant Move

| Move | Class |
|------|-------|
| Scale jump (focal ≥ 2 tiers larger) | steady |
| Single stroke (one line/accent) | steady |
| Path reveal (curve draws / rail fills) | steady |
| Crop / bleed | disruptive |
| Offset placement | disruptive |
| Column break | disruptive |

Leads with scale jump and single stroke. Disruptive ≤ 1 chapter per page.

### 11.3 Archetypes

**Hero Monolith** — Opening anchor. Default treatment: typographic-field. Alts: the other two treatments below.

**Time Series** — Values over time. Treatments: Stacked Band **(default)** · Asymmetric Split. Build with bare recharts `AreaChart`/`LineChart` in `<ResponsiveContainer>`, custom `<ChartTooltipCard>` or `contentStyle` per §17.

**Proportion Field** — Parts-of-whole. Treatments: Proportion Rail **(default)** · Stacked Band. Donut/pie/ring not used. Bare recharts horizontal `BarChart` + `<LabelList>`, or shadcn `Progress`.

**Comparison** — Two metrics contrasted. Treatments: Asymmetric Split **(default)** · Stacked Band. Left/right same font-size; hierarchy from color — leading `--primary`, trailing `--foreground-3`. Grid `items-start`.

**Ranking / List** — Items by magnitude. Stacked Band (≤ 5) · Matrix Grid (≥ 6). Scale jump on top-1. List typography — never recharts `BarChart`.

**Grouped Metric Cluster** — Parallel metrics, one claim. **Matrix Grid 2×2/2×3**: CSS `grid gap-1`, `bg-surface-l2 rounded-[0px] p-6 md:p-8`, no extra border/shadow; cell `h-full`, note `mt-auto`; hover `whileHover={{ y: -2 }}` 0.28s.

**Sequence / Timeline** — Time-ordered events (not values). Sequence Track default. **Horizontal Timeline** alt (desktop ≥ md): 3–5 col grid, primary-bordered circle dots (10×10, 1.5px `--primary` border, `--background` fill), 1px `--border-strong` hairline connecting. Below each: mono accent kicker · title · body. **Mobile fallback (< md): Vertical Timeline, left-aligned** — collapses to single column; rotate the hairline 90° to a 1px `--border-strong` vertical rail at the left edge (offset ~7px from container left); primary dots (14×14, 1.5px `--primary` border, `--background` fill) centered on the rail at each milestone; each milestone's content (mono accent kicker · title sans medium · body) sits to the right of the rail, **left-aligned start-aligned at the dot baseline — never center-aligned**. Use shadcn `Item` + `ItemGroup` for the vertical mobile layout.

**Peer Set / Catalog** — Same-kind peers. Matrix Grid default. Shadcn `Card` (border-0 shadow-none p-0).

**Quote Interstitial** — Narrative pause. Typographic Field. No icon, no brackets — quote sits unadorned in Typographic Field, opening en-dash `—` `--primary` as lead-in. One sentence ≤ 28 words, Quote scale `font-normal` — no italic, no left border.

**Outro Reverent** — End of report. Typographic Field. Closing claim Section Primary ALL-CAPS sans 700 + terminal full-width `ShadSeparator`. No diamond, no stamp, no ornament beyond the separator. Optional — emit only with closing claim.

## 12. Composition

Default: Hero → evidence chapters → optional Outro. Section count follows data; stop before filler. This style supports as many chapters as data evidence demands, dense rhythm.

### 12.1 Rhythm

1. **Density rotation** — adjacent differ (dense/medium/spacious); no two consecutive dense.
2. **Treatment variety** — no two consecutive same treatment or archetype.
3. **Bold-move budget** — disruptive ≤ ceil(N × 0.25). This style runs dense.
4. **Break cadence** — ≥ 1 section uses Full-bleed, Offset, or Typographic Field. Hero + Outro satisfy.

### 12.2 Rules

Ground consistent across chapters; vary rhythm through density, hairlines, accent position. Chapter markers: `01` `02` `03`. ChapterStamp at most 3× when optional. Chapter opener: `ChapterBanner` (ShadBadge outline + ALL-CAPS title) + `ShadSeparator` every non-Hero chapter (one per chapter, no exceptions). Chapter divider for in-chapter rests, sparingly.

## 13. Section Anatomy

### 13.1 Hero Monolith

Focal: primary-value Display Number, display stack `font-medium` `--primary`, inline unit `--primary-hl`, animated count-up. Background: page-level `var(--background)` ground + Dithering Hero anchor (Hero section internal, see §17, viewport-paused). 

Composition — typographic-field: Centered type-only field. No chart, no figure — claim-line title carries the section.

Hero brand marks: focal numeral, delta indicator, shader breath.

Alts: the other two treatments not chosen as default.

Anti-refs: **Don't** set Hero on saturated brand-hue ground. **Don't** use product photos. **Don't** stack banners or KPI grids in Hero. **Don't** pair brand accent with a second hot accent.

Primary-value selection: (1) rate/percentage → avg, (2) aggregate keyword → sum, (3) primary metric → max, (4) same → avg. If missing, omit Hero.

```tsx
const heroVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.out } } };
const { prefix, number, suffix } = parseDisplayValue(displayValue)

<motion.div initial="hidden" animate="visible" variants={heroVariants} className="relative z-20">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-x-16 items-start">
    <div className="flex flex-col items-start text-left">
      <motion.p variants={fadeUp}><Eyebrow>{topic} · {period}</Eyebrow></motion.p>
      <motion.h1 variants={fadeUp} className="max-w-[18ch] text-[96px] md:text-[200px] font-medium leading-[0.86] tracking-[-0.04em] text-[var(--foreground)]">{heroTitle}</motion.h1>
      <motion.p variants={fadeUp} className="max-w-[42ch] text-[15px] font-normal leading-[1.6] text-[var(--foreground-3)]">{subtitle}</motion.p>
      <motion.div variants={fadeUp} className="inline-flex items-baseline gap-1 whitespace-nowrap">
        {/* Use parseDisplayValue() to safely split formatted Bitable value */}
        {prefix && <span style={{ color: "var(--primary-hl)" }}>{prefix}</span>}
        <AnimateNumber style={{ color: "var(--primary)" }} transition={{ type: "spring", duration: 2.0, bounce: 0 }}>{number || 0}</AnimateNumber>
        {suffix && <span style={{ color: "var(--primary-hl)" }}>{suffix}</span>}
      </motion.div>
    </div>
    <motion.aside variants={fadeUp} className="hidden lg:flex flex-col items-end gap-10" />
  </div>
</motion.div>
```

Budget: 5-step stagger (entrance), AnimateNumber roll (data-load), shader breath (ambient).

### 13.2 Non-Hero slot mapping

| Archetype × Treatment | Focal | Secondary | Move |
|-----------------------|-------|-----------|------|
| Time Series · Stacked Band | chart upper band | prose lower | path reveal |
| Comparison · Asymmetric Split | leading `--primary` wide col | trailing `--foreground-3` same font-size | scale jump |
| Ranking · Stacked Band | top-1 row | rows 2–5 descending | scale jump |
| Cluster · Matrix Grid | banner + Display Number `--primary` cells | `h-full` + `mt-auto` alignment | scale jump |
| Quote · Typographic Field | Quote text `font-normal` foreground | leading en-dash `—` + attribution | column break |
| Outro · Typographic Field | closing title Section Primary | terminal `ShadSeparator` + caveats | single stroke |
| Hero · typographic-field | focal Display Number `--primary` | metadata mono uppercase | scale jump |

## 14. Data → Section Mapping

| Data Shape | Archetype |
|------------|-----------|
| Report-level anchor | Hero Monolith |
| Time-ordered series | Time Series |
| Parts-of-whole | Proportion Field |
| Two contrasting values | Comparison |
| Ordered by magnitude | Ranking / List |
| Parallel metrics, one claim | Grouped Metric Cluster |
| Time-ordered events | Sequence / Timeline |
| Same-kind peer set | Peer Set / Catalog |
| Narrative beat | Quote Interstitial |
| End reflection | Outro Reverent |

Priority: data shape → adjacency → treatment per §11.3 → §12 rhythm. Favored order: Hero → Cluster → Time Series → Comparison → Cluster → Ranking → Sequence → Outro.

## 15. Functional States

- **Loading**: skeleton replaces only data-dependent slots. Static section structure, Hero shader, and chapter markers remain visible.
- **Empty**: section frame + centered "No data available" in `--foreground-3`.
- **Error**: frame + retry icon + "Failed to load" + retry button in `--foreground-2`.

## 16. Do's and Don'ts

Do: alternate archetypes. Consistent ground; vary rhythm through density/hairlines/accent position. One focal per section. Skip data-absent sections. Visible labels from topic/period/metric/business meaning.

- **Don't** show archetype names in visible UI.
- **Don't** use equal 3-col grids, sidecar KPI stacks, or Matrix not evidencing one claim.
- **Don't** fix section heights; content determines, min-height.
- **Don't** show multiple primary numbers per section. Separate legends from charts.
- **Don't** use donut/pie/ring charts — proportion is rail or band.
- **Don't** repeat identical circular markers. Apply identical reveals everywhere.
- **Don't** show >5 ranking items untruncated. Allow horizontal scroll.
- **Don't** use emoji. Add CTA/action buttons, "view more", dashboard/marketing verbs, second-person imperatives.
- **Don't** force outro without closing claim.

Light-mode: overlays/skeletons use `--surface-l2`. No vignettes.

## 17. Components Inventory

### Pre-imported

**Page ground** — Page background uses `var(--background)` token directly. Set via `style={{ background: "var(--background)" }}` on the App root `<div>`. The page has no page-level WebGL shader; the only WebGL layer is Hero `<Dithering>` (see below).


> Pass hex / rgb / hsl strings to paper-shaders `colors` and `colorBack` props. The shader engine does not parse CSS `oklch()` color functions — use the hex equivalent. CSS tokens with oklch() still apply on regular DOM elements.

**Dithering** (@paper-design/shaders-react) — Hero anchor shader.

```tsx
import { Dithering } from "@paper-design/shaders-react";

function HeroShader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-10% 0px' });
  const reducedMotion = useReducedMotion();

  return (
    <>
      <div ref={ref} className="pointer-events-none"
        style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} aria-hidden />
      <div className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 10, opacity: inView ? 1 : 0, transition: 'opacity 500ms ease' }} aria-hidden>
        <Dithering
          type="8x8"
          shape="simplex"
          size={ 3 }
          colorFront="#C8CACE"
          colorBack="#EEEFF1"
          scale={ 1 }
          speed={!reducedMotion && inView ? 0.4 : 0}
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>
    </>
  );
}
```

**App root structure** — Page background uses `var(--background)` flat token directly on the App root `<div>`. Do not wrap chapter sections in any semantic container (`<main>` / `<article>` / `<section>` wrapping all sections) — semantic wrappers create extra stacking contexts that conflict with absolute-positioned shaders inside Hero. The Hero shader lives inside Hero `<section className="relative">`; all other chapter sections are direct children of the App root `<div>` and inherit the flat `var(--background)` ground.

**AnimateNumber** (motion-plus/react) — Per-digit scroll. `{number || 0}` triggers roll. Children must be a **pure numeric string** (no commas, no symbols). Bitable formatted values like `"¥1,234,567.00"` or `"85%"` will NaN — use `parseDisplayValue()` to split first.

```tsx
import { AnimateNumber } from "motion-plus/react";

// Split Bitable formatted value → prefix / pure number / suffix
function parseDisplayValue(value: string | number | undefined) {
  if (value === undefined || value === null) return { prefix: "", number: "0", suffix: "" };
  const str = String(value);
  const match = str.match(/^([^\d\-]*?)(-?[\d,]+\.?\d*)(.*)$/);
  if (!match) return { prefix: "", number: "0", suffix: "" };
  return {
    prefix: (match[1] ?? "").trim(),
    number: match[2].replace(/,/g, ""),
    suffix: (match[3] ?? "").trim(),
  };
}

// Usage: "¥1,234,567.00" → prefix="¥", number="1234567.00", suffix=""
//        "85%" → prefix="", number="85", suffix="%"
const { prefix, number, suffix } = parseDisplayValue(row["sum(fldRevenue)"]?.value);
<span className="inline-flex items-baseline gap-1 whitespace-nowrap">
  {prefix && <span style={{ color: "var(--primary-hl)" }}>{prefix}</span>}
  <AnimateNumber
    style={{ color: "var(--primary)" }}
    transition={{ type: "spring", duration: 2.0, bounce: 0 }}
  >
    {number || 0}
  </AnimateNumber>
  {suffix && <span style={{ color: "var(--primary-hl)" }}>{suffix}</span>}
</span>
```

**Recharts** (recharts) — Bare recharts for all charts. Series colors from `var(--chart-1)` through `var(--chart-5)` directly.

```tsx
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

<ResponsiveContainer width="100%" height="100%">
  <AreaChart data={chartData} margin={{ top: 24, right: 24, left: 0, bottom: 16 }}>
    <CartesianGrid stroke="var(--border-strong)" strokeDasharray="2 4" vertical={ false } />
    <XAxis dataKey="period" stroke="var(--foreground-2)" tickLine={false} axisLine={false} />
    <YAxis stroke="var(--foreground-2)" tickLine={false} axisLine={false} width={48} />
    <Area type="monotone" dataKey="revenue" stroke="var(--chart-1)" fill="url(#fillRevenue)"
      strokeWidth={2} isAnimationActive={false}
      
      activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }} />
    <Tooltip cursor={{ fill: "var(--chart-hover)" }}
      contentStyle={{ background: "var(--surface-l2)", border: "1px solid var(--border-strong)", color: "var(--foreground)" }} wrapperStyle={{ outline: "none" }} />
  </AreaChart>
</ResponsiveContainer>
```

Rules: `isAnimationActive={false}` always. `--chart-1` latest period only, prior step to `--chart-3`–`--chart-5`. Grid `var(--border-strong)` horizontal only. Axis `var(--foreground-2)`, no tickLine/axisLine. Area flat `fillOpacity={ 0.2 }`.  Three treatments: (1) Bar + `<LabelList position="top">`; (2) Area + flat fill + last-point; (3) Sparkline `h-12` no axes.

**Recharts defaults render solid `#000` — every Bar, Tooltip, and BarChart cursor must be explicitly token-styled.**
- **`<Bar fill>`**: required. `fill="var(--chart-N)"` for single-color series, `<Cell>` children for per-point. Never recharts default, never Tailwind, never hex. Latest = `--chart-1`; prior step to `--chart-3`–`--chart-5`.
- **`<Tooltip contentStyle>`**: required. `{{ background: "var(--surface-l2)", border: "1px solid var(--border-strong)", color: "var(--foreground)" }}` for inline; or `content={<ChartTooltipCard />}` for custom.
- **BarChart `<Tooltip cursor>`**: required. `cursor={{ fill: 'var(--chart-hover)' }}` or `cursor={false}`. Never default.

### Inline-injected

**ChapterBanner** — Shadcn `Badge variant="outline"` chapter index (mono ALL-CAPS `01` / `02` / `03`, sans 700, `border-strong` outline) + ALL-CAPS chapter title sans 700 to the right + `ShadSeparator` (Radix-based) full-width below. No SVG, no solid-fill, no kicker.

**ShadSeparator** — Radix-based separator (`@radix-ui/react-separator`), full-width 1px rule, no gradient, no dot, no fade. Use the shadcn `<Separator />` primitive — token-styled per pack.

**SharpTag** — Replaces pill / `Badge`. **Sharp 0px corner radius** outline only. Thin border + sans 500 label.

```tsx
function SharpTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5"
      style={{
        border: "1px solid var(--border-strong)",
        borderRadius: 0,
        fontSize: 12, fontWeight: 500,
        color: "var(--foreground-2)", background: "transparent",
      }}>{children}</span>
  );
}
```

**Inline DeltaIndicator** — No pill, no border, no background. Sans 700 weight character + value. Up: `▲` `--primary`; down: `▼` `--foreground-2`.

```tsx
function DeltaIndicator({ direction, value }: { direction: "up" | "down"; value: string }) {
  const isUp = direction === "up";
  return (
    <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
      <span style={{ fontWeight: 700, color: isUp ? "var(--primary)" : "var(--foreground-2)" }}>{isUp ? "▲" : "▼"} {value}</span>
    </span>
  );
}
```

**Systematic discipline (Swiss / IBM)** — Page-wide 0px corner radius (no `rounded-*` anywhere). Hairline-only depth: no `box-shadow`, no `backdrop-blur`, no `noise overlay`, no `drawn-horizon`, no `SpotlightGradient`, no `OutroSignature`. ALL CAPS reserved for Hero focal title and eyebrows only. Hero background is the static CSS dot-grid layer (above), not a WebGL shader.

**Tooltip contentStyle** — Use inline `contentStyle={{ background: "var(--surface-l1)", border: "1px solid var(--border-strong)", color: "var(--foreground)", borderRadius: 0 }}` directly on `<Tooltip />`. Sharp corner, no shadow.


**Inline number+unit** — `inline-flex items-baseline gap-2 whitespace-nowrap`. Fits within card padding.

**Focal numeric font-size must scale down for long values** — apply length-based conditional `className` on the focal Display Number derived from `displayNumber.length`: ≤ 7 char default scale (§3 table) / 8–11 char drop one tier / ≥ 12 char drop two tiers. Parent must `min-w-0` AND child `whitespace-nowrap` — `min-w-0` alone makes Grid cells shrink but text won't auto-resize, only `overflow:hidden` truncates (data loss). **Don't** rely on `min-w-0` alone or `clamp()` (sub-pixel jitter degrades AnimateNumber spring per §3).

### Component mapping (non-chart)

| Archetype | Primary |
|---|---|
| Hero | `motion.div` stack + paper-shaders Hero shader |
| Cluster | CSS grid card-chrome cells |
| Ranking | Stacked rows or shadcn `Item`+`ItemGroup` |
| Sequence | Shadcn `Item`+`ItemGroup` + track |
| Peer Set | Shadcn `Card` grid (border-0) |
| Quote | `<figure>` + leading en-dash `—` |
| Outro | `motion.div` + terminal `ShadSeparator` |
| Loading | Shadcn `Skeleton` |
| Divider | Shadcn `Separator` |
| Tag | `SharpTag` (sharp 0px corner outline) |

## 18. Component Constraints

Use top-level hooks, typed props, `motion/react`, `motion-plus/react`, numeric easing arrays, `aria-hidden` for decorative visuals, semantic labels for readable values, `isAnimationActive={false}` on Recharts, and reduced-motion fallbacks for AnimateNumber, WebGL, and off-screen continuous motion.
