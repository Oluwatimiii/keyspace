'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getSupabaseClient } from '@/utils/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2, Upload, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function ListPropertyPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  // Property state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [landSize, setLandSize] = useState('')
  const [numberOfBeds, setNumberOfBeds] = useState<number>(0)
  const [numberOfBaths, setNumberOfBaths] = useState<number>(0)
  const [status, setStatus] = useState('For Sale')
  
  // Image upload state
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  
  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Clear selected image
  const clearImage = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a property",
        variant: "destructive",
      })
      router.push('/login')
      return
    }
    
    if (!selectedImage) {
      toast({
        title: "Image required",
        description: "Please upload at least one property image",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      const supabase = getSupabaseClient()
      
      // We'll let Supabase handle the ID autoincrement
      // But first check the max ID to help diagnose any issues
      const { data: maxIdData } = await supabase
        .from('properties')
        .select('id')
        .order('id', { ascending: false })
        .limit(1)
      
      console.log('Current max ID in properties table:', maxIdData?.[0]?.id || 'No properties found')
      
      // Get agent ID
      const { data: agentData, error: agentError } = await supabase
        .from('agents')
        .select('id')
        .eq('userId', user.id)
        .single()
      
      if (agentError && agentError.code !== 'PGRST116') {
        throw new Error("Failed to retrieve agent information")
      }
      
      const agentId = agentData?.id
      
      // Upload image to storage
      const fileExt = selectedImage.name.split('.').pop()
      const timestamp = new Date().getTime()
      const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `properties/${fileName}`
      
      // Upload the image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, selectedImage, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        throw new Error(uploadError.message)
      }
      
      // Generate public URL for the uploaded image
      const { data: urlData } = await supabase.storage
        .from('property-images')
        .getPublicUrl(filePath)
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to generate public URL for the uploaded image")
      }
      
      // Calculate next ID based on max ID
      const nextId = maxIdData && maxIdData[0] ? maxIdData[0].id + 1 : 1
      
      // Create property record with image URL and explicit ID
      const propertyData = {
        id: nextId,
        name,
        description,
        location,
        price,
        landSize,
        numberOfBeds,
        numberOfBaths,
        status,
        imageUrl: urlData.publicUrl,
        agentId: agentData?.id,
      }
      
      // Insert with explicit id to avoid conflicts
      console.log(propertyData, "propertyDATA result")
      const { error: insertError } = await supabase
        .from('properties')
        .insert(propertyData)
      
      if (insertError) {
        throw new Error(insertError.message)
      }
      
      toast({
        title: "Success!",
        description: "Your property listing has been created successfully.",
      })
      
      router.push('/authenticated/dashboard')
    } catch (error) {
      console.error("Error creating property listing:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create property listing",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setUploadProgress(0)
    }
  }
  
  return (
    <div className="min-h-screen pt-20 bg-gray-50 font-urbanist">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-space-darkgreen">List Your Property</h1>
        <p className="text-gray-600 mb-8">Fill out the form below to create a new property listing</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form section */}
          <Card className="md:col-span-2 shadow-lg border-0">
            <CardHeader className="bg-space-darkgreen text-white rounded-t-lg">
              <CardTitle>Property Information</CardTitle>
              <CardDescription className="text-space-greens">Enter details about your property</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Property Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. Modern Lakeview Villa" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g. San Francisco, CA" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input 
                        id="price" 
                        placeholder="e.g. $450,000" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="landSize">Land Size</Label>
                      <Input 
                        id="landSize" 
                        placeholder="e.g. 1,200 sq ft" 
                        value={landSize}
                        onChange={(e) => setLandSize(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="numberOfBeds">Bedrooms</Label>
                      <Input 
                        id="numberOfBeds" 
                        type="number" 
                        min="0"
                        value={numberOfBeds}
                        onChange={(e) => setNumberOfBeds(parseInt(e.target.value))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="numberOfBaths">Bathrooms</Label>
                      <Input 
                        id="numberOfBaths" 
                        type="number" 
                        min="0"
                        value={numberOfBaths}
                        onChange={(e) => setNumberOfBaths(parseInt(e.target.value))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={status} 
                      onValueChange={(value) => setStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your property in detail..." 
                      className="min-h-32"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-space-greens text-space-darkgreen hover:bg-yellow-400"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {uploadProgress > 0 ? `Uploading... ${uploadProgress}%` : 'Creating listing...'}
                    </>
                  ) : (
                    'Create Listing'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Image upload section */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-space-darkgreen text-white rounded-t-lg">
              <CardTitle>Property Image</CardTitle>
              <CardDescription className="text-space-greens">Upload a main image for your property</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {previewUrl ? (
                  <div className="relative rounded-lg overflow-hidden aspect-video">
                    <Image
                      src={previewUrl}
                      alt="Property preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 rounded-full h-8 w-8"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => document.getElementById('imageUpload')?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                )}
                
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageSelect}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
