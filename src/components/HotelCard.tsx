import { useNavigate } from "react-router-dom";
import { Hotel } from "@/data/mockData";
import { Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  return (
    <div className="booking-card flex flex-col overflow-hidden sm:flex-row">
      <div className="relative h-52 w-full sm:h-auto sm:w-56 flex-shrink-0">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute right-2 top-2 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card"
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
        </button>
        {hotel.featured && (
          <Badge className="absolute left-2 top-2 bg-secondary text-secondary-foreground">Coup de cœur</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight text-foreground">{hotel.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" /> {hotel.city}
              </p>
            </div>
            <div className="booking-rating">{hotel.rating}</div>
          </div>
          <div className="mt-1 flex items-center gap-0.5">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 star-filled fill-current" />
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {hotel.services.slice(0, 4).map((s) => (
              <span key={s} className="booking-badge bg-accent text-accent-foreground">{s}</span>
            ))}
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-xs text-muted-foreground">{hotel.roomsAvailable} chambres restantes</p>
            <div className="flex items-baseline gap-1.5">
              {hotel.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{hotel.originalPrice} €</span>
              )}
              <span className="text-xl font-bold text-foreground">{hotel.price} €</span>
              <span className="text-xs text-muted-foreground">/nuit</span>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate(`/hotel/${hotel.id}`)}>
            Voir l'offre
          </Button>
        </div>
      </div>
    </div>
  );
}
