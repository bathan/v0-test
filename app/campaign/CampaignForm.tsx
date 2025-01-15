'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface CampaignFormData {
  id?: string
  campaign_description_en: string
  campaign_description_es: string
  country_id: string
  campaign_start_date: string
  campaign_end_date: string
  campaign_prefix: string
}

interface CampaignFormProps {
  initialData?: CampaignFormData
  onSubmit: (data: CampaignFormData) => void
  submitButtonText: string
}

export function CampaignForm({
  initialData,
  onSubmit,
  submitButtonText
}: CampaignFormProps) {
  const [formState, setFormState] = useState<CampaignFormData>({
    campaign_description_en: '',
    campaign_description_es: '',
    country_id: '',
    campaign_start_date: '',
    campaign_end_date: '',
    campaign_prefix: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormState(initialData)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isEditOperation = initialData && initialData.id
    const submissionData = isEditOperation
      ? { ...formState, id: initialData.id }
      : formState
    onSubmit(submissionData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="campaign_description_en">Description (EN)</Label>
        <Input
          id="campaign_description_en"
          value={formState.campaign_description_en}
          onChange={(e) =>
            setFormState({
              ...formState,
              campaign_description_en: e.target.value
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="campaign_description_es">Description (ES)</Label>
        <Input
          id="campaign_description_es"
          value={formState.campaign_description_es}
          onChange={(e) =>
            setFormState({
              ...formState,
              campaign_description_es: e.target.value
            })
          }
        />
      </div>
      <div>
        <Label htmlFor="country_id">Country ID</Label>
        <Input
          id="country_id"
          type="number"
          value={formState.country_id}
          onChange={(e) =>
            setFormState({ ...formState, country_id: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="campaign_start_date">Start Date</Label>
        <Input
          id="campaign_start_date"
          type="date"
          value={formState.campaign_start_date}
          onChange={(e) =>
            setFormState({ ...formState, campaign_start_date: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="campaign_end_date">End Date</Label>
        <Input
          id="campaign_end_date"
          type="date"
          value={formState.campaign_end_date}
          onChange={(e) =>
            setFormState({ ...formState, campaign_end_date: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="campaign_prefix">Prefix</Label>
        <Input
          id="campaign_prefix"
          value={formState.campaign_prefix}
          onChange={(e) =>
            setFormState({ ...formState, campaign_prefix: e.target.value })
          }
        />
      </div>
      <Button type="submit">{submitButtonText}</Button>
    </form>
  )
}
