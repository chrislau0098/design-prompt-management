---
style_name: "Festive Royal · Crimson Gold"
description: "A deep crimson campaign report where pure gold serif numerals carry every focal claim, gold-tinted ivory prose drapes across deep red chromatic ground, and chapter rhythm flows through gold seal stamps and hairline gold rules. Drama comes from the chromatic crimson field, a deep-red grain shader breathing under the Hero, the gold seal cadence, and confident serif typography held at medium-to-bold weight — a Chinese ceremonial register translated into a modern long-scroll data narrative."
template_version: v0.5.2
version: v0.3
updated: 2026-05-24
manual_override: true
changelog_note: "R-95 trim · ≤620 行 / 删 §2 重复 color rule prose + §6 重复 whileInView prose + §17 Tooltip 三段合并 + 多处装饰空行;约束力 0 弱化"
---

## 1. Brand & Style

Mood: **Festive · Royal · Crimson-Gold · Ceremonial**

Proposition: A deep crimson campaign report where pure gold serif numerals carry every focal claim, gold-tinted ivory prose drapes across deep red chromatic ground, and chapter rhythm flows through gold seal stamps and hairline gold rules. Drama comes from the chromatic crimson field, a deep-red grain shader breathing under the Hero, the gold seal cadence, and confident serif typography held at medium-to-bold weight — a Chinese ceremonial register translated into a modern long-scroll data narrative.

## 2. Colors

Mode: chromatic. Color space: OKLCH.

```css
:root {
  --brand-hue: 80;
  --background:    oklch(0.42 0.18 25);
  --surface-l1:    oklch(0.42 0.18 25);
  --surface-l2:    oklch(0.38 0.17 25);
  --surface-l3:    oklch(0.34 0.15 25);
  --foreground:    oklch(0.92 0.04 80);
  --foreground-2:  oklch(0.82 0.06 80);
  --foreground-3:  oklch(0.7 0.08 80);
  --border:        oklch(0.92 0.04 80 / 0.18);
  --border-strong: oklch(0.92 0.04 80 / 0.32);
  --primary:       oklch(0.82 0.14 var(--brand-hue));
  --primary-hl:    oklch(0.88 0.1 var(--brand-hue));
  
  --primary-glow:  oklch(0.82 0.14 var(--brand-hue) / 0.18);
  --chart-1:       var(--primary);
  --chart-2:       oklch(0.8 0.14 var(--brand-hue));
  --chart-3:       oklch(0.74 0.16 var(--brand-hue));
  --chart-4:       oklch(0.68 0.18 var(--brand-hue));
  --chart-5:       oklch(0.62 0.2 var(--brand-hue));
  --chart-hover:   oklch(0.92 0.04 80 / 0.08);
  --quote-bg:      oklch(0.38 0.17 25);
  --outro-bg:      oklch(0.42 0.18 25);
  --ember-wash:    oklch(0.82 0.14 80 / 0.14);
  
}
```

Color rules:
- Focal numbers use `--primary` (L 0.82 C 0.14). Units, unit suffixes, percent signs, delta arrows, and delta values use `--primary-hl` (same hue, lighter L 0.88 C 0.1).
- Charts: ordered single-hue ramp chart-1 through chart-5. Latest period carries chart-1 brand accent; prior periods step to chart-3 through chart-5. No green, blue, library-default, or Tailwind palette unless brand hue itself sits in that range. Hover/active-bar/tooltip use `--chart-hover`.
- Depth from Hero shader, chapter rhythm, typographic scale, brand accent — never shadow stacks. Borders whisper-thin; surfaces stack by ≤ one L step.
- **Filled cards never carry visible borders** — fill OR border, never both. Non-filled card borders stay `var(--border)` ≤ 12% alpha. Heavy / dark borders are dividers only (`<hr>` / chapter hairline / section break) — never card edges.
- **Hero ≠ chapter** — no ChapterStamp / chapter numeral / kicker inside Hero. Hero ornament: eyebrow + Display Number + delta + lead only.
- **Shader contrast issues fix at the shader source** — lower `colorFront` lightness / chroma directly. Never `backdrop-filter` / mask / opacity overlay over shader.
- Brand accent 8–15% of every viewport. Reserved for: focal numerals, chart-1 latest period, Hero shader breath, chapter index numeral, one structural accent per section.
- No `#000000`. No `#FFFFFF`. Tokens only.

