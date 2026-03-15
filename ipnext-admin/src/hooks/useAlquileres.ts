import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { alquileresService } from '@/services/alquileres.service'
import type { Inmueble, ContratoAlquiler, PagoAlquiler } from '@/types/alquiler.types'

export function useAlquileres() {
  return useQuery({
    queryKey: ['alquileres'],
    queryFn: alquileresService.getAll,
  })
}

export function useContratosAlquiler() {
  return useQuery({
    queryKey: ['alquileres', 'contratos'],
    queryFn: alquileresService.getContratos,
  })
}

export function usePagosAlquiler() {
  return useQuery({
    queryKey: ['alquileres', 'pagos'],
    queryFn: alquileresService.getPagos,
  })
}

export function useVencimientos() {
  return useQuery({
    queryKey: ['alquileres', 'vencimientos'],
    queryFn: alquileresService.getVencimientos,
  })
}

export function useCreateAlquiler() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<Inmueble>) => alquileresService.create(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alquileres'] }) },
  })
}

export function useUpdateAlquiler() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Inmueble> }) =>
      alquileresService.update(id, data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alquileres'] }) },
  })
}

export function useCreateContratoAlquiler() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<ContratoAlquiler>) => alquileresService.createContrato(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alquileres', 'contratos'] }) },
  })
}

export function useCreatePagoAlquiler() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<PagoAlquiler>) => alquileresService.createPago(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['alquileres', 'pagos'] }) },
  })
}
