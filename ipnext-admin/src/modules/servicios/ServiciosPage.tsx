import { useState } from 'react'
import { Plus, Shield, Monitor, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Tabs } from '@/components/ui/Tabs'
import { ConfirmDeleteModal } from '@/components/ui/ConfirmDeleteModal'
import { ResumenGeneral } from './components/ResumenGeneral'
import { ServiciosTable } from './components/ServiciosTable'
import { NuevoServicioModal } from './components/NuevoServicioModal'
import { EditarServicioModal } from './components/EditarServicioModal'
import { useServicios } from '@/hooks/useServicios'
import { usePermiso } from '@/hooks/usePermiso'
import { formatARS } from '@/lib/formatters'
import { api } from '@/lib/api'
import { toast } from '@/lib/toast'
import type { Servicio } from '@/types/servicio.types'

const tabs = [
  { id: 'resumen', label: 'Resumen General' },
  { id: 'internet', label: 'Internet & Telefonía' },
  { id: 'energia', label: 'Energía' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'software', label: 'Software' },
]

function makeKpis(servicios: Servicio[], gastoLabel: string) {
  const total = servicios.reduce((a, s) => a + s.costoMensual, 0)
  const activos = servicios.filter((s) => s.estado === 'activo').length
  const proximos = servicios.filter((s) => s.estado === 'proximo_vencer').length
  return [
    { icon: <DollarSign size={20} className="text-[#E42313]" />, label: gastoLabel, value: `$${formatARS(total)}`, iconBg: 'bg-red-50' },
    { icon: <CheckCircle size={20} className="text-green-600" />, label: 'Activos', value: String(activos), iconBg: 'bg-green-50' },
    { icon: <Clock size={20} className="text-yellow-600" />, label: 'Facturas próximas', value: String(proximos), iconBg: 'bg-yellow-50' },
    { icon: <AlertTriangle size={20} className="text-orange-500" />, label: 'Alertas', value: String(proximos), iconBg: 'bg-orange-50' },
  ]
}

