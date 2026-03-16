import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { KpiCard } from '@/components/ui/KpiCard'
import { Shield, Clock, DollarSign, UserX } from 'lucide-react'
import type { Guardia, Empleado } from '@/types/nomina.types'
import { formatARS } from '@/lib/formatters'

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

type SortKey = 'empleadoNombre' | 'fecha' | 'horas' | 'monto'
type SortDir = 'asc' | 'desc'

export function GuardiasTable({ guardias, empleados = [] }: { guardias: Guardia[]; empleados?: Empleado[] }) {
  const now = new Date()
  const [mes, setMes] = useState(now.getMonth())
  const [anio, setAnio] = useState(now.getFullYear())
  const [busqueda, setBusqueda] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('fecha')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const safeGuardias = Array.isArray(guardias) ? guardias : []
  const empMap = useMemo(
    () => Object.fromEntries(empleados.map((e) => [e.id, e.nombre])),
    [empleados]
  )

  const getNombre = useMemo(
    () => (g: Guardia) => g.empleadoNombre ?? empMap[g.empleadoId] ?? g.empleadoId ?? '',
    [empMap]
  )

  const filtradas = useMemo(() => {
    const mesStr = String(mes + 1).padStart(2, '0')
    const prefix = `${anio}-${mesStr}`
    return safeGuardias
      .filter((g) => g.fecha?.startsWith(prefix))
      .filter((g) => getNombre(g).toLowerCase().includes(busqueda.toLowerCase()))
  }, [safeGuardias, mes, anio, busqueda, getNombre])

  const ordenadas = useMemo(() => {
    return [...filtradas].sort((a, b) => {
      let va: string | number, vb: string | number
      if (sortKey === 'empleadoNombre') { va = getNombre(a); vb = getNombre(b) }
      else { va = a[sortKey]; vb = b[sortKey] }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filtradas, sortKey, sortDir, getNombre])

  const totalHoras = filtradas.reduce((a, g) => a + g.horas, 0)
  const totalMonto = filtradas.reduce((a, g) => a + g.monto, 0)

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function prevMes() {
    if (mes === 0) { setMes(11); setAnio((y) => y - 1) }
    else setMes((m) => m - 1)
  }
  function nextMes() {
    if (mes === 11) { setMes(0); setAnio((y) => y + 1) }
    else setMes((m) => m + 1)
  }

  const sortIcon = (key: SortKey) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  return (
    <div>
      {/* Month navigator */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={prevMes} className="p-1 rounded hover:bg-[#F0F0F0]"><ChevronLeft size={18} /></button>
        <span className="font-semibold text-[#0D0D0D] w-36 text-center">{MESES[mes]} {anio}</span>
        <button onClick={nextMes} className="p-1 rounded hover:bg-[#F0F0F0]"><ChevronRight size={18} /></button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <KpiCard icon={<Shield size={20} className="text-[#E42313]" />} label="Guardias en el mes" value={String(filtradas.length)} iconBg="bg-red-50" />
        <KpiCard icon={<Clock size={20} className="text-blue-600" />} label="Horas totales" value={String(totalHoras)} iconBg="bg-blue-50" />
        <KpiCard icon={<DollarSign size={20} className="text-[#E42313]" />} label="Costo total" value={`$${formatARS(totalMonto)}`} iconBg="bg-red-50" />
        <KpiCard icon={<UserX size={20} className="text-yellow-600" />} label="Empleados distintos" value={String(new Set(filtradas.map((g) => g.empleadoId)).size)} iconBg="bg-yellow-50" />
      </div>

      {/* Search filter */}
      <div className="mb-4">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Filtrar por nombre de guardia…"
          className="w-full max-w-xs border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#E42313]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#E8E8E8]">
              {([['empleadoNombre', 'Guardia'], ['fecha', 'Fecha'], ['horas', 'Horas'], ['monto', 'Monto']] as [SortKey, string][]).map(([key, label]) => (
                <th
                  key={key}
                  onClick={() => toggleSort(key)}
                  className="text-left px-4 py-3 text-xs font-semibold text-[#7A7A7A] uppercase tracking-wide cursor-pointer select-none hover:text-[#0D0D0D]"
                >
                  {label}{sortIcon(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ordenadas.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-[#7A7A7A]">Sin guardias en {MESES[mes]} {anio}</td></tr>
            ) : ordenadas.map((g) => (
              <tr key={g.id} className="border-b border-[#E8E8E8] hover:bg-[#FAFAFA]">
                <td className="px-4 py-3 font-medium">{getNombre(g)}</td>
                <td className="px-4 py-3 text-[#7A7A7A]">{g.fecha}</td>
                <td className="px-4 py-3">{g.horas}h</td>
                <td className="px-4 py-3 font-semibold">${formatARS(g.monto)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
