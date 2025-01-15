'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Home() {
  const router = useRouter()
  const { user, pillChoice } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (!pillChoice) {
      router.push('/dashboard/pill-choice')
    } else {
      router.push('/dashboard')
    }
  }, [user, pillChoice, router])

  return null // This page will redirect, so we don't need to render anything
}
