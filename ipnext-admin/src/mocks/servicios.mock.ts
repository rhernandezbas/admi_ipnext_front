import type { Servicio } from '@/types/servicio.types'

export const serviciosMock: Servicio[] = [
  { id: '1', nombre: 'Internet Fibra — Sede Central', proveedor: 'Telecom', costoMensual: 15200, vtoFactura: '2026-03-18', estado: 'proximo_vencer', tipo: 'internet' },
  { id: '2', nombre: 'Internet Fibra — Depósito', proveedor: 'Telecom', costoMensual: 9800, vtoFactura: '2026-03-22', estado: 'activo', tipo: 'internet' },
  { id: '3', nombre: 'Telefonía Móvil', proveedor: 'Claro', costoMensual: 22000, vtoFactura: '2026-03-25', estado: 'activo', tipo: 'internet' },
  { id: '4', nombre: 'Sede Central — Planta Baja', proveedor: 'EDENOR', costoMensual: 28500, vtoFactura: '2026-03-15', estado: 'proximo_vencer', tipo: 'energia' },
  { id: '5', nombre: 'Sede Central — Planta Alta', proveedor: 'EDENOR', costoMensual: 20000, vtoFactura: '2026-03-15', estado: 'activo', tipo: 'energia' },
  { id: '6', nombre: 'Vigilancia — Sede Central', proveedor: 'Seguridad Max S.R.L.', costoMensual: 35000, estado: 'activo', tipo: 'seguridad' },
  { id: '7', nombre: 'Cámaras CCTV', proveedor: 'Seguridad Max S.R.L.', costoMensual: 8500, estado: 'activo', tipo: 'seguridad' },
  { id: '8', nombre: 'Suite Office 365', proveedor: 'Microsoft', costoMensual: 45000, renovacion: '2026-06-01', estado: 'activo', tipo: 'software' },
  { id: '9', nombre: 'Slack Business', proveedor: 'Slack', costoMensual: 18000, renovacion: '2026-04-15', estado: 'proximo_vencer', tipo: 'software' },
  { id: '10', nombre: 'Adobe Creative Cloud', proveedor: 'Adobe', costoMensual: 12000, renovacion: '2026-07-01', estado: 'activo', tipo: 'software' },
]

export const resumenServiciosMock = {
  gastoTotal: serviciosMock.reduce((a, s) => a + s.costoMensual, 0),
  serviciosActivos: serviciosMock.filter((s) => s.estado === 'activo').length,
  facturasProximas: serviciosMock.filter((s) => s.estado === 'proximo_vencer').length,
  renovacionesProximas: 3,
}
