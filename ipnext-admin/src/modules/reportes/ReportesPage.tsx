import { useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { InformeItem } from './components/InformeItem'
import { ReportePreview } from './components/ReportePreview'
import { useReportes } from '@/hooks/useReportes'

const tabs = [
  { id: 'financiero', label: 'Financiero' },
  { id: 'pagos', label: 'Pagos' },
  { id: 'nominas', label: 'Nóminas' },
  { id: 'proveedores', label: 'Proveedores' },
  { id: 'impuestos', label: 'Impuestos' },
]

export default function ReportesPage() {
  const [activeTab, setActiveTab] = useState('financiero')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const reportesQuery = useReportes()

  const allReportes = reportesQuery.data ?? {}
  const informes = allReportes[activeTab] ?? []

  return (
    <div>
      <PageHeader title="Reportes & Analytics" subtitle="Generación y descarga de informes" />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedId(null) }} />
        </div>
        <div className="flex gap-0 min-h-96">
          <div className="w-72 flex-shrink-0 border-r border-[#E8E8E8] p-4 flex flex-col gap-3">
            {reportesQuery.isLoading && (
              <div className="text-sm text-[#7A7A7A]">Cargando…</div>
            )}
            {reportesQuery.isError && (
              <div className="text-sm text-red-500">Error al cargar reportes</div>
            )}
            {informes.map((inf) => (
              <InformeItem
                key={inf.id}
                informe={inf}
                selected={selectedId === inf.id}
                onSelect={() => setSelectedId(inf.id)}
              />
            ))}
          </div>
          <div className="flex-1 p-6">
            {selectedId ? (
              <ReportePreview data={{ titulo: informes.find((i) => i.id === selectedId)?.nombre ?? '', kpis: [], chartData: [] }} />
            ) : (
              <div className="flex items-center justify-center h-full text-[#7A7A7A]">
                <p>Seleccioná un informe para ver la vista previa</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