const baseCols = [
  { key: 'nombre', header: 'Servicio', render: (s: Servicio) => <span className="font-medium">{s.nombre}</span> },
  { key: 'proveedor', header: 'Proveedor', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.proveedor}</span> },
  { key: 'monto', header: 'Costo Mensual', render: (s: Servicio) => <span className="font-semibold">${formatARS(s.costoMensual)}</span> },
  { key: 'vto', header: 'Vto. Factura', render: (s: Servicio) => <span className={s.estado === 'proximo_vencer' ? 'text-[#E42313]' : 'text-[#7A7A7A]'}>{s.vtoFactura ?? '—'}</span> },
  { key: 'renovacion', header: 'Renovación', render: (s: Servicio) => <span className={s.estado === 'proximo_vencer' ? 'text-[#E42313]' : 'text-[#7A7A7A]'}>{s.renovacion ?? '—'}</span> },
]

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState('resumen')
  const [modalNuevo, setModalNuevo] = useState(false)
  const [servicioEditar, setServicioEditar] = useState<Servicio | null>(null)
  const [servicioEliminar, setServicioEliminar] = useState<Servicio | null>(null)
  const puedeEscribir = usePermiso('servicios', 'escritura')
  const puedeAdmin = usePermiso('servicios', 'admin_only')
  const serviciosQuery = useServicios()
  const allServicios = serviciosQuery.data ?? []
  const qc = useQueryClient()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/servicios/item/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['servicios'] }); toast.success('Servicio eliminado'); setServicioEliminar(null) },
    onError: () => toast.error('Error al eliminar servicio'),
  })

  // Filter by tipo — also group hosting/otro under internet for display
  const internet = allServicios.filter((s) => ['internet', 'hosting', 'otro'].includes(s.tipo))
  const energia = allServicios.filter((s) => s.tipo === 'energia')
  const seguridad = allServicios.filter((s) => s.tipo === 'seguridad')
  const software = allServicios.filter((s) => s.tipo === 'software')

  const resumen = {
    gastoTotal: allServicios.reduce((a, s) => a + s.costoMensual, 0),
    serviciosActivos: allServicios.filter((s) => s.estado === 'activo').length,
    facturasProximas: allServicios.filter((s) => s.estado === 'proximo_vencer').length,
    renovacionesProximas: allServicios.filter((s) => s.renovacion != null).length,
  }

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const errorEl = <div className="text-sm text-red-500 py-4">Error al cargar servicios</div>

  return (
    <div>
      <PageHeader
        title="Servicios & Utilities"
        subtitle="Control de servicios operativos recurrentes"
        actions={
          puedeEscribir ? (
            <Button onClick={() => setModalNuevo(true)}><Plus size={16} />Nuevo Servicio</Button>
          ) : null
        }
      />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {serviciosQuery.isLoading ? loading : serviciosQuery.isError ? errorEl : (
            <>
              {activeTab === 'resumen' && <ResumenGeneral servicios={allServicios} resumen={resumen} />}
              {activeTab === 'internet' && <ServiciosTable servicios={internet} kpis={makeKpis(internet, 'Gasto del mes')} columns={baseCols} onEditar={puedeEscribir ? setServicioEditar : undefined} onEliminar={puedeAdmin ? setServicioEliminar : undefined} />}
              {activeTab === 'energia' && <ServiciosTable servicios={energia} kpis={makeKpis(energia, 'Gasto del mes')} columns={baseCols} onEditar={puedeEscribir ? setServicioEditar : undefined} onEliminar={puedeAdmin ? setServicioEliminar : undefined} />}
              {activeTab === 'seguridad' && <ServiciosTable onEditar={puedeEscribir ? setServicioEditar : undefined} onEliminar={puedeAdmin ? setServicioEliminar : undefined} servicios={seguridad} kpis={[
                { icon: <DollarSign size={20} className="text-[#E42313]" />, label: 'Gasto del mes', value: `$${formatARS(seguridad.reduce((a, s) => a + s.costoMensual, 0))}`, iconBg: 'bg-red-50' },
                { icon: <CheckCircle size={20} className="text-green-600" />, label: 'Servicios activos', value: String(seguridad.filter((s) => s.estado === 'activo').length), iconBg: 'bg-green-50' },
                { icon: <Clock size={20} className="text-yellow-600" />, label: 'Facturas próximas', value: '0', iconBg: 'bg-yellow-50' },
                { icon: <Shield size={20} className="text-blue-600" />, label: 'Guardias activos', value: '4', iconBg: 'bg-blue-50' },
              ]} columns={baseCols} />}
              {activeTab === 'software' && <ServiciosTable onEditar={puedeEscribir ? setServicioEditar : undefined} onEliminar={puedeAdmin ? setServicioEliminar : undefined} servicios={software} kpis={[
                { icon: <DollarSign size={20} className="text-[#E42313]" />, label: 'Gasto del mes', value: `$${formatARS(software.reduce((a, s) => a + s.costoMensual, 0))}`, iconBg: 'bg-red-50' },
                { icon: <Monitor size={20} className="text-blue-600" />, label: 'Licencias activas', value: String(software.filter((s) => s.estado === 'activo').length), iconBg: 'bg-blue-50' },
                { icon: <Clock size={20} className="text-yellow-600" />, label: 'Renovaciones próximas', value: String(software.filter((s) => s.estado === 'proximo_vencer').length), iconBg: 'bg-yellow-50' },
                { icon: <AlertTriangle size={20} className="text-orange-500" />, label: 'A cancelar', value: '0', iconBg: 'bg-orange-50' },
              ]} columns={baseCols} />}
            </>
          )}
        </div>
      </Card>

      <NuevoServicioModal open={modalNuevo} onClose={() => setModalNuevo(false)} />
      <EditarServicioModal open={!!servicioEditar} onClose={() => setServicioEditar(null)} servicio={servicioEditar} />
      <ConfirmDeleteModal
        open={!!servicioEliminar}
        onClose={() => setServicioEliminar(null)}
        onConfirm={() => servicioEliminar && deleteMutation.mutate(servicioEliminar.id)}
        title="Eliminar Servicio"
        description={`¿Eliminar "${servicioEliminar?.nombre}"? Esta acción no se puede deshacer.`}
        loading={deleteMutation.isPending}
      />
    </div>
  )
}
