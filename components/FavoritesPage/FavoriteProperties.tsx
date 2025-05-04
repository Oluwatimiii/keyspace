'use client'

import { useEffect, useState } from 'react'
import { ExclusiveProperty } from '@/assets/data/data'
import FavoritePropertiesSkeleton from './FavoritePropertiesSkeleton'
import PropertyCard from '../Custom/PropertyCard'
import { getSupabaseClient } from "@/utils/supabase/client"

export default function FavoriteProperties({ favoritePropertyIds }: { favoritePropertyIds: string[] }) {
  const [favoriteProperties, setFavoriteProperties] = useState<ExclusiveProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteProperties = async () => {
      if (!favoritePropertyIds.length) {
        setFavoriteProperties([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const supabase = getSupabaseClient();
      
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .in('propertyId', favoritePropertyIds);
          
        if (error) {
          throw error;
        }
        
        setFavoriteProperties(data || []);
      } catch (error) {
        console.error("Error fetching favorite properties:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFavoriteProperties();
  }, [favoritePropertyIds]);

  const handleFavoriteChange = (propertyId: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteProperties(prevProperties => 
        prevProperties.filter(property => property.propertyId !== propertyId)
      )
    }
  }

  if (isLoading) {
    return <FavoritePropertiesSkeleton />
  }

  if (favoriteProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No favorite properties yet</h2>
        <p className="text-gray-600">Start exploring and add some properties to your favorites!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favoriteProperties.map((property) => (
        <PropertyCard
          key={property.id} 
          property={property} 
          onFavoriteChange={handleFavoriteChange}
        />
      ))}
    </div>
  )
}

