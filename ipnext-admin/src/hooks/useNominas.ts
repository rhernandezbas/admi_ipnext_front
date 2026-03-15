import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { nominasService } from '@/services/nominas.service'
import type { Empleado, Guardia, Compensacion } from '@/types/nomina.types'

export function useEmpleadosKpis() {
  return useQuery({
    queryKey: ['nominas', 'kpis'],
    queryFn: nominasService.getEmpleadosKpis,
  })
}

export function useEmpleados() {
  return useQuery({
    queryKey: ['nominas', 'empleados'],
    queryFn: nominasService.getEmpleados,
  })
}

export function useGuardias() {
  return useQuery({
    queryKey: ['nominas', 'guardias'],
    queryFn: nominasService.getGuardias,
  })
}

export function useCompensaciones() {
  return useQuery({
    queryKey: ['nominas', 'compensaciones'],
    queryFn: nominasService.getCompensaciones,
  })
}

export function useLiquidaciones() {
  return useQuery({
    queryKey: ['nominas', 'liquidaciones'],
    queryFn: nominasService.getLiquidaciones,
  })
}

export function useCreateEmpleado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Empleado>) => nominasService.createEmpleado(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['nominas', 'empleados'] }) },
  })
}

export function useUpdateEmpleado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Empleado> }) =>
      nominasService.updateEmpleado(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['nominas', 'empleados'] }) },
  })
}

export function useDeleteEmpleado() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => nominasService.deleteEmpleado(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['nominas', 'empleados'] }) },
  })
}

export function useCreateCompensacion() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Compensacion>) => nominasService.createCompensacion(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['nominas', 'compensaciones'] }) },
  })
}

export function useCreateGuardia() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Guardia>) => nominasService.createGuardia(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['nominas', 'guardias'] }) },
  })
}
