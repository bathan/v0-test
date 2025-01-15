'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'

export default function PillChoicePage() {
  const router = useRouter()
  const { user, pillChoice, setPillChoice } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (pillChoice) {
      router.push('/dashboard')
    }
  }, [user, pillChoice, router])

  const handleChoice = (choice: 'red' | 'blue') => {
    setPillChoice(choice)
    router.push('/dashboard')
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-8">Choose your pill, {user}</h1>
      <div className="flex space-x-4">
        <Button
          onClick={() => handleChoice('red')}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg"
        >
          Red Pill
        </Button>
        <Button
          onClick={() => handleChoice('blue')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg"
        >
          Blue Pill
        </Button>
      </div>
    </div>
  )
}
