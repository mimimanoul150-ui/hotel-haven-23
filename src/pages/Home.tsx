import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import Footer from "@/components/Footer";
import { hotels, popularDestinations } from "@/data/mockData";
import { Star, Shield, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const featured = hotels.filter((h) => h.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="booking-hero relative px-4 pb-20 pt-16 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Trouvez votre séjour idéal
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-primary-foreground/80">
            Des milliers d'hôtels aux meilleurs prix. Réservez en toute confiance.
          </p>
        </div>
        <div className="container mx-auto mt-8 max-w-4xl">
          <SearchBar />
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><Shield className="h-5 w-5 text-primary" /> Paiement sécurisé</div>
          <div className="flex items-center gap-2"><Star className="h-5 w-5 text-secondary" /> +50 000 avis vérifiés</div>
          <div className="flex items-center gap-2"><Clock className="h-5 w-5 text-primary" /> Annulation gratuite</div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Destinations populaires</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.map((d) => (
              <button
                key={d.city}
                onClick={() => navigate(`/search?city=${d.city}`)}
                className="group relative h-48 overflow-hidden rounded-xl"
              >
                <img src={d.image} alt={d.city} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                <div className="absolute bottom-3 left-3 text-primary-foreground">
                  <p className="flex items-center gap-1 text-lg font-bold"><MapPin className="h-4 w-4" /> {d.city}</p>
                  <p className="text-xs text-primary-foreground/80">{d.hotelCount} hébergements</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured hotels */}
      <section className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Nos coups de cœur</h2>
          <div className="grid gap-4 lg:grid-cols-1">
            {featured.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="booking-hero py-14">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold">Économisez jusqu'à 30% sur votre prochain séjour</h2>
          <p className="mt-2 text-primary-foreground/80">Inscrivez-vous pour accéder à nos offres exclusives</p>
          <button onClick={() => navigate("/login?mode=signup")} className="mt-4 rounded-lg bg-secondary px-6 py-2.5 font-semibold text-secondary-foreground transition-colors hover:bg-secondary/90">
            Créer mon compte
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
