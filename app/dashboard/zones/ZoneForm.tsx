'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  country_id: z.coerce.number().int().positive(),
  crop_id: z.coerce.number().int().positive(),
  zone_name: z.string().min(2).max(255).nullable(),
  zone_prefix: z.string().max(255).nullable()
})

interface ZoneFormProps {
  initialData?: {
    zone_id: number
    country_id: number
    crop_id: number
    zone_name: string | null
    zone_prefix: string | null
  }
  onSuccess: (data: any) => void
}

export function ZoneForm({ initialData, onSuccess }: ZoneFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      country_id: 0,
      crop_id: 0,
      zone_name: '',
      zone_prefix: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess({
        ...values,
        zone_id: initialData?.zone_id || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="country_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                The ID of the country this zone belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="crop_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Crop ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                The ID of the crop associated with this zone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zone_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription>The name of the zone.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zone_prefix"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zone Prefix</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription>The prefix for the zone.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </Form>
  )
}
