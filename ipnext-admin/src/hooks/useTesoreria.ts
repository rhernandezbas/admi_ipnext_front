import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tesoreriaService } from '@/services/tesoreria.service'
import type { FlujoCaja, CuentaBancaria } from '@/types/tesoreria.types'

export function useFlujoCaja() {
  return useQuery({
    queryKey: ['tesoreria', 'flujo-caja'],
    queryFn: tesoreriaService.getFlujoCaja,
  })
}

export function useCuentasBancarias() {
  return useQuery({
    queryKey: ['tesoreria', 'cuentas'],
    queryFn: tesoreriaService.getCuentas,
  })
}

export function useConciliacion() {
  return useQuery({
    queryKey: ['tesoreria', 'conciliacion'],
    queryFn: tesoreriaService.getConciliacion,
  })
}

export function useProyecciones() {
  return useQuery({
    queryKey: ['tesoreria', 'proyecciones'],
    queryFn: tesoreriaService.getProyecciones,
  })
}

export function useCreateCuenta() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<CuentaBancaria>) => tesoreriaService.createCuenta(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tesoreria', 'cuentas'] }) },
  })
}

export function useCreateMovimiento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: Partial<FlujoCaja>) => tesoreriaService.createMovimiento(data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tesoreria'] }) },
  })
}

export function useConciliarMovimiento() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => tesoreriaService.conciliarMovimiento(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['tesoreria', 'conciliacion'] }) },
  })
}
