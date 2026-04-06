import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { hotels, rooms, reviews } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { Star, MapPin, Wifi, Car, Waves, UtensilsCrossed, Dumbbell, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

const serviceIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-4 w-4" />,
  Parking: <Car className="h-4 w-4" />,
  Piscine: <Waves className="h-4 w-4" />,
  Restaurant: <UtensilsCrossed className="h-4 w-4" />,
  Gym: <Dumbbell className="h-4 w-4" />,
};

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedImage, setSelectedImage] = useState(0);
  const hotel = hotels.find((h) => h.id === id);
  const hotelRooms = rooms.filter((r) => r.hotelId === id);
  const hotelReviews = reviews.filter((r) => r.hotelId === id);

  if (!hotel) return <div className="p-8 text-center">Hôtel non trouvé</div>;

  const handleBook = (roomType: string) => {
    if (!isAuthenticated) {
      toast.info("Veuillez vous connecter pour réserver");
      navigate("/login?redirect=/hotel/" + id);
      return;
    }
    toast.success(`Réservation "${roomType}" en cours de traitement !`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        {/* Gallery */}
        <div className="grid gap-2 md:grid-cols-[2fr_1fr]">
          <img
            src={hotel.images[selectedImage]}
            alt={hotel.name}
            className="h-80 w-full rounded-lg object-cover md:h-96"
          />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {hotel.images.slice(0, 3).map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)} className={`overflow-hidden rounded-lg border-2 ${selectedImage === i ? "border-primary" : "border-transparent"}`}>
                <img src={img} alt="" className="h-28 w-full object-cover md:h-[7.5rem]" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{hotel.name}</h1>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 star-filled fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {hotel.address}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Excellent</p>
              <p className="text-xs text-muted-foreground">{hotel.reviewCount} avis</p>
            </div>
            <div className="booking-rating text-lg">{hotel.rating}</div>
          </div>
        </div>

        <p className="mt-4 text-muted-foreground leading-relaxed">{hotel.description}</p>

        {/* Services */}
        <div className="mt-6">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Équipements</h2>
          <div className="flex flex-wrap gap-2">
            {hotel.services.map((s) => (
              <Badge key={s} variant="outline" className="gap-1.5 px-3 py-1.5">
                {serviceIcons[s] || <Check className="h-4 w-4" />} {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rooms */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Chambres disponibles</h2>
          <div className="space-y-3">
            {hotelRooms.map((room) => (
              <div key={room.id} className="booking-card flex flex-col justify-between gap-4 p-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-medium text-foreground">{room.type}</h3>
                  <p className="text-sm text-muted-foreground">{room.capacity} personne{room.capacity > 1 ? "s" : ""} · {room.amenities.join(", ")}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{room.price} €</p>
                    <p className="text-xs text-muted-foreground">/nuit</p>
                  </div>
                  <Button disabled={!room.available} onClick={() => handleBook(room.type)}>
                    {room.available ? "Réserver" : "Complet"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 mb-8">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Avis clients</h2>
          {hotelReviews.length > 0 ? (
            <div className="space-y-3">
              {hotelReviews.map((r) => (
                <div key={r.id} className="booking-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{r.userName}</span>
                    <div className="booking-rating text-sm">{r.rating}</div>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.comment}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Aucun avis pour le moment.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
