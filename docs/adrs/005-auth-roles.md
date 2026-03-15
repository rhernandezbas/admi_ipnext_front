# ADR-005: Autenticación y Sistema de Roles

## Estado
Aceptado — Implementado

## Contexto
El sistema tiene dos tipos de usuario: Admin (acceso total) y Sub-usuario (acceso parcial por módulo). Necesitamos definir cómo se implementa la autenticación y el control de acceso en el frontend.

## Decisión

### Autenticación
- **JWT** almacenado en `httpOnly cookie` (nombre: `token`, Max-Age: 8h). El browser la envía automáticamente — no hay manejo manual de tokens en el frontend.
- El cliente Axios tiene `withCredentials: true` para que el browser incluya la cookie en cada request.
- El frontend **NO** guarda tokens en `localStorage`. Al hacer login, el backend setea la cookie y retorna solo los datos del usuario.
- El usuario autenticado se persiste en Zustand (`authStore`) via `zustand/persist` (localStorage, solo datos del usuario — sin token).
- Rutas protegidas mediante un componente `<ProtectedRoute>`.

### Flujo de login
```
1. POST /api/v1/auth/login { email, password }
2. Backend valida credenciales → setea cookie httpOnly "token"
3. Backend retorna { data: { id, nombre, email, rol, permisos } }
4. Frontend interceptor desenvuelve { data: ... } → guarda User en authStore
5. Redirige a /dashboard
```

### Control de acceso por rol

```typescript
// Permisos del usuario — objeto, no array
interface UserPermisos {
  dashboard?: boolean
  transferencias?: 'lectura' | 'escritura' | 'ninguno'
  nominas?: 'lectura' | 'escritura' | 'ninguno'
  proveedores?: 'lectura' | 'escritura' | 'ninguno'
  servicios?: 'lectura' | 'escritura' | 'ninguno'
  alquileres?: 'lectura' | 'escritura' | 'ninguno'
  tesoreria?: 'lectura' | 'escritura' | 'ninguno'
  reportes?: 'lectura' | 'escritura' | 'ninguno'
}

interface User {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'sub-usuario'
  permisos: UserPermisos
}
```

### Reglas de UI según rol

| Acción | Admin | Sub-usuario escritura | Sub-usuario lectura |
|--------|-------|-----------------------|---------------------|
| Ver datos | ✅ | ✅ | ✅ |
| Crear / editar registros | ✅ | ✅ | ❌ |
| Aprobar liquidaciones | ✅ | ❌ | ❌ |
| Exportar reportes | ✅ | ✅ | ✅ |
| Ver módulo sin permiso | ❌ | ❌ | ❌ |

### Implementación en React

```tsx
// Componente ProtectedRoute
<ProtectedRoute modulo="transferencias" nivelMinimo="lectura">
  <TransferenciasPage />
</ProtectedRoute>

// Hook de permisos
const { puedeEscribir, puedeVer } = usePermiso('transferencias')

// Ocultar botones de acción
{puedeEscribir && <Button>+ Nueva Transferencia</Button>}
```

### Rutas de autenticación
- `POST /api/v1/auth/login` — email + password → setea cookie, retorna `{ data: User }`
- `GET /api/v1/auth/me` — retorna `{ data: User }` del usuario autenticado actual
- `POST /api/v1/auth/logout` — invalida la cookie

### Cliente HTTP
```typescript
// src/lib/api.ts
export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,  // incluye la cookie en todos los requests
})

// Interceptor que desenvuelve { data: payload } → payload
api.interceptors.response.use((response) => {
  if (response.data && 'data' in response.data && Object.keys(response.data).length === 1) {
    response.data = response.data.data
  }
  return response
})
```

## Consecuencias
- Positivo: `httpOnly cookie` protege contra XSS — el JS del frontend nunca accede al token.
- Positivo: permisos por módulo y nivel dan granularidad suficiente.
- Positivo: el interceptor de envelope centraliza el unwrapping — los servicios no necesitan saber del wrapper.
- A tener en cuenta: el backend valida permisos en cada endpoint — el frontend solo oculta UI, no es la capa de seguridad real.
- A tener en cuenta: al expirar el JWT el backend devuelve 401 → interceptor redirige a `/login` y el store queda limpio.
- A tener en cuenta: la cookie usa `Secure: false` en desarrollo HTTP; en producción requiere HTTPS (`Secure: true`).
