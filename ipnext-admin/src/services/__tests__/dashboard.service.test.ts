import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import MockAdapter from 'axios-mock-adapter'
import { api } from '@/lib/api'
import { dashboardService } from '../dashboard.service'

describe('dashboardService (GAP-8)', () => {
  let mock: MockAdapter

  beforeEach(() => {
    mock = new MockAdapter(api)
  })

  afterEach(() => {
    mock.restore()
  })

  // ─── KPIs ─────────────────────────────────────────────────────────────────
  // Backend devuelve UN objeto con campos numéricos, no un array de UI
  it('getKpis transforma el objeto backend en array de Kpi para la UI', async () => {
    const backendKpis = {
      totalPagosMes: 150000,
      pagosPendientes: 12,
      pagosVencidos: 3,
      flujoCajaMes: 85000,
      totalEmpleados: 25,
      costoNominaMes: 450000,
    }
    mock.onGet('/dashboard/kpis').reply(200, { data: backendKpis })

    const result = await dashboardService.getKpis()

    // Debe ser un array de Kpi (para KpiRow)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
    // Cada Kpi debe tener id, label y value
    expect(result[0]).toHaveProperty('id')
    expect(result[0]).toHaveProperty('label')
    expect(result[0]).toHaveProperty('value')
  })

  // ─── Pagos Urgentes ───────────────────────────────────────────────────────
  // Backend devuelve { id, beneficiario, monto, moneda, fechaPago, estado, categoria }
  it('getPagosUrgentes retorna pagos con campos del backend en español', async () => {
    const backendPagos = [
      {
        id: 'trans-1',
        beneficiario: 'Proveedor ABC',
        monto: 5000,
        moneda: 'ARS',
        fechaPago: '2026-03-20',
        estado: 'pendiente',
        categoria: 'software',
      },
    ]
    mock.onGet('/dashboard/pagos-urgentes').reply(200, { data: backendPagos })

    const result = await dashboardService.getPagosUrgentes()

    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty('id', 'trans-1')
    expect(result[0]).toHaveProperty('beneficiario', 'Proveedor ABC')
    expect(result[0]).toHaveProperty('monto', 5000)
    expect(result[0]).toHaveProperty('fechaPago', '2026-03-20')
    expect(result[0]).toHaveProperty('estado', 'pendiente')
    // NO debe tener campos en inglés
    expect((result[0] as unknown as Record<string, unknown>).beneficiary).toBeUndefined()
    expect((result[0] as unknown as Record<string, unknown>).dueDate).toBeUndefined()
    expect((result[0] as unknown as Record<string, unknown>).amount).toBeUndefined()
  })

  // ─── Distribución Egresos ─────────────────────────────────────────────────
  // Backend devuelve { categoria, monto, porcentaje }
  it('getDistribucionEgresos retorna items con categoria, monto, porcentaje', async () => {
    const backendData = [
      { categoria: 'nomina', monto: 450000, porcentaje: 45.5 },
      { categoria: 'alquiler', monto: 180000, porcentaje: 18.2 },
    ]
    mock.onGet('/dashboard/distribucion-egresos').reply(200, { data: backendData })

    const result = await dashboardService.getDistribucionEgresos()

    expect(Array.isArray(result)).toBe(true)
    expect(result[0]).toHaveProperty('categoria', 'nomina')
    expect(result[0]).toHaveProperty('monto', 450000)
    expect(result[0]).toHaveProperty('porcentaje', 45.5)
    // NO debe tener shape anterior { month, gastos, ingresos }
    expect((result[0] as unknown as Record<string, unknown>).month).toBeUndefined()
    expect((result[0] as unknown as Record<string, unknown>).gastos).toBeUndefined()
  })

  // ─── Actividad Reciente ───────────────────────────────────────────────────
  // Backend retorna array vacío (placeholder v1)
  it('getActividadReciente retorna array vacío desde el backend', async () => {
    mock.onGet('/dashboard/actividad-reciente').reply(200, { data: [] })

    const result = await dashboardService.getActividadReciente()

    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(0)
  })
})
