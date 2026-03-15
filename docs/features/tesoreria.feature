# Feature: Tesorería & Bancos

## Descripción
Control financiero central: flujo de caja proyectado, estado de cuentas bancarias, conciliación de movimientos y proyecciones de liquidez. Es el módulo más financiero del sistema.

## Ruta base
`/tesoreria`

## Acceso
- Admin: lectura + escritura + exportación
- Sub-usuario: configurable (generalmente solo lectura)

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Flujo de Caja | `/tesoreria` | Proyección de ingresos y egresos |
| Cuentas Bancarias | `/tesoreria/cuentas` | Estado de cuentas activas |
| Conciliación | `/tesoreria/conciliacion` | Reconciliación de movimientos |
| Proyecciones | `/tesoreria/proyecciones` | Proyección de liquidez a futuro |

Botones globales:
- **Exportar** (secundario, outline)
- **Registrar Movimiento** (rojo)

---

## Vista: Flujo de Caja

Subtítulo: período actual (ej: "Posición financiera — Marzo 2026")

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Saldo disponible | Suma de saldos en todas las cuentas activas |
| Balance proyectado 120 días | Proyección a 120 días (suma neta) |
| Runway de caja | Días de runway con el nivel de gasto actual |
| Compromisos a vencimiento | Cantidad de obligaciones próximas |

### Tarjetas de cuentas bancarias (una por cuenta)
Cada tarjeta muestra:
- Nombre del banco + tipo de cuenta
- Saldo actual (grande, Space Grotesk)
- Línea de crédito disponible / utilizada
- Ingresos proyectados (verde `#22C55E`)
- Egresos proyectados (rojo `#E42313`)

### Tabla: Flujo de Caja Proyectado — 70 días

| Columna | Descripción |
|---------|-------------|
| FECHA | Fecha del movimiento |
| DESCRIPCIÓN | Nombre del concepto (ej: "Liquidación Alquileres Martes") |
| TIPO | Badge tipo de movimiento |
| MONTO | Importe (verde si ingreso, rojo si egreso) |

Tipos de movimiento (badges):
- NÓMINA: azul
- ALQUILERES: naranja/marrón
- TRANSFERENCIAS: gris

---

## Vista: Cuentas Bancarias

Subtítulo: "Registro de movimientos — Marzo 2026"

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Saldo total | Suma total en todas las cuentas (todas las monedas convertidas) |
| Cuentas activas | Cantidad de cuentas registradas |
| Mayor saldo | Nombre del banco con mayor saldo (destacado en verde) |
| Movimientos del mes | Cantidad de movimientos registrados en el período |

### Tabla de cuentas

| Columna | Descripción |
|---------|-------------|
| BANCO / EMPRESA | Nombre del banco + tipo de cuenta + descripción |
| TIPO EMPRESA | CBU / CCI / etc. |
| NRO CUENTA / CBU | Número de cuenta o CBU |
| SALDO ACTUAL | Saldo vigente (Space Grotesk 500) |
| EST. ACTUALIZACIÓN | Fecha última actualización del saldo |
| ESTADO | Badge: Activo / Inactivo |

---

## Vista: Conciliación Bancaria

Subtítulo: "Revisión de movimientos — Marzo 2026"

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Movimientos totales | Cantidad total en el período |
| Conciliados | Cantidad confirmados como correctos |
| Pendientes | Cantidad por revisar (naranja si > 0) |
| Diferencias | Monto no conciliado (rojo si > $0) |

### Tabla de conciliación

| Columna | Descripción |
|---------|-------------|
| MOVIMIENTO | Descripción del movimiento (ej: "Pago alquiler — Transferencia bancaria") |
| CUENTA | Banco y tipo de cuenta |
| FECHA | Fecha del movimiento |
| DÉBITO | Monto debitado (rojo) |
| CRÉDITO | Monto acreditado (verde) |
| ESTADO | Badge de conciliación |

### Estados de conciliación (badges)

| Estado | Color | Label |
|--------|-------|-------|
| Conciliado | Verde | Conciliado |
| Pendiente | Amarillo | Pendiente |
| Observado | Naranja | Observado |

---

## Vista: Proyecciones

Subtítulo: "Análisis financiero — Marzo 2026"

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Ingresos proyectados 30 días | Suma ingresos estimados próximo mes |
| Egresos proyectados 120 días | Suma egresos estimados a 120 días |
| Saldo proyectado a fin de mes | Neto resultante (positivo verde / negativo rojo) |
| Cobertura de egresos | Múltiplo de cobertura (ej: 1.1x) |

### Tabla de proyecciones por período

| Columna | Descripción |
|---------|-------------|
| PERÍODO | Mes y estado (En Curso / Proyectado / Presupuestado) |
| INGRESOS | Monto estimado de ingresos |
| EGRESOS | Monto estimado de egresos |
| BALANCE NETO | Diferencia ingreso – egreso (verde positivo / rojo negativo) |
| COBERTURA | Estado de cobertura del período |

### Coberturas (badges)

| Estado | Color | Label |
|--------|-------|-------|
| En curso | Azul | En Curso |
| Proyectado | Naranja | Proyectado |
| Presupuestado | Gris | Presupuestado |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tesoreria/flujo?period=YYYY-MM&days=70` | Flujo de caja proyectado |
| GET | `/api/tesoreria/cuentas` | Cuentas bancarias activas |
| GET | `/api/tesoreria/conciliacion?period=YYYY-MM` | Movimientos para conciliación |
| PATCH | `/api/tesoreria/conciliacion/:id` | Marcar movimiento como conciliado |
| GET | `/api/tesoreria/proyecciones?months=3` | Proyecciones de liquidez |
| POST | `/api/tesoreria/movimientos` | Registrar movimiento manual |
| GET | `/api/tesoreria/export?period=YYYY-MM&format=xlsx` | Exportar reporte |
