import type { Transferencia, CalendarioDia } from '@/types/transferencia.types'

export const transferenciasMock: Transferencia[] = [
  { id: '1', beneficiario: 'EDENOR S.A.', cbu: '0720030120000012345670', categoria: 'Energía', fechaProximoPago: '2026-03-15', tipo: 'recurrente', frecuencia: 'mensual', monto: 48500, credito: false, estado: 'pendiente' },
  { id: '2', beneficiario: 'Metrogas', cbu: '0720030120000087654320', categoria: 'Gas', fechaProximoPago: '2026-03-16', tipo: 'recurrente', frecuencia: 'mensual', monto: 22800, credito: false, estado: 'pendiente' },
  { id: '3', beneficiario: 'Carlos Pérez', cbu: 'carlosperez.mp', categoria: 'Alquiler', fechaProximoPago: '2026-03-17', tipo: 'recurrente', frecuencia: 'mensual', monto: 180000, credito: false, estado: 'pendiente' },
  { id: '4', beneficiario: 'Telecom', cbu: '0720030120000011112220', categoria: 'Internet', fechaProximoPago: '2026-03-18', tipo: 'recurrente', frecuencia: 'mensual', monto: 15200, credito: false, estado: 'vencido' },
  { id: '5', beneficiario: 'Seguridad Max S.R.L.', cbu: '0720030120000099887760', categoria: 'Seguridad', fechaProximoPago: '2026-03-20', tipo: 'recurrente', frecuencia: 'mensual', monto: 35000, credito: false, estado: 'programado' },
  { id: '6', beneficiario: 'Proveedor ABC', cbu: 'proveedorabc', categoria: 'Insumos', fechaProximoPago: '2026-03-10', tipo: 'manual', frecuencia: 'unica', monto: 75000, credito: false, estado: 'pagado' },
  { id: '7', beneficiario: 'Agua y Saneamiento', cbu: '0720030120000033344450', categoria: 'Agua', fechaProximoPago: '2026-03-22', tipo: 'recurrente', frecuencia: 'mensual', monto: 8900, credito: false, estado: 'programado' },
  { id: '8', beneficiario: 'Tech Solutions S.A.', cbu: 'techsolutions', categoria: 'Software', fechaProximoPago: '2026-03-25', tipo: 'automatico', frecuencia: 'mensual', monto: 120000, credito: false, estado: 'en_proceso' },
]

export const calendarioMock: CalendarioDia[] = [
  { fecha: '2026-03-15', pagos: [{ id: '1', beneficiario: 'EDENOR S.A.', monto: 48500, estado: 'pendiente' }] },
  { fecha: '2026-03-16', pagos: [{ id: '2', beneficiario: 'Metrogas', monto: 22800, estado: 'pendiente' }] },
  { fecha: '2026-03-17', pagos: [{ id: '3', beneficiario: 'Carlos Pérez', monto: 180000, estado: 'pendiente' }] },
  { fecha: '2026-03-18', pagos: [{ id: '4', beneficiario: 'Telecom', monto: 15200, estado: 'vencido' }] },
  { fecha: '2026-03-20', pagos: [{ id: '5', beneficiario: 'Seguridad Max', monto: 35000, estado: 'programado' }] },
  { fecha: '2026-03-22', pagos: [{ id: '7', beneficiario: 'Agua y Saneamiento', monto: 8900, estado: 'programado' }] },
  { fecha: '2026-03-25', pagos: [{ id: '8', beneficiario: 'Tech Solutions', monto: 120000, estado: 'en_proceso' }] },
]

export const historialBeneficiarioMock = [
  { id: 'h1', fecha: '2026-02-15', monto: 48500, estado: 'pagado' as const },
  { id: 'h2', fecha: '2026-01-15', monto: 46000, estado: 'pagado' as const },
  { id: 'h3', fecha: '2025-12-15', monto: 46000, estado: 'pagado' as const },
]
