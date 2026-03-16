import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Users, Building2,
  Zap, Home, Landmark, BarChart3, LogOut, Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { useState } from 'react'
import { CambiarClaveModal } from '@/modules/usuarios/components/CambiarClaveModal'

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transferencias', label: 'Transferencias', icon: ArrowLeftRight },
  { path: '/nominas', label: 'Nóminas & RRHH', icon: Users },
  { path: '/proveedores', label: 'Proveedores', icon: Building2 },
  { path: '/servicios', label: 'Servicios', icon: Zap },
  { path: '/alquileres', label: 'Alquileres', icon: Home },
  { path: '/tesoreria', label: 'Tesorería', icon: Landmark },
  { path: '/reportes', label: 'Reportes', icon: BarChart3 },
]

export function Sidebar() {
  const { user, logout } = useAuthStore()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [cambiarClave, setCambiarClave] = useState(false)

  const isAdmin = user?.rol === 'admin'

  const sidebarContent = (
    <aside
      className={`h-full bg-white border-r border-[#E8E8E8] flex flex-col transition-all duration-200 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo + toggle */}
      <div className="flex items-center gap-3 px-3 py-5 border-b border-[#E8E8E8]">
        <div className="w-8 h-8 bg-[#E42313] rounded-lg flex-shrink-0" />
        {!sidebarCollapsed && (
          <span className="font-semibold text-[18px] text-[#0D0D0D]" style={{ fontFamily: 'Space Grotesk' }}>IPNEXT</span>
        )}
        <button
          className={`${sidebarCollapsed ? 'mx-auto' : 'ml-auto'} text-[#7A7A7A] hover:text-[#0D0D0D] lg:flex hidden`}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
        <button className="ml-auto lg:hidden text-[#7A7A7A]" onClick={() => setMobileOpen(false)}>
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={() => setMobileOpen(false)}
            title={sidebarCollapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#E42313] text-white'
                  : 'text-[#7A7A7A] hover:bg-[#FAFAFA] hover:text-[#0D0D0D]'
              }`
            }
          >
            <Icon size={18} />
            {!sidebarCollapsed && label}
          </NavLink>
        ))}

        {/* Usuarios — solo admin */}
        {isAdmin && (
          <NavLink
            to="/usuarios"
            title={sidebarCollapsed ? 'Usuarios' : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-[#E42313] text-white'
                  : 'text-[#7A7A7A] hover:bg-[#FAFAFA] hover:text-[#0D0D0D]'
              }`
            }
          >
            <Users size={18} />
            {!sidebarCollapsed && 'Usuarios'}
          </NavLink>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#E8E8E8]">
        <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          <Avatar name={user?.nombre ?? 'U'} size="sm" />
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#0D0D0D] truncate">{user?.nombre}</p>
              <button
                onClick={() => setCambiarClave(true)}
                className="text-xs text-[#7A7A7A] hover:text-[#E42313] text-left"
              >
                Cambiar contraseña
              </button>
            </div>
          )}
          <button onClick={logout} className="text-[#7A7A7A] hover:text-[#E42313] cursor-pointer" title="Cerrar sesión">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-[#E8E8E8] p-2 rounded-lg shadow-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={20} className="text-[#0D0D0D]" />
      </button>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex flex-shrink-0 min-h-screen transition-all duration-200 overflow-hidden ${sidebarCollapsed ? 'w-16' : 'w-60'}`}>
        {sidebarContent}
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <div className="relative z-50 flex-shrink-0 h-full">
            {sidebarContent}
          </div>
        </div>
      )}

      {user && (
        <CambiarClaveModal
          open={cambiarClave}
          onClose={() => setCambiarClave(false)}
          usuarioId={user.id}
          nombre={user.nombre}
        />
      )}
    </>
  )
}
