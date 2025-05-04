"use client";

import { Suspense, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PropertyCard from "@/components/Custom/PropertyCard";
import { ExclusiveProperty } from "@/assets/data/data";
import { Search, SlidersHorizontal, Heart, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FindSpaceLoading from "./loading";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/utils/supabase/client";

export default function FindSpacePage() {
  // State for properties and loading
  const [allProperties, setAllProperties] = useState<ExclusiveProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<ExclusiveProperty[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<ExclusiveProperty[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [minBeds, setMinBeds] = useState<number | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const propertiesPerPage = 30;
  
  const router = useRouter();

  // Fetch all properties on initial load
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      const supabase = getSupabaseClient();
      
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*");
          
        if (error) {
          throw error;
        }
        
        setAllProperties(data || []);
        setFilteredProperties(data || []);
        setTotalPages(Math.ceil((data?.length || 0) / propertiesPerPage));
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  // Apply search and filters 
  useEffect(() => {
    let result = [...allProperties];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(property => 
        property.name.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      );
    }
    
    // Apply price range filter
    if (priceRange) {
      result = result.filter(property => {
        // Remove non-numeric characters and convert to number
        const price = Number(property.price.replace(/[^0-9.-]+/g, ""));
        
        switch(priceRange) {
          case 'less-than-1m':
            return price < 1000000;
          case 'above-1m':
            return price >= 1000000;
          case 'less-than-5m':
            return price < 5000000;
          case 'above-5m':
            return price >= 5000000;
          default:
            return true;
        }
      });
    }
    
    // Apply property type filter
    if (propertyType) {
      result = result.filter(property => property.status === propertyType);
    }
    
    // Apply beds filter
    if (minBeds !== null) {
      result = result.filter(property => property.numberOfBeds >= minBeds);
    }
    
    setFilteredProperties(result);
    setTotalPages(Math.ceil(result.length / propertiesPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, priceRange, propertyType, minBeds, allProperties]);

  // Update displayed properties when page or filtered properties change
  useEffect(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    setDisplayedProperties(filteredProperties.slice(startIndex, endIndex));
  }, [currentPage, filteredProperties]);

  // Search function
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange(null);
    setPropertyType(null);
    setMinBeds(null);
  };

  return (
    <Suspense fallback={<FindSpaceLoading />}>
      <div className="min-h-screen w-full max-w-7xl mx-auto bg-gray-50 font-urbanist">
        {/* Hero Section */}
        <div className="bg-space-darkgreen text-white py-16 px-4 md:px-10">
          <div className="container mx-auto pt-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-urbanist">
              Find Your Perfect Space
            </h1>
            <p className="text-space-greens text-lg mb-8 max-w-2xl">
              Discover your dream property from our exclusive collection of
              homes, apartments, and luxury estates.
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
                  onChange={handleSearch}
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
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Properties</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <Accordion type="multiple" className="w-full">
                      {/* Price Range Filter */}
                      <AccordionItem value="price">
                        <AccordionTrigger>Price Range</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup 
                            value={priceRange || ""} 
                            onValueChange={(value) => setPriceRange(value || null)}
                          >
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="less-than-1m" id="less-than-1m" />
                              <Label htmlFor="less-than-1m">Less than $1M</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="above-1m" id="above-1m" />
                              <Label htmlFor="above-1m">$1M and above</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="less-than-5m" id="less-than-5m" />
                              <Label htmlFor="less-than-5m">Less than $5M</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="above-5m" id="above-5m" />
                              <Label htmlFor="above-5m">$5M and above</Label>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Property Type Filter */}
                      <AccordionItem value="property-type">
                        <AccordionTrigger>Property Type</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup 
                            value={propertyType || ""} 
                            onValueChange={(value) => setPropertyType(value || null)}
                          >
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="For Sale" id="for-sale" />
                              <Label htmlFor="for-sale">For Sale</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="For Rent" id="for-rent" />
                              <Label htmlFor="for-rent">For Rent</Label>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Bedrooms Filter */}
                      <AccordionItem value="bedrooms">
                        <AccordionTrigger>Bedrooms</AccordionTrigger>
                        <AccordionContent>
                          <RadioGroup 
                            value={minBeds?.toString() || ""} 
                            onValueChange={(value) => setMinBeds(value ? parseInt(value) : null)}
                          >
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="1" id="beds-1" />
                              <Label htmlFor="beds-1">1+ Bedrooms</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="2" id="beds-2" />
                              <Label htmlFor="beds-2">2+ Bedrooms</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="3" id="beds-3" />
                              <Label htmlFor="beds-3">3+ Bedrooms</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="4" id="beds-4" />
                              <Label htmlFor="beds-4">4+ Bedrooms</Label>
                            </div>
                            <div className="flex items-center space-x-2 py-2">
                              <RadioGroupItem value="5" id="beds-5" />
                              <Label htmlFor="beds-5">5+ Bedrooms</Label>
                            </div>
                          </RadioGroup>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <SheetFooter>
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="w-full mt-4"
                    >
                      Reset Filters
                    </Button>
                  </SheetFooter>
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
              {isLoading ? "Loading..." : `${filteredProperties.length} Properties Available`}
            </h2>
            <div className="flex gap-4">
              <Button
                onClick={() => router.push("profile/favorites")}
                variant="outline"
                className="rounded-full flex items-center gap-2 cursor-pointer"
              >
                <Heart size={20} />
                Favorites
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(priceRange || propertyType || minBeds !== null) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {priceRange && (
                <div className="bg-space-darkgreen text-space-greens px-3 py-1 rounded-full text-sm flex items-center">
                  {priceRange === 'less-than-1m' && 'Less than $1M'}
                  {priceRange === 'above-1m' && '$1M and above'}
                  {priceRange === 'less-than-5m' && 'Less than $5M'}
                  {priceRange === 'above-5m' && '$5M and above'}
                </div>
              )}
              {propertyType && (
                <div className="bg-space-darkgreen text-space-greens px-3 py-1 rounded-full text-sm flex items-center">
                  {propertyType}
                </div>
              )}
              {minBeds !== null && (
                <div className="bg-space-darkgreen text-space-greens px-3 py-1 rounded-full text-sm flex items-center">
                  {minBeds}+ Bedrooms
                </div>
              )}
            </div>
          )}

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Show loading skeletons
              Array(6).fill(0).map((_, index) => (
                <div key={index} className="h-[400px] bg-gray-200 animate-pulse rounded-lg"></div>
              ))
            ) : displayedProperties.length > 0 ? (
              displayedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <p className="text-xl text-gray-500">No properties match your search criteria</p>
                <Button 
                  variant="link" 
                  onClick={resetFilters}
                  className="mt-2"
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-full w-10 h-10 p-0"
              >
                &lt;
              </Button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Calculate which page numbers to show
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`rounded-full w-10 h-10 p-0 ${
                      currentPage === pageNum ? "bg-space-darkgreen text-space-greens" : ""
                    }`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full w-10 h-10 p-0"
              >
                &gt;
              </Button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
}
