'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { ProducerForm } from './ProducerForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Producer {
  producer_id: number
  producer_first_name: string | null
  producer_last_name: string | null
  producer_establishment: string | null
  created_at: string
  updated_at: string
}

// Mock data
const initialProducers: Producer[] = [
  {
    producer_id: 1,
    producer_first_name: 'John',
    producer_last_name: 'Doe',
    producer_establishment: 'Doe Farms', // Updated
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    producer_id: 2,
    producer_first_name: 'Jane',
    producer_last_name: 'Smith',
    producer_establishment: 'Smith Orchards', // Updated
    created_at: '2023-02-15T00:00:00Z',
    updated_at: '2023-02-15T00:00:00Z'
  }
]

export default function ProducerList() {
  const [producers, setProducers] = useState<Producer[]>(initialProducers)
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editProducerId, setEditProducerId] = useState<number | null>(null)

  const handleCreateClick = () => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }

  const handleEditClick = (id: number) => {
    setEditProducerId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }

  const handleSidePaneClose = () => {
    setSidePaneOpen(false)
    setEditProducerId(null)
  }

  const handleCreateSuccess = (newProducer: Producer) => {
    setProducers([
      ...producers,
      { ...newProducer, producer_id: producers.length + 1 }
    ])
    handleSidePaneClose()
  }

  const handleEditSuccess = (updatedProducer: Producer) => {
    setProducers(
      producers.map((producer) =>
        producer.producer_id === updatedProducer.producer_id
          ? updatedProducer
          : producer
      )
    )
    handleSidePaneClose()
  }

  const columns: ColumnDef<Producer>[] = [
    {
      accessorKey: 'producer_id',
      header: 'ID'
    },
    {
      accessorKey: 'producer_first_name',
      header: 'First Name'
    },
    {
      accessorKey: 'producer_last_name',
      header: 'Last Name'
    },
    {
      accessorKey: 'producer_establishment',
      header: 'Establishment'
    },
    {
      accessorKey: 'created_at',
      header: 'Created At',
      cell: ({ row }) => {
        return new Date(row.getValue('created_at')).toLocaleDateString()
      }
    },
    {
      accessorKey: 'updated_at',
      header: 'Updated At',
      cell: ({ row }) => {
        return new Date(row.getValue('updated_at')).toLocaleDateString()
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const producer = row.original
        return (
          <Button onClick={() => handleEditClick(producer.producer_id)}>
            Edit
          </Button>
        )
      }
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Producers</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Producer
      </Button>
      <DataTable columns={columns} data={producers} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={
          sidePaneContent === 'create' ? 'Create Producer' : 'Edit Producer'
        }
      >
        {sidePaneContent === 'create' ? (
          <ProducerForm onSuccess={handleCreateSuccess} />
        ) : (
          <ProducerForm
            initialData={producers.find(
              (producer) => producer.producer_id === editProducerId
            )}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
