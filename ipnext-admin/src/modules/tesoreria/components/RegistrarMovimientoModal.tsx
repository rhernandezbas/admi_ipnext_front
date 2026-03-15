import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { tesoreriaService } from '@/services/tesoreria.service'
import { api } from '@/lib/api'

interface Props {
  open: boolean
  onClose: () => void
}

export function RegistrarMovimientoModal({ open, onClose }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ cuentaId: '', tipo: 'ingreso', monto: '', descripcion: '', fecha: '' })

  const { data: cuentas = [] } = useQuery({
    queryKey: ['tesoreria', 'cuentas'],
    queryFn: tesoreriaService.getCuentas,
    enabled: open,
  })

  const mutation = useMutation({
    mutationFn: () => api.post('/tesoreria/movimientos', {
      cuentaId: form.cuentaId,
      tipo: form.tipo,
      monto: Number(form.monto),
      descripcion: form.descripcion,
      fecha: form.fecha,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tesoreria', 'flujo-caja'] })
      qc.invalidateQueries({ queryKey: ['tesoreria', 'cuentas'] })
      toast.success('Movimiento registrado')
      setForm({ cuentaId: '', tipo: 'ingreso', monto: '', descripcion: '', fecha: '' })
      onClose()
    },
    onError: () => toast.error('Error al registrar movimiento'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Registrar Movimiento" size="md">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cuenta *</label>
          <select value={form.cuentaId} onChange={(e) => setForm({ ...form, cuentaId: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required>
            <option value="">Seleccionar...</option>
            {cuentas.map((c) => <option key={c.id} value={c.id}>{c.banco} — {c.nroCuenta}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo *</label>
            <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Monto *</label>
            <input type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
            <input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
            <input type="date" value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
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
