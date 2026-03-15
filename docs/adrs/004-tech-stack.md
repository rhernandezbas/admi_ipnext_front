# ADR-004: Tech Stack Frontend

## Estado
Aceptado

## Contexto
Necesitamos definir el stack tecnológico del frontend de IPNEXT Admin antes de comenzar el desarrollo.

## Decisión

| Categoría | Tecnología | Justificación |
|-----------|-----------|---------------|
| Framework | **React 19** | Ecosistema maduro, gran comunidad, componentes funcionales + hooks |
| Build tool | **Vite** | Rápido en desarrollo y build, soporte nativo ESM |
| Lenguaje | **TypeScript** | Tipado estático, mejor DX, obligatorio para un proyecto de esta complejidad |
| Routing | **React Router v6** | Estándar de facto para SPAs en React |
| Estilos | **Tailwind CSS v4** | Utility-first, consistente con design system, sin overhead de CSS en producción |
| Iconos | **Lucide React** | Ya definido en el diseño Pencil |
| Fuentes | **Space Grotesk + Inter** | Ya definidas en el diseño Pencil |
| Gráficos | **Recharts** | Simple, declarativo, compatible con React, soporte para barras y líneas |
| Estado global | **Zustand** | Minimalista, sin boilerplate de Redux, suficiente para auth + UI state |
| Fetch / API | **TanStack Query (React Query)** | Cache automático, loading/error states, refetch, ideal para datos remotos |
| Formularios | **React Hook Form + Zod** | Performante, validación con schema, sin re-renders innecesarios |
| Fechas | **date-fns** | Ligero, tree-shakeable, sin mutabilidad (vs moment.js) |
| Linting | **ESLint + Prettier** | Consistencia de código |
| Testing | **Vitest + jsdom + axios-mock-adapter** | Tests unitarios de servicios, store y tipos |

## Consecuencias
- Positivo: stack moderno y bien documentado.
- Positivo: Vite + Tailwind = feedback de desarrollo muy rápido.
- Positivo: TanStack Query elimina gran parte del boilerplate de loading/error.
- A tener en cuenta: Space Grotesk e Inter deben cargarse desde Google Fonts o ser self-hosted.
- A tener en cuenta: Recharts requiere wrappers `<ResponsiveContainer>` para que los gráficos sean responsivos.
