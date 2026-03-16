import type { InformeItem } from '@/types/reporte.types'

export interface ReportesResponse {
  [categoria: string]: InformeItem[]
}

const INFORMES_ESTATICOS: ReportesResponse = {
  financiero: [
    { id: 'balance-general', nombre: 'Balance General', descripcion: 'Resumen de activos, pasivos y patrimonio', categoria: 'financiero', ultimaGeneracion: '' },
    { id: 'flujo-caja', nombre: 'Flujo de Caja', descripcion: 'Movimientos de ingresos y egresos del período', categoria: 'financiero', ultimaGeneracion: '' },
    { id: 'estado-resultados', nombre: 'Estado de Resultados', descripcion: 'Ingresos, costos y utilidad neta', categoria: 'financiero', ultimaGeneracion: '' },
  ],
  pagos: [
    { id: 'pagos-pendientes', nombre: 'Pagos Pendientes', descripcion: 'Transferencias y pagos por realizar', categoria: 'pagos', ultimaGeneracion: '' },
    { id: 'pagos-realizados', nombre: 'Pagos Realizados', descripcion: 'Historial de pagos completados', categoria: 'pagos', ultimaGeneracion: '' },
  ],
  nominas: [
    { id: 'liquidacion-mensual', nombre: 'Liquidación Mensual', descripcion: 'Detalle de sueldos, deducciones y netos', categoria: 'nominas', ultimaGeneracion: '' },
    { id: 'guardias-compensaciones', nombre: 'Guardias y Compensaciones', descripcion: 'Registro de horas extra y bonos', categoria: 'nominas', ultimaGeneracion: '' },
  ],
  proveedores: [
    { id: 'contratos-vigentes', nombre: 'Contratos Vigentes', descripcion: 'Resumen de contratos activos con proveedores', categoria: 'proveedores', ultimaGeneracion: '' },
    { id: 'pagos-proveedores', nombre: 'Pagos a Proveedores', descripcion: 'Historial y proyección de pagos', categoria: 'proveedores', ultimaGeneracion: '' },
  ],
  impuestos: [
    { id: 'iva-mensual', nombre: 'IVA Mensual', descripcion: 'Débito y crédito fiscal del mes', categoria: 'impuestos', ultimaGeneracion: '' },
    { id: 'retenciones', nombre: 'Retenciones', descripcion: 'Detalle de retenciones impositivas', categoria: 'impuestos', ultimaGeneracion: '' },
  ],
}

export const reportesService = {
  getAll: () => Promise.resolve(INFORMES_ESTATICOS),

  getNomina: () => Promise.resolve(INFORMES_ESTATICOS.nominas),

  getProveedores: () => Promise.resolve(INFORMES_ESTATICOS.proveedores),

  getInmuebles: () => Promise.resolve(INFORMES_ESTATICOS.financiero),
}
