import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditarEmpleadoModal } from '../EditarEmpleadoModal'
import type { Empleado } from '@/types/nomina.types'

vi.mock('@/lib/api', () => ({
  api: { patch: vi.fn().mockResolvedValue({ data: {} }) },
}))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const empleado: Empleado = {
  id: 'emp-1',
  nombre: 'Juan Pérez',
  puesto: 'Desarrollador',
  area: 'Tecnología',
  rol: 'empleado',
  sueldoBruto: 150000,
  obraSocial: 'OSDE',
  fechaIngreso: '2022-01-01',
}

const wrap = (ui: React.ReactElement) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

describe('EditarEmpleadoModal', () => {
  it('renders with pre-filled data', () => {
    wrap(<EditarEmpleadoModal open={true} onClose={vi.fn()} empleado={empleado} />)
    expect((screen.getByDisplayValue('Juan Pérez') as HTMLInputElement).value).toBe('Juan Pérez')
    expect((screen.getByDisplayValue('Desarrollador') as HTMLInputElement).value).toBe('Desarrollador')
  })

  it('does not render when open=false', () => {
    wrap(<EditarEmpleadoModal open={false} onClose={vi.fn()} empleado={empleado} />)
    expect(screen.queryByText('Editar Empleado')).toBeNull()
  })

  it('calls onClose on cancel', () => {
    const onClose = vi.fn()
    wrap(<EditarEmpleadoModal open={true} onClose={onClose} empleado={empleado} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('submits PATCH on save', async () => {
    const { api } = await import('@/lib/api')
    wrap(<EditarEmpleadoModal open={true} onClose={vi.fn()} empleado={empleado} />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/nominas/empleados/emp-1', expect.any(Object)))
  })
})
