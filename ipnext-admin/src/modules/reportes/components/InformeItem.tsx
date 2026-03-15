import { FileText, FileSpreadsheet, Send } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { InformeItem as InformeItemType } from '@/types/reporte.types'

interface Props {
  informe: InformeItemType
  selected: boolean
  onSelect: () => void
}

export function InformeItem({ informe, selected, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${selected ? 'border-[#E42313] bg-red-50' : 'border-[#E8E8E8] hover:border-[#E42313]'}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#0D0D0D] text-sm">{informe.nombre}</p>
          <p className="text-xs text-[#7A7A7A] mt-0.5">{informe.descripcion}</p>
          <p className="text-xs text-[#7A7A7A] mt-1">Última generación: {informe.ultimaGeneracion}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
        <Button variant="secondary" className="text-xs py-1 px-2"><FileText size={13} />PDF</Button>
        <Button variant="secondary" className="text-xs py-1 px-2"><FileSpreadsheet size={13} />XLS</Button>
        <Button variant="ghost" className="text-xs py-1 px-2"><Send size={13} />Enviar</Button>
      </div>
    </div>
  )
}