Brand hue: `--brand-hue` is the only accent knob. Neutral tokens fixed at hue 25; foreground prose shifts to hue 80 for ceremonial offset against crimson ground.

**Chromatic mode**: surfaces step within crimson hue family ≤ 0.08 L (per §2 css tokens). Foreground gold ivory `hue 80` against crimson `hue 25`. No black, no white tokens.

## 3. Typography

### Font loading

```css
/* import-cdn loading — primary Cormorant Garamond · display Cormorant Garamond · mono IBM Plex Mono */
```

Font stacks: Primary Sans `'Cormorant Garamond', 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', 'STSong', serif`; Display Number `'Cormorant Garamond', 'Playfair Display', 'Noto Serif SC', 'Source Han Serif SC', serif`; Mono Meta `'IBM Plex Mono', ui-monospace, monospace`. All serif — Display + Hero Title + Section + Eyebrow + Body + Caption use the declared serif stack consistently. No italic posture; emphasis from scale and color only.

Weight: `font-normal` (400) prose · `font-medium` (500) titles, Display Number, delta value, chapter marker, unit suffix. `font-bold` (700) is the **Royal serif signature** — Hero Display Number, Hero Title, Section Primary, SealStamp numerals all use 700. Body / Lead / Caption remains 400-500. No `font-extrabold`, `font-black`.

| Level | lg | mobile | Weight |
|-------|----|--------|--------|
| Hero Title | `text-[96px]` | `text-[48px]` | `font-medium` |
| Display Number | `text-[180px]` | `text-[80px]` | `font-medium` |
| Section Primary | `text-[72px]` | — | `font-medium` |
| Section Secondary | `text-[48px]` | — | `font-medium` |
| Section Tertiary | `text-[28px]` | — | `font-normal` |
| Quote | `text-[36px]` | — | `font-normal` |
| Lead Paragraph | `text-[19px]` | — | `font-normal` |
| Body | `text-[16px]` | — | `font-normal` |
| Caption | `text-[13px]` | — | `font-normal` |
| Unit Suffix | `text-[44px]` | — | `font-medium` |
| Meta/Label | `text-[12px]` | — | `font-medium` `tracking-[0.14em]` |
| Eyebrow | `text-[12px]` | — | `font-medium` `tracking-[0.22em]` |

Display Number `leading-[0.88]` `tracking-[-0.02em]`. Focal numbers use exact breakpoint classes (no `clamp()` — sub-pixel jitter degrades spring count-up). Floor `text-[10px]`; required reading `text-[14px]+` per §8.

Display Number anatomy: focal figure Display Number scale `--primary`; unit suffix inline Unit Suffix scale `--primary-hl`, baseline-aligned `gap-2`. Unit ~28–30% figure height; never same scale, never above baseline, never wrapped.

OpenType: `font-feature-settings: "kern", "liga", "tnum", "lnum", "onum" 0` on all data numbers.

CJK: primary sans for Hero Title, Chapter Title, Body, Caption when Chinese; display stack for Display Number (Latin only); `textWrap: "balance"`; `max-w-[44ch]` body / `max-w-[18ch]` hero; 0.1em space flanking digits in mixed lines.

Lead paragraph: first paragraph each chapter at Lead Paragraph scale, `font-normal`, `--foreground-2`, max `max-w-[44ch]` CJK / `max-w-[60ch]` EN. Body: `text-[16px]`/`text-[13px]` caption, `font-normal`, `--foreground-2` prose, `--foreground-3` only decorative.

