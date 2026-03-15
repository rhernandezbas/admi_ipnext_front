# TDR-001: Arquitectura de Componentes React

## Estado
Propuesto

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
    api.ts            # cliente base (fetch/axios)
    transferencias.service.ts
    nominas.service.ts
    ...
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

## Consecuencias
- Positivo: separación clara entre UI, lógica y datos.
- Positivo: facilita trabajar en un módulo sin romper otros.
- Negativo: más archivos que un enfoque monolítico — compensado por claridad.
