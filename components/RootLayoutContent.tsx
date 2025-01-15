'use client'

import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { LeftNavMenu } from '@/components/left-nav-menu'
import { Header } from '@/components/Header'
import debounce from 'lodash/debounce'

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, updateLastActivity } = useAuth()

  const debouncedUpdateLastActivity = debounce(updateLastActivity, 1000, {
    leading: true,
    trailing: false
  })

  useEffect(() => {
    const handleActivity = () => {
      debouncedUpdateLastActivity()
    }

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleActivity)
    window.addEventListener('keydown', handleActivity)
    window.addEventListener('click', handleActivity)
    window.addEventListener('scroll', handleActivity)

    return () => {
      // Remove event listeners on cleanup
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('click', handleActivity)
      window.removeEventListener('scroll', handleActivity)
      debouncedUpdateLastActivity.cancel()
    }
  }, [debouncedUpdateLastActivity])

  if (!user) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <LeftNavMenu />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
