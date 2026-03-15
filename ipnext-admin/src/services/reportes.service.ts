import { api } from '@/lib/api'
import type { InformeItem } from '@/types/reporte.types'

export interface ReportesResponse {
  [categoria: string]: InformeItem[]
}

export const reportesService = {
  getAll: () => api.get<ReportesResponse>('/reportes').then((r) => r.data),

  getNomina: () => api.get<InformeItem[]>('/reportes/nomina').then((r) => r.data),

  getProveedores: () =>
    api.get<InformeItem[]>('/reportes/proveedores').then((r) => r.data),

  getInmuebles: () =>
    api.get<InformeItem[]>('/reportes/inmuebles').then((r) => r.data),

  exportar: (params?: Record<string, string>) =>
    api.get('/reportes/exportar', { params, responseType: 'blob' }).then((r) => r.data),
}
