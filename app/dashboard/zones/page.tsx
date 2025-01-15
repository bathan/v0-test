'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { SidePane } from '@/components/SidePane'
import { ZoneForm } from './ZoneForm'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

interface Zone {
  zone_id: number
  country_id: number
  crop_id: number
  zone_name: string | null
  zone_prefix: string | null
  created_at: string
  updated_at: string
}

export default function ZoneList() {
  const [zones, setZones] = useState<Zone[]>([
    {
      zone_id: 1,
      country_id: 1,
      crop_id: 1,
      zone_name: 'North Zone',
      zone_prefix: 'NZ',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      zone_id: 2,
      country_id: 1,
      crop_id: 2,
      zone_name: 'South Zone',
      zone_prefix: 'SZ',
      created_at: '2023-02-15T00:00:00Z',
      updated_at: '2023-02-15T00:00:00Z'
    }
  ])
  const [sidePaneOpen, setSidePaneOpen] = useState(false)
  const [sidePaneContent, setSidePaneContent] = useState<'create' | 'edit'>(
    'create'
  )
  const [editZoneId, setEditZoneId] = useState<number | null>(null)

  const handleCreateClick = useCallback(() => {
    setSidePaneContent('create')
    setSidePaneOpen(true)
  }, [])

  const handleEditClick = useCallback((id: number) => {
    setEditZoneId(id)
    setSidePaneContent('edit')
    setSidePaneOpen(true)
  }, [])

  const handleSidePaneClose = useCallback(() => {
    setSidePaneOpen(false)
    setEditZoneId(null)
  }, [])

  const handleCreateSuccess = useCallback(
    (newZone: Zone) => {
      setZones((prevZones) => [
        ...prevZones,
        { ...newZone, zone_id: prevZones.length + 1 }
      ])
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const handleEditSuccess = useCallback(
    (updatedZone: Zone) => {
      setZones((prevZones) =>
        prevZones.map((zone) =>
          zone.zone_id === updatedZone.zone_id ? updatedZone : zone
        )
      )
      handleSidePaneClose()
    },
    [handleSidePaneClose]
  )

  const columns: ColumnDef<Zone>[] = [
    {
      accessorKey: 'zone_id',
      header: 'ID'
    },
    {
      accessorKey: 'country_id',
      header: 'Country ID'
    },
    {
      accessorKey: 'crop_id',
      header: 'Crop ID'
    },
    {
      accessorKey: 'zone_name',
      header: 'Name'
    },
    {
      accessorKey: 'zone_prefix',
      header: 'Prefix'
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
        const zone = row.original
        return (
          <Button onClick={() => handleEditClick(zone.zone_id)}>Edit</Button>
        )
      }
    }
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Zones</h1>
      <Button onClick={handleCreateClick} className="mb-4">
        Create New Zone
      </Button>
      <DataTable columns={columns} data={zones} />
      <SidePane
        isOpen={sidePaneOpen}
        onClose={handleSidePaneClose}
        title={sidePaneContent === 'create' ? 'Create Zone' : 'Edit Zone'}
      >
        {sidePaneContent === 'create' ? (
          <ZoneForm onSuccess={handleCreateSuccess} />
        ) : (
          <ZoneForm
            initialData={zones.find((zone) => zone.zone_id === editZoneId)}
            onSuccess={handleEditSuccess}
          />
        )}
      </SidePane>
    </div>
  )
}
