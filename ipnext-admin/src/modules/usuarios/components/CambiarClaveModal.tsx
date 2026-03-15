import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from '@/lib/toast'
import { Modal } from '@/components/ui/Modal'
import { usuariosService } from '@/services/usuarios.service'

interface Props {
  open: boolean
  onClose: () => void
  usuarioId: string
  nombre?: string
}

export function CambiarClaveModal({ open, onClose, usuarioId, nombre }: Props) {
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')

  const mutation = useMutation({
    mutationFn: () => usuariosService.cambiarClave(usuarioId, password),
    onSuccess: () => {
      toast.success('Contraseña actualizada')
      setPassword('')
      setConfirmar('')
      onClose()
    },
    onError: () => toast.error('Error al cambiar contraseña'),
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Mínimo 8 caracteres'); return }
    if (password !== confirmar) { setError('Las contraseñas no coinciden'); return }
    setError('')
    mutation.mutate()
  }

  return (
    <Modal open={open} onClose={onClose} title={nombre ? `Cambiar clave — ${nombre}` : 'Cambiar contraseña'} size="sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña *</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña *</label>
          <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Cancelar</button>
          <button type="submit" disabled={mutation.isPending} className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
            {mutation.isPending ? 'Guardando...' : 'Cambiar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
