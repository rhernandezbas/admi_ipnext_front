import { useAuthStore } from '@/store/authStore'
import type { UserPermisos } from '@/store/authStore'

type Modulo = keyof UserPermisos

export function usePermiso(modulo: Modulo, nivel?: 'lectura' | 'escritura'): boolean {
  const { user } = useAuthStore()
  if (!user) return false
  if (user.rol === 'admin') return true
  const p = user.permisos[modulo]
  if (nivel === 'escritura') return p === 'escritura'
  if (nivel === 'lectura') return p === 'lectura' || p === 'escritura'
  return Boolean(p)
}
