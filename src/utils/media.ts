import { ui } from '@/config/site'
import type { ArticleImage } from '@/types'

/**
 * Tres lenguajes visuales (OTR-especificacion-tres-lenguajes-visuales): la foto
 * genérica (fachada, hemiciclo vacío, logo) no se muestra; la nota cae a sus
 * cifras o a la ficha tipográfica. Una foto sin valorar todavía se ve como antes.
 */
export function visibleImage(image: ArticleImage | null | undefined): ArticleImage | null {
  return image?.url && image.editorial !== 'generica' ? image : null
}

/** Pie con la naturaleza de la imagen: "Foto: Primicias", "Archivo · Foto: …", "Gráfico: …". */
export function imageCredit(image: ArticleImage | null): string {
  if (!image) return ''
  const kind = image.editorial === 'grafico' ? ui.home.chart : ui.home.photo
  const who = image.sourceName || image.credit.replace(/^[^:]+:\s*/, '')
  const credit = who ? `${kind}: ${who}` : image.credit
  return image.editorial === 'archivo' ? `${ui.home.archive.toUpperCase()} · ${credit}` : credit
}
