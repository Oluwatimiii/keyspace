'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { 
  BedDouble, 
  Bath, 
  Ruler, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Phone,
  Mail,
  CheckIcon,
  Home
} from 'lucide-react'
import { ExclusiveProperty, AgentProfile } from '@/assets/data/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import prop5 from "@/assets/images/prop3.jpg"
import prop4 from "@/assets/images/prop4.jpg"
import prop3 from "@/assets/images/prop2.jpg"
import { ScheduleTour } from '@/components/FindSpacePage/ScheduleTour'
import { getSupabaseClient } from '@/utils/supabase/client'

export default function PropertyDetails() {
  const { id } = useParams()
  const [property, setProperty] = useState<ExclusiveProperty | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [randomAgent, setRandomAgent] = useState<AgentProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const images = [
    property?.imageUrl,
    prop5.src,
    prop4.src,
    prop3.src,
  ].filter(Boolean)

  useEffect(() => {
    const fetchPropertyAndAgent = async () => {
      setIsLoading(true)
      const supabase = getSupabaseClient()
      
      try {
        // Fetch property details
        const { data: propertyData, error: propertyError } = await supabase
          .from('properties')
          .select('*')
          .eq('id', Number(id))
          .single()
          
        if (propertyError) throw propertyError
        setProperty(propertyData)
        
        // Fetch a random agent
        const { data: agentsData, error: agentsError } = await supabase
          .from('agents')
          .select('*')
          
        if (agentsError) throw agentsError
        
        if (agentsData && agentsData.length > 0) {
          const randomIndex = Math.floor(Math.random() * agentsData.length)
          setRandomAgent(agentsData[randomIndex])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchPropertyAndAgent()
  }, [id])

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading property details...</div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Property not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Image Carousel */}
      <div className="relative h-[70vh] w-full bg-black">
        <div className="relative h-full w-full">
          <Image
            src={images[currentImageIndex] || ''}
            alt={`${property.name} view ${currentImageIndex + 1}`}
            fill
            className="object-cover opacity-90"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
        </div>
        
        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-space-darkgreen text-space-greens rounded-lg shadow-sm p-6 mb-8">
              <h1 className="text-4xl font-bold mb-4">{property.name}</h1>
              <div className="flex items-center  mb-6">
                <MapPin className="w-5 h-5 mr-2 text-space-fades" />
                <span className="text-lg text-space-greens">{property.location}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                  <BedDouble className="w-6 h-6 text-space-darkgreen" />
                  <div className="font-semibold text-space-darkgreen">
                    <div>{property.numberOfBeds}</div>
                    <div className="text-sm">Bedrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                  <Bath className="w-6 h-6 text-space-darkgreen" />
                  <div className="font-semibold text-space-darkgreen">
                    <div>{property.numberOfBaths}</div>
                    <div className="text-sm">Bathrooms</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 p-4 rounded-lg">
                  <Ruler className="w-6 h-6 text-space-darkgreen" />
                  <div className="font-semibold text-space-darkgreen">
                    <div>{property.landSize}</div>
                    <div className="text-sm">Land Size</div>
                  </div>
                </div>
              </div>

              <div className="text-3xl font-bold text-space-greens mb-6">
                {property.price}
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About This Property</h2>
                <p className="text-gray-100 mb-6">{property.description}</p>

                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {['Modern Kitchen', 'Garden', 'Parking', 'Security System', 'Central Heating', 'Air Conditioning'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckIcon className="w-5 h-5 text-space-fades" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <Card>
                <CardContent className="p-6">
                  <div className="text-xl font-semibold mb-6">Contact Agent</div>
                  
                  {randomAgent ? (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative w-16 h-16 shadow-md rounded-full overflow-hidden">
                          <Image
                            src={randomAgent.profilePictureUrl}
                            alt={randomAgent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold">{randomAgent.name}</div>
                          <div className="text-space-darkgreen">Agent For {randomAgent.specialization}</div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-space-darkgreen" />
                          <span>{randomAgent.phoneNumber}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-space-darkgreen" />
                          <span>{randomAgent.contactEmail}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">No agent information available</div>
                  )}

                  <div className="space-y-3">
                    <Button onClick={() => setIsScheduleModalOpen(true)} className="w-full bg-space-darkgreen hover:bg-space-darkgreen/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule a Tour
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ScheduleTour 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        propertyName={property.name}
      />
    </div>
  )
}