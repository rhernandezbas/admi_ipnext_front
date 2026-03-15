# IPNEXT Admin — Ralph Loop Spec

## Contexto del Proyecto

Estás construyendo **IPNEXT Admin**, una SPA en React para administración empresarial.
Toda la documentación de referencia está en `docs/` (features, TDRs, ADRs, business overview).

**Stack definido (ADR-004):**
- React 18 + TypeScript + Vite
- Tailwind CSS v4
- React Router v6
- Zustand (estado global)
- TanStack Query (datos remotos)
- React Hook Form + Zod (formularios)
- Recharts (gráficos)
- Lucide React (iconos)
- date-fns (fechas)

**Design System:**
- Color primario: `#E42313`
- Texto principal: `#0D0D0D`
- Texto secundario: `#7A7A7A`
- Fondo app: `#FAFAFA`
- Fondo card: `#FFFFFF`
- Borde: `#E8E8E8`
- Éxito: `#22C55E`
- Fuente headings: Space Grotesk (600, 500)
- Fuente body: Inter (400, 500)
- Iconos: Lucide React

---

## Reglas de trabajo

1. **Antes de empezar cada iteración**, leé `spec/tracker.md` para saber exactamente en qué fase y paso quedaste.
2. **Trabajá UNA fase completa** por iteración si es posible. Si una fase es muy grande, avanzá todo lo que puedas.
3. **Al terminar cada iteración**, actualizá `spec/tracker.md` marcando lo completado y el próximo paso.
4. **Siempre corré** `npm run build` al final de cada iteración y corregí todos los errores TypeScript antes de actualizar el tracker.
5. **No uses datos hardcodeados en lógica** — usá mocks en `src/mocks/` para datos de ejemplo.
6. **Consultá los feature files** en `docs/features/` para los detalles de cada módulo.

---

## Fases de Implementación

### FASE 0 — Setup del Proyecto

**Objetivo:** Proyecto React configurado y corriendo.

Pasos:
- [ ] Crear proyecto con Vite: `npm create vite@latest src -- --template react-ts`
- [ ] Instalar dependencias: `npm install react-router-dom @tanstack/react-query zustand react-hook-form zod @hookform/resolvers recharts lucide-react date-fns`
- [ ] Instalar Tailwind CSS v4 y configurarlo
- [ ] Instalar fuentes: Space Grotesk + Inter desde Google Fonts (en index.html o CSS)
- [ ] Configurar `tsconfig.json` con path aliases (`@/` → `src/`)
- [ ] Configurar `vite.config.ts` con alias `@`
- [ ] Crear estructura de carpetas según TDR-001: `src/components/ui/`, `src/components/layout/`, `src/modules/`, `src/hooks/`, `src/services/`, `src/store/`, `src/types/`, `src/mocks/`
- [ ] Limpiar boilerplate de Vite (App.tsx, index.css)
- [ ] Verificar: `npm run dev` levanta sin errores

---

### FASE 1 — Design System (Componentes UI Atómicos)

**Objetivo:** Todos los componentes reutilizables del design system implementados.

Consultá: `docs/business/ipnext-admin-overview.md` (sección Design System)

Componentes a crear en `src/components/ui/`:
- [ ] `Badge.tsx` — variantes: success (verde), warning (amarillo), danger (rojo), neutral (gris), info (azul)
- [ ] `Button.tsx` — variantes: primary (rojo), secondary (outline), ghost
- [ ] `Card.tsx` — contenedor blanco con borde `#E8E8E8` y padding
- [ ] `KpiCard.tsx` — icono + label + valor grande (Space Grotesk 28 600) + subtítulo
- [ ] `Input.tsx` — input con label, borde, focus ring rojo
- [ ] `Select.tsx` — select con label y opciones
- [ ] `Textarea.tsx` — textarea con label
- [ ] `Table.tsx` — tabla con header gris `#FAFAFA`, filas con borde inferior, hover sutil
- [ ] `Tabs.tsx` — tabs horizontales, activo con borde inferior rojo
- [ ] `Avatar.tsx` — círculo con inicial o imagen
- [ ] `PageHeader.tsx` — título de página + slot para acciones (top-right)
- [ ] Verificar: todos compilar sin errores TypeScript

---

### FASE 2 — Layout Principal

**Objetivo:** Sidebar + TopBar + estructura de página implementados.

Consultá: `docs/features/dashboard.feature` (sección Layout y Sidebar)

Componentes a crear en `src/components/layout/`:
- [ ] `Sidebar.tsx`:
  - Logo: cuadrado rojo + "IPNEXT" (Space Grotesk 18 600)
  - 8 ítems de navegación con icono Lucide + label
  - Ítem activo: fondo `#E42313`, texto blanco
  - Ítem inactivo: texto `#7A7A7A`
  - Footer: avatar + nombre + rol
  - Width: 240px fijo
