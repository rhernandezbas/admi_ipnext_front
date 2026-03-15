export interface Proveedor {
  id: string
  nombre: string
  email: string
  cuit: string
  categoria: string
  cbu: string
  totalAnual: number
  sitioWeb?: string
  historialPagos: HistorialPago[]
}

export interface HistorialPago {
  id: string
  fecha: string
  monto: number
  vencido?: boolean
}

export type ContratoEstado = 'activo' | 'proximo_vencer' | 'vencido' | 'en_proceso'

export interface Contrato {
  id: string
  codigo: string
  proveedor: string
  vigenciaDesde: string
  vigenciaHasta: string
  montoAnual: number
  renovacion: string
  estado: ContratoEstado
}

export interface RankingItem {
  pos: number
  proveedor: string
  categoria: string
  totalPagado: number
  ultimoPago: string
  facturas: number
}
