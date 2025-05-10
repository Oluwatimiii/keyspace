'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registerAgent } from './actions'
import { useAuthStore } from "@/store/authStore"
import { useRouter, useSearchParams } from 'next/navigation'
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'

export default function AgentPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [employmentType, setEmploymentType] = useState<'self-employed' | 'company' | ''>('')
  const [location, setLocation] = useState('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const user = useAuthStore((state) => state.user)
  const searchParams = useSearchParams()
  const { toast } = useToast()
  
  console.log("user in register page", user)
  const router = useRouter()

  // Check if redirected with a reason
  useEffect(() => {
    const reason = searchParams.get('reason')
    
    if (reason === 'agent_required') {
      toast({
        title: "Agent Registration Required",
        description: "Your agent account was not found. You need to register as an agent to access this feature.",
        variant: "default",
      })
    } else if (reason === 'access_denied') {
      toast({
        title: "Agent Access Only",
        description: "This feature is only available to registered agents. Please complete the registration form.",
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  // List of popular cities for the location dropdown
  const cities = [
    "New York, USA", "Los Angeles, USA", "London, UK", "Paris, France",
    "Tokyo, Japan", "Sydney, Australia", "Dubai, UAE", "Mumbai, India",
    "Toronto, Canada", "Berlin, Germany", "Madrid, Spain", "São Paulo, Brazil", "Lagos, Nigeria",
    "Cape Town, South Africa", "Singapore", "Hong Kong", "Amsterdam, Netherlands",
    "Moscow, Russia", "Istanbul, Turkey", "Mexico City, Mexico", "Bangkok, Thailand"
  ]

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setProfileImage(null)
      setImagePreview(null)
    }
  }

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)

    // Validate image
    if (!profileImage) {
      setError('Profile image is required')
      setIsLoading(false)
      return
    }

    // Check if location is selected
    if (!location) {
      setError('Please select a location')
      setIsLoading(false)
      return
    }

    // Add location to form data
    formData.append('location', location)
    
    // Add employment type and company info if needed
    formData.append('employmentType', employmentType)
    
    // Add user ID to form data
    if (user?.id) {
      formData.append('userId', user.id)
    } else {
      setError('You must be logged in to register as an agent')
      setIsLoading(false)
      return
    }
    
    // Add user email to form data if not provided
    if (!formData.get('contactEmail')) {
      if (user?.email) {
        formData.append('contactEmail', user.email)
      }
    }

    // Add the profile image
    formData.append('profileImage', profileImage)
    
    // Log form data for debugging - remove in production
    console.log('Form data being sent:')
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value instanceof File ? 'File: ' + value.name : value}`)
    }
    
    const result = await registerAgent(formData)
    
    setIsLoading(false)
    
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-urbanist">
      {/* Hero Section */}
      <div className="bg-space-darkgreen text-white py-16 px-4 md:px-10">
        <div className="container mx-auto pt-6">
          <div className="mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Register as a Keyspace Agent Today.
              </h1>
              <p className="text-space-greens text-lg mb-8 max-w-2xl">
                Become a real estate professional and help in securing the perfect space for users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Agent Registration</CardTitle>
              <CardDescription>
                Complete the form below to register as a Keyspace agent.
              </CardDescription>
            </CardHeader>
            <form action={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <Label className="mb-2">Profile Picture</Label>
                  <div 
                    onClick={handleImageClick}
                    className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden hover:border-space-darkgreen transition-colors"
                  >
                    {imagePreview ? (
                      <Image 
                        src={imagePreview} 
                        alt="Profile preview" 
                        fill 
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-center px-2">
                        Click to upload<br/>profile image
                      </span>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="profileImage"
                    name="profileImage"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Square image, at least 300x300 pixels
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      defaultValue={user?.user_metadata?.name || ''} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select 
                      onValueChange={setLocation} 
                      required
                    >
                      <SelectTrigger id="location" name="location">
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input 
                      id="experience" 
                      name="experience" 
                      placeholder="e.g. 5 years" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail" 
                      type="email" 
                      defaultValue={user?.email || ''} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      name="phoneNumber" 
                      placeholder="(123) 456-7890" 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employmentType">Employment Type</Label>
                    <Select 
                      onValueChange={(value) => setEmploymentType(value as 'self-employed' | 'company')} 
                      required
                    >
                      <SelectTrigger id="employmentType" name="employmentType">
                        <SelectValue placeholder="Select your employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self-employed">Self-Employed</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Conditional Company Fields */}
                {employmentType === 'company' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        name="companyName" 
                        placeholder="Real Estate Company Inc." 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyAddress">Company Address</Label>
                      <Input 
                        id="companyAddress" 
                        name="companyAddress" 
                        placeholder="123 Business St, City" 
                        required 
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    placeholder="Tell us about yourself and your experience in real estate" 
                    className="min-h-32" 
                    required 
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-space-darkgreen text-space-greens hover:bg-space-darkgreen/90"
                  disabled={isLoading || !employmentType || !profileImage}
                >
                  {isLoading ? 'Processing...' : 'Register as Agent'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}
