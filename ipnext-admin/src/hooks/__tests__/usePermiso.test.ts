import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuthStore } from '@/store/authStore'
import { usePermiso } from '../usePermiso'
import type { Usuario } from '@/types/usuario.types'

const adminUser: Usuario = {
  ID: '1',
  Nombre: 'Admin',
  Email: 'admin@test.com',
  Rol: 'admin',
  Permisos: {
    dashboard: false,
    transferencias: 'ninguno',
    nominas: 'ninguno',
    proveedores: 'ninguno',
    servicios: 'ninguno',
    alquileres: 'ninguno',
    tesoreria: 'ninguno',
    reportes: 'ninguno',
  },
  Avatar: null,
  Activo: true,
  CreatedAt: '',
  UpdatedAt: '',
}

const subUser: Usuario = {
  ...adminUser,
  ID: '2',
  Nombre: 'Sub',
  Rol: 'sub-usuario',
  Permisos: {
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

// Map Usuario (PascalCase backend) to User shape (camelCase) used by authStore
function toUser(u: Usuario) {
  return {
    id: u.ID,
    nombre: u.Nombre,
    email: u.Email,
    rol: u.Rol,
    permisos: {
      dashboard: u.Permisos.dashboard,
      transferencias: u.Permisos.transferencias,
      nominas: u.Permisos.nominas,
      proveedores: u.Permisos.proveedores,
      servicios: u.Permisos.servicios,
      alquileres: u.Permisos.alquileres,
      tesoreria: u.Permisos.tesoreria,
      reportes: u.Permisos.reportes,
    },
  }
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
    useAuthStore.setState({ user: toUser(adminUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'escritura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with escritura can write', () => {
    useAuthStore.setState({ user: toUser(subUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'escritura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with lectura cannot write', () => {
    useAuthStore.setState({ user: toUser(subUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('transferencias', 'escritura'))
    expect(result.current).toBe(false)
  })

  it('sub-usuario with lectura can read', () => {
    useAuthStore.setState({ user: toUser(subUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('transferencias', 'lectura'))
    expect(result.current).toBe(true)
  })

  it('sub-usuario with ninguno returns false for lectura', () => {
    useAuthStore.setState({ user: toUser(subUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('proveedores', 'lectura'))
    expect(result.current).toBe(false)
  })

  it('sub-usuario with escritura can also read', () => {
    useAuthStore.setState({ user: toUser(subUser), isAuthenticated: true })
    const { result } = renderHook(() => usePermiso('alquileres', 'lectura'))
    expect(result.current).toBe(true)
  })
})
