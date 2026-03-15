# Tracker: Interaction Layer — Modales, Usuarios y Sidebar

> Spec: `spec/interaction-layer-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc
> Backend: Go + Gin · Base `/api/v1` · JWT httpOnly cookie

---

## FASE 1 — Infraestructura base: Modal + UIStore

### 1.1 — Componente `Modal`
- [x] Crear `src/components/ui/Modal.tsx`
  - Props: `open`, `onClose`, `title`, `children`, `size?`
  - Overlay semitransparente, click fuera cierra
  - Tecla Escape cierra
  - Scroll interno
  - Animación suave de entrada/salida
- [x] Test: `src/components/ui/__tests__/Modal.test.tsx`
  - Render cuando `open=true` muestra título
  - No render cuando `open=false`
  - Click overlay llama `onClose`
  - Escape llama `onClose`
- [x] `tsc` GREEN ✅

### 1.2 — UIStore (Sidebar state)
- [x] Crear `src/store/uiStore.ts`
  - `sidebarCollapsed: boolean`
  - `toggleSidebar: () => void`
  - Estado persistido en `localStorage` via zustand/persist
- [x] Test: `src/store/__tests__/uiStore.test.ts`
  - Estado inicial `collapsed=false`
  - `toggleSidebar()` cambia a `true`
  - `toggleSidebar()` nuevamente vuelve a `false`
- [x] `tsc` GREEN ✅

---

## FASE 2 — Sidebar Deslizable

### 2.1 — Refactor `Sidebar.tsx`
- [x] Leer estado de `uiStore.sidebarCollapsed`
- [x] Modo expandido (`w-60`): muestra ícono + label de cada item
- [x] Modo colapsado (`w-16`): muestra solo ícono centrado + tooltip al hover
- [x] Botón toggle `☰` / `←` en la parte superior
- [x] Transición `transition-all duration-200`
- [x] Ítem "Usuarios" solo visible si `usuario.Rol === 'admin'`

### 2.2 — Ajustar layout principal
- [x] `src/components/layout/PageLayout.tsx`: sidebar width reactivo via flex (ya usa flex-1)
- [x] `tsc` GREEN ✅

---

## FASE 3 — Types: Usuario + Permisos

### 3.1 — Crear tipos
- [x] Crear `src/types/usuario.types.ts`:
  - `PermisoNivel = 'lectura' | 'escritura' | 'ninguno'`
  - `Permisos` interface (8 módulos)
  - `Usuario` interface (ID, Nombre, Email, Rol, Permisos, Avatar, Activo, CreatedAt, UpdatedAt)
  - `NuevoUsuarioForm` interface
- [x] `tsc` GREEN ✅

### 3.2 — Actualizar `useAuthStore`
- [x] `UserPermisos` ya tipado en authStore, compatible con `Permisos`
- [x] `tsc` GREEN ✅

### 3.3 — Hook `usePermiso`
- [x] Reescribir `src/hooks/usePermiso.ts`
  - `usePermiso(modulo, nivel?)` → `boolean`
  - Admin siempre retorna `true`
  - Sub-usuario: verifica `Permisos[modulo]` vs `nivel`
- [x] Test: `src/hooks/__tests__/usePermiso.test.ts`
  - Admin → siempre `true`
  - Sub-usuario con `escritura` → `usePermiso('alquileres', 'escritura')` = `true`
  - Sub-usuario con `lectura` → `usePermiso('alquileres', 'escritura')` = `false`
  - Sub-usuario con `ninguno` → `usePermiso('alquileres', 'lectura')` = `false`
- [x] `tsc` GREEN ✅

---

## FASE 4 — Servicio de Usuarios

### 4.1 — `usuarios.service.ts`
- [x] Crear `src/services/usuarios.service.ts`:
  - `getAll()` → `GET /api/v1/usuarios`
  - `create(data)` → `POST /api/v1/usuarios`
  - `update(id, data)` → `PATCH /api/v1/usuarios/:id`
  - `delete(id)` → `DELETE /api/v1/usuarios/:id`
  - `cambiarClave(id, password)` → `PATCH /api/v1/usuarios/:id` con `{ password }`
- [x] `tsc` GREEN ✅

---

## FASE 5 — Página Gestión de Usuarios

### 5.1 — `UsuariosPage.tsx`
- [x] Crear `src/modules/usuarios/UsuariosPage.tsx`
  - `useQuery` → `GET /api/v1/usuarios` con `usuariosService.getAll()`
  - Estado `modalCrear: boolean`
  - Estado `usuarioEditar: Usuario | null`
  - Header con botón "Nuevo Usuario"
  - Tabla con columnas: Avatar, Nombre, Email, Estado badge, chips de permisos, acciones
- [x] `tsc` GREEN ✅

### 5.2 — `UsuariosTable.tsx`
- [x] Crear `src/modules/usuarios/components/UsuariosTable.tsx`
  - Columnas: Avatar, Nombre, Email, Rol, Estado (badge Activo/Inactivo), Permisos chips, botones Editar / Desactivar
  - Badge verde "Activo" / gris "Inactivo"
  - Chips por cada módulo con permiso `≠ ninguno`
  - Botón "Reactivar" si `activo=false`
- [x] Test: `src/modules/usuarios/components/__tests__/UsuariosTable.test.tsx`
  - Render lista de usuarios
  - Badge "Activo" si `Activo=true`
  - Badge "Inactivo" si `Activo=false`
  - No crashea con permisos parciales
- [x] `tsc` GREEN ✅

### 5.3 — `NuevoUsuarioModal.tsx`
- [x] Crear `src/modules/usuarios/components/NuevoUsuarioModal.tsx`
  - Formulario completo con permisos granulares
  - `useMutation` → `POST /api/v1/usuarios`
  - Toast éxito/error
- [x] `tsc` GREEN ✅

### 5.4 — `EditarUsuarioModal.tsx`
- [x] Crear `src/modules/usuarios/components/EditarUsuarioModal.tsx`
  - Pre-fill, permisos, Toggle Activo/Inactivo
  - `useMutation` → `PATCH /api/v1/usuarios/:id`
- [x] `tsc` GREEN ✅

### 5.5 — `CambiarClaveModal.tsx`
- [x] Crear `src/modules/usuarios/components/CambiarClaveModal.tsx`
  - Validación min 8 chars, coinciden
  - `useMutation` → `PATCH /api/v1/usuarios/:id` con `{ password }`
- [x] `tsc` GREEN ✅

### 5.6 — Agregar ruta `/usuarios`
- [x] En `src/router/index.tsx`: ruta `/usuarios` → `<UsuariosPage />`
- [x] `tsc` GREEN ✅

---

## FASE 6 — Cambio de Clave desde Perfil Propio

### 6.1 — Link en header/perfil
- [x] En el footer del Sidebar: agregar link "Cambiar contraseña" bajo el nombre
- [x] Abre `CambiarClaveModal` con el ID del usuario logueado
- [x] Disponible para cualquier rol
- [x] `tsc` GREEN ✅

---

## FASE 7 — Modales de Acción: Alquileres

### 7.1 — `RegistrarPagoModal`
- [x] Crear `src/modules/alquileres/components/RegistrarPagoModal.tsx`
  - Select inmuebles, período, monto, fecha pago, comprobante
  - `useMutation` → `POST /api/v1/alquileres/pagos`
  - Invalidate: `['alquileres', 'pagos']`
- [x] Conectar botón "Registrar Pago" en `AlquileresPage`
- [x] Guard: `usePermiso('alquileres', 'escritura')`
- [x] `tsc` GREEN ✅

### 7.2 — `NuevoInmuebleModal`
- [x] Crear `src/modules/alquileres/components/NuevoInmuebleModal.tsx`
  - Inputs: Nombre, Dirección, Propietario, Uso (select), Alquiler Mensual, CBU
  - `useMutation` → `POST /api/v1/alquileres`
  - Invalidate: `['alquileres']`
- [x] Conectar botón "Nuevo Inmueble" en `AlquileresPage`
- [x] Guard: `usePermiso('alquileres', 'escritura')`
- [x] `tsc` GREEN ✅

---

## FASE 8 — Modales de Acción: Nóminas

### 8.1 — `LiquidarNominaModal`
- [x] Crear `src/modules/nominas/components/LiquidarNominaModal.tsx`
  - Select empleado, período, sueldo bruto, deducciones, neto calculado
  - `POST /api/v1/nominas/liquidaciones`
- [x] Conectar botones "Liquidar Nómina" e "Iniciar Liquidación" en `NominasPage`
- [x] Guard: `usePermiso('nominas', 'escritura')`
- [x] `tsc` GREEN ✅

### 8.2 — `NuevoEmpleadoModal`
- [x] Crear `src/modules/nominas/components/NuevoEmpleadoModal.tsx`
- [x] Agregar botón "Nuevo Empleado" en `NominasPage`
- [x] Guard: `usePermiso('nominas', 'escritura')`
- [x] `tsc` GREEN ✅

### 8.3 — `RegistrarGuardiaModal`
- [x] Crear `src/modules/nominas/components/RegistrarGuardiaModal.tsx`
- [x] Conectar botón en tab Guardias de `NominasPage`
- [x] Guard: `usePermiso('nominas', 'escritura')`
- [x] `tsc` GREEN ✅

### 8.4 — `RegistrarCompensacionModal`
- [x] Crear `src/modules/nominas/components/RegistrarCompensacionModal.tsx`
- [x] Conectar botón en tab Compensaciones de `NominasPage`
- [x] Guard: `usePermiso('nominas', 'escritura')`
- [x] `tsc` GREEN ✅

---

## FASE 9 — Modales de Acción: Proveedores

### 9.1 — `NuevoProveedorModal`
- [x] Crear `src/modules/proveedores/components/NuevoProveedorModal.tsx`
- [x] Conectar botón "Nuevo Proveedor" en `ProveedoresPage`
- [x] Guard: `usePermiso('proveedores', 'escritura')`
- [x] `tsc` GREEN ✅

### 9.2 — `NuevoContratoProveedorModal`
- [x] Crear `src/modules/proveedores/components/NuevoContratoProveedorModal.tsx`
- [x] Conectar botón "Nuevo Contrato" en `ProveedoresPage`
- [x] Guard: `usePermiso('proveedores', 'escritura')`
- [x] `tsc` GREEN ✅

---

## FASE 10 — Modales de Acción: Tesorería

### 10.1 — `RegistrarMovimientoModal`
- [x] Crear `src/modules/tesoreria/components/RegistrarMovimientoModal.tsx`
  - Select cuenta bancaria, tipo (ingreso/egreso), monto, descripción, fecha
  - `POST /api/v1/tesoreria/movimientos`
  - Invalidate: `['tesoreria', 'flujo-caja']`, `['tesoreria', 'cuentas']`
- [x] Conectar botón "Registrar Movimiento" en `TesoreriaPage`
- [x] Guard: `usePermiso('tesoreria', 'escritura')`
- [x] `tsc` GREEN ✅

---

## FASE 11 — Acción inline: Dashboard Pagar

### 11.1 — Botón "Pagar" en `UrgentPaymentsTable`
- [x] Agregar `onClick` al botón "Pagar" existente
  - `PATCH /api/v1/transferencias/:id/estado` con `{ estado: 'pagado' }`
  - Loading state en el botón durante la mutación
  - Invalidate: `['dashboard', 'pagos-urgentes']`
  - Toast: "Pago marcado como realizado"
- [x] Guard: `usePermiso('transferencias', 'escritura')`
- [x] `tsc` GREEN ✅

---

## FASE 12 — Verificación final

- [x] `npm run test` → 100 tests pasan (20 test files)
- [x] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [x] Sidebar deslizable con uiStore (expand/collapse + persistencia)
- [x] Página `/usuarios` solo visible para admin (ítem en Sidebar condicional)
- [x] Todos los modales implementados con Modal.tsx
- [x] Todos los formularios con useMutation → endpoint correcto
- [x] Toast de éxito/error en cada acción (lib/toast.ts)
- [x] Guard `usePermiso` oculta botones para usuarios sin permiso `escritura`
- [x] Cambio de clave disponible desde perfil (footer Sidebar)

---

## Estado

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 1 | Modal + UIStore | ✅ Completado |
| FASE 2 | Sidebar deslizable | ✅ Completado |
| FASE 3 | Types Usuario + usePermiso | ✅ Completado |
| FASE 4 | usuarios.service.ts | ✅ Completado |
| FASE 5 | Página Gestión Usuarios | ✅ Completado |
| FASE 6 | Cambio clave desde perfil | ✅ Completado |
| FASE 7 | Modales Alquileres | ✅ Completado |
| FASE 8 | Modales Nóminas | ✅ Completado |
| FASE 9 | Modales Proveedores | ✅ Completado |
| FASE 10 | Modales Tesorería | ✅ Completado |
| FASE 11 | Pagar inline Dashboard | ✅ Completado |
| FASE 12 | Verificación final | ✅ Completado |
