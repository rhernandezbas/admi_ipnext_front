import type { Kpi, UrgentPayment, ExpenseDataPoint, ActivityItem } from '@/types/dashboard.types'

export const kpisMock: Kpi[] = [
  { id: '1', label: 'Total Pagos del Mes', value: '$2.450.000', subtitle: '+12% vs mes anterior', iconBg: 'bg-red-50' },
  { id: '2', label: 'Pagos Pendientes', value: '14', subtitle: 'Vencen esta semana', iconBg: 'bg-yellow-50' },
  { id: '3', label: 'Proveedores Activos', value: '38', subtitle: '3 nuevos este mes', iconBg: 'bg-blue-50' },
  { id: '4', label: 'Empleados en Nómina', value: '52', subtitle: 'Próxima liquidación: 15/03', iconBg: 'bg-green-50' },
]

export const urgentPaymentsMock: UrgentPayment[] = [
  { id: '1', beneficiary: 'EDENOR S.A.', category: 'Energía', amount: '$48.500', dueDate: '15/03/2026', status: 'pending' },
  { id: '2', beneficiary: 'Metrogas', category: 'Gas', amount: '$22.800', dueDate: '16/03/2026', status: 'pending' },
  { id: '3', beneficiary: 'Carlos Pérez', category: 'Alquiler', amount: '$180.000', dueDate: '17/03/2026', status: 'pending' },
  { id: '4', beneficiary: 'Telecom', category: 'Internet', amount: '$15.200', dueDate: '18/03/2026', status: 'warning' },
  { id: '5', beneficiary: 'Seguridad Max', category: 'Seguridad', amount: '$35.000', dueDate: '20/03/2026', status: 'pending' },
]

export const expenseChartMock: ExpenseDataPoint[] = [
  { month: 'Oct', gastos: 1800000, ingresos: 2200000 },
  { month: 'Nov', gastos: 2100000, ingresos: 2400000 },
  { month: 'Dic', gastos: 2800000, ingresos: 3100000 },
  { month: 'Ene', gastos: 1900000, ingresos: 2300000 },
  { month: 'Feb', gastos: 2200000, ingresos: 2600000 },
  { month: 'Mar', gastos: 2450000, ingresos: 2900000 },
]

export const activityFeedMock: ActivityItem[] = [
  { id: '1', action: 'Pago realizado', detail: 'EDENOR — $48.500', time: 'Hace 2 horas', type: 'payment' },
  { id: '2', action: 'Nuevo proveedor', detail: 'Tech Solutions S.A.', time: 'Hace 4 horas', type: 'provider' },
  { id: '3', action: 'Factura recibida', detail: 'Metrogas — $22.800', time: 'Hace 6 horas', type: 'invoice' },
  { id: '4', action: 'Nómina procesada', detail: 'Febrero 2026 — 52 empleados', time: 'Ayer', type: 'payroll' },
]
