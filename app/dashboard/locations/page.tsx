'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { LocationForm } from './LocationForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Location {
  location_id: number
  country_id: number
  state_id: number
  location_name: string
  location_latitude: number
  location_longitude: number
  created_at: string
  updated_at: string
}

export default function LocationList() {
  const [locations, setLocations] = useState<Location[]>([
    {
      location_id: 1,
      country_id: 1,
      state_id: 1,
      location_name: 'San Francisco',
      location_latitude: 37.7749,
      location_longitude: -122.4194,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      location_id: 2,
      country_id: 1,
      state_id: 2,
      location_name: 'Austin',
      location_latitude: 30.2672,
      location_longitude: -97.7431,
      created_at: '2023-02-15T00:00:00Z',
      updated_at: '2023-02-15T00:00:00Z'
    }
  ])
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editLocationId, setEditLocationId] = useState<number | null>(null)

  const handleCreateClick = useCallback(() => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }, [])

  const handleEditClick = useCallback((id: number) => {
    setEditLocationId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }, [])

  const handleSidePaneClose = useCallback(() => {
    setSidePaneOpen(false)
    setEditLocationId(null)
  }, [])

  const handleCreateSuccess = useCallback(
    (newLocation: Location) => {
      setLocations((prevLocations) => [
        ...prevLocations,
        { ...newLocation, location_id: prevLocations.length + 1 }
      ])
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const handleEditSuccess = useCallback(
    (updatedLocation: Location) => {
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.location_id === updatedLocation.location_id
            ? updatedLocation
            : location
        )
      )
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: 'location_id',
      header: 'ID'
    },
    {
      accessorKey: 'country_id',
      header: 'Country ID'
    },
    {
      accessorKey: 'state_id',
      header: 'State ID'
    },
    {
      accessorKey: 'location_name',
      header: 'Name'
    },
    {
      accessorKey: 'location_latitude',
      header: 'Latitude'
    },
    {
      accessorKey: 'location_longitude',
      header: 'Longitude'
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
        const location = row.original
        return (
          <Button onClick={() => handleEditClick(location.location_id)}>
            Edit
          </Button>
        )
      }
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Locations</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Location
      </Button>
      <DataTable columns={columns} data={locations} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={
          sidePaneContent === 'create' ? 'Create Location' : 'Edit Location'
        }
      >
        {sidePaneContent === 'create' ? (
          <LocationForm onSuccess={handleCreateSuccess} />
        ) : (
          <LocationForm
            initialData={locations.find(
              (location) => location.location_id === editLocationId
            )}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
