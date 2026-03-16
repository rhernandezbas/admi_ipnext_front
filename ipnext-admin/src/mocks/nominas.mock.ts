import type { Empleado, Guardia, Compensacion } from '@/types/nomina.types'

export const empleadosMock: Empleado[] = [
  { id: '1', nombre: 'María González', puesto: 'Contadora', area: 'Administración', rol: 'Núcleo', sueldoBruto: 450000, obraSocial: 'OSDE 210', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2020-03-01' },
  { id: '2', nombre: 'Juan Rodríguez', puesto: 'Seguridad', area: 'Operaciones', rol: 'Núcleo', sueldoBruto: 280000, obraSocial: 'Swiss Medical', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2019-07-15' },
  { id: '3', nombre: 'Ana López', puesto: 'Recepcionista', area: 'Administración', rol: 'Dic', sueldoBruto: 220000, obraSocial: 'OSDE 210', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2021-01-10' },
  { id: '4', nombre: 'Carlos Martínez', puesto: 'Mantenimiento', area: 'Operaciones', rol: 'Núcleo', sueldoBruto: 310000, obraSocial: 'Galeno', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2018-05-20' },
  { id: '5', nombre: 'Laura Fernández', puesto: 'Administración', area: 'Administración', rol: 'Dic', sueldoBruto: 250000, obraSocial: 'Swiss Medical', cargasSocialesPct: 30, cargasSocialesMonto: null, fechaIngreso: '2022-09-01' },
]

export const guardiasMock: Guardia[] = [
  { id: '1', empleadoId: 'uuid-2', empleadoNombre: 'Juan Rodríguez', fecha: '2026-03-01', horas: 168, monto: 280000 },
  { id: '2', empleadoId: 'uuid-p2', empleadoNombre: 'Pedro Sánchez', fecha: '2026-03-01', horas: 152, monto: 228000 },
  { id: '3', empleadoId: 'uuid-r3', empleadoNombre: 'Roberto Silva', fecha: '2026-03-01', horas: 144, monto: 216000 },
  { id: '4', empleadoId: 'uuid-m4', empleadoNombre: 'Miguel Torres', fecha: '2026-03-01', horas: 168, monto: 252000 },
]

export const compensacionesMock: Compensacion[] = [
  { id: '1', empleadoId: 'uuid-1', empleadoNombre: 'María González', tipo: 'bono', descripcion: 'Bono Q1 2026', monto: 50000, fecha: '2026-03-01', estado: 'aprobado' },
  { id: '2', empleadoId: 'uuid-2', empleadoNombre: 'Juan Rodríguez', tipo: 'adelanto', descripcion: 'Adelanto de sueldo Marzo', monto: 90000, fecha: '2026-03-05', estado: 'aprobado' },
  { id: '3', empleadoId: 'uuid-3', empleadoNombre: 'Ana López', tipo: 'extra', descripcion: '5 días — Oficial 28/03', monto: 36000, fecha: '2026-03-10', estado: 'pendiente' },
  { id: '4', empleadoId: 'uuid-4', empleadoNombre: 'Carlos Martínez', tipo: 'bono', descripcion: 'Bono mantenimiento preventivo', monto: 30000, fecha: '2026-03-15', estado: 'pendiente' },
]

export const nominaResumenMock = {
  totalBruto: 1510000,
  cargasSociales: 453000,
  netoAPagar: 1057000,
  empleadosConAumento: 3,
  liquidacionesPendientes: 2,
}
