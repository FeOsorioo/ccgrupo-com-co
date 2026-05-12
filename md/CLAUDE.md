# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies (required after cloning)
npm run dev        # Start dev server at http://localhost:3000
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
npm run lint       # Type-check with tsc --noEmit
npm run clean      # Remove dist/
```

## Architecture

Single-page React 19 app for **CCGrupo** (Contact Center Grupo), a Colombian BPO company. Built with Vite 6, TypeScript, and Tailwind CSS v4.

### View routing

There is no router. Navigation is state-based in `src/App.tsx`:
- `currentView === 'home'` → renders the full homepage (sections stacked vertically)
- `currentView === '<serviceId>'` → renders `ServiceModule` for that service (`'01'`, `'02'`, `'03'`)

`Services` calls `onNavigate(id)` to switch views. `ServiceModule` calls `onBack()` to return home.

### Data layer

Service content lives in **one place only**: `src/data/services.ts`. Both `Services.tsx` (cards) and `ServiceModule.tsx` (detail page) import from there. Never add service data directly inside components.

```
src/
  data/
    services.ts      ← single source of truth for all service content
    index.ts         ← barrel export
  types/
    index.ts         ← shared TypeScript interfaces (ServiceData, NavLink, etc.)
```

### Component organization

```
src/components/
  layout/    ← Navbar, Footer (persistent shell)
  sections/  ← Homepage sections: Hero, Marquee, About, Services, Reasons, Clients, CTA
  modules/   ← Full-page views: ServiceModule (service detail page)
  ui/        ← Reusable primitives and animation components
```

### Styling

Tailwind CSS v4 configured via `@tailwindcss/vite` plugin (no `tailwind.config.js`). All theme tokens (colors, fonts) are defined in `src/index.css` under `@theme`. Key design tokens:
- Colors: `navy-deep` (#060d1f), `navy` (#0b1628), `teal` (#00b4d8), `teal-bright` (#00e5ff)
- Fonts: `font-display` (Playfair Display), `font-body` (Outfit), `font-mono` (JetBrains Mono) — loaded from Google Fonts in `index.html`
- Custom utilities: `.text-gradient`, `.text-stroke`, `.text-stroke-teal`

### Animation stack

- **Motion (Framer Motion)** — imported as `motion/react`, used for most UI animations
- **GSAP + SplitText** — used in `SplitText.tsx` for scroll-triggered character/word animations
- **Three.js** — used in `LiquidEther.tsx` for WebGL fluid shader backgrounds
- **Lenis** — smooth scroll inside `ScrollStack.tsx`

### Path alias

`@` resolves to the project root (not `src/`). So `@/src/components/...` or just use relative imports.

### Environment

Copy `.env.example` to `.env.local` for local development. `GEMINI_API_KEY` is available in components via `process.env.GEMINI_API_KEY` (injected by Vite).
