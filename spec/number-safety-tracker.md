# Tracker: Number Safety Fix

> Spec: `spec/number-safety-spec.md`
> Metodología: TDD — test (red) → fix (green) → refactor

---

## FASE 1 — Crear utilidades de formato

### Paso 1.1 — Crear tests (RED)
- [ ] Crear `src/lib/__tests__/formatters.test.ts`
- [ ] Test: `formatARS(undefined)` → `'0'`
- [ ] Test: `formatARS(null)` → `'0'`
- [ ] Test: `formatARS(5000)` → `'5.000'`
- [ ] Test: `formatARS('1500')` → `'1.500'`
- [ ] Test: `formatARS(NaN)` → `'0'`
- [ ] Test: `formatMillones(1_500_000)` → `'1,5M'` ó `'1.5M'`
- [ ] Test: `formatMiles(45_000)` → `'45K'`
- [ ] **Tests FALLARON (red)** ✅

### Paso 1.2 — Crear `src/lib/formatters.ts` (GREEN)
- [ ] Implementar `formatARS`
- [ ] Implementar `formatMillones`
- [ ] Implementar `formatMiles`
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 2 — Reemplazar en módulo Nóminas

### Paso 2.1 — EmpleadosTable.tsx
- [ ] Importar `formatARS`, `formatMiles`
- [ ] Reemplazar todos los `.toLocaleString` y `.toFixed` unsafe
- [ ] `tsc` GREEN ✅

### Paso 2.2 — GuardiasTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 2.3 — CompensacionesTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe (incluyendo `Math.abs(c.monto)`)
- [ ] `tsc` GREEN ✅

---

## FASE 3 — Reemplazar en módulo Alquileres

### Paso 3.1 — PagosRecibosTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 3.2 — ContratosAlquilerTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 3.3 — InmueblesTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 4 — Reemplazar en módulo Dashboard

### Paso 4.1 — UrgentPaymentsTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 5 — Reemplazar en módulo Transferencias

### Paso 5.1 — TransferenciasTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 5.2 — CalendarioView.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 5.3 — RecurrentesTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

### Paso 5.4 — NuevaTransferenciaForm.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar `.toLocaleString` unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 6 — Reemplazar en módulo Tesorería

### Paso 6.1 — CuentasBancariasTable.tsx
- [ ] Importar `formatARS`, `formatMillones`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 6.2 — ConciliacionTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 6.3 — ProyeccionesTable.tsx
- [ ] Importar `formatARS`, `formatMillones`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 6.4 — FlujoCajaTable.tsx
- [ ] Importar `formatARS`, `formatMillones`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 7 — Reemplazar en módulo Proveedores

### Paso 7.1 — ProveedoresTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 7.2 — ProveedorDetailPanel.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 7.3 — ContratosTable.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 7.4 — RankingChart.tsx
- [ ] Importar `formatARS`, `formatMiles`, `formatMillones`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 8 — Reemplazar en módulo Servicios

### Paso 8.1 — ResumenGeneral.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

### Paso 8.2 — ServiciosPage.tsx
- [ ] Importar `formatARS`
- [ ] Reemplazar unsafe
- [ ] `tsc` GREEN ✅

---

## FASE 9 — Verificación final

- [ ] `grep -rn "\.toLocaleString('es-AR')" src/ --include="*.tsx"` → 0 resultados directos sin guard
- [ ] `npm run test` → todos los tests pasan
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [ ] Commit y push

---

## Estado final

| Fase | Estado |
|------|--------|
| FASE 1 — formatters.ts | ⬜ Pendiente |
| FASE 2 — Nóminas | ⬜ Pendiente |
| FASE 3 — Alquileres | ⬜ Pendiente |
| FASE 4 — Dashboard | ⬜ Pendiente |
| FASE 5 — Transferencias | ⬜ Pendiente |
| FASE 6 — Tesorería | ⬜ Pendiente |
| FASE 7 — Proveedores | ⬜ Pendiente |
| FASE 8 — Servicios | ⬜ Pendiente |
| FASE 9 — Verificación final | ⬜ Pendiente |
