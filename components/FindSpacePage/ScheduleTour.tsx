'use client'

import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from '@/hooks/use-toast'

interface ScheduleTourProps {
  isOpen: boolean
  onClose: () => void
  propertyName: string
}

export function ScheduleTour({ isOpen, onClose, propertyName }: ScheduleTourProps) {
  const user = useAuthStore((state) => state.user)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.name || '',
    email: user?.email || '',
    phoneNumber: '',
    additionalDetails: '',
    agreeToTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    toast({
      title: "Tour Scheduled",
      description: "The agent has received your request and will contact you soon.",
    })
    clearForm() // Clear the form after successful submission
    onClose()
  }

  const clearForm = () => {
    setFormData({
      fullName: user?.user_metadata?.full_name || "",
      email: user?.email || "",
      phoneNumber: "",
      additionalDetails: "",
      agreeToTerms: false,
    })
  }
  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please log in to schedule a tour.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={onClose}>Close</Button>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-[425px] max-h-[90vh] max-w-[90vw] overflow-y-auto rounded-md">
        <DialogHeader>
          <DialogTitle>Schedule a Tour</DialogTitle>
          <DialogDescription>Fill out this form to schedule a tour for {propertyName}.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              readOnly={!!user?.user_metadata?.full_name}
              className={user?.user_metadata?.full_name ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              readOnly={!!user?.email}
              className={user?.email ? "bg-gray-100" : ""}
            />
          </div>
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onCheckedChange={handleCheckboxChange}
              required
            />
            <Label htmlFor="agreeToTerms" className="text-sm">
              By contacting this property, you agree to our Terms of Use. Visit our Privacy Policy for more information
              on how we use your data.
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={!formData.agreeToTerms}>
            Schedule Tour
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

