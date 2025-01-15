'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Producer {
  producer_id?: number
  producer_first_name: string | null
  producer_last_name: string | null
  producer_establishment: string | null
}

interface ProducerFormProps {
  initialData?: Producer
  onSuccess: (producer: Producer) => void
}

export function ProducerForm({ initialData, onSuccess }: ProducerFormProps) {
  const [formData, setFormData] = useState<Producer>({
    producer_first_name: '',
    producer_last_name: '',
    producer_establishment: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSuccess(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="producer_first_name">First Name</Label>
        <Input
          id="producer_first_name"
          name="producer_first_name"
          value={formData.producer_first_name || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="producer_last_name">Last Name</Label>
        <Input
          id="producer_last_name"
          name="producer_last_name"
          value={formData.producer_last_name || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="producer_establishment">Establishment</Label>
        <Input
          id="producer_establishment"
          name="producer_establishment"
          value={formData.producer_establishment || ''}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit">
        {initialData ? 'Update Producer' : 'Create Producer'}
      </Button>
    </form>
  )
}
