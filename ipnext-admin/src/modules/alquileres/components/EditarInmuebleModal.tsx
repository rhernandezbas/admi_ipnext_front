import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import type { Inmueble } from '@/types/alquiler.types'

interface Props {
  open: boolean
  onClose: () => void
  inmueble: Inmueble | null
}

export function EditarInmuebleModal({ open, onClose, inmueble }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ nombre: '', direccion: '', propietario: '', uso: '', alquilerMensual: '', cbu: '' })

  useEffect(() => {
    if (inmueble) setForm({
      nombre: inmueble.nombre,
      direccion: inmueble.direccion,
      propietario: inmueble.propietario,
      uso: inmueble.uso,
      alquilerMensual: String(inmueble.alquilerMensual),
      cbu: inmueble.cbu ?? '',
    })
  }, [inmueble])

  const mutation = useMutation({
    mutationFn: () => api.patch(`/alquileres/${inmueble?.id}`, {
      nombre: form.nombre,
      direccion: form.direccion,
      propietario: form.propietario,
      uso: form.uso,
      alquilerMensual: Number(form.alquilerMensual),
      cbu: form.cbu,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alquileres'] })
      toast.success('Inmueble actualizado')
      onClose()
    },
    onError: () => toast.error('Error al actualizar inmueble'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Editar Inmueble" size="md">
      <form role="form" onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
            <input value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Propietario *</label>
            <input value={form.propietario} onChange={(e) => setForm({ ...form, propietario: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Uso *</label>
            <select value={form.uso} onChange={(e) => setForm({ ...form, uso: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="deposito">Depósito</option>
              <option value="oficina">Oficina</option>
              <option value="vivienda">Vivienda</option>
              <option value="comercial">Comercial</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alquiler Mensual *</label>
            <input type="number" value={form.alquilerMensual} onChange={(e) => setForm({ ...form, alquilerMensual: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CBU</label>
            <input value={form.cbu} onChange={(e) => setForm({ ...form, cbu: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
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
