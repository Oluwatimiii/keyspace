'use client'

import { useEffect, useState } from 'react'
import { ExclusiveProperty, exclusiveProperties } from '@/assets/data/data'
import FavoritePropertiesSkeleton from './FavoritePropertiesSkeleton'
import PropertyCard from '../Custom/PropertyCard'

export default function FavoriteProperties({ favoritePropertyIds }: { favoritePropertyIds: number[] }) {
  const [favoriteProperties, setFavoriteProperties] = useState<ExclusiveProperty[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFavoriteProperties = () => {
      setIsLoading(true)
      setTimeout(() => {
        const filteredProperties = exclusiveProperties.filter(property => {
          const propertyId = Number(property.id);
          const isIncluded = favoritePropertyIds.some(favId => Number(favId) === propertyId);
          return isIncluded;
        });

        setFavoriteProperties(filteredProperties)
        setIsLoading(false)
      }, 1000)
    }

    fetchFavoriteProperties()
  }, [favoritePropertyIds])

  const handleFavoriteChange = (propertyId: number, isFavorite: boolean) => {
    if (!isFavorite) {
      setFavoriteProperties(prevProperties => 
        prevProperties.filter(property => property.id !== propertyId)
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

