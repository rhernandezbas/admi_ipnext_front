import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Modal } from '@/components/ui/Modal'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import type { CuentaBancaria } from '@/types/tesoreria.types'

interface Props {
  open: boolean
  onClose: () => void
  cuenta: CuentaBancaria | null
}

export function EditarCuentaModal({ open, onClose, cuenta }: Props) {
  const qc = useQueryClient()
  const [form, setForm] = useState({ banco: '', tipoCuenta: '', descripcion: '', tipoEmpresa: '', nroCuenta: '', activa: true })

  useEffect(() => {
    if (cuenta) setForm({
      banco: cuenta.banco,
      tipoCuenta: cuenta.tipoCuenta,
      descripcion: cuenta.descripcion,
      tipoEmpresa: cuenta.tipoEmpresa,
      nroCuenta: cuenta.nroCuenta,
      activa: cuenta.activa,
    })
  }, [cuenta])

  const mutation = useMutation({
    mutationFn: () => api.patch(`/tesoreria/cuentas/${cuenta?.id}`, {
      banco: form.banco,
      tipoCuenta: form.tipoCuenta,
      descripcion: form.descripcion,
      tipoEmpresa: form.tipoEmpresa,
      nroCuenta: form.nroCuenta,
      activa: form.activa,
    }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['tesoreria'] })
      toast.success('Cuenta actualizada')
      onClose()
    },
    onError: () => toast.error('Error al actualizar cuenta'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Editar Cuenta" size="md">
      <form role="form" onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Banco *</label>
            <input value={form.banco} onChange={(e) => setForm({ ...form, banco: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Cuenta</label>
            <select value={form.tipoCuenta} onChange={(e) => setForm({ ...form, tipoCuenta: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option value="corriente">Corriente</option>
              <option value="caja_ahorro">Caja de Ahorro</option>
              <option value="plazo_fijo">Plazo Fijo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo Empresa</label>
            <input value={form.tipoEmpresa} onChange={(e) => setForm({ ...form, tipoEmpresa: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <input value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nro. Cuenta / CBU</label>
            <input value={form.nroCuenta} onChange={(e) => setForm({ ...form, nroCuenta: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input type="checkbox" id="activa" checked={form.activa} onChange={(e) => setForm({ ...form, activa: e.target.checked })} className="h-4 w-4" />
            <label htmlFor="activa" className="text-sm font-medium text-gray-700">Cuenta activa</label>
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
