import type { ArticleSource } from '@/types'

export interface SourceGroup {
  name: string
  domain: string
  urls: string[]
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Un medio por fila: si la nota cita dos artículos de Teleamazonas, se muestra
 * "Teleamazonas" una vez con sus dos enlaces, no el mismo nombre repetido.
 */
export function groupSources(sources: ArticleSource[]): SourceGroup[] {
  const groups = new Map<string, SourceGroup>()
  for (const source of sources) {
    const name = source.name.trim()
    if (!name) continue
    const key = name.toLowerCase()
    const group = groups.get(key) ?? { name, domain: '', urls: [] }
    const url = source.url?.trim()
    if (url && !group.urls.includes(url)) group.urls.push(url)
    if (!group.domain && url) group.domain = domainOf(url)
    groups.set(key, group)
  }
  return [...groups.values()]
}
