import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import type { Proveedor } from '@/types/proveedor.types'
import { formatARS } from '@/lib/formatters'

interface Props {
  proveedores: Proveedor[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export function ProveedoresTable({ proveedores, selectedId, onSelect }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const safeProveedores = Array.isArray(proveedores) ? proveedores : []

  const filtrados = safeProveedores.filter((p) =>
    !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.cuit.includes(busqueda)
  )

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <Input placeholder="Buscar por nombre o CUIT..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} className="w-72" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {['Proveedor', 'CUIT', 'Categoría', 'CBU / Alias', 'Total Anual'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-[#7A7A7A]">No hay proveedores</td></tr>
            ) : filtrados.map((p) => (
              <tr
                key={p.id}
                onClick={() => onSelect(p.id)}
                className={`border-b border-[#E8E8E8] cursor-pointer transition-colors ${selectedId === p.id ? 'bg-red-50' : 'hover:bg-[#FAFAFA]'}`}
              >
                <td className="px-4 py-3">
                  <p className="font-medium text-[#0D0D0D]">{p.nombre}</p>
                  <p className="text-xs text-[#7A7A7A]">{p.email}</p>
                </td>
                <td className="px-4 py-3 text-[#7A7A7A]">{p.cuit}</td>
                <td className="px-4 py-3"><Badge variant="neutral">{p.categoria}</Badge></td>
                <td className="px-4 py-3 text-[#7A7A7A] text-xs">{p.cbu}</td>
                <td className="px-4 py-3 font-semibold">${formatARS(p.totalAnual)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
