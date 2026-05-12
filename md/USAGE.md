# CCGrupo — Guía de Uso del Aplicativo

> **Contact Center Grupo S.A.S.** · BPO de nueva generación · Bogotá, Colombia
> Sitio web: [ccgrupo.com.co](https://ccgrupo.com.co)

---

## 1. Navegación

El aplicativo es una **SPA (Single-Page Application)** sin React Router. La navegación es **state-based** y se gestiona desde `App.tsx` mediante la variable de estado `currentView`.

### Vista principal (homepage)

| Estado | Descripción |
|---|---|
| `currentView === 'home'` | Renderiza el homepage completo con todas las secciones apiladas verticalmente |

### Vistas de detalle

| `currentView` | Componente | Contenido |
|---|---|---|
| `'01'` | `ServiceModule` | CX – Experiencia del Cliente |
| `'02'` | `ServiceModule` | Leads & Ventas |
| `'03' | `ServiceModule` | Agentes Autónomos (Suite AVA) |
| `'04'` | `ServiceModule` | Digital Studio |
| `'05'` | `ServiceModule` | Talento Humano |
| `'contact'` | `ContactModule` | Formulario de contacto |
| `'privacy'` | `PrivacyModule` | Políticas de privacidad y laborales |
| *(cualquier otro)* | `NotFoundModule` | Página 404 |

### URLs y navegación con historial del navegador

- La función `handleNavigate(view)` actualiza la vista y sincroniza la URL usando `window.history.pushState()`.
- `handleBackToHome()` restaura el homepage y hace scroll suave a la sección `#services`.
- `getViewFromPath()` se ejecuta al cargar la página para determinar qué vista mostrar según la ruta.
- `getPathForView()` genera la URL correcta para cada vista (incluye prefijo de idioma cuando aplica).
- El evento `popstate` mantiene la navegación sincronizada al usar los botones adelante/atrás del navegador.

**Patrón de rutas:**

| Vista | Ruta |
|---|---|
| Home | `/` o `/en` |
| Servicio 01 | `/servicio/01` o `/en/servicio/01` |
| Contacto | `/contacto` o `/en/contacto` |
| Privacidad | `/politicas-privacidad` o `/en/privacy-policies` |

---

## 2. Homepage — Secciones

El homepage renderiza las siguientes secciones en orden:

### Hero
- **Canvas de partículas** — 60 partículas conectadas por líneas (<150px de distancia) que reaccionan al cursor.
- **Título animado** — 3 líneas de texto que se revelan con efecto *clip-path* (retardo progresivo: 2.1s–2.5s).
- **Parallax** — Efecto de profundidad en el texto "CCG" de fondo usando `useScroll` + `useTransform`.
- **CTAs** — Dos botones: "Comenzar ahora" (→ contacto) y "Ver servicios" (scroll a sección).
- **Decoración** — `CircularText` rotatorio en la esquina inferior derecha (visible en desktop `lg+`).

### Marquee
- Banda horizontal animada que se desplaza infinitamente mostrando palabras clave de la industria BPO.
- Efecto CSS continuo sin interrupción.

### Diferencial
- Sección que destaca los diferenciales competitivos de CCGrupo.
- Animaciones al hacer scroll usando Motion (Framer Motion).

### AI Stats
- Estadísticas animadas relacionadas con IA y automatización.
- Contadores que incrementan desde 0 hasta su valor objetivo al entrar en vista.

### Journey
- Mapa o recorrido visual del journey del cliente.
- Animaciones secuenciales con Motion.

### About (Nosotros)
- **Estadísticas animadas** — Contadores que van de 0 al valor objetivo (2s, ease-out) activados por `useInView`.
- **SplitText** — Título animado por palabras con GSAP + ScrollTrigger.
- **ScrambledText** — Efecto de caracteres aleatorios en la descripción activado por proximidad del cursor.
- **LiquidEther** — Fondo WebGL fluid (lazy-loaded, opacidad 20%).

### Services (Servicios)
- **4 filas editoriales** — Cada servicio se muestra en una fila con diseño alternado (texto izquierda / texto derecha).
- **HexagonBackground** — Cuadrícula hexagonal como visual de fondo de cada servicio.
- **Tags** — Etiquetas de servicio con borde.
- **Enlace "Explorar →"** — Navega al `ServiceModule` correspondiente mediante `onNavigate(id)`.

### Reasons (Razones)
- **ScrollStack** — 6 tarjetas que se apilan verticalmente al hacer scroll usando Lenis como motor de smooth scroll.
- Cada tarjeta contiene un ícono de Lucide y texto descriptivo de un diferencial de CCGrupo.
- Requiere contenedor con altura fija (`h-[800px]`).

### Sectors
- Sección que muestra los sectores industriales donde opera CCGrupo.
- Modal interactivo al seleccionar un sector (controla `isSectorModalOpen`).

### Talento
- Sección dedicada a talento humano y ofertas laborales.
- Integración con el ecosistema de talento de CCGrupo.

### Clients (Clientes)
- **Carrusel infinito** — 10 logos de clientes duplicados que se desplazan horizontalmente sin fin.
- Los logos están en formato SVG en `public/clients/`.
- Si un logo falta, se muestra el nombre de la compañía como fallback.

### PostingSection
- Sección promocional de Posting, la agencia creativa hermana de CCGrupo.
- Incluye enlace externo a [posting.com.co](https://www.posting.com.co).

### FAQ
- Acordeón de preguntas frecuentes con animaciones `AnimatePresence`.
- Preguntas y respuestas traducidas por idioma.

### CTA (Llamada a la Acción)
- **LiquidEther** de fondo (lazy-loaded, opacidad 20%).
- Texto pulsante con efecto glow en color `teal-bright`.
- Botón que navega al módulo de contacto.

---

## 3. Servicios

El sitio cuenta con **6 servicios** definidos en `src/data/services.ts` (fuente única de verdad):

| ID | Servicio | Icono |
|---|---|---|
| `01` | CX – Experiencia del Cliente | Users |
| `02` | Leads & Ventas | TrendingUp |
| `03` | Agentes Autónomos (Suite AVA) | Bot |
| `04` | Digital Studio | Code2 |
| `05` | Talento Humano | UserCheck |
| `06` | Agencia Creativa (Posting) | Palette |

### Cómo navegar al detalle de cada servicio

1. Desde el homepage, hacer clic en **"Explorar →"** en la tarjeta del servicio dentro de la sección Services.
2. También desde el navbar o footer si están configurados con `onNavigate`.
3. Directamente por URL: `/servicio/01`, `/servicio/02`, etc.

### Página de detalle (ServiceModule)

Cada página de detalle contiene:

| Sección | Descripción |
|---|---|
| **Hero** | Título, subtítulo, descripción larga y tags del servicio |
| **Features** | Lista de características con íconos `CheckCircle` |
| **Benefits** | Grid de tarjetas de beneficios (título + descripción) |
| **Sub-products** | Solo visible para `id: '03'` (Agentes Autónomos) — muestra los 6 productos de la Suite AVA |
| **FAQ** | Acordeón de preguntas frecuentes específicas del servicio |
| **Base Unificada** | Bloque compartido presente en **todos** los servicios con 3 pilares: Omnicanalidad Total, Automatización Inteligente, Dashboard Ejecutivo en Tiempo Real |
| **CTA Final** | Botón de agendamiento o contacto |

### Suite AVA (Agentes Autónomos — id: '03')

| # | Producto | Descripción |
|---|---|---|
| 01 | AVA Asistente | ⭐ Producto estrella — asistente 24/7 por WhatsApp/Signal/Telegram |
| 02 | AVA Chat | Atención inteligente en WebChat y canales chat con IA |
| 03 | AVA Bot | Agente de voz IA para llamadas entrantes y salientes |
| 04 | AVA Leads | Calificación y seguimiento automático de prospectos |
| 05 | AVA Social | Community manager digital 24/7 |
| 06 | WhatsApp IA | Atención y ventas potenciadas con IA en WhatsApp Business |

### Agencia Creativa (id: '06')

El servicio 06 corresponde a **Posting**, agencia creativa hermana. A diferencia de los otros servicios, su enlace dirige a un sitio externo (`posting.com.co`). La página de detalle se muestra igualmente dentro del aplicativo.

---

## 4. Contacto

### Formulario (ContactModule)

El formulario de contacto incluye:

| Campo | Tipo | Validación |
|---|---|---|
| Nombre | Texto | Requerido |
| Empresa | Texto | Requerido |
| Email | Email | Formato válido |
| Teléfono | Teléfono | Requerido |
| Servicio de interés | Select | Lista dinámica con los servicios activos |
| Mensaje | Textarea | Requerido |

### Estados del formulario

1. **Normal** — Campos editables, botón de envío habilitado.
2. **Enviando** — Indicador de carga, campos deshabilitados.
3. **Éxito** — Mensaje de confirmación, formulario reiniciado.
4. **Error** — Mensaje de error, campos reeditables.

### Integración EmailJS

El formulario utiliza **EmailJS** para el envío de correos. Requiere las siguientes variables de entorno:

```
VITE_EMAILJS_SERVICE_ID="service_xxxxxxx"
VITE_EMAILJS_TEMPLATE_ID="template_xxxxxxx"
VITE_EMAILJS_PUBLIC_KEY="xxxxxxxxxxxxxxxxxxxx"
```

Sin estas variables, el envío no funcionará. Configurar en `.env.local`.

### WhatsApp

El sitio incluye un botón flotante de WhatsApp (opcional, configurable vía `VITE_WHATSAPP_NUMBER`).

---

## 5. Temas (Dark / Light Mode)

### Cómo cambiar de tema

El toggle de tema está disponible en el **navbar** (escritorio) y en el **menú móvil**.

### Persistencia

- El tema se persiste en `localStorage` bajo la clave `'theme'`.
- La clase `'light'` se agrega o remueve de `document.documentElement`.
- El valor por defecto es **modo oscuro**.

### Hook `useTheme`

```typescript
import { useTheme } from '../../hooks/useTheme';
const { isDark, toggle } = useTheme();
```

### Comportamiento

- **Modo oscuro (default)** — Fondos navy oscuros (`#0b1628`), texto blanco, acentos teal.
- **Modo claro** — Fondos blancos, texto navy oscuro, ajuste de opacidades y bordes para legibilidad.
- El `color-scheme` se sincroniza automáticamente.
- La meta etiqueta `theme-color` se actualiza en cada cambio.
- El tema se define antes de la hidratación de React para evitar el *flash* de tema incorrecto.

---

## 6. Internacionalización

### Idiomas soportados

| Código | Idioma |
|---|---|
| `es` | Español (predeterminado) |
| `en` | Inglés |
| `pt` | Portugués |

### Cómo cambiar de idioma

- Usar el toggle de idioma en el navbar (cicla entre es → en → pt).
- También se puede cambiar desde la URL: `/en/servicio/01`, `/pt/contacto`, etc.

### Persistencia

El idioma se guarda en `localStorage` bajo la clave `'lang'`.

### Precedencia de idioma

1. Prefijo de idioma en la URL (`/en/...`, `/pt/...`, `/es/...`)
2. Valor guardado en `localStorage`
3. Español (valor por defecto)

### Uso en componentes

```typescript
import { useLang } from '../../i18n';

function Componente() {
  const { t, lang, toggleLang } = useLang();
  return <h1>{t.hero.line1}</h1>;
}
```

### Estructura de traducciones

Las traducciones están organizadas por sección en `src/i18n/`:
`nav`, `hero`, `about`, `marquee`, `services`, `reasons`, `clients`, `cta`, `footer`, `contact`, `privacy`, `serviceModule`, `serviceDetails`

Cada servicio tiene su propio bloque de traducciones dentro de `serviceDetails` por ID (`'01'`–`'06'`).

---

## 7. Animaciones

### SplitText

Animación de texto por caracteres, palabras o líneas usando **GSAP** + **SplitText plugin** + **ScrollTrigger**.

```tsx
<SplitText
  splitType="words"      // 'chars' | 'words' | 'lines'
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  delay={30}             // ms entre elementos
  duration={1}
  ease="power3.out"
>
  Texto a animar
</SplitText>
```

Se activa cuando el elemento entra en el viewport (IntersectionObserver).

### ScrambledText

Efecto de caracteres aleatorios activado por la proximidad del cursor del mouse.

```tsx
<ScrambledText
  radius={150}           // px de distancia para activar
  duration={0.8}
  scrambleChars="!@#$%..."
>
  Texto original
</ScrambledText>
```

### CircularText

Texto dispuesto en forma circular con rotación continua.

```tsx
<CircularText
  text="CONTACT*CENTER*GRUPO*BPO*"
  spinDuration={20}
  onHover="speedUp"      // 'slowDown' | 'speedUp' | 'pause' | 'goBonkers'
/>
```

Comportamientos al hacer hover: acelerar, desacelerar, pausar o rotación errática.

### LiquidEther

Shader **WebGL fluid** con efecto de líquido interactivo. Siempre lazy-loaded por su peso (~600 KB en Three.js).

```tsx
<LiquidEther
  colors={['#023e8a', '#0077b6', '#0096c7']}
  mouseForce={20}
  autoDemo
  autoSpeed={0.5}
  autoIntensity={2.2}
  resolution={0.5}
/>
```

Se usa como fondo decorativo en las secciones **About** y **CTA**.

### ScrollStack

Sistema de apilamiento de tarjetas con smooth scroll usando **Lenis**.

```tsx
<ScrollStack itemDistance={50} itemStackDistance={20} stackPosition="15%">
  <ScrollStackItem>Tarjeta 1</ScrollStackItem>
  <ScrollStackItem>Tarjeta 2</ScrollStackItem>
</ScrollStack>
```

Requiere un contenedor con altura fija. Se usa en la sección **Reasons** con 6 tarjetas.

### Otras animaciones

- **Motion (Framer Motion v12)** — Usado para transiciones de páginas, entradas con `whileInView`, acordeones FAQ con `AnimatePresence`, y animaciones del navbar.
- **Preloader** — Pantalla de carga inicial con animación de salida.
- **CustomCursor** — Cursor personalizado que sigue al mouse.
- **BackgroundEffects** — Efectos de grano (`grain`) y orbes de glow.
- **hexagon-background** — Cuadrícula hexagonal generada por canvas.
- **TiltCard** — Efecto de inclinación 3D al mover el mouse sobre tarjetas.

---

## 8. SEO

### Schema.org (JSON-LD)

El sitio incluye los siguientes esquemas estructurados en `index.html`:

| Schema | Propósito |
|---|---|
| `Organization` | Entidad corporativa, logo, redes sociales, OfferCatalog con servicios |
| `LocalBusiness` | Dirección, teléfono, horarios, coordenadas geográficas |
| `WebSite` + `SearchAction` | Sitelinks search box |
| `FAQPage` | 4 preguntas frecuentes para Google y asistentes de IA |
| `BreadcrumbList` | Migas de pan en páginas de servicio |

### Open Graph / Twitter

| Tag | Valor |
|---|---|
| `og:title` | Título corporativo descriptivo |
| `og:description` | Propuesta de valor (max 160 caracteres) |
| `og:image` | `https://ccgrupo.com.co/og-image.png` (1200×630) |
| `twitter:card` | `summary_large_image` |

### Archivos de rastreo

| Archivo | Ubicación | Uso |
|---|---|---|
| `robots.txt` | `public/robots.txt` | Permite todo, referencia al sitemap |
| `sitemap.xml` | `public/sitemap.xml` | URLs del sitio: homepage, secciones, servicios, contacto, PDFs |
| `llms.txt` | `public/llms.txt` | Contenido completo de marca optimizado para motores de IA (ChatGPT, Perplexity, Claude, Gemini) |
| `llm.txt` | `public/llm.txt` | Versión alternativa para crawlers de IA |

### Metadatos adicionales

- **Canonical**: `<link rel="canonical" href="https://ccgrupo.com.co/">`
- **hreflang**: `es-co`, `en`, `pt`, `x-default`
- **Geo tags**: CO-DC, Bogotá, coordenadas `4.7110, -74.0721`
- **Keywords**: Términos clave de BPO en español
- **Favicon**: `favicon.svg` + `site.webmanifest`

---

## 9. Configuración y Variables de Entorno

Copiar `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Requerida | Uso |
|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | Sí (contacto) | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | Sí (contacto) | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | Sí (contacto) | EmailJS public key |
| `VITE_WHATSAPP_NUMBER` | No | Número para botón flotante WhatsApp |
| `VITE_GA_ID` | No | Google Analytics 4 ID |
| `GEMINI_API_KEY` | No | API key de Gemini (features futuras) |

---

## 10. Políticas de Privacidad

El módulo `PrivacyModule` (`/politicas-privacidad`) lista **7 políticas laborales** en PDF almacenadas en `public/policies/`. Cada política se puede visualizar en un modal con visor PDF (iframe).

---

## 11. Atajos y Comportamientos Útiles

- **Scroll a servicios**: Al hacer clic en "Ver servicios" en el Hero, el homepage hace scroll suave a `#services`.
- **Volver al inicio desde detalle**: El botón "Atrás" en `ServiceModule` navega al homepage y hace scroll a la sección de servicios.
- **Preloader**: Aparece en la primera carga. Mientras está activo, el scroll del body está deshabilitado.
- **Cookie Banner**: Se muestra al cargar el sitio con un temporizador de 2 segundos. Permite aceptar cookies y navegar a la política de privacidad.
- **ScrollTracker**: Indicador visual de progreso de scroll.
- **FloatingCTA**: Botón CTA flotante visible durante la navegación del homepage.
- **CornerLabels**: Etiquetas decorativas en las esquinas.
- **ErrorBoundary**: Captura errores de renderizado y muestra una interfaz de fallback.
- **Not Found**: Cualquier ruta no reconocida muestra el `NotFoundModule` con opción de volver al inicio.

---

*Documentación de uso para CCGrupo · Versión 1.0 · Mayo 2026*
