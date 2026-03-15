# Spec: Number Safety — Defensive Formatting

## Problema

En producción los campos numéricos que llegan del backend pueden ser `undefined`, `null`
o incluso `string` (serialización JSON laxa). Cuando un componente llama directamente
`value.toLocaleString('es-AR')` sobre un valor `undefined`, se lanza:

```
TypeError: Cannot read properties of undefined (reading 'toLocaleString')
```

Esto rompe el render de casi todas las páginas.

## Solución

### 1. Crear `src/lib/formatters.ts`

```typescript
/** Formatea un número como moneda ARS. Devuelve '0' si el valor no es un número válido. */
export function formatARS(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : n.toLocaleString('es-AR')
}

/** Formatea como millones: "$1.2M" */
export function formatMillones(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : `${(n / 1_000_000).toFixed(1)}M`
}

/** Formatea como miles: "$45K" */
export function formatMiles(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : `${(n / 1_000).toFixed(0)}K`
}
```

### 2. Reemplazar todos los usos inseguros en `.tsx` / `.ts`

Patrón inseguro → patrón seguro:

| Antes | Después |
|-------|---------|
| `x.toLocaleString('es-AR')` | `formatARS(x)` |
| `Math.abs(x).toLocaleString('es-AR')` | `formatARS(Math.abs(x ?? 0))` |
| `(x / 1_000_000).toFixed(1)M` | `formatMillones(x)` |
| `(x / 1_000).toFixed(0)K` | `formatMiles(x)` |

### 3. Tests unitarios para `formatters.ts`

- `formatARS(undefined)` → `'0'`
- `formatARS(null)` → `'0'`
- `formatARS(5000)` → `'5.000'` (locale es-AR)
- `formatARS('1500')` → `'1.500'`
- `formatARS(NaN)` → `'0'`
- `formatMillones(1_500_000)` → `'1.5M'`
- `formatMiles(45_000)` → `'45K'`

## Archivos afectados (59 ocurrencias en ~20 archivos)

- `src/modules/alquileres/components/PagosRecibosTable.tsx`
- `src/modules/alquileres/components/ContratosAlquilerTable.tsx`
- `src/modules/alquileres/components/InmueblesTable.tsx`
- `src/modules/tesoreria/components/CuentasBancariasTable.tsx`
- `src/modules/tesoreria/components/ConciliacionTable.tsx`
- `src/modules/tesoreria/components/ProyeccionesTable.tsx`
- `src/modules/tesoreria/components/FlujoCajaTable.tsx`
- `src/modules/servicios/components/ResumenGeneral.tsx`
- `src/modules/servicios/ServiciosPage.tsx`
- `src/modules/transferencias/components/TransferenciasTable.tsx`
- `src/modules/transferencias/components/CalendarioView.tsx`
- `src/modules/transferencias/components/RecurrentesTable.tsx`
- `src/modules/transferencias/components/NuevaTransferenciaForm.tsx`
- `src/modules/dashboard/components/UrgentPaymentsTable.tsx`
- `src/modules/proveedores/components/RankingChart.tsx`
- `src/modules/proveedores/components/ContratosTable.tsx`
- `src/modules/proveedores/components/ProveedorDetailPanel.tsx`
- `src/modules/proveedores/components/ProveedoresTable.tsx`
- `src/modules/nominas/components/CompensacionesTable.tsx`
- `src/modules/nominas/components/GuardiasTable.tsx`
- `src/modules/nominas/components/EmpleadosTable.tsx`

## Criterio de completitud

- [ ] `src/lib/formatters.ts` existe con las 3 funciones
- [ ] Tests unitarios en `src/lib/__tests__/formatters.test.ts` — todos PASANDO
- [ ] Cero llamadas directas a `.toLocaleString('es-AR')` en componentes (salvo las ya protegidas con `Number(v ?? 0)`)
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [ ] `npm run test` → todos los tests pasan
