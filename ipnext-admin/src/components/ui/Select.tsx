import type { SelectHTMLAttributes } from 'react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
}

export function Select({ label, options, error, className = '', ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[#0D0D0D]">{label}</label>}
      <select
        className={`border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm text-[#0D0D0D] outline-none focus:border-[#E42313] focus:ring-1 focus:ring-[#E42313] bg-white transition-colors ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
