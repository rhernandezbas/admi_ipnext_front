import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { nominasService } from '@/services/nominas.service'

interface Props {
  open: boolean
  onClose: () => void
}

export function RegistrarGuardiaModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ empleadoId: '', fecha: '', horas: '', monto: '', descripcion: '' })

  const { data: empleados = [] } = useQuery({
    queryKey: ['nominas', 'empleados'],
    queryFn: nominasService.getEmpleados,
    enabled: open,
  })

  const mutation = useMutation({
    mutationFn: () => nominasService.createGuardia({
      empleadoId: form.empleadoId,
      fecha: form.fecha,
      horas: Number(form.horas),
      monto: Number(form.monto),
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['nominas', 'guardias'] })
      toast.success('Guardia registrada')
      setForm({ empleadoId: '', fecha: '', horas: '', monto: '', descripcion: '' })
      onClose()
    },
    onError: () => toast.error('Error al registrar guardia'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Registrar Guardia" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Empleado *</label>
          <select value={form.empleadoId} onChange={(e) => setForm({ ...form, empleadoId: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required>
            <option value="">Seleccionar...</option>
            {empleados.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas *</label>
            <input type="number" value={form.horas} onChange={(e) => setForm({ ...form, horas: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto *</label>
            <input type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" rows={2} />
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
