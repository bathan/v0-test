'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { TrialForm } from './TrialForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Trial {
  trial_id: number
  campaign_id: number
  crop_id: number
  country_id: number
  state_id: number
  location_id: number
  trial_latitude: number
  trial_longitude: number
  trial_planting_date: string
  trial_harvest_date: string | null
  trial_plowing: string
  trial_insecticide: string | null
  trial_developer_user_id: number
  trial_predecessor_crop_id: number
  trial_irrigation: string | null
  producer_id: number
  trial_manual_calculation_enabled: boolean
  trial_comments: string | null
  created_at: string
  updated_at: string
}

const columns: ColumnDef<Trial>[] = [
  {
    accessorKey: 'trial_id',
    header: 'ID'
  },
  {
    accessorKey: 'campaign_id',
    header: 'Campaign ID'
  },
  {
    accessorKey: 'crop_id',
    header: 'Crop ID'
  },
  {
    accessorKey: 'trial_planting_date',
    header: 'Planting Date',
    cell: ({ row }) => {
      return new Date(row.getValue('trial_planting_date')).toLocaleDateString()
    }
  },
  {
    accessorKey: 'trial_harvest_date',
    header: 'Harvest Date',
    cell: ({ row }) => {
      const harvestDate = row.getValue('trial_harvest_date')
      return harvestDate
        ? new Date(harvestDate as string).toLocaleDateString()
        : 'N/A'
    }
  },
  {
    accessorKey: 'producer_id',
    header: 'Producer ID'
  },
  {
    accessorKey: 'created_at',
    header: 'Created At',
    cell: ({ row }) => {
      return new Date(row.getValue('created_at')).toLocaleDateString()
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const trial = row.original
      return (
        <Button onClick={() => handleEditClick(trial.trial_id)}>Edit</Button>
      )
    }
  }
]

// Mock data
const initialTrials: Trial[] = [
  {
    trial_id: 1,
    campaign_id: 1,
    crop_id: 1,
    country_id: 1,
    state_id: 1,
    location_id: 1,
    trial_latitude: 40.7128,
    trial_longitude: -74.006,
    trial_planting_date: '2023-03-15T00:00:00Z',
    trial_harvest_date: '2023-09-15T00:00:00Z',
    trial_plowing: 'CONVENTIONAL',
    trial_insecticide: 'Organic',
    trial_developer_user_id: 1,
    trial_predecessor_crop_id: 2,
    trial_irrigation: 'Drip',
    producer_id: 1,
    trial_manual_calculation_enabled: false,
    trial_comments: 'Updated comment for the first trial', // Updated comment
    created_at: '2023-03-01T00:00:00Z',
    updated_at: '2023-03-01T00:00:00Z'
  },
  {
    trial_id: 2,
    campaign_id: 2,
    crop_id: 2,
    country_id: 2,
    state_id: 2,
    location_id: 2,
    trial_latitude: 34.0522,
    trial_longitude: -118.2437,
    trial_planting_date: '2023-04-01T00:00:00Z',
    trial_harvest_date: null,
    trial_plowing: 'NO_TILL',
    trial_insecticide: null,
    trial_developer_user_id: 2,
    trial_predecessor_crop_id: 3,
    trial_irrigation: 'Sprinkler',
    producer_id: 2,
    trial_manual_calculation_enabled: true,
    trial_comments: 'Experimental no-till method',
    created_at: '2023-03-15T00:00:00Z',
    updated_at: '2023-03-15T00:00:00Z'
  }
]

export default function TrialList() {
  const [trials, setTrials] = useState<Trial[]>(initialTrials)
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editTrialId, setEditTrialId] = useState<number | null>(null)

  const handleCreateClick = () => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }

  const handleEditClick = (id: number) => {
    setEditTrialId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }

  const handleSidePaneClose = () => {
    setSidePaneOpen(false)
    setEditTrialId(null)
  }

  const handleCreateSuccess = (newTrial: Trial) => {
    setTrials([...trials, { ...newTrial, trial_id: trials.length + 1 }])
    handleSidePaneClose()
  }

  const handleEditSuccess = (updatedTrial: Trial) => {
    setTrials(
      trials.map((trial) =>
        trial.trial_id === updatedTrial.trial_id ? updatedTrial : trial
      )
    )
    handleSidePaneClose()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Trials</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Trial
      </Button>
      <DataTable columns={columns} data={trials} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={sidePaneContent === 'create' ? 'Create Trial' : 'Edit Trial'}
      >
        {sidePaneContent === 'create' ? (
          <TrialForm onSuccess={handleCreateSuccess} />
        ) : (
          <TrialForm
            initialData={trials.find((trial) => trial.trial_id === editTrialId)}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
