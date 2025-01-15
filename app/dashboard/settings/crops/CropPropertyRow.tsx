import { useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface CropProperty {
  id: string
  name: string
  dataType: string
  defaultValue?: string
}

interface CropPropertyRowProps {
  property: CropProperty
  updateProperty: (property: CropProperty) => void
  deleteProperty: (id: string) => void
}

export function CropPropertyRow({
  property,
  updateProperty,
  deleteProperty
}: CropPropertyRowProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProperty, setEditedProperty] = useState(property)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    updateProperty(editedProperty)
    setIsEditing(false)
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditedProperty(property)
    setIsEditing(false)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsEditing(true)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    deleteProperty(property.id)
  }

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedProperty.name}
            onChange={(e) =>
              setEditedProperty({ ...editedProperty, name: e.target.value })
            }
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          property.name
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Select
            value={editedProperty.dataType}
            onValueChange={(value) =>
              setEditedProperty({ ...editedProperty, dataType: value })
            }
          >
            <SelectTrigger onClick={(e) => e.stopPropagation()}>
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          property.dataType
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedProperty.defaultValue || ''}
            onChange={(e) =>
              setEditedProperty({
                ...editedProperty,
                defaultValue: e.target.value
              })
            }
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          property.defaultValue || '-'
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <Button onClick={handleSave} className="mr-2">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} className="mr-2">
              Edit
            </Button>
            <Button onClick={handleDelete} variant="destructive">
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  )
}
