import { create } from 'zustand'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'viewer'
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin IPNEXT', email: 'admin@ipnext.com', role: 'admin' },
  { id: '2', name: 'Consultor', email: 'viewer@ipnext.com', role: 'viewer' },
]

export const useAuthStore = create<AuthState>((set) => ({
  user: MOCK_USERS[0], // Auto-login for dev
  isAuthenticated: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (email: string, _password: string) => {
    const user = MOCK_USERS.find((u) => u.email === email)
    if (user) {
      set({ user, isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}))
