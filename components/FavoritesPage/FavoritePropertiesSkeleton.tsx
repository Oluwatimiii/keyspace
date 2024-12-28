import { Skeleton } from "@/components/ui/skeleton"

export default function FavoritePropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
          <Skeleton className="h-48 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

