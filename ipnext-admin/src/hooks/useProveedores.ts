import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { proveedoresService } from '@/services/proveedores.service'
import type { Proveedor, Contrato } from '@/types/proveedor.types'

export function useProveedores() {
  return useQuery({
    queryKey: ['proveedores'],
    queryFn: proveedoresService.getAll,
  })
}

export function useContratos() {
  return useQuery({
    queryKey: ['proveedores', 'contratos'],
    queryFn: proveedoresService.getContratos,
  })
}

export function useRanking() {
  return useQuery({
    queryKey: ['proveedores', 'ranking'],
    queryFn: proveedoresService.getRanking,
  })
}

export function useCreateProveedor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Proveedor>) => proveedoresService.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['proveedores'] }) },
  })
}

export function useUpdateProveedor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Proveedor> }) =>
      proveedoresService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['proveedores'] }) },
  })
}

export function useDeleteProveedor() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => proveedoresService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['proveedores'] }) },
  })
}

export function useCreateContrato() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Contrato>) => proveedoresService.createContrato(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['proveedores', 'contratos'] }) },
  })
}
