# CCGrupo Site Master Guide

This document consolidates the working instructions for the CCGrupo website from:

- `CLAUDE.md`
- `DOCS.md`
- `README.md`
- `public/clients/README.md`

It is the single reference for how the site is structured, styled, built, and maintained.

---

## 1. What This Site Is

- Corporate website for Contact Center Grupo S.A.S. (CCGrupo), a BPO company based in Bogota, Colombia.
- Built as a React 19 single-page app with state-based navigation, not React Router.
- Supports Spanish and English content through a central i18n layer.
- Supports dark mode and light mode through a `light` class on `html`.
- Uses Vite 6, TypeScript, Tailwind CSS v4, Motion, GSAP, Three.js, and Lenis.

Primary user-facing areas:

- Homepage sections
- Service detail views
- Contact form
- Privacy policies PDF viewer

---

## 2. Quick Start

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Dev server runs on:

- `http://localhost:3000`

### Production build

```bash
npm run build
```

Build output:

- `dist/`
- SSR bundle in `dist/server/`
- prerender step via `scripts/prerender.ts`

### Preview build

```bash
npm run preview
```

### Lint and type-check

```bash
npm run lint
```

### Tests

```bash
npm run test
```

### Clean build artifacts

```bash
npm run clean
```

### SSR commands

```bash
npm run dev:ssr
npm run start:ssr
npm run prerender
```

### Make targets

The repo also documents these Make targets:

- `make dev`
- `make build`
- `make preview`
- `make lint`
- `make test`
- `make clean`

---

## 3. Environment Variables

Copy `.env.example` to `.env.local`.

### Contact form

```bash
VITE_EMAILJS_SERVICE_ID="service_xxxxxxx"
VITE_EMAILJS_TEMPLATE_ID="template_xxxxxxx"
VITE_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxxxxxxxx"
```

### Optional utilities

```bash
VITE_WHATSAPP_NUMBER=""
VITE_GA_ID=""
GEMINI_API_KEY="MY_GEMINI_API_KEY"
APP_URL="MY_APP_URL"
```

Notes:

- EmailJS powers the contact form when configured.
- WhatsApp button is optional.
- Google Analytics is optional.
- Gemini key is a legacy / AI feature hook.

---

## 4. Architecture

### App model

- The site is a SPA.
- Navigation is state-based in `src/App.tsx`.
- There is no React Router.

`currentView` controls what is rendered:

| currentView | View |
|---|---|
| `home` | Full homepage sections |
| `01` | Service detail page for CX |
| `02` | Service detail page for Leads & Sales |
| `03` | Service detail page for Autonomous Agents |
| `04` | Service detail page for Digital Studio |
| `contact` | Contact module |
| `privacy` | Privacy module |
| any other value | Not found module |

### State flow

- `handleNavigate(view)` updates the current view and pushes a new URL.
- `handleBackToHome()` restores the homepage and scrolls to services.
- `getViewFromPath()` resolves the current view from the URL.
- `getPathForView()` keeps the URL aligned with the active view.

### SSR

- The project includes an SSR entry and server renderer.
- `server.js` serves the app in development or production SSR mode.
- The build runs a client build, SSR bundle build, and prerender pass.

---

## 5. Project Structure

```text
src/
  components/
    layout/    Navbar, Footer
    sections/  Hero, Marquee, About, Services, Reasons, Sectors, Clients, CTA
    modules/   ServiceModule, ContactModule, PrivacyModule, NotFoundModule
    ui/        Reusable primitives and animated building blocks
  config/      Branding and asset references
  data/        Services content and data access
  hooks/       Custom hooks such as theme handling
  i18n/        Translations and language context
  lib/        Shared utilities
  types/      Shared TypeScript interfaces
  App.tsx      Main state-based orchestrator
  main.tsx     Client entry point
  entry-server.tsx SSR entry point
  index.css    Theme tokens, global styles, light mode overrides
```

Key asset folders:

- `public/fonts/`
- `public/images/services/`
- `public/policies/`
- `public/clients/`

---

## 6. Data Rules

### Single source of truth

All service content must live in:

- `src/data/services.ts`

Do not hardcode service content in:

- `Services.tsx`
- `ServiceModule.tsx`
- other components

### Data flow

