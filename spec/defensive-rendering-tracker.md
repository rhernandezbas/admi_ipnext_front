# Tracker: Defensive Rendering + Contract Gaps v2

> Spec: `spec/defensive-rendering-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc

---

## FASE 1 — `formatFecha` en formatters.ts

### Paso 1.1 — Tests (RED)
- [ ] Agregar en `src/lib/__tests__/formatters.test.ts`:
  - `formatFecha(undefined)` → `'—'`
  - `formatFecha(null)` → `'—'`
  - `formatFecha('')` → `'—'`
  - `formatFecha('2026-03-15T00:00:00Z')` → string con formato DD/MM/YYYY
  - `formatFecha('texto-no-fecha')` → devuelve el string tal cual (fallback)
- [ ] **Tests FALLARON (red)** ✅

### Paso 1.2 — Implementar `formatFecha` (GREEN)
- [ ] Agregar `formatFecha` a `src/lib/formatters.ts`
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 2 — GAP-A: Avatar null safety

### Paso 2.1 — Tests de componente `Avatar` (RED)
- [ ] Crear `src/components/ui/__tests__/Avatar.test.tsx`
  - Render con `name={undefined}` → no crashea, muestra `'?'`
  - Render con `name={null}` → no crashea, muestra `'?'`
  - Render con `name={''}` → no crashea, muestra `'?'`
  - Render con `name={'Juan Perez'}` → muestra `'JP'`
  - Render con `name={'Ana'}` → muestra `'A'`
- [ ] **Tests FALLARON (red)** ✅

### Paso 2.2 — Fix `Avatar.tsx` (GREEN)
- [ ] Guard `(name ?? '')` antes de `.split(' ')`
- [ ] Fallback `'?'` si string vacío
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 3 — GAP-B: RankingChart `.split()` null safety

### Paso 3.1 — Tests (RED)
- [ ] Crear `src/modules/proveedores/components/__tests__/RankingChart.test.tsx`
  - Render con `ranking=[{proveedor: undefined, totalPagado: 0, ...}]` → no crashea
  - Render con `ranking=[]` → muestra estado vacío sin crash
- [ ] **Tests FALLARON (red)** ✅

### Paso 3.2 — Fix `RankingChart.tsx` (GREEN)
- [ ] Guard `(r.proveedor ?? '').split(' ')`
- [ ] Guard `(mayorProveedor ?? '').split(' ')`
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 4 — GAP-C: Maps de estado sin fallback

### Paso 4.1 — Tests `TransferenciasTable` (RED)
- [ ] Crear `src/modules/transferencias/components/__tests__/TransferenciasTable.test.tsx`
  - Render con `estado='valor_desconocido'` → no crashea
  - Render con `estado=undefined` → no crashea, muestra badge neutral
  - Render con todos los estados válidos → renderiza correctamente

### Paso 4.2 — Tests `RecurrentesTable` (RED)
- [ ] Crear `src/modules/transferencias/components/__tests__/RecurrentesTable.test.tsx`
  - Mismo patrón: estado desconocido → no crashea

### Paso 4.3 — Tests `ContratosTable` proveedores (RED)
- [ ] Crear `src/modules/proveedores/components/__tests__/ContratosTable.test.tsx`
  - `estado='proximo_a_vencer'` → renderiza badge correcto (no crashea)
  - `estado=undefined` → no crashea
- [ ] **Tests FALLARON (red)** ✅

### Paso 4.4 — Fix maps con fallback (GREEN)
- [ ] `TransferenciasTable.tsx`: `const badge = map[estado] ?? { variant: 'neutral', label: estado ?? '—' }`
- [ ] `RecurrentesTable.tsx`: misma corrección
- [ ] `CalendarioView.tsx`: `estadoChipColor[estado] ?? 'bg-gray-100 text-gray-600'`
- [ ] `CompensacionesTable.tsx`: fallback en `tipoLabel`
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 5 — GAP-D: `ContratoEstado` = `'proximo_a_vencer'`

### Paso 5.1 — Tests (RED)
- [ ] Crear `src/modules/proveedores/components/__tests__/ContratosTable.test.tsx` (si no existe)
  - `estado='proximo_a_vencer'` → badge "Próximo a v." (no badge vacío)
- [ ] **Test FALLÓ (red)** ✅

### Paso 5.2 — Fix tipo y componente (GREEN)
- [ ] `src/types/proveedor.types.ts`: cambiar `'proximo_vencer'` → `'proximo_a_vencer'`
- [ ] `ContratosTable.tsx`: actualizar key del map a `'proximo_a_vencer'`
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 6 — GAP-E: `Inmueble.alquilerMensual`

### Paso 6.1 — Tests (RED)
- [ ] Agregar en `src/types/__tests__/alquiler.types.test.ts`:
  - `inmueble.alquilerMensual` existe (no `alquilerMes`)
  - `(inmueble as any).alquilerMes` → undefined
- [ ] **tsc FALLÓ (red)** ✅

### Paso 6.2 — Fix tipo + componente (GREEN)
- [ ] `src/types/alquiler.types.ts`: `alquilerMes` → `alquilerMensual`
- [ ] `src/modules/alquileres/components/InmueblesTable.tsx`: actualizar referencia
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 7 — GAP-F y GAP-G: `CuentaBancaria.saldoActual` + `activa`

### Paso 7.1 — Tests (RED)
- [ ] Crear `src/types/__tests__/tesoreria.types.test.ts`:
  - `cuenta.saldoActual` existe (no `saldo`)
  - `cuenta.activa` es boolean (no `estado`)
  - `(cuenta as any).saldo` → undefined
  - `(cuenta as any).estado` → undefined
- [ ] **tsc FALLÓ (red)** ✅

### Paso 7.2 — Fix tipo (GREEN)
- [ ] `src/types/tesoreria.types.ts`: `saldo` → `saldoActual`, `estado: 'activo'|'inactivo'` → `activa: boolean`
- [ ] `src/modules/tesoreria/components/CuentasBancariasTable.tsx`: actualizar referencias
- [ ] `src/modules/tesoreria/components/FlujoCajaTable.tsx`: actualizar referencias
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 8 — GAP-H: `Servicio.costoMensual`

### Paso 8.1 — Tests (RED)
- [ ] Crear `src/types/__tests__/servicio.types.test.ts`:
  - `servicio.costoMensual` existe (no `montoMensual`)
  - `(servicio as any).montoMensual` → undefined
- [ ] **tsc FALLÓ (red)** ✅

### Paso 8.2 — Fix tipo + componentes (GREEN)
- [ ] `src/types/servicio.types.ts`: `montoMensual` → `costoMensual`
- [ ] `src/modules/servicios/ServiciosPage.tsx`: `s.montoMensual` → `s.costoMensual`
- [ ] `src/modules/servicios/components/ResumenGeneral.tsx`: actualizar
- [ ] Mock de servicios (`servicios.mock.ts` si existe): actualizar
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 9 — GAP-I: `Transferencia.tipo` derivado de `frecuencia`

### Paso 9.1 — Tests del servicio (RED)
- [ ] Agregar en `src/services/__tests__/` tests para `transferenciasService`:
  - Cuando backend devuelve `frecuencia: 'mensual'` → item tiene `tipo: 'recurrente'`
  - Cuando backend devuelve `frecuencia: 'manual'` → item tiene `tipo: 'manual'`
  - Cuando backend devuelve `frecuencia: 'automatico'` (si aplica) → `tipo: 'automatico'`
- [ ] **Tests FALLARON (red)** ✅

### Paso 9.2 — Fix: crear/actualizar `transferencias.service.ts` (GREEN)
- [ ] Verificar que existe `src/services/transferencias.service.ts`
- [ ] Mapear `tipo` desde `frecuencia`: `frecuencia !== 'manual' ? 'recurrente' : 'manual'`
- [ ] `RecurrentesTable` filtra por `t.frecuencia !== 'manual'` (o por `t.tipo === 'recurrente'`)
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 10 — GAP-J: `Transferencia.fechaProximoPago` + fechas RFC3339

### Paso 10.1 — Tests (RED)
- [ ] Tests en `transferencias.service` o `formatters`:
  - `fechaProximoPago` mapeado desde `fechaVencimiento ?? fechaPago`
  - `formatFecha('2026-03-15T00:00:00Z')` → `'15/03/2026'`
- [ ] **Tests FALLARON (red)** ✅

### Paso 10.2 — Fix (GREEN)
- [ ] Mapear `fechaProximoPago = fechaVencimiento ?? fechaPago` en el servicio
- [ ] Usar `formatFecha()` en `TransferenciasTable`, `RecurrentesTable`, `CalendarioView`
  para mostrar `fechaProximoPago`, `fechaPago`, `fechaVencimiento`
- [ ] Usar `formatFecha()` también en `PagosRecibosTable`, `EmpleadosTable` (fechaIngreso)
- [ ] **Tests PASARON (green)** ✅
- [ ] `tsc` GREEN ✅

---

## FASE 11 — GAP-K: `VencimientosTable` y otros con fechas RFC3339

### Paso 11.1 — Verificación
- [ ] Buscar todas las columnas de fecha en todos los módulos que muestran strings crudas
- [ ] Reemplazar con `formatFecha()`
- [ ] `tsc` GREEN ✅

---

## FASE 12 — Verificación final

- [ ] `npm run test` → todos los tests pasan
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [ ] `grep -rn "\.split(" src/ --include="*.tsx" | grep -v "??\|safeName\|safe"` → 0 resultados sin guard
- [ ] `grep -rn "map\[estado\]\|map\[tipo\]" src/ --include="*.tsx"` → 0 accesos sin fallback
- [ ] Commit y push

---

## Estado

| Gap | Descripción | Estado |
|-----|-------------|--------|
| GAP-A | Avatar null safety | ⬜ Pendiente |
| GAP-B | RankingChart split guard | ⬜ Pendiente |
| GAP-C | Maps de estado con fallback | ⬜ Pendiente |
| GAP-D | ContratoEstado proximo_a_vencer | ⬜ Pendiente |
| GAP-E | Inmueble.alquilerMensual | ⬜ Pendiente |
| GAP-F/G | CuentaBancaria saldoActual + activa | ⬜ Pendiente |
| GAP-H | Servicio.costoMensual | ⬜ Pendiente |
| GAP-I | Transferencia.tipo desde frecuencia | ⬜ Pendiente |
| GAP-J | fechaProximoPago + formatFecha | ⬜ Pendiente |
| GAP-K | Fechas RFC3339 en todos los módulos | ⬜ Pendiente |
| FASE 1 | formatFecha en formatters.ts | ⬜ Pendiente |
| FASE 12 | Verificación final | ⬜ Pendiente |
