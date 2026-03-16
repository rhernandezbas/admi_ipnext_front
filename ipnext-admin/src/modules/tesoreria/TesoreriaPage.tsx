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
import { useFlujoCaja, useCuentasBancarias, useConciliacion, useProyecciones } from '@/hooks/useTesoreria'
import { RegistrarMovimientoModal } from './components/RegistrarMovimientoModal'
import { EditarCuentaModal } from './components/EditarCuentaModal'
import { usePermiso } from '@/hooks/usePermiso'
import type { CuentaBancaria } from '@/types/tesoreria.types'

const tabs = [
  { id: 'flujo', label: 'Flujo de Caja' },
  { id: 'cuentas', label: 'Cuentas Bancarias' },
  { id: 'conciliacion', label: 'Conciliación' },
  { id: 'proyecciones', label: 'Proyecciones' },
]

export default function TesoreriaPage() {
  const [activeTab, setActiveTab] = useState('flujo')
  const [modalMovimiento, setModalMovimiento] = useState(false)
  const [cuentaEditar, setCuentaEditar] = useState<CuentaBancaria | null>(null)
  const puedeEscribir = usePermiso('tesoreria', 'escritura')
  const flujoCajaQuery = useFlujoCaja()
  const cuentasQuery = useCuentasBancarias()
  const conciliacionQuery = useConciliacion()
  const proyeccionesQuery = useProyecciones()

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar datos</div>

  return (
    <div>
      <PageHeader
        title="Tesorería & Bancos"
        subtitle="Control financiero y liquidez"
        actions={
          <>
            <Button variant="secondary"><Download size={16} />Exportar</Button>
            {puedeEscribir && <Button onClick={() => setModalMovimiento(true)}><Plus size={16} />Registrar Movimiento</Button>}
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'flujo' && (
            flujoCajaQuery.isLoading || cuentasQuery.isLoading ? loading :
            flujoCajaQuery.isError || cuentasQuery.isError ? error :
            <FlujoCajaTable flujo={flujoCajaQuery.data ?? []} cuentas={cuentasQuery.data ?? []} />
          )}
          {activeTab === 'cuentas' && (
            cuentasQuery.isLoading ? loading :
            cuentasQuery.isError ? error :
            <CuentasBancariasTable cuentas={cuentasQuery.data ?? []} onEditar={puedeEscribir ? setCuentaEditar : undefined} />
          )}
          {activeTab === 'conciliacion' && (
            conciliacionQuery.isLoading ? loading :
            conciliacionQuery.isError ? error :
            <ConciliacionTable movimientos={conciliacionQuery.data ?? []} />
          )}
          {activeTab === 'proyecciones' && (
            proyeccionesQuery.isLoading ? loading :
            proyeccionesQuery.isError ? error :
            <ProyeccionesTable proyecciones={proyeccionesQuery.data ?? []} />
          )}
        </div>
      </Card>

      <RegistrarMovimientoModal open={modalMovimiento} onClose={() => setModalMovimiento(false)} />
      <EditarCuentaModal open={!!cuentaEditar} onClose={() => setCuentaEditar(null)} cuenta={cuentaEditar} />
    </div>
  )
}
