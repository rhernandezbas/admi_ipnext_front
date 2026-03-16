export type ServicioEstado = 'activo' | 'proximo_vencer' | 'inactivo'
export type ServicioTipo = 'internet' | 'energia' | 'seguridad' | 'software' | 'hosting' | 'otro'

export interface Servicio {
  id: string
  nombre: string
  tipo: ServicioTipo
  proveedor: string
  costoMensual: number
  vtoFactura?: string | null
  renovacion?: string | null
  estado: ServicioEstado
  metadata?: Record<string, unknown> | null
}
