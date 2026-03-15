import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-[#E42313] text-white hover:bg-[#c71e10] border border-[#E42313]',
  secondary: 'bg-white text-[#0D0D0D] border border-[#E8E8E8] hover:border-[#E42313] hover:text-[#E42313]',
  ghost: 'bg-transparent text-[#7A7A7A] border border-transparent hover:bg-gray-100',
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
