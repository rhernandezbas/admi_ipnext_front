import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { DistribucionEgreso } from '@/types/dashboard.types'

export function ExpenseChart({ data }: { data: DistribucionEgreso[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
        <XAxis dataKey="categoria" tick={{ fontSize: 12, fill: '#7A7A7A' }} />
        <YAxis tick={{ fontSize: 12, fill: '#7A7A7A' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
        <Tooltip
          formatter={(value) => [`$${Number(value ?? 0).toLocaleString('es-AR')}`, 'Monto']}
          labelFormatter={(label) => `Categoría: ${label}`}
        />
        <Bar dataKey="monto" name="Monto" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={i % 2 === 0 ? '#E42313' : '#7A7A7A'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
