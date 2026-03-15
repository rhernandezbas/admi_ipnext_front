# Feature: Dashboard

## Descripción
Vista ejecutiva principal. Es la pantalla de inicio post-login. Muestra el estado financiero consolidado del período actual: KPIs de pagos, una tabla de pagos urgentes accionables, distribución de egresos por categoría y actividad reciente del sistema.

## Ruta
`/dashboard`

## Acceso
- Admin: acceso total
- Sub-usuario: acceso de solo lectura (no puede ejecutar pagos desde aquí)

---

## Layout

```
┌─────────────────────────────────────────────────────┐
│ Sidebar (240px fijo)  │  Main Content (fill)        │
│                       │  padding: 32px 40px         │
│  Logo IPNEXT          │                             │
│  ─────────────        │  [Top Bar]                  │
│  Nav: Dashboard ●     │  [KPI Row — 4 cards]        │
│  Nav: Transferencias  │                             │
│  Nav: Nóminas & RRHH  │  [Bottom Section]           │
│  Nav: Proveedores     │   [Urgent Table] [Right Panel 280px]
│  Nav: Alquileres      │                             │
│  Nav: Servicios       │                             │
│  Nav: Tesorería       │                             │
│  Nav: Reportes        │                             │
│  ─────────────        │                             │
│  [Avatar] Nombre/Rol  │                             │
└─────────────────────────────────────────────────────┘
```

---

## Componentes

### Sidebar
- Logo: cuadrado rojo `#E42313` + texto "IPNEXT" (Space Grotesk 18 600)
- Navegación: 8 ítems con icono Lucide + label
  - Ítem activo: fondo rojo `#E42313`, texto blanco
  - Ítem inactivo: texto `#7A7A7A`
- Footer: avatar circular + nombre de usuario + rol

### Top Bar
- Título de página: "Dashboard" (Space Grotesk 24 600)
- Badge de período: "Marzo 2026" con ícono `calendar`
- Botón de notificaciones: ícono `bell` con borde

### KPI Row (4 tarjetas iguales en ancho `fill_container`)

| KPI | Ícono | Color valor | Subtítulo |
|-----|-------|-------------|-----------|
| Pendiente esta semana | `timer` | `#0D0D0D` | N pagos pendientes |
| Pagado este mes | `check` | `#0D0D0D` | N transferencias (verde `#22C55E`) |
| Pagos vencidos | `triangle-alert` | `#E42313` | $X en mora (rojo) |
| Próximos 7 días | `calendar` | `#0D0D0D` | N vencimientos próximos |

Cada card: fondo blanco, borde `#E8E8E8`, padding 20x24, valor en Space Grotesk 28 600.

### Tabla Pagos Urgentes
Tabla de pagos próximos a vencer o vencidos.

**Columnas:**
| Campo | Ancho | Notas |
|-------|-------|-------|
| BENEFICIARIO | 180px | Nombre del proveedor/entidad |
| CATEGORÍA | 130px | Badge de color según categoría |
| MONTO | 120px | Space Grotesk 500 |
| VENCIMIENTO | 120px | Rojo `#E42313` si vencido o muy próximo |
| ESTADO | 100px | Badge: VENCIDO (rojo) / PENDIENTE (amarillo) / PAGADO (verde) |
| ACCIÓN | 80px | Botón "Pagar" |

Header de columnas: fondo `#FAFAFA`, texto `#B0B0B0` 11px 500, borde inferior.
Filas: altura 48px, borde inferior `#E8E8E8`.
Acción "Pagar": botón rojo, solo visible para rol Admin.

### Panel Derecho (280px)

**Distribución de Egresos**
- Título "Distribución de Egresos" + subtítulo período
- Gráfico de barras agrupadas por mes (categorías: Alquileres, Obra Social, etc.)
- Leyenda con colores

**Actividad Reciente**
- Feed de últimas 4 acciones del sistema
- Cada ítem: ícono de categoría + descripción + monto + fecha
- Ordenado cronológicamente desc

---

## Estados de Pago (badges)

| Estado | Color fondo | Color texto | Label |
|--------|------------|------------|-------|
| VENCIDO | `#FEE2E2` | `#E42313` | VENCIDO |
| PENDIENTE | `#FEF9C3` | `#CA8A04` | PENDIENTE |
| PAGADO | `#DCFCE7` | `#16A34A` | PAGADO |

---

## Comportamiento

- El período mostrado (ej: "Marzo 2026") es el mes en curso, seleccionable.
- Los pagos urgentes muestran los próximos 7 días + los vencidos no pagados.
- El botón "Pagar" en la tabla redirige a `/transferencias/nueva` con el beneficiario pre-cargado.
- El gráfico de distribución muestra los últimos 6 meses.
- La actividad reciente refleja las últimas 4 operaciones registradas en el sistema.

---

## API Endpoints requeridos (para cuando se desarrolle el backend)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/dashboard/kpis?period=YYYY-MM` | KPIs del período |
| GET | `/api/dashboard/urgent-payments` | Pagos urgentes (próx. 7 días + vencidos) |
| GET | `/api/dashboard/expense-distribution?months=6` | Datos del gráfico de egresos |
| GET | `/api/dashboard/activity?limit=4` | Últimas actividades |
