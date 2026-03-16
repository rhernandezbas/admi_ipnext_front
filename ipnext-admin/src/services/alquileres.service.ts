import { api } from '@/lib/api'
import type { Inmueble, ContratoAlquiler, PagoAlquiler, VencimientoAlquiler } from '@/types/alquiler.types'

export const alquileresService = {
  getAll: () => api.get<Inmueble[]>('/alquileres').then((r) => r.data),

  getContratos: async () => {
    const [contratos, inmuebles] = await Promise.all([
      api.get<ContratoAlquiler[]>('/alquileres/contratos').then((r) => r.data as ContratoAlquiler[]),
      api.get<Inmueble[]>('/alquileres').then((r) => r.data as Inmueble[]),
    ])
    const map = Object.fromEntries(inmuebles.map((i) => [i.id, i]))
    return contratos.map((c) => ({
      ...c,
      inmuebleNombre: map[c.inmuebleId]?.nombre ?? c.inmuebleId,
      direccion: map[c.inmuebleId]?.direccion,
      propietario: map[c.inmuebleId]?.propietario,
    }))
  },

  getPagos: async () => {
    const [pagos, inmuebles] = await Promise.all([
      api.get<PagoAlquiler[]>('/alquileres/pagos').then((r) => r.data as PagoAlquiler[]),
      api.get<Inmueble[]>('/alquileres').then((r) => r.data as Inmueble[]),
    ])
    const map = Object.fromEntries(inmuebles.map((i) => [i.id, i]))
    return pagos.map((p) => ({
      ...p,
      inmuebleNombre: map[p.inmuebleId]?.nombre ?? p.inmuebleId,
    }))
  },

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
