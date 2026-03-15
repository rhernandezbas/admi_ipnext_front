import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { KpiCard } from '@/components/ui/KpiCard'
import { Users, DollarSign, TrendingUp, Clock } from 'lucide-react'
import type { Empleado } from '@/types/nomina.types'
import { formatARS, formatMiles } from '@/lib/formatters'
interface NominaResumen {
  totalBruto: number
  cargasSociales: number
  netoAPagar: number
  empleadosConAumento: number
  liquidacionesPendientes: number
}

interface Props {
  empleados: Empleado[]
  resumen: NominaResumen
}

export function EmpleadosTable({ empleados, resumen }: Props) {
  const safeEmpleados = Array.isArray(empleados) ? empleados : []
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<Users size={20} className="text-[#E42313]" />} label="Empleados activos" value={String(safeEmpleados.length)} iconBg="bg-red-50" />
        <KpiCard icon={<DollarSign size={20} className="text-blue-600" />} label="Nómina bruta" value={`$${formatMiles(resumen.totalBruto)}`} iconBg="bg-blue-50" />
        <KpiCard icon={<TrendingUp size={20} className="text-green-600" />} label="Con aumento" value={String(resumen.empleadosConAumento)} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Liq. pendientes" value={String(resumen.liquidacionesPendientes)} iconBg="bg-yellow-50" />
      </div>
      <div className="flex gap-6">
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
                {['Empleado', 'Rol', 'Puesto', 'Sueldo Bruto', 'Obra Social', 'Ingreso'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {safeEmpleados.map((e) => (
                <tr key={e.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Avatar name={e.nombre} size="sm" />
                    <div>
                      <p className="font-medium text-[#0D0D0D]">{e.nombre}</p>
                      <p className="text-xs text-[#7A7A7A]">{e.area}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#7A7A7A]">{e.rol}</td>
                  <td className="px-4 py-3 text-[#7A7A7A]">{e.puesto}</td>
                  <td className="px-4 py-3 font-semibold">${formatARS(e.sueldoBruto)}</td>
                  <td className="px-4 py-3 text-[#7A7A7A]">{e.obraSocial}</td>
                  <td className="px-4 py-3 text-[#7A7A7A]">{e.fechaIngreso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-64 flex-shrink-0 border border-[#E8E8E8] rounded-xl p-5">
          <h4 className="font-semibold text-[#0D0D0D] mb-4">Resumen Nómina</h4>
          <p className="text-2xl font-bold text-[#0D0D0D]">${formatARS(resumen.netoAPagar)}</p>
          <p className="text-xs text-[#7A7A7A] mb-4">Neto a pagar</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-[#7A7A7A]">Sueldos brutos</span><span className="font-medium">${formatARS(resumen.totalBruto)}</span></div>
            <div className="flex justify-between"><span className="text-[#7A7A7A]">Cargas sociales</span><span className="font-medium text-[#E42313]">-${formatARS(resumen.cargasSociales)}</span></div>
            <div className="flex justify-between border-t border-[#E8E8E8] pt-2"><span className="font-medium">Neto a pagar</span><span className="font-semibold text-[#22C55E]">${formatARS(resumen.netoAPagar)}</span></div>
          </div>
          <Button variant="secondary" className="w-full justify-center mt-4 text-xs">Ajustar Liquidación</Button>
        </div>
      </div>
    </div>
  )
}
