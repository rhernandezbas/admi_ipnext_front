import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import type { Proveedor } from '@/types/proveedor.types'

interface Props {
  open: boolean
  onClose: () => void
  proveedor: Proveedor | null
}

export function EditarProveedorModal({ open, onClose, proveedor }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ nombre: '', email: '', cuit: '', categoria: '', cbu: '', sitioWeb: '' })

  useEffect(() => {
    if (proveedor) setForm({
      nombre: proveedor.nombre,
      email: proveedor.email,
      cuit: proveedor.cuit,
      categoria: proveedor.categoria,
      cbu: proveedor.cbu ?? '',
      sitioWeb: proveedor.sitioWeb ?? '',
    })
  }, [proveedor])

  const mutation = useMutation({
    mutationFn: () => api.patch(`/proveedores/${proveedor?.id}`, {
      nombre: form.nombre,
      email: form.email,
      cuit: form.cuit,
      categoria: form.categoria,
      cbu: form.cbu,
      sitioWeb: form.sitioWeb,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['proveedores'] })
      toast.success('Proveedor actualizado')
      onClose()
    },
    onError: () => toast.error('Error al actualizar proveedor'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Editar Proveedor" size="md">
      <form role="form" onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CUIT *</label>
            <input value={form.cuit} onChange={(e) => setForm({ ...form, cuit: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="tecnologia">Tecnología</option>
              <option value="servicios">Servicios</option>
              <option value="insumos">Insumos</option>
              <option value="logistica">Logística</option>
              <option value="consultoria">Consultoría</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CBU</label>
            <input value={form.cbu} onChange={(e) => setForm({ ...form, cbu: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio Web</label>
            <input value={form.sitioWeb} onChange={(e) => setForm({ ...form, sitioWeb: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
