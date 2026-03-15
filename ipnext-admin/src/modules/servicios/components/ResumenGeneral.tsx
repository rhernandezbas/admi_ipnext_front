import { KpiCard } from '@/components/ui/KpiCard'
import { Badge } from '@/components/ui/Badge'
import { DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import type { Servicio } from '@/types/servicio.types'

const categoriaLabels: Record<string, string> = {
  internet: 'Internet & Telefonía',
  energia: 'Energía Eléctrica',
  seguridad: 'Seguridad',
  software: 'Software',
}

interface Props {
  servicios: Servicio[]
  resumen: { gastoTotal: number; serviciosActivos: number; facturasProximas: number; renovacionesProximas: number }
}

export function ResumenGeneral({ servicios, resumen }: Props) {
  const safeServicios = Array.isArray(servicios) ? servicios : []
  const categorias = ['internet', 'energia', 'seguridad', 'software']

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Gasto total mensual" value={`$${resumen.gastoTotal.toLocaleString('es-AR')}`} iconBg="bg-red-50" />
        <KpiCard icon={<CheckCircle size={20} className="text-green-600" />} label="Servicios activos" value={String(resumen.serviciosActivos)} iconBg="bg-green-50" />
        <KpiCard icon={<Clock size={20} className="text-yellow-600" />} label="Facturas próximas" value={String(resumen.facturasProximas)} iconBg="bg-yellow-50" />
        <KpiCard icon={<AlertTriangle size={20} className="text-orange-500" />} label="Alertas/renovaciones" value={String(resumen.renovacionesProximas)} iconBg="bg-orange-50" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {categorias.map((cat) => {
          const items = safeServicios.filter((s) => s.categoria === cat)
          const total = items.reduce((a, s) => a + s.montoMensual, 0)
          return (
            <div key={cat} className="border border-[#E8E8E8] rounded-xl p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-[#0D0D0D]">{categoriaLabels[cat]}</h4>
                <span className="font-bold text-[#0D0D0D]">${total.toLocaleString('es-AR')}/mes</span>
              </div>
              <div className="flex flex-col gap-2">
                {items.map((s) => (
                  <div key={s.id} className="flex justify-between items-center text-sm">
                    <span className="text-[#7A7A7A] truncate flex-1">{s.nombre}</span>
                    <div className="flex items-center gap-2 ml-2">
                      <span className="font-medium">${s.montoMensual.toLocaleString('es-AR')}</span>
                      {s.estado === 'proximo_vencer' && <Badge variant="warning">!</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
