import prop1 from "@/assets/images/prop1.jpg"
import prop2 from "@/assets/images/prop2.jpg"
import prop3 from "@/assets/images/prop3.jpg"
import prop4 from "@/assets/images/prop4.jpg"
import prop5 from "@/assets/images/prop5.jpg"
import prop6 from "@/assets/images/prop6.jpg"

export interface ExclusiveProperty {
    id: number;
    name: string;
    location: string;
    price: string;
    imageUrl: string;
    description: string;
    status: string;
    landSize: string;
    numberOfBeds: number;
    numberOfBaths: number;
}

export const exclusiveProperties: ExclusiveProperty[] = [
    {
        id: 1,
        name: "Luxury Villa",
        location: "Beverly Hills, CA",
        price: "$5,000,000",
        imageUrl: prop1.src,
        description: "A stunning villa with breathtaking views and modern amenities.",
        status: "For Sale",
        landSize: "10,000 sqft",
        numberOfBeds: 5,
        numberOfBaths: 4
    },
    {
        id: 2,
        name: "Penthouse Suite",
        location: "New York, NY",
        price: "$8,500,000",
        imageUrl: prop2.src,
        description: "An exquisite penthouse suite in the heart of the city.",
        status: "For Rent",
        landSize: "5,000 sqft",
        numberOfBeds: 3,
        numberOfBaths: 3
    },
    {
        id: 3,
        name: "Beachfront Mansion",
        location: "Malibu, CA",
        price: "$12,000,000",
        imageUrl: prop3.src,
        description: "A luxurious mansion with private beach access and stunning ocean views.",
        status: "For Sale",
        landSize: "20,000 sqft",
        numberOfBeds: 6,
        numberOfBaths: 5
    },
    {
        id: 4,
        name: "Modern Apartment",
        location: "San Francisco, CA",
        price: "$3,000,000",
        imageUrl: prop4.src,
        description: "A sleek and modern apartment in the heart of the city.",
        status: "For Rent",
        landSize: "2,000 sqft",
        numberOfBeds: 2,
        numberOfBaths: 2
    },
    {
        id: 5,
        name: "Country House",
        location: "Nashville, TN",
        price: "$1,200,000",
        imageUrl: prop5.src,
        description: "A charming country house with a large garden and peaceful surroundings.",
        status: "For Sale",
        landSize: "15,000 sqft",
        numberOfBeds: 4,
        numberOfBaths: 3
    },
    {
        id: 6,
        name: "Urban Loft",
        location: "Chicago, IL",
        price: "$2,500,000",
        imageUrl: prop6.src,
        description: "A stylish urban loft with open spaces and modern design.",
        status: "For Rent",
        landSize: "3,500 sqft",
        numberOfBeds: 3,
        numberOfBaths: 2
    },
    {
        id: 7,
        name: "Mountain Cabin",
        location: "Aspen, CO",
        price: "$1,800,000",
        imageUrl: "https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A cozy cabin with stunning mountain views and a private hot tub.",
        status: "For Sale",
        landSize: "8,000 sqft",
        numberOfBeds: 3,
        numberOfBaths: 2
    },
    {
        id: 8,
        name: "Lakefront Retreat",
        location: "Lake Tahoe, NV",
        price: "$4,000,000",
        imageUrl: "https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A serene retreat with lakefront access and picturesque views.",
        status: "For Sale",
        landSize: "12,000 sqft",
        numberOfBeds: 5,
        numberOfBaths: 4
    },
    {
        id: 9,
        name: "Historic Townhouse",
        location: "Charleston, SC",
        price: "$1,600,000",
        imageUrl: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A beautiful townhouse with historic charm and modern updates.",
        status: "For Sale",
        landSize: "2,500 sqft",
        numberOfBeds: 4,
        numberOfBaths: 3
    },
    {
        id: 10,
        name: "Tropical Villa",
        location: "Miami, FL",
        price: "$6,500,000",
        imageUrl: "https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A tropical paradise with a private pool and lush gardens.",
        status: "For Rent",
        landSize: "9,000 sqft",
        numberOfBeds: 6,
        numberOfBaths: 5
    },
    {
        id: 11,
        name: "Desert Oasis",
        location: "Phoenix, AZ",
        price: "$2,000,000",
        imageUrl: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A modern home with desert landscaping and stunning sunset views.",
        status: "For Sale",
        landSize: "7,000 sqft",
        numberOfBeds: 4,
        numberOfBaths: 3
    },
    {
        id: 12,
        name: "Eco-Friendly Home",
        location: "Portland, OR",
        price: "$1,900,000",
        imageUrl: "https://images.pexels.com/photos/209315/pexels-photo-209315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A sustainable home with energy-efficient features and green spaces.",
        status: "For Sale",
        landSize: "5,500 sqft",
        numberOfBeds: 3,
        numberOfBaths: 3
    },
    {
        id: 13,
        name: "Cliffside Estate",
        location: "Big Sur, CA",
        price: "$10,000,000",
        imageUrl: "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A breathtaking estate perched on a cliff with ocean views.",
        status: "For Sale",
        landSize: "25,000 sqft",
        numberOfBeds: 7,
        numberOfBaths: 6
    },
    {
        id: 14,
        name: "Suburban Haven",
        location: "Dallas, TX",
        price: "$1,300,000",
        imageUrl: "https://images.pexels.com/photos/415687/pexels-photo-415687.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A spacious home with a pool and family-friendly amenities.",
        status: "For Rent",
        landSize: "10,000 sqft",
        numberOfBeds: 5,
        numberOfBaths: 4
    },
    {
        id: 15,
        name: "Modern Farmhouse",
        location: "Austin, TX",
        price: "$2,700,000",
        imageUrl: "https://images.pexels.com/photos/1438834/pexels-photo-1438834.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A contemporary farmhouse with a rustic touch and stunning interiors.",
        status: "For Sale",
        landSize: "8,500 sqft",
        numberOfBeds: 4,
        numberOfBaths: 3
    },
    {
        id: 16,
        name: "Island Paradise",
        location: "Hawaii, HI",
        price: "$9,000,000",
        imageUrl: "https://images.pexels.com/photos/460695/pexels-photo-460695.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A luxurious island property with oceanfront access and tropical views.",
        status: "For Sale",
        landSize: "30,000 sqft",
        numberOfBeds: 8,
        numberOfBaths: 7
    },
    {
        id: 17,
        name: "Modern Bungalow",
        location: "Seattle, WA",
        price: "$1,800,000",
        imageUrl: "https://images.pexels.com/photos/534228/pexels-photo-534228.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A stylish bungalow with minimalist design and panoramic city views.",
        status: "For Sale",
        landSize: "6,000 sqft",
        numberOfBeds: 3,
        numberOfBaths: 2
    },
    {
        id: 18,
        name: "Countryside Villa",
        location: "Savannah, GA",
        price: "$2,300,000",
        imageUrl: "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A charming villa surrounded by lush greenery and peaceful landscapes.",
        status: "For Sale",
        landSize: "12,000 sqft",
        numberOfBeds: 5,
        numberOfBaths: 4
    },
    {
        id: 19,
        name: "Luxury Chalet",
        location: "Park City, UT",
        price: "$7,500,000",
        imageUrl: "https://images.pexels.com/photos/3639539/pexels-photo-3639539.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A luxury chalet with ski-in/ski-out access and high-end finishes.",
        status: "For Sale",
        landSize: "18,000 sqft",
        numberOfBeds: 6,
        numberOfBaths: 5
    },
    {
        id: 20,
        name: "Classic Manor",
        location: "Philadelphia, PA",
        price: "$4,200,000",
        imageUrl: "https://images.pexels.com/photos/987550/pexels-photo-987550.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A stately manor with elegant architecture and sprawling grounds.",
        status: "For Rent",
        landSize: "20,000 sqft",
        numberOfBeds: 7,
        numberOfBaths: 6
    },
    {
        id: 21,
        name: "Mediterranean Villa",
        location: "Santa Barbara, CA",
        price: "$6,800,000",
        imageUrl: "https://images.pexels.com/photos/7579042/pexels-photo-7579042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A Mediterranean-style villa with beautiful courtyards and fountains.",
        status: "For Sale",
        landSize: "15,000 sqft",
        numberOfBeds: 5,
        numberOfBaths: 4
    },
    {
        id: 22,
        name: "Modern Penthouse",
        location: "Los Angeles, CA",
        price: "$10,500,000",
        imageUrl: "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        description: "A luxurious penthouse with panoramic city views and designer finishes.",
        status: "For Rent",
        landSize: "4,000 sqft",
        numberOfBeds: 4,
        numberOfBaths: 3
    },
    {
        id: 23,
        name: "Riverside Cottage",
        location: "Boise, ID",
        price: "$1,100,000",
        imageUrl: "https://images.pexels.com/photos/1658083/pexels-photo-1658083.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A quaint cottage with riverside access and a peaceful environment.",
        status: "For Sale",
        landSize: "9,000 sqft",
        numberOfBeds: 3,
        numberOfBaths: 2
    },
    {
        id: 24,
        name: "City Center Loft",
        location: "Denver, CO",
        price: "$2,800,000",
        imageUrl: "https://images.pexels.com/photos/449023/pexels-photo-449023.jpeg?auto=compress&cs=tinysrgb&w=600",
        description: "A modern loft in the city center with an open-plan layout and views.",
        status: "For Rent",
        landSize: "3,000 sqft",
        numberOfBeds: 2,
        numberOfBaths: 2
    },
];

