import { Avatar } from '@/components/ui/Avatar'
import type { Usuario, PermisoNivel } from '@/types/usuario.types'

const moduloLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  transferencias: 'Transferencias',
  nominas: 'Nóminas',
  proveedores: 'Proveedores',
  servicios: 'Servicios',
  alquileres: 'Alquileres',
  tesoreria: 'Tesorería',
  reportes: 'Reportes',
}

interface Props {
  usuarios: Usuario[]
  onEditar: (u: Usuario) => void
  onDesactivar: (u: Usuario) => void
  onCambiarClave: (u: Usuario) => void
}

export function UsuariosTable({ usuarios, onEditar, onDesactivar, onCambiarClave }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#E8E8E8] text-left text-[#7A7A7A]">
            <th className="pb-3 pr-4">Usuario</th>
            <th className="pb-3 pr-4">Email</th>
            <th className="pb-3 pr-4">Estado</th>
            <th className="pb-3 pr-4">Permisos</th>
            <th className="pb-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => {
            const permisosActivos = Object.entries(u.Permisos).filter(([k, v]) => {
              if (k === 'dashboard') return Boolean(v)
              return (v as PermisoNivel) !== 'ninguno'
            })

            return (
              <tr key={u.ID} className="border-b border-[#E8E8E8]">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={u.Nombre} size="sm" />
                    <span className="font-medium text-[#0D0D0D]">{u.Nombre}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-[#7A7A7A]">{u.Email}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.Activo
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {u.Activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-1">
                    {permisosActivos.map(([k]) => (
                      <span
                        key={k}
                        className="inline-flex items-center rounded px-1.5 py-0.5 text-xs bg-blue-50 text-blue-600"
                      >
                        {moduloLabels[k] ?? k}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditar(u)}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onCambiarClave(u)}
                      className="text-xs text-gray-500 hover:underline"
                    >
                      Clave
                    </button>
                    <button
                      onClick={() => onDesactivar(u)}
                      className={`text-xs hover:underline ${u.Activo ? 'text-red-500' : 'text-green-600'}`}
                    >
                      {u.Activo ? 'Desactivar' : 'Reactivar'}
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
