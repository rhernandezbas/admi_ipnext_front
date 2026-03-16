import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import type { Servicio, ServicioEstado } from '@/types/servicio.types'
import type { ReactNode } from 'react'

function estadoBadge(estado: ServicioEstado) {
  if (estado === 'activo') return <Badge variant="success">Activo</Badge>
  if (estado === 'proximo_vencer') return <Badge variant="warning">Próximo a vencer</Badge>
  return <Badge variant="neutral">Inactivo</Badge>
}

interface KpiDef {
  icon: ReactNode
  label: string
  value: string
  iconBg?: string
}

interface Props {
  servicios: Servicio[]
  kpis: KpiDef[]
  columns: { key: string; header: string; render: (s: Servicio) => ReactNode }[]
  onEditar?: (s: Servicio) => void
  onEliminar?: (s: Servicio) => void
}

export function ServiciosTable({ servicios, kpis, columns, onEditar, onEliminar }: Props) {
  const safeServicios = Array.isArray(servicios) ? servicios : []
  const safeKpis = Array.isArray(kpis) ? kpis : []
  const safeColumns = Array.isArray(columns) ? columns : []
  return (
    <div>
      <div className={`grid grid-cols-4 gap-4 mb-6`}>
        {safeKpis.map((k, i) => (
          <KpiCard key={i} icon={k.icon} label={k.label} value={k.value} iconBg={k.iconBg} />
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {safeColumns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{c.header}</th>
              ))}
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">Estado</th>
              {(onEditar || onEliminar) && <th className="px-4 py-3" />}
            </tr>
          </thead>
          <tbody>
            {safeServicios.length === 0 ? (
              <tr><td colSpan={safeColumns.length + 1} className="px-4 py-8 text-center text-[#7A7A7A]">No hay servicios</td></tr>
            ) : safeServicios.map((s) => (
              <tr key={s.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                {safeColumns.map((c) => <td key={c.key} className="px-4 py-3">{c.render(s)}</td>)}
                <td className="px-4 py-3">{estadoBadge(s.estado)}</td>
                {(onEditar || onEliminar) && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      {onEditar && <button onClick={() => onEditar(s)} className="p-1 text-[#7A7A7A] hover:text-[#E42313]"><Pencil size={15} /></button>}
                      {onEliminar && <button onClick={() => onEliminar(s)} className="p-1 text-[#7A7A7A] hover:text-[#E42313]"><Trash2 size={15} /></button>}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
