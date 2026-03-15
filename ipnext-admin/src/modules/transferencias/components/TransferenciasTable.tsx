import { useState } from 'react'
import { FileSpreadsheet } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import type { Transferencia, TransferenciaEstado } from '@/types/transferencia.types'

function estadoBadge(estado: TransferenciaEstado) {
  const map: Record<TransferenciaEstado, { variant: 'success' | 'warning' | 'danger' | 'neutral' | 'info'; label: string }> = {
    pendiente: { variant: 'warning', label: 'PENDIENTE' },
    pagado: { variant: 'success', label: 'PAGADO' },
    vencido: { variant: 'danger', label: 'VENCIDO' },
    programado: { variant: 'success', label: 'PROGRAMADO' },
    en_proceso: { variant: 'info', label: 'EN PROCESO' },
  }
  const { variant, label } = map[estado]
  return <Badge variant={variant}>{label}</Badge>
}

const categoriaOptions = [
  { value: '', label: 'Todas las categorías' },
  { value: 'Energía', label: 'Energía' },
  { value: 'Gas', label: 'Gas' },
  { value: 'Alquiler', label: 'Alquiler' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Seguridad', label: 'Seguridad' },
  { value: 'Agua', label: 'Agua' },
  { value: 'Software', label: 'Software' },
  { value: 'Insumos', label: 'Insumos' },
]

const estadoOptions = [
  { value: '', label: 'Todos los estados' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'pagado', label: 'Pagado' },
  { value: 'vencido', label: 'Vencido' },
  { value: 'programado', label: 'Programado' },
  { value: 'en_proceso', label: 'En Proceso' },
]

const tipoOptions = [
  { value: '', label: 'Todos los tipos' },
  { value: 'manual', label: 'Manual' },
  { value: 'recurrente', label: 'Recurrente' },
  { value: 'automatico', label: 'Automático' },
]

interface Props {
  data: Transferencia[]
}

export function TransferenciasTable({ data }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('')
  const [estado, setEstado] = useState('')
  const [tipo, setTipo] = useState('')
  const safeData = Array.isArray(data) ? data : []

  const filtrado = safeData.filter((t) => {
    if (busqueda && !t.beneficiario.toLowerCase().includes(busqueda.toLowerCase())) return false
    if (categoria && t.categoria !== categoria) return false
    if (estado && t.estado !== estado) return false
    if (tipo && t.tipo !== tipo) return false
    return true
  })

  return (
    <div>
      <div className="flex gap-3 mb-4 flex-wrap">
        <Input placeholder="Buscar beneficiario..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-52" />
        <Select options={categoriaOptions} value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-44" />
        <Select options={estadoOptions} value={estado} onChange={(e) => setEstado(e.target.value)} className="w-44" />
        <Select options={tipoOptions} value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-40" />
        <Button variant="secondary" className="ml-auto"><FileSpreadsheet size={15} />Generar XLS</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Beneficiario / CBU', 'Frecuencia', 'Categoría', 'Próx. Pago', 'Tipo', 'Monto', 'Estado', 'Notas'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrado.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-[#7A7A7A]">No hay transferencias</td></tr>
            ) : filtrado.map((t) => (
              <tr key={t.id} className={`border-b border-[#E8E8E8] hover:bg-[#FAFAFA] transition-colors ${t.estado === 'vencido' ? 'bg-[#FEF2F2]' : ''}`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-[#0D0D0D]">{t.beneficiario}</p>
                  <p className="text-xs text-[#7A7A7A]">{t.cbu}</p>
                </td>
                <td className="px-4 py-3 text-[#7A7A7A] capitalize">{t.frecuencia}</td>
                <td className="px-4 py-3"><Badge variant="neutral">{t.categoria}</Badge></td>
                <td className="px-4 py-3 text-[#7A7A7A] whitespace-nowrap">{t.fechaProximoPago}</td>
                <td className="px-4 py-3 text-[#7A7A7A] capitalize">{t.tipo}</td>
                <td className="px-4 py-3 font-semibold whitespace-nowrap">${t.monto.toLocaleString('es-AR')}</td>
                <td className="px-4 py-3">{estadoBadge(t.estado)}</td>
                <td className="px-4 py-3 text-[#7A7A7A] text-xs">{t.notas ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
