# Clone Prompt Template

Use this template to clone the CCGrupo site into another folder while preserving architecture, content, and behavior.

## Variables

- `<SOURCE_PATH>`: current project folder
- `<TARGET_PATH>`: destination folder for the clone
- `<PROJECT_NAME>`: name of the cloned project
- `<BRAND_NAME>`: brand displayed in the site

---

## Prompt

You are a senior full-stack engineer. Clone the site in `<SOURCE_PATH>` into `<TARGET_PATH>` as a faithful duplicate.

### Goal

Recreate the existing `<BRAND_NAME>` website in `<TARGET_PATH>` with the same architecture, content model, UI language, motion behavior, SEO setup, and SSR support.

### Required Constraints

1. Preserve the same stack: React 19, TypeScript, Vite 6, Tailwind CSS v4, Motion, GSAP, Three.js, Lenis, Lucide.
2. Preserve state-based navigation. Do not add React Router.
3. Preserve the homepage sections, service modules, contact module, privacy module, and not-found behavior.
4. Preserve the i18n system and the theme system.
5. Preserve the pre-hydration theme bootstrap so light mode loads correctly on first paint.
6. Preserve centralized service data and translations.
7. Preserve SSR, prerender, build, and asset handling.
8. Preserve client-logo behavior and fallback naming conventions.
9. Preserve SEO metadata, schema, sitemap, robots, and llms files.
10. Do not redesign the site.

### Files and Areas to Mirror

Mirror the source structure as closely as possible:

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
- `public/*`

### Content Rules

- Keep service content in one source of truth.
- Keep translation strings in the language layer.
- Keep visible copy aligned with the current site.
- Keep the same assets unless a path must be adjusted for the new folder.

### Theme Rules

- Dark mode remains the default.
- Light mode must stay readable and intentional.
- Apply the theme before hydration.
- Keep `html.light` and `localStorage.theme` behavior consistent with the source.

### Verification

The clone is acceptable only if:

- lint passes
- build passes
- SSR bundle builds
- prerender succeeds
- dark mode works
- light mode works
- mobile layout works
- desktop layout works
- navigation works
- contact form works
- privacy modal works
- service pages work

### Final Report

When complete, report:

- `<TARGET_PATH>`
- summary of files created or copied
- any path adjustments
- verification results
- remaining gaps if any

### Safety

- Do not modify `<SOURCE_PATH>` except for read-only inspection.
- Do not remove unrelated user changes.
- Do not change the brand into a new identity.

