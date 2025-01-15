'use client'

import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useRouter } from 'next/navigation'

const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($input: CreateCampaignInput!) {
    createCampaign(createCampaignInput: $input) {
      campaign_id
      campaign_description_en
      campaign_description_es
      country_id
      campaign_start_date
      campaign_end_date
      campaign_prefix
    }
  }
`

export default function CreateCampaign() {
  const [formState, setFormState] = useState({
    campaign_description_en: '',
    campaign_description_es: '',
    country_id: '',
    campaign_start_date: '',
    campaign_end_date: '',
    campaign_prefix: ''
  })

  const [createCampaign, { error }] = useMutation(CREATE_CAMPAIGN)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createCampaign({
        variables: {
          input: {
            ...formState,
            country_id: parseInt(formState.country_id)
          }
        }
      })
      router.push('/campaign')
    } catch (error) {
      console.error('Error creating campaign:', error)
    }
  }

  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Create Campaign</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description (EN)"
          value={formState.campaign_description_en}
          onChange={(e) =>
            setFormState({
              ...formState,
              campaign_description_en: e.target.value
            })
          }
        />
        <input
          type="text"
          placeholder="Description (ES)"
          value={formState.campaign_description_es}
          onChange={(e) =>
            setFormState({
              ...formState,
              campaign_description_es: e.target.value
            })
          }
        />
        <input
          type="number"
          placeholder="Country ID"
          value={formState.country_id}
          onChange={(e) =>
            setFormState({ ...formState, country_id: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="Start Date"
          value={formState.campaign_start_date}
          onChange={(e) =>
            setFormState({ ...formState, campaign_start_date: e.target.value })
          }
        />
        <input
          type="date"
          placeholder="End Date"
          value={formState.campaign_end_date}
          onChange={(e) =>
            setFormState({ ...formState, campaign_end_date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Prefix"
          value={formState.campaign_prefix}
          onChange={(e) =>
            setFormState({ ...formState, campaign_prefix: e.target.value })
          }
        />
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  )
}
