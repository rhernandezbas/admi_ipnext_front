# TDR-003: Contrato Frontend↔API — Análisis de Gaps y Especificación de Correcciones

## Estado
En revisión — 7 gaps identificados, pendientes de corrección

## Contexto

El backend tiene 48 endpoints verificados en producción (ver `administracion-backend/docs/tdrs/tdr-003-endpoints.md`).
El frontend consume esos endpoints a través de servicios Axios + TanStack Query.
Este TDR documenta **las discrepancias detectadas** entre el contrato real del backend y la implementación del frontend, y especifica **cómo deben corregirse** usando TDD.

---

## Referencia: Contrato del Backend

- **Base URL:** `http://localhost:8288/api/v1` (proxied vía Vite como `/api/v1`)
- **Auth:** JWT en cookie `token` (HttpOnly, Max-Age 8h). El backend **no devuelve el token en el body**.
- **Response envelope:** Todas las respuestas exitosas usan `{ "data": <payload> }`.
- **Formato de fechas en request:** `YYYY-MM-DD`
- **Formato de fechas en response:** RFC3339 (`2026-03-15T00:00:00Z`)
- **Campos en response:** camelCase con nombres en español (definidos por los json tags del Go struct).

---

## Gaps Detectados

### GAP-1 🔴 CRÍTICO — Mecanismo de Autenticación

**Problema:**
- Backend: JWT almacenado en cookie `token` (HttpOnly). El browser la envía automáticamente con cada request siempre que `withCredentials: true`.
- Frontend (`src/lib/api.ts`): Lee `auth_token` de `localStorage` y lo envía como `Authorization: Bearer <token>`.
- Frontend (`src/store/authStore.ts`): Espera `response.token` en el login y lo guarda en `localStorage`.
- Backend **nunca devuelve el token en el body** — sólo setea la cookie.

**Resultado:** Todos los requests autenticados fallan con 401 porque el backend no procesa el header `Authorization`.

**Corrección requerida en `src/lib/api.ts`:**
```typescript
// ANTES (incorrecto):
export const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// DESPUÉS (correcto):
export const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,   // envía la cookie httpOnly automáticamente
})
// Sin interceptor de Authorization — la cookie la maneja el browser
```

**Corrección requerida en `src/services/auth.service.ts`:**
```typescript
// LoginResponse no debe tener token — el backend no lo devuelve en body
export interface LoginResponse {
  data: {
    id: string
    nombre: string
    email: string
    rol: string
    permisos: Record<string, boolean | string>
  }
}
```

**Corrección requerida en `src/store/authStore.ts`:**
- Eliminar toda lógica de `localStorage.setItem('auth_token', ...)`.
- Eliminar campo `token` del estado (ya no es necesario).
- En login, guardar solo el usuario retornado por `response.data`.

---

### GAP-2 🔴 CRÍTICO — Response Envelope no desenvuelto

**Problema:**
- Backend devuelve `{ "data": <payload> }` para todas las respuestas exitosas.
- Todos los servicios del frontend hacen `.then((r) => r.data)`.
- `r.data` en Axios es el body HTTP completo: `{ data: [...] }`.
- Los componentes reciben `{ data: [...] }` en vez del array/objeto directo.

**Ejemplo:**
```typescript
// dashboardService.getKpis() retorna { data: Kpi[] } no Kpi[]
getKpis: () => api.get<Kpi[]>('/dashboard/kpis').then((r) => r.data),
//                                                              ^^^^^^
//                                   r.data = { data: Kpi[] }  (el wrapper)
```

**Corrección requerida:**
Agregar un interceptor de response en `src/lib/api.ts` que desenvuelva el envelope:
```typescript
api.interceptors.response.use(
  (response) => {
    // Si el body tiene la forma { data: ... }, devolver solo el contenido
    if (response.data && 'data' in response.data) {
      response.data = response.data.data
    }
    return response
  },
  (error) => {
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
```
De esta forma todos los servicios existentes (`r.data`) seguirán funcionando sin cambios.

---

### GAP-3 🟡 MEDIO — `AuthUser.permisos` tipo incorrecto

