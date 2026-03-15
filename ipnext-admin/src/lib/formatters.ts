/** Formatea un número como moneda ARS. Devuelve '0' si el valor no es un número válido. */
export function formatARS(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : n.toLocaleString('es-AR')
}

/** Formatea como millones: "1.5M" */
export function formatMillones(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : `${(n / 1_000_000).toFixed(1)}M`
}

/** Formatea como miles: "45K" */
export function formatMiles(value: number | string | undefined | null): string {
  const n = Number(value ?? 0)
  return isNaN(n) ? '0' : `${(n / 1_000).toFixed(0)}K`
}

/** Formatea una fecha ISO 8601 como DD/MM/YYYY. Devuelve '—' si el valor es vacío/nulo. */
export function formatFecha(value: string | null | undefined): string {
  if (!value) return '—'
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
