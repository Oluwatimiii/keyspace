import { getSupabaseClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  initializeUser: () => {}
}

export const useAuthStore = create<AuthState>((set) => {
  const supabase = getSupabaseClient()
  return {
    user: null,
    setUser: (user) => set({ user }),
    initializeUser: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      set({ user })

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        set({ user: session?.user ?? null })
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }
  }
})