Chapter title: claim-line (5–14 CJK / 4–9 EN words), Section Primary, `font-medium`, `--foreground`. Names the outcome; never slogan, never ALL-CAPS, never question.

Hierarchy: one Primary number per section (largest, `--primary`, `--primary-hl` on unit/delta). Tiers differ ≥ 2 steps. Emphasis from scale and color — never italic, never bold above 700.

## 4. Spacing & Layout

Base unit 8px. Scale `1` `2` `3` `4` `6` `8` `12` `16` `24` `32`. Section: `py-32 px-6` mobile → `py-56 px-20` desktop. Container: `max-w-4xl` paragraph-driven; `max-w-5xl` KPI/chart. Grid: `gap-2`, `items-baseline`, `min-w-0`.

Long-scroll cadence: chapters stack vertically, hairline + accent ornament between; content-driven height, `min-h-[80vh]` floor; overflow truncate/wrap/scale. One observation per viewport. Gaps `gap-1` tight · `gap-3` label+number · `gap-8` paragraph→KPI · `gap-12` KPI→chart.

Radius pill/tag none. Sharp panel `rounded-[0px]`–`rounded-[2px]`; card chrome `rounded-[2px]`. KPI row 4–6 cells, vertical hairline column rule, Display Number + unit + caption each; `px-6 py-4` (first `pl-0`); stack below `md:` with horizontal hairline.

## 5. Material

Surface: flat ground from `var(--background)` token (no page-level shader). Hero shader is the page's only WebGL layer, scoped to Hero section. Panels lift through hairline + one-step L difference, never shadow stacks or backdrop-blur.

Borders: Whisper `1px solid var(--border)` · Strong `var(--border-strong)`. Shadow: none on cards.

Shader policy: 1 WebGL instance per page (Hero only). Pauses to `speed: 0` off-viewport, returns `speed: 1.4` on re-enter.

Brand wash: `--ember-wash` ~12–18% alpha radial gradient marks Hero focal value. Above shader, below text.

Chapter opener: `SealStamp` SVG (28-40px) solid-fill `fill="var(--primary)"` square or circle with **centered serif chapter numeral 700 weight in `var(--background)` reverse**, optional bilingual ceremonial label below (e.g. `第一章 · CHAPTER ONE`) `--foreground` serif `font-medium`, no ring, no banner kicker. Above: full-width `GoldenHairline` 1px `var(--primary)` 0.4 alpha rule.

Chapter divider: `oklch(1 0 0 / 0.08) h-px`. In-chapter rest only.

Panel discipline: `rounded-[2px]`–`rounded-[2px]` chart frames, `rounded-[2px]` card chrome. Each archetype one material logic.

## 6. Motion

Engines: `motion/react` · `motion-plus/react` (AnimateNumber) · `@paper-design/shaders-react` (GrainGradient).

```ts
const EASE = {
  out: [0.2, 0.85, 0.25, 1],
  inOut: [0.7, 0.05, 0.2, 1],
  snap: [0.18, 0, 0.05, 1],
  spring: [0.42, 0, 0.3, 1],
};
```

| Category | Duration | Easing |
|----------|----------|--------|
| Hover | 200ms | out |
| Button press | 120ms | snap |
| Element entrance | 700-1100ms, y: 32-36px | out |
| Number rolling | 1.6-2.4s | spring, no bounce |
| Curve pathLength | 2.4-3.2s | out |
| Signature stroke | 2.2s | out, one-shot |
| WebGL Hero | animated, viewport-paused | speed: 1.4 |


Entrance: Hero uses `animate=` with delays. Section shells, body paragraphs, chart wrappers, and prose render visible on first paint without animation wrappers.

**Every `whileInView` must pair `viewport={{ once: true, margin: "0px 0px -12% 0px" }}` — no exceptions.** Without `once: true`, elements reset to initial (opacity 0 / scaleX 0) on scroll-out and disappear.

