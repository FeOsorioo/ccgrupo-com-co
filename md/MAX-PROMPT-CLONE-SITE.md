# MAX PROMPT - Clone CCGrupo Site Into Another Folder

You are a senior full-stack engineer and frontend reproducer. Your task is to clone the existing CCGrupo website into a separate folder inside the same workspace, preserving the current design, behavior, architecture, and content model as closely as possible.

## Goal

Create a second, independent copy of the CCGrupo site in a new directory, using the existing project as the source of truth.

### Target

- Source project: current `ccg-site` repository
- Destination: a new sibling folder, for example `<TARGET_FOLDER>`
- Result: a fully working clone of the same site, not a redesign, not a refactor, not a partial copy

If the destination folder already exists, work inside it without overwriting unrelated files unless explicitly required for the clone.

---

## Non-Negotiable Requirements

1. Reproduce the same site, not a simplified version.
2. Preserve the same stack and implementation style.
3. Preserve the same sections, views, animations, SEO, theme behavior, i18n, and asset structure.
4. Do not change the user-facing information unless it is required for path or folder independence.
5. Do not introduce a different UI system or routing system.
6. Do not replace the current visual language with a generic template.
7. Do not create a new product identity. This is the same CCGrupo site.

---

## Canonical Instructions to Follow

Read and apply the instructions from these files in the source project:

- `SITE-GUIDE.md`
- `CLAUDE.md`
- `DOCS.md`
- `README.md`
- `public/clients/README.md`

If any instruction conflicts, use this priority:

1. Current code behavior
2. `SITE-GUIDE.md`
3. `CLAUDE.md`
4. `DOCS.md`
5. `README.md`
6. `public/clients/README.md`

If the code and docs differ, prefer the code unless the prompt explicitly asks to modernize the clone.

---

## What Must Be Cloned

Clone the entire application surface:

- Homepage sections
- Service detail modules
- Contact form
- Privacy policies view
- Not found view
- Navigation shell
- Theme toggle
- Language toggle
- Preloader and loaders
- Custom cursor
- Background effects
- SEO metadata
- Client logos behavior
- Asset handling
- SSR and prerender flow

The clone must behave like the original site in both dark mode and light mode.

---

## Required Stack

Use the same stack as the source project:

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- Motion
- GSAP
- Three.js
- Lenis
- Lucide React

Do not swap the stack.

---

## Architecture Rules

### Routing

- Keep the same state-based navigation approach.
- Do not add React Router.
- Preserve the same `currentView` behavior and URL mapping.

### Rendering

- Keep the same home view, service view, contact view, privacy view, and not found view structure.
- Preserve the lazy loading strategy for heavy modules.
- Preserve SSR support and prerendering.

### Data

- Keep service content centralized.
- Keep translations centralized.
- Do not embed canonical service content directly inside presentation components.

### Theme

- Preserve the existing dark/light theme system.
- Apply the theme before hydration so there is no flash of the wrong theme.
- Keep `html.light` as the light-mode switch.

---

## Visual Requirements

The clone must preserve the existing visual identity:

- Premium editorial feel
- Dark navy + teal palette
- Strong typography hierarchy
- Animated hero
- Section-based storytelling
- Card-based service browsing
- Layered backgrounds and depth
- High-end contact and privacy screens

Do not turn the site into a generic landing page. Keep the site recognizable.

### Light Mode

Light mode must remain readable and intentional.

Keep these rules:

- Strong contrast on white surfaces
- Clear borders and shadows
- Readable text at all opacities
- Visible focus rings
- Visible logos and icons
- No washed-out panels

### Dark Mode

Keep the original dark mode composition and atmosphere:

- layered surfaces
- soft glow accents
- subtle transparency
- strong motion accents

---

## Content Rules

### Services

The clone must preserve:

- the service list
- the service detail pages
- the service tags
- the service icons
- the service gradients
- the service-specific content blocks

### i18n

Preserve:

- Spanish
- English
- Portuguese where currently present

Language switching must still work with the same path-based and localStorage-based behavior.

### Contact

Preserve:

- form fields
- validation
- submission flow
- fallback mailto behavior
- success and error states

### Privacy

Preserve:

- policy list
- modal PDF viewer
- fallback behavior for browsers that cannot embed PDF

### Client Logos

Preserve the auto-loading logo behavior and fallback naming convention.

---

## Asset Rules

Copy or reproduce all required assets:

- fonts
- service images
- policy PDFs
- client logos
- favicon and manifest assets

Do not break asset paths.

If the clone lives in a different folder structure, update only path references that depend on the new location. Keep the actual asset set the same.

---

## File-Level Expectations

The clone should include, at minimum, the same kinds of files and modules:

- `src/App.tsx`
- `src/main.tsx`
- `src/entry-server.tsx`
- `src/index.css`
- `src/hooks/useTheme.ts`
- `src/i18n/index.tsx`
- `src/data/services.ts`
- `src/config/branding.ts`
- `src/components/layout/*`
- `src/components/sections/*`
- `src/components/modules/*`
- `src/components/ui/*`
- `server.js`
- `vite.config.ts`
- `index.html`
- `public/`
- `README.md`
- `CLAUDE.md`
- `DOCS.md`

You may reorganize only if necessary for the clone to function in the new folder. Prefer preserving the original structure.

---

## Exact Implementation Expectations

### App shell

- Same navigation shell.
- Same main sections order.
- Same state transitions.
- Same scroll reset behavior on navigation.

### Service pages

- Same service detail layout.
- Same fallback/metadata behavior.
- Same lazy-loaded modules.

### Motion and effects

- Keep the same animated entry patterns.
- Keep the same heavy effects lazy loaded.
- Keep the same scroll-based interactions.

### SSR and hydration

- The clone must not introduce hydration mismatches.
- The clone must not render browser-only state differently on server and client.
- Theme and language should stay stable across hydration.

---

## Quality Bar

The clone is done only when:

1. The app builds successfully.
2. The SSR build succeeds.
3. The prerender step succeeds.
4. The cloned site opens and matches the source behavior.
5. Dark mode and light mode both look correct.
6. Mobile and desktop layouts both hold.
7. Navigation, contact, privacy, and service pages work.
8. No new console errors are introduced.

---

## Workflow

### Step 1

Inspect the source project and identify the files that define:

- architecture
- theme
- i18n
- services data
- layout
- sections
- modules
- SEO
- assets

### Step 2

Create the clone in the target folder.

### Step 3

Make sure the clone remains self-contained and runnable from its own folder.

### Step 4

Verify the clone with build/lint/SSR checks.

### Step 5

Fix any missing paths, asset references, theme bootstrap issues, or hydration problems.

---

## Output Format

When you finish, report:

- target folder created
- files copied or recreated
- any adjustments made for folder independence
- verification steps run
- remaining issues, if any

If you had to change anything from the source site, explain why and keep it minimal.

---

## Safety Rules

- Do not delete or modify the source project unless explicitly instructed.
- Do not replace unrelated user changes.
- Do not simplify the site to save time.
- Do not substitute placeholder content unless the source already uses it.
- Do not create a second brand or a reimagined redesign.

---

## Final Instruction

Recreate the CCGrupo site in the new folder as faithfully as possible, with the same architecture, content model, style, and behavior, and keep the clone production-ready.

