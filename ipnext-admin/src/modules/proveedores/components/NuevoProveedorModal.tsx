import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { proveedoresService } from '@/services/proveedores.service'

interface Props {
  open: boolean
  onClose: () => void
}

export function NuevoProveedorModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ nombre: '', categoria: '', cuit: '', cbu: '', alias: '', email: '', sitioWeb: '' })

  const mutation = useMutation({
    mutationFn: () => proveedoresService.create({
      nombre: form.nombre,
      categoria: form.categoria,
      cuit: form.cuit || undefined,
      cbu: form.cbu || undefined,
      email: form.email || undefined,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['proveedores'] })
      toast.success('Proveedor agregado')
      setForm({ nombre: '', categoria: '', cuit: '', cbu: '', alias: '', email: '', sitioWeb: '' })
      onClose()
    },
    onError: () => toast.error('Error al agregar proveedor'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Proveedor" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
            <input value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CUIT</label>
            <input value={form.cuit} onChange={(e) => setForm({ ...form, cuit: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CBU</label>
            <input value={form.cbu} onChange={(e) => setForm({ ...form, cbu: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio Web</label>
            <input type="url" value={form.sitioWeb} onChange={(e) => setForm({ ...form, sitioWeb: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
