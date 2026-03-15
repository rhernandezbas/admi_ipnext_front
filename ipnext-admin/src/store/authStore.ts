import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/auth.service'

export interface UserPermisos {
  dashboard?: boolean
  transferencias?: 'lectura' | 'escritura' | 'ninguno'
  nominas?: 'lectura' | 'escritura' | 'ninguno'
  proveedores?: 'lectura' | 'escritura' | 'ninguno'
  servicios?: 'lectura' | 'escritura' | 'ninguno'
  alquileres?: 'lectura' | 'escritura' | 'ninguno'
  tesoreria?: 'lectura' | 'escritura' | 'ninguno'
  reportes?: 'lectura' | 'escritura' | 'ninguno'
}

export interface User {
  id: string
  nombre: string
  email: string
  rol: 'admin' | 'sub-usuario'
  permisos: UserPermisos
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isHydrated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      login: async (email: string, password: string) => {
        try {
          const user = await authService.login({ email, password })
          set({ user, isAuthenticated: true })
          return true
        } catch {
          return false
        }
      },

      logout: async () => {
        try {
          await authService.logout()
        } catch {
          // ignore logout errors
        } finally {
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    },
  ),
)
