# Spec: Interaction Layer — Modales, Gestión de Usuarios y Sidebar Deslizable

> Fecha: 2026-03-15
> Backend: Go 1.25 + Gin · JWT httpOnly cookie · Base `/api/v1`

---

## PARTE A — Infraestructura: Modal + Sidebar Deslizable

### A.1 — Componente `Modal`

**Archivo:** `src/components/ui/Modal.tsx`

**Props:**
```tsx
interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}
```

**Comportamiento:**
- Overlay semitransparente al fondo, click cierra
- `Escape` cierra el modal
- Scroll interno si el contenido es largo
- Animación de entrada/salida suave
- Focus trap dentro del modal mientras está abierto

---

### A.2 — Sidebar Deslizable (Collapsible)

**Archivo:** `src/components/layout/Sidebar.tsx`

**Estado:** `collapsed: boolean` persistido en `localStorage`

**Comportamiento:**
- Botón toggle `☰` / `←` en el header del sidebar
- En modo **expandido** (`collapsed=false`): ancho `w-60`, muestra ícono + texto del item
- En modo **colapsado** (`collapsed=true`): ancho `w-16`, muestra solo ícono centrado, tooltip al hover con el nombre
- Transición CSS suave `transition-all duration-200`
- El contenido principal (`<main>`) ajusta su `ml-` automáticamente
- En mobile: sidebar se oculta completamente, botón hamburguesa lo abre como drawer

**Estado Zustand o localStorage:**
```ts
// src/store/uiStore.ts
interface UIStore {
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}
```

---

## PARTE B — Botones de Acción por Módulo

### B.1 — Alquileres: Registrar Pago

**Trigger:** Botón "Registrar Pago" en `AlquileresPage`
**Modal:** `RegistrarPagoModal`
**Endpoint:** `POST /api/v1/alquileres/pagos`

**Formulario:**
```
- Inmueble *         → Select (lista de inmuebles activos desde GET /alquileres)
- Período *          → Input type="month" (YYYY-MM)
- Monto *            → Input number
- Fecha de Pago      → Input type="date" (opcional)
- Comprobante        → Input text (URL opcional)
```

**Request body:**
```json
{ "inmuebleId": "uuid", "periodo": "YYYY-MM", "monto": 95000, "fechaPago": "YYYY-MM-DD" }
```

**Post-submit:** Invalidar query `alquileres/pagos`, cerrar modal, toast "Pago registrado"

---

### B.2 — Alquileres: Nuevo Inmueble

**Trigger:** Botón "Nuevo Inmueble" en `AlquileresPage`
**Modal:** `NuevoInmuebleModal`
**Endpoint:** `POST /api/v1/alquileres`

**Formulario:**
```
- Nombre *           → Input text
- Dirección *        → Input text
- Propietario *      → Input text
- Uso *              → Select: residential | commercial | industrial | mixto
- Alquiler Mensual * → Input number
- CBU               → Input text (opcional)
- Alias             → Input text (opcional)
```

**Request body:**
```json
{ "nombre": "", "direccion": "", "propietario": "", "uso": "residential", "alquilerMensual": 0, "cbu": "", "alias": "" }
```

**Post-submit:** Invalidar query `alquileres`, cerrar modal, toast "Inmueble agregado"

---

### B.3 — Nóminas: Liquidar Nómina

**Trigger:** Botón "Liquidar Nómina" / "Iniciar Liquidación" en `NominasPage`
**Modal:** `LiquidarNominaModal`
**Endpoint:** `POST /api/v1/nominas/liquidaciones`

**Formulario:**
```
- Empleado *         → Select (lista desde GET /nominas/empleados?solo_activos=true)
- Período *          → Input type="month" (YYYY-MM)
- Sueldo Bruto *     → Input number (pre-filled con empleado.SueldoBruto)
- Deducciones *      → Input number (default 0)
- Neto a Pagar       → Calculated display: SueldoBruto - Deducciones (read-only)
```

**Request body:**
```json
{ "empleadoId": "uuid", "periodo": "YYYY-MM", "sueldoBruto": 180000, "deducciones": 18000 }
```

