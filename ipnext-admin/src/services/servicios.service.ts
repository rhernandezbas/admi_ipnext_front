import { api } from '@/lib/api'
import type { Servicio } from '@/types/servicio.types'

export interface ServiciosKpis {
  gastoTotal: number
  serviciosActivos: number
  facturasProximas: number
  renovacionesProximas: number
}

export const serviciosService = {
  getAll: () => api.get<Servicio[]>('/servicios').then((r) => r.data),

  getKpis: () => api.get<ServiciosKpis>('/servicios/kpis').then((r) => r.data),

  getByTipo: (tipo: string) =>
    api.get<Servicio[]>(`/servicios/${tipo}`).then((r) => r.data),

  getById: (id: string) =>
    api.get<Servicio>(`/servicios/item/${id}`).then((r) => r.data),

  create: (data: Partial<Servicio>) =>
    api.post<Servicio>('/servicios', data).then((r) => r.data),

  update: (id: string, data: Partial<Servicio>) =>
    api.patch<Servicio>(`/servicios/item/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    api.delete(`/servicios/item/${id}`).then((r) => r.data),
}
