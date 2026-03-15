import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { AlertTriangle, Clock, XCircle, Calendar } from 'lucide-react'
import type { VencimientoAlquiler } from '@/types/alquiler.types'
import { formatFecha } from '@/lib/formatters'

function estadoBadge(estado: VencimientoAlquiler['estado']) {
  if (estado === 'vencido') return <Badge variant="danger">Vencido</Badge>
  if (estado === 'proximo') return <Badge variant="warning">Próximo</Badge>
  return <Badge variant="success">Vigente</Badge>
}

export function VencimientosTable({ vencimientos }: { vencimientos: VencimientoAlquiler[] }) {
  const safeVencimientos = Array.isArray(vencimientos) ? vencimientos : []
  const en30 = safeVencimientos.filter((v) => v.diasRestantes >= 0 && v.diasRestantes <= 30).length
  const en60 = safeVencimientos.filter((v) => v.diasRestantes >= 0 && v.diasRestantes <= 60).length
  const vencidos = safeVencimientos.filter((v) => v.diasRestantes < 0).length

  return (
    <div>
      <p className="text-sm text-[#7A7A7A] mb-4">Gestión de vencimientos, renovaciones y alertas</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<AlertTriangle size={20} className="text-orange-500" />} label="Vencen en 30 días" value={String(en30)} iconBg="bg-orange-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Vencen en 60 días" value={String(en60)} iconBg="bg-yellow-50" />
        <KpiCard icon={<XCircle size={20} className="text-red-600" />} label="Vencidos sin renovar" value={String(vencidos)} iconBg="bg-red-50" />
        <KpiCard icon={<Calendar size={20} className="text-blue-600" />} label="Próxima renovación" value="01 May" iconBg="bg-blue-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Inmueble / Contrato', 'Propietario', 'Fecha Inicio', 'Fecha Vencimiento', 'Días Restantes', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeVencimientos.map((v) => (
              <tr key={v.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{v.inmueble}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{v.propietario}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{v.fechaInicio}</td>
                <td className={`px-4 py-3 font-medium ${v.diasRestantes < 0 ? 'text-[#E42313]' : v.diasRestantes <= 60 ? 'text-yellow-600' : 'text-[#7A7A7A]'}`}>{formatFecha(v.fechaVencimiento)}</td>
                <td className={`px-4 py-3 font-semibold ${v.diasRestantes < 0 ? 'text-[#E42313]' : ''}`}>{v.diasRestantes < 0 ? `${v.diasRestantes}` : `+${v.diasRestantes}`}</td>
                <td className="px-4 py-3">{estadoBadge(v.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
