'use client'

import { useState } from 'react'
import { Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const steps = [
  { title: 'Personal Information', fields: ['name', 'email'] },
  { title: 'Wizard Preferences', fields: ['favoriteSpell', 'wandType'] },
  { title: 'Magical Abilities', fields: ['magicLevel', 'specialization'] },
  { title: 'Confirmation', fields: ['termsAccepted'] }
]

export default function GandalfWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteSpell: '',
    wandType: '',
    magicLevel: '',
    specialization: '',
    termsAccepted: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Here you would typically send the data to your backend
  }

  const renderFormFields = () => {
    const currentFields = steps[currentStep].fields

    return currentFields.map((field) => {
      switch (field) {
        case 'name':
        case 'email':
          return (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Label>
              <Input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData] as string}
                onChange={handleInputChange}
                required
              />
            </div>
          )
        case 'favoriteSpell':
          return (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>Favorite Spell</Label>
              <Input
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
            </div>
          )
        case 'wandType':
          return (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>Wand Type</Label>
              <Select
                value={formData[field]}
                onValueChange={(value) => handleSelectChange(field, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select wand type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oak">Oak</SelectItem>
                  <SelectItem value="holly">Holly</SelectItem>
                  <SelectItem value="phoenix">Phoenix Feather</SelectItem>
                  <SelectItem value="elder">Elder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        case 'magicLevel':
          return (
            <div key={field} className="space-y-2">
              <Label>Magic Level</Label>
              <RadioGroup
                value={formData[field]}
                onValueChange={(value) => handleSelectChange(field, value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="novice" id="novice" />
                  <Label htmlFor="novice">Novice</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert">Expert</Label>
                </div>
              </RadioGroup>
            </div>
          )
        case 'specialization':
          return (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>Specialization</Label>
              <Select
                value={formData[field]}
                onValueChange={(value) => handleSelectChange(field, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="charms">Charms</SelectItem>
                  <SelectItem value="potions">Potions</SelectItem>
                  <SelectItem value="transfiguration">
                    Transfiguration
                  </SelectItem>
                  <SelectItem value="defense">
                    Defense Against the Dark Arts
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          )
        case 'termsAccepted':
          return (
            <div key={field} className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id={field}
                name={field}
                checked={formData[field] as boolean}
                onChange={handleInputChange}
                required
              />
              <Label htmlFor={field}>I accept the terms and conditions</Label>
            </div>
          )
        default:
          return null
      }
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Wand2 className="mr-2" />
            Gandalf Wizard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`w-1/4 text-center ${
                    index <= currentStep ? 'text-primary' : 'text-gray-400'
                  }`}
                >
                  Step {index + 1}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">
              {steps[currentStep].title}
            </h2>
            <div className="space-y-4">{renderFormFields()}</div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
