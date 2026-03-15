import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '@/services/auth.service'

export interface User {
  id: string
  nombre: string
  email: string
  rol: string
  permisos: string[]
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isHydrated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  setToken: (token: string) => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      setHydrated: () => set({ isHydrated: true }),

      setToken: (token: string) => {
        localStorage.setItem('auth_token', token)
        set({ token })
      },

      login: async (email: string, password: string) => {
        try {
          const response = await authService.login({ email, password })
          localStorage.setItem('auth_token', response.token)
          set({
            user: response.usuario,
            token: response.token,
            isAuthenticated: true,
          })
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
          localStorage.removeItem('auth_token')
          set({ user: null, token: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          localStorage.setItem('auth_token', state.token)
        }
        state?.setHydrated()
      },
    },
  ),
)
