import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { Shield, Clock, DollarSign, UserX } from 'lucide-react'
import type { Guardia } from '@/types/nomina.types'

function estadoBadge(estado: Guardia['estado']) {
  if (estado === 'regular') return <Badge variant="success">Regular</Badge>
  if (estado === 'autorizado') return <Badge variant="warning">Autorizado — Justificar</Badge>
  return <Badge variant="danger">Revisar</Badge>
}

export function GuardiasTable({ guardias }: { guardias: Guardia[] }) {
  const totalHoras = guardias.reduce((a, g) => a + g.hsTrabajadas, 0)
  const totalExtras = guardias.reduce((a, g) => a + g.horasExtras, 0)
  const totalAusencias = guardias.reduce((a, g) => a + g.ausencias, 0)

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Shield size={20} className="text-[#E42313]" />} label="Guardias activas" value={String(guardias.length)} iconBg="bg-red-50" />
        <KpiCard icon={<Clock size={20} className="text-blue-600" />} label="Horas primas mensuales" value={String(totalHoras)} iconBg="bg-blue-50" />
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Costo total guardias" value={`$${(totalExtras * 2500).toLocaleString('es-AR')}`} iconBg="bg-red-50" />
        <KpiCard icon={<UserX size={20} className="text-yellow-600" />} label="Ausencias pagadas" value={String(totalAusencias)} iconBg="bg-yellow-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Guardia', 'Turno', 'Hs. Trabajadas', 'Horas Extras', 'Ausencias', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guardias.map((g) => (
              <tr key={g.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{g.nombre}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{g.turno}</td>
                <td className="px-4 py-3">{g.hsTrabajadas}h</td>
                <td className={`px-4 py-3 font-medium ${g.horasExtras > 16 ? 'text-[#E42313]' : ''}`}>{g.horasExtras}h</td>
                <td className="px-4 py-3">{g.ausencias}</td>
                <td className="px-4 py-3">{estadoBadge(g.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
