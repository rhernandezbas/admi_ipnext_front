import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { TransferenciasTable } from './components/TransferenciasTable'
import { CalendarioView } from './components/CalendarioView'
import { RecurrentesTable } from './components/RecurrentesTable'
import { NuevaTransferenciaForm } from './components/NuevaTransferenciaForm'
import { useTransferencias, useCalendario, useRecurrentes } from '@/hooks/useTransferencias'

const tabs = [
  { id: 'lista', label: 'Lista' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'recurrentes', label: 'Recurrentes' },
  { id: 'nueva', label: 'Nueva Carga' },
]

export default function TransferenciasPage() {
  const [activeTab, setActiveTab] = useState('lista')
  const transferenciasQuery = useTransferencias()
  const calendarioQuery = useCalendario()
  const recurrentesQuery = useRecurrentes()

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar datos</div>

  return (
    <div>
      <PageHeader
        title="Transferencias"
        subtitle="Gestión de pagos y transferencias"
        actions={<Button onClick={() => setActiveTab('nueva')}><Plus size={16} />Nueva Transferencia</Button>}
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'lista' && (
            transferenciasQuery.isLoading ? loading :
            transferenciasQuery.isError ? error :
            <TransferenciasTable data={transferenciasQuery.data ?? []} />
          )}
          {activeTab === 'calendario' && (
            calendarioQuery.isLoading ? loading :
            calendarioQuery.isError ? error :
            <CalendarioView dias={calendarioQuery.data ?? []} />
          )}
          {activeTab === 'recurrentes' && (
            recurrentesQuery.isLoading ? loading :
            recurrentesQuery.isError ? error :
            <RecurrentesTable data={recurrentesQuery.data ?? []} />
          )}
          {activeTab === 'nueva' && <NuevaTransferenciaForm />}
        </div>
      </Card>
    </div>
  )
}
