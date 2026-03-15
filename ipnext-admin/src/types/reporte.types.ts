export interface InformeItem {
  id: string
  nombre: string
  descripcion: string
  categoria: string
  ultimaGeneracion: string
}

export interface ReportePreviewData {
  titulo: string
  kpis: { label: string; value: string }[]
  chartData: { name: string; value: number }[]
}
