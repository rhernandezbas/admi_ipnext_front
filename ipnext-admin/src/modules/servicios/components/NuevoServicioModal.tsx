import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import type { ServicioTipo } from '@/types/servicio.types'

interface Props {
  open: boolean
  onClose: () => void
}

export function NuevoServicioModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({
    nombre: '',
    tipo: 'internet' as ServicioTipo,
    proveedor: '',
    costoMensual: '',
    vtoFactura: '',
    renovacion: '',
  })

  const mutation = useMutation({
    mutationFn: () => api.post('/servicios', {
      nombre: form.nombre,
      tipo: form.tipo,
      proveedor: form.proveedor,
      costoMensual: Number(form.costoMensual),
      vtoFactura: form.vtoFactura || null,
      renovacion: form.renovacion || null,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['servicios'] })
      toast.success('Servicio creado')
      onClose()
      setForm({ nombre: '', tipo: 'internet', proveedor: '', costoMensual: '', vtoFactura: '', renovacion: '' })
    },
    onError: () => toast.error('Error al crear servicio'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Servicio" size="md">
      <form role="form" onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value as ServicioTipo })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="internet">Internet & Telefonía</option>
              <option value="energia">Energía</option>
              <option value="seguridad">Seguridad</option>
              <option value="software">Software</option>
              <option value="hosting">Hosting</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor *</label>
            <input value={form.proveedor} onChange={(e) => setForm({ ...form, proveedor: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Costo Mensual *</label>
            <input type="number" min="0" value={form.costoMensual} onChange={(e) => setForm({ ...form, costoMensual: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vto. Factura</label>
            <input value={form.vtoFactura} onChange={(e) => setForm({ ...form, vtoFactura: e.target.value })} placeholder="ej: 15/04" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Renovación</label>
            <input value={form.renovacion} onChange={(e) => setForm({ ...form, renovacion: e.target.value })} placeholder="ej: 2026-06-01" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Creando...' : 'Crear'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