```tsx
<motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -12% 0px" }} transition={{ duration: 0.8, ease: EASE.out }} />
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

SVG `pathLength: 0→1` draw-in (no `d` morph). Continuous motion: Hero `GrainGradient` speed 1.4 in viewport, 0 out; SVG strokes one-shot; no infinite breathing, no scroll-linked transforms.

`prefers-reduced-motion`: `animation-duration: 0.01ms !important`; opacity crossfade only; WebGL `speed: 0`; AnimateNumber plain text. Data null/undefined → empty state (§15), not broken animation.

## 7. Iconography

`lucide-react`, 1px stroke, outline-only, `currentColor`, rem sizing, `gap-2` to text. Icons ≤ cap-height. Decorative: `aria-hidden`. Semantic: `role="img"` + `aria-label`. Custom SVG only for structural-plus-motion-paths use cases. Unicode ▲ ▼ · — • ※ allowed inline.

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
- **Don't** use `rounded-xl`/`rounded-2xl`/`rounded-3xl`/blob cards. Sharp panels `rounded-[0px]`–`rounded-[2px]`; card chrome `rounded-[2px]`.
- **Don't** nest panels beyond one level or wrap sections in page-level containers.
- **Don't** use Inter, Roboto, Space Grotesk, Plus Jakarta, or overused faces outside the declared font stacks above.
- **Don't** use italic posture — emphasis from scale and color only. Use the declared serif stack consistently across all type levels.
- **Don't** apply weight above 700. `font-bold` (700) reserved for Hero Display Number, Hero Title, Section Primary, SealStamp numerals — serif Royal signature. No `font-extrabold`, `font-black`. Body / Lead remains 400-500.
- **Don't** repeat same panel material every chapter. Vary by archetype.
- **Don't** fade whole sections opacity-only, repeat identical `y + opacity` reveals, or animate CSS layout properties. Animate `transform` and `opacity`.
- **Don't** tween numbers as single value or duplicate unit/percent; per-digit spring only.
- **Don't** use ease strings; cubic-bezier arrays only. Use `min-h-dvh` not `h-screen`.
- **Don't** render text below `text-[10px]`; required reading `text-[14px]+`.
- **Don't** wrap every number in AnimateNumber — reserve for key claim numbers. Labels, ordinals, dates, axis values render plain.
- **Don't** use `whileInView` without `viewport={{ once: true, margin: "0px 0px -12% 0px" }}`.
- **Don't** use `useInView` + conditional `animate` for entrance; use `whileInView` + `viewport`. `useInView` reserved for Hero shader pause and chapter-reveal trigger (§6).
- **Don't** use `useScroll`/`useTransform`/`scrollYProgress` for Hero exit or scroll-linked parallax.
- **Don't** use ScrambleText, Typewriter, Ticker, or character-level reveal.
- **Don't** introduce a second hot accent for delta-down or error. Neutral foreground carries those.
- **Don't** animate bar chart bars rising from zero — bars render static; highlighted bar uses `clip-path` reveal once.
- **Don't** animate paragraph reveal as reader scrolls. Prose visible on first paint.
- **Don't** wrap chapter `<section>` containers, chart wrappers, KPI grids, body paragraphs, or whole-page content blocks in `motion.div` with `initial={{ opacity: 0 }}` + `whileInView`. These containers must render visible on first paint.

## 10. Pattern Overview

### Scenario Mindset

Story told in data, not a dashboard. Narrative arc: opening hook → supporting evidence → closing impact; one beat per section. Each section = one focal claim + one supporting visual. Parallel KPI tiles / side-by-side metric grids / three competing focal numbers belong to a dashboard. Reader leaves with: headline number · the why · the so-what. Archetype names = internal labels; visible labels come from topic / period / data role / business meaning.

### Scope

Scope: scrollable single-page data narrative where numbers are the protagonist.

Atmosphere: Information density Low → High (rhythm-controlled) · Visual rhythm Strong alternation (different archetype per section) · Narrative arc Beginning → Middle → End.

Supported data shapes: time-series · proportions · paired metrics · ranking · grouped metrics · event sequence · peer catalog · comparison.

### Voice & Copy

Curator's wall text: third-person observational, never `you`. Statements not CTAs (`Bookings closed at 142,300`, not `We booked 142,300!`). Eyebrows uppercase mono `tracking-[0.22em]`. Titles sentence case, no terminal period. Body full sentences, terminal punctuation. Numbers tabular, thousands separators, no decimal padding. Period strings `·` middle dot (U+00B7) single-spaced.

### Voice — Style Annotations

Copy register: 整页深红朝代尊贵 / 金色衬线 / 大气庆典. Chapter titles 5–14 CJK / 4–9 EN words, `font-medium` sans. Eyebrow tracking `0.22em`. Resist slogans, questions, ALL-CAPS.

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

Favored: full-bleed-monolith (Hero), Matrix Grid (KPI Cluster), Stacked Band, Asymmetric Split.

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

**Hero Monolith** — Opening anchor. Default treatment: full-bleed-monolith. Alts: the other two treatments below.

**Time Series** — Values over time. Treatments: Stacked Band **(default)** · Asymmetric Split. Build with bare recharts `AreaChart`/`LineChart` in `<ResponsiveContainer>`, custom `<ChartTooltipCard>` or `contentStyle` per §17.

**Proportion Field** — Parts-of-whole. Treatments: Proportion Rail **(default)** · Stacked Band. Donut/pie/ring not used. Bare recharts horizontal `BarChart` + `<LabelList>`, or shadcn `Progress`.

**Comparison** — Two metrics contrasted. Treatments: Asymmetric Split **(default)** · Stacked Band. Left/right same font-size; hierarchy from color — leading `--primary`, trailing `--foreground-3`. Grid `items-start`.

**Ranking / List** — Items by magnitude. Stacked Band (≤ 5) · Matrix Grid (≥ 6). Scale jump on top-1. List typography — never recharts `BarChart`.

**Grouped Metric Cluster** — Parallel metrics, one claim. **Matrix Grid 2×2/2×3**: CSS `grid gap-1`, `bg-surface-l2 rounded-[2px] p-6 md:p-8`, no extra border/shadow; cell `h-full`, note `mt-auto`; hover `whileHover={{ y: -2 }}` 0.28s.

**Sequence / Timeline** — Time-ordered events (not values). Sequence Track default. **Horizontal Timeline** alt (≥ md): 3–5 col grid, primary circle dots 10×10 (1.5px `--primary` border, `--background` fill), 1px `--border-strong` hairline connecting; below each cell: mono kicker · title · body. **Vertical Timeline** (< md, mobile fallback): single column, 1px `--border-strong` vertical rail at left edge (offset ~7px); dots 14×14 centered on rail; content right of rail, **left-aligned at dot baseline — never centered**. Use shadcn `Item` + `ItemGroup`.

**Peer Set / Catalog** — Same-kind peers. Matrix Grid default. Shadcn `Card` (border-0 shadow-none p-0).

**Quote Interstitial** — Narrative pause. Typographic Field. No icon, no brackets — quote sits in Typographic Field with opening character `「` (CJK left corner bracket) `var(--primary)` `font-medium` as lead-in and closing `」` symmetric. Serif Quote scale, `--foreground`. One sentence ≤ 28 words, Quote scale `font-normal` — no italic, no left border.

**Outro Reverent** — End of report. Typographic Field. Closing claim Section Primary serif `font-bold` (700) + terminal full-width `GoldenHairline` 1px `var(--primary)` 0.4 alpha + optional final `SealStamp` (square variant). No diamond, no ornament beyond the gold hairline. Optional — emit only with closing claim.

## 12. Composition

Default: Hero → evidence chapters → optional Outro. Section count follows data; stop before filler. This style favors 7–9 chapters, paragraph-driven.

### 12.1 Rhythm

1. **Density rotation** — adjacent differ (dense/medium/spacious); no two consecutive dense.
2. **Treatment variety** — no two consecutive same treatment or archetype.
3. **Bold-move budget** — disruptive ≤ ceil(N × 0.25). This style runs spacious.
4. **Break cadence** — ≥ 1 section uses Full-bleed, Offset, or Typographic Field. Hero + Outro satisfy.

### 12.2 Rules

Ground consistent across chapters; vary rhythm through density, hairlines, accent position. Chapter markers: `01` `02` `03`. ChapterStamp at most 3× when bounded-3x. Chapter opener: `SealStamp` SVG square/circle `fill="var(--primary)"` + `GoldenHairline` rule every non-Hero chapter (one per chapter, no exceptions; Hero ≠ chapter, no SealStamp). Chapter divider for in-chapter rests, sparingly.

## 13. Section Anatomy

### 13.1 Hero Monolith

Focal: primary-value Display Number, display stack `font-medium` `--primary`, unit suffix `--primary-hl`, animated count-up. Background: `var(--background)` + GrainGradient Hero anchor (viewport-paused, §17) + `--ember-wash` CSS radial ~18% alpha above shader.

Composition — full-bleed-monolith: Centered single-column. Stack: eyebrow → page title → focal Display Number → subtitle → delta indicator. Alts: the two other treatments per §11.3.

Anti-refs: **Don't** set Hero on saturated brand-hue ground; **Don't** use product photos; **Don't** stack banners / KPI grids in Hero; **Don't** pair brand accent with a second hot accent.

Primary-value selection: (1) rate/percentage → avg · (2) aggregate keyword → sum · (3) primary metric → max · (4) same → avg. Missing → omit Hero.

```tsx
const heroVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE.out } } };
const { prefix, number, suffix } = parseDisplayValue(displayValue)

