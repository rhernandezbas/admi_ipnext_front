import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import type { Empleado } from '@/types/nomina.types'

interface Props {
  open: boolean
  onClose: () => void
  empleado: Empleado | null
}

export function EditarEmpleadoModal({ open, onClose, empleado }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ nombre: '', puesto: '', area: '', rol: '', sueldoBruto: '', obraSocial: '', cargasSocialesPct: '30', cargasSocialesMonto: '' })

  useEffect(() => {
    if (empleado) setForm({
      nombre: empleado.nombre,
      puesto: empleado.puesto,
      area: empleado.area,
      rol: empleado.rol,
      sueldoBruto: String(empleado.sueldoBruto),
      obraSocial: empleado.obraSocial,
      cargasSocialesPct: String(empleado.cargasSocialesPct ?? 30),
      cargasSocialesMonto: empleado.cargasSocialesMonto != null ? String(empleado.cargasSocialesMonto) : '',
    })
  }, [empleado])

  const mutation = useMutation({
    mutationFn: () => api.patch(`/nominas/empleados/${empleado?.id}`, {
      nombre: form.nombre,
      puesto: form.puesto,
      area: form.area,
      rol: form.rol,
      sueldoBruto: Number(form.sueldoBruto),
      obraSocial: form.obraSocial,
      cargasSocialesPct: Number(form.cargasSocialesPct),
      cargasSocialesMonto: form.cargasSocialesMonto !== '' ? Number(form.cargasSocialesMonto) : null,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['nominas'] })
      toast.success('Empleado actualizado')
      onClose()
    },
    onError: () => toast.error('Error al actualizar empleado'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Editar Empleado" size="md">
      <form role="form" onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select value={form.rol} onChange={(e) => setForm({ ...form, rol: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="empleado">Empleado</option>
              <option value="supervisor">Supervisor</option>
              <option value="gerente">Gerente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sueldo Bruto *</label>
            <input type="number" value={form.sueldoBruto} onChange={(e) => setForm({ ...form, sueldoBruto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Obra Social</label>
            <input value={form.obraSocial} onChange={(e) => setForm({ ...form, obraSocial: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargas Sociales %</label>
            <input type="number" min="0" max="100" step="0.01" value={form.cargasSocialesPct} onChange={(e) => setForm({ ...form, cargasSocialesPct: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargas Sociales Monto fijo</label>
            <input type="number" min="0" value={form.cargasSocialesMonto} onChange={(e) => setForm({ ...form, cargasSocialesMonto: e.target.value })} placeholder="Dejar vacío para usar %" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
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
