import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ContratosTable } from '../ContratosTable'
import type { Contrato } from '@/types/proveedor.types'

const base: Contrato = {
  id: '1',
  codigo: 'CTR-2026-0001',
  proveedor: 'Empresa ABC',
  vigenciaDesde: '2026-01-01',
  vigenciaHasta: '2027-01-01',
  montoAnual: 960000,
  renovacion: '2026-12-01',
  estado: 'activo',
}

describe('ContratosTable', () => {
  it('renders activo badge', () => {
    render(<ContratosTable contratos={[base]} />)
    expect(screen.getByText('Activo')).toBeDefined()
  })

  it('renders proximo_a_vencer badge correctly', () => {
    const item = { ...base, estado: 'proximo_a_vencer' as Contrato['estado'] }
    render(<ContratosTable contratos={[item]} />)
    expect(screen.getByText('Próximo a v.')).toBeDefined()
  })

  it('does not crash with unknown estado', () => {
    const item = { ...base, estado: 'desconocido' as unknown as Contrato['estado'] }
    expect(() => render(<ContratosTable contratos={[item]} />)).not.toThrow()
  })

  it('does not crash with undefined estado', () => {
    const item = { ...base, estado: undefined as unknown as Contrato['estado'] }
    expect(() => render(<ContratosTable contratos={[item]} />)).not.toThrow()
  })
})