- [ ] `TopBar.tsx`:
  - Título dinámico por página
  - Badge de período (mes actual)
  - Botón notificaciones
- [ ] `PageLayout.tsx`:
  - Sidebar fijo izquierda + main content derecha
  - Fondo `#FAFAFA`, padding 32px 40px en main
- [ ] `src/router/index.tsx` — React Router v6 con rutas para todos los módulos
- [ ] `src/store/authStore.ts` — Zustand store con usuario mock (Admin)
- [ ] Verificar: navegar entre rutas funciona, sidebar marca activo correctamente

---

### FASE 3 — Módulo Dashboard

**Objetivo:** Dashboard completo con todos sus componentes.

Consultá: `docs/features/dashboard.feature`

- [ ] `src/mocks/dashboard.mock.ts` — datos mock para KPIs, pagos urgentes, actividad
- [ ] `src/types/dashboard.types.ts` — tipos TypeScript
- [ ] `src/modules/dashboard/components/KpiRow.tsx` — 4 KPI cards en fila
- [ ] `src/modules/dashboard/components/UrgentPaymentsTable.tsx` — tabla con columnas: Beneficiario, Categoría, Monto, Vencimiento, Estado, Acción
- [ ] `src/modules/dashboard/components/ExpenseChart.tsx` — gráfico barras agrupadas con Recharts
- [ ] `src/modules/dashboard/components/ActivityFeed.tsx` — lista de 4 actividades recientes
- [ ] `src/modules/dashboard/DashboardPage.tsx` — página completa ensamblando todos
- [ ] Verificar: `npm run build` sin errores

---

### FASE 4 — Módulo Transferencias

**Objetivo:** Las 4 vistas de Transferencias implementadas.

Consultá: `docs/features/transferencias.feature`

- [ ] `src/mocks/transferencias.mock.ts`
- [ ] `src/types/transferencia.types.ts`
- [ ] `src/modules/transferencias/components/TransferenciasTable.tsx` — tabla con filtros (buscador, categoría, estado, tipo)
- [ ] `src/modules/transferencias/components/CalendarioView.tsx` — grilla mensual con chips de pago por día
- [ ] `src/modules/transferencias/components/RecurrentesTable.tsx` — tabla con columnas de frecuencia
- [ ] `src/modules/transferencias/components/NuevaTransferenciaForm.tsx` — formulario con React Hook Form + Zod, autocomplete beneficiario, historial colapsable
- [ ] `src/modules/transferencias/TransferenciasPage.tsx` — tabs + render condicional por tab
- [ ] Verificar: `npm run build` sin errores

---

### FASE 5 — Módulo Nóminas & RRHH

**Objetivo:** Las 4 vistas de Nóminas implementadas.

Consultá: `docs/features/nominas.feature`

- [ ] `src/mocks/nominas.mock.ts`
- [ ] `src/types/nomina.types.ts`
- [ ] `src/modules/nominas/components/EmpleadosTable.tsx` — tabla + panel resumen derecha
- [ ] `src/modules/nominas/components/GuardiasTable.tsx` — tabla con KPIs superiores
- [ ] `src/modules/nominas/components/CompensacionesTable.tsx` — tabla con tipos y estados
- [ ] `src/modules/nominas/NominasPage.tsx` — tabs + render condicional
- [ ] Verificar: `npm run build` sin errores

---

### FASE 6 — Módulo Proveedores

**Objetivo:** Las 3 vistas de Proveedores implementadas.

Consultá: `docs/features/proveedores.feature`

- [ ] `src/mocks/proveedores.mock.ts`
- [ ] `src/types/proveedor.types.ts`
- [ ] `src/modules/proveedores/components/ProveedoresTable.tsx` — tabla con buscador
- [ ] `src/modules/proveedores/components/ProveedorDetailPanel.tsx` — panel lateral 280px con historial de pagos
- [ ] `src/modules/proveedores/components/ContratosTable.tsx` — tabla con estados
- [ ] `src/modules/proveedores/components/RankingChart.tsx` — barras horizontales + tabla ranking
- [ ] `src/modules/proveedores/ProveedoresPage.tsx` — tabs, panel lateral condicional
- [ ] Verificar: `npm run build` sin errores

---

### FASE 7 — Módulo Servicios & Utilities

**Objetivo:** Las 5 vistas de Servicios implementadas.

Consultá: `docs/features/servicios.feature`

