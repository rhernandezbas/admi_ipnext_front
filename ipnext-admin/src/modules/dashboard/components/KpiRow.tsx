import { DollarSign, Clock, Building2, Users } from 'lucide-react'
import { KpiCard } from '@/components/ui/KpiCard'
import type { Kpi } from '@/types/dashboard.types'

const icons = [
  <DollarSign size={20} className="text-[#E42313]" />,
  <Clock size={20} className="text-yellow-600" />,
  <Building2 size={20} className="text-blue-600" />,
  <Users size={20} className="text-green-600" />,
]

export function KpiRow({ kpis }: { kpis: Kpi[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <KpiCard
          key={kpi.id}
          icon={icons[i]}
          label={kpi.label}
          value={kpi.value}
          subtitle={kpi.subtitle}
          iconBg={kpi.iconBg}
        />
      ))}
    </div>
  )
}
