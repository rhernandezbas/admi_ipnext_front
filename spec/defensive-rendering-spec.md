# Spec: Defensive Rendering + Contract Gaps v2

> Contexto: El backend devuelve datos reales. El frontend crashea porque asume que todos
> los campos llegan siempre con el tipo y valor esperado. Esta spec cubre DOS problemas:
> 1. **Rendering no defensivo** — `.split()`, destructuring de maps con clave undefined
> 2. **Mismatches de contrato** — nombres de campo y valores de enum distintos al backend

---

## GAPS IDENTIFICADOS

### GAP-A: `Avatar` — `name.split(' ')` sobre `undefined`
- **Causa**: `Avatar` llama `name.split(' ')` directamente. Si `empleado.nombre` llega
  `undefined`/`null` del backend, crashea.
- **Afecta**: `EmpleadosTable`, `ProveedorDetailPanel`, cualquier lugar que use `<Avatar>`
- **Fix**: guard `(name ?? '').split(' ')` + fallback `'?'` si string vacío

### GAP-B: `RankingChart` — `r.proveedor.split(' ')` sobre `undefined`
- **Causa**: `r.proveedor` puede ser `undefined` si el backend no envía el campo
- **Fix**: `(r.proveedor ?? '').split(' ')`

### GAP-C: Map de estado sin fallback — destructuring crash
- **Causa**: `const { variant, label } = map[estado]` — si `estado` no está en el map
  (valor inesperado del backend o `undefined`), devuelve `undefined` y el destructuring crashea
- **Afecta**: `TransferenciasTable`, `RecurrentesTable`, `CalendarioView`, `ContratosTable`
  (proveedores), `CompensacionesTable`
- **Fix**: acceso seguro con fallback: `map[estado] ?? map['pendiente']` o similar

### GAP-D: `ContratoEstado` — valor incorrecto
- **Backend envía**: `"proximo_a_vencer"`
- **Frontend type**: `'proximo_vencer'` (falta `_a_`)
- **Afecta**: `ContratosTable.tsx` (proveedores) — el badge nunca matchea
- **Fix**: corregir type a `'proximo_a_vencer'` y actualizar el map

### GAP-E: `Inmueble.alquilerMes` vs backend `alquilerMensual`
- **Backend envía**: `alquilerMensual` (float64)
- **Frontend espera**: `alquilerMes` (number)
- **Resultado**: siempre `undefined` → crash en `formatARS(i.alquilerMes)`
- **Fix**: renombrar tipo a `alquilerMensual`

### GAP-F: `CuentaBancaria.saldo` vs backend `saldoActual`
- **Backend envía**: `saldoActual` (float64)
- **Frontend espera**: `saldo` (number)
- **Resultado**: siempre `undefined` → crash en `formatARS(c.saldo)`
- **Fix**: renombrar tipo a `saldoActual`

### GAP-G: `CuentaBancaria.estado` vs backend `activa`
- **Backend envía**: `activa: boolean` (true/false)
- **Frontend espera**: `estado: 'activo' | 'inactivo'` (string)
- **Resultado**: filtros `.filter(c => c.estado === 'activo')` nunca funcionan
- **Fix**: cambiar tipo a `activa: boolean`, actualizar filtros y badges

### GAP-H: `Servicio.montoMensual` vs backend `costoMensual`
- **Backend envía**: `costoMensual` (float64)
- **Frontend espera**: `montoMensual` (number)
- **Resultado**: siempre `undefined` → crash en `formatARS(s.montoMensual)`
- **Fix**: renombrar tipo a `costoMensual`, actualizar todos los componentes de Servicios

### GAP-I: `Transferencia.tipo` — campo inexistente en backend
- **Backend NO tiene** campo `tipo` — tiene `frecuencia` (`"manual"`, `"mensual"`, `"semanal"`,
  `"quincenal"`, `"semestral"`, `"anual"`)
- **Frontend filtra** por `t.tipo === 'recurrente'` (en `RecurrentesTable`)
- **Resultado**: RecurrentesTable siempre vacía
- **Fix**: derivar `tipo` en el servicio: `frecuencia !== 'manual'` → `'recurrente'`, else `'manual'`

### GAP-J: `Transferencia.fechaProximoPago` — campo inexistente en backend
- **Backend tiene**: `fechaPago` y `fechaVencimiento` (RFC3339)
- **Frontend espera**: `fechaProximoPago` (string)
- **Resultado**: columna siempre vacía
- **Fix**: mapear `fechaProximoPago = fechaVencimiento ?? fechaPago` en el servicio,
  formatear fecha RFC3339 → `DD/MM/YYYY`

### GAP-K: Fechas RFC3339 mostradas crudas
- **Backend envía**: `"2026-03-15T00:00:00Z"` (ISO 8601)
- **Frontend muestra**: la string cruda tal cual
- **Fix**: crear `formatFecha(iso: string | null | undefined): string` en `formatters.ts`
  que devuelva `DD/MM/YYYY` o `'—'`

---

## SOLUCIÓN

### 1. `src/lib/formatters.ts` — agregar `formatFecha`
```typescript
export function formatFecha(value: string | null | undefined): string {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value // si no es fecha válida, mostrar tal cual
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
```

### 2. `src/components/ui/Avatar.tsx` — guard en `name`
```typescript
const safeName = name ?? ''
const initials = safeName
  ? safeName.split(' ').map((n) => n[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
  : '?'
```

### 3. Función helper `safeVariant` para maps de estado
```typescript
function safeEstado<T extends string>(map: Record<T, R>, estado: unknown, fallback: T): R {
  return map[estado as T] ?? map[fallback]
}
```

### 4. Correcciones de tipos
| Tipo | Campo actual | Campo correcto |
|------|-------------|----------------|
| `Inmueble` | `alquilerMes` | `alquilerMensual` |
| `CuentaBancaria` | `saldo` / `estado: string` | `saldoActual` / `activa: boolean` |
| `Servicio` | `montoMensual` | `costoMensual` |
| `ContratoEstado` | `'proximo_vencer'` | `'proximo_a_vencer'` |
| `Transferencia` | `tipo`, `fechaProximoPago` | derivar desde `frecuencia`, `fechaVencimiento` |

### 5. Actualizar todos los componentes afectados
- Actualizar referencias a campos renombrados
- Agregar `formatFecha` donde se muestran fechas del backend

---

## Criterios de completitud

- [ ] `formatFecha` en `formatters.ts` con tests
- [ ] `Avatar` no crashea con `name=undefined`, `name=null`, `name=''`
- [ ] Ningún map de estado crashea con valor desconocido
- [ ] `ContratoEstado` = `'proximo_a_vencer'`
- [ ] `Inmueble.alquilerMensual` (no `alquilerMes`)
- [ ] `CuentaBancaria.saldoActual` + `activa: boolean`
- [ ] `Servicio.costoMensual` (no `montoMensual`)
- [ ] `Transferencia.tipo` derivado de `frecuencia`
- [ ] `RecurrentesTable` filtra por `frecuencia !== 'manual'`
- [ ] `npm run test` → todos pasan
- [ ] `tsc -p tsconfig.app.json --noEmit` → 0 errores
