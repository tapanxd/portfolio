# Tapan Panchal, portfolio

Editorial-brutalist portfolio for a Databricks-focused data engineer. Vite + React + TypeScript + Tailwind v4, with a four-theme engine.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck, bundle, write the static-host 404 fallback
npm run preview  # serve the production build
npm run lint
```

## The one file you edit

**`src/data/portfolioData.ts`** holds every string the site renders. No component
hardcodes copy, a name, a metric, or a link. Change the data, not the markup.
`src/types/portfolio.ts` is the schema it satisfies, so a typo is a type error.

### Still to fill in

Each of these is an empty string today. The UI hides the corresponding element
rather than shipping a dead link, so nothing is broken until you add them.

| Field | What it turns on |
| --- | --- |
| `engineer.resumeUrl` | The "Download CV" button in the hero |
| `engineer.portraitUrl` | Replaces the monogram plate in the About section |

Profile links show the path of their URL, so `https://github.com/tapanxd`
renders as `tapanxd`. Change the URL and the visible handle follows.

Skill items carry a `level` of `core` or `working`. That tier comes from the
confidence key in the source content (how well a claim is backed across the
resumes), not from a self-rated proficiency scale, and the section header says
so. If you would rather self-rate, change the labels in `StackSection.tsx`.

Credential cards are grouped by issuer and laid out two per row, so a group of
four fills a 2x2 block. Every credential needs a `description`, otherwise its
card sits short against the others in its row.

For the CV, put the PDF in `public/` and set `resumeUrl` to `/tapan-panchal-cv.pdf`.
Same for the portrait: `public/portrait.jpg`, then `portraitUrl: '/portrait.jpg'`.
A high-contrast image works best; the plate renders it greyscale at 4:5.

### Projects

`projects` is grouped by category and rendered as full-width register rows, so
it does not repeat the card grid used by credentials. A project can carry more
than one repository via `links`. `inProgress: true` prints an "In progress"
badge instead of implying the work is finished. The `P-01` index is derived
from position across all groups at render time, so inserting a project
anywhere renumbers the rest.

### One case study is still thin

The streaming lakehouse moved out of `caseStudies` and into `projects` as
GitHub Lakehouse, so the six remaining case studies are all professional work.
`inProgress` still exists on the CaseStudy type if a future entry needs it.

Older note, kept for reference. Expand
`detail.mechanism` with what happens at each medallion hop and what the Gold
layer serves, then delete the flag.

## Themes

Four palettes live in `src/styles/themes.css`, selected by `data-theme` on
`<html>` and persisted to `localStorage` under `tp-theme`. A blocking script in
`index.html` applies the stored choice before first paint so there is no flash.
`forest` is the default.

All four pass WCAG AA for body text, muted labels, and button fills. If you
change a colour, recheck the pair it sits on rather than only the swatch.

Two locks hold the design together:

- **Shape.** Border radius is 0 everywhere. This is a drafting-document
  aesthetic and rounded corners break it.
- **Accent.** Exactly one accent per theme (`--accent-primary`), used for links,
  active states, primary buttons and semantic status. No section adds a second.

## Structure

```
src/
  data/portfolioData.ts   all content
  types/portfolio.ts      the schema
  hooks/useTheme.ts       theme state and persistence
  lib/cn.ts               class-name join
  styles/
    themes.css            the four palettes
    index.css             Tailwind mapping, base styles, type roles
  components/
    primitives.tsx        Sheet, Container, Reveal, Tag, RuledLabel, BrandGlyph
    Navigation.tsx        sticky header, theme switcher, mobile drawer
    Hero.tsx              headline and the four-cell telemetry row
    PhilosophyPortrait.tsx
    CaseStudies.tsx       three featured cases
    StackSection.tsx
    AxiomBreak.tsx
    ExperienceTimeline.tsx
    Credentials.tsx
    ContactTerminal.tsx
    Footer.tsx
  pages/
    HomePage.tsx
    WorkPage.tsx          all seven cases, written out
```

Layout note: the whole site sits inside one bordered `Sheet`, and grids draw
their dividers with `gap-px` over a `bg-hairline` ground. That gives exact 1px
cell borders at every breakpoint without per-cell border bookkeeping.

The faint dot texture is `.field-grid`, applied to the hero, the axiom break
and the contact section so it recurs rather than sitting on one section alone.
Its fade direction is a CSS variable: add `.field-rise` to fade upward or
`.field-band` to fade at both edges. Content inside a textured section needs
`relative z-1` to paint above it.

## Deploying

Deployed to GitHub Pages from the `portfolio` repository. The site has two
routes (`/` and `/work`), so the host has to serve `index.html` for unknown
paths. All three hosts are configured, Pages is the live one:

- **Vercel**: `vercel.json` rewrites everything to `/index.html`.
- **Netlify**: `public/_redirects`.
- **GitHub Pages**: `.github/workflows/deploy.yml` builds on every push to
  `main` and deploys `dist/`. It sets `BASE_PATH=/portfolio/` because this is
  a project site served from `tapanxd.github.io/portfolio/`; `vite.config.ts`
  reads that into `base` and the router picks it up via `import.meta.env.BASE_URL`.
  Local dev and preview stay at `/`. If the site ever moves to a user site or a
  custom domain, change `BASE_PATH` in the workflow to `/` and nothing else.
  `npm run build` also copies `dist/index.html` to `dist/404.html`, which is how
  `/work` loads on a direct visit: Pages serves the 404 page, the app boots and
  routes. Note that Git Bash on Windows rewrites `/portfolio/` to a filesystem
  path; prefix local builds with `MSYS_NO_PATHCONV=1` if you need the base.

## Accessibility and motion

Every animation is wrapped in `useReducedMotion` and collapses to static under
`prefers-reduced-motion`. Scroll position is read through IntersectionObserver
and Motion's viewport hooks, never a scroll listener.
