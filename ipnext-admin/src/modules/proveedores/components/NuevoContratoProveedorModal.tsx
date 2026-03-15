import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { proveedoresService } from '@/services/proveedores.service'

interface Props {
  open: boolean
  onClose: () => void
}

export function NuevoContratoProveedorModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ proveedorId: '', vigenciaDesde: '', vigenciaHasta: '', montoAnual: '', descripcion: '' })

  const { data: proveedores = [] } = useQuery({
    queryKey: ['proveedores'],
    queryFn: proveedoresService.getAll,
    enabled: open,
  })

  const mutation = useMutation({
    mutationFn: () => proveedoresService.createContrato({
      proveedor: form.proveedorId,
      vigenciaDesde: form.vigenciaDesde,
      vigenciaHasta: form.vigenciaHasta,
      montoAnual: Number(form.montoAnual),
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['proveedores', 'contratos'] })
      toast.success('Contrato creado')
      setForm({ proveedorId: '', vigenciaDesde: '', vigenciaHasta: '', montoAnual: '', descripcion: '' })
      onClose()
    },
    onError: () => toast.error('Error al crear contrato'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Contrato" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor *</label>
          <select value={form.proveedorId} onChange={(e) => setForm({ ...form, proveedorId: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required>
            <option value="">Seleccionar...</option>
            {proveedores.map((p) => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vigencia Desde *</label>
            <input type="date" value={form.vigenciaDesde} onChange={(e) => setForm({ ...form, vigenciaDesde: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vigencia Hasta *</label>
            <input type="date" value={form.vigenciaHasta} onChange={(e) => setForm({ ...form, vigenciaHasta: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto Anual *</label>
            <input type="number" value={form.montoAnual} onChange={(e) => setForm({ ...form, montoAnual: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Crear Contrato'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
