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

  const handleSave = () => {
    updateProperty(editedProperty)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProperty(property)
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={editedProperty.name}
            onChange={(e) =>
              setEditedProperty({ ...editedProperty, name: e.target.value })
            }
          />
        </TableCell>
        <TableCell>
          <Select
            value={editedProperty.dataType}
            onValueChange={(value) =>
              setEditedProperty({ ...editedProperty, dataType: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select data type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <Input
            value={editedProperty.defaultValue || ''}
            onChange={(e) =>
              setEditedProperty({
                ...editedProperty,
                defaultValue: e.target.value
              })
            }
          />
        </TableCell>
        <TableCell>
          <Button onClick={handleSave} className="mr-2">
            Save
          </Button>
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow>
      <TableCell>{property.name}</TableCell>
      <TableCell>{property.dataType}</TableCell>
      <TableCell>{property.defaultValue || '-'}</TableCell>
      <TableCell>
        <Button onClick={() => setIsEditing(true)} className="mr-2">
          Edit
        </Button>
        <Button
          onClick={() => deleteProperty(property.id)}
          variant="destructive"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}
