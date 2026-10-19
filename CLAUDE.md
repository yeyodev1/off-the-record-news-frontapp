# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Frontend de Off the Record. Vue 3 + Vite + TypeScript, SCSS propio, Pinia, vue-router.
Desplegado en Vercel. El backend vive en el repo hermano `*-backapp` (Express 5 + Mongoose).

## Comandos

```sh
pnpm install
pnpm dev          # :5173 — necesita el backapp en :8130
pnpm build        # vue-tsc -b && vite build (el type-check corre acá)
pnpm typecheck
pnpm format
```

No hay suite de tests. La verificación es `pnpm build` + revisión en navegador.
Si vite sirve código viejo tras un cambio grande: `rm -rf node_modules/.vite && pnpm dev --force`.

## Reglas duras

- **Ningún `.vue` pasa de 300 líneas** (SFC entero). La salida no es partirlo en dos de 290:
  es sacar la lógica a un composable y dejar un componente que solo compone.
- **Layout con flexbox.** Para "grillas" usar el mixin `flex-cards($basis, $gap)`.
- **Nada de librerías UI ni Tailwind.** SCSS propio con los tokens de `src/styles/`.
- **Iconos con Font Awesome por CDN** (`<i class="fa-solid fa-…">`). Sin emojis en la UI.
- **El copy vive en `src/config/site.ts`**, no dentro de los componentes.
- Todo `VITE_*` queda expuesto en el navegador: nunca un secreto con ese prefijo.

## Estilos: la trampa de `additionalData`

`vite.config.ts` antepone `@/styles/index.scss` a **cada** bloque `<style lang="scss">`.
Por eso `index.scss` solo puede contener cosas que **no emiten CSS**: variables, `@forward`,
funciones y mixins. Un solo selector ahí se duplica en el CSS de todos los componentes.

Todo lo que emite CSS (reset, `html`/`body`, custom properties, `.btn`, transiciones) va en
`global.scss`, importado una única vez desde `main.ts`. Las fuentes se cargan con `<link>`
en `index.html`.

En componentes: `$ink`, `$accent`, `@include from('md')`, `@include container` — sin `@use`.

## Arquitectura

- **Routes** (`src/router/index.ts`) — lazy imports, `meta.title`, `meta.requiresAuth`; el
  título se aplica en `afterEach`.
- **Services** (`src/services/`) — `class XService extends APIBase`, `export const xService`.
  `httpBase.ts` resuelve la URL del API (env → localhost → túnel `-front`/`-back` → prod),
  pone el Bearer de `localStorage.access_token` y emite `auth:token-expired` en 401.
- **Stores** (`src/stores/`) — Pinia options API. `user.ts` guarda la sesión y `restore()`
  la verifica contra `/auth/me` al arrancar.
- **Composables** — estado de módulo (`ref` fuera de la función) para estado UI compartido.
- **Errores del API** — siempre `{ status, message, data? }` (`ApiError`); el `message` viene
  en español desde el backend y se puede mostrar tal cual en un toast.

## Convenciones

- `<script setup lang="ts">` siempre; orden script → template → style; `<style scoped lang="scss">`.
- Sin punto y coma, comillas simples, 2 espacios (Prettier).
- Componentes PascalCase; singletons de layout con prefijo `The`; vistas con sufijo `View`.
- BEM en clases: `.header__nav`, `.btn--primary`.
- Comentarios y copy en español; explican el porqué, no el qué.

## Portada v2 (diseño de Andersson, 13/10/2026)

- Referencia: `design_handoff_otr_portada` (portada-v2.html). Tokens en `colorVariables.module.scss`; Familjen Grotesk + Source Serif 4.
- Cabecera (`TheHeader`, `ProButton`, `HeaderMenu`), barra de modo (`ModeBar` + `ModePills`), "Las 5 cosas" (`home/TopFiveBox`), stream con pestañas y scroll infinito (`home/StoryStream`, `useStream`), tarjeta PRO sellada (`home/ProTeaserCard`) cada 4 notas, "Lo que tu orilla no está mirando" (`home/OtherSideBox`).
- Tres miradas: noboísta, correísta, independiente. El API ya devuelve el titular encuadrado según `?modo=`.
- Fotos de alto fijo con `StoryPhoto`: si el medio bloquea la imagen cae a la portada de marca.
- Nota con lectura continua (`ArticleView` + `ArticleStory` + `useArticleChain`): al final sigue la siguiente nota completa en el orden del modo; `useActiveStory` mueve la URL con `history.replaceState`. Sin bloque "Cómo hicimos esta nota".
- Tres lenguajes visuales (`utils/media.ts`): `image.editorial` (documental, archivo, grafico, generica) lo pone el backend. La genérica no se muestra: cae a `DataCover` si hay cifras o a la ficha de marca.

## Conector de gerencia

- `/admin/conector` (`AdminConnectorView` + `components/admin/connector/*` + `useConnector`): llave del conector MCP, guía para conectarlo en Claude y bitácora de cambios. Solo para `user.canUseMcp` (lo calcula el backend con `MCP_ALLOWED_EMAILS`): el ítem del menú lleva `gerencia: true` y la ruta `meta.requiresMcp`.
