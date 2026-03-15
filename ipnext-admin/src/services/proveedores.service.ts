import { api } from '@/lib/api'
import type { Proveedor, Contrato, RankingItem } from '@/types/proveedor.types'

export const proveedoresService = {
  getAll: () => api.get<Proveedor[]>('/proveedores').then((r) => r.data),

  getContratos: () =>
    api.get<Contrato[]>('/proveedores/contratos').then((r) => r.data),

  getRanking: () =>
    api.get<RankingItem[]>('/proveedores/ranking').then((r) => r.data),

  getById: (id: string) =>
    api.get<Proveedor>(`/proveedores/${id}`).then((r) => r.data),

  create: (data: Partial<Proveedor>) =>
    api.post<Proveedor>('/proveedores', data).then((r) => r.data),

  update: (id: string, data: Partial<Proveedor>) =>
    api.patch<Proveedor>(`/proveedores/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/proveedores/${id}`).then((r) => r.data),

  createContrato: (data: Partial<Contrato>) =>
    api.post<Contrato>('/proveedores/contratos', data).then((r) => r.data),

  updateContrato: (id: string, data: Partial<Contrato>) =>
    api.patch<Contrato>(`/proveedores/contratos/${id}`, data).then((r) => r.data),
}
