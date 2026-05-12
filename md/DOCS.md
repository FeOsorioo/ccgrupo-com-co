# CCGrupo — Documentación Técnica

> **Contact Center Grupo S.A.S.** · BPO de nueva generación · Bogotá, Colombia
> Sitio corporativo: [ccgrupo.com.co](https://ccgrupo.com.co)

---

## Índice

1. [Visión general](#1-visión-general)
2. [Stack tecnológico](#2-stack-tecnológico)
3. [Inicio rápido](#3-inicio-rápido)
4. [Estructura del proyecto](#4-estructura-del-proyecto)
5. [Arquitectura y enrutamiento](#5-arquitectura-y-enrutamiento)
6. [Capa de datos](#6-capa-de-datos)
7. [Sistema de internacionalización (i18n)](#7-sistema-de-internacionalización-i18n)
8. [Sistema de temas](#8-sistema-de-temas)
9. [Tokens de diseño](#9-tokens-de-diseño)
10. [Componentes](#10-componentes)
11. [Stack de animación](#11-stack-de-animación)
12. [SEO / AEO / GEO](#12-seo--aeo--geo)
13. [Build y rendimiento](#13-build-y-rendimiento)
14. [Variables de entorno](#14-variables-de-entorno)
15. [TypeScript: interfaces](#15-typescript-interfaces)
16. [Guía de contribución](#16-guía-de-contribución)

---

## 1. Visión general

SPA (*Single-Page Application*) React 19 para **CCGrupo**, empresa colombiana de BPO que ofrece cuatro servicios: CX – Experiencia del Cliente, Leads & Ventas, Agentes Autónomos (IA) y Digital Studio.

**Características principales**

| Característica | Detalle |
|---|---|
| Sin router | Navegación por estado en `App.tsx` |
| Bilingüe | Español / Inglés con Context API |
| Tema | Oscuro (default) / Claro — persiste en `localStorage` |
| Animaciones | Motion, GSAP, Three.js, Lenis |
| SEO | Schema.org, FAQPage, hreflang, sitemap, `llms.txt` |

---

## 2. Stack tecnológico

### Núcleo
| Librería | Versión | Uso |
|---|---|---|
| React | 19.x | UI framework |
| TypeScript | ~5.8 | Tipado estático |
| Vite | 6.x | Bundler + dev server |
| Tailwind CSS | 4.x | Utilidades CSS (sin config file) |

### Animaciones
| Librería | Versión | Uso |
|---|---|---|
| Motion (Framer Motion) | 12.x | Animaciones UI generales |
| GSAP + SplitText | 3.14 | Animaciones de texto scroll-triggered |
| Three.js | 0.183 | Efecto fluid WebGL (LiquidEther) |
| Lenis | 1.3 | Smooth scroll (ScrollStack) |

### UI
| Librería | Versión | Uso |
|---|---|---|
| Lucide React | 0.546 | Iconografía |
| clsx + tailwind-merge | latest | Composición de clases |

---

## 3. Inicio rápido

```bash
# Clonar y entrar al directorio
git clone https://github.com/Coorops25/CCG-Site.git
cd CCG-Site

# Instalar dependencias
npm install

# Variables de entorno
cp .env.example .env.local
# editar .env.local con tu GEMINI_API_KEY

# Servidor de desarrollo (http://localhost:3000)
npm run dev
```

### Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Dev server con HMR en `:3000` |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Preview del build localmente |
| `npm run lint` | Type-check con `tsc --noEmit` |
| `npm run clean` | Elimina `dist/` |

---

## 4. Estructura del proyecto

```
ccg-site/
├── public/
│   ├── fonts/                  # Fira Sans, Share, Share Tech (locales)
│   ├── images/services/        # Hero images de servicios (1 por servicio)
│   ├── policies/               # 7 PDFs de políticas laborales
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── llms.txt                # Contenido para motores de IA
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Barra de navegación fija
│   │   │   └── Footer.tsx      # Pie de página con redes sociales
│   │   │
│   │   ├── sections/           # Secciones del homepage (orden en App.tsx)
│   │   │   ├── Hero.tsx        # Pantalla completa con partículas canvas
│   │   │   ├── Marquee.tsx     # Banda horizontal infinita
│   │   │   ├── About.tsx       # Nosotros + estadísticas animadas
│   │   │   ├── Services.tsx    # 4 filas editoriales de servicios
│   │   │   ├── Reasons.tsx     # 6 diferenciales (ScrollStack)
│   │   │   ├── Clients.tsx     # Carrusel de clientes
│   │   │   └── CTA.tsx         # Llamada a la acción final
│   │   │
│   │   ├── modules/            # Vistas completas (lazy-loaded)
│   │   │   ├── ServiceModule.tsx   # Detalle de servicio
│   │   │   ├── ContactModule.tsx   # Formulario de contacto
│   │   │   └── PrivacyModule.tsx   # Políticas de privacidad
│   │   │
│   │   └── ui/                 # Primitivas de animación
│   │       ├── SplitText.tsx       # GSAP texto por caracteres/palabras
│   │       ├── ScrambledText.tsx   # Scramble por proximidad del cursor
│   │       ├── CircularText.tsx    # Texto rotatorio radial
│   │       ├── LiquidEther.tsx     # Shader WebGL fluid
│   │       ├── ScrollStack.tsx     # Apilamiento con Lenis
│   │       ├── CustomCursor.tsx    # Cursor personalizado
│   │       ├── Preloader.tsx       # Pantalla de carga
│   │       ├── BackgroundEffects.tsx # Grain + glow orbs
│   │       └── hexagon-background.tsx # Grid hexagonal
│   │
│   ├── data/
│   │   ├── services.ts         # ← FUENTE ÚNICA de datos de servicios
│   │   └── index.ts            # Barrel export
│   │
│   ├── types/
│   │   └── index.ts            # Interfaces TypeScript compartidas
│   │
│   ├── hooks/
│   │   └── useTheme.ts         # Toggle dark/light, persiste en localStorage
│   │
│   ├── i18n/
│   │   └── index.tsx           # Traducciones ES/EN + LangProvider + useLang
│   │
│   ├── lib/
│   │   └── utils.ts            # cn() — clsx + tailwind-merge
│   │
│   ├── App.tsx                 # Orquestador principal + enrutamiento por estado
│   ├── main.tsx                # Entry point React 19
│   └── index.css               # Tailwind v4 + @theme tokens + utilidades custom
│
├── index.html                  # HTML principal + SEO completo
├── vite.config.ts
├── tsconfig.json
├── .env.example
├── CLAUDE.md                   # Instrucciones para Claude Code
├── DOCS.md                     # ← Este archivo
└── README.md                   # Quick-start
```

---

## 5. Arquitectura y enrutamiento

### Sin React Router

La navegación es **state-based** en `App.tsx`. No hay librería de routing.

```typescript
// App.tsx
const [currentView, setCurrentView] = useState<'home' | string>('home');
```

### Tabla de vistas

| `currentView` | Componente renderizado | Descripción |
|---|---|---|
| `'home'` | Homepage completo | Todas las secciones apiladas |
| `'01'` | `ServiceModule` | CX – Experiencia del Cliente |
| `'02'` | `ServiceModule` | Leads & Ventas |
| `'03'` | `ServiceModule` | Agentes Autónomos |
| `'04'` | `ServiceModule` | Digital Studio |
| `'contact'` | `ContactModule` | Formulario de contacto |
| `'privacy'` | `PrivacyModule` | Políticas laborales + PDFs |

### Navegación entre vistas

```typescript
// Navegar a una vista
handleNavigate('03')      // → abre Agentes Autónomos
handleNavigate('contact') // → abre formulario

// Volver al home
handleBackToHome()        // → vuelve al homepage y hace scroll a #services
```

### Lazy loading

`ServiceModule`, `ContactModule`, `PrivacyModule` y `LiquidEther` son lazy-loaded con `Suspense`:

```typescript
const ServiceModule = lazy(() => import('./components/modules/ServiceModule'));
```

---

## 6. Capa de datos

### `src/data/services.ts` — Fuente única de verdad

**Regla:** Todo el contenido de servicios vive aquí. Nunca añadir datos de servicios directamente en componentes.

```typescript
import { servicesData, getServiceById } from '@/src/data';

// Obtener todos los servicios
servicesData // → ServiceData[]

// Obtener uno por ID
getServiceById('03') // → ServiceData | undefined
```

### Estructura de un servicio

```typescript
const service: ServiceData = {
  id: '01',                          // '01' | '02' | '03' | '04'
  title: 'CX – Experiencia del Cliente',
  subtitle: 'Experiencias que escalan negocios',
  desc: 'Descripción corta para tarjetas',
  tags: ['Servicio al Cliente', 'PQR', ...],
  link: 'https://ccgrupo.com.co/...',
  icon: Users,                       // Lucide icon component
  gradient: 'from-[#071a2c] ...',    // Tailwind gradient classes
  subProducts: [...],                // Solo en Agentes Autónomos (03)
  details: {
    heroImage: '/images/services/01-customer-experience.jpg',
    longDesc: 'Descripción larga para la página de detalle',
    features: ['Feature 1', 'Feature 2', ...],
    benefits: [{ title: '...', desc: '...' }, ...],
    faq: [{ question: '...', answer: '...' }, ...],
  },
};
```

### Sub-productos (Agentes Autónomos — `id: '03'`)

| # | Nombre | Descripción |
|---|---|---|
| 01 | AVA Asistente | Asistente 24/7 por WhatsApp/Signal/Telegram ⭐ Producto estrella |
| 02 | AVA Chat | Atención en WebChat y canales chat con IA |
| 03 | AVA Bot | Agente de voz IA (llamadas entrantes/salientes) |
| 04 | AVA Leads | Calificación y seguimiento automático de prospectos |
| 05 | AVA Social | Community manager digital 24/7 |
| 06 | WhatsApp IA | Atención y ventas potenciadas con IA en WhatsApp Business |

### Agregar un servicio nuevo

1. Añadir entrada en `servicesData` en `src/data/services.ts`
2. Añadir traducciones ES en `src/i18n/index.tsx` → `services.items` y `serviceDetails`
3. Añadir traducciones EN en la misma ruta del objeto `en`
4. Colocar hero image en `public/images/services/`

---

## 7. Sistema de internacionalización (i18n)

### Idiomas soportados

| Código | Idioma | Default |
|---|---|---|
| `es` | Español | ✓ |
| `en` | English | — |

### Uso en componentes

```typescript
import { useLang } from '../../i18n';

function MyComponent() {
  const { t, lang, toggleLang } = useLang();

  return (
    <div>
      <h1>{t.hero.line1}</h1>          {/* texto traducido */}
      <span>{lang}</span>              {/* 'es' | 'en' */}
      <button onClick={toggleLang}>   {/* cambiar idioma */}
    </div>
  );
}
```

### Estructura de traducciones

```
translations
├── nav           Navbar links + botón contacto
├── hero          Badge, líneas de título, desc, CTAs, scroll
├── about         Label, heading, desc, quote, stats labels
├── marquee       Keywords del ticker
├── services      Label, items (título/subtítulo/desc por ID)
├── reasons       Label, heading, 6 items (título + desc)
├── clients       Label, headings
├── cta           Label, heading, desc, botón
├── footer        Desc, títulos de columnas, links, copyright
├── contact       Label, heading, campos del formulario, errores
├── privacy       Label, heading, lista de políticas
├── serviceModule Labels del módulo de servicio + baseBlock
└── serviceDetails  Contenido completo por ID ('01'–'04')
```

### `serviceModule.baseBlock` — Bloque base unificada

Aparece en todas las páginas de detalle de servicios:

```typescript
t.serviceModule.baseBlock = {
  label:     'Base Unificada de Servicios',
  title:     'Todos nuestros servicios se apoyan en...',
  guarantee: 'Esta base garantiza productividad, trazabilidad...',
  pillars: [
    { title: 'Omnicanalidad Total',            desc: '...' },
    { title: 'Automatización Inteligente',     desc: '...' },
    { title: 'Dashboard Ejecutivo en Tiempo Real', desc: '...' },
  ],
}
```

### Persistencia

El idioma se persiste en `localStorage` bajo la clave `'lang'`.

---

## 8. Sistema de temas

### Hook `useTheme`

```typescript
import { useTheme } from '@/src/hooks/useTheme';

const { isDark, toggle } = useTheme();
```

- Persiste en `localStorage` bajo la clave `'theme'`
- Agrega/quita la clase `'light'` en `document.documentElement`
- Default: modo oscuro

### Cambio de tema en CSS

```css
/* Modo oscuro (default) */
:root { --c-bg: #0b1628; --c-fg: #ffffff; }

/* Modo claro */
html.light { --c-bg: #ffffff; --c-fg: #0b1628; }
```

---

## 9. Tokens de diseño

Todos los tokens viven en `src/index.css` bajo `@theme`. No existe `tailwind.config.js`.

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `navy-deep` | `#060d1f` | Fondo más oscuro |
| `navy` | `#0b1628` | Fondo principal |
| `navy-mid` | `#0f1d35` | Fondo intermedio |
| `navy-light` | `#162545` | Fondo claro |
| `teal` | `#00b4d8` | Color primario de acción |
| `teal-bright` | `#00e5ff` | Acento / glow |
| `teal-dark` | `#0077b6` | Hover / gradiente |

### Tipografía

| Clase Tailwind | Fuente | Uso |
|---|---|---|
| `font-display` | Share / Playfair Display | Headings principales |
| `font-body` | Fira Sans / Outfit | Texto de cuerpo |
| `font-mono` | JetBrains Mono | Labels, badges, código |

> Las fuentes principales están disponibles localmente en `public/fonts/`.
> Las fuentes de respaldo (Playfair Display, Outfit) se cargan desde Google Fonts con la técnica de preload asíncrono en `index.html`.

### Utilidades custom

```css
.text-gradient    /* Gradient teal → teal-bright en el texto */
.text-stroke      /* Texto outline blanco */
.text-stroke-teal /* Texto outline teal */
```

### Uso con Tailwind

```tsx
// Usando tokens en componentes
<div className="bg-navy text-teal border-teal/20">
<h1 className="font-display text-gradient">
<span className="font-mono text-xs tracking-widest">
```

---

## 10. Componentes

### Layout

#### `Navbar`
```typescript
interface Props { onNavigate?: (view: string) => void }
```

| Feature | Detalle |
|---|---|
| Posición | Fixed, z-index 50 |
| Scroll | Backdrop blur + border aparecen tras 80px de scroll |
| Logo | Imagen CDN con fallback a badge CCG |
| Logo hover | Animación imagen ↔ texto (AnimatePresence) |
| Desktop | Links + toggle de idioma + toggle de tema + CTA |
| Mobile | Hamburger → menú full-screen con stagger |

#### `Footer`
```typescript
interface Props { onNavigate?: (view: string) => void }
```

Grid 5 columnas: logo + desc · servicios · empresa · contacto

---

### Secciones del homepage

#### `Hero`
```typescript
interface Props { onNavigate?: (view: string) => void }
```

| Feature | Detalle |
|---|---|
| Canvas | 60 partículas con líneas de conexión (<150px) |
| Título | 3 líneas con clip-path reveal (delay 2.1s–2.5s) |
| Parallax | `useScroll` + `useTransform` en el texto CCG de fondo |
| CTAs | "Comenzar ahora" (→ contact) · "Ver servicios" (scroll) |
| Decoración | `CircularText` rotatorio (bottom-right, lg+) |

#### `About`
- Contador animado (0 → target, 2s ease-out) usando `useInView`
- `SplitText` para heading por palabras
- `ScrambledText` en descripción (efecto hover por proximidad)
- `LiquidEther` WebGL como fondo (lazy, opacity 20%)

#### `Services`
- 4 filas alternadas (texto izquierda / texto derecha)
- `HexagonBackground` + gradient como visual de cada servicio
- Tags de servicio con border
- Enlace "Explorar →" que navega al ServiceModule

#### `Reasons`
- `ScrollStack` (Lenis) — 6 tarjetas que se apilan al hacer scroll
- 6 íconos de Lucide + texto por cada diferencial

#### `Clients`
- Carrusel CSS infinito (56 logos en webp × 3 sets)
- Breakpoints responsivos: 2 (mobile), 4 (sm), 6 (lg), 8 (xl) logos visibles
- Logos: `max-w-[8.125rem] sm:max-w-[10rem]`, `h-14 sm:h-16` con object-contain
- Efectos: grises → color al hover con transición 300ms
- Bordes con fade gradient a los costados (claro/oscuro según tema)

#### `CTA`
- `LiquidEther` de fondo (lazy, opacity 20%)
- Texto pulsante con glow en teal-bright

---

### Módulos (lazy-loaded)

#### `ServiceModule`
```typescript
interface ServiceModuleProps {
  serviceId: string;
  onBack: () => void;
  onNavigate?: (view: string) => void;
}
```

**Secciones internas:**

| Sección | Descripción |
|---|---|
| Hero | Título, subtítulo, longDesc, tags |
| Features | Lista de características con `CheckCircle` |
| Benefits | Grid de tarjetas de beneficios |
| Sub-products | Solo `id: '03'` (Suite AVA) |
| FAQ | Accordion animado con `AnimatePresence` |
| Base Unificada | **Bloque compartido** — 3 pilares base |
| CTA | Botón de agendamiento al final |

**Precedencia de contenido:** `i18n.serviceDetails[id]` > `services.ts` (fallback)

#### `ContactModule`
- Formulario completo con validación en tiempo real
- Campos: nombre, empresa, email, teléfono, servicio (select), mensaje
- Select dinámico con los 4 servicios actuales
- Estados: normal → enviando → éxito/error

#### `PrivacyModule`
- Lista de 7 políticas laborales
- Modal con visor de PDF (iframe)

---

### UI / Animación

#### `SplitText`

```typescript
<SplitText
  splitType="words"          // 'chars' | 'words' | 'lines'
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  delay={30}                 // ms entre elementos
  duration={1}               // segundos
  ease="power3.out"
>
  Texto a animar
</SplitText>
```

Usa GSAP + SplitText plugin + ScrollTrigger. Trigger: `IntersectionObserver`.

#### `ScrambledText`

```typescript
<ScrambledText
  radius={150}              // px de distancia para activar
  duration={0.8}            // segundos de scramble
  scrambleChars="!@#$%..."
>
  Texto original
</ScrambledText>
```

Efecto de caracteres aleatorios activado por proximidad del mouse.

#### `CircularText`

```typescript
<CircularText
  text="CONTACT*CENTER*GRUPO*BPO*"
  spinDuration={20}
  onHover="speedUp"         // 'slowDown'|'speedUp'|'pause'|'goBonkers'
  className="text-teal text-xs"
/>
```

#### `LiquidEther`

```typescript
<LiquidEther
  colors={['#023e8a', '#0077b6', '#0096c7']}
  mouseForce={20}
  autoDemo
  autoSpeed={0.5}
  autoIntensity={2.2}
  resolution={0.5}
/>
```

Shader WebGL fluid. Siempre lazy-loaded:

```typescript
const LiquidEther = lazy(() => import('../ui/LiquidEther'));
```

#### `ScrollStack`

```typescript
<ScrollStack itemDistance={50} itemStackDistance={20} stackPosition="15%">
  <ScrollStackItem itemClassName="...">Tarjeta 1</ScrollStackItem>
  <ScrollStackItem itemClassName="...">Tarjeta 2</ScrollStackItem>
</ScrollStack>
```

Necesita un contenedor con altura fija (ej. `h-[800px]`).

---

## 11. Stack de animación

### Motion (Framer Motion v12)

> **Import:** `from 'motion/react'` — no `'framer-motion'`

```typescript
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
```

**Patrón de entrada estándar:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2, duration: 0.8 }}
>
```

**Exit animations:**
```typescript
<AnimatePresence mode="wait">
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
    />
  )}
</AnimatePresence>
```

### GSAP

Solo se usa en `SplitText.tsx`. Requiere registro de plugins:

```typescript
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);
```

### Three.js

Encapsulado en `LiquidEther.tsx`. No se usa directamente en otros componentes.

### Lenis

Encapsulado en `ScrollStack.tsx`. No se usa como smooth scroll global (solo para el stack de tarjetas en Reasons).

---

## 12. SEO / AEO / GEO

### `index.html`

| Tag | Descripción |
|---|---|
| `<title>` | Alineado a los 4 servicios |
| `<meta description>` | Max 160 chars, incluye propuesta de valor |
| `<meta keywords>` | Términos clave en español |
| `<link rel="canonical">` | `https://ccgrupo.com.co/` |
| `hreflang` | es-co, en, x-default |
| Open Graph | og:title, og:description, og:image (1200×630) |
| Twitter Card | summary_large_image |
| Geo tags | CO-DC, Bogotá, coordenadas 4.7110, -74.0721 |

### Schema.org (JSON-LD)

| Schema | Propósito |
|---|---|
| `Organization` | Entidad, logo, contacto, redes, OfferCatalog con 4 servicios |
| `LocalBusiness` | Dirección, teléfono, horarios, geo |
| `WebSite` + SearchAction | Sitelinks search |
| `FAQPage` | AEO — 4 preguntas frecuentes para Google |

### Archivos de rastreo

| Archivo | Ubicación | Propósito |
|---|---|---|
| `robots.txt` | `public/` | Permite todo, referencia al sitemap |
| `sitemap.xml` | `public/` | Homepage + secciones + 4 servicios + contacto + 7 PDFs |
| `llms.txt` | `public/` | Contenido completo de marca para IA (Perplexity, ChatGPT, etc.) |

### Actualizar el sitemap

Al agregar nuevas páginas, editar `public/sitemap.xml` y actualizar `<lastmod>`.

---

## 13. Build y rendimiento

### Chunks de Vite (`vite.config.ts`)

```
dist/
├── vendor-react.js     React + React-DOM
├── vendor-motion.js    Framer Motion
├── vendor-gsap.js      GSAP + @gsap
├── vendor-three.js     Three.js
├── vendor-lucide.js    Lucide React
├── vendor-lenis.js     Lenis
└── index.js            App principal
```

### Técnicas aplicadas

| Técnica | Implementación |
|---|---|
| Code splitting | `manualChunks` en `vite.config.ts` |
| Lazy loading | `React.lazy()` para módulos y LiquidEther |
| Fonts asíncrono | `rel="preload"` + `onload` hack en `index.html` |
| HMR desactivable | `DISABLE_HMR=true` env var |
| Target moderno | `esnext` (ES2022+) |

### Tamaño aproximado de chunks

| Chunk | Tamaño estimado |
|---|---|
| vendor-three | ~600 KB (mayor chunk) |
| vendor-motion | ~100 KB |
| vendor-gsap | ~150 KB |
| vendor-react | ~50 KB |

> Three.js es el chunk más pesado. `LiquidEther` es lazy por esta razón.

---

## 14. Variables de entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Uso | Requerida |
|---|---|---|
| `GEMINI_API_KEY` | API key de Gemini (Google AI) | No (feature en desarrollo) |
| `APP_URL` | URL base de la aplicación | No |

Las variables se inyectan en build time via Vite:
```typescript
// En componentes
process.env.GEMINI_API_KEY
```

---

## 15. TypeScript: interfaces

```typescript
// src/types/index.ts

interface ServiceData {
  id: string;
  title: string;
  subtitle?: string;
  desc: string;
  tags: string[];
  link: string;
  icon: ElementType;
  gradient: string;
  details: ServiceDetails;
  subProducts?: SubProduct[];
}

interface ServiceDetails {
  heroImage?: string;
  longDesc: string;
  features: string[];
  benefits: ServiceBenefit[];
  faq?: FaqItem[];
}

interface ServiceBenefit { title: string; desc: string }
interface FaqItem { question: string; answer: string }

interface SubProduct {
  number: string;
  name: string;
  tagline?: string;
  desc: string;
  icon: ElementType;
}

interface NavLink { name: string; href: string }
```

### Utilidad `cn()`

```typescript
import { cn } from '@/src/lib/utils';

// Combina clases condicionalmente y resuelve conflictos de Tailwind
<div className={cn('base-class', isActive && 'active', className)} />
```

---

## 16. Guía de contribución

### Convenciones de código

- **Componentes:** PascalCase, un componente por archivo
- **Hooks:** prefijo `use`, en `src/hooks/`
- **Imports:** alias `@/` para rutas desde la raíz del proyecto
- **Contenido:** nunca en componentes; siempre en `services.ts` o `i18n/index.tsx`

### Agregar un nuevo texto/label

1. Añadir en `src/i18n/index.tsx` dentro del objeto `es` **y** `en`
2. Usar con `const { t } = useLang()` en el componente

### Agregar una nueva sección al homepage

1. Crear `src/components/sections/NuevaSeccion.tsx`
2. Importar y añadir en `App.tsx` dentro del bloque `currentView === 'home'`
3. Si tiene contenido bilingüe, añadir clave en `i18n/index.tsx`

### Modificar servicios

**Solo editar** `src/data/services.ts` e `src/i18n/index.tsx`.
No añadir datos en `ServiceModule.tsx`, `Services.tsx` ni otros componentes.

### Antes de hacer commit

```bash
npm run lint    # Verificar tipos TypeScript
npm run build   # Build limpio sin errores
```

---

## 17. Galería de capturas

### Vista completa

![Fullpage](docs/assets/fullpage.png)

### Hero

![Hero](docs/assets/hero.png)

### Servicios

![Services](docs/assets/services.png)

### Clientes (carrusel de logos)

![Clients](docs/assets/clients.png)

### Footer

![Footer](docs/assets/footer.png)

---

## Contacto del proyecto

| | |
|---|---|
| **Empresa** | Contact Center Grupo S.A.S. |
| **Responsable técnico** | Fabian Leal |
| **Email** | coordinador.operaciones@ccgrupo.com.co |
| **Web** | [ccgrupo.com.co](https://ccgrupo.com.co) |
| **Repositorio** | [github.com/Coorops25/CCG-Site](https://github.com/Coorops25/CCG-Site) |

---

*Documentación generada para CCGrupo · Versión 2.0 · Marzo 2026*
