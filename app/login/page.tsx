'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Logo } from '@/components/logo'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, user, pillChoice } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      if (pillChoice) {
        router.push('/dashboard')
      } else {
        router.push('/dashboard/pill-choice')
      }
    }
  }, [user, pillChoice, router])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const success = await login(username, password)
    if (success) {
      router.push('/dashboard/pill-choice')
    }
  }

  if (user) {
    return null
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 relative bg-primary flex items-center justify-center">
        <div className="text-center">
          <Logo size={192} className="mx-auto" />
          <h1 className="text-4xl font-bold mt-8 text-white">
            Welcome to Calice
          </h1>
          <p className="text-xl mt-4 text-white">
            Your Farm Management Solution
          </p>
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center bg-background">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-md px-8"
        >
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </div>
    </div>
  )
}
