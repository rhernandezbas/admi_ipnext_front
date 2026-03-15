import { api } from '@/lib/api'
import type { Kpi, UrgentPayment, ExpenseDataPoint, ActivityItem } from '@/types/dashboard.types'

export const dashboardService = {
  getKpis: () => api.get<Kpi[]>('/dashboard/kpis').then((r) => r.data),

  getPagosUrgentes: () =>
    api.get<UrgentPayment[]>('/dashboard/pagos-urgentes').then((r) => r.data),

  getDistribucionEgresos: () =>
    api.get<ExpenseDataPoint[]>('/dashboard/distribucion-egresos').then((r) => r.data),

  getActividadReciente: () =>
    api.get<ActivityItem[]>('/dashboard/actividad-reciente').then((r) => r.data),
}
