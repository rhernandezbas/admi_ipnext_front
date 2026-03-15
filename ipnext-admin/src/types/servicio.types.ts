export type ServicioEstado = 'activo' | 'proximo_vencer' | 'inactivo'
export type ServicioCategoria = 'internet' | 'energia' | 'seguridad' | 'software'

export interface Servicio {
  id: string
  nombre: string
  proveedor: string
  extra: string
  costoMensual: number
  vtoFactura?: string
  renovacion?: string
  vigencia?: string
  estado: ServicioEstado
  categoria: ServicioCategoria
}
