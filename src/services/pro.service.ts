import APIBase from './httpBase'
import type { ProLead, ProPlan, ProTeasersFeed } from '@/types'

export interface ProLeadInput {
  name: string
  email: string
  company: string
  role?: string
  phone?: string
  plan: ProPlan
  wantsMeeting: boolean
  message?: string
}

class ProService extends APIBase {
  /** Tráileres de notas PRO para la portada. Solo titular y "Por qué importa". */
  async teasers(): Promise<ProTeasersFeed> {
    const { data } = await this.get<ProTeasersFeed>('pro/teasers')
    return data
  }

  async lead(body: ProLeadInput): Promise<{ lead: ProLead; message: string }> {
    const { data } = await this.post<{ lead: ProLead; message: string }>('pro/leads', body)
    return data
  }
}

export const proService = new ProService()
