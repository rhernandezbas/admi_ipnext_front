import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'

interface Props {
  children: ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isHydrated } = useAuthStore()
  if (!isHydrated) return null
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
