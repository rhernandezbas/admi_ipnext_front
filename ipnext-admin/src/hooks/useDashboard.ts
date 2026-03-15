import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/dashboard.service'

export function useDashboardKpis() {
  return useQuery({
    queryKey: ['dashboard', 'kpis'],
    queryFn: dashboardService.getKpis,
  })
}

export function usePagosUrgentes() {
  return useQuery({
    queryKey: ['dashboard', 'pagos-urgentes'],
    queryFn: dashboardService.getPagosUrgentes,
  })
}

export function useDistribucionEgresos() {
  return useQuery({
    queryKey: ['dashboard', 'distribucion-egresos'],
    queryFn: dashboardService.getDistribucionEgresos,
  })
}

export function useActividadReciente() {
  return useQuery({
    queryKey: ['dashboard', 'actividad-reciente'],
    queryFn: dashboardService.getActividadReciente,
  })
}
