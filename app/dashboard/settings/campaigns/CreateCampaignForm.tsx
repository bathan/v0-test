'use client'

import { CampaignForm } from './CampaignForm'

interface CreateCampaignFormProps {
  onSuccess: (newCampaign: any) => void
}

export default function CreateCampaignForm({
  onSuccess
}: CreateCampaignFormProps) {
  const handleSubmit = async (formData: any) => {
    // Simulating API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Creating campaign:', formData)
    onSuccess(formData)
  }

  return (
    <CampaignForm onSubmit={handleSubmit} submitButtonText="Create Campaign" />
  )
}
