'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import Link from 'next/link'
import { BedDouble, Bath, Ruler, MapPin, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExclusiveProperty } from '@/assets/data/data'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getSupabaseClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/authStore"
import { useToast } from '@/hooks/use-toast'

interface PropertyCardProps {
  property: ExclusiveProperty
  onFavoriteChange?: (propertyId: string, isFavorite: boolean) => void
}

export default function PropertyCard({ property, onFavoriteChange }: PropertyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const user = useAuthStore((state) => state.user)
  const supabase = getSupabaseClient()

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger)

  //   const ctx = gsap.context(() => {
  //     gsap.from(cardRef.current, {
  //       scrollTrigger: {
  //         trigger: cardRef.current,
  //         start: 'top bottom-=100',
  //         toggleActions: 'play none none reverse'
  //       },
  //       opacity: 0.3,
  //       y: 50,
  //       duration: 0.8,
  //       ease: 'power3.out'
  //     })
  //   }, cardRef)

  //   return () => {
  //     ctx.revert()
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  //   }
  // }, [])

  const checkFavoriteStatus = useCallback(async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('userId', user.id)
        .eq('productId', property.propertyId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.log('Error checking favorite status:', error)
        return
      }

      setIsFavorite(!!data)
    } catch (error) {
      console.log('Error checking favorite status:', error)
    }
  }, [user, property.id])

  useEffect(() => {
    checkFavoriteStatus()
  }, [checkFavoriteStatus])

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to favorite a property.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('userId', user.id)
          .eq('productId', property.propertyId)

        if (error) throw error

        setIsFavorite(false)
        toast({
          title: "Removed from favorites",
          description: "The property has been removed from your favorites.",
        })
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ userId: user.id, productId: property.propertyId })

        if (error) throw error

        setIsFavorite(true)
        toast({
          title: "Added to favorites",
          description: "The property has been added to your favorites.",
        })
      }

      if (onFavoriteChange) {
        onFavoriteChange(property.propertyId, !isFavorite)
      }
    } catch (error) {
      console.error('Error updating favorites:', error)
      toast({
        title: "Error",
        description: "There was an error updating your favorites. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card 
    ref={cardRef}
    className="group overflow-hidden transition-all font-inter duration-300 hover:shadow-xl flex flex-col" // Fixed height and flex layout added here
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
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white"
              onClick={handleFavoriteClick}
              disabled={isLoading}
            >
              <Heart
                className={`w-5 h-5 transition-colors duration-300 ${
                  isFavorite 
                    ? 'fill-red-500 stroke-red-500' 
                    : 'fill-transparent stroke-gray-600'
                }`}
              />
              <span className="sr-only">
                {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-space-darkgreen text-space-greens">
            {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Badge 
        className="absolute top-4 py-1 px-3 right-4 bg-space-darkgreen text-space-greens z-10"
      >
        {property.status}
      </Badge>
    </div>
    
    {/* Wrap content so it can flexibly grow */}
    <CardContent className="p-5 flex-1">
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
      <Button asChild variant="secondary" className="bg-space-darkgreen text-space-greens hover:bg-space-blacks">
        <Link href={`/find-space/${property.id}`}>
          View Details
        </Link>
      </Button>
    </CardFooter>
  </Card>
  )
}