<motion.div initial="hidden" animate="visible" variants={heroVariants} className="relative z-20">
  <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] lg:gap-x-16 items-start">
    <div className="flex flex-col items-start text-left">
      <motion.p variants={fadeUp}><Eyebrow>{topic} · {period}</Eyebrow></motion.p>
      <motion.h1 variants={fadeUp} className="max-w-[18ch] text-[80px] md:text-[180px] font-medium leading-[0.88] tracking-[-0.02em] text-[var(--foreground)]">{heroTitle}</motion.h1>
      <motion.p variants={fadeUp} className="max-w-[44ch] text-[16px] font-normal leading-[1.6] text-[var(--foreground-3)]">{subtitle}</motion.p>
      <motion.div variants={fadeUp} className="inline-flex items-baseline gap-1 whitespace-nowrap">
        {/* Use parseDisplayValue() to safely split formatted Bitable value */}
        {prefix && <span style={{ color: "var(--primary-hl)" }}>{prefix}</span>}
        <AnimateNumber style={{ color: "var(--primary)" }} transition={{ type: "spring", duration: 2.4, bounce: 0 }}>{number || 0}</AnimateNumber>
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
| Quote · Typographic Field | Quote text `font-normal` foreground | CJK bracket `「 」` lead-in / lead-out + attribution | column break |
| Outro · Typographic Field | closing title Section Primary | closing solid-fill `SealStamp` (square) + `GoldenHairline` + caveats | single stroke |
| Hero · full-bleed-monolith | focal Display Number `--primary` | metadata mono uppercase | scale jump |

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

