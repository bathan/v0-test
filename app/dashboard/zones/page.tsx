'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function ZonesPage() {
  const [zones, setZones] = useState([
    { id: 1, name: 'Zone 1' },
    { id: 2, name: 'Zone 2' },
  ])

  const handleAdd = (newZone: { name: string }) => {
    setZones([...zones, { ...newZone, id: zones.length + 1 }])
  }

  const handleEdit = (editedZone: { id: number; name: string }) => {
    setZones(zones.map(zone => zone.id === editedZone.id ? editedZone : zone))
  }

  const handleDelete = (id: number) => {
    setZones(zones.filter(zone => zone.id !== id))
  }

  return (
    <CrudPageTemplate
      title="Zones"
      items={zones}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

