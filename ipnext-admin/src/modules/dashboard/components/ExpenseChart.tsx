import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { ExpenseDataPoint } from '@/types/dashboard.types'

export function ExpenseChart({ data }: { data: ExpenseDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#7A7A7A' }} />
        <YAxis tick={{ fontSize: 12, fill: '#7A7A7A' }} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
        <Tooltip formatter={(value) => [`$${Number(value ?? 0).toLocaleString('es-AR')}`, '']} />
        <Legend />
        <Bar dataKey="ingresos" name="Ingresos" fill="#22C55E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="gastos" name="Gastos" fill="#E42313" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
