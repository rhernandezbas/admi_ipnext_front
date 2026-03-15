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
import { useAlquileres, useContratosAlquiler, usePagosAlquiler, useVencimientos } from '@/hooks/useAlquileres'
import { RegistrarPagoModal } from './components/RegistrarPagoModal'
import { NuevoInmuebleModal } from './components/NuevoInmuebleModal'
import { usePermiso } from '@/hooks/usePermiso'

const tabs = [
  { id: 'inmuebles', label: 'Inmuebles' },
  { id: 'contratos', label: 'Contratos de Alquiler' },
  { id: 'pagos', label: 'Pagos & Recibos' },
  { id: 'vencimientos', label: 'Vencimientos' },
]

export default function AlquileresPage() {
  const [activeTab, setActiveTab] = useState('inmuebles')
  const [modalPago, setModalPago] = useState(false)
  const [modalInmueble, setModalInmueble] = useState(false)
  const puedeEscribir = usePermiso('alquileres', 'escritura')
  const inmueblesQuery = useAlquileres()
  const contratosQuery = useContratosAlquiler()
  const pagosQuery = usePagosAlquiler()
  const vencimientosQuery = useVencimientos()

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar datos</div>

  return (
    <div>
      <PageHeader
        title="Alquileres & Inmuebles"
        subtitle="Gestión de inmuebles y contratos de alquiler"
        actions={
          <>
            {puedeEscribir && <Button variant="secondary" onClick={() => setModalPago(true)}>Registrar Pago</Button>}
            {puedeEscribir && <Button onClick={() => setModalInmueble(true)}><Plus size={16} />Nuevo Inmueble</Button>}
          </>
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'inmuebles' && (
            inmueblesQuery.isLoading ? loading :
            inmueblesQuery.isError ? error :
            <InmueblesTable inmuebles={inmueblesQuery.data ?? []} />
          )}
          {activeTab === 'contratos' && (
            contratosQuery.isLoading ? loading :
            contratosQuery.isError ? error :
            <ContratosAlquilerTable contratos={contratosQuery.data ?? []} />
          )}
          {activeTab === 'pagos' && (
            pagosQuery.isLoading ? loading :
            pagosQuery.isError ? error :
            <PagosRecibosTable pagos={pagosQuery.data ?? []} />
          )}
          {activeTab === 'vencimientos' && (
            vencimientosQuery.isLoading ? loading :
            vencimientosQuery.isError ? error :
            <VencimientosTable vencimientos={vencimientosQuery.data ?? []} />
          )}
        </div>
      </Card>

      <RegistrarPagoModal
        open={modalPago}
        onClose={() => setModalPago(false)}
        inmuebles={inmueblesQuery.data ?? []}
      />
      <NuevoInmuebleModal open={modalInmueble} onClose={() => setModalInmueble(false)} />
    </div>
  )
}
