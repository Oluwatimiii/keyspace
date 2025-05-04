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
    propertyId: string;
    agentId?: string;
}

export interface AgentProfile {
    id: number;
    name: string;
    location: string;
    experience: string;
    contactEmail: string;
    phoneNumber: string;
    profilePictureUrl: string;
    specialization: string;
    rating: number;
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
        profilePictureUrl: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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

