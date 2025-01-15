'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react'
import { useRouter } from 'next/navigation'
import { InactivityModal } from '@/components/InactivityModal'

interface AuthContextType {
  user: string | null
  login: (username: string) => void
  logout: () => void
  updateLastActivity: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const lastActivityRef = useRef(Date.now())
  const [showInactivityModal, setShowInactivityModal] = useState(false)
  const router = useRouter()

  const login = useCallback((username: string) => {
    setUser(username)
    updateLastActivity()
    document.cookie = `currentUser=${username}; path=/; max-age=86400`
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    document.cookie =
      'currentUser=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    router.push('/login')
  }, [router])

  const updateLastActivity = useCallback(() => {
    lastActivityRef.current = Date.now()
  }, [])

  useEffect(() => {
    const currentUser = document.cookie
      .split('; ')
      .find((row) => row.startsWith('currentUser='))
    if (currentUser) {
      setUser(currentUser.split('=')[1])
    }
  }, [])

  useEffect(() => {
    const checkInactivity = () => {
      if (user && Date.now() - lastActivityRef.current > 10 * 60 * 1000) {
        setShowInactivityModal(true)
      }
    }

    const intervalId = setInterval(checkInactivity, 60 * 1000) // Check every minute

    return () => clearInterval(intervalId)
  }, [user])

  const handleCloseInactivityModal = useCallback(() => {
    setShowInactivityModal(false)
    logout()
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLastActivity }}>
      {children}
      <InactivityModal
        isOpen={showInactivityModal}
        onClose={handleCloseInactivityModal}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
