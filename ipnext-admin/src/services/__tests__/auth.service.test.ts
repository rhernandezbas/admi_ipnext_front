import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/lib/api'
import { authService } from '../auth.service'

describe('authService (GAP-1 y GAP-3)', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  // El backend setea una cookie httpOnly y retorna { data: { usuario } }
  // No retorna un campo "token" en el body
  it('login retorna el usuario, no un token', async () => {
    const usuario = {
      id: 'uuid-123',
      nombre: 'Admin',
      email: 'admin@ipnext.com',
      rol: 'admin',
      permisos: { dashboard: true, transferencias: 'escritura' },
    }
    mock.onPost('/auth/login').reply(200, { data: usuario })

    const result = await authService.login({ email: 'admin@ipnext.com', password: 'password' })

    // No debe tener campo token
    expect((result as unknown as Record<string, unknown>).token).toBeUndefined()
    // Debe tener los datos del usuario directamente
    expect(result).toMatchObject({ id: 'uuid-123', nombre: 'Admin', rol: 'admin' })
  })

  it('me() retorna el usuario autenticado', async () => {
    const usuario = { id: 'uuid-123', nombre: 'Admin', email: 'admin@ipnext.com', rol: 'admin', permisos: {} }
    mock.onGet('/auth/me').reply(200, { data: usuario })

    const result = await authService.me()

    expect(result).toMatchObject({ id: 'uuid-123', nombre: 'Admin' })
  })

  it('logout llama a POST /auth/logout', async () => {
    mock.onPost('/auth/logout').reply(200, { data: {} })

    await authService.logout()

    expect(mock.history.post.some(r => r.url === '/auth/logout')).toBe(true)
  })
})
