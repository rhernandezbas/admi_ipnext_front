export interface Empleado {
  id: string
  nombre: string
  puesto: string
  area: string
  rol: string
  cargo: string
  sueldoBase: number
  obraSocial: string
  netoMes: number
}

export interface Guardia {
  id: string
  nombre: string
  turno: string
  hsTrabajadas: number
  horasExtras: number
  ausencias: number
  estado: 'regular' | 'autorizado' | 'revisar'
}

export type CompensacionTipo = 'vacaciones' | 'bono_productividad' | 'adelanto_sueldo'
export type CompensacionEstado = 'aprobado' | 'pendiente' | 'en_cuotas'

export interface Compensacion {
  id: string
  empleado: string
  tipo: CompensacionTipo
  detalle: string
  monto: number
  periodo: string
  estado: CompensacionEstado
}
