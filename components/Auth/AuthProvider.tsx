'use client'

import { useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { useAuthStore } from '@/store/authStore'

export function AuthProvider({ 
  children,
  initialUser
}: { 
  children: React.ReactNode
  initialUser: User | null
}) {
  const setUser = useAuthStore((state) => state.setUser)
  const initializeUser = useAuthStore((state) => state.initializeUser)

  useEffect(() => {
    setUser(initialUser)
    initializeUser()
  }, [setUser, initializeUser, initialUser])

  return <>{children}</>
}