**Post-submit:** Invalidar query `nominas/liquidaciones`, cerrar modal, toast "Liquidación creada"

---

### B.4 — Nóminas: Nuevo Empleado

**Trigger:** Botón "+" o "Nuevo Empleado" (agregar a la lista)
**Modal:** `NuevoEmpleadoModal`
**Endpoint:** `POST /api/v1/nominas/empleados`

**Formulario:**
```
- Nombre *           → Input text
- Puesto *           → Input text
- Área *             → Input text
- Rol *              → Input text (ej: "Administrativo")
- Sueldo Bruto *     → Input number
- Obra Social *      → Input text
- Fecha de Ingreso * → Input type="date"
```

**Request body:**
```json
{ "nombre": "", "puesto": "", "area": "", "rol": "", "sueldoBruto": 0, "obraSocial": "", "fechaIngreso": "YYYY-MM-DD" }
```

**Post-submit:** Invalidar query `nominas/empleados`, cerrar modal, toast "Empleado agregado"

---

### B.5 — Nóminas: Registrar Guardia

**Trigger:** Botón en `GuardiasTable`
**Modal:** `RegistrarGuardiaModal`
**Endpoint:** `POST /api/v1/nominas/guardias`

**Formulario:**
```
- Empleado *         → Select (solo guardias desde empleados)
- Fecha *            → Input type="date"
- Horas *            → Input number (ej: 8)
- Monto *            → Input number
- Descripción        → Textarea (opcional)
```

**Request body:**
```json
{ "empleadoId": "uuid", "fecha": "YYYY-MM-DD", "horas": 8, "monto": 5000 }
```

---

### B.6 — Nóminas: Registrar Compensación

**Trigger:** Botón en `CompensacionesTable`
**Modal:** `RegistrarCompensacionModal`
**Endpoint:** `POST /api/v1/nominas/compensaciones`

**Formulario:**
```
- Empleado *         → Select
- Tipo *             → Select: bono | adelanto | extra | otro
- Monto *            → Input number
- Fecha *            → Input type="date"
- Descripción        → Textarea (opcional)
```

**Request body:**
```json
{ "empleadoId": "uuid", "tipo": "bono", "monto": 10000, "fecha": "YYYY-MM-DD", "descripcion": "" }
```

---

### B.7 — Proveedores: Nuevo Proveedor

**Trigger:** Botón "Nuevo Proveedor" en `ProveedoresPage`
**Modal:** `NuevoProveedorModal`
**Endpoint:** `POST /api/v1/proveedores`

**Formulario:**
```
- Nombre *           → Input text
- Categoría *        → Input text (ej: "Energía", "Software", "Seguridad")
- CUIT               → Input text (opcional)
- CBU               → Input text (opcional)
- Alias             → Input text (opcional)
- Email             → Input email (opcional)
- Sitio Web         → Input url (opcional)
```

**Request body:**
```json
{ "nombre": "", "categoria": "", "cuit": "", "cbu": "", "alias": "", "email": "", "sitioWeb": "" }
```

---

### B.8 — Proveedores: Nuevo Contrato

**Trigger:** Botón en `ContratosTable`
**Modal:** `NuevoContratoProveedorModal`
**Endpoint:** `POST /api/v1/proveedores/contratos`

**Formulario:**
```
- Proveedor *        → Select (lista desde GET /proveedores)
- Vigencia Desde *   → Input type="date"
- Vigencia Hasta *   → Input type="date"
- Monto Anual *      → Input number
- Descripción        → Textarea (opcional)
```

**Nota:** El `Codigo` (CTR-YYYY-XXXX) es generado automáticamente por el backend.

**Request body:**
```json
{ "proveedorId": "uuid", "vigenciaDesde": "YYYY-MM-DD", "vigenciaHasta": "YYYY-MM-DD", "montoAnual": 120000, "descripcion": "" }
```

---

### B.9 — Tesorería: Registrar Movimiento

**Trigger:** Botón "Registrar Movimiento" en `TesoreriaPage`
**Modal:** `RegistrarMovimientoModal`
**Endpoint:** `POST /api/v1/tesoreria/movimientos`

