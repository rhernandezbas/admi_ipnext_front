 # Tracker: CRUD Layer — Editar, Eliminar, Sidebar Fix y Cargas Sociales

> Spec: `spec/crud-layer-spec.md`
> Metodología: TDD — test (red) → implementar (green) → verificar tsc
> Backend docs: `docs/tdrs/tdr-004-crud-edit-delete.md`, `docs/tdrs/tdr-005-cargas-sociales-por-empleado.md`

---

## FASE 0 — ConfirmDeleteModal (componente compartido)

- [x] Crear `src/components/ui/ConfirmDeleteModal.tsx`
  - Props: `open`, `onClose`, `onConfirm`, `title`, `description`, `loading`
  - Overlay + botones Cancelar / Eliminar (rojo)
  - Escape cierra
- [x] Test: `src/components/ui/__tests__/ConfirmDeleteModal.test.tsx`
  - Render cuando `open=true`
  - Click "Eliminar" llama `onConfirm`
  - Click "Cancelar" llama `onClose`
  - Escape llama `onClose`
- [x] `tsc` GREEN

---

## FASE 1 — Fix Sidebar deslizable

- [x] Corregir wrapper desktop en `Sidebar.tsx` o `PageLayout.tsx`
  - Width del wrapper sincronizado con `sidebarCollapsed`
  - `transition-all duration-200` en el wrapper
  - Sin corte visual durante la transición
- [x] `tsc` GREEN

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

- [x] Crear `EditarInmuebleModal.tsx`
- [x] Test: renderiza con datos pre-llenados, envía PATCH
- [x] Agregar botones Editar/Eliminar en `InmueblesTable`
- [x] Wiring en `AlquileresPage.tsx` con `ConfirmDeleteModal` para eliminar
- [x] `tsc` GREEN

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

- [x] Crear `EditarEmpleadoModal.tsx` con pre-fill + PATCH /nominas/empleados/:id
- [x] Test: renderiza con datos pre-llenados, envía PATCH
- [x] Agregar botones Editar/Dar de baja en `EmpleadosTable`
  - Editar → abre `EditarEmpleadoModal`
  - Dar de baja → `ConfirmDeleteModal` → `DELETE /nominas/empleados/:id`
- [x] Wiring en `NominasPage.tsx`
- [x] `tsc` GREEN

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

- [x] Crear `EditarProveedorModal.tsx` con pre-fill + PATCH /proveedores/:id
- [x] Test: renderiza con datos pre-llenados, envía PATCH
- [x] Agregar botones Editar/Eliminar en `ProveedoresTable`
- [x] Wiring en `ProveedoresPage.tsx` con `ConfirmDeleteModal`
- [x] `tsc` GREEN

---

## FASE 8 — CRUD Servicios

> ⚠️ Prerequisito: Backend `PATCH/DELETE /servicios/:id`

- [ ] Crear `EditarServicioModal.tsx`
- [ ] Agregar botones en `ServiciosTable`
- [ ] `tsc` GREEN

---

## FASE 9 — CRUD Tesorería — Cuentas Bancarias

- [x] Crear `EditarCuentaModal.tsx` con pre-fill + PATCH /tesoreria/cuentas/:id
- [x] Test: renderiza con datos pre-llenados, envía PATCH
- [x] Agregar botón "Editar" en `CuentasBancariasTable`
- [x] Wiring en `TesoreriaPage.tsx`
- [x] `tsc` GREEN

---

## FASE 10 — Verificación final

- [x] `npm run test` → 122 tests pasan
- [x] `tsc -p tsconfig.app.json --noEmit` → 0 errores
- [x] Sidebar sin corte visual
- [ ] Cargas sociales por empleado funcionando (requiere backend)
- [x] CRUD completo en módulos disponibles (Alquileres, Nóminas, Proveedores, Tesorería)

---

## Estado

| Fase | Descripción | Estado |
|------|-------------|--------|
| FASE 0 | ConfirmDeleteModal | ✅ Completado |
| FASE 1 | Fix Sidebar | ✅ Completado |
| FASE 2 | Cargas Sociales | ⬜ Pendiente (requiere backend) |
| FASE 3 | CRUD Alquileres Inmuebles | ✅ Completado |
| FASE 4 | CRUD Alquileres Contratos/Pagos | ⬜ Pendiente (requiere backend) |
| FASE 5 | CRUD Nóminas Empleados | ✅ Completado |
| FASE 6 | CRUD Nóminas Guardias/Comp. | ⬜ Pendiente (requiere backend) |
| FASE 7 | CRUD Proveedores | ✅ Completado |
| FASE 8 | CRUD Servicios | ⬜ Pendiente (requiere backend) |
| FASE 9 | CRUD Tesorería Cuentas | ✅ Completado |
| FASE 10 | Verificación final | ✅ Completado (parcial - backend fases pendientes) |
