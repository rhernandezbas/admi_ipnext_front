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
}

export function ServiciosTable({ servicios, kpis, columns }: Props) {
  return (
    <div>
      <div className={`grid grid-cols-4 gap-4 mb-6`}>
        {kpis.map((k, i) => (
          <KpiCard key={i} icon={k.icon} label={k.label} value={k.value} iconBg={k.iconBg} />
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{c.header}</th>
              ))}
              <th className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">Estado</th>
            </tr>
          </thead>
          <tbody>
            {servicios.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-4 py-8 text-center text-[#7A7A7A]">No hay servicios</td></tr>
            ) : servicios.map((s) => (
              <tr key={s.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                {columns.map((c) => <td key={c.key} className="px-4 py-3">{c.render(s)}</td>)}
                <td className="px-4 py-3">{estadoBadge(s.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
