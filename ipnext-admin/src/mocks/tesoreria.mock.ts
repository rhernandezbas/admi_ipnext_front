import type { FlujoCaja, CuentaBancaria, MovimientoConciliacion, ProyeccionItem } from '@/types/tesoreria.types'

export const flujoCajaMock: FlujoCaja[] = [
  { id: '1', fecha: '2026-03-15', descripcion: 'Liquidación Alquileres Martes', tipo: 'alquileres', monto: 540000, ingreso: false },
  { id: '2', fecha: '2026-03-17', descripcion: 'Cobro cuotas clientes', tipo: 'transferencias', monto: 820000, ingreso: true },
  { id: '3', fecha: '2026-03-20', descripcion: 'Pago Nómina Quincenal', tipo: 'nomina', monto: 528500, ingreso: false },
  { id: '4', fecha: '2026-03-22', descripcion: 'Cobro servicios corporativos', tipo: 'transferencias', monto: 650000, ingreso: true },
  { id: '5', fecha: '2026-03-25', descripcion: 'Pago proveedores varios', tipo: 'transferencias', monto: 210000, ingreso: false },
  { id: '6', fecha: '2026-03-31', descripcion: 'Liquidación Nómina Mensual', tipo: 'nomina', monto: 1057000, ingreso: false },
]

export const cuentasBancariasMock: CuentaBancaria[] = [
  { id: '1', banco: 'Banco Galicia', tipoCuenta: 'Cuenta Corriente', descripcion: 'Cuenta operativa principal', tipoEmpresa: 'CBU', nroCuenta: '0040070840000044455540', saldo: 2450000, ultimaActualizacion: '2026-03-14', estado: 'activo' },
  { id: '2', banco: 'Banco Nación', tipoCuenta: 'Caja de Ahorros', descripcion: 'Reservas y contingencias', tipoEmpresa: 'CBU', nroCuenta: '0110057830005703456735', saldo: 1200000, ultimaActualizacion: '2026-03-14', estado: 'activo' },
  { id: '3', banco: 'Mercado Pago', tipoCuenta: 'Cuenta Virtual', descripcion: 'Cobros digitales', tipoEmpresa: 'CVU', nroCuenta: 'ipnext.mp', saldo: 385000, ultimaActualizacion: '2026-03-15', estado: 'activo' },
  { id: '4', banco: 'BBVA', tipoCuenta: 'Cuenta Corriente', descripcion: 'Pagos internacionales', tipoEmpresa: 'CBU', nroCuenta: '0170099840000099887760', saldo: 45000, ultimaActualizacion: '2026-03-10', estado: 'inactivo' },
]

export const conciliacionMock: MovimientoConciliacion[] = [
  { id: '1', descripcion: 'Pago alquiler — Sede Central', cuenta: 'Banco Galicia CC', fecha: '2026-03-05', debito: 180000, estado: 'conciliado' },
  { id: '2', descripcion: 'Cobro cuota cliente ABC', cuenta: 'Banco Galicia CC', fecha: '2026-03-06', credito: 450000, estado: 'conciliado' },
  { id: '3', descripcion: 'Pago EDENOR', cuenta: 'Banco Galicia CC', fecha: '2026-03-08', debito: 48500, estado: 'pendiente' },
  { id: '4', descripcion: 'Movimiento desconocido', cuenta: 'Banco Nación CA', fecha: '2026-03-10', debito: 15000, estado: 'observado' },
  { id: '5', descripcion: 'Transferencia interna', cuenta: 'Banco Nación CA', fecha: '2026-03-12', credito: 200000, estado: 'pendiente' },
]

export const proyeccionesMock: ProyeccionItem[] = [
  { mes: 'Abr', ingresos: 2800000, egresos: 2100000, saldo: 700000 },
  { mes: 'May', ingresos: 2900000, egresos: 2200000, saldo: 700000 },
  { mes: 'Jun', ingresos: 3100000, egresos: 2400000, saldo: 700000 },
  { mes: 'Jul', ingresos: 2750000, egresos: 2500000, saldo: 250000 },
  { mes: 'Ago', ingresos: 3200000, egresos: 2300000, saldo: 900000 },
  { mes: 'Sep', ingresos: 3000000, egresos: 2250000, saldo: 750000 },
]
