import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { api } from '../api'

describe('api client (GAP-1 y GAP-2)', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
    localStorage.clear()
  })

  afterEach(() => {
    mock.restore()
  })

  // GAP-1: debe usar cookie, NO Bearer token
  it('NO debe agregar header Authorization en requests', async () => {
    mock.onGet('/test').reply(200, { data: { ok: true } })

    await api.get('/test')

    const request = mock.history.get[0]
    expect(request.headers?.Authorization).toBeUndefined()
  })

  it('debe tener withCredentials: true', () => {
    expect(api.defaults.withCredentials).toBe(true)
  })

  it('NO debe leer auth_token de localStorage', async () => {
    localStorage.setItem('auth_token', 'fake-token')
    mock.onGet('/test').reply(200, { data: { ok: true } })

    await api.get('/test')

    const request = mock.history.get[0]
    expect(request.headers?.Authorization).toBeUndefined()
  })

  // GAP-2: debe desenvolver el response envelope { data: payload } → payload
  it('debe desenvolver el envelope { data: payload } automáticamente', async () => {
    const payload = [{ id: '1', label: 'KPI' }]
    mock.onGet('/dashboard/kpis').reply(200, { data: payload })

    const response = await api.get('/dashboard/kpis')

    expect(response.data).toEqual(payload)
  })

  it('debe desenvolver envelope para objetos simples', async () => {
    const user = { id: 'abc', nombre: 'Admin', email: 'admin@test.com' }
    mock.onGet('/auth/me').reply(200, { data: user })

    const response = await api.get('/auth/me')

    expect(response.data).toEqual(user)
  })

  it('si la response NO tiene envelope { data }, la retorna tal cual', async () => {
    const plain = { token: 'xyz' }
    mock.onGet('/other').reply(200, plain)

    const response = await api.get('/other')

    expect(response.data).toEqual(plain)
  })
})
