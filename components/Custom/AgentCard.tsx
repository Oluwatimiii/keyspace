'use client'

import { AgentProfile } from "@/assets/data/data"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface AgentCardProps {
  agent: AgentProfile
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={agent.profilePictureUrl}
          alt={agent.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-space-blacks mb-2">{agent.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin size={18} />
          <span>{agent.location}</span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              size={18}
              className={index < agent.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-gray-600">({agent.rating})</span>
        </div>

        <p className="text-gray-600 mb-4">{agent.bio}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail size={18} />
            <span>{agent.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} />
            <span>{agent.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="flex-1 bg-space-darkgreen text-space-greens hover:bg-space-blacks">
            Contact Agent
          </Button>
          <Button variant="outline" className="flex-1">
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  )
}
