import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { EmpleadosTable } from './components/EmpleadosTable'
import { GuardiasTable } from './components/GuardiasTable'
import { CompensacionesTable } from './components/CompensacionesTable'
import { empleadosMock, guardiasMock, compensacionesMock, nominaResumenMock } from '@/mocks/nominas.mock'

const tabs = [
  { id: 'empleados', label: 'Empleados' },
  { id: 'liquidacion', label: 'Liquidación' },
  { id: 'guardias', label: 'Guardias' },
  { id: 'compensaciones', label: 'Compensaciones Adicionales' },
]

export default function NominasPage() {
  const [activeTab, setActiveTab] = useState('empleados')

  return (
    <div>
      <PageHeader
        title="Nóminas & RRHH"
        subtitle="Gestión de personal y liquidaciones"
        actions={<Button><Plus size={16} />Liquidar Nómina</Button>}
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'empleados' && <EmpleadosTable empleados={empleadosMock} resumen={nominaResumenMock} />}
          {activeTab === 'liquidacion' && (
            <div className="text-center py-12 text-[#7A7A7A]">
              <p className="text-lg font-medium mb-2">Proceso de Liquidación</p>
              <p className="text-sm">Próxima liquidación: Marzo 2026</p>
              <Button className="mt-4">Iniciar Liquidación</Button>
            </div>
          )}
          {activeTab === 'guardias' && <GuardiasTable guardias={guardiasMock} />}
          {activeTab === 'compensaciones' && <CompensacionesTable compensaciones={compensacionesMock} />}
        </div>
      </Card>
    </div>
  )
}
