import { DollarSign, Building2, FileText, Users } from 'lucide-react'
import type { ActividadItem } from '@/types/dashboard.types'

export function ActivityFeed({ items }: { items: ActividadItem[] }) {
  const safeItems = Array.isArray(items) ? items : []

  if (safeItems.length === 0) {
    return (
      <p className="text-sm text-[#7A7A7A] text-center py-4">Sin actividad reciente</p>
    )
  }

  function iconForTipo(tipo: string) {
    if (tipo === 'pago') return <DollarSign size={16} className="text-[#E42313]" />
    if (tipo === 'proveedor') return <Building2 size={16} className="text-blue-600" />
    if (tipo === 'factura') return <FileText size={16} className="text-yellow-600" />
    if (tipo === 'nomina') return <Users size={16} className="text-green-600" />
    return <DollarSign size={16} className="text-[#7A7A7A]" />
  }

  return (
    <div className="flex flex-col gap-4">
      {safeItems.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
            {iconForTipo(item.tipo)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0D0D0D]">{item.accion}</p>
            <p className="text-sm text-[#7A7A7A]">{item.detalle}</p>
          </div>
          <span className="text-xs text-[#7A7A7A] flex-shrink-0">{item.fecha}</span>
        </div>
      ))}
    </div>
  )
}
