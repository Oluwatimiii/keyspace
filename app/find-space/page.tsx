'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import PropertyCard from "@/components/Custom/PropertyCard"
import { exclusiveProperties, ExclusiveProperty } from "@/assets/data/data"
import { Search, SlidersHorizontal, Heart, BookmarkPlus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FindSpacePage() {
  const [properties, setProperties] = useState<ExclusiveProperty[]>(exclusiveProperties)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 font-urbanist">
      {/* Hero Section */}
      <div className="bg-space-darkgreen text-white py-16 px-4 md:px-10">
        <div className="container mx-auto pt-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-urbanist">
            Find Your Perfect Space
          </h1>
          <p className="text-space-greens text-lg mb-8 max-w-2xl">
            Discover your dream property from our exclusive collection of homes, apartments, and luxury estates.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl md:items-center">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by location, property type, or keywords"
                className="pl-10 py-6 w-full rounded-full bg-white text-space-blacks"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="rounded-full bg-space-greens text-space-darkgreen hover:bg-white flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Properties</SheetTitle>
                </SheetHeader>
                <Accordion type="single" collapsible className="mt-4">
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      {/* Add price range slider/inputs */}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="property-type">
                    <AccordionTrigger>Property Type</AccordionTrigger>
                    <AccordionContent>
                      {/* Add property type checkboxes */}
                    </AccordionContent>
                  </AccordionItem>
                  {/* Add more filter options */}
                </Accordion>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 md:px-10 py-12">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-space-blacks">
            {properties.length} Properties Available
          </h2>
          <div className="flex gap-4">
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              <Heart size={20} />
              Favorites
            </Button>
            <Button variant="outline" className="rounded-full flex items-center gap-2">
              <BookmarkPlus size={20} />
              Saved
            </Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <Button className="rounded-full bg-space-darkgreen text-space-greens hover:bg-space-blacks">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  )
}

