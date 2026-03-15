import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[#0D0D0D]">{label}</label>}
      <input
        className={`border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm text-[#0D0D0D] outline-none focus:border-[#E42313] focus:ring-1 focus:ring-[#E42313] transition-colors ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
