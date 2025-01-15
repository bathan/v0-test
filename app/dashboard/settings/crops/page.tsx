'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ItemList from '@/components/ItemList'
import { SidePane } from '@/components/SidePane'
import { CropForm } from './CropForm'

// Mock data
const initialCrops = [
  {
    id: 1,
    name: 'Corn',
    properties: [
      {
        id: '1',
        name: 'Variety',
        dataType: 'string',
        defaultValue: 'Sweet Corn'
      },
      { id: '2', name: 'Planting Depth', dataType: 'number', defaultValue: '2' }
    ]
  },
  {
    id: 2,
    name: 'Wheat',
    properties: [
      {
        id: '1',
        name: 'Type',
        dataType: 'string',
        defaultValue: 'Winter Wheat'
      },
      { id: '2', name: 'Sowing Rate', dataType: 'number', defaultValue: '150' }
    ]
  }
]

export default function CropList() {
  const [crops, setCrops] = useState(initialCrops)
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editCropId, setEditCropId] = useState<number | null>(null)

  const handleCreateClick = () => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }

  const handleEditClick = (id: number) => {
    setEditCropId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }

  const handleSidePaneClose = () => {
    setSidePaneOpen(false)
    setEditCropId(null)
  }

  const handleCreateSuccess = (newCrop: any) => {
    setCrops([...crops, { ...newCrop, id: crops.length + 1 }])
    handleSidePaneClose()
  }

  const handleEditSuccess = (updatedCrop: any) => {
    setCrops(
      crops.map((crop) =>
        crop.id === editCropId ? { ...updatedCrop, id: editCropId } : crop
      )
    )
    // Don't close the SidePane after editing
  }

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold mb-4">Crops</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Crop
      </Button>
      <ItemList
        items={crops}
        fields={['id', 'name']}
        modelName="Crop"
        onEditClick={handleEditClick}
      />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={sidePaneContent === 'create' ? 'Create Crop' : 'Edit Crop'}
      >
        {sidePaneContent === 'create' ? (
          <CropForm
            onSubmit={handleCreateSuccess}
            submitButtonText="Create Crop"
          />
        ) : (
          <CropForm
            initialData={crops.find((crop) => crop.id === editCropId)}
            onSubmit={handleEditSuccess}
            submitButtonText="Update Crop"
          />
        )}
      </SidePane>
    </div>
  )
}
