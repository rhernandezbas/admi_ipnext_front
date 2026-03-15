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
import { useProveedores, useContratos, useRanking } from '@/hooks/useProveedores'
import { NuevoProveedorModal } from './components/NuevoProveedorModal'
import { NuevoContratoProveedorModal } from './components/NuevoContratoProveedorModal'
import { usePermiso } from '@/hooks/usePermiso'

const tabs = [
  { id: 'directorio', label: 'Directorio' },
  { id: 'contratos', label: 'Contratos' },
  { id: 'ranking', label: 'Ranking de Pagos' },
]

export default function ProveedoresPage() {
  const [activeTab, setActiveTab] = useState('directorio')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [modalProveedor, setModalProveedor] = useState(false)
  const [modalContrato, setModalContrato] = useState(false)
  const puedeEscribir = usePermiso('proveedores', 'escritura')
  const proveedoresQuery = useProveedores()
  const contratosQuery = useContratos()
  const rankingQuery = useRanking()

  const proveedores = proveedoresQuery.data ?? []
  const selectedProveedor = proveedores.find((p) => p.id === selectedId) ?? null

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar datos</div>

  return (
    <div>
      <PageHeader
        title="Proveedores"
        subtitle="Directorio de proveedores y contratos"
        actions={
          <>
            {puedeEscribir && <Button variant="secondary" onClick={() => setModalContrato(true)}><Plus size={16} />Nuevo Contrato</Button>}
            {puedeEscribir && <Button onClick={() => setModalProveedor(true)}><Plus size={16} />Nuevo Proveedor</Button>}
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={(t) => { setActiveTab(t); setSelectedId(null) }} />
        </div>
        <div className={`flex ${activeTab === 'directorio' && selectedProveedor ? '' : ''}`}>
          <div className="flex-1 p-6 min-w-0">
            {activeTab === 'directorio' && (
              proveedoresQuery.isLoading ? loading :
              proveedoresQuery.isError ? error :
              <ProveedoresTable
                proveedores={proveedores}
                selectedId={selectedId}
                onSelect={(id) => setSelectedId(selectedId === id ? null : id)}
              />
            )}
            {activeTab === 'contratos' && (
              contratosQuery.isLoading ? loading :
              contratosQuery.isError ? error :
              <ContratosTable contratos={contratosQuery.data ?? []} />
            )}
            {activeTab === 'ranking' && (
              rankingQuery.isLoading ? loading :
              rankingQuery.isError ? error :
              <RankingChart ranking={rankingQuery.data ?? []} />
            )}
          </div>
          {activeTab === 'directorio' && selectedProveedor && (
            <ProveedorDetailPanel proveedor={selectedProveedor} onClose={() => setSelectedId(null)} />
          )}
        </div>
      </Card>

      <NuevoProveedorModal open={modalProveedor} onClose={() => setModalProveedor(false)} />
      <NuevoContratoProveedorModal open={modalContrato} onClose={() => setModalContrato(false)} />
    </div>
  )
}
