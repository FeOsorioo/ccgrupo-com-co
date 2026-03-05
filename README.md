# CCG Site — Contact Center Grupo

Sitio web corporativo de **Contact Center Grupo**, un BPO de nueva generación con IA, omnicanalidad y talento humano. Construido con React 19, Vite, TypeScript y Tailwind CSS v4.

---

## Stack tecnológico

| Herramienta       | Uso                              |
|-------------------|----------------------------------|
| React 19          | UI                               |
| Vite 6            | Bundler y servidor de desarrollo |
| TypeScript        | Tipado estático                  |
| Tailwind CSS v4   | Estilos                          |
| Motion (Framer)   | Animaciones                      |
| Lucide React      | Iconos                           |

---

## Estructura del proyecto

```
src/
├── App.tsx                        # Componente raíz
├── main.tsx                       # Entry point
├── index.css                      # Estilos globales y tokens de diseño
└── components/
    ├── layout/
    │   ├── Navbar.tsx             # Barra de navegación fija con menú móvil
    │   └── Footer.tsx             # Pie de página con links y redes sociales
    ├── sections/
    │   ├── Hero.tsx               # Sección principal con partículas y parallax
    │   ├── Marquee.tsx            # Banda animada de palabras clave
    │   ├── About.tsx              # Nosotros con contadores animados
    │   ├── Services.tsx           # Tres servicios principales
    │   ├── Reasons.tsx            # Grilla de diferenciales (6 tarjetas)
    │   ├── Clients.tsx            # Carrusel de clientes
    │   └── CTA.tsx                # Call to action final
    └── ui/
        ├── Preloader.tsx          # Pantalla de carga con contador
        ├── CustomCursor.tsx       # Cursor personalizado
        ├── BackgroundEffects.tsx  # Orbs y grain de fondo
        ├── CircularText.tsx       # Texto circular giratorio
        └── ScrambledText.tsx      # Texto scramble en hover
```

---

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (puerto 3000)
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Verificar tipos TypeScript
npm run lint
```

---

## Variables de entorno

Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

| Variable        | Descripción                 | Requerida |
|-----------------|-----------------------------|-----------|
| `VITE_APP_URL`  | URL de producción del sitio | No        |

---

## Despliegue

El build genera la carpeta `dist/` lista para servir en cualquier CDN o servidor estático (Vercel, Netlify, Cloudflare Pages, etc.).
