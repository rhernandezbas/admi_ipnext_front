export type AlquilerEstado = 'pagado' | 'pendiente' | 'vencido'
export type ContratoAlquilerEstado = 'vigente' | 'por_vencer' | 'vencido'

export interface Inmueble {
  id: string
  nombre: string
  direccion: string
  propietario: string
  uso: string
  alquilerMes: number
  proximoAjuste: string
  cbu: string
  estado: AlquilerEstado
}

export interface ContratoAlquiler {
  id: string
  inmuebleId: string
  inmuebleNombre?: string
  direccion?: string
  propietario?: string
  vigenciaDesde: string
  vigenciaHasta: string
  ajusteFrecuencia: string
  montoMensual: number
  estado: ContratoAlquilerEstado
}

export interface PagoAlquiler {
  id: string
  inmuebleId: string
  inmuebleNombre?: string
  periodo: string
  fechaPago?: string
  monto: number
  nroRecibo?: string
  estado: 'pagado' | 'pendiente'
}

export interface VencimientoAlquiler {
  id: string
  inmueble: string
  propietario: string
  fechaInicio: string
  fechaVencimiento: string
  diasRestantes: number
  estado: 'proximo' | 'vencido' | 'vigente'
}
