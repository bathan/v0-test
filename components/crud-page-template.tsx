import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Item {
  id: number
  name: string
  [key: string]: any
}

interface CrudPageTemplateProps {
  title: string
  items: Item[]
  onAdd: (item: Omit<Item, 'id'>) => void
  onEdit: (item: Item) => void
  onDelete: (id: number) => void
}

export function CrudPageTemplate({ title, items, onAdd, onEdit, onDelete }: CrudPageTemplateProps) {
  const [newItemName, setNewItemName] = useState('')

  const handleAdd = () => {
    if (newItemName) {
      onAdd({ name: newItemName })
      setNewItemName('')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder={`New ${title.slice(0, -1)} Name`}
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => onEdit(item)}>Edit</Button>
                <Button variant="destructive" onClick={() => onDelete(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

