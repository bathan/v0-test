'use client'

import { useState } from 'react'
import { CrudPageTemplate } from '@/components/crud-page-template'

export default function ProducersPage() {
  const [producers, setProducers] = useState([
    { id: 1, name: 'Producer 1' },
    { id: 2, name: 'Producer 2' },
  ])

  const handleAdd = (newProducer: { name: string }) => {
    setProducers([...producers, { ...newProducer, id: producers.length + 1 }])
  }

  const handleEdit = (editedProducer: { id: number; name: string }) => {
    setProducers(producers.map(producer => producer.id === editedProducer.id ? editedProducer : producer))
  }

  const handleDelete = (id: number) => {
    setProducers(producers.filter(producer => producer.id !== id))
  }

  return (
    <CrudPageTemplate
      title="Producers"
      items={producers}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  )
}

