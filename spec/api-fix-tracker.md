# API Fix Tracker — Frontend↔Backend Contract

> Spec completa: `docs/tdrs/tdr-003-frontend-api-contract.md`
> Backend endpoints de referencia: `administracion-backend/docs/tdrs/tdr-003-endpoints.md`
> Metodología: **TDD** — Escribir test (red) → corregir (green) → refactorizar

---

## FASE 1 — Auth & API Client (GAP-1 y GAP-2) ✅ COMPLETO

### Paso 1.1 — Test: `api.ts` envía cookie, no Bearer token
- [x] Crear `src/lib/__tests__/api.test.ts`
- [x] Test: NO debe agregarse header `Authorization`
- [x] Test: `withCredentials: true`
- [x] Test: interceptor desenvuelve `{ data: payload }` → `payload`
- [x] **Tests FALLARON (red)** ✅

### Paso 1.2 — Fix: reescribir `src/lib/api.ts`
- [x] `withCredentials: true`
- [x] Eliminar interceptor de request que leía `localStorage`
- [x] Interceptor de response que desenvuelve `{ data: ... }`
- [x] **Tests PASARON (green)** ✅

### Paso 1.3 — Test: `authService.login` no espera token en response
- [x] Crear `src/services/__tests__/auth.service.test.ts`
- [x] Test: `authService.login()` retorna usuario, sin campo `token`
- [x] **Tests PASARON (green)** ✅

### Paso 1.4 — Fix: `src/services/auth.service.ts`
- [x] `LoginResponse` sin campo `token`
- [x] **Tests PASARON (green)** ✅

### Paso 1.5 — Test: `authStore` no usa localStorage para token
- [x] Test: después de login, `localStorage.getItem('auth_token')` es null
- [x] Test: `store.token` no existe
- [x] **Tests FALLARON (red)** ✅

### Paso 1.6 — Fix: `src/store/authStore.ts`
- [x] Eliminar campo `token`, `setToken()`, y todo `localStorage` de auth
- [x] **Tests PASARON (green)** ✅

---

## FASE 2 — Tipos de Auth (GAP-3) ✅ COMPLETO

### Paso 2.1 — Test: `UserPermisos` es objeto, no array
- [x] Crear `src/types/__tests__/auth.types.test.ts`
- [x] **Tests PASARON (green)** ✅

### Paso 2.2 — Fix: `UserPermisos` y `User`
- [x] `UserPermisos` con propiedades por módulo
- [x] `User.rol: 'admin' | 'sub-usuario'`
- [x] **tsc GREEN** ✅

---

## FASE 3 — Tipos de Nóminas (GAP-4, GAP-5, GAP-6) ✅ COMPLETO

### Paso 3.1 — Tests `Empleado`
- [x] `sueldoBruto` (no `sueldoBase`), sin `netoMes`, sin `cargo`
- [x] **tsc FALLÓ (red)** ✅

### Paso 3.2 — Fix `Empleado`
- [x] `sueldoBruto`, `fechaIngreso`, `avatar?`; eliminar `cargo`, `netoMes`
- [x] Actualizar `EmpleadosTable.tsx`, `NominasPage.tsx`, `nominas.mock.ts`
- [x] **tsc GREEN** ✅

### Paso 3.3 — Fix `Guardia`
- [x] `empleadoId`, `fecha`, `horas`, `monto`; eliminar `turno`, `horasExtras`, `ausencias`
- [x] Actualizar `GuardiasTable.tsx`
- [x] **tsc GREEN** ✅

### Paso 3.4 — Fix `CompensacionTipo`
- [x] `'bono' | 'adelanto' | 'extra' | 'otro'`; `'rechazado'` en estado
- [x] Actualizar `CompensacionesTable.tsx`
- [x] **tsc GREEN** ✅

---

## FASE 4 — Tipos de Alquileres (GAP-7) ✅ COMPLETO

### Paso 4.1 — Tests `ContratoAlquiler`
- [x] `ajusteFrecuencia`, `montoMensual`, `inmuebleId`
- [x] **tsc FALLÓ (red)** ✅

### Paso 4.2 — Fix `ContratoAlquiler` y `PagoAlquiler`
- [x] Renombrar campos; actualizar `ContratosAlquilerTable.tsx`, `PagosRecibosTable.tsx`, `alquileres.mock.ts`
- [x] **tsc GREEN** ✅

---

