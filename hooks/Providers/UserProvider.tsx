'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { User } from '@supabase/supabase-js'

export function UserProvider({ 
  children,
  user
}: { 
  children: React.ReactNode
  user: User | null 
}) {
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return <>{children}</>
}

