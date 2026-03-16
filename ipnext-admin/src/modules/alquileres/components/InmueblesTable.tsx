import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { Home, CheckCircle, Clock, Calendar, Pencil, Trash2 } from 'lucide-react'
import type { Inmueble, AlquilerEstado } from '@/types/alquiler.types'
import { formatARS } from '@/lib/formatters'

function estadoBadge(estado: AlquilerEstado) {
  if (estado === 'pagado') return <Badge variant="success">PAGADO</Badge>
  if (estado === 'pendiente') return <Badge variant="warning">PENDIENTE</Badge>
  return <Badge variant="danger">VENCIDO</Badge>
}

interface Props {
  inmuebles: Inmueble[]
  onEditar?: (i: Inmueble) => void
  onEliminar?: (i: Inmueble) => void
}

export function InmueblesTable({ inmuebles, onEditar, onEliminar }: Props) {
  const safeInmuebles = Array.isArray(inmuebles) ? inmuebles : []
  const pagados = safeInmuebles.filter((i) => i.estado === 'pagado').length
  const pendientes = safeInmuebles.filter((i) => i.estado !== 'pagado').length

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Home size={20} className="text-[#E42313]" />} label="Total inmuebles" value={String(safeInmuebles.length)} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Pagos al corriente" value={`${pagados} / ${safeInmuebles.length}`} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Pendientes / Vencidos" value={String(pendientes)} iconBg="bg-yellow-50" />
        <KpiCard icon={<Calendar size={20} className="text-blue-600" />} label="Próximo vencimiento" value="01 Mar" iconBg="bg-blue-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Inmueble / Dirección', 'Propietario', 'Uso', 'Alquiler/Mes', 'Próx. Ajuste', 'CBU / Alias', 'Estado', ''].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeInmuebles.map((i) => (
              <tr key={i.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3"><p className="font-medium">{i.nombre}</p><p className="text-xs text-[#7A7A7A]">{i.direccion}</p></td>
                <td className="px-4 py-3 text-[#7A7A7A]">{i.propietario}</td>
                <td className="px-4 py-3"><Badge variant="neutral">{i.uso}</Badge></td>
                <td className="px-4 py-3 font-semibold">${formatARS(i.alquilerMensual)}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{i.proximoAjuste}</td>
                <td className="px-4 py-3 text-xs text-[#7A7A7A]">{i.cbu}</td>
                <td className="px-4 py-3">{estadoBadge(i.estado)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    {onEditar && <button onClick={() => onEditar(i)} className="text-[#7A7A7A] hover:text-[#0D0D0D]" title="Editar"><Pencil size={15} /></button>}
                    {onEliminar && <button onClick={() => onEliminar(i)} className="text-[#7A7A7A] hover:text-[#E42313]" title="Eliminar"><Trash2 size={15} /></button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
