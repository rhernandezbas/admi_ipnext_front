import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/lib/toast'
import { Modal } from '@/components/ui/Modal'
import { usuariosService } from '@/services/usuarios.service'
import type { Usuario, Permisos, PermisoNivel } from '@/types/usuario.types'

const modulos: { key: keyof Omit<Permisos, 'dashboard'>; label: string }[] = [
  { key: 'transferencias', label: 'Transferencias' },
  { key: 'nominas', label: 'Nóminas' },
  { key: 'proveedores', label: 'Proveedores' },
  { key: 'servicios', label: 'Servicios' },
  { key: 'alquileres', label: 'Alquileres' },
  { key: 'tesoreria', label: 'Tesorería' },
  { key: 'reportes', label: 'Reportes' },
]

interface Props {
  open: boolean
  onClose: () => void
  usuario: Usuario | null
}

export function EditarUsuarioModal({ open, onClose, usuario }: Props) {
  const qc = useQueryClient()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [activo, setActivo] = useState(true)
  const [permisos, setPermisos] = useState<Permisos>(usuario?.Permisos ?? {
    dashboard: false, transferencias: 'ninguno', nominas: 'ninguno',
    proveedores: 'ninguno', servicios: 'ninguno', alquileres: 'ninguno',
    tesoreria: 'ninguno', reportes: 'ninguno',
  })

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.Nombre)
      setEmail(usuario.Email)
      setActivo(usuario.Activo)
      setPermisos(usuario.Permisos)
    }
  }, [usuario])

  const mutation = useMutation({
    mutationFn: () => usuariosService.update(usuario!.ID, { nombre, email, activo, permisos }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuario actualizado')
      onClose()
    },
    onError: () => toast.error('Error al actualizar usuario'),
  })

  return (
    <Modal open={open} onClose={onClose} title="Editar Usuario" size="lg">
      <form onSubmit={(e) => { e.preventDefault(); mutation.mutate() }} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="activo" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
          <label htmlFor="activo" className="text-sm text-gray-700">Usuario activo</label>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Permisos</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Dashboard</span>
              <input type="checkbox" checked={permisos.dashboard} onChange={(e) => setPermisos({ ...permisos, dashboard: e.target.checked })} />
            </div>
            {modulos.map(({ key, label }) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <select
                  value={permisos[key]}
                  onChange={(e) => setPermisos({ ...permisos, [key]: e.target.value as PermisoNivel })}
                  className="border border-gray-200 rounded px-2 py-0.5 text-xs"
                >
                  <option value="ninguno">Ninguno</option>
                  <option value="lectura">Lectura</option>
                  <option value="escritura">Escritura</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
