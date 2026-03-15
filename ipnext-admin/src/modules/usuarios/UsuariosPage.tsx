import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from '@/lib/toast'
import { usuariosService } from '@/services/usuarios.service'
import { UsuariosTable } from './components/UsuariosTable'
import { NuevoUsuarioModal } from './components/NuevoUsuarioModal'
import { EditarUsuarioModal } from './components/EditarUsuarioModal'
import { CambiarClaveModal } from './components/CambiarClaveModal'
import type { Usuario } from '@/types/usuario.types'

export function UsuariosPage() {
  const qc = useQueryClient()
  const [modalCrear, setModalCrear] = useState(false)
  const [usuarioEditar, setUsuarioEditar] = useState<Usuario | null>(null)
  const [usuarioClave, setUsuarioClave] = useState<Usuario | null>(null)

  const { data: usuarios = [], isLoading } = useQuery({
    queryKey: ['usuarios'],
    queryFn: usuariosService.getAll,
  })

  const toggleActivo = useMutation({
    mutationFn: (u: Usuario) => usuariosService.update(u.ID, { activo: !u.Activo }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['usuarios'] })
      toast.success('Usuario actualizado')
    },
    onError: () => toast.error('Error al actualizar usuario'),
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#0D0D0D]">Gestión de Usuarios</h1>
        <button
          onClick={() => setModalCrear(true)}
          className="px-4 py-2 bg-[#E42313] text-white text-sm font-medium rounded-lg hover:bg-red-700"
        >
          Nuevo Usuario
        </button>
      </div>

      {isLoading ? (
        <p className="text-sm text-[#7A7A7A]">Cargando usuarios...</p>
      ) : (
        <UsuariosTable
          usuarios={usuarios}
          onEditar={setUsuarioEditar}
          onDesactivar={(u) => toggleActivo.mutate(u)}
          onCambiarClave={setUsuarioClave}
        />
      )}

      <NuevoUsuarioModal open={modalCrear} onClose={() => setModalCrear(false)} />
      <EditarUsuarioModal
        open={usuarioEditar !== null}
        onClose={() => setUsuarioEditar(null)}
        usuario={usuarioEditar}
      />
      {usuarioClave && (
        <CambiarClaveModal
          open={true}
          onClose={() => setUsuarioClave(null)}
          usuarioId={usuarioClave.ID}
          nombre={usuarioClave.Nombre}
        />
      )}
    </div>
  )
}
