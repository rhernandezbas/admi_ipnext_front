import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { DollarSign, ReceiptText, Clock, Calendar } from 'lucide-react'
import type { PagoAlquiler } from '@/types/alquiler.types'
import { formatARS, formatFecha } from '@/lib/formatters'

export function PagosRecibosTable({ pagos }: { pagos: PagoAlquiler[] }) {
  const safePagos = Array.isArray(pagos) ? pagos : []
  const totalAcumulado = safePagos.filter((p) => p.estado === 'pagado').reduce((a, p) => a + p.monto, 0)
  const pendientes = safePagos.filter((p) => p.estado === 'pendiente').length
  const ultimoPago = safePagos.filter((p) => p.fechaPago).sort((a, b) => (b.fechaPago ?? '').localeCompare(a.fechaPago ?? ''))[0]

  return (
    <div>
      <p className="text-sm text-[#7A7A7A] mb-4">Registro de pagos de inmuebles — Marzo 2026</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Pagos este mes" value={String(safePagos.filter((p) => p.estado === 'pagado').length)} iconBg="bg-red-50" />
        <KpiCard icon={<ReceiptText size={20} className="text-green-600" />} label="Total acumulado" value={`$${formatARS(totalAcumulado)}`} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Recibos pendientes" value={String(pendientes)} iconBg="bg-yellow-50" />
        <KpiCard icon={<Calendar size={20} className="text-blue-600" />} label="Último pago" value={ultimoPago?.fechaPago ?? '—'} iconBg="bg-blue-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Inmueble', 'Período', 'Fecha Pago', 'Monto', 'Nro. Recibo', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safePagos.map((p) => (
              <tr key={p.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{p.inmuebleNombre ?? p.inmuebleId}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{p.periodo}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{formatFecha(p.fechaPago)}</td>
                <td className="px-4 py-3 font-semibold">${formatARS(p.monto)}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#7A7A7A]">{p.nroRecibo ?? '—'}</td>
                <td className="px-4 py-3">{p.estado === 'pagado' ? <Badge variant="success">Pagado</Badge> : <Badge variant="warning">Pendiente</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
