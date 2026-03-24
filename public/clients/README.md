# Logos de clientes — /public/clients/

Coloca aquí los archivos SVG de cada cliente.
El componente `Clients.tsx` los carga automáticamente y muestra el nombre como fallback si el archivo no existe.

## Convención de nombres

| Cliente          | Archivo esperado        |
|------------------|-------------------------|
| Salud Total      | `salud-total.svg`       |
| Compensar        | `compensar.svg`         |
| Colsubsidio      | `colsubsidio.svg`       |
| Famisanar        | `famisanar.svg`         |
| Sanitas          | `sanitas.svg`           |
| Keralty          | `keralty.svg`           |
| Cafam            | `cafam.svg`             |
| Sura             | `sura.svg`              |
| Comfenalco       | `comfenalco.svg`        |
| Medimás          | `medimas.svg`           |

## Recomendaciones

- Formato: **SVG** preferiblemente, también acepta `.png` / `.webp`
- Fondo: transparente
- Color del logo: blanco o gris claro (el carrusel tiene fondo oscuro)
- Tamaño recomendado: 160 × 60 px (viewBox)
- Si el logo es de color, añadir `filter: brightness(0) invert(1)` en CSS o exportar versión blanca
