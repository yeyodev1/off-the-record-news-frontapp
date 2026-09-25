import type { ArticleSource } from '@/types'

export interface SourceItem {
  url: string
  summary: string
}

export interface SourceGroup {
  name: string
  domain: string
  items: SourceItem[]
}

function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/**
 * Un medio por bloque: si la nota cita dos artículos de Teleamazonas, se muestra
 * "Teleamazonas" una vez con lo que dice cada uno, no el mismo nombre repetido.
 */
export function groupSources(sources: ArticleSource[]): SourceGroup[] {
  const groups = new Map<string, SourceGroup>()
  for (const source of sources) {
    const name = source.name.trim()
    if (!name) continue
    const key = name.toLowerCase()
    const group = groups.get(key) ?? { name, domain: '', items: [] }
    const url = source.url?.trim() ?? ''
    if (!group.items.some((i) => i.url === url)) {
      group.items.push({ url, summary: source.summary?.trim() ?? '' })
    }
    if (!group.domain && url) group.domain = domainOf(url)
    groups.set(key, group)
  }
  return [...groups.values()]
}
