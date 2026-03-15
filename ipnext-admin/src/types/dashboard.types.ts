// Tipo de UI para KpiCard — generado desde KpisBackend en el service
export interface Kpi {
  id: string
  label: string
  value: string
  subtitle?: string
  iconBg?: string
}

// Tipo real del backend GET /dashboard/kpis
export interface KpisBackend {
  totalPagosMes: number
  pagosPendientes: number
  pagosVencidos: number
  flujoCajaMes: number
  totalEmpleados: number
  costoNominaMes: number
}

// Tipo real del backend GET /dashboard/pagos-urgentes
export interface PagoUrgente {
  id: string
  beneficiario: string
  monto: number
  moneda: string
  fechaPago: string
  estado: string
  categoria: string
}

// Tipo real del backend GET /dashboard/distribucion-egresos
export interface DistribucionEgreso {
  categoria: string
  monto: number
  porcentaje: number
}

// Tipo real del backend GET /dashboard/actividad-reciente (placeholder v1 — retorna [])
export interface ActividadItem {
  id: string
  accion: string
  detalle: string
  fecha: string
  tipo: string
}

// ─── Tipos legacy de UI (mantenidos para compatibilidad con componentes existentes) ───

/** @deprecated usar PagoUrgente — los componentes deben migrar a los campos del backend */
export interface UrgentPayment {
  id: string
  beneficiary: string
  category: string
  amount: string
  dueDate: string
  status: 'pending' | 'warning' | 'overdue'
}

/** @deprecated usar DistribucionEgreso */
export interface ExpenseDataPoint {
  month: string
  gastos: number
  ingresos: number
}

/** @deprecated usar ActividadItem cuando el backend implemente el endpoint */
export interface ActivityItem {
  id: string
  action: string
  detail: string
  time: string
  type: 'payment' | 'provider' | 'invoice' | 'payroll'
}