- [ ] `src/mocks/servicios.mock.ts`
- [ ] `src/types/servicio.types.ts`
- [ ] `src/modules/servicios/components/ResumenGeneral.tsx` — tarjetas por categoría
- [ ] `src/modules/servicios/components/ServiciosTable.tsx` — tabla reutilizable (usada por Internet, Energía, Seguridad, Software)
- [ ] `src/modules/servicios/ServiciosPage.tsx` — 5 tabs con KPIs + tabla por cada uno
- [ ] Verificar: `npm run build` sin errores

---

### FASE 8 — Módulo Alquileres & Inmuebles

**Objetivo:** Las 4 vistas de Alquileres implementadas.

Consultá: `docs/features/alquileres.feature`

- [ ] `src/mocks/alquileres.mock.ts`
- [ ] `src/types/alquiler.types.ts`
- [ ] `src/modules/alquileres/components/InmueblesTable.tsx`
- [ ] `src/modules/alquileres/components/ContratosAlquilerTable.tsx`
- [ ] `src/modules/alquileres/components/PagosRecibosTable.tsx`
- [ ] `src/modules/alquileres/components/VencimientosTable.tsx`
- [ ] `src/modules/alquileres/AlquileresPage.tsx` — 4 tabs
- [ ] Verificar: `npm run build` sin errores

---

### FASE 9 — Módulo Tesorería & Bancos

**Objetivo:** Las 4 vistas de Tesorería implementadas.

Consultá: `docs/features/tesoreria.feature`

- [ ] `src/mocks/tesoreria.mock.ts`
- [ ] `src/types/tesoreria.types.ts`
- [ ] `src/modules/tesoreria/components/FlujoCajaTable.tsx` — tabla con tarjetas de cuentas
- [ ] `src/modules/tesoreria/components/CuentasBancariasTable.tsx`
- [ ] `src/modules/tesoreria/components/ConciliacionTable.tsx`
- [ ] `src/modules/tesoreria/components/ProyeccionesTable.tsx` — tabla + KPIs
- [ ] `src/modules/tesoreria/TesoreriaPage.tsx` — 4 tabs
- [ ] Verificar: `npm run build` sin errores

---

### FASE 10 — Módulo Reportes & Analytics

**Objetivo:** Las 5 vistas de Reportes implementadas.

Consultá: `docs/features/reportes.feature`

- [ ] `src/mocks/reportes.mock.ts`
- [ ] `src/types/reporte.types.ts`
- [ ] `src/modules/reportes/components/InformeItem.tsx` — ítem de informe con botones PDF/XLS/Enviar
- [ ] `src/modules/reportes/components/ReportePreview.tsx` — panel de vista previa con gráfico + KPIs
- [ ] `src/modules/reportes/ReportesPage.tsx` — 5 tabs, lista izquierda + preview derecha
- [ ] Verificar: `npm run build` sin errores

---

### FASE 11 — Auth & Permisos

**Objetivo:** Login y control de acceso por rol implementado.

Consultá: `docs/adrs/005-auth-roles.md`

- [ ] `src/store/authStore.ts` — store con login/logout, usuario y permisos
- [ ] `src/modules/auth/LoginPage.tsx` — formulario email/password, logo IPNEXT
- [ ] `src/components/layout/ProtectedRoute.tsx` — redirige a /login si no autenticado, respeta permisos por módulo
- [ ] Aplicar `<ProtectedRoute>` en todas las rutas del router
- [ ] `src/hooks/usePermiso.ts` — hook para verificar permisos en componentes
- [ ] Ocultar botones de escritura para sub-usuarios en lectura
- [ ] Verificar: `npm run build` sin errores, flujo login → dashboard funciona

---

### FASE 12 — Polish & Consistencia Final

**Objetivo:** App completa, consistente y sin errores.

- [ ] Revisión visual: todos los módulos usan el mismo Sidebar, TopBar y badges
- [ ] Responsive básico: sidebar colapsable en pantallas < 1024px
- [ ] Estados vacíos: cada tabla muestra mensaje cuando no hay datos
- [ ] Loading states: skeleton o spinner mientras carga (useQuery)
- [ ] Correr `npm run build` — CERO errores TypeScript
- [ ] Correr `npm run lint` — CERO warnings relevantes

---

## Criterio de Completion

La tarea está completa cuando:
1. `npm run build` termina sin errores
2. Los 8 módulos tienen todas sus vistas navegables
3. El tracker muestra todas las fases en estado `DONE`
4. La app levanta con `npm run dev` y se puede navegar entre todos los módulos

Cuando todo lo anterior sea verdad, outputeá exactamente:
<promise>IPNEXT_COMPLETE</promise>