## FASE 5 — Verificación campos Dashboard (GAP-8) ✅ COMPLETO

### Paso 5.1 — Analizar structs Go del backend
- [x] Leer handlers y use cases del backend para obtener json tags reales
- [x] `/kpis` retorna objeto único `{ totalPagosMes, pagosPendientes, pagosVencidos, flujoCajaMes, totalEmpleados, costoNominaMes }`
- [x] `/pagos-urgentes` retorna `[{ id, beneficiario, monto, moneda, fechaPago, estado, categoria }]`
- [x] `/distribucion-egresos` retorna `[{ categoria, monto, porcentaje }]`
- [x] `/actividad-reciente` retorna `[]` (placeholder v1)

### Paso 5.2 — Tests dashboard service (RED)
- [x] Crear `src/services/__tests__/dashboard.service.test.ts`
- [x] Test: `getKpis()` transforma objeto backend en `Kpi[]` para UI
- [x] Test: `getPagosUrgentes()` retorna campos en español
- [x] Test: `getDistribucionEgresos()` retorna `{ categoria, monto, porcentaje }`
- [x] **Tests FALLARON (red)** ✅

### Paso 5.3 — Fix dashboard types y service
- [x] Agregar `KpisBackend`, `PagoUrgente`, `DistribucionEgreso`, `ActividadItem` a `dashboard.types.ts`
- [x] `dashboardService.getKpis()` transforma `KpisBackend` → `Kpi[]` via `transformKpis()`
- [x] Actualizar `UrgentPaymentsTable.tsx` con `PagoUrgente`
- [x] Actualizar `ActivityFeed.tsx` con `ActividadItem`
- [x] Actualizar `ExpenseChart.tsx` con `DistribucionEgreso`
- [x] **Tests PASARON (green)** ✅
- [x] **tsc GREEN** ✅

---

## FASE 6 — Integración y smoke test ✅ COMPLETO

### Paso 6.1 — Tests de integración flujo de login
- [x] Crear `src/services/__tests__/auth.integration.test.ts`
- [x] Test: login → backend retorna usuario → store autenticado, sin token en localStorage
- [x] Test: login fallido → store limpio, retorna false
- [x] Test: `authService.me()` retorna usuario con permisos correctos
- [x] Test: requests no incluyen `Authorization` header
- [x] Test: `api.withCredentials === true`
- [x] Test: logout → store limpio
- [x] Test: logout falla en backend → store limpio igual (finally)
- [x] **Tests PASARON (green)** ✅

### Paso 6.2 — Smoke test manual en browser
- [ ] Login funciona sin errores de 401 *(requiere backend corriendo)*
- [ ] Dashboard carga KPIs reales *(requiere backend corriendo)*
- [ ] Módulo Alquileres muestra datos reales *(requiere backend corriendo)*
- [ ] Módulo Nóminas carga empleados, guardias, compensaciones *(requiere backend corriendo)*
- [ ] Logout invalida la sesión *(requiere backend corriendo)*

> ⚠️ El smoke test manual (6.2) requiere el backend corriendo en `http://localhost:8288`.

---

## Estado final

| Gap | Severidad | Estado |
|-----|-----------|--------|
| GAP-1: Auth httpOnly cookie | 🔴 CRÍTICO | ✅ Resuelto |
| GAP-2: Response envelope | 🔴 CRÍTICO | ✅ Resuelto |
| GAP-3: permisos tipo | 🟡 MEDIO | ✅ Resuelto |
| GAP-4: Empleado campos | 🟡 MEDIO | ✅ Resuelto |
| GAP-5: Guardia campos | 🟡 MEDIO | ✅ Resuelto |
| GAP-6: CompensacionTipo | 🟡 MEDIO | ✅ Resuelto |
| GAP-7: ContratoAlquiler campos | 🟡 MEDIO | ✅ Resuelto |
| GAP-8: Dashboard fields | 🟠 VERIFICADO | ✅ Resuelto (sin backend real — inferido de structs Go) |

---

## Tests finales

```
Test Files  8 passed (8)
Tests       39 passed (39)
tsc         0 errors
```

---

## Notas

- El smoke test 6.2 requiere `docker compose up` en `administracion-backend/` y backend en `localhost:8288`.
- Proxy Vite: confirmar que `vite.config.ts` tiene `server.proxy['/api/v1'] → 'http://localhost:8288'`.
- Cookie `Secure: false` en desarrollo HTTP. Producción requiere HTTPS.
