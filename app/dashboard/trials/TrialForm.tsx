'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

interface Trial {
  trial_id?: number
  campaign_id: number
  crop_id: number
  country_id: number
  state_id: number
  location_id: number
  trial_latitude: number
  trial_longitude: number
  trial_planting_date: string
  trial_harvest_date: string | null
  trial_plowing: string
  trial_insecticide: string | null
  trial_developer_user_id: number
  trial_predecessor_crop_id: number
  trial_irrigation: string | null
  producer_id: number
  trial_manual_calculation_enabled: boolean
  trial_comments: string | null
}

interface TrialFormProps {
  initialData?: Trial
  onSuccess: (trial: Trial) => void
}

export function TrialForm({ initialData, onSuccess }: TrialFormProps) {
  const [formData, setFormData] = useState<Trial>({
    campaign_id: 0,
    crop_id: 0,
    country_id: 0,
    state_id: 0,
    location_id: 0,
    trial_latitude: 0,
    trial_longitude: 0,
    trial_planting_date: '',
    trial_harvest_date: null,
    trial_plowing: '',
    trial_insecticide: null,
    trial_developer_user_id: 0,
    trial_predecessor_crop_id: 0,
    trial_irrigation: null,
    producer_id: 0,
    trial_manual_calculation_enabled: false,
    trial_comments: null
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      trial_manual_calculation_enabled: checked
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
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
        <Label htmlFor="campaign_id">Campaign ID</Label>
        <Input
          id="campaign_id"
          name="campaign_id"
          type="number"
          value={formData.campaign_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="crop_id">Crop ID</Label>
        <Input
          id="crop_id"
          name="crop_id"
          type="number"
          value={formData.crop_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="country_id">Country ID</Label>
        <Input
          id="country_id"
          name="country_id"
          type="number"
          value={formData.country_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="state_id">State ID</Label>
        <Input
          id="state_id"
          name="state_id"
          type="number"
          value={formData.state_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="location_id">Location ID</Label>
        <Input
          id="location_id"
          name="location_id"
          type="number"
          value={formData.location_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_latitude">Latitude</Label>
        <Input
          id="trial_latitude"
          name="trial_latitude"
          type="number"
          step="0.0000001"
          value={formData.trial_latitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_longitude">Longitude</Label>
        <Input
          id="trial_longitude"
          name="trial_longitude"
          type="number"
          step="0.0000001"
          value={formData.trial_longitude}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_planting_date">Planting Date</Label>
        <Input
          id="trial_planting_date"
          name="trial_planting_date"
          type="date"
          value={formData.trial_planting_date.split('T')[0]}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_harvest_date">Harvest Date</Label>
        <Input
          id="trial_harvest_date"
          name="trial_harvest_date"
          type="date"
          value={
            formData.trial_harvest_date
              ? formData.trial_harvest_date.split('T')[0]
              : ''
          }
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_plowing">Plowing</Label>
        <Select
          value={formData.trial_plowing}
          onValueChange={(value) => handleSelectChange('trial_plowing', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select plowing type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CONVENTIONAL">Conventional</SelectItem>
            <SelectItem value="NO_TILL">No Till</SelectItem>
            <SelectItem value="MINIMUM_TILL">Minimum Till</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="trial_insecticide">Insecticide</Label>
        <Input
          id="trial_insecticide"
          name="trial_insecticide"
          value={formData.trial_insecticide || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_developer_user_id">Developer User ID</Label>
        <Input
          id="trial_developer_user_id"
          name="trial_developer_user_id"
          type="number"
          value={formData.trial_developer_user_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_predecessor_crop_id">Predecessor Crop ID</Label>
        <Input
          id="trial_predecessor_crop_id"
          name="trial_predecessor_crop_id"
          type="number"
          value={formData.trial_predecessor_crop_id}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="trial_irrigation">Irrigation</Label>
        <Input
          id="trial_irrigation"
          name="trial_irrigation"
          value={formData.trial_irrigation || ''}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Label htmlFor="producer_id">Producer ID</Label>
        <Input
          id="producer_id"
          name="producer_id"
          type="number"
          value={formData.producer_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="trial_manual_calculation_enabled"
          checked={formData.trial_manual_calculation_enabled}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="trial_manual_calculation_enabled">
          Manual Calculation Enabled
        </Label>
      </div>
      <div>
        <Label htmlFor="trial_comments">Comments</Label>
        <Textarea
          id="trial_comments"
          name="trial_comments"
          value={formData.trial_comments || ''}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit">
        {initialData ? 'Update Trial' : 'Create Trial'}
      </Button>
    </form>
  )
}
