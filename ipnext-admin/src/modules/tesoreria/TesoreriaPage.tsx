import { useState } from 'react'
import { Download, Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { FlujoCajaTable } from './components/FlujoCajaTable'
import { CuentasBancariasTable } from './components/CuentasBancariasTable'
import { ConciliacionTable } from './components/ConciliacionTable'
import { ProyeccionesTable } from './components/ProyeccionesTable'
import { flujoCajaMock, cuentasBancariasMock, conciliacionMock, proyeccionesMock } from '@/mocks/tesoreria.mock'

const tabs = [
  { id: 'flujo', label: 'Flujo de Caja' },
  { id: 'cuentas', label: 'Cuentas Bancarias' },
  { id: 'conciliacion', label: 'Conciliación' },
  { id: 'proyecciones', label: 'Proyecciones' },
]

export default function TesoreriaPage() {
  const [activeTab, setActiveTab] = useState('flujo')

  return (
    <div>
      <PageHeader
        title="Tesorería & Bancos"
        subtitle="Control financiero y liquidez"
        actions={
          <>
            <Button variant="secondary"><Download size={16} />Exportar</Button>
            <Button><Plus size={16} />Registrar Movimiento</Button>
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'flujo' && <FlujoCajaTable flujo={flujoCajaMock} cuentas={cuentasBancariasMock} />}
          {activeTab === 'cuentas' && <CuentasBancariasTable cuentas={cuentasBancariasMock} />}
          {activeTab === 'conciliacion' && <ConciliacionTable movimientos={conciliacionMock} />}
          {activeTab === 'proyecciones' && <ProyeccionesTable proyecciones={proyeccionesMock} />}
        </div>
      </Card>
    </div>
  )
}
