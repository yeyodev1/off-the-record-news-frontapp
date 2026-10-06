import APIBase from './httpBase'
import type { ReadingMode } from '@/types'

/** Métricas anónimas: el modo viaja solo, sin nada que identifique al lector. */
class MetricsService extends APIBase {
  async mode(modo: ReadingMode, event: 'elegir' | 'cambiar'): Promise<void> {
    await this.post('metrics/mode', { modo, event }, { 'Content-Type': 'application/json' })
  }
}

export const metricsService = new MetricsService()
