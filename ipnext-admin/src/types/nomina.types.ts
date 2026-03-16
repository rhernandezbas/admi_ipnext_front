export interface Empleado {
  id: string
  nombre: string
  puesto: string
  area: string
  rol: string
  sueldoBruto: number
  obraSocial: string
  cargasSocialesPct: number
  cargasSocialesMonto: number | null
  fechaIngreso: string
  avatar?: string
}

/** Retorna el monto efectivo de cargas sociales para un empleado */
export function cargasSocialesCalculado(e: Empleado): number {
  if (e.cargasSocialesMonto != null) return e.cargasSocialesMonto
  return e.sueldoBruto * e.cargasSocialesPct / 100
}

export interface Guardia {
  id: string
  empleadoId: string
  empleadoNombre?: string
  fecha: string
  horas: number
  monto: number
}

export type CompensacionTipo = 'bono' | 'adelanto' | 'extra' | 'otro'
export type CompensacionEstado = 'aprobado' | 'pendiente' | 'rechazado'

export interface Compensacion {
  id: string
  empleadoId: string
  empleadoNombre?: string
  tipo: CompensacionTipo
  descripcion?: string
  monto: number
  fecha: string
  estado: CompensacionEstado
}
