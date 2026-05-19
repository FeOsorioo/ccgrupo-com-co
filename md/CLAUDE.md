# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install           # Install dependencies (required after cloning)
npm run dev           # Start dev server at http://localhost:3000
npm run build         # Production build → dist/ + SSR bundle + prerender
npm run preview       # Preview production build locally
npm run lint          # tsc --noEmit + ESLint
npm run clean         # Remove dist/
npm run convert:logos # Compress client logos to WebP (requires sharp)
```

## Architecture

Single-page React 19 app for **CCGrupo** (Contact Center Grupo), a Colombian BPO company. Built with Vite 6, TypeScript, and Tailwind CSS v4. Trilingual (ES/EN/PT).

### View routing

There is no router. Navigation is state-based in `src/App.tsx`:
- `currentView === 'home'` → renders the full homepage (sections stacked vertically)
- `currentView === '<serviceId>'` → renders `ServiceModule` for services `'01'`–`'06'`
- `currentView === 'contact'` → renders `ContactModule`
- `currentView === 'careers'` → renders `CareersModule`
- `currentView === 'privacy'` → renders `PrivacyModule`

`Services` calls `onNavigate(id)` to switch views. Modules call `onBack()` to return home.

### Data layer

Service content lives in **one place only**: `src/data/services.ts`. Both `Services.tsx` (cards) and `ServiceModule.tsx` (detail page) import from there. Never add service data directly inside components.

```
src/
  data/
    services.ts      ← single source of truth (6 services: '01'–'06')
    index.ts         ← barrel export
  types/
    index.ts         ← shared TypeScript interfaces (ServiceData, NavLink, etc.)
  lib/
    utils.ts         ← cn() helper
    sheetsWebhook.ts ← fire-and-forget lead POST to Google Sheets Apps Script
```

### Component organization

```
src/components/
  layout/    ← Navbar, Footer (persistent shell)
  sections/  ← Hero, Marquee, About, Services, Reasons, Clients, CTA, PostingSection, Talento
  modules/   ← ServiceModule, ContactModule, CareersModule, PrivacyModule (all lazy-loaded)
  ui/        ← SplitText, ScrambledText, CircularText, LiquidEther, ScrollStack,
               CustomCursor, Preloader, BackgroundEffects, FloatingCTA
```

### Services (6 total)

| ID | Service |
|----|---------|
| 01 | CX – Experiencia del Cliente |
| 02 | Leads & Ventas |
| 03 | Agentes Autónomos (AVA suite) |
| 04 | Digital Studio |
| 05 | Talento Humano |
| 06 | Agencia Creativa |

### Styling

Tailwind CSS v4 configured via `@tailwindcss/vite` plugin (no `tailwind.config.js`). All theme tokens (colors, fonts) are defined in `src/index.css` under `@theme`. Key design tokens:
- Colors: `navy-deep` (#060d1f), `navy` (#0b1628), `teal` (#00b4d8), `teal-bright` (#00e5ff)
- Fonts: `font-display` (Share/Playfair Display), `font-body` (Fira Sans/Outfit), `font-mono` (JetBrains Mono)
- Custom utilities: `.text-gradient`, `.text-stroke`, `.text-stroke-teal`

### Animation stack

- **Motion (Framer Motion)** — imported as `motion/react`, used for most UI animations
- **GSAP + SplitText** — used in `SplitText.tsx` for scroll-triggered character/word animations
- **Three.js + OGL** — used in `LiquidEther.tsx` for WebGL fluid shader backgrounds
- **Lenis** — smooth scroll inside `ScrollStack.tsx`

### Forms & lead capture

Contact and careers forms use two parallel channels:
1. **EmailJS** (`VITE_EMAILJS_*`) — primary email notification
2. **Google Sheets webhook** (`VITE_SHEETS_WEBHOOK_URL`) — optional, fire-and-forget via `src/lib/sheetsWebhook.ts`

Both forms use `react-phone-number-input` for the phone field (E.164 format internally).

### Path alias

`@` resolves to the project root (not `src/`). So `@/src/components/...` or use relative imports.

### Environment

Copy `.env.example` to `.env.local` for local development. Key vars: `VITE_EMAILJS_*` (required), `VITE_SHEETS_WEBHOOK_URL` (optional — leave blank to disable Sheets logging), `VITE_WHATSAPP_NUMBER`, `VITE_GA_ID`.
