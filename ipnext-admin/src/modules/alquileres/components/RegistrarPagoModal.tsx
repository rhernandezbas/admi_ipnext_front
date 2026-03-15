import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { alquileresService } from '@/services/alquileres.service'
import type { Inmueble } from '@/types/alquiler.types'

interface Props {
  open: boolean
  onClose: () => void
  inmuebles: Inmueble[]
}

export function RegistrarPagoModal({ open, onClose, inmuebles }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ inmuebleId: '', periodo: '', monto: '', fechaPago: '', comprobante: '' })

  const mutation = useMutation({
    mutationFn: () => alquileresService.createPago({
      inmuebleId: form.inmuebleId,
      periodo: form.periodo,
      monto: Number(form.monto),
      fechaPago: form.fechaPago || undefined,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['alquileres', 'pagos'] })
      toast.success('Pago registrado')
      setForm({ inmuebleId: '', periodo: '', monto: '', fechaPago: '', comprobante: '' })
      onClose()
    },
    onError: () => toast.error('Error al registrar pago'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Registrar Pago" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Inmueble *</label>
          <select value={form.inmuebleId} onChange={(e) => setForm({ ...form, inmuebleId: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required>
            <option value="">Seleccionar...</option>
            {inmuebles.map((i) => <option key={i.id} value={i.id}>{i.nombre}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Período *</label>
          <input type="month" value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Monto *</label>
          <input type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pago</label>
          <input type="date" value={form.fechaPago} onChange={(e) => setForm({ ...form, fechaPago: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comprobante (URL)</label>
          <input type="text" value={form.comprobante} onChange={(e) => setForm({ ...form, comprobante: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Registrar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
