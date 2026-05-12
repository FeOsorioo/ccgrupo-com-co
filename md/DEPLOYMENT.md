# CCGrupo — Guía de Despliegue

> **Contact Center Grupo S.A.S.** · BPO de nueva generación · Bogotá, Colombia
> Sitio corporativo: [ccgrupo.com.co](https://ccgrupo.com.co)

---

## 1. Build de Producción

```bash
npm run build
```

Este comando ejecuta tres pasos en secuencia:

| Paso | Comando | Output |
|---|---|---|
| 1. Client build | `vite build` | `dist/` (HTML, CSS, JS, assets) |
| 2. SSR build | `vite build --ssr src/entry-server.tsx --outDir dist/server` | `dist/server/entry-server.js` |
| 3. Prerender | `tsx scripts/prerender.ts` | `dist/**/index.html` por cada ruta |

### Pipeline explicado

1. **Client build** — Vite compila la SPA React con code splitting y minificación. Genera `dist/index.html` como entry point del lado del cliente.
2. **SSR build** — Compila `src/entry-server.tsx` en un bundle de servidor Node.js. `server.js` lo usa para renderizar React en el servidor.
3. **Prerender** — `scripts/prerender.ts` lee las traducciones (`es`, `en`, `pt`) y los datos de servicios, y genera archivos `index.html` estáticos para cada ruta:
   - Home: `/`, `/en/`, `/pt/`
   - Servicios: `/servicio/01`, `/servicio/02`, `/servicio/03`, `/servicio/04`, `/servicio/05` (+ versiones `/en/`)
   - Contacto: `/contacto`, `/en/contacto`, `/pt/contacto`
   - Privacidad: `/politicas-privacidad`, `/en/privacy-policies`, `/pt/politicas-privacidad`

### Output final

```
dist/
├── index.html              ← Home ES (prerendered)
├── en/index.html           ← Home EN
├── pt/index.html           ← Home PT
├── servicio/01/index.html  ← Página de servicio prerendered
├── contacto/index.html     ← Contacto prerendered
├── assets/                 ← Chunks JS/CSS con hash
├── server/
│   └── entry-server.js     ← Bundle SSR
└── vite.svg
```

---

## 2. Variables de Entorno Requeridas

Copiar `.env.example` a `.env.local` y completar los valores:

```bash
cp .env.example .env.local
```

| Variable | Requerida | Propósito |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | Sí (producción) | Service ID de EmailJS para el formulario de contacto |
| `VITE_EMAILJS_TEMPLATE_ID` | Sí (producción) | Template ID de EmailJS |
| `VITE_EMAILJS_PUBLIC_KEY` | Sí (producción) | Public Key de EmailJS |
| `VITE_WHATSAPP_NUMBER` | No | Número en formato internacional (ej. `573001234567`). Vacío = botón oculto |
| `VITE_GA_ID` | No | Measurement ID de Google Analytics 4 (ej. `G-XXXXXXXXXX`) |
| `GEMINI_API_KEY` | No | API key de Gemini AI (feature en desarrollo) |
| `APP_URL` | No | URL base de la aplicación |

> **Importante:** En producción con Vercel, las variables se configuran desde el dashboard del proyecto (Settings → Environment Variables). Las variables con prefijo `VITE_` se exponen en el bundle del cliente — **no** poner secrets aquí.

---

## 3. Despliegue en Vercel (recomendado)

### Conectar el repositorio

1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar `Coorops25/CCG-Site` desde GitHub
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Configurar environment variables (ver sección 2)
7. Deploy

### Configuración `vercel.json`

El archivo `vercel.json` ya está configurado en la raíz del proyecto:

#### Rewrites para SPA

```json
{
  "rewrites": [
    { "source": "/((?!_next|favicon|og-image|site.webmanifest|robots.txt|sitemap.xml|llms.txt|clients|policies|images|fonts|en|pt|servicio|contacto|politicas-privacidad|privacy-policies|contact|privacy).*)", "destination": "/" }
  ]
}
```

Este rewrite captura todas las rutas que **no** coinciden con archivos estáticos conocidos y las redirige a `/`. Como el prerender ya genera `index.html` para cada ruta, las páginas prerendered se sirven directamente sin pasar por el rewrite.

#### Security Headers

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options",      "value": "nosniff" },
        { "key": "X-Frame-Options",            "value": "SAMEORIGIN" },
        { "key": "X-XSS-Protection",           "value": "1; mode=block" },
        { "key": "Referrer-Policy",            "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy",         "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security",  "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

#### Cache Headers

| Recurso | Cache-Control |
|---|---|
| `/assets/*` | `public, max-age=31536000, immutable` (1 año) |
| `/clients/*` | `public, max-age=31536000, immutable` (1 año) |
| `/fonts/*` | `public, max-age=31536000, immutable` (1 año) |
| `/policies/*` | `public, max-age=86400` (1 día) |
| `favicon.svg`, `og-image.png`, `site.webmanifest` | `public, max-age=86400` (1 día) |

### PDF headers

```json
{
  "source": "/policies/(.*)",
  "headers": [
    { "key": "Content-Type",        "value": "application/pdf" },
    { "key": "Content-Disposition", "value": "inline" },
    { "key": "X-Frame-Options",     "value": "SAMEORIGIN" },
    { "key": "Cache-Control",       "value": "public, max-age=86400" }
  ]
}
```

---

## 4. Despliegue en Hosting Estático

El prerender genera HTML estático para todas las rutas, por lo que el sitio funciona **sin servidor Node.js** en cualquier hosting estático:

```bash
npm run build
```

Esto produce la carpeta `dist/` con la siguiente estructura de rutas:

```
dist/
  index.html          → ccgrupo.com.co/
  en/index.html       → ccgrupo.com.co/en/
  pt/index.html       → ccgrupo.com.co/pt/
  servicio/01/index.html
  servicio/02/index.html
  servicio/03/index.html
  servicio/04/index.html
  servicio/05/index.html
  en/servicio/01/index.html
  en/servicio/02/index.html
  en/servicio/03/index.html
  en/servicio/04/index.html
  en/servicio/05/index.html
  contacto/index.html
  en/contacto/index.html
  pt/contacto/index.html
  politicas-privacidad/index.html
  en/privacy-policies/index.html
  pt/politicas-privacidad/index.html
  assets/             ← Chunks con hash
```

### Opciones de hosting

| Plataforma | Instrucciones |
|---|---|
| **Netlify** | Conectar repo, build command: `npm run build`, publish directory: `dist`. Netlify detecta automáticamente el SPA |
| **Cloudflare Pages** | Conectar repo, build command: `npm run build`, build output: `dist` |
| **GitHub Pages** | Usar GitHub Actions: hacer build y deploy de `dist/` a `gh-pages`. **Nota:** requiere configurar base path si no se despliega en dominio root |
| **Cualquier hosting estático** | Subir el contenido de `dist/` directamente |

> **Nota sobre SPA fallback:** En hosting estático, el rewrite a `/` para páginas no prerendered (como fragmentos o búsqueda) sigue siendo necesario. Netlify lo hace con un archivo `_redirects` (`/* /index.html 200`). Cloudflare Pages también requiere una regla SPA similar.

---

## 5. SSR (Servidor Node.js)

El proyecto incluye un servidor Express para renderizado del lado del servidor con streaming.

### Iniciar en producción

```bash
npm run build
npm run start:ssr
```

Esto ejecuta `node server.js` que:

1. Sirve archivos estáticos desde `dist/` con `express.static`
2. Captura todas las rutas `GET *`
3. Renderiza la aplicación React usando `renderToPipeableStream` de `react-dom/server`
4. Inyecta el HTML renderizado en `dist/index.html`
5. Responde con HTML completo

### Puerto

Por defecto el servidor corre en `http://localhost:3000`. Se puede configurar con la variable de entorno `PORT`:

```bash
PORT=8080 npm run start:ssr
```

### Dev SSR

```bash
npm run dev:ssr
```

Activa `VITE_SSR_DEV=true` y usa Vite middleware para HMR con SSR en desarrollo.

### server.js — comportamiento

```
┌──────────────────────────────────────────────┐
│  server.js                                    │
│                                               │
│  ¿dist/server/entry-server.js existe?         │
│     ├── Sí   → modo producción (isProd=true)  │
│     └── No   → modo desarrollo (Vite SSR)     │
│                                               │
│  Express app:                                 │
│    ├── Dev  → Vite middleware (HMR)           │
│    ├── Prod → express.static('dist')          │
│    └── GET * → renderToString → HTML          │
│                                               │
│  Puerto: process.env.PORT || 3000             │
└──────────────────────────────────────────────┘
```

### Consideraciones para SSR

- `renderToPipeableStream` tiene un timeout de 15 segundos. Si el render excede ese tiempo, el servidor responde con error.
- No usar APIs del navegador (`window`, `document`, `localStorage`) en código que se ejecuta en SSR. El proyecto ya maneja esto con guardas (`typeof window !== 'undefined'`).
- Three.js y otros módulos pesados se cargan con `React.lazy()` para evitar que se ejecuten en SSR.

---

## 6. Optimizaciones de Build

### Code Splitting (`vite.config.ts`)

Los `manualChunks` separan las librerías grandes en bundles independientes:

| Chunk | Librerías | Tamaño estimado |
|---|---|---|
| `vendor-three` | Three.js | ~600 KB |
| `vendor-gsap` | GSAP + @gsap/react | ~150 KB |
| `vendor-motion` | Motion (Framer Motion) | ~100 KB |
| `vendor-lucide` | Lucide React | ~50 KB |
| `vendor-react` | React + React-DOM | ~50 KB |
| `vendor-lenis` | Lenis | ~20 KB |

Tres.js es el chunk más grande por eso `LiquidEther` se carga con lazy loading.

### Lazy loading

```typescript
const ServiceModule = lazy(() => import('./components/modules/ServiceModule'));
const ContactModule = lazy(() => import('./components/modules/ContactModule'));
const PrivacyModule = lazy(() => import('./components/modules/PrivacyModule'));
const LiquidEther = lazy(() => import('../ui/LiquidEther'));
```

Estos módulos solo se descargan cuando el usuario navega a la vista correspondiente.

### Otras configuraciones

- **Target:** `esnext` (ES2022+) — navegadores modernos, sin transpilación innecesaria
- **Minify:** `esbuild` — más rápido que terser
- **CSS Code Split:** activado — CSS por componente donde aplica
- **Chunk Size Warning:** 1500 KB — umbral aumentado porque Three.js supera el default
- **Assets inline limit:** 4096 bytes — SVG pequeños se inlinen como data URIs

---

## 7. Pre-Despliegue Checklist

Antes de hacer deploy a producción, verificar:

```bash
# 1. TypeScript + ESLint
npm run lint

# 2. Build completo
npm run build

# 3. (Opcional) Preview local del build
npm run preview
```

### Lista de verificación manual

- [ ] `npm run lint` pasa sin errores de tipo ni advertencias de ESLint
- [ ] `npm run build` completa sin errores
- [ ] Variables de entorno configuradas en el dashboard de Vercel
- [ ] Modo oscuro: textos legibles, contrastes correctos
- [ ] Modo claro: activar desde el toggle, verificar legibilidad en fondos blancos
- [ ] Responsive: probar en 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] Navegación entre servicios funciona correctamente
- [ ] Formulario de contacto envía correctamente (EmailJS)
- [ ] PDFs de políticas se abren en el visor modal
- [ ] Carrusel de clientes se ve bien
- [ ] Animaciones de entrada no tienen glitches
- [ ] Etiquetas SEO presentes: title, meta description, canonical, hreflang
- [ ] Schema.org JSON-LD presente en el HTML
- [ ] `robots.txt`, `sitemap.xml`, `llms.txt` accesibles
- [ ] No hay warnings de hidratación en la consola del navegador
- [ ] 404 retorna contenido (el rewrite SPA lo maneja)

### Rollback

Si algo sale mal en producción:

1. **Vercel:** Ir al dashboard → Deployments → encontrar el último deploy estable → ⋮ → Promote to Production
2. **Hosting estático:** Reemplazar `dist/` con la versión anterior
3. **SSR:** `git revert` del commit problemático y redeploy

---

*Documentación de despliegue para CCGrupo · Versión 1.0 · Mayo 2026*
