import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { KpiCard } from '@/components/ui/KpiCard'
import { DollarSign, Building2, Trophy } from 'lucide-react'
import type { RankingItem } from '@/types/proveedor.types'

interface Props {
  ranking: RankingItem[]
}

export function RankingChart({ ranking }: Props) {
  const totalAcumulado = ranking.reduce((a, r) => a + r.totalPagado, 0)
  const mayorProveedor = ranking[0]?.proveedor ?? '—'

  const chartData = ranking.map((r) => ({ name: r.proveedor.split(' ')[0], total: r.totalPagado }))

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Total acumulado" value={`$${(totalAcumulado / 1000000).toFixed(1)}M`} iconBg="bg-red-50" />
        <KpiCard icon={<Building2 size={20} className="text-blue-600" />} label="Proveedores activos" value={String(ranking.length)} iconBg="bg-blue-50" />
        <KpiCard icon={<Trophy size={20} className="text-yellow-600" />} label="Mayor proveedor" value={mayorProveedor.split(' ')[0]} iconBg="bg-yellow-50" />
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8E8E8" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#7A7A7A' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#7A7A7A' }} width={80} />
              <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString('es-AR')}`, 'Total']} />
              <Bar dataKey="total" fill="#E42313" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-80 flex-shrink-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
                {['#', 'Proveedor', 'Categoría', 'Total Pagado', 'Últ. Pago', 'Facturas'].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-[#7A7A7A]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranking.map((r) => (
                <tr key={r.pos} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                  <td className="px-3 py-2 font-bold text-[#E42313]">{r.pos}</td>
                  <td className="px-3 py-2 font-medium text-xs">{r.proveedor}</td>
                  <td className="px-3 py-2 text-[#7A7A7A] text-xs">{r.categoria}</td>
                  <td className="px-3 py-2 font-semibold text-xs">${r.totalPagado.toLocaleString('es-AR')}</td>
                  <td className="px-3 py-2 text-[#7A7A7A] text-xs">{r.ultimoPago}</td>
                  <td className="px-3 py-2 text-center">{r.facturas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
