import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'

describe('authStore (GAP-1)', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
    localStorage.clear()
    // Reset store state
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  afterEach(() => {
    mock.restore()
  })

  it('el store NO tiene campo token', () => {
    const state = useAuthStore.getState()
    expect((state as unknown as Record<string, unknown>).token).toBeUndefined()
  })

  it('después de login, NO guarda auth_token en localStorage', async () => {
    const usuario = {
      id: 'uuid-1',
      nombre: 'Admin',
      email: 'admin@ipnext.com',
      rol: 'admin' as const,
      permisos: { dashboard: true },
    }
    mock.onPost('/auth/login').reply(200, { data: usuario })

    await useAuthStore.getState().login('admin@ipnext.com', 'password')

    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  it('después de login, el store tiene user y isAuthenticated = true', async () => {
    const usuario = {
      id: 'uuid-1',
      nombre: 'Admin',
      email: 'admin@ipnext.com',
      rol: 'admin' as const,
      permisos: { dashboard: true },
    }
    mock.onPost('/auth/login').reply(200, { data: usuario })

    const success = await useAuthStore.getState().login('admin@ipnext.com', 'password')

    expect(success).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.nombre).toBe('Admin')
  })

  it('después de logout, user es null e isAuthenticated = false', async () => {
    mock.onPost('/auth/logout').reply(200, { data: {} })
    // Set authenticated state first
    useAuthStore.setState({ user: { id: '1', nombre: 'Admin', email: 'a@b.com', rol: 'admin', permisos: {} }, isAuthenticated: true })

    await useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
