import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { nominasService } from '@/services/nominas.service'
import { api } from '@/lib/api'

interface Props {
  open: boolean
  onClose: () => void
}

export function LiquidarNominaModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ empleadoId: '', periodo: '', sueldoBruto: '', deducciones: '0' })

  const { data: empleados = [] } = useQuery({
    queryKey: ['nominas', 'empleados'],
    queryFn: nominasService.getEmpleados,
    enabled: open,
  })

  const mutation = useMutation({
    mutationFn: () => api.post('/nominas/liquidaciones', {
      empleadoId: form.empleadoId,
      periodo: form.periodo,
      sueldoBruto: Number(form.sueldoBruto),
      deducciones: Number(form.deducciones),
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['nominas', 'liquidaciones'] })
      toast.success('Liquidación creada')
      setForm({ empleadoId: '', periodo: '', sueldoBruto: '', deducciones: '0' })
      onClose()
    },
    onError: () => toast.error('Error al crear liquidación'),
  })

  const neto = Number(form.sueldoBruto || 0) - Number(form.deducciones || 0)

  return (
    <Modal open={open} onClose={onClose} title="Liquidar Nómina" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Empleado *</label>
          <select value={form.empleadoId} onChange={(e) => {
            const emp = empleados.find(x => x.id === e.target.value)
            setForm({ ...form, empleadoId: e.target.value, sueldoBruto: emp ? String(emp.sueldoBruto) : '' })
          }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required>
            <option value="">Seleccionar...</option>
            {empleados.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Período *</label>
          <input type="month" value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sueldo Bruto *</label>
          <input type="number" value={form.sueldoBruto} onChange={(e) => setForm({ ...form, sueldoBruto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deducciones *</label>
          <input type="number" value={form.deducciones} onChange={(e) => setForm({ ...form, deducciones: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
          <span className="text-gray-500">Neto a Pagar:</span>
          <span className="ml-2 font-semibold text-gray-900">${neto.toLocaleString('es-AR')}</span>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Creando...' : 'Liquidar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
