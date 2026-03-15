import { api } from '@/lib/api'
import type { Inmueble, ContratoAlquiler, PagoAlquiler, VencimientoAlquiler } from '@/types/alquiler.types'

export const alquileresService = {
  getAll: () => api.get<Inmueble[]>('/alquileres').then((r) => r.data),

  getContratos: () =>
    api.get<ContratoAlquiler[]>('/alquileres/contratos').then((r) => r.data),

  getPagos: () =>
    api.get<PagoAlquiler[]>('/alquileres/pagos').then((r) => r.data),

  getVencimientos: () =>
    api.get<VencimientoAlquiler[]>('/alquileres/vencimientos').then((r) => r.data),

  getById: (id: string) =>
    api.get<Inmueble>(`/alquileres/${id}`).then((r) => r.data),

  create: (data: Partial<Inmueble>) =>
    api.post<Inmueble>('/alquileres', data).then((r) => r.data),

  update: (id: string, data: Partial<Inmueble>) =>
    api.patch<Inmueble>(`/alquileres/${id}`, data).then((r) => r.data),

  delete: (id: string) => api.delete(`/alquileres/${id}`).then((r) => r.data),

  createContrato: (data: Partial<ContratoAlquiler>) =>
    api.post<ContratoAlquiler>('/alquileres/contratos', data).then((r) => r.data),

  createPago: (data: Partial<PagoAlquiler>) =>
    api.post<PagoAlquiler>('/alquileres/pagos', data).then((r) => r.data),
}
