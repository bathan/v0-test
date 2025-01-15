'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function LocationsPage() {
  const [locations, setLocations] = useState([
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
  ])

  const handleAdd = (newLocation: { name: string }) => {
    setLocations([...locations, { ...newLocation, id: locations.length + 1 }])
  }

  const handleEdit = (editedLocation: { id: number; name: string }) => {
    setLocations(locations.map(location => location.id === editedLocation.id ? editedLocation : location))
  }

  const handleDelete = (id: number) => {
    setLocations(locations.filter(location => location.id !== id))
  }

  return (
    <CrudPageTemplate
      title="Locations"
      items={locations}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

