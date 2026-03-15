import { useQuery } from '@tanstack/react-query'
import { reportesService } from '@/services/reportes.service'

export function useReportes() {
  return useQuery({
    queryKey: ['reportes'],
    queryFn: reportesService.getAll,
  })
}

export function useReportesNomina() {
  return useQuery({
    queryKey: ['reportes', 'nomina'],
    queryFn: reportesService.getNomina,
  })
}

export function useReportesProveedores() {
  return useQuery({
    queryKey: ['reportes', 'proveedores'],
    queryFn: reportesService.getProveedores,
  })
}

export function useReportesInmuebles() {
  return useQuery({
    queryKey: ['reportes', 'inmuebles'],
    queryFn: reportesService.getInmuebles,
  })
}
