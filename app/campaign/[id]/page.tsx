'use client'

import { useQuery, gql } from '@apollo/client'
import { useParams } from 'next/navigation'
import Link from 'next/link'

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

export default function CampaignDetail() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_CAMPAIGN, {
    variables: { id: parseInt(id as string) }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const campaign = data?.campaign

  if (!campaign) return <p>Campaign not found</p>

  return (
    <div>
      <h1>Campaign Detail</h1>
      <p>ID: {campaign.campaign_id}</p>
      <p>Description (EN): {campaign.campaign_description_en}</p>
      <p>Description (ES): {campaign.campaign_description_es}</p>
      <p>Country ID: {campaign.country_id}</p>
      <p>
        Start Date:{' '}
        {new Date(campaign.campaign_start_date).toLocaleDateString()}
      </p>
      <p>
        End Date: {new Date(campaign.campaign_end_date).toLocaleDateString()}
      </p>
      <p>Prefix: {campaign.campaign_prefix}</p>
      <Link href={`/campaign/${campaign.campaign_id}/edit`}>Edit</Link>
      <Link href="/campaign">Back to List</Link>
    </div>
  )
}
