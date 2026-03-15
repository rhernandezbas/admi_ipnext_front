import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { serviciosService } from '@/services/servicios.service'
import type { Servicio } from '@/types/servicio.types'

export function useServicios() {
  return useQuery({
    queryKey: ['servicios'],
    queryFn: serviciosService.getAll,
  })
}

export function useServiciosKpis() {
  return useQuery({
    queryKey: ['servicios', 'kpis'],
    queryFn: serviciosService.getKpis,
  })
}

export function useServiciosByTipo(tipo: string) {
  return useQuery({
    queryKey: ['servicios', 'tipo', tipo],
    queryFn: () => serviciosService.getByTipo(tipo),
    enabled: !!tipo,
  })
}

export function useCreateServicio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Servicio>) => serviciosService.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }) },
  })
}

export function useUpdateServicio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Servicio> }) =>
      serviciosService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }) },
  })
}

export function useDeleteServicio() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => serviciosService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }) },
  })
}
