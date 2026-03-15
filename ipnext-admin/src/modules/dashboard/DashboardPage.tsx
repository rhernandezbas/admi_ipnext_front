import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { KpiRow } from './components/KpiRow'
import { UrgentPaymentsTable } from './components/UrgentPaymentsTable'
import { ExpenseChart } from './components/ExpenseChart'
import { ActivityFeed } from './components/ActivityFeed'
import { kpisMock, urgentPaymentsMock, expenseChartMock, activityFeedMock } from '@/mocks/dashboard.mock'

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen ejecutivo del negocio"
        actions={<Button><Plus size={16} />Nuevo Pago</Button>}
      />

      <KpiRow kpis={kpisMock} />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <Card>
            <h3 className="font-semibold text-[#0D0D0D] mb-4">Ingresos vs Gastos</h3>
            <ExpenseChart data={expenseChartMock} />
          </Card>
        </div>
        <Card>
          <h3 className="font-semibold text-[#0D0D0D] mb-4">Actividad Reciente</h3>
          <ActivityFeed items={activityFeedMock} />
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0D0D0D]">Pagos Urgentes</h3>
          <span className="text-sm text-[#7A7A7A]">{urgentPaymentsMock.length} pendientes</span>
        </div>
        <UrgentPaymentsTable payments={urgentPaymentsMock} />
      </Card>
    </div>
  )
}
