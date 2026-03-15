import { Badge } from '@/components/ui/Badge'
import type { Contrato, ContratoEstado } from '@/types/proveedor.types'
import { formatARS } from '@/lib/formatters'

function estadoBadge(estado: ContratoEstado) {
  const map: Record<ContratoEstado, { variant: 'success' | 'warning' | 'danger' | 'info'; label: string }> = {
    activo: { variant: 'success', label: 'Activo' },
    proximo_vencer: { variant: 'warning', label: 'Próximo a v.' },
    vencido: { variant: 'danger', label: 'Vencido' },
    en_proceso: { variant: 'info', label: 'En proceso' },
  }
  const { variant, label } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

export function ContratosTable({ contratos }: { contratos: Contrato[] }) {
  const safeContratos = Array.isArray(contratos) ? contratos : []
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
            {['Contrato', 'Proveedor', 'Vigencia', 'Monto Anual', 'Renovación', 'Estado'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeContratos.map((c) => (
            <tr key={c.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
              <td className="px-4 py-3 font-mono text-xs font-medium">{c.codigo}</td>
              <td className="px-4 py-3 font-medium">{c.proveedor}</td>
              <td className="px-4 py-3 text-[#7A7A7A] text-xs">{c.vigenciaDesde} – {c.vigenciaHasta}</td>
              <td className="px-4 py-3 font-semibold">${formatARS(c.montoAnual)}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{c.renovacion}</td>
              <td className="px-4 py-3">{estadoBadge(c.estado)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
