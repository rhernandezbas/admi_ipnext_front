# Spec: CRUD Layer — Editar, Eliminar, Sidebar Fix y Cargas Sociales

## Objetivo
Implementar el ciclo completo de edición y eliminación en todos los módulos del sistema,
corregir el sidebar deslizable, y agregar cargas sociales configurables por empleado.

## Metodología
TDD — test (red) → implementar (green) → verificar tsc

## Backend: Qué implementar vos antes de arrancar el frontend
Ver `docs/tdrs/tdr-004-crud-edit-delete.md` y `docs/tdrs/tdr-005-cargas-sociales-por-empleado.md`.

Los endpoints que DEBEN estar disponibles antes de que el frontend los consuma:
- `PATCH /servicios/:id`, `DELETE /servicios/:id`
- `PATCH /alquileres/contratos/:id`, `DELETE /alquileres/contratos/:id`
- `PATCH /alquileres/pagos/:id`
- `PATCH /nominas/guardias/:id`, `DELETE /nominas/guardias/:id`
- `PATCH /nominas/compensaciones/:id`, `DELETE /nominas/compensaciones/:id`
- `DELETE /transferencias/:id`
- Migración + campos `CargasSocialesPct` y `CargasSocialesMonto` en `/nominas/empleados`

---

## FASE 0 — Componente ConfirmDeleteModal (compartido)

Componente reutilizable de confirmación de eliminación.

**Props:** `open`, `onClose`, `onConfirm`, `title`, `description`, `loading`

**Comportamiento:**
- Overlay semitransparente
- Título + descripción del item a eliminar
- Botón "Cancelar" (secondary) + "Eliminar" (rojo, disabled durante loading)
- Escape cierra

---

## FASE 1 — Fix Sidebar deslizable

El wrapper del sidebar en `PageLayout` no tiene width fijo, causando que el layout
se corte durante la transición.

**Fix:**
- El `<div>` desktop wrapper debe sincronizar su width con el estado `sidebarCollapsed`
- Usar `transition-all duration-200` en el wrapper también (no solo en el contenido interno)
- Verificar que el contenido principal no se superponga ni quede cortado

---

## FASE 2 — Cargas Sociales por Empleado

> **Prerequisito:** Backend debe tener migración y endpoints actualizados (TDR-005).

### 2.1 — Tipo y servicio
- Actualizar `Empleado` en `src/types/nomina.types.ts`: agregar `cargasSocialesPct`, `cargasSocialesMonto?`, `cargasSocialesCalculado?`
- Actualizar `nominasService.getEmpleados` para mapear los nuevos campos

### 2.2 — Cálculo en NominasPage
- Reemplazar `totalBruto * 0.30` por cálculo por empleado usando `cargasSocialesMonto ?? sueldoBruto * cargasSocialesPct / 100`

### 2.3 — EmpleadosTable — nueva columna
- Mostrar "Cargas Soc." con valor calculado por empleado

### 2.4 — NuevoEmpleadoModal — campo cargas sociales
- Sección "Cargas Sociales" con radio `% del sueldo` / `Monto fijo`
- Input correspondiente

### 2.5 — EditarEmpleadoModal (nuevo componente)
- Pre-fill con todos los campos del empleado incluido cargas sociales
- `useMutation` → `PATCH /nominas/empleados/:id`
- Toast éxito/error

---

## FASE 3 — CRUD Alquileres — Inmuebles

### 3.1 — EditarInmuebleModal
- Pre-fill: nombre, dirección, propietario, uso, alquilerMensual, CBU
- `PATCH /alquileres/:id`

### 3.2 — Botones en InmueblesTable
- Botón "Editar" → abre EditarInmuebleModal
- Botón "Eliminar" → abre ConfirmDeleteModal → `DELETE /alquileres/:id`
- Guard: `usePermiso('alquileres', 'escritura')`

---

## FASE 4 — CRUD Alquileres — Contratos y Pagos

> **Prerequisito:** Backend `PATCH /alquileres/contratos/:id`, `DELETE /alquileres/contratos/:id`, `PATCH /alquileres/pagos/:id`

### 4.1 — EditarContratoModal
- Pre-fill: vigenciaDesde, vigenciaHasta, ajusteFrecuencia, montoMensual, estado
- `PATCH /alquileres/contratos/:id`

### 4.2 — Botones en ContratosAlquilerTable
- "Editar" + "Eliminar" con confirm

### 4.3 — EditarPagoModal
- Pre-fill: estado, fechaPago, monto, comprobante
- `PATCH /alquileres/pagos/:id`

### 4.4 — Botones en PagosRecibosTable
- "Editar estado"

---

## FASE 5 — CRUD Nóminas — Empleados

### 5.1 — EditarEmpleadoModal (ver FASE 2.5)

### 5.2 — Botones en EmpleadosTable
- "Editar" → abre EditarEmpleadoModal
- "Dar de baja" → ConfirmDeleteModal → `DELETE /nominas/empleados/:id`
- Guard: `usePermiso('nominas', 'escritura')`

---

## FASE 6 — CRUD Nóminas — Guardias y Compensaciones

> **Prerequisito:** Backend `PATCH/DELETE /nominas/guardias/:id`, `PATCH/DELETE /nominas/compensaciones/:id`

### 6.1 — EditarGuardiaModal
- Pre-fill: empleadoId, fecha, horas, monto, notas
- `PATCH /nominas/guardias/:id`

### 6.2 — Botones en GuardiasTable
- "Editar" + "Eliminar" con confirm

### 6.3 — EditarCompensacionModal
- Pre-fill: tipo, monto, fecha, descripcion, estado
- `PATCH /nominas/compensaciones/:id`

### 6.4 — Botones en CompensacionesTable
- "Editar" + "Eliminar" con confirm

---

## FASE 7 — CRUD Proveedores

### 7.1 — EditarProveedorModal
- Pre-fill: nombre, CUIT, CBU, alias, email, categoria, sitioWeb
- `PATCH /proveedores/:id`

### 7.2 — Botones en ProveedoresTable
- "Editar" + "Eliminar" con confirm
- Guard: `usePermiso('proveedores', 'escritura')`

---

## FASE 8 — CRUD Servicios

> **Prerequisito:** Backend `PATCH /servicios/:id`, `DELETE /servicios/:id`

### 8.1 — EditarServicioModal
- Pre-fill: nombre, proveedor, costoMensual, estado, categoria, extra, vtoFactura, vigencia, renovacion
- `PATCH /servicios/:id`

### 8.2 — Botones en ServiciosTable
- "Editar" + "Eliminar" con confirm
- Guard: `usePermiso('servicios', 'escritura')`

---

## FASE 9 — CRUD Tesorería — Cuentas Bancarias

### 9.1 — EditarCuentaModal
- Pre-fill: banco, tipoCuenta, nroCuenta, CBU, CCI, moneda, activa
- `PATCH /tesoreria/cuentas/:id`

### 9.2 — Botones en CuentasBancariasTable
- "Editar"
- Guard: `usePermiso('tesoreria', 'escritura')`

---

## FASE 10 — Verificación final

- `npm run test` → todos los tests pasan
- `tsc -p tsconfig.app.json --noEmit` → 0 errores
- ConfirmDeleteModal funciona en todos los módulos
- Sidebar sin corte visual durante transición
- Cargas sociales configurables por empleado
- Todos los modales de edición pre-llenan correctamente