## 17. Components Inventory

### Pre-imported

**Page ground** — Page background uses `var(--background)` token directly. Set via `style={{ background: "var(--background)" }}` on the App root `<div>`. The page has no page-level WebGL shader; the only WebGL layer is Hero `<GrainGradient>` (see below).


> Pass hex / rgb / hsl strings to paper-shaders `colors` and `colorBack` props. The shader engine does not parse CSS `oklch()` color functions — use the hex equivalent. CSS tokens with oklch() still apply on regular DOM elements.

**GrainGradient** (@paper-design/shaders-react) — Hero anchor shader.

```tsx
import { GrainGradient } from "@paper-design/shaders-react";

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
        <GrainGradient
          shape="wave"
          colors={['#7A1818', '#A23030', '#C04848', '#D9A55C']}
          colorBack="#5E1414"
          softness={ 0.85 }
          intensity={ 0.45 }
          noise={ 0.08 }
          speed={!reducedMotion && inView ? 1.4 : 0}
          scale={ 1.6 }
          rotation={ 0 }
          offsetX={ 0 }
          offsetY={ 0.18 }
          fit="cover"
          style={{ position: 'absolute', inset: 0 }}
        />
      </div>
    </>
  );
}
```

**App root structure** — Page background uses `var(--background)` flat token directly on the App root `<div>`. Do not wrap chapter sections in any semantic container (`<main>` / `<article>` / `<section>` wrapping all sections) — semantic wrappers create extra stacking contexts that conflict with absolute-positioned shaders inside Hero. The Hero shader lives inside Hero `<section className="relative">`; all other chapter sections are direct children of the App root `<div>` and inherit the flat `var(--background)` ground.

