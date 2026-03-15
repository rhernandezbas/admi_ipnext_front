export interface FlujoCaja {
  id: string
  fecha: string
  descripcion: string
  tipo: 'nomina' | 'alquileres' | 'transferencias' | 'otro'
  monto: number
  ingreso: boolean
}

export interface CuentaBancaria {
  id: string
  banco: string
  tipoCuenta: string
  descripcion: string
  tipoEmpresa: string
  nroCuenta: string
  saldo: number
  ultimaActualizacion: string
  estado: 'activo' | 'inactivo'
}

export type ConciliacionEstado = 'conciliado' | 'pendiente' | 'observado'

export interface MovimientoConciliacion {
  id: string
  descripcion: string
  cuenta: string
  fecha: string
  debito?: number
  credito?: number
  estado: ConciliacionEstado
}

export interface ProyeccionItem {
  mes: string
  ingresos: number
  egresos: number
  saldo: number
}
