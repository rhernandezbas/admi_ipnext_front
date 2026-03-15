import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { KpiCard } from '@/components/ui/KpiCard'
import { TrendingUp, TrendingDown, DollarSign, BarChart2 } from 'lucide-react'
import type { ProyeccionItem } from '@/types/tesoreria.types'

export function ProyeccionesTable({ proyecciones }: { proyecciones: ProyeccionItem[] }) {
  const totalIngresos = proyecciones.reduce((a, p) => a + p.ingresos, 0)
  const totalEgresos = proyecciones.reduce((a, p) => a + p.egresos, 0)
  const saldoNeto = totalIngresos - totalEgresos

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<TrendingUp size={20} className="text-green-600" />} label="Ingresos proyectados" value={`$${(totalIngresos / 1000000).toFixed(1)}M`} iconBg="bg-green-50" />
        <KpiCard icon={<TrendingDown size={20} className="text-[#E42313]" />} label="Egresos proyectados" value={`$${(totalEgresos / 1000000).toFixed(1)}M`} iconBg="bg-red-50" />
        <KpiCard icon={<DollarSign size={20} className="text-blue-600" />} label="Saldo neto proyectado" value={`$${(saldoNeto / 1000000).toFixed(1)}M`} iconBg="bg-blue-50" />
        <KpiCard icon={<BarChart2 size={20} className="text-purple-600" />} label="Meses proyectados" value={String(proyecciones.length)} iconBg="bg-purple-50" />
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={proyecciones}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" />
          <XAxis dataKey="mes" tick={{ fontSize: 12, fill: '#7A7A7A' }} />
          <YAxis tick={{ fontSize: 12, fill: '#7A7A7A' }} tickFormatter={(v: number) => `$${(v / 1000000).toFixed(1)}M`} />
          <Tooltip formatter={(v: number | string | undefined) => [`$${Number(v ?? 0).toLocaleString('es-AR')}`, '']} />
          <Legend />
          <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke="#22C55E" fill="#DCFCE7" />
          <Area type="monotone" dataKey="egresos" name="Egresos" stroke="#E42313" fill="#FEE2E2" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Mes', 'Ingresos', 'Egresos', 'Saldo Proyectado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {proyecciones.map((p) => (
              <tr key={p.mes} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{p.mes}</td>
                <td className="px-4 py-3 text-[#22C55E] font-semibold">${p.ingresos.toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-[#E42313] font-semibold">${p.egresos.toLocaleString('es-AR')}</td>
                <td className={`px-4 py-3 font-bold ${p.saldo >= 0 ? 'text-[#22C55E]' : 'text-[#E42313]'}`}>${p.saldo.toLocaleString('es-AR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
