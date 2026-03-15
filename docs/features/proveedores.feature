# Feature: Proveedores & Contratos

## Descripción
Directorio centralizado de proveedores con sus contratos asociados, historial de pagos y un ranking de proveedores por volumen facturado. Incluye panel lateral de detalle al seleccionar un proveedor.

## Ruta base
`/proveedores`

## Acceso
- Admin: lectura + escritura + gestión de contratos
- Sub-usuario: configurable

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Directorio | `/proveedores` | Lista de proveedores con panel de detalle |
| Contratos | `/proveedores/contratos` | Contratos activos y vencidos |
| Ranking de Pagos | `/proveedores/ranking` | Proveedores ordenados por volumen de pago |

Botón global: **+ Nuevo Proveedor** (rojo, top-right)

---

## Vista: Directorio

### Filtros
- Buscador texto libre (nombre, CUIT/RUT)
- Selector **No Habituales Completar** (proveedores esporádicos sin ficha completa)

### Tabla de proveedores

| Columna | Descripción |
|---------|-------------|
| PROVEEDOR | Nombre + email de contacto |
| CUIT | CUIT / RUT / NIT |
| CATEGORÍA | Badge de categoría (ej: IMPUESTOS/SOCIAL, SOFTWARE, etc.) |
| CBU / ALIAS | Datos bancarios |
| TOTAL ANUAL | Total pagado en el año |

### Panel lateral de detalle (280px)
Se abre al hacer click en una fila.

Contenido:
- Nombre del proveedor + logo/inicial
- CUIT, CBU/Alias, categoría, sitio web
- **Historial de pagos**: últimos N pagos con fecha y monto
  - Cada ítem: fecha + monto, color rojo si vencido
  - Ítem más reciente destacado
- Métricas rápidas: promedio mensual, max pago, min pago
- **Total pagos año** (grande, Space Grotesk)
- Botón **Registrar un Pago Nuevo**

---

## Vista: Contratos

### Tabla de contratos

| Columna | Descripción |
|---------|-------------|
| CONTRATO | Código de contrato (ej: CTR-2024-001) |
| PROVEEDOR | Nombre del proveedor |
| VIGENCIA | Fecha inicio – Fecha fin |
| MONTO ANUAL | Valor del contrato anual |
| RENOVACIÓN | Fecha de renovación |
| ESTADO | Badge de estado |

### Estados de contratos (badges)

| Estado | Color fondo | Texto | Label |
|--------|------------|-------|-------|
| Próximo a vencer | Naranja `#FEF3C7` | `#D97706` | Próximo a v. |
| Activo | Verde `#DCFCE7` | `#16A34A` | Activo |
| Vencido | Rojo `#FEE2E2` | `#E42313` | Vencido |
| En proceso | Azul `#DBEAFE` | `#2563EB` | En proceso |

---

## Vista: Ranking de Pagos

### KPIs superiores (3 cards)
| KPI | Descripción |
|-----|-------------|
| Total pagos acumulados | Suma total del año |
| Proveedores activos | Cantidad con al menos un pago en el año |
| Mayor proveedor | Nombre del proveedor con mayor volumen |

### Gráfico de barras horizontal (lado izquierdo)
- Barras por proveedor con monto total
- Color rojo IPNEXT

### Tabla de ranking (lado derecho)

| Columna | Descripción |
|---------|-------------|
| # | Posición en ranking |
| PROVEEDOR | Nombre |
| CATEGORÍA | Categoría del gasto |
| TOTAL PAGADO | Monto acumulado |
| ÚLT. PAGO | Fecha último pago |
| FACTURAS | Cantidad de facturas/transferencias |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/proveedores?page=&limit=&q=` | Lista de proveedores |
| GET | `/api/proveedores/:id` | Detalle + historial de pagos |
| POST | `/api/proveedores` | Crear proveedor |
| PATCH | `/api/proveedores/:id` | Editar proveedor |
| GET | `/api/proveedores/contratos` | Lista de contratos |
| POST | `/api/proveedores/contratos` | Crear contrato |
| GET | `/api/proveedores/ranking?period=YYYY` | Ranking por volumen de pagos |
