'use client'

import { CampaignForm } from './CampaignForm'

interface CreateCampaignFormProps {
  onSuccess: () => void
}

export default function CreateCampaignForm({
  onSuccess
}: CreateCampaignFormProps) {
  const handleSubmit = async (formData: any) => {
    // Simulating API call with a timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Creating campaign:', formData)
    onSuccess()
  }

  return (
    <CampaignForm onSubmit={handleSubmit} submitButtonText="Create Campaign" />
  )
}
