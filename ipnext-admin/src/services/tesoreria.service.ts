import { api } from '@/lib/api'
import type {
  FlujoCaja,
  CuentaBancaria,
  MovimientoConciliacion,
  ProyeccionItem,
} from '@/types/tesoreria.types'

export const tesoreriaService = {
  getFlujoCaja: () =>
    api.get<FlujoCaja[]>('/tesoreria/flujo-caja').then((r) => r.data),

  getCuentas: () =>
    api.get<CuentaBancaria[]>('/tesoreria/cuentas').then((r) => r.data),

  getConciliacion: () =>
    api.get<MovimientoConciliacion[]>('/tesoreria/conciliacion').then((r) => r.data),

  getProyecciones: () =>
    api.get<ProyeccionItem[]>('/tesoreria/proyecciones').then((r) => r.data),

  createCuenta: (data: Partial<CuentaBancaria>) =>
    api.post<CuentaBancaria>('/tesoreria/cuentas', data).then((r) => r.data),

  updateCuenta: (id: string, data: Partial<CuentaBancaria>) =>
    api.patch<CuentaBancaria>(`/tesoreria/cuentas/${id}`, data).then((r) => r.data),

  createMovimiento: (data: Partial<FlujoCaja>) =>
    api.post<FlujoCaja>('/tesoreria/movimientos', data).then((r) => r.data),

  conciliarMovimiento: (id: string) =>
    api.patch(`/tesoreria/movimientos/${id}/conciliar`).then((r) => r.data),
}
