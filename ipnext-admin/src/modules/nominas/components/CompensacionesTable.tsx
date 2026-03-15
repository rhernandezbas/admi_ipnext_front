import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { CalendarClock, DollarSign, CreditCard, ListOrdered } from 'lucide-react'
import type { Compensacion, CompensacionTipo, CompensacionEstado } from '@/types/nomina.types'

const tipoLabel: Record<CompensacionTipo, string> = {
  vacaciones: 'Vacaciones',
  bono_productividad: 'Bono Productividad',
  adelanto_sueldo: 'Adelanto de Sueldo',
}

function estadoBadge(estado: CompensacionEstado) {
  if (estado === 'aprobado') return <Badge variant="success">Aprobado</Badge>
  if (estado === 'pendiente') return <Badge variant="warning">Pendiente de Aprobación</Badge>
  return <Badge variant="info">En cuotas</Badge>
}

export function CompensacionesTable({ compensaciones }: { compensaciones: Compensacion[] }) {
  const totalMonto = compensaciones.reduce((a, c) => a + Math.abs(c.monto), 0)
  const adelantos = compensaciones.filter((c) => c.tipo === 'adelanto_sueldo').reduce((a, c) => a + Math.abs(c.monto), 0)
  const pendientes = compensaciones.filter((c) => c.estado === 'pendiente').length

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<CalendarClock size={20} className="text-yellow-600" />} label="Próx. vencimientos" value="5 días" iconBg="bg-yellow-50" />
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Monto total" value={`$${totalMonto.toLocaleString('es-AR')}`} iconBg="bg-red-50" />
        <KpiCard icon={<CreditCard size={20} className="text-blue-600" />} label="Adelantos activos" value={`$${adelantos.toLocaleString('es-AR')}`} iconBg="bg-blue-50" />
        <KpiCard icon={<ListOrdered size={20} className="text-green-600" />} label="Pagos restantes" value={`${pendientes} / ${compensaciones.length}`} iconBg="bg-green-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Empleado', 'Tipo', 'Detalle', 'Monto', 'Período', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {compensaciones.map((c) => (
              <tr key={c.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{c.empleado}</td>
                <td className="px-4 py-3"><Badge variant="neutral">{tipoLabel[c.tipo]}</Badge></td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.detalle}</td>
                <td className={`px-4 py-3 font-semibold ${c.monto < 0 ? 'text-[#E42313]' : ''}`}>
                  {c.monto < 0 ? '-' : ''}${Math.abs(c.monto).toLocaleString('es-AR')}
                </td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.periodo}</td>
                <td className="px-4 py-3">{estadoBadge(c.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
