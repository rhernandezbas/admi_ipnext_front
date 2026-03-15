import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { UrgentPayment } from '@/types/dashboard.types'

function statusBadge(status: UrgentPayment['status']) {
  if (status === 'warning') return <Badge variant="warning">Urgente</Badge>
  if (status === 'overdue') return <Badge variant="danger">Vencido</Badge>
  return <Badge variant="neutral">Pendiente</Badge>
}

export function UrgentPaymentsTable({ payments }: { payments: UrgentPayment[] }) {
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
          {payments.map((p) => (
            <tr key={p.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA] transition-colors">
              <td className="px-4 py-3 font-medium">{p.beneficiary}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{p.category}</td>
              <td className="px-4 py-3 font-semibold">{p.amount}</td>
              <td className="px-4 py-3 text-[#7A7A7A]">{p.dueDate}</td>
              <td className="px-4 py-3">{statusBadge(p.status)}</td>
              <td className="px-4 py-3">
                <Button variant="secondary" className="text-xs py-1 px-3">Pagar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
