import { api } from '@/lib/api'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  nombre: string
  email: string
  rol: string
  permisos: string[]
}

export interface LoginResponse {
  token: string
  usuario: AuthUser
}

export const authService = {
  login: (payload: LoginPayload) =>
    api.post<LoginResponse>('/auth/login', payload).then((r) => r.data),

  logout: () => api.post('/auth/logout').then((r) => r.data),

  me: () => api.get<AuthUser>('/auth/me').then((r) => r.data),
}
