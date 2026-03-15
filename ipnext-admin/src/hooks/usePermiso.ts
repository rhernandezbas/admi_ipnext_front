import { useAuthStore } from '@/store/authStore'

export function usePermiso() {
  const { user } = useAuthStore()
  const isAdmin = user?.role === 'admin'

  return {
    canWrite: isAdmin,
    canRead: true,
    canApprove: isAdmin,
    isAdmin,
  }
}
