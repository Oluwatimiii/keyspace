'use client'

import { LogoutButton } from "@/components/Auth/LogoutButton"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const supabase = createClient()
  const store = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error || !data?.user) {
        redirect('/login')
      } else {
        store.setUser(data?.user)
      }
    }
    
    checkAuth()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
          <p className="text-muted-foreground mb-4">You have no active listings.</p>
          <Button>Create a Listing</Button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
          <p className="text-muted-foreground mb-4">You have no active bookings.</p>
          <Button>Find a Space</Button>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
