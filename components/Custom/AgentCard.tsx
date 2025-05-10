'use client'

import { AgentProfile } from "@/assets/data/data"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin, Star, BadgeCheck } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface AgentCardProps {
  agent: AgentProfile 
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-64 w-full">
        <Image
          src={agent.profilePictureUrl}
          alt={agent.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-4 right-4 bg-space-darkgreen text-space-greens px-3 py-1 rounded-full flex items-center gap-1 text-sm font-medium shadow-md">
          <BadgeCheck size={16} />
          Verified
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-space-blacks mb-2">{agent.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin size={18} />
          <span>{agent.location}</span>
        </div>

        <div className="flex items-center gap-1 mb-4">
          {agent.rating !== null ? (
            <>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={index < (agent.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-gray-600">({agent.rating})</span>
            </>
          ) : (
            <span className="text-gray-500 italic">Not rated yet</span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{agent.bio}</p>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-gray-600 truncate">
            <Mail size={18} className="flex-shrink-0" />
            <span className="truncate">{agent.contactEmail}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone size={18} className="flex-shrink-0" />
            <span>{agent.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
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
