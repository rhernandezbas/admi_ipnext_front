import type { Inmueble, ContratoAlquiler, PagoAlquiler, VencimientoAlquiler } from '@/types/alquiler.types'

export const inmueblesMock: Inmueble[] = [
  { id: '1', nombre: 'Sede Central', direccion: 'Av. Corrientes 1234, CABA', propietario: 'Carlos Pérez', uso: 'Oficina', alquilerMes: 180000, proximoAjuste: '2026-06-01', cbu: 'carlosperez.mp', estado: 'pendiente' },
  { id: '2', nombre: 'Depósito Norte', direccion: 'Ruta 8 km 32, GBA', propietario: 'Inversiones SA', uso: 'Depósito', alquilerMes: 95000, proximoAjuste: '2026-04-01', cbu: '0720030120000055566670', estado: 'pagado' },
  { id: '3', nombre: 'Nodo Zona Sur', direccion: 'Av. Hipólito Yrigoyen 567, Lanús', propietario: 'Roberto García', uso: 'Nodo', alquilerMes: 45000, proximoAjuste: '2026-03-20', cbu: 'robertog.mp', estado: 'vencido' },
  { id: '4', nombre: 'Oficina Administrativa', direccion: 'Marcelo T. de Alvear 890, CABA', propietario: 'María López', uso: 'Oficina', alquilerMes: 220000, proximoAjuste: '2026-09-01', cbu: '0720030120000044455540', estado: 'pagado' },
]

export const contratosAlquilerMock: ContratoAlquiler[] = [
  { id: '1', inmueble: 'Sede Central', direccion: 'Av. Corrientes 1234, CABA', propietario: 'Carlos Pérez', vigenciaDesde: '2024-01-01', vigenciaHasta: '2026-12-31', ajuste: 'Semestral ICL', alquilerMensual: 180000, estado: 'vigente' },
  { id: '2', inmueble: 'Depósito Norte', direccion: 'Ruta 8 km 32, GBA', propietario: 'Inversiones SA', vigenciaDesde: '2024-06-01', vigenciaHasta: '2026-05-01', ajuste: 'Trimestral IPC', alquilerMensual: 95000, estado: 'por_vencer' },
  { id: '3', inmueble: 'Nodo Zona Sur', direccion: 'Av. H. Yrigoyen 567', propietario: 'Roberto García', vigenciaDesde: '2023-03-01', vigenciaHasta: '2026-03-01', ajuste: '6 meses', alquilerMensual: 45000, estado: 'vencido' },
  { id: '4', inmueble: 'Oficina Administrativa', direccion: 'M. T. de Alvear 890', propietario: 'María López', vigenciaDesde: '2025-01-01', vigenciaHasta: '2027-12-31', ajuste: 'Anual UVA', alquilerMensual: 220000, estado: 'vigente' },
]

export const pagosAlquilerMock: PagoAlquiler[] = [
  { id: '1', inmueble: 'Sede Central', periodo: '2026-03', fechaPago: '2026-03-05', monto: 180000, nroRecibo: 'REC-2026-031', estado: 'pagado' },
  { id: '2', inmueble: 'Depósito Norte', periodo: '2026-03', fechaPago: '2026-03-03', monto: 95000, nroRecibo: 'REC-2026-032', estado: 'pagado' },
  { id: '3', inmueble: 'Nodo Zona Sur', periodo: '2026-03', fechaPago: '', monto: 45000, estado: 'pendiente' },
  { id: '4', inmueble: 'Oficina Administrativa', periodo: '2026-03', fechaPago: '2026-03-01', monto: 220000, nroRecibo: 'REC-2026-033', estado: 'pagado' },
]

export const vencimientosMock: VencimientoAlquiler[] = [
  { id: '1', inmueble: 'Nodo Zona Sur', propietario: 'Roberto García', fechaInicio: '2023-03-01', fechaVencimiento: '2026-03-01', diasRestantes: -14, estado: 'vencido' },
  { id: '2', inmueble: 'Depósito Norte', propietario: 'Inversiones SA', fechaInicio: '2024-06-01', fechaVencimiento: '2026-05-01', diasRestantes: 47, estado: 'proximo' },
  { id: '3', inmueble: 'Sede Central', propietario: 'Carlos Pérez', fechaInicio: '2024-01-01', fechaVencimiento: '2026-12-31', diasRestantes: 291, estado: 'vigente' },
  { id: '4', inmueble: 'Oficina Administrativa', propietario: 'María López', fechaInicio: '2025-01-01', fechaVencimiento: '2027-12-31', diasRestantes: 656, estado: 'vigente' },
]
