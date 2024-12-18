import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

export default function FindSpaceLoading() {
  return (
    <div className="min-h-screen bg-gray-50 font-urbanist">
      {/* Hero Section Skeleton */}
      <div className="bg-space-darkgreen text-white py-16 px-4 md:px-10">
        <div className="container mx-auto pt-6">
          <Skeleton className="h-12 w-3/4 mb-4 bg-gray-300" />
          <Skeleton className="h-6 w-1/2 mb-8 bg-gray-300" />

          {/* Search Bar Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl md:items-center">
            <Skeleton className="h-12 w-full md:w-3/4 rounded-full bg-gray-300" />
            <Skeleton className="h-12 w-32 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>

      {/* Results Section Skeleton */}
      <div className="container mx-auto px-4 md:px-10 py-12">
        {/* Results Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
          <Skeleton className="h-8 w-48 bg-gray-300" />
          <div className="flex gap-4">
            <Skeleton className="h-10 w-28 rounded-full bg-gray-300" />
            <Skeleton className="h-10 w-28 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Property Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <Skeleton className="h-48 w-full bg-gray-300" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300" />
                <Skeleton className="h-4 w-1/2 mb-4 bg-gray-300" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-1/3 bg-gray-300" />
                  <Skeleton className="h-10 w-28 rounded-full bg-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="flex justify-center mt-12">
          <Skeleton className="h-12 w-48 rounded-full bg-gray-300" />
        </div>
      </div>
    </div>
  )
}

