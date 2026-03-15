# TDR-003: Contrato Frontend↔API — Gaps y Correcciones

## Estado
Implementado — GAP-1 a GAP-7 resueltos. GAP-8 pendiente de verificación con backend real.

## Contexto

El backend tiene 48 endpoints verificados en producción (ver `administracion-backend/docs/tdrs/tdr-003-endpoints.md`).
El frontend consume esos endpoints a través de servicios Axios + TanStack Query.
Este TDR documenta las discrepancias detectadas entre el contrato real del backend y la implementación original del frontend, y cómo fueron corregidas con TDD.

---

## Contrato del Backend

- **Base URL:** `http://localhost:8288/api/v1` (proxied vía Vite como `/api/v1`)
- **Auth:** JWT en cookie `token` (HttpOnly, Max-Age 8h). El backend **no devuelve el token en el body**.
- **Response envelope:** Todas las respuestas exitosas usan `{ "data": <payload> }`.
- **Formato de fechas en request:** `YYYY-MM-DD`
- **Formato de fechas en response:** RFC3339 (`2026-03-15T00:00:00Z`)
- **Campos en response:** camelCase en español (json tags del Go struct).

---

## Gaps Resueltos

### GAP-1 ✅ — Mecanismo de Autenticación

**Problema original:** `api.ts` leía `auth_token` de `localStorage` y lo enviaba como `Authorization: Bearer`. El backend usa httpOnly cookie — todos los requests autenticados fallaban con 401.

**Corrección aplicada en `src/lib/api.ts`:**
- Agregado `withCredentials: true`
- Eliminado interceptor de request que leía `localStorage`
- Eliminado `setToken()` y campo `token` de `authStore`
- `authStore` ya no toca `localStorage` para tokens

---

### GAP-2 ✅ — Response Envelope no desenvuelto

**Problema original:** Backend retorna `{ "data": payload }`. Los servicios hacían `r.data` y obtenían el wrapper en vez del contenido.

**Corrección aplicada:** Interceptor de response en `src/lib/api.ts`:
```typescript
api.interceptors.response.use((response) => {
  if (
    response.data !== null &&
    typeof response.data === 'object' &&
    'data' in response.data &&
    Object.keys(response.data).length === 1
  ) {
    response.data = response.data.data
  }
  return response
})
```
Todos los servicios siguen usando `.then(r => r.data)` sin cambios — el interceptor es transparente.

---

### GAP-3 ✅ — `UserPermisos` tipo incorrecto

**Problema original:** `permisos: string[]` en frontend. Backend usa un objeto por módulo.

**Corrección en `src/store/authStore.ts`:**
```typescript
export interface UserPermisos {
  dashboard?: boolean
  transferencias?: 'lectura' | 'escritura' | 'ninguno'
  nominas?: 'lectura' | 'escritura' | 'ninguno'
  proveedores?: 'lectura' | 'escritura' | 'ninguno'
  servicios?: 'lectura' | 'escritura' | 'ninguno'
  alquileres?: 'lectura' | 'escritura' | 'ninguno'
  tesoreria?: 'lectura' | 'escritura' | 'ninguno'
  reportes?: 'lectura' | 'escritura' | 'ninguno'
}
```

---

### GAP-4 ✅ — Campos de `Empleado` no coincidían con backend

| Campo anterior | Campo correcto | Nota |
|---|---|---|
| `sueldoBase` | `sueldoBruto` | Renombrado |
| `netoMes` | — eliminado | No existe en empleados; está en `liquidaciones.netoAPagar` |
| `cargo` | — eliminado | Backend solo tiene `puesto` y `area` |
| — | `fechaIngreso: string` | Agregado |
| — | `avatar?: string` | Agregado |

---

### GAP-5 ✅ — `Guardia` tenía campos inexistentes en backend

**Campos eliminados:** `turno`, `hsTrabajadas`, `horasExtras`, `ausencias`, `estado`, `nombre`

**Tipo correcto:**
```typescript
export interface Guardia {
  id: string
  empleadoId: string
  empleadoNombre?: string
  fecha: string
  horas: number
  monto: number
}
```

---

### GAP-6 ✅ — `CompensacionTipo` no coincidía con backend

| Anterior | Correcto |
|---|---|
| `'vacaciones' \| 'bono_productividad' \| 'adelanto_sueldo'` | `'bono' \| 'adelanto' \| 'extra' \| 'otro'` |
| `'en_cuotas'` (en estado) | `'rechazado'` |

---

### GAP-7 ✅ — Campos de `ContratoAlquiler` no coincidían

| Campo anterior | Campo correcto |
|---|---|
| `ajuste` | `ajusteFrecuencia` |
| `alquilerMensual` | `montoMensual` |
| `inmueble: string` | `inmuebleId: string` + `inmuebleNombre?: string` |

También corregido `PagoAlquiler`: `inmueble: string` → `inmuebleId: string` + `inmuebleNombre?: string`; `fechaPago` ahora es opcional.

---

## Gap Pendiente

### GAP-8 🟠 — Campos de respuesta del Dashboard

Los tipos de dashboard (`UrgentPayment`, `ActivityItem`, `Kpi`) usan nombres en inglés. Requiere verificar contra el backend real corriendo en `localhost:8288` para confirmar si los campos coinciden o necesitan mapeo.

---

## Tests

```
Test Files  6 passed
Tests       28 passed
tsc         0 errors
```

Archivos de test: `src/lib/__tests__/`, `src/services/__tests__/`, `src/store/__tests__/`, `src/types/__tests__/`
