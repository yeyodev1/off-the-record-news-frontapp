import APIBase from './httpBase'
import type { Edition, ReadingMode, Subscriber } from '@/types'

export interface SubscribePayload {
  email: string
  name?: string
  plan: 'newsletter' | 'pro'
  editions: Edition[]
  company?: string
  /** Consentimiento separado para guardar el modo (dato sensible, §6). */
  modeConsent?: boolean
  readingMode?: ReadingMode
}

class SubscribersService extends APIBase {
  async subscribe(payload: SubscribePayload): Promise<{ subscriber: Subscriber; message: string }> {
    const { data } = await this.post<{ subscriber: Subscriber; message: string }>('subscribers', payload)
    return data
  }

  async unsubscribe(token: string): Promise<{ message: string }> {
    const { data } = await this.get<{ message: string }>(
      `subscribers/unsubscribe/${encodeURIComponent(token)}`,
    )
    return data
  }
}

export const subscribersService = new SubscribersService()
