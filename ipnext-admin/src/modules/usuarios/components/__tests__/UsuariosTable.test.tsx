import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UsuariosTable } from '../UsuariosTable'
import type { Usuario } from '@/types/usuario.types'

const usuarios: Usuario[] = [
  {
    ID: '1',
    Nombre: 'Juan Pérez',
    Email: 'juan@test.com',
    Rol: 'sub-usuario',
    Permisos: {
      dashboard: true,
      transferencias: 'escritura',
      nominas: 'lectura',
      proveedores: 'ninguno',
      servicios: 'ninguno',
      alquileres: 'escritura',
      tesoreria: 'ninguno',
      reportes: 'ninguno',
    },
    Avatar: null,
    Activo: true,
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedAt: '2024-01-01T00:00:00Z',
  },
  {
    ID: '2',
    Nombre: 'Ana López',
    Email: 'ana@test.com',
    Rol: 'sub-usuario',
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
    Activo: false,
    CreatedAt: '2024-01-01T00:00:00Z',
    UpdatedAt: '2024-01-01T00:00:00Z',
  },
]

describe('UsuariosTable', () => {
  it('renders list of users', () => {
    render(
      <UsuariosTable
        usuarios={usuarios}
        onEditar={vi.fn()}
        onDesactivar={vi.fn()}
        onCambiarClave={vi.fn()}
      />,
    )
    expect(screen.getByText('Juan Pérez')).toBeDefined()
    expect(screen.getByText('Ana López')).toBeDefined()
  })

  it('shows Activo badge for active user', () => {
    render(
      <UsuariosTable
        usuarios={[usuarios[0]]}
        onEditar={vi.fn()}
        onDesactivar={vi.fn()}
        onCambiarClave={vi.fn()}
      />,
    )
    expect(screen.getByText('Activo')).toBeDefined()
  })

  it('shows Inactivo badge for inactive user', () => {
    render(
      <UsuariosTable
        usuarios={[usuarios[1]]}
        onEditar={vi.fn()}
        onDesactivar={vi.fn()}
        onCambiarClave={vi.fn()}
      />,
    )
    expect(screen.getByText('Inactivo')).toBeDefined()
  })

  it('does not crash with no permisos', () => {
    const userNoPerm: Usuario = { ...usuarios[0], Permisos: { dashboard: false, transferencias: 'ninguno', nominas: 'ninguno', proveedores: 'ninguno', servicios: 'ninguno', alquileres: 'ninguno', tesoreria: 'ninguno', reportes: 'ninguno' } }
    expect(() =>
      render(
        <UsuariosTable
          usuarios={[userNoPerm]}
          onEditar={vi.fn()}
          onDesactivar={vi.fn()}
          onCambiarClave={vi.fn()}
        />,
      ),
    ).not.toThrow()
  })
})
