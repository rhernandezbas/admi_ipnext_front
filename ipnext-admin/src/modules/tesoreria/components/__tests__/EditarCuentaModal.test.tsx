import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditarCuentaModal } from '../EditarCuentaModal'
import type { CuentaBancaria } from '@/types/tesoreria.types'

vi.mock('@/lib/api', () => ({
  api: { patch: vi.fn().mockResolvedValue({ data: {} }) },
}))
vi.mock('@/lib/toast', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

const cuenta: CuentaBancaria = {
  id: 'cuenta-1',
  banco: 'Banco Nación',
  tipoCuenta: 'corriente',
  descripcion: 'Cuenta principal',
  tipoEmpresa: 'SA',
  nroCuenta: '001-123456/7',
  saldoActual: 1000000,
  ultimaActualizacion: '2026-03-01',
  activa: true,
}

const wrap = (ui: React.ReactElement) => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(<QueryClientProvider client={qc}>{ui}</QueryClientProvider>)
}

describe('EditarCuentaModal', () => {
  it('renders with pre-filled data', () => {
    wrap(<EditarCuentaModal open={true} onClose={vi.fn()} cuenta={cuenta} />)
    expect((screen.getByDisplayValue('Banco Nación') as HTMLInputElement).value).toBe('Banco Nación')
    expect((screen.getByDisplayValue('Cuenta principal') as HTMLInputElement).value).toBe('Cuenta principal')
  })

  it('does not render when open=false', () => {
    wrap(<EditarCuentaModal open={false} onClose={vi.fn()} cuenta={cuenta} />)
    expect(screen.queryByText('Editar Cuenta')).toBeNull()
  })

  it('calls onClose on cancel', () => {
    const onClose = vi.fn()
    wrap(<EditarCuentaModal open={true} onClose={onClose} cuenta={cuenta} />)
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('submits PATCH on save', async () => {
    const { api } = await import('@/lib/api')
    wrap(<EditarCuentaModal open={true} onClose={vi.fn()} cuenta={cuenta} />)
    fireEvent.submit(screen.getByRole('form'))
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/tesoreria/cuentas/cuenta-1', expect.any(Object)))
  })
})
