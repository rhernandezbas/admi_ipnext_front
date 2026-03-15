import { describe, it, expect } from 'vitest'
import { formatARS, formatMillones, formatMiles, formatFecha } from '../formatters'

describe('formatARS', () => {
  it('returns 0 for undefined', () => {
    expect(formatARS(undefined)).toBe('0')
  })
  it('returns 0 for null', () => {
    expect(formatARS(null)).toBe('0')
  })
  it('returns 0 for NaN', () => {
    expect(formatARS(NaN)).toBe('0')
  })
  it('formats number with es-AR locale', () => {
    // es-AR uses . as thousands separator
    expect(formatARS(5000)).toBe((5000).toLocaleString('es-AR'))
  })
  it('parses string numbers', () => {
    expect(formatARS('1500')).toBe((1500).toLocaleString('es-AR'))
  })
  it('formats 0 as 0', () => {
    expect(formatARS(0)).toBe('0')
  })
})

describe('formatMillones', () => {
  it('formats millions', () => {
    expect(formatMillones(1_500_000)).toBe('1.5M')
  })
  it('returns 0 for undefined', () => {
    expect(formatMillones(undefined)).toBe('0.0M')
  })
})

describe('formatMiles', () => {
  it('formats thousands', () => {
    expect(formatMiles(45_000)).toBe('45K')
  })
  it('returns 0 for undefined', () => {
    expect(formatMiles(undefined)).toBe('0K')
  })
})

describe('formatFecha', () => {
  it('returns — for undefined', () => {
    expect(formatFecha(undefined)).toBe('—')
  })
  it('returns — for null', () => {
    expect(formatFecha(null)).toBe('—')
  })
  it('returns — for empty string', () => {
    expect(formatFecha('')).toBe('—')
  })
  it('formats ISO date to DD/MM/YYYY', () => {
    // Use noon to avoid timezone shift to previous day
    const result = formatFecha('2026-03-15T12:00:00Z')
    expect(result).toMatch(/15\/03\/2026/)
  })
  it('returns raw string for invalid date', () => {
    expect(formatFecha('texto-no-fecha')).toBe('texto-no-fecha')
  })
})
