'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Header } from '@/components/header'
import { LeftNavMenu } from '@/components/left-nav-menu'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { user, pillChoice } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else if (!pillChoice && pathname !== '/dashboard/pill-choice') {
      router.push('/dashboard/pill-choice')
    }
  }, [user, pillChoice, router, pathname])

  if (!user) {
    return null
  }

  // Don't render the layout for the pill-choice page
  if (pathname === '/dashboard/pill-choice') {
    return <>{children}</>
  }

  if (!pillChoice) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <LeftNavMenu />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