- `services.ts` exports the canonical data.
- `src/data/index.ts` acts as the barrel export.
- UI components consume the data and translations as fallbacks.

### Service data shape

Each service generally includes:

- `id`
- `title`
- `subtitle`
- `desc`
- `tags`
- `link`
- `icon`
- `gradient`
- `details`
- optional `subProducts`

### Adding a new service

1. Add the service in `src/data/services.ts`.
2. Add translations in `src/i18n/index.tsx`.
3. Add any related assets in `public/images/services/`.
4. Update sitemap and SEO metadata if the service gets a public URL.

---

## 7. i18n Rules

### Supported languages

- `es`
- `en`
- `pt`

### Language source

- Language comes from URL prefix when available.
- Otherwise it falls back to `localStorage.lang`.

### Usage

```tsx
import { useLang } from '../../i18n';

const { t, lang, toggleLang, setLanguage } = useLang();
```

### Translation buckets

- `nav`
- `hero`
- `about`
- `marquee`
- `services`
- `reasons`
- `clients`
- `cta`
- `footer`
- `contact`
- `privacy`
- `serviceModule`
- `serviceDetails`

### Rules

- Always add user-facing copy to the translation objects.
- Do not leave visible strings hardcoded unless they are truly structural.

---

## 8. Theme System

### Behavior

- Default theme is dark.
- Light mode is controlled by a `light` class on `html`.
- Theme choice is persisted in `localStorage.theme`.

### Hook

Use:

```tsx
import { useTheme } from '../../hooks/useTheme';
```

The hook:

- reads the initial theme
- updates `html.light`
- syncs `color-scheme`
- updates the `theme-color` meta tag

### Theme bootstrap

- The HTML entry should set the theme class before React hydrates.
- This avoids a flash of the wrong theme on first paint.

### Light mode design rules

- Keep text readable on white or near-white surfaces.
- Do not rely only on exact `text-white` overrides.
- Light mode must cover opacity variants like `text-white/90`, `text-white/70`, etc.
- Large translucent dark surfaces should become lighter cards with real separation.

---

## 9. Design System

### Color tokens

Defined in `src/index.css` via `@theme` and CSS variables.

Primary tokens:

- `navy-deep`
- `navy`
- `navy-mid`
- `navy-light`
- `teal`
- `teal-bright`
- `teal-dark`

### Typography

Local fonts are loaded from `public/fonts/` through `@font-face` in `src/index.css`.

Current families:

- `Share`
- `Share Tech`
- `Fira Sans`

### Utilities

Custom utilities include:

- `.text-gradient`
- `.text-stroke`
- `.text-stroke-teal`

### Global style rules

- `body` uses the site background and foreground tokens.
- Headings and paragraphs use the shared fluid scale.
- Inputs and textareas should stay at 16px or larger on mobile.

### Light mode overrides

The light theme should adjust:

- text colors
- background opacities
- borders
- shadows
- navigation surfaces
- card surfaces
- modal backdrops
- focus rings

---

## 10. Component Map

### Layout

- `Navbar`
- `Footer`

### Homepage sections

- `Hero`
- `Marquee`
- `About`
- `Services`
- `Reasons`
- `Sectors`
- `Clients`
- `CTA`

### Full-page modules

- `ServiceModule`
- `ContactModule`
- `PrivacyModule`
- `NotFoundModule`

### UI primitives

- `Preloader`
- `PageLoader`
- `CookieBanner`
- `CustomCursor`
- `BackgroundEffects`
- `ScrollTracker`
- `FloatingCTA`
- `CornerLabels`
- `ThemedLogo`
- `SplitText`
- `ScrambledText`
- `CircularText`
- `LiquidEther`
- `ScrollStack`
- `TiltCard`
- `hexagon-background`

---

## 11. Animation Stack

### Motion

- Imported from `motion/react`
- Used for page transitions, entrance animation, modal animation, scroll-based effects

### GSAP

- Used in `SplitText.tsx`

### Three.js

- Used in `LiquidEther.tsx`
- Always lazy load it

### Lenis

- Used in `ScrollStack.tsx`
- Not a global smooth-scroll engine for the whole app

### Practical rule

- Keep expensive effects lazy loaded when possible.
- Do not move heavy WebGL or scroll engines into the main render path.

---

