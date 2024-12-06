import { Card, CardContent } from "@/components/ui/card";
import {
  Building3,
  ChartCircle,
  Lovely,
  SafeHome,
  Shapes,
  SmartHome,
} from "iconsax-react";

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: <SafeHome size="32" color="#0c3122" />,
    title: "Comfortable Living",
    description: "Experience the best in comfort and style.",
  },
  {
    icon: <SmartHome size="32" color="#0c3122" />,
    title: "Modern Bathrooms",
    description: "Enjoy our state-of-the-art bathroom facilities.",
  },
  {
    icon: <Building3 size="32" color="#0c3122" />,
    title: "Spacious Interiors",
    description: "Plenty of room for you and your family.",
  },
  {
    icon: <Lovely size="32" color="#0c3122" />,
    title: "Prime Locations",
    description: "Properties in the best locations.",
  },
  {
    icon: <ChartCircle size="32" color="#0c3122" />,
    title: "Luxury Amenities",
    description: "Access to exclusive amenities.",
  },
  {
    icon: <Shapes size="32" color="#0c3122" />,
    title: "Eco-Friendly",
    description: "Sustainable and eco-friendly properties.",
  },
];

export default function Highlights() {
  return (
    <div className="container mx-auto px-6 pb-10">
        <div className="text-center mb-16 font-urbanist">
          <h2 className="text-3xl md:text-4xl text-space-darkgreen font-bold mb-4">
            Highlights Of Our Space Keyping Expertise
          </h2>
          <p className="text-space-blacks max-w-xl mx-auto">
            Discover our handpicked selection of the most prestigious properties
            available in prime locations.
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-urbanist gap-6 max-w-3xl mx-auto">
        {highlights.map((highlight, index) => (
          <Card
            key={index}
            className="transition-all duration-300 bg-gray-50 hover:bg-gray-100 text-space-blacks border-[0.3px] border-gray-200 shadow-none"
          >
            <CardContent className="flex flex-col items-start p-4 gap-3">
              {highlight.icon}
              <h3 className="text-lg font-bold text-space-darkgreen">
                {highlight.title}
              </h3>
              <p className="text-space-blacks text-sm md:text-base">
                {highlight.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
