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

type PillChoice = 'red' | 'blue' | null

interface AuthContextType {
  user: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  pillChoice: PillChoice
  setPillChoice: (choice: PillChoice) => void
  updateLastActivity: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  pillChoice: null,
  setPillChoice: () => {},
  updateLastActivity: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null)
  const lastActivityRef = useRef(Date.now())
  const [showInactivityModal, setShowInactivityModal] = useState(false)
  const router = useRouter()
  const [pillChoice, setPillChoice] = useState<PillChoice>(null)

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setUser(username)
      updateLastActivity()
      document.cookie = `currentUser=${username}; path=/; max-age=86400`
      return true
    },
    []
  )

  const logout = useCallback(() => {
    setUser(null)
    setPillChoice(null)
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
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateLastActivity,
        pillChoice,
        setPillChoice
      }}
    >
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
