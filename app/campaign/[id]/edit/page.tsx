'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, gql } from '@apollo/client'
import { useParams, useRouter } from 'next/navigation'

const GET_CAMPAIGN = gql`
  query GetCampaign($id: Int!) {
    campaign(campaign_id: $id) {
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

const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign($id: Int!, $input: UpdateCampaignInput!) {
    updateCampaign(campaign_id: $id, updateCampaignInput: $input) {
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

export default function EditCampaign() {
  const { id } = useParams()
  const router = useRouter()
  const [formState, setFormState] = useState({
    campaign_description_en: '',
    campaign_description_es: '',
    country_id: '',
    campaign_start_date: '',
    campaign_end_date: '',
    campaign_prefix: ''
  })

  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { id: parseInt(id as string) }
  })

  const [updateCampaign] = useMutation(UPDATE_CAMPAIGN)

  useEffect(() => {
    if (data && data.campaign) {
      setFormState({
        campaign_description_en: data.campaign.campaign_description_en,
        campaign_description_es: data.campaign.campaign_description_es,
        country_id: data.campaign.country_id.toString(),
        campaign_start_date: data.campaign.campaign_start_date.split('T')[0],
        campaign_end_date: data.campaign.campaign_end_date.split('T')[0],
        campaign_prefix: data.campaign.campaign_prefix
      })
    }
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateCampaign({
        variables: {
          id: parseInt(id as string),
          input: {
            ...formState,
            country_id: parseInt(formState.country_id)
          }
        }
      })
      router.push('/campaign')
    } catch (error) {
      console.error('Error updating campaign:', error)
    }
  }

  return (
    <div>
      <h1>Edit Campaign</h1>
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
        <button type="submit">Update Campaign</button>
      </form>
    </div>
  )
}
