'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AgentProfile, ExclusiveProperty } from "@/assets/data/data"
import { CalendarClock, Clock, Home, ListChecks, MessageSquare, Plus, User } from "lucide-react"
import { getSupabaseClient } from "@/utils/supabase/client"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface TourRequest {
  id: string;
  clientName: string;
  clientEmail: string;
  scheduledTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  agentId: string;
  properties: {
    name: string;
    location: string;
    imageUrl: string;
  };
}

export default function DashboardPage() {
  const [isAgent, setIsAgent] = useState(false)
  const [agentProfile, setAgentProfile] = useState<AgentProfile | null>(null)
  const [properties, setProperties] = useState<ExclusiveProperty[]>([])
  const [tourRequests, setTourRequests] = useState<TourRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'properties' | 'tours' | 'analytics'>('properties')
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    async function fetchAgentData() {
      setIsLoading(true)
      const supabase = getSupabaseClient()
      
      try {
        // Check if user is an agent
        const isAgentUser = user?.user_metadata?.isAgent === true
        setIsAgent(isAgentUser)
        
        if (isAgentUser) {
          // Fetch agent profile
          const { data: agentData, error: agentError } = await supabase
            .from('agents')
            .select('*')
            .eq('userId', user.id)
            .single()
            
          if (agentError && agentError.code !== 'PGRST116') {
            console.log('Error fetching agent profile:', agentError)
          } else if (agentData) {
            setAgentProfile(agentData)
            
            // Fetch properties associated with this agent
            const { data: propertiesData, error: propertiesError } = await supabase
              .from('properties')
              .select('*')
              .eq('agentId', agentData.id)
              
            if (propertiesError) {
              console.log('Error fetching properties:', propertiesError)
            } else {
              setProperties(propertiesData || [])
            }
            
            // Fetch tour requests
            const { data: tourData, error: tourError } = await supabase
              .from('tourRequests')
              .select(`
                *,
                properties(name, location, imageUrl)
              `)
              .eq('agentId', agentData.id)
              .order('scheduledTime', { ascending: false })
              
            if (tourError) {
              setTourRequests([])
              console.log('Error fetching tour requests:', tourError)
            } else {
              setTourRequests(tourData || [])
            }
          }
        }
      } catch (error) {
        console.log('Error in fetching agent data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchAgentData()
  }, [user, router])

  // Helper for onboarding progress
  const onboardingTasks = [
    { label: 'Interview', done: true },
    { label: 'Team Meeting', done: true },
    { label: 'Project Update', done: false },
    { label: 'Discuss Q3 Goals', done: false },
    { label: 'HR Policy Review', done: false },
    { label: 'Profile Setup', done: false },
    { label: 'First Listing', done: false },
    { label: 'First Tour', done: false },
  ];
  const completedTasks = onboardingTasks.filter(t => t.done).length;
  const onboardingPercent = Math.round((completedTasks / onboardingTasks.length) * 100);

  // If not an agent, promote becoming an agent
  if (!isLoading && !isAgent) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Your Listings</h2>
            <p className="text-muted-foreground mb-4">You have no active listings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
            <p className="text-muted-foreground mb-4">You have no active bookings.</p>
            <Button>Find a Space</Button>
          </div>
        </div>
        
        <div className="bg-space-darkgreen text-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-3">Become a Keyspace Agent</h2>
          <p className="mb-4">
            Join our network of professional agents and help clients find their perfect spaces.
            Expand your reach and grow your real estate business with Keyspace.
          </p>
          <Button 
            className="bg-space-greens text-space-darkgreen hover:bg-white"
            onClick={() => router.push('/agent/register')}
          >
            Register as Agent
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-yellow-50 font-urbanist pt-20">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
              Welcome{agentProfile ? `, ${agentProfile.name.split(' ')[0]}` : ''}
            </h1>
            <div className="flex gap-4 text-gray-500 text-sm">
              <span>Properties: <b>{properties.length}</b></span>
              <span>Tours: <b>{tourRequests.length}</b></span>
              <span>Onboarding: <b>{onboardingPercent}%</b></span>
            </div>
          </div>
          {agentProfile && (
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-yellow-200 shadow">
                <Image src={agentProfile.profilePictureUrl} alt={agentProfile.name} fill className="object-cover" />
              </div>
              <div>
                <div className="font-bold text-lg text-gray-800">{agentProfile.name}</div>
                <div className="text-space-darkgreen text-sm">{agentProfile.specialization}</div>
              </div>
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Progress & Onboarding */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            {/* Progress Card */}
            <Card className="bg-gradient-to-br from-white to-yellow-50 shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Progress</CardTitle>
                <CardDescription>Work Time This Week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-4">
                    <svg className="absolute top-0 left-0" width="96" height="96">
                      <circle cx="48" cy="48" r="44" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                      <circle cx="48" cy="48" r="44" stroke="#ceff47" strokeWidth="8" fill="none" strokeDasharray={276} strokeDashoffset={276 - (onboardingPercent / 100) * 276} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-800">
                      {onboardingPercent}%
                    </div>
                  </div>
                  <div className="text-gray-500 text-sm">Onboarding Complete</div>
                </div>
              </CardContent>
            </Card>
            {/* Onboarding Tasks */}
            <Card className="bg-white shadow-xl rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Onboarding Tasks</CardTitle>
                <CardDescription>{completedTasks} / {onboardingTasks.length} completed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {onboardingTasks.map((task, idx) => (
                    <li key={task.label} className="flex items-center gap-3">
                      <span className={`w-4 h-4 rounded-full border-2 ${task.done ? 'bg-yellow-300 border-yellow-400' : 'bg-gray-100 border-gray-300'}`}></span>
                      <span className={task.done ? 'line-through text-gray-400' : 'text-gray-700'}>{task.label}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content: Properties, Tours, Analytics */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-green-50">
                <CardContent className="py-6 flex flex-col items-center">
                  <div className="text-3xl font-bold text-space-darkgreen mb-1">{properties.length}</div>
                  <div className="text-gray-500">Properties</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-blue-50">
                <CardContent className="py-6 flex flex-col items-center">
                  <div className="text-3xl font-bold text-blue-700 mb-1">{tourRequests.length}</div>
                  <div className="text-gray-500">Tour Requests</div>
                </CardContent>
              </Card>
              <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-yellow-50">
                <CardContent className="py-6 flex flex-col items-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-1">{onboardingPercent}%</div>
                  <div className="text-gray-500">Onboarding</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex gap-6 border-b mb-6">
                <button
                  className={`pb-2 font-medium text-lg transition-colors ${activeTab === 'properties' ? 'border-b-2 border-space-darkgreen text-space-darkgreen' : 'text-gray-500 hover:text-space-darkgreen'}`}
                  onClick={() => setActiveTab('properties')}
                >
                  My Properties
                </button>
                <button
                  className={`pb-2 font-medium text-lg transition-colors ${activeTab === 'tours' ? 'border-b-2 border-space-darkgreen text-space-darkgreen' : 'text-gray-500 hover:text-space-darkgreen'}`}
                  onClick={() => setActiveTab('tours')}
                >
                  Tour Requests
                </button>
                <button
                  className={`pb-2 font-medium text-lg transition-colors ${activeTab === 'analytics' ? 'border-b-2 border-space-darkgreen text-space-darkgreen' : 'text-gray-500 hover:text-space-darkgreen'}`}
                  onClick={() => setActiveTab('analytics')}
                >
                  Analytics
                </button>
              </div>

              {/* Properties Tab */}
              {activeTab === 'properties' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">My Listed Properties</h2>
                    <Button className="bg-space-darkgreen text-space-greens hover:bg-space-blacks" asChild>
                     <Link href="/list-property/listing"> 
                        <Plus className="mr-2 h-4 w-4" /> Add New Property
                     </Link>
                    </Button>
                  </div>
                  {properties.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg shadow text-center">
                      <Home className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Properties Listed</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't listed any properties yet. Add your first property to get started.
                      </p>
                      <Button className="bg-space-darkgreen text-space-greens hover:bg-space-blacks" asChild>
                      <Link href="/list-property/listing"> 
                        <Plus className="mr-2 h-4 w-4" /> Add New Property
                     </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <Card key={property.propertyId} className="overflow-hidden rounded-xl">
                          <div className="relative h-48 w-full">
                            <Image
                              src={property.imageUrl}
                              alt={property.name}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-space-darkgreen text-space-greens px-2 py-1 rounded text-sm font-medium">
                              {property.status}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="text-lg font-bold">{property.name}</h3>
                            <p className="text-gray-600 mb-2">{property.location}</p>
                            <p className="text-space-darkgreen font-semibold mb-4">{property.price}</p>
                            <div className="flex justify-between">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-600">Remove</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tour Requests Tab */}
              {activeTab === 'tours' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Tour Requests</h2>
                  {tourRequests.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg shadow text-center">
                      <CalendarClock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Tour Requests</h3>
                      <p className="text-muted-foreground">
                        You don't have any pending tour requests at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {tourRequests.map((request) => (
                        <Card key={request.id} className="overflow-hidden rounded-xl">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-48 flex-shrink-0">
                              <Image
                                src={request.properties.imageUrl}
                                alt={request.properties.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <CardContent className="flex-1 p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-lg font-bold">{request.properties.name}</h3>
                                  <p className="text-gray-600">{request.properties.location}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  request.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {request.status === 'pending' ? 'Pending' :
                                   request.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                                </div>
                              </div>
                              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center">
                                  <User className="w-4 h-4 mr-2 text-gray-500" />
                                  <span>{request.clientName}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                  <span>{new Date(request.scheduledTime).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
                                  <span>{request.clientEmail}</span>
                                </div>
                                <div className="flex items-center">
                                  <ListChecks className="w-4 h-4 mr-2 text-gray-500" />
                                  <span>{request.notes || 'No additional notes'}</span>
                                </div>
                              </div>
                              <div className="mt-4 flex gap-2">
                                {request.status === 'pending' && (
                                  <>
                                    <Button className="bg-space-darkgreen text-space-greens hover:bg-space-blacks">
                                      Confirm
                                    </Button>
                                    <Button variant="outline" className="text-red-600">
                                      Decline
                                    </Button>
                                  </>
                                )}
                                {request.status === 'confirmed' && (
                                  <Button variant="outline">
                                    Send Reminder
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold mb-4">Performance Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-green-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Property Views</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{properties.length * 37}</div>
                        <p className="text-xs text-green-500 flex items-center">
                          +12% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-blue-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Tour Requests</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{tourRequests.length}</div>
                        <p className="text-xs text-green-500 flex items-center">
                          +5% from last month
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-2xl shadow bg-gradient-to-br from-white to-yellow-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {properties.length > 0 
                            ? Math.round((tourRequests.length / (properties.length * 37)) * 100) 
                            : 0}%
                        </div>
                        <p className="text-xs text-green-500 flex items-center">
                          +2% from last month
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="rounded-2xl shadow bg-white">
                    <CardHeader>
                      <CardTitle>Monthly Performance</CardTitle>
                      <CardDescription>
                        Your listing performance over the last 6 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <p>Analytics visualization will appear here</p>
                        <p className="text-sm mt-2">Connect more properties to see detailed analytics</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

