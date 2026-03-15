import { DollarSign, Building2, FileText, Users } from 'lucide-react'
import type { ActivityItem } from '@/types/dashboard.types'

const iconMap = {
  payment: <DollarSign size={16} className="text-[#E42313]" />,
  provider: <Building2 size={16} className="text-blue-600" />,
  invoice: <FileText size={16} className="text-yellow-600" />,
  payroll: <Users size={16} className="text-green-600" />,
}

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E8E8E8] flex items-center justify-center flex-shrink-0">
            {iconMap[item.type]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#0D0D0D]">{item.action}</p>
            <p className="text-sm text-[#7A7A7A]">{item.detail}</p>
          </div>
          <span className="text-xs text-[#7A7A7A] flex-shrink-0">{item.time}</span>
        </div>
      ))}
    </div>
  )
}
