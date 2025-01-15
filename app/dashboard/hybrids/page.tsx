'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function HybridsPage() {
  const [hybrids, setHybrids] = useState([
    { id: 1, name: 'Hybrid 1' },
    { id: 2, name: 'Hybrid 2' },
  ])

  const handleAdd = (newHybrid: { name: string }) => {
    setHybrids([...hybrids, { ...newHybrid, id: hybrids.length + 1 }])
  }

  const handleEdit = (editedHybrid: { id: number; name: string }) => {
    setHybrids(hybrids.map(hybrid => hybrid.id === editedHybrid.id ? editedHybrid : hybrid))
  }

  const handleDelete = (id: number) => {
    setHybrids(hybrids.filter(hybrid => hybrid.id !== id))
  }

  return (
    <CrudPageTemplate
      title="Hybrids"
      items={hybrids}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

