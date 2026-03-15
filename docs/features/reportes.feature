# Feature: Reportes & Analytics

## Descripción
Centro de informes del sistema. Permite generar, visualizar y exportar reportes consolidados por categoría: financiero general, nómina, proveedores, inmuebles y exportación masiva. Cada tab tiene una lista de informes disponibles a izquierda y una vista previa del informe seleccionado a derecha.

## Ruta base
`/reportes`

## Acceso
- Admin: acceso total + exportación
- Sub-usuario: acceso solo a los módulos que tiene permiso

---

## Tabs de navegación

| Tab | Ruta | Descripción |
|-----|------|-------------|
| Financiero | `/reportes` | Informes de egresos e ingresos generales |
| Nómina | `/reportes/nomina` | Informes de liquidaciones y personal |
| Proveedores | `/reportes/proveedores` | Informes de pagos a proveedores |
| Inmuebles | `/reportes/inmuebles` | Informes de alquileres |
| Exportar | `/reportes/exportar` | Exportación masiva de datos |

Botón global: **Generar todos** (rojo, top-right) → genera todos los informes del período activo

---

## Layout general de cada tab

```
┌────────────────────────────────────────────────────┐
│  Lista de informes (izq, ~40%)  │  Vista previa    │
│                                  │  (der, ~60%)    │
│  [Informe 1]  PDF  XLS  ...     │                  │
│  [Informe 2]  PDF  XLS  ...     │  Gráfico barra   │
│  [Informe 3]  PDF  XLS  ...     │  horizontal      │
│  [Informe 4]  PDF  XLS  Enviar  │                  │
│                                  │  KPIs rápidos   │
└────────────────────────────────────────────────────┘
```

---

## Vista: Financiero

### Informes disponibles
| Informe | Formatos | Descripción |
|---------|----------|-------------|
| Reporte de Egresos | PDF / XLS | Todos los egresos del período por categoría |
| Balance Mensual | PDF / XLS / Enviar | Balance ingreso-egreso del mes |
| Flujo de Caja | PDF / XLS / Enviar | Detalle de flujo de caja |
| Informe Ejecutivo | PDF / XLS / Enviar | Resumen ejecutivo del período |

### Vista previa (panel derecho)
- Título: "Vista previa — Egresos Marzo 2026"
- Gráfico de barras horizontal: distribución de egresos por categoría
  - Nómina / Alquileres / Servicios / Transferencias / Otros
  - Monto por cada categoría
- KPIs rápidos: Total egresos / % vs mes anterior / Total conceptos

---

## Vista: Nómina

### Informes disponibles
| Informe | Formatos | Descripción |
|---------|----------|-------------|
| Liquidación Mensual | PDF / XLS | Detalle de liquidación de sueldos |
| Recibo de Liquidación | PDF / XLS / Enviar | Recibos individuales por empleado |
| Compensaciones | PDF / XLS / Enviar | Detalle de compensaciones adicionales |
| Histórico de Nómina | PDF / XLS / Enviar | Evolución histórica de la nómina |

### Vista previa (panel derecho)
- Título: "Vista previa — Liquidación Marzo 2026"
- Gráfico: distribución de nómina por área/rol (Gerencia / Operativo / etc.)
- KPIs: Total nómina / % variación mensual / Empleados liquidados

---

## Vista: Proveedores

### Informes disponibles
| Informe | Formatos | Descripción |
|---------|----------|-------------|
| Ranking de Proveedores | PDF / XLS | Top proveedores por volumen de pago |
| Contratos Activos | PDF / XLS / Enviar | Estado de todos los contratos |
| Facturas Pendientes | PDF / XLS / Enviar | Facturas sin pagar |
| Histórico de Pagos | PDF / XLS / Enviar | Historial detallado por proveedor |

### Vista previa (panel derecho)
- Título: "Vista previa — Pagos a Proveedores Marzo 2026"
- Gráfico: distribución de egresos a proveedores por categoría
- KPIs: Total pagado / Proveedores activos / Facturas liquidadas

---

## Vista: Inmuebles

### Informes disponibles
| Informe | Formatos | Descripción |
|---------|----------|-------------|
| Contratos de Alquiler | PDF / XLS | Detalle de todos los contratos |
| Pagos & Recibos | PDF / XLS / Enviar | Historial de pagos de alquileres |
| Vencimientos | PDF / XLS / Enviar | Contratos próximos a vencer |
| Ajustes ICL | PDF / XLS / Enviar | Ajustes por índice de actualización |

### Vista previa (panel derecho)
- Título: "Vista previa — Alquileres Marzo 2026"
- Gráfico: distribución por inmueble
- KPIs: Total alquileres / % ajuste promedio / Inmuebles activos

---

## Vista: Exportar

### Exportaciones disponibles
| Exportación | Formatos | Descripción |
|-------------|----------|-------------|
| Exportar Nómina | PDF / XLS | Nómina completa del período |
| Exportar Proveedores | PDF / XLS / Enviar | Datos de proveedores y pagos |
| Exportar Alquileres | PDF / XLS / Enviar | Contratos y pagos de inmuebles |
| Exportar Seguros | PDF / XLS / Enviar | Servicios de seguro activos |

### Panel de resumen de exportaciones (panel derecho)
- Título: "Resumen de exportaciones — Marzo 2026"
- Gráfico: exportaciones realizadas por categoría (barras)
- KPIs: Exportaciones del mes / Formatos disponibles (PDF / Excel) / Última exportación: Hoy

---

## Componente: ítem de informe

```
┌──────────────────────────────────────────────────────┐
│ [icono color]  Título del informe                    │
│               Descripción corta del contenido        │
│                              [PDF] [XLS] [Enviar]    │
└──────────────────────────────────────────────────────┘
```

- Ícono con color por categoría (rojo, naranja, azul, verde)
- Botones de acción: PDF / XLS / Enviar (no todos los informes tienen todos)
- Click en fila → actualiza vista previa a derecha

---

## API Endpoints requeridos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/reportes/financiero?period=YYYY-MM` | Datos del reporte financiero |
| GET | `/api/reportes/nomina?period=YYYY-MM` | Datos del reporte de nómina |
| GET | `/api/reportes/proveedores?period=YYYY-MM` | Datos de reporte de proveedores |
| GET | `/api/reportes/inmuebles?period=YYYY-MM` | Datos de reporte de inmuebles |
| POST | `/api/reportes/generar` | Generar informe (body: tipo, período, formato) |
| POST | `/api/reportes/enviar` | Enviar informe por email |
| GET | `/api/reportes/export?tipo=&period=YYYY-MM&format=pdf\|xlsx` | Descargar informe |