**Formulario:**
```
- Cuenta *           → Select (lista desde GET /tesoreria/cuentas?activa=true)
- Tipo *             → Select: ingreso | egreso
- Monto *            → Input number
- Descripción *      → Input text
- Fecha *            → Input type="date"
```

**Request body:**
```json
{ "cuentaId": "uuid", "tipo": "ingreso", "monto": 50000, "descripcion": "", "fecha": "YYYY-MM-DD" }
```

---

### B.10 — Dashboard: Pagar (fila urgente)

**Trigger:** Botón "Pagar" en cada fila de `UrgentPaymentsTable`
**Acción:** PATCH `/api/v1/transferencias/:id/estado`
**Request body:** `{ "estado": "pagado" }`
**Sin modal:** Confirmación inline o toast de confirmación
**Post-submit:** Invalidar query `dashboard/pagos-urgentes`, toast "Pago registrado"

---

## PARTE C — Gestión de Usuarios (Admin)

### C.1 — Nueva Página `UsuariosPage`

**Ruta:** `/usuarios`
**Solo visible para:** `rol === 'admin'`
**Archivo:** `src/modules/usuarios/UsuariosPage.tsx`

**Layout:**
- Header con título "Gestión de Usuarios" + botón "Nuevo Usuario"
- Tabla de sub-usuarios con columnas: Avatar, Nombre, Email, Rol, Estado, Permisos (chips), Acciones
- Panel lateral o modal para editar permisos al click en fila

---

### C.2 — Tabla de Usuarios

**Endpoint:** `GET /api/v1/usuarios` (admin_only)

**Respuesta shape:**
```json
{
  "ID": "uuid",
  "Nombre": "string",
  "Email": "string",
  "Rol": "sub-usuario",
  "Permisos": {
    "dashboard": true,
    "transferencias": "lectura|escritura|ninguno",
    "nominas": "lectura|escritura|ninguno",
    "proveedores": "lectura|escritura|ninguno",
    "servicios": "lectura|escritura|ninguno",
    "alquileres": "lectura|escritura|ninguno",
    "tesoreria": "lectura|escritura|ninguno",
    "reportes": "lectura|escritura|ninguno"
  },
  "Activo": true,
  "CreatedAt": "RFC3339"
}
```

**Columnas tabla:**
```
Avatar | Nombre | Email | Estado (badge Activo/Inactivo) | Permisos (chips) | Acciones (Editar, Desactivar)
```

---

### C.3 — Modal: Nuevo Usuario

**Endpoint:** `POST /api/v1/usuarios`

**Formulario:**
```
Datos básicos:
- Nombre *           → Input text
- Email *            → Input email
- Contraseña *       → Input password (min 8 chars)
- Confirmar clave *  → Input password (validación client-side)

Permisos granulares:
- Dashboard          → Toggle boolean (true/false)
- Transferencias     → Select: ninguno | lectura | escritura
- Nóminas            → Select: ninguno | lectura | escritura
- Proveedores        → Select: ninguno | lectura | escritura
- Servicios          → Select: ninguno | lectura | escritura
- Alquileres         → Select: ninguno | lectura | escritura
- Tesorería          → Select: ninguno | lectura | escritura
- Reportes           → Select: ninguno | lectura | escritura
```

**Request body:**
```json
{
  "nombre": "string",
  "email": "string",
  "password": "string",
  "rol": "sub-usuario",
  "permisos": {
    "dashboard": true,
    "transferencias": "escritura",
    "nominas": "lectura",
    "proveedores": "ninguno",
    "servicios": "lectura",
    "alquileres": "escritura",
    "tesoreria": "ninguno",
    "reportes": "lectura"
  }
}
```

---

### C.4 — Modal: Editar Usuario / Permisos

**Endpoint:** `PATCH /api/v1/usuarios/:id`

**Formulario (mismos campos que Nuevo Usuario, todos opcionales):**
- Nombre, Email → editables
- Permisos granulares → mismos toggles/selects
- Estado (Activo/Inactivo) → Toggle `activo: boolean`

**No incluye cambio de contraseña** (está en modal separado C.5)

---

### C.5 — Modal: Cambio de Contraseña (Admin)

