import { Badge } from '@/components/ui/Badge'
import { KpiCard } from '@/components/ui/KpiCard'
import { Wallet, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import type { FlujoCaja, CuentaBancaria } from '@/types/tesoreria.types'

function tipoBadge(tipo: FlujoCaja['tipo']) {
  const map = { nomina: 'info', alquileres: 'warning', transferencias: 'neutral', otro: 'neutral' } as const
  const labels = { nomina: 'NÓMINA', alquileres: 'ALQUILERES', transferencias: 'TRANSFERENCIAS', otro: 'OTRO' }
  return <Badge variant={map[tipo]}>{labels[tipo]}</Badge>
}

interface Props {
  flujo: FlujoCaja[]
  cuentas: CuentaBancaria[]
}

export function FlujoCajaTable({ flujo, cuentas }: Props) {
  const safeFlujo = Array.isArray(flujo) ? flujo : []
  const safeCuentas = Array.isArray(cuentas) ? cuentas : []
  const saldoTotal = safeCuentas.filter((c) => c.estado === 'activo').reduce((a, c) => a + c.saldo, 0)

  return (
    <div>
      <p className="text-sm text-[#7A7A7A] mb-4">Posición financiera — Marzo 2026</p>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Wallet size={20} className="text-[#E42313]" />} label="Saldo disponible" value={`$${(saldoTotal / 1000000).toFixed(1)}M`} iconBg="bg-red-50" />
        <KpiCard icon={<TrendingUp size={20} className="text-green-600" />} label="Balance proy. 120 días" value="+$1.2M" iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-blue-600" />} label="Runway de caja" value="68 días" iconBg="bg-blue-50" />
        <KpiCard icon={<AlertCircle size={20} className="text-yellow-600" />} label="Compromisos a vto." value="8" iconBg="bg-yellow-50" />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {safeCuentas.filter((c) => c.estado === 'activo').map((c) => (
          <div key={c.id} className="border border-[#E8E8E8] rounded-xl p-4">
            <p className="font-semibold text-sm text-[#0D0D0D]">{c.banco}</p>
            <p className="text-xs text-[#7A7A7A] mb-2">{c.tipoCuenta}</p>
            <p className="text-2xl font-bold text-[#0D0D0D]">${c.saldo.toLocaleString('es-AR')}</p>
          </div>
        ))}
      </div>

      <h4 className="font-semibold text-[#0D0D0D] mb-3">Flujo de Caja Proyectado — 70 días</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Fecha', 'Descripción', 'Tipo', 'Monto'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {safeFlujo.map((f) => (
              <tr key={f.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 text-[#7A7A7A]">{f.fecha}</td>
                <td className="px-4 py-3 font-medium">{f.descripcion}</td>
                <td className="px-4 py-3">{tipoBadge(f.tipo)}</td>
                <td className={`px-4 py-3 font-semibold ${f.ingreso ? 'text-[#22C55E]' : 'text-[#E42313]'}`}>
                  {f.ingreso ? '+' : '-'}${f.monto.toLocaleString('es-AR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
