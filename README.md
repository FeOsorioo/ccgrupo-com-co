# CCGrupo — Sitio Web Corporativo

Sitio web de **Contact Center Grupo S.A.S.**, BPO de nueva generación con sede en Bogotá, Colombia.

## Stack

- **React 19** + **TypeScript**
- **Vite 6** — bundler y dev server
- **Tailwind CSS v4** — via plugin `@tailwindcss/vite`
- **Motion (Framer Motion)** — animaciones UI
- **GSAP + SplitText** — animaciones de texto
- **Three.js** — efectos WebGL (LiquidEther)
- **Lenis** — smooth scroll

## Inicio rápido

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Dev server con HMR |
| `npm run build` | Build de producción → `dist/` |
| `npm run preview` | Preview del build |
| `npm run lint` | Type-check TypeScript |
| `npm run clean` | Elimina `dist/` |

## Variables de entorno

Copia `.env.example` a `.env.local` y configura:

```
GEMINI_API_KEY=tu_api_key_aqui
```

## Estructura

```
src/
  components/
    layout/      Navbar, Footer
    sections/    Secciones del homepage (Hero, About, Services, etc.)
    modules/     Vistas completas (ServiceModule)
    ui/          Componentes de animación reutilizables
  data/          Datos de servicios y contenido estático
  types/         Interfaces TypeScript compartidas
  lib/           Utilidades (cn)
public/          Assets estáticos (robots.txt, favicon)
```

## Contacto

[ccgrupo.com.co](https://ccgrupo.com.co) — info@ccgrupo.com.co — (601) 7443732
