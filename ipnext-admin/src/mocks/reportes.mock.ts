import type { InformeItem, ReportePreviewData } from '@/types/reporte.types'

export const informesMock: Record<string, InformeItem[]> = {
  financiero: [
    { id: '1', nombre: 'Balance Mensual', descripcion: 'Ingresos vs Egresos del mes', categoria: 'Financiero', ultimaGeneracion: '2026-03-01' },
    { id: '2', nombre: 'Estado de Resultados', descripcion: 'P&L completo del período', categoria: 'Financiero', ultimaGeneracion: '2026-03-01' },
    { id: '3', nombre: 'Flujo de Caja Proyectado', descripcion: 'Proyección a 90 días', categoria: 'Financiero', ultimaGeneracion: '2026-03-10' },
  ],
  pagos: [
    { id: '4', nombre: 'Resumen de Transferencias', descripcion: 'Todos los pagos del período', categoria: 'Pagos', ultimaGeneracion: '2026-03-14' },
    { id: '5', nombre: 'Pagos por Categoría', descripcion: 'Distribución por tipo de gasto', categoria: 'Pagos', ultimaGeneracion: '2026-03-14' },
  ],
  nominas: [
    { id: '6', nombre: 'Liquidación de Nómina', descripcion: 'Detalle completo por empleado', categoria: 'Nóminas', ultimaGeneracion: '2026-03-05' },
    { id: '7', nombre: 'Reporte de Guardias', descripcion: 'Horas y costos de guardias', categoria: 'Nóminas', ultimaGeneracion: '2026-03-05' },
  ],
  proveedores: [
    { id: '8', nombre: 'Ranking de Proveedores', descripcion: 'Top proveedores por volumen', categoria: 'Proveedores', ultimaGeneracion: '2026-03-01' },
    { id: '9', nombre: 'Vencimiento de Contratos', descripcion: 'Contratos próximos a vencer', categoria: 'Proveedores', ultimaGeneracion: '2026-03-01' },
  ],
  impuestos: [
    { id: '10', nombre: 'Cargas Sociales', descripcion: 'Resumen de aportes y contribuciones', categoria: 'Impuestos', ultimaGeneracion: '2026-03-10' },
    { id: '11', nombre: 'Retenciones', descripcion: 'Retenciones aplicadas en el período', categoria: 'Impuestos', ultimaGeneracion: '2026-03-10' },
  ],
}

export const previewsMock: Record<string, ReportePreviewData> = {
  '1': {
    titulo: 'Balance Mensual — Marzo 2026',
    kpis: [
      { label: 'Ingresos', value: '$2.900.000' },
      { label: 'Egresos', value: '$2.450.000' },
      { label: 'Resultado', value: '+$450.000' },
      { label: 'Margen', value: '15.5%' },
    ],
    chartData: [
      { name: 'Nóminas', value: 1057000 },
      { name: 'Alquileres', value: 540000 },
      { name: 'Servicios', value: 213500 },
      { name: 'Proveedores', value: 420000 },
      { name: 'Otros', value: 219500 },
    ],
  },
}