**Endpoint:** `PATCH /api/v1/usuarios/:id`
**Request body:** `{ "password": "nueva_clave" }`

**Formulario:**
```
- Nueva Contraseña *        → Input password
- Confirmar Contraseña *    → Input password (validación client-side)
```

**Nota:** El backend recibe la nueva clave en texto plano y aplica bcrypt.

---

### C.6 — Modal: Cambio de Contraseña (Perfil propio)

**Endpoint:** `PATCH /api/v1/usuarios/:id` (usando el ID del usuario logueado)
**Acceso:** Cualquier usuario autenticado sobre su propio ID
**Trigger:** Link "Cambiar contraseña" en el menú de perfil del header

**Formulario:**
```
- Nueva Contraseña *        → Input password
- Confirmar Contraseña *    → Input password (validación client-side)
```

---

### C.7 — Desactivar / Reactivar Usuario

**Endpoint:** `PATCH /api/v1/usuarios/:id` con `{ "activo": false }`
**Acción:** Botón "Desactivar" en la fila de la tabla, con confirmación inline
**Reversa:** Botón "Reactivar" si `activo=false`

**Nota:** `DELETE /api/v1/usuarios/:id` es soft delete (equivale a `activo=false`)

---

### C.8 — Entrada en Sidebar (solo admin)

**Ítem de menú:** "Usuarios" con ícono `Users` de lucide-react
**Ruta:** `/usuarios`
**Condicional:** Renderizar solo si `usuario.Rol === 'admin'`

---

## PARTE D — Infraestructura de Permisos en Frontend

### D.1 — Guard de permisos en rutas

**Hook:** `usePermiso(modulo: string, nivel?: 'lectura' | 'escritura'): boolean`

```ts
// src/hooks/usePermiso.ts
export function usePermiso(modulo: keyof Permisos, nivel?: 'lectura' | 'escritura'): boolean {
  const { usuario } = useAuthStore()
  if (!usuario) return false
  if (usuario.Rol === 'admin') return true
  const p = usuario.Permisos[modulo]
  if (nivel === 'escritura') return p === 'escritura'
  if (nivel === 'lectura') return p === 'lectura' || p === 'escritura'
  return Boolean(p)
}
```

### D.2 — Ocultar botones de escritura según permiso

```tsx
// En cada page, el botón de acción se renderiza condicionalmente:
const puedeEscribir = usePermiso('alquileres', 'escritura')
// ...
{puedeEscribir && <Button onClick={...}>Registrar Pago</Button>}
```

---

## PARTE E — Types TypeScript

### E.1 — Tipos nuevos o actualizados

**`src/types/usuario.types.ts`** (nuevo):
```ts
export type PermisoNivel = 'lectura' | 'escritura' | 'ninguno'

export interface Permisos {
  dashboard: boolean
  transferencias: PermisoNivel
  nominas: PermisoNivel
  proveedores: PermisoNivel
  servicios: PermisoNivel
  alquileres: PermisoNivel
  tesoreria: PermisoNivel
  reportes: PermisoNivel
}

export interface Usuario {
  ID: string
  Nombre: string
  Email: string
  Rol: 'admin' | 'sub-usuario'
  Permisos: Permisos
  Avatar: string | null
  Activo: boolean
  CreatedAt: string
  UpdatedAt: string
}

export interface NuevoUsuarioForm {
  nombre: string
  email: string
  password: string
  permisos: Permisos
}
```

### E.2 — Actualizar `useAuthStore`

El store debe guardar el usuario con tipado `Usuario` para que los permisos sean accesibles en todo el app.

---

## Criterio de Completitud

- [ ] `Modal.tsx` funcional con overlay, escape, focus trap
- [ ] Sidebar deslizable con estado persistido
- [ ] Todos los botones de acción con onClick + modal conectado
- [ ] Todos los formularios envían al endpoint correcto con TanStack Query mutation
- [ ] Toast de éxito/error en cada acción
- [ ] Página Usuarios completa (lista, crear, editar permisos, cambio clave, activar/desactivar)
- [ ] Guard `usePermiso` aplicado en botones de escritura
- [ ] `npm run test` → todos pasan
- [ ] `tsc` → 0 errores
