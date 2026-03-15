export type TransferenciaEstado = 'pendiente' | 'pagado' | 'vencido' | 'programado' | 'en_proceso'
export type TransferenciaTipo = 'manual' | 'recurrente' | 'automatico'
export type TransferenciaFrecuencia = 'unica' | 'semanal' | 'mensual' | 'semestral'

export interface Transferencia {
  id: string
  beneficiario: string
  cbu: string
  categoria: string
  fechaProximoPago: string
  tipo: TransferenciaTipo
  frecuencia: TransferenciaFrecuencia
  monto: number
  credito: boolean
  estado: TransferenciaEstado
  notas?: string
}

export interface CalendarioPago {
  id: string
  beneficiario: string
  monto: number
  estado: TransferenciaEstado
}

export interface CalendarioDia {
  fecha: string
  pagos: CalendarioPago[]
}

export interface NuevaTransferenciaForm {
  beneficiario: string
  monto: number
  fechaPago: string
  categoria: string
  metodoPago: string
  notas?: string
}
