import { api } from '@/lib/api'
import type { User } from '@/store/authStore'

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {
  login: (payload: LoginPayload) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    api.post('/auth/login', payload).then((r) => ((r.data as any)?.usuario ?? r.data) as User),

  logout: () => api.post('/auth/logout').then((r) => r.data),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  me: () => api.get('/auth/me').then((r) => ((r.data as any)?.usuario ?? r.data) as User),
}
