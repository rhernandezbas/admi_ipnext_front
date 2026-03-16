import { describe, it, expect } from 'vitest'
import type { Servicio } from '@/types/servicio.types'

describe('Servicio type (GAP-H)', () => {
  it('tiene costoMensual (no montoMensual)', () => {
    const servicio: Servicio = {
      id: '1',
      nombre: 'Internet',
      proveedor: 'Telecom',
      costoMensual: 15000,
      estado: 'activo',
      tipo: 'internet',
    }
    expect(servicio.costoMensual).toBe(15000)
    // @ts-expect-error montoMensual no existe
    expect((servicio as Record<string, unknown>).montoMensual).toBeUndefined()
  })
})
