# CCGrupo — Website Corporate

Corporate website for **Contact Center Grupo S.A.S.**, a next-generation BPO company based in Bogotá, Colombia. Built as a React 19 single-page application with state-based routing, SSR support, trilingual content (ES/EN/PT), and a premium animation stack.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12), GSAP 3.14 + SplitText |
| 3D / WebGL | Three.js 0.183 (lazy-loaded liquid shader) |
| Smooth Scroll | Lenis 1.3 |
| Icons | Lucide React 0.546 |
| Testing | Vitest 4 |
| SSR | Express + React 19 server renderer |
| Linting | ESLint 10 + TypeScript 5.8 |

## Quick Start

```bash
git clone https://github.com/Coorops25/CCG-Site.git
cd CCG-Site
npm install
cp .env.example .env.local
npm run dev
# → http://localhost:3000
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with HMR on `:3000` |
| `npm run dev:ssr` | Dev server with SSR rendering |
| `npm run build` | Production build → `dist/` + SSR bundle + prerender |
| `npm run prerender` | Prerender static pages |
| `npm run preview` | Preview production build locally |
| `npm run start:ssr` | Start production SSR server |
| `npm run lint` | Type-check (`tsc --noEmit`) + ESLint |
| `npm run test` | Run test suite (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run clean` | Remove `dist/` |

## Environment Variables

Copy `.env.example` to `.env.local`.

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID for contact form | Yes |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID for contact form | Yes |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public API key | Yes |
| `VITE_WHATSAPP_NUMBER` | Floating WhatsApp button number (international format) | No |
| `VITE_GA_ID` | Google Analytics 4 Measurement ID | No |
| `GEMINI_API_KEY` | Gemini AI API key (legacy / AI feature hook) | No |
| `APP_URL` | Base application URL | No |

## Project Structure

```
ccg-site/
├── public/
│   ├── fonts/                  # Local fonts (Share, Fira Sans, Share Tech)
│   ├── images/services/        # Service hero images (SVG)
│   ├── clients/                # Client logos (SVG)
│   ├── policies/               # Labor policy PDFs
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt                # AI crawler content
│
├── src/
│   ├── components/
│   │   ├── layout/             # Navbar, Footer (persistent shell)
│   │   ├── sections/           # Hero, About, Services, Reasons, Sectors, Clients, CTA
│   │   ├── modules/            # ServiceModule, ContactModule, PrivacyModule
│   │   └── ui/                 # SplitText, CircularText, ScrambledText, LiquidEther,
│   │                           # ScrollStack, CustomCursor, Preloader, BackgroundEffects
│   ├── data/
│   │   ├── services.ts         # Single source of truth for all service content
│   │   └── index.ts            # Barrel export
│   ├── types/
│   │   └── index.ts            # Shared TypeScript interfaces
│   ├── hooks/
│   │   └── useTheme.ts         # Dark/light toggle persisted in localStorage
│   ├── i18n/
│   │   └── index.tsx           # Translations (es, en, pt) + LangProvider + useLang
│   ├── lib/
│   │   └── utils.ts            # cn() — clsx + tailwind-merge
│   ├── config/
│   │   └── branding.ts         # Branding and asset references
│   ├── App.tsx                 # State-based router orchestrator
│   ├── main.tsx                # Client entry point
│   ├── entry-server.tsx        # SSR entry point
│   └── index.css               # Tailwind v4 + @theme tokens + custom utilities
│
├── server.js                   # Express SSR server
├── vite.config.ts
├── tsconfig.json
├── CLAUDE.md                   # AI agent instructions
├── DOCS.md                     # Full technical documentation (Spanish)
└── SITE-GUIDE.md               # Master maintenance reference
```

## Architecture

### State-Based Routing (No React Router)

Navigation is managed through `currentView` state in `App.tsx`. Views include `home`, service IDs (`01`–`06`), `contact`, and `privacy`. A `handleNavigate(id)` function updates the view and pushes corresponding URL state; `handleBackToHome()` restores the homepage with scroll to services. URL prefixes (`/es/`, `/en/`, `/pt/`) determine the active language. Large modules (`ServiceModule`, `ContactModule`, `PrivacyModule`, `LiquidEther`) are lazy-loaded with `React.lazy()` + `Suspense`.

### Service Data — Single Source of Truth

All service content lives exclusively in `src/data/services.ts`. Both `Services.tsx` (homepage cards) and `ServiceModule.tsx` (detail pages) import from this single source. Never add service data directly inside components. i18n translations serve as an override layer for user-facing copy.

### i18n System

Trilingual support (Spanish, English, Portuguese) via a React Context-based provider. Translations are organized in named buckets (`nav`, `hero`, `about`, `services`, `serviceDetails`, etc.). Language is determined from URL prefix, falls back to `localStorage.lang`, and defaults to Spanish.

### Theme System

Dark mode (default) and light mode controlled by a `light` class on `<html>`. Theme preference persists in `localStorage.theme`. The `useTheme()` hook manages toggling and syncs the `color-scheme` meta tag. Theme tokens are defined in `src/index.css` via `@theme`.

### Animation Stack

| Library | Usage |
|---------|-------|
| Motion (Framer Motion) | Page transitions, entrance animations, modals, scroll-driven `useScroll`/`useTransform` |
| GSAP + SplitText | Character/word-level scroll-triggered text reveals via IntersectionObserver |
| Three.js | WebGL fluid shader background (`LiquidEther`) — always lazy-loaded |
| Lenis | Smooth-scroll card stacking in the Reasons section (`ScrollStack`) |

## Services

| ID | Service | Description |
|----|---------|-------------|
| 01 | CX – Experiencia del Cliente | Omnichannel customer experience, PQR management, help desk, post-sale support |
| 02 | Leads & Ventas | Sales process optimization, lead capture, CRM automation, WhatsApp sales |
| 03 | Agentes Autónomos | AI-powered autonomous agents (AVA suite): WhatsApp, chat, voice, leads, social |
| 04 | Digital Studio | Custom CRM, web/mobile apps, e-commerce, dashboards, AI avatars |
| 05 | Talento Humano | BPO-specialized talent recruitment, nearshore staffing, multilingual teams |
| 06 | Agencia Creativa | Brand identity, web development, Meta/Google/LinkedIn Ads, content production |

## Deployment

```bash
npm run build
# Output: dist/ (static), dist/server/ (SSR bundle)
```

The project includes a Vercel-compatible build pipeline. The `server.js` Express server can serve the production build (static or SSR). Vite `manualChunks` split vendors into separate bundles (React, Motion, GSAP, Three.js, Lucide, Lenis) for optimized loading.

## Screenshots

![Hero](docs/assets/hero.png)
![Services](docs/assets/services.png)
![Clients Carousel](docs/assets/clients.png)
![Footer](docs/assets/footer.png)

## License

Proprietary — All rights reserved. Contact Center Grupo S.A.S.
