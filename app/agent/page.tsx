'use client'

import { useState, useEffect } from "react"
import AgentCard from "@/components/Custom/AgentCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/authStore"

interface Agent {
  id: string;
  name: string;
  location: string;
  experience: string;
  contactEmail: string;
  phoneNumber: string;
  profilePictureUrl: string;
  specialization: string;
  rating: number | null;
  bio: string;
  userId: string;
}

export default function AgentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAgent, setIsAgent] = useState(false)
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    async function fetchAgents() {
      const supabase = getSupabaseClient()
      
      try {
        // Check if user is an agent
        if (user) {
          const { data: agentData } = await supabase
            .from('agents')
            .select('id')
            .eq('userId', user.id)
            .single()
          setIsAgent(!!agentData)
        }

        // Fetch all agents
        const { data: agentsData, error } = await supabase
          .from('agents')
          .select('*')
          .order('name')

        if (error) {
          console.error('Error fetching agents:', error)
          return
        }

        setAgents(agentsData || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAgents()
  }, [user])

  // Filter agents based on search query
  const filteredAgents = agents.filter(agent => {
    const searchLower = searchQuery.toLowerCase()
    return (
      agent.name.toLowerCase().includes(searchLower) ||
      agent.location.toLowerCase().includes(searchLower) ||
      agent.specialization.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="min-h-screen bg-gray-50 font-urbanist">
      {/* Hero Section */}
      <div className="bg-space-darkgreen text-white py-16 px-4 md:px-10">
        <div className="container mx-auto pt-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Meet Our Expert Agents
              </h1>
              <p className="text-space-greens text-lg mb-8 max-w-2xl">
                Connect with our experienced real estate professionals who are ready to help you find your perfect space.
              </p>
            </div>
            
            {!isAgent && (
              <Button 
                className="bg-space-greens font-bold text-space-darkgreen hover:bg-white rounded-full px-6"
                size="lg"
                onClick={() => router.push("/agent/register")}
              >
                Become an Agent
              </Button>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search agents by name, location, or specialization"
              className="pl-10 py-6 w-full rounded-full bg-white text-space-blacks"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Agents Grid Section */}
      <div className="container mx-auto px-4 md:px-10 py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-space-darkgreen mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agents...</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No agents found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
