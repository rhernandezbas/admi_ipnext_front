import type { ReactNode } from 'react'

interface KpiCardProps {
  icon: ReactNode
  label: string
  value: string
  subtitle?: string
  iconBg?: string
}

export function KpiCard({ icon, label, value, subtitle, iconBg = 'bg-red-50' }: KpiCardProps) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-xl p-5 flex items-start gap-4">
      <div className={`${iconBg} p-3 rounded-lg`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-[#7A7A7A]">{label}</p>
        <p className="text-[28px] font-semibold font-[Space_Grotesk] leading-tight text-[#0D0D0D]">{value}</p>
        {subtitle && <p className="text-xs text-[#7A7A7A] mt-0.5">{subtitle}</p>}
      </div>
    </div>
  )
}