## 12. SEO / AEO / GEO

### index.html responsibilities

- title
- meta description
- keywords
- canonical URL
- Open Graph tags
- Twitter tags
- geo tags
- hreflang links
- JSON-LD schemas

### Schema coverage

- `Organization`
- `LocalBusiness`
- `WebSite`
- `FAQPage`
- `BreadcrumbList` on service pages

### Crawl files

- `public/robots.txt`
- `public/sitemap.xml`
- `public/llms.txt`

### Maintenance rule

- Update sitemap and metadata when adding or renaming public pages.

---

## 13. Build and Performance

### Vite chunks

The build splits vendors by area:

- React / React DOM
- Motion
- GSAP
- Three.js
- Lucide
- Lenis

### Performance rules

- Keep `LiquidEther` lazy.
- Keep large SVG / image assets optimized.
- Prefer reusable primitives over duplicate UI.
- Avoid moving browser-only code into SSR render paths.

### Build checks before merge

```bash
npm run lint
npm run build
```

---

## 14. Assets

### Fonts

- Local fonts live in `public/fonts/`
- Do not assume external font loading unless explicitly added

### Service images

- Store in `public/images/services/`

### Policy PDFs

- Store in `public/policies/`

### Client logos

Client logos live in `public/clients/`.

Rules:

- Preferred format: SVG
- Transparent background
- Light or white logo colors for dark backgrounds
- Recommended size: 160 x 60
- Fallback names must match the expected slug

Current naming convention examples:

- `salud-total.svg`
- `compensar.svg`
- `colsubsidio.svg`
- `famisanar.svg`
- `sanitas.svg`
- `keralty.svg`
- `cafam.svg`
- `sura.svg`
- `comfenalco.svg`
- `medimas.svg`

If a logo is missing:

- the carousel should fall back to the company name

---

## 15. Theme and UI Quality Rules

When editing UI:

- Preserve the premium editorial feel.
- Avoid generic corporate gradients and default layout templates.
- Prefer purposeful type, spacing, and contrast.
- Keep dark and light mode equally intentional.
- Check mobile and desktop separately.
- Keep accessibility visible, not an afterthought.

### Light mode audit checklist

- Text contrast on white cards
- Border contrast on pale surfaces
- Modal backdrop clarity
- Navbar readability
- Logo visibility
- Focus ring visibility
- First paint theme consistency

---

## 16. Contribution Rules

### General code rules

- One component per file.
- Use PascalCase for component names.
- Use `use*` prefixes for hooks.
- Keep content in data or i18n, not inline in components.
- Use the `@` alias only when it makes the import clearer; relative imports are fine inside `src/`.

### Editing rules

- Run `npm run lint` and `npm run build` after substantial changes.
- Do not remove unrelated user changes.
- Do not revert other work unless explicitly asked.

### Adding copy

1. Add the text in the translation file.
2. Consume it through `useLang()`.
3. Verify both `es` and `en`.

### Adding a section

1. Create the component in `src/components/sections/`.
2. Import it in `src/App.tsx`.
3. Add translation keys if the content is localized.

### Adding or changing services

1. Update `src/data/services.ts`.
2. Update `src/i18n/index.tsx`.
3. Verify `ServiceModule` and `Services` still consume the same data shape.

---

## 17. Testing and Validation

Recommended workflow:

1. `npm run lint`
2. `npm run build`
3. Open the app in dark mode and light mode
4. Check mobile at narrow width
5. Verify the contact form
6. Verify service navigation
7. Verify PDF modal behavior

### What to watch for

- hydration warnings
- invalid HTML nesting
- theme flash on refresh
- unreadable light mode text
- broken asset paths
- missing translations
- SSR-only browser API usage

---

## 18. Current Project References

- Main app shell: `src/App.tsx`
- Client entry: `src/main.tsx`
- SSR entry: `src/entry-server.tsx`
- Server renderer: `server.js`
- Theme tokens: `src/index.css`
- Theme hook: `src/hooks/useTheme.ts`
- Language context: `src/i18n/index.tsx`
- Service data: `src/data/services.ts`
- Branding: `src/config/branding.ts`

---

## 19. If You Need One Rule To Remember

Keep the content centralized, keep the theme consistent, and make sure both dark and light modes are readable before shipping.

