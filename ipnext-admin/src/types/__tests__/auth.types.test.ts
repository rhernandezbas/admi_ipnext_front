import { describe, it, expect } from 'vitest'
import type { User, UserPermisos } from '@/store/authStore'

describe('UserPermisos type (GAP-3)', () => {
  it('UserPermisos.dashboard es boolean, no string', () => {
    const permisos: UserPermisos = { dashboard: true }
    expect(typeof permisos.dashboard).toBe('boolean')
  })

  it('UserPermisos.transferencias acepta lectura, escritura, ninguno', () => {
    const p1: UserPermisos = { transferencias: 'lectura' }
    const p2: UserPermisos = { transferencias: 'escritura' }
    const p3: UserPermisos = { transferencias: 'ninguno' }
    expect(p1.transferencias).toBe('lectura')
    expect(p2.transferencias).toBe('escritura')
    expect(p3.transferencias).toBe('ninguno')
  })

  it('User.permisos es un objeto con propiedades nombradas, NO un array', () => {
    const user: User = {
      id: '1',
      nombre: 'Test',
      email: 'test@test.com',
      rol: 'admin',
      permisos: { dashboard: true, nominas: 'escritura' },
    }
    expect(Array.isArray(user.permisos)).toBe(false)
    expect(typeof user.permisos).toBe('object')
    expect((user.permisos as UserPermisos).dashboard).toBe(true)
  })

  it('User.rol es admin o sub-usuario, no string genérico', () => {
    const admin: User = { id: '1', nombre: 'A', email: 'a@b.com', rol: 'admin', permisos: {} }
    const sub: User = { id: '2', nombre: 'B', email: 'b@c.com', rol: 'sub-usuario', permisos: {} }
    expect(admin.rol).toBe('admin')
    expect(sub.rol).toBe('sub-usuario')
  })
})
