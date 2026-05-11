# Guía de Git — CCGrupo Website

> **Contact Center Grupo S.A.S.** · Bogotá, Colombia
> Repositorio: [github.com/Coorops25/CCG-Site](https://github.com/Coorops25/CCG-Site)

---

## 1. Flujo de Trabajo Git

Actualmente trabajamos con **una sola rama principal (`main`)** y commits directos. No hay flujo de Pull Requests ni revisión obligatoria — cada desarrollador es responsable de la calidad de lo que envía.

```
main  ─── C1 ── C2 ── C3 ── C4 ──→
```

### Regla fundamental

> **No se sube código roto a `main`.** Si el build falla, no se hace push hasta corregirlo.

---

## 2. Convenciones de Commits

Usamos **Conventional Commits** 1.0.0. Formato:

```
<tipo>(<alcance opcional>): <mensaje en presente>
```

| Tipo       | Uso |
|------------|-----|
| `feat`     | Nueva funcionalidad |
| `fix`      | Corrección de bug |
| `docs`     | Cambios en documentación |
| `refactor` | Cambio de código que no agrega funcionalidad ni corrige bugs |
| `style`    | Cambios de formato, whitespace, CSS (no afectan lógica) |
| `chore`    | Tareas de mantenimiento, dependencias, config |
| `perf`     | Mejora de rendimiento |
| `test`     | Agregar o corregir tests |

### Ejemplos

```
feat: agregar animación de entrada a hero section
fix: corregir scroll infinito en client carousel
docs: actualizar DOCS.md con nueva estructura de i18n
refactor: extraer lógica de temas a hook useTheme
style: ajustar espaciado en navbar mobile
chore: actualizar dependencias de Motion a v12
```

### Reglas

- Mensajes en **imperativo, presente** ("agregar", no "agregué" ni "agrega")
- Sin punto final
- Usar español (el equipo es colombiano)
- Alcance opcional pero recomendado cuando afecta un módulo concreto (`feat(navbar): ...`)

---

## 3. Antes de Hacer Commit

Siempre ejecutar estos dos comandos **antes de cada commit**:

```bash
npm run lint    # Type-check con tsc --noEmit
npm run build   # Build de producción limpio (dist/)
```

Si cualquiera de los dos falla, **no hacer commit**. Corregir los errores primero.

### Checklist pre-commit

- [ ] `npm run lint` pasa sin errores
- [ ] `npm run build` genera `dist/` sin errores
- [ ] No hay archivos `.env` incluidos (revisar con `git status`)
- [ ] No hay `console.log` de debug
- [ ] No hay código comentado innecesario
- [ ] Los mensajes de commit siguen Conventional Commits

---

## 4. Estructura de Ramas

### Actual (simplificado)

```
main         # Producción — unica rama activa
```

### Futuro (cuando el equipo crezca)

```
main         # Producción — solo código estable y revisado
develop      # Integración — rama de trabajo diario
feature/*    # Ramas temporales por funcionalidad
  feature/formulario-contacto
  feature/modo-oscuro-v2
  feature/landing-portafolio
```

**Nota:** Por ahora no usamos ramas `develop` ni `feature/*`. Cuando se adopten, se actualizará este documento.

---

## 5. Políticas de Push

### Permitido en `main`

- Commits directos de cualquier desarrollador del equipo
- **Solo si** el build pasa localmente (lint + build)

### Prohibido en `main`

- Push con errores de TypeScript
- Push con build roto
- Push de archivos de entorno (`.env`, `.env.local`, `.env.development`)
- Push de `node_modules/` o `dist/`
- Push de dependencias sin `package-lock.json` actualizado

### En caso de push con error

1. Identificar el commit que rompió el build con `git log`
2. Si es urgente, revertir con `git revert <hash>`
3. Corregir el error en local y hacer un nuevo commit

---

## 6. Manejo de Conflictos

### Escenario típico

Dos desarrolladores modifican el mismo archivo y el segundo hace push después del primero.

### Resolución paso a paso

```bash
# 1. Traer los cambios remotos
git pull origin main

# 2. Si hay conflicto, Git lo marca en los archivos afectados
#    Aparecen marcadores como:
#    <<<<<<< HEAD
#    código local
#    =======
#    código remoto
#    >>>>>>> commit-remoto

# 3. Editar los archivos en conflicto:
#    - Elegir qué código conservar (local, remoto, o una mezcla)
#    - Eliminar los marcadores <<<<<<<, =======, >>>>>>>

# 4. Una vez resueltos todos los conflictos:
git add .
git commit -m "fix: resolver conflictos en <archivos>"

# 5. Verificar que el build sigue funcionando
npm run lint && npm run build

# 6. Hacer push
git push origin main
```

### Consejos

- Usar `git status` para ver qué archivos están en conflicto
- Usar `git diff` para revisar diferencias antes de resolver
- Si no estás seguro de qué versión conservar, preguntar al otro desarrollador
- No hacer `git push --force` a `main` bajo ninguna circunstancia

---

## 7. Buenas Prácticas

### Commits atómicos

Cada commit debe representar **un solo cambio lógico**. No mezclar propósitos:

```
✅ Bien
  feat: agregar formulario de contacto
  fix: corregir validación de email en contacto

❌ Mal
  feat: agregar formulario y corregir navbar y actualizar docs
```

### Mensajes descriptivos

El mensaje debe explicar **qué** cambia y **por qué**:

```
✅ feat(hero): agregar partículas de canvas con conexiones dinámicas
❌ feat: cambios en hero
```

### Archivos que no se suben

Nunca incluir en commits:

| Archivo | Motivo |
|---------|--------|
| `.env` / `.env.local` / `.env.*` | Contienen API keys y secretos |
| `dist/` | Generado por `npm run build` |
| `node_modules/` | Generado por `npm install` |
| `.tsbuildinfo` | Caché de TypeScript |

`.gitignore` ya cubre todos estos. Verificar con `git status` antes de commitear.

### Commits después del build

Siempre confirmar que `dist/` no aparece en `git status`. Si aparece, agregarlo a `.gitignore`.

---

## 8. Flujo Diario Recomendado

```bash
# 1. Asegurarse de estar en main y tener lo último
git checkout main
git pull origin main

# 2. Hacer cambios en el código

# 3. Verificar antes de commit
npm run lint
npm run build

# 4. Stage y commit
git add <archivos>
git commit -m "feat: <mensaje descriptivo>"

# 5. Traer cambios de otros (por si hubo pushes mientras tanto)
git pull origin main --rebase
# Resolver conflictos si los hay

# 6. Verificar build de nuevo (por si el rebase trajo cambios)
npm run lint && npm run build

# 7. Subir
git push origin main
```

---

## 9. Comandos Útiles

```bash
# Ver estado actual
git status

# Ver cambios sin stage
git diff

# Ver historial reciente
git log --oneline -10

# Deshacer el último commit (manteniendo cambios en working directory)
git reset --soft HEAD~1

# Deshacer cambios de un archivo antes del stage
git checkout -- <archivo>

# Crear un commit de revertir para un commit específico
git revert <hash>

# Ver quién cambió cada línea de un archivo
git blame <archivo>
```

---

## 10. Referencias

| Recurso | URL |
|---------|-----|
| Repositorio | [github.com/Coorops25/CCG-Site](https://github.com/Coorops25/CCG-Site) |
| Issues | [github.com/Coorops25/CCG-Site/issues](https://github.com/Coorops25/CCG-Site/issues) |
| Documentación técnica | [`DOCS.md`](./DOCS.md) |
| Guía del sitio | [`SITE-GUIDE.md`](./SITE-GUIDE.md) |
| Conventional Commits | [conventionalcommits.org](https://www.conventionalcommits.org/es/v1.0.0/) |

---

**Responsable técnico:** Fabian Leal — coordinador.operaciones@ccgrupo.com.co

*Última actualización: Mayo 2026*
