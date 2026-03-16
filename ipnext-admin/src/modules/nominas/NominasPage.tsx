import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { EmpleadosTable } from './components/EmpleadosTable'
import { GuardiasTable } from './components/GuardiasTable'
import { CompensacionesTable } from './components/CompensacionesTable'
import { useEmpleados, useGuardias, useCompensaciones } from '@/hooks/useNominas'
import { LiquidarNominaModal } from './components/LiquidarNominaModal'
import { NuevoEmpleadoModal } from './components/NuevoEmpleadoModal'
import { RegistrarGuardiaModal } from './components/RegistrarGuardiaModal'
import { RegistrarCompensacionModal } from './components/RegistrarCompensacionModal'
import { usePermiso } from '@/hooks/usePermiso'

const tabs = [
  { id: 'empleados', label: 'Empleados' },
  { id: 'liquidacion', label: 'Liquidación' },
  { id: 'guardias', label: 'Guardias' },
  { id: 'compensaciones', label: 'Compensaciones Adicionales' },
]

export default function NominasPage() {
  const [activeTab, setActiveTab] = useState('empleados')
  const [modalLiquidar, setModalLiquidar] = useState(false)
  const [modalEmpleado, setModalEmpleado] = useState(false)
  const [modalGuardia, setModalGuardia] = useState(false)
  const [modalCompensacion, setModalCompensacion] = useState(false)
  const puedeEscribir = usePermiso('nominas', 'escritura')
  const empleadosQuery = useEmpleados()
  const guardiasQuery = useGuardias()
  const compensacionesQuery = useCompensaciones()

  const empleados = empleadosQuery.data ?? []
  const totalBruto = empleados.reduce((acc, e) => acc + e.sueldoBruto, 0)
  const cargasSociales = Math.round(totalBruto * 0.30)
  const netoAPagar = totalBruto - cargasSociales
  const resumen = { totalBruto, cargasSociales, netoAPagar, empleadosConAumento: 0, liquidacionesPendientes: 0 }

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar datos</div>

  return (
    <div>
      <PageHeader
        title="Nóminas & RRHH"
        subtitle="Gestión de personal y liquidaciones"
        actions={
          <>
            {puedeEscribir && <Button variant="secondary" onClick={() => setModalEmpleado(true)}><Plus size={16} />Nuevo Empleado</Button>}
            {puedeEscribir && <Button onClick={() => setModalLiquidar(true)}><Plus size={16} />Liquidar Nómina</Button>}
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'empleados' && (
            empleadosQuery.isLoading ? loading :
            empleadosQuery.isError ? error :
            <EmpleadosTable empleados={empleados} resumen={resumen} />
          )}
          {activeTab === 'liquidacion' && (
            <div className="text-center py-12 text-[#7A7A7A]">
              <p className="text-lg font-medium mb-2">Proceso de Liquidación</p>
              <p className="text-sm">Próxima liquidación: Marzo 2026</p>
              {puedeEscribir && <Button className="mt-4" onClick={() => setModalLiquidar(true)}>Iniciar Liquidación</Button>}
            </div>
          )}
          {activeTab === 'guardias' && (
            guardiasQuery.isLoading ? loading :
            guardiasQuery.isError ? error :
            <div>
              {puedeEscribir && <div className="mb-4"><Button onClick={() => setModalGuardia(true)}><Plus size={16} />Registrar Guardia</Button></div>}
              <GuardiasTable guardias={guardiasQuery.data ?? []} empleados={empleados} />
            </div>
          )}
          {activeTab === 'compensaciones' && (
            compensacionesQuery.isLoading ? loading :
            compensacionesQuery.isError ? error :
            <div>
              {puedeEscribir && <div className="mb-4"><Button onClick={() => setModalCompensacion(true)}><Plus size={16} />Registrar Compensación</Button></div>}
              <CompensacionesTable compensaciones={compensacionesQuery.data ?? []} empleados={empleados} />
            </div>
          )}
        </div>
      </Card>

      <LiquidarNominaModal open={modalLiquidar} onClose={() => setModalLiquidar(false)} />
      <NuevoEmpleadoModal open={modalEmpleado} onClose={() => setModalEmpleado(false)} />
      <RegistrarGuardiaModal open={modalGuardia} onClose={() => setModalGuardia(false)} />
      <RegistrarCompensacionModal open={modalCompensacion} onClose={() => setModalCompensacion(false)} />
    </div>
  )
}
