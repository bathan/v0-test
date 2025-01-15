'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CropPropertiesTable } from './CropPropertiesTable'

interface CropProperty {
  id: string
  name: string
  dataType: string
  defaultValue?: string
}

interface CropFormData {
  name: string
  properties: CropProperty[]
}

interface CropFormProps {
  initialData?: CropFormData
  onSubmit: (data: CropFormData) => void
  submitButtonText: string
}

export function CropForm({
  initialData,
  onSubmit,
  submitButtonText
}: CropFormProps) {
  const [cropName, setCropName] = useState(initialData?.name || '')
  const [properties, setProperties] = useState<CropProperty[]>(
    initialData?.properties || []
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name: cropName, properties })
  }

  const addProperty = () => {
    setProperties([
      ...properties,
      { id: Date.now().toString(), name: '', dataType: '', defaultValue: '' }
    ])
  }

  const updateProperty = (updatedProperty: CropProperty) => {
    setProperties(
      properties.map((prop) =>
        prop.id === updatedProperty.id ? updatedProperty : prop
      )
    )
  }

  const deleteProperty = (id: string) => {
    setProperties(properties.filter((prop) => prop.id !== id))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <Label htmlFor="cropName">Crop Name</Label>
        <Input
          id="cropName"
          value={cropName}
          onChange={(e) => setCropName(e.target.value)}
          placeholder="Enter crop name"
        />
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Crop Properties</h2>
        <CropPropertiesTable
          properties={properties}
          updateProperty={updateProperty}
          deleteProperty={deleteProperty}
        />
        <Button type="button" onClick={addProperty} className="mt-2">
          Add Property
        </Button>
      </div>
      <Button type="submit">{submitButtonText}</Button>
    </form>
  )
}
