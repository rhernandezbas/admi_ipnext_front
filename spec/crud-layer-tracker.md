# Tracker: CRUD Layer — Editar, Eliminar, Sidebar Fix y Cargas Sociales

> Spec: `spec/crud-layer-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc
> Backend docs: `docs/tdrs/tdr-004-crud-edit-delete.md`, `docs/tdrs/tdr-005-cargas-sociales-por-empleado.md`

---

## FASE 0 — ConfirmDeleteModal (componente compartido)

- [ ] Crear `src/components/ui/ConfirmDeleteModal.tsx`
  - Props: `open`, `onClose`, `onConfirm`, `title`, `description`, `loading`
  - Overlay + botones Cancelar / Eliminar (rojo)
  - Escape cierra
- [ ] Test: `src/components/ui/__tests__/ConfirmDeleteModal.test.tsx`
  - Render cuando `open=true`
  - Click "Eliminar" llama `onConfirm`
  - Click "Cancelar" llama `onClose`
  - Escape llama `onClose`
- [ ] `tsc` GREEN

---

## FASE 1 — Fix Sidebar deslizable

- [ ] Corregir wrapper desktop en `Sidebar.tsx` o `PageLayout.tsx`
  - Width del wrapper sincronizado con `sidebarCollapsed`
  - `transition-all duration-200` en el wrapper
  - Sin corte visual durante la transición
- [ ] `tsc` GREEN

---

## FASE 2 — Cargas Sociales por Empleado

> ⚠️ Prerequisito: Backend migración + campos en API (TDR-005)

- [ ] Actualizar `Empleado` en `src/types/nomina.types.ts`
  - Agregar `cargasSocialesPct: number`, `cargasSocialesMonto?: number`, `cargasSocialesCalculado?: number`
- [ ] Actualizar mapeo en `nominasService.getEmpleados`
- [ ] Reemplazar cálculo hardcodeado en `NominasPage`
- [ ] Nueva columna "Cargas Soc." en `EmpleadosTable`
- [ ] Sección cargas sociales en `NuevoEmpleadoModal`
- [ ] Crear `EditarEmpleadoModal.tsx` con pre-fill + cargas sociales
- [ ] Test: `EditarEmpleadoModal` renderiza y envía PATCH
- [ ] `tsc` GREEN

---

## FASE 3 — CRUD Alquileres — Inmuebles

- [ ] Crear `EditarInmuebleModal.tsx`
- [ ] Test: renderiza con datos pre-llenados, envía PATCH
- [ ] Agregar botones Editar/Eliminar en `InmueblesTable`
- [ ] `tsc` GREEN

---

## FASE 4 — CRUD Alquileres — Contratos y Pagos

> ⚠️ Prerequisito: Backend `PATCH/DELETE /alquileres/contratos/:id`, `PATCH /alquileres/pagos/:id`

- [ ] Crear `EditarContratoModal.tsx`
- [ ] Agregar botones en `ContratosAlquilerTable`
- [ ] Crear `EditarPagoModal.tsx`
- [ ] Agregar botón "Editar" en `PagosRecibosTable`
- [ ] `tsc` GREEN

---

## FASE 5 — CRUD Nóminas — Empleados

- [ ] Agregar botones Editar/Dar de baja en `EmpleadosTable`
  - Editar → abre `EditarEmpleadoModal`
  - Dar de baja → `ConfirmDeleteModal` → `DELETE /nominas/empleados/:id`
- [ ] `tsc` GREEN

---

## FASE 6 — CRUD Nóminas — Guardias y Compensaciones

> ⚠️ Prerequisito: Backend `PATCH/DELETE /nominas/guardias/:id`, `PATCH/DELETE /nominas/compensaciones/:id`

- [ ] Crear `EditarGuardiaModal.tsx`
- [ ] Agregar botones en `GuardiasTable`
- [ ] Crear `EditarCompensacionModal.tsx`
- [ ] Agregar botones en `CompensacionesTable`
- [ ] `tsc` GREEN

---

## FASE 7 — CRUD Proveedores

- [ ] Crear `EditarProveedorModal.tsx`
- [ ] Agregar botones en `ProveedoresTable`
- [ ] `tsc` GREEN

---

## FASE 8 — CRUD Servicios

> ⚠️ Prerequisito: Backend `PATCH/DELETE /servicios/:id`

- [ ] Crear `EditarServicioModal.tsx`
- [ ] Agregar botones en `ServiciosTable`
- [ ] `tsc` GREEN

---

## FASE 9 — CRUD Tesorería — Cuentas Bancarias

- [ ] Crear `EditarCuentaModal.tsx`
- [ ] Agregar botón "Editar" en `CuentasBancariasTable`
- [ ] `tsc` GREEN

---

## FASE 10 — Verificación final

- [ ] `npm run test` → todos los tests pasan
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [ ] Sidebar sin corte visual
- [ ] Cargas sociales por empleado funcionando
- [ ] CRUD completo en todos los módulos (con permisos)

---

## Estado

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 0 | ConfirmDeleteModal | ⬜ Pendiente |
| FASE 1 | Fix Sidebar | ⬜ Pendiente |
| FASE 2 | Cargas Sociales | ⬜ Pendiente (requiere backend) |
| FASE 3 | CRUD Alquileres Inmuebles | ⬜ Pendiente |
| FASE 4 | CRUD Alquileres Contratos/Pagos | ⬜ Pendiente (requiere backend) |
| FASE 5 | CRUD Nóminas Empleados | ⬜ Pendiente |
| FASE 6 | CRUD Nóminas Guardias/Comp. | ⬜ Pendiente (requiere backend) |
| FASE 7 | CRUD Proveedores | ⬜ Pendiente |
| FASE 8 | CRUD Servicios | ⬜ Pendiente (requiere backend) |
| FASE 9 | CRUD Tesorería Cuentas | ⬜ Pendiente |
| FASE 10 | Verificación final | ⬜ Pendiente |
