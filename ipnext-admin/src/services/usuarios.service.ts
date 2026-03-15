import { api } from '@/lib/api'
import type { Usuario, NuevoUsuarioForm } from '@/types/usuario.types'

export const usuariosService = {
  getAll: () =>
    api.get<Usuario[]>('/usuarios').then((r) => r.data),

  create: (data: NuevoUsuarioForm) =>
    api.post<Usuario>('/usuarios', data).then((r) => r.data),

  update: (id: string, data: Partial<NuevoUsuarioForm & { activo: boolean }>) =>
    api.patch<Usuario>(`/usuarios/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/usuarios/${id}`).then((r) => r.data),

  cambiarClave: (id: string, password: string) =>
    api.patch<Usuario>(`/usuarios/${id}`, { password }).then((r) => r.data),
}
