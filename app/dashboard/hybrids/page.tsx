'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { HybridForm } from './HybridForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Hybrid {
  hybrid_id: number
  crop_id: number
  hybrid_name: string
  hybrid_description: string | null
  created_at: string
  updated_at: string
}

export default function HybridList() {
  const [hybrids, setHybrids] = useState<Hybrid[]>([
    {
      hybrid_id: 1,
      crop_id: 1,
      hybrid_name: 'SuperCorn X1',
      hybrid_description: 'High-yield corn hybrid resistant to drought',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      hybrid_id: 2,
      crop_id: 2,
      hybrid_name: 'MegaWheat W2',
      hybrid_description: 'Disease-resistant wheat hybrid',
      created_at: '2023-02-15T00:00:00Z',
      updated_at: '2023-02-15T00:00:00Z'
    }
  ])
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editHybridId, setEditHybridId] = useState<number | null>(null)

  const handleCreateClick = useCallback(() => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }, [])

  const handleEditClick = useCallback((id: number) => {
    setEditHybridId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }, [])

  const handleSidePaneClose = useCallback(() => {
    setSidePaneOpen(false)
    setEditHybridId(null)
  }, [])

  const handleCreateSuccess = useCallback(
    (newHybrid: Hybrid) => {
      setHybrids((prevHybrids) => [
        ...prevHybrids,
        { ...newHybrid, hybrid_id: prevHybrids.length + 1 }
      ])
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const handleEditSuccess = useCallback(
    (updatedHybrid: Hybrid) => {
      setHybrids((prevHybrids) =>
        prevHybrids.map((hybrid) =>
          hybrid.hybrid_id === updatedHybrid.hybrid_id ? updatedHybrid : hybrid
        )
      )
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const columns: ColumnDef<Hybrid>[] = [
    {
      accessorKey: 'hybrid_id',
      header: 'ID'
    },
    {
      accessorKey: 'crop_id',
      header: 'Crop ID'
    },
    {
      accessorKey: 'hybrid_name',
      header: 'Name'
    },
    {
      accessorKey: 'hybrid_description',
      header: 'Description'
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
        const hybrid = row.original
        return (
          <Button onClick={() => handleEditClick(hybrid.hybrid_id)}>
            Edit
          </Button>
        )
      }
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Hybrids</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Hybrid
      </Button>
      <DataTable columns={columns} data={hybrids} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={sidePaneContent === 'create' ? 'Create Hybrid' : 'Edit Hybrid'}
      >
        {sidePaneContent === 'create' ? (
          <HybridForm onSuccess={handleCreateSuccess} />
        ) : (
          <HybridForm
            initialData={hybrids.find(
              (hybrid) => hybrid.hybrid_id === editHybridId
            )}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
