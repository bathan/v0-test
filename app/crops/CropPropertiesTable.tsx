import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { CropPropertyRow } from './CropPropertyRow'

interface CropProperty {
  id: string
  name: string
  dataType: string
  defaultValue?: string
}

interface CropPropertiesTableProps {
  properties: CropProperty[]
  updateProperty: (property: CropProperty) => void
  deleteProperty: (id: string) => void
}

export function CropPropertiesTable({
  properties,
  updateProperty,
  deleteProperty
}: CropPropertiesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Data Type</TableHead>
          <TableHead>Default Value</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties.map((property) => (
          <CropPropertyRow
            key={property.id}
            property={property}
            updateProperty={updateProperty}
            deleteProperty={deleteProperty}
          />
        ))}
      </TableBody>
    </Table>
  )
}
