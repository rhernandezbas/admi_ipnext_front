# TDR-002: Modelo de Datos Principal

## Estado
Implementado — alineado con el backend (ver `administracion-backend/docs/tdrs/tdr-002-data-model.md`)

## Contexto
Definir las entidades principales del sistema para orientar tanto el frontend (tipos TypeScript) como el futuro diseño del backend.

## Entidades Principales

### Usuario
```typescript
interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'sub-usuario'
  permisos: {
    dashboard: boolean
    transferencias: 'lectura' | 'escritura' | 'ninguno'
    nominas: 'lectura' | 'escritura' | 'ninguno'
    proveedores: 'lectura' | 'escritura' | 'ninguno'
    servicios: 'lectura' | 'escritura' | 'ninguno'
    alquileres: 'lectura' | 'escritura' | 'ninguno'
    tesoreria: 'lectura' | 'escritura' | 'ninguno'
    reportes: 'lectura' | 'escritura' | 'ninguno'
  }
  avatar?: string
  creadoEn: string
}
```

### Transferencia
```typescript
type EstadoTransferencia = 'pendiente' | 'pagado' | 'vencido' | 'programado' | 'en_proceso'
type FrecuenciaTransferencia = 'manual' | 'mensual' | 'semanal' | 'quincenal' | 'semestral' | 'anual'

interface Transferencia {
  id: string
  beneficiario: string
  cbu?: string
  alias?: string
  categoria: CategoriaGasto
  monto: number
  moneda: 'ARS' | 'USD'
  fechaPago: string
  fechaVencimiento?: string
  frecuencia: FrecuenciaTransferencia
  estado: EstadoTransferencia
  metodoPago: 'transferencia' | 'debito' | 'efectivo' | 'cheque'
  notas?: string
  proveedorId?: string
  creadoPor: string
  creadoEn: string
}
```

### Empleado
```typescript
interface Empleado {
  id: string
  nombre: string
  puesto: string
  area: string
  rol: string
  sueldoBruto: number
  obraSocial: string
  activo: boolean
  fechaIngreso: string
  avatar?: string
}

interface Liquidacion {
  id: string
  empleadoId: string
  periodo: string          // YYYY-MM
  sueldoBruto: number
  deducciones: number
  netoAPagar: number
  estado: 'borrador' | 'aprobada' | 'pagada'
  aprobadoPor?: string
  creadoEn: string
}
```

### Proveedor
```typescript
interface Proveedor {
  id: string
  nombre: string
  cuit: string
  cbu?: string
  alias?: string
  email?: string
  categoria: CategoriaGasto
  sitioWeb?: string
  activo: boolean
  creadoEn: string
}

interface ContratoProveedor {
  id: string
  codigo: string           // CTR-2024-001
  proveedorId: string
  vigenciaDesde: string
  vigenciaHasta: string
  montoAnual: number
  renovacion?: string
  estado: 'activo' | 'proximo_a_vencer' | 'vencido' | 'en_proceso'
}
```

### Inmueble
```typescript
interface Inmueble {
  id: string
  nombre: string
  direccion: string
  propietario: string
  uso: 'nodo' | 'oficina' | 'deposito' | 'otro'
  alquilerMensual: number
  cbu?: string
  alias?: string
  estado: 'pagado' | 'pendiente' | 'vencido'
}

interface ContratoAlquiler {
  id: string
  inmuebleId: string
  vigenciaDesde: string
  vigenciaHasta: string
  ajusteFrecuencia: string   // "6 meses", "anual", etc.
  montoMensual: number
  estado: 'vigente' | 'por_vencer' | 'vencido'
}
```

### Servicio
```typescript
type TipoServicio = 'internet' | 'energia' | 'seguridad' | 'software' | 'obra_social' | 'seguro'

interface Servicio {
  id: string
  nombre: string
  tipo: TipoServicio
  proveedor: string
  costoMensual: number
  vtoFactura?: string
  renovacion?: string
  estado: 'activo' | 'proximo_a_vencer' | 'inactivo'
  metadata?: Record<string, unknown>  // campos específicos por tipo
}
```

### Categorías de gasto
```typescript
type CategoriaGasto =
  | 'nomina'
  | 'alquiler'
  | 'internet_telefonia'
  | 'energia'
  | 'seguridad'
  | 'software'
  | 'obra_social'
  | 'seguro'
  | 'impuestos'
  | 'proveedor_general'
  | 'otro'
```

### Cuenta Bancaria
```typescript
interface CuentaBancaria {
  id: string
  banco: string
  tipoCuenta: string
  nroCuenta: string
  cbu?: string
  cci?: string
  saldoActual: number
  moneda: 'ARS' | 'USD'
  activa: boolean
  ultimaActualizacion: string
}
```

## Notas de implementación

- Tipos viven en `src/types/*.types.ts` y son usados en servicios, hooks y componentes.
- El backend retorna los datos envueltos en `{ "data": <payload> }` — el cliente Axios los desenvuelve automáticamente via interceptor (ver TDR-003).
- Fechas en request body: `YYYY-MM-DD`. Fechas en response: RFC3339 (`2026-03-15T00:00:00Z`).
- IDs son UUIDs (string). Montos son numbers (float).

## Consecuencias
- Estos tipos deben vivir en `src/types/` y ser usados en hooks y services.
- El backend respeta estas estructuras en sus respuestas JSON.
- Los campos opcionales (`?`) pueden no existir en registros históricos.