Hero ember-wash CSS: `radial-gradient(ellipse 700px 500px at 50% 38%, oklch(0.82 0.14 80 / 0.16), transparent 70%)`. Layer stack within Hero section (bottom→top): GrainGradient (z:10) · ember-wash (z:15) · **Hero text wrapper must be `relative z-20` or higher**. Outro mirrors at page-bottom-center, smaller.

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
    transition={{ type: "spring", duration: 2.4, bounce: 0 }}
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
    <Area type="natural" dataKey="revenue" stroke="var(--chart-1)" fill="url(#fillRevenue)"
      strokeWidth={2} isAnimationActive={false}
      dot={(props) => { /* last-index only: halo r=10 primary 0.18 + dot r=5 primary */ }}
      activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
       />
    <Tooltip cursor={{ stroke: "var(--primary)", strokeDasharray: "2 4", strokeOpacity: 0.5 }}
      content={<ChartTooltipCard />} wrapperStyle={{ outline: "none" }} />
  </AreaChart>
</ResponsiveContainer>
```

Rules: `isAnimationActive={false}` always. `--chart-1` latest period only, prior step to `--chart-3`–`--chart-5`. Grid `var(--border-strong)` horizontal only. Axis `var(--foreground-2)`, no tickLine/axisLine. Area gradient `stopOpacity={0.35}` → `{0}`. Last-point: `dot` fn returns halo `r=10 fill=primary fillOpacity=0.18` + dot `r=5` on last index only. Three treatments: (1) Bar + `<LabelList position="top">`; (2) Area + gradient + last-point; (3) Sparkline `h-12` no axes.

**Recharts defaults render solid `#000` — every Bar, Tooltip, and BarChart cursor must be explicitly token-styled.**
- **`<Bar fill>`**: required. `fill="var(--chart-N)"` for single-color series, `<Cell>` children for per-point. Never recharts default, never Tailwind, never hex. Latest = `--chart-1`; prior step to `--chart-3`–`--chart-5`.
- **`<Tooltip contentStyle>`**: required. `{{ background: "var(--surface-l2)", border: "1px solid var(--border-strong)", color: "var(--foreground)" }}` for inline; or `content={<ChartTooltipCard />}` for custom (festive-royal always uses ChartTooltipCard — gold border).
- **BarChart `<Tooltip cursor>`**: required. `cursor={{ fill: 'var(--chart-hover)' }}` or `cursor={false}`. Never default.

### Inline-injected

**SealStamp** — SVG solid-fill square or circle (28-40px). No border ring. `fill="var(--primary)"`. Centered serif numeral 700 weight in `var(--background)` color (reverse). Optional bilingual ceremonial label below (e.g. `第一章 · CHAPTER ONE`) `--foreground` serif `font-medium`. One per chapter opener. Hero section never receives a SealStamp (Hero ≠ chapter).

