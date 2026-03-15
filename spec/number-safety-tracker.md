# Tracker: Number Safety Fix

> Spec: `spec/number-safety-spec.md`
> Metodología: TDD — test (red) → fix (green) → refactor

---

## FASE 1 — Crear utilidades de formato

### Paso 1.1 — Crear tests (RED)
- [x] Crear `src/lib/__tests__/formatters.test.ts`
- [x] Test: `formatARS(undefined)` → `'0'`
- [x] Test: `formatARS(null)` → `'0'`
- [x] Test: `formatARS(5000)` → `'5.000'`
- [x] Test: `formatARS('1500')` → `'1.500'`
- [x] Test: `formatARS(NaN)` → `'0'`
- [x] Test: `formatMillones(1_500_000)` → `'1.5M'`
- [x] Test: `formatMiles(45_000)` → `'45K'`
- [x] **Tests FALLARON (red)** ✅

### Paso 1.2 — Crear `src/lib/formatters.ts` (GREEN)
- [x] Implementar `formatARS`
- [x] Implementar `formatMillones`
- [x] Implementar `formatMiles`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 2 — Reemplazar en módulo Nóminas

### Paso 2.1 — EmpleadosTable.tsx
- [x] Importar `formatARS`, `formatMiles`, `formatFecha`
- [x] Reemplazar todos los `.toLocaleString` y `.toFixed` unsafe
- [x] `tsc` GREEN ✅

### Paso 2.2 — GuardiasTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 2.3 — CompensacionesTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar `.toLocaleString` unsafe (incluyendo `Math.abs(c.monto)`)
- [x] `tsc` GREEN ✅

---

## FASE 3 — Reemplazar en módulo Alquileres

### Paso 3.1 — PagosRecibosTable.tsx
- [x] Importar `formatARS`, `formatFecha`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 3.2 — ContratosAlquilerTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 3.3 — InmueblesTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

---

## FASE 4 — Reemplazar en módulo Dashboard

### Paso 4.1 — UrgentPaymentsTable.tsx
- [x] Importar `formatARS`, `formatFecha`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

---

## FASE 5 — Reemplazar en módulo Transferencias

### Paso 5.1 — TransferenciasTable.tsx
- [x] Importar `formatARS`, `formatFecha`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 5.2 — CalendarioView.tsx
- [x] Importar `formatARS`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 5.3 — RecurrentesTable.tsx
- [x] Importar `formatARS`, `formatFecha`
- [x] Reemplazar `.toLocaleString` unsafe
- [x] `tsc` GREEN ✅

### Paso 5.4 — NuevaTransferenciaForm.tsx
- [x] Sin `.toLocaleString` unsafe — no requirió cambios
- [x] `tsc` GREEN ✅

---

## FASE 6 — Reemplazar en módulo Tesorería

### Paso 6.1 — CuentasBancariasTable.tsx
- [x] Importar `formatARS`, `formatMillones`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 6.2 — ConciliacionTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 6.3 — ProyeccionesTable.tsx
- [x] Usa `Number(v ?? 0).toLocaleString` (ya guarded) — no requirió cambios
- [x] `tsc` GREEN ✅

### Paso 6.4 — FlujoCajaTable.tsx
- [x] Importar `formatARS`, `formatMillones`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

---

## FASE 7 — Reemplazar en módulo Proveedores

### Paso 7.1 — ProveedoresTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 7.2 — ProveedorDetailPanel.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 7.3 — ContratosTable.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 7.4 — RankingChart.tsx
- [x] Importar `formatARS`, `formatMiles`, `formatMillones`
- [x] Reemplazar unsafe + guard `.split()`
- [x] `tsc` GREEN ✅

---

## FASE 8 — Reemplazar en módulo Servicios

### Paso 8.1 — ResumenGeneral.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

### Paso 8.2 — ServiciosPage.tsx
- [x] Importar `formatARS`
- [x] Reemplazar unsafe
- [x] `tsc` GREEN ✅

---

## FASE 9 — Verificación final

- [x] Cero `.toLocaleString('es-AR')` sin guard en componentes ✅
- [x] `npm run test` → 81 tests pasan ✅
- [x] `tsc -p tsconfig.app.json --noEmit` → 0 errores ✅
- [x] Commit y push ✅

---

## Estado final

| Fase | Estado |
|------|--------|
| FASE 1 — formatters.ts | ✅ Completo |
| FASE 2 — Nóminas | ✅ Completo |
| FASE 3 — Alquileres | ✅ Completo |
| FASE 4 — Dashboard | ✅ Completo |
| FASE 5 — Transferencias | ✅ Completo |
| FASE 6 — Tesorería | ✅ Completo |
| FASE 7 — Proveedores | ✅ Completo |
| FASE 8 — Servicios | ✅ Completo |
| FASE 9 — Verificación final | ✅ Completo |
