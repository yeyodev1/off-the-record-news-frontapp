const dateTime = new Intl.DateTimeFormat('es-EC', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
})

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return '—'
  return dateTime.format(new Date(value))
}

/** "hace 5 min": en una cola de revisión importa más la frescura que la hora. */
export function timeAgo(value: string | null | undefined): string {
  if (!value) return '—'
  const diff = Math.round((Date.now() - new Date(value).getTime()) / 60000)
  if (diff < 1) return 'recién'
  if (diff < 60) return `hace ${diff} min`
  const hours = Math.round(diff / 60)
  if (hours < 24) return `hace ${hours} h`
  const days = Math.round(hours / 24)
  return days === 1 ? 'ayer' : `hace ${days} días`
}

export function duration(start: string, end: string | null): string {
  if (!end) return '—'
  const seconds = Math.max(
    0,
    Math.round((new Date(end).getTime() - new Date(start).getTime()) / 1000),
  )
  if (seconds < 60) return `${seconds} s`
  return `${Math.floor(seconds / 60)} min ${seconds % 60} s`
}

/** Fecha YYYY-MM-DD para inputs type=date. */
export function toInputDate(value: string | Date): string {
  const d = typeof value === 'string' ? new Date(value) : value
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
