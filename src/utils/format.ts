const money = new Intl.NumberFormat('es-EC', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export function formatMoney(value: number): string {
  return money.format(value)
}

const date = new Intl.DateTimeFormat('es-EC', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function formatDate(value: string | Date): string {
  return date.format(typeof value === 'string' ? new Date(value) : value)
}

const dateLong = new Intl.DateTimeFormat('es-EC', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Guayaquil',
})

/** "24 de septiembre de 2026, 10:30" — para la cabecera de una nota. */
export function formatDateTime(value: string | Date): string {
  return dateLong.format(typeof value === 'string' ? new Date(value) : value)
}

const today = new Intl.DateTimeFormat('es-EC', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'America/Guayaquil',
})

/** "miércoles, 24 de septiembre" — fecha de portada, como en un diario. */
export function formatToday(value: Date = new Date()): string {
  return today.format(value)
}

const relative = new Intl.RelativeTimeFormat('es-EC', { numeric: 'auto' })

/**
 * "hace 5 min", "hace 3 h", "ayer". Pasada una semana la fecha absoluta dice
 * más que un "hace 12 días".
 */
export function formatRelative(value: string | Date | null | undefined): string {
  if (!value) return ''
  const time = typeof value === 'string' ? new Date(value) : value
  const diff = (time.getTime() - Date.now()) / 1000
  const abs = Math.abs(diff)

  if (abs < 60) return 'hace un momento'
  if (abs < 3600) return `hace ${Math.round(abs / 60)} min`
  if (abs < 86400) return `hace ${Math.round(abs / 3600)} h`
  if (abs < 604800) return relative.format(Math.round(diff / 86400), 'day')
  return formatDate(time)
}
