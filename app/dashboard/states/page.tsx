'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { StateForm } from './StateForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface State {
  state_id: number
  country_id: number
  state_name: string
  state_enabled: boolean
  created_at: string
  updated_at: string
}

export default function StateList() {
  const [states, setStates] = useState<State[]>([
    {
      state_id: 1,
      country_id: 1,
      state_name: 'California',
      state_enabled: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      state_id: 2,
      country_id: 1,
      state_name: 'Texas',
      state_enabled: true,
      created_at: '2023-02-15T00:00:00Z',
      updated_at: '2023-02-15T00:00:00Z'
    }
  ])
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editStateId, setEditStateId] = useState<number | null>(null)

  const handleCreateClick = useCallback(() => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }, [])

  const handleEditClick = useCallback((id: number) => {
    setEditStateId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }, [])

  const handleSidePaneClose = useCallback(() => {
    setSidePaneOpen(false)
    setEditStateId(null)
  }, [])

  const handleCreateSuccess = useCallback(
    (newState: State) => {
      setStates((prevStates) => [
        ...prevStates,
        { ...newState, state_id: prevStates.length + 1 }
      ])
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const handleEditSuccess = useCallback(
    (updatedState: State) => {
      setStates((prevStates) =>
        prevStates.map((state) =>
          state.state_id === updatedState.state_id ? updatedState : state
        )
      )
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const columns: ColumnDef<State>[] = [
    {
      accessorKey: 'state_id',
      header: 'ID'
    },
    {
      accessorKey: 'country_id',
      header: 'Country ID'
    },
    {
      accessorKey: 'state_name',
      header: 'Name'
    },
    {
      accessorKey: 'state_enabled',
      header: 'Enabled',
      cell: ({ row }) => (row.getValue('state_enabled') ? 'Yes' : 'No')
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
        const state = row.original
        return (
          <Button onClick={() => handleEditClick(state.state_id)}>Edit</Button>
        )
      }
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">States</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New State
      </Button>
      <DataTable columns={columns} data={states} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={sidePaneContent === 'create' ? 'Create State' : 'Edit State'}
      >
        {sidePaneContent === 'create' ? (
          <StateForm onSuccess={handleCreateSuccess} />
        ) : (
          <StateForm
            initialData={states.find((state) => state.state_id === editStateId)}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
