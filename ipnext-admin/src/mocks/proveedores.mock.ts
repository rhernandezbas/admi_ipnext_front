import type { Proveedor, Contrato, RankingItem } from '@/types/proveedor.types'

export const proveedoresMock: Proveedor[] = [
  {
    id: '1', nombre: 'EDENOR S.A.', email: 'pagos@edenor.com', cuit: '30-50000014-8',
    categoria: 'Energía', cbu: '0720030120000012345670', totalAnual: 582000, sitioWeb: 'edenor.com',
    historialPagos: [
      { id: 'p1', fecha: '2026-02-15', monto: 48500 },
      { id: 'p2', fecha: '2026-01-15', monto: 47200 },
      { id: 'p3', fecha: '2025-12-15', monto: 46800, vencido: true },
    ],
  },
  {
    id: '2', nombre: 'Tech Solutions S.A.', email: 'admin@techsol.com', cuit: '30-71234567-9',
    categoria: 'Software', cbu: 'techsolutions', totalAnual: 1440000, sitioWeb: 'techsolutions.com.ar',
    historialPagos: [
      { id: 'p4', fecha: '2026-02-25', monto: 120000 },
      { id: 'p5', fecha: '2026-01-25', monto: 120000 },
      { id: 'p6', fecha: '2025-12-25', monto: 110000 },
    ],
  },
  {
    id: '3', nombre: 'Seguridad Max S.R.L.', email: 'facturacion@segmax.com', cuit: '30-62345678-0',
    categoria: 'Seguridad', cbu: '0720030120000099887760', totalAnual: 420000,
    historialPagos: [
      { id: 'p7', fecha: '2026-02-20', monto: 35000 },
      { id: 'p8', fecha: '2026-01-20', monto: 35000 },
    ],
  },
  {
    id: '4', nombre: 'Metrogas', email: 'clientes@metrogas.com.ar', cuit: '30-67890123-4',
    categoria: 'Gas', cbu: '0720030120000087654320', totalAnual: 273600,
    historialPagos: [
      { id: 'p9', fecha: '2026-02-16', monto: 22800 },
      { id: 'p10', fecha: '2026-01-16', monto: 21500 },
    ],
  },
]

export const contratosMock: Contrato[] = [
  { id: '1', codigo: 'CTR-2024-001', proveedor: 'Tech Solutions S.A.', vigenciaDesde: '2024-01-01', vigenciaHasta: '2026-12-31', montoAnual: 1440000, renovacion: '2026-11-01', estado: 'activo' },
  { id: '2', codigo: 'CTR-2024-002', proveedor: 'Seguridad Max S.R.L.', vigenciaDesde: '2024-03-01', vigenciaHasta: '2026-04-01', montoAnual: 420000, renovacion: '2026-03-01', estado: 'proximo_vencer' },
  { id: '3', codigo: 'CTR-2023-005', proveedor: 'Limpieza Total', vigenciaDesde: '2023-06-01', vigenciaHasta: '2025-06-01', montoAnual: 180000, renovacion: '2025-05-01', estado: 'vencido' },
  { id: '4', codigo: 'CTR-2026-001', proveedor: 'Proveedor Nuevo', vigenciaDesde: '2026-03-01', vigenciaHasta: '2027-03-01', montoAnual: 240000, renovacion: '2027-02-01', estado: 'en_proceso' },
]

export const rankingMock: RankingItem[] = [
  { pos: 1, proveedor: 'Tech Solutions S.A.', categoria: 'Software', totalPagado: 1440000, ultimoPago: '2026-02-25', facturas: 14 },
  { pos: 2, proveedor: 'EDENOR S.A.', categoria: 'Energía', totalPagado: 582000, ultimoPago: '2026-02-15', facturas: 12 },
  { pos: 3, proveedor: 'Seguridad Max S.R.L.', categoria: 'Seguridad', totalPagado: 420000, ultimoPago: '2026-02-20', facturas: 12 },
  { pos: 4, proveedor: 'Metrogas', categoria: 'Gas', totalPagado: 273600, ultimoPago: '2026-02-16', facturas: 12 },
  { pos: 5, proveedor: 'Telecom', categoria: 'Internet', totalPagado: 182400, ultimoPago: '2026-02-18', facturas: 12 },
]
