# Feature: Nóminas & RRHH

## Descripción
Gestión completa del personal: empleados activos, proceso de liquidación mensual, registro de guardias y compensaciones adicionales. Centraliza todo lo relacionado con costos de personal.

## Ruta base
`/nominas`

## Acceso
- Admin: lectura + escritura + aprobación de liquidaciones
- Sub-usuario: configurable por módulo

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Empleados | `/nominas` | Lista de empleados activos + resumen nómina |
| Liquidación | `/nominas/liquidacion` | Proceso de liquidación mensual |
| Guardias | `/nominas/guardias` | Registro de horas de guardia |
| Compensaciones Adicionales | `/nominas/compensaciones` | Bonos, adelantos y extras |

Botón global: **+ Liquidar Nómina** (rojo, top-right) → inicia proceso de liquidación del mes

---

## Vista: Empleados

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Empleados activos | Cantidad total de empleados activos |
| Total nómina bruta | Suma total del período |
| Empleados con aumento | Cantidad con ajuste en el período |
| Liquidaciones pendientes | Cantidad por aprobar |

### Panel derecho — Resumen Nómina
- Total nómina del período (monto grande)
- Desglose por tipo: Sueldos / Cargas sociales / Neto a pagar
- Botón **Ajustar Liquidación**
- Sección **Guardias del Mes**: cantidad de guardias por empleado + total guardias

### Tabla de empleados

| Columna | Descripción |
|---------|-------------|
| EMPLEADO | Avatar + nombre + puesto/área |
| ROL | Núcleo / Dic / etc. |
| CARGO | Descripción del puesto |
| SUELDO BASE | Monto bruto mensual (Space Grotesk 500) |
| OBRA SOCIAL | Obra social asignada |
| NETO MES | Neto calculado con deducciones (color verde `#22C55E`) |

---

## Vista: Guardias

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Guardias activas | Cantidad de empleados con guardias el mes |
| Horas primas mensuales | Total horas del mes |
| Costo total guardias | Monto total en $  (rojo `#E42313`) |
| Ausencias pagadas | Cantidad de ausencias con pago |

### Tabla de guardias

| Columna | Descripción |
|---------|-------------|
| GUARDIA | Nombre del empleado |
| TURNO | Turno asignado (Noche / Día / etc.) |
| HS TRABAJADAS | Horas efectivas |
| HORAS EXTRAS | Horas adicionales (color rojo si > umbral) |
| AUSENCIAS | Cantidad de ausencias |
| ESTADO | Badge: Regular / Autorizado con Justificar / Revisar |

---

## Vista: Compensaciones Adicionales

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Próximos vencimientos | Días hasta próximo pago de compensación |
| Monto total | Total a pagar en compensaciones del período |
| Adelantos activos | Monto total de adelantos vigentes |
| Pagos restantes | Cantidad de cuotas pendientes `X / total` |

### Tabla de compensaciones

| Columna | Descripción |
|---------|-------------|
| EMPLEADO | Nombre del empleado |
| TIPO | Tipo de compensación (badge): Vacaciones / Bono Productividad / Adelanto de sueldo |
| DETALLE | Descripción libre (ej: "3 días — Oficial 01/04") |
| MONTO | Importe (puede ser negativo para descuentos) |
| PERÍODO | Mes/año de aplicación |
| ESTADO | Badge: Aprobado / Pendiente de Aprobación / En cuotas (YYYY/MM/DD) |

---

## Estados de compensaciones (badges)

| Estado | Color | Label |
|--------|-------|-------|
| Aprobado | Verde `#22C55E` | Aprobado |
| Pendiente de Aprobación | Amarillo | Pendiente de Aprobación |
| En cuotas | Gris/azul | En cuotas (fecha) |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/empleados?activos=true` | Lista de empleados activos |
| GET | `/api/nominas/resumen?period=YYYY-MM` | KPIs y resumen del período |
| GET | `/api/nominas/guardias?period=YYYY-MM` | Guardias del período |
| GET | `/api/nominas/compensaciones?period=YYYY-MM` | Compensaciones adicionales |
| POST | `/api/nominas/liquidacion` | Iniciar proceso de liquidación |
| PATCH | `/api/nominas/liquidacion/:id/aprobar` | Aprobar liquidación |
| POST | `/api/nominas/compensaciones` | Registrar nueva compensación |
