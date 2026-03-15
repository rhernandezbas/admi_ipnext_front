interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-12 h-12 text-base',
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initials = name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={`${sizeClasses[size]} rounded-full bg-[#E42313] text-white flex items-center justify-center font-semibold overflow-hidden flex-shrink-0`}>
      {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
    </div>
  )
}
