export type PermisoNivel = 'lectura' | 'escritura' | 'ninguno'

export interface Permisos {
  dashboard: boolean
  transferencias: PermisoNivel
  nominas: PermisoNivel
  proveedores: PermisoNivel
  servicios: PermisoNivel
  alquileres: PermisoNivel
  tesoreria: PermisoNivel
  reportes: PermisoNivel
}

export interface Usuario {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'sub-usuario'
  permisos: Permisos
  avatar: string | null
  activo: boolean
  createdAt: string
  updatedAt: string
}

export interface NuevoUsuarioForm {
  nombre: string
  email: string
  password: string
  permisos: Permisos
}
