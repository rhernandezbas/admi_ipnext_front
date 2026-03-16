import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  loading?: boolean
}

export function ConfirmDeleteModal({ open, onClose, onConfirm, title, description, loading = false }: Props) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-50 bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <AlertTriangle size={20} className="text-[#E42313]" />
          </div>
          <h2 className="text-base font-semibold text-[#0D0D0D]">{title}</h2>
        </div>
        <p className="text-sm text-[#7A7A7A] mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-sm bg-[#E42313] text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Eliminando...' : 'Eliminar'}
          </button>
        </div>
      </div>
    </div>
  )
}
