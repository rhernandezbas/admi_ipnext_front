import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { FileText, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import type { ContratoAlquiler, ContratoAlquilerEstado } from '@/types/alquiler.types'

function estadoBadge(estado: ContratoAlquilerEstado) {
  if (estado === 'vigente') return <Badge variant="success">Vigente</Badge>
  if (estado === 'por_vencer') return <Badge variant="warning">Por vencer</Badge>
  return <Badge variant="danger">Vencido</Badge>
}

export function ContratosAlquilerTable({ contratos }: { contratos: ContratoAlquiler[] }) {
  const safeContratos = Array.isArray(contratos) ? contratos : []
  const activos = safeContratos.filter((c) => c.estado === 'vigente').length
  const porRenovar = safeContratos.filter((c) => c.estado === 'por_vencer').length
  const vencidos = safeContratos.filter((c) => c.estado === 'vencido').length

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<FileText size={20} className="text-[#E42313]" />} label="Contratos activos" value={String(activos)} iconBg="bg-red-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Por renovar (60 días)" value={String(porRenovar)} iconBg="bg-yellow-50" />
        <KpiCard icon={<AlertTriangle size={20} className="text-red-600" />} label="Contratos vencidos" value={String(vencidos)} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Próxima renovación" value="May 2026" iconBg="bg-green-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Inmueble / Dirección', 'Propietario', 'Vigencia', 'Ajuste', 'Alquiler Mensual', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeContratos.map((c) => (
              <tr key={c.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3"><p className="font-medium">{c.inmuebleNombre ?? c.inmuebleId}</p><p className="text-xs text-[#7A7A7A]">{c.direccion}</p></td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.propietario}</td>
                <td className="px-4 py-3 text-xs text-[#7A7A7A]">{c.vigenciaDesde} – {c.vigenciaHasta}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.ajusteFrecuencia}</td>
                <td className="px-4 py-3 font-semibold">${c.montoMensual.toLocaleString('es-AR')}</td>
                <td className="px-4 py-3">{estadoBadge(c.estado)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
