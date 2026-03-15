import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { nominasService } from '@/services/nominas.service'

interface Props {
  open: boolean
  onClose: () => void
}

export function NuevoEmpleadoModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ nombre: '', puesto: '', area: '', rol: '', sueldoBruto: '', obraSocial: '', fechaIngreso: '' })

  const mutation = useMutation({
    mutationFn: () => nominasService.createEmpleado({
      nombre: form.nombre,
      puesto: form.puesto,
      area: form.area,
      rol: form.rol,
      sueldoBruto: Number(form.sueldoBruto),
      obraSocial: form.obraSocial,
      fechaIngreso: form.fechaIngreso,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['nominas', 'empleados'] })
      toast.success('Empleado agregado')
      setForm({ nombre: '', puesto: '', area: '', rol: '', sueldoBruto: '', obraSocial: '', fechaIngreso: '' })
      onClose()
    },
    onError: () => toast.error('Error al agregar empleado'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Empleado" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Puesto *</label>
            <input value={form.puesto} onChange={(e) => setForm({ ...form, puesto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área *</label>
            <input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol *</label>
            <input value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sueldo Bruto *</label>
            <input type="number" value={form.sueldoBruto} onChange={(e) => setForm({ ...form, sueldoBruto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Obra Social *</label>
            <input value={form.obraSocial} onChange={(e) => setForm({ ...form, obraSocial: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso *</label>
            <input type="date" value={form.fechaIngreso} onChange={(e) => setForm({ ...form, fechaIngreso: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
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
