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
import { transferenciasMock, calendarioMock } from '@/mocks/transferencias.mock'

const tabs = [
  { id: 'lista', label: 'Lista' },
  { id: 'calendario', label: 'Calendario' },
  { id: 'recurrentes', label: 'Recurrentes' },
  { id: 'nueva', label: 'Nueva Carga' },
]

export default function TransferenciasPage() {
  const [activeTab, setActiveTab] = useState('lista')

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
          {activeTab === 'lista' && <TransferenciasTable data={transferenciasMock} />}
          {activeTab === 'calendario' && <CalendarioView dias={calendarioMock} />}
          {activeTab === 'recurrentes' && <RecurrentesTable data={transferenciasMock} />}
          {activeTab === 'nueva' && <NuevaTransferenciaForm />}
        </div>
      </Card>
    </div>
  )
}
