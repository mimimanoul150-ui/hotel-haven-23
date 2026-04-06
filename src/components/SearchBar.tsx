import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function SearchBar({ className = "" }: { className?: string }) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("city", destination);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-secondary p-2 shadow-lg md:flex-row md:items-end ${className}`}>
      <div className="flex-1 min-w-0">
        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-secondary-foreground">
          <MapPin className="h-3 w-3" /> Destination
        </label>
        <Input
          placeholder="Où allez-vous ?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-card border-border"
        />
      </div>
      <div className="flex-1 min-w-0">
        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-secondary-foreground">
          <Calendar className="h-3 w-3" /> Arrivée
        </label>
        <Input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="bg-card border-border" />
      </div>
      <div className="flex-1 min-w-0">
        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-secondary-foreground">
          <Calendar className="h-3 w-3" /> Départ
        </label>
        <Input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="bg-card border-border" />
      </div>
      <div className="w-full md:w-28">
        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-secondary-foreground">
          <Users className="h-3 w-3" /> Voyageurs
        </label>
        <Input type="number" min={1} max={10} value={guests} onChange={(e) => setGuests(e.target.value)} className="bg-card border-border" />
      </div>
      <Button onClick={handleSearch} size="lg" className="mt-2 md:mt-0 gap-2">
        <Search className="h-4 w-4" /> Rechercher
      </Button>
    </div>
  );
}