export interface AgentProfile {
    id: number;
    name: string;
    location: string;
    experience: string;
    contactEmail: string;
    phoneNumber: string;
    profilePictureUrl: string;
    specialization: string;
    rating: number; // Out of 5
    bio: string;
}

export const agents: AgentProfile[] = [
    {
        id: 1,
        name: "Jessica Brown",
        location: "Los Angeles, CA",
        experience: "10 years",
        contactEmail: "jessica.brown@realtypro.com",
        phoneNumber: "(323) 555-1234",
        profilePictureUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specialization: "Luxury Estates",
        rating: 4.9,
        bio: "Jessica is a top-rated agent specializing in luxury estates and beachfront properties. She is known for her dedication to clients and market expertise."
    },
    {
        id: 2,
        name: "Michael Davis",
        location: "Austin, TX",
        experience: "7 years",
        contactEmail: "michael.davis@urbanliving.com",
        phoneNumber: "(512) 555-5678",
        profilePictureUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Urban Lofts",
        rating: 4.8,
        bio: "Michael has a passion for urban living and helps clients find stylish lofts and apartments in the heart of the city."
    },
    {
        id: 3,
        name: "Sophia Lee",
        location: "San Francisco, CA",
        experience: "5 years",
        contactEmail: "sophia.lee@ecoagents.com",
        phoneNumber: "(415) 555-9876",
        profilePictureUrl: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Eco-Friendly Homes",
        rating: 4.7,
        bio: "Sophia is committed to sustainable living and specializes in eco-friendly and energy-efficient properties."
    },
    {
        id: 4,
        name: "Daniel Smith",
        location: "New York, NY",
        experience: "12 years",
        contactEmail: "daniel.smith@nyluxury.com",
        phoneNumber: "(212) 555-4321",
        profilePictureUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specialization: "High-End Penthouses",
        rating: 5.0,
        bio: "Daniel is a highly experienced agent with a focus on luxury penthouses and prime real estate in NYC."
    },
    {
        id: 5,
        name: "Emily Johnson",
        location: "Chicago, IL",
        experience: "8 years",
        contactEmail: "emily.johnson@suburbanrealty.com",
        phoneNumber: "(312) 555-8765",
        profilePictureUrl: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Suburban Homes",
        rating: 4.6,
        bio: "Emily specializes in finding the perfect family homes in Chicago’s most sought-after suburban neighborhoods."
    },
    {
        id: 6,
        name: "James Anderson",
        location: "Miami, FL",
        experience: "9 years",
        contactEmail: "james.anderson@beachfronts.com",
        phoneNumber: "(305) 555-6543",
        profilePictureUrl: "https://images.unsplash.com/photo-1568585105565-e372998a195d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        specialization: "Beachfront Properties",
        rating: 4.9,
        bio: "James is an expert in luxury beachfront properties, offering clients unmatched local insights and market knowledge."
    },
    {
        id: 7,
        name: "Olivia Martinez",
        location: "Denver, CO",
        experience: "6 years",
        contactEmail: "olivia.martinez@mountainviews.com",
        phoneNumber: "(720) 555-3456",
        profilePictureUrl: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Mountain Homes",
        rating: 4.8,
        bio: "Olivia has a deep understanding of the mountain property market and helps clients find their dream retreats."
    },
    {
        id: 8,
        name: "Ethan White",
        location: "Seattle, WA",
        experience: "4 years",
        contactEmail: "ethan.white@cityliving.com",
        phoneNumber: "(206) 555-7890",
        profilePictureUrl: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "City Apartments",
        rating: 4.5,
        bio: "Ethan focuses on helping you find stylish apartments in Seattle's vibrant city center."
    },
    {
        id: 9,
        name: "Ava Garcia",
        location: "Phoenix, AZ",
        experience: "7 years",
        contactEmail: "ava.garcia@desertoasis.com",
        phoneNumber: "(480) 555-1234",
        profilePictureUrl: "https://images.pexels.com/photos/8279822/pexels-photo-8279822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Desert Properties",
        rating: 4.7,
        bio: "Ava is known for her expertise in desert properties, offering a wide range of stunning homes with unique designs."
    },
    {
        id: 10,
        name: "Liam Walker",
        location: "Nashville, TN",
        experience: "10 years",
        contactEmail: "liam.walker@countryhomes.com",
        phoneNumber: "(615) 555-5678",
        profilePictureUrl: "https://images.pexels.com/photos/7841446/pexels-photo-7841446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        specialization: "Country Homes",
        rating: 4.9,
        bio: "Liam specializes in charming country homes and estates, providing clients with a seamless buying experience."
    }
];

