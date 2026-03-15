# Tracker: Interaction Layer — Modales, Usuarios y Sidebar

> Spec: `spec/interaction-layer-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc
> Backend: Go + Gin · Base `/api/v1` · JWT httpOnly cookie

---

## FASE 1 — Infraestructura base: Modal + UIStore

### 1.1 — Componente `Modal`
- [ ] Crear `src/components/ui/Modal.tsx`
  - Props: `open`, `onClose`, `title`, `children`, `size?`
  - Overlay semitransparente, click fuera cierra
  - Tecla Escape cierra
  - Scroll interno
  - Animación suave de entrada/salida
- [ ] Test: `src/components/ui/__tests__/Modal.test.tsx`
  - Render cuando `open=true` muestra título
  - No render cuando `open=false`
  - Click overlay llama `onClose`
  - Escape llama `onClose`
- [ ] `tsc` GREEN ✅

### 1.2 — UIStore (Sidebar state)
- [ ] Crear `src/store/uiStore.ts`
  - `sidebarCollapsed: boolean`
  - `toggleSidebar: () => void`
  - Estado persistido en `localStorage` via zustand/persist
- [ ] Test: `src/store/__tests__/uiStore.test.ts`
  - Estado inicial `collapsed=false`
  - `toggleSidebar()` cambia a `true`
  - `toggleSidebar()` nuevamente vuelve a `false`
- [ ] `tsc` GREEN ✅

---

## FASE 2 — Sidebar Deslizable

### 2.1 — Refactor `Sidebar.tsx`
- [ ] Leer estado de `uiStore.sidebarCollapsed`
- [ ] Modo expandido (`w-60`): muestra ícono + label de cada item
- [ ] Modo colapsado (`w-16`): muestra solo ícono centrado + tooltip al hover
- [ ] Botón toggle `☰` / `←` en la parte superior
- [ ] Transición `transition-all duration-200`
- [ ] Ítem "Usuarios" solo visible si `usuario.Rol === 'admin'`

### 2.2 — Ajustar layout principal
- [ ] `src/components/layout/AppLayout.tsx` (o equivalente): `ml-60` / `ml-16` reactivo al estado colapsado
- [ ] `tsc` GREEN ✅

---

## FASE 3 — Types: Usuario + Permisos

### 3.1 — Crear tipos
- [ ] Crear `src/types/usuario.types.ts`:
  - `PermisoNivel = 'lectura' | 'escritura' | 'ninguno'`
  - `Permisos` interface (8 módulos)
  - `Usuario` interface (ID, Nombre, Email, Rol, Permisos, Avatar, Activo, CreatedAt, UpdatedAt)
  - `NuevoUsuarioForm` interface
- [ ] Test: `src/types/__tests__/usuario.types.test.ts`
  - `usuario.Permisos.transferencias` es `PermisoNivel`
  - `usuario.Rol` es `'admin' | 'sub-usuario'`
  - `usuario.Activo` es boolean
- [ ] `tsc` GREEN ✅

### 3.2 — Actualizar `useAuthStore`
- [ ] Tipar `usuario` como `Usuario | null` (de `src/types/usuario.types.ts`)
- [ ] Verificar que `auth/me` response mapea correctamente a `Usuario`
- [ ] `tsc` GREEN ✅

### 3.3 — Hook `usePermiso`
- [ ] Crear `src/hooks/usePermiso.ts`
  - `usePermiso(modulo, nivel?)` → `boolean`
  - Admin siempre retorna `true`
  - Sub-usuario: verifica `Permisos[modulo]` vs `nivel`
- [ ] Test: `src/hooks/__tests__/usePermiso.test.ts`
  - Admin → siempre `true`
  - Sub-usuario con `escritura` → `usePermiso('alquileres', 'escritura')` = `true`
  - Sub-usuario con `lectura` → `usePermiso('alquileres', 'escritura')` = `false`
  - Sub-usuario con `ninguno` → `usePermiso('alquileres', 'lectura')` = `false`
- [ ] `tsc` GREEN ✅

---

## FASE 4 — Servicio de Usuarios

### 4.1 — `usuarios.service.ts`
- [ ] Crear `src/services/usuarios.service.ts`:
  - `getAll()` → `GET /api/v1/usuarios`
  - `create(data)` → `POST /api/v1/usuarios`
  - `update(id, data)` → `PATCH /api/v1/usuarios/:id`
  - `delete(id)` → `DELETE /api/v1/usuarios/:id`
  - `cambiarClave(id, password)` → `PATCH /api/v1/usuarios/:id` con `{ password }`
- [ ] `tsc` GREEN ✅

---

## FASE 5 — Página Gestión de Usuarios

### 5.1 — `UsuariosPage.tsx`
- [ ] Crear `src/modules/usuarios/UsuariosPage.tsx`
  - `useQuery` → `GET /api/v1/usuarios` con `usuariosService.getAll()`
  - Estado `modalCrear: boolean`
  - Estado `usuarioEditar: Usuario | null`
  - Header con botón "Nuevo Usuario"
  - Tabla con columnas: Avatar, Nombre, Email, Estado badge, chips de permisos, acciones
- [ ] `tsc` GREEN ✅

### 5.2 — `UsuariosTable.tsx`
- [ ] Crear `src/modules/usuarios/components/UsuariosTable.tsx`
  - Columnas: Avatar, Nombre, Email, Rol, Estado (badge Activo/Inactivo), Permisos chips, botones Editar / Desactivar
  - Badge verde "Activo" / gris "Inactivo"
  - Chips por cada módulo con permiso `≠ ninguno`
  - Botón "Reactivar" si `activo=false`
- [ ] Test: `src/modules/usuarios/components/__tests__/UsuariosTable.test.tsx`
  - Render lista de usuarios
  - Badge "Activo" si `Activo=true`
  - Badge "Inactivo" si `Activo=false`
  - No crashea con permisos parciales
- [ ] `tsc` GREEN ✅

### 5.3 — `NuevoUsuarioModal.tsx`
- [ ] Crear `src/modules/usuarios/components/NuevoUsuarioModal.tsx`
  - Formulario: Nombre, Email, Contraseña, Confirmar Contraseña
  - Grid de permisos granulares:
    - Dashboard: Toggle `true/false`
    - Transferencias, Nóminas, Proveedores, Servicios, Alquileres, Tesorería, Reportes: Select `ninguno | lectura | escritura`
  - Validación: contraseñas coinciden, campos requeridos
  - `useMutation` → `POST /api/v1/usuarios`
  - Toast éxito: "Usuario creado"
  - Toast error: mensaje del backend
- [ ] `tsc` GREEN ✅

### 5.4 — `EditarUsuarioModal.tsx`
- [ ] Crear `src/modules/usuarios/components/EditarUsuarioModal.tsx`
  - Pre-fill con datos del usuario seleccionado
  - Mismos campos que Nuevo (sin contraseña)
  - Toggle Activo/Inactivo
  - `useMutation` → `PATCH /api/v1/usuarios/:id`
  - Toast éxito: "Usuario actualizado"
- [ ] `tsc` GREEN ✅

### 5.5 — `CambiarClaveModal.tsx`
- [ ] Crear `src/modules/usuarios/components/CambiarClaveModal.tsx`
  - Funciona tanto para admin cambiando clave de otro, como para usuario cambiando la propia
  - Inputs: Nueva Contraseña, Confirmar Contraseña
  - Validación: min 8 chars, coinciden
  - `useMutation` → `PATCH /api/v1/usuarios/:id` con `{ password }`
  - Toast éxito: "Contraseña actualizada"
- [ ] `tsc` GREEN ✅

### 5.6 — Agregar ruta `/usuarios`
- [ ] En `src/App.tsx` (o router): agregar ruta `/usuarios` → `<UsuariosPage />`
- [ ] Guard: si `usuario.Rol !== 'admin'` → redirect a `/`
- [ ] `tsc` GREEN ✅

---

## FASE 6 — Cambio de Clave desde Perfil Propio

### 6.1 — Link en header/perfil
- [ ] En el dropdown de perfil del header: agregar ítem "Cambiar contraseña"
- [ ] Abre `CambiarClaveModal` con el ID del usuario logueado
- [ ] Disponible para cualquier rol
- [ ] `tsc` GREEN ✅

---

## FASE 7 — Modales de Acción: Alquileres

### 7.1 — `RegistrarPagoModal`
- [ ] Crear `src/modules/alquileres/components/RegistrarPagoModal.tsx`
  - Select de inmuebles (query `GET /api/v1/alquileres`)
  - Input month (período YYYY-MM)
  - Input monto
  - Input date (fecha pago, opcional)
  - Input text (comprobante URL, opcional)
  - `useMutation` → `POST /api/v1/alquileres/pagos`
  - Invalidate: `['alquileres', 'pagos']`
- [ ] Conectar botón "Registrar Pago" en `AlquileresPage`
- [ ] Guard: `usePermiso('alquileres', 'escritura')`
- [ ] `tsc` GREEN ✅

### 7.2 — `NuevoInmuebleModal`
- [ ] Crear `src/modules/alquileres/components/NuevoInmuebleModal.tsx`
  - Inputs: Nombre, Dirección, Propietario, Uso (select), Alquiler Mensual, CBU, Alias
  - `useMutation` → `POST /api/v1/alquileres`
  - Invalidate: `['alquileres']`
- [ ] Conectar botón "Nuevo Inmueble" en `AlquileresPage`
- [ ] Guard: `usePermiso('alquileres', 'escritura')`
- [ ] `tsc` GREEN ✅

---

## FASE 8 — Modales de Acción: Nóminas

### 8.1 — `LiquidarNominaModal`
- [ ] Crear `src/modules/nominas/components/LiquidarNominaModal.tsx`
  - Select empleado (query `GET /api/v1/nominas/empleados?solo_activos=true`)
  - Al seleccionar empleado: pre-fill SueldoBruto
  - Input month (período)
  - Input SueldoBruto (editable)
  - Input Deducciones (default 0)
  - Display calculado: Neto = SueldoBruto - Deducciones (read-only)
  - `useMutation` → `POST /api/v1/nominas/liquidaciones`
  - Invalidate: `['nominas', 'liquidaciones']`
- [ ] Conectar botones "Liquidar Nómina" e "Iniciar Liquidación" en `NominasPage`
- [ ] Guard: `usePermiso('nominas', 'escritura')`
- [ ] `tsc` GREEN ✅

### 8.2 — `NuevoEmpleadoModal`
- [ ] Crear `src/modules/nominas/components/NuevoEmpleadoModal.tsx`
  - Inputs: Nombre, Puesto, Área, Rol, Sueldo Bruto, Obra Social, Fecha Ingreso
  - `useMutation` → `POST /api/v1/nominas/empleados`
  - Invalidate: `['nominas', 'empleados']`
- [ ] Agregar botón "Nuevo Empleado" en `NominasPage`
- [ ] Guard: `usePermiso('nominas', 'escritura')`
- [ ] `tsc` GREEN ✅

### 8.3 — `RegistrarGuardiaModal`
- [ ] Crear `src/modules/nominas/components/RegistrarGuardiaModal.tsx`
  - Select empleado, fecha, horas, monto, descripción
  - `useMutation` → `POST /api/v1/nominas/guardias`
  - Invalidate: `['nominas', 'guardias']`
- [ ] Conectar botón en `GuardiasTable`
- [ ] Guard: `usePermiso('nominas', 'escritura')`
- [ ] `tsc` GREEN ✅

### 8.4 — `RegistrarCompensacionModal`
- [ ] Crear `src/modules/nominas/components/RegistrarCompensacionModal.tsx`
  - Select empleado, tipo (bono/adelanto/extra/otro), monto, fecha, descripción
  - `useMutation` → `POST /api/v1/nominas/compensaciones`
  - Invalidate: `['nominas', 'compensaciones']`
- [ ] Conectar botón en `CompensacionesTable`
- [ ] Guard: `usePermiso('nominas', 'escritura')`
- [ ] `tsc` GREEN ✅

---

## FASE 9 — Modales de Acción: Proveedores

### 9.1 — `NuevoProveedorModal`
- [ ] Crear `src/modules/proveedores/components/NuevoProveedorModal.tsx`
  - Inputs: Nombre, Categoría, CUIT, CBU, Alias, Email, Sitio Web
  - `useMutation` → `POST /api/v1/proveedores`
  - Invalidate: `['proveedores']`
- [ ] Conectar botón "Nuevo Proveedor" en `ProveedoresPage`
- [ ] Guard: `usePermiso('proveedores', 'escritura')`
- [ ] `tsc` GREEN ✅

### 9.2 — `NuevoContratoProveedorModal`
- [ ] Crear `src/modules/proveedores/components/NuevoContratoProveedorModal.tsx`
  - Select proveedor, vigencia desde/hasta, monto anual, descripción
  - `useMutation` → `POST /api/v1/proveedores/contratos`
  - Invalidate: `['proveedores', 'contratos']`
- [ ] Conectar botón en `ContratosTable`
- [ ] Guard: `usePermiso('proveedores', 'escritura')`
- [ ] `tsc` GREEN ✅

---

## FASE 10 — Modales de Acción: Tesorería

### 10.1 — `RegistrarMovimientoModal`
- [ ] Crear `src/modules/tesoreria/components/RegistrarMovimientoModal.tsx`
  - Select cuenta bancaria (query `GET /api/v1/tesoreria/cuentas`)
  - Select tipo (ingreso | egreso)
  - Input monto, descripción, fecha
  - `useMutation` → `POST /api/v1/tesoreria/movimientos`
  - Invalidate: `['tesoreria', 'flujo-caja']`, `['tesoreria', 'cuentas']`
- [ ] Conectar botón "Registrar Movimiento" en `TesoreriaPage`
- [ ] Guard: `usePermiso('tesoreria', 'escritura')`
- [ ] `tsc` GREEN ✅

---

## FASE 11 — Acción inline: Dashboard Pagar

### 11.1 — Botón "Pagar" en `UrgentPaymentsTable`
- [ ] Agregar `onClick` al botón "Pagar" existente
  - `useMutation` → `PATCH /api/v1/transferencias/:id/estado` con `{ estado: 'pagado' }`
  - Loading state en el botón durante la mutación
  - Invalidate: `['dashboard', 'pagos-urgentes']`
  - Toast: "Pago marcado como realizado"
- [ ] Guard: `usePermiso('transferencias', 'escritura')`
- [ ] `tsc` GREEN ✅

---

## FASE 12 — Verificación final

- [ ] `npm run test` → todos los tests pasan
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [ ] Sidebar deslizable funciona en expand/collapse
- [ ] Página `/usuarios` solo visible para admin
- [ ] Todos los modales abren y cierran correctamente
- [ ] Todos los formularios envían datos al backend correcto
- [ ] Toast de éxito/error en cada acción
- [ ] Guard `usePermiso` oculta botones para usuarios sin permiso `escritura`
- [ ] Cambio de clave disponible desde perfil
- [ ] Commit y push

---

## Estado

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 1 | Modal + UIStore | ⬜ Pendiente |
| FASE 2 | Sidebar deslizable | ⬜ Pendiente |
| FASE 3 | Types Usuario + usePermiso | ⬜ Pendiente |
| FASE 4 | usuarios.service.ts | ⬜ Pendiente |
| FASE 5 | Página Gestión Usuarios | ⬜ Pendiente |
| FASE 6 | Cambio clave desde perfil | ⬜ Pendiente |
| FASE 7 | Modales Alquileres | ⬜ Pendiente |
| FASE 8 | Modales Nóminas | ⬜ Pendiente |
| FASE 9 | Modales Proveedores | ⬜ Pendiente |
| FASE 10 | Modales Tesorería | ⬜ Pendiente |
| FASE 11 | Pagar inline Dashboard | ⬜ Pendiente |
| FASE 12 | Verificación final | ⬜ Pendiente |
