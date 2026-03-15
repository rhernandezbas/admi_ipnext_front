import { api } from '@/lib/api'
import type { User } from '@/store/authStore'

export interface LoginPayload {
  email: string
  password: string
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<User>('/auth/login', payload).then((r) => r.data),

  logout: () => api.post('/auth/logout').then((r) => r.data),

  me: () => api.get<User>('/auth/me').then((r) => r.data),
}
