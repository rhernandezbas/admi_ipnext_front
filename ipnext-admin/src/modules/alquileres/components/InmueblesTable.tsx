import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { Home, CheckCircle, Clock, Calendar } from 'lucide-react'
import type { Inmueble, AlquilerEstado } from '@/types/alquiler.types'

function estadoBadge(estado: AlquilerEstado) {
  if (estado === 'pagado') return <Badge variant="success">PAGADO</Badge>
  if (estado === 'pendiente') return <Badge variant="warning">PENDIENTE</Badge>
  return <Badge variant="danger">VENCIDO</Badge>
}

export function InmueblesTable({ inmuebles }: { inmuebles: Inmueble[] }) {
  const pagados = inmuebles.filter((i) => i.estado === 'pagado').length
  const pendientes = inmuebles.filter((i) => i.estado !== 'pagado').length

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Home size={20} className="text-[#E42313]" />} label="Total inmuebles" value={String(inmuebles.length)} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Pagos al corriente" value={`${pagados} / ${inmuebles.length}`} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Pendientes / Vencidos" value={String(pendientes)} iconBg="bg-yellow-50" />
        <KpiCard icon={<Calendar size={20} className="text-blue-600" />} label="Próximo vencimiento" value="01 Mar" iconBg="bg-blue-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Inmueble / Dirección', 'Propietario', 'Uso', 'Alquiler/Mes', 'Próx. Ajuste', 'CBU / Alias', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inmuebles.map((i) => (
              <tr key={i.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3"><p className="font-medium">{i.nombre}</p><p className="text-xs text-[#7A7A7A]">{i.direccion}</p></td>
                <td className="px-4 py-3 text-[#7A7A7A]">{i.propietario}</td>
                <td className="px-4 py-3"><Badge variant="neutral">{i.uso}</Badge></td>
                <td className="px-4 py-3 font-semibold">${i.alquilerMes.toLocaleString('es-AR')}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{i.proximoAjuste}</td>
                <td className="px-4 py-3 text-xs text-[#7A7A7A]">{i.cbu}</td>
                <td className="px-4 py-3">{estadoBadge(i.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
