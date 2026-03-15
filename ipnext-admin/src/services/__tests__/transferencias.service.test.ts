import { describe, it, expect } from 'vitest'
import { deriveTipo } from '@/services/transferencias.service'

describe('deriveTipo (GAP-I)', () => {
  it('frecuencia mensual → tipo recurrente', () => {
    expect(deriveTipo('mensual')).toBe('recurrente')
  })

  it('frecuencia semanal → tipo recurrente', () => {
    expect(deriveTipo('semanal')).toBe('recurrente')
  })

  it('frecuencia semestral → tipo recurrente', () => {
    expect(deriveTipo('semestral')).toBe('recurrente')
  })

  it('frecuencia unica → tipo manual', () => {
    expect(deriveTipo('unica')).toBe('manual')
  })

  it('frecuencia undefined → tipo manual', () => {
    expect(deriveTipo(undefined)).toBe('manual')
  })
})
