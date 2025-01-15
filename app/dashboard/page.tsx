'use client'

import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { user, pillChoice } = useAuth()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the Dashboard, {user}!
      </h1>
      <p className="text-xl">You chose the {pillChoice} pill.</p>
    </div>
  )
}
