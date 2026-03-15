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
  ID: string
  Nombre: string
  Email: string
  Rol: 'admin' | 'sub-usuario'
  Permisos: Permisos
  Avatar: string | null
  Activo: boolean
  CreatedAt: string
  UpdatedAt: string
}

export interface NuevoUsuarioForm {
  nombre: string
  email: string
  password: string
  permisos: Permisos
}
