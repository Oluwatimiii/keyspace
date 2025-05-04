'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function registerAgent(formData: FormData) {
  try {
    // Extract data from form
    const userId = formData.get('userId') as string
    const name = formData.get('name') as string
    const location = formData.get('location') as string
    const experience = formData.get('experience') as string
    const contactEmail = formData.get('contactEmail') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const employmentType = formData.get('employmentType') as string
    const companyName = formData.get('companyName') as string || null
    const companyAddress = formData.get('companyAddress') as string || null
    const bio = formData.get('bio') as string
    const profileImage = formData.get('profileImage')
    
    console.log("Server received form data:", { 
      userId, name, location, experience, contactEmail, 
      phoneNumber, employmentType, 
      profileImage: profileImage ? 'Image received' : 'No image' 
    })

    // Validate required fields one by one for better error messages
    if (!userId) return { error: 'User ID is missing' }
    if (!name) return { error: 'Name is required' }
    if (!location) return { error: 'Location is required' }
    if (!experience) return { error: 'Experience is required' }
    if (!contactEmail) return { error: 'Contact email is required' }
    if (!phoneNumber) return { error: 'Phone number is required' }
    if (!employmentType) return { error: 'Employment type is required' }
    if (!bio) return { error: 'Bio is required' }
    if (!profileImage) return { error: 'Profile image is required' }

    // Validate company fields if employment type is company
    if (employmentType === 'company' && (!companyName || !companyAddress)) {
      return { error: 'Company name and address are required' }
    }

    const supabase = await createClient()

    // First check if user already exists as an agent
    const { data: existingAgent, error: checkError } = await supabase
      .from('agents')
      .select('id')
      .eq('userId', userId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.log('Error checking for existing agent:', checkError)
      return { error: 'Error checking agent status: ' + checkError.message }
    }

    if (existingAgent) {
      return { error: 'You are already registered as an agent' }
    }
    
    // Handle the profile image
    let publicUrl = ''
    if (profileImage) {
      // Get file details
      let fileName, fileType
      if (profileImage instanceof File) {
        fileName = profileImage.name
        fileType = profileImage.type
      } else {
        // For FormData entries that aren't File objects in server components
        const fileInfo = formData.get('profileImageName') as string || 'image.jpg'
        fileName = fileInfo
        fileType = 'image/jpeg'
      }
      
      const fileExt = fileName.split('.').pop() || 'jpg'
      const uniqueFileName = `agent-${userId}-${Date.now()}.${fileExt}`
      const filePath = `agent-profiles/${uniqueFileName}`
      
      // Convert to Blob if necessary - this is crucial for server components
      let fileBlob: Blob
      
      // First check if it's already a File or Blob type
      if (typeof profileImage === 'object' && profileImage !== null) {
        // Use type assertion to allow instanceof checks
        const imageObject = profileImage as object
        if (imageObject instanceof File || imageObject instanceof Blob) {
          fileBlob = imageObject as Blob
        } else {
          // For FormData entries that might be binary data
          try {
            // Attempt to treat as blob-like object
            const blobLike = profileImage as unknown as { arrayBuffer(): Promise<ArrayBuffer> }
            const arrayBuffer = await blobLike.arrayBuffer()
            fileBlob = new Blob([arrayBuffer], { type: fileType })
          } catch (error) {
            console.error('Failed to process profile image:', error)
            throw new Error('Invalid profile image format')
          }
        }
      } else {
        throw new Error('Profile image must be a File or Blob')
      }

      // Upload profile image to storage
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, fileBlob, {
          contentType: fileType,
          upsert: true
        })

      if (uploadError) {
        console.log('Error uploading profile image:', uploadError)
        return { error: 'Error uploading profile image: ' + uploadError.message }
      }

      // Get the public URL for the uploaded image
      const { data: { publicUrl: url } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath)
        
      publicUrl = url
    }

    // Insert new agent record
    const { error: insertError } = await supabase
      .from('agents')
      .insert({
        userId: userId,
        name: name,
        location: location,
        experience: experience,
        contactEmail: contactEmail,
        phoneNumber: phoneNumber,
        profilePictureUrl: publicUrl,
        employmentType: employmentType,
        companyName: companyName,
        companyAddress: companyAddress,
        specialization: employmentType === 'self-employed' ? 'Independent Agent' : `${companyName} Agent`,
        bio: bio
      })

    if (insertError) {
      console.log('Error inserting agent:', insertError)
      return { error: 'Error registering as agent: ' + insertError.message }
    }

    // Update user's metadata to include agent role
    const { error: updateError } = await supabase.auth.updateUser({
      data: { 
        isAgent: true,
        employmentType: employmentType,
        companyName: companyName
      }
    })

    if (updateError) {
      console.log('Error updating user metadata:', updateError)
      return { error: 'Error updating user profile: ' + updateError.message }
    }
  } catch (error) {
    console.error('Error in agent registration:', error)
    return { error: 'An unexpected error occurred: ' + (error instanceof Error ? error.message : String(error)) }
  }  finally {
        // Redirect to agent dashboard
        redirect('/authenticated/dashboard')
  }
} 