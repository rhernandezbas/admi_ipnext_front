import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TransferenciasTable } from '../TransferenciasTable'
import type { Transferencia } from '@/types/transferencia.types'

const base: Transferencia = {
  id: '1',
  beneficiario: 'Proveedor X',
  cbu: '1234',
  categoria: 'energia',
  fechaProximoPago: '15/04/2026',
  tipo: 'recurrente',
  frecuencia: 'mensual',
  monto: 5000,
  credito: false,
  estado: 'pendiente',
}

describe('TransferenciasTable', () => {
  it('renders without crash with valid estado', () => {
    expect(() => render(<TransferenciasTable data={[base]} />)).not.toThrow()
  })

  it('does not crash with unknown estado value', () => {
    const item = { ...base, estado: 'desconocido' as unknown as Transferencia['estado'] }
    expect(() => render(<TransferenciasTable data={[item]} />)).not.toThrow()
  })

  it('does not crash with undefined estado', () => {
    const item = { ...base, estado: undefined as unknown as Transferencia['estado'] }
    expect(() => render(<TransferenciasTable data={[item]} />)).not.toThrow()
  })

  it('does not crash with empty data', () => {
    expect(() => render(<TransferenciasTable data={[]} />)).not.toThrow()
  })
})
