# Feature: Alquileres & Inmuebles

## Descripción
Gestión de inmuebles alquilados por la empresa: contratos de alquiler, registro de pagos y recibos, y control de vencimientos y renovaciones próximas.

## Ruta base
`/alquileres`

## Acceso
- Admin: lectura + escritura + registro de pagos
- Sub-usuario: configurable

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Inmuebles | `/alquileres` | Vista principal con inmuebles activos |
| Contratos de Alquiler | `/alquileres/contratos` | Contratos vigentes y vencidos |
| Pagos & Recibos | `/alquileres/pagos` | Historial y estado de pagos |
| Vencimientos | `/alquileres/vencimientos` | Alertas de contratos próximos a vencer |

Botones globales:
- **Registrar Pago** (secundario, outline)
- **+ Nuevo Inmueble** (rojo)

---

## Vista: Inmuebles

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Total inmuebles | Cantidad total en cartera |
| Pagos al corriente | Fracción pagada: N / total (verde si al día) |
| Pendientes / Vencidos | Cantidad de pagos pendientes o vencidos |
| Próximo vencimiento | Fecha del próximo vencimiento (resaltado si <15 días) |

### Tabla de inmuebles

| Columna | Descripción |
|---------|-------------|
| INMUEBLE / DIRECCIÓN | Nombre del inmueble + dirección completa |
| PROPIETARIO | Nombre del propietario |
| USO | Tipo de uso: Nodo / Oficina / Depósito / etc. |
| ALQUILER / MES | Importe mensual |
| PRÓX. AJUSTE | Fecha próximo ajuste de precio |
| CBU / ALIAS | Datos bancarios para el pago |
| ESTADO | Badge de estado de pago |

### Estados de pago (badges)

| Estado | Color fondo | Texto | Label |
|--------|------------|-------|-------|
| Pagado | `#DCFCE7` | `#16A34A` | PAGADO |
| Pendiente | `#FEF9C3` | `#CA8A04` | PENDIENTE |
| Vencido | `#FEE2E2` | `#E42313` | VENCIDO |

---

## Vista: Contratos de Alquiler

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Contratos activos | Cantidad vigentes |
| Por renovar (60 días) | Contratos a vencer en 60 días |
| Contratos vencidos | Cantidad vencidos sin renovar |
| Próxima renovación | Fecha de renovación más cercana (grande, destaca mes) |

### Tabla de contratos

| Columna | Descripción |
|---------|-------------|
| INMUEBLE / DIRECCIÓN | Nombre + dirección |
| PROPIETARIO | Nombre del propietario |
| VIGENCIA | Fecha inicio – Fecha fin |
| AJUSTE | Frecuencia y tipo de ajuste (ej: 6 meses) |
| ALQUILER MENSUAL | Monto actual |
| ESTADO | Badge de estado |

### Estados de contratos

| Estado | Color | Label |
|--------|-------|-------|
| Por vencer | Naranja | Por vencer |
| Vigente | Verde | Vigente |
| Vencido | Rojo | Vencido |

---

## Vista: Pagos & Recibos

Subtítulo: período del mes actual (ej: "Registro de pagos de inmuebles — 01/11/2026")

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Pagos este mes | Cantidad de pagos registrados |
| Total acumulado | Suma total pagada en el mes/período |
| Recibos pendientes | Cantidad de recibos por confirmar |
| Último pago | Fecha del último pago registrado |

### Tabla de pagos

| Columna | Descripción |
|---------|-------------|
| INMUEBLE | Nombre del inmueble |
| PERÍODO | Mes/período del pago |
| FECHA PAGO | Fecha en que se realizó el pago |
| MONTO | Importe pagado |
| NRO. RECIBO | Número de recibo (vacío si pendiente) |
| ESTADO | Badge: Pagado / Pendiente |

---

## Vista: Vencimientos de Contratos

Subtítulo: "Gestión de vencimientos, renovaciones y alertas"

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Vencen en 30 días | Contratos que vencen en el mes |
| Vencen en 60 días | Contratos por renovar en 2 meses |
| Vencidos sin renovar | Contratos vencidos sin gestión |
| Próxima renovación | Fecha más cercana (grande, formato "DD Mes") |

### Tabla de vencimientos

| Columna | Descripción |
|---------|-------------|
| INMUEBLE / CONTRATO | Nombre del inmueble |
| PROPIETARIO | Nombre del propietario |
| FECHA INICIO | Inicio del contrato |
| FECHA VENCIMIENTO | Fecha de vencimiento (rojo si vencido, naranja si próximo) |
| DÍAS RESTANTES | Días hasta el vencimiento (negativo = vencido) |
| ESTADO | Badge de urgencia |

### Estados de vencimiento

| Estado | Color | Label |
|--------|-------|-------|
| Próximo | Naranja | Próximo |
| Vencido | Rojo | Vencido |
| Vigente | Verde | Vigente |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/alquileres/inmuebles` | Lista de inmuebles |
| GET | `/api/alquileres/contratos` | Contratos de alquiler |
| GET | `/api/alquileres/pagos?period=YYYY-MM` | Pagos del período |
| GET | `/api/alquileres/vencimientos` | Contratos próximos a vencer |
| POST | `/api/alquileres/pagos` | Registrar pago |
| POST | `/api/alquileres/inmuebles` | Crear inmueble |
| PATCH | `/api/alquileres/contratos/:id/renovar` | Renovar contrato |
