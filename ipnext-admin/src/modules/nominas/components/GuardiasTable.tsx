import { KpiCard } from '@/components/ui/KpiCard'
import { Shield, Clock, DollarSign, UserX } from 'lucide-react'
import type { Guardia } from '@/types/nomina.types'
import { formatARS } from '@/lib/formatters'

export function GuardiasTable({ guardias }: { guardias: Guardia[] }) {
  const safeGuardias = Array.isArray(guardias) ? guardias : []
  const totalHoras = safeGuardias.reduce((a, g) => a + g.horas, 0)
  const totalMonto = safeGuardias.reduce((a, g) => a + g.monto, 0)

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Shield size={20} className="text-[#E42313]" />} label="Guardias activas" value={String(safeGuardias.length)} iconBg="bg-red-50" />
        <KpiCard icon={<Clock size={20} className="text-blue-600" />} label="Horas primas mensuales" value={String(totalHoras)} iconBg="bg-blue-50" />
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Costo total guardias" value={`$${formatARS(totalMonto)}`} iconBg="bg-red-50" />
        <KpiCard icon={<UserX size={20} className="text-yellow-600" />} label="Registros mes" value={String(safeGuardias.length)} iconBg="bg-yellow-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Guardia', 'Fecha', 'Horas', 'Monto'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeGuardias.map((g) => (
              <tr key={g.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{g.empleadoNombre ?? g.empleadoId}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{g.fecha}</td>
                <td className="px-4 py-3">{g.horas}h</td>
                <td className="px-4 py-3 font-semibold">${formatARS(g.monto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
