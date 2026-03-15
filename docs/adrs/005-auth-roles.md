# ADR-005: Autenticación y Sistema de Roles

## Estado
Aceptado

## Contexto
El sistema tiene dos tipos de usuario: Admin (acceso total) y Sub-usuario (acceso parcial por módulo). Necesitamos definir cómo se implementa la autenticación y el control de acceso en el frontend.

## Decisión

### Autenticación
- **JWT** almacenado en `httpOnly cookie` (no localStorage — evita XSS).
- Al iniciar sesión el backend devuelve el token + el objeto de usuario con sus permisos.
- El frontend guarda el usuario en Zustand (`authStore`).
- Rutas protegidas mediante un componente `<ProtectedRoute>`.

### Control de acceso por rol

```typescript
// Niveles de permiso por módulo
type NivelPermiso = 'ninguno' | 'lectura' | 'escritura'

interface PermisosUsuario {
  dashboard: boolean
  transferencias: NivelPermiso
  nominas: NivelPermiso
  proveedores: NivelPermiso
  servicios: NivelPermiso
  alquileres: NivelPermiso
  tesoreria: NivelPermiso
  reportes: NivelPermiso
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
- `GET /api/auth/me` → usuario actual + permisos
- `POST /api/auth/login` → email + password → JWT
- `POST /api/auth/logout` → invalida cookie

## Consecuencias
- Positivo: `httpOnly cookie` protege contra XSS.
- Positivo: permisos por módulo y nivel dan granularidad suficiente.
- A tener en cuenta: el backend debe validar permisos en cada endpoint — el frontend solo oculta UI, no es la capa de seguridad real.
- A tener en cuenta: al expirar el JWT se debe redirigir a `/login` y limpiar el store.
