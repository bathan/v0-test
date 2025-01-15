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
import { Textarea } from '@/components/ui/textarea'

const formSchema = z.object({
  crop_id: z.coerce.number().int().positive(),
  hybrid_name: z.string().min(2).max(255),
  hybrid_description: z.string().max(1000).optional()
})

interface HybridFormProps {
  initialData?: {
    hybrid_id: number
    crop_id: number
    hybrid_name: string
    hybrid_description: string | null
  }
  onSuccess: (data: any) => void
}

export function HybridForm({ initialData, onSuccess }: HybridFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      crop_id: 0,
      hybrid_name: '',
      hybrid_description: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSuccess({
        ...values,
        hybrid_id: initialData?.hybrid_id || 0,
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
                The ID of the crop this hybrid belongs to.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hybrid_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hybrid Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>The name of the hybrid.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hybrid_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormDescription>
                A brief description of the hybrid.
              </FormDescription>
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
