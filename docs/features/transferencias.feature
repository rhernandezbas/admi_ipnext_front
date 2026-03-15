# Feature: Transferencias & Pagos

## Descripción
Módulo central de pagos. Permite registrar, visualizar y gestionar todas las transferencias de la empresa. Tiene 4 vistas: Lista, Calendario, Recurrentes y Nueva Carga.

## Ruta base
`/transferencias`

## Acceso
- Admin: lectura + escritura + aprobación
- Sub-usuario: configurable (lectura o escritura según permisos)

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Lista | `/transferencias` | Tabla completa de transferencias |
| Calendario | `/transferencias/calendario` | Vista mensual de vencimientos |
| Recurrentes | `/transferencias/recurrentes` | Pagos con frecuencia programada |
| Nueva Carga | `/transferencias/nueva` | Formulario para registrar transferencia |

Botón global: **+ Nueva Transferencia** (rojo, top-right) → redirige a `/transferencias/nueva`

---

## Vista: Lista

### Filtros
- Buscador por texto libre (beneficiario, referencia)
- Selector **Categoría**: todas las categorías del sistema
- Selector **Estado**: Todos / Pendiente / Pagado / Vencido / Programado
- Selector **Tipo**: Todos / Manual / Recurrente / Automático
- Botón **Generar XLS** (exportar tabla visible)

### Tabla de transferencias

| Columna | Descripción |
|---------|-------------|
| BENEFICIARIO / COMP. BANCO | Nombre + CBU/alias |
| FRECUENCIA / COMP. BANCO | Manual / Mensual / Semanal / etc. |
| CATEGORÍA | Badge de color por categoría |
| FECHA PRÓX. PAGO | Fecha próximo vencimiento |
| CRÉDITO / DÉBITO | Tipo de movimiento |
| MONTO | Importe (Space Grotesk 500) |
| CATEGORÍA | Categoría del gasto |
| ESTADO | Badge: PENDIENTE / PAGADO / VENCIDO / PROGRAMADO |
| NOTAS | Texto libre o ícono de nota |

Filas con estado VENCIDO: fondo rojo suave `#FEF2F2`.
Filas con estado PROGRAMADO: estado en verde `#22C55E`.

---

## Vista: Calendario

- Navegación de mes con `<` `>` y selector de mes/año
- Botones de vista: **Mes** / **Semana**
- Grilla de 7 columnas (LUN–DOM), filas por semana
- Cada día muestra eventos de pago como chips de color:
  - Rojo `#E42313`: vencido
  - Naranja/amarillo: próximo
  - Verde: pagado
- Chip muestra: nombre beneficiario + monto
- Click en chip → detalle del pago (modal o panel lateral)

---

## Vista: Recurrentes

Mismos filtros que Lista (buscador, categoría, estado, tipo).

### Columnas adicionales respecto a Lista
| Columna | Descripción |
|---------|-------------|
| FRECUENCIA | Manual / Mensual / Semanal / Semestral |
| FRECUENCIA PRÓX. BANCO | Próxima fecha de débito bancario |
| PRÓXIMO MES | Fecha próximo cobro |

Incluye botón **auto editar configuración** en columna de notas para recurrentes activas.

---

## Vista: Nueva Transferencia

### Formulario

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| Beneficiario | Autocomplete (texto) | Sí | Busca en directorio de proveedores |
| Monto | Input numérico | Sí | Default $0,00 |
| Fecha de Pago | Date picker | Sí | Default: hoy |
| Categoría | Select | Sí | Lista de categorías del sistema |
| Método de Pago | Select | Sí | Débito / Transferencia / Efectivo / etc. |
| Notas / Referencia | Textarea | No | Texto libre |

### Sección: Historial con este proveedor
- Panel colapsable debajo del formulario
- Muestra últimas N transferencias al mismo beneficiario
- Mensaje vacío si no hay historial: "No existe información asociada en la base de datos"

### Acciones
- **Cancelar** → vuelve a `/transferencias`
- **Registrar Transferencia** → guarda y redirige a lista con confirmación

---

## Estados de transferencia (badges)

| Estado | Fondo | Texto | Label |
|--------|-------|-------|-------|
| PENDIENTE | `#FEF9C3` | `#CA8A04` | PENDIENTE |
| PAGADO | `#DCFCE7` | `#16A34A` | PAGADO |
| VENCIDO | `#FEE2E2` | `#E42313` | VENCIDO |
| PROGRAMADO | `#DCFCE7` | `#16A34A` | PROGRAMADO |
| EN PROCESO | `#DBEAFE` | `#2563EB` | EN PROCESO |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/transferencias?page=&limit=&categoria=&estado=&tipo=` | Lista paginada con filtros |
| GET | `/api/transferencias/calendario?month=YYYY-MM` | Pagos del mes para vista calendario |
| GET | `/api/transferencias/recurrentes` | Solo transferencias recurrentes |
| POST | `/api/transferencias` | Crear nueva transferencia |
| GET | `/api/transferencias/beneficiario/:id/historial` | Historial de pagos a un beneficiario |
| GET | `/api/transferencias/export?format=xlsx` | Exportar a Excel |
