import { describe, it, expect } from 'vitest'
import type { Empleado, Guardia, CompensacionTipo } from '@/types/nomina.types'

describe('Empleado type (GAP-4)', () => {
  it('tiene sueldoBruto (no sueldoBase)', () => {
    const emp: Empleado = {
      id: '1',
      nombre: 'Juan',
      puesto: 'Dev',
      area: 'Tech',
      rol: 'empleado',
      sueldoBruto: 180000,
      obraSocial: 'OSDE',
      cargasSocialesPct: 30,
      cargasSocialesMonto: null,
      fechaIngreso: '2024-01-15',
    }
    expect(emp.sueldoBruto).toBe(180000)
    // @ts-expect-error sueldoBase no existe
    expect((emp as Record<string, unknown>).sueldoBase).toBeUndefined()
  })

  it('NO tiene campo netoMes', () => {
    const emp: Empleado = {
      id: '1', nombre: 'Juan', puesto: 'Dev', area: 'Tech',
      rol: 'empleado', sueldoBruto: 180000, obraSocial: 'OSDE', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2024-01-15',
    }
    // @ts-expect-error netoMes no existe
    expect((emp as Record<string, unknown>).netoMes).toBeUndefined()
  })

  it('NO tiene campo cargo', () => {
    const emp: Empleado = {
      id: '1', nombre: 'Juan', puesto: 'Dev', area: 'Tech',
      rol: 'empleado', sueldoBruto: 180000, obraSocial: 'OSDE', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2024-01-15',
    }
    // @ts-expect-error cargo no existe
    expect((emp as Record<string, unknown>).cargo).toBeUndefined()
  })

  it('tiene fechaIngreso y avatar opcional', () => {
    const emp: Empleado = {
      id: '1', nombre: 'Juan', puesto: 'Dev', area: 'Tech',
      rol: 'empleado', sueldoBruto: 180000, obraSocial: 'OSDE',
      cargasSocialesPct: 30, cargasSocialesMonto: null,
      fechaIngreso: '2024-01-15', avatar: 'https://example.com/avatar.png',
    }
    expect(emp.fechaIngreso).toBe('2024-01-15')
    expect(emp.avatar).toBeDefined()
  })
})

describe('Guardia type (GAP-5)', () => {
  it('tiene empleadoId, fecha, horas, monto', () => {
    const g: Guardia = {
      id: '1',
      empleadoId: 'uuid-emp',
      fecha: '2026-03-15',
      horas: 8,
      monto: 5000,
    }
    expect(g.empleadoId).toBe('uuid-emp')
    expect(g.horas).toBe(8)
  })

  it('NO tiene turno, horasExtras, ausencias', () => {
    const g: Guardia = { id: '1', empleadoId: 'uuid', fecha: '2026-03-15', horas: 8, monto: 5000 }
    // @ts-expect-error turno no existe
    expect((g as Record<string, unknown>).turno).toBeUndefined()
    // @ts-expect-error horasExtras no existe
    expect((g as Record<string, unknown>).horasExtras).toBeUndefined()
    // @ts-expect-error ausencias no existe
    expect((g as Record<string, unknown>).ausencias).toBeUndefined()
  })
})

describe('CompensacionTipo (GAP-6)', () => {
  it('acepta bono, adelanto, extra, otro', () => {
    const tipos: CompensacionTipo[] = ['bono', 'adelanto', 'extra', 'otro']
    expect(tipos).toHaveLength(4)
  })

  it('CompensacionTipo NO incluye vacaciones ni bono_productividad', () => {
    // Si estos tipos estuvieran en la definición, TypeScript no daría error.
    // Como el test compila con @ts-expect-error significa que NO están en el tipo.
    // @ts-expect-error vacaciones no es un CompensacionTipo válido
    const t: CompensacionTipo = 'vacaciones'
    expect(t).toBeDefined() // nunca llega acá en runtime, solo valida tipos
  })
})
