'use client'

import { useState } from "react"
import { agents } from "@/assets/data/data"
import AgentCard from "@/components/Custom/AgentCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AgentPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
            
            <Button 
              className="bg-space-greens font-bold text-space-darkgreen hover:bg-white rounded-full px-6"
              size="lg"
            >
              Become an Agent
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
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
      </div>

      {/* Agents Grid Section */}
      <div className="container mx-auto px-4 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  )
}
