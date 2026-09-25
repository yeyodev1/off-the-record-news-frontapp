import APIBase from './httpBase'
import type { Edition, Subscriber } from '@/types'

export interface SubscribePayload {
  email: string
  name?: string
  plan: 'newsletter' | 'pro'
  editions: Edition[]
  company?: string
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
