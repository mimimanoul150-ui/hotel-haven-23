import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import { hotels } from "@/data/mockData";
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const SERVICES = ["WiFi", "Parking", "Piscine", "Spa", "Restaurant"];

export default function SearchResults() {
  const [params] = useSearchParams();
  const city = params.get("city") || "";
  const [priceRange, setPriceRange] = useState([0, 600]);
  const [minStars, setMinStars] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (s: string) =>
    setSelectedServices((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (city && !h.city.toLowerCase().includes(city.toLowerCase())) return false;
      if (h.price < priceRange[0] || h.price > priceRange[1]) return false;
      if (h.stars < minStars) return false;
      if (selectedServices.length && !selectedServices.every((s) => h.services.includes(s))) return false;
      return true;
    });
  }, [city, priceRange, minStars, selectedServices]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-primary px-4 py-4">
        <div className="container mx-auto max-w-4xl">
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto flex flex-1 gap-6 px-4 py-8">
        {/* Filters sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="booking-card p-4">
            <h3 className="mb-4 font-semibold text-foreground">Filtres</h3>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-foreground">Prix par nuit</p>
              <Slider
                min={0}
                max={600}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
                className="mb-1"
              />
              <p className="text-xs text-muted-foreground">{priceRange[0]} € – {priceRange[1]} €</p>
            </div>

            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-foreground">Étoiles minimum</p>
              <div className="flex gap-2">
                {[0, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setMinStars(s)}
                    className={`rounded-md border px-3 py-1 text-sm ${minStars === s ? "bg-primary text-primary-foreground" : "border-border text-foreground"}`}
                  >
                    {s === 0 ? "Tous" : `${s}★`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-foreground">Services</p>
              <div className="space-y-2">
                {SERVICES.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <Checkbox
                      id={s}
                      checked={selectedServices.includes(s)}
                      onCheckedChange={() => toggleService(s)}
                    />
                    <Label htmlFor={s} className="text-sm">{s}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <p className="mb-4 text-sm text-muted-foreground">
            {city && <span className="font-medium text-foreground">{city} : </span>}
            {filtered.length} hébergement{filtered.length > 1 ? "s" : ""} trouvé{filtered.length > 1 ? "s" : ""}
          </p>
          <div className="space-y-4">
            {filtered.length > 0 ? (
              filtered.map((h) => <HotelCard key={h.id} hotel={h} />)
            ) : (
              <div className="rounded-lg bg-muted p-8 text-center text-muted-foreground">
                Aucun résultat. Modifiez vos critères de recherche.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
