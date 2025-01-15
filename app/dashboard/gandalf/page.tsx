'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

export default function GandalfWizard() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    spellPower: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, type: value }))
  }

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to a server
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Gandalf Wizard</h1>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-1/4 h-2 ${
                s <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500">Step {step} of 4</div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <Label>Type</Label>
            <RadioGroup value={formData.type} onValueChange={handleRadioChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="wizard" id="wizard" />
                <Label htmlFor="wizard">Wizard</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sorcerer" id="sorcerer" />
                <Label htmlFor="sorcerer">Sorcerer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mage" id="mage" />
                <Label htmlFor="mage">Mage</Label>
              </div>
            </RadioGroup>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="spellPower">Spell Power</Label>
              <Input
                id="spellPower"
                name="spellPower"
                type="number"
                value={formData.spellPower}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <Button type="button" onClick={handlePrevious}>
              Previous
            </Button>
          )}
          {step < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </div>
  )
}

