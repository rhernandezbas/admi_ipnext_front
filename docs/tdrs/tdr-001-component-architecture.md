# TDR-001: Arquitectura de Componentes React

## Estado
Implementado

## Contexto
IPNEXT Admin es una SPA en React con 8 módulos y ~29 vistas. Necesitamos definir cómo organizar los componentes para que sea mantenible, escalable y consistente con el design system del archivo Pencil.

## Decisión

### Estructura de carpetas

```
src/
  components/
    ui/               # Componentes atómicos reutilizables
      Badge.tsx
      Button.tsx
      Card.tsx
      Input.tsx
      Select.tsx
      Table.tsx
      KpiCard.tsx
      Tabs.tsx
      Avatar.tsx
    layout/           # Componentes estructurales
      Sidebar.tsx
      TopBar.tsx
      PageLayout.tsx
  modules/            # Un directorio por módulo de negocio
    dashboard/
      DashboardPage.tsx
      components/
        UrgentPaymentsTable.tsx
        ExpenseChart.tsx
        ActivityFeed.tsx
    transferencias/
      TransferenciasPage.tsx
      CalendarioPage.tsx
      RecurrentesPage.tsx
      NuevaTransferenciaPage.tsx
      components/
        TransferenciasTable.tsx
        TransferenciaForm.tsx
    nominas/
    proveedores/
    servicios/
    alquileres/
    tesoreria/
    reportes/
  hooks/              # Custom hooks por dominio
    useTransferencias.ts
    useNominas.ts
    ...
  services/           # Llamadas a la API REST
    api.ts            # cliente Axios con withCredentials + interceptor de envelope
    transferencias.service.ts
    nominas.service.ts
    ...
  lib/                # Utilidades transversales
    api.ts            # cliente Axios (withCredentials, envelope interceptor)
    formatters.ts     # formatARS / formatMillones / formatMiles — formato numérico defensivo
  store/              # Estado global (Context o Zustand)
    authStore.ts
    uiStore.ts
  types/              # Tipos TypeScript por dominio
    transferencia.types.ts
    empleado.types.ts
    ...
  router/
    index.tsx         # React Router v6
    routes.ts         # Definición de rutas
```

### Principios

1. **Componentes UI atómicos** en `components/ui/` — sin lógica de negocio, solo presentación.
2. **Componentes de módulo** en `modules/` — conocen el dominio, usan hooks.
3. **Custom hooks** encapsulan fetch + estado local por pantalla.
4. **Services** son funciones puras que llaman a la API — sin estado.
5. **Un archivo por componente** — no mezclar múltiples componentes en un archivo.
6. **Utilidades en `lib/`** — funciones puras reutilizables (formatters, helpers). Nunca llamar `.toLocaleString()` o `.toFixed()` directamente en componentes; usar siempre `formatARS`, `formatMillones` o `formatMiles` de `@/lib/formatters` para evitar crashes con valores `undefined`/`null` del backend.

## Tests

```
src/
  lib/__tests__/         # Tests del cliente API y utilidades (formatters, api.ts)
  services/__tests__/    # Tests de servicios por módulo
  store/__tests__/       # Tests del store de autenticación
  types/__tests__/       # Tests de tipos TypeScript (contratos de tipos)
```

- Framework de tests: **Vitest** + jsdom + `@testing-library/react`
- Mock HTTP: **axios-mock-adapter**
- Correr con: `npm test` (vitest run) o `npm run test:watch`

## Consecuencias
- Positivo: separación clara entre UI, lógica y datos.
- Positivo: facilita trabajar en un módulo sin romper otros.
- Negativo: más archivos que un enfoque monolítico — compensado por claridad.
