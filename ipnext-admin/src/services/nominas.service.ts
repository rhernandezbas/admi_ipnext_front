import { api } from '@/lib/api'
import type { Empleado, Guardia, Compensacion } from '@/types/nomina.types'

export interface NominaKpis {
  totalEmpleados: number
  totalNomina: number
  proximaLiquidacion: string
  guardiasActivos: number
}

export interface Liquidacion {
  id: string
  periodo: string
  totalBruto: number
  totalNeto: number
  estado: string
}

export const nominasService = {
  getEmpleadosKpis: () =>
    api.get<NominaKpis>('/nominas/empleados/kpis').then((r) => r.data),

  getEmpleados: () =>
    api.get<Empleado[]>('/nominas/empleados').then((r) => r.data),

  getEmpleado: (id: string) =>
    api.get<Empleado>(`/nominas/empleados/${id}`).then((r) => r.data),

  createEmpleado: (data: Partial<Empleado>) =>
    api.post<Empleado>('/nominas/empleados', data).then((r) => r.data),

  updateEmpleado: (id: string, data: Partial<Empleado>) =>
    api.patch<Empleado>(`/nominas/empleados/${id}`, data).then((r) => r.data),

  deleteEmpleado: (id: string) =>
    api.delete(`/nominas/empleados/${id}`).then((r) => r.data),

  getLiquidaciones: () =>
    api.get<Liquidacion[]>('/nominas/liquidaciones').then((r) => r.data),

  createLiquidacion: (data: Partial<Liquidacion>) =>
    api.post<Liquidacion>('/nominas/liquidaciones', data).then((r) => r.data),

  aprobarLiquidacion: (id: string) =>
    api.post(`/nominas/liquidaciones/${id}/aprobar`).then((r) => r.data),

  getGuardias: () =>
    api.get<Guardia[]>('/nominas/guardias').then((r) => r.data),

  createGuardia: (data: Partial<Guardia>) =>
    api.post<Guardia>('/nominas/guardias', data).then((r) => r.data),

  getCompensaciones: () =>
    api.get<Compensacion[]>('/nominas/compensaciones').then((r) => r.data),

  createCompensacion: (data: Partial<Compensacion>) =>
    api.post<Compensacion>('/nominas/compensaciones', data).then((r) => r.data),
}
