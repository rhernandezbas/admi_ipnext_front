import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuthStore } from '@/store/authStore'
import { usePermiso } from '../usePermiso'
import type { Usuario } from '@/types/usuario.types'

const adminUser: Usuario = {
  id: '1',
  nombre: 'Admin',
  email: 'admin@test.com',
  rol: 'admin',
  permisos: {
    dashboard: false,
    transferencias: 'ninguno',
    nominas: 'ninguno',
    proveedores: 'ninguno',
    servicios: 'ninguno',
    alquileres: 'ninguno',
    tesoreria: 'ninguno',
    reportes: 'ninguno',
  },
  avatar: null,
  activo: true,
  createdAt: '',
  updatedAt: '',
}

const subUser: Usuario = {
  ...adminUser,
  id: '2',
  nombre: 'Sub',
  rol: 'sub-usuario',
  permisos: {
    dashboard: true,
    transferencias: 'lectura',
    nominas: 'escritura',
    proveedores: 'ninguno',
    servicios: 'ninguno',
    alquileres: 'escritura',
    tesoreria: 'lectura',
    reportes: 'ninguno',
  },
}

describe('usePermiso', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAuthenticated: false })
  })

  it('returns false when no user', () => {
    const { result } = renderHook(() => usePermiso('alquileres'))
    expect(result.current).toBe(false)
  })

  it('admin always returns true', () => {
    useAuthStore.setState({ user: adminUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'escritura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with escritura can write', () => {
    useAuthStore.setState({ user: subUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'escritura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with lectura cannot write', () => {
    useAuthStore.setState({ user: subUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('transferencias', 'escritura'))
    expect(result.current).toBe(false)
  })

  it('sub-usuario with lectura can read', () => {
    useAuthStore.setState({ user: subUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('transferencias', 'lectura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with ninguno returns false for lectura', () => {
    useAuthStore.setState({ user: subUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('proveedores', 'lectura'))
    expect(result.current).toBe(false)
  })

  it('sub-usuario with escritura can also read', () => {
    useAuthStore.setState({ user: subUser, isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'lectura'))
    expect(result.current).toBe(true)
  })
})
