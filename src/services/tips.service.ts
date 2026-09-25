import APIBase from './httpBase'

export interface TipPayload {
  name?: string
  contact?: string
  text: string
}

class TipsService extends APIBase {
  async send(payload: TipPayload): Promise<{ message: string }> {
    const { data } = await this.post<{ message: string }>('tips', payload)
    return data
  }
}

export const tipsService = new TipsService()
