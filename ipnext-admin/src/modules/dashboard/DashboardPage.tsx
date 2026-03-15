import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { KpiRow } from './components/KpiRow'
import { UrgentPaymentsTable } from './components/UrgentPaymentsTable'
import { ExpenseChart } from './components/ExpenseChart'
import { ActivityFeed } from './components/ActivityFeed'
import {
  useDashboardKpis,
  usePagosUrgentes,
  useDistribucionEgresos,
  useActividadReciente,
} from '@/hooks/useDashboard'

export default function DashboardPage() {
  const kpisQuery = useDashboardKpis()
  const pagosQuery = usePagosUrgentes()
  const egresosQuery = useDistribucionEgresos()
  const actividadQuery = useActividadReciente()

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen ejecutivo del negocio"
        actions={<Button><Plus size={16} />Nuevo Pago</Button>}
      />

      {kpisQuery.isLoading ? (
        <div className="text-sm text-[#7A7A7A] py-4">Cargando KPIs…</div>
      ) : kpisQuery.isError ? (
        <div className="text-sm text-red-500 py-4">Error al cargar KPIs</div>
      ) : (
        <KpiRow kpis={kpisQuery.data ?? []} />
      )}

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <Card>
            <h3 className="font-semibold text-[#0D0D0D] mb-4">Ingresos vs Gastos</h3>
            {egresosQuery.isLoading ? (
              <div className="text-sm text-[#7A7A7A]">Cargando gráfico…</div>
            ) : egresosQuery.isError ? (
              <div className="text-sm text-red-500">Error al cargar gráfico</div>
            ) : (
              <ExpenseChart data={egresosQuery.data ?? []} />
            )}
          </Card>
        </div>
        <Card>
          <h3 className="font-semibold text-[#0D0D0D] mb-4">Actividad Reciente</h3>
          {actividadQuery.isLoading ? (
            <div className="text-sm text-[#7A7A7A]">Cargando actividad…</div>
          ) : actividadQuery.isError ? (
            <div className="text-sm text-red-500">Error al cargar actividad</div>
          ) : (
            <ActivityFeed items={actividadQuery.data ?? []} />
          )}
        </Card>
      </div>

      <Card className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[#0D0D0D]">Pagos Urgentes</h3>
          <span className="text-sm text-[#7A7A7A]">{pagosQuery.data?.length ?? 0} pendientes</span>
        </div>
        {pagosQuery.isLoading ? (
          <div className="text-sm text-[#7A7A7A]">Cargando pagos…</div>
        ) : pagosQuery.isError ? (
          <div className="text-sm text-red-500">Error al cargar pagos urgentes</div>
        ) : (
          <UrgentPaymentsTable payments={pagosQuery.data ?? []} />
        )}
      </Card>
    </div>
  )
}
