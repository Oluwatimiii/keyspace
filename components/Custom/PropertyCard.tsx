'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Ruler, MapPin, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ExclusiveProperty } from '@/assets/data/data'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function PropertyCard({ property }: { property: ExclusiveProperty }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none reverse'
        },
        opacity: 0.3,
        y: 50,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, cardRef)

    // Cleanup function
    return () => {
      ctx.revert() // Revert all animations created in this context
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()) // Kill all ScrollTriggers
    }
  }, [])

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Card 
      ref={cardRef}
      className="group overflow-hidden transition-all font-inter duration-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden h-[230px]">
        <Image
          src={property.imageUrl}
          alt={property.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleFavoriteClick}
                className="absolute top-4 left-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
              >
                <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isFavorite 
                      ? 'fill-red-500 stroke-red-500' 
                      : 'fill-transparent stroke-gray-600'
                  }`}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-space-darkgreen text-space-greens">
              {isFavorite ? 'Added to favorites' : 'Add to favorites'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge 
          className="absolute top-4 py-1 px-3 right-4 bg-space-darkgreen text-space-greens z-10"
        >
          {property.status}
        </Badge>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-base md:text-xl font-semibold tracking-tight mb-2 text-space-blacks">
              {property.name}
            </h3>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-2" />
              <span className="text-sm text-space-blacks">{property.location}</span>
            </div>
          </div>

          <p className="line-clamp-2 text-space-blacks">
            {property.description}
          </p>

          <div className="flex justify-between items-center pt-2 font-inter">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-1 border-[0.8px] border-gray-400 rounded-2xl px-3 py-1">
                <BedDouble className="w-4 h-4" />
                <span className="text-sm font-semibold text-space-blacks">{property.numberOfBeds}</span>
              </div>
              <div className="flex items-center gap-1 border-[0.8px] border-gray-400 rounded-2xl px-3 py-1">
                <Bath className="w-4 h-4" />
                <span className="text-sm font-semibold text-space-blacks">{property.numberOfBaths}</span>
              </div>
              <div className="flex items-center gap-1 border-[0.8px] border-gray-400 rounded-2xl px-3 py-1">
                <Ruler className="w-4 h-4" />
                <span className="text-sm font-semibold text-space-blacks">{property.landSize}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-space-greens flex justify-between items-center">
        <span className="text-xl font-bold text-space-darkgreen">
          {property.price}
        </span>
        <Link 
          href={`/properties/${property.id}`}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-space-darkgreen text-white hover:text-space-greens h-10 px-4 py-2"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  )
}