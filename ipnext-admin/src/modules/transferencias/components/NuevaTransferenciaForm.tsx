import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { historialBeneficiarioMock } from '@/mocks/transferencias.mock'
import { formatARS } from '@/lib/formatters'

const categoriaOptions = [
  { value: '', label: 'Seleccioná categoría' },
  { value: 'Energía', label: 'Energía' },
  { value: 'Gas', label: 'Gas' },
  { value: 'Alquiler', label: 'Alquiler' },
  { value: 'Internet', label: 'Internet' },
  { value: 'Seguridad', label: 'Seguridad' },
  { value: 'Agua', label: 'Agua' },
  { value: 'Software', label: 'Software' },
  { value: 'Insumos', label: 'Insumos' },
]

const metodoPagoOptions = [
  { value: '', label: 'Seleccioná método' },
  { value: 'debito', label: 'Débito automático' },
  { value: 'transferencia', label: 'Transferencia bancaria' },
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'cheque', label: 'Cheque' },
]

export function NuevaTransferenciaForm() {
  const navigate = useNavigate()
  const [historialOpen, setHistorialOpen] = useState(false)
  const [form, setForm] = useState({ beneficiario: '', monto: '', fechaPago: '', categoria: '', metodoPago: '', notas: '' })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/transferencias')
  }

  return (
    <Card className="max-w-2xl">
      <h3 className="font-semibold text-lg text-[#0D0D0D] mb-6">Nueva Transferencia</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Beneficiario" placeholder="Buscar proveedor..." value={form.beneficiario} onChange={set('beneficiario')} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Monto" type="number" placeholder="0.00" value={form.monto} onChange={set('monto')} required />
          <Input label="Fecha de Pago" type="date" value={form.fechaPago} onChange={set('fechaPago')} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Categoría" options={categoriaOptions} value={form.categoria} onChange={set('categoria')} required />
          <Select label="Método de Pago" options={metodoPagoOptions} value={form.metodoPago} onChange={set('metodoPago')} required />
        </div>
        <Textarea label="Notas / Referencia" placeholder="Referencia opcional..." value={form.notas} onChange={set('notas')} />

        {/* Historial colapsable */}
        <div className="border border-[#E8E8E8] rounded-lg overflow-hidden">
          <button type="button" onClick={() => setHistorialOpen(!historialOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-[#FAFAFA] text-sm font-medium text-[#0D0D0D] cursor-pointer">
            Historial con este proveedor
            {historialOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {historialOpen && (
            <div className="p-4">
              {form.beneficiario ? (
                <table className="w-full text-sm">
                  <thead><tr className="text-xs text-[#7A7A7A] border-b border-[#E8E8E8]">
                    <th className="text-left py-1">Fecha</th><th className="text-left py-1">Monto</th><th className="text-left py-1">Estado</th>
                  </tr></thead>
                  <tbody>{historialBeneficiarioMock.map((h) => (
                    <tr key={h.id} className="border-b border-[#E8E8E8]">
                      <td className="py-2 text-[#7A7A7A]">{h.fecha}</td>
                      <td className="py-2 font-medium">${formatARS(h.monto)}</td>
                      <td className="py-2 text-green-600 capitalize">{h.estado}</td>
                    </tr>
                  ))}</tbody>
                </table>
              ) : (
                <p className="text-sm text-[#7A7A7A]">No existe información asociada en la base de datos</p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <Button type="button" variant="secondary" onClick={() => navigate('/transferencias')}>Cancelar</Button>
          <Button type="submit">Registrar Transferencia</Button>
        </div>
      </form>
    </Card>
  )
}