```tsx
function SealStamp({ n, label }: { n: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
        <rect width="36" height="36" rx="2" fill="var(--primary)" />
        <text x="18" y="25" textAnchor="middle"
          fontFamily="'Cormorant Garamond', 'Noto Serif SC', serif"
          fontWeight="700" fontSize="18" fill="var(--background)">{n}</text>
      </svg>
      {label && <span style={{ fontSize: 11, fontWeight: 500, color: "var(--foreground)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.14em" }}>{label}</span>}
    </div>
  );
}
```

**GoldenHairline** — Full-width 1px rule, gold primary 0.4 alpha (replaces HairlineRule): `<hr style={{ border: "none", borderTop: "1px solid oklch(var(--primary) / 0.4)", margin: 0 }} aria-hidden />`.

**Inline DeltaIndicator** — No pill, no border, no background. Serif 700 weight character + value. Up: `▲` `--primary`; down: `▼` `--foreground-2`.

```tsx
function DeltaIndicator({ direction, value }: { direction: "up" | "down"; value: string }) {
  const isUp = direction === "up";
  return (
    <span className="inline-flex items-baseline gap-1 whitespace-nowrap">
      <span style={{ fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: isUp ? "var(--primary)" : "var(--foreground-2)" }}>{isUp ? "▲" : "▼"} {value}</span>
    </span>
  );
}
```

**ChartTooltipCard** — Custom chart tooltip with gold border on muted crimson background.

```tsx
function ChartTooltipCard({ active, payload, label, periodSuffix = "", unitSuffix = "" }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--surface-l2)", border: "1px solid oklch(var(--primary) / 0.4)",
      borderRadius: 2, padding: "12px 16px", minWidth: 140,
    }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: "0.14em", color: "var(--foreground-3)", marginBottom: 8 }}>{label} {periodSuffix}</div>
      {payload.map((entry: any, i: number) => (
        <div key={entry.dataKey ?? i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ display: "block", width: 8, height: 8, background: "var(--primary)", borderRadius: 0 }} aria-hidden />
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", fontFamily: "'Cormorant Garamond', serif" }}>{entry.value}</span>
          <span style={{ fontSize: 12, color: "var(--foreground-3)" }}>{unitSuffix}</span>
        </div>
      ))}
    </div>
  );
}
```

**Tags** — `SharpTag` style: `inline-flex items-center px-2 py-0.5` sharp 2px corner radius, `1px solid var(--border-strong)`, serif `font-medium`, no pill, no rounded-full.

**Festive-Royal discipline** — Chromatic crimson ground. Gold hairline-only depth: no `box-shadow`, no `backdrop-blur`, no noise overlay, no SpotlightGradient, no OutroSignature, no double-bezel. Serif stack (Cormorant Garamond / Noto Serif SC) throughout. No ALL-CAPS (Royal = sentence case + tracking). Hero = GrainGradient + gold radial wash. Chapter opener = SealStamp + GoldenHairline every non-Hero chapter. Tooltip always `<ChartTooltipCard />` (gold border) — never plain `contentStyle`.

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
| Quote | `<figure>` + CJK bracket `「 」` lead-in / lead-out |
| Outro | `motion.div` + closing solid-fill `SealStamp` (square) + `GoldenHairline` |
| Loading | Shadcn `Skeleton` |
| Divider | Shadcn `Separator` |
| Tag | `SharpTag` (sharp 2px corner, serif — no pill, no rounded-full) |

## 18. Component Constraints

Use top-level hooks, typed props, `motion/react`, `motion-plus/react`, numeric easing arrays, `aria-hidden` for decorative visuals, semantic labels for readable values, `isAnimationActive={false}` on Recharts, and reduced-motion fallbacks for AnimateNumber, WebGL, and off-screen continuous motion.
