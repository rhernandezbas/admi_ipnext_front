import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameMonth } from 'date-fns'
import { es } from 'date-fns/locale'
import type { CalendarioDia, TransferenciaEstado } from '@/types/transferencia.types'
import { formatARS } from '@/lib/formatters'

const estadoChipColor: Record<TransferenciaEstado, string> = {
  vencido: 'bg-[#FEE2E2] text-[#E42313]',
  pendiente: 'bg-[#FEF9C3] text-[#CA8A04]',
  programado: 'bg-[#DCFCE7] text-[#16A34A]',
  pagado: 'bg-[#DCFCE7] text-[#16A34A]',
  en_proceso: 'bg-[#DBEAFE] text-[#2563EB]',
}

interface Props {
  dias: CalendarioDia[]
}

export function CalendarioView({ dias }: Props) {
  const safeDias = Array.isArray(dias) ? dias : []
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const startPad = getDay(monthStart) === 0 ? 6 : getDay(monthStart) - 1

  const diasMap = new Map(safeDias.map((d) => [d.fecha, d]))

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))

  const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1.5 rounded hover:bg-[#FAFAFA] cursor-pointer"><ChevronLeft size={18} /></button>
        <h3 className="font-semibold text-[#0D0D0D] capitalize">
          {format(currentDate, 'MMMM yyyy', { locale: es })}
        </h3>
        <button onClick={nextMonth} className="p-1.5 rounded hover:bg-[#FAFAFA] cursor-pointer"><ChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-px bg-[#E8E8E8] border border-[#E8E8E8] rounded-lg overflow-hidden">
        {weekDays.map((d) => (
          <div key={d} className="bg-[#FAFAFA] px-2 py-2 text-xs font-semibold text-[#7A7A7A] text-center">{d}</div>
        ))}
        {Array.from({ length: startPad }).map((_, i) => (
          <div key={`pad-${i}`} className="bg-white min-h-24" />
        ))}
        {daysInMonth.map((day) => {
          const key = format(day, 'yyyy-MM-dd')
          const diaData = diasMap.get(key)
          const isToday = key === format(new Date(), 'yyyy-MM-dd')
          return (
            <div key={key} className={`bg-white p-2 min-h-24 ${!isSameMonth(day, currentDate) ? 'opacity-40' : ''}`}>
              <span className={`text-xs font-medium inline-block w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-[#E42313] text-white' : 'text-[#7A7A7A]'}`}>
                {format(day, 'd')}
              </span>
              <div className="mt-1 flex flex-col gap-0.5">
                {diaData?.pagos.map((p) => (
                  <div key={p.id} className={`text-xs px-1.5 py-0.5 rounded truncate ${estadoChipColor[p.estado]}`}>
                    {p.beneficiario} ${formatARS(p.monto)}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
