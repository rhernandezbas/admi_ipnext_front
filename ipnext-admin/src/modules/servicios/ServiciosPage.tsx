import { useState } from 'react'
import { Shield, Monitor, DollarSign, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { Tabs } from '@/components/ui/Tabs'
import { ResumenGeneral } from './components/ResumenGeneral'
import { ServiciosTable } from './components/ServiciosTable'
import { useServicios } from '@/hooks/useServicios'
import { formatARS } from '@/lib/formatters'
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

const internetCols = [
  { key: 'nombre', header: 'Servicio', render: (s: Servicio) => <span className="font-medium">{s.nombre}</span> },
  { key: 'proveedor', header: 'Proveedor', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.proveedor}</span> },
  { key: 'extra', header: 'Líneas / MB', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.extra}</span> },
  { key: 'monto', header: 'Monto Mensual', render: (s: Servicio) => <span className="font-semibold">${formatARS(s.costoMensual)}</span> },
  { key: 'vto', header: 'Vto. Factura', render: (s: Servicio) => <span className={s.estado === 'proximo_vencer' ? 'text-[#E42313]' : 'text-[#7A7A7A]'}>{s.vtoFactura ?? '—'}</span> },
]

const energiaCols = [
  { key: 'nombre', header: 'Punto / Sede', render: (s: Servicio) => <span className="font-medium">{s.nombre}</span> },
  { key: 'proveedor', header: 'Proveedor', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.proveedor}</span> },
  { key: 'extra', header: 'KW (aprox.)', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.extra}</span> },
  { key: 'monto', header: 'Monto Mensual', render: (s: Servicio) => <span className="font-semibold">${formatARS(s.costoMensual)}</span> },
  { key: 'vto', header: 'Vto. Factura', render: (s: Servicio) => <span className={s.estado === 'proximo_vencer' ? 'text-[#E42313]' : 'text-[#7A7A7A]'}>{s.vtoFactura ?? '—'}</span> },
]

const seguridadCols = [
  { key: 'nombre', header: 'Zona / Servicio', render: (s: Servicio) => <span className="font-medium">{s.nombre}</span> },
  { key: 'proveedor', header: 'Proveedor', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.proveedor}</span> },
  { key: 'extra', header: 'Cobertura', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.extra}</span> },
  { key: 'monto', header: 'Costo Mensual', render: (s: Servicio) => <span className="font-semibold">${formatARS(s.costoMensual)}</span> },
  { key: 'vigencia', header: 'Vigencia', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.vigencia ?? '—'}</span> },
]

const softwareCols = [
  { key: 'nombre', header: 'Software', render: (s: Servicio) => <span className="font-medium">{s.nombre}</span> },
  { key: 'proveedor', header: 'Proveedor', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.proveedor}</span> },
  { key: 'extra', header: 'Licencias', render: (s: Servicio) => <span className="text-[#7A7A7A]">{s.extra}</span> },
  { key: 'monto', header: 'Costo Mensual', render: (s: Servicio) => <span className="font-semibold">${formatARS(s.costoMensual)}</span> },
  { key: 'renovacion', header: 'Renovación', render: (s: Servicio) => <span className={s.estado === 'proximo_vencer' ? 'text-[#E42313]' : 'text-[#7A7A7A]'}>{s.renovacion ?? '—'}</span> },
]

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState('resumen')
  const serviciosQuery = useServicios()
  const allServicios = serviciosQuery.data ?? []

  const internet = allServicios.filter((s) => s.categoria === 'internet')
  const energia = allServicios.filter((s) => s.categoria === 'energia')
  const seguridad = allServicios.filter((s) => s.categoria === 'seguridad')
  const software = allServicios.filter((s) => s.categoria === 'software')

  const resumen = {
    gastoTotal: allServicios.reduce((a, s) => a + s.costoMensual, 0),
    serviciosActivos: allServicios.filter((s) => s.estado === 'activo').length,
    facturasProximas: allServicios.filter((s) => s.estado === 'proximo_vencer').length,
    renovacionesProximas: allServicios.filter((s) => s.renovacion !== undefined).length,
  }

  const loading = <div className="text-sm text-[#7A7A7A] py-4">Cargando…</div>
  const error = <div className="text-sm text-red-500 py-4">Error al cargar servicios</div>

  if (serviciosQuery.isLoading) {
    return (
      <div>
        <PageHeader title="Servicios & Utilities" subtitle="Control de servicios operativos recurrentes" />
        {loading}
      </div>
    )
  }

  if (serviciosQuery.isError) {
    return (
      <div>
        <PageHeader title="Servicios & Utilities" subtitle="Control de servicios operativos recurrentes" />
        {error}
      </div>
    )
  }

  return (
    <div>
      <PageHeader title="Servicios & Utilities" subtitle="Control de servicios operativos recurrentes" />
      <Card className="p-0 overflow-hidden">
        <div className="px-6 pt-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
        <div className="p-6">
          {activeTab === 'resumen' && <ResumenGeneral servicios={allServicios} resumen={resumen} />}
          {activeTab === 'internet' && <ServiciosTable servicios={internet} kpis={makeKpis(internet, 'Gasto del mes')} columns={internetCols} />}
          {activeTab === 'energia' && <ServiciosTable servicios={energia} kpis={makeKpis(energia, 'Gasto del mes')} columns={energiaCols} />}
          {activeTab === 'seguridad' && <ServiciosTable servicios={seguridad} kpis={[
            { icon: <DollarSign size={20} className="text-[#E42313]" />, label: 'Gasto del mes', value: `$${formatARS(seguridad.reduce((a, s) => a + (s.costoMensual ?? 0), 0))}`, iconBg: 'bg-red-50' },
            { icon: <CheckCircle size={20} className="text-green-600" />, label: 'Servicios activos', value: String(seguridad.filter((s) => s.estado === 'activo').length), iconBg: 'bg-green-50' },
            { icon: <Clock size={20} className="text-yellow-600" />, label: 'Facturas próximas', value: '0', iconBg: 'bg-yellow-50' },
            { icon: <Shield size={20} className="text-blue-600" />, label: 'Guardias activos', value: '4', iconBg: 'bg-blue-50' },
          ]} columns={seguridadCols} />}
          {activeTab === 'software' && <ServiciosTable servicios={software} kpis={[
            { icon: <DollarSign size={20} className="text-[#E42313]" />, label: 'Gasto del mes', value: `$${formatARS(software.reduce((a, s) => a + (s.costoMensual ?? 0), 0))}`, iconBg: 'bg-red-50' },
            { icon: <Monitor size={20} className="text-blue-600" />, label: 'Licencias activas', value: String(software.filter((s) => s.estado === 'activo').length), iconBg: 'bg-blue-50' },
            { icon: <Clock size={20} className="text-yellow-600" />, label: 'Renovaciones próximas', value: String(software.filter((s) => s.estado === 'proximo_vencer').length), iconBg: 'bg-yellow-50' },
            { icon: <AlertTriangle size={20} className="text-orange-500" />, label: 'A cancelar', value: '0', iconBg: 'bg-orange-50' },
          ]} columns={softwareCols} />}
        </div>
      </Card>
    </div>
  )
}
