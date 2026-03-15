import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-[#0D0D0D]">{label}</label>}
      <textarea
        className={`border border-[#E8E8E8] rounded-lg px-3 py-2 text-sm text-[#0D0D0D] outline-none focus:border-[#E42313] focus:ring-1 focus:ring-[#E42313] transition-colors resize-none ${error ? 'border-red-500' : ''} ${className}`}
        rows={3}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
