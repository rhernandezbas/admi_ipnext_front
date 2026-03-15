import { describe, it, expect } from 'vitest'
import type { CuentaBancaria } from '@/types/tesoreria.types'

describe('CuentaBancaria type (GAP-F/G)', () => {
  it('tiene saldoActual (no saldo)', () => {
    const cuenta: CuentaBancaria = {
      id: '1',
      banco: 'Banco Nación',
      tipoCuenta: 'CC',
      descripcion: 'Cuenta principal',
      tipoEmpresa: 'SA',
      nroCuenta: '123456',
      saldoActual: 500000,
      ultimaActualizacion: '2026-03-15T12:00:00Z',
      activa: true,
    }
    expect(cuenta.saldoActual).toBe(500000)
    // @ts-expect-error saldo no existe
    expect((cuenta as Record<string, unknown>).saldo).toBeUndefined()
  })

  it('tiene activa como boolean (no estado string)', () => {
    const cuenta: CuentaBancaria = {
      id: '1',
      banco: 'Banco Galicia',
      tipoCuenta: 'CA',
      descripcion: 'Caja de ahorro',
      tipoEmpresa: 'SA',
      nroCuenta: '654321',
      saldoActual: 200000,
      ultimaActualizacion: '2026-03-15T12:00:00Z',
      activa: false,
    }
    expect(cuenta.activa).toBe(false)
    // @ts-expect-error estado no existe
    expect((cuenta as Record<string, unknown>).estado).toBeUndefined()
  })
})
