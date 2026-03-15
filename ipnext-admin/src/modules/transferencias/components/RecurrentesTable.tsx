import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Settings } from 'lucide-react'
import type { Transferencia, TransferenciaEstado } from '@/types/transferencia.types'
import { formatARS, formatFecha } from '@/lib/formatters'

function estadoBadge(estado: TransferenciaEstado | undefined) {
  const map: Record<TransferenciaEstado, { variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info'; label: string }> = {
    pendiente: { variant: 'warning', label: 'PENDIENTE' },
    pagado: { variant: 'success', label: 'PAGADO' },
    vencido: { variant: 'danger', label: 'VENCIDO' },
    programado: { variant: 'success', label: 'PROGRAMADO' },
    en_proceso: { variant: 'info', label: 'EN PROCESO' },
  }
  const badge = (estado ? map[estado] : null) ?? { variant: 'neutral' as const, label: estado ?? '—' }
  return <Badge variant={badge.variant}>{badge.label}</Badge>
}

interface Props {
  data: Transferencia[]
}

export function RecurrentesTable({ data }: Props) {
  const safeData = Array.isArray(data) ? data : []
  const recurrentes = safeData.filter((t) => t.tipo === 'recurrente' || t.tipo === 'automatico')

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
            {['Beneficiario', 'Categoría', 'Frecuencia', 'Próx. Banco', 'Próximo Mes', 'Monto', 'Estado', 'Config.'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recurrentes.length === 0 ? (
            <tr><td colSpan={8} className="px-4 py-8 text-center text-[#7A7A7A]">No hay pagos recurrentes</td></tr>
          ) : recurrentes.map((t) => (
            <tr key={t.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA] transition-colors">
              <td className="px-4 py-3 font-medium">{t.beneficiario}</td>
              <td className="px-4 py-3"><Badge variant="neutral">{t.categoria}</Badge></td>
              <td className="px-4 py-3 text-[#7A7A7A] capitalize">{t.frecuencia}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{formatFecha(t.fechaProximoPago)}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{formatFecha(t.fechaProximoPago)}</td>
              <td className="px-4 py-3 font-semibold">${formatARS(t.monto)}</td>
              <td className="px-4 py-3">{estadoBadge(t.estado)}</td>
              <td className="px-4 py-3">
                <Button variant="ghost" className="p-1.5"><Settings size={15} /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
