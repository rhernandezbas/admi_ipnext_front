import { Bell } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface TopBarProps {
  title: string
}

export function TopBar({ title }: TopBarProps) {
  const period = format(new Date(), 'MMMM yyyy', { locale: es })

  return (
    <header className="h-16 bg-white border-b border-[#E8E8E8] flex items-center justify-between px-8 flex-shrink-0">
      <h2 className="text-lg font-semibold text-[#0D0D0D]">{title}</h2>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#7A7A7A] bg-[#FAFAFA] border border-[#E8E8E8] px-3 py-1 rounded-full capitalize">
          {period}
        </span>
        <button className="text-[#7A7A7A] hover:text-[#0D0D0D] cursor-pointer">
          <Bell size={20} />
        </button>
      </div>
    </header>
  )
}
