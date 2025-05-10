'use client'
import { useEffect, useState, useRef } from 'react'
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
  Home,
  Copy,
  BuildingIcon,
  Badge
} from 'lucide-react'
import { ExclusiveProperty, AgentProfile } from '@/assets/data/data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from "@/hooks/use-toast"
import prop5 from "@/assets/images/prop3.jpg"
import prop4 from "@/assets/images/prop4.jpg"
import prop3 from "@/assets/images/prop2.jpg"
import { ScheduleTour } from '@/components/FindSpacePage/ScheduleTour'
import { getSupabaseClient } from '@/utils/supabase/client'

export default function PropertyDetails() {
  const { id } = useParams()
  const { toast } = useToast()
  const [property, setProperty] = useState<ExclusiveProperty | null>(null)
  const [agent, setAgent] = useState<AgentProfile | null>(null)
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
        
        // Fetch the agent if property has an agentId
        if (propertyData?.agentId) {
          const { data: agentData, error: agentError } = await supabase
            .from('agents')
            .select('*')
            .eq('id', propertyData.agentId)
            .single()
            
          if (!agentError) {
            setAgent(agentData)
          }
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

  const handleCallAgent = () => {
    if (isMobile && agent) {
      window.location.href = `tel:${agent.phoneNumber}`
    } else if (agent) {
      navigator.clipboard.writeText(agent.phoneNumber)
      setIsCopied(true)
      toast({
        title: "Phone number copied!",
        description: `${agent.phoneNumber} has been copied to your clipboard.`,
      })
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-space-darkgreen border-t-space-greens rounded-full animate-spin mb-4"></div>
          <div className="text-xl font-semibold text-space-darkgreen">Loading property details...</div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-space-darkgreen mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the property you're looking for</p>
          <Button asChild className="bg-space-darkgreen text-space-greens hover:bg-space-blacks">
            <a href="/find-space">Browse Other Properties</a>
          </Button>
        </div>
      </div>
    )
  }

  const features = [
    'Modern Kitchen', 
    'Garden', 
    'Parking', 
    'Security System', 
    'Central Heating', 
    'Air Conditioning'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 pt-16 font-urbanist">
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
        
        {/* Property Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-space-darkgreen text-space-greens px-4 py-2 rounded-full font-semibold">
            {property.status}
          </div>
        </div>
        
        {/* Carousel Controls */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-space-darkgreen"
        >
          <ChevronLeft className="w-6 h-6 text-space-darkgreen" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-space-darkgreen"
        >
          <ChevronRight className="w-6 h-6 text-space-darkgreen" />
        </button>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
          {currentImageIndex + 1} / {images.length}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-space-darkgreen p-4 rounded-md gap-4 mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-space-greens">{property.name}</h1>
                <div className="text-2xl md:text-3xl font-bold text-space-greens">
                  {property.price}
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <MapPin className="w-5 h-5 mr-2 text-space-darkgreen" />
                <span className="text-lg text-gray-700">{property.location}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow-sm">
                  <BedDouble className="w-8 h-8 text-space-darkgreen mb-2" />
                  <div className="text-xl font-semibold text-space-darkgreen">{property.numberOfBeds}</div>
                  <div className="text-sm text-gray-500">Bedrooms</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow-sm">
                  <Bath className="w-8 h-8 text-space-darkgreen mb-2" />
                  <div className="text-xl font-semibold text-space-darkgreen">{property.numberOfBaths}</div>
                  <div className="text-sm text-gray-500">Bathrooms</div>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl shadow-sm">
                  <Ruler className="w-8 h-8 text-space-darkgreen mb-2" />
                  <div className="text-xl font-semibold text-space-darkgreen">{property.landSize}</div>
                  <div className="text-sm text-gray-500">Land Size</div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4 text-space-darkgreen">About This Property</h2>
                <p className="text-gray-700 leading-relaxed mb-8">
                  {property.description}
                </p>

                <h2 className="text-2xl font-semibold mb-4 text-space-darkgreen">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
                  {features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="bg-space-greens rounded-full p-1">
                        <CheckIcon className="w-4 h-4 text-space-darkgreen" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-32">
              <Card className="overflow-hidden rounded-2xl shadow-xl">
                <CardContent className="p-0">
                  <div className="bg-space-darkgreen text-space-greens p-6">
                    <h2 className="text-xl font-semibold mb-1">Interested in this property?</h2>
                    <p className="text-space-greens/90 text-sm">
                      Schedule a tour or contact the agent directly
                    </p>
                  </div>
                  
                  <div className="p-6">
                    {agent ? (
                      <>
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                          <div className="relative w-16 h-16 shadow-md rounded-full overflow-hidden">
                            <Image
                              src={agent.profilePictureUrl}
                              alt={agent.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{agent.name}</div>
                            <div className="text-space-darkgreen text-sm">{agent.specialization}</div>
                            <div className="text-gray-500 text-xs">{agent.experience} experience</div>
                          </div>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-space-darkgreen" />
                            <span className="text-gray-700">{agent.phoneNumber}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-space-darkgreen" />
                            <span className="text-gray-700">{agent.contactEmail}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <div className="bg-space-greens p-4 rounded-full">
                          <BuildingIcon className="w-8 h-8 text-space-darkgreen" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Listed by Keyspace</div>
                          <div className="text-space-darkgreen text-sm">Verified Property</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge className="w-3 h-3 text-blue-500" />
                            <span className="text-xs text-gray-500">Official Listing</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {property.status === 'Sold' ? (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4 text-center">
                          <div className="font-semibold mb-1">Property Sold</div>
                          <div className="text-sm">This property is no longer available for tours.</div>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setIsScheduleModalOpen(true)} 
                          className="w-full bg-space-darkgreen text-space-greens hover:bg-space-darkgreen/90"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule a Tour
                        </Button>
                      )}
                      
                      {agent && (
                        <Button 
                          variant={isCopied ? "outline" : "outline"} 
                          onClick={handleCallAgent}
                          className={`w-full border-space-darkgreen text-space-darkgreen hover:bg-space-darkgreen hover:text-space-greens ${isCopied ? 'bg-green-50' : ''}`}
                        >
                          {isCopied ? (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Phone className="w-4 h-4 mr-2" />
                              {isMobile ? 'Call Agent' : 'Copy Phone Number'}
                            </>
                          )}
                        </Button>
                      )}
                    </div>
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
        propertyStatus={property.status}
        propertyId={property.propertyId}
      />
    </div>
  )
}