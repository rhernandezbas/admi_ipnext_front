/**
 * FASE 6.1 — Tests de integración del flujo de autenticación
 * Simulan el contrato completo frontend↔backend con mocks
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { authService } from '../auth.service'

describe('Flujo de autenticación — integración (FASE 6.1)', () => {
  let mock: MockAdapter

  const usuarioAdmin = {
    id: 'uuid-admin-1',
    nombre: 'Admin IPNEXT',
    email: 'admin@ipnext.com',
    rol: 'admin' as const,
    permisos: {
      dashboard: true,
      transferencias: 'escritura' as const,
      nominas: 'escritura' as const,
    },
  }

  beforeEach(() => {
    mock = new MockAdapter(api)
    localStorage.clear()
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  afterEach(() => {
    mock.restore()
  })

  // 1. Login → backend setea cookie → frontend guarda usuario
  it('login: backend retorna usuario (sin token en body) y el store queda autenticado', async () => {
    mock.onPost('/auth/login').reply(200, { data: usuarioAdmin })

    const success = await useAuthStore.getState().login('admin@ipnext.com', 'password')

    expect(success).toBe(true)
    expect(useAuthStore.getState().isAuthenticated).toBe(true)
    expect(useAuthStore.getState().user?.id).toBe('uuid-admin-1')
    expect(useAuthStore.getState().user?.rol).toBe('admin')
    expect(useAuthStore.getState().user?.permisos.dashboard).toBe(true)
    // NO debe haber token en localStorage
    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  // 2. Login fallido → store queda limpio
  it('login: credenciales incorrectas → retorna false y store no cambia', async () => {
    mock.onPost('/auth/login').reply(401, { error: 'UNAUTHORIZED' })

    const success = await useAuthStore.getState().login('wrong@email.com', 'wrongpass')

    expect(success).toBe(false)
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(useAuthStore.getState().user).toBeNull()
  })

  // 3. GET /auth/me → retorna usuario autenticado
  it('me(): retorna el usuario autenticado desde el backend', async () => {
    mock.onGet('/auth/me').reply(200, { data: usuarioAdmin })

    const user = await authService.me()

    expect(user.id).toBe('uuid-admin-1')
    expect(user.nombre).toBe('Admin IPNEXT')
    expect(user.permisos.transferencias).toBe('escritura')
  })

  // 4. Requests autenticados NO envían Authorization header (solo cookie)
  it('requests POST no incluyen header Authorization', async () => {
    mock.onPost('/auth/login').reply(200, { data: usuarioAdmin })

    await authService.login({ email: 'admin@ipnext.com', password: 'password' })

    const request = mock.history.post[0]
    expect(request.headers?.Authorization).toBeUndefined()
  })

  it('api tiene withCredentials true (browser envía cookie automáticamente)', () => {
    expect(api.defaults.withCredentials).toBe(true)
  })

  // 5. Logout → store limpio
  it('logout: limpia el store de autenticación', async () => {
    mock.onPost('/auth/logout').reply(200, { data: {} })
    useAuthStore.setState({ user: usuarioAdmin, isAuthenticated: true })

    await useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  // 6. Logout falla en backend → store se limpia igual (finally)
  it('logout: aunque falle el backend, el store queda limpio', async () => {
    mock.onPost('/auth/logout').reply(500)
    useAuthStore.setState({ user: usuarioAdmin, isAuthenticated: true })

    await useAuthStore.getState().logout()

    expect(useAuthStore.getState().user).toBeNull()
    expect(useAuthStore.getState().isAuthenticated).toBe(false)
  })
})
