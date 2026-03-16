import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditarProveedorModal } from '../EditarProveedorModal'
import type { Proveedor } from '@/types/proveedor.types'

vi.mock('@/lib/api', () => ({
  api: { patch: vi.fn().mockResolvedValue({ data: {} }) },
}))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const proveedor: Proveedor = {
  id: 'prov-1',
  nombre: 'Proveedor SA',
  email: 'info@prov.com',
  cuit: '30-12345678-9',
  categoria: 'tecnologia',
  cbu: '0000000000000000000000',
  totalAnual: 500000,
  historialPagos: [],
}

const wrap = (ui: React.ReactElement) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

describe('EditarProveedorModal', () => {
  it('renders with pre-filled data', () => {
    wrap(<EditarProveedorModal open={true} onClose={vi.fn()} proveedor={proveedor} />)
    expect((screen.getByDisplayValue('Proveedor SA') as HTMLInputElement).value).toBe('Proveedor SA')
    expect((screen.getByDisplayValue('info@prov.com') as HTMLInputElement).value).toBe('info@prov.com')
  })

  it('does not render when open=false', () => {
    wrap(<EditarProveedorModal open={false} onClose={vi.fn()} proveedor={proveedor} />)
    expect(screen.queryByText('Editar Proveedor')).toBeNull()
  })

  it('calls onClose on cancel', () => {
    const onClose = vi.fn()
    wrap(<EditarProveedorModal open={true} onClose={onClose} proveedor={proveedor} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('submits PATCH on save', async () => {
    const { api } = await import('@/lib/api')
    wrap(<EditarProveedorModal open={true} onClose={vi.fn()} proveedor={proveedor} />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/proveedores/prov-1', expect.any(Object)))
  })
})
