import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { ProveedoresTable } from './components/ProveedoresTable'
import { ProveedorDetailPanel } from './components/ProveedorDetailPanel'
import { ContratosTable } from './components/ContratosTable'
import { RankingChart } from './components/RankingChart'
import { proveedoresMock, contratosMock, rankingMock } from '@/mocks/proveedores.mock'

const tabs = [
  { id: 'directorio', label: 'Directorio' },
  { id: 'contratos', label: 'Contratos' },
  { id: 'ranking', label: 'Ranking de Pagos' },
]

export default function ProveedoresPage() {
  const [activeTab, setActiveTab] = useState('directorio')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedProveedor = proveedoresMock.find((p) => p.id === selectedId) ?? null

  return (
    <div>
      <PageHeader
        title="Proveedores"
        subtitle="Directorio de proveedores y contratos"
        actions={<Button><Plus size={16} />Nuevo Proveedor</Button>}
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedId(null) }} />
        </div>
        <div className={`flex ${activeTab === 'directorio' && selectedProveedor ? '' : ''}`}>
          <div className="flex-1 p-6 min-w-0">
            {activeTab === 'directorio' && (
              <ProveedoresTable
                proveedores={proveedoresMock}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
              />
            )}
            {activeTab === 'contratos' && <ContratosTable contratos={contratosMock} />}
            {activeTab === 'ranking' && <RankingChart ranking={rankingMock} />}
          </div>
          {activeTab === 'directorio' && selectedProveedor && (
            <ProveedorDetailPanel proveedor={selectedProveedor} onClose={() => setSelectedId(null)} />
          )}
        </div>
      </Card>
    </div>
  )
}
