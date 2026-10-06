import type { ArticleSource, ReadingMode, Stance } from '@/types'

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

type StanceBucket = Exclude<Stance, 'no_aplica' | ''>

export interface PartyBlock {
  stance: StanceBucket
  groups: SourceGroup[]
}

// Qué orilla abre "Lo que dicen las partes" en cada modo. Todas se muestran siempre;
// el modo solo decide cuál va primero (§3 del spec).
const STANCE_ORDER: Record<ReadingMode, StanceBucket[]> = {
  noboista: ['oficialista', 'opositora', 'correista', 'institucional', 'neutral'],
  correista: ['correista', 'opositora', 'oficialista', 'institucional', 'neutral'],
  anti_ambos: ['institucional', 'neutral', 'oficialista', 'opositora', 'correista'],
  independiente: ['oficialista', 'opositora', 'correista', 'institucional', 'neutral'],
}

function bucketOf(stance: Stance | undefined): StanceBucket {
  if (!stance || stance === 'no_aplica') return 'neutral'
  return stance
}

/**
 * Fuentes agrupadas por postura y ordenadas según el modo. Devuelve null si la
 * mesa todavía no valoró ninguna postura: la nota se ve como siempre.
 */
export function partiesFor(sources: ArticleSource[], mode: ReadingMode): PartyBlock[] | null {
  const hasStance = sources.some((s) => s.stance && s.stance !== 'no_aplica' && s.stance !== 'neutral')
  if (!hasStance) return null
  return STANCE_ORDER[mode]
    .map((stance) => ({
      stance,
      groups: groupSources(sources.filter((s) => bucketOf(s.stance) === stance)),
    }))
    .filter((block) => block.groups.length > 0)
}
