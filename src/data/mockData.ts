export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  services: string[];
  stars: number;
  rating: number;
  reviewCount: number;
  roomsAvailable: number;
  totalRooms: number;
  featured?: boolean;
}

export interface Room {
  id: string;
  hotelId: string;
  type: string;
  price: number;
  capacity: number;
  available: boolean;
  amenities: string[];
}

export interface Reservation {
  id: string;
  hotelId: string;
  hotelName: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  createdAt: string;
}

export interface Review {
  id: string;
  hotelId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "admin";
  avatar?: string;
}

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "Le Grand Hôtel Paris",
    city: "Paris",
    address: "12 Avenue des Champs-Élysées, 75008 Paris",
    price: 189,
    originalPrice: 249,
    description: "Situé au cœur de Paris, Le Grand Hôtel offre une vue imprenable sur la Tour Eiffel. Profitez de chambres luxueuses, d'un spa de classe mondiale et d'une gastronomie raffinée dans un cadre exceptionnel.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800",
    ],
    services: ["WiFi", "Spa", "Piscine", "Restaurant", "Parking", "Gym", "Room Service"],
    stars: 5,
    rating: 9.2,
    reviewCount: 1847,
    roomsAvailable: 12,
    totalRooms: 120,
    featured: true,
  },
  {
    id: "2",
    name: "Hôtel Côte d'Azur",
    city: "Nice",
    address: "34 Promenade des Anglais, 06000 Nice",
    price: 145,
    originalPrice: 195,
    description: "Face à la mer Méditerranée, cet hôtel de charme vous accueille dans un cadre idyllique. Plage privée, terrasse panoramique et cuisine provençale vous attendent.",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d955f4e24?w=800",
    ],
    services: ["WiFi", "Plage privée", "Restaurant", "Bar", "Parking"],
    stars: 4,
    rating: 8.8,
    reviewCount: 923,
    roomsAvailable: 8,
    totalRooms: 65,
    featured: true,
  },
  {
    id: "3",
    name: "Château de Bordeaux",
    city: "Bordeaux",
    address: "5 Place de la Bourse, 33000 Bordeaux",
    price: 220,
    description: "Un château historique transformé en hôtel de luxe. Dégustez les meilleurs vins de Bordeaux tout en profitant d'un confort moderne dans un cadre médiéval.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800",
    ],
    services: ["WiFi", "Cave à vin", "Restaurant", "Spa", "Jardin", "Parking"],
    stars: 5,
    rating: 9.5,
    reviewCount: 562,
    roomsAvailable: 5,
    totalRooms: 40,
    featured: true,
  },
  {
    id: "4",
    name: "Hôtel Mont Blanc",
    city: "Chamonix",
    address: "18 Rue du Mont-Blanc, 74400 Chamonix",
    price: 165,
    description: "Au pied du Mont Blanc, cet hôtel alpin offre un accès direct aux pistes de ski et des vues spectaculaires sur les Alpes.",
    images: [
      "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800",
    ],
    services: ["WiFi", "Ski", "Spa", "Restaurant", "Gym", "Parking"],
    stars: 4,
    rating: 8.6,
    reviewCount: 734,
    roomsAvailable: 15,
    totalRooms: 80,
  },
  {
    id: "5",
    name: "Hôtel Vieux Lyon",
    city: "Lyon",
    address: "7 Rue Saint-Jean, 69005 Lyon",
    price: 110,
    description: "Niché dans le quartier historique du Vieux Lyon, cet hôtel boutique allie charme ancien et confort contemporain. Idéal pour découvrir la gastronomie lyonnaise.",
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800",
    ],
    services: ["WiFi", "Restaurant", "Bar", "Room Service"],
    stars: 3,
    rating: 8.2,
    reviewCount: 445,
    roomsAvailable: 20,
    totalRooms: 45,
  },
  {
    id: "6",
    name: "Résidence Marseille Port",
    city: "Marseille",
    address: "22 Quai du Port, 13002 Marseille",
    price: 95,
    originalPrice: 130,
    description: "Vue sur le Vieux-Port de Marseille, cet hôtel moderne vous place au cœur de l'action. Dégustez une bouillabaisse authentique à deux pas.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    services: ["WiFi", "Restaurant", "Terrasse", "Parking"],
    stars: 3,
    rating: 7.9,
    reviewCount: 678,
    roomsAvailable: 22,
    totalRooms: 55,
  },
];

