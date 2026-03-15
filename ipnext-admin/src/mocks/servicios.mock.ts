import type { Servicio } from '@/types/servicio.types'

export const serviciosMock: Servicio[] = [
  { id: '1', nombre: 'Internet Fibra — Sede Central', proveedor: 'Telecom', extra: '1 línea / 500MB', costoMensual: 15200, vtoFactura: '2026-03-18', estado: 'proximo_vencer', categoria: 'internet' },
  { id: '2', nombre: 'Internet Fibra — Depósito', proveedor: 'Telecom', extra: '1 línea / 200MB', costoMensual: 9800, vtoFactura: '2026-03-22', estado: 'activo', categoria: 'internet' },
  { id: '3', nombre: 'Telefonía Móvil', proveedor: 'Claro', extra: '5 líneas', costoMensual: 22000, vtoFactura: '2026-03-25', estado: 'activo', categoria: 'internet' },
  { id: '4', nombre: 'Sede Central — Planta Baja', proveedor: 'EDENOR', extra: '2.400 KW', costoMensual: 28500, vtoFactura: '2026-03-15', estado: 'proximo_vencer', categoria: 'energia' },
  { id: '5', nombre: 'Sede Central — Planta Alta', proveedor: 'EDENOR', extra: '1.800 KW', costoMensual: 20000, vtoFactura: '2026-03-15', estado: 'activo', categoria: 'energia' },
  { id: '6', nombre: 'Vigilancia — Sede Central', proveedor: 'Seguridad Max S.R.L.', extra: '24/7 — 2 guardias', costoMensual: 35000, vigencia: '10 meses', estado: 'activo', categoria: 'seguridad' },
  { id: '7', nombre: 'Cámaras CCTV', proveedor: 'Seguridad Max S.R.L.', extra: 'Monitoreo remoto', costoMensual: 8500, vigencia: '10 meses', estado: 'activo', categoria: 'seguridad' },
  { id: '8', nombre: 'Suite Office 365', proveedor: 'Microsoft', extra: '15 licencias', costoMensual: 45000, renovacion: '2026-06-01', estado: 'activo', categoria: 'software' },
  { id: '9', nombre: 'Slack Business', proveedor: 'Slack', extra: '20 asientos', costoMensual: 18000, renovacion: '2026-04-15', estado: 'proximo_vencer', categoria: 'software' },
  { id: '10', nombre: 'Adobe Creative Cloud', proveedor: 'Adobe', extra: '3 licencias', costoMensual: 12000, renovacion: '2026-07-01', estado: 'activo', categoria: 'software' },
]

export const resumenServiciosMock = {
  gastoTotal: serviciosMock.reduce((a, s) => a + s.costoMensual, 0),
  serviciosActivos: serviciosMock.filter((s) => s.estado === 'activo').length,
  facturasProximas: serviciosMock.filter((s) => s.estado === 'proximo_vencer').length,
  renovacionesProximas: 3,
}
