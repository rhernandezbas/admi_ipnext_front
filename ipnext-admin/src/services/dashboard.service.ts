import { api } from '@/lib/api'
import type { Kpi, KpisBackend, PagoUrgente, DistribucionEgreso, ActividadItem } from '@/types/dashboard.types'
import { formatARS } from '@/lib/formatters'

function transformKpis(raw: KpisBackend): Kpi[] {
  return [
    {
      id: 'total-pagos-mes',
      label: 'Total Pagos Mes',
      value: `$${formatARS(raw.totalPagosMes)}`,
      iconBg: 'bg-red-50',
    },
    {
      id: 'pagos-pendientes',
      label: 'Pagos Pendientes',
      value: String(raw.pagosPendientes),
      iconBg: 'bg-yellow-50',
    },
    {
      id: 'flujo-caja',
      label: 'Flujo de Caja',
      value: `$${formatARS(raw.flujoCajaMes)}`,
      iconBg: 'bg-blue-50',
    },
    {
      id: 'costo-nomina',
      label: 'Costo Nómina',
      value: `$${formatARS(raw.costoNominaMes)}`,
      subtitle: `${raw.totalEmpleados} empleados`,
      iconBg: 'bg-green-50',
    },
  ]
}

export const dashboardService = {
  getKpis: () =>
    api.get<KpisBackend>('/dashboard/kpis').then((r) => transformKpis(r.data)),

  getPagosUrgentes: () =>
    api.get<PagoUrgente[]>('/dashboard/pagos-urgentes').then((r) => r.data),

  getDistribucionEgresos: () =>
    api.get<DistribucionEgreso[]>('/dashboard/distribucion-egresos').then((r) => r.data),

  getActividadReciente: () =>
    api.get<ActividadItem[]>('/dashboard/actividad-reciente').then((r) => r.data),
}
