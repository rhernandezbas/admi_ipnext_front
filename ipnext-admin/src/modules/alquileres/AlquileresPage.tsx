import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { InmueblesTable } from './components/InmueblesTable'
import { ContratosAlquilerTable } from './components/ContratosAlquilerTable'
import { PagosRecibosTable } from './components/PagosRecibosTable'
import { VencimientosTable } from './components/VencimientosTable'
import { inmueblesMock, contratosAlquilerMock, pagosAlquilerMock, vencimientosMock } from '@/mocks/alquileres.mock'

const tabs = [
  { id: 'inmuebles', label: 'Inmuebles' },
  { id: 'contratos', label: 'Contratos de Alquiler' },
  { id: 'pagos', label: 'Pagos & Recibos' },
  { id: 'vencimientos', label: 'Vencimientos' },
]

export default function AlquileresPage() {
  const [activeTab, setActiveTab] = useState('inmuebles')

  return (
    <div>
      <PageHeader
        title="Alquileres & Inmuebles"
        subtitle="Gestión de inmuebles y contratos de alquiler"
        actions={
          <>
            <Button variant="secondary">Registrar Pago</Button>
            <Button><Plus size={16} />Nuevo Inmueble</Button>
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'inmuebles' && <InmueblesTable inmuebles={inmueblesMock} />}
          {activeTab === 'contratos' && <ContratosAlquilerTable contratos={contratosAlquilerMock} />}
          {activeTab === 'pagos' && <PagosRecibosTable pagos={pagosAlquilerMock} />}
          {activeTab === 'vencimientos' && <VencimientosTable vencimientos={vencimientosMock} />}
        </div>
      </Card>
    </div>
  )
}
