import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transferenciasService } from '@/services/transferencias.service'
import type { Transferencia } from '@/types/transferencia.types'

export function useTransferencias() {
  return useQuery({
    queryKey: ['transferencias'],
    queryFn: transferenciasService.getAll,
  })
}

export function useCalendario() {
  return useQuery({
    queryKey: ['transferencias', 'calendario'],
    queryFn: transferenciasService.getCalendario,
  })
}

export function useRecurrentes() {
  return useQuery({
    queryKey: ['transferencias', 'recurrentes'],
    queryFn: transferenciasService.getRecurrentes,
  })
}

export function useCreateTransferencia() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Transferencia>) => transferenciasService.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['transferencias'] }) },
  })
}

export function useUpdateTransferencia() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Transferencia> }) =>
      transferenciasService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['transferencias'] }) },
  })
}

export function useDeleteTransferencia() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => transferenciasService.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['transferencias'] }) },
  })
}
