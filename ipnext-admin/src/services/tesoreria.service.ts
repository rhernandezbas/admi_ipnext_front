import { api } from '@/lib/api'
import type {
  FlujoCaja,
  CuentaBancaria,
  MovimientoConciliacion,
  ProyeccionItem,
} from '@/types/tesoreria.types'

export const tesoreriaService = {
  getFlujoCaja: () =>
    api.get('/tesoreria/flujo-caja').then((r) => {
      const raw = r.data as any[]
      return raw.map((f, i) => ({
        id: String(i),
        fecha: f.fecha,
        descripcion: f.ingresos > 0 ? 'Ingreso' : 'Egreso',
        tipo: 'otro' as const,
        monto: f.ingresos > 0 ? f.ingresos : f.egresos,
        ingreso: f.ingresos > 0,
      })) as FlujoCaja[]
    }),

  getCuentas: () =>
    api.get<CuentaBancaria[]>('/tesoreria/cuentas').then((r) => r.data),

  getConciliacion: () =>
    api.get<MovimientoConciliacion[]>('/tesoreria/conciliacion').then((r) => r.data),

  getProyecciones: () =>
    api.get('/tesoreria/proyecciones').then((r) => {
      const raw = r.data as any[]
      return raw.map((p) => ({
        mes: p.mes,
        ingresos: 0,
        egresos: p.egresosPrevistos ?? 0,
        saldo: p.saldoProyectado ?? 0,
      })) as ProyeccionItem[]
    }),

  createCuenta: (data: Partial<CuentaBancaria>) =>
    api.post<CuentaBancaria>('/tesoreria/cuentas', data).then((r) => r.data),

  updateCuenta: (id: string, data: Partial<CuentaBancaria>) =>
    api.patch<CuentaBancaria>(`/tesoreria/cuentas/${id}`, data).then((r) => r.data),

  createMovimiento: (data: Partial<FlujoCaja>) =>
    api.post<FlujoCaja>('/tesoreria/movimientos', data).then((r) => r.data),

  conciliarMovimiento: (id: string) =>
    api.patch(`/tesoreria/movimientos/${id}/conciliar`).then((r) => r.data),
}
