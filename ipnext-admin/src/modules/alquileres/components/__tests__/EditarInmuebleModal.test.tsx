import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditarInmuebleModal } from '../EditarInmuebleModal'
import type { Inmueble } from '@/types/alquiler.types'

vi.mock('@/lib/api', () => ({
  api: { patch: vi.fn().mockResolvedValue({ data: {} }) },
}))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const inmueble: Inmueble = {
  id: 'uuid-1',
  nombre: 'Casa Norte',
  direccion: 'Av. Siempre Viva 123',
  propietario: 'Owner SA',
  uso: 'deposito',
  alquilerMensual: 90000,
  proximoAjuste: '',
  cbu: '1234567890',
  estado: 'pendiente',
}

const wrap = (ui: React.ReactElement) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

describe('EditarInmuebleModal', () => {
  it('renders with pre-filled data', () => {
    wrap(<EditarInmuebleModal open={true} onClose={vi.fn()} inmueble={inmueble} />)
    expect((screen.getByDisplayValue('Casa Norte') as HTMLInputElement).value).toBe('Casa Norte')
    expect((screen.getByDisplayValue('Av. Siempre Viva 123') as HTMLInputElement).value).toBe('Av. Siempre Viva 123')
  })

  it('does not render when open=false', () => {
    wrap(<EditarInmuebleModal open={false} onClose={vi.fn()} inmueble={inmueble} />)
    expect(screen.queryByText('Editar Inmueble')).toBeNull()
  })

  it('calls onClose on cancel', () => {
    const onClose = vi.fn()
    wrap(<EditarInmuebleModal open={true} onClose={onClose} inmueble={inmueble} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('submits PATCH on save', async () => {
    const { api } = await import('@/lib/api')
    wrap(<EditarInmuebleModal open={true} onClose={vi.fn()} inmueble={inmueble} />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/alquileres/uuid-1', expect.any(Object)))
  })
})
