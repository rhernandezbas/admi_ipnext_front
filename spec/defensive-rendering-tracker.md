# Tracker: Defensive Rendering + Contract Gaps v2

> Spec: `spec/defensive-rendering-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc

---

## FASE 1 — `formatFecha` en formatters.ts

### Paso 1.1 — Tests (RED)
- [x] Agregar en `src/lib/__tests__/formatters.test.ts`:
  - `formatFecha(undefined)` → `'—'`
  - `formatFecha(null)` → `'—'`
  - `formatFecha('')` → `'—'`
  - `formatFecha('2026-03-15T00:00:00Z')` → string con formato DD/MM/YYYY
  - `formatFecha('texto-no-fecha')` → devuelve el string tal cual (fallback)
- [x] **Tests FALLARON (red)** ✅

### Paso 1.2 — Implementar `formatFecha` (GREEN)
- [x] Agregar `formatFecha` a `src/lib/formatters.ts`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 2 — GAP-A: Avatar null safety

### Paso 2.1 — Tests de componente `Avatar` (RED)
- [x] Crear `src/components/ui/__tests__/Avatar.test.tsx`
  - Render con `name={undefined}` → no crashea, muestra `'?'`
  - Render con `name={null}` → no crashea, muestra `'?'`
  - Render con `name={''}` → no crashea, muestra `'?'`
  - Render con `name={'Juan Perez'}` → muestra `'JP'`
  - Render con `name={'Ana'}` → muestra `'A'`
- [x] **Tests FALLARON (red)** ✅

### Paso 2.2 — Fix `Avatar.tsx` (GREEN)
- [x] Guard `(name ?? '')` antes de `.split(' ')`
- [x] Fallback `'?'` si string vacío
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 3 — GAP-B: RankingChart `.split()` null safety

### Paso 3.1 — Tests (RED)
- [x] Crear `src/modules/proveedores/components/__tests__/RankingChart.test.tsx`
  - Render con `ranking=[{proveedor: undefined, totalPagado: 0, ...}]` → no crashea
  - Render con `ranking=[]` → muestra estado vacío sin crash
- [x] **Tests FALLARON (red)** ✅

### Paso 3.2 — Fix `RankingChart.tsx` (GREEN)
- [x] Guard `(r.proveedor ?? '').split(' ')`
- [x] Guard `(mayorProveedor ?? '').split(' ')`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 4 — GAP-C: Maps de estado sin fallback

### Paso 4.1 — Tests `TransferenciasTable` (RED)
- [x] Crear `src/modules/transferencias/components/__tests__/TransferenciasTable.test.tsx`
  - Render con `estado='valor_desconocido'` → no crashea
  - Render con `estado=undefined` → no crashea, muestra badge neutral
  - Render con todos los estados válidos → renderiza correctamente

### Paso 4.2 — Tests `RecurrentesTable` (RED)
- [x] Crear `src/modules/transferencias/components/__tests__/RecurrentesTable.test.tsx`
  - Mismo patrón: estado desconocido → no crashea

### Paso 4.3 — Tests `ContratosTable` proveedores (RED)
- [x] Crear `src/modules/proveedores/components/__tests__/ContratosTable.test.tsx`
  - `estado='proximo_a_vencer'` → renderiza badge correcto (no crashea)
  - `estado=undefined` → no crashea
- [x] **Tests FALLARON (red)** ✅

### Paso 4.4 — Fix maps con fallback (GREEN)
- [x] `TransferenciasTable.tsx`: `const badge = map[estado] ?? { variant: 'neutral', label: estado ?? '—' }`
- [x] `RecurrentesTable.tsx`: misma corrección
- [x] `CalendarioView.tsx`: `estadoChipColor[estado] ?? 'bg-gray-100 text-gray-600'`
- [x] `CompensacionesTable.tsx`: fallback en `tipoLabel`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 5 — GAP-D: `ContratoEstado` = `'proximo_a_vencer'`

### Paso 5.1 — Tests (RED)
- [x] Crear `src/modules/proveedores/components/__tests__/ContratosTable.test.tsx` (si no existe)
  - `estado='proximo_a_vencer'` → badge "Próximo a v." (no badge vacío)
- [x] **Test FALLÓ (red)** ✅

### Paso 5.2 — Fix tipo y componente (GREEN)
- [x] `src/types/proveedor.types.ts`: cambiar `'proximo_vencer'` → `'proximo_a_vencer'`
- [x] `ContratosTable.tsx`: actualizar key del map a `'proximo_a_vencer'`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 6 — GAP-E: `Inmueble.alquilerMensual`

### Paso 6.1 — Tests (RED)
- [x] Agregar en `src/types/__tests__/alquiler.types.test.ts`:
  - `inmueble.alquilerMensual` existe (no `alquilerMes`)
  - `(inmueble as any).alquilerMes` → undefined
- [x] **tsc FALLÓ (red)** ✅

### Paso 6.2 — Fix tipo + componente (GREEN)
- [x] `src/types/alquiler.types.ts`: `alquilerMes` → `alquilerMensual`
- [x] `src/modules/alquileres/components/InmueblesTable.tsx`: actualizar referencia
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 7 — GAP-F y GAP-G: `CuentaBancaria.saldoActual` + `activa`

### Paso 7.1 — Tests (RED)
- [x] Crear `src/types/__tests__/tesoreria.types.test.ts`:
  - `cuenta.saldoActual` existe (no `saldo`)
  - `cuenta.activa` es boolean (no `estado`)
  - `(cuenta as any).saldo` → undefined
  - `(cuenta as any).estado` → undefined
- [x] **tsc FALLÓ (red)** ✅

### Paso 7.2 — Fix tipo (GREEN)
- [x] `src/types/tesoreria.types.ts`: `saldo` → `saldoActual`, `estado: 'activo'|'inactivo'` → `activa: boolean`
- [x] `src/modules/tesoreria/components/CuentasBancariasTable.tsx`: actualizar referencias
- [x] `src/modules/tesoreria/components/FlujoCajaTable.tsx`: actualizar referencias
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 8 — GAP-H: `Servicio.costoMensual`

### Paso 8.1 — Tests (RED)
- [x] Crear `src/types/__tests__/servicio.types.test.ts`:
  - `servicio.costoMensual` existe (no `montoMensual`)
  - `(servicio as any).montoMensual` → undefined
- [x] **tsc FALLÓ (red)** ✅

### Paso 8.2 — Fix tipo + componentes (GREEN)
- [x] `src/types/servicio.types.ts`: `montoMensual` → `costoMensual`
- [x] `src/modules/servicios/ServiciosPage.tsx`: `s.montoMensual` → `s.costoMensual`
- [x] `src/modules/servicios/components/ResumenGeneral.tsx`: actualizar
- [x] Mock de servicios (`servicios.mock.ts`): actualizar
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 9 — GAP-I: `Transferencia.tipo` derivado de `frecuencia`

### Paso 9.1 — Tests del servicio (RED)
- [x] Agregar en `src/services/__tests__/transferencias.service.test.ts`:
  - `frecuencia: 'mensual'` → `deriveTipo()` retorna `'recurrente'`
  - `frecuencia: 'semanal'` → `deriveTipo()` retorna `'recurrente'`
  - `frecuencia: 'unica'` → `deriveTipo()` retorna `'manual'`
  - `frecuencia: undefined` → `deriveTipo()` retorna `'manual'`
- [x] **Tests FALLARON (red)** ✅

### Paso 9.2 — Fix: crear/actualizar `transferencias.service.ts` (GREEN)
- [x] Exportar `deriveTipo(frecuencia)` desde `transferencias.service.ts`
- [x] Mapear: `frecuencia && frecuencia !== 'unica' ? 'recurrente' : 'manual'`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 10 — GAP-J: `Transferencia.fechaProximoPago` + fechas RFC3339

### Paso 10.1 — Tests (RED)
- [x] Tests en `formatters`: `formatFecha('2026-03-15T12:00:00Z')` → `'15/03/2026'`
- [x] **Tests FALLARON (red)** ✅

### Paso 10.2 — Fix (GREEN)
- [x] Usar `formatFecha()` en `TransferenciasTable` para `fechaProximoPago`
- [x] Usar `formatFecha()` en `RecurrentesTable` para `fechaProximoPago`
- [x] Usar `formatFecha()` en `PagosRecibosTable` para `fechaPago`
- [x] Usar `formatFecha()` en `UrgentPaymentsTable` para `fechaPago`
- [x] Usar `formatFecha()` en `EmpleadosTable` para `fechaIngreso`
- [x] **Tests PASARON (green)** ✅
- [x] `tsc` GREEN ✅

---

## FASE 11 — GAP-K: `VencimientosTable` y otros con fechas RFC3339

### Paso 11.1 — Verificación
- [x] Buscar todas las columnas de fecha en todos los módulos que muestran strings crudas
- [x] Reemplazar con `formatFecha()` en `VencimientosTable` para `fechaVencimiento`
- [x] `tsc` GREEN ✅

---

## FASE 12 — Verificación final

- [x] `npm run test` → 81 tests pasan
- [x] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [x] Cero `.split()` sin guard en componentes
- [x] Cero `map[estado]` sin fallback `??`
- [x] Commit y push ✅

---

## Estado

| Gap | Descripción | Estado |
|-----|-------------|--------|
| GAP-A | Avatar null safety | ✅ Completo |
| GAP-B | RankingChart split guard | ✅ Completo |
| GAP-C | Maps de estado con fallback | ✅ Completo |
| GAP-D | ContratoEstado proximo_a_vencer | ✅ Completo |
| GAP-E | Inmueble.alquilerMensual | ✅ Completo |
| GAP-F/G | CuentaBancaria saldoActual + activa | ✅ Completo |
| GAP-H | Servicio.costoMensual | ✅ Completo |
| GAP-I | Transferencia.tipo desde frecuencia | ✅ Completo |
| GAP-J | fechaProximoPago + formatFecha | ✅ Completo |
| GAP-K | Fechas RFC3339 en todos los módulos | ✅ Completo |
| FASE 1 | formatFecha en formatters.ts | ✅ Completo |
| FASE 12 | Verificación final | ✅ Completo |
