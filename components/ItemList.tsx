import { Button } from '@/components/ui/button'

interface Item {
  [key: string]: any
}

interface ItemListProps {
  items: Item[]
  fields: string[]
  modelName: string
  onEditClick: (id: number) => void
}

export default function ItemList({
  items,
  fields,
  modelName,
  onEditClick
}: ItemListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            {fields.map((field) => (
              <th
                key={field}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {field}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item: Item) => (
            <tr key={item.id}>
              {fields.map((field) => (
                <td
                  key={field}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {item[field]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Button
                  onClick={() => onEditClick(item.id)}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
