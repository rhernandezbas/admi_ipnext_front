import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { RankingChart } from '../RankingChart'

const baseItem = {
  pos: 1,
  proveedor: 'Empresa ABC',
  categoria: 'internet',
  totalPagado: 100000,
  ultimoPago: '2026-03-01T12:00:00Z',
  facturas: 3,
}

describe('RankingChart', () => {
  it('renders without crash with valid data', () => {
    expect(() => render(<RankingChart ranking={[baseItem]} />)).not.toThrow()
  })

  it('renders without crash when proveedor is undefined', () => {
    const item = { ...baseItem, proveedor: undefined as unknown as string }
    expect(() => render(<RankingChart ranking={[item]} />)).not.toThrow()
  })

  it('renders without crash with empty array', () => {
    expect(() => render(<RankingChart ranking={[]} />)).not.toThrow()
  })

  it('renders without crash with undefined ranking', () => {
    expect(() => render(<RankingChart ranking={undefined as unknown as []} />)).not.toThrow()
  })
})
