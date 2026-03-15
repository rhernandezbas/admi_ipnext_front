export interface Kpi {
  id: string
  label: string
  value: string
  subtitle?: string
  iconBg?: string
}

export interface UrgentPayment {
  id: string
  beneficiary: string
  category: string
  amount: string
  dueDate: string
  status: 'pending' | 'warning' | 'overdue'
}

export interface ExpenseDataPoint {
  month: string
  gastos: number
  ingresos: number
}

export interface ActivityItem {
  id: string
  action: string
  detail: string
  time: string
  type: 'payment' | 'provider' | 'invoice' | 'payroll'
}
