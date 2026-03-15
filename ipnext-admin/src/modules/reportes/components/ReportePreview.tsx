import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { ReportePreviewData } from '@/types/reporte.types'

const COLORS = ['#E42313', '#22C55E', '#3B82F6', '#F59E0B', '#8B5CF6']

export function ReportePreview({ data }: { data: ReportePreviewData }) {
  const safeKpis = Array.isArray(data.kpis) ? data.kpis : []
  const safeChartData = Array.isArray(data.chartData) ? data.chartData : []
  return (
    <div className="flex-1 border border-[#E8E8E8] rounded-xl p-6">
      <h3 className="font-semibold text-[#0D0D0D] mb-4">{data.titulo}</h3>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {safeKpis.map((k) => (
          <div key={k.label} className="border border-[#E8E8E8] rounded-lg p-3">
            <p className="text-xs text-[#7A7A7A]">{k.label}</p>
            <p className="font-bold text-lg text-[#0D0D0D]">{k.value}</p>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={safeChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {safeChartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [`$${Number(v ?? 0).toLocaleString('es-AR')}`, '']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
