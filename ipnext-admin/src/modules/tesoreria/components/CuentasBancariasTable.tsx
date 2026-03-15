import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { Landmark, CheckCircle, TrendingUp, Activity } from 'lucide-react'
import type { CuentaBancaria } from '@/types/tesoreria.types'
import { formatARS, formatMillones } from '@/lib/formatters'

export function CuentasBancariasTable({ cuentas }: { cuentas: CuentaBancaria[] }) {
  const safeCuentas = Array.isArray(cuentas) ? cuentas : []
  const total = safeCuentas.filter((c) => c.activa === true).reduce((a, c) => a + (c.saldoActual ?? 0), 0)
  const activas = safeCuentas.filter((c) => c.activa === true).length
  const mayor = safeCuentas.length ? safeCuentas.reduce((a, b) => (a.saldoActual ?? 0) > (b.saldoActual ?? 0) ? a : b, safeCuentas[0]) : null

  return (
    <div>
      <p className="text-sm text-[#7A7A7A] mb-4">Registro de movimientos — Marzo 2026</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Landmark size={20} className="text-[#E42313]" />} label="Saldo total" value={`$${formatMillones(total)}`} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Cuentas activas" value={String(activas)} iconBg="bg-green-50" />
        <KpiCard icon={<TrendingUp size={20} className="text-green-600" />} label="Mayor saldo" value={mayor?.banco ?? '—'} iconBg="bg-green-50" />
        <KpiCard icon={<Activity size={20} className="text-blue-600" />} label="Movimientos del mes" value="47" iconBg="bg-blue-50" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Banco / Empresa', 'Tipo Empresa', 'Nro. Cuenta / CBU', 'Saldo Actual', 'Últ. Actualización', 'Estado'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeCuentas.map((c) => (
              <tr key={c.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3"><p className="font-medium">{c.banco}</p><p className="text-xs text-[#7A7A7A]">{c.tipoCuenta} — {c.descripcion}</p></td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.tipoEmpresa}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#7A7A7A]">{c.nroCuenta}</td>
                <td className="px-4 py-3 font-semibold text-lg">${formatARS(c.saldoActual)}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{c.ultimaActualizacion}</td>
                <td className="px-4 py-3">{c.activa ? <Badge variant="success">Activo</Badge> : <Badge variant="neutral">Inactivo</Badge>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
