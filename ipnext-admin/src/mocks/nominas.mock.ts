import type { Empleado, Guardia, Compensacion } from '@/types/nomina.types'

export const empleadosMock: Empleado[] = [
  { id: '1', nombre: 'María González', puesto: 'Contadora', area: 'Administración', rol: 'Núcleo', cargo: 'Contadora Senior', sueldoBase: 450000, obraSocial: 'OSDE 210', netoMes: 382500 },
  { id: '2', nombre: 'Juan Rodríguez', puesto: 'Seguridad', area: 'Operaciones', rol: 'Núcleo', cargo: 'Guardia de Seguridad', sueldoBase: 280000, obraSocial: 'Swiss Medical', netoMes: 238000 },
  { id: '3', nombre: 'Ana López', puesto: 'Recepcionista', area: 'Administración', rol: 'Dic', cargo: 'Recepcionista', sueldoBase: 220000, obraSocial: 'OSDE 210', netoMes: 187000 },
  { id: '4', nombre: 'Carlos Martínez', puesto: 'Mantenimiento', area: 'Operaciones', rol: 'Núcleo', cargo: 'Técnico Mantenimiento', sueldoBase: 310000, obraSocial: 'Galeno', netoMes: 263500 },
  { id: '5', nombre: 'Laura Fernández', puesto: 'Administración', area: 'Administración', rol: 'Dic', cargo: 'Asistente Admin.', sueldoBase: 250000, obraSocial: 'Swiss Medical', netoMes: 212500 },
]

export const guardiasMock: Guardia[] = [
  { id: '1', nombre: 'Juan Rodríguez', turno: 'Noche', hsTrabajadas: 168, horasExtras: 24, ausencias: 0, estado: 'regular' },
  { id: '2', nombre: 'Pedro Sánchez', turno: 'Día', hsTrabajadas: 152, horasExtras: 8, ausencias: 2, estado: 'autorizado' },
  { id: '3', nombre: 'Roberto Silva', turno: 'Noche', hsTrabajadas: 144, horasExtras: 0, ausencias: 3, estado: 'revisar' },
  { id: '4', nombre: 'Miguel Torres', turno: 'Día', hsTrabajadas: 168, horasExtras: 16, ausencias: 0, estado: 'regular' },
]

export const compensacionesMock: Compensacion[] = [
  { id: '1', empleado: 'María González', tipo: 'bono_productividad', detalle: 'Bono Q1 2026', monto: 50000, periodo: '2026-03', estado: 'aprobado' },
  { id: '2', empleado: 'Juan Rodríguez', tipo: 'adelanto_sueldo', detalle: 'Adelanto de sueldo Marzo', monto: -90000, periodo: '2026-03', estado: 'aprobado' },
  { id: '3', empleado: 'Ana López', tipo: 'vacaciones', detalle: '5 días — Oficial 28/03', monto: 36000, periodo: '2026-03', estado: 'pendiente' },
  { id: '4', empleado: 'Carlos Martínez', tipo: 'bono_productividad', detalle: 'Bono mantenimiento preventivo', monto: 30000, periodo: '2026-03', estado: 'en_cuotas' },
]

export const nominaResumenMock = {
  totalBruto: 1510000,
  cargasSociales: 453000,
  netoAPagar: 1057000,
  empleadosConAumento: 3,
  liquidacionesPendientes: 2,
}
