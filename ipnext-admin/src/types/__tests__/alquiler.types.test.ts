import { describe, it, expect } from 'vitest'
import type { ContratoAlquiler, Inmueble } from '@/types/alquiler.types'

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

describe('Inmueble type (GAP-E)', () => {
  it('tiene alquilerMensual (no alquilerMes)', () => {
    const inmueble: Inmueble = {
      id: '1',
      nombre: 'Oficina Central',
      direccion: 'Av. Corrientes 1234',
      propietario: 'Juan Perez',
      uso: 'oficina',
      alquilerMensual: 95000,
      proximoAjuste: '2026-06-01',
      cbu: '123456789',
      estado: 'pagado',
    }
    expect(inmueble.alquilerMensual).toBe(95000)
    // @ts-expect-error alquilerMes no existe
    expect((inmueble as Record<string, unknown>).alquilerMes).toBeUndefined()
  })
})
