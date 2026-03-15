import { Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { ProtectedRoute } from '@/components/layout/ProtectedRoute'
import DashboardPage from '@/modules/dashboard/DashboardPage'
import TransferenciasPage from '@/modules/transferencias/TransferenciasPage'
import NominasPage from '@/modules/nominas/NominasPage'
import ProveedoresPage from '@/modules/proveedores/ProveedoresPage'
import ServiciosPage from '@/modules/servicios/ServiciosPage'
import AlquileresPage from '@/modules/alquileres/AlquileresPage'
import TesoreriaPage from '@/modules/tesoreria/TesoreriaPage'
import ReportesPage from '@/modules/reportes/ReportesPage'
import LoginPage from '@/modules/auth/LoginPage'

const routesMeta: Record<string, string> = {
  '/': 'Dashboard',
  '/transferencias': 'Transferencias',
  '/nominas': 'Nóminas & RRHH',
  '/proveedores': 'Proveedores',
  '/servicios': 'Servicios & Utilities',
  '/alquileres': 'Alquileres & Inmuebles',
  '/tesoreria': 'Tesorería & Bancos',
  '/reportes': 'Reportes & Analytics',
}

function WithLayout({ path, children }: { path: string; children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <PageLayout title={routesMeta[path] ?? ''}>{children}</PageLayout>
    </ProtectedRoute>
  )
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<WithLayout path="/"><DashboardPage /></WithLayout>} />
      <Route path="/transferencias" element={<WithLayout path="/transferencias"><TransferenciasPage /></WithLayout>} />
      <Route path="/nominas" element={<WithLayout path="/nominas"><NominasPage /></WithLayout>} />
      <Route path="/proveedores" element={<WithLayout path="/proveedores"><ProveedoresPage /></WithLayout>} />
      <Route path="/servicios" element={<WithLayout path="/servicios"><ServiciosPage /></WithLayout>} />
      <Route path="/alquileres" element={<WithLayout path="/alquileres"><AlquileresPage /></WithLayout>} />
      <Route path="/tesoreria" element={<WithLayout path="/tesoreria"><TesoreriaPage /></WithLayout>} />
      <Route path="/reportes" element={<WithLayout path="/reportes"><ReportesPage /></WithLayout>} />
    </Routes>
  )
}
