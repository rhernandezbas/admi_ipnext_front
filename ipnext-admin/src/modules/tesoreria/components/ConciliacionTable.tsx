import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { ListChecks, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import type { MovimientoConciliacion, ConciliacionEstado } from '@/types/tesoreria.types'
import { formatARS } from '@/lib/formatters'

function estadoBadge(estado: ConciliacionEstado) {
  if (estado === 'conciliado') return <Badge variant="success">Conciliado</Badge>
  if (estado === 'pendiente') return <Badge variant="warning">Pendiente</Badge>
  return <Badge variant="danger">Observado</Badge>
}

export function ConciliacionTable({ movimientos }: { movimientos: MovimientoConciliacion[] }) {
  const safeMovimientos = Array.isArray(movimientos) ? movimientos : []
  const conciliados = safeMovimientos.filter((m) => m.estado === 'conciliado').length
  const pendientes = safeMovimientos.filter((m) => m.estado === 'pendiente').length
  const diferencias = safeMovimientos.filter((m) => m.estado === 'observado').reduce((a, m) => a + (m.debito ?? m.credito ?? 0), 0)

  return (
    <div>
      <p className="text-sm text-[#7A7A7A] mb-4">Revisión de movimientos — Marzo 2026</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<ListChecks size={20} className="text-[#E42313]" />} label="Movimientos totales" value={String(safeMovimientos.length)} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Conciliados" value={String(conciliados)} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Pendientes" value={String(pendientes)} iconBg="bg-yellow-50" />
        <KpiCard icon={<AlertTriangle size={20} className="text-red-600" />} label="Diferencias" value={`$${formatARS(diferencias)}`} iconBg="bg-red-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Movimiento', 'Cuenta', 'Fecha', 'Débito', 'Crédito', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeMovimientos.map((m) => (
              <tr key={m.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{m.descripcion}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{m.cuenta}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{m.fecha}</td>
                <td className="px-4 py-3 text-[#E42313] font-medium">{m.debito != null ? `$${formatARS(m.debito)}` : '—'}</td>
                <td className="px-4 py-3 text-[#22C55E] font-medium">{m.credito != null ? `$${formatARS(m.credito)}` : '—'}</td>
                <td className="px-4 py-3">{estadoBadge(m.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
