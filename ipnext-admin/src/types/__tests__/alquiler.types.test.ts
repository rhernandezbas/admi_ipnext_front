import { describe, it, expect } from 'vitest'
import type { ContratoAlquiler } from '@/types/alquiler.types'

describe('ContratoAlquiler type (GAP-7)', () => {
  it('tiene ajusteFrecuencia (no ajuste)', () => {
    const contrato: ContratoAlquiler = {
      id: '1',
      inmuebleId: 'uuid-inmueble',
      vigenciaDesde: '2025-01-01',
      vigenciaHasta: '2026-01-01',
      ajusteFrecuencia: 'trimestral',
      montoMensual: 95000,
      estado: 'vigente',
    }
    expect(contrato.ajusteFrecuencia).toBe('trimestral')
    // @ts-expect-error ajuste no existe
    expect((contrato as Record<string, unknown>).ajuste).toBeUndefined()
  })

  it('tiene montoMensual (no alquilerMensual)', () => {
    const contrato: ContratoAlquiler = {
      id: '1',
      inmuebleId: 'uuid-inmueble',
      vigenciaDesde: '2025-01-01',
      vigenciaHasta: '2026-01-01',
      ajusteFrecuencia: 'semestral',
      montoMensual: 120000,
      estado: 'vigente',
    }
    expect(contrato.montoMensual).toBe(120000)
    // @ts-expect-error alquilerMensual no existe
    expect((contrato as Record<string, unknown>).alquilerMensual).toBeUndefined()
  })

  it('tiene inmuebleId (uuid), no inmueble (nombre)', () => {
    const contrato: ContratoAlquiler = {
      id: '1',
      inmuebleId: 'uuid-abc-123',
      vigenciaDesde: '2025-01-01',
      vigenciaHasta: '2026-01-01',
      ajusteFrecuencia: 'anual',
      montoMensual: 80000,
      estado: 'vigente',
    }
    expect(contrato.inmuebleId).toBe('uuid-abc-123')
  })
})
