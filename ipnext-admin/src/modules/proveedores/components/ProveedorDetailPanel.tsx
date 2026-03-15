import { X } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { Proveedor } from '@/types/proveedor.types'

interface Props {
  proveedor: Proveedor
  onClose: () => void
}

export function ProveedorDetailPanel({ proveedor, onClose }: Props) {
  const pagos = Array.isArray(proveedor.historialPagos) ? proveedor.historialPagos : []
  const promedio = pagos.length ? Math.round(pagos.reduce((a, p) => a + p.monto, 0) / pagos.length) : 0
  const maxPago = pagos.length ? Math.max(...pagos.map((p) => p.monto)) : 0
  const minPago = pagos.length ? Math.min(...pagos.map((p) => p.monto)) : 0

  return (
    <div className="w-72 flex-shrink-0 border-l border-[#E8E8E8] bg-white p-5 flex flex-col gap-4 overflow-y-auto">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={proveedor.nombre} size="md" />
          <div>
            <p className="font-semibold text-[#0D0D0D] text-sm">{proveedor.nombre}</p>
            <p className="text-xs text-[#7A7A7A]">{proveedor.categoria}</p>
          </div>
        </div>
        <button onClick={onClose} className="text-[#7A7A7A] hover:text-[#0D0D0D] cursor-pointer"><X size={16} /></button>
      </div>

      <div className="flex flex-col gap-1 text-sm border-t border-[#E8E8E8] pt-4">
        <div className="flex justify-between"><span className="text-[#7A7A7A]">CUIT</span><span className="font-medium">{proveedor.cuit}</span></div>
        <div className="flex justify-between"><span className="text-[#7A7A7A]">CBU/Alias</span><span className="font-medium text-xs">{proveedor.cbu}</span></div>
        {proveedor.sitioWeb && <div className="flex justify-between"><span className="text-[#7A7A7A]">Web</span><span className="font-medium text-xs">{proveedor.sitioWeb}</span></div>}
      </div>

      <div className="border-t border-[#E8E8E8] pt-4">
        <p className="text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide mb-3">Historial de pagos</p>
        <div className="flex flex-col gap-2">
          {pagos.map((p, i) => (
            <div key={p.id} className={`flex justify-between text-sm ${i === 0 ? 'font-semibold' : ''} ${p.vencido ? 'text-[#E42313]' : 'text-[#0D0D0D]'}`}>
              <span className="text-[#7A7A7A] font-normal">{p.fecha}</span>
              <span>${p.monto.toLocaleString('es-AR')}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#E8E8E8] pt-4 flex flex-col gap-1 text-sm">
        <div className="flex justify-between"><span className="text-[#7A7A7A]">Promedio mensual</span><span>${promedio.toLocaleString('es-AR')}</span></div>
        <div className="flex justify-between"><span className="text-[#7A7A7A]">Máx. pago</span><span>${maxPago.toLocaleString('es-AR')}</span></div>
        <div className="flex justify-between"><span className="text-[#7A7A7A]">Mín. pago</span><span>${minPago.toLocaleString('es-AR')}</span></div>
      </div>

      <div className="border-t border-[#E8E8E8] pt-4">
        <p className="text-xs text-[#7A7A7A]">Total pagos año</p>
        <p className="text-2xl font-bold text-[#0D0D0D]">${proveedor.totalAnual.toLocaleString('es-AR')}</p>
      </div>

      <Button className="w-full justify-center text-sm">Registrar un Pago Nuevo</Button>
    </div>
  )
}
