# Feature: Servicios & Utilities

## Descripción
Control de todos los servicios y gastos operativos recurrentes de la empresa: obra social, internet y telefonía, energía eléctrica, seguridad y software. Cada categoría tiene su sub-vista con su propia tabla y KPIs.

## Ruta base
`/servicios`

## Acceso
- Admin: lectura + escritura
- Sub-usuario: configurable

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Resumen General | `/servicios` | Vista consolidada de todos los servicios |
| Internet & Telefonía | `/servicios/internet` | Servicios de conectividad |
| Energía | `/servicios/energia` | Consumo eléctrico por sede |
| Seguridad | `/servicios/seguridad` | Servicios de seguridad privada |
| Software | `/servicios/software` | Licencias y suscripciones de software |

---

## Vista: Resumen General

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Gasto total | Suma total mensual de todos los servicios |
| Servicios activos | Cantidad de contratos/servicios activos |
| Facturas próximas | Cantidad con vencimiento en los próximos días |
| Alertas o renovaciones | Cantidad de servicios próximos a vencer |

### Tarjetas por categoría (grid)
Una tarjeta por cada sub-categoría de servicio:
- **Obra Social**: proveedor, cantidad personas, monto mensual, estado
- **Energía Eléctrica**: N sedes, monto mensual, estado
- **Internet / Datos**: N líneas activas, monto mensual, estado
- **Seguro**: proveedor, monto mensual, estado

Cada tarjeta muestra los últimos registros con monto y badge de estado.

---

## Vista: Internet & Telefonía

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Gasto del mes | Total mensual en conectividad |
| Líneas activas | Cantidad de líneas/contratos activos |
| Facturas próximas | Cantidad a vencer próximamente (naranja si > 0) |
| Alertas de vencimiento | Cantidad de contratos próximos a vencer |

### Tabla de servicios

| Columna | Descripción |
|---------|-------------|
| SERVICIO | Nombre del servicio (ej: Internet Fibra — Sede Central) |
| PROVEEDOR | Nombre del proveedor |
| LÍNEAS / MB | Cantidad de líneas o velocidad contratada |
| MONTO MENSUAL | Importe mensual (Space Grotesk 500) |
| VTO. FACTURA | Fecha vencimiento factura (rojo si vencido) |
| ESTADO | Badge: Activo / Próximo a vencer / Inactivo |

---

## Vista: Energía Eléctrica

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Gasto del mes | Total mensual en energía |
| Medidores activos | Cantidad de puntos de suministro |
| Facturas próximas | Próximas a vencer (naranja si > 0) |
| Alertas de vencimiento | Cantidad de alertas activas |

### Tabla de servicios

| Columna | Descripción |
|---------|-------------|
| PUNTO / SEDE | Nombre del punto de suministro (ej: Sede Central — Planta Baja) |
| PROVEEDOR | Empresa distribuidora |
| KW (APROX.) | Consumo estimado mensual en KW |
| MONTO MENSUAL | Importe mensual |
| VTO. FACTURA | Fecha de vencimiento (rojo si vencido/próximo) |
| ESTADO | Badge: Activo / Próximo a vencer |

---

## Vista: Seguridad

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Gasto del mes | Total mensual en seguridad |
| Servicios activos | Cantidad de contratos activos |
| Facturas próximas | Próximas a vencer |
| Guardias activos / turno | Cantidad de guardias en turno activo |

### Tabla de servicios

| Columna | Descripción |
|---------|-------------|
| ZONA / SERVICIO | Descripción del servicio (ej: Vigilancia — Sede Central) |
| PROVEEDOR | Empresa de seguridad |
| COBERTURA | Descripción (ej: 24/7 — 2 guardias) |
| COSTO MENSUAL | Importe mensual |
| VIGENCIA | Cantidad de meses restantes |
| ESTADO | Badge: Activo / Inactivo |

---

## Vista: Software

### KPIs superiores (4 cards)
| KPI | Descripción |
|-----|-------------|
| Gasto del mes | Total mensual en licencias/suscripciones |
| Licencias activas | Cantidad de software activo |
| Renovaciones próximas | Cantidad a renovar próximamente (naranja si > 0) |
| Licencias a cancelar | Cantidad marcadas para cancelación |

### Tabla de servicios

| Columna | Descripción |
|---------|-------------|
| SOFTWARE | Nombre del software + descripción de uso |
| PROVEEDOR | Empresa/plataforma |
| LICENCIAS | Cantidad de asientos/usuarios |
| COSTO MENSUAL | Importe mensual o equivalente mensual |
| RENOVACIÓN | Fecha próxima renovación (rojo si próxima) |
| ESTADO | Badge: Activo / Próximo a vencer / Inactivo |

---

## Estados comunes (badges)

| Estado | Color fondo | Texto | Label |
|--------|------------|-------|-------|
| Activo | `#DCFCE7` | `#16A34A` | Activo |
| Próximo a vencer | `#FEF9C3` | `#CA8A04` | Próximo a vencer |
| Inactivo | `#F3F4F6` | `#6B7280` | Inactivo |

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/servicios/resumen?period=YYYY-MM` | KPIs consolidados |
| GET | `/api/servicios/internet` | Servicios de conectividad |
| GET | `/api/servicios/energia` | Servicios de energía |
| GET | `/api/servicios/seguridad` | Servicios de seguridad |
| GET | `/api/servicios/software` | Licencias de software |
| POST | `/api/servicios` | Crear servicio (body: tipo + campos) |
| PATCH | `/api/servicios/:id` | Editar servicio |
