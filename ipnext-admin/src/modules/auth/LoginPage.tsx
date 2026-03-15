import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    setError('')
    login(email, password)
      .then((ok) => {
        if (ok) navigate('/', { replace: true })
        else setError('Credenciales inválidas')
      })
      .catch(() => setError('Error de conexión'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
      <div className="bg-white border border-[#E8E8E8] rounded-2xl p-8 w-full max-w-sm shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-[#E42313] rounded-lg" />
          <span className="font-semibold text-xl text-[#0D0D0D]" style={{ fontFamily: 'Space Grotesk' }}>IPNEXT</span>
        </div>
        <h1 className="text-xl font-semibold text-[#0D0D0D] mb-1">Iniciar sesión</h1>
        <p className="text-sm text-[#7A7A7A] mb-6">Ingresá tus credenciales para continuar</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@ipnext.com" />
          <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full justify-center mt-2" disabled={loading}>{loading ? 'Ingresando…' : 'Ingresar'}</Button>
        </form>
      </div>
    </div>
  )
}