**Problema:**
- Frontend (`authStore.ts` y `auth.service.ts`): `permisos: string[]`
- Backend (JWT payload): `permisos: { dashboard: true, transferencias: "lectura"|"escritura"|"ninguno", ... }`

**Corrección requerida en `src/store/authStore.ts` y `src/services/auth.service.ts`:**
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

export interface User {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'sub-usuario'
  permisos: UserPermisos
}
```

---

### GAP-4 🟡 MEDIO — Campos de `Empleado` no coinciden con backend

**Problema:**

| Campo frontend | Campo backend | Observación |
|---|---|---|
| `sueldoBase` | `sueldoBruto` | Nombre distinto |
| `netoMes` | — (no existe en empleados) | Solo existe en `liquidaciones.netoAPagar` |
| `cargo` | — (no existe) | Backend tiene `puesto` y `area` |

**Corrección en `src/types/nomina.types.ts`:**
```typescript
export interface Empleado {
  id: string
  nombre: string
  puesto: string
  area: string
  rol: string
  sueldoBruto: number   // era sueldoBase
  obraSocial: string
  fechaIngreso: string  // faltaba
  avatar?: string       // faltaba
  // eliminar: cargo, netoMes
}
```

---

### GAP-5 🟡 MEDIO — `Guardia` tiene campos que no existen en el backend

**Problema:**
- Frontend `Guardia`: `turno`, `hsTrabajadas`, `horasExtras`, `ausencias`, `estado`
- Backend `guardias`: `id`, `empleadoId`, `fecha`, `horas`, `monto` (+ datos del empleado si join)

El frontend muestra columnas de UI que el backend no provee directamente.

**Corrección en `src/types/nomina.types.ts`:**
```typescript
export interface Guardia {
  id: string
  empleadoId: string
  empleadoNombre?: string   // populated via join en backend
  fecha: string             // YYYY-MM-DD
  horas: number
  monto: number
}
```
Los campos de UI como `turno`, `horasExtras`, `ausencias` deben eliminarse o calcularse en el frontend.

---

### GAP-6 🟡 MEDIO — `CompensacionTipo` no coincide con backend

**Problema:**
- Frontend: `'vacaciones' | 'bono_productividad' | 'adelanto_sueldo'`
- Backend: `'bono' | 'adelanto' | 'extra' | 'otro'`

**Corrección en `src/types/nomina.types.ts`:**
```typescript
export type CompensacionTipo = 'bono' | 'adelanto' | 'extra' | 'otro'
export type CompensacionEstado = 'aprobado' | 'pendiente' | 'rechazado'
```

---

### GAP-7 🟡 MEDIO — Campos de `ContratoAlquiler` no coinciden con backend

**Problema:**

| Campo frontend | Campo backend | Observación |
|---|---|---|
| `ajuste` | `ajusteFrecuencia` | Nombre distinto |
| `alquilerMensual` | `montoMensual` | Nombre distinto |
| `inmueble` (string) | `inmuebleId` (uuid) | Backend recibe ID, no nombre |

**Corrección en `src/types/alquiler.types.ts`:**
```typescript
export interface ContratoAlquiler {
  id: string
  inmuebleId: string
  inmuebleNombre?: string    // populated via join
  direccion?: string
  propietario?: string
  vigenciaDesde: string
  vigenciaHasta: string
  ajusteFrecuencia: string   // era ajuste
  montoMensual: number       // era alquilerMensual
  estado: ContratoAlquilerEstado
}
```

---

## Campos de Dashboard a Verificar (GAP-8 — pendiente de confirmación con backend)

Los tipos de dashboard usan nombres en inglés (`beneficiary`, `dueDate`, `status`) pero el backend probablemente retorna campos en español (`Beneficiario`, `FechaPago`, `Estado`). Requiere ejecutar el endpoint con backend real para confirmar.

---

## Decisión

**Todos los gaps deben corregirse siguiendo TDD** (ver tracker en `docs/api-fix-tracker.md`):
1. Primero escribir tests que fallen (red)
2. Luego corregir el código (green)
3. Luego refactorizar si corresponde (refactor)

La prioridad es: GAP-1 → GAP-2 → GAP-3 → GAP-4 → GAP-5 → GAP-6 → GAP-7 → GAP-8
