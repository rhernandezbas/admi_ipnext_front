import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { PagoUrgente } from '@/types/dashboard.types'
import { formatARS, formatFecha } from '@/lib/formatters'
import { toast } from '@/lib/toast'
import { api } from '@/lib/api'
import { usePermiso } from '@/hooks/usePermiso'

function estadoBadge(estado: string) {
  if (estado === 'vencido') return <Badge variant="danger">Vencido</Badge>
  if (estado === 'por_vencer') return <Badge variant="warning">Urgente</Badge>
  return <Badge variant="neutral">Pendiente</Badge>
}

function PagarButton({ id }: { id: string }) {
  const qc = useQueryClient()
  const puedeEscribir = usePermiso('transferencias', 'escritura')
  const mutation = useMutation({
    mutationFn: () => api.patch(`/transferencias/${id}/estado`, { estado: 'pagado' }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['dashboard', 'pagos-urgentes'] })
      toast.success('Pago marcado como realizado')
    },
    onError: () => toast.error('Error al registrar pago'),
  })
  if (!puedeEscribir) return null
  return (
    <Button
      variant="secondary"
      className="text-xs py-1 px-3"
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? '...' : 'Pagar'}
    </Button>
  )
}

export function UrgentPaymentsTable({ payments }: { payments: PagoUrgente[] }) {
  const safePayments = Array.isArray(payments) ? payments : []
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
            {['Beneficiario', 'Categoría', 'Monto', 'Vencimiento', 'Estado', 'Acción'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safePayments.map((p) => (
            <tr key={p.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA] transition-colors">
              <td className="px-4 py-3 font-medium">{p.beneficiario}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{p.categoria}</td>
              <td className="px-4 py-3 font-semibold">${formatARS(p.monto)} {p.moneda}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{formatFecha(p.fechaPago)}</td>
              <td className="px-4 py-3">{estadoBadge(p.estado)}</td>
              <td className="px-4 py-3">
                <PagarButton id={p.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
