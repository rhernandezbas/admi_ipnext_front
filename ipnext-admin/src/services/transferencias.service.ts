import { api } from '@/lib/api'
import type { Transferencia, CalendarioDia } from '@/types/transferencia.types'

export const transferenciasService = {
  getAll: () => api.get<Transferencia[]>('/transferencias').then((r) => r.data),

  getCalendario: () =>
    api.get<CalendarioDia[]>('/transferencias/calendario').then((r) => r.data),

  getRecurrentes: () =>
    api.get<Transferencia[]>('/transferencias/recurrentes').then((r) => r.data),

  getById: (id: string) =>
    api.get<Transferencia>(`/transferencias/${id}`).then((r) => r.data),

  create: (data: Partial<Transferencia>) =>
    api.post<Transferencia>('/transferencias', data).then((r) => r.data),

  update: (id: string, data: Partial<Transferencia>) =>
    api.patch<Transferencia>(`/transferencias/${id}`, data).then((r) => r.data),

  updateEstado: (id: string, estado: string) =>
    api.patch(`/transferencias/${id}/estado`, { estado }).then((r) => r.data),

  delete: (id: string) => api.delete(`/transferencias/${id}`).then((r) => r.data),
}