export const rooms: Room[] = [
  { id: "r1", hotelId: "1", type: "Chambre Standard", price: 189, capacity: 2, available: true, amenities: ["WiFi", "TV", "Minibar"] },
  { id: "r2", hotelId: "1", type: "Suite Junior", price: 289, capacity: 2, available: true, amenities: ["WiFi", "TV", "Minibar", "Salon", "Vue Eiffel"] },
  { id: "r3", hotelId: "1", type: "Suite Présidentielle", price: 589, capacity: 4, available: false, amenities: ["WiFi", "TV", "Minibar", "Salon", "Jacuzzi", "Terrasse"] },
  { id: "r4", hotelId: "2", type: "Chambre Vue Mer", price: 145, capacity: 2, available: true, amenities: ["WiFi", "TV", "Balcon"] },
  { id: "r5", hotelId: "2", type: "Suite Méditerranée", price: 245, capacity: 3, available: true, amenities: ["WiFi", "TV", "Balcon", "Salon"] },
  { id: "r6", hotelId: "3", type: "Chambre Classique", price: 220, capacity: 2, available: true, amenities: ["WiFi", "TV", "Minibar"] },
  { id: "r7", hotelId: "3", type: "Suite Royale", price: 450, capacity: 2, available: true, amenities: ["WiFi", "TV", "Minibar", "Salon", "Cheminée"] },
  { id: "r8", hotelId: "4", type: "Chambre Montagne", price: 165, capacity: 2, available: true, amenities: ["WiFi", "TV", "Vue Alpes"] },
  { id: "r9", hotelId: "5", type: "Chambre Cosy", price: 110, capacity: 2, available: true, amenities: ["WiFi", "TV"] },
  { id: "r10", hotelId: "6", type: "Chambre Port", price: 95, capacity: 2, available: true, amenities: ["WiFi", "TV", "Vue Port"] },
];

export const reviews: Review[] = [
  { id: "rv1", hotelId: "1", userId: "u1", userName: "Marie D.", rating: 9.5, comment: "Séjour exceptionnel ! La vue sur la Tour Eiffel est à couper le souffle.", date: "2026-03-15" },
  { id: "rv2", hotelId: "1", userId: "u2", userName: "Pierre L.", rating: 9.0, comment: "Service impeccable et chambre luxueuse. Je recommande vivement.", date: "2026-03-10" },
  { id: "rv3", hotelId: "2", userId: "u3", userName: "Sophie M.", rating: 8.7, comment: "Plage magnifique et personnel très accueillant.", date: "2026-02-28" },
  { id: "rv4", hotelId: "3", userId: "u1", userName: "Marie D.", rating: 9.8, comment: "Un vrai château de conte de fées ! L'expérience vin est fantastique.", date: "2026-01-20" },
  { id: "rv5", hotelId: "1", userId: "u4", userName: "Jean B.", rating: 8.8, comment: "Très bon hôtel, petit déjeuner copieux.", date: "2026-03-01" },
];

export const reservations: Reservation[] = [
  { id: "res1", hotelId: "1", hotelName: "Le Grand Hôtel Paris", userId: "u1", checkIn: "2026-04-15", checkOut: "2026-04-18", guests: 2, roomType: "Suite Junior", totalPrice: 867, status: "confirmed", createdAt: "2026-03-20" },
  { id: "res2", hotelId: "3", hotelName: "Château de Bordeaux", userId: "u1", checkIn: "2026-05-10", checkOut: "2026-05-13", guests: 2, roomType: "Suite Royale", totalPrice: 1350, status: "pending", createdAt: "2026-04-01" },
  { id: "res3", hotelId: "2", hotelName: "Hôtel Côte d'Azur", userId: "u1", checkIn: "2026-02-01", checkOut: "2026-02-05", guests: 2, roomType: "Chambre Vue Mer", totalPrice: 580, status: "completed", createdAt: "2026-01-15" },
];

export const mockUser: User = {
  id: "u1",
  name: "Marie Dupont",
  email: "marie.dupont@email.com",
  role: "client",
};

export const popularDestinations = [
  { city: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", hotelCount: 2450 },
  { city: "Nice", image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400", hotelCount: 890 },
  { city: "Bordeaux", image: "https://images.unsplash.com/photo-1565018054866-968e244671af?w=400", hotelCount: 645 },
  { city: "Lyon", image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400", hotelCount: 780 },
];
