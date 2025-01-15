'use client'

import { useEffect, useState } from 'react'
import { CampaignForm } from './CampaignForm'

interface EditCampaignFormProps {
  campaignId: number
  onSuccess: () => void
}

export default function EditCampaignForm({
  campaignId,
  onSuccess
}: EditCampaignFormProps) {
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    // Simulating API call with a timeout
    const fetchCampaign = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const mockCampaignData = {
        campaign_description_en: 'Mock Campaign',
        campaign_description_es: 'Campaña de prueba',
        country_id: '1',
        campaign_start_date: '2023-01-01',
        campaign_end_date: '2023-12-31',
        campaign_prefix: 'MC'
      }
      setInitialData(mockCampaignData)
    }
    fetchCampaign()
  }, [campaignId])

  const handleSubmit = async (formData: any) => {
    // Simulating API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Updating campaign:', campaignId, formData)
    onSuccess()
  }

  if (!initialData) {
    return <p>Loading...</p>
  }

  return (
    <CampaignForm
      initialData={initialData}
      onSubmit={handleSubmit}
      submitButtonText="Update Campaign"
    />
  )
}
