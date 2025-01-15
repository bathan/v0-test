'use client'

import { useState } from 'react'
import ItemList from '@/components/ItemList'
import { SidePane } from '@/components/SidePane'
import CreateCampaignForm from './CreateCampaignForm'
import EditCampaignForm from './EditCampaignForm'
import { Button } from '@/components/ui/button'

// Mock data
const initialCampaigns = [
  {
    id: 1,
    campaign_description_en: 'Summer Campaign 2023',
    campaign_start_date: '2023-06-01',
    campaign_end_date: '2023-08-31',
    campaign_prefix: 'SC23'
  },
  {
    id: 2,
    campaign_description_en: 'Winter Campaign 2023',
    campaign_start_date: '2023-12-01',
    campaign_end_date: '2024-02-29',
    campaign_prefix: 'WC23'
  }
]

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editCampaignId, setEditCampaignId] = useState<number | null>(null)

  const handleCreateClick = () => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }

  const handleEditClick = (id: number) => {
    setEditCampaignId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }

  const handleSidePaneClose = () => {
    setSidePaneOpen(false)
    setEditCampaignId(null)
  }

  const handleCreateSuccess = (newCampaign: any) => {
    setCampaigns([...campaigns, { ...newCampaign, id: campaigns.length + 1 }])
    handleSidePaneClose()
  }

  const handleEditSuccess = (updatedCampaign: any) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    )
    handleSidePaneClose()
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Campaign
      </Button>
      <ItemList
        items={campaigns}
        fields={[
          'id',
          'campaign_description_en',
          'campaign_start_date',
          'campaign_end_date',
          'campaign_prefix'
        ]}
        modelName="Campaign"
        onEditClick={handleEditClick}
      />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={
          sidePaneContent === 'create' ? 'Create Campaign' : 'Edit Campaign'
        }
      >
        {sidePaneContent === 'create' ? (
          <CreateCampaignForm onSuccess={handleCreateSuccess} />
        ) : (
          <EditCampaignForm
            campaignId={editCampaignId!}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
